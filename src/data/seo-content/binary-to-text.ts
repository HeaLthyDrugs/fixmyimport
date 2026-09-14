import type { ToolSeoContent } from "./types"

export const binaryToTextSeoContent: ToolSeoContent = {
  toolId: "binary-to-text",
  category: "utilities",
  h1: "Binary to Text & Text to Binary Converter — UTF-8 & ASCII Online",
  subtitle:
    "Convert text to binary and binary code back to readable text in real-time with customizable delimiters, byte breakdown, and Hex/Base64 inspection.",
  lead: "FixMyImport Binary Converter is an instant, bi-directional converter supporting UTF-8, ASCII, 7-bit, 8-bit, and 16-bit binary formats. Whether you are debugging network packets, decoding machine-level data, or learning computer science concepts, decode and analyze raw binary securely in your browser.",
  whatIsTitle: "What is Binary Code and How Does Binary Conversion Work?",
  whatIsContent: [
    "At the foundational hardware level, all digital computers represent and manipulate data using electrical states: on (1) or off (0). These binary digits (bits) are organized into 8-bit sequences called bytes, each representing numeric values from 0 to 255.",
    "To turn binary into readable human text, standardized character encoding protocols assign a unique numeric code point to every character and symbol. In standard ASCII, the letter 'A' is decimal 65 (binary 01000001). Modern UTF-8 encoding dynamically uses between 1 and 4 bytes per character, enabling representation of accents, non-Latin alphabets, and emojis.",
  ],
  howItWorksTitle: "How Our Real-Time Converter Operates",
  howItWorksContent: [
    "Bi-Directional Parsing: Automatically handles both encoding (text to binary) and decoding (binary to text) in real time as you type.",
    "Multi-Byte UTF-8 Support: Employs the browser's native TextEncoder and TextDecoder APIs to accurately decode complex multi-byte sequences without question marks or character corruption.",
    "Configurable Delimiters & Formatting: Supports space-separated bytes, commas, hyphens, or raw unseparated bitstreams for flexible integration into code or documentation.",
  ],
  stepsTitle: "How to Convert Binary to Text and Text to Binary",
  steps: [
    {
      number: 1,
      title: "Choose Your Conversion Mode",
      description:
        "Select Text to Binary (to encode readable words into 0s and 1s) or Binary to Text (to translate binary strings into clear text).",
    },
    {
      number: 2,
      title: "Input Your Text or Binary Code",
      description:
        "Paste or type your input into the editor, or click 'Load Sample' to explore an example featuring text, punctuation, and emojis.",
    },
    {
      number: 3,
      title: "Configure Delimiters & Bit Width",
      description:
        "Choose between standard space separation, commas, hyphens, or none, and set the bit width (8-bit standard, 7-bit ASCII, or 16-bit Unicode).",
    },
    {
      number: 4,
      title: "Inspect and Copy the Output",
      description:
        "Copy your converted output instantly to the clipboard, or switch to the Inspector tab for a granular byte-by-byte analysis with Hex and Base64 equivalents.",
    },
  ],
  featuresTitle: "Key Features & Binary Analysis Tools",
  features: [
    {
      title: "Instant Bi-Directional Conversion",
      description:
        "Seamlessly switch between text-to-binary and binary-to-text with instantaneous live preview.",
      badge: "Real-Time",
    },
    {
      title: "UTF-8 & Emoji Ready",
      description:
        "Accurately encodes and decodes multi-byte UTF-8 characters, foreign scripts, and modern emojis.",
    },
    {
      title: "Customizable Delimiters",
      description:
        "Format binary outputs with spaces, commas, hyphens, or continuous unspaced sequences.",
    },
    {
      title: "Byte & Character Breakdown",
      description:
        "Detailed inspector view displays character code points, decimal, hexadecimal, and binary values per byte.",
      badge: "Deep Inspector",
    },
    {
      title: "Hex & Base64 Synchronization",
      description:
        "Inspect corresponding Hexadecimal and Base64 translations alongside binary representations.",
    },
    {
      title: "100% Client-Side Privacy",
      description:
        "All conversions take place locally in your browser. No strings or keys are ever sent across the network.",
      badge: "100% Private",
    },
  ],
  table: {
    title: "Common ASCII & Binary Conversion Lookup Table",
    description:
      "A quick reference guide of frequently used characters, decimal code points, hexadecimal values, and 8-bit binary equivalents.",
    headers: [
      "Character",
      "Decimal",
      "Hexadecimal",
      "8-Bit Binary",
      "Description",
    ],
    rows: [
      ["A", "65", "0x41", "01000001", "Uppercase Latin Letter A"],
      ["B", "66", "0x42", "01000010", "Uppercase Latin Letter B"],
      ["C", "67", "0x43", "01000011", "Uppercase Latin Letter C"],
      ["a", "97", "0x61", "01100001", "Lowercase Latin Letter a"],
      ["b", "98", "0x62", "01100010", "Lowercase Latin Letter b"],
      ["c", "99", "0x63", "01100011", "Lowercase Latin Letter c"],
      ["0", "48", "0x30", "00110000", "Numeric Digit Zero"],
      ["1", "49", "0x31", "00110001", "Numeric Digit One"],
      ["Space", "32", "0x20", "00100000", "Space Character"],
      ["!", "33", "0x21", "00100001", "Exclamation Point"],
      ["?", "63", "0x3F", "00111111", "Question Mark"],
      ["@", "64", "0x40", "01000000", "At Symbol"],
    ],
  },
  privacyTitle: "Zero-Data-Retention Policy for Sensitive Conversions",
  privacyContent: [
    "Developers frequently convert sensitive data such as API tokens, password hashes, and encryption seeds to verify byte sequences. Traditional web converters upload your inputs to backend server logs where they can be cached or intercepted.",
    "FixMyImport uses client-side JavaScript powered by the native Web API TextEncoder and TextDecoder. None of your input text or binary output ever leaves your browser window.",
  ],
  faqs: [
    {
      question: "How do I convert binary code back to readable text?",
      answer:
        "Select the 'Binary to Text' conversion mode above, paste your binary numbers (with or without spaces), and the decoded text will appear instantly in the output window. If your binary contains spaces every 8 bits, ensure the delimiter is set to 'Space'.",
    },
    {
      question:
        "What is the difference between 7-bit, 8-bit, and 16-bit binary?",
      answer:
        "Standard ASCII historically used 7 bits (values 0–127). Modern computing standardizes on 8 bits (1 byte, values 0–255), which accommodates extended ASCII. 16-bit binary (2 bytes) is commonly used for basic multilingual Unicode planes (UTF-16). FixMyImport defaults to standard 8-bit bytes for compatibility.",
    },
    {
      question: "Can this tool convert emojis and foreign language characters?",
      answer:
        "Yes. Unlike simple converters that only handle 7-bit English ASCII, FixMyImport supports modern UTF-8 encoding. UTF-8 dynamically allocates 1 to 4 bytes per character, allowing accurate binary encoding and decoding for emojis, accented letters, and non-Latin alphabets.",
    },
    {
      question: "Can I convert binary without spaces between bytes?",
      answer:
        "Yes. If your binary input is a continuous string of 0s and 1s without spaces (e.g. 0100100001101001), set the delimiter dropdown to 'None'. FixMyImport will chunk the stream into 8-bit bytes automatically.",
    },
    {
      question: "Why does the letter 'A' equal 01000001 in binary?",
      answer:
        "In the ASCII standard, capital letter 'A' is assigned decimal value 65. When decimal 65 is converted into base-2 binary, it equals 64 + 1, which represents the 8-bit binary pattern 01000001.",
    },
    {
      question: "Is any of my converted text saved on your servers?",
      answer:
        "No. FixMyImport runs 100% locally in your web browser. No text, binary strings, or converted results are ever transmitted or saved to any server.",
    },
  ],
  relatedToolIds: [
    "csv-import-cleaner",
    "case-converter",
    "base64-converter",
    "json-formatter",
  ],
}
