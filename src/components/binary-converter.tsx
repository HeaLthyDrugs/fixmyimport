"use client"

import { useId, useMemo, useRef, useState } from "react"
import {
  RiArrowLeftLine,
  RiCheckLine,
  RiDeleteBinLine,
  RiDownloadLine,
  RiExchangeLine,
  RiFileCopyLine,
  RiInformationLine,
  RiSparklingLine,
  RiTableLine,
  RiUploadLine,
} from "@remixicon/react"

import {
  binaryToText,
  computeBinaryStats,
  getAlternateRepresentations,
  getCharacterBreakdown,
  textToBinary,
  type BinaryDelimiter,
  type BinaryEncoding,
} from "@/lib/converters/binary"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

type ConversionMode = "text-to-binary" | "binary-to-text"

const SAMPLE_TEXT = "Hello, World! 🚀"
const SAMPLE_BINARY =
  "01001000 01100101 01101100 01101100 01101111 00101100 00100000 01010111 01101111 01110010 01101100 01100100 00100001 00100000 11110000 10011111 10011010 10000000"

export function BinaryConverter() {
  const [mode, setMode] = useState<ConversionMode>("text-to-binary")
  const [inputText, setInputText] = useState(SAMPLE_TEXT)
  const [delimiter, setDelimiter] = useState<BinaryDelimiter>("space")
  const [encoding, setEncoding] = useState<BinaryEncoding>("utf-8")
  const [bitWidth, setBitWidth] = useState<7 | 8 | 16>(8)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<
    "converter" | "inspector" | "table"
  >("converter")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const fileInputId = useId()

  // Compute conversion result
  const conversionResult = useMemo(() => {
    if (mode === "text-to-binary") {
      const output = textToBinary(inputText, { delimiter, encoding, bitWidth })
      const stats = computeBinaryStats(inputText, output)
      const alt = getAlternateRepresentations(inputText)
      const breakdown = getCharacterBreakdown(inputText)
      return {
        output,
        stats,
        alt,
        breakdown,
        invalidChars: [] as string[],
        error: undefined,
      }
    } else {
      const { text, error, invalidCharacters } = binaryToText(inputText, {
        encoding,
        bitWidth,
      })
      const stats = computeBinaryStats(text, inputText)
      const alt = getAlternateRepresentations(text)
      const breakdown = getCharacterBreakdown(text)
      return {
        output: text,
        stats,
        alt,
        breakdown,
        invalidChars: invalidCharacters,
        error,
      }
    }
  }, [mode, inputText, delimiter, encoding, bitWidth])

  const handleCopy = async () => {
    if (!conversionResult.output) return
    try {
      await navigator.clipboard.writeText(conversionResult.output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  const handleSwap = () => {
    const currentOutput = conversionResult.output
    if (mode === "text-to-binary") {
      setMode("binary-to-text")
      setInputText(currentOutput)
    } else {
      setMode("text-to-binary")
      setInputText(currentOutput)
    }
  }

  const handleClear = () => {
    setInputText("")
  }

  const handleLoadSample = () => {
    if (mode === "text-to-binary") {
      setInputText(SAMPLE_TEXT)
    } else {
      setInputText(SAMPLE_BINARY)
    }
  }

  const handleDownload = () => {
    if (!conversionResult.output) return
    const filename =
      mode === "text-to-binary" ? "converted.bin" : "converted.txt"
    const mimeType =
      mode === "text-to-binary" ? "text/plain" : "text/plain;charset=utf-8"
    const blob = new Blob([conversionResult.output], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result
      if (typeof content === "string") {
        setInputText(content)
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/88 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <RiArrowLeftLine className="size-4" />
              <span>All Tools</span>
            </a>
            <span className="text-border">/</span>
            <h1 className="text-base font-semibold tracking-wide">
              Binary &lt;-&gt; Text Converter
            </h1>
            <Badge
              variant="outline"
              className="text-xs font-medium tracking-wide"
            >
              100% Client-Side
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLoadSample}
              className="h-8 gap-1.5 text-xs"
            >
              <RiSparklingLine className="size-3.5 text-amber-500" />
              <span className="hidden sm:inline">Load Sample</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-8 gap-1 text-xs text-muted-foreground hover:text-destructive"
            >
              <RiDeleteBinLine className="size-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        {/* Direction Switcher & Configuration Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border border-border/80 bg-muted/40 p-3 sm:p-4">
          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-1 border border-border bg-background p-1">
            <button
              type="button"
              onClick={() => setMode("text-to-binary")}
              className={`px-3 py-1.5 text-xs font-medium transition-all ${
                mode === "text-to-binary"
                  ? "bg-foreground font-semibold text-background shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Text to Binary
            </button>
            <button
              type="button"
              onClick={() => setMode("binary-to-text")}
              className={`px-3 py-1.5 text-xs font-medium transition-all ${
                mode === "binary-to-text"
                  ? "bg-foreground font-semibold text-background shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Binary to Text
            </button>
          </div>

          {/* Controls & Formatting Options */}
          <div className="flex flex-wrap items-center gap-3">
            {mode === "text-to-binary" && (
              <div className="flex items-center gap-2">
                <Label
                  htmlFor="delimiter-select"
                  className="text-xs whitespace-nowrap text-muted-foreground"
                >
                  Delimiter:
                </Label>
                <Select
                  value={delimiter}
                  onValueChange={(val) => setDelimiter(val as BinaryDelimiter)}
                >
                  <SelectTrigger
                    id="delimiter-select"
                    className="h-8 min-w-[120px] bg-background text-xs"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="space">Space (0100 0110)</SelectItem>
                    <SelectItem value="none">No Space</SelectItem>
                    <SelectItem value="0b">Prefix 0b (0b0100)</SelectItem>
                    <SelectItem value="comma">Comma (0100, 0110)</SelectItem>
                    <SelectItem value="newline">New Line</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Label
                htmlFor="encoding-select"
                className="text-xs whitespace-nowrap text-muted-foreground"
              >
                Encoding:
              </Label>
              <Select
                value={encoding}
                onValueChange={(val) => setEncoding(val as BinaryEncoding)}
              >
                <SelectTrigger
                  id="encoding-select"
                  className="h-8 min-w-[110px] bg-background text-xs"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utf-8">
                    UTF-8 (Standard & Emojis)
                  </SelectItem>
                  <SelectItem value="ascii">ASCII (7/8-bit)</SelectItem>
                  <SelectItem value="utf-16">UTF-16 (16-bit)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Label
                htmlFor="bitwidth-select"
                className="text-xs whitespace-nowrap text-muted-foreground"
              >
                Bits:
              </Label>
              <Select
                value={String(bitWidth)}
                onValueChange={(val) => setBitWidth(Number(val) as 7 | 8 | 16)}
              >
                <SelectTrigger
                  id="bitwidth-select"
                  className="h-8 min-w-[90px] bg-background text-xs"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="8">8-bit Byte</SelectItem>
                  <SelectItem value="7">7-bit ASCII</SelectItem>
                  <SelectItem value="16">16-bit Wide</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleSwap}
              title="Swap input & output"
              className="h-8 gap-1 bg-background text-xs hover:bg-muted"
            >
              <RiExchangeLine className="size-3.5" />
              <span>Swap</span>
            </Button>
          </div>
        </div>

        {/* Alerts for errors or invalid chars */}
        {conversionResult.invalidChars.length > 0 && (
          <Alert variant="destructive" className="py-2.5">
            <RiInformationLine className="size-4" />
            <AlertTitle className="text-xs font-semibold">
              Non-binary characters detected
            </AlertTitle>
            <AlertDescription className="text-xs">
              The input contains characters that are not 0 or 1:{" "}
              <code className="bg-destructive/20 px-1 py-0.5 font-mono font-bold">
                {conversionResult.invalidChars.slice(0, 10).join(" ")}
                {conversionResult.invalidChars.length > 10 ? " ..." : ""}
              </code>
              . These have been skipped during decoding.
            </AlertDescription>
          </Alert>
        )}

        {conversionResult.error && (
          <Alert variant="destructive" className="py-2.5">
            <RiInformationLine className="size-4" />
            <AlertTitle className="text-xs font-semibold">
              Decoding Error
            </AlertTitle>
            <AlertDescription className="text-xs">
              {conversionResult.error}
            </AlertDescription>
          </Alert>
        )}

        {/* Input & Output Dual Grid */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Input Box */}
          <div className="flex flex-col border border-border/80 bg-card shadow-xs">
            <div className="flex items-center justify-between border-b border-border/80 bg-muted/30 px-3.5 py-2">
              <span className="text-sm font-semibold tracking-wide text-foreground/90">
                {mode === "text-to-binary" ? "Input Text" : "Input Binary"}
              </span>
              <div className="flex items-center gap-2">
                <input
                  id={fileInputId}
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.bin,.dat,.csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="h-7 gap-1 px-2 text-[11px] text-muted-foreground hover:text-foreground"
                >
                  <RiUploadLine className="size-3.5" />
                  <span>Upload</span>
                </Button>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {inputText.length} chars
                </span>
              </div>
            </div>

            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                mode === "text-to-binary"
                  ? "Type or paste text here..."
                  : "Type or paste binary (e.g. 01001000 01101001)..."
              }
              className="min-h-[260px] resize-y border-0 p-3.5 font-mono text-xs leading-relaxed focus-visible:ring-0 focus-visible:ring-offset-0"
              spellCheck={false}
            />
          </div>

          {/* Output Box */}
          <div className="flex flex-col border border-border/80 bg-card shadow-xs">
            <div className="flex items-center justify-between border-b border-border/80 bg-muted/30 px-3.5 py-2">
              <span className="text-sm font-semibold tracking-wide text-foreground/90">
                {mode === "text-to-binary"
                  ? "Binary Output"
                  : "Decoded Text Output"}
              </span>
              <div className="flex items-center gap-1.5">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDownload}
                  disabled={!conversionResult.output}
                  className="h-7 gap-1 px-2 text-[11px] text-muted-foreground hover:text-foreground"
                >
                  <RiDownloadLine className="size-3.5" />
                  <span>Download</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  disabled={!conversionResult.output}
                  className={`h-7 gap-1 px-2.5 text-[11px] font-medium transition-colors ${
                    copied
                      ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                      : "bg-background"
                  }`}
                >
                  {copied ? (
                    <>
                      <RiCheckLine className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <RiFileCopyLine className="size-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </Button>
              </div>
            </div>

            <Textarea
              readOnly
              value={conversionResult.output}
              placeholder="Output will appear here automatically..."
              className="min-h-[260px] resize-y border-0 bg-muted/10 p-3.5 font-mono text-xs leading-relaxed focus-visible:ring-0 focus-visible:ring-offset-0"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Live Statistics Bar */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-6">
          <div className="border border-border/70 bg-card p-3">
            <div className="text-[11px] font-medium text-muted-foreground">
              Characters
            </div>
            <div className="mt-1 font-mono text-lg font-semibold">
              {conversionResult.stats.charCount}
            </div>
          </div>
          <div className="border border-border/70 bg-card p-3">
            <div className="text-[11px] font-medium text-muted-foreground">
              Words
            </div>
            <div className="mt-1 font-mono text-lg font-semibold">
              {conversionResult.stats.wordCount}
            </div>
          </div>
          <div className="border border-border/70 bg-card p-3">
            <div className="text-[11px] font-medium text-muted-foreground">
              Bytes (UTF-8)
            </div>
            <div className="mt-1 font-mono text-lg font-semibold">
              {conversionResult.stats.byteCount} B
            </div>
          </div>
          <div className="border border-border/70 bg-card p-3">
            <div className="text-[11px] font-medium text-muted-foreground">
              Total Bits
            </div>
            <div className="mt-1 font-mono text-lg font-semibold">
              {conversionResult.stats.bitCount}
            </div>
          </div>
          <div className="border border-border/70 bg-card p-3">
            <div className="text-[11px] font-medium text-muted-foreground">
              Zeros (0)
            </div>
            <div className="mt-1 font-mono text-lg font-semibold text-blue-600 dark:text-blue-400">
              {conversionResult.stats.zeroCount}
            </div>
          </div>
          <div className="border border-border/70 bg-card p-3">
            <div className="text-[11px] font-medium text-muted-foreground">
              Ones (1)
            </div>
            <div className="mt-1 font-mono text-lg font-semibold text-amber-600 dark:text-amber-400">
              {conversionResult.stats.oneCount}
            </div>
          </div>
        </div>

        {/* Multi-Format Inspector & Byte Breakdown */}
        <div className="border border-border/80 bg-card">
          <div className="flex border-b border-border/80 bg-muted/30">
            <button
              type="button"
              onClick={() => setActiveTab("converter")}
              className={`px-4 py-2.5 text-sm font-semibold tracking-wide transition-colors ${
                activeTab === "converter"
                  ? "border-b-2 border-primary bg-background text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Alternative Encodings (Hex, Base64, Octal, Decimal)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("table")}
              className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold tracking-wide transition-colors ${
                activeTab === "table"
                  ? "border-b-2 border-primary bg-background text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <RiTableLine className="size-3.5" />
              <span>Byte-by-Byte Inspector</span>
            </button>
          </div>

          <div className="p-4">
            {activeTab === "converter" && (
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1 border border-border/70 bg-muted/20 p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-muted-foreground uppercase">
                      Hexadecimal (Hex)
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        navigator.clipboard.writeText(conversionResult.alt.hex)
                      }
                      className="text-[11px] text-muted-foreground hover:text-foreground"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="max-h-24 overflow-y-auto font-mono text-xs break-all select-all">
                    {conversionResult.alt.hex || "—"}
                  </div>
                </div>

                <div className="space-y-1 border border-border/70 bg-muted/20 p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-muted-foreground uppercase">
                      Base64
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          conversionResult.alt.base64
                        )
                      }
                      className="text-[11px] text-muted-foreground hover:text-foreground"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="max-h-24 overflow-y-auto font-mono text-xs break-all select-all">
                    {conversionResult.alt.base64 || "—"}
                  </div>
                </div>

                <div className="space-y-1 border border-border/70 bg-muted/20 p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-muted-foreground uppercase">
                      Decimal (ASCII/Bytes)
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          conversionResult.alt.decimal
                        )
                      }
                      className="text-[11px] text-muted-foreground hover:text-foreground"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="max-h-24 overflow-y-auto font-mono text-xs break-all select-all">
                    {conversionResult.alt.decimal || "—"}
                  </div>
                </div>

                <div className="space-y-1 border border-border/70 bg-muted/20 p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-muted-foreground uppercase">
                      Octal
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        navigator.clipboard.writeText(
                          conversionResult.alt.octal
                        )
                      }
                      className="text-[11px] text-muted-foreground hover:text-foreground"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="max-h-24 overflow-y-auto font-mono text-xs break-all select-all">
                    {conversionResult.alt.octal || "—"}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "table" && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">
                  Showing breakdown of characters and their byte representations
                  (first {conversionResult.breakdown.length} characters):
                </p>
                <div className="overflow-x-auto border border-border">
                  <table className="w-full text-left font-mono text-xs">
                    <thead className="border-b border-border bg-muted/50 text-[11px] text-muted-foreground uppercase">
                      <tr>
                        <th className="p-2">Char</th>
                        <th className="p-2">CodePoint</th>
                        <th className="p-2">Binary (8-bit)</th>
                        <th className="p-2">Hex</th>
                        <th className="p-2">Decimal</th>
                        <th className="p-2">Octal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {conversionResult.breakdown.length === 0 ? (
                        <tr>
                          <td
                            colSpan={6}
                            className="p-4 text-center font-sans text-muted-foreground"
                          >
                            No characters to display.
                          </td>
                        </tr>
                      ) : (
                        conversionResult.breakdown.map((item, idx) => (
                          <tr key={idx} className="hover:bg-muted/30">
                            <td className="bg-muted/20 p-2 font-bold text-foreground">
                              {item.char}
                            </td>
                            <td className="p-2 text-muted-foreground">
                              U+
                              {item.codePoint
                                .toString(16)
                                .toUpperCase()
                                .padStart(4, "0")}
                            </td>
                            <td className="p-2 font-semibold text-primary-foreground dark:text-primary">
                              {item.binary}
                            </td>
                            <td className="p-2">{item.hex}</td>
                            <td className="p-2">{item.decimal}</td>
                            <td className="p-2 text-muted-foreground">
                              {item.octal}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Educational Reference / FAQ */}
        <div className="space-y-4 border border-border/80 bg-card p-6">
          <h2 className="text-lg font-semibold tracking-wide">
            How Binary to Text Conversion Works
          </h2>
          <div className="grid gap-4 text-sm leading-relaxed text-muted-foreground md:grid-cols-3">
            <div>
              <h3 className="mb-1 font-semibold text-foreground">
                1. Binary &amp; Bytes
              </h3>
              <p>
                Computers store text as sequences of 0s and 1s. Each group of 8
                bits forms 1 byte (0 to 255). For instance, the letter
                &apos;A&apos; in ASCII is decimal 65, which is{" "}
                <code>01000001</code> in binary.
              </p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-foreground">
                2. UTF-8 &amp; Emojis
              </h3>
              <p>
                Standard ASCII covers 128 characters (1 byte). Modern UTF-8
                encoding dynamically uses 1 to 4 bytes per character, allowing
                representation of accents, non-Latin alphabets, symbols, and
                emojis.
              </p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-foreground">
                3. Complete Privacy
              </h3>
              <p>
                All conversions take place locally inside your browser using the
                Web API TextEncoder and TextDecoder. No text or binary data ever
                leaves your computer.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
