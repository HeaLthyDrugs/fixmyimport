export type ToolIconName = "csv-import"

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
]
