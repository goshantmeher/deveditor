'use client';

import React, { useState, useEffect, useRef } from 'react';
import { RefreshCcw, Copy, CheckCircle2, ChevronRight, FileJson, FileText, RotateCcw, Replace, FlaskConical, Upload, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePersistence } from '@/contexts/PersistenceContext';
import { STORAGE_KEYS } from '@/constants/storage';
import yaml from 'js-yaml';

type ConversionMode = 'yaml-to-json' | 'json-to-yaml';

interface YamlJsonState {
   inputData: string;
   mode: ConversionMode;
   indentation: string;
}

const DEFAULT_STATE: YamlJsonState = {
   inputData: 'server:\n  port: 8080\n  env: production\ndatabase:\n  host: localhost\n  port: 5432',
   mode: 'yaml-to-json',
   indentation: '2',
};

export function YamlJsonView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);
   const fileInputRef = useRef<HTMLInputElement>(null);

   const [state, setState] = useState<YamlJsonState>(DEFAULT_STATE);
   const [output, setOutput] = useState('');
   const [error, setError] = useState<string | null>(null);
   const [copied, setCopied] = useState(false);

   // Load state from localStorage
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const stored = localStorage.getItem(STORAGE_KEYS.YAML_JSON_INPUT);
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
      localStorage.setItem(STORAGE_KEYS.YAML_JSON_INPUT, JSON.stringify(state));
   }, [state, isPersistenceEnabled]);

   // Perform conversion
   useEffect(() => {
      if (!state.inputData.trim()) {
         setOutput('');
         setError(null);
         return;
      }

      try {
         const indent = parseInt(state.indentation, 10) || 2;

         if (state.mode === 'yaml-to-json') {
            const parsed = yaml.load(state.inputData);
            if (typeof parsed !== 'object' || parsed === null) {
               throw new Error('YAML must map to an object or array at root');
            }
            setOutput(JSON.stringify(parsed, null, indent));
         } else {
            const parsed = JSON.parse(state.inputData);
            const str = yaml.dump(parsed, { indent });
            setOutput(str);
         }
         setError(null);
      } catch (err: unknown) {
         setError(err instanceof Error ? err.message : 'Invalid Syntax');
         setOutput('');
      }
   }, [state]);

   const handleClear = () => {
      setState(prev => ({ ...prev, inputData: '' }));
   };

   const handleSwap = () => {
      // Just visually swap the mode
      setState(prev => ({
         ...prev,
         mode: prev.mode === 'yaml-to-json' ? 'json-to-yaml' : 'yaml-to-json',
         // optionally populate input with output if valid
         inputData: error || !output ? prev.inputData : output,
      }));
   };

   const handleSample = () => {
      if (state.mode === 'yaml-to-json') {
         setState(prev => ({ ...prev, inputData: DEFAULT_STATE.inputData }));
      } else {
         const parsed = yaml.load(DEFAULT_STATE.inputData);
         setState(prev => ({ ...prev, inputData: JSON.stringify(parsed, null, 2) }));
      }
   };

   const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
         setState(prev => ({ ...prev, inputData: event.target?.result as string }));
      };
      reader.readAsText(file);
      if (fileInputRef.current) {
         fileInputRef.current.value = '';
      }
   };

   const handleDownload = () => {
      if (!output) return;
      const extension = state.mode === 'yaml-to-json' ? 'json' : 'yaml';
      const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `converted-${Date.now()}.${extension}`;
      link.click();
      URL.revokeObjectURL(url);
   };

   const copyOutput = async () => {
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
         <div className="flex-none md:flex-1 flex flex-col min-w-0 bg-background border-b md:border-b-0 md:border-r border-border shrink-0 md:w-1/2 h-[500px] md:h-auto overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/20 flex flex-wrap items-center justify-between gap-3 shrink-0">
               <div className="flex items-center gap-2">
                  <RefreshCcw className="w-4 h-4 text-brand" />
                  <h2 className="font-semibold text-sm">Transpiler Format</h2>
               </div>
               <div className="flex gap-2">
                  <div className="flex gap-2">
                     {!state.inputData && (
                        <Button variant="ghost" size="sm" className="h-7 text-xs px-2 gap-1 text-muted-foreground hover:text-foreground" onClick={handleSample}>
                           <FlaskConical className="w-3.5 h-3.5" /> Sample
                        </Button>
                     )}
                     <Button variant="ghost" size="sm" className="h-7 text-xs px-2 gap-1 text-muted-foreground hover:text-foreground" onClick={() => fileInputRef.current?.click()}>
                        <Upload className="w-3.5 h-3.5" /> Import
                     </Button>
                     <input type="file" ref={fileInputRef} className="hidden" accept={state.mode === 'yaml-to-json' ? '.yaml,.yml' : '.json'} onChange={handleImport} />
                  </div>
                  <Button variant="ghost" size="sm" className="h-7 text-xs px-2 gap-1 text-muted-foreground hover:text-foreground" onClick={handleSwap}>
                     <Replace className="w-3.5 h-3.5" /> Swap Mode
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs px-2 gap-1 text-muted-foreground hover:text-foreground" onClick={handleClear}>
                     <RotateCcw className="w-3.5 h-3.5" /> Clear
                  </Button>
               </div>
            </div>
            
            <div className="flex flex-col flex-1 p-6 space-y-4 overflow-y-auto">
               <div className="flex gap-4 shrink-0 border-b border-border pb-4">
                  <div className="w-[60%] space-y-2">
                     <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Conversion Matrix</label>
                     <Select value={state.mode} onValueChange={(val: ConversionMode) => setState(prev => ({ ...prev, mode: val, inputData: '' }))}>
                        <SelectTrigger className="bg-background">
                           <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="yaml-to-json">YAML → JSON</SelectItem>
                           <SelectItem value="json-to-yaml">JSON → YAML</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
                  <div className="w-[40%] space-y-2">
                     <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Indentation Space</label>
                     <Select value={state.indentation} onValueChange={(val) => setState(prev => ({ ...prev, indentation: val }))}>
                        <SelectTrigger className="bg-background">
                           <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="2">2 Spaces</SelectItem>
                           <SelectItem value="4">4 Spaces</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
               </div>

               <div className="flex-1 space-y-2 flex flex-col min-h-[250px]">
                  <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider flex items-center gap-2 shrink-0">
                     {state.mode === 'yaml-to-json' ? <FileText className="w-3 h-3 text-orange-400" /> : <FileJson className="w-3 h-3 text-amber-500" />}
                     Raw {state.mode === 'yaml-to-json' ? 'YAML' : 'JSON'} Input
                  </label>
                  <Textarea 
                     value={state.inputData}
                     onChange={(e) => setState(prev => ({ ...prev, inputData: e.target.value }))}
                     className="flex-1 min-h-0 font-mono whitespace-pre text-[13px] bg-muted/10 resize-none p-4"
                     placeholder={state.mode === 'yaml-to-json' ? 'key:\n  value: "hello"' : '{"key": "value"}'}
                  />
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
                  {state.mode === 'yaml-to-json' ? <FileJson className="w-4 h-4 text-amber-500" /> : <FileText className="w-4 h-4 text-orange-400" />}
                  <h2 className="font-semibold text-sm text-gray-200">Constructed {state.mode === 'yaml-to-json' ? 'JSON' : 'YAML'}</h2>
               </div>
               <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="h-7 text-xs px-3 gap-2 bg-transparent border-white/20 text-gray-300 hover:text-white hover:bg-white/10" onClick={handleDownload} disabled={!output}>
                     <Download className="w-3.5 h-3.5" /> Download
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 text-xs px-3 gap-2 bg-transparent border-white/20 text-gray-300 hover:text-white hover:bg-white/10" onClick={copyOutput} disabled={!output}>
                     {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />} 
                     Cop{copied ? 'ied' : 'y Format'}
                  </Button>
               </div>
            </div>

            <div className="flex-1 relative overflow-auto bg-[#1e1e1e] p-6 lg:p-8">
               {error ? (
                  <div className="p-4 rounded-md text-rose-400 font-mono text-[13px] bg-rose-950/20 border border-rose-900/50">
                     <span className="font-bold flex items-center gap-2 mb-2">❌ Translation Error</span>
                     {error}
                  </div>
               ) : (
                  <pre className={`font-mono text-[13px] whitespace-pre-wrap break-all focus:outline-none ${state.mode === 'yaml-to-json' ? 'text-gray-300' : 'text-orange-200'}`}>
                     {output || <span className="text-gray-600 italic">Anticipating schema objects...</span>}
                  </pre>
               )}
            </div>
         </div>
      </div>
   );
}
