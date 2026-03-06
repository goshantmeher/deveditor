'use client';

import { useState, useMemo, useCallback } from 'react';
import { generateSchema, SAMPLE_JSON, SchemaFormat } from '@/lib/schema-utils';
import { Copy, CheckCircle2, AlertCircle, Braces, FileCode2, ArrowRight, Trash2, FileJson } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

// ── Format config ────────────────────────────────────────────
const FORMATS: {
   id: SchemaFormat;
   label: string;
   icon: string;
   ext: string;
   lang: string;
}[] = [
   {
      id: 'typescript',
      label: 'TypeScript',
      icon: 'TS',
      ext: '.ts',
      lang: 'TypeScript Interfaces',
   },
   { id: 'go', label: 'Go', icon: 'Go', ext: '.go', lang: 'Go Structs' },
   { id: 'rust', label: 'Rust', icon: 'Rs', ext: '.rs', lang: 'Rust Structs' },
   { id: 'zod', label: 'Zod', icon: 'Zd', ext: '.ts', lang: 'Zod Schemas' },
   {
      id: 'json-schema',
      label: 'JSON Schema',
      icon: 'JS',
      ext: '.json',
      lang: 'JSON Schema Draft-07',
   },
];

const FORMAT_COLORS: Record<SchemaFormat, string> = {
   typescript: 'bg-blue-500/15 text-blue-400 border-blue-500/25',
   go: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/25',
   rust: 'bg-orange-500/15 text-orange-400 border-orange-500/25',
   zod: 'bg-purple-500/15 text-purple-400 border-purple-500/25',
   'json-schema': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25',
};

// ── Line numbers component ───────────────────────────────────
function LineNumbers({ count }: { count: number }) {
   return (
      <div className="select-none pr-3 mr-3 border-r border-border/20 text-right text-muted-foreground/30 font-mono text-xs leading-relaxed shrink-0">
         {Array.from({ length: count }, (_, i) => (
            <div key={i + 1}>{i + 1}</div>
         ))}
      </div>
   );
}

