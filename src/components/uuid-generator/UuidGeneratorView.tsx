'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Copy, Check, RefreshCw, Layers, Fingerprint, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { usePersistence } from '@/contexts/PersistenceContext';
import { generateUuid, generateUlid } from '@/lib/uuid-generator-utils';

const STORAGE_KEY_TYPE = 'uuid-generator-type';
const STORAGE_KEY_COUNT = 'uuid-generator-count';
const STORAGE_KEY_FORMAT = 'uuid-generator-format'; // For cases, quotes, etc.

type IdType = 'UUID v4' | 'ULID';
type Formatting = 'none' | 'uppercase' | 'lowercase';

export function UuidGeneratorView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [type, setType] = useState<IdType>('UUID v4');
   const [count, setCount] = useState<number>(1);
   const [format, setFormat] = useState<Formatting>('none');
   
   const [output, setOutput] = useState<string>('');
   const [copied, setCopied] = useState(false);

   // Load persisted state
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const storedType = localStorage.getItem(STORAGE_KEY_TYPE);
         const storedCount = localStorage.getItem(STORAGE_KEY_COUNT);
         const storedFormat = localStorage.getItem(STORAGE_KEY_FORMAT);

         if (storedType === 'UUID v4' || storedType === 'ULID') setType(storedType);
         if (storedFormat === 'none' || storedFormat === 'uppercase' || storedFormat === 'lowercase') setFormat(storedFormat);
         
         if (storedCount) {
            const parsed = parseInt(storedCount, 10);
            if (!isNaN(parsed) && parsed > 0 && parsed <= 1000) setCount(parsed);
         }
      }
   }, [isPersistenceEnabled]);

   // Save state
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      localStorage.setItem(STORAGE_KEY_TYPE, type);
      localStorage.setItem(STORAGE_KEY_COUNT, count.toString());
      localStorage.setItem(STORAGE_KEY_FORMAT, format);
   }, [type, count, format, isPersistenceEnabled]);

   // Generator logic
   const handleGenerate = useCallback(() => {
      const results: string[] = [];
      const generateFn = type === 'UUID v4' ? generateUuid : generateUlid;

      for (let i = 0; i < count; i++) {
         let id = generateFn();
         if (format === 'uppercase') id = id.toUpperCase();
         if (format === 'lowercase') id = id.toLowerCase();
         results.push(id);
      }

      setOutput(results.join('\n'));
   }, [type, count, format]);

   // Auto-generate on boot / option change
   useEffect(() => {
      handleGenerate();
   }, [handleGenerate]);

   const handleCopy = useCallback(async () => {
      if (!output) return;
      try {
         await navigator.clipboard.writeText(output);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      } catch {
         console.error('Failed to copy');
      }
   }, [output]);

   const handleClear = () => setOutput('');

   return (
      <div className="w-full h-full flex flex-col bg-background border border-border rounded-xl shadow-sm overflow-hidden relative">
         {/* Toolbar */}
         <div className="flex flex-wrap items-center gap-3 px-4 py-2.5 border-b border-border bg-background shrink-0">
            <div className="flex items-center gap-1.5 mr-2">
               <Fingerprint className="h-4 w-4 text-brand" />
               <span className="text-sm font-semibold text-foreground">UUID / ULID Generator</span>
            </div>
            
            <div className="flex-1" />

            {/* Actions */}
            <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground" onClick={handleClear}>
               <Trash2 className="w-3.5 h-3.5 mr-1" />
               <span className="hidden sm:inline">Clear List</span>
            </Button>
            
            <Button
               variant="default"
               size="sm"
               className="h-8 bg-brand hover:bg-brand/90 text-brand-foreground gap-1 text-xs px-2"
               onClick={handleCopy}
               disabled={!output}
            >
               {copied ? (
                  <>
                     <Check className="h-3.5 w-3.5" />
                     <span className="hidden sm:inline">Copied!</span>
                  </>
               ) : (
                  <>
                     <Copy className="h-3.5 w-3.5" />
                     <span className="hidden sm:inline">Copy All</span>
                  </>
               )}
            </Button>
         </div>

         {/* Main Content */}
         <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-background">
            
            {/* Options Panel (Left) */}
            <div className="flex flex-col md:w-1/3 min-h-[300px] md:min-h-0 border-b md:border-b-0 md:border-r border-border overflow-y-auto">
               <div className="px-3 py-2 border-b min-h-12 border-border bg-background shrink-0 flex items-center justify-between">
                  <span className="text-label font-semibold text-muted-foreground uppercase tracking-wider">
                     Generation Settings
                  </span>
               </div>
               
               <div className="p-5 space-y-8">
                  {/* Type Selector */}
                  <div className="space-y-3">
                     <label className="text-xs font-semibold text-foreground tracking-wider uppercase">Algorithm</label>
                     <div className="flex flex-col gap-2">
                        {(['UUID v4', 'ULID'] as IdType[]).map((t) => (
                           <button
                              key={t}
                              onClick={() => setType(t)}
                              className={`px-3 py-2.5 text-sm text-left rounded-md transition-all border flex items-center justify-between group ${
                                 type === t
                                    ? 'bg-brand/10 border-brand/50 text-brand font-medium'
                                    : 'bg-muted/10 border-border/40 text-muted-foreground hover:bg-muted/30 hover:text-foreground hover:border-border/60'
                              }`}
                           >
                              {t}
                              <span className="text-xs text-muted-foreground/60 group-hover:text-muted-foreground">
                                 {t === 'UUID v4' ? '128-bit Random' : 'Lexicographically Sortable'}
                              </span>
                           </button>
                        ))}
                     </div>
                  </div>

                  {/* Formatting Selector */}
                  {(type === 'UUID v4' || type === 'ULID') && (
                     <div className="space-y-3">
                        <label className="text-xs font-semibold text-foreground tracking-wider uppercase">Formatting</label>
                        <div className="flex border border-border/40 bg-muted/20 rounded-lg p-1">
                           {(['none', 'uppercase', 'lowercase'] as Formatting[]).map((f) => (
                              <button
                                 key={f}
                                 onClick={() => setFormat(f)}
                                 className={`flex-1 py-1.5 text-xs text-center rounded capitalize transition-all ${
                                    format === f ? 'bg-background shadow-xs text-foreground font-semibold border border-border/50' : 'text-muted-foreground hover:text-foreground'
                                 }`}
                              >
                                 {f === 'none' ? 'Default' : f}
                              </button>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* Quantity Slider */}
                  <div className="space-y-4 pt-2 border-t border-border/40">
                     <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                           <Layers className="w-3.5 h-3.5" />
                           Batch Amount
                        </label>
                        <input
                           type="number"
                           className="w-16 h-7 text-right bg-muted/20 border border-border/40 rounded px-2 text-xs focus:outline-none focus:border-brand/40 font-mono"
                           value={count}
                           onChange={(e) => {
                              let val = parseInt(e.target.value, 10);
                              if (isNaN(val)) val = 1;
                              if (val < 1) val = 1;
                              if (val > 5000) val = 5000;
                              setCount(val);
                           }}
                           min={1}
                           max={5000}
                        />
                     </div>
                     <Slider
                        value={[count]}
                        onValueChange={(vals) => setCount(vals[0])}
                        min={1}
                        max={100}
                        step={1}
                        className="py-1"
                     />
                  </div>
                  
                  {/* Big Generate Button */}
                  <Button
                     onClick={handleGenerate}
                     className="w-full h-11 text-sm font-semibold mt-4"
                     variant="outline"
                  >
                     <RefreshCw className="w-4 h-4 mr-2" />
                     Generate More
                  </Button>
               </div>
            </div>

            {/* Output Panel (Right) */}
            <div className="flex flex-col md:w-2/3 min-h-[300px] md:min-h-0 relative">
               <div className="px-3 py-2 min-h-12 border-b border-border bg-background shrink-0 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <span className="text-tiny px-1.5 py-0.5 rounded bg-brand/10 text-brand font-mono border border-brand/20 uppercase tracking-wider">
                        Live Preview ({output ? count : 0})
                     </span>
                  </div>
               </div>
               
               <div className="flex-1 w-full bg-background relative">
                  <textarea
                     value={output}
                     readOnly
                     placeholder="Generated IDs will appear here..."
                     className="absolute inset-0 w-full h-full p-4 md:p-6 text-foreground text-sm resize-none focus:outline-none placeholder:text-muted-foreground/30 font-mono leading-loose whitespace-pre tracking-wide selection:bg-brand/20"
                     spellCheck={false}
                  />
               </div>
            </div>
         </div>
      </div>
   );
}
