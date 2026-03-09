'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Copy, Check, FileText, RefreshCw, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { usePersistence } from '@/contexts/PersistenceContext';
import { generateLoremIpsum, LoremType } from '@/lib/lorem-ipsum-utils';
import { Switch } from '@/components/ui/switch';

const STORAGE_KEY_TYPE = 'lorem-ipsum-type';
const STORAGE_KEY_COUNT = 'lorem-ipsum-count';
const STORAGE_KEY_START = 'lorem-ipsum-start';

export function LoremIpsumView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [type, setType] = useState<LoremType>('paragraphs');
   const [count, setCount] = useState<number>(3);
   const [startWithLorem, setStartWithLorem] = useState<boolean>(true);
   const [output, setOutput] = useState('');
   const [copied, setCopied] = useState(false);

   // Load persisted state
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const storedType = localStorage.getItem(STORAGE_KEY_TYPE) as LoremType | null;
         const storedCount = localStorage.getItem(STORAGE_KEY_COUNT);
         const storedStart = localStorage.getItem(STORAGE_KEY_START);

         if (storedType === 'paragraphs' || storedType === 'sentences' || storedType === 'words') setType(storedType);
         if (storedCount) {
            const parsed = parseInt(storedCount, 10);
            if (!isNaN(parsed) && parsed > 0) setCount(parsed);
         }
         if (storedStart) setStartWithLorem(storedStart === 'true');
      }
   }, [isPersistenceEnabled]);

   // Save state
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      localStorage.setItem(STORAGE_KEY_TYPE, type);
      localStorage.setItem(STORAGE_KEY_COUNT, count.toString());
      localStorage.setItem(STORAGE_KEY_START, startWithLorem.toString());
   }, [type, count, startWithLorem, isPersistenceEnabled]);

   // Generate text based on settings
   const handleGenerate = useCallback(() => {
      setOutput(generateLoremIpsum(type, count, startWithLorem));
   }, [type, count, startWithLorem]);

   // Initial generation
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

   // Adjust max values based on type
   const maxCount = type === 'paragraphs' ? 50 : type === 'sentences' ? 100 : 1000;
   
   // Handle count input safely
   const handleCountInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      let val = parseInt(e.target.value, 10);
      if (isNaN(val)) val = 1;
      if (val < 1) val = 1;
      if (val > maxCount) val = maxCount;
      setCount(val);
   };

   return (
      <div className="w-full h-full flex flex-col bg-background border border-border rounded-xl shadow-sm overflow-hidden relative">
         {/* Toolbar */}
         <div className="flex flex-wrap items-center gap-3 px-4 py-2.5 border-b border-border bg-background shrink-0">
            <div className="flex items-center gap-1.5 mr-2">
               <FileText className="h-4 w-4 text-brand" />
               <span className="text-sm font-semibold text-foreground">Lorem Ipsum Generator</span>
            </div>
            
            <div className="flex-1" />

            {/* Actions */}
            <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground" onClick={handleGenerate}>
               <RefreshCw className="w-3.5 h-3.5 mr-1" />
               <span className="hidden sm:inline">Regenerate</span>
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
                     <span className="hidden sm:inline">Copy Text</span>
                  </>
               )}
            </Button>
         </div>

         {/* Main Content */}
         <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-background">
            {/* Input Panel / Settings */}
            <div className="flex flex-col md:w-1/3 min-h-[250px] md:min-h-0 border-b md:border-b-0 md:border-r border-border overflow-y-auto">
               <div className="px-3 py-2 border-b min-h-12 border-border bg-background shrink-0 flex items-center justify-between">
                  <span className="text-label font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                     <Hash className="w-3.5 h-3.5" />
                     Generator Settings
                  </span>
               </div>
               
               <div className="p-5 space-y-6">
                  {/* Output Type */}
                  <div className="space-y-3">
                     <label className="text-xs font-semibold text-foreground">OUTPUT TYPE</label>
                     <div className="flex flex-col gap-2">
                        {(['paragraphs', 'sentences', 'words'] as LoremType[]).map((t) => (
                           <button
                              key={t}
                              onClick={() => {
                                 setType(t);
                                 // Reset count reasonable default based on type
                                 if (t === 'paragraphs' && count > 50) setCount(5);
                                 else if (t === 'sentences' && count > 100) setCount(10);
                                 else if (t === 'words' && count > 1000) setCount(100);
                              }}
                              className={`px-3 py-2 text-sm text-left rounded-md transition-all border ${
                                 type === t
                                    ? 'bg-brand/10 border-brand/50 text-brand font-medium'
                                    : 'bg-muted/10 border-border/40 text-muted-foreground hover:bg-muted/30 hover:text-foreground hover:border-border/60'
                              }`}
                           >
                              {t.charAt(0).toUpperCase() + t.slice(1)}
                           </button>
                        ))}
                     </div>
                  </div>

                  {/* Quantity Slider */}
                  <div className="space-y-4 pt-2">
                     <div className="flex justify-between items-center">
                        <label className="text-xs font-semibold text-foreground uppercase">
                           Number of {type}
                        </label>
                        <input
                           type="number"
                           className="w-16 h-7 text-right bg-muted/20 border border-border/40 rounded px-2 text-xs focus:outline-none focus:border-brand/40"
                           value={count}
                           onChange={handleCountInput}
                           min={1}
                           max={maxCount}
                        />
                     </div>
                     <Slider
                        value={[count]}
                        onValueChange={(vals: number[]) => setCount(vals[0])}
                        min={1}
                        max={maxCount}
                        step={1}
                        className="py-1"
                     />
                  </div>

                  {/* Options */}
                  <div className="space-y-4 pt-4 border-t border-border/40">
                     <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                           <label className="text-sm font-medium">Start with "Lorem ipsum"</label>
                           <p className="text-xs text-muted-foreground">Force output to begin with the standard phrase.</p>
                        </div>
                        <Switch checked={startWithLorem} onCheckedChange={setStartWithLorem} />
                     </div>
                  </div>
               </div>
            </div>

            {/* Output Panel */}
            <div className="flex flex-col md:w-2/3 min-h-[250px] md:min-h-0 relative">
               <div className="px-3 py-2 min-h-12 border-b border-border bg-background shrink-0 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <span className="text-tiny px-1.5 py-0.5 rounded bg-brand/10 text-brand font-mono border border-brand/20 uppercase tracking-wider">
                        Generated Output
                     </span>
                  </div>
                  <div className="flex items-center gap-3">
                     <span className="text-tiny text-muted-foreground">
                        {output.length} characters
                     </span>
                  </div>
               </div>
               
               <div className="flex-1 w-full bg-background relative">
                  <textarea
                     value={output}
                     readOnly
                     placeholder="Generated text will appear here..."
                     className="absolute inset-0 w-full h-full p-6 text-foreground text-sm resize-none focus:outline-none placeholder:text-muted-foreground/30 leading-relaxed font-sans"
                     spellCheck={false}
                  />
               </div>
            </div>
         </div>
      </div>
   );
}
