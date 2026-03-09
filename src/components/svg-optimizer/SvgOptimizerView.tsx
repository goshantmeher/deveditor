'use client';
import { STORAGE_KEYS } from '@/constants/storage';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Copy, Check, Upload, Scissors, Eye, FlaskConical, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePersistence } from '@/contexts/PersistenceContext';
import { optimizeSvgString, SvgOptimizerResult } from '@/lib/svg-optimizer-utils';

const SAMPLE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles">
  <!-- Wow this is such a cool comment! -->
  <metadata>Some random editor stuff</metadata>
  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  <path d="M5 3v4"/>
  <path d="M19 17v4"/>
  <path d="M3 5h4"/>
  <path d="M17 19h4"/>
</svg>`;

export function SvgOptimizerView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);
   const fileInputRef = useRef<HTMLInputElement>(null);

   const [input, setInput] = useState('');
   const [result, setResult] = useState<SvgOptimizerResult>({
      optimizedSvg: '',
      originalBytes: 0,
      optimizedBytes: 0,
      savingsPercent: 0,
      error: null,
   });
   const [copied, setCopied] = useState(false);
   const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');

   // Load state from localStorage on mount
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const storedInput = localStorage.getItem(STORAGE_KEYS.SVG_OPTIMIZER_INPUT);
         if (storedInput) {
            setInput(storedInput);
         }
      }
   }, [isPersistenceEnabled]);

   // Save state to localStorage on change
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      localStorage.setItem(STORAGE_KEYS.SVG_OPTIMIZER_INPUT, input);
   }, [input, isPersistenceEnabled]);

   // Process conversion
   useEffect(() => {
      setResult(optimizeSvgString(input));
   }, [input]);

   const handleCopy = useCallback(async () => {
      if (!result.optimizedSvg) return;
      try {
         await navigator.clipboard.writeText(result.optimizedSvg);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      } catch {
         console.error('Failed to copy text');
      }
   }, [result.optimizedSvg]);

   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
         const res = event.target?.result;
         if (typeof res === 'string') {
            setInput(res);
         }
      };
      reader.readAsText(file);
      e.target.value = '';
   };

   const handleDownload = () => {
      if (!result.optimizedSvg) return;
      const blob = new Blob([result.optimizedSvg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'optimized.svg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
   };

   const formatBytes = (bytes: number) => {
      if (bytes === 0) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
   };

   const faqSchema = {
       '@context': 'https://schema.org',
       '@type': 'SoftwareApplication',
       name: 'SVG Optimizer',
       applicationCategory: 'DeveloperApplication',
       operatingSystem: 'Web Browser',
       offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
       featureList: [
          'Automatic cleanup of useless tags like metadata, comments',
          'Coordinate mathematical rounding for smaller files',
          '100% Client-side privacy and SVGO powered',
       ],
       description: 'Free online SVGO tool to instantly compress and minimize SVG raw vector images without losing visual quality.',
   };

   return (
      <div className="w-full h-full flex flex-col bg-background border border-border rounded-xl shadow-sm overflow-hidden relative">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

         {/* Toolbar */}
         <div className="flex flex-wrap items-center gap-3 px-4 py-2.5 border-b border-border bg-background shrink-0">
            <div className="flex items-center gap-1.5 mr-2">
               <Scissors className="h-4 w-4 text-brand" />
               <span className="text-sm font-semibold text-foreground">SVG Optimizer (SVGO)</span>
            </div>
            
            <div className="flex items-center gap-2 ml-auto shrink-0">
               {!input && (
                  <button
                     onClick={() => setInput(SAMPLE_SVG)}
                     className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-muted-foreground border border-border/40 bg-background hover:text-foreground hover:border-border/60 transition-all"
                     title="Load sample SVG"
                  >
                     <FlaskConical className="h-3.5 w-3.5" />
                     <span className="hidden sm:inline">Sample</span>
                  </button>
               )}
               
               <input 
                  type="file" 
                  accept=".svg,image/svg+xml" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload}
                  className="hidden" 
               />

               <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-muted-foreground border border-border/40 bg-background hover:text-foreground hover:border-border/60 transition-all"
                  title="Import SVG file"
               >
                  <Upload className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Import</span>
               </button>
            </div>
         </div>

         {/* Editor Panels */}
         <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-background">
            {/* Input Panel */}
            <div className="flex flex-col md:w-1/2 min-h-[300px] md:min-h-0 border-b md:border-b-0 md:border-r border-border">
               <div className="px-3 py-2 border-b min-h-13 border-border bg-background shrink-0 flex items-center justify-between">
                  <span className="text-label font-semibold text-muted-foreground uppercase tracking-wider">
                     Raw SVG Code
                  </span>
                  <div className="flex items-center gap-3 text-tiny text-muted-foreground">
                     {result.originalBytes > 0 && <span>Raw: {formatBytes(result.originalBytes)}</span>}
                     {input.length > 0 && (
                        <button
                           onClick={() => setInput('')}
                           className="text-muted-foreground/70 hover:text-destructive transition-colors ml-1"
                        >
                           Clear
                        </button>
                     )}
                  </div>
               </div>
               <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste your unoptimized <svg> code here..."
                  className="flex-1 w-full p-4 bg-transparent text-foreground text-sm font-mono resize-none focus:outline-none placeholder:text-muted-foreground/40"
                  spellCheck={false}
               />
            </div>

            {/* Output Panel */}
            <div className="flex flex-col md:w-1/2 min-h-[300px] md:min-h-0 relative">
               <div className="px-3 py-2 min-h-13 border-b border-border bg-background shrink-0 flex items-center justify-between">
                  <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-md border border-border/50">
                     <button
                        onClick={() => setActiveTab('code')}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] text-xs font-medium transition-all ${
                           activeTab === 'code'
                              ? 'bg-background text-foreground shadow-xs border border-border/40'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                     >
                        <Scissors className="h-3.5 w-3.5" />
                        Optimized
                     </button>
                     <button
                        onClick={() => setActiveTab('preview')}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-[4px] text-xs font-medium transition-all ${
                           activeTab === 'preview'
                              ? 'bg-background text-foreground shadow-xs border border-border/40'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                     >
                        <Eye className="h-3.5 w-3.5" />
                        Preview
                     </button>
                  </div>
                  <div className="flex items-center gap-3">
                     {result.optimizedBytes > 0 && (
                        <>
                           <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">
                              -{result.savingsPercent.toFixed(1)}% 
                           </span>
                           <span className="text-[10px] text-muted-foreground hidden sm:inline">
                              New: {formatBytes(result.optimizedBytes)}
                           </span>
                        </>
                     )}
                     
                     <div className="flex items-center ml-1">
                        <Button
                           variant="ghost"
                           size="icon"
                           className="h-7 w-7 opacity-70 hover:opacity-100"
                           onClick={handleDownload}
                           disabled={!result.optimizedSvg}
                           title="Download optimized .svg file"
                        >
                           <Download className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                           variant="ghost"
                           size="sm"
                           className="h-7 gap-1 text-xs px-2"
                           onClick={handleCopy}
                           disabled={!result.optimizedSvg}
                        >
                           {copied ? (
                              <>
                                 <Check className="h-3.5 w-3.5 text-success" />
                                 <span className="text-success hidden sm:inline">Copied!</span>
                              </>
                           ) : (
                              <>
                                 <Copy className="h-3.5 w-3.5" />
                                 <span className="hidden sm:inline">Copy</span>
                              </>
                           )}
                        </Button>
                     </div>
                  </div>
               </div>
               
               {result.error ? (
                  <div className="flex-1 w-full p-4 flex flex-col justify-center items-center bg-destructive/5 text-destructive font-mono text-sm text-center">
                     <span className="font-bold mb-2">Parsing Error</span>
                     {result.error}
                  </div>
               ) : activeTab === 'code' ? (
                  <textarea
                     value={result.optimizedSvg}
                     readOnly
                     placeholder="Optimized SVG code will appear here..."
                     className="flex-1 w-full p-4 bg-muted/20 text-emerald-400 font-bold text-sm font-mono resize-none focus:outline-none placeholder:text-muted-foreground/30"
                     spellCheck={false}
                  />
               ) : (
                  <div className="flex-1 w-full p-6 bg-muted/10 flex items-center justify-center overflow-auto rounded-br-xl relative">
                     <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '16px 16px' }} />
                     
                     {result.optimizedSvg ? (
                        <div 
                           className="w-full h-full flex items-center justify-center relative z-10 transition-transform hover:scale-105 duration-300 [&>svg]:w-full [&>svg]:h-full [&>svg]:max-w-[80%] [&>svg]:max-h-[80%]"
                           dangerouslySetInnerHTML={{ __html: result.optimizedSvg }} 
                        />
                     ) : (
                        <span className="text-muted-foreground text-sm relative z-10">No SVG to preview</span>
                     )}
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
