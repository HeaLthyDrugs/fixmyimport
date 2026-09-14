export const languages = {
  en: "English",
  es: "Español",
  ja: "日本語",
  fr: "Français",
  de: "Deutsch",
  pt: "Português",
  ko: "한국어",
  it: "Italiano",
} as const

export type Lang = keyof typeof languages

export const defaultLang: Lang = "en"
export const showDefaultLang = false

export const nonDefaultLangs: Lang[] = [
  "es",
  "ja",
  "fr",
  "de",
  "pt",
  "ko",
  "it",
]

export const ui: Record<Lang, Record<string, string>> = {
  en: {
    // Site metadata
    "site.title":
      "FixMyImport | Free browser-based tools for CSVs, developers & everyday tasks",
    "site.description":
      "Discover FixMyImport tools for cleaning, deduping, splitting CSVs, and handy client-side developer utilities that run 100% in your browser.",

    // Hero
    "hero.title": "Fix My Import",
    "hero.subtitle":
      "A suite of fast, lightweight tools for cleaning messy spreadsheets, converting formats, and solving daily developer tasks — all processed locally in your browser.",
    "hero.badge.clientSide": "100% Client-Side",
    "hero.badge.zeroUploads": "Zero Uploads",

    // Section headings
    "section.csv": "CSV & Import Tools",
    "section.utilities": "Developer & Everyday Utilities",

    // Badges & Common
    "badge.comingSoon": "Coming soon",
    "badge.live": "Live",
    "btn.tryCleaner": "Try the CSV Import Cleaner instead",
    "btn.openCleaner": "Open the CSV Import Cleaner",
    "lang.select": "Language",

    // Footer
    "footer.tagline": "Built for local, privacy-first data processing.",
    "footer.privacy": "Privacy Policy",
    "footer.shopify": "Shopify Cleaner",
    "footer.mailchimp": "Mailchimp Splitter",

    // Shopify Guide
    "shopify.seoTitle": "Shopify CSV Cleaner | Prep imports locally with FixMyImport",
    "shopify.seoDesc": "Use FixMyImport to clean, dedupe, and split Shopify CSV imports locally in your browser.",
    "shopify.badge": "Shopify Workflow",
    "shopify.title": "Prep Shopify CSV imports without a spreadsheet detour.",
    "shopify.desc": "Start with the Shopify preset in FixMyImport when a product, customer, or catalog export needs cleanup before re-import.",
    "shopify.card1.title": "Use the preset first",
    "shopify.card1.desc": "The Shopify preset defaults to size-aware splitting, repeated headers, and conservative batch settings that are easier to retry if an import goes wrong.",
    "shopify.card2.title": "Dedupe with identity columns",
    "shopify.card2.desc": "If your CSV includes email, handle, or SKU columns, select those first for deterministic dedupe instead of deduping by full row.",
    "shopify.card3.title": "Export small, predictable batches",
    "shopify.card3.desc": "ZIP export keeps multi-file downloads tidy while preserving the same header structure in every batch file.",

    // Mailchimp Guide
    "mailchimp.seoTitle": "Mailchimp CSV Too Large | Split import files with FixMyImport",
    "mailchimp.seoDesc": "Fix large Mailchimp CSV imports by splitting them into smaller browser-generated batches.",
    "mailchimp.badge": "Mailchimp Guide",
    "mailchimp.title": "When the CSV is too large, split it before the import does.",
    "mailchimp.desc": "FixMyImport keeps this simple: remove duplicates first, then split the list into smaller files that are easier to upload and retry.",
    "mailchimp.card1.title": "Clean before splitting",
    "mailchimp.card1.desc": "Trim whitespace and remove empty rows first so each output file uses its row budget on real contacts.",
    "mailchimp.card2.title": "Use selected-column dedupe",
    "mailchimp.card2.desc": "Exact-match dedupe on email columns is the fastest way to avoid noisy duplicate imports.",
    "mailchimp.card3.title": "Export predictable batches",
    "mailchimp.card3.desc": "Split by size or by rows, keep headers in every file, and download the whole batch as a ZIP when needed.",

    // Privacy Page
    "privacy.seoTitle": "FixMyImport Privacy | Browser-first CSV processing",
    "privacy.seoDesc": "How FixMyImport handles CSV files, local processing, and lightweight analytics in the first release.",
    "privacy.badge": "Privacy",
    "privacy.title": "Local by default, narrow by design.",
    "privacy.desc": "FixMyImport is built as a browser-first CSV utility. The default experience does not upload files or store CSV contents on a server.",
    "privacy.card1.title": "CSV handling",
    "privacy.card1.desc": "CSV parsing, cleanup, dedupe, preview generation, splitting, and export preparation all run locally in the browser.",
    "privacy.card2.title": "Analytics",
    "privacy.card2.desc": "The app is wired for privacy-friendly event hooks only. File contents, column names, and row data are not sent as analytics properties.",
    "privacy.card3.title": "Commercial layer",
    "privacy.card3.desc": "The no-auth Pro flow stores a lightweight unlock token in local storage. Hosted checkout can be connected later without turning the app into an account system.",
  },

  es: {
    // Site metadata
    "site.title":
      "FixMyImport | Herramientas gratuitas en el navegador para CSV, desarrolladores y tareas diarias",
    "site.description":
      "Descubre las herramientas de FixMyImport para limpiar, deduplicar y dividir archivos CSV, además de utilidades para desarrolladores que se ejecutan 100% en tu navegador.",

    // Hero
    "hero.title": "Fix My Import",
    "hero.subtitle":
      "Una suite de herramientas rápidas y ligeras para limpiar hojas de cálculo desordenadas, convertir formatos y resolver tareas diarias de desarrollo — todo procesado localmente en tu navegador.",
    "hero.badge.clientSide": "100% en el navegador",
    "hero.badge.zeroUploads": "Cero subidas",

    // Section headings
    "section.csv": "Herramientas de CSV e Importación",
    "section.utilities": "Utilidades para desarrolladores y uso diario",

    // Badges & Common
    "badge.comingSoon": "Próximamente",
    "badge.live": "Disponible",
    "btn.tryCleaner": "Probar el Limpiador de CSV en su lugar",
    "btn.openCleaner": "Abrir el Limpiador de CSV",
    "lang.select": "Idioma",

    // Footer
    "footer.tagline": "Creado para el procesamiento local de datos con privacidad prioritaria.",
    "footer.privacy": "Política de Privacidad",
    "footer.shopify": "Limpiador Shopify",
    "footer.mailchimp": "Divisor Mailchimp",

    // Shopify Guide
    "shopify.seoTitle": "Limpiador CSV Shopify | Prepara importaciones localmente con FixMyImport",
    "shopify.seoDesc": "Usa FixMyImport para limpiar, deduplicar y dividir importaciones CSV de Shopify directamente en tu navegador.",
    "shopify.badge": "Flujo de trabajo Shopify",
    "shopify.title": "Prepara importaciones CSV de Shopify sin rodeos en hojas de cálculo.",
    "shopify.desc": "Comienza con el ajuste preestablecido de Shopify en FixMyImport cuando una exportación de productos, clientes o catálogo necesite limpieza antes de reimportar.",
    "shopify.card1.title": "Usa el ajuste preestablecido primero",
    "shopify.card1.desc": "El ajuste de Shopify se configura por defecto para división según tamaño, encabezados repetidos y lotes conservadores fáciles de reintentar.",
    "shopify.card2.title": "Deduplica con columnas de identidad",
    "shopify.card2.desc": "Si tu CSV incluye columnas de email, handle o SKU, selecciónalas primero para una deduplicación determinista en lugar de toda la fila.",
    "shopify.card3.title": "Exporta lotes pequeños y predecibles",
    "shopify.card3.desc": "La exportación en ZIP mantiene organizadas las descargas de varios archivos, preservando la misma estructura de encabezados en cada lote.",

    // Mailchimp Guide
    "mailchimp.seoTitle": "CSV de Mailchimp muy grande | Divide archivos de importación con FixMyImport",
    "mailchimp.seoDesc": "Soluciona importaciones CSV grandes de Mailchimp dividiéndolas en lotes más pequeños en el navegador.",
    "mailchimp.badge": "Guía de Mailchimp",
    "mailchimp.title": "Cuando el CSV es demasiado grande, divídelo antes de importar.",
    "mailchimp.desc": "FixMyImport lo hace simple: elimina duplicados primero y luego divide la lista en archivos más pequeños y fáciles de subir.",
    "mailchimp.card1.title": "Limpia antes de dividir",
    "mailchimp.card1.desc": "Recorta espacios en blanco y elimina filas vacías para que cada archivo use su cupo de filas en contactos reales.",
    "mailchimp.card2.title": "Deduplica por columnas seleccionadas",
    "mailchimp.card2.desc": "La eliminación de duplicados por coincidencia exacta en columnas de correo es la forma más rápida de evitar importaciones duplicadas.",
    "mailchimp.card3.title": "Exporta lotes predecibles",
    "mailchimp.card3.desc": "Divide por tamaño o filas, conserva los encabezados en cada archivo y descarga todo el lote como ZIP cuando lo necesites.",

    // Privacy Page
    "privacy.seoTitle": "Privacidad en FixMyImport | Procesamiento de CSV seguro en el navegador",
    "privacy.seoDesc": "Conoce cómo FixMyImport procesa archivos CSV localmente con total privacidad y sin subir datos a servidores.",
    "privacy.badge": "Privacidad",
    "privacy.title": "Local por defecto, diseñado para la mínima intrusión.",
    "privacy.desc": "FixMyImport está diseñado como una utilidad en el navegador. La experiencia estándar no sube archivos ni almacena contenido CSV en servidores.",
    "privacy.card1.title": "Manejo de CSV",
    "privacy.card1.desc": "El análisis, limpieza, deduplicación, vista previa, división y preparación de exportación de CSV se ejecutan localmente en el navegador.",
    "privacy.card2.title": "Analíticas",
    "privacy.card2.desc": "La aplicación utiliza únicamente eventos respetuosos con la privacidad. El contenido de los archivos, nombres de columnas y filas nunca se envían.",
    "privacy.card3.title": "Capa comercial",
    "privacy.card3.desc": "El acceso Pro sin cuenta guarda un token ligero en el almacenamiento local. El pago se conecta sin obligar a crear cuentas de usuario.",
  },

  ja: {
    // Site metadata
    "site.title":
      "FixMyImport | ブラウザ上で動く無料のCSV・開発者・日常ユーティリティツール",
    "site.description":
      "CSVのクリーンアップ、重複削除、分割、そしてブラウザ上で100%動作する便利なクライアントサイド開発者ユーティリティ。",

    // Hero
    "hero.title": "Fix My Import",
    "hero.subtitle":
      "乱雑なスプレッドシートのクリーンアップ、フォーマット変換、日々の開発タスクの解決のための軽量・高速ツール群。すべてブラウザ内でローカル処理されます。",
    "hero.badge.clientSide": "100% クライアント側",
    "hero.badge.zeroUploads": "アップロードなし",

    // Section headings
    "section.csv": "CSV・インポートツール",
    "section.utilities": "開発者＆日常ユーティリティ",

    // Badges & Common
    "badge.comingSoon": "近日公開",
    "badge.live": "利用可能",
    "btn.tryCleaner": "代わりにCSVインポートクリーナーを試す",
    "btn.openCleaner": "CSVインポートクリーナーを開く",
    "lang.select": "言語",

    // Footer
    "footer.tagline": "プライバシー重視のローカルデータ処理のために設計されました。",
    "footer.privacy": "プライバシーポリシー",
    "footer.shopify": "Shopifyクリーナー",
    "footer.mailchimp": "Mailchimp分割",

    // Shopify Guide
    "shopify.seoTitle": "Shopify CSVクリーナー | FixMyImportでローカルにインポート準備",
    "shopify.seoDesc": "FixMyImportを使って、ブラウザ上でShopifyのCSVインポートデータの整理、重複削除、分割を実行。",
    "shopify.badge": "Shopify ワークフロー",
    "shopify.title": "表計算ソフトの手間なくShopify CSVインポートを準備。",
    "shopify.desc": "商品、顧客、またはカタログのエクスポートを再インポートする前に整理が必要な場合は、FixMyImportのShopifyプリセットから始めましょう。",
    "shopify.card1.title": "まずプリセットを使用",
    "shopify.card1.desc": "Shopifyプリセットは、サイズに応じた分割、ヘッダーの繰り返し、エラー時に再試行しやすい安全なバッチ設定を標準装備しています。",
    "shopify.card2.title": "識別子カラムで重複排除",
    "shopify.card2.desc": "CSVにメールアドレス、handle、またはSKU列が含まれている場合は、行全体ではなくそれらの識別列を選択して確実に重複排除します。",
    "shopify.card3.title": "小さく予測可能なバッチでエクスポート",
    "shopify.card3.desc": "ZIPエクスポートにより、すべての分割ファイルで同じヘッダー構造を維持しながら、複数ファイルを整然とダウンロードできます。",

    // Mailchimp Guide
    "mailchimp.seoTitle": "Mailchimp CSVが大きすぎる場合 | FixMyImportでファイルを分割",
    "mailchimp.seoDesc": "容量の大きなMailchimp用CSVファイルをブラウザ上で小さく分割してインポートエラーを解消。",
    "mailchimp.badge": "Mailchimp ガイド",
    "mailchimp.title": "CSVが大きすぎる場合は、インポート前に分割しましょう。",
    "mailchimp.desc": "FixMyImportはシンプルです。まず重複を削除し、アップロードや再試行が容易な小さなファイルにリストを分割します。",
    "mailchimp.card1.title": "分割前にクリーンアップ",
    "mailchimp.card1.desc": "空白のトリミングと空行の削除を先に行い、各出力ファイルの行上限を実際の連絡先データに有効活用します。",
    "mailchimp.card2.title": "指定列での重複排除",
    "mailchimp.card2.desc": "メール列の完全一致による重複排除は、不要な重複インポートを防ぐ最も確実な方法です。",
    "mailchimp.card3.title": "均一なバッチでエクスポート",
    "mailchimp.card3.desc": "ファイルサイズや行数で分割し、全ファイルでヘッダーを保持し、必要に応じて一括ZIPダウンロードが可能です。",

    // Privacy Page
    "privacy.seoTitle": "FixMyImport プライバシーポリシー | ブラウザ完結の安全なCSV処理",
    "privacy.seoDesc": "FixMyImportにおけるCSVファイルの取り扱い、ローカル処理、プライバシー重視の設計について。",
    "privacy.badge": "プライバシー",
    "privacy.title": "デフォルトでローカル完結、必要最小限の設計。",
    "privacy.desc": "FixMyImportはブラウザファーストのCSVユーティリティです。標準動作ではサーバーにファイルをアップロードしたり保存したりしません。",
    "privacy.card1.title": "CSVの取り扱い",
    "privacy.card1.desc": "CSVの解析、クリーンアップ、重複排除、プレビュー生成、分割、エクスポート準備はすべてブラウザ内でローカルに実行されます。",
    "privacy.card2.title": "アナリティクス",
    "privacy.card2.desc": "本アプリはプライバシーに配慮したイベントフックのみを使用します。ファイルの内容、列名、行データが分析情報として送信されることはありません。",
    "privacy.card3.title": "有料機能・ライセンス",
    "privacy.card3.desc": "アカウント不要のPro機能は、ブラウザのローカルストレージに軽量な解除トークンを保存します。アカウントシステムなしで安全に利用できます。",
  },

  fr: {
    // Site metadata
    "site.title":
      "FixMyImport | Outils gratuits dans le navigateur pour CSV, développeurs et tâches quotidiennes",
    "site.description":
      "Découvrez les outils FixMyImport pour nettoyer, dédoublonner et découper vos fichiers CSV, ainsi que des utilitaires pratiques 100% dans le navigateur.",

    // Hero
    "hero.title": "Fix My Import",
    "hero.subtitle":
      "Une suite d'outils rapides et légers pour nettoyer les tableurs désorganisés, convertir des formats et résoudre les tâches quotidiennes des développeurs — tout est traité localement dans votre navigateur.",
    "hero.badge.clientSide": "100% Côté client",
    "hero.badge.zeroUploads": "Zéro téléversement",

    // Section headings
    "section.csv": "Outils CSV & Import",
    "section.utilities": "Utilitaires développeurs et du quotidien",

    // Badges & Common
    "badge.comingSoon": "Bientôt disponible",
    "badge.live": "Disponible",
    "btn.tryCleaner": "Essayer plutôt le nettoyeur de CSV",
    "btn.openCleaner": "Ouvrir le nettoyeur de CSV",
    "lang.select": "Langue",

    // Footer
    "footer.tagline": "Conçu pour un traitement local des données respectueux de la vie privée.",
    "footer.privacy": "Politique de confidentialité",
    "footer.shopify": "Nettoyeur Shopify",
    "footer.mailchimp": "Diviseur Mailchimp",

    // Shopify Guide
    "shopify.seoTitle": "Nettoyeur CSV Shopify | Préparez vos imports en local avec FixMyImport",
    "shopify.seoDesc": "Utilisez FixMyImport pour nettoyer, dédoublonner et scinder vos imports CSV Shopify directement dans votre navigateur.",
    "shopify.badge": "Flux Shopify",
    "shopify.title": "Préparez vos imports CSV Shopify sans détour par un tableur.",
    "shopify.desc": "Commencez avec le préréglage Shopify dans FixMyImport lorsqu'un export de produits, clients ou catalogue nécessite un nettoyage avant réimportation.",
    "shopify.card1.title": "Utilisez d'abord le préréglage",
    "shopify.card1.desc": "Le préréglage Shopify applique par défaut le fractionnement selon la taille, la répétition des en-têtes et des réglages de lots plus fiables en cas d'erreur.",
    "shopify.card2.title": "Dédoublonnez avec des colonnes identifiantes",
    "shopify.card2.desc": "Si votre CSV comporte des colonnes d'e-mail, d'identifiant (handle) ou de référence (SKU), sélectionnez-les d'abord pour un dédoublonnage précis.",
    "shopify.card3.title": "Exportez des lots petits et prévisibles",
    "shopify.card3.desc": "L'exportation ZIP garde les téléchargements de fichiers multiples organisés tout en conservant la structure des en-têtes dans chaque fichier.",

    // Mailchimp Guide
    "mailchimp.seoTitle": "CSV Mailchimp trop lourd | Découpez vos fichiers d'importation",
    "mailchimp.seoDesc": "Réparez les imports CSV Mailchimp trop volumineux en les divisant en petits lots locaux dans le navigateur.",
    "mailchimp.badge": "Guide Mailchimp",
    "mailchimp.title": "Quand le CSV est trop volumineux, découpez-le avant l'importation.",
    "mailchimp.desc": "FixMyImport simplifie le processus : supprimez d'abord les doublons, puis découpez la liste en fichiers plus légers et faciles à téléverser.",
    "mailchimp.card1.title": "Nettoyer avant de découper",
    "mailchimp.card1.desc": "Supprimez les espaces et les lignes vides en amont pour que chaque fichier exploite son quota sur de vrais contacts.",
    "mailchimp.card2.title": "Dédoublonnez par colonne spécifique",
    "mailchimp.card2.desc": "Le dédoublonnage par correspondance exacte sur la colonne e-mail est le moyen le plus rapide d'éviter les doublons.",
    "mailchimp.card3.title": "Exportez des lots prévisibles",
    "mailchimp.card3.desc": "Divisez par taille ou par nombre de lignes, conservez les en-têtes dans chaque fichier et téléchargez l'ensemble en ZIP.",

    // Privacy Page
    "privacy.seoTitle": "Confidentialité FixMyImport | Traitement de données CSV sécurisé",
    "privacy.seoDesc": "Comment FixMyImport gère les fichiers CSV, le traitement local et les statistiques légères dans le navigateur.",
    "privacy.badge": "Confidentialité",
    "privacy.title": "Local par défaut, sobre par conception.",
    "privacy.desc": "FixMyImport est conçu comme un utilitaire navigateur. L'utilisation par défaut ne téléverse ni ne stocke aucun contenu CSV sur un serveur.",
    "privacy.card1.title": "Traitement des CSV",
    "privacy.card1.desc": "L'analyse, le nettoyage, le dédoublonnage, la prévisualisation, le découpage et l'exportation s'exécutent entièrement en local.",
    "privacy.card2.title": "Analytique",
    "privacy.card2.desc": "L'application intègre uniquement des événements respectueux de la vie privée. Aucun contenu, nom de colonne ou donnée n'est transmis.",
    "privacy.card3.title": "Offre commerciale",
    "privacy.card3.desc": "L'accès Pro sans compte enregistre un jeton dans le stockage local du navigateur. Aucun système de compte n'est imposé.",
  },

  de: {
    // Site metadata
    "site.title":
      "FixMyImport | Kostenlose browserbasierte Tools für CSV, Entwickler & Alltagsaufgaben",
    "site.description":
      "Entdecken Sie FixMyImport-Tools zum Bereinigen, Deduplizieren und Teilen von CSV-Dateien sowie praktische Entwickler-Utilities, die 100% lokal im Browser laufen.",

    // Hero
    "hero.title": "Fix My Import",
    "hero.subtitle":
      "Eine Suite schneller, leichtgewichtiger Tools zum Bereinigen unordentlicher Tabellen, Konvertieren von Formaten und Lösen täglicher Entwickleraufgaben – alles lokal im Browser verarbeitet.",
    "hero.badge.clientSide": "100% Client-seitig",
    "hero.badge.zeroUploads": "Keine Server-Uploads",

    // Section headings
    "section.csv": "CSV & Import-Tools",
    "section.utilities": "Entwickler- & Alltags-Utilities",

    // Badges & Common
    "badge.comingSoon": "Demnächst",
    "badge.live": "Verfügbar",
    "btn.tryCleaner": "Stattdessen den CSV Import Cleaner testen",
    "btn.openCleaner": "CSV Import Cleaner öffnen",
    "lang.select": "Sprache",

    // Footer
    "footer.tagline": "Entwickelt für lokale, datenschutzorientierte Datenverarbeitung.",
    "footer.privacy": "Datenschutzerklärung",
    "footer.shopify": "Shopify-Bereiniger",
    "footer.mailchimp": "Mailchimp-Teiler",

    // Shopify Guide
    "shopify.seoTitle": "Shopify CSV Bereinigung | Importe lokal vorbereiten mit FixMyImport",
    "shopify.seoDesc": "Nutzen Sie FixMyImport zum Bereinigen, Entduplizieren und Aufteilen von Shopify-CSV-Dateien direkt im Browser.",
    "shopify.badge": "Shopify-Workflow",
    "shopify.title": "Shopify-CSV-Importe ohne Tabellen-Umweg vorbereiten.",
    "shopify.desc": "Starten Sie mit der Shopify-Voreinstellung in FixMyImport, wenn ein Produkt-, Kunden- oder Katalogexport vor dem erneuten Import bereinigt werden muss.",
    "shopify.card1.title": "Zuerst Voreinstellung nutzen",
    "shopify.card1.desc": "Die Shopify-Voreinstellung nutzt standardmäßig größenbewusstes Teilen, wiederholte Header und sichere Batches, die bei Fehlern leicht wiederholt werden können.",
    "shopify.card2.title": "Duplikate per Identitätsspalten entfernen",
    "shopify.card2.desc": "Wenn Ihre CSV E-Mail-, Handle- oder SKU-Spalten enthält, wählen Sie diese zuerst für eine gezielte Duplikaterkennung aus.",
    "shopify.card3.title": "Kleine, planbare Batches exportieren",
    "shopify.card3.desc": "Der ZIP-Export hält mehrteilige Downloads übersichtlich und erhält die exakte Header-Struktur in jeder Teildatei.",

    // Mailchimp Guide
    "mailchimp.seoTitle": "Mailchimp CSV zu groß | Importdateien aufteilen mit FixMyImport",
    "mailchimp.seoDesc": "Beheben Sie Probleme mit zu großen Mailchimp-CSVs durch browserbasiertes Teilen in kleinere Teildateien.",
    "mailchimp.badge": "Mailchimp-Leitfaden",
    "mailchimp.title": "Wenn die CSV zu groß ist, teilen Sie sie vor dem Import.",
    "mailchimp.desc": "FixMyImport macht es einfach: Zuerst Duplikate entfernen, dann die Liste in kleinere Dateien aufteilen, die leichter hochzuladen sind.",
    "mailchimp.card1.title": "Vor dem Teilen bereinigen",
    "mailchimp.card1.desc": "Entfernen Sie Leerzeichen und leere Zeilen zuerst, damit jede Ausgabedatei ihr Zeilenkontingent für echte Kontakte nutzt.",
    "mailchimp.card2.title": "Duplikate nach Spalte entfernen",
    "mailchimp.card2.desc": "Exakte Duplikaterkennung auf der E-Mail-Spalte ist der schnellste Weg, um doppelte Kontakte zu vermeiden.",
    "mailchimp.card3.title": "Planbare Batches exportieren",
    "mailchimp.card3.desc": "Teilen Sie nach Dateigröße oder Zeilenanzahl, behalten Sie Header in jeder Datei und laden Sie bei Bedarf alles als ZIP herunter.",

    // Privacy Page
    "privacy.seoTitle": "FixMyImport Datenschutz | Lokale CSV-Verarbeitung im Browser",
    "privacy.seoDesc": "Wie FixMyImport CSV-Dateien ohne Uploads, rein lokal und mit minimalistischer Datenübertragung handhabt.",
    "privacy.badge": "Datenschutz",
    "privacy.title": "Lokal per Standard, datensparsam nach Konzept.",
    "privacy.desc": "FixMyImport ist als Browser-First-CSV-Tool konzipiert. Standardmäßig werden keine Dateien hochgeladen oder CSV-Inhalte auf Servern gespeichert.",
    "privacy.card1.title": "CSV-Verarbeitung",
    "privacy.card1.desc": "CSV-Parsing, Bereinigung, Duplikatentfernung, Vorschau, Teilung und Exportvorbereitung laufen alle lokal im Browser ab.",
    "privacy.card2.title": "Analysen",
    "privacy.card2.desc": "Die App nutzt ausschließlich datenschutzfreundliche Ereignisse. Dateiinhalte, Spaltennamen und Zeilendaten werden niemals übermittelt.",
    "privacy.card3.title": "Kommerzielle Funktionen",
    "privacy.card3.desc": "Der Pro-Zugang ohne Konto speichert ein schlankes Freischalt-Token im lokalen Speicher, ohne ein Benutzerkontensystem vorauszusetzen.",
  },

  pt: {
    // Site metadata
    "site.title":
      "FixMyImport | Ferramentas gratuitas no navegador para CSV, desenvolvedores e tarefas diárias",
    "site.description":
      "Conheça as ferramentas do FixMyImport para limpar, deduplicar e dividir CSVs, além de utilitários rápidos para desenvolvedores 100% no navegador.",

    // Hero
    "hero.title": "Fix My Import",
    "hero.subtitle":
      "Uma suíte de ferramentas rápidas e leves para limpar planilhas bagunçadas, converter formatos e resolver tarefas diárias de desenvolvedores — tudo processado localmente no seu navegador.",
    "hero.badge.clientSide": "100% no navegador",
    "hero.badge.zeroUploads": "Zero uploads",

    // Section headings
    "section.csv": "Ferramentas de CSV e Importação",
    "section.utilities": "Utilitários para desenvolvedores e dia a dia",

    // Badges & Common
    "badge.comingSoon": "Em breve",
    "badge.live": "Disponível",
    "btn.tryCleaner": "Experimente o Limpador de CSV",
    "btn.openCleaner": "Abrir o Limpador de CSV",
    "lang.select": "Idioma",

    // Footer
    "footer.tagline": "Criado para processamento local de dados focado em privacidade.",
    "footer.privacy": "Política de Privacidade",
    "footer.shopify": "Limpador Shopify",
    "footer.mailchimp": "Divisor Mailchimp",

    // Shopify Guide
    "shopify.seoTitle": "Limpador CSV Shopify | Prepare importações localmente com FixMyImport",
    "shopify.seoDesc": "Use o FixMyImport para limpar, deduplicar e dividir importações de CSV da Shopify direto no navegador.",
    "shopify.badge": "Fluxo Shopify",
    "shopify.title": "Prepare importações de CSV da Shopify sem rodeios em planilhas.",
    "shopify.desc": "Comece com a predefinição da Shopify no FixMyImport quando uma exportação de produtos, clientes ou catálogo precisar de limpeza antes da reimportação.",
    "shopify.card1.title": "Use a predefinição primeiro",
    "shopify.card1.desc": "A predefinição da Shopify divide por tamanho, repete cabeçalhos e usa lotes conservadores fáceis de tentar novamente em caso de erro.",
    "shopify.card2.title": "Deduplique com colunas de identidade",
    "shopify.card2.desc": "Se seu CSV contiver email, handle ou SKU, selecione-os primeiro para deduplicação determinística em vez de comparar a linha toda.",
    "shopify.card3.title": "Exporte lotes pequenos e previsíveis",
    "shopify.card3.desc": "A exportação em ZIP mantém os downloads de vários arquivos organizados, preservando os mesmos cabeçalhos em cada arquivo.",

    // Mailchimp Guide
    "mailchimp.seoTitle": "CSV do Mailchimp muito grande | Divida arquivos de importação",
    "mailchimp.seoDesc": "Resolva importações de CSV grandes no Mailchimp dividindo os arquivos em lotes menores no navegador.",
    "mailchimp.badge": "Guia do Mailchimp",
    "mailchimp.title": "Quando o CSV for grande demais, divida-o antes de importar.",
    "mailchimp.desc": "O FixMyImport simplifica: remova duplicatas primeiro e depois divida a lista em arquivos menores e fáceis de carregar.",
    "mailchimp.card1.title": "Limpe antes de dividir",
    "mailchimp.card1.desc": "Remova espaços em branco e linhas vazias primeiro para aproveitar o limite de linhas com contatos reais.",
    "mailchimp.card2.title": "Deduplicação por coluna selecionada",
    "mailchimp.card2.desc": "A correspondência exata na coluna de email é a forma mais rápida de evitar importações duplicadas.",
    "mailchimp.card3.title": "Exporte lotes previsíveis",
    "mailchimp.card3.desc": "Divida por tamanho ou linhas, mantenha os cabeçalhos em cada arquivo e baixe o lote completo em ZIP.",

    // Privacy Page
    "privacy.seoTitle": "Privacidade FixMyImport | Processamento local de CSV no navegador",
    "privacy.seoDesc": "Como o FixMyImport gerencia arquivos CSV com processamento 100% local e total respeito à sua privacidade.",
    "privacy.badge": "Privacidade",
    "privacy.title": "Local por padrão, seguro por design.",
    "privacy.desc": "O FixMyImport é um utilitário focado no navegador. A experiência padrão não faz upload de arquivos nem armazena conteúdo CSV em servidores.",
    "privacy.card1.title": "Processamento de CSV",
    "privacy.card1.desc": "A análise, limpeza, remoção de duplicatas, visualização, divisão e preparação para exportação de CSV ocorrem localmente no navegador.",
    "privacy.card2.title": "Estatísticas",
    "privacy.card2.desc": "O app utiliza apenas eventos que respeitam a privacidade. Conteúdo de arquivos, nomes de colunas e dados de linhas nunca são enviados.",
    "privacy.card3.title": "Camada comercial",
    "privacy.card3.desc": "O acesso Pro sem autenticação armazena um token leve no armazenamento local, sem necessidade de cadastrar contas.",
  },

  ko: {
    // Site metadata
    "site.title":
      "FixMyImport | 브라우저 기반 무료 CSV, 개발자 및 일상 업무 도구",
    "site.description":
      "CSV 파일 정리, 중복 제거, 분할 및 브라우저에서 100% 실행되는 실용적인 개발자 유틸리티 도구를 만나보세요.",

    // Hero
    "hero.title": "Fix My Import",
    "hero.subtitle":
      "복잡한 스프레드시트 정리, 포맷 변환, 일상적인 개발 작업 해결을 위한 빠르고 가벼운 도구 모음 — 모두 브라우저에서 로컬로 처리됩니다.",
    "hero.badge.clientSide": "100% 클라이언트 측",
    "hero.badge.zeroUploads": "업로드 없음",

    // Section headings
    "section.csv": "CSV 및 가져오기 도구",
    "section.utilities": "개발자 및 일상 유틸리티",

    // Badges & Common
    "badge.comingSoon": "출시 예정",
    "badge.live": "사용 가능",
    "btn.tryCleaner": "대신 CSV 가져오기 정리기 사용하기",
    "btn.openCleaner": "CSV 가져오기 정리기 열기",
    "lang.select": "언어",

    // Footer
    "footer.tagline": "개인정보 보호를 우선하는 로컬 데이터 처리를 위해 구축되었습니다.",
    "footer.privacy": "개인정보 처리방침",
    "footer.shopify": "Shopify 정리기",
    "footer.mailchimp": "Mailchimp 분할기",

    // Shopify Guide
    "shopify.seoTitle": "Shopify CSV 정리기 | FixMyImport로 로컬에서 가져오기 준비",
    "shopify.seoDesc": "브라우저에서 직접 Shopify CSV 가져오기 데이터를 정리, 중복 제거 및 분할하세요.",
    "shopify.badge": "Shopify 워크플로우",
    "shopify.title": "스프레드시트 우회 없이 Shopify CSV 가져오기 준비.",
    "shopify.desc": "제품, 고객 또는 카탈로그 내보내기 파일을 다시 가져오기 전에 정리가 필요할 때 FixMyImport의 Shopify 프리셋으로 시작하세요.",
    "shopify.card1.title": "먼저 프리셋 사용",
    "shopify.card1.desc": "Shopify 프리셋은 파일 크기 기반 분할, 헤더 반복, 오류 시 재시도하기 쉬운 배치 설정을 기본으로 제공합니다.",
    "shopify.card2.title": "고유 식별 컬럼으로 중복 제거",
    "shopify.card2.desc": "CSV에 이메일, 핸들(handle), SKU 컬럼이 포함되어 있다면 전체 행 대신 해당 컬럼을 선택하여 정확한 중복 제거를 실행하세요.",
    "shopify.card3.title": "작고 예측 가능한 배치로 내보내기",
    "shopify.card3.desc": "ZIP 내보내기는 각 배치 파일마다 동일한 헤더 구조를 유지하면서 여러 파일 다운로드를 깔끔하게 정리해 줍니다.",

    // Mailchimp Guide
    "mailchimp.seoTitle": "Mailchimp CSV 용량 초과 해결 | FixMyImport 파일 분할 도구",
    "mailchimp.seoDesc": "용량이 너무 큰 Mailchimp CSV 파일을 브라우저에서 안전하게 작은 파일로 나누어 오류를 방지하세요.",
    "mailchimp.badge": "Mailchimp 가이드",
    "mailchimp.title": "CSV가 너무 크다면 가져오기 전에 미리 분할하세요.",
    "mailchimp.desc": "FixMyImport는 간단합니다. 먼저 중복을 제거한 후, 업로드 및 재시도가 용이한 작은 파일들로 분할하세요.",
    "mailchimp.card1.title": "분할 전 데이터 정리",
    "mailchimp.card1.desc": "공백을 다듬고 빈 행을 먼저 제거하여 각 출력 파일의 행 한도를 실제 연락처에 온전히 활용하세요.",
    "mailchimp.card2.title": "선택 컬럼 중복 제거",
    "mailchimp.card2.desc": "이메일 컬럼의 일치 항목을 기준으로 중복을 제거하는 것이 중복 가져오기 문제를 방지하는 가장 빠른 방법입니다.",
    "mailchimp.card3.title": "예측 가능한 배치 내보내기",
    "mailchimp.card3.desc": "크기나 행 수로 분할하고, 모든 파일에 헤더를 유지하며, 필요 시 전체 배치를 ZIP 파일로 다운로드하세요.",

    // Privacy Page
    "privacy.seoTitle": "FixMyImport 개인정보 보호 | 로컬 브라우저 CSV 처리",
    "privacy.seoDesc": "FixMyImport가 서버 업로드 없이 브라우저 내에서 안전하게 데이터를 처리하는 방법.",
    "privacy.badge": "개인정보 보호",
    "privacy.title": "기본적으로 로컬 처리, 최소화된 수집 설계.",
    "privacy.desc": "FixMyImport는 브라우저 우선 CSV 도구입니다. 기본적으로 파일을 서버에 업로드하거나 저장하지 않습니다.",
    "privacy.card1.title": "CSV 처리",
    "privacy.card1.desc": "CSV 파싱, 정리, 중복 제거, 미리보기 생성, 분할 및 내보내기 준비가 모두 브라우저에서 로컬로 실행됩니다.",
    "privacy.card2.title": "분석 및 로그",
    "privacy.card2.desc": "본 앱은 개인정보를 존중하는 이벤트 훅만 사용합니다. 파일 내용, 컬럼 이름, 행 데이터는 분석 속성으로 전송되지 않습니다.",
    "privacy.card3.title": "상용 기능",
    "privacy.card3.desc": "계정이 필요 없는 Pro 플로우는 로컬 스토리지에 가벼운 잠금 해제 토큰을 저장합니다. 사용자 계정 생성 없이 편리하게 동작합니다.",
  },

  it: {
    // Site metadata
    "site.title":
      "FixMyImport | Strumenti gratuiti nel browser per CSV, sviluppatori e attività quotidiane",
    "site.description":
      "Scopri gli strumenti di FixMyImport per pulire, deduplicare e dividere file CSV, oltre a pratiche utilità per sviluppatori 100% nel browser.",

    // Hero
    "hero.title": "Fix My Import",
    "hero.subtitle":
      "Una suite di strumenti veloci e leggeri per pulire fogli di calcolo disordinati, convertire formati e risolvere le attività quotidiane di sviluppo — tutto elaborato localmente nel browser.",
    "hero.badge.clientSide": "100% Nel browser",
    "hero.badge.zeroUploads": "Zero caricamenti",

    // Section headings
    "section.csv": "Strumenti CSV e Importazione",
    "section.utilities": "Utilità per sviluppatori e quotidiane",

    // Badges & Common
    "badge.comingSoon": "Prossimamente",
    "badge.live": "Disponibile",
    "btn.tryCleaner": "Prova invece il Pulitore CSV",
    "btn.openCleaner": "Apri il Pulitore CSV",
    "lang.select": "Lingua",

    // Footer
    "footer.tagline": "Progettato per l'elaborazione locale dei dati nel rispetto della privacy.",
    "footer.privacy": "Informativa sulla Privacy",
    "footer.shopify": "Pulitore Shopify",
    "footer.mailchimp": "Divisore Mailchimp",

    // Shopify Guide
    "shopify.seoTitle": "Pulitore CSV Shopify | Prepara le importazioni localmente con FixMyImport",
    "shopify.seoDesc": "Usa FixMyImport per pulire, deduplicare e dividere file CSV di Shopify direttamente nel tuo browser.",
    "shopify.badge": "Flusso di lavoro Shopify",
    "shopify.title": "Prepara le importazioni CSV di Shopify senza passare per i fogli di calcolo.",
    "shopify.desc": "Inizia con il preset Shopify in FixMyImport quando un export di prodotti, clienti o catalogo deve essere pulito prima della re-importazione.",
    "shopify.card1.title": "Usa prima il preset",
    "shopify.card1.desc": "Il preset Shopify include suddivisione per dimensione, intestazioni ripetute e batch prudenti facili da ritentare in caso di errore.",
    "shopify.card2.title": "Deduplica con le colonne identificative",
    "shopify.card2.desc": "Se il CSV contiene email, handle o SKU, selezionali per una deduplicazione precisa invece di confrontare l'intera riga.",
    "shopify.card3.title": "Esporta batch piccoli e prevedibili",
    "shopify.card3.desc": "L'esportazione ZIP mantiene ordinati i download multipli preservando la struttura delle intestazioni in ogni file.",

    // Mailchimp Guide
    "mailchimp.seoTitle": "CSV Mailchimp troppo grande | Dividi i file di importazione",
    "mailchimp.seoDesc": "Risolvi i problemi dei file CSV Mailchimp troppo grandi dividendoli in parti più piccole nel browser.",
    "mailchimp.badge": "Guida Mailchimp",
    "mailchimp.title": "Quando il CSV è troppo grande, dividilo prima dell'importazione.",
    "mailchimp.desc": "FixMyImport lo rende semplice: rimuovi prima i duplicati, poi dividi l'elenco in file più piccoli facili da caricare.",
    "mailchimp.card1.title": "Pulisci prima di dividere",
    "mailchimp.card1.desc": "Elimina spazi e righe vuote prima di dividere in modo che ogni file contenga solo contatti validi.",
    "mailchimp.card2.title": "Deduplica per colonna specifica",
    "mailchimp.card2.desc": "La deduplicazione esatta sulla colonna email è il modo più rapido per evitare contatti duplicati.",
    "mailchimp.card3.title": "Esporta batch prevedibili",
    "mailchimp.card3.desc": "Dividi per dimensione o numero di righe, mantieni le intestazioni in ogni file e scarica tutto come ZIP se necessario.",

    // Privacy Page
    "privacy.seoTitle": "Privacy FixMyImport | Elaborazione CSV locale e sicura nel browser",
    "privacy.seoDesc": "Come FixMyImport gestisce i file CSV con elaborazione locale al 100% e massima attenzione alla privacy.",
    "privacy.badge": "Privacy",
    "privacy.title": "Locale per impostazione predefinita, essenziale per progettazione.",
    "privacy.desc": "FixMyImport è progettato come un'utilità per browser. Non carica file né memorizza contenuti CSV sui server.",
    "privacy.card1.title": "Gestione dei CSV",
    "privacy.card1.desc": "Analisi, pulizia, deduplicazione, anteprima, suddivisione ed esportazione dei file CSV avvengono interamente in locale nel browser.",
    "privacy.card2.title": "Analisi",
    "privacy.card2.desc": "L'app include solo tracciamenti rispettosi della privacy. Contenuto dei file, nomi delle colonne e righe non vengono mai inviati.",
    "privacy.card3.title": "Funzionalità commerciali",
    "privacy.card3.desc": "La modalità Pro senza account memorizza un token leggero nel local storage, senza richiedere registrazioni o profili utente.",
  },
}
