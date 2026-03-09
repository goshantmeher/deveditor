'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Type, RotateCcw, Copy, CheckCircle2, ChevronRight, Hash, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePersistence } from '@/contexts/PersistenceContext';
import { STORAGE_KEYS } from '@/constants/storage';
import figlet from 'figlet';

// Importable standard fonts
import Standard from 'figlet/importable-fonts/Standard.js';
import Ghost from 'figlet/importable-fonts/Ghost.js';
import Doom from 'figlet/importable-fonts/Doom.js';
import Slant from 'figlet/importable-fonts/Slant.js';
import Isometric1 from 'figlet/importable-fonts/Isometric1.js';
import Banner3D from 'figlet/importable-fonts/Banner3-D.js';
import Larry3D from 'figlet/importable-fonts/Larry 3D.js';
import Bloody from 'figlet/importable-fonts/Bloody.js';
import Keyboard from 'figlet/importable-fonts/Keyboard.js';

interface AsciiState {
   text: string;
   font: string;
}

const DEFAULT_STATE: AsciiState = {
   text: 'DevEditor',
   font: 'Standard',
};

// Initialize fonts (load them into figlet memory mapping)
let fontsLoaded = false;
const loadFonts = () => {
   if (fontsLoaded) return;
   figlet.parseFont('Standard', Standard);
   figlet.parseFont('Ghost', Ghost);
   figlet.parseFont('Doom', Doom);
   figlet.parseFont('Slant', Slant);
   figlet.parseFont('Isometric1', Isometric1);
   figlet.parseFont('Banner3-D', Banner3D);
   figlet.parseFont('Larry 3D', Larry3D);
   figlet.parseFont('Bloody', Bloody);
   figlet.parseFont('Keyboard', Keyboard);
   fontsLoaded = true;
};

export function AsciiArtView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [state, setState] = useState<AsciiState>(DEFAULT_STATE);
   const [output, setOutput] = useState('');
   const [copied, setCopied] = useState(false);
   const [error, setError] = useState<string | null>(null);

   // Load state from localStorage
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const stored = localStorage.getItem(STORAGE_KEYS.ASCII_ART_INPUT);
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
      localStorage.setItem(STORAGE_KEYS.ASCII_ART_INPUT, JSON.stringify(state));
   }, [state, isPersistenceEnabled]);

   // Create Art
   useEffect(() => {
      loadFonts();

      if (!state.text.trim()) {
         setOutput('');
         setError(null);
         return;
      }

      try {
         const generated = figlet.textSync(state.text, {
            font: state.font as figlet.Fonts,
            horizontalLayout: 'default',
            verticalLayout: 'default',
            width: 80,
            whitespaceBreak: true
         });
         setOutput(generated);
         setError(null);
      } catch (err: unknown) {
         setError(err instanceof Error ? err.message : 'Error generating ASCII art');
      }
   }, [state]);

   const handleClear = () => {
      setState(prev => ({ ...prev, text: '' }));
   };

   const copyToClipboard = async () => {
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
      <div className="w-full h-full flex flex-col md:flex-row bg-background overflow-hidden relative border border-border">
         {/* Left Side: Input Panel */}
         <div className="flex-1 flex flex-col min-w-0 bg-background border-b md:border-b-0 md:border-r border-border shrink-0 md:w-1/3 max-w-sm lg:max-w-md overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/20 flex flex-wrap items-center justify-between gap-3 shrink-0">
               <div className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-brand" />
                  <h2 className="font-semibold text-sm">ASCII Generator</h2>
               </div>
               <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="h-7 text-xs px-2 gap-1 text-muted-foreground hover:text-foreground" onClick={handleClear}>
                     <RotateCcw className="w-3.5 h-3.5" /> Clear
                  </Button>
               </div>
            </div>
            
            <div className="p-6 space-y-8 overflow-y-auto">
               <div className="space-y-3">
                  <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Source Text</label>
                  <Textarea 
                     value={state.text}
                     onChange={(e) => setState(prev => ({ ...prev, text: e.target.value }))}
                     className="h-24 font-mono bg-muted/10 resize-none text-base"
                     placeholder="Enter text..."
                  />
               </div>

               <div className="space-y-3">
                  <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Figlet Font Style</label>
                  <Select value={state.font} onValueChange={(val) => setState(prev => ({ ...prev, font: val }))}>
                     <SelectTrigger className="h-12 bg-background">
                        <SelectValue />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="Standard">Standard</SelectItem>
                        <SelectItem value="Slant">Slant</SelectItem>
                        <SelectItem value="Ghost">Ghost</SelectItem>
                        <SelectItem value="Doom">Doom</SelectItem>
                        <SelectItem value="Isometric1">Isometric 1</SelectItem>
                        <SelectItem value="Banner3-D">Banner 3D</SelectItem>
                        <SelectItem value="Larry 3D">Larry 3D</SelectItem>
                        <SelectItem value="Bloody">Bloody</SelectItem>
                        <SelectItem value="Keyboard">Keyboard</SelectItem>
                     </SelectContent>
                  </Select>
               </div>
               
               <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl space-y-2">
                  <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase tracking-wider">
                     <Code2 className="w-4 h-4" /> Usage Tips
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                     Useful for generating giant console log headers, codebase comment banners, `README.md` titles, or CLI application logos.
                  </p>
               </div>
            </div>
         </div>

         {/* Center divider icon */}
         <div className="hidden md:flex absolute left-1/3 lg:left-[stretch] top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-background border border-border rounded-full items-center justify-center z-10 shadow-sm text-brand" style={{ left: 'clamp(24rem, 33.333%, 28rem)'}}>
            <ChevronRight className="w-4 h-4" />
         </div>

         {/* Right Side: Output Panel */}
         <div className="flex-2 flex flex-col min-w-0 bg-[#1e1e1e] border-t md:border-t-0 border-border h-[50vh] md:h-full overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#181818]">
               <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-emerald-500" />
                  <h2 className="font-semibold text-sm text-gray-200">Generated Art Output</h2>
               </div>
               <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-7 text-xs px-3 gap-2 bg-transparent border-white/20 text-gray-300 hover:text-white hover:bg-white/10" onClick={copyToClipboard} disabled={!output}>
                     {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} 
                     {copied ? 'Copied' : 'Copy Art'}
                  </Button>
               </div>
            </div>

            <div className="flex-1 relative overflow-auto bg-[#1e1e1e] p-6 lg:p-10">
               {error ? (
                  <div className="p-4 rounded-md text-rose-400 font-mono text-[13px] bg-rose-950/20 border border-rose-900/50">
                     <span className="font-bold flex items-center gap-2 mb-2">❌ Generation Error</span>
                     {error}
                  </div>
               ) : (
                  <pre 
                     className="text-emerald-400 font-mono leading-[1.2] whitespace-pre"
                     style={{
                        fontSize: 'max(10px, min(14px, 1.5vw))'
                     }}
                  >
                     {output || <span className="opacity-30">Type some text to generate ASCII art...</span>}
                  </pre>
               )}
            </div>
         </div>
      </div>
   );
}
