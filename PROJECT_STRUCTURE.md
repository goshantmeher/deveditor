# DevEditor - Project Structure

## 📁 Current Structure (After Refactoring)

```
deveditor/
├── public/                          # Static assets
│   ├── favicon.ico
│   ├── logoDark.svg
│   ├── logoLight.svg
│   └── ...
│
├── src/
│   ├── app/                         # Next.js App Router
│   │   ├── (playground)/            # Route group for playground pages
│   │   │   ├── json-editor/
│   │   │   │   └── page.tsx        # JSON Editor page
│   │   │   └── layout.tsx          # Playground layout
│   │   ├── globals.css
│   │   ├── layout.tsx              # Root layout
│   │   ├── page.tsx                # Home page
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   │
│   ├── components/                  # React components
│   │   ├── editor/                  # Editor components
│   │   │   ├── Editor.tsx          # Generic editor wrapper
│   │   │   ├── json-editor.tsx     # JSON tree editor
│   │   │   └── text-editor.tsx     # Text/code editor
│   │   │
│   │   ├── json-editor/             # ✨ NEW - JSON Editor feature
│   │   │   ├── JsonEditorView.tsx  # Main view component
│   │   │   ├── EditorPanel.tsx     # Editor panel with controls
│   │   │   └── EditorActions.tsx   # Copy/compare actions
│   │   │
│   │   ├── ui/                      # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   │
│   │   ├── BrandLogo.tsx            # ✨ RENAMED (was brandLogo.tsx)
│   │   ├── BracesButton.tsx
│   │   ├── CollapseButton.tsx
│   │   ├── ExpandButton.tsx
│   │   ├── ImportButton.tsx
│   │   ├── JustifiyButton.tsx
│   │   ├── SearchButton.tsx
│   │   ├── theme-provider.tsx
│   │   └── themeToggle.tsx
│   │
│   ├── constants/                   # ✨ NEW - Application constants
│   │   └── editor.ts               # Editor-related constants
│   │
│   ├── hooks/                       # ✨ NEW - Custom React hooks
│   │   ├── useEditorState.ts       # Editor state management
│   │   └── useEditorActions.ts     # Editor actions (copy, etc.)
│   │
│   ├── lib/                         # Utility functions
│   │   ├── parser.ts               # ✨ ENHANCED - JSON utilities
│   │   └── utils.ts
│   │
│   └── types/                       # ✨ NEW - TypeScript types
│       └── editor.ts               # Editor-related types
│
├── components.json                  # shadcn/ui config
├── next.config.ts
├── package.json
├── tsconfig.json
├── REFACTORING_SUMMARY.md          # ✨ NEW - Refactoring details
└── PROJECT_STRUCTURE.md            # ✨ NEW - This file
```

## 🎯 Key Organizational Principles

### 1. **App Directory** (`src/app/`)
- Following Next.js 15 App Router conventions
- Route groups for logical organization: `(playground)/`
- Each route has its own `page.tsx`
- Layouts for shared UI structure

### 2. **Components** (`src/components/`)
Organized by:
- **Generic UI**: Individual buttons, logo, theme toggle
- **Feature-based**: `json-editor/` contains all JSON editor specific components
- **Shared UI**: `ui/` for shadcn/ui components
- **Editor**: Specialized editor components

### 3. **Constants** (`src/constants/`)
- Application-wide constants
- Type-safe configurations
- Prevents magic strings/numbers in code

### 4. **Hooks** (`src/hooks/`)
- Custom React hooks
- Business logic separation from UI
- Reusable state management

### 5. **Lib** (`src/lib/`)
- Pure utility functions
- No React dependencies
- Reusable across features

### 6. **Types** (`src/types/`)
- TypeScript type definitions
- Interface declarations
- Shared types across modules

## 🚀 Feature Organization Pattern

For each new tool/feature (e.g., CSS Playground, JWT Decoder):

```
1. Create route: src/app/(playground)/[feature-name]/page.tsx
2. Create feature components: src/components/[feature-name]/
3. Add feature types: src/types/[feature-name].ts
4. Add feature hooks: src/hooks/use[FeatureName].ts
5. Add feature constants: src/constants/[feature-name].ts
```

### Example: Adding CSS Playground

```
src/
├── app/(playground)/css-playground/
│   └── page.tsx
├── components/css-playground/
│   ├── CssPlaygroundView.tsx
│   ├── CssEditor.tsx
│   └── PreviewPanel.tsx
├── constants/
│   └── css.ts
├── hooks/
│   └── useCssEditor.ts
└── types/
    └── css.ts
```

## 📊 Component Dependencies

```
JsonEditorView
├── useEditorState (hook)
├── useEditorActions (hook)
├── EditorPanel
│   ├── Editor (generic)
│   │   ├── JSONEditor (json-editor.tsx)
│   │   └── TextEditor (text-editor.tsx)
│   ├── ImportButton
│   ├── ExpandButton
│   ├── CollapseButton
│   └── ...other buttons
└── EditorActions
    └── Button (ui component)
```

## 🎨 Design Patterns Used

1. **Compound Components**: `Editor` + `EditorPanel`
2. **Custom Hooks**: `useEditorState`, `useEditorActions`
3. **Container/Presenter**: `JsonEditorView` (container) + `EditorPanel` (presenter)
4. **Constants**: `EDITOR_TYPES` for type safety
5. **Type Definitions**: Shared interfaces for props

## 📝 Naming Conventions

- **Components**: PascalCase (e.g., `JsonEditorView.tsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useEditorState.ts`)
- **Types**: PascalCase (e.g., `EditorType`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `EDITOR_TYPES`)
- **Files**: Match default export name
- **Folders**: kebab-case (e.g., `json-editor/`)

## 🔄 Data Flow

```
1. Page (page.tsx)
   ↓ renders
2. Feature View (JsonEditorView.tsx)
   ↓ uses
3. Custom Hooks (useEditorState, useEditorActions)
   ↓ provides state to
4. Presentational Components (EditorPanel, EditorActions)
   ↓ uses
5. UI Components (Editor, Buttons, etc.)
```

## ✅ Benefits of This Structure

1. **Scalability**: Easy to add new features
2. **Maintainability**: Clear separation of concerns
3. **Testability**: Isolated components and hooks
4. **Discoverability**: Logical folder structure
5. **Type Safety**: Centralized type definitions
6. **Reusability**: Shared hooks and utilities
7. **Consistency**: Standard patterns across features

## 🎓 Best Practices Applied

- ✅ Feature-based organization
- ✅ Separation of concerns (UI, logic, state)
- ✅ Custom hooks for reusable logic
- ✅ TypeScript for type safety
- ✅ Constants for magic values
- ✅ Consistent naming conventions
- ✅ Next.js App Router best practices
- ✅ Component composition over inheritance

