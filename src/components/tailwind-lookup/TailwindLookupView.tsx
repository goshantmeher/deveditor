'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, Search, Wind, FileCode2, ArrowRightLeft, Eraser, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePersistence } from '@/contexts/PersistenceContext';
import { STORAGE_KEYS } from '@/constants/storage';

type ConversionMode = 'tw-to-css' | 'css-to-tw';

interface LookupState {
   mode: ConversionMode;
   input: string;
}

const DEFAULT_STATE: LookupState = {
   mode: 'tw-to-css',
   input: '',
};

// Simplified Heuristic Data for demo purposes
const TW_DICT: Record<string, string> = {
   'flex': 'display: flex;',
   'inline-flex': 'display: inline-flex;',
   'hidden': 'display: none;',
   'block': 'display: block;',
   'inline-block': 'display: inline-block;',
   'absolute': 'position: absolute;',
   'relative': 'position: relative;',
   'fixed': 'position: fixed;',
   'w-full': 'width: 100%;',
   'h-full': 'height: 100%;',
   'w-screen': 'width: 100vw;',
   'h-screen': 'height: 100vh;',
   'items-center': 'align-items: center;',
   'items-start': 'align-items: flex-start;',
   'items-end': 'align-items: flex-end;',
   'justify-center': 'justify-content: center;',
   'justify-between': 'justify-content: space-between;',
   'justify-start': 'justify-content: flex-start;',
   'justify-end': 'justify-content: flex-end;',
   'transition': 'transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;',
   'opacity-0': 'opacity: 0;',
   'opacity-50': 'opacity: 0.5;',
   'opacity-100': 'opacity: 1;',
   'rounded': 'border-radius: 0.25rem;',
   'rounded-md': 'border-radius: 0.375rem;',
   'rounded-lg': 'border-radius: 0.5rem;',
   'rounded-xl': 'border-radius: 0.75rem;',
   'rounded-2xl': 'border-radius: 1rem;',
   'rounded-3xl': 'border-radius: 1.5rem;',
   'rounded-full': 'border-radius: 9999px;',
};

const CSS_DICT = Object.fromEntries(Object.entries(TW_DICT).map(([k, v]) => [v.replace(';', ''), k]));

const SAMPLE_TW = `flex items-center justify-between w-full h-screen bg-gray-900 text-white p-4 m-2 rounded-xl border border-gray-800 shadow-lg`;
const SAMPLE_CSS = `display: flex;
align-items: center;
justify-content: center;
width: 100%;
padding: 1rem;
margin-top: 2rem;
border-radius: 0.5rem;
color: #ffffff;
background-color: #000000;`;

