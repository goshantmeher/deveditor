'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ShieldAlert, Play, Copy, Check, RotateCcw, MonitorPlay, TriangleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePersistence } from '@/contexts/PersistenceContext';
import { obfuscateJavascript, ObfuscationOptions, DEFAULT_OBFUSCATION_OPTIONS } from '@/lib/javascript-obfuscator-utils';
import ReactCodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

const STORAGE_KEY_INPUT = 'js-obf-input';
const STORAGE_KEY_OPTS = 'js-obf-opts';

const SAMPLE_JS = `// Sample application logic
function calculateTax(amount, rate) {
    if(amount < 0 || rate < 0) return 0;
    const computed = amount * (1 + rate);
    console.log('Final Total: $' + computed);
    return computed;
}

const checkoutTotal = calculateTax(150, 0.08);
`;

export function JavascriptObfuscatorView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [inputCode, setInputCode] = useState('');
   const [outputCode, setOutputCode] = useState('');
   const [options, setOptions] = useState<ObfuscationOptions>(DEFAULT_OBFUSCATION_OPTIONS);
   const [error, setError] = useState<string | null>(null);
   const [copied, setCopied] = useState(false);
   const [isComputing, setIsComputing] = useState(false);

   // Load state
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;
      if (isPersistenceEnabled) {
         const code = localStorage.getItem(STORAGE_KEY_INPUT);
         const opts = localStorage.getItem(STORAGE_KEY_OPTS);
         if (code) setInputCode(code);
         if (opts) {
            try {
               setOptions(JSON.parse(opts));
            } catch { /* ignore malformed JSON */ }
         }
      }
   }, [isPersistenceEnabled]);

   // Save State
   useEffect(() => {
      if (typeof window === 'undefined' || !isInitialized.current) return;
      if (isPersistenceEnabled) {
         localStorage.setItem(STORAGE_KEY_INPUT, inputCode);
         localStorage.setItem(STORAGE_KEY_OPTS, JSON.stringify(options));
      }
   }, [inputCode, options, isPersistenceEnabled]);

   const updateOption = (key: keyof ObfuscationOptions, value: ObfuscationOptions[keyof ObfuscationOptions]) => {
      setOptions(prev => ({ ...prev, [key]: value }));
   };

   const handleObfuscate = useCallback(() => {
      if (!inputCode.trim()) {
         setOutputCode('');
         setError(null);
         return;
      }
      setIsComputing(true);
      setError(null);
      try {
         // Run sync or minimal timeout to show spinner mostly in UI flow
         const res = obfuscateJavascript(inputCode, options);
         setOutputCode(res);
      } catch (err: unknown) {
         setError(err instanceof Error ? err.message : 'Generation failed.');
         setOutputCode('');
      } finally {
         setIsComputing(false);
      }
   }, [inputCode, options]);

   const handleCopy = async () => {
      if (!outputCode) return;
      await navigator.clipboard.writeText(outputCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   return (
      <div className="w-full h-full flex flex-col bg-background border border-border rounded-xl shadow-sm overflow-hidden relative">
         <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 border-b border-border bg-background shrink-0">
            <div className="flex items-center gap-1.5 mr-2">
               <ShieldAlert className="h-4 w-4 text-brand" />
               <span className="text-sm font-semibold text-foreground">JavaScript Obfuscator</span>
            </div>
            
            <div className="flex items-center gap-2">
               {!inputCode && (
                  <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground" onClick={() => setInputCode(SAMPLE_JS)}>
                     <MonitorPlay className="w-3.5 h-3.5 mr-1" />
                     Test Sample
                  </Button>
               )}
               <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground" onClick={() => { setInputCode(''); setOutputCode(''); setError(null); }}>
                  <RotateCcw className="w-3.5 h-3.5 mr-1" />
                  Clear
               </Button>
               <Button 
                  onClick={handleObfuscate} 
                  disabled={!inputCode || isComputing}
                  className="h-8 text-xs px-4 bg-brand hover:bg-brand/90 text-brand-foreground"
               >
                  <Play className="w-3.5 h-3.5 mr-1.5" />
                  Obfuscate Code
               </Button>
            </div>
         </div>

         {error && (
            <div className="bg-destructive/10 text-destructive text-xs px-4 py-2 border-b border-destructive/20 flex items-center gap-2 font-mono">
               <TriangleAlert className="w-4 h-4" />
               Error: {error}
            </div>
         )}

         <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-background overflow-y-auto">
            {/* Options Sidebar */}
            <div className="flex flex-col md:w-64 min-h-[250px] md:min-h-0 border-b md:border-b-0 md:border-r border-border overflow-y-auto bg-muted/5">
               <div className="p-4 border-b border-border bg-muted/10">
                  <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Features Setup</span>
               </div>
               
               <div className="p-5 space-y-6">
                  <div className="flex items-center justify-between">
                     <div className="space-y-0.5">
                        <label className="text-sm font-medium">Compact output</label>
                        <p className="text-tiny text-muted-foreground">Removes line breaks.</p>
                     </div>
                     <Switch checked={options.compact} onCheckedChange={(val) => updateOption('compact', val)} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                     <div className="space-y-0.5">
                        <label className="text-sm font-medium">Control Flow</label>
                        <p className="text-tiny text-muted-foreground line-clamp-2 pr-2">Flattening alters source structure drastically.</p>
                     </div>
                     <Switch checked={options.controlFlowFlattening} onCheckedChange={(val) => updateOption('controlFlowFlattening', val)} />
                  </div>

                  <div className="flex items-center justify-between">
                     <div className="space-y-0.5">
                        <label className="text-sm font-medium">Dead Code</label>
                        <p className="text-tiny text-muted-foreground pr-2">Inject random dead code chunks.</p>
                     </div>
                     <Switch checked={options.deadCodeInjection} onCheckedChange={(val) => updateOption('deadCodeInjection', val)} />
                  </div>

                  <div className="flex items-center justify-between">
                     <div className="space-y-0.5">
                        <label className="text-sm font-medium">Mute Console</label>
                        <p className="text-tiny text-muted-foreground pr-2">Disables console.log.</p>
                     </div>
                     <Switch checked={options.disableConsoleOutput} onCheckedChange={(val) => updateOption('disableConsoleOutput', val)} />
                  </div>

                  <div className="flex items-center justify-between">
                     <div className="space-y-0.5">
                        <label className="text-sm font-medium">String Arrays</label>
                        <p className="text-tiny text-muted-foreground pr-2">Hide literal strings in shifted arrays.</p>
                     </div>
                     <Switch checked={options.stringArray} onCheckedChange={(val) => updateOption('stringArray', val)} />
                  </div>

                  <div className="space-y-2 pt-2 border-t border-border/40">
                     <label className="text-xs font-semibold text-foreground">STRING ENCODING</label>
                     <Select value={options.stringArrayEncoding} onValueChange={(v) => updateOption('stringArrayEncoding', v as ObfuscationOptions['stringArrayEncoding'])}>
                        <SelectTrigger className="w-full text-xs h-8">
                           <SelectValue placeholder="Disabled" />
                        </SelectTrigger>
                        <SelectContent className="text-xs">
                           <SelectItem value="none">Disabled</SelectItem>
                           <SelectItem value="base64">Base64 Encode</SelectItem>
                           <SelectItem value="rc4">RC4 Encryption</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
               </div>
            </div>

            {/* In / Out Panels */}
            <div className="flex-1 flex flex-col md:flex-row min-h-0 border-l border-border bg-muted/10 relative">
               
               <div className="flex-1 flex flex-col min-h-[300px] border-b md:border-b-0 md:border-r border-border relative">
                  <div className="px-3 py-2 border-b min-h-12 border-border bg-background shrink-0 flex items-center justify-between z-10">
                     <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Original Code</span>
                  </div>
                  <div className="flex-1 overflow-auto absolute inset-0 top-12 bg-[#1e1e1e] p-0 custom-scrollbar group">
                     <ReactCodeMirror
                        value={inputCode}
                        onChange={(val) => setInputCode(val)}
                        extensions={[javascript()]}
                        theme={vscodeDark}
                        className="h-full text-sm"
                        style={{ height: '100%', minHeight: '100%' }}
                     />
                  </div>
               </div>

               <div className="flex-1 flex flex-col min-h-[300px] relative">
                  <div className="px-3 py-2 border-b min-h-12 border-border bg-background shrink-0 flex items-center justify-between z-10">
                     <span className="text-xs font-semibold text-brand uppercase tracking-wider">Obfuscated Bundle</span>
                     <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground" onClick={handleCopy} disabled={!outputCode}>
                        {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                     </Button>
                  </div>
                  <div className="flex-1 overflow-auto absolute inset-0 top-12 bg-[#1e1e1e] p-0 custom-scrollbar group">
                     {outputCode ? (
                        <ReactCodeMirror
                           value={outputCode}
                           readOnly
                           extensions={[javascript()]}
                           theme={vscodeDark}
                           className="h-full text-sm opacity-90"
                           style={{ height: '100%', minHeight: '100%' }}
                        />
                     ) : (
                        <div className="h-full w-full flex items-center justify-center text-muted-foreground/40 text-sm font-mono p-6 text-center">
                           Code compilation will appear here once obfuscated.
                        </div>
                     )}
                  </div>
               </div>

            </div>
         </div>
      </div>
   );
}
