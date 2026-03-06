# DevEditor Design System

> Visual & UX standards for building premium developer tools.

## 🎨 Color Palette

We use a dark-themed, data-driven aesthetic with vibrant accents.

- **Background**: `#0a0a0a` (Deep Black) / `hsl(var(--background))`
- **Surface**: `hsl(var(--card))` / `bg-card`
- **Border**: `hsl(var(--border))` with `opacity-50` for subtle separation
- **Accents**:
   - **Indigo**: Primary action, branding (`#6366f1`)
   - **Emerald**: Success, positive markers (`#10b981`)
   - **Amber**: Warnings, layout specs (`#f59e0b`)
   - **Sky/Blue**: Info, technical details (`#0ea5e9`)

## 🧱 Component Standards

### 1. Tool Layout

- **Container**: Tools should act as enclosed, floating applications on the pure black `bg-background`. The `.w-full.h-full.flex.flex-col.bg-background.border.border-border` pattern is preferred.
- **Desktop**: Split-pane layout (Settings/Input on left, Results/Preview on right) divided by clear `border-border` boundaries.
- **Mobile**: Stacked layout with clear scroll boundaries. Result should move to the bottom.
- **Header/Toolbar**: Compact toolbar with Tool Icon, Title, and Action buttons (Clear, Sample, Share) on `bg-background` with a solid `border-b border-border`.

### 2. Controls (Forms)

- Use **Shadcn UI** components exclusively (`Button`, `Slider`, `Switch`, `Select`, `Input`, `Textarea`, `Tabs`). Do not use native HTML form controls.
- Always use `Label` with `text-[11px] font-medium text-muted-foreground uppercase tracking-wider`.
- Group related settings using clear separators or borders on `bg-background` panels where appropriate. Avoid `bg-muted` for large surface areas to maintain a clean aesthetic.

### 3. Typography

- **Font**: Use **Quicksand** as the global application font (`--font-sans`). Check and remove any hardcoded overrides (like Inter).
- **Headings**: `tracking-tight font-bold`.
- **Labels**: `uppercase text-[10px] or text-[11px]`.
- **Monospace**: Use `font-mono` (`Geist_Mono`) for all code, hex values, and data outputs.

## 📄 Documentation (SEO) Strategy

All tools must have a "Premium Document" at the bottom of the page. This is not just text; it's a visual landing page for the tool.

### Structure:

1. **Hero Section**:
   - `max-w-4xl mx-auto text-center space-y-6 py-16`
   - Bold title and high-level summary.
2. **Feature Grid**:
   - 3-column grid on desktop.
   - Cards use `bg-card p-6 rounded-2xl border border-border/50`.
   - Each card has a colored icon wrapper: `w-10 h-10 bg-[color]-500/10 rounded-xl flex items-center justify-center`.
3. **Deep Dive Sections**:
   - 2-column "Feature vs Visual" layout.
   - Use Lucide icons (e.g., `Zap`) for feature lists.
4. **FAQ Section**:
   - `bg-muted/20 border border-border/30 rounded-3xl p-8 md:p-12`.
   - Clear, concise Q&A.
5. **JSON-LD**: Include structured data (FAQ, SoftwareApplication) for SEO optimization.

## ✨ Micro-interactions

- Use `transition-all duration-300` for hover effects.
- Use `animate-in fade-in slide-in-from-bottom-4` for appearing elements.
- Use `hover:shadow-indigo-500/10` or similar for highlighting result containers.

---

_Follow this system for all new tool requests._
