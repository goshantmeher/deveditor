'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Copy, Check, ArrowRightLeft, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePersistence } from '@/contexts/PersistenceContext';
import { CaseType, convertMultilineText } from '@/lib/case-converter-utils';

const STORAGE_KEY_CASE = 'case-converter-active-case';
const STORAGE_KEY_INPUT = 'case-converter-input';

const CASE_OPTIONS: { value: CaseType; label: string; example: string }[] = [
   { value: 'camelCase', label: 'camelCase', example: 'helloWorld' },
   { value: 'snake_case', label: 'snake_case', example: 'hello_world' },
   { value: 'kebab-case', label: 'kebab-case', example: 'hello-world' },
   { value: 'PascalCase', label: 'PascalCase', example: 'HelloWorld' },
   { value: 'CONSTANT_CASE', label: 'CONSTANT_CASE', example: 'HELLO_WORLD' },
   { value: 'Sentence case', label: 'Sentence case', example: 'Hello world' },
   { value: 'Title Case', label: 'Title Case', example: 'Hello World' },
   { value: 'lowercase', label: 'lowercase', example: 'hello world' },
   { value: 'UPPERCASE', label: 'UPPERCASE', example: 'HELLO WORLD' },
   { value: 'dot.case', label: 'dot.case', example: 'hello.world' },
   { value: 'path/case', label: 'path/case', example: 'hello/world' },
];

export function CaseConverterView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [input, setInput] = useState('');
   const [output, setOutput] = useState('');
   const [targetCase, setTargetCase] = useState<CaseType>('camelCase');
   const [copied, setCopied] = useState(false);

   // Load state from localStorage on mount
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const storedCase = localStorage.getItem(
            STORAGE_KEY_CASE
         ) as CaseType | null;
         if (
            storedCase &&
            CASE_OPTIONS.some((opt) => opt.value === storedCase)
         ) {
            setTargetCase(storedCase);
         }

         const storedInput = localStorage.getItem(STORAGE_KEY_INPUT);
         if (storedInput) {
            setInput(storedInput);
         }
      }
   }, [isPersistenceEnabled]);

   // Save state to localStorage on change
   useEffect(() => {
      if (
         typeof window === 'undefined' ||
         !isPersistenceEnabled ||
         !isInitialized.current
      )
         return;
      localStorage.setItem(STORAGE_KEY_CASE, targetCase);
      localStorage.setItem(STORAGE_KEY_INPUT, input);
   }, [targetCase, input, isPersistenceEnabled]);

   // Process conversion
   useEffect(() => {
      if (!input.trim()) {
         setOutput('');
         return;
      }
      setOutput(convertMultilineText(input, targetCase));
   }, [input, targetCase]);

   const handleCopy = useCallback(async () => {
      if (!output) return;
      try {
         await navigator.clipboard.writeText(output);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      } catch {
         console.error('Failed to copy text');
      }
   }, [output]);

   const handleSwap = useCallback(() => {
      if (!output) return;
      setInput(output);
   }, [output]);

   // Compute stats
   const inputLength = input.length;
   const outputLength = output.length;

   // A simple line count based on newlines (plus 1, unless completely empty)
   const inputLines = inputLength === 0 ? 0 : input.split('\n').length;

   const caseSchema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Case Converter',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      featureList: [
         'camelCase conversion',
         'snake_case conversion',
         'PascalCase conversion',
         'kebab-case conversion',
         'CONSTANT_CASE conversion',
         'Sentence case conversion',
         'Title Case conversion',
      ],
      description:
         'Free online Case Converter tool. Toggle strings between camelCase, snake_case, PascalCase, kebab-case, and other programming formats instantly.',
   };

   return (
      <div className="w-full h-full flex flex-col">
         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(caseSchema) }}
         />

         {/* Toolbar */}
         <div className="flex flex-wrap items-center gap-3 px-4 py-2.5 border-b border-border/50 bg-muted/30 shrink-0">
            <div className="flex items-center gap-1.5 mr-2">
               <Type className="h-4 w-4 text-emerald-500" />
               <span className="text-sm font-semibold text-foreground">
                  Format To:
               </span>
            </div>

            <div className="flex-1 overflow-x-auto min-w-[200px] flex items-center">
               <div className="flex gap-1.5 pb-1 md:pb-0">
                  {CASE_OPTIONS.map((opt) => (
                     <button
                        key={opt.value}
                        onClick={() => setTargetCase(opt.value)}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap border ${
                           targetCase === opt.value
                              ? 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30 shadow-sm'
                              : 'bg-background text-muted-foreground border-border/40 hover:text-foreground hover:border-border/60'
                        }`}
                        title={`Format as ${opt.example}`}
                     >
                        {opt.label}
                     </button>
                  ))}
               </div>
            </div>

            {/* Swap Button */}
            {output && (
               <button
                  onClick={handleSwap}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-muted-foreground border border-border/40 bg-background hover:text-foreground hover:border-border/60 transition-all ml-auto shrink-0"
                  title="Move output to input"
               >
                  <ArrowRightLeft className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Swap</span>
               </button>
            )}
         </div>

         {/* Editor Panels */}
         <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-background">
            {/* Input Panel */}
            <div className="flex flex-col md:w-1/2 min-h-[300px] md:min-h-0 border-b md:border-b-0 md:border-r border-border/30">
               <div className="px-3 py-2 border-b border-border/30 bg-muted/10 shrink-0 flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                     Input Text
                  </span>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                     {inputLines > 0 && (
                        <span>
                           {inputLines} {inputLines === 1 ? 'line' : 'lines'}
                        </span>
                     )}
                     {inputLength > 0 && <span>{inputLength} chars</span>}
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
                  placeholder="Paste text, variables, or multiple lines of code here..."
                  className="flex-1 w-full p-4 bg-transparent text-foreground text-sm font-mono resize-none focus:outline-none placeholder:text-muted-foreground/40"
                  spellCheck={false}
               />
            </div>

            {/* Output Panel */}
            <div className="flex flex-col md:w-1/2 min-h-[300px] md:min-h-0 relative">
               <div className="px-3 py-2 border-b border-border/30 bg-muted/10 shrink-0 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-mono border border-emerald-500/20">
                        {targetCase}
                     </span>
                  </div>
                  <div className="flex items-center gap-3">
                     {outputLength > 0 && (
                        <span className="text-[10px] text-muted-foreground">
                           {outputLength} chars
                        </span>
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
                              <Check className="h-3 w-3 text-emerald-500" />
                              <span className="text-emerald-500">Copied!</span>
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
                  className="flex-1 w-full p-4 bg-muted/5 text-foreground text-sm font-mono resize-none focus:outline-none placeholder:text-muted-foreground/30"
                  spellCheck={false}
               />
            </div>
         </div>
      </div>
   );
}
