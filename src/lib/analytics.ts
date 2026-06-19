declare global {
  interface Window {
    plausible?: (
      eventName: string,
      options?: {
        props?: Record<string, string | number | boolean>
      }
    ) => void
  }
}

export function bucketFileSize(bytes: number) {
  if (bytes < 1_000_000) {
    return "<1MB"
  }

  if (bytes < 5_000_000) {
    return "1-5MB"
  }

  if (bytes < 25_000_000) {
    return "5-25MB"
  }

  return "25MB+"
}

export function trackAnalyticsEvent(
  eventName: string,
  props: Record<string, string | number | boolean> = {}
) {
  if (typeof window === "undefined") {
    return
  }

  window.dispatchEvent(
    new CustomEvent("fixmyimport:analytics", {
      detail: {
        eventName,
        props,
      },
    })
  )

  window.plausible?.(eventName, { props })
}
