"use client"

import {
  startTransition,
  useDeferredValue,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react"
import {
  RiAlertLine,
  RiArrowUpLine,
  RiDownload2Line,
  RiFileUploadLine,
  RiInformationLine,
  RiLoader4Line,
  RiSettings3Line,
} from "@remixicon/react"

import { bucketFileSize, trackAnalyticsEvent } from "@/lib/analytics"
import {
  applyPresetToSplitOptions,
  CSV_PRESETS,
  DEFAULT_PROCESS_CONFIG,
} from "@/lib/csv/presets"
import { describeDatasetStats, formatBytes } from "@/lib/csv/engine"
import { SAMPLE_CSV, SAMPLE_CSV_FILE_NAME } from "@/lib/csv/sample"
import type {
  CsvPreviewPage,
  CsvSessionSnapshot,
  CsvWorkerResponse,
  DedupeMode,
  ExportArtifact,
  ProcessConfig,
} from "@/lib/csv/types"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

// ─── Constants ──────────────────────────────────────────────

const FREE_ROW_LIMIT = 250_000
const FREE_SIZE_LIMIT = 25 * 1024 * 1024
const PRO_TOKEN_STORAGE_KEY = "fixmyimport.pro.token"
const DEFAULT_PAGE_SIZE = 25

type WorkStatus = {
  phase: "idle" | "parsing" | "processing" | "exporting"
  progress: number
  message: string
}

const DEFAULT_STATUS: WorkStatus = {
  phase: "idle",
  progress: 0,
  message: "Load a CSV to see a clean preview and export plan.",
}

// ─── Helpers ────────────────────────────────────────────────

function chooseDefaultDedupeColumns(headers: string[]) {
  const emailHeader = headers.find((header) => /email/i.test(header))
  if (emailHeader) return [emailHeader]

  const idHeader = headers.find((header) => /\b(id|sku|handle)\b/i.test(header))
  if (idHeader) return [idHeader]

  return headers[0] ? [headers[0]] : []
}

function isBusy(phase: WorkStatus["phase"]) {
  return phase !== "idle"
}

function downloadArtifact(artifact: ExportArtifact) {
  const payload = new Blob(
    [typeof artifact.payload === "string" ? artifact.payload : artifact.payload],
    { type: artifact.mimeType }
  )
  const url = URL.createObjectURL(payload)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = artifact.fileName
  anchor.click()
  URL.revokeObjectURL(url)
}

// ─── Spreadsheet Table ─────────────────────────────────────

function SpreadsheetTable({
  headers,
  rows,
  startRow,
  emptyLabel,
}: {
  headers: string[]
  rows: string[][]
  startRow: number
  emptyLabel: string
}) {
  if (headers.length === 0) {
    return (
      <div className="flex h-full items-center justify-center p-12 text-sm text-muted-foreground">
        {emptyLabel}
      </div>
    )
  }

  return (
    <div className="relative min-w-full inline-block align-top">
      <table
        className="w-full border-separate text-[12px]"
        style={{ borderSpacing: 0 }}
      >
        <thead>
          <tr>
            {/* Corner cell — sticky both directions, highest z-index */}
            <th className="sticky left-0 top-0 z-30 min-w-[56px] max-w-[56px] border-b border-r border-border bg-muted/90 px-2 py-1.5 text-center text-[11px] font-mono font-medium text-muted-foreground select-none">
              #
            </th>
            {headers.map((header, i) => (
              <th
                key={`${header}-${i}`}
                className="sticky top-0 z-20 min-w-[120px] whitespace-nowrap border-b border-r border-border bg-muted/90 px-3 py-1.5 text-left text-[11px] font-semibold text-foreground/80 select-none shadow-[inset_0_-1px_0_var(--border)]"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={headers.length + 1}
                className="px-3 py-16 text-center text-sm text-muted-foreground"
              >
                {emptyLabel}
              </td>
            </tr>
          ) : (
            rows.map((row, rowIndex) => (
              <tr
                key={startRow + rowIndex}
                className="group hover:bg-primary/[0.04] transition-colors"
              >
                {/* Row number — sticky left */}
                <td className="sticky left-0 z-10 border-b border-r border-border bg-muted/80 group-hover:bg-muted px-2 py-1 text-center text-[11px] font-mono tabular-nums text-muted-foreground select-none">
                  {startRow + rowIndex}
                </td>
                {headers.map((header, colIndex) => (
                  <td
                    key={`${header}-${rowIndex}-${colIndex}`}
                    className="whitespace-nowrap border-b border-r border-border/50 bg-background px-3 py-1 text-[12px] text-foreground"
                  >
                    {row[colIndex] || "\u00A0"}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

// ─── Main Component ─────────────────────────────────────────

export function CsvWorkbench() {
  const [config, setConfig] = useState(DEFAULT_PROCESS_CONFIG)
  const [snapshot, setSnapshot] = useState<CsvSessionSnapshot | null>(null)
  const [status, setStatus] = useState<WorkStatus>(DEFAULT_STATUS)
  const [error, setError] = useState("")
  const [pasteValue, setPasteValue] = useState("")
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [proDialogOpen, setProDialogOpen] = useState(false)
  const [howItWorksOpen, setHowItWorksOpen] = useState(false)
  const [activePreviewTab, setActivePreviewTab] = useState<
    "output" | "source" | "plan"
  >("output")
  const [inputMode, setInputMode] = useState<"upload" | "paste">("upload")
  const [previewQueries, setPreviewQueries] = useState({
    source: "",
    processed: "",
  })
  const [previewPageSizes, setPreviewPageSizes] = useState({
    source: DEFAULT_PAGE_SIZE,
    processed: DEFAULT_PAGE_SIZE,
  })
  const [previewPages, setPreviewPages] = useState<{
    source: CsvPreviewPage | null
    processed: CsvPreviewPage | null
  }>({
    source: null,
    processed: null,
  })
  const [proToken, setProToken] = useState(() =>
    typeof window === "undefined"
      ? ""
      : (window.localStorage.getItem(PRO_TOKEN_STORAGE_KEY) ?? "")
  )
  const [licenseInput, setLicenseInput] = useState(() =>
    typeof window === "undefined"
      ? ""
      : (window.localStorage.getItem(PRO_TOKEN_STORAGE_KEY) ?? "")
  )
  const [isDragOver, setIsDragOver] = useState(false)

  const workerRef = useRef<Worker | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const checkoutUrl = import.meta.env.PUBLIC_FIXMYIMPORT_PRO_URL
  const deferredProcessedRows = useDeferredValue(
    previewPages.processed?.rows ?? []
  )
  const deferredSourceRows = useDeferredValue(previewPages.source?.rows ?? [])
  const proEnabled = proToken.trim().length > 0
  const sourceStats = snapshot?.sourceStats
  const processedStats = snapshot?.processedStats
  const sourceHeaders = snapshot?.sourcePreview.headers ?? []
  const dedupeHeaders =
    sourceHeaders.length > 0
      ? sourceHeaders
      : chooseDefaultDedupeColumns(sourceHeaders)

  // ── Derived values for the active tab ──

  const currentDataset: "source" | "processed" =
    activePreviewTab === "source" ? "source" : "processed"
  const sourcePreviewPage = previewPages.source
  const processedPreviewPage = previewPages.processed
  const currentPreviewPage =
    activePreviewTab === "source" ? sourcePreviewPage : processedPreviewPage
  const currentHeaders =
    activePreviewTab === "source"
      ? (sourcePreviewPage?.headers ?? snapshot?.sourcePreview.headers ?? [])
      : (processedPreviewPage?.headers ??
          snapshot?.processedPreview?.headers ??
          [])
  const currentRows =
    activePreviewTab === "source" ? deferredSourceRows : deferredProcessedRows
  const currentStartRow =
    currentPreviewPage && currentPreviewPage.totalMatches > 0
      ? (currentPreviewPage.page - 1) * currentPreviewPage.pageSize + 1
      : 1
  const currentEndRow = currentPreviewPage
    ? Math.min(
        currentPreviewPage.page * currentPreviewPage.pageSize,
        currentPreviewPage.totalMatches
      )
    : 0

  // ── Worker communication ──

  const processWithConfig = (nextConfig: ProcessConfig) => {
    workerRef.current?.postMessage({
      type: "process",
      payload: nextConfig,
    })
    setStatus({
      phase: "processing",
      progress: 35,
      message: "Refreshing your output preview.",
    })
  }

  const requestPreview = (
    dataset: "source" | "processed",
    options?: Partial<{
      query: string
      page: number
      pageSize: number
    }>
  ) => {
    workerRef.current?.postMessage({
      type: "preview",
      payload: {
        dataset,
        query: options?.query ?? previewQueries[dataset],
        page: options?.page ?? 1,
        pageSize: options?.pageSize ?? previewPageSizes[dataset],
      },
    })
  }

  const handleWorkerResponse = useEffectEvent(
    (event: MessageEvent<CsvWorkerResponse>) => {
      const message = event.data

      if (message.type === "status") {
        setStatus(message.payload)
        return
      }

      if (message.type === "error") {
        setError(message.payload.message)
        setStatus({
          phase: "idle",
          progress: 0,
          message: "FixMyImport could not process that CSV.",
        })
        return
      }

      if (message.type === "parsed") {
        const nextColumns = chooseDefaultDedupeColumns(
          message.payload.sourcePreview.headers
        )
        const nextConfig = {
          ...config,
          dedupe: {
            ...config.dedupe,
            columns:
              config.dedupe.columns.length > 0
                ? config.dedupe.columns
                : nextColumns,
          },
        }

        startTransition(() => {
          setSnapshot(message.payload)
          setConfig(nextConfig)
          setPreviewPages({ source: null, processed: null })
          setPreviewQueries((q) => ({ ...q, source: "", processed: "" }))
          setError("")
        })

        requestPreview("source", {
          query: "",
          page: 1,
          pageSize: previewPageSizes.source,
        })
        processWithConfig(nextConfig)
        return
      }

      if (message.type === "processed") {
        startTransition(() => {
          setSnapshot(message.payload)
          setActivePreviewTab("output")
          setPreviewQueries((q) => ({ ...q, processed: "" }))
          setError("")
        })

        requestPreview("processed", {
          query: "",
          page: 1,
          pageSize: previewPageSizes.processed,
        })
        trackAnalyticsEvent("preview_shown", { preset: config.presetId })
        return
      }

      if (message.type === "previewed") {
        startTransition(() => {
          setPreviewPages((p) => ({
            ...p,
            [message.payload.dataset]: message.payload.preview,
          }))
        })
        return
      }

      if (message.type === "exported") {
        for (const artifact of message.payload) {
          downloadArtifact(artifact)
        }
        trackAnalyticsEvent("export_completed", {
          preset: config.presetId,
          output_kind:
            message.payload.length > 1
              ? "multiple"
              : (message.payload[0]?.kind ?? "csv"),
        })
      }
    }
  )

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../workers/csv-worker.ts", import.meta.url),
      { type: "module" }
    )
    workerRef.current.onmessage = handleWorkerResponse

    return () => {
      workerRef.current?.terminate()
      workerRef.current = null
    }
  }, [])

  // ── Event handlers ──

  const submitSource = async (fileName: string, text: string) => {
    workerRef.current?.postMessage({
      type: "parse",
      payload: { fileName, text },
    })
    setError("")
    setStatus({
      phase: "parsing",
      progress: 15,
      message: "Reading your CSV locally.",
    })
    trackAnalyticsEvent("file_loaded", {
      source: fileName === SAMPLE_CSV_FILE_NAME ? "sample" : "upload",
      size_bucket: bucketFileSize(new Blob([text]).size),
    })
  }

  const handleFileSelection = async (file?: File | null) => {
    if (!file) return
    const text = await file.text()
    await submitSource(file.name, text)
  }

  const handlePresetChange = (value: string) => {
    const nextConfig = {
      ...config,
      presetId: value,
      split: applyPresetToSplitOptions(config.split, value),
    }
    setConfig(nextConfig)
    trackAnalyticsEvent("preset_selected", { preset: value })
    if (snapshot) processWithConfig(nextConfig)
  }

  const handlePreviewQueryChange = (
    dataset: "source" | "processed",
    value: string
  ) => {
    setPreviewQueries((q) => ({ ...q, [dataset]: value }))
    requestPreview(dataset, { query: value, page: 1 })
  }

  const handlePreviewPageSizeChange = (
    dataset: "source" | "processed",
    value: string
  ) => {
    const nextPageSize = Number(value) || DEFAULT_PAGE_SIZE
    setPreviewPageSizes((p) => ({ ...p, [dataset]: nextPageSize }))
    requestPreview(dataset, { pageSize: nextPageSize, page: 1 })
  }

  const handleExport = () => {
    if (!snapshot) return

    const sourceTooLarge =
      snapshot.sourceStats.rowCount > FREE_ROW_LIMIT ||
      snapshot.sourceStats.approxBytes > FREE_SIZE_LIMIT

    if (!proEnabled && sourceTooLarge) {
      setProDialogOpen(true)
      trackAnalyticsEvent("upgrade_clicked", { reason: "large_file" })
      return
    }

    workerRef.current?.postMessage({
      type: "export",
      payload: { config, includeAuditCsv: proEnabled },
    })
    setStatus({
      phase: "exporting",
      progress: 65,
      message: "Packing your files for download.",
    })
  }

  // ─── Tab button helper ─────────────────────────────────────

  const tabButton = (
    tab: "output" | "source" | "plan",
    label: string
  ) => (
    <button
      key={tab}
      className={`rounded px-2.5 py-1 text-xs font-medium transition ${
        activePreviewTab === tab
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground"
      }`}
      onClick={() => setActivePreviewTab(tab)}
    >
      {label}
    </button>
  )

  // ─── Render ────────────────────────────────────────────────

  return (
    <>
      {/* Hidden file input — always in the DOM */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={(event) =>
          void handleFileSelection(event.target.files?.[0])
        }
      />

      {!snapshot ? (
        /* ════════════════════════════════════════════════════════
           UPLOAD STATE — centered drop-zone
           ════════════════════════════════════════════════════════ */
        <div className="flex min-h-dvh flex-col bg-background">
          {/* Mini header */}
          <div className="flex shrink-0 items-center justify-between border-b border-border/40 px-4 py-2.5">
            <span className="text-sm font-semibold tracking-tight">
              CSV Import Cleaner
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setHowItWorksOpen(true)}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground transition hover:text-foreground cursor-pointer"
              >
                <RiInformationLine className="size-3.5" />
                How it works
              </button>
              <a
                href="/"
                className="text-xs text-muted-foreground transition hover:text-foreground"
              >
                ← All tools
              </a>
            </div>
          </div>

          {/* Center content */}
          <div className="flex flex-1 flex-col items-center justify-center gap-5 p-4">
            <div className="text-center space-y-1">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight">CSV Viewer & Cleaner</h1>
              <p className="text-sm text-muted-foreground">
                Clean, dedupe, and split import-ready CSVs — right in your browser.
              </p>
            </div>

            {inputMode === "upload" ? (
              <div
                className={`w-full max-w-xl rounded-xl border-2 border-dashed p-8 sm:p-10 text-center transition-colors shadow-xs ${
                  isDragOver
                    ? "border-primary bg-primary/5"
                    : "border-border/80 bg-card/60"
                }`}
                onDragOver={(e) => {
                  e.preventDefault()
                  setIsDragOver(true)
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={async (e) => {
                  e.preventDefault()
                  setIsDragOver(false)
                  await handleFileSelection(e.dataTransfer.files?.[0])
                }}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="rounded-xl border border-border bg-background p-3.5 shadow-2xs">
                    <RiArrowUpLine className="size-6 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-base font-semibold text-foreground">
                      Drop your CSV file here
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Also opens .tsv, .tab and .txt · Processed in your browser — your file is never uploaded.
                    </p>
                  </div>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-[#0078d4] hover:bg-[#106ebe] text-white px-5 py-2 text-sm font-medium shadow-xs"
                  >
                    Browse file
                  </Button>
                  <button
                    className="text-xs text-muted-foreground underline underline-offset-2 transition hover:text-foreground cursor-pointer"
                    onClick={() => {
                      setPasteValue(SAMPLE_CSV)
                      void submitSource(SAMPLE_CSV_FILE_NAME, SAMPLE_CSV)
                    }}
                  >
                    or try a sample CSV
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-xl space-y-4">
                <Textarea
                  rows={8}
                  value={pasteValue}
                  onChange={(e) => setPasteValue(e.target.value)}
                  placeholder="Email,First Name,Last Name"
                  className="font-mono text-sm"
                />
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={() =>
                      void submitSource("pasted-import.csv", pasteValue)
                    }
                    disabled={
                      pasteValue.trim().length === 0 || isBusy(status.phase)
                    }
                  >
                    Load pasted CSV
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setPasteValue("")}
                    disabled={pasteValue.length === 0}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            )}

            <button
              className="text-xs text-muted-foreground underline underline-offset-2 transition hover:text-foreground"
              onClick={() =>
                setInputMode(inputMode === "upload" ? "paste" : "upload")
              }
            >
              {inputMode === "upload"
                ? "Paste CSV text instead"
                : "Upload a file instead"}
            </button>

            {isBusy(status.phase) ? (
              <div className="w-full max-w-xl space-y-2">
                <Progress value={status.progress} />
                <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
                  <p>{status.message}</p>
                  <RiLoader4Line className="size-4 animate-spin" />
                </div>
              </div>
            ) : null}

            {error ? (
              <div className="w-full max-w-xl">
                <Alert variant="destructive">
                  <RiAlertLine />
                  <AlertTitle>Could not process this CSV</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </div>
            ) : null}

            <button
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition hover:text-foreground"
              onClick={() => setHowItWorksOpen(true)}
            >
              <RiInformationLine className="size-3.5" />
              How it works
            </button>
          </div>
        </div>
      ) : (
        /* ════════════════════════════════════════════════════════
           LOADED STATE — full-width spreadsheet
           ════════════════════════════════════════════════════════ */
        <div className="flex h-dvh flex-col overflow-hidden bg-background">
          {/* ── Primary toolbar ── */}
          <div className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1.5 border-b border-border bg-background px-3 py-1.5 shadow-xs">
            {/* Left: brand + file info badge */}
            <div className="flex min-w-0 items-center gap-2">
              <a
                href="/"
                className="shrink-0 text-xs font-semibold tracking-tight text-foreground transition hover:text-primary"
              >
                CSV Import Cleaner
              </a>
              <div className="flex min-w-0 items-center gap-1.5 rounded-md border border-border/80 bg-muted/40 px-2 py-0.5 text-xs">
                <span className="truncate font-medium text-foreground max-w-[200px] sm:max-w-[320px]">
                  {snapshot.fileName}
                </span>
                <span className="text-border">|</span>
                <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
                  {describeDatasetStats(sourceStats ?? snapshot.sourceStats).join(" · ")}
                  {processedStats ? ` · ${processedStats.rowCount.toLocaleString()} output rows` : ""}
                </span>
              </div>
            </div>

            {/* Right: search + actions */}
            <div className="ml-auto flex shrink-0 items-center gap-1.5">
              {activePreviewTab !== "plan" ? (
                <div className="relative">
                  <Input
                    className="h-7 w-36 sm:w-48 text-xs bg-background"
                    placeholder="Search rows…"
                    value={previewQueries[currentDataset]}
                    onChange={(e) =>
                      handlePreviewQueryChange(currentDataset, e.target.value)
                    }
                  />
                </div>
              ) : null}
              <Button
                size="xs"
                variant="ghost"
                onClick={() => setHowItWorksOpen(true)}
                className="text-xs text-muted-foreground hover:text-foreground hidden sm:inline-flex"
              >
                <RiInformationLine className="size-3.5" />
                How it works
              </Button>
              <Button
                size="xs"
                onClick={handleExport}
                disabled={isBusy(status.phase)}
                className="bg-[#107c41] hover:bg-[#0e6b37] text-white font-medium shadow-xs"
              >
                <RiDownload2Line className="size-3.5" />
                Download
              </Button>
              <Button
                size="xs"
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#0078d4] hover:bg-[#106ebe] text-white font-medium shadow-xs"
              >
                <RiFileUploadLine className="size-3.5" />
                Open file
              </Button>
            </div>
          </div>

          {/* ── Secondary toolbar: tabs + controls ── */}
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-border bg-muted/20 px-3 py-1">
            {/* Tab buttons */}
            <div className="flex gap-0.5 rounded-md bg-muted/60 p-0.5">
              {tabButton("output", "Output")}
              {tabButton("source", "Source")}
              {tabButton("plan", "Export plan")}
            </div>

            {/* Right: preset + tools */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-muted-foreground hidden sm:inline">Preset:</span>
              <Select
                value={config.presetId}
                onValueChange={handlePresetChange}
              >
                <SelectTrigger className="h-6 w-[170px] sm:w-[210px] text-xs bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CSV_PRESETS.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                size="xs"
                variant="outline"
                onClick={() => processWithConfig(config)}
                disabled={isBusy(status.phase)}
                className="text-xs"
              >
                Refresh
              </Button>
              <Button
                size="xs"
                variant="outline"
                onClick={() => setAdvancedOpen(true)}
                disabled={isBusy(status.phase)}
                className="text-xs gap-1"
              >
                <RiSettings3Line className="size-3.5" />
                Advanced
              </Button>
            </div>
          </div>

          {/* ── Progress (only when busy) ── */}
          {isBusy(status.phase) ? (
            <div className="shrink-0">
              <Progress value={status.progress} className="h-1 rounded-none" />
              <div className="flex items-center justify-between gap-3 border-b border-border/30 bg-muted/20 px-3 py-1 text-xs text-muted-foreground">
                <p>{status.message}</p>
                <RiLoader4Line className="size-3 animate-spin" />
              </div>
            </div>
          ) : null}

          {/* ── Error / Warning banners ── */}
          {error ? (
            <div className="shrink-0 border-b border-destructive/20 px-3 py-2">
              <Alert variant="destructive">
                <RiAlertLine />
                <AlertTitle>Could not process this CSV</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          ) : null}

          {/* ── Spreadsheet / content area ── */}
          <div className="flex-1 overflow-auto">
            {activePreviewTab === "plan" ? (
              /* Export plan view */
              <div className="space-y-0 p-3">
                {(snapshot.exportPlan?.files ?? []).length === 0 ? (
                  <p className="py-12 text-center text-sm text-muted-foreground">
                    Refresh the preview to generate the export plan.
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    <p className="mb-3 text-xs text-muted-foreground">
                      {snapshot.exportPlan?.fileCount.toLocaleString()} files
                      will be exported
                    </p>
                    {snapshot.exportPlan?.files.map((file) => (
                      <div
                        key={file.fileName}
                        className="flex flex-wrap items-center justify-between gap-3 border border-border/40 px-4 py-2.5"
                      >
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">
                            {file.fileName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {file.rowCount.toLocaleString()} rows
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {formatBytes(file.approxBytes)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Spreadsheet table */
              <SpreadsheetTable
                headers={currentHeaders}
                rows={currentRows}
                startRow={currentStartRow}
                emptyLabel={
                  activePreviewTab === "output"
                    ? "Run a preview to see the processed rows."
                    : "Load a CSV to inspect its source rows."
                }
              />
            )}
          </div>

          {/* ── Footer: pagination ── */}
          {activePreviewTab !== "plan" && currentPreviewPage ? (
            <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-border/50 bg-background px-3 py-1">
              <span className="text-[11px] tabular-nums text-muted-foreground">
                {currentStartRow}–{currentEndRow} of{" "}
                {currentPreviewPage.totalMatches.toLocaleString()} rows
                {" · "}
                Page {currentPreviewPage.page}/{currentPreviewPage.totalPages}
              </span>

              <div className="flex items-center gap-1.5">
                {previewQueries[currentDataset] ? (
                  <button
                    className="text-[11px] text-muted-foreground underline underline-offset-2 hover:text-foreground"
                    onClick={() =>
                      handlePreviewQueryChange(currentDataset, "")
                    }
                  >
                    Clear search
                  </button>
                ) : null}
                <Select
                  value={String(previewPageSizes[currentDataset])}
                  onValueChange={(v) =>
                    handlePreviewPageSizeChange(currentDataset, v)
                  }
                >
                  <SelectTrigger className="h-6 w-[90px] text-[11px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25">25 rows</SelectItem>
                    <SelectItem value="50">50 rows</SelectItem>
                    <SelectItem value="100">100 rows</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() =>
                    requestPreview(currentDataset, {
                      page: currentPreviewPage.page - 1,
                    })
                  }
                  disabled={currentPreviewPage.page <= 1}
                >
                  Prev
                </Button>
                <Button
                  size="xs"
                  variant="outline"
                  onClick={() =>
                    requestPreview(currentDataset, {
                      page: currentPreviewPage.page + 1,
                    })
                  }
                  disabled={
                    currentPreviewPage.page >= currentPreviewPage.totalPages
                  }
                >
                  Next
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* ════════════════════════════════════════════════════════
          MODALS
          ════════════════════════════════════════════════════════ */}

      {/* ── How it works ── */}
      <Dialog open={howItWorksOpen} onOpenChange={setHowItWorksOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>How it works</DialogTitle>
            <DialogDescription>
              Three steps to a clean, import-ready CSV.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5 py-2">
            {[
              {
                step: "1",
                title: "Load a CSV",
                desc: "Drop a file or paste raw CSV text. The file stays in your browser — nothing is uploaded.",
              },
              {
                step: "2",
                title: "Review the output",
                desc: "A preset cleans, dedupes, and splits your data. Switch between source and output previews to check the result.",
              },
              {
                step: "3",
                title: "Download the result",
                desc: "Export a single cleaned CSV or a ZIP of smaller batch files, ready for import.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {item.step}
                </div>
                <div className="space-y-1">
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setHowItWorksOpen(false)}>Got it</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Advanced rules ── */}
      <Dialog open={advancedOpen} onOpenChange={setAdvancedOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Advanced rules</DialogTitle>
            <DialogDescription>
              Keep the first screen simple. Use this only when the preset needs
              a small adjustment.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-3">
              <p>Cleaning</p>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={config.clean.trimWhitespace}
                  onCheckedChange={(checked) =>
                    setConfig((c) => ({
                      ...c,
                      clean: { ...c.clean, trimWhitespace: checked === true },
                    }))
                  }
                />
                <span>Trim whitespace</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={config.clean.normalizeLineEndings}
                  onCheckedChange={(checked) =>
                    setConfig((c) => ({
                      ...c,
                      clean: {
                        ...c.clean,
                        normalizeLineEndings: checked === true,
                      },
                    }))
                  }
                />
                <span>Normalize line endings</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={config.clean.removeEmptyRows}
                  onCheckedChange={(checked) =>
                    setConfig((c) => ({
                      ...c,
                      clean: { ...c.clean, removeEmptyRows: checked === true },
                    }))
                  }
                />
                <span>Remove empty rows</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={config.clean.removeEmptyColumns}
                  onCheckedChange={(checked) =>
                    setConfig((c) => ({
                      ...c,
                      clean: {
                        ...c.clean,
                        removeEmptyColumns: checked === true,
                      },
                    }))
                  }
                />
                <span>Remove empty columns</span>
              </label>
            </div>

            <div className="space-y-3">
              <p>Dedupe</p>
              <Select
                value={config.dedupe.mode}
                onValueChange={(value) =>
                  setConfig((c) => ({
                    ...c,
                    dedupe: {
                      ...c.dedupe,
                      mode: value as DedupeMode,
                      enabled: value !== "none",
                    },
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="selected-columns">
                    Selected columns
                  </SelectItem>
                  <SelectItem value="full-row">Full row</SelectItem>
                  <SelectItem value="none">No dedupe</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={config.dedupe.keep}
                onValueChange={(value) =>
                  setConfig((c) => ({
                    ...c,
                    dedupe: {
                      ...c.dedupe,
                      keep: value as ProcessConfig["dedupe"]["keep"],
                    },
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first">Keep first match</SelectItem>
                  <SelectItem value="last">Keep last match</SelectItem>
                </SelectContent>
              </Select>
              {dedupeHeaders.length > 0 ? (
                <div className="grid gap-2 md:grid-cols-2">
                  {dedupeHeaders.map((header) => {
                    const active = config.dedupe.columns.includes(header)
                    return (
                      <label
                        key={header}
                        className="flex items-center gap-2"
                      >
                        <Checkbox
                          checked={active}
                          onCheckedChange={(checked) =>
                            setConfig((c) => ({
                              ...c,
                              dedupe: {
                                ...c.dedupe,
                                columns:
                                  checked === true
                                    ? [...c.dedupe.columns, header]
                                    : c.dedupe.columns.filter(
                                        (col) => col !== header
                                      ),
                              },
                            }))
                          }
                        />
                        <span>{header}</span>
                      </label>
                    )
                  })}
                </div>
              ) : null}
            </div>

            <div className="space-y-3">
              <p>Split</p>
              <Select
                value={config.split.mode}
                onValueChange={(value) =>
                  setConfig((c) => ({
                    ...c,
                    split: {
                      ...c.split,
                      enabled: value !== "none",
                      mode: value as ProcessConfig["split"]["mode"],
                    },
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="size">Approximate file size</SelectItem>
                  <SelectItem value="rows">Rows per file</SelectItem>
                  <SelectItem value="none">Single file</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="number"
                min={1}
                value={config.split.rowsPerFile}
                onChange={(e) =>
                  setConfig((c) => ({
                    ...c,
                    split: {
                      ...c.split,
                      rowsPerFile: Number(e.target.value) || 1,
                    },
                  }))
                }
                placeholder="Rows per file"
              />
              <Input
                type="number"
                min={1}
                value={Math.round(
                  config.split.approxBytesPerFile / (1024 * 1024)
                )}
                onChange={(e) =>
                  setConfig((c) => ({
                    ...c,
                    split: {
                      ...c.split,
                      approxBytesPerFile:
                        (Number(e.target.value) || 1) * 1024 * 1024,
                    },
                  }))
                }
                placeholder="MB per file"
              />
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={config.split.repeatHeader}
                  onCheckedChange={(checked) =>
                    setConfig((c) => ({
                      ...c,
                      split: {
                        ...c.split,
                        repeatHeader: checked === true,
                      },
                    }))
                  }
                />
                <span>Repeat the header row in every output file</span>
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAdvancedOpen(false)}>
              Close
            </Button>
            <Button
              onClick={() => {
                processWithConfig(config)
                setAdvancedOpen(false)
              }}
            >
              Apply changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Pro unlock ── */}
      <Dialog open={proDialogOpen} onOpenChange={setProDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unlock larger exports</DialogTitle>
            <DialogDescription>
              Pro stays browser-only too. The token is stored locally so the app
              still does not need accounts.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p>
              Free mode is best for files up to{" "}
              {FREE_ROW_LIMIT.toLocaleString()} rows or{" "}
              {formatBytes(FREE_SIZE_LIMIT)}.
            </p>
            <Input
              value={licenseInput}
              onChange={(e) => setLicenseInput(e.target.value)}
              placeholder="Paste a local unlock token"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                window.localStorage.setItem(PRO_TOKEN_STORAGE_KEY, licenseInput)
                setProToken(licenseInput)
                setProDialogOpen(false)
              }}
            >
              Save token locally
            </Button>
            {checkoutUrl ? (
              <Button asChild>
                <a
                  href={checkoutUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    trackAnalyticsEvent("upgrade_clicked", {
                      reason: "checkout",
                    })
                  }
                >
                  Open hosted checkout
                </a>
              </Button>
            ) : (
              <Button disabled>
                Add `PUBLIC_FIXMYIMPORT_PRO_URL` to enable checkout
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
