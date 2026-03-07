# DevEditor 🧰

**DevEditor.io** – Fast, Free, and Private Developer Tools.

DevEditor is a growing collection of lightweight, client-side utilities designed to streamline common developer tasks. No data ever leaves your browser, ensuring your information remains private and secure.

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## ✨ Features

DevEditor includes a growing set of highly specialized tools organized by category. Everything runs 100% on the client.

### 🔤 Text & String Manipulation

- **Base64 Encoder**: Encode & decode text, files, and images to Base64.
- **Case Converter**: Toggle between camelCase, snake_case, kebab-case, PascalCase, and more.
- **Text Diff Checker**: Side-by-side visual comparison of two text blocks with change highlighting.
- **Markdown Generator**: Generate clean HTML from markdown with live preview and Mermaid diagrams.

### 🔐 Security & Identity

- **JWT Debugger**: Decode JWT header, payload & signature. Inspect timestamps & claims.

### 🎨 Frontend & Design

- **CSS Playground**: Test & generate CSS or Tailwind features with live preview.
- **Color Converter & Palette**: Convert HEX, RGB, HSL, CMYK. WCAG contrast checker & palette generator.
- **Theme Generator**: Generate UI themes (Tailwind/CSS tokens) and export JSON automatically.

### 🏗️ Architecture & Logic

- **JSON Viewer / Editor**: Format, validate, and explore JSON data with tree view.
- **RegEx Tester**: Live regex match highlighting, capture groups, and cheat sheet.
- **JSON → Schema Generator**: Paste JSON → generate TypeScript interfaces, Go structs, or Zod schemas.

### 📦 Media & Files

- **QR Code Generator**: Generate high-quality QR codes with custom colors and export as PNG or SVG.
- **AI Resume Builder**: Import from ChatGPT, Claude, or Gemini. Pick a template, download PDF.
- **PDF Tools**: Merge, Split, Extract Pages, and Copy Text from PDFs completely within the browser.

### 🚀 More Tools Coming Soon

- Hash Generators, Password Generators, Favicon Generators, SVG Optimizers, YAML/JSON Converters, and Media Converters!

---

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Static Export)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Editor Core**: [CodeMirror 6](https://codemirror.net/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

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

To add new UI components, use the shadcn CLI:

```bash
npx shadcn@latest add [component-name]
```

### Static Export

The project is configured for static export. To build the project:

```bash
yarn build
```

The output will be in the `/out` directory.

### Serving the Build Locally

```bash
npx serve@latest out
```

---

## 📄 License

This project is licensed under the **DevEditor Non-Commercial Source License** - see the [LICENSE](LICENSE) file for details.

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
