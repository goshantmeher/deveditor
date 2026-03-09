'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FileCode2, FlaskConical, RotateCcw, Copy, CheckCircle2, ChevronRight, FileArchive, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePersistence } from '@/contexts/PersistenceContext';
import { STORAGE_KEYS } from '@/constants/storage';
import beautify from 'js-beautify';

interface CodeMinifierState {
   inputMode: 'minify' | 'beautify';
   language: 'javascript' | 'css' | 'html' | 'json';
   inputCode: string;
   indentSize: string;
}

const DEFAULT_STATE: CodeMinifierState = {
   inputMode: 'beautify',
   language: 'javascript',
   inputCode: '',
   indentSize: '2',
};

const SAMPLE_JS = `function calculateStats( data ){
var total=0;
for(var i=0;i<data.length;i++){
total+=data[i];
}
return{
avg:total/data.length,
sum:total
};
}`;

export function CodeMinifierView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [state, setState] = useState<CodeMinifierState>(DEFAULT_STATE);
   const [outputCode, setOutputCode] = useState('');
   const [copied, setCopied] = useState(false);
   const [error, setError] = useState<string | null>(null);

   // Load state from localStorage
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const stored = localStorage.getItem(STORAGE_KEYS.CODE_MINIFIER_INPUT);
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
      localStorage.setItem(STORAGE_KEYS.CODE_MINIFIER_INPUT, JSON.stringify(state));
   }, [state, isPersistenceEnabled]);

   // Perform processing
   useEffect(() => {
      if (!state.inputCode.trim()) {
         setOutputCode('');
         setError(null);
         return;
      }

      try {
         const opts = {
            indent_size: parseInt(state.indentSize, 10),
            space_in_empty_paren: true,
            preserve_newlines: state.inputMode === 'minify' ? false : true,
         };

         let result = state.inputCode;

         if (state.inputMode === 'beautify') {
            if (state.language === 'javascript' || state.language === 'json') {
               result = beautify.js(state.inputCode, opts);
            } else if (state.language === 'css') {
               result = beautify.css(state.inputCode, opts);
            } else if (state.language === 'html') {
               result = beautify.html(state.inputCode, opts);
            }
         } else {
            // Minification (Lightweight client regex mapping for immediate output)
            if (state.language === 'json') {
               result = JSON.stringify(JSON.parse(state.inputCode));
            } else if (state.language === 'css') {
               result = state.inputCode
                  .replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
                  .replace(/\s+/g, ' ')            // compress whitespace
                  .replace(/\s*([}{:,;])\s*/g, '$1') // remove spaces around punctuation
                  .trim();
            } else if (state.language === 'html') {
               result = state.inputCode
                  .replace(/<!--[\s\S]*?-->/g, '') // remove comments
                  .replace(/>\s+</g, '><')        // remove whitespace between tags
                  .replace(/\s+/g, ' ')           // condense other whitespace
                  .trim();
            } else if (state.language === 'javascript') {
               result = state.inputCode
                  .replace(/\/\/.*$/gm, '')        // remove line comments
                  .replace(/\/\*[\s\S]*?\*\//g, '') // remove block comments
                  .replace(/\s+/g, ' ')            // flatten whitespace
                  .replace(/\s*([=+*/{}[\];(),:<>!-])\s*/g, '$1') // compress around operators safely
                  .trim();
            }
         }

         setOutputCode(result);
         setError(null);
      } catch (err: unknown) {
         setError(err instanceof Error ? err.message : 'Error processing code structure.');
      }
   }, [state]);

   const handleClear = () => {
      setState((prev) => ({ ...prev, inputCode: '' }));
      setOutputCode('');
      setError(null);
   };

   const loadSample = () => {
      setState((prev) => ({ ...prev, inputCode: SAMPLE_JS, language: 'javascript', inputMode: 'beautify' }));
   };

   const copyToClipboard = async () => {
      if (!outputCode) return;
      try {
         await navigator.clipboard.writeText(outputCode);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      } catch (err) {
         console.error('Failed to copy', err);
      }
   };

   const inputSizeLabel = new Blob([state.inputCode]).size;
   const outputSizeLabel = new Blob([outputCode]).size;
   const savings = inputSizeLabel > 0 ? ((inputSizeLabel - outputSizeLabel) / inputSizeLabel * 100).toFixed(1) : '0.0';

   return (
      <div className="w-full h-full flex flex-col md:flex-row bg-background overflow-hidden relative border border-border">
         
         {/* Left Side: Input Panel */}
         <div className="flex-1 flex flex-col min-w-0 bg-background border-b md:border-b-0 md:border-r border-border shrink-0 md:w-1/2 overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/20 flex flex-wrap items-center justify-between gap-3 shrink-0">
               <div className="flex items-center gap-2">
                  <FileCode2 className="w-4 h-4 text-brand" />
                  <h2 className="font-semibold text-sm">Input Code</h2>
               </div>
               <div className="flex gap-2">
                  {state.inputCode ? (
                     <Button variant="ghost" size="sm" className="h-7 text-xs px-2 gap-1 text-muted-foreground hover:text-foreground" onClick={handleClear}>
                        <RotateCcw className="w-3.5 h-3.5" /> Clear
                     </Button>
                  ) : (
                     <Button variant="secondary" size="sm" className="h-7 text-xs px-2 gap-1 text-muted-foreground hover:text-foreground" onClick={loadSample}>
                        <FlaskConical className="w-3.5 h-3.5" /> Sample
                     </Button>
                  )}
               </div>
            </div>
            
            <div className="bg-muted/30 p-3 border-b border-border flex flex-wrap gap-3 items-center">
               <Select value={state.inputMode} onValueChange={(val: 'minify' | 'beautify') => setState({...state, inputMode: val})}>
                  <SelectTrigger className="w-[140px] h-8 text-xs bg-background">
                     <SelectValue placeholder="Mode" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="beautify">✨ Beautify</SelectItem>
                     <SelectItem value="minify">🗜️ Minify</SelectItem>
                  </SelectContent>
               </Select>

               <Select value={state.language} onValueChange={(val: 'javascript' | 'css' | 'html' | 'json') => setState({...state, language: val})}>
                  <SelectTrigger className="w-[140px] h-8 text-xs bg-background">
                     <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="javascript">JavaScript / TS</SelectItem>
                     <SelectItem value="json">JSON</SelectItem>
                     <SelectItem value="css">CSS</SelectItem>
                     <SelectItem value="html">HTML</SelectItem>
                  </SelectContent>
               </Select>

               {state.inputMode === 'beautify' && (
                  <Select value={state.indentSize} onValueChange={(val) => setState({...state, indentSize: val})}>
                     <SelectTrigger className="w-[120px] h-8 text-xs bg-background">
                        <SelectValue placeholder="Indent" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="2">2 Spaces</SelectItem>
                        <SelectItem value="4">4 Spaces</SelectItem>
                        <SelectItem value="8">8 Spaces</SelectItem>
                     </SelectContent>
                  </Select>
               )}
            </div>

            <div className="flex-1 relative">
               <textarea 
                  value={state.inputCode}
                  onChange={(e) => setState({...state, inputCode: e.target.value})}
                  className="w-full h-full p-4 font-mono text-[13px] bg-background text-foreground absolute inset-0 resize-none focus:outline-none focus:ring-1 focus:ring-brand/30"
                  spellCheck="false"
                  placeholder="Paste your nasty unformatted code here..."
               />
               {inputSizeLabel > 0 && (
                  <div className="absolute bottom-4 right-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground bg-muted/80 px-2 py-1 rounded backdrop-blur-sm shadow-sm pointer-events-none">
                     {inputSizeLabel} bytes
                  </div>
               )}
            </div>
         </div>

         {/* Center divider icon */}
         <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-background border border-border rounded-full items-center justify-center z-10 shadow-sm text-brand">
            <ChevronRight className="w-4 h-4" />
         </div>

         {/* Right Side: Output Panel */}
         <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e] border-t md:border-t-0 border-border h-[50vh] md:h-full overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between shrink-0 shadow-md relative z-10 bg-[#181818]">
               <div className="flex items-center gap-2">
                  {state.inputMode === 'minify' ? <FileArchive className="w-4 h-4 text-emerald-500" /> : <Zap className="w-4 h-4 text-sky-500" />}
                  <h2 className="font-semibold text-sm text-gray-200">
                     {state.inputMode === 'minify' ? 'Minified Output' : 'Beautified Output'}
                  </h2>
               </div>
               <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-7 text-xs px-3 gap-2 bg-transparent border-white/20 text-gray-300 hover:text-white hover:bg-white/10" onClick={copyToClipboard} disabled={!outputCode}>
                     {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} 
                     {copied ? 'Copied' : 'Copy'}
                  </Button>
               </div>
            </div>

            {state.inputMode === 'minify' && state.inputCode && !error && (
               <div className="bg-emerald-950/30 border-b border-emerald-900/30 p-2 px-4 flex justify-between text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                  <span>Compression Savings:</span>
                  <span>{savings}% ({outputSizeLabel} bytes)</span>
               </div>
            )}

            <div className="flex-1 relative overflow-auto bg-[#1e1e1e]">
               {error ? (
                  <div className="absolute inset-0 p-6 text-rose-400 font-mono text-[13px] bg-rose-950/20">
                     <span className="font-bold flex items-center gap-2 mb-2">❌ Parsing Error</span>
                     {error}
                  </div>
               ) : (
                  <pre className="w-full h-full p-6 text-[13px] leading-relaxed font-mono text-[#c9d1d9] whitespace-pre-wrap overflow-auto">
                     {outputCode || <span className="opacity-30">Processed syntax will appear here...</span>}
                  </pre>
               )}
            </div>
         </div>

      </div>
   );
}
