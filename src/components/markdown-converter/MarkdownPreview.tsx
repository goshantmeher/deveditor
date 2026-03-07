'use client';

import { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

interface MarkdownPreviewProps {
   markdown: string;
}

let mermaidInitialized = false;

async function initMermaid() {
   if (mermaidInitialized) return;
   const mermaid = (await import('mermaid')).default;
   mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      themeVariables: {
         darkMode: true,
         background: '#1e1e2e',
         primaryColor: '#6366f1',
         primaryTextColor: '#e2e8f0',
         primaryBorderColor: '#4f46e5',
         lineColor: '#64748b',
         secondaryColor: '#1e293b',
         tertiaryColor: '#0f172a',
         fontFamily: 'var(--font-quicksand), sans-serif',
      },
   });
   mermaidInitialized = true;
}

async function renderMermaidBlocks(container: HTMLElement) {
   const codeBlocks = container.querySelectorAll('code.language-mermaid');
   if (codeBlocks.length === 0) return;

   await initMermaid();
   const mermaid = (await import('mermaid')).default;

   for (let i = 0; i < codeBlocks.length; i++) {
      const codeEl = codeBlocks[i];
      const preEl = codeEl.parentElement;
      if (!preEl || preEl.tagName !== 'PRE') continue;

      const definition = codeEl.textContent || '';
      try {
         const id = `mermaid-diagram-${Date.now()}-${i}`;
         const { svg } = await mermaid.render(id, definition);
         const wrapper = document.createElement('div');
         wrapper.className = 'mermaid-diagram';
         wrapper.innerHTML = svg;
         preEl.replaceWith(wrapper);
      } catch {
         // If mermaid fails, leave the code block as-is
         preEl.classList.add('mermaid-error');
      }
   }
}

export function MarkdownPreview({ markdown }: MarkdownPreviewProps) {
   const [activeTab, setActiveTab] = useState<'preview' | 'html'>('preview');
   const [copied, setCopied] = useState(false);
   const previewRef = useRef<HTMLDivElement>(null);

   // Convert markdown to sanitized HTML
   const html = useMemo(() => {
      if (!markdown.trim()) return '';
      try {
         const raw = marked.parse(markdown, { async: false, gfm: true, breaks: true }) as string;
         return DOMPurify.sanitize(raw, {
            ADD_TAGS: ['iframe'],
            ADD_ATTR: ['target', 'rel'],
         });
      } catch {
         return '<p style="color:red;">Error parsing markdown</p>';
      }
   }, [markdown]);

   // Render mermaid diagrams after HTML is injected
   useEffect(() => {
      if (activeTab !== 'preview' || !html || !previewRef.current) return;
      // Small delay to ensure DOM is updated
      const timer = setTimeout(() => {
         if (previewRef.current) {
            renderMermaidBlocks(previewRef.current);
         }
      }, 100);
      return () => clearTimeout(timer);
   }, [html, activeTab]);

   // Format HTML for display with basic indentation
   const formattedHtml = useMemo(() => {
      if (!html) return '';
      return html
         .replace(/></g, '>\n<')
         .replace(/\n{3,}/g, '\n\n');
   }, [html]);

   const handleCopy = useCallback(async () => {
      try {
         await navigator.clipboard.writeText(html);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      } catch {
         // Fallback
         const el = document.createElement('textarea');
         el.value = html;
         document.body.appendChild(el);
         el.select();
         document.execCommand('copy');
         document.body.removeChild(el);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      }
   }, [html]);

   return (
      <div className="h-full flex flex-col">
         {/* Tab bar */}
         <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-background">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'preview' | 'html')}>
               <TabsList className="h-7 bg-muted/30">
                  <TabsTrigger value="preview" className="text-[11px] px-3 h-6">
                     Preview
                  </TabsTrigger>
                  <TabsTrigger value="html" className="text-[11px] px-3 h-6">
                     HTML Output
                  </TabsTrigger>
               </TabsList>
            </Tabs>
            {activeTab === 'html' && html && (
               <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs text-muted-foreground"
                  onClick={handleCopy}
               >
                  {copied ? (
                     <>
                        <Check className="w-3 h-3 mr-1 text-emerald-500" />
                        Copied
                     </>
                  ) : (
                     <>
                        <Copy className="w-3 h-3 mr-1" />
                        Copy HTML
                     </>
                  )}
               </Button>
            )}
         </div>

         {/* Content */}
         <div className="flex-1 overflow-auto">
            {activeTab === 'preview' ? (
               <div className="p-6">
                  {html ? (
                     <div
                        ref={previewRef}
                        className="markdown-preview max-w-none"
                        dangerouslySetInnerHTML={{ __html: html }}
                     />
                  ) : (
                     <div className="flex items-center justify-center h-full min-h-[200px] text-muted-foreground text-sm">
                        Start typing markdown to see the preview...
                     </div>
                  )}
               </div>
            ) : (
               <div className="p-4">
                  {formattedHtml ? (
                     <pre className="text-sm font-mono text-emerald-400/90 whitespace-pre-wrap break-all leading-relaxed">
                        <code>{formattedHtml}</code>
                     </pre>
                  ) : (
                     <div className="flex items-center justify-center h-full min-h-[200px] text-muted-foreground text-sm">
                        HTML output will appear here...
                     </div>
                  )}
               </div>
            )}
         </div>
      </div>
   );
}
