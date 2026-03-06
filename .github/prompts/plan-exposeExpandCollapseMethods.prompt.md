# Plan: Expose Expand/Collapse Methods from Text Editor to EditorPanel

## TL;DR

Fix syntax errors in `expandAll` and `collapseAll` functions in [text-editor.tsx](src/components/editor/text-editor.tsx), expose them via `forwardRef` in the `Editor` wrapper component, create refs in [EditorPanel.tsx](src/components/json-editor/EditorPanel.tsx) to access those methods, and call them when users click the header buttons.

## Problem Statement

Currently, the `expandAll` and `collapseAll` functions exist in `text-editor.tsx` but:

1. They have **syntax errors** (duplicate closing braces, wrong function call in `collapseAll`)
2. They are **not exposed** to parent components that need to call them
3. The **header buttons** in `EditorPanel` cannot trigger these functions

## Solution Overview

Implement a `forwardRef`-based pattern to expose editor methods up the component tree:

```
EditorPanel (with ref)
  ↓
Editor (forwards ref with useImperativeHandle)
  ↓
TextEditor (defines methods, exports via forwardRef)
```

## Implementation Steps

### Step 1: Fix Syntax Errors in text-editor.tsx

**Location:** Lines 292-311

**Issues:**

- `collapseAll` callback has mismatched braces
- `collapseAll` calls `unfoldAll(view)` instead of `foldAll(view)`
- Second timeout parameter `2000` appears to be debug code

**Action:**

- Remove duplicate closing braces
- Import `foldAll` from `@codemirror/language`
- Replace `unfoldAll(view)` with `foldAll(view)` in `collapseAll`
- Remove the `2000` timeout parameter (or clarify intent)

```typescript
const expandAll = React.useCallback(() => {
   const view = editorRef.current?.view;
   if (!view) return;
   unfoldAll(view);
}, []);

const collapseAll = React.useCallback(() => {
   const view = editorRef.current?.view;
   if (!view) return;
   foldAll(view);
}, []);
```

### Step 2: Export EditorHandle Interface and Wrap TextEditor with forwardRef

**Location:** text-editor.tsx

**Action:**

- Create `EditorHandle` interface at top of file:

```typescript
export interface EditorHandle {
   expandAll: () => void;
   collapseAll: () => void;
}
```

- Wrap component export with `React.forwardRef`:

```typescript
const TextEditor = React.forwardRef<EditorHandle, TextEditorProps>(
  ({ data, onChange, config, ... }, ref) => {
    // ...existing code...

    useImperativeHandle(ref, () => ({
      expandAll,
      collapseAll,
    }), [expandAll, collapseAll]);

    return (
      // ...existing JSX...
    );
  }
);

export default TextEditor;
```

### Step 3: Update Editor.tsx to Support forwardRef

**Location:** Editor.tsx

**Action:**

- Import `EditorHandle` from text-editor
- Change `Editor` to `React.forwardRef<EditorHandle | null, EditorProps>`
- Pass ref through to `TextEditor` or set to null for `JSONEditor`:

```typescript
const Editor = React.forwardRef<EditorHandle | null, EditorProps>(
  ({ config, ... }, ref) => {
    // ...existing code...

    return (
      <>
        {/* toolbar/search/error panels... */}
        {config.editorType === EDITOR_TYPES.text ? (
          <TextEditor ref={ref} {...textEditorProps} />
        ) : (
          <JSONEditor {...jsonEditorProps} />
        )}
      </>
    );
  }
);
```

### Step 4: Create Ref in EditorPanel and Connect to Buttons

**Location:** EditorPanel.tsx

**Action:**

- Import `EditorHandle` from editor component
- Create ref: `const editorRef = useRef<EditorHandle>(null);`
- Update `ExpandButton` handler:

```typescript
const handleExpand = () => {
   editorRef.current?.expandAll();
   handleEditorFormatChange(FORMAT_STATES.EXPANDED);
};
```

- Update `CollapseButton` handler:

```typescript
const handleCollapse = () => {
   editorRef.current?.collapseAll();
   handleEditorFormatChange(FORMAT_STATES.COLLAPSED);
};
```

- Pass ref to `Editor` component:

```typescript
<Editor
  ref={editorRef}
  data={data}
  onChange={onDataChange}
  config={config}
  // ...other props...
>
```

## Files to Modify

1. `src/components/editor/text-editor.tsx` — Fix syntax, add forwardRef, useImperativeHandle
2. `src/components/editor/Editor.tsx` — Add forwardRef support
3. `src/components/json-editor/EditorPanel.tsx` — Create ref, update handlers

## Considerations & Questions

### 1. JSON Tree Editor Support

**Question:** Should `expandAll`/`collapseAll` work for JSON tree view?

**Options:**

- A) Keep methods text-editor-only (current approach)
- B) Implement similar methods in json-editor component
- C) Disable expand/collapse buttons when in tree view mode

**Recommendation:** Option C — Add conditional rendering in EditorPanel:

```typescript
const showExpandCollapseButtons = config.editorType === EDITOR_TYPES.text && isStandard;
```

### 2. Timeout in collapseAll

**Issue:** Current code has `}, 2000);` which suggests a 2-second delay

**Options:**

- A) Remove the timeout entirely
- B) Keep timeout for intentional delay
- C) Make configurable

**Recommendation:** Remove unless there's a specific reason for the delay

### 3. Format State Alignment

**Question:** When user clicks expand/collapse buttons, should the format state and visual folding always stay in sync?

**Current behavior:** Buttons independently call `handleEditorFormatChange()` AND `expandAll()`/`collapseAll()`

**Potential issue:** If format state shows "EXPANDED" but code is actually folded, UI is misleading

**Recommendation:** Format buttons should be the source of truth; physical folding should follow format state automatically

### 4. Compare Mode Handling

**Note:** When `compareMode` is true, editor is read-only and `unfoldAll()` is already called

**Consideration:** Should expand/collapse buttons be disabled in compare mode?

**Recommendation:** Yes, disable buttons when `config.compareMode === true`

## Testing Checklist

- [ ] Expand button unfolds all sections and changes format to EXPANDED
- [ ] Collapse button folds all sections and changes format to COLLAPSED
- [ ] Buttons work in both text and tree view (or are disabled appropriately)
- [ ] Compare mode disables expand/collapse buttons
- [ ] Search mode doesn't interfere with expand/collapse
- [ ] No console errors or TypeScript errors
- [ ] Minified mode doesn't allow expand/collapse (no folding in minified)

## Success Criteria

✅ Syntax errors fixed in text-editor.tsx
✅ Methods exposed via forwardRef pattern
✅ Editor buttons can call expand/collapse methods
✅ Format state updates align with physical folding
✅ Tree view editor handles gracefully (buttons disabled or no-op)
✅ TypeScript strict mode satisfied
