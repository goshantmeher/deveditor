# DevEditor.io — Master Todo

---

## 🏠 PRIORITY 0: Homepage Redesign

> **Refactor the homepage** into a visually stunning, category-based layout.
> The current flat grid will not scale to 30+ tools. It must be reorganized
> before more tools are added.

- *All initial redesign tasks completed.*

### Proposed Categories:

1. 🔤 Text & String Manipulation
2. 🔐 Security & Identity
3. 🎨 Frontend & Design
4. 🏗️ Architecture & Logic
5. 📦 Media & Files
6. 📊 Data & Format Converters

---

## ✅ Already Built

| Tool                                 | Route              | Status  |
| ------------------------------------ | ------------------ | ------- |
| JSON Viewer/Editor                   | `/json-editor`     | ✅ Live |
| CSS Playground (Editor + Generators) | `/css-playground`  | ✅ Live |
| Base64 Encoder/Decoder               | `/base64-encoder`  | ✅ Live |
| Case Converter                       | `/case-converter`  | ✅ Live |
| Text Diff Checker                    | `/text-diff`       | ✅ Live |
| JWT Debugger                         | `/jwt-debugger`    | ✅ Live |
| RegEx Tester                         | `/regex-tester`    | ✅ Live |
| Color Converter & Palette            | `/color-converter` | ✅ Live |
| Theme Generator                      | `/theme-generator` | ✅ Live |
| JSON → Schema Generator              | `/json-to-schema`  | ✅ Live |
| QR Code Generator                    | `/qr-generator`    | ✅ Live |
| URL Encoder/Decoder                  | `/url-encoder`     | ✅ Live |
| Hash Generator                       | `/hash-generator`  | ✅ Live |
| UUID / ULID Generator                | `/uuid-generator`  | ✅ Live |
| Password Generator                   | `/password-gen`    | ✅ Live |
| YAML ↔ JSON Converter                | `/yaml-json`       | ✅ Live |
| JSON Path Playground                 | `/json-path`       | ✅ Live |
| JSON Compare / Diff                  | `/json-compare`    | ✅ Live |
| PDF Resume Builder                   | `/resume-builder`  | ✅ Live |
| SQL Formatter                        | `/sql-formatter`   | ✅ Live |
| .htaccess Generator                  | `/htaccess-generator`| ✅ Live |
| Image Converter                      | `/image-converter` | ✅ Live |
| PDF Tools (Merge/Split/Extract)      | `/pdf-*`           | ✅ Live |
| Markdown Previewer                   | `/markdown`        | ✅ Live |
| List / Array Converter               | `/list-converter`  | ✅ Live |
| Tailwind CSS Lookup                  | `/tailwind`        | ✅ Live |

---

## 🔤 Category 1: Text & String Manipulation

> High-frequency daily-use tools that solve common annoyances.

- [ ] **String Trimmer / Cleaner** — Remove whitespace, empty lines, or specific prefixes/suffixes from large text blocks.
   - Priority: ⭐⭐⭐

---

## 🔐 Category 2: Security & Identity

> Privacy-first tools — the killer selling point is "nothing leaves your browser."

- [ ] **Certificate Inspector** — Paste a PEM/CRT file to see expiry date, issuer, and subject details.
   - Priority: ⭐⭐⭐

---

## 🎨 Category 3: Frontend & Design

> Complementing the existing CSS Playground.

- [ ] **Icon Font Previewer** — Browse FontAwesome, Lucide, or Material icons with copy-to-clipboard functionality.
   - Priority: ⭐⭐⭐

---

## 🏗️ Category 4: Architecture & Logic

> Tools that help debug logic, parse expressions, and plan architecture.

- [ ] **Base64 to JSON** — Directly decode a base64 encoded JSON string and view it.
   - Priority: ⭐⭐⭐

- [ ] **API Tester (Requires DevEditor Extension)** — A local Postman clone. Bypasses CORS restrictions using a companion open-source browser extension to safely test local and remote APIs.
   - ✅ Feasible: UI is standard React. Network requests are proxied through a manifest v3 extension with `host_permissions: ["<all_urls>"]`.
   - 💡 **Architecture Notes on Data Storage:** To maintain 100% privacy without a backend database:
      - **Default Storage:** `IndexedDB` or `localStorage` for immediate, zero-login use.
      - **Cloud Sync (Opt-in):** Add an option to "Sync to Cloud". Use frontend-only OAuth to connect to **Google Drive (drive.file scope)** or **GitHub (Secret Gists)**.
      - **Result:** Users get cross-device syncing of their sensitive API configurations, but all data goes directly from their browser memory to their personal, secure cloud storage. DevEditor remains completely stateless and zero-liability.
   - Priority: ⭐⭐⭐⭐
   - 💡 Added by review

- [ ] **DNS Lookup (DoH)** — Perform DNS lookups natively in the browser using DNS-over-HTTPS (DoH) via Cloudflare/Google JSON APIs.
   - ✅ Feasible: Pure frontend `fetch` to public DoH providers.
   - Priority: ⭐⭐⭐
   - 💡 Added by review

---

## 📦 Category 5: Media & Files

> File processing without uploading to any server.

- [ ] **Image Compressor** — Compress JPEG/PNG/WebP with adjustable quality slider. Before/after comparison with file size diff.
   - ✅ Feasible: `<canvas>` + `canvas.toBlob(type, quality)`. Use OffscreenCanvas for large images.
   - Priority: ⭐⭐⭐⭐⭐

- [ ] **SVG → PNG/JPEG Converter** — Render SVG onto Canvas and export as raster image at custom resolution
   - ✅ Feasible: `<canvas>` + `drawImage()` with SVG source
   - Priority: ⭐⭐⭐⭐

- [ ] **EXIF Data Viewer/Remover** — Read and strip metadata from photos (GPS, camera info, etc.) for privacy
   - ✅ Feasible: Parse EXIF manually from JPEG binary or use lightweight `exif-js`
   - Priority: ⭐⭐⭐⭐

- [ ] **Image to PDF** — Convert one or more images into a multi-page PDF document.
   - Priority: ⭐⭐⭐⭐

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

*All items in this category have been completed.*

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
> **Total tools planned:** ~35 (10 built, ~25 remaining)
