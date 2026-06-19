import { describe, expect, it } from "vitest"

import { DEFAULT_PROCESS_CONFIG } from "@/lib/csv/presets"
import {
  buildPreviewPage,
  exportProcessedDataset,
  parseCsvText,
  processParsedDataset,
} from "@/lib/csv/engine"

const csvInput = `Email,First Name,City
ava@example.com,Ava,Delhi
ava@example.com,Ava,Delhi
,,
ben@example.com,Ben,Mumbai
`

describe("csv engine", () => {
  it("parses CSV input and infers headers", () => {
    const parsed = parseCsvText(csvInput, "contacts.csv")

    expect(parsed.headers).toEqual(["Email", "First Name", "City"])
    expect(parsed.rows).toHaveLength(5)
    expect(parsed.stats.hasHeader).toBe(true)
  })

  it("cleans, dedupes, and removes empty rows", () => {
    const parsed = parseCsvText(csvInput, "contacts.csv")
    const processed = processParsedDataset(parsed, {
      ...DEFAULT_PROCESS_CONFIG,
      dedupe: {
        ...DEFAULT_PROCESS_CONFIG.dedupe,
        columns: ["Email"],
      },
      split: {
        ...DEFAULT_PROCESS_CONFIG.split,
        enabled: false,
        mode: "none",
      },
    })

    expect(processed.rows).toHaveLength(2)
    expect(processed.audit.duplicateRowsRemoved).toBe(1)
    expect(processed.audit.emptyRowsRemoved).toBe(2)
  })

  it("splits rows into multiple export files", async () => {
    const parsed = parseCsvText(
      `Email\none@example.com\ntwo@example.com\nthree@example.com\nfour@example.com`,
      "subscribers.csv"
    )
    const processed = processParsedDataset(parsed, {
      ...DEFAULT_PROCESS_CONFIG,
      dedupe: {
        ...DEFAULT_PROCESS_CONFIG.dedupe,
        enabled: false,
        mode: "none",
        columns: [],
      },
      split: {
        ...DEFAULT_PROCESS_CONFIG.split,
        enabled: true,
        mode: "rows",
        rowsPerFile: 2,
      },
    })
    const artifacts = await exportProcessedDataset(
      processed,
      {
        ...DEFAULT_PROCESS_CONFIG,
        split: {
          ...DEFAULT_PROCESS_CONFIG.split,
          enabled: true,
          mode: "rows",
          rowsPerFile: 2,
        },
      },
      true
    )

    expect(processed.exportPlan.fileCount).toBe(2)
    expect(artifacts[0]?.kind).toBe("zip")
  })

  it("builds searchable paginated preview pages", () => {
    const preview = buildPreviewPage(
      ["Email", "City"],
      [
        ["ava@example.com", "Delhi"],
        ["ben@example.com", "Mumbai"],
        ["cam@example.com", "Delhi"],
      ],
      "delhi",
      1,
      1
    )

    expect(preview.totalMatches).toBe(2)
    expect(preview.totalPages).toBe(2)
    expect(preview.rows).toEqual([["ava@example.com", "Delhi"]])
  })
})
