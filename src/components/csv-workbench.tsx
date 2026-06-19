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
  RiDownload2Line,
  RiFileUploadLine,
  RiLoader4Line,
  RiSettings3Line,
} from "@remixicon/react"

import { bucketFileSize, trackAnalyticsEvent } from "@/lib/analytics"
import {
  applyPresetToSplitOptions,
  CSV_PRESETS,
  DEFAULT_PROCESS_CONFIG,
  getPresetById,
} from "@/lib/csv/presets"
import { describeDatasetStats, formatBytes } from "@/lib/csv/engine"
import { SAMPLE_CSV, SAMPLE_CSV_FILE_NAME } from "@/lib/csv/sample"
import type {
  CsvSessionSnapshot,
  CsvWorkerResponse,
  DedupeMode,
  ExportArtifact,
  ProcessConfig,
} from "@/lib/csv/types"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

const FREE_ROW_LIMIT = 250_000
const FREE_SIZE_LIMIT = 25 * 1024 * 1024
const PRO_TOKEN_STORAGE_KEY = "fixmyimport.pro.token"

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

function chooseDefaultDedupeColumns(headers: string[]) {
  const emailHeader = headers.find((header) => /email/i.test(header))

  if (emailHeader) {
    return [emailHeader]
  }

  const idHeader = headers.find((header) => /\b(id|sku|handle)\b/i.test(header))

  if (idHeader) {
    return [idHeader]
  }

  return headers[0] ? [headers[0]] : []
}

function isBusy(phase: WorkStatus["phase"]) {
  return phase !== "idle"
}

function downloadArtifact(artifact: ExportArtifact) {
  const payload =
    typeof artifact.payload === "string"
      ? new Blob([artifact.payload], { type: artifact.mimeType })
      : new Blob([artifact.payload], { type: artifact.mimeType })

  const url = URL.createObjectURL(payload)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = artifact.fileName
  anchor.click()
  URL.revokeObjectURL(url)
}

