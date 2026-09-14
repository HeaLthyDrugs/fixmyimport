import type { ToolSeoContent } from "./types"

export const csvCleanerSeoContent: ToolSeoContent = {
  toolId: "csv-import-cleaner",
  category: "csv",
  h1: "Free Online CSV Cleaner & Fixer — Clean, Dedupe & Format CSV Files",
  subtitle:
    "Repair messy exports, normalize delimiters, remove duplicate contacts, and format CSVs ready for any platform — 100% locally in your browser.",
  lead: "FixMyImport CSV Cleaner is the fastest, zero-upload tool for prepping spreadsheets before import. Whether you are dealing with broken quotes, invalid encodings, trailing whitespace, or platform limits in Shopify, Mailchimp, and Klaviyo, repair your data locally without risking security or data privacy.",
  whatIsTitle: "What is the CSV Import Cleaner and How Does it Work?",
  whatIsContent: [
    "When exporting CSV files from legacy databases, CRMs, or analytics software, formatting discrepancies are almost guaranteed. Unescaped quotes, inconsistent line endings (CRLF vs. LF), trailing whitespace, and corrupted UTF-8 Byte Order Marks (BOM) cause bulk imports to fail with confusing error messages.",
    "FixMyImport runs entirely inside your web browser using dedicated client-side Web Workers and PapaParse. Unlike traditional cloud converters that upload your confidential customer contacts or financial rows to a remote server, FixMyImport processes multi-megabyte datasets locally in your device's memory. Your data never leaves your computer.",
  ],
  howItWorksTitle: "How Our Client-Side Cleaning Engine Operates",
  howItWorksContent: [
    "Streaming In-Memory Worker: We stream and parse rows through a dedicated Web Worker pipeline, preventing UI freezing and ensuring smooth preview even with tens of thousands of records.",
    "Smart Delimiter & Quoting Detection: Automatically detects whether your source file uses commas, semicolons, tabs, or pipes, and standardizes them into valid RFC 4180 format.",
    "De-duplication & Column Hygiene: Removes duplicate rows based on all fields or specific keys (such as Email, SKU, or Customer ID), trims invisible whitespace, and eliminates blank lines.",
  ],
  stepsTitle: "How to Clean and Prepare Your CSV in 4 Simple Steps",
  steps: [
    {
      number: 1,
      title: "Upload or Paste Your CSV",
      description:
        "Drag and drop your .csv, .tsv, or .txt file into the drop-zone above, or paste raw tabular text directly. Processing begins instantly in your browser.",
    },
    {
      number: 2,
      title: "Inspect & Preview in the Spreadsheet Grid",
      description:
        "View parsed rows in our virtualized Excel-like table. Sort columns, search records, and verify headers before applying changes.",
    },
    {
      number: 3,
      title: "Configure Cleaning & Splitting Rules",
      description:
        "Select deduplication modes, clean empty rows, trim whitespace, or split oversized datasets into custom-sized chunks to meet platform limits.",
    },
    {
      number: 4,
      title: "Download Import-Ready Files",
      description:
        "Export clean, sanitized, platform-compatible CSV files or download a multi-file ZIP archive ready for immediate import into your target platform.",
    },
  ],
  featuresTitle: "Key Features & Import Repair Capabilities",
  features: [
    {
      title: "100% Client-Side Privacy",
      description:
        "Zero server uploads. Your customer lists, pricing data, and records stay strictly inside your browser.",
      badge: "Zero Uploads",
    },
    {
      title: "Smart Deduplication",
      description:
        "Easily remove duplicate records by entire row match or by primary identifier columns like Email or SKU.",
      badge: "Dedupe Engine",
    },
    {
      title: "Delimiter Normalization",
      description:
        "Seamlessly convert semicolon (;), tab (\\t), or pipe (|) separated exports into standard comma-separated format.",
    },
    {
      title: "Batch File Splitting",
      description:
        "Split huge CSVs into smaller chunks (by row count or MB) to stay under strict platform upload limits.",
      badge: "File Splitter",
    },
    {
      title: "UTF-8 & BOM Sanitization",
      description:
        "Strips pesky Byte Order Marks and cleans corrupted character encodings that break strict database parsers.",
    },
    {
      title: "Excel-Like Virtual Grid",
      description:
        "Fast, interactive table preview supporting instant column sorting, cell inspection, and search.",
    },
  ],
  table: {
    title: "Platform CSV Import Requirements & Specifications",
    description:
      "A quick reference guide comparing file size limits, row quotas, and required formats across popular platforms.",
    headers: [
      "Platform",
      "Max File Size",
      "Recommended Batch",
      "Required Encoding",
      "Delimiter",
    ],
    rows: [
      ["Shopify", "15 MB", "50,000 products", "UTF-8 (no BOM)", "Comma (,)"],
      ["Mailchimp", "10 MB", "10,000–50,000 contacts", "UTF-8", "Comma or Tab"],
      ["Klaviyo", "100 MB", "50,000–100,000 rows", "UTF-8", "Comma (,)"],
      ["HubSpot", "20 MB", "250,000 rows", "UTF-8", "Comma (,)"],
      ["Salesforce", "100 MB", "50,000 records (Standard)", "UTF-8", "Comma (,)"],
      ["WooCommerce", "Server Max (usually 8–64 MB)", "1,000–5,000 rows", "UTF-8", "Comma (,)"],
    ],
  },
  privacyTitle: "Why Client-Side Processing is Essential for Sensitive CSVs",
  privacyContent: [
    "Customer records, financial ledgers, and contact lists are among the most sensitive digital assets a business handles. When using cloud-based CSV converters, every row is uploaded over the network and processed on third-party servers, potentially exposing you to data privacy breaches and violating GDPR, CCPA, or HIPAA regulations.",
    "FixMyImport takes an architectural approach to privacy: the software executes solely within your browser session using Web Workers. No data is stored, cached, or transmitted to any server. You can even disconnect your internet after loading the page and the tool will continue functioning with full speed.",
  ],
  faqs: [
    {
      question: "Is it safe to upload confidential customer or financial CSVs?",
      answer:
        "Yes, absolutely. FixMyImport does not upload your files to any remote server or cloud database. All parsing, deduplication, cleaning, and exporting occurs 100% inside your web browser on your local CPU. Your data never leaves your device.",
    },
    {
      question: "Why does Shopify or Mailchimp reject my CSV import?",
      answer:
        "Most CSV import rejections are caused by four common issues: 1) File size exceeding the limit (e.g. Mailchimp's 10 MB limit), 2) Incorrect delimiter such as semicolons instead of commas, 3) Corrupted character encoding or hidden UTF-8 BOM characters, or 4) Unescaped quotes inside descriptions. FixMyImport automatically resolves each of these issues.",
    },
    {
      question: "Can I split a large CSV into multiple smaller files?",
      answer:
        "Yes. FixMyImport includes an integrated batch splitter. You can split by target row count (e.g. 5,000 rows per file) or target file size (e.g. under 10 MB per file). All resulting parts retain the original header row and can be downloaded as a single ZIP archive.",
    },
    {
      question: "How does FixMyImport handle large CSV files without freezing?",
      answer:
        "FixMyImport utilizes HTML5 Web Workers to run CPU-intensive CSV parsing and formatting on background threads. This keeps the browser UI completely responsive and prevents freezing, even when processing files with tens of thousands of rows.",
    },
    {
      question: "What delimiters does the CSV cleaner support?",
      answer:
        "FixMyImport automatically detects and normalizes comma (,), semicolon (;), tab (\\t), and pipe (|) delimiters, standardizing your exported file to strict RFC 4180 comma-separated format.",
    },
    {
      question: "Do I need to install any software or extensions?",
      answer:
        "No installation or registration is required. FixMyImport runs immediately in any modern web browser on macOS, Windows, Linux, Android, and iOS.",
    },
  ],
  relatedToolIds: [
    "csv-column-mapper",
    "csv-merge",
    "import-validator",
    "binary-to-text",
  ],
}
