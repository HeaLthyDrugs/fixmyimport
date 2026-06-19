import JSZip from "jszip"
import Papa from "papaparse"

import { getPresetById } from "./presets"
import type {
  AuditReport,
  CsvPreview,
  CsvPreviewPage,
  CsvSessionSnapshot,
  CsvStats,
  ExportArtifact,
  ExportFile,
  ParsedCsvDataset,
  ProcessConfig,
  ProcessedCsvDataset,
} from "./types"

const PREVIEW_LIMIT = 25
const textEncoder = new TextEncoder()

function normalizeLineEndings(value: string) {
  return value.replace(/\r\n?/g, "\n")
}

function sanitizeCell(value: unknown, shouldNormalize: boolean) {
  const raw =
    typeof value === "string" ? value : value == null ? "" : String(value)

  return shouldNormalize ? normalizeLineEndings(raw) : raw
}

function isMostlyNumeric(values: string[]) {
  const nonEmptyValues = values.filter((value) => value.trim().length > 0)

  if (nonEmptyValues.length === 0) {
    return false
  }

  const numericValues = nonEmptyValues.filter((value) =>
    /^[-+]?[\d,.]+$/.test(value.trim())
  )

  return numericValues.length / nonEmptyValues.length > 0.6
}

function detectHeaderRow(rows: string[][]) {
  if (rows.length <= 1) {
    return true
  }

  const [firstRow, secondRow] = rows
  const uniqueRatio =
    new Set(firstRow.map((value) => value.trim().toLowerCase())).size /
    Math.max(firstRow.length, 1)

  return uniqueRatio > 0.75 &&
    !isMostlyNumeric(firstRow) &&
    isMostlyNumeric(secondRow)
    ? true
    : uniqueRatio > 0.75
}

function buildHeaders(row: string[] | undefined, columnCount: number) {
  return Array.from({ length: columnCount }, (_, index) => {
    const rawHeader = row?.[index]?.trim()

    return rawHeader && rawHeader.length > 0 ? rawHeader : `Column ${index + 1}`
  })
}

function padRow(row: string[], columnCount: number) {
  return Array.from({ length: columnCount }, (_, index) => row[index] ?? "")
}

function buildPreview(headers: string[], rows: string[][]): CsvPreview {
  return {
    headers,
    rows: rows.slice(0, PREVIEW_LIMIT),
    totalRows: rows.length,
    totalColumns: headers.length,
  }
}

function normalizePreviewQuery(query: string) {
  return query.trim().toLowerCase()
}

function filterPreviewRows(headers: string[], rows: string[][], query: string) {
  const normalizedQuery = normalizePreviewQuery(query)

  if (!normalizedQuery) {
    return rows
  }

  return rows.filter((row) =>
    row.some((value, index) => {
      const cellValue = `${headers[index] ?? ""} ${value}`.toLowerCase()

      return cellValue.includes(normalizedQuery)
    })
  )
}

export function buildPreviewPage(
  headers: string[],
  rows: string[][],
  query: string,
  page: number,
  pageSize: number
): CsvPreviewPage {
  const safePageSize = Math.max(1, pageSize || PREVIEW_LIMIT)
  const filteredRows = filterPreviewRows(headers, rows, query)
  const totalMatches = filteredRows.length
  const totalPages = Math.max(1, Math.ceil(totalMatches / safePageSize))
  const safePage = Math.min(Math.max(page, 1), totalPages)
  const startIndex = (safePage - 1) * safePageSize
  const endIndex = startIndex + safePageSize

  return {
    headers,
    rows: filteredRows.slice(startIndex, endIndex),
    totalRows: rows.length,
    totalColumns: headers.length,
    page: safePage,
    pageSize: safePageSize,
    totalPages,
    totalMatches,
    query,
  }
}

function computeStats(
  headers: string[],
  rows: string[][],
  delimiter: string,
  hasHeader: boolean
): CsvStats {
  const approxBytes = textEncoder.encode(
    Papa.unparse({
      fields: headers,
      data: rows.slice(0, Math.min(rows.length, 200)),
    })
  ).length

  const scaledApproxBytes =
    rows.length <= 200
      ? approxBytes
      : Math.round((approxBytes / 200) * rows.length)

  return {
    rowCount: rows.length,
    columnCount: headers.length,
    approxBytes: scaledApproxBytes,
    delimiter,
    hasHeader,
  }
}

