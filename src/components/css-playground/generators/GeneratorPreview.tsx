'use client';

import React from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GeneratorPreviewProps {
   css: string;
   html: string;
   tailwind?: string;
   previewStyle?: React.CSSProperties;
   bodyBg?: string;
}

export function GeneratorPreview({
   css,
   html,
   tailwind,
   previewStyle,
   bodyBg = 'transparent',
}: GeneratorPreviewProps) {
   const [activeTab, setActiveTab] = React.useState<'css' | 'tailwind'>('css');
   const [copied, setCopied] = React.useState(false);

   const iframeRef = React.useRef<HTMLIFrameElement>(null);
   const [iframeLoaded, setIframeLoaded] = React.useState(false);
   const lastHtmlRef = React.useRef(html);

   const initialSrcDoc = React.useMemo(
      () => `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: system-ui, sans-serif;
    }
  </style>
  <style id="dynamic-style"></style>
</head>
<body>
  <div id="preview-wrapper"></div>
</body>
</html>`,
      []
   );

   React.useEffect(() => {
      const iframe = iframeRef.current;
      if (!iframe) return;

      const doc = iframe.contentDocument || iframe.contentWindow?.document;
      if (!doc || doc.readyState === 'loading') return;

      try {
         doc.body.style.background = bodyBg;

         const styleEl = doc.getElementById('dynamic-style');
         if (styleEl) {
            styleEl.textContent = css;
         }

         const wrapper = doc.getElementById('preview-wrapper');
         if (wrapper) {
            if (wrapper.innerHTML === '' || lastHtmlRef.current !== html) {
               wrapper.innerHTML = html;
               lastHtmlRef.current = html;
            }
         }
      } catch {
         // Ignore potential cross-origin errors during unloading
      }
   }, [css, html, bodyBg, iframeLoaded]);

   const handleCopy = async () => {
      try {
         const textToCopy = activeTab === 'css' ? css : tailwind || '';
         await navigator.clipboard.writeText(textToCopy);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      } catch {
         console.error('Failed to copy');
      }
   };

   return (
      <div className="flex flex-col h-full">
         {/* Live Preview */}
         <div
            className="flex-1 flex items-center justify-center overflow-auto p-4 min-h-[200px]"
            style={{
               background:
                  'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
               ...previewStyle,
            }}
         >
            <iframe
               ref={iframeRef}
               srcDoc={initialSrcDoc}
               onLoad={() => setIframeLoaded(true)}
               title="Generator Preview"
               className="border-0 rounded-lg"
               style={{
                  width: '100%',
                  height: '100%',
                  minHeight: '200px',
                  backgroundColor: 'transparent',
               }}
               sandbox="allow-scripts allow-same-origin"
            />
         </div>

         {/* Generated CSS / Tailwind */}
         <div className="border-t border-border/30">
            <div className="flex items-center justify-between px-3 py-1 bg-muted/20 border-b border-border/20">
               <div className="flex gap-4">
                  <button
                     className={`text-[10px] md:text-xs font-semibold uppercase tracking-wider transition-colors ${activeTab === 'css' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                     onClick={() => setActiveTab('css')}
                  >
                     Generated CSS
                  </button>
                  {tailwind && (
                     <button
                        className={`text-[10px] md:text-xs font-semibold uppercase tracking-wider transition-colors ${activeTab === 'tailwind' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                        onClick={() => setActiveTab('tailwind')}
                     >
                        Tailwind
                     </button>
                  )}
               </div>
               <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 gap-1 text-xs"
                  onClick={handleCopy}
               >
                  {copied ? (
                     <>
                        <Check className="h-3 w-3 text-green-500" />
                        <span className="text-green-500">Copied!</span>
                     </>
                  ) : (
                     <>
                        <Copy className="h-3 w-3" />
                        Copy {activeTab === 'css' ? 'CSS' : 'Tailwind'}
                     </>
                  )}
               </Button>
            </div>
            <pre className="p-3 text-xs font-mono text-muted-foreground overflow-auto max-h-[180px] bg-muted/10 whitespace-pre-wrap word-break">
               <code>{activeTab === 'css' ? css : tailwind}</code>
            </pre>
         </div>
      </div>
   );
}
