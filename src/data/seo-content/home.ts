import type { HomeSeoContent } from "./types"

export const homeSeoContent: HomeSeoContent = {
  h2: "The Privacy-First Developer & Data Import Utility Suite",
  lead: "FixMyImport provides fast, browser-native tools designed to clean messy spreadsheets, reformat datasets, and solve everyday developer tasks — with zero server uploads and guaranteed data confidentiality.",
  whyTitle: "Why Choose FixMyImport Over Traditional Cloud Converters?",
  whyContent: [
    "Most web-based CSV formatters, file splitters, and developer converters require uploading your proprietary files to remote cloud servers. Once uploaded, confidential customer lists, email databases, and private records are subject to server-side retention, accidental logging, and third-party exposure.",
    "FixMyImport is engineered with a strict browser-first architecture. All parsing, conversion, and exporting tasks execute directly in your local browser runtime using HTML5 Web Workers and native Web APIs. Your spreadsheets and code snippets never leave your device.",
  ],
  commonErrorsTitle: "Common Data Import Disasters and How We Solve Them",
  commonErrors: [
    {
      title: "Delimiter Inconsistencies (Commas vs. Semicolons)",
      desc: "European and international versions of Excel commonly export spreadsheets using semicolons (;) or tabs rather than commas, causing platforms like Shopify to reject them.",
      fix: "FixMyImport auto-detects the source delimiter and automatically standardizes the file into RFC 4180 comma-separated formatting.",
    },
    {
      title: "Oversized File Rejections & Quota Errors",
      desc: "Platforms like Mailchimp (10 MB cap) and Shopify (50,000 product rows) immediately reject bulk imports that exceed their size thresholds.",
      fix: "Our in-browser batch splitter divides large files into targeted row counts or size chunks, packaged neatly into an instant ZIP download.",
    },
    {
      title: "Corrupted UTF-8 Byte Order Marks (BOM)",
      desc: "Invisible BOM characters (ï»¿) inserted by Windows programs cause import parsers to misread primary header names (e.g. 'ï»¿Email' instead of 'Email').",
      fix: "FixMyImport automatically detects, cleans, and strips Byte Order Marks, ensuring universal compatibility with database engines.",
    },
    {
      title: "Duplicate Customer Records & Whitespace",
      desc: "Accidental duplicate contacts inflate marketing bills and generate import collision errors in CRMs like HubSpot and Klaviyo.",
      fix: "Deduplicate thousands of rows in seconds based on email, customer ID, or all columns with clean whitespace trimming.",
    },
  ],
  comparisonTable: {
    title: "FixMyImport vs. Traditional Cloud Converters",
    description:
      "See how our client-side architecture compares to typical cloud-hosted online conversion utilities.",
    headers: ["Feature / Metric", "FixMyImport", "Traditional Cloud Tools"],
    rows: [
      [
        "Data Privacy & Confidentiality",
        "100% In-Browser (Never leaves your computer)",
        "Uploaded to third-party cloud servers",
      ],
      [
        "Regulatory Compliance (GDPR/HIPAA)",
        "Compliant by architecture (Zero data transit)",
        "Requires complex Data Processing Agreements",
      ],
      [
        "Upload Bandwidth & File Limits",
        "Instant local processing (Limited only by RAM)",
        "Throttled by server upload limits or paywalls",
      ],
      [
        "Processing Latency",
        "Instant (Zero network latency or queuing)",
        "Slow (Upload time + server queue + download)",
      ],
      [
        "Offline Operation",
        "Works completely offline after page load",
        "Requires constant high-speed internet",
      ],
      [
        "Pricing & Registration",
        "100% Free with no login or account needed",
        "Frequently hides downloads behind paywalls",
      ],
    ],
  },
  securityTitle: "Architected for Absolute Privacy & Zero Data Retention",
  securityPoints: [
    "HTML5 Web Workers: Memory-intensive operations run on local background threads without sending bytes to the network.",
    "Zero File Telemetry: We never inspect, log, or cache your spreadsheet rows or conversion inputs.",
    "Fully Offline Capable: Load the page once and disconnect your network — all tools continue to function.",
    "Open Web Standards: Adheres to RFC 4180 CSV specifications and standard Unicode/UTF-8 character encodings.",
  ],
  faqs: [
    {
      question: "Are any of my files or text uploaded to FixMyImport servers?",
      answer:
        "No. FixMyImport operates strictly inside your web browser. All CSV cleaning, binary conversions, and file splitting happen locally on your computer's CPU. Your data is never transmitted to any external server or saved in any database.",
    },
    {
      question:
        "Why should I use FixMyImport instead of Excel or Google Sheets?",
      answer:
        "Spreadsheet software like Excel often mangles data during export: converting large numbers to scientific notation (e.g. 1.23E+11), stripping leading zeros from zip codes, and introducing non-standard delimiters. FixMyImport preserves your raw data formatting and handles batch splitting that spreadsheet apps cannot easily do.",
    },
    {
      question: "Is there a file size limit for CSV processing?",
      answer:
        "Because processing occurs directly in your browser's memory, file size limits depend on your computer's RAM. Most modern devices can effortlessly process CSV files containing 500,000+ rows and 50–100+ MB without performance degradation.",
    },
    {
      question: "Is FixMyImport free to use for commercial projects?",
      answer:
        "Yes, FixMyImport is completely free for personal, commercial, and enterprise usage without any hidden limits, watermarks, or subscription fees.",
    },
    {
      question: "Can I use FixMyImport without an internet connection?",
      answer:
        "Yes. Once you load FixMyImport in your browser, all necessary scripts are loaded into memory. You can disconnect from the internet or work in airplane mode with full functionality.",
    },
    {
      question: "What platforms are supported for CSV imports?",
      answer:
        "Our tools output standardized RFC 4180 CSV files fully compatible with Shopify, WooCommerce, Mailchimp, Klaviyo, HubSpot, Salesforce, ActiveCampaign, Google Contacts, and SQL database importers.",
    },
  ],
}