function isRowEmpty(row: string[]) {
  return row.every((value) => value.trim().length === 0)
}

function formatDelimiter(delimiter: string) {
  if (delimiter === "\t") {
    return "tab"
  }

  return delimiter || "comma"
}

export function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 B"
  }

  const units = ["B", "KB", "MB", "GB"]
  const unitIndex = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  )

  const value = bytes / 1024 ** unitIndex

  return `${value >= 10 ? value.toFixed(0) : value.toFixed(1)} ${units[unitIndex]}`
}

export function parseCsvText(text: string, fileName: string): ParsedCsvDataset {
  const parseResult = Papa.parse<string[]>(text, {
    skipEmptyLines: false,
    dynamicTyping: false,
  })

  const rows = parseResult.data
    .filter(Array.isArray)
    .map((row) => row.map((value) => sanitizeCell(value, false)))

  const columnCount = rows.reduce(
    (maxCount, row) => Math.max(maxCount, row.length),
    0
  )

  if (columnCount === 0) {
    throw new Error("This file does not contain any parseable CSV rows yet.")
  }

  const hasHeader = detectHeaderRow(rows)
  const headers = buildHeaders(hasHeader ? rows[0] : undefined, columnCount)
  const dataRows = (hasHeader ? rows.slice(1) : rows).map((row) =>
    padRow(row, columnCount)
  )
  const warnings = parseResult.errors
    .map((error) => error.message)
    .filter(Boolean)
    .slice(0, 3)

  const stats = computeStats(
    headers,
    dataRows,
    parseResult.meta.delimiter ?? ",",
    hasHeader
  )

  return {
    fileName,
    headers,
    rows: dataRows,
    delimiter: parseResult.meta.delimiter ?? ",",
    hasHeader,
    warnings,
    preview: buildPreview(headers, dataRows),
    stats,
  }
}

function removeEmptyColumns(headers: string[], rows: string[][]) {
  const columnIndexesToKeep = headers
    .map((header, index) => {
      const hasHeaderValue =
        header.trim().length > 0 && !/^Column \d+$/.test(header.trim())
      const hasRowValue = rows.some((row) => row[index]?.trim().length > 0)

      return hasHeaderValue || hasRowValue ? index : -1
    })
    .filter((index) => index >= 0)

  if (columnIndexesToKeep.length === headers.length) {
    return {
      headers,
      rows,
      removedCount: 0,
    }
  }

  return {
    headers: columnIndexesToKeep.map((index) => headers[index]),
    rows: rows.map((row) =>
      columnIndexesToKeep.map((index) => row[index] ?? "")
    ),
    removedCount: headers.length - columnIndexesToKeep.length,
  }
}

function dedupeRows(
  headers: string[],
  rows: string[][],
  config: ProcessConfig["dedupe"]
) {
  if (!config.enabled || config.mode === "none") {
    return {
      rows,
      removedCount: 0,
    }
  }

  const keyIndexes =
    config.mode === "full-row"
      ? headers.map((_, index) => index)
      : config.columns
          .map((column) => headers.indexOf(column))
          .filter((index) => index >= 0)

  if (keyIndexes.length === 0) {
    return {
      rows,
      removedCount: 0,
    }
  }

  const buildKey = (row: string[]) =>
    keyIndexes.map((index) => row[index]?.trim() ?? "").join("\u241f")

  const seen = new Set<string>()
  const sourceRows = config.keep === "last" ? [...rows].reverse() : rows
  const dedupedRows: string[][] = []

  for (const row of sourceRows) {
    const key = buildKey(row)

    if (seen.has(key)) {
      continue
    }

    seen.add(key)
    dedupedRows.push(row)
  }

  const orderedRows =
    config.keep === "last" ? dedupedRows.reverse() : dedupedRows

  return {
    rows: orderedRows,
    removedCount: rows.length - orderedRows.length,
  }
}

