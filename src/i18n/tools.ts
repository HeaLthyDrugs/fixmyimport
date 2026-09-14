import { toolCatalog, type ToolDefinition } from "@/lib/tools"
import { type Lang, defaultLang, showDefaultLang } from "./ui"

export interface LocalizedToolContent {
  name: string
  summary: string
  description: string
  metric: string
  seoTitle: string
  seoDescription: string
  // Detail page specifics for tools
  h1?: string
  lead?: string
  cards?: Array<{
    title: string
    desc: string
  }>
}

export const toolTranslations: Record<
  Lang,
  Record<string, LocalizedToolContent>
> = {
  en: {
    "csv-import-cleaner": {
      name: "CSV Import Cleaner",
      summary: "Clean, dedupe, and split import-ready CSVs in the browser.",
      description:
        "Fix messy CSV exports locally, preview the output with an Excel-like grid, and download import-ready files without sending your data anywhere.",
      metric: "Browser-first import repair",
      seoTitle: "CSV Import Cleaner | FixMyImport",
      seoDescription:
        "Clean, dedupe, and split import-ready CSV files locally in your browser with the FixMyImport CSV Import Cleaner.",
    },
    "csv-column-mapper": {
      name: "CSV Column Mapper",
      summary:
        "Rename, reorder, and drop columns so your CSV fits the target.",
      description:
        "Match columns from one system to another. Rename headers, change the order, and remove what you don't need — all before you import.",
      metric: "Header alignment made easy",
      seoTitle: "CSV Column Mapper | FixMyImport",
      seoDescription:
        "Rename, reorder, and drop CSV columns locally in your browser to match any import format with FixMyImport.",
      h1: "Rename and reorder columns so your CSV fits the target system.",
      lead: "Match columns from one format to another — rename headers, change the order, and drop what you don't need. All in the browser, nothing uploaded.",
      cards: [
        {
          title: "Map columns visually",
          desc: "Pick a source column, choose what it should be called in the target, and see the result update instantly.",
        },
        {
          title: "Save mapping templates",
          desc: "Reuse the same column mapping next time instead of setting it up from scratch.",
        },
        {
          title: "Drop columns you don't need",
          desc: "Remove extra columns before exporting so the output file only has what the import expects.",
        },
      ],
    },
    "csv-merge": {
      name: "CSV Merge",
      summary: "Combine multiple CSV files into one.",
      description:
        "Upload several CSVs, line up the columns automatically, and merge them into a single file. Great for joining batch exports back together.",
      metric: "Multi-file to single file",
      seoTitle: "CSV Merge | FixMyImport",
      seoDescription:
        "Merge and combine multiple CSV files into one locally in your browser with FixMyImport CSV Merge.",
      h1: "Combine multiple CSV files into a single import-ready file.",
      lead: "Upload several CSVs, line up the columns automatically, and merge everything into one file — right in your browser.",
      cards: [
        {
          title: "Auto-align columns",
          desc: "Headers are matched across files so rows end up in the right columns, even if the column order differs.",
        },
        {
          title: "Spot mismatches early",
          desc: "Get a warning when files have columns that don't exist in the others, so you can decide what to keep or drop.",
        },
        {
          title: "Undo a batch split",
          desc: "If you previously split a large file into parts, merge them back into one whenever you need the full dataset.",
        },
      ],
    },
    "import-validator": {
      name: "Import Validator",
      summary:
        "Check if your file is ready to import before you upload it.",
      description:
        "Pick a platform like Shopify or Mailchimp, then run a quick check for missing columns, bad emails, and file size limits — so nothing breaks on upload.",
      metric: "Pre-flight import check",
      seoTitle: "Import Validator | FixMyImport",
      seoDescription:
        "Validate your CSV against platform rules before importing. Catch missing columns, format errors, and size limits with FixMyImport.",
      h1: "Check if your CSV is ready to import — before you upload it.",
      lead: "Pick a platform like Shopify or Mailchimp, upload your file, and get a quick report on what's missing, what's broken, and what might fail on import.",
      cards: [
        {
          title: "Check required columns",
          desc: "See which columns the target platform expects and which ones are missing from your file.",
        },
        {
          title: "Catch bad data early",
          desc: "Find rows with invalid emails, empty required fields, or unexpected values before they cause import errors.",
        },
        {
          title: "File size and row limit check",
          desc: "Know upfront if your file exceeds the platform's size or row limits so you can split it first.",
        },
      ],
    },
    "binary-to-text": {
      name: "Binary to Text Converter",
      summary:
        "Convert text to binary (and binary to text) in real time with UTF-8 & ASCII support.",
      description:
        "Instant bi-directional binary converter with customizable delimiters, bit-widths, byte breakdown, and Hex/Base64 inspector.",
      metric: "Instant UTF-8 & ASCII converter",
      seoTitle:
        "Binary to Text & Text to Binary Converter | FixMyImport",
      seoDescription:
        "Convert binary to text and text to binary instantly in your browser. Supports UTF-8, ASCII, 8-bit bytes, Hex, Base64, and character breakdown.",
    },
    "case-converter": {
      name: "Case & Text Formatter",
      summary:
        "Convert text case between UPPERCASE, lowercase, Title Case, camelCase, and snake_case.",
      description:
        "Instantly change text capitalization, count characters and words, and transform strings into developer-friendly casing.",
      metric: "Fast text case conversion",
      seoTitle: "Case Converter & Text Formatter | FixMyImport",
      seoDescription:
        "Convert text between uppercase, lowercase, title case, camelCase, snake_case, and kebab-case instantly in your browser.",
    },
    "base64-converter": {
      name: "Base64 Encoder / Decoder",
      summary:
        "Encode and decode text, images, and files into Base64 format locally.",
      description:
        "Quickly encode strings to Base64 or decode Base64 strings back to plain text, images, and data URIs without server uploads.",
      metric: "Client-side Base64 converter",
      seoTitle: "Base64 Encoder & Decoder | FixMyImport",
      seoDescription:
        "Encode and decode text, files, and images to and from Base64 instantly in your browser.",
    },
    "json-formatter": {
      name: "JSON Formatter & Validator",
      summary:
        "Format, validate, prettify, and minify JSON data with error highlights.",
      description:
        "Paste messy JSON to format it with custom indentation, validate syntax errors, and generate TypeScript interfaces in real time.",
      metric: "Instant JSON prettifier",
      seoTitle: "JSON Formatter & Validator | FixMyImport",
      seoDescription:
        "Format, validate, prettify, and minify JSON strings with real-time error detection.",
    },
    "qr-code-generator": {
      name: "QR Code Generator",
      summary:
        "Generate custom QR codes for URLs, WiFi passwords, and contact cards.",
      description:
        "Create high-resolution QR codes for links, text, and WiFi networks with zero ads and offline client-side rendering.",
      metric: "Offline QR code maker",
      seoTitle: "QR Code Generator | FixMyImport",
      seoDescription:
        "Generate clean, high-resolution QR codes for links, WiFi networks, and plain text locally in your browser.",
    },
    "unix-timestamp": {
      name: "Unix Timestamp Converter",
      summary:
        "Convert epoch timestamps to human-readable dates and timezone formats.",
      description:
        "Convert seconds and milliseconds to UTC and local date formats, relative time, and ISO 8601 strings.",
      metric: "Epoch & date converter",
      seoTitle: "Unix Timestamp Converter | FixMyImport",
      seoDescription:
        "Convert Unix epoch timestamps to human-readable dates, UTC, and local timezones instantly.",
    },
    "uuid-generator": {
      name: "UUID / ULID Generator",
      summary:
        "Generate random UUID v4, UUID v7, ULID, and NanoIDs in bulk.",
      description:
        "Batch generate cryptographically secure unique identifiers for database seeding, mock data, and development testing.",
      metric: "Secure batch ID generator",
      seoTitle: "UUID & ULID Generator | FixMyImport",
      seoDescription:
        "Generate cryptographically secure UUID v4, UUID v7, and ULID identifiers in bulk locally in your browser.",
    },
  },

  es: {
    "csv-import-cleaner": {
      name: "Limpiador de CSV para Importación",
      summary:
        "Limpia, deduplica y divide archivos CSV listos para importar en el navegador.",
      description:
        "Repara exportaciones CSV desordenadas localmente, obtén vista previa en una cuadrícula tipo Excel y descarga archivos listos para importar sin enviar tus datos.",
      metric: "Reparación de CSV en el navegador",
      seoTitle: "Limpiador de CSV para Importación | FixMyImport",
      seoDescription:
        "Limpia, deduplica y divide archivos CSV listos para importar localmente en tu navegador con FixMyImport.",
    },
    "csv-column-mapper": {
      name: "Mapeador de Columnas CSV",
      summary:
        "Renombra, reordena y elimina columnas para adaptar tu CSV al formato de destino.",
      description:
        "Haz coincidir columnas entre diferentes sistemas. Renombra encabezados, cambia el orden y elimina lo innecesario antes de importar.",
      metric: "Alineación de encabezados simple",
      seoTitle: "Mapeador de Columnas CSV | FixMyImport",
      seoDescription:
        "Renombra, reordena y elimina columnas CSV localmente en tu navegador para adaptarlas a cualquier formato de importación con FixMyImport.",
      h1: "Renombra y reordena columnas para que tu CSV encaje con el sistema de destino.",
      lead: "Haz coincidir columnas de un formato a otro: renombra encabezados, cambia el orden y elimina lo innecesario. Todo en tu navegador, sin subir datos.",
      cards: [
        {
          title: "Mapea columnas visualmente",
          desc: "Selecciona una columna de origen, elige cómo debe llamarse en el destino y observa la actualización al instante.",
        },
        {
          title: "Guarda plantillas de mapeo",
          desc: "Reutiliza el mismo mapeo de columnas la próxima vez sin tener que configurarlo desde cero.",
        },
        {
          title: "Elimina columnas innecesarias",
          desc: "Suprime columnas sobrantes antes de exportar para que el archivo de salida solo contenga lo esperado.",
        },
      ],
    },
    "csv-merge": {
      name: "Unir y Combinar CSV",
      summary: "Combina múltiples archivos CSV en uno solo.",
      description:
        "Carga varios CSV, alinea las columnas automáticamente y únelos en un solo archivo. Ideal para reunificar exportaciones divididas.",
      metric: "Varios archivos a uno solo",
      seoTitle: "Unir Archivos CSV | FixMyImport",
      seoDescription:
        "Une y combina múltiples archivos CSV en uno solo localmente en tu navegador con FixMyImport CSV Merge.",
      h1: "Combina varios archivos CSV en un único archivo listo para importar.",
      lead: "Carga varios CSV, alinea las columnas automáticamente y únelos todo en un solo archivo directamente en tu navegador.",
      cards: [
        {
          title: "Alineación automática de columnas",
          desc: "Los encabezados se comparan entre archivos para que las filas queden en las columnas correctas, aun con orden diferente.",
        },
        {
          title: "Detecta discrepancias de antemano",
          desc: "Recibe avisos cuando los archivos tengan columnas ausentes en otros, para decidir qué conservar o descartar.",
        },
        {
          title: "Reunifica lotes divididos",
          desc: "Si dividiste un archivo grande en partes, únelos de nuevo cuando necesites el conjunto completo de datos.",
        },
      ],
    },
    "import-validator": {
      name: "Validador de Importación CSV",
      summary:
        "Verifica si tu archivo está listo para importar antes de subirlo.",
      description:
        "Elige una plataforma como Shopify o Mailchimp y ejecuta un análisis rápido de columnas faltantes, correos inválidos y límites de tamaño.",
      metric: "Verificación previa de importación",
      seoTitle: "Validador de Importaciones CSV | FixMyImport",
      seoDescription:
        "Valida tu CSV con las reglas de cada plataforma antes de importar. Detecta columnas faltantes y errores con FixMyImport.",
      h1: "Comprueba si tu CSV está listo para importar antes de subirlo.",
      lead: "Selecciona una plataforma como Shopify o Mailchimp, carga tu archivo y obtén un informe rápido de lo que falta o puede fallar.",
      cards: [
        {
          title: "Verifica columnas obligatorias",
          desc: "Descubre qué columnas espera la plataforma de destino y cuáles faltan en tu archivo.",
        },
        {
          title: "Detecta datos erróneos a tiempo",
          desc: "Encuentra filas con correos no válidos, campos obligatorios vacíos o valores imprevistos antes del error.",
        },
        {
          title: "Control de tamaño y límite de filas",
          desc: "Comprueba si tu archivo supera los límites de tamaño o filas permitidos para poder dividirlo con antelación.",
        },
      ],
    },
    "binary-to-text": {
      name: "Convertidor Binario a Texto y Texto a Binario",
      summary:
        "Convierte texto a binario y binario a texto en tiempo real con soporte UTF-8 y ASCII.",
      description:
        "Convertidor binario bidireccional instantáneo con delimitadores configurables, visualización de bytes e inspección Hex/Base64.",
      metric: "Convertidor instantáneo UTF-8 y ASCII",
      seoTitle:
        "Convertidor Binario a Texto y Texto a Binario | FixMyImport",
      seoDescription:
        "Convierte binario a texto y texto a binario al instante en tu navegador. Compatible con UTF-8, ASCII, bytes de 8 bits, Hex y Base64.",
    },
    "case-converter": {
      name: "Conversor de Mayúsculas y Formato de Texto",
      summary:
        "Convierte texto entre MAYÚSCULAS, minúsculas, Tipo Título, camelCase y snake_case.",
      description:
        "Cambia mayúsculas y minúsculas al instante, cuenta palabras y caracteres, y transforma cadenas para desarrollo.",
      metric: "Conversión veloz de formato de texto",
      seoTitle:
        "Conversor de Mayúsculas y Formato de Texto | FixMyImport",
      seoDescription:
        "Convierte texto entre mayúsculas, minúsculas, formato título, camelCase, snake_case y kebab-case en tu navegador.",
    },
    "base64-converter": {
      name: "Codificador y Decodificador Base64",
      summary:
        "Codifica y decodifica texto, imágenes y archivos a formato Base64 localmente.",
      description:
        "Convierte cadenas a Base64 o decodifica Base64 a texto plano, imágenes y data URIs sin subidas a servidores.",
      metric: "Conversor Base64 en el cliente",
      seoTitle: "Codificador y Decodificador Base64 | FixMyImport",
      seoDescription:
        "Codifica y decodifica texto, imágenes y archivos hacia y desde Base64 al instante en tu navegador.",
    },
    "json-formatter": {
      name: "Formateador y Validador JSON",
      summary:
        "Formatea, valida, embellece y comprime datos JSON con resaltado de errores.",
      description:
        "Pega JSON desordenado para formatearlo con sangría personalizada, validar sintaxis y generar interfaces TypeScript.",
      metric: "Embellecedor JSON instantáneo",
      seoTitle: "Formateador y Validador JSON | FixMyImport",
      seoDescription:
        "Formatea, valida, embellece y minifica cadenas JSON con detección de errores en tiempo real.",
    },
    "qr-code-generator": {
      name: "Generador de Códigos QR",
      summary:
        "Crea códigos QR personalizados para enlaces, redes WiFi y tarjetas de contacto.",
      description:
        "Genera códigos QR de alta resolución para enlaces, texto y redes WiFi sin publicidad y de forma local.",
      metric: "Creador de QR sin conexión",
      seoTitle: "Generador de Códigos QR | FixMyImport",
      seoDescription:
        "Crea códigos QR limpios y de alta resolución para enlaces, WiFi y texto directamente en tu navegador.",
    },
    "unix-timestamp": {
      name: "Convertidor de Marca de Tiempo Unix (Timestamp)",
      summary:
        "Convierte timestamps epoch a fechas legibles y diferentes zonas horarias.",
      description:
        "Convierte segundos y milisegundos a fechas UTC y locales, tiempo relativo y cadenas ISO 8601.",
      metric: "Conversor de epoch y fechas",
      seoTitle: "Convertidor de Timestamp Unix | FixMyImport",
      seoDescription:
        "Convierte marcas de tiempo epoch a fechas legibles, formato UTC y zonas horarias locales al instante.",
    },
    "uuid-generator": {
      name: "Generador de UUID y ULID",
      summary:
        "Genera identificadores aleatorios UUID v4, UUID v7, ULID y NanoID en lote.",
      description:
        "Genera identificadores únicos criptográficamente seguros para bases de datos, datos de prueba y desarrollo.",
      metric: "Generador seguro de IDs en lote",
      seoTitle: "Generador de UUID y ULID | FixMyImport",
      seoDescription:
        "Genera identificadores seguros UUID v4, UUID v7 y ULID en lote localmente en tu navegador.",
    },
  },

  ja: {
    "csv-import-cleaner": {
      name: "CSVインポートクリーナー",
      summary:
        "ブラウザ上でインポート用CSVのクリーンアップ、重複削除、ファイル分割を実行。",
      description:
        "乱雑なCSVエクスポートをローカルで修正し、Excel風のグリッドで出力をプレビューし、データをどこにも送信せずにインポート可能なファイルをダウンロードできます。",
      metric: "ブラウザ完結のインポート修復",
      seoTitle: "CSVインポートクリーナー | FixMyImport",
      seoDescription:
        "FixMyImport CSVインポートクリーナーを使用して、ブラウザ上でローカルにインポート用CSVファイルの整理、重複削除、分割を行います。",
    },
    "csv-column-mapper": {
      name: "CSVカラムマッパー",
      summary:
        "列の名前変更、並べ替え、削除を行って、対象システムにCSVを適合させます。",
      description:
        "異なるシステム間の列を一致させます。インポート前にヘッダーの名前変更、並べ替え、不要な列の削除を行います。",
      metric: "ヘッダーの整列が簡単に",
      seoTitle: "CSVカラムマッパー | FixMyImport",
      seoDescription:
        "FixMyImportを使用して、任意のインポート形式に合わせてブラウザ上でローカルにCSV列の名前変更、並べ替え、削除を実行します。",
      h1: "対象システムに合わせてCSVの列名を変更・並べ替え。",
      lead: "ある形式から別の形式へ列をマッピング。ヘッダーの名前変更、並べ替え、不要な列の削除をすべてブラウザ上で完結します。",
      cards: [
        {
          title: "視覚的に列をマッピング",
          desc: "変換元の列を選び、対象の名称を指定すると、リアルタイムに結果がプレビューされます。",
        },
        {
          title: "マッピングテンプレートを保存",
          desc: "一度作成した列マッピングを保存し、次回以降ゼロから設定する手間を省きます。",
        },
        {
          title: "不要な列を削除",
          desc: "インポートで必要な列のみが含まれるよう、余分な列をエクスポート前に除外します。",
        },
      ],
    },
    "csv-merge": {
      name: "CSV結合ツール",
      summary: "複数のCSVファイルを1つに結合します。",
      description:
        "複数のCSVを読み込み、自動的に列を揃えて単一ファイルに統合します。分割されたエクスポートファイルの再統合に最適です。",
      metric: "複数ファイルを1つに集約",
      seoTitle: "CSV結合ツール | FixMyImport",
      seoDescription:
        "FixMyImport CSV結合ツールを使って、ブラウザ上で複数のCSVファイルを自動整列して1つにまとめます。",
      h1: "複数のCSVファイルをインポート可能な単一ファイルに結合。",
      lead: "複数のCSVをアップロードし、自動的に列を揃え、ブラウザ内ですべてを1つのファイルにまとめます。",
      cards: [
        {
          title: "列の自動整列",
          desc: "ファイル間でヘッダーを自動照合するため、列順が異なっていても正しい位置に行が配置されます。",
        },
        {
          title: "不一致を早期に発見",
          desc: "他ファイルに存在しない列がある場合は警告が表示され、保持するか削除するかを選択できます。",
        },
        {
          title: "分割されたバッチの復元",
          desc: "以前に分割した大容量ファイルを、完全なデータセットが必要なときに元の1ファイルに戻せます。",
        },
      ],
    },
    "import-validator": {
      name: "インポートバリデータ",
      summary:
        "アップロード前にCSVがインポート可能かどうかを事前検証します。",
      description:
        "ShopifyやMailchimpなどの対象サービスを選択し、必須列の不足、メール形式の誤り、ファイルサイズ制限を素早く検証します。",
      metric: "インポート事前検証チェック",
      seoTitle: "インポートバリデータ | FixMyImport",
      seoDescription:
        "インポート前にサービスごとのルールに従ってCSVを検証。不足している列やフォーマットエラーを事前に検出します。",
      h1: "アップロード前にCSVのインポート準備が整っているか検証。",
      lead: "ShopifyやMailchimpなどを選択してファイルを読み込み、不足項目やエラーの可能性を事前に診断します。",
      cards: [
        {
          title: "必須列の確認",
          desc: "対象プラットフォームで必須とされている列がファイル内に揃っているかを確認します。",
        },
        {
          title: "無効データの事前検知",
          desc: "無効なメールアドレス、空の必須項目、想定外の値をインポート前に特定します。",
        },
        {
          title: "サイズと行数の上限チェック",
          desc: "各サービスのファイル容量や行数制限を超えていないかを事前に把握できます。",
        },
      ],
    },
    "binary-to-text": {
      name: "バイナリ テキスト 変換ツール",
      summary:
        "UTF-8およびASCIIに対応し、テキストとバイナリをリアルタイムで双方向変換。",
      description:
        "区切り文字、ビット幅、バイト詳細、Hex/Base64インスペクタを備えた即時双方向バイナリコンバータ。",
      metric: "高速 UTF-8 & ASCII 変換",
      seoTitle:
        "バイナリ テキスト 変換 & テキスト バイナリ 変換 | FixMyImport",
      seoDescription:
        "ブラウザ上でバイナリとテキストを即座に相互変換。UTF-8、ASCII、8ビットバイト、16進数、Base64に対応。",
    },
    "case-converter": {
      name: "文字ケース変換 & テキストフォーマッタ",
      summary:
        "大文字、小文字、タイトルケース、camelCase、snake_caseへのテキスト変換。",
      description:
        "テキストの大文字小文字の変換、文字数・単語数のカウント、開発に適した命名規則への整形を即座に行います。",
      metric: "高速テキストケース変換",
      seoTitle:
        "文字ケース変換 & テキストフォーマッタ | FixMyImport",
      seoDescription:
        "大文字、小文字、キャメルケース、スネークケース、ケバブケースへのテキスト変換をブラウザで即座に実行。",
    },
    "base64-converter": {
      name: "Base64 エンコーダ / デコーダ",
      summary:
        "テキスト、画像、ファイルをローカルでBase64形式に相互変換。",
      description:
        "文字列をBase64に即座にエンコード、またはBase64文字列をプレーンテキストや画像、Data URIに復元します。",
      metric: "クライアント側Base64変換",
      seoTitle: "Base64 エンコーダ & デコーダ | FixMyImport",
      seoDescription:
        "ブラウザ上でテキスト、ファイル、画像をBase64形式と即座に相互エンコード・デコード。",
    },
    "json-formatter": {
      name: "JSON 整形 & バリデータ",
      summary:
        "エラー箇所の強調表示付きでJSONデータの整形、検証、圧縮を実行。",
      description:
        "乱雑なJSONを貼り付けてインデントを整え、構文エラーを検出し、TypeScriptインターフェースを生成します。",
      metric: "即時JSONフォーマッタ",
      seoTitle: "JSON 整形 & バリデータ | FixMyImport",
      seoDescription:
        "リアルタイムのエラー検知機能を備えたJSON文字列の整形、バリデーション、縮小化ツール。",
    },
    "qr-code-generator": {
      name: "QRコード生成ツール",
      summary:
        "URL、WiFiパスワード、連絡先カード用のカスタムQRコードを生成。",
      description:
        "広告なし・オフラインのブラウザ描画で、リンクやWiFi用の高解像度QRコードを作成します。",
      metric: "オフラインQRコード作成",
      seoTitle: "QRコード生成ツール | FixMyImport",
      seoDescription:
        "リンクやWiFiネットワーク、テキスト用のクリーンで高解像度なQRコードをローカルで作成。",
    },
    "unix-timestamp": {
      name: "UNIXタイムスタンプ変換",
      summary:
        "エポックタイムスタンプを人が読める日付やタイムゾーン形式に変換。",
      description:
        "秒・ミリ秒をUTCやローカル日時、相対時間、ISO 8601文字列に相互変換します。",
      metric: "エポック＆日時コンバータ",
      seoTitle: "UNIXタイムスタンプ変換ツール | FixMyImport",
      seoDescription:
        "UNIXエポックタイムスタンプを人間が読める日時やUTC、ローカルタイムゾーンに即座に変換。",
    },
    "uuid-generator": {
      name: "UUID / ULID 生成ツール",
      summary: "UUID v4、UUID v7、ULID、NanoIDを一括ランダム生成。",
      description:
        "データベースの初期データやテスト用に暗号学的に安全な一意の識別子をバッチ生成します。",
      metric: "安全な一括IDジェネレータ",
      seoTitle: "UUID & ULID 生成ツール | FixMyImport",
      seoDescription:
        "UUID v4、UUID v7、ULIDなどの安全な一意識別子をブラウザ上で一括生成。",
    },
  },

  fr: {
    "csv-import-cleaner": {
      name: "Nettoyeur de CSV pour Import",
      summary:
        "Nettoyez, dédoublonnez et découpez vos CSV prêts à importer directement dans le navigateur.",
      description:
        "Corrigez vos exports CSV en local, visualisez le résultat dans une grille Excel et téléchargez des fichiers prêts à importer sans envoyer vos données.",
      metric: "Réparation CSV 100% navigateur",
      seoTitle: "Nettoyeur de CSV pour Import | FixMyImport",
      seoDescription:
        "Nettoyez, dédoublonnez et découpez vos fichiers CSV prêts à être importés localement dans votre navigateur avec FixMyImport.",
    },
    "csv-column-mapper": {
      name: "Mappage de Colonnes CSV",
      summary:
        "Renommez, réorganisez et supprimez des colonnes pour adapter votre CSV au format cible.",
      description:
        "Faites correspondre les colonnes d'un système à l'autre. Modifiez les en-têtes, l'ordre et supprimez le superflu avant d'importer.",
      metric: "Alignement des colonnes facilité",
      seoTitle: "Mappage de Colonnes CSV | FixMyImport",
      seoDescription:
        "Renommez, réorganisez et filtrez les colonnes CSV localement dans votre navigateur pour correspondre à n'importe quel format cible.",
      h1: "Renommez et réorganisez les colonnes pour adapter votre CSV au système cible.",
      lead: "Alignez les colonnes d'un format à l'autre : renommez les en-têtes, modifiez l'ordre et supprimez les champs inutiles en toute sécurité.",
      cards: [
        {
          title: "Mappez visuellement les colonnes",
          desc: "Sélectionnez une colonne source, attribuez-lui son nom de destination et observez le résultat en temps réel.",
        },
        {
          title: "Enregistrez vos modèles de mappage",
          desc: "Réutilisez le même modèle lors de vos prochains imports sans devoir tout reconfigurer.",
        },
        {
          title: "Supprimez les colonnes inutiles",
          desc: "Retirez les champs superflus pour que le fichier exporté ne contienne que les données attendues.",
        },
      ],
    },
    "csv-merge": {
      name: "Fusionner des Fichiers CSV",
      summary: "Combinez plusieurs fichiers CSV en un seul.",
      description:
        "Importez plusieurs fichiers CSV, alignez automatiquement les colonnes et fusionnez-les en un fichier unique. Parfait pour recoller des exports par lots.",
      metric: "Fusion multi-fichiers en un seul",
      seoTitle: "Fusionner des Fichiers CSV | FixMyImport",
      seoDescription:
        "Fusionnez et combinez plusieurs fichiers CSV en un seul localement dans votre navigateur avec FixMyImport.",
      h1: "Combinez plusieurs fichiers CSV en un seul fichier prêt à l'emploi.",
      lead: "Chargez plusieurs CSV, faites correspondre automatiquement les colonnes et fusionnez le tout sans quitter votre navigateur.",
      cards: [
        {
          title: "Alignement automatique des colonnes",
          desc: "Les en-têtes sont comparés d'un fichier à l'autre afin que les lignes soient insérées au bon endroit.",
        },
        {
          title: "Détection des anomalies",
          desc: "Soyez alerté si certains fichiers contiennent des colonnes absentes des autres afin de choisir quoi garder.",
        },
        {
          title: "Rassemblez un découpage",
          desc: "Si vous aviez précédemment découpé un gros fichier en plusieurs morceaux, réunissez-les quand nécessaire.",
        },
      ],
    },
    "import-validator": {
      name: "Validateur d'Import CSV",
      summary:
        "Vérifiez si votre fichier est prêt à être importé avant de le téléverser.",
      description:
        "Sélectionnez une plateforme comme Shopify ou Mailchimp pour tester colonnes manquantes, emails invalides et limites de taille.",
      metric: "Contrôle avant import",
      seoTitle: "Validateur d'Import CSV | FixMyImport",
      seoDescription:
        "Validez votre CSV selon les règles des plateformes avant l'importation. Détectez les erreurs et colonnes manquantes avec FixMyImport.",
      h1: "Vérifiez la conformité de votre CSV avant de le téléverser.",
      lead: "Choisissez une plateforme telle que Shopify ou Mailchimp, chargez votre fichier et obtenez un rapport immédiat sur les erreurs potentielles.",
      cards: [
        {
          title: "Vérification des colonnes obligatoires",
          desc: "Assurez-vous que toutes les colonnes requises par la plateforme cible sont bien présentes.",
        },
        {
          title: "Détection précoce des données invalides",
          desc: "Identifiez les lignes contenant des adresses e-mail invalides ou des champs obligatoires vides.",
        },
        {
          title: "Contrôle des limites de taille et de lignes",
          desc: "Vérifiez que votre fichier ne dépasse pas les plafonds de volume ou de nombre de contacts imposés.",
        },
      ],
    },
    "binary-to-text": {
      name: "Convertisseur Binaire en Texte et Texte en Binaire",
      summary:
        "Convertissez du texte en binaire et du binaire en texte en temps réel avec support UTF-8 & ASCII.",
      description:
        "Convertisseur binaire bidirectionnel instantané avec délimiteurs configurables, découpage par octets et aperçu Hex/Base64.",
      metric: "Convertisseur rapide UTF-8 & ASCII",
      seoTitle:
        "Convertisseur Binaire en Texte & Texte en Binaire | FixMyImport",
      seoDescription:
        "Convertissez du binaire en texte et du texte en binaire instantanément dans votre navigateur. Supporte UTF-8, ASCII, 8-bit, Hex et Base64.",
    },
    "case-converter": {
      name: "Convertisseur de Casse & Formatage de Texte",
      summary:
        "Convertissez le texte en MAJUSCULES, minuscules, Casse de Titre, camelCase et snake_case.",
      description:
        "Modifiez la casse, comptez les caractères et mots, et transformez vos chaînes pour vos conventions de code.",
      metric: "Conversion rapide de casse",
      seoTitle: "Convertisseur de Casse de Texte | FixMyImport",
      seoDescription:
        "Convertissez du texte en majuscules, minuscules, casse de titre, camelCase et snake_case dans votre navigateur.",
    },
    "base64-converter": {
      name: "Encodeur / Décodeur Base64",
      summary:
        "Encodez et décodez du texte, des images et des fichiers en Base64 localement.",
      description:
        "Convertissez rapidement des chaînes en Base64 ou décodez vers du texte brut, des images et Data URIs sans serveur.",
      metric: "Convertisseur Base64 côté client",
      seoTitle: "Encodeur & Décodeur Base64 | FixMyImport",
      seoDescription:
        "Encodez et décodez du texte, des fichiers et des images vers et depuis Base64 directement dans votre navigateur.",
    },
    "json-formatter": {
      name: "Formateur & Validateur JSON",
      summary:
        "Formatez, validez, embellissez et compressez du JSON avec surlignage des erreurs.",
      description:
        "Collez du JSON brut pour l'indenter proprement, valider la syntaxe et générer des interfaces TypeScript en direct.",
      metric: "Embellisseur JSON instantané",
      seoTitle: "Formateur & Validateur JSON | FixMyImport",
      seoDescription:
        "Formatez, validez, indentez et minifiez des chaînes JSON avec détection d'erreurs en temps réel.",
    },
    "qr-code-generator": {
      name: "Générateur de Code QR",
      summary:
        "Générez des codes QR personnalisés pour URL, réseaux WiFi et cartes de visite.",
      description:
        "Créez des codes QR haute résolution pour vos liens et paramètres WiFi sans pub et en local.",
      metric: "Créateur de QR code hors-ligne",
      seoTitle: "Générateur de Code QR | FixMyImport",
      seoDescription:
        "Générez des codes QR nets et haute définition pour liens, réseaux WiFi et texte brut dans votre navigateur.",
    },
    "unix-timestamp": {
      name: "Convertisseur de Timestamp Unix",
      summary:
        "Convertissez les horodatages Unix en dates lisibles et formats de fuseaux horaires.",
      description:
        "Convertissez secondes et millisecondes en dates UTC, locales, temps relatif et chaînes ISO 8601.",
      metric: "Convertisseur date et timestamp",
      seoTitle: "Convertisseur Timestamp Unix | FixMyImport",
      seoDescription:
        "Convertissez les horodatages Unix epoch en dates lisibles, UTC et heures locales en un instant.",
    },
    "uuid-generator": {
      name: "Générateur de UUID et ULID",
      summary:
        "Générez des identifiants aléatoires UUID v4, UUID v7, ULID et NanoID en lot.",
      description:
        "Générez par lots des identifiants uniques sécurisés pour vos bases de données et tests de développement.",
      metric: "Générateur d'identifiants sécurisés",
      seoTitle: "Générateur UUID & ULID | FixMyImport",
      seoDescription:
        "Générez en masse des identifiants cryptographiques sécurisés UUID v4, UUID v7 et ULID dans votre navigateur.",
    },
  },

  de: {
    "csv-import-cleaner": {
      name: "CSV Import Cleaner",
      summary:
        "Importbereite CSVs direkt im Browser bereinigen, deduplizieren und aufteilen.",
      description:
        "Korrigieren Sie unordentliche CSV-Exporte lokal, prüfen Sie das Ergebnis in einer Excel-ähnlichen Tabelle und laden Sie importfertige Dateien herunter.",
      metric: "Browserbasierte Import-Reparatur",
      seoTitle: "CSV Import Cleaner | FixMyImport",
      seoDescription:
        "Bereinigen, deduplizieren und teilen Sie importbereite CSV-Dateien lokal im Browser mit dem FixMyImport CSV Import Cleaner.",
    },
    "csv-column-mapper": {
      name: "CSV Spalten-Mapper",
      summary:
        "Spalten umbenennen, neu anordnen und entfernen, damit die CSV zum Zielsystem passt.",
      description:
        "Passen Sie Spalten von einem System an ein anderes an. Ändern Sie Header-Namen, Reihenfolge und entfernen Sie Überflüssiges vor dem Import.",
      metric: "Einfache Header-Ausrichtung",
      seoTitle: "CSV Spalten-Mapper | FixMyImport",
      seoDescription:
        "Benennen Sie Spalten um, ändern Sie die Reihenfolge und filtern Sie CSVs im Browser für jedes Importformat mit FixMyImport.",
      h1: "Spalten umbenennen und sortieren, damit Ihre CSV zum Zielsystem passt.",
      lead: "Passen Sie Spaltenformate aufeinander an: Header umbenennen, Reihenfolge anpassen und Überflüssiges entfernen – direkt im Browser.",
      cards: [
        {
          title: "Spalten visuell zuordnen",
          desc: "Wählen Sie eine Quellspalte, vergeben Sie den Zielnamen und sehen Sie sofort das aktualisierte Ergebnis.",
        },
        {
          title: "Zuordnungsvorlagen speichern",
          desc: "Verwenden Sie die Spaltenzuordnung beim nächsten Mal einfach wieder, anstatt alles neu einzustellen.",
        },
        {
          title: "Unnötige Spalten entfernen",
          desc: "Löschen Sie überflüssige Spalten vor dem Export, damit die Datei nur relevante Felder enthält.",
        },
      ],
    },
    "csv-merge": {
      name: "CSV Dateien Zusammenführen",
      summary: "Kombinieren Sie mehrere CSV-Dateien zu einer einzigen Datei.",
      description:
        "Laden Sie mehrere CSVs hoch, richten Sie die Spalten automatisch aus und fügen Sie alles zu einer Datei zusammen. Ideal nach Batch-Splits.",
      metric: "Aus mehreren Dateien eine machen",
      seoTitle: "CSV Zusammenführen | FixMyImport",
      seoDescription:
        "Fügen Sie mehrere CSV-Dateien lokal im Browser zu einer einheitlichen Datei zusammen mit FixMyImport.",
      h1: "Mehrere CSV-Dateien zu einer importfertigen Datei zusammenführen.",
      lead: "Laden Sie mehrere CSVs hoch, gleichen Sie Spalten automatisch ab und führen Sie alle Datensätze im Browser zusammen.",
      cards: [
        {
          title: "Spalten automatisch ausrichten",
          desc: "Header werden dateiübergreifend abgeglichen, sodass Daten auch bei unterschiedlicher Spaltenreihenfolge richtig landen.",
        },
        {
          title: "Abweichungen frühzeitig erkennen",
          desc: "Erhalten Sie Hinweise, wenn Dateien abweichende Spalten enthalten, um zu entscheiden, was übernommen wird.",
        },
        {
          title: "Geteilte Batches wiedervereinen",
          desc: "Haben Sie zuvor eine große Datei aufgeteilt, können Sie diese bei Bedarf wieder zu einem Gesamtdatensatz zusammenfügen.",
        },
      ],
    },
    "import-validator": {
      name: "Import Validator",
      summary:
        "Prüfen Sie Ihre CSV vor dem Hochladen auf Importtauglichkeit.",
      description:
        "Wählen Sie Plattformen wie Shopify oder Mailchimp und testen Sie auf fehlende Spalten, fehlerhafte E-Mails und Dateigrößenlimits.",
      metric: "Vorab-Importprüfung",
      seoTitle: "Import Validator | FixMyImport",
      seoDescription:
        "Überprüfen Sie Ihre CSV gegen Plattform-Regeln vor dem Import. Finden Sie fehlende Spalten und Fehler mit FixMyImport.",
      h1: "Prüfen Sie vor dem Upload, ob Ihre CSV bereit für den Import ist.",
      lead: "Wählen Sie eine Plattform wie Shopify oder Mailchimp und erhalten Sie einen schnellen Bericht über Fehlerquellen.",
      cards: [
        {
          title: "Pflichtspalten prüfen",
          desc: "Sehen Sie auf einen Blick, welche Spalten das Zielsystem verlangt und welche in Ihrer Datei fehlen.",
        },
        {
          title: "Ungültige Daten abfangen",
          desc: "Finden Sie Zeilen mit fehlerhaften E-Mails, leeren Pflichtfeldern oder unzulässigen Werten vor dem Upload.",
        },
        {
          title: "Größen- und Zeilenlimit-Check",
          desc: "Erfahren Sie sofort, ob Ihre Datei Limits überschreitet, um sie rechtzeitig aufzuteilen.",
        },
      ],
    },
    "binary-to-text": {
      name: "Binär zu Text & Text zu Binär Konverter",
      summary:
        "Konvertieren Sie Text in Binärcode und Binärcode in Text in Echtzeit mit UTF-8 & ASCII Unterstützung.",
      description:
        "Sofortiger bidirektionaler Binärkonverter mit Trennzeichen, Bit-Breiten, Byte-Aufschlüsselung und Hex/Base64-Inspektor.",
      metric: "Sofortiger UTF-8 & ASCII Konverter",
      seoTitle:
        "Binär zu Text & Text zu Binär Konverter | FixMyImport",
      seoDescription:
        "Konvertieren Sie Binärcode in Text und Text in Binärdateien direkt im Browser. Unterstützt UTF-8, ASCII, 8-Bit-Bytes, Hex und Base64.",
    },
    "case-converter": {
      name: "Groß-/Kleinschreibung & Textformatierer",
      summary:
        "Konvertieren Sie Text in GROSSBUCHSTABEN, Kleinbuchstaben, Titel-Schreibweise, camelCase und snake_case.",
      description:
        "Textschreibweise sofort ändern, Zeichen und Wörter zählen und Strings für Entwicklungsanforderungen anpassen.",
      metric: "Schnelle Textfall-Konvertierung",
      seoTitle:
        "Groß-/Kleinschreibung & Textformatierer | FixMyImport",
      seoDescription:
        "Konvertieren Sie Text in Groß-, Kleinbuchstaben, Titelschrift, camelCase, snake_case und kebab-case im Browser.",
    },
    "base64-converter": {
      name: "Base64 Encoder / Decoder",
      summary:
        "Text, Bilder und Dateien lokal in das Base64-Format umwandeln und dekodieren.",
      description:
        "Strings schnell in Base64 kodieren oder Base64-Strings in Klartext, Bilder und Daten-URIs ohne Upload dekodieren.",
      metric: "Clientseitiger Base64-Konverter",
      seoTitle: "Base64 Encoder & Decoder | FixMyImport",
      seoDescription:
        "Kodieren und dekodieren Sie Texte, Dateien und Bilder sekundenschnell in und aus Base64 im Browser.",
    },
    "json-formatter": {
      name: "JSON Formatierer & Validator",
      summary:
        "JSON-Daten formatieren, validieren, verschönern und minimieren mit Fehlerhervorhebung.",
      description:
        "Fügen Sie unstrukturiertes JSON ein, formatieren Sie es mit Einrückung, prüfen Sie Syntaxfehler und erzeugen Sie TypeScript-Typen.",
      metric: "Sofortiger JSON-Prettifier",
      seoTitle: "JSON Formatierer & Validator | FixMyImport",
      seoDescription:
        "Formatieren, validieren, verschönern und minifizieren Sie JSON-Strings mit Fehlererkennung in Echtzeit.",
    },
    "qr-code-generator": {
      name: "QR-Code Generator",
      summary:
        "Erstellen Sie individuelle QR-Codes für Links, WLAN-Passwörter und Kontaktdaten.",
      description:
        "Hochauflösende QR-Codes für URLs, Texte und WLAN-Netzwerke werbefrei und offline im Browser erzeugen.",
      metric: "Offline QR-Code Ersteller",
      seoTitle: "QR-Code Generator | FixMyImport",
      seoDescription:
        "Erzeugen Sie klare, hochauflösende QR-Codes für Links, WLAN-Zugänge und Texte lokal im Browser.",
    },
    "unix-timestamp": {
      name: "Unix Timestamp Konverter",
      summary:
        "Epoch-Zeitstempel in lesbare Datumsformate und Zeitzonen umrechnen.",
      description:
        "Sekunden und Millisekunden in UTC und lokale Zeitangaben, relative Zeit und ISO 8601-Strings umwandeln.",
      metric: "Epoch & Datums-Konverter",
      seoTitle: "Unix Timestamp Konverter | FixMyImport",
      seoDescription:
        "Konvertieren Sie Unix-Zeitstempel sekundenschnell in lesbare Datumsangaben, UTC und lokale Zeitzonen.",
    },
    "uuid-generator": {
      name: "UUID / ULID Generator",
      summary:
        "Zufällige UUID v4, UUID v7, ULID und NanoIDs in großen Mengen erzeugen.",
      description:
        "Kryptografisch sichere eindeutige Bezeichner für Datenbank-Seeding, Testdaten und Entwicklungszwecke generieren.",
      metric: "Sicherer Batch-ID-Generator",
      seoTitle: "UUID & ULID Generator | FixMyImport",
      seoDescription:
        "Generieren Sie kryptografisch sichere UUID v4, UUID v7 und ULID Bezeichner im Batch lokal im Browser.",
    },
  },

  pt: {
    "csv-import-cleaner": {
      name: "Limpador de Importação CSV",
      summary:
        "Limpe, deduplique e divida arquivos CSV prontos para importação no navegador.",
      description:
        "Corrija exportações CSV confusas localmente, visualize a saída em uma planilha estilo Excel e baixe arquivos prontos para importar sem enviar dados para a nuvem.",
      metric: "Reparo de CSV direto no navegador",
      seoTitle: "Limpador de Importação CSV | FixMyImport",
      seoDescription:
        "Limpe, remova duplicatas e divida arquivos CSV prontos para importação localmente no seu navegador com o FixMyImport.",
    },
    "csv-column-mapper": {
      name: "Mapeador de Colunas CSV",
      summary:
        "Renomeie, reordene e remova colunas para que seu CSV atenda ao formato desejado.",
      description:
        "Corresponda colunas entre sistemas diferentes. Mude nomes de cabeçalho, ordem e elimine campos desnecessários antes de importar.",
      metric: "Alinhamento de cabeçalhos facilitado",
      seoTitle: "Mapeador de Colunas CSV | FixMyImport",
      seoDescription:
        "Renomeie, reordene e remova colunas CSV localmente no navegador para qualquer formato de importação com o FixMyImport.",
      h1: "Renomeie e reorganize colunas para adaptar seu CSV ao sistema de destino.",
      lead: "Mapeie colunas de um formato para outro: altere cabeçalhos, mude a ordem e remova dados extras, tudo no navegador.",
      cards: [
        {
          title: "Mapeamento visual de colunas",
          desc: "Escolha uma coluna de origem, determine o nome de destino e veja o resultado se atualizar na hora.",
        },
        {
          title: "Salve modelos de mapeamento",
          desc: "Reaproveite as mesmas configurações da próxima vez em vez de refazer tudo do início.",
        },
        {
          title: "Remova colunas desnecessárias",
          desc: "Exclua campos irrelevantes antes de exportar para que o arquivo contenha apenas o necessário.",
        },
      ],
    },
    "csv-merge": {
      name: "Mesclar Arquivos CSV",
      summary: "Combine vários arquivos CSV em um único arquivo.",
      description:
        "Carregue múltiplos CSVs, alinhe as colunas automaticamente e una tudo em um só arquivo. Excelente para reagrupar lotes divididos.",
      metric: "De vários arquivos para um só",
      seoTitle: "Mesclar e Juntar Arquivos CSV | FixMyImport",
      seoDescription:
        "Una e combine múltiplos arquivos CSV em um só localmente no seu navegador com o FixMyImport CSV Merge.",
      h1: "Combine múltiplos arquivos CSV em um único arquivo pronto para importar.",
      lead: "Faça upload de vários CSVs, alinhe colunas automaticamente e junte tudo em um único arquivo no seu navegador.",
      cards: [
        {
          title: "Alinhamento automático de colunas",
          desc: "Os cabeçalhos são identificados entre os arquivos para que as linhas fiquem nas colunas certas, mesmo se a ordem variar.",
        },
        {
          title: "Identifique divergências cedo",
          desc: "Receba alertas quando arquivos tiverem colunas extras para decidir o que manter ou descartar.",
        },
        {
          title: "Reunifique lotes divididos",
          desc: "Caso tenha dividido um arquivo grande anteriormente, una-o de volta quando precisar dos dados completos.",
        },
      ],
    },
    "import-validator": {
      name: "Validador de Importação CSV",
      summary:
        "Verifique se o seu arquivo está pronto para importação antes de enviá-lo.",
      description:
        "Escolha uma plataforma como Shopify ou Mailchimp e faça um teste rápido para detectar colunas faltantes, emails inválidos e limites de tamanho.",
      metric: "Validação prévia de importação",
      seoTitle: "Validador de Importação CSV | FixMyImport",
      seoDescription:
        "Valide seu CSV contra as regras de cada plataforma antes de importar. Detecte colunas ausentes e erros com o FixMyImport.",
      h1: "Verifique se o seu CSV está pronto para importar antes de fazer o upload.",
      lead: "Selecione uma plataforma como Shopify ou Mailchimp, carregue o arquivo e receba um diagnóstico de possíveis falhas.",
      cards: [
        {
          title: "Verificação de colunas obrigatórias",
          desc: "Veja quais campos a plataforma exige e quais estão ausentes no seu arquivo.",
        },
        {
          title: "Detecte erros antes da importação",
          desc: "Encontre linhas com emails inválidos ou campos obrigatórios vazios antes que gerem erros no sistema.",
        },
        {
          title: "Checagem de limite de tamanho e linhas",
          desc: "Saiba com antecedência se o arquivo excede os limites de tamanho ou contatos para poder dividi-lo.",
        },
      ],
    },
    "binary-to-text": {
      name: "Conversor de Binário para Texto e Texto para Binário",
      summary:
        "Converta texto em binário e binário em texto em tempo real com suporte a UTF-8 e ASCII.",
      description:
        "Conversor binário bidirecional instantâneo com delimitadores personalizáveis, detalhamento de bytes e inspeção Hex/Base64.",
      metric: "Conversor instantâneo UTF-8 e ASCII",
      seoTitle:
        "Conversor de Binário para Texto e Texto para Binário | FixMyImport",
      seoDescription:
        "Converta binário para texto e texto para binário instantaneamente no navegador. Suporta UTF-8, ASCII, bytes de 8 bits, Hex e Base64.",
    },
    "case-converter": {
      name: "Formatador de Texto e Maiúsculas/Minúsculas",
      summary:
        "Converta texto entre MAIÚSCULAS, minúsculas, Primeira Letra Maiúscula, camelCase e snake_case.",
      description:
        "Alterne a capitalização instantaneamente, conte caracteres e palavras e formate strings para padrões de desenvolvimento.",
      metric: "Conversão rápida de formato de texto",
      seoTitle:
        "Formatador de Texto e Maiúsculas/Minúsculas | FixMyImport",
      seoDescription:
        "Converta texto entre maiúsculas, minúsculas, formato título, camelCase, snake_case e kebab-case no navegador.",
    },
    "base64-converter": {
      name: "Codificador e Decodificador Base64",
      summary:
        "Codifique e decodifique texto, imagens e arquivos em Base64 localmente.",
      description:
        "Codifique strings em Base64 rapidamente ou decodifique Base64 para texto, imagens e data URIs sem uploads.",
      metric: "Conversor Base64 no cliente",
      seoTitle: "Codificador e Decodificador Base64 | FixMyImport",
      seoDescription:
        "Codifique e decodifique texto, arquivos e imagens para e a partir de Base64 instantaneamente no seu navegador.",
    },
    "json-formatter": {
      name: "Formatador e Validador JSON",
      summary:
        "Formate, valide, organize e minifique dados JSON com destaque de erros.",
      description:
        "Cole JSON desordenado para identá-lo, validar sintaxe e gerar interfaces TypeScript em tempo real.",
      metric: "Formatador JSON instantâneo",
      seoTitle: "Formatador e Validador JSON | FixMyImport",
      seoDescription:
        "Formate, valide, embeleze e comprima strings JSON com detecção de erros em tempo real.",
    },
    "qr-code-generator": {
      name: "Gerador de Código QR",
      summary:
        "Gere códigos QR personalizados para URLs, senhas de WiFi e cartões de contato.",
      description:
        "Crie códigos QR em alta resolução para links, texto e redes WiFi sem anúncios e funcionando offline.",
      metric: "Criador de QR Code offline",
      seoTitle: "Gerador de Código QR | FixMyImport",
      seoDescription:
        "Gere códigos QR nítidos e de alta resolução para links, redes WiFi e textos locais no navegador.",
    },
    "unix-timestamp": {
      name: "Conversor de Timestamp Unix",
      summary:
        "Converta timestamps epoch para datas legíveis e fusos horários.",
      description:
        "Converta segundos e milissegundos para UTC, formatos de data local, tempo relativo e ISO 8601.",
      metric: "Conversor de epoch e datas",
      seoTitle: "Conversor de Timestamp Unix | FixMyImport",
      seoDescription:
        "Converta timestamps epoch Unix em datas legíveis, UTC e fusos horários locais instantaneamente.",
    },
    "uuid-generator": {
      name: "Gerador de UUID e ULID",
      summary:
        "Gere identificadores aleatórios UUID v4, UUID v7, ULID e NanoIDs em lote.",
      description:
        "Gere em lote identificadores únicos criptograficamente seguros para bancos de dados, testes e desenvolvimento.",
      metric: "Gerador seguro de IDs em lote",
      seoTitle: "Gerador de UUID & ULID | FixMyImport",
      seoDescription:
        "Gere identificadores seguros UUID v4, UUID v7 e ULID em lote localmente no seu navegador.",
    },
  },

  ko: {
    "csv-import-cleaner": {
      name: "CSV 가져오기 정리기",
      summary:
        "가져오기 준비가 완료된 CSV 파일을 브라우저에서 정리, 중복 제거 및 분할합니다.",
      description:
        "복잡한 CSV 내보내기 파일을 로컬에서 수정하고, Excel 스타일 그리드로 결과를 미리 확인하며, 어디에도 데이터를 전송하지 않고 안전하게 다운로드하세요.",
      metric: "브라우저 완결형 데이터 복구",
      seoTitle: "CSV 가져오기 정리기 | FixMyImport",
      seoDescription:
        "FixMyImport CSV 가져오기 정리기로 브라우저에서 직접 로컬로 CSV 파일을 정리, 중복 제거 및 분할하세요.",
    },
    "csv-column-mapper": {
      name: "CSV 컬럼 매퍼",
      summary:
        "대상 시스템 규격에 맞게 CSV 컬럼 이름을 변경하고, 순서를 바꾸고, 제외합니다.",
      description:
        "시스템 간 컬럼 규격을 손쉽게 맞추세요. 가져오기 전에 헤더 이름을 바꾸고, 순서를 재정렬하며 불필요한 데이터를 제거할 수 있습니다.",
      metric: "손쉬운 헤더 정렬",
      seoTitle: "CSV 컬럼 매퍼 | FixMyImport",
      seoDescription:
        "어떤 가져오기 형식에도 맞출 수 있도록 브라우저에서 로컬로 CSV 컬럼 이름 변경, 재정렬 및 삭제를 수행하세요.",
      h1: "대상 시스템에 맞춰 CSV 컬럼을 재정렬하고 이름을 변경하세요.",
      lead: "형식이 다른 시스템 간 컬럼을 매핑하세요. 헤더 이름을 바꾸고, 순서를 변경하며, 불필요한 컬럼을 안전하게 제거할 수 있습니다.",
      cards: [
        {
          title: "시각적 컬럼 매핑",
          desc: "원본 컬럼을 선택하고 대상 이름을 지정하면 변경 결과가 즉시 미리보기에 반영됩니다.",
        },
        {
          title: "매핑 템플릿 저장",
          desc: "한 번 설정한 컬럼 매핑을 저장해 두고 다음 작업 시 다시 설정할 필요 없이 즉시 재사용하세요.",
        },
        {
          title: "불필요한 컬럼 제외",
          desc: "가져오기에 필요한 필수 필드만 남도록 내보내기 전에 불필요한 컬럼을 제거합니다.",
        },
      ],
    },
    "csv-merge": {
      name: "CSV 파일 병합 도구",
      summary: "여러 개의 CSV 파일을 하나로 합칩니다.",
      description:
        "여러 CSV 파일을 불러와 자동으로 컬럼을 맞추고 하나의 파일로 병합합니다. 분할된 배치 파일을 다시 합칠 때 매우 유용합니다.",
      metric: "여러 파일을 하나로 통합",
      seoTitle: "CSV 파일 병합 도구 | FixMyImport",
      seoDescription:
        "FixMyImport CSV 병합 도구를 사용하여 브라우저에서 로컬로 여러 CSV 파일을 자동으로 정렬하고 하나로 합치세요.",
      h1: "여러 CSV 파일을 가져오기 준비가 완료된 하나의 파일로 병합.",
      lead: "여러 개의 CSV를 업로드하면 컬럼이 자동으로 맞춰져 브라우저 내에서 하나의 파일로 깔끔하게 통합됩니다.",
      cards: [
        {
          title: "컬럼 자동 정렬",
          desc: "파일 간 헤더를 자동으로 비교하여 컬럼 순서가 다르더라도 데이터 행이 정확한 위치에 합쳐집니다.",
        },
        {
          title: "불일치 항목 조기 발견",
          desc: "일부 파일에만 존재하는 컬럼이 있을 경우 경고를 표시하여 유지할지 제외할지 선택할 수 있습니다.",
        },
        {
          title: "분할된 배치 복원",
          desc: "이전에 분할했던 대용량 파일을 전체 데이터셋이 다시 필요할 때 원래의 단일 파일로 손쉽게 되돌립니다.",
        },
      ],
    },
    "import-validator": {
      name: "가져오기 유효성 검사기",
      summary: "파일을 업로드하기 전에 가져오기 준비가 되었는지 미리 검사합니다.",
      description:
        "Shopify나 Mailchimp 같은 플랫폼을 선택하고 누락된 컬럼, 잘못된 이메일 형식, 파일 크기 제한을 사전에 신속하게 확인하세요.",
      metric: "가져오기 사전 검사",
      seoTitle: "가져오기 유효성 검사기 | FixMyImport",
      seoDescription:
        "가져오기 전에 대상 플랫폼 규격에 맞게 CSV를 사전 검증하세요. 누락된 컬럼과 형식 오류를 미리 찾아냅니다.",
      h1: "업로드하기 전에 CSV가 가져오기 가능한 상태인지 미리 점검하세요.",
      lead: "Shopify나 Mailchimp 등을 선택하고 파일을 불러오면 누락되었거나 오류가 발생할 수 있는 부분을 즉시 리포트로 제공합니다.",
      cards: [
        {
          title: "필수 컬럼 확인",
          desc: "대상 플랫폼에서 요구하는 필수 컬럼이 파일에 모두 포함되어 있는지 확인합니다.",
        },
        {
          title: "잘못된 데이터 조기 검출",
          desc: "유효하지 않은 이메일 주소, 비어 있는 필수 항목 등 오류 원인이 되는 행을 사전에 찾아냅니다.",
        },
        {
          title: "파일 용량 및 행 수 한도 체크",
          desc: "각 플랫폼의 파일 용량이나 연락처 수 제한을 초과하지 않는지 확인하여 사전 분할할 수 있도록 돕습니다.",
        },
      ],
    },
    "binary-to-text": {
      name: "바이너리 텍스트 변환기 & 텍스트 바이너리 변환",
      summary:
        "UTF-8 및 ASCII를 지원하여 실시간으로 텍스트를 바이너리로, 바이너리를 텍스트로 상호 변환합니다.",
      description:
        "구분 기호, 비트 폭, 바이트 상세 분석 및 Hex/Base64 검사기가 포함된 즉각적인 양방향 바이너리 변환 도구입니다.",
      metric: "초고속 UTF-8 & ASCII 변환기",
      seoTitle:
        "바이너리 텍스트 변환기 & 텍스트 바이너리 변환 | FixMyImport",
      seoDescription:
        "브라우저에서 바이너리를 텍스트로, 텍스트를 이진수로 즉시 변환하세요. UTF-8, ASCII, 8비트, Hex, Base64 지원.",
    },
    "case-converter": {
      name: "대소문자 변환기 & 텍스트 포맷터",
      summary:
        "대문자, 소문자, 제목 형태(Title Case), camelCase, snake_case로 텍스트를 즉시 변환합니다.",
      description:
        "텍스트 대소문자를 즉시 변경하고, 글자 수와 단어 수를 세며, 개발에 적합한 표기법으로 문자열을 변환합니다.",
      metric: "빠른 텍스트 케이스 변환",
      seoTitle: "대소문자 변환기 & 텍스트 포맷터 | FixMyImport",
      seoDescription:
        "대문자, 소문자, camelCase, snake_case, kebab-case 변환을 브라우저에서 실시간으로 실행하세요.",
    },
    "base64-converter": {
      name: "Base64 인코더 / 디코더",
      summary:
        "텍스트, 이미지 및 파일을 브라우저에서 로컬로 Base64 형식으로 인코딩 및 디코딩합니다.",
      description:
        "문자열을 Base64로 신속히 인코딩하거나 Base64 문자열을 일반 텍스트, 이미지, Data URI로 서버 전송 없이 복원합니다.",
      metric: "클라이언트 기반 Base64 변환기",
      seoTitle: "Base64 인코더 & 디코더 | FixMyImport",
      seoDescription:
        "브라우저에서 텍스트, 파일 및 이미지를 Base64로 즉시 인코딩 및 디코딩하세요.",
    },
    "json-formatter": {
      name: "JSON 포맷터 & 유효성 검사기",
      summary:
        "오류 강조 기능과 함께 JSON 데이터를 포맷, 검증, 정리 및 압축합니다.",
      description:
        "정리되지 않은 JSON을 붙여넣어 들여쓰기를 맞추고, 구문 오류를 찾아내며, TypeScript 인터페이스를 즉시 생성하세요.",
      metric: "실시간 JSON 정리 도구",
      seoTitle: "JSON 포맷터 & 유효성 검사기 | FixMyImport",
      seoDescription:
        "실시간 오류 감지 기능으로 JSON 문자열을 보기 좋게 정렬하고 검증 및 최소화하세요.",
    },
    "qr-code-generator": {
      name: "QR 코드 생성기",
      summary:
        "URL, WiFi 비밀번호 및 연락처 카드를 위한 맞춤형 QR 코드를 생성합니다.",
      description:
        "광고 없이 브라우저 오프라인 렌더링으로 링크, 텍스트, WiFi용 고해상도 QR 코드를 만드세요.",
      metric: "오프라인 QR 코드 제작기",
      seoTitle: "QR 코드 생성기 | FixMyImport",
      seoDescription:
        "링크, WiFi 네트워크 및 일반 텍스트를 위한 깨끗한 고해상도 QR 코드를 로컬에서 생성하세요.",
    },
    "unix-timestamp": {
      name: "유닉스 타임스탬프 변환기",
      summary:
        "Epoch 타임스탬프를 읽기 쉬운 날짜 및 현지 시간대 형식으로 변환합니다.",
      description:
        "초 및 밀리초 단위를 UTC, 로컬 날짜 형식, 상대적 시간 및 ISO 8601 문자열로 변환합니다.",
      metric: "Epoch & 날짜 변환기",
      seoTitle: "유닉스 타임스탬프 변환기 | FixMyImport",
      seoDescription:
        "Unix 에포크 타임스탬프를 읽을 수 있는 날짜, UTC 및 로컬 시간대로 즉시 변환하세요.",
    },
    "uuid-generator": {
      name: "UUID / ULID 대량 생성기",
      summary:
        "UUID v4, UUID v7, ULID 및 NanoID를 무작위로 대량 생성합니다.",
      description:
        "데이터베이스 시딩, 목업 데이터 및 개발 테스트를 위한 암호학적으로 안전한 고유 식별자를 생성합니다.",
      metric: "안전한 대량 ID 생성기",
      seoTitle: "UUID & ULID 생성기 | FixMyImport",
      seoDescription:
        "암호학적으로 안전한 UUID v4, UUID v7, ULID 식별자를 브라우저에서 대량으로 생성하세요.",
    },
  },

  it: {
    "csv-import-cleaner": {
      name: "Pulitore CSV per Importazioni",
      summary:
        "Pulisci, deduplica e dividi file CSV pronti per l'importazione direttamente nel browser.",
      description:
        "Correggi le esportazioni CSV disordinate in locale, visualizza l'anteprima in una griglia simile a Excel e scarica file pronti per l'importazione senza inviare dati all'esterno.",
      metric: "Riparazione CSV 100% nel browser",
      seoTitle: "Pulitore CSV per Importazioni | FixMyImport",
      seoDescription:
        "Pulisci, deduplica e dividi file CSV pronti per l'importazione localmente nel tuo browser con FixMyImport.",
    },
    "csv-column-mapper": {
      name: "Mappatore di Colonne CSV",
      summary:
        "Rinomina, riordina ed elimina colonne per adattare il tuo CSV al sistema di destinazione.",
      description:
        "Fai combaciare le colonne tra sistemi differenti. Modifica le intestazioni, l'ordine e rimuovi i campi non necessari prima di importare.",
      metric: "Allineamento intestazioni intuitivo",
      seoTitle: "Mappatore di Colonne CSV | FixMyImport",
      seoDescription:
        "Rinomina, riordina ed elimina colonne CSV localmente nel browser per adattarle a qualunque formato di importazione.",
      h1: "Rinomina e riordina le colonne per adattare il CSV al sistema di destinazione.",
      lead: "Fai combaciare le colonne da un formato all'altro: rinomina le intestazioni, cambia l'ordine e rimuovi ciò che non serve direttamente nel browser.",
      cards: [
        {
          title: "Mappa le colonne visivamente",
          desc: "Seleziona una colonna di origine, scegli il nome di destinazione e osserva l'anteprima aggiornarsi all'istante.",
        },
        {
          title: "Salva modelli di mappatura",
          desc: "Riutilizza la stessa configurazione la volta successiva senza dover ricominciare da capo.",
        },
        {
          title: "Rimuovi colonne inutili",
          desc: "Elimina le colonne superflue prima dell'esportazione affinché il file contenga solo ciò che serve.",
        },
      ],
    },
    "csv-merge": {
      name: "Unisci File CSV",
      summary: "Combina più file CSV in un unico file.",
      description:
        "Carica diversi file CSV, allinea automaticamente le colonne e unisci tutto in un unico file. Ideale per ricomporre esportazioni divise.",
      metric: "Da più file a uno solo",
      seoTitle: "Unisci File CSV | FixMyImport",
      seoDescription:
        "Unisci e combina molteplici file CSV in uno solo localmente nel tuo browser con FixMyImport CSV Merge.",
      h1: "Combina molteplici file CSV in un unico file pronto per l'importazione.",
      lead: "Carica più CSV, allinea automaticamente le colonne e unisci tutto in un solo file senza lasciare il browser.",
      cards: [
        {
          title: "Allineamento automatico delle colonne",
          desc: "Le intestazioni vengono abbinate tra i file in modo che le righe finiscano nelle colonne corrette anche con ordine diverso.",
        },
        {
          title: "Individua discrepanze tempestivamente",
          desc: "Ricevi un avviso se alcuni file contengono colonne assenti negli altri per decidere cosa mantenere.",
        },
        {
          title: "Ricomponi batch divisi",
          desc: "Se avevi precedentemente diviso un file pesante, uniscilo di nuovo quando hai bisogno del dataset completo.",
        },
      ],
    },
    "import-validator": {
      name: "Validatore di Importazione CSV",
      summary:
        "Verifica se il tuo file è pronto per l'importazione prima di caricarlo.",
      description:
        "Scegli una piattaforma come Shopify o Mailchimp e avvia un controllo rapido per colonne mancanti, email non valide e limiti di dimensione.",
      metric: "Controllo preliminare dell'import",
      seoTitle: "Validatore di Importazione CSV | FixMyImport",
      seoDescription:
        "Valida il tuo CSV in base alle regole della piattaforma prima di importarlo. Rileva colonne mancanti ed errori con FixMyImport.",
      h1: "Verifica che il tuo CSV sia pronto prima di effettuare il caricamento.",
      lead: "Scegli una piattaforma come Shopify o Mailchimp, carica il file e ottieni un rapporto immediato su cosa manca o potrebbe fallire.",
      cards: [
        {
          title: "Controlla le colonne obbligatorie",
          desc: "Verifica quali colonne sono richieste dalla piattaforma di destinazione e quali mancano nel file.",
        },
        {
          title: "Rileva dati non validi in anticipo",
          desc: "Individua righe con email errate, campi obbligatori vuoti o valori non conformi prima che causino errori.",
        },
        {
          title: "Verifica limiti di peso e righe",
          desc: "Scopri subito se il file supera i limiti di dimensione o numero di contatti consentiti per poterlo dividere prima.",
        },
      ],
    },
    "binary-to-text": {
      name: "Convertitore Binario a Testo e Testo a Binario",
      summary:
        "Converti testo in binario e binario in testo in tempo reale con supporto UTF-8 e ASCII.",
      description:
        "Convertitore binario bidirezionale immediato con delimitatori personalizzabili, suddivisione in byte e ispezione Hex/Base64.",
      metric: "Convertitore istantaneo UTF-8 e ASCII",
      seoTitle:
        "Convertitore Binario a Testo & Testo a Binario | FixMyImport",
      seoDescription:
        "Converti binario in testo e testo in binario istantaneamente nel browser. Supporta UTF-8, ASCII, byte a 8 bit, Hex e Base64.",
    },
    "case-converter": {
      name: "Formattatore Testo e Maiuscole/Minuscole",
      summary:
        "Converti testo tra MAIUSCOLO, minuscolo, Formato Titolo, camelCase e snake_case.",
      description:
        "Modifica istantaneamente la capitalizzazione del testo, conta parole e caratteri e adatta stringhe alle convenzioni di sviluppo.",
      metric: "Conversione rapida formato testo",
      seoTitle: "Formattatore Testo e Maiuscole | FixMyImport",
      seoDescription:
        "Converti testo tra maiuscole, minuscole, formato titolo, camelCase, snake_case e kebab-case nel browser.",
    },
    "base64-converter": {
      name: "Codificatore e Decodificatore Base64",
      summary:
        "Codifica e decodifica testo, immagini e file in formato Base64 localmente.",
      description:
        "Codifica rapidamente stringhe in Base64 o decodifica Base64 in testo semplice, immagini e data URI senza upload.",
      metric: "Convertitore Base64 lato client",
      seoTitle: "Codificatore & Decodificatore Base64 | FixMyImport",
      seoDescription:
        "Codifica e decodifica testi, file e immagini da e verso Base64 istantaneamente nel tuo browser.",
    },
    "json-formatter": {
      name: "Formattatore e Validatore JSON",
      summary:
        "Formatta, convalida, abbellisci e minimizza dati JSON con evidenziazione degli errori.",
      description:
        "Incolla JSON disordinato per formattarlo con indentazione, convalidare la sintassi e creare interfacce TypeScript.",
      metric: "Prettifier JSON istantaneo",
      seoTitle: "Formattatore & Validatore JSON | FixMyImport",
      seoDescription:
        "Formatta, convalida, indenta e minimizza stringhe JSON con rilevamento degli errori in tempo reale.",
    },
    "qr-code-generator": {
      name: "Generatore di Codici QR",
      summary:
        "Crea codici QR personalizzati per collegamenti, password WiFi e schede contatto.",
      description:
        "Genera codici QR ad alta risoluzione per link, testo e reti WiFi senza pubblicità e funzionante offline.",
      metric: "Creatore di QR Code offline",
      seoTitle: "Generatore di Codici QR | FixMyImport",
      seoDescription:
        "Crea codici QR nitidi e ad alta definizione per link, reti WiFi e testo semplice localmente nel browser.",
    },
    "unix-timestamp": {
      name: "Convertitore di Timestamp Unix",
      summary:
        "Converti timestamp epoch in date leggibili e formati di fuso orario.",
      description:
        "Converti secondi e millisecondi in formati UTC e data locale, tempo relativo e stringhe ISO 8601.",
      metric: "Convertitore epoch e date",
      seoTitle: "Convertitore Timestamp Unix | FixMyImport",
      seoDescription:
        "Converti timestamp epoch Unix in date leggibili, orari UTC e fusi orari locali istantaneamente.",
    },
    "uuid-generator": {
      name: "Generatore di UUID e ULID",
      summary:
        "Genera identificatori casuali UUID v4, UUID v7, ULID e NanoID in batch.",
      description:
        "Crea in blocco identificatori univoci e crittograficamente sicuri per database, mockup e collaudi di sviluppo.",
      metric: "Generatore batch ID sicuro",
      seoTitle: "Generatore UUID & ULID | FixMyImport",
      seoDescription:
        "Genera identificatori sicuri UUID v4, UUID v7 e ULID in batch localmente nel tuo browser.",
    },
  },
}

export function getLocalizedTool(
  toolId: string,
  lang: Lang
): ToolDefinition | undefined {
  const baseTool = toolCatalog.find((t) => t.id === toolId)
  if (!baseTool) return undefined

  const translations =
    toolTranslations[lang]?.[toolId] || toolTranslations.en[toolId]
  if (!translations) return baseTool

  const href =
    !showDefaultLang && lang === defaultLang
      ? baseTool.href
      : `/${lang}${baseTool.href}`

  return {
    ...baseTool,
    name: translations.name || baseTool.name,
    summary: translations.summary || baseTool.summary,
    description: translations.description || baseTool.description,
    metric: translations.metric || baseTool.metric,
    seoTitle: translations.seoTitle || baseTool.seoTitle,
    seoDescription: translations.seoDescription || baseTool.seoDescription,
    href,
  }
}

export function getLocalizedCatalog(lang: Lang): ToolDefinition[] {
  return toolCatalog.map((tool) => {
    const localized = getLocalizedTool(tool.id, lang)
    return localized || tool
  })
}

export function getLocalizedToolDetail(toolId: string, lang: Lang) {
  return toolTranslations[lang]?.[toolId] || toolTranslations.en[toolId]
}
