export interface CsvPreview {
  headers: string[]
  rows: string[][]
  totalRows: number
  totalColumns: number
}

export interface CsvStats {
  rowCount: number
  columnCount: number
  approxBytes: number
  delimiter: string
  hasHeader: boolean
}

export interface CleanOptions {
  trimWhitespace: boolean
  normalizeLineEndings: boolean
  removeEmptyRows: boolean
  removeEmptyColumns: boolean
}

export type DedupeMode = "none" | "full-row" | "selected-columns"
export type DedupeKeep = "first" | "last"

export interface DedupeOptions {
  enabled: boolean
  mode: DedupeMode
  columns: string[]
  keep: DedupeKeep
}

export type SplitMode = "none" | "rows" | "size"

export interface SplitOptions {
  enabled: boolean
  mode: SplitMode
  rowsPerFile: number
  approxBytesPerFile: number
  repeatHeader: boolean
}

export interface ProcessConfig {
  clean: CleanOptions
  dedupe: DedupeOptions
  split: SplitOptions
  presetId: string
}

export interface PresetDefinition {
  id: string
  name: string
  audience: string
  summary: string
  defaultSplitMode: Exclude<SplitMode, "none">
  recommendedRowsPerFile: number
  recommendedBytesPerFile: number
  warnings: string[]
  maxRows?: number
  maxBytes?: number
  proNotes?: string
}

export interface AuditReport {
  sourceRows: number
  outputRows: number
  duplicateRowsRemoved: number
  emptyRowsRemoved: number
  emptyColumnsRemoved: number
  filesCreated: number
  warnings: string[]
  appliedActions: string[]
}

export interface ExportFile {
  fileName: string
  rowCount: number
  approxBytes: number
}

export interface ExportPlan {
  fileCount: number
  files: ExportFile[]
}

export interface CsvSourceInput {
  fileName: string
  text: string
}

export interface ParsedCsvDataset {
  fileName: string
  headers: string[]
  rows: string[][]
  delimiter: string
  hasHeader: boolean
  warnings: string[]
  preview: CsvPreview
  stats: CsvStats
}

export interface ProcessedCsvDataset {
  fileName: string
  headers: string[]
  rows: string[][]
  sourcePreview: CsvPreview
  processedPreview: CsvPreview
  sourceStats: CsvStats
  processedStats: CsvStats
  audit: AuditReport
  exportPlan: ExportPlan
}

export interface CsvSessionSnapshot {
  fileName: string
  sourcePreview: CsvPreview
  processedPreview?: CsvPreview
  sourceStats: CsvStats
  processedStats?: CsvStats
  warnings: string[]
  audit?: AuditReport
  exportPlan?: ExportPlan
}

export interface ExportArtifact {
  kind: "csv" | "zip" | "audit-csv"
  fileName: string
  mimeType: string
  payload: string | ArrayBuffer
}

export type CsvWorkerRequest =
  | { type: "parse"; payload: CsvSourceInput }
  | { type: "process"; payload: ProcessConfig }
  | {
      type: "export"
      payload: { config: ProcessConfig; includeAuditCsv: boolean }
    }
  | { type: "cancel" }

export type CsvWorkerResponse =
  | {
      type: "status"
      payload: {
        phase: "parsing" | "processing" | "exporting" | "idle"
        progress: number
        message: string
      }
    }
  | { type: "parsed"; payload: CsvSessionSnapshot }
  | { type: "processed"; payload: CsvSessionSnapshot }
  | { type: "exported"; payload: ExportArtifact[] }
  | { type: "cancelled" }
  | { type: "error"; payload: { message: string } }

export interface CsvWorkerState {
  parsed?: ParsedCsvDataset
  processed?: ProcessedCsvDataset
}