function splitRows(
  fileName: string,
  headers: string[],
  rows: string[][],
  config: ProcessConfig["split"]
) {
  const baseName = fileName.replace(/\.[^.]+$/, "")
  const extension = fileName.includes(".")
    ? fileName.slice(fileName.lastIndexOf("."))
    : ".csv"

  if (rows.length === 0) {
    return [
      {
        fileName: `${baseName}${extension}`,
        rows: [],
      },
    ]
  }

  if (!config.enabled || config.mode === "none") {
    return [
      {
        fileName,
        rows,
      },
    ]
  }

  if (config.mode === "rows") {
    const chunkSize = Math.max(1, config.rowsPerFile)

    return Array.from(
      { length: Math.ceil(rows.length / chunkSize) },
      (_, index) => {
        const chunkRows = rows.slice(index * chunkSize, (index + 1) * chunkSize)

        return {
          fileName: `${baseName}-part-${index + 1}${extension}`,
          rows: chunkRows,
        }
      }
    )
  }

  const chunks: Array<{ fileName: string; rows: string[][] }> = []
  let activeRows: string[][] = []
  let activeBytes = textEncoder.encode(headers.join(",")).length
  const byteBudget = Math.max(1024, config.approxBytesPerFile)

  for (const row of rows) {
    const rowBytes = textEncoder.encode(row.join(",")).length + 1

    if (activeRows.length > 0 && activeBytes + rowBytes > byteBudget) {
      chunks.push({
        fileName: `${baseName}-part-${chunks.length + 1}${extension}`,
        rows: activeRows,
      })
      activeRows = []
      activeBytes = textEncoder.encode(headers.join(",")).length
    }

    activeRows.push(row)
    activeBytes += rowBytes
  }

  if (activeRows.length > 0) {
    chunks.push({
      fileName: `${baseName}-part-${chunks.length + 1}${extension}`,
      rows: activeRows,
    })
  }

  return chunks
}

function toCsvString(
  headers: string[],
  rows: string[][],
  includeHeader: boolean
) {
  return includeHeader
    ? Papa.unparse({
        fields: headers,
        data: rows,
      })
    : Papa.unparse(rows)
}

function buildExportPlan(
  fileName: string,
  headers: string[],
  rows: string[][],
  config: ProcessConfig["split"]
) {
  const files = splitRows(fileName, headers, rows, config).map<ExportFile>(
    (file) => ({
      fileName: file.fileName,
      rowCount: file.rows.length,
      approxBytes: textEncoder.encode(
        Papa.unparse({
          fields: headers,
          data: file.rows,
        })
      ).length,
    })
  )

  return {
    fileCount: files.length,
    files,
  }
}

function buildAppliedActions(
  config: ProcessConfig,
  emptyColumnsRemoved: number
) {
  const actions: string[] = []

  if (config.clean.trimWhitespace) {
    actions.push("Trimmed whitespace")
  }

  if (config.clean.normalizeLineEndings) {
    actions.push("Normalized line endings")
  }

  if (config.clean.removeEmptyRows) {
    actions.push("Removed empty rows")
  }

  if (config.clean.removeEmptyColumns && emptyColumnsRemoved > 0) {
    actions.push("Removed empty columns")
  }

  if (config.dedupe.enabled && config.dedupe.mode !== "none") {
    actions.push(
      config.dedupe.mode === "full-row"
        ? "Removed duplicate rows"
        : `Removed duplicates by ${config.dedupe.columns.join(", ")}`
    )
  }

  if (config.split.enabled && config.split.mode !== "none") {
    actions.push(
      config.split.mode === "rows"
        ? "Split by rows"
        : "Split by approximate file size"
    )
  }

  return actions
}

function buildWarnings(
  parsed: ParsedCsvDataset,
  processedStats: CsvStats,
  config: ProcessConfig
) {
  const preset = getPresetById(config.presetId)
  const warnings = [...parsed.warnings, ...preset.warnings]

  if (preset.maxRows && processedStats.rowCount > preset.maxRows) {
    warnings.push(
      `${preset.name} works best below ${preset.maxRows.toLocaleString()} rows per file.`
    )
  }

  if (preset.maxBytes && processedStats.approxBytes > preset.maxBytes) {
    warnings.push(
      `${preset.name} works best below ${formatBytes(preset.maxBytes)} per output file.`
    )
  }

  return Array.from(new Set(warnings))
}