// ── Main Component ───────────────────────────────────────────
export function SchemaGeneratorView() {
   const [jsonInput, setJsonInput] = useState(SAMPLE_JSON);
   const [format, setFormat] = useState<SchemaFormat>('typescript');
   const [rootName, setRootName] = useState('Root');
   const [copiedField, setCopiedField] = useState<string | null>(null);

   const result = useMemo(() => generateSchema(jsonInput, format, rootName), [jsonInput, format, rootName]);

   const inputLineCount = useMemo(() => jsonInput.split('\n').length, [jsonInput]);

   const outputLineCount = useMemo(() => (result.output || '').split('\n').length, [result.output]);

   const copyToClipboard = useCallback(async (text: string, field: string) => {
      try {
         await navigator.clipboard.writeText(text);
         setCopiedField(field);
         setTimeout(() => setCopiedField(null), 2000);
      } catch {
         /* ignore */
      }
   }, []);

   const loadSample = useCallback(() => {
      setJsonInput(SAMPLE_JSON);
   }, []);

   const clearInput = useCallback(() => {
      setJsonInput('');
   }, []);

   const formatJson = useCallback(() => {
      try {
         const parsed = JSON.parse(jsonInput);
         setJsonInput(JSON.stringify(parsed, null, 2));
      } catch {
         /* ignore - invalid JSON */
      }
   }, [jsonInput]);

   const currentFormat = FORMATS.find((f) => f.id === format)!;

   return (
      <div className="flex flex-col h-full w-full bg-background overflow-hidden">
         {/* Toolbar */}
         <div className="flex flex-wrap items-center justify-between gap-2 px-4 md:px-6 py-3 border-b border-border bg-muted/10 shrink-0">
            <div className="flex items-center gap-2">
               <FileCode2 className="w-5 h-5 text-blue-500" />
               <h1 className="text-sm font-bold tracking-tight">JSON → Schema Generator</h1>
            </div>

            <div className="flex items-center gap-2">
               {/* Root name input */}
               <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider hidden sm:block">
                     Root:
                  </span>
                  <Input
                     value={rootName}
                     onChange={(e) => setRootName(e.target.value || 'Root')}
                     className="w-24 h-8 text-xs font-mono"
                     placeholder="Root"
                     spellCheck={false}
                  />
               </div>

               <div className="h-5 w-px bg-border mx-1 hidden sm:block" />

               <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5" onClick={loadSample}>
                  <FileJson className="w-3 h-3" /> Sample
               </Button>
            </div>
         </div>

         {/* Format Tabs */}
         <div className="flex items-center gap-1 px-4 md:px-6 py-2 border-b border-border/50 bg-muted/5 shrink-0 overflow-x-auto">
            {FORMATS.map((f) => (
               <Tooltip key={f.id}>
                  <TooltipTrigger asChild>
                     <button
                        onClick={() => setFormat(f.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap border ${
                           format === f.id
                              ? FORMAT_COLORS[f.id]
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50 border-transparent'
                        }`}
                     >
                        <span className="font-bold text-[10px]">{f.icon}</span>
                        <span className="hidden sm:inline">{f.label}</span>
                     </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                     <p className="text-xs">{f.lang}</p>
                  </TooltipContent>
               </Tooltip>
            ))}
         </div>

         {/* Main Content: Input + Output side-by-side */}
         <div className="flex-1 flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-border overflow-y-auto lg:overflow-hidden">
            {/* Left: JSON Input */}
            <div className="h-[50vh] flex-none lg:h-auto lg:flex-1 flex flex-col overflow-hidden">
               <div className="flex items-center justify-between px-4 py-2 border-b border-border/30 bg-muted/5 shrink-0">
                  <div className="flex items-center gap-2">
                     <Braces className="w-3.5 h-3.5 text-amber-400" />
                     <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        JSON Input
                     </span>
                  </div>
                  <div className="flex items-center gap-1">
                     <Button variant="ghost" size="sm" className="h-7 text-[10px] gap-1" onClick={formatJson}>
                        Format
                     </Button>
                     <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-[10px] gap-1"
                        onClick={() => copyToClipboard(jsonInput, 'input')}
                     >
                        {copiedField === 'input' ? (
                           <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        ) : (
                           <Copy className="w-3 h-3" />
                        )}
                     </Button>
                     <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 text-[10px] gap-1 text-destructive"
                        onClick={clearInput}
                     >
                        <Trash2 className="w-3 h-3" />
                     </Button>
                  </div>
               </div>

               <div className="flex-1 relative overflow-hidden">
                  {/* Error banner */}
                  {result.error && (
                     <div className="absolute top-0 left-0 right-0 z-10 flex items-center gap-2 px-4 py-2 bg-destructive/10 border-b border-destructive/20 text-destructive text-xs font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{result.error}</span>
                     </div>
                  )}
                  <textarea
                     value={jsonInput}
                     onChange={(e) => setJsonInput(e.target.value)}
                     className="w-full h-full bg-transparent text-foreground/90 font-mono text-xs leading-relaxed p-4 pl-14 resize-none focus:outline-none"
                     spellCheck={false}
                     placeholder="Paste your JSON here..."
                     style={{
                        backgroundImage: `linear-gradient(transparent, transparent)`,
                     }}
                  />
                  {/* Line numbers overlay */}
                  <div className="absolute top-0 left-0 p-4 pointer-events-none">
                     <LineNumbers count={inputLineCount} />
                  </div>
               </div>
            </div>

            {/* Center arrow (desktop only) */}
            <div className="hidden lg:flex items-center justify-center w-0 relative">
               <div className="absolute z-10 bg-muted border border-border rounded-full p-2 shadow-md">
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
               </div>
            </div>

            {/* Right: Generated Output */}
            <div className="h-[50vh] flex-none lg:h-auto lg:flex-1 flex flex-col overflow-hidden">
               <div className="flex items-center justify-between px-4 py-2 border-b border-border/30 bg-muted/5 shrink-0">
                  <div className="flex items-center gap-2">
                     <FileCode2 className="w-3.5 h-3.5 text-indigo-400" />
                     <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        {currentFormat.lang}
                     </span>
                     <span className="text-[10px] text-muted-foreground/50 font-mono">{currentFormat.ext}</span>
                  </div>
                  <Button
                     variant="outline"
                     size="sm"
                     className="h-7 text-[10px] gap-1.5"
                     onClick={() => copyToClipboard(result.output, 'output')}
                     disabled={!result.output}
                  >
                     {copiedField === 'output' ? (
                        <>
                           <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Copied!
                        </>
                     ) : (
                        <>
                           <Copy className="w-3 h-3" /> Copy
                        </>
                     )}
                  </Button>
               </div>

               <div className="flex-1 overflow-auto bg-card/30">
                  {result.output ? (
                     <div className="flex p-4">
                        <LineNumbers count={outputLineCount} />
                        <pre className="text-xs font-mono leading-relaxed text-foreground/85 whitespace-pre overflow-x-auto">
                           {result.output}
                        </pre>
                     </div>
                  ) : (
                     <div className="flex-1 flex items-center justify-center h-full p-8">
                        <div className="text-center space-y-2">
                           <Braces className="w-10 h-10 text-muted-foreground/20 mx-auto" />
                           <p className="text-sm text-muted-foreground/40">
                              {result.error ? 'Fix the JSON to see output' : 'Paste JSON to generate schema'}
                           </p>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}
