'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { FileCode2, RotateCcw, Copy, Check, BookOpen } from 'lucide-react';
import { MarkdownEditor } from './MarkdownEditor';
import { MarkdownPreview } from './MarkdownPreview';
import { usePersistence } from '@/contexts/PersistenceContext';

const STORAGE_KEY = 'markdown-converter-content';

const SAMPLE_MARKDOWN = `# Welcome to DevEditor Markdown Generator

> Convert your markdown to clean, sanitized HTML instantly — no servers involved.

## Features

- **Live Preview** — See rendered output as you type
- **Copy HTML** — One-click copy of generated HTML
- **GFM Support** — Tables, task lists, strikethrough, and more
- **Mermaid Diagrams** — Flowcharts, sequence diagrams, and more
- **XSS Safe** — Output is sanitized with DOMPurify

## Mermaid Flowchart

\`\`\`mermaid
graph TD
    A[Write Markdown] --> B{Preview or HTML?}
    B -->|Preview| C[Rendered Output]
    B -->|HTML| D[Raw HTML Code]
    C --> E[Copy & Use]
    D --> E
\`\`\`

## Mermaid Sequence Diagram

\`\`\`mermaid
sequenceDiagram
    participant User
    participant Editor
    participant Parser
    User->>Editor: Type markdown
    Editor->>Parser: Convert to HTML
    Parser-->>Editor: Sanitized HTML
    Editor-->>User: Live preview
\`\`\`

## Code Example

\`\`\`javascript
function greet(name) {
   return \`Hello, \${name}!\`;
}

console.log(greet('DevEditor'));
\`\`\`

## Table Example

| Feature | Status |
|---------|--------|
| Headers | ✅ Supported |
| Lists | ✅ Supported |
| Code Blocks | ✅ Supported |
| Tables | ✅ Supported |
| Mermaid | ✅ Supported |
| Links | ✅ Supported |

## Task List

- [x] Write markdown
- [x] See live preview
- [x] Mermaid diagrams
- [ ] Copy HTML output
- [ ] Build something awesome

---

### Links & Formatting

Visit [DevEditor](https://deveditor.io) for more tools.

This text has **bold**, *italic*, ~~strikethrough~~, and \`inline code\`.

### Blockquote

> "The best way to predict the future is to invent it."
> — Alan Kay
`;

export function MarkdownConverterView() {
   const { isPersistenceEnabled } = usePersistence();
   const [markdown, setMarkdown] = useState('');
   const [copied, setCopied] = useState(false);

   // Load persisted content
   useEffect(() => {
      if (!isPersistenceEnabled) return;
      try {
         const saved = localStorage.getItem(STORAGE_KEY);
         if (saved) setMarkdown(saved);
      } catch {
         // Ignore
      }
   }, [isPersistenceEnabled]);

   // Persist on change
   useEffect(() => {
      if (!isPersistenceEnabled) return;
      try {
         localStorage.setItem(STORAGE_KEY, markdown);
      } catch {
         // Ignore
      }
   }, [markdown, isPersistenceEnabled]);

   const handleClear = () => setMarkdown('');
   const handleSample = () => setMarkdown(SAMPLE_MARKDOWN);

   const handleCopyHtml = useCallback(async () => {
      try {
         const { marked } = await import('marked');
         const DOMPurify = (await import('dompurify')).default;
         const raw = marked.parse(markdown, { async: false, gfm: true, breaks: true }) as string;
         const html = DOMPurify.sanitize(raw);
         await navigator.clipboard.writeText(html);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      } catch {
         // Ignore
      }
   }, [markdown]);

   return (
      <div className="w-full h-full flex flex-col bg-background border border-border rounded-xl shadow-sm overflow-hidden">
         {/* Toolbar */}
         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-2.5 border-b border-border bg-background gap-2 sm:gap-4 shrink-0">
            <div className="flex items-center gap-2">
               <FileCode2 className="w-4 h-4 text-indigo-500" />
               <h1 className="text-sm font-semibold">Markdown Generator</h1>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
               <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground" onClick={handleSample}>
                  <BookOpen className="w-3.5 h-3.5 mr-1" />
                  Sample
               </Button>
               <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs text-muted-foreground"
                  onClick={handleClear}
                  disabled={!markdown}
               >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" />
                  Clear
               </Button>
               <div className="h-5 w-px bg-border hidden sm:block" />
               <Button
                  size="sm"
                  className="h-8 text-xs bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={handleCopyHtml}
                  disabled={!markdown}
               >
                  {copied ? (
                     <>
                        <Check className="w-3.5 h-3.5 mr-1" />
                        Copied!
                     </>
                  ) : (
                     <>
                        <Copy className="w-3.5 h-3.5 mr-1" />
                        Copy HTML
                     </>
                  )}
               </Button>
            </div>
         </div>

         {/* Split Pane */}
         <div className="flex-1 flex flex-col md:flex-row min-h-0">
            {/* Editor Panel */}
            <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-border overflow-hidden flex-1 md:flex-none">
               <MarkdownEditor value={markdown} onChange={setMarkdown} />
            </div>

            {/* Preview Panel */}
            <div className="w-full md:w-1/2 overflow-hidden flex-1 md:flex-none">
               <MarkdownPreview markdown={markdown} />
            </div>
         </div>
      </div>
   );
}
