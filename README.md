# DevEditor 🧰

**DevEditor.io** – Fast, Free, and Private Developer Tools.

DevEditor is a growing collection of **58 lightweight, client-side utilities** designed to streamline common developer tasks. No data ever leaves your browser — your information stays private and secure.

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## ✨ Features

Everything runs 100% in the browser — no accounts, no servers, no ads.

### 🔤 Text & String Manipulation

- **Base64 Encoder/Decoder** — Encode & decode text, files, and images to/from Base64.
- **Base64 → JSON** — Decode a Base64-encoded JSON string and explore it in a live tree view.
- **Case Converter** — Toggle between camelCase, snake_case, kebab-case, PascalCase, SCREAMING, and more.
- **Text Diff Checker** — Side-by-side visual comparison of two text blocks with change highlighting.
- **Markdown Previewer** — Live markdown-to-HTML preview with Mermaid diagram support.
- **URL Encoder/Decoder** — Encode/decode URI components and parse query parameters.
- **List / Array Converter** — Convert text columns into JSON arrays, SQL IN clauses, or comma-separated lists.
- **HTML Entity Converter** — Encode and decode HTML special characters.
- **Lorem Ipsum Generator** — Generate placeholder text by words, sentences, or paragraphs.
- **Word / Character Counter** — Real-time word, character, sentence, and reading time stats.
- **String Trimmer / Cleaner** — Remove whitespace, empty lines, or specific prefixes/suffixes from text.

### 🔐 Security & Identity

- **JWT Debugger** — Decode JWT header, payload & signature. Inspect timestamps & claims.
- **Hash Generator** — MD5, SHA-1, SHA-256, SHA-512 — powered by the Web Crypto API.
- **Password Generator** — Cryptographically secure, fully customizable password creator.
- **UUID / ULID Generator** — Generate batch v4 UUIDs and ULIDs securely.
- **Bcrypt Tester** — Hash strings and verify bcrypt hashes in the browser.
- **RSA Key Pair Generator** — Generate 2048/4096-bit RSA key pairs entirely client-side.
- **Password Strength Checker** — Score and analyze password entropy with improvement tips.
- **JS Obfuscator** — Minify and obfuscate JavaScript code to protect your source.
- **Certificate Inspector** — Paste a PEM/CRT certificate to inspect expiry, issuer, subject, and fingerprints.

### 🎨 Frontend & Design

- **CSS Playground** — Test & generate Flexbox, Grid, Gradient, Box Shadow, Animation, and more with live preview.
- **Color Converter & Palette** — Convert HEX, RGB, HSL, CMYK. WCAG contrast checker & palette generator.
- **Theme Generator** — Generate UI themes (Tailwind/CSS tokens) and export JSON.
- **Tailwind CSS Lookup** — Find Tailwind classes for any CSS property and vice versa.
- **SVG Optimizer** — Strip unnecessary metadata and minify SVG files.
- **Favicon Generator** — Generate favicons at all standard sizes from a single source.
- **Glassmorphism Generator** — Visually create frosted-glass effects and copy the CSS.
- **CSS Gradient Generator** — Build and export complex CSS gradients interactively.
- **Font Pair Previewer** — Preview Google Font pairings for headings and body text.
- **Icon Builder** — Compose and export custom icon sets.
- **Theme Generator** — Build complete design token systems (Tailwind/CSS).
- **SVG → JSX** — Convert raw SVG markup to clean React JSX components.
- **OG / Meta Tag Generator** — Build Open Graph and Twitter card meta tags with live preview.
- **Robots.txt / Sitemap Generator** — Generate SEO configuration files with custom rules.

### 🏗️ Architecture & Logic

- **JSON Viewer / Editor** — Format, validate, collapse, and explore JSON with a rich tree view.
- **RegEx Tester** — Live regex match highlighting, capture groups, flags, and a built-in cheat sheet.
- **JSON → Schema Generator** — Paste JSON → generate TypeScript interfaces, Go structs, or Zod schemas.
- **YAML ↔ JSON** — Bidirectional conversion between YAML and JSON with validation.
- **JSON Path Playground** — Query JSON data live using JSONPath expressions.
- **JSON Compare** — Diff two JSON objects and highlight structural differences.
- **SQL Formatter** — Prettify and format SQL queries across multiple dialects.
- **Cron Parser** — Parse and explain cron expressions in plain English.
- **DNS Lookup (DoH)** — Query DNS records via DNS-over-HTTPS for any domain.
- **Unix Timestamp Converter** — Convert between unix timestamps and human-readable dates.
- **.htaccess Generator** — Build Apache rewrite rules and common directives interactively.

