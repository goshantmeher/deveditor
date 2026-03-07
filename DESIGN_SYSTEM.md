# DevEditor Design System

> Visual & UX standards for building premium developer tools.
> Updated: March 2026

---

## 🎨 Color System

We use **OKLCH** color space with full **light + dark mode** support via CSS custom properties.
Theme is toggled with a `.dark` class on the root.

### Semantic Tokens

| Token                | Usage                                                 |
| -------------------- | ----------------------------------------------------- |
| `--background`       | Page background                                       |
| `--foreground`       | Primary text                                          |
| `--card`             | Card / elevated surface backgrounds                   |
| `--muted`            | Subtle backgrounds (empty states, secondary panels)   |
| `--muted-foreground` | Secondary text, placeholders                          |
| `--border`           | Dividers, card edges. Use `border-border/50` for soft |
| `--accent`           | Interactive hover backgrounds                         |
| `--destructive`      | Delete actions, errors                                |

### Brand Tokens

| Token                | Value (shared light+dark)             | Usage                  |
| -------------------- | ------------------------------------- | ---------------------- |
| `--brand`            | `oklch(0.585 0.233 277.117)` (Indigo) | Primary accent, CTAs   |
| `--brand-foreground` | white                                 | Text on brand surfaces |
| `--success`          | Emerald                               | Positive states        |
| `--warning`          | Amber                                 | Caution states         |
| `--info`             | Sky blue                              | Informational states   |

### Tailwind Accent Colors

Use these for icon boxes, badges, and decorative elements:

- **Indigo** (`indigo-500`): Primary actions, branding, CTA sections
- **Emerald** (`emerald-500`): Success, privacy, positive features
- **Amber** (`amber-500`): Speed, warnings, secondary features
- **Rose** (`rose-500`): Errors, security alerts
- **Violet** (`violet-500`): AI/special features (e.g., AI Import on Resume Builder)
- **Sky** (`sky-500`): Info, technical details

---

## 🧱 Component Standards

### 1. Tool Page Layout

- **Wrapper**: `<div id="page-top" className="flex flex-col">` — the `id="page-top"` is required for the SEO CTA scroll-to-top button.
- **Tool viewport**: `<div className="h-[calc(100vh-72px)] shrink-0">` — takes full viewport minus navbar.
- **SEO section**: `<div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">` — below the fold.
- **Persistence**: Wrap with `<PersistenceProvider>` for tools that save state to localStorage.

### 2. Tool Container

- Tools act as enclosed applications on `bg-background`.
- Pattern: `w-full h-full flex flex-col bg-background border border-border`
- **Desktop**: Split-pane layout (Settings/Input left, Results/Preview right) divided by `border-border`.
- **Mobile**: Stacked layout. Results move below.

### 3. Header/Toolbar

- Compact toolbar: `bg-background` with `border-b border-border`.
- Contains: Tool Icon, Title, Action buttons.
- Standard actions: **Clear**, **Sample** (when input is empty), **Copy**, **Swap** (when applicable).
- Sample button: Uses `FlaskConical` icon, populates with example data, hides when input is present.

### 4. Controls (Forms)

- Use **shadcn/ui** components exclusively (`Button`, `Slider`, `Switch`, `Select`, `Input`, `Textarea`, `Tabs`).
- Labels: `text-[11px] font-medium text-muted-foreground uppercase tracking-wider`.
- Group related settings using dividers or section headers.
- Avoid `bg-muted` for large surface areas to maintain a clean aesthetic.

### 5. Typography

- **Font**: **Quicksand** via `--font-quicksand` → `--font-sans`. Loaded in `layout.tsx`.
- **Monospace**: **Geist Mono** via `--font-geist-mono` → `--font-mono`. Used for all code, hex values, data outputs.
- **Headings**: `tracking-tight font-bold`.
- **Labels in tools**: `text-[10px]` or `text-[11px]` with `uppercase tracking-wider` (acceptable for compact UI).
- **Labels in SEO sections**: `text-xs` minimum (never `text-[10px]`).
- **Custom tokens**: `--font-size-tiny: 0.625rem` (10px), `--font-size-label: 0.6875rem` (11px).

