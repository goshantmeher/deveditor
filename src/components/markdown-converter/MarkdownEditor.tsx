'use client';

import { useRef, useCallback } from 'react';
import { Textarea } from '@/components/ui/textarea';
import {
   Bold,
   Italic,
   Strikethrough,
   Code,
   Heading1,
   Heading2,
   Heading3,
   List,
   ListOrdered,
   ListChecks,
   Link,
   Image,
   Table,
   CodeSquare,
   Quote,
   Minus,
   GitBranch,
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface MarkdownEditorProps {
   value: string;
   onChange: (value: string) => void;
}

interface ToolbarAction {
   icon: React.ElementType;
   label: string;
   hint?: string;
   type: 'wrap' | 'prefix' | 'insert';
   before?: string;
   after?: string;
   template?: string;
}

const TOOLBAR_GROUPS: ToolbarAction[][] = [
   // Text formatting
   [
      { icon: Bold, label: 'Bold', hint: 'Ctrl+B', type: 'wrap', before: '**', after: '**' },
      { icon: Italic, label: 'Italic', hint: 'Ctrl+I', type: 'wrap', before: '*', after: '*' },
      { icon: Strikethrough, label: 'Strikethrough', type: 'wrap', before: '~~', after: '~~' },
      { icon: Code, label: 'Inline Code', type: 'wrap', before: '`', after: '`' },
   ],
   // Headings
   [
      { icon: Heading1, label: 'Heading 1', type: 'prefix', before: '# ' },
      { icon: Heading2, label: 'Heading 2', type: 'prefix', before: '## ' },
      { icon: Heading3, label: 'Heading 3', type: 'prefix', before: '### ' },
   ],
   // Lists
   [
      { icon: List, label: 'Bullet List', type: 'prefix', before: '- ' },
      { icon: ListOrdered, label: 'Numbered List', type: 'prefix', before: '1. ' },
      { icon: ListChecks, label: 'Task List', type: 'prefix', before: '- [ ] ' },
   ],
   // Block elements
   [
      { icon: Quote, label: 'Blockquote', type: 'prefix', before: '> ' },
      { icon: Minus, label: 'Horizontal Rule', type: 'insert', template: '\n---\n' },
      { icon: Link, label: 'Link', type: 'insert', template: '[link text](https://example.com)' },
      { icon: Image, label: 'Image', type: 'insert', template: '![alt text](https://example.com/image.png)' },
   ],
   // Advanced
   [
      {
         icon: Table,
         label: 'Table',
         type: 'insert',
         template:
            '\n| Column 1 | Column 2 | Column 3 |\n|----------|----------|----------|\n| Cell 1   | Cell 2   | Cell 3   |\n| Cell 4   | Cell 5   | Cell 6   |\n',
      },
      {
         icon: CodeSquare,
         label: 'Code Block',
         type: 'insert',
         template: '\n```javascript\n// your code here\n```\n',
      },
      {
         icon: GitBranch,
         label: 'Mermaid Diagram',
         type: 'insert',
         template:
            '\n```mermaid\ngraph TD\n    A[Start] --> B{Decision}\n    B -->|Yes| C[Result 1]\n    B -->|No| D[Result 2]\n```\n',
      },
   ],
];

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
   const textareaRef = useRef<HTMLTextAreaElement>(null);

   const handleAction = useCallback(
      (action: ToolbarAction) => {
         const textarea = textareaRef.current;
         if (!textarea) return;

         const start = textarea.selectionStart;
         const end = textarea.selectionEnd;
         const selectedText = value.substring(start, end);

         let newValue: string;
         let newCursorPos: number;

         switch (action.type) {
            case 'wrap': {
               const before = action.before || '';
               const after = action.after || '';
               if (selectedText) {
                  // Wrap selected text
                  newValue = value.substring(0, start) + before + selectedText + after + value.substring(end);
                  newCursorPos = start + before.length + selectedText.length + after.length;
               } else {
                  // Insert with placeholder
                  const placeholder = action.label.toLowerCase();
                  newValue = value.substring(0, start) + before + placeholder + after + value.substring(end);
                  newCursorPos = start + before.length;
                  // Select the placeholder after insertion
                  setTimeout(() => {
                     textarea.setSelectionRange(start + before.length, start + before.length + placeholder.length);
                  }, 0);
               }
               break;
            }
            case 'prefix': {
               const before = action.before || '';
               // Find the start of the current line
               const lineStart = value.lastIndexOf('\n', start - 1) + 1;
               if (selectedText) {
                  // Prefix each selected line
                  const lines = selectedText.split('\n').map((line) => before + line);
                  newValue = value.substring(0, start) + lines.join('\n') + value.substring(end);
                  newCursorPos = start + lines.join('\n').length;
               } else {
                  // Prefix current line
                  newValue = value.substring(0, lineStart) + before + value.substring(lineStart);
                  newCursorPos = start + before.length;
               }
               break;
            }
            case 'insert': {
               const template = action.template || '';
               newValue = value.substring(0, start) + template + value.substring(end);
               newCursorPos = start + template.length;
               break;
            }
            default:
               return;
         }

         onChange(newValue);
         // Restore focus and cursor
         setTimeout(() => {
            textarea.focus();
            if (action.type !== 'wrap' || selectedText) {
               textarea.setSelectionRange(newCursorPos, newCursorPos);
            }
         }, 0);
      },
      [value, onChange]
   );

   return (
      <div className="h-full flex flex-col">
         {/* Toolbar */}
         <div className="flex items-center flex-wrap gap-0.5 px-3 py-1.5 border-b border-border bg-background shrink-0">
            <TooltipProvider delayDuration={300}>
               {TOOLBAR_GROUPS.map((group, gi) => (
                  <div key={gi} className="flex items-center">
                     {gi > 0 && <div className="w-px h-4 bg-border mx-1.5 shrink-0" />}
                     {group.map((action) => (
                        <Tooltip key={action.label}>
                           <TooltipTrigger asChild>
                              <button
                                 type="button"
                                 onClick={() => handleAction(action)}
                                 className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors shrink-0"
                                 aria-label={action.label}
                              >
                                 <action.icon className="w-3.5 h-3.5" />
                              </button>
                           </TooltipTrigger>
                           <TooltipContent side="bottom" className="text-xs">
                              {action.label}
                              {action.hint && <span className="ml-1.5 text-muted-foreground">{action.hint}</span>}
                           </TooltipContent>
                        </Tooltip>
                     ))}
                  </div>
               ))}
            </TooltipProvider>
         </div>

         {/* Label bar */}
         <div className="flex items-center justify-between px-4 py-1.5 border-b border-border/50 bg-background">
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
               Markdown Input
            </span>
            <span className="text-[10px] text-muted-foreground tabular-nums">
               {value.length} chars · {value.split(/\s+/).filter(Boolean).length} words
            </span>
         </div>

         {/* Editor */}
         <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`# Start writing markdown here...\n\nType **bold**, *italic*, \`code\`, or use the toolbar above to insert elements.`}
            className="flex-1 resize-none rounded-none border-0 bg-background font-mono text-sm leading-relaxed focus-visible:ring-0 focus-visible:ring-offset-0 p-4"
            spellCheck={false}
         />
      </div>
   );
}
