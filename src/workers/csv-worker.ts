/// <reference lib="webworker" />

import { handleCsvWorkerRequest } from "../lib/csv/worker-runtime"
import type { CsvWorkerRequest, CsvWorkerState } from "../lib/csv/types"

let state: CsvWorkerState = {}

self.onmessage = async (event: MessageEvent<CsvWorkerRequest>) => {
  try {
    const result = await handleCsvWorkerRequest(state, event.data)
    state = result.state

    for (const response of result.responses) {
      self.postMessage(response)
    }
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Something went wrong while handling this CSV."

    self.postMessage({
      type: "error",
      payload: {
        message,
      },
    })
  }
}
