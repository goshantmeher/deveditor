'use client';
import { STORAGE_KEYS } from '@/constants/storage';

import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Copy, Check, List, ArrowRightLeft, Eraser, Hash, Code, FileText, Shuffle, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePersistence } from '@/contexts/PersistenceContext';
import { OutputFormat, FORMAT_OPTIONS, FormatOption, parseInput, formatItems } from '@/lib/list-converter-utils';

type Delimiter = 'auto' | 'newline' | 'comma' | 'tab' | 'pipe';

const DELIMITER_OPTIONS: { value: Delimiter; label: string }[] = [
   { value: 'auto', label: 'Auto-detect' },
   { value: 'newline', label: 'Newlines' },
   { value: 'comma', label: 'Commas' },
   { value: 'tab', label: 'Tabs' },
   { value: 'pipe', label: 'Pipes ( | )' },
];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
   code: <Code className="h-3 w-3" />,
   text: <FileText className="h-3 w-3" />,
   transform: <Shuffle className="h-3 w-3" />,
};

const CATEGORY_LABELS: Record<string, string> = {
   code: 'Code Formats',
   text: 'Text Formats',
   transform: 'Transforms',
};

const SAMPLE_DATA = `react
vue
angular
svelte
next.js
nuxt
astro
remix
solid
qwik
vue
react
angular`;

