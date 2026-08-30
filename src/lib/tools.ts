export type ToolIconName =
  | "csv-import"
  | "column-mapper"
  | "csv-merge"
  | "import-validator"
  | "binary-converter"
  | "text-case"
  | "base64"
  | "json-format"
  | "qr-generator"
  | "timestamp"
  | "uuid-hash"

export type ToolCategory = "csv" | "utilities"

export type ToolDefinition = {
  id: string
  name: string
  href: string
  status: "Live" | "Coming soon"
  icon: ToolIconName
  category: ToolCategory
  summary: string
  description: string
  metric: string
  tags: string[]
  seoTitle: string
  seoDescription: string
}

export const toolCatalog: ToolDefinition[] = [
  // ─── CSV & Import Tools ──────────────────────────────────────────
  {
    id: "csv-import-cleaner",
    name: "CSV Import Cleaner",
    href: "/tools/csv-import-cleaner",
    status: "Live",
    icon: "csv-import",
    category: "csv",
    summary: "Clean, dedupe, and split import-ready CSVs in the browser.",
    description:
      "Fix messy CSV exports locally, preview the output with an Excel-like grid, and download import-ready files without sending your data anywhere.",
    metric: "Browser-first import repair",
    tags: ["CSV cleanup", "Dedupe", "Batch split", "Excel grid"],
    seoTitle: "CSV Import Cleaner | FixMyImport",
    seoDescription:
      "Clean, dedupe, and split import-ready CSV files locally in your browser with the FixMyImport CSV Import Cleaner.",
  },
  {
    id: "csv-column-mapper",
    name: "CSV Column Mapper",
    href: "/tools/csv-column-mapper",
    status: "Coming soon",
    icon: "column-mapper",
    category: "csv",
    summary: "Rename, reorder, and drop columns so your CSV fits the target.",
    description:
      "Match columns from one system to another. Rename headers, change the order, and remove what you don't need — all before you import.",
    metric: "Header alignment made easy",
    tags: ["Column rename", "Reorder", "Field mapping"],
    seoTitle: "CSV Column Mapper | FixMyImport",
    seoDescription:
      "Rename, reorder, and drop CSV columns locally in your browser to match any import format with FixMyImport.",
  },
  {
    id: "csv-merge",
    name: "CSV Merge",
    href: "/tools/csv-merge",
    status: "Coming soon",
    icon: "csv-merge",
    category: "csv",
    summary: "Combine multiple CSV files into one.",
    description:
      "Upload several CSVs, line up the columns automatically, and merge them into a single file. Great for joining batch exports back together.",
    metric: "Multi-file to single file",
    tags: ["Merge", "Combine", "Append"],
    seoTitle: "CSV Merge | FixMyImport",
    seoDescription:
      "Merge and combine multiple CSV files into one locally in your browser with FixMyImport CSV Merge.",
  },
  {
    id: "import-validator",
    name: "Import Validator",
    href: "/tools/import-validator",
    status: "Coming soon",
    icon: "import-validator",
    category: "csv",
    summary: "Check if your file is ready to import before you upload it.",
    description:
      "Pick a platform like Shopify or Mailchimp, then run a quick check for missing columns, bad emails, and file size limits — so nothing breaks on upload.",
    metric: "Pre-flight import check",
    tags: ["Validate", "Pre-check", "Error report"],
    seoTitle: "Import Validator | FixMyImport",
    seoDescription:
      "Validate your CSV against platform rules before importing. Catch missing columns, format errors, and size limits with FixMyImport.",
  },

  // ─── Small Tools & Everyday Utilities ────────────────────────────
  {
    id: "binary-to-text",
    name: "Binary to Text Converter",
    href: "/tools/binary-to-text",
    status: "Live",
    icon: "binary-converter",
    category: "utilities",
    summary: "Convert text to binary (and binary to text) in real time with UTF-8 & ASCII support.",
    description:
      "Instant bi-directional binary converter with customizable delimiters, bit-widths, byte breakdown, and Hex/Base64 inspector.",
    metric: "Instant UTF-8 & ASCII converter",
    tags: ["Binary", "ASCII", "UTF-8", "Hex", "Base64"],
    seoTitle: "Binary to Text & Text to Binary Converter | FixMyImport",
    seoDescription:
      "Convert binary to text and text to binary instantly in your browser. Supports UTF-8, ASCII, 8-bit bytes, Hex, Base64, and character breakdown.",
  },
  {
    id: "case-converter",
    name: "Case & Text Formatter",
    href: "/tools/case-converter",
    status: "Coming soon",
    icon: "text-case",
    category: "utilities",
    summary: "Convert text case between UPPERCASE, lowercase, Title Case, camelCase, and snake_case.",
    description:
      "Instantly change text capitalization, count characters and words, and transform strings into developer-friendly casing.",
    metric: "Fast text case conversion",
    tags: ["Uppercase", "Title Case", "camelCase", "snake_case"],
    seoTitle: "Case Converter & Text Formatter | FixMyImport",
    seoDescription:
      "Convert text between uppercase, lowercase, title case, camelCase, snake_case, and kebab-case instantly in your browser.",
  },
  {
    id: "base64-converter",
    name: "Base64 Encoder / Decoder",
    href: "/tools/base64-converter",
    status: "Coming soon",
    icon: "base64",
    category: "utilities",
    summary: "Encode and decode text, images, and files into Base64 format locally.",
    description:
      "Quickly encode strings to Base64 or decode Base64 strings back to plain text, images, and data URIs without server uploads.",
    metric: "Client-side Base64 converter",
    tags: ["Base64", "Encode", "Decode", "Data URI"],
    seoTitle: "Base64 Encoder & Decoder | FixMyImport",
    seoDescription:
      "Encode and decode text, files, and images to and from Base64 instantly in your browser.",
  },
  {
    id: "json-formatter",
    name: "JSON Formatter & Validator",
    href: "/tools/json-formatter",
    status: "Coming soon",
    icon: "json-format",
    category: "utilities",
    summary: "Format, validate, prettify, and minify JSON data with error highlights.",
    description:
      "Paste messy JSON to format it with custom indentation, validate syntax errors, and generate TypeScript interfaces in real time.",
    metric: "Instant JSON prettifier",
    tags: ["JSON", "Prettify", "Minify", "TypeScript Types"],
    seoTitle: "JSON Formatter & Validator | FixMyImport",
    seoDescription:
      "Format, validate, prettify, and minify JSON strings with real-time error detection.",
  },
  {
    id: "qr-code-generator",
    name: "QR Code Generator",
    href: "/tools/qr-code-generator",
    status: "Coming soon",
    icon: "qr-generator",
    category: "utilities",
    summary: "Generate custom QR codes for URLs, WiFi passwords, and contact cards.",
    description:
      "Create high-resolution QR codes for links, text, and WiFi networks with zero ads and offline client-side rendering.",
    metric: "Offline QR code maker",
    tags: ["QR Code", "WiFi QR", "vCard", "SVG Export"],
    seoTitle: "QR Code Generator | FixMyImport",
    seoDescription:
      "Generate clean, high-resolution QR codes for links, WiFi networks, and plain text locally in your browser.",
  },
  {
    id: "unix-timestamp",
    name: "Unix Timestamp Converter",
    href: "/tools/unix-timestamp",
    status: "Coming soon",
    icon: "timestamp",
    category: "utilities",
    summary: "Convert epoch timestamps to human-readable dates and timezone formats.",
    description:
      "Convert seconds and milliseconds to UTC and local date formats, relative time, and ISO 8601 strings.",
    metric: "Epoch & date converter",
    tags: ["Epoch", "Timestamp", "ISO 8601", "Timezone"],
    seoTitle: "Unix Timestamp Converter | FixMyImport",
    seoDescription:
      "Convert Unix epoch timestamps to human-readable dates, UTC, and local timezones instantly.",
  },
  {
    id: "uuid-generator",
    name: "UUID / ULID Generator",
    href: "/tools/uuid-generator",
    status: "Coming soon",
    icon: "uuid-hash",
    category: "utilities",
    summary: "Generate random UUID v4, UUID v7, ULID, and NanoIDs in bulk.",
    description:
      "Batch generate cryptographically secure unique identifiers for database seeding, mock data, and development testing.",
    metric: "Secure batch ID generator",
    tags: ["UUID v4", "UUID v7", "ULID", "NanoID"],
    seoTitle: "UUID & ULID Generator | FixMyImport",
    seoDescription:
      "Generate cryptographically secure UUID v4, UUID v7, and ULID identifiers in bulk locally in your browser.",
  },
]

export const csvTools = toolCatalog.filter((t) => t.category === "csv")
export const utilityTools = toolCatalog.filter((t) => t.category === "utilities")