---

## 📄 SEO Content Design Standard

> **Reference file:** `src/components/json-editor/docs/JsonEditorSeoContent.tsx`
> All tool SEO sections MUST follow this design pattern. No exceptions.

Every tool page gets a "Premium Document" below the fold. This is a full visual landing page for the tool, not just text.

### Required Sections (in order):

1. **Hero Section** — Centered, `max-w-3xl mx-auto`:
   - Badge pill: `bg-indigo-500/10 border border-indigo-500/20 text-indigo-400`, uppercase `text-xs font-bold tracking-wider`, with a Lucide tool icon
   - `h1` heading: `text-4xl md:text-6xl font-black tracking-tight` with one `<span className="text-indigo-500">` accent word
   - Description: `text-lg text-muted-foreground leading-relaxed`

2. **Feature Grid** — 3-column `md:grid-cols-3 gap-8`:
   - Cards: `group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300`
   - Icon boxes: `w-12 h-12 rounded-2xl bg-[color]-500/10` with `group-hover:scale-110 transition-transform`
   - Use 3 color variants: indigo, emerald, amber
   - Titles: `text-xl font-bold mb-3`, descriptions: `text-muted-foreground text-sm leading-relaxed`

3. **Visual/Detail Section** — 2-column `md:grid-cols-2 gap-12 items-center`:
   - **Left**: `h2` (`text-3xl font-bold tracking-tight`) + feature list with indigo Lucide icons (`w-5 h-5 text-indigo-500`)
   - **Right**: Pro Tip / Quick Reference box — `bg-muted/50 rounded-3xl p-8 border border-border`
   - Pro Tip header: Sparkles icon + `text-xs font-bold uppercase tracking-widest text-muted-foreground`
   - Code references use `code className="text-indigo-400"`
   - Quick Reference text: `text-xs` minimum (never `text-[10px]`)

4. **FAQ Section** — `space-y-12 border-t border-border/50 pt-24`:
   - Centered title: `text-3xl font-bold tracking-tight`
   - 2-column grid: `md:grid-cols-2 gap-x-12 gap-y-8`
   - Question dot: `w-1.5 h-1.5 rounded-full bg-indigo-500`
   - Answer styling: `text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-indigo-500/20`
   - Must include `<script type="application/ld+json">` with FAQ schema

5. **CTA Section** — `bg-indigo-600 rounded-3xl p-12 text-center relative overflow-hidden group`:
   - Glowing orb: `absolute bg-white/5 blur-[80px] rounded-full group-hover:bg-white/10 transition-colors`
   - White heading + `text-indigo-100` description
   - `<ScrollToTopButton label="Scroll up to Start [Action]" />`
   - **Important**: Tool page wrapper div must have `id="page-top"` for scroll-to-top to work

---

## 🏠 Homepage Structure

The homepage uses a **category-based grid** layout:

- Categories: each has `id`, `title`, `icon` (emoji), `description`, `accentColor` (Tailwind color base)
- Tool cards: status badges (`available`, `coming-soon`, `planned`), privacy badge, tags
- Global search bar: filters across ALL categories in real-time
- Collapsible sections with `ChevronDown` toggle

---

## ✨ Micro-interactions

- Use `transition-all duration-300` for hover effects.
- Use `animate-in fade-in slide-in-from-bottom-4` for appearing elements.
- Use `hover:shadow-indigo-500/10` or similar for highlighting result containers.
- Icon hover: `group-hover:scale-110 transition-transform` on icon containers.

---

## 🔒 Privacy Pattern

Every tool page must emphasize client-side processing:

- Feature grid card: "Client-Side Privacy" / "100% Private" with `ShieldCheck` icon
- FAQ entry: confirm data never leaves the browser
- All processing: `localStorage`, `IndexedDB`, or in-memory only — never server calls

---

_Follow this system for all new tool requests._
