import { describe, expect, it } from "vitest"

import { DEFAULT_PROCESS_CONFIG } from "@/lib/csv/presets"
import { handleCsvWorkerRequest } from "@/lib/csv/worker-runtime"

const csvInput = `Email,Name
ava@example.com,Ava
ava@example.com,Ava
ben@example.com,Ben`

describe("csv worker runtime", () => {
  it("parses and processes a CSV session", async () => {
    const parsed = await handleCsvWorkerRequest(
      {},
      {
        type: "parse",
        payload: {
          fileName: "contacts.csv",
          text: csvInput,
        },
      }
    )

    expect(
      parsed.responses.some((response) => response.type === "parsed")
    ).toBe(true)

    const processed = await handleCsvWorkerRequest(parsed.state, {
      type: "process",
      payload: {
        ...DEFAULT_PROCESS_CONFIG,
        dedupe: {
          ...DEFAULT_PROCESS_CONFIG.dedupe,
          columns: ["Email"],
        },
      },
    })

    const processedMessage = processed.responses.find(
      (response) => response.type === "processed"
    )

    expect(processedMessage?.type).toBe("processed")

    if (processedMessage?.type === "processed") {
      expect(processedMessage.payload.audit?.duplicateRowsRemoved).toBe(1)
    }
  })

  it("returns searchable preview pages from worker state", async () => {
    const parsed = await handleCsvWorkerRequest(
      {},
      {
        type: "parse",
        payload: {
          fileName: "contacts.csv",
          text: csvInput,
        },
      }
    )

    const previewed = await handleCsvWorkerRequest(parsed.state, {
      type: "preview",
      payload: {
        dataset: "source",
        query: "ava",
        page: 1,
        pageSize: 25,
      },
    })

    const previewMessage = previewed.responses.find(
      (response) => response.type === "previewed"
    )

    expect(previewMessage?.type).toBe("previewed")

    if (previewMessage?.type === "previewed") {
      expect(previewMessage.payload.preview.totalMatches).toBe(2)
      expect(previewMessage.payload.preview.rows).toHaveLength(2)
    }
  })
})