export function processParsedDataset(
  parsed: ParsedCsvDataset,
  config: ProcessConfig
): ProcessedCsvDataset {
  let headers = [...parsed.headers]
  let rows = parsed.rows.map((row) => [...row])

  rows = rows.map((row) =>
    row.map((value) => {
      let nextValue = sanitizeCell(value, config.clean.normalizeLineEndings)

      if (config.clean.trimWhitespace) {
        nextValue = nextValue.trim()
      }

      return nextValue
    })
  )

  const sourceRowCount = rows.length
  const rowsBeforeEmptyFilter = rows.length

  if (config.clean.removeEmptyRows) {
    rows = rows.filter((row) => !isRowEmpty(row))
  }

  const emptyRowsRemoved = rowsBeforeEmptyFilter - rows.length

  let emptyColumnsRemoved = 0

  if (config.clean.removeEmptyColumns) {
    const cleanedColumns = removeEmptyColumns(headers, rows)
    headers = cleanedColumns.headers
    rows = cleanedColumns.rows
    emptyColumnsRemoved = cleanedColumns.removedCount
  }

  const dedupedRows = dedupeRows(headers, rows, config.dedupe)
  rows = dedupedRows.rows

  const processedStats = computeStats(
    headers,
    rows,
    parsed.delimiter,
    parsed.hasHeader
  )
  const exportPlan = buildExportPlan(
    parsed.fileName,
    headers,
    rows,
    config.split
  )
  const warnings = buildWarnings(parsed, processedStats, config)
  const audit: AuditReport = {
    sourceRows: sourceRowCount,
    outputRows: rows.length,
    duplicateRowsRemoved: dedupedRows.removedCount,
    emptyRowsRemoved,
    emptyColumnsRemoved,
    filesCreated: exportPlan.fileCount,
    warnings,
    appliedActions: buildAppliedActions(config, emptyColumnsRemoved),
  }

  return {
    fileName: parsed.fileName,
    headers,
    rows,
    sourcePreview: parsed.preview,
    processedPreview: buildPreview(headers, rows),
    sourceStats: parsed.stats,
    processedStats,
    audit,
    exportPlan,
  }
}

export function buildSessionSnapshot(
  parsed: ParsedCsvDataset,
  processed?: ProcessedCsvDataset
): CsvSessionSnapshot {
  return {
    fileName: parsed.fileName,
    sourcePreview: parsed.preview,
    processedPreview: processed?.processedPreview,
    sourceStats: parsed.stats,
    processedStats: processed?.processedStats,
    warnings: processed?.audit?.warnings ?? parsed.warnings,
    audit: processed?.audit,
    exportPlan: processed?.exportPlan,
  }
}

function makeCsvFileName(fileName: string) {
  return fileName.endsWith(".csv") ? fileName : `${fileName}.csv`
}

function toAuditCsv(processed: ProcessedCsvDataset) {
  return Papa.unparse(
    processed.audit.appliedActions.map((action, index) => ({
      index: index + 1,
      action,
    }))
  )
}

export async function exportProcessedDataset(
  processed: ProcessedCsvDataset,
  config: ProcessConfig,
  includeAuditCsv: boolean
): Promise<ExportArtifact[]> {
  const chunks = splitRows(
    processed.fileName,
    processed.headers,
    processed.rows,
    config.split
  )
  const csvFiles = chunks.map((chunk, index) => ({
    fileName: makeCsvFileName(chunk.fileName),
    csv: toCsvString(
      processed.headers,
      chunk.rows,
      config.split.repeatHeader || index === 0
    ),
  }))

  const artifacts: ExportArtifact[] = []

  if (csvFiles.length === 1) {
    artifacts.push({
      kind: "csv",
      fileName: csvFiles[0].fileName,
      mimeType: "text/csv;charset=utf-8",
      payload: csvFiles[0].csv,
    })
  } else {
    const zip = new JSZip()

    for (const csvFile of csvFiles) {
      zip.file(csvFile.fileName, csvFile.csv)
    }

    if (includeAuditCsv) {
      zip.file("fixmyimport-audit.csv", toAuditCsv(processed))
    }

    const payload = await zip.generateAsync({ type: "arraybuffer" })

    artifacts.push({
      kind: "zip",
      fileName: `${processed.fileName.replace(/\.[^.]+$/, "")}-batches.zip`,
      mimeType: "application/zip",
      payload,
    })
  }

  if (includeAuditCsv && csvFiles.length === 1) {
    artifacts.push({
      kind: "audit-csv",
      fileName: "fixmyimport-audit.csv",
      mimeType: "text/csv;charset=utf-8",
      payload: toAuditCsv(processed),
    })
  }

  return artifacts
}

export function describeDatasetStats(stats: CsvStats) {
  return [
    `${stats.rowCount.toLocaleString()} rows`,
    `${stats.columnCount} columns`,
    `${formatBytes(stats.approxBytes)}`,
    `${formatDelimiter(stats.delimiter)} delimited`,
  ]
}
