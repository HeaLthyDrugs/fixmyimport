import type { PresetDefinition, ProcessConfig, SplitOptions } from "./types"

export const CSV_PRESETS: PresetDefinition[] = [
  {
    id: "shopify",
    name: "Shopify import prep",
    audience: "Ecommerce ops",
    summary:
      "Conservative split defaults for product and customer import work.",
    defaultSplitMode: "size",
    recommendedRowsPerFile: 10000,
    recommendedBytesPerFile: 14 * 1024 * 1024,
    maxBytes: 15 * 1024 * 1024,
    warnings: [
      "Shopify CSV imports are easiest to recover when split into smaller, repeatable batches.",
      "Keep headers stable across all batch files before importing.",
    ],
    proNotes:
      "Best paired with size-based splits and downloadable audit exports.",
  },
  {
    id: "excel",
    name: "Excel guardrail",
    audience: "Analysts and ops",
    summary: "Stay below worksheet row limits before opening in Excel.",
    defaultSplitMode: "rows",
    recommendedRowsPerFile: 250000,
    recommendedBytesPerFile: 20 * 1024 * 1024,
    maxRows: 1048576,
    warnings: [
      "Excel has a hard worksheet row cap, so split large datasets early.",
    ],
  },
  {
    id: "mailchimp",
    name: "Mailchimp list import",
    audience: "Email marketers",
    summary: "Reduce duplicate contacts and keep list batches manageable.",
    defaultSplitMode: "size",
    recommendedRowsPerFile: 100000,
    recommendedBytesPerFile: 100 * 1024 * 1024,
    maxBytes: 200 * 1024 * 1024,
    warnings: [
      "Mailchimp imports are more reliable when very large lists are split into smaller files.",
    ],
  },
  {
    id: "hubspot",
    name: "HubSpot dedupe prep",
    audience: "CRM admins",
    summary: "Focus on exact-match cleanup before contact or company import.",
    defaultSplitMode: "rows",
    recommendedRowsPerFile: 50000,
    recommendedBytesPerFile: 18 * 1024 * 1024,
    warnings: [
      "Use selected-column dedupe with email or unique identifiers before import.",
    ],
  },
  {
    id: "salesforce",
    name: "Salesforce batch import",
    audience: "RevOps and CRM admins",
    summary: "Prepare smaller record batches for upload workflows.",
    defaultSplitMode: "rows",
    recommendedRowsPerFile: 50000,
    recommendedBytesPerFile: 80 * 1024 * 1024,
    maxRows: 50000,
    maxBytes: 100 * 1024 * 1024,
    warnings: [
      "Salesforce UI imports are smoother when batches are small and validated before upload.",
    ],
  },
]

export const DEFAULT_PRESET_ID = CSV_PRESETS[0].id

export const DEFAULT_PROCESS_CONFIG: ProcessConfig = {
  clean: {
    trimWhitespace: true,
    normalizeLineEndings: true,
    removeEmptyRows: true,
    removeEmptyColumns: true,
  },
  dedupe: {
    enabled: true,
    mode: "selected-columns",
    columns: [],
    keep: "first",
  },
  split: {
    enabled: true,
    mode: "size",
    rowsPerFile: 10000,
    approxBytesPerFile: 14 * 1024 * 1024,
    repeatHeader: true,
  },
  presetId: DEFAULT_PRESET_ID,
}

export function getPresetById(id: string) {
  return CSV_PRESETS.find((preset) => preset.id === id) ?? CSV_PRESETS[0]
}

export function applyPresetToSplitOptions(
  currentSplit: SplitOptions,
  presetId: string
): SplitOptions {
  const preset = getPresetById(presetId)

  return {
    ...currentSplit,
    enabled: true,
    mode: preset.defaultSplitMode,
    rowsPerFile: preset.recommendedRowsPerFile,
    approxBytesPerFile: preset.recommendedBytesPerFile,
    repeatHeader: true,
  }
}