export function ListConverterView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [input, setInput] = useState('');
   const [outputFormat, setOutputFormat] = useState<OutputFormat>('json-array');
   const [delimiter, setDelimiter] = useState<Delimiter>('auto');
   const [copied, setCopied] = useState(false);

   // Load persisted state
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const storedFormat = localStorage.getItem(STORAGE_KEYS.LIST_CONVERTER_FORMAT) as OutputFormat | null;
         if (storedFormat && FORMAT_OPTIONS.some((opt) => opt.value === storedFormat)) {
            setOutputFormat(storedFormat);
         }

         const storedDelimiter = localStorage.getItem(STORAGE_KEYS.LIST_CONVERTER_DELIMITER) as Delimiter | null;
         if (storedDelimiter && DELIMITER_OPTIONS.some((opt) => opt.value === storedDelimiter)) {
            setDelimiter(storedDelimiter);
         }

         const storedInput = localStorage.getItem(STORAGE_KEYS.LIST_CONVERTER_INPUT);
         if (storedInput) {
            setInput(storedInput);
         }
      }
   }, [isPersistenceEnabled]);

   // Save state
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      localStorage.setItem(STORAGE_KEYS.LIST_CONVERTER_FORMAT, outputFormat);
      localStorage.setItem(STORAGE_KEYS.LIST_CONVERTER_DELIMITER, delimiter);
      localStorage.setItem(STORAGE_KEYS.LIST_CONVERTER_INPUT, input);
   }, [outputFormat, delimiter, input, isPersistenceEnabled]);

   // Process conversion
   const items = useMemo(() => parseInput(input, delimiter), [input, delimiter]);
   const output = useMemo(() => formatItems(items, outputFormat), [items, outputFormat]);

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

   // Stats
   const itemCount = items.length;
   const uniqueCount = new Set(items).size;
   const duplicateCount = itemCount - uniqueCount;

   // Group format options by category
   const groupedOptions = useMemo(() => {
      const groups: Record<string, FormatOption[]> = {};
      for (const opt of FORMAT_OPTIONS) {
         if (!groups[opt.category]) groups[opt.category] = [];
         groups[opt.category].push(opt);
      }
      return groups;
   }, []);

   const selectedFormat = FORMAT_OPTIONS.find((opt) => opt.value === outputFormat);

   const listSchema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'List / Array Converter',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      featureList: [
         'JSON array conversion',
         'SQL IN clause generation',
         'Python list formatting',
         'CSV output',
         'Deduplication',
         'Sorting',
         'Go slice formatting',
      ],
      description:
         'Free online List & Array Converter. Paste text columns, CSV, or newline-separated values and convert to JSON arrays, SQL IN clauses, Python lists, and more.',
   };

   return (
      <div className="w-full h-full flex flex-col bg-background border border-border rounded-xl shadow-sm overflow-hidden relative">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />

         {/* Toolbar */}
         <div className="flex flex-wrap items-center gap-3 px-4 py-2.5 border-b border-border bg-background shrink-0">
            <div className="flex items-center gap-1.5 mr-1">
               <List className="h-4 w-4 text-brand" />
               <span className="text-sm font-semibold text-foreground">Convert To:</span>
            </div>

            {/* Output Format Selector */}
            <div className="flex-1 min-w-[200px] flex items-center">
               <Select value={outputFormat} onValueChange={(val: string) => setOutputFormat(val as OutputFormat)}>
                  <SelectTrigger className="w-full max-w-[300px] h-9 bg-background">
                     <SelectValue placeholder="Select Format" />
                  </SelectTrigger>
                  <SelectContent>
                     {Object.entries(groupedOptions).map(([category, options]) => (
                        <React.Fragment key={category}>
                           <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                              {CATEGORY_ICONS[category]}
                              {CATEGORY_LABELS[category]}
                           </div>
                           {options.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                 <span className="flex items-center justify-between w-full">
                                    <span>{opt.label}</span>
                                    <span className="text-muted-foreground ml-4 hidden sm:inline-block font-mono text-[11px]">
                                       {opt.description}
                                    </span>
                                 </span>
                              </SelectItem>
                           ))}
                        </React.Fragment>
                     ))}
                  </SelectContent>
               </Select>
            </div>

            {/* Delimiter Selector */}
            <div className="flex items-center gap-1.5">
               <span className="text-xs text-muted-foreground hidden sm:inline">Split by:</span>
               <Select value={delimiter} onValueChange={(val: string) => setDelimiter(val as Delimiter)}>
                  <SelectTrigger className="w-[130px] h-9 bg-background">
                     <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                     {DELIMITER_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                           {opt.label}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            </div>

            {/* Sample Data Button */}
            {!input && (
               <button
                  onClick={() => setInput(SAMPLE_DATA)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-muted-foreground border border-border/40 bg-background hover:text-foreground hover:border-border/60 transition-all shrink-0"
                  title="Load sample data"
               >
                  <FlaskConical className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Sample</span>
               </button>
            )}

            {/* Swap Button */}
            {output && (
               <button
                  onClick={handleSwap}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-muted-foreground border border-border/40 bg-background hover:text-foreground hover:border-border/60 transition-all shrink-0"
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
            <div className="flex flex-col md:w-1/2 min-h-[300px] md:min-h-0 border-b md:border-b-0 md:border-r border-border">
               <div className="px-3 py-2 border-b min-h-12 border-border bg-background shrink-0 flex items-center justify-between">
                  <span className="text-label font-semibold text-muted-foreground uppercase tracking-wider">Input</span>
                  <div className="flex items-center gap-3 text-tiny text-muted-foreground">
                     {itemCount > 0 && (
                        <span className="flex items-center gap-1">
                           <Hash className="h-3 w-3" />
                           {itemCount} item{itemCount === 1 ? '' : 's'}
                        </span>
                     )}
                     {duplicateCount > 0 && (
                        <span className="text-amber-400/80">
                           {duplicateCount} dupe{duplicateCount === 1 ? '' : 's'}
                        </span>
                     )}
                     {input.length > 0 && (
                        <button
                           onClick={() => setInput('')}
                           className="flex items-center gap-1 text-muted-foreground/70 hover:text-destructive transition-colors ml-1"
                        >
                           <Eraser className="h-3 w-3" />
                           Clear
                        </button>
                     )}
                  </div>
               </div>
               <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`Paste your list here...\n\nSupported formats:\n• One item per line\n• Comma-separated: a, b, c\n• Tab-separated values\n• Pipe-separated: a | b | c`}
                  className="flex-1 w-full p-4 bg-transparent text-foreground text-sm font-mono resize-none focus:outline-none placeholder:text-muted-foreground/40"
                  spellCheck={false}
               />
            </div>

            {/* Output Panel */}
            <div className="flex flex-col md:w-1/2 min-h-[300px] md:min-h-0 relative">
               <div className="px-3 py-2 min-h-12 border-b border-border bg-background shrink-0 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     {selectedFormat && (
                        <span className="text-tiny px-1.5 py-0.5 rounded bg-brand/10 text-brand font-mono border border-brand/20">
                           {selectedFormat.label}
                        </span>
                     )}
                  </div>
                  <div className="flex items-center gap-3">
                     {output.length > 0 && (
                        <span className="text-[10px] text-muted-foreground">{output.length} chars</span>
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
      </div>
   );
}
