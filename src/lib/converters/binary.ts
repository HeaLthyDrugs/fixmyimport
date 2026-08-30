export type BinaryDelimiter = "space" | "none" | "0b" | "comma" | "newline"

export type BinaryEncoding = "utf-8" | "ascii" | "utf-16"

export interface TextToBinaryOptions {
  delimiter?: BinaryDelimiter
  encoding?: BinaryEncoding
  bitWidth?: 7 | 8 | 16
}

export interface BinaryToTextOptions {
  encoding?: BinaryEncoding
  bitWidth?: 7 | 8 | 16
}

export interface BinaryStats {
  charCount: number
  wordCount: number
  byteCount: number
  bitCount: number
  zeroCount: number
  oneCount: number
  lineCount: number
}

export interface ByteBreakdownItem {
  char: string
  codePoint: number
  binary: string
  hex: string
  decimal: number
  octal: string
}

/**
 * Converts a text string to a binary string representation.
 */
export function textToBinary(
  text: string,
  options: TextToBinaryOptions = {}
): string {
  if (!text) return ""

  const { delimiter = "space", encoding = "utf-8", bitWidth = 8 } = options

  const binaryTokens: string[] = []

  if (encoding === "utf-8") {
    const encoder = new TextEncoder()
    const bytes = encoder.encode(text)

    for (let i = 0; i < bytes.length; i++) {
      const bin = bytes[i].toString(2).padStart(bitWidth === 16 ? 16 : 8, "0")
      binaryTokens.push(bin)
    }
  } else if (encoding === "ascii") {
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i)
      const width = bitWidth === 7 ? 7 : bitWidth === 16 ? 16 : 8
      const bin = (code & (width === 7 ? 0x7f : 0xff))
        .toString(2)
        .padStart(width, "0")
      binaryTokens.push(bin)
    }
  } else if (encoding === "utf-16") {
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i)
      const bin = code.toString(2).padStart(16, "0")
      binaryTokens.push(bin)
    }
  }

  return formatBinaryTokens(binaryTokens, delimiter)
}

/**
 * Converts a binary string to text.
 */
export function binaryToText(
  binary: string,
  options: BinaryToTextOptions = {}
): { text: string; error?: string; invalidCharacters: string[] } {
  if (!binary.trim()) {
    return { text: "", invalidCharacters: [] }
  }

  const { encoding = "utf-8", bitWidth = 8 } = options

  // Find any character that isn't 0, 1, or whitespace/common delimiters
  const invalidCharSet = new Set<string>()
  const cleanChars: string[] = []

  // Strip prefixes like 0b or 0B
  const normalized = binary.replace(/\b0[bB]/g, "")

  for (let i = 0; i < normalized.length; i++) {
    const ch = normalized[i]
    if (ch === "0" || ch === "1") {
      cleanChars.push(ch)
    } else if (/[\s,;:|\-_\\/]/.test(ch)) {
      // separator - treat as token boundary if needed
      cleanChars.push(" ")
    } else {
      invalidCharSet.add(ch)
    }
  }

  const invalidCharacters = Array.from(invalidCharSet)

  // Split into tokens
  const rawString = cleanChars.join("")
  const chunks = rawString
    .split(/\s+/)
    .filter(Boolean)
    .flatMap((chunk) => {
      // If chunk is longer than bitWidth and no spaces were used, split chunk into chunks of bitWidth
      const width = encoding === "utf-16" ? 16 : bitWidth === 7 ? 7 : 8
      if (chunk.length > width) {
        const sub: string[] = []
        for (let i = 0; i < chunk.length; i += width) {
          sub.push(chunk.slice(i, i + width))
        }
        return sub
      }
      return [chunk]
    })

  if (chunks.length === 0) {
    return { text: "", invalidCharacters }
  }

  const width = encoding === "utf-16" ? 16 : bitWidth === 7 ? 7 : 8
  const validByteNumbers: number[] = []

  for (const chunk of chunks) {
    if (!chunk) continue
    // Pad left if slightly short, or parse directly
    const padded = chunk.length < width ? chunk.padStart(width, "0") : chunk
    const parsed = parseInt(padded, 2)
    if (!isNaN(parsed)) {
      validByteNumbers.push(parsed)
    }
  }

  let text = ""
  let error: string | undefined

  try {
    if (encoding === "utf-8") {
      const uint8 = new Uint8Array(validByteNumbers)
      const decoder = new TextDecoder("utf-8", { fatal: false })
      text = decoder.decode(uint8)
    } else if (encoding === "ascii") {
      text = validByteNumbers
        .map((num) => String.fromCharCode(num & 0x7f))
        .join("")
    } else if (encoding === "utf-16") {
      text = String.fromCharCode(...validByteNumbers)
    }
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to decode binary data."
  }

  return { text, error, invalidCharacters }
}

