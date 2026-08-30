export type ToolIconName =
  | "csv-import"
  | "column-mapper"
  | "csv-merge"
  | "import-validator"

export type ToolDefinition = {
  id: string
  name: string
  href: string
  status: "Live" | "Coming soon"
  icon: ToolIconName
  summary: string
  description: string
  metric: string
  tags: string[]
  seoTitle: string
  seoDescription: string
}

export const toolCatalog: ToolDefinition[] = [
  {
    id: "csv-import-cleaner",
    name: "CSV Import Cleaner",
    href: "/tools/csv-import-cleaner",
    status: "Live",
    icon: "csv-import",
    summary: "Clean, dedupe, and split import-ready CSVs in the browser.",
    description:
      "Fix messy CSV exports locally, preview the output, and download import-ready files without sending your data anywhere.",
    metric: "Browser-first import repair",
    tags: ["CSV cleanup", "Dedupe", "Batch split"],
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
    summary: "Check if your file is ready to import before you upload it.",
    description:
      "Pick a platform like Shopify or Mailchimp, then run a quick check for missing columns, bad emails, and file size limits — so nothing breaks on upload.",
    metric: "Pre-flight import check",
    tags: ["Validate", "Pre-check", "Error report"],
    seoTitle: "Import Validator | FixMyImport",
    seoDescription:
      "Validate your CSV against platform rules before importing. Catch missing columns, format errors, and size limits with FixMyImport.",
  },
]
