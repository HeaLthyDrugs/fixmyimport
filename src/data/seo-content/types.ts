export interface SeoStep {
  number: number
  title: string
  description: string
}

export interface SeoFeature {
  title: string
  description: string
  badge?: string
}

export interface SeoTable {
  title: string
  description?: string
  headers: string[]
  rows: string[][]
}

export interface SeoFaq {
  question: string
  answer: string
}

export interface ToolSeoContent {
  toolId: string
  category: "csv" | "utilities"
  h1: string
  subtitle: string
  lead: string
  whatIsTitle: string
  whatIsContent: string[]
  howItWorksTitle?: string
  howItWorksContent?: string[]
  stepsTitle: string
  steps: SeoStep[]
  featuresTitle: string
  features: SeoFeature[]
  table?: SeoTable
  tableSecondary?: SeoTable
  privacyTitle: string
  privacyContent: string[]
  faqs: SeoFaq[]
  relatedToolIds: string[]
}

export interface HomeCommonError {
  title: string
  desc: string
  fix: string
}

export interface HomeSeoContent {
  h2: string
  lead: string
  whyTitle: string
  whyContent: string[]
  commonErrorsTitle: string
  commonErrors: HomeCommonError[]
  comparisonTable: SeoTable
  securityTitle: string
  securityPoints: string[]
  faqs: SeoFaq[]
}