/**
 * Format binary tokens according to the chosen delimiter.
 */
export function formatBinaryTokens(
  tokens: string[],
  delimiter: BinaryDelimiter
): string {
  switch (delimiter) {
    case "space":
      return tokens.join(" ")
    case "none":
      return tokens.join("")
    case "0b":
      return tokens.map((t) => `0b${t}`).join(" ")
    case "comma":
      return tokens.join(", ")
    case "newline":
      return tokens.join("\n")
    default:
      return tokens.join(" ")
  }
}

/**
 * Compute statistics for text and binary data.
 */
export function computeBinaryStats(text: string, binary: string): BinaryStats {
  const charCount = Array.from(text).length
  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const lines = text ? text.split(/\r\n|\r|\n/).length : 0

  const encoder = new TextEncoder()
  const byteCount = encoder.encode(text).length

  let zeroCount = 0
  let oneCount = 0

  for (let i = 0; i < binary.length; i++) {
    if (binary[i] === "0") zeroCount++
    else if (binary[i] === "1") oneCount++
  }

  const bitCount = zeroCount + oneCount

  return {
    charCount,
    wordCount: words,
    byteCount,
    bitCount,
    zeroCount,
    oneCount,
    lineCount: lines,
  }
}

/**
 * Returns alternative representations for text (Hex, Base64, Octal, Decimal).
 */
export function getAlternateRepresentations(text: string): {
  hex: string
  decimal: string
  octal: string
  base64: string
} {
  if (!text) {
    return { hex: "", decimal: "", octal: "", base64: "" }
  }

  const encoder = new TextEncoder()
  const bytes = encoder.encode(text)

  const hexArray: string[] = []
  const decArray: string[] = []
  const octArray: string[] = []

  for (let i = 0; i < bytes.length; i++) {
    const b = bytes[i]
    hexArray.push(b.toString(16).padStart(2, "0").toUpperCase())
    decArray.push(b.toString(10))
    octArray.push(b.toString(8).padStart(3, "0"))
  }

  let base64: string
  try {
    // UTF-8 safe base64
    const binString = Array.from(bytes, (byte) =>
      String.fromCharCode(byte)
    ).join("")
    base64 = btoa(binString)
  } catch {
    base64 = ""
  }

  return {
    hex: hexArray.join(" "),
    decimal: decArray.join(" "),
    octal: octArray.join(" "),
    base64,
  }
}

/**
 * Generate a detailed character-by-character breakdown.
 */
export function getCharacterBreakdown(
  text: string,
  maxChars = 60
): ByteBreakdownItem[] {
  if (!text) return []

  const chars = Array.from(text).slice(0, maxChars)
  const items: ByteBreakdownItem[] = []

  for (const ch of chars) {
    const codePoint = ch.codePointAt(0) ?? 0
    const encoder = new TextEncoder()
    const bytes = encoder.encode(ch)

    const binaryStr = Array.from(bytes)
      .map((b) => b.toString(2).padStart(8, "0"))
      .join(" ")

    const hexStr = Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0").toUpperCase())
      .join(" ")

    const decimalNum = codePoint
    const octalStr = Array.from(bytes)
      .map((b) => b.toString(8).padStart(3, "0"))
      .join(" ")

    items.push({
      char:
        ch === " "
          ? "␣ (space)"
          : ch === "\n"
            ? "↵ (newline)"
            : ch === "\t"
              ? "⇥ (tab)"
              : ch,
      codePoint,
      binary: binaryStr,
      hex: hexStr,
      decimal: decimalNum,
      octal: octalStr,
    })
  }

  return items
}
