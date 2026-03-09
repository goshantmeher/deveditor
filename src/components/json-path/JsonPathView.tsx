'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Database, RotateCcw, Copy, CheckCircle2, ChevronRight, Hash, PlaySquare, Code2, Beaker } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { usePersistence } from '@/contexts/PersistenceContext';
import { STORAGE_KEYS } from '@/constants/storage';
import { JSONPath } from 'jsonpath-plus';

interface JsonPathState {
   inputJson: string;
   expression: string;
}

const DEFAULT_STATE: JsonPathState = {
   inputJson: '{\n  "store": {\n    "book": [\n      {\n        "category": "reference",\n        "author": "Nigel Rees",\n        "title": "Sayings of the Century",\n        "price": 8.95\n      },\n      {\n        "category": "fiction",\n        "author": "Evelyn Waugh",\n        "title": "Sword of Honour",\n        "price": 12.99\n      }\n    ],\n    "bicycle": {\n      "color": "red",\n      "price": 19.95\n    }\n  }\n}',
   expression: '$.store.book[*].author',
};

export function JsonPathView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [state, setState] = useState<JsonPathState>(DEFAULT_STATE);
   const [output, setOutput] = useState<unknown>(null);
   const [error, setError] = useState<string | null>(null);
   const [copied, setCopied] = useState(false);

   // Load state from localStorage
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const stored = localStorage.getItem(STORAGE_KEYS.JSON_PATH_INPUT);
         if (stored) {
            try {
               setState(JSON.parse(stored));
            } catch {
               // Ignore
            }
         }
      }
   }, [isPersistenceEnabled]);

   // Save state
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      localStorage.setItem(STORAGE_KEYS.JSON_PATH_INPUT, JSON.stringify(state));
   }, [state, isPersistenceEnabled]);

   // Process expression
   useEffect(() => {
      if (!state.inputJson.trim() || !state.expression.trim()) {
         setOutput(null);
         setError(null);
         return;
      }

      try {
         const parsedObj = JSON.parse(state.inputJson);
         const result = JSONPath({ path: state.expression, json: parsedObj });
         setOutput(result);
         setError(null);
      } catch (err: unknown) {
         setError(err instanceof Error ? err.message : 'Invalid JSON or Expression');
         setOutput(null);
      }
   }, [state]);

   const handleClear = () => {
      setState({ inputJson: '', expression: '' });
   };

   const loadSample = () => {
      setState(DEFAULT_STATE);
   };

   const formatJson = () => {
      try {
         const parsed = JSON.parse(state.inputJson);
         setState(prev => ({ ...prev, inputJson: JSON.stringify(parsed, null, 2) }));
      } catch {
         // Ignore
      }
   };

   const copyOutput = async () => {
      if (!output) return;
      try {
         await navigator.clipboard.writeText(JSON.stringify(output, null, 2));
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      } catch (err) {
         console.error('Failed to copy', err);
      }
   };

   return (
      <div className="w-full h-full flex flex-col md:flex-row bg-background overflow-hidden relative border border-border">
         {/* Left Side: Input Panel */}
         <div className="flex-none md:flex-1 flex flex-col min-w-0 bg-background border-b md:border-b-0 md:border-r border-border shrink-0 md:w-1/2 h-[500px] md:h-auto overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/20 flex flex-wrap items-center justify-between gap-3 shrink-0">
               <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-brand" />
                  <h2 className="font-semibold text-sm">JSONPath Playground</h2>
               </div>
               <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-7 text-xs px-2 gap-1" onClick={loadSample}>
                     <Beaker className="w-3.5 h-3.5" /> Sample
                  </Button>
                  <Button variant="secondary" size="sm" className="h-7 text-xs px-2 gap-1" onClick={formatJson}>
                     <Code2 className="w-3.5 h-3.5" /> Format JSON
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs px-2 gap-1 text-muted-foreground hover:text-foreground" onClick={handleClear}>
                     <RotateCcw className="w-3.5 h-3.5" /> Clear
                  </Button>
               </div>
            </div>
            
            <div className="flex flex-col flex-1 p-6 space-y-4 overflow-y-auto">
               <div className="flex-1 space-y-2 flex flex-col min-h-[250px]">
                  <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider flex-none">Source JSON</label>
                  <Textarea 
                     value={state.inputJson}
                     onChange={(e) => setState(prev => ({ ...prev, inputJson: e.target.value }))}
                     className="flex-1 min-h-0 font-mono whitespace-pre text-sm bg-muted/10 resize-none"
                     placeholder="Paste JSON here..."
                  />
               </div>

               <div className="space-y-2 shrink-0">
                  <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider flex justify-between">
                     <span>JSONPath Expression</span>
                     <span className="text-amber-500 font-mono">Example: $.store.book[*].author</span>
                  </label>
                  <div className="relative">
                     <PlaySquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
                     <Input 
                        value={state.expression}
                        onChange={(e) => setState(prev => ({ ...prev, expression: e.target.value }))}
                        className="h-12 pl-10 font-mono text-base border-amber-500/30 focus-visible:ring-amber-500"
                        placeholder="$.*"
                     />
                  </div>
               </div>
            </div>
         </div>

         {/* Center divider icon */}
         <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-background border border-border rounded-full items-center justify-center z-10 shadow-sm text-brand">
            <ChevronRight className="w-4 h-4" />
         </div>

         {/* Right Side: Output Panel */}
         <div className="flex-none md:flex-1 flex flex-col min-w-0 bg-[#1e1e1e] border-t md:border-t-0 border-border h-[500px] md:h-full overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#181818]">
               <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-amber-500" />
                  <h2 className="font-semibold text-sm text-gray-200">Evaluation Result</h2>
               </div>
               <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-7 text-xs px-3 gap-2 bg-transparent border-white/20 text-gray-300 hover:text-white hover:bg-white/10" onClick={copyOutput} disabled={!output}>
                     {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} 
                     {copied ? 'Copied' : 'Copy JSON'}
                  </Button>
               </div>
            </div>

            <div className="flex-1 relative overflow-auto bg-[#1e1e1e] p-6 lg:p-8">
               {error ? (
                  <div className="p-4 rounded-md text-rose-400 font-mono text-[13px] bg-rose-950/20 border border-rose-900/50">
                     <span className="font-bold flex items-center gap-2 mb-2">❌ Parsing Error</span>
                     {error}
                  </div>
               ) : (
                  <pre className="text-gray-300 font-mono text-[13px] whitespace-pre-wrap break-all focus:outline-none">
                     {output !== null ? JSON.stringify(output, null, 2) : <span className="text-gray-600 italic">No expression evaluated...</span>}
                  </pre>
               )}
            </div>
         </div>
      </div>
   );
}