function PreviewTable({
  emptyLabel,
  headers,
  rows,
}: {
  emptyLabel: string
  headers: string[]
  rows: string[][]
}) {
  if (headers.length === 0) {
    return <p>{emptyLabel}</p>
  }

  return (
    <ScrollArea>
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={headers.length}>{emptyLabel}</TableCell>
            </TableRow>
          ) : (
            rows.map((row, rowIndex) => (
              <TableRow key={`${rowIndex}-${row.join("-")}`}>
                {headers.map((header, columnIndex) => (
                  <TableCell key={`${header}-${rowIndex}-${columnIndex}`}>
                    {row[columnIndex] || " "}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}

export function CsvWorkbench() {
  const [config, setConfig] = useState(DEFAULT_PROCESS_CONFIG)
  const [snapshot, setSnapshot] = useState<CsvSessionSnapshot | null>(null)
  const [status, setStatus] = useState<WorkStatus>(DEFAULT_STATUS)
  const [error, setError] = useState("")
  const [pasteValue, setPasteValue] = useState("")
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [proDialogOpen, setProDialogOpen] = useState(false)
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

  const workerRef = useRef<Worker | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const checkoutUrl = import.meta.env.PUBLIC_FIXMYIMPORT_PRO_URL
  const deferredRows = useDeferredValue(snapshot?.processedPreview?.rows ?? [])
  const proEnabled = proToken.trim().length > 0
  const preset = getPresetById(config.presetId)
  const sourceStats = snapshot?.sourceStats
  const processedStats = snapshot?.processedStats
  const sourceHeaders = snapshot?.sourcePreview.headers ?? []
  const dedupeHeaders =
    sourceHeaders.length > 0
      ? sourceHeaders
      : chooseDefaultDedupeColumns(sourceHeaders)

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
          setError("")
        })

        processWithConfig(nextConfig)
        return
      }

      if (message.type === "processed") {
        startTransition(() => {
          setSnapshot(message.payload)
          setError("")
        })

        trackAnalyticsEvent("preview_shown", {
          preset: config.presetId,
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
      {
        type: "module",
      }
    )
    workerRef.current.onmessage = handleWorkerResponse

    return () => {
      workerRef.current?.terminate()
      workerRef.current = null
    }
  }, [])

  const submitSource = async (fileName: string, text: string) => {
    workerRef.current?.postMessage({
      type: "parse",
      payload: {
        fileName,
        text,
      },
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
    if (!file) {
      return
    }

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
    trackAnalyticsEvent("preset_selected", {
      preset: value,
    })

    if (snapshot) {
      processWithConfig(nextConfig)
    }
  }

  const handleExport = () => {
    if (!snapshot) {
      return
    }

    const sourceTooLarge =
      snapshot.sourceStats.rowCount > FREE_ROW_LIMIT ||
      snapshot.sourceStats.approxBytes > FREE_SIZE_LIMIT

    if (!proEnabled && sourceTooLarge) {
      setProDialogOpen(true)
      trackAnalyticsEvent("upgrade_clicked", {
        reason: "large_file",
      })
      return
    }

    workerRef.current?.postMessage({
      type: "export",
      payload: {
        config,
        includeAuditCsv: proEnabled,
      },
    })
    setStatus({
      phase: "exporting",
      progress: 65,
      message: "Packing your files for download.",
    })
  }

  return (
    <>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Local processing</Badge>
              <Badge variant="outline">No account</Badge>
              <Badge variant="outline">{preset.name}</Badge>
            </div>
            <CardTitle>Start with one CSV.</CardTitle>
            <p>
              Load a file, let the preset shape the output, then adjust the
              advanced rules only if you need them.
            </p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upload">
              <TabsList>
                <TabsTrigger value="upload">Upload file</TabsTrigger>
                <TabsTrigger value="paste">Paste CSV</TabsTrigger>
              </TabsList>
              <TabsContent value="upload">
                <div className="space-y-4">
                  <div
                    className="space-y-4 border border-dashed p-6"
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={async (event) => {
                      event.preventDefault()
                      await handleFileSelection(event.dataTransfer.files?.[0])
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <RiFileUploadLine />
                      <p>Drop a CSV here or choose a file.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button onClick={() => fileInputRef.current?.click()}>
                        Choose CSV
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setPasteValue(SAMPLE_CSV)
                          void submitSource(SAMPLE_CSV_FILE_NAME, SAMPLE_CSV)
                        }}
                      >
                        Use sample
                      </Button>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".csv,text/csv"
                      className="hidden"
                      onChange={(event) =>
                        void handleFileSelection(event.target.files?.[0])
                      }
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="paste">
                <div className="space-y-4">
                  <Textarea
                    rows={10}
                    value={pasteValue}
                    onChange={(event) => setPasteValue(event.target.value)}
                    placeholder="Email,First Name,Last Name"
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
              </TabsContent>
            </Tabs>

            <div className="mt-6 space-y-3">
              <Progress value={status.progress} />
              <div className="flex items-center justify-between gap-3">
                <p>{status.message}</p>
                {isBusy(status.phase) ? (
                  <RiLoader4Line className="animate-spin" />
                ) : null}
              </div>
            </div>

            {error ? (
              <div className="mt-4">
                <Alert variant="destructive">
                  <RiAlertLine />
                  <AlertTitle>Could not process this CSV</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {!snapshot ? (
          <Card>
            <CardHeader>
              <CardTitle>How this works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <p>1. Load a CSV.</p>
                  <p>The file stays in your browser.</p>
                </div>
                <div>
                  <p>2. Review the output.</p>
                  <p>
                    The preset starts with a conservative import-ready plan.
                  </p>
                </div>
                <div>
                  <p>3. Download the result.</p>
                  <p>Export one CSV or a ZIP of smaller batch files.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Current file</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>{snapshot.fileName}</p>
                  <div className="flex flex-wrap gap-2">
                    {describeDatasetStats(
                      sourceStats ?? snapshot.sourceStats
                    ).map((stat) => (
                      <Badge key={stat} variant="outline">
                        {stat}
                      </Badge>
                    ))}
                    {processedStats ? (
                      <Badge variant="outline">
                        {processedStats.rowCount.toLocaleString()} output rows
                      </Badge>
                    ) : null}
                    {snapshot.exportPlan ? (
                      <Badge variant="outline">
                        {snapshot.exportPlan.fileCount.toLocaleString()} files
                      </Badge>
                    ) : null}
                  </div>
                  <div className="grid gap-4 md:grid-cols-[minmax(0,280px)_1fr] md:items-end">
                    <div className="space-y-2">
                      <p>Preset</p>
                      <Select
                        value={config.presetId}
                        onValueChange={handlePresetChange}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CSV_PRESETS.map((presetOption) => (
                            <SelectItem
                              key={presetOption.id}
                              value={presetOption.id}
                            >
                              {presetOption.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={handleExport}
                        disabled={isBusy(status.phase)}
                      >
                        <RiDownload2Line />
                        Download result
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => processWithConfig(config)}
                        disabled={isBusy(status.phase)}
                      >
                        Refresh preview
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setAdvancedOpen(true)}
                        disabled={isBusy(status.phase)}
                      >
                        <RiSettings3Line />
                        Advanced rules
                      </Button>
                    </div>
                  </div>
                  <p>{preset.summary}</p>
                  {snapshot.warnings.length > 0 ? (
                    <Alert>
                      <RiAlertLine />
                      <AlertTitle>Before you import</AlertTitle>
                      <AlertDescription>
                        {snapshot.warnings.slice(0, 2).join(" ")}
                      </AlertDescription>
                    </Alert>
                  ) : null}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="output">
                  <TabsList>
                    <TabsTrigger value="output">Output preview</TabsTrigger>
                    <TabsTrigger value="source">Source preview</TabsTrigger>
                    <TabsTrigger value="plan">Export plan</TabsTrigger>
                  </TabsList>
                  <TabsContent value="output">
                    <PreviewTable
                      emptyLabel="Run a preview to see the processed rows."
                      headers={snapshot.processedPreview?.headers ?? []}
                      rows={deferredRows}
                    />
                  </TabsContent>
                  <TabsContent value="source">
                    <PreviewTable
                      emptyLabel="Load a CSV to inspect its source rows."
                      headers={snapshot.sourcePreview.headers}
                      rows={snapshot.sourcePreview.rows}
                    />
                  </TabsContent>
                  <TabsContent value="plan">
                    <div className="space-y-3">
                      {(snapshot.exportPlan?.files ?? []).length === 0 ? (
                        <p>Refresh the preview to generate the export plan.</p>
                      ) : (
                        snapshot.exportPlan?.files.map((file) => (
                          <div
                            key={file.fileName}
                            className="flex flex-wrap items-center justify-between gap-2 border p-4"
                          >
                            <div>
                              <p>{file.fileName}</p>
                              <p>{file.rowCount.toLocaleString()} rows</p>
                            </div>
                            <Badge variant="outline">
                              {formatBytes(file.approxBytes)}
                            </Badge>
                          </div>
                        ))
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </>
        )}
      </div>

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
                    setConfig((currentConfig) => ({
                      ...currentConfig,
                      clean: {
                        ...currentConfig.clean,
                        trimWhitespace: checked === true,
                      },
                    }))
                  }
                />
                <span>Trim whitespace</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={config.clean.normalizeLineEndings}
                  onCheckedChange={(checked) =>
                    setConfig((currentConfig) => ({
                      ...currentConfig,
                      clean: {
                        ...currentConfig.clean,
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
                    setConfig((currentConfig) => ({
                      ...currentConfig,
                      clean: {
                        ...currentConfig.clean,
                        removeEmptyRows: checked === true,
                      },
                    }))
                  }
                />
                <span>Remove empty rows</span>
              </label>
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={config.clean.removeEmptyColumns}
                  onCheckedChange={(checked) =>
                    setConfig((currentConfig) => ({
                      ...currentConfig,
                      clean: {
                        ...currentConfig.clean,
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
                  setConfig((currentConfig) => ({
                    ...currentConfig,
                    dedupe: {
                      ...currentConfig.dedupe,
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
                  setConfig((currentConfig) => ({
                    ...currentConfig,
                    dedupe: {
                      ...currentConfig.dedupe,
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
                      <label key={header} className="flex items-center gap-2">
                        <Checkbox
                          checked={active}
                          onCheckedChange={(checked) =>
                            setConfig((currentConfig) => ({
                              ...currentConfig,
                              dedupe: {
                                ...currentConfig.dedupe,
                                columns:
                                  checked === true
                                    ? [...currentConfig.dedupe.columns, header]
                                    : currentConfig.dedupe.columns.filter(
                                        (column) => column !== header
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
                  setConfig((currentConfig) => ({
                    ...currentConfig,
                    split: {
                      ...currentConfig.split,
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
                onChange={(event) =>
                  setConfig((currentConfig) => ({
                    ...currentConfig,
                    split: {
                      ...currentConfig.split,
                      rowsPerFile: Number(event.target.value) || 1,
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
                onChange={(event) =>
                  setConfig((currentConfig) => ({
                    ...currentConfig,
                    split: {
                      ...currentConfig.split,
                      approxBytesPerFile:
                        (Number(event.target.value) || 1) * 1024 * 1024,
                    },
                  }))
                }
                placeholder="MB per file"
              />
              <label className="flex items-center gap-2">
                <Checkbox
                  checked={config.split.repeatHeader}
                  onCheckedChange={(checked) =>
                    setConfig((currentConfig) => ({
                      ...currentConfig,
                      split: {
                        ...currentConfig.split,
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
              onChange={(event) => setLicenseInput(event.target.value)}
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
