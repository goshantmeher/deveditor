# DevEditor.io — Master Todo

---

## 🏠 PRIORITY 0: Homepage Redesign

> **Refactor the homepage** into a visually stunning, category-based layout.
> The current flat grid will not scale to 30+ tools. It must be reorganized
> before more tools are added.

- [x] **Redesign homepage**: category-wise tool listing with collapsible sections
- [x] **Unified search**: single search bar filters across ALL categories in real-time
- [x] **Visual categories**: each category gets an icon, accent color, and short description
- [x] **Tool cards**: redesign with status badges (✅ Available, 🔜 Coming Soon), privacy badge, and tags
- [x] **"New" indicator**: auto-tag recently launched tools for 30 days
- [x] **Mobile responsive**: ensure the category layout works beautifully on phones
- [x] **Privacy banner**: global "100% client-side — nothing sent to servers" trust badge in header

### Proposed Categories:

1. 🔤 Text & String Manipulation
2. 🔐 Security & Identity
3. 🎨 Frontend & Design
4. 🏗️ Architecture & Logic
5. 📦 Media & Files
6. 📊 Data & Format Converters

---

## ✅ Already Built

| Tool                                 | Route             | Status  |
| ------------------------------------ | ----------------- | ------- |
| JSON Viewer/Editor                   | `/json-editor`    | ✅ Live |
| CSS Playground (Editor + Generators) | `/css-playground` | ✅ Live |
| Base64 Encoder/Decoder               | `/base64-encoder` | ✅ Live |
| Case Converter                       | `/case-converter` | ✅ Live |
| Text Diff Checker                    | `/text-diff`      | ✅ Live |
| JWT Debugger                         | `/jwt-debugger`   | ✅ Live |
| RegEx Tester                         | `/regex-tester`   | ✅ Live |

---

## 🔤 Category 1: Text & String Manipulation

> High-frequency daily-use tools that solve common annoyances.

- [x] **Case Converter** — Toggle between `camelCase`, `snake_case`, `kebab-case`, `PascalCase`, `UPPER_CASE`, `Sentence case`, `Title Case`
   - ✅ Feasible: Pure string manipulation, zero dependencies
   - Priority: ⭐⭐⭐⭐⭐ (daily use, high bookmark rate)

- [ ] **List / Array Converter** — Paste a column of values → get a JSON array, SQL `IN()` clause, comma-separated string, Python list, or newline-delimited output
   - ✅ Feasible: Pure string manipulation
   - Priority: ⭐⭐⭐⭐

- [ ] **URL Encoder/Decoder** — Encode/decode URI components, parse query params into a table, rebuild URLs
   - ✅ Feasible: Uses native `encodeURIComponent` / `decodeURIComponent`
   - Priority: ⭐⭐⭐⭐

- [ ] **HTML Entity Converter** — Convert `<`, `&`, `"`, etc. to HTML entities and back
   - ✅ Feasible: Pure string replace or DOM-based escaping
   - Priority: ⭐⭐⭐

- [x] **Text Diff Checker** — Side-by-side visual diff of two text blocks (line-level + character-level highlighting)
   - ✅ Feasible: Use the `diff-match-patch` library (~14 KB) or build from scratch
   - Priority: ⭐⭐⭐⭐⭐

- [ ] **Markdown Previewer** — Split-screen: Markdown editor on left, rendered HTML on right
   - ✅ Feasible: Use `marked` or `markdown-it` library, client-side rendering
   - Priority: ⭐⭐⭐⭐

- [ ] **Lorem Ipsum Generator** — Generate placeholder text (paragraphs, sentences, words), with options for length and style
   - ✅ Feasible: Pure JS with preset word banks
   - Priority: ⭐⭐⭐
   - 💡 Added by review (not in original AI list)

- [ ] **String Length / Word Counter** — Character count, word count, line count, byte size, reading time estimate
   - ✅ Feasible: Pure string manipulation
   - Priority: ⭐⭐⭐
   - 💡 Added by review

---

## 🔐 Category 2: Security & Identity

> Privacy-first tools — the killer selling point is "nothing leaves your browser."

