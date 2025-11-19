# DevEditor AI Coding Instructions

## Project Overview

DevEditor is a Next.js 15 static-export web application providing free developer tools (JSON viewer/editor, text formatters, etc.). The app uses a dual-panel editor architecture with real-time formatting and validation.

## Architecture Patterns

### Dual Editor System

- **Core Flow**: `JsonEditorView.tsx` → two `EditorPanel` instances → shared `Editor.tsx` wrapper → specialized editors (`text-editor.tsx`, `json-editor.tsx`)
- **State Management**: Each panel uses `useEditorState` hook with independent `data` and `config` state
- **Data Sync**: `useEditorActions` provides `copyToLeft`/`copyToRight` for cross-panel data transfer
- **Config Structure**: See `src/types/editor.ts` - `EditorConfig` controls both `editorType` (text/tree) and `formatState` (expanded/collapsed/minified/standard)

### Editor Type Switching

When switching editor types in `JsonEditorView.tsx`, configs reset to defaults via `updateConfig`:

```typescript
// See src/components/json-editor/JsonEditorView.tsx lines 17-25
const initialConfig =
  newConfig.editorType === EDITOR_TYPES.text
    ? DEFAULT_TEXT_EDITOR_CONFIG
    : DEFAULT_JSON_EDITOR_CONFIG;
```

### JSON Parsing Strategy

- **Two-tier fallback**: `parseJson()` tries `JSON.parse()` first, then `json5.parse()` for relaxed syntax (see `src/lib/parser.ts`)
- **Error handling**: Uses `jsonrepair` library for auto-fix functionality in text-editor
- **Debounced validation**: Text editor debounces parsing by 200ms to avoid excessive re-renders during typing

### CodeMirror Integration

- **Text Editor** (`src/components/editor/text-editor.tsx`):

  - Uses `@uiw/react-codemirror` with VS Code themes (`vscodeDark`/`vscodeLight`)
  - Custom error decoration system in `src/lib/editor-error.ts` with inline error markers and gutter icons
  - Error navigation: `parseErrorPosition()` extracts line/column from error messages, `navigateToError()` scrolls to errors
  - **Diff highlighting**: Compare mode uses `createDiffDecorationsPlugin()` to show added (green), removed (red), and modified (yellow) lines
  - **Read-only in compare mode**: `editable={!config.compareMode}` disables editing during comparison
  - **Auto-unfold**: Uses `unfoldAll()` from CodeMirror to expand all folded sections when entering compare mode
  - Line wrapping enabled via `EditorView.lineWrapping`
  - Conditional features: Line numbers/highlighting disabled in minified mode
  - Code folding: Built-in CodeMirror foldGutter for collapsible JSON structures
  - **Immediate typing feedback**: `paintData` memo returns `pendingText` immediately when user types, preventing reset issues

- **JSON Editor** (`src/components/editor/json-editor.tsx`):
  - Uses `json-edit-react` library for tree view
  - Read-only implementation (no onChange handler)

## Development Workflows

### Running the App

```bash
npm run dev --turbopack  # Next.js 15 with Turbopack
npm run build            # Static export to /out
npm run lint             # ESLint
```

### Adding shadcn/ui Components

```bash
npx shadcn@latest add <component-name>
```

Configuration in `components.json` uses "new-york" style with path aliases (`@/components`, `@/lib`, etc.)

## Project-Specific Conventions

### File Organization

- **Route groups**: Playground routes under `src/app/(playground)/` to share layout
- **Component separation**: `src/components/editor/` for editor wrappers, `src/components/json-editor/` for JSON-specific UI
- **Utility libs**: Parser logic in `src/lib/`, editor-specific utilities (error handling, themes) also in `src/lib/`

### Styling Patterns

- **Utility-first**: Use Tailwind classes with `cn()` helper from `src/lib/utils.ts` for conditional class merging
- **Theme integration**: All components use `next-themes` - check `mounted` state before rendering theme-dependent content (prevents hydration mismatch)
- **Layout calculations**: Height constraints like `calc(100% - 40px)` for editor content below toolbars (see `Editor.tsx`)

### TypeScript Usage

