import { describe, expect, it } from "vitest"
import {
  binaryToText,
  computeBinaryStats,
  getAlternateRepresentations,
  getCharacterBreakdown,
  textToBinary,
} from "./binary"

describe("textToBinary", () => {
  it("converts simple ASCII string to 8-bit space-separated binary", () => {
    const result = textToBinary("Hi")
    // 'H' is 72 (01001000), 'i' is 105 (01101001)
    expect(result).toBe("01001000 01101001")
  })

  it("handles '0b' delimiter format", () => {
    const result = textToBinary("Hi", { delimiter: "0b" })
    expect(result).toBe("0b01001000 0b01101001")
  })

  it("handles 'none' delimiter format", () => {
    const result = textToBinary("Hi", { delimiter: "none" })
    expect(result).toBe("0100100001101001")
  })

  it("handles 'comma' and 'newline' delimiters", () => {
    expect(textToBinary("Hi", { delimiter: "comma" })).toBe(
      "01001000, 01101001"
    )
    expect(textToBinary("Hi", { delimiter: "newline" })).toBe(
      "01001000\n01101001"
    )
  })

  it("handles UTF-8 multi-byte characters like emojis and accents", () => {
    const result = textToBinary("🚀")
    // Rocket emoji is 4 bytes in UTF-8: 0xF0 0x9F 0x9A 0x80
    // F0 = 11110000, 9F = 10011111, 9A = 10011010, 80 = 10000000
    expect(result).toBe("11110000 10011111 10011010 10000000")
  })

  it("returns empty string for empty input", () => {
    expect(textToBinary("")).toBe("")
  })
})

describe("binaryToText", () => {
  it("converts standard space-separated binary to text", () => {
    const { text, invalidCharacters } = binaryToText("01001000 01101001")
    expect(text).toBe("Hi")
    expect(invalidCharacters).toEqual([])
  })

  it("converts continuous binary stream without spaces", () => {
    const { text } = binaryToText("0100100001101001")
    expect(text).toBe("Hi")
  })

  it("handles 0b prefixes", () => {
    const { text } = binaryToText("0b01001000 0b01101001")
    expect(text).toBe("Hi")
  })

  it("decodes multi-byte UTF-8 emoji binary", () => {
    const { text } = binaryToText("11110000 10011111 10011010 10000000")
    expect(text).toBe("🚀")
  })

  it("detects invalid characters", () => {
    const { text, invalidCharacters } = binaryToText("01001000 01101001 abc 2")
    expect(text).toBe("Hi")
    expect(invalidCharacters).toContain("a")
    expect(invalidCharacters).toContain("b")
    expect(invalidCharacters).toContain("c")
    expect(invalidCharacters).toContain("2")
  })

  it("handles empty binary gracefully", () => {
    expect(binaryToText("").text).toBe("")
    expect(binaryToText("   ").text).toBe("")
  })
})

describe("roundtrip", () => {
  it("preserves complex multilingual and symbolic text accurately", () => {
    const original = "Hello, World! 🌍 नमस्ते Привет 12345 !@#$%"
    const binary = textToBinary(original)
    const { text } = binaryToText(binary)
    expect(text).toBe(original)
  })
})

describe("computeBinaryStats and representations", () => {
  it("computes stats accurately", () => {
    const text = "Hi"
    const binary = "01001000 01101001"
    const stats = computeBinaryStats(text, binary)

    expect(stats.charCount).toBe(2)
    expect(stats.wordCount).toBe(1)
    expect(stats.byteCount).toBe(2)
    expect(stats.bitCount).toBe(16)
    // 01001000 has two 1s, six 0s; 01101001 has four 1s, four 0s. Total: 6 ones, 10 zeros
    expect(stats.oneCount).toBe(6)
    expect(stats.zeroCount).toBe(10)
  })

  it("computes alternate representations", () => {
    const text = "Hi"
    const reps = getAlternateRepresentations(text)
    expect(reps.hex).toBe("48 69")
    expect(reps.decimal).toBe("72 105")
    expect(reps.base64).toBe("SGk=")
  })

  it("computes character breakdown", () => {
    const items = getCharacterBreakdown("A")
    expect(items.length).toBe(1)
    expect(items[0].char).toBe("A")
    expect(items[0].codePoint).toBe(65)
    expect(items[0].binary).toBe("01000001")
    expect(items[0].hex).toBe("41")
    expect(items[0].decimal).toBe(65)
  })
})