export function TailwindLookupView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [state, setState] = useState<LookupState>(DEFAULT_STATE);
   const [output, setOutput] = useState('');
   const [copied, setCopied] = useState(false);

   // Load state from localStorage
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const stored = localStorage.getItem(STORAGE_KEYS.TAILWIND_LOOKUP_INPUT);
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
      localStorage.setItem(STORAGE_KEYS.TAILWIND_LOOKUP_INPUT, JSON.stringify(state));
   }, [state, isPersistenceEnabled]);

   // Parser hook
   useEffect(() => {
      if (!state.input.trim()) {
         setOutput('');
         return;
      }
      
      if (state.mode === 'tw-to-css') {
         const classes = state.input.replace(/\n/g, ' ').split(/\s+/).filter(Boolean);
         const cssRules = classes.map(cls => {
            if (TW_DICT[cls]) return `  ${TW_DICT[cls]}`;
            
            // Simple generic heuristics
            const m = cls.match(/^[mp]([xytrbl]?)-(.+)$/); // margin/padding
            if (m) {
               const type = cls.startsWith('m') ? 'margin' : 'padding';
               const dir = m[1];
               const val = m[2];
               const cssVal = val === 'auto' ? 'auto' : val.includes('px') ? val : `${Number(val) * 0.25}rem`;
               
               if (!dir) return `  ${type}: ${cssVal};`;
               if (dir === 'x') return `  ${type}-left: ${cssVal};\n  ${type}-right: ${cssVal};`;
               if (dir === 'y') return `  ${type}-top: ${cssVal};\n  ${type}-bottom: ${cssVal};`;
               if (dir === 't') return `  ${type}-top: ${cssVal};`;
               if (dir === 'b') return `  ${type}-bottom: ${cssVal};`;
               if (dir === 'l') return `  ${type}-left: ${cssVal};`;
               if (dir === 'r') return `  ${type}-right: ${cssVal};`;
            }

            const prefix = cls.split('-')[0];
            if (prefix === 'bg') return `  /* background: mapping needed for ${cls} */`;
            if (prefix === 'text') return `  /* color/fonts: mapping needed for ${cls} */`;
            if (prefix === 'border') return `  /* border: mapping needed for ${cls} */`;

            return `  /* unknown tailwind class: ${cls} */`;
         });
         
         const uniqueRules = Array.from(new Set(cssRules));
         setOutput(`.converted-element {\n${uniqueRules.join('\n')}\n}`);
      } else {
         // CSS to Tailwind heuristic
         const rules = state.input.split(';').map(r => r.trim()).filter(Boolean);
         const twClasses: string[] = [];
         
         rules.forEach(rule => {
            const exactMatch = CSS_DICT[rule];
            if (exactMatch) {
               twClasses.push(exactMatch);
               return;
            }
            // Add heuristics
            if (rule.startsWith('padding:') || rule.startsWith('margin:')) {
               const isPadding = rule.startsWith('padding');
               const val = rule.split(':')[1].trim();
               if (val.endsWith('rem')) {
                  const num = parseFloat(val) / 0.25;
                  twClasses.push(`${isPadding ? 'p' : 'm'}-${num}`);
                  return;
               }
            }
            twClasses.push(`/* unmapped: ${rule} */`);
         });
         
         setOutput(twClasses.join(' '));
      }
      
   }, [state]);

   const loadSample = () => {
      setState(prev => ({ 
         ...prev, 
         input: prev.mode === 'tw-to-css' ? SAMPLE_TW : SAMPLE_CSS 
      }));
   };

   const clearAll = () => {
      setState(prev => ({ ...prev, input: '' }));
      setOutput('');
   };

   const toggleMode = () => {
      setState(prev => ({
         mode: prev.mode === 'tw-to-css' ? 'css-to-tw' : 'tw-to-css',
         input: '',
      }));
   };

   const handleCopy = async () => {
      if (!output) return;
      try {
         await navigator.clipboard.writeText(output);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      } catch (err) {
         console.error('Failed to copy', err);
      }
   };

   return (
      <div className="w-full h-full flex flex-col md:flex-row bg-background border border-border">
         {/* Input Panel */}
         <div className="flex-1 flex flex-col min-w-0 border-b md:border-b-0 md:border-r border-border h-[50vh] md:h-full">
            <div className="h-14 flex items-center justify-between px-4 border-b border-border bg-muted/10 shrink-0">
               <div className="flex items-center gap-2">
                  {state.mode === 'tw-to-css' ? <Wind className="w-5 h-5 text-sky-500" /> : <FileCode2 className="w-5 h-5 text-indigo-500" />}
                  <h2 className="font-semibold text-sm">
                     {state.mode === 'tw-to-css' ? 'Tailwind Classes' : 'CSS Rules'}
                  </h2>
               </div>

               <div className="flex gap-2">
                  {!state.input && (
                     <Button variant="outline" size="sm" onClick={loadSample} className="h-8 text-xs px-2 shadow-sm">
                        <FlaskConical className="w-3.5 h-3.5 mr-1 text-muted-foreground" /> Sample
                     </Button>
                  )}
                  {state.input && (
                     <Button variant="ghost" size="sm" onClick={clearAll} className="h-8 text-xs px-2 text-muted-foreground hover:text-foreground">
                        <Eraser className="w-3.5 h-3.5 mr-1" /> Clear
                     </Button>
                  )}
                  <Button variant="secondary" size="sm" onClick={toggleMode} className="h-8 text-xs px-2 shadow-sm font-semibold ml-2 text-indigo-500">
                     <ArrowRightLeft className="w-3.5 h-3.5 mr-1" /> Swap Mode
                  </Button>
               </div>
            </div>
            
            <div className="flex-1 relative">
               <textarea
                  className="w-full h-full p-6 resize-none bg-transparent outline-none font-mono text-sm leading-relaxed"
                  placeholder={state.mode === 'tw-to-css' 
                     ? 'Paste Tailwind classes here (e.g., flex items-center justify-between w-full)...\n\nClasses will be converted into raw CSS instantly.'
                     : 'Paste CSS rules here (e.g., display: flex; align-items: center;)...\n\nRules will be heuristically mapped to Tailwind classes.'
                  }
                  value={state.input}
                  onChange={(e) => setState({...state, input: e.target.value})}
                  spellCheck="false"
               />
            </div>
         </div>

         {/* Output Panel */}
         <div className="flex-1 flex flex-col min-w-0 bg-muted/5 h-[50vh] md:h-full">
            <div className="h-14 flex items-center justify-between px-4 border-b border-border bg-muted/10 shrink-0">
               <div className="flex items-center gap-2">
                  {state.mode === 'tw-to-css' ? <FileCode2 className="w-5 h-5 text-indigo-500" /> : <Wind className="w-5 h-5 text-sky-500" />}
                  <h2 className="font-semibold text-sm">
                     {state.mode === 'tw-to-css' ? 'Generated CSS' : 'Tailwind Equivalents'}
                  </h2>
               </div>
               <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  disabled={!output}
                  className="h-8 px-3 text-xs shadow-sm bg-background hover:bg-muted"
               >
                  {copied ? (
                     <>
                        <Check className="h-3.5 w-3.5 mr-1.5 text-success" />
                        <span className="text-success">Copied</span>
                     </>
                  ) : (
                     <>
                        <Copy className="h-3.5 w-3.5 mr-1.5" />
                        Copy Result
                     </>
                  )}
               </Button>
            </div>
            
            <div className="flex-1 overflow-auto p-6 relative">
               {output ? (
                  <pre className="font-mono text-sm leading-relaxed whitespace-pre-wrap text-emerald-400">
                     {output}
                  </pre>
               ) : (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground/50 gap-3">
                     <Search className="w-12 h-12 stroke-1" />
                     <p className="text-sm font-medium">Output will appear here</p>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
