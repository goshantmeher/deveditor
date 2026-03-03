# DevEditor 🧰

**DevEditor.io** – Fast, Free, and Private Developer Tools.

DevEditor is a growing collection of lightweight, client-side utilities designed to streamline common developer tasks. No data ever leaves your browser, ensuring your information remains private and secure.

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## ✨ Features

### 🧩 JSON Viewer & Editor (Active)
A powerful tool to handle your JSON data with ease:
- **Validation**: Instant feedback on JSON syntax errors.
- **Repair**: Automatically fixes common JSON mistakes (thanks to `jsonrepair`).
- **Formatting**: Pretty-print or minify your JSON in one click.
- **Search**: Quickly find keys or values within complex structures.
- **Stats**: View depth, item count, and size of your JSON data.
- **Import/Export**: Drag & drop files or download your edited JSON.
- **Customizable**: Multiple themes (VS Code Dark, etc.), adjustable font sizes, and more.

### 🚀 Coming Soon
- **🎨 CSS Playground**: Experiment with CSS properties and animations in real-time.
- **⚙️ Base64 Encoder/Decoder**: Quickly convert strings and files to/from Base64.
- **🔐 JWT Decoder**: Safely decode and inspect JSON Web Tokens.

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

This project is licensed under the **Business Source License 1.1** - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

Created with ❤️ by [@goshantmeher](https://github.com/goshantmeher)
