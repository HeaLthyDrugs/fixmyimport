import {
  buildSessionSnapshot,
  exportProcessedDataset,
  parseCsvText,
  processParsedDataset,
} from "./engine"
import type {
  CsvWorkerRequest,
  CsvWorkerResponse,
  CsvWorkerState,
} from "./types"

export async function handleCsvWorkerRequest(
  state: CsvWorkerState,
  request: CsvWorkerRequest
): Promise<{ state: CsvWorkerState; responses: CsvWorkerResponse[] }> {
  if (request.type === "cancel") {
    return {
      state,
      responses: [{ type: "cancelled" }],
    }
  }

  if (request.type === "parse") {
    const parsed = parseCsvText(request.payload.text, request.payload.fileName)

    return {
      state: {
        parsed,
      },
      responses: [
        {
          type: "status",
          payload: {
            phase: "parsing",
            progress: 40,
            message: "Reading your CSV locally",
          },
        },
        {
          type: "parsed",
          payload: buildSessionSnapshot(parsed),
        },
        {
          type: "status",
          payload: {
            phase: "idle",
            progress: 100,
            message: "CSV ready for review",
          },
        },
      ],
    }
  }

  if (!state.parsed) {
    throw new Error("Load a CSV first so FixMyImport has something to process.")
  }

  if (request.type === "process") {
    const processed = processParsedDataset(state.parsed, request.payload)

    return {
      state: {
        ...state,
        processed,
      },
      responses: [
        {
          type: "status",
          payload: {
            phase: "processing",
            progress: 55,
            message: "Applying your cleanup rules",
          },
        },
        {
          type: "processed",
          payload: buildSessionSnapshot(state.parsed, processed),
        },
        {
          type: "status",
          payload: {
            phase: "idle",
            progress: 100,
            message: "Preview refreshed",
          },
        },
      ],
    }
  }

  const processed =
    state.processed ??
    processParsedDataset(state.parsed, request.payload.config)
  const artifacts = await exportProcessedDataset(
    processed,
    request.payload.config,
    request.payload.includeAuditCsv
  )

  return {
    state: {
      ...state,
      processed,
    },
    responses: [
      {
        type: "status",
        payload: {
          phase: "exporting",
          progress: 80,
          message: "Packing your output files",
        },
      },
      {
        type: "exported",
        payload: artifacts,
      },
      {
        type: "status",
        payload: {
          phase: "idle",
          progress: 100,
          message: "Files are ready to download",
        },
      },
    ],
  }
}