- **Strict mode enabled**: All files require explicit types
- **Path aliases**: Use `@/` for imports from `src/` directory
- **Const assertions**: Constants use `as const` for type narrowing (e.g., `EDITOR_TYPES`, `FORMAT_STATES`)

### State Management

- **No global state**: Component-level state with custom hooks
- **Functional updaters**: `useEditorState` uses functional updaters (`prevConfig => ({ ...prevConfig, ...newConfig })`) to avoid stale closure issues
- **Memoization**: Use `useMemo` for derived/formatted data (see `paintData` in text-editor)
- **Callback stability**: `useCallback` for functions passed as props
- **Pending text pattern**: Text editor uses `pendingText` state to show immediate typing feedback before debounced validation

## External Dependencies

### Critical Libraries

- **CodeMirror 6**: Modular editor - extensions added conditionally based on format state
- **json5**: Lenient JSON parsing (trailing commas, unquoted keys)
- **jsonrepair**: Auto-fix malformed JSON
- **next-themes**: Dark/light mode with system preference support
- **Radix UI**: Accessible primitives via shadcn/ui

### SEO & Performance

- **Static export**: `output: "export"` in `next.config.ts` - no server features allowed
- **Security headers**: Custom headers in `next.config.ts` for CSP, frame protection
- **Structured data**: JSON-LD schema in `layout.tsx` for web app indexing
- **Image optimization disabled**: `unoptimized: true` required for static export

## Common Patterns

### JSON Compare Mode

Compare mode enables side-by-side diff highlighting between left and right editors:

```typescript
// From JsonEditorView.tsx - compare logic
const handleCompare = () => {
  // Auto-switch from minified to standard format for both editors
  leftEditor.updateConfig({
    formatState: leftNeedsFormatChange
      ? FORMAT_STATES.STANDARD
      : leftEditor.config.formatState,
    compareMode: true,
  });
  // Pass comparisonData to enable diff highlighting
  <EditorPanel comparisonData={isComparing ? rightEditor.data : undefined} />;
};
```

- **Comparison logic**: `src/lib/json-compare.ts` provides `compareJsonObjects()` for deep diff detection
- **Diff types**: added (green), removed (red), modified (yellow), unchanged
- **Line-based highlighting**: `getLineDiffs()` converts object diffs to line numbers for CodeMirror decorations
- **Array item mapping**: `buildPathToLineMap()` properly maps array items (e.g., `colors[0]`, `colors[1]`) to their line numbers
- **Auto-format**: Automatically switches from minified to standard format when compare is activated
- **Auto-unfold**: All folded/collapsed JSON sections are expanded when entering compare mode
- **Read-only mode**: Both editors become read-only (`editable={!config.compareMode}`) during comparison
- **Exit on minify**: Switching to minified format automatically exits compare mode for both editors
- **Synchronized state**: `updateConfig` in `JsonEditorView` syncs compare mode state across both editors
- **Text mode only**: Compare button disabled when either panel is in tree view mode

### Error Handling in Editors

Always provide user-facing error messages with actionable fixes:

```typescript
// From text-editor.tsx - show error banner with navigation and auto-fix
{
  error && (
    <div className="p-2 bg-red-100 text-red-800">
      <span>{error}</span>
      <Button onClick={navigateToError}>Go to Line {errorPosition.line}</Button>
      <Button onClick={fixJson}>Fix JSON</Button>
    </div>
  );
}
```

### Format State Transitions

When adding new format options, update:

1. `FORMAT_STATES` constant in `src/constants/editor.ts`
2. `INDENT_LEVELS` mapping for JSON stringification
3. `editorFormatOptions` array in editor configs
4. Conditional rendering in `EditorPanel.tsx` for format buttons

### Adding New Tools

1. Create route under `src/app/(playground)/<tool-name>/page.tsx`
2. Add tool metadata to `tools` array in `src/app/page.tsx`
3. Set `available: true` when ready to expose
4. Follow dual-panel pattern if applicable

## Testing & Debugging

- No formal test suite currently - manual testing in dev mode
- Use browser DevTools for client-side debugging
- Error boundaries: Not implemented - errors surface in console and UI error states