### 📊 Data & Format Converters

- **CSV ↔ JSON** — Convert spreadsheet data to/from JSON.
- **XML ↔ JSON** — Transform XML and JSON bidirectionally with formatting.
- **TOML ↔ JSON** — Convert TOML config files to/from JSON.
- **Number Base Converter** — Convert numbers between binary, octal, decimal, and hex.
- **Base64 File Encoder/Decoder** — Encode any file to Base64 and decode back.
- **Base64 Image Viewer** — Decode Base64 image strings and preview them directly.
- **Markdown → HTML** — Convert Markdown to raw HTML output.
- **Mock Data Generator** — Generate realistic fake datasets (names, emails, addresses, etc.).

### 📦 Media & Files

- **Image Converter** — Crop, resize, and convert images between PNG, JPEG, WebP, and AVIF.
- **Image Compressor** — Compress JPEG, PNG, and WebP. Before/after size comparison.
- **SVG → PNG/JPEG** — Render SVG onto canvas and export as raster at custom resolution.
- **EXIF Data Viewer & Remover** — Read and strip metadata from photos for privacy.
- **QR Code Generator** — Generate high-quality QR codes with custom colors. Export as PNG or SVG.
- **PDF Tools** — Merge, Split, Extract Pages, Add Pages, and PDF → Text, all in the browser.
- **AI Resume Builder** — Create professional, ATS-friendly resumes. No account, no paywall.

### 🎮 Miscellaneous

- **ASCII Art Generator** — Convert text to large ASCII art in dozens of font styles.

---

## 🙌 Homepage Features

- ⭐ **Favorites** — Star any tool to pin it to the top of the homepage. Stored locally in your browser.
- 🕐 **Recently Used** — The last 8 tools you visited are shown at the top for quick access. Individually removable.
- 🔍 **Search** — Full-text search across all tools with `Ctrl+K` / `Cmd+K` shortcut.
- 🛡️ **Privacy First** — Favorites and recently used lists are stored only in your browser's `localStorage`. Nothing is ever sent to a server.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Static Export) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Editor Core | [CodeMirror 6](https://codemirror.net/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| UI Components | [Radix UI](https://www.radix-ui.com/) & [Shadcn UI](https://ui.shadcn.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| PDF Processing | [pdf-lib](https://pdf-lib.js.org/), [PDF.js](https://mozilla.github.io/pdf.js/) |
| Certificates | [node-forge](https://github.com/digitalbazaar/forge) |
| Analytics | [Vercel Speed Insights](https://vercel.com/analytics) (anonymous, no cookies) |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [Yarn](https://yarnpkg.com/) or npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/goshantmeher/deveditor.git
   cd deveditor
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Run the development server:

   ```bash
   yarn dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🏗 Development

### Adding Shadcn Components

```bash
npx shadcn@latest add [component-name]
```

### Build for Production

```bash
yarn build
```

### Serve Build Locally

```bash
npx serve@latest out
```

---

## 🔒 Privacy

DevEditor is **100% client-side**. All tools process data locally in your browser:
- No files, text, or content is ever uploaded to a server
- No user accounts or databases
- No tracking or advertising
- Favorites & recently used history stored only in your browser's `localStorage` — never transmitted

See the full [Privacy Policy](https://www.deveditor.io/privacy) for details.

---

## 📄 License

This project is licensed under the **DevEditor Non-Commercial Source License** — see the [LICENSE](LICENSE) file for details.

---

## 💖 Supporters & Sponsors

DevEditor.io is made possible thanks to the generous support of the community.

### 🏆 Gold & Silver Sponsors

| Sponsor           | Level          | Link                                                         |
| :---------------- | :------------- | :----------------------------------------------------------- |
| Your Company Logo | Gold Partner   | [Become a Sponsor](https://github.com/sponsors/goshantmeher) |
| Your Name/Logo    | Silver Sponsor | [Become a Sponsor](https://github.com/sponsors/goshantmeher) |

---

### 🛡️ Internal Champions

_These amazing teams and individuals support the project while self-hosting DevEditor internally:_

- **Your Name/Company** — [Support the project](https://github.com/sponsors/goshantmeher)
- _Waiting for our first champion..._

---

### ☕ Coffee & Power Users

_A huge thank you to everyone fueling the development of DevEditor one cup at a time!_

[See all supporters on my sponsorship page](https://github.com/sponsors/goshantmeher)

---

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Created with ❤️ by [@goshantmeher](https://github.com/goshantmeher)
