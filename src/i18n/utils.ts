import { ui, defaultLang, showDefaultLang, languages, type Lang } from "./ui"

export function getLangFromUrl(url: URL | string): Lang {
  const pathname = typeof url === "string" ? url : url.pathname
  const [, firstSegment] = pathname.split("/")
  if (firstSegment && firstSegment in languages) {
    return firstSegment as Lang
  }
  return defaultLang
}

export function useTranslations(lang: Lang) {
  const currentUi = ui[lang] || ui[defaultLang]
  return function t(key: string): string {
    if (key in currentUi) {
      return currentUi[key]
    }
    if (key in ui[defaultLang]) {
      return ui[defaultLang][key]
    }
    return key
  }
}

/**
 * Strips any language prefix from a path.
 * e.g. "/es/tools/csv-merge" -> "/tools/csv-merge"
 *      "/ja" -> "/"
 *      "/" -> "/"
 */
export function getCleanPath(path: string): string {
  const parts = path.split("/").filter(Boolean)
  if (parts.length > 0 && parts[0] in languages) {
    parts.shift()
  }
  const clean = "/" + parts.join("/")
  return clean === "" ? "/" : clean
}

export function useTranslatedPath(lang: Lang) {
  return function translatePath(path: string, targetLang: Lang = lang): string {
    const cleanPath = getCleanPath(path)
    if (!showDefaultLang && targetLang === defaultLang) {
      return cleanPath
    }
    return cleanPath === "/" ? `/${targetLang}` : `/${targetLang}${cleanPath}`
  }
}

export interface HreflangItem {
  hreflang: string
  href: string
}

export function getHreflangList(
  currentPathOrUrl: URL | string,
  siteUrl: string = "https://fixmyimport.com"
): HreflangItem[] {
  const path =
    typeof currentPathOrUrl === "string"
      ? currentPathOrUrl
      : currentPathOrUrl.pathname
  const cleanPath = getCleanPath(path)
  const normalizedSiteUrl = siteUrl.replace(/\/$/, "")

  const items: HreflangItem[] = Object.keys(languages).map((code) => {
    const l = code as Lang
    const localizedPath =
      !showDefaultLang && l === defaultLang
        ? cleanPath
        : cleanPath === "/"
          ? `/${l}`
          : `/${l}${cleanPath}`

    return {
      hreflang: l,
      href: `${normalizedSiteUrl}${localizedPath}`,
    }
  })

  // Add x-default pointing to default language (English)
  const defaultHref = `${normalizedSiteUrl}${cleanPath}`
  items.push({
    hreflang: "x-default",
    href: defaultHref,
  })

  return items
}

export function getCanonicalUrl(
  currentPathOrUrl: URL | string,
  lang: Lang,
  siteUrl: string = "https://fixmyimport.com"
): string {
  const path =
    typeof currentPathOrUrl === "string"
      ? currentPathOrUrl
      : currentPathOrUrl.pathname
  const cleanPath = getCleanPath(path)
  const normalizedSiteUrl = siteUrl.replace(/\/$/, "")

  if (!showDefaultLang && lang === defaultLang) {
    return `${normalizedSiteUrl}${cleanPath}`
  }
  return cleanPath === "/"
    ? `${normalizedSiteUrl}/${lang}`
    : `${normalizedSiteUrl}/${lang}${cleanPath}`
}

export function getOgLocale(lang: Lang): string {
  switch (lang) {
    case "en":
      return "en_US"
    case "es":
      return "es_ES"
    case "ja":
      return "ja_JP"
    case "fr":
      return "fr_FR"
    case "de":
      return "de_DE"
    case "pt":
      return "pt_BR"
    case "ko":
      return "ko_KR"
    case "it":
      return "it_IT"
    default:
      return "en_US"
  }
}