- [x] **JWT Debugger** — Decode Header, Payload, Signature. Show `iat`/`exp` timestamps in human-readable format. Validate structure (not signature, which needs the secret).
   - ✅ Feasible: JWT is just 3 Base64-encoded JSON segments separated by dots
   - Priority: ⭐⭐⭐⭐⭐ (the #1 tool backend devs Google for)

- [ ] **Hash Generator** — MD5, SHA-1, SHA-256, SHA-512 hashes using browser's `Web Crypto API`
   - ✅ Feasible: Native `crypto.subtle.digest()` — zero dependencies
   - Priority: ⭐⭐⭐⭐⭐

- [ ] **Password / Secret Generator** — Customizable: length, uppercase, lowercase, numbers, symbols, "easy to read" mode, password strength meter
   - ✅ Feasible: Uses `crypto.getRandomValues()` for cryptographically secure randomness
   - Priority: ⭐⭐⭐⭐

- [ ] **UUID / ULID Generator** — Generate v4 UUIDs and ULIDs in batches. Copy single or bulk.
   - ✅ Feasible: `crypto.randomUUID()` is native. ULID can be implemented in ~30 lines.
   - Priority: ⭐⭐⭐⭐

- [ ] **Bcrypt Tester** — Check if a plaintext string matches a Bcrypt hash
   - ⚠️ Partially feasible: Requires `bcryptjs` (~45 KB) compiled to JS. Hashing is CPU-intensive for high work factors but doable in a Web Worker.
   - Priority: ⭐⭐⭐

- [ ] **RSA Key Pair Generator** — Generate public/private key pairs locally
   - ⚠️ Partially feasible: `crypto.subtle.generateKey()` supports RSA. Export to PEM format requires some manual encoding. Works but the UI needs to handle potentially slow generation.
   - Priority: ⭐⭐

---

## 🎨 Category 3: Frontend & Design

> Complementing the existing CSS Playground.

- [ ] **Color Converter & Palette** — Convert between HEX, RGB, HSL, CMYK. WCAG contrast checker. Generate complementary/analogous palettes.
   - ✅ Feasible: Pure math conversions, Canvas for color picker
   - Priority: ⭐⭐⭐⭐⭐

- [ ] **SVG Optimizer** — Minify SVG (strip metadata, comments, unnecessary attributes). Preview before/after.
   - ✅ Feasible: Use `svgo` compiled for browser (the WASM build exists) or a lightweight custom parser
   - Priority: ⭐⭐⭐⭐

- [ ] **Favicon Generator** — Upload a PNG → auto-resize to all standard favicon sizes (16, 32, 48, 64, 128, 256, 512). Download as ICO or PNG set.
   - ✅ Feasible: HTML `<canvas>` for resizing, `canvas.toBlob()` for export
   - Priority: ⭐⭐⭐⭐

- [ ] **Shadow / Glassmorphism Generator** — Visual sliders for `box-shadow`, `text-shadow`, `backdrop-filter`, `border-radius` with live preview
   - ✅ Feasible: Already similar to CSS Playground generators. Can be standalone.
   - Priority: ⭐⭐⭐ (partially exists in CSS Playground)

- [ ] **CSS Gradient Generator** — Multi-stop linear/radial/conic gradient builder with live preview
   - ✅ Feasible: Pure CSS generation from slider inputs
   - Priority: ⭐⭐⭐ (partially exists in CSS Playground)

- [ ] **Tailwind CSS Lookup** — Searchable reference for Tailwind classes → CSS output. Paste CSS → get Tailwind equivalent.
   - ✅ Feasible: Static lookup table of Tailwind classes. Reverse mapping is heuristic-based.
   - Priority: ⭐⭐⭐⭐
   - 💡 Added by review

- [ ] **Font Pair Previewer** — Preview Google Font combinations with customizable sample text, sizes, and weights
   - ✅ Feasible: Load fonts via Google Fonts API, render with CSS
   - Priority: ⭐⭐⭐
   - 💡 Added by review

- [ ] **Theme Generator** — Generate comprehensive UI color themes (Tailwind configs or CSS tokens) from a primary color. Show beautiful sample UI automatically updated with the colors, and allow copying export as JSON or CSS.
   - ✅ Feasible: Native client-side color math (HSL/Oklch interpolations) + React state previews.
   - Priority: ⭐⭐⭐⭐⭐

- [ ] **SVG to React/JSX Converter** — Paste raw SVG code, output clean React/JSX components mapping all snake-case/kebab-case attributes directly to proper camelCase JSX attributes instantly.
   - ✅ Feasible: Fast string parsing and AST walking using something like `hast-util-to-jsx-runtime`.
   - Priority: ⭐⭐⭐⭐

---

## 🏗️ Category 4: Architecture & Logic

> Tools that help debug logic, parse expressions, and plan architecture.

- [ ] **Cron Expression Parser** — Convert cron expressions (`*/5 * * * *`) into plain English. Show next N scheduled run times. Interactive builder.
   - ✅ Feasible: Pure parsing logic, no external dependencies needed
   - Priority: ⭐⭐⭐⭐⭐

- [x] **RegEx Tester** — Live regex match highlighting, capture groups display, regex cheat sheet, common patterns library
   - ✅ Feasible: Native `RegExp` object. UI is the main work.
   - Priority: ⭐⭐⭐⭐⭐

- [ ] **JSON ↔ TypeScript/Go/Rust Schema Generator** — Paste JSON → generate TypeScript interfaces, Go structs, Rust structs, Zod schemas, JSON Schema
   - ✅ Feasible: Parse JSON, infer types, generate code strings. Pure logic.
   - Priority: ⭐⭐⭐⭐⭐

- [ ] **Unix Timestamp Converter** — Convert epoch timestamps ↔ human-readable dates. Show "time ago" relative format. Support ms/s/ns.
   - ✅ Feasible: Native `Date` object
   - Priority: ⭐⭐⭐⭐
   - 💡 Added by review

- [ ] **ASCII Art Text Generator** — Turn text into big ASCII art headers for code comments using figlet-style fonts
   - ✅ Feasible: Use a client-side figlet.js library or precomputed font maps
   - Priority: ⭐⭐

- [ ] **JSON Path / jq Playground** — Query JSON data with JSONPath or jq-like expressions, see results live
   - ✅ Feasible: Use a client-side JSONPath library
   - Priority: ⭐⭐⭐⭐
   - 💡 Added by review

- [ ] **YAML ↔ JSON Converter** — Bidirectional YAML/JSON conversion with syntax validation
   - ✅ Feasible: Use `js-yaml` library (~30 KB)
   - Priority: ⭐⭐⭐⭐
   - 💡 Added by review

---

## 📦 Category 5: Media & Files

> File processing without uploading to any server.

- [ ] **Image Converter / Crop / Resize** — Upload images → crop with interactive handles, resize to custom dimensions, convert between formats (PNG, JPEG, WebP, AVIF). Quality slider, aspect ratio lock, batch processing.
   - ✅ Feasible: `<canvas>` for all transformations + `canvas.toBlob()` for export. Cropping via mouse/touch interaction.
   - Priority: ⭐⭐⭐⭐⭐
   - 🔄 **Has existing code from previous project — can be ported directly**

- [ ] **Image Compressor** — Compress JPEG/PNG/WebP with adjustable quality slider. Before/after comparison with file size diff.
   - ✅ Feasible: `<canvas>` + `canvas.toBlob(type, quality)`. Use OffscreenCanvas for large images.
   - Priority: ⭐⭐⭐⭐⭐

- [ ] **SVG → PNG/JPEG Converter** — Render SVG onto Canvas and export as raster image at custom resolution
   - ✅ Feasible: `<canvas>` + `drawImage()` with SVG source
   - Priority: ⭐⭐⭐⭐

- [ ] **EXIF Data Viewer/Remover** — Read and strip metadata from photos (GPS, camera info, etc.) for privacy
   - ✅ Feasible: Parse EXIF manually from JPEG binary or use lightweight `exif-js`
   - Priority: ⭐⭐⭐⭐

- [ ] **QR Code Generator** — Generate QR codes from text/URLs. Customize colors, size, error correction level. Download as PNG/SVG.
   - ✅ Feasible: Use `qrcode` library or implement Reed-Solomon encoding
   - Priority: ⭐⭐⭐⭐⭐
   - 💡 Added by review

- [ ] **PDF Page Extractor** — Extract specific pages from a PDF, merge PDFs, all client-side
   - ⚠️ Partially feasible: Use `pdf-lib` (~300 KB). Heavy but works entirely client-side.
   - Priority: ⭐⭐⭐
   - 💡 Added by review

- [ ] **PDF Resume Builder & Generator** — A genuinely free, fully customizable resume builder avoiding paywalls.
   - 💡 **Context**: Most resume builders online act free but add paywalls at download or severely restrict layouts. This tool will allow users to freely compose sections, dictate exact placement, customize content styles, and select from a list of clean, professional default format templates. 
   - ✅ Feasible: Can be built using `react-pdf` for robust client-side rendering or `html2pdf.js`.
   - Priority: ⭐⭐⭐⭐⭐
   - 💡 Added by user request

- [ ] **Merge PDF** — Combine multiple PDF files into one continuous document.
   - ✅ Feasible: Entirely client-side using `pdf-lib`.
   - Priority: ⭐⭐⭐⭐

- [ ] **Split PDF** — Cut a single PDF into multiple chunks or individual page files.
   - ✅ Feasible: Entirely client-side using `pdf-lib` to create new documents from copied pages.
   - Priority: ⭐⭐⭐⭐

- [ ] **Copy PDF Content** — Extract textual content out of a PDF document to copy to clipboard.
   - ⚠️ Partially feasible: Requires `pdf.js` by Mozilla parsing logic. Can be heavy.
   - Priority: ⭐⭐⭐

- [ ] **PDF to Doc (Word)** — Convert a PDF into an editable Word Document format.
   - ❌ **Difficult**: Writing clean `.docx` from complex PDF styling natively in browser js is notoriously imperfect. May require simple extraction mapping or a light background worker.
   - Priority: ⭐⭐

- [ ] **Doc to PDF** — Convert a Word Document into a static PDF format.
   - ⚠️ Partially feasible: Can parse docx via text extraction but losing styles, OR render simple HTML to PDF. Robust conversion usually requires headless server-side browsers or APIs.
   - Priority: ⭐⭐

- [ ] **Add Pages to PDF** — Insert additional blank pages or merge pages from a second PDF into a specific index of an existing PDF.
   - ✅ Feasible: Client-side using `pdf-lib`'s `insertPage()` methods natively.
   - Priority: ⭐⭐⭐

- [ ] **Webcam Image Filter Booth** — Capture an image directly from the user's webcam and apply various CSS/JS image filters (contrast, brightness, sepia, vintage) on the fly, allowing local download.
   - ✅ Feasible: Natively supported using `navigator.mediaDevices.getUserMedia` and `<canvas>` 2D context filtering.
   - Priority: ⭐⭐⭐⭐

- [ ] **Audio/Video Format Converter** — Convert media files natively directly in the browser. Example: WebM to MP4, WAV to MP3.
   - ✅ Feasible: Possible entirely client-side using WebAssembly port `ffmpeg.wasm`.
   - Priority: ⭐⭐⭐⭐⭐

- [ ] **GIF Creator / Video to GIF** — Stitch sequence of images or a short video clip into an animated GIF.
   - ✅ Feasible: Use client-side `gif.js` or `ffmpeg.wasm`.
   - Priority: ⭐⭐⭐⭐

- [ ] **Meme Generator** — Upload base image, overlay top/bottom impact font text, drag and drop text placement, and export.
   - ✅ Feasible: Classic `<canvas>` image rendering + `fillText` over it.
   - Priority: ⭐⭐⭐

- [ ] **SVG Editor & Animator** — Visually edit paths and create multi-stage CSS/SMIL animations for SVG objects.
   - ⚠️ Partially feasible / Complex: An extremely complex UI for full vector editing, however simpler timeline integrations for CSS keyframes on SVG layers are possible using libraries like `fabric.js` or `framer-motion`.
   - Priority: ⭐⭐⭐

---

## 📊 Category 6: Data & Format Converters (NEW — Added by Review)

> Tools for converting between data formats.

- [ ] **CSV ↔ JSON Converter** — Parse CSV to JSON array/objects and back. Handle headers, delimiters, quoting.
   - ✅ Feasible: Pure parsing logic, ~100 lines
   - Priority: ⭐⭐⭐⭐⭐

- [ ] **XML ↔ JSON Converter** — Bidirectional XML/JSON conversion with formatting
   - ✅ Feasible: Use `DOMParser` for XML parsing (native browser API)
   - Priority: ⭐⭐⭐⭐

- [ ] **TOML ↔ JSON Converter** — Parse TOML config files to JSON and back
   - ✅ Feasible: Use lightweight `@iarna/toml` library
   - Priority: ⭐⭐⭐

- [ ] **Number Base Converter** — Convert between binary, octal, decimal, hexadecimal. Support large numbers.
   - ✅ Feasible: Native `parseInt()` and `Number.toString(base)`
   - Priority: ⭐⭐⭐
   - 💡 Added by review

- [ ] **Base64 File Encoder/Decoder** — Drag and drop any file to encode it directly into a Base64 string, or paste a Base64 string to download the original file securely.
   - ✅ Feasible: Using browser `FileReader` API and `readAsDataURL()`.
   - Priority: ⭐⭐⭐⭐

- [ ] **Markdown to HTML Converter** — Convert raw markdown to sanitized HTML output and rich preview instantly.
   - ✅ Feasible: Native client mapping using `marked` and `DOMPurify`.
   - Priority: ⭐⭐⭐⭐

---

## 🗺️ Suggested Build Order

Based on impact, bookmark potential, and effort required:

### Phase 1 — High Impact, Low/Medium Effort (Next Up)

| #   | Tool                        | Category    | Why                                           |
| --- | --------------------------- | ----------- | --------------------------------------------- |
| 1   | Image Converter/Crop/Resize | 📦 Media    | **Existing code available** — fastest to ship |
| 2   | JWT Debugger                | 🔐 Security | #1 searched dev tool after JSON formatter     |
| 3   | Case Converter              | 🔤 Text     | Daily use, instant bookmark                   |
| 4   | URL Encoder/Decoder         | 🔤 Text     | Universally needed                            |
| 5   | UUID/ULID Generator         | 🔐 Security | Takes 30 min to build, high usage             |
| 6   | Hash Generator              | 🔐 Security | Native Web Crypto, fast to build              |

### Phase 2 — High Impact, Medium Effort

| #   | Tool                   | Category  | Why                                            |
| --- | ---------------------- | --------- | ---------------------------------------------- |
| 6   | Text Diff Checker      | 🔤 Text   | Unique value prop, hard to find good free ones |
| 7   | RegEx Tester           | 🏗️ Logic  | Bookmarked forever once found                  |
| 8   | Color Converter        | 🎨 Design | Frontend devs live here                        |
| 9   | Cron Expression Parser | 🏗️ Logic  | DevOps/backend goldmine                        |
| 10  | CSV ↔ JSON Converter   | 📊 Data   | Data engineers love this                       |

### Phase 3 — Medium Impact, Medium Effort

| #   | Tool                     | Category    |
| --- | ------------------------ | ----------- |
| 11  | Markdown Previewer       | 🔤 Text     |
| 12  | Password Generator       | 🔐 Security |
| 13  | Unix Timestamp Converter | 🏗️ Logic    |
| 14  | YAML ↔ JSON Converter    | 📊 Data     |
| 15  | QR Code Generator        | 📦 Media    |
| 16  | Image Compressor         | 📦 Media    |
| 17  | JSON → TypeScript Schema | 🏗️ Logic    |

### Phase 4 — Nice to Have

| #   | Tool                   | Category  |
| --- | ---------------------- | --------- |
| 18  | List / Array Converter | 🔤 Text   |
| 19  | HTML Entity Converter  | 🔤 Text   |
| 20  | SVG Optimizer          | 🎨 Design |
| 21  | Favicon Generator      | 🎨 Design |
| 22  | SVG → PNG Converter    | 📦 Media  |
| 23  | EXIF Remover           | 📦 Media  |
| 24+ | Everything else        | —         |

---

## 💡 Cross-Cutting Enhancements

- [ ] **Privacy Badge Component** — Reusable "🛡️ 100% client-side processing" badge for every tool page
- [ ] **Keyboard Shortcuts** — Global shortcuts (Ctrl+K for search, Ctrl+C for copy, etc.)
- [ ] **Tool Favoriting** — Let users star/pin their most-used tools (localStorage)
- [ ] **Recently Used** — Show last 5 used tools at the top of the homepage
- [ ] **Dark/Light toggle** — Already exists in settings, ensure all new tools respect it
- [ ] **Share tool with config** — Encode tool state in URL params so users can share a pre-filled tool link

---

> **Last updated:** 2026-03-07
> **Total tools planned:** ~35 (7 built, ~28 remaining)
