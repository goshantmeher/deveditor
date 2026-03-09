'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Copy, Check, ArrowRightLeft, Tags, FlaskConical, RotateCcw, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePersistence } from '@/contexts/PersistenceContext';
import {
   ConversionDirection,
   NAMED_ENTITIES,
   encodeHtmlEntities,
   decodeHtmlEntities,
   SAMPLE_TEXT_ENCODE,
   SAMPLE_TEXT_DECODE,
} from '@/lib/html-entity-utils';

const STORAGE_KEY_INPUT = 'html-entity-input';
const STORAGE_KEY_DIR = 'html-entity-direction';

export function HtmlEntityConverterView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [input, setInput] = useState('');
   const [output, setOutput] = useState('');
   const [direction, setDirection] = useState<ConversionDirection>('encode');
   const [copied, setCopied] = useState(false);
   const [numericMode, setNumericMode] = useState(false);
   const [showReference, setShowReference] = useState(false);

   // Load persisted state
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const storedInput = localStorage.getItem(STORAGE_KEY_INPUT);
         const storedDir = localStorage.getItem(STORAGE_KEY_DIR) as ConversionDirection | null;
         if (storedInput) setInput(storedInput);
         if (storedDir === 'encode' || storedDir === 'decode') setDirection(storedDir);
      }
   }, [isPersistenceEnabled]);

   // Save state
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      localStorage.setItem(STORAGE_KEY_INPUT, input);
      localStorage.setItem(STORAGE_KEY_DIR, direction);
   }, [input, direction, isPersistenceEnabled]);

   // Process conversion
   useEffect(() => {
      if (!input.trim()) {
         setOutput('');
         return;
      }
      if (direction === 'encode') {
         setOutput(encodeHtmlEntities(input, numericMode));
      } else {
         setOutput(decodeHtmlEntities(input));
      }
   }, [input, direction, numericMode]);

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

   const handleSwap = useCallback(() => {
      if (!output) return;
      setInput(output);
      setDirection((d) => (d === 'encode' ? 'decode' : 'encode'));
   }, [output]);

   const handleClear = () => setInput('');

   const handleSample = () => {
      setInput(direction === 'encode' ? SAMPLE_TEXT_ENCODE : SAMPLE_TEXT_DECODE);
   };

   const inputLength = input.length;
   const outputLength = output.length;

   return (
      <div className="w-full h-full flex flex-col bg-background border border-border rounded-xl shadow-sm overflow-hidden relative">
         {/* Toolbar */}
         <div className="flex flex-wrap items-center gap-3 px-4 py-2.5 border-b border-border bg-background shrink-0">
            <div className="flex items-center gap-1.5 mr-2">
               <Tags className="h-4 w-4 text-brand" />
               <span className="text-sm font-semibold text-foreground">HTML Entities</span>
            </div>

            {/* Direction Toggle */}
            <Tabs
               value={direction}
               onValueChange={(v) => setDirection(v as ConversionDirection)}
               className="shrink-0"
            >
               <TabsList className="h-8 p-0.5">
                  <TabsTrigger value="encode" className="h-7 text-xs px-3 data-[state=active]:bg-brand data-[state=active]:text-brand-foreground">
                     Encode
                  </TabsTrigger>
                  <TabsTrigger value="decode" className="h-7 text-xs px-3 data-[state=active]:bg-brand data-[state=active]:text-brand-foreground">
                     Decode
                  </TabsTrigger>
               </TabsList>
            </Tabs>

            {/* Numeric Mode Toggle (only for encode) */}
            {direction === 'encode' && (
               <button
                  onClick={() => setNumericMode(!numericMode)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border transition-all ${
                     numericMode
                        ? 'border-brand/40 bg-brand/10 text-brand'
                        : 'border-border/40 bg-background text-muted-foreground hover:text-foreground hover:border-border/60'
                  }`}
                  title="Use numeric entities (&#123;) instead of named entities (&amp;)"
               >
                  <Hash className="h-3 w-3" />
                  <span className="hidden sm:inline">Numeric</span>
               </button>
            )}

            {/* Reference Toggle */}
            <button
               onClick={() => setShowReference(!showReference)}
               className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border transition-all ${
                  showReference
                     ? 'border-brand/40 bg-brand/10 text-brand'
                     : 'border-border/40 bg-background text-muted-foreground hover:text-foreground hover:border-border/60'
               }`}
               title="Show entity reference table"
            >
               <Tags className="h-3 w-3" />
               <span className="hidden sm:inline">Reference</span>
            </button>

            <div className="flex-1" />

            {/* Sample/Clear/Swap/Copy Actions */}
            {!input && (
               <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground" onClick={handleSample}>
                  <FlaskConical className="w-3.5 h-3.5 mr-1" />
                  Sample
               </Button>
            )}
            {input && (
               <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground" onClick={handleClear}>
                  <RotateCcw className="w-3.5 h-3.5 mr-1" />
                  Clear
               </Button>
            )}
            {output && (
               <button
                  onClick={handleSwap}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-muted-foreground border border-border/40 bg-background hover:text-foreground hover:border-border/60 transition-all shrink-0"
                  title="Swap output to input and toggle direction"
               >
                  <ArrowRightLeft className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Swap</span>
               </button>
            )}
         </div>

         {/* Main Content */}
         <div className="flex-1 flex flex-col min-h-0">
            {showReference ? (
               /* Reference Table */
               <div className="flex-1 overflow-auto p-4">
                  <div className="max-w-3xl mx-auto">
                     <h2 className="text-label font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        HTML Entity Reference
                     </h2>
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5">
                        {NAMED_ENTITIES.map((ent) => (
                           <button
                              key={ent.entity}
                              onClick={() => {
                                 setInput((prev) => prev + ent.char);
                                 setShowReference(false);
                              }}
                              className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/30 border border-border/30 hover:border-brand/30 hover:bg-brand/5 transition-all text-left group"
                              title={`Click to insert "${ent.char}"`}
                           >
                              <span className="text-lg w-6 text-center font-mono">{ent.char}</span>
                              <div className="flex-1 min-w-0">
                                 <span className="text-xs font-mono text-brand block truncate">{ent.entity}</span>
                                 <span className="text-tiny text-muted-foreground block">{ent.name}</span>
                              </div>
                              <span className="text-tiny text-muted-foreground/50 font-mono">&#x{ent.code.toString(16)};</span>
                           </button>
                        ))}
                     </div>
                  </div>
               </div>
            ) : (
               /* Editor Panels */
               <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-background">
                  {/* Input Panel */}
                  <div className="flex flex-col md:w-1/2 min-h-[250px] md:min-h-0 border-b md:border-b-0 md:border-r border-border">
                     <div className="px-3 py-2 border-b min-h-12 border-border bg-background shrink-0 flex items-center justify-between">
                        <span className="text-label font-semibold text-muted-foreground uppercase tracking-wider">
                           {direction === 'encode' ? 'Plain Text' : 'HTML Entities'}
                        </span>
                        <div className="flex items-center gap-3 text-tiny text-muted-foreground">
                           {inputLength > 0 && <span>{inputLength} chars</span>}
                        </div>
                     </div>
                     <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={
                           direction === 'encode'
                              ? 'Paste HTML or text with special characters...'
                              : 'Paste text with HTML entities like &amp; &lt; &gt; ...'
                        }
                        className="flex-1 w-full p-4 bg-transparent text-foreground text-sm font-mono resize-none focus:outline-none placeholder:text-muted-foreground/40"
                        spellCheck={false}
                     />
                  </div>

                  {/* Output Panel */}
                  <div className="flex flex-col md:w-1/2 min-h-[250px] md:min-h-0 relative">
                     <div className="px-3 py-2 min-h-12 border-b border-border bg-background shrink-0 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <span className="text-tiny px-1.5 py-0.5 rounded bg-brand/10 text-brand font-mono border border-brand/20">
                              {direction === 'encode' ? (numericMode ? 'Numeric' : 'Named') : 'Decoded'}
                           </span>
                        </div>
                        <div className="flex items-center gap-3">
                           {outputLength > 0 && (
                              <span className="text-tiny text-muted-foreground">{outputLength} chars</span>
                           )}
                           <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 gap-1 text-xs px-2"
                              onClick={handleCopy}
                              disabled={!output}
                           >
                              {copied ? (
                                 <>
                                    <Check className="h-3 w-3 text-success" />
                                    <span className="text-success">Copied!</span>
                                 </>
                              ) : (
                                 <>
                                    <Copy className="h-3 w-3" />
                                    Copy
                                 </>
                              )}
                           </Button>
                        </div>
                     </div>
                     <textarea
                        value={output}
                        readOnly
                        placeholder="Converted output will appear here..."
                        className="flex-1 w-full p-4 bg-background text-foreground text-sm font-mono resize-none focus:outline-none placeholder:text-muted-foreground/30"
                        spellCheck={false}
                     />
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}
