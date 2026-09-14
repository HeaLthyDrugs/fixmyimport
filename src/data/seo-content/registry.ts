import { toolCatalog } from "@/lib/tools"
import { binaryToTextSeoContent } from "./binary-to-text"
import { csvCleanerSeoContent } from "./csv-cleaner"
import { homeSeoContent } from "./home"
import type { HomeSeoContent, ToolSeoContent } from "./types"

const dedicatedToolContent: Record<string, ToolSeoContent> = {
  "csv-import-cleaner": csvCleanerSeoContent,
  "binary-to-text": binaryToTextSeoContent,
}

export function getToolSeoContent(toolId: string): ToolSeoContent {
  if (dedicatedToolContent[toolId]) {
    return dedicatedToolContent[toolId]
  }

  const tool = toolCatalog.find((t) => t.id === toolId)
  const toolName = tool?.name || "Utility Tool"
  const toolSummary = tool?.summary || "Fast in-browser utility tool."
  const toolDesc =
    tool?.description ||
    "Process data securely and instantly in your web browser with zero server uploads."

  // High-quality auto-generated fallback for other tools
  return {
    toolId,
    category: tool?.category || "utilities",
    h1: `${toolName} — Free Online Browser-Based Tool`,
    subtitle: toolSummary,
    lead: `${toolDesc} FixMyImport runs 100% client-side in your web browser, ensuring zero data retention and maximum security.`,
    whatIsTitle: `What is the ${toolName} and How Does it Work?`,
    whatIsContent: [
      `The FixMyImport ${toolName} is designed to streamline your digital workflows without requiring any software installation or cloud accounts.`,
      `Unlike legacy tools that send your inputs across the internet, all transformations and computations happen directly on your local device CPU. Your private data remains strictly confidential and never leaves your computer.`,
    ],
    howItWorksTitle: "How It Works Under the Hood",
    howItWorksContent: [
      "Instant In-Browser Execution: Employs modern JavaScript and Web APIs for zero-latency processing.",
      "Zero Telemetry & Logging: Inputs are kept in transient memory and wiped immediately when closed.",
      "Universal Cross-Platform: Works across Chrome, Safari, Edge, Firefox, Android, and iOS.",
    ],
    stepsTitle: `How to Use the ${toolName} in 3 Simple Steps`,
    steps: [
      {
        number: 1,
        title: "Input Your Data",
        description:
          "Type, paste, or upload your source content into the interactive workspace.",
      },
      {
        number: 2,
        title: "Configure Options & Preview",
        description:
          "Fine-tune settings and view instant, real-time results directly on your screen.",
      },
      {
        number: 3,
        title: "Copy or Download",
        description:
          "Copy the formatted result to your clipboard or download clean export files.",
      },
    ],
    featuresTitle: "Key Features & Advantages",
    features: [
      {
        title: "100% Client-Side Privacy",
        description:
          "Zero uploads or server storage. Your data never leaves your device.",
        badge: "Zero Uploads",
      },
      {
        title: "Lightning Fast Performance",
        description: "Instant processing with zero network roundtrip latency.",
        badge: "Real-Time",
      },
      {
        title: "No Signup Required",
        description:
          "Completely free to use without account creation, credit cards, or watermarks.",
      },
      {
        title: "Works Fully Offline",
        description:
          "Load the tool once, and use it anytime even without active internet access.",
      },
    ],
    table: {
      title: `${toolName} Quick Reference & Specs`,
      headers: ["Specification", "Value / Details"],
      rows: [
        ["Processing Mode", "100% Local (Client-Side in Browser)"],
        ["Data Retention", "0% (Never saved, logged, or uploaded)"],
        ["Installation", "None required (Instant web app)"],
        ["Supported Platforms", "macOS, Windows, Linux, Android, iOS"],
        ["Pricing", "Free for personal and commercial usage"],
      ],
    },
    privacyTitle: "Why Local Processing Matters",
    privacyContent: [
      "In an era of ubiquitous data harvesting, uploading sensitive business records or development tokens to arbitrary web utilities presents major security risks.",
      "FixMyImport guarantees zero server uploads by executing the entire toolchain directly on your device. Your work remains completely private.",
    ],
    faqs: [
      {
        question: `Is the ${toolName} free to use?`,
        answer:
          "Yes, all tools on FixMyImport are 100% free with no hidden paywalls, limits, or user registration requirements.",
      },
      {
        question: `Is my data uploaded or stored anywhere?`,
        answer:
          "No. All computations take place locally inside your web browser. No files, text, or tokens are ever sent to external servers.",
      },
      {
        question: `Can I use this tool on mobile phones?`,
        answer:
          "Yes. FixMyImport is fully responsive and optimized for touchscreens on iOS (iPhone/iPad) and Android smartphones.",
      },
    ],
    relatedToolIds: [
      "csv-import-cleaner",
      "binary-to-text",
      "case-converter",
      "base64-converter",
    ].filter((id) => id !== toolId),
  }
}

export function getHomeSeoContent(): HomeSeoContent {
  return homeSeoContent
}
