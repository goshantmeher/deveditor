'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Scissors, ClipboardCheck, ArrowRightLeft, FileCheck2, Settings2, Trash2, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { usePersistence } from '@/contexts/PersistenceContext';
import { STORAGE_KEYS } from '@/constants/storage';

export function StringTrimmerView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [input, setInput] = useState('');
   const [output, setOutput] = useState('');
   const [copied, setCopied] = useState(false);

   // Trimmer Tools State
   const [trimEdges, setTrimEdges] = useState(true);
   const [removeEmptyLines, setRemoveEmptyLines] = useState(true);
   const [removeMultipleSpaces, setRemoveMultipleSpaces] = useState(false);
   const [prefixToRemove, setPrefixToRemove] = useState('');
   const [suffixToRemove, setSuffixToRemove] = useState('');

   // Load persistence
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const stored = localStorage.getItem(STORAGE_KEYS.STRING_TRIMMER_INPUT);
         if (stored) {
            try {
               const parsed = JSON.parse(stored);
               if (parsed.input) setInput(parsed.input);
               if (parsed.settings) {
                  setTrimEdges(parsed.settings.trimEdges ?? true);
                  setRemoveEmptyLines(parsed.settings.removeEmptyLines ?? true);
                  setRemoveMultipleSpaces(parsed.settings.removeMultipleSpaces ?? false);
                  setPrefixToRemove(parsed.settings.prefixToRemove ?? '');
                  setSuffixToRemove(parsed.settings.suffixToRemove ?? '');
               }
            } catch {
               setInput(stored); // Fallback if not JSON
            }
         }
      }
   }, [isPersistenceEnabled]);

   // Save persistence
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      
      const toSave = JSON.stringify({
         input,
         settings: {
            trimEdges,
            removeEmptyLines,
            removeMultipleSpaces,
            prefixToRemove,
            suffixToRemove,
         }
      });
      localStorage.setItem(STORAGE_KEYS.STRING_TRIMMER_INPUT, toSave);
   }, [input, trimEdges, removeEmptyLines, removeMultipleSpaces, prefixToRemove, suffixToRemove, isPersistenceEnabled]);

   // Compute Output
   useEffect(() => {
      let lines = input.split('\n');

      if (trimEdges) {
         lines = lines.map(line => line.trim());
      }

      if (prefixToRemove) {
         lines = lines.map(line => {
            if (line.startsWith(prefixToRemove)) {
               return line.slice(prefixToRemove.length);
            }
            return line;
         });
      }

      if (suffixToRemove) {
         lines = lines.map(line => {
            if (line.endsWith(suffixToRemove)) {
               return line.slice(0, -suffixToRemove.length);
            }
            return line;
         });
      }

      if (removeMultipleSpaces) {
         lines = lines.map(line => line.replace(/\s+/g, ' '));
      }

      if (removeEmptyLines) {
         lines = lines.filter(line => line.length > 0);
      }

      setOutput(lines.join('\n'));
   }, [input, trimEdges, removeEmptyLines, removeMultipleSpaces, prefixToRemove, suffixToRemove]);

   const handleCopy = () => {
      if (!output) return;
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   const loadSample = () => {
      setInput(`   This is a messy log entry    \n\n\n- User logged in successfully,\n  - User viewed dashboard ,\n- User updated profile ,\n\n\n   End of log sequence `);
      setTrimEdges(true);
      setRemoveEmptyLines(true);
      setRemoveMultipleSpaces(true);
      setPrefixToRemove('-');
      setSuffixToRemove(',');
   };

   return (
      <div className="w-full flex-1 flex flex-col bg-background border border-border rounded-xl shadow-sm overflow-hidden">
         {/* Toolbar */}
         <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-border bg-background shrink-0">
            <div className="flex items-center gap-2 text-foreground">
               <Scissors className="h-4 w-4 text-emerald-500" />
               <span className="text-sm font-semibold">String Trimmer / Cleaner</span>
            </div>
            
            <div className="flex items-center gap-2">
               <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider">
                  <FileCheck2 className="w-3 h-3" /> Fully Local
               </div>

               {!input && (
                  <Button
                     variant="ghost"
                     size="sm"
                     onClick={loadSample}
                     className="h-8 text-xs text-muted-foreground hover:text-foreground"
                  >
                     <FlaskConical className="w-4 h-4 mr-1.5" />
                     Sample
                  </Button>
               )}

               {input && (
                  <Button
                     variant="ghost"
                     size="sm"
                     onClick={() => setInput('')}
                     className="h-8 text-xs text-muted-foreground hover:text-foreground"
                  >
                     <Trash2 className="w-4 h-4 mr-1.5" />
                     Clear
                  </Button>
               )}
            </div>
         </div>

         <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-background">
            {/* Sidebar / Controls */}
            <div className="w-full md:w-80 flex flex-col border-b md:border-b-0 md:border-r border-border bg-muted/10 shrink-0 overflow-y-auto">
               <div className="p-4 space-y-6">
                  {/* Toggles section */}
                  <div className="space-y-4">
                     <div className="flex items-center gap-2 pb-2 border-b border-border">
                        <Settings2 className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs font-bold uppercase tracking-wider">Cleanup Settings</span>
                     </div>
                     
                     <div className="flex items-center justify-between">
                        <Label htmlFor="trim" className="text-sm">Trim Edges per Line</Label>
                        <Switch id="trim" checked={trimEdges} onCheckedChange={setTrimEdges} />
                     </div>

                     <div className="flex items-center justify-between">
                        <Label htmlFor="empty" className="text-sm">Remove Empty Lines</Label>
                        <Switch id="empty" checked={removeEmptyLines} onCheckedChange={setRemoveEmptyLines} />
                     </div>

                     <div className="flex items-center justify-between">
                        <Label htmlFor="spaces" className="text-sm">Collapse Multiple Spaces</Label>
                        <Switch id="spaces" checked={removeMultipleSpaces} onCheckedChange={setRemoveMultipleSpaces} />
                     </div>
                  </div>

                  {/* Prefix/Suffix Section */}
                  <div className="space-y-4 pt-2">
                     <div className="flex items-center gap-2 pb-2 border-b border-border">
                        <ArrowRightLeft className="w-4 h-4 text-indigo-500" />
                        <span className="text-xs font-bold uppercase tracking-wider">Line Endings</span>
                     </div>
                     
                     <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Remove Prefix</Label>
                        <Input 
                           value={prefixToRemove}
                           onChange={e => setPrefixToRemove(e.target.value)}
                           className="font-mono text-xs"
                           placeholder="e.g. - or *"
                        />
                     </div>

                     <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Remove Suffix</Label>
                        <Input 
                           value={suffixToRemove}
                           onChange={e => setSuffixToRemove(e.target.value)}
                           className="font-mono text-xs"
                           placeholder="e.g. ,"
                        />
                     </div>
                  </div>
               </div>
            </div>

            {/* Split Panels (Input/Output) */}
            <div className="flex-1 flex flex-col min-h-0 relative">
               <div className="h-[400px] md:h-1/2 border-b border-border flex flex-col relative w-full group shrink-0 md:shrink">
                  <div className="px-4 border-b border-border bg-muted/30 flex items-center justify-between h-9 shrink-0 relative z-10">
                     <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Raw Input</span>
                  </div>
                  <Textarea
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                     placeholder="Paste text with annoying formatting here..."
                     className="flex-1 w-full h-full resize-none border-0 focus-visible:ring-0 rounded-none bg-background font-mono text-sm p-4"
                  />
               </div>

               <div className="h-[400px] md:h-1/2 flex flex-col relative w-full group overflow-hidden shrink-0 md:shrink">
                  <div className="px-4 border-b border-border bg-emerald-500/5 flex items-center justify-between h-9 shrink-0 relative z-10 backdrop-blur-md">
                     <div className="flex items-center gap-2">
                        <span className="text-[11px] font-medium text-emerald-500 uppercase tracking-wider">Clean Output</span>
                        {input && (
                           <span className="text-[10px] text-muted-foreground font-mono">
                              ({output.length} vs {input.length} chars)
                           </span>
                        )}
                     </div>
                     {output && (
                        <Button
                           variant="outline"
                           size="sm"
                           onClick={handleCopy}
                           className="h-6 px-2 text-xs font-semibold bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20 hover:text-emerald-600 transition-colors"
                        >
                           {copied ? <ClipboardCheck className="w-3 h-3 mr-1.5" /> : <Scissors className="w-3 h-3 mr-1.5" />}
                           {copied ? 'Copied' : 'Copy'}
                        </Button>
                     )}
                  </div>
                  <Textarea
                     value={output}
                     readOnly
                     placeholder="Clean output will appear here automatically..."
                     className="flex-1 w-full h-full resize-none border-0 focus-visible:ring-0 rounded-none bg-background/50 font-mono text-sm p-4 text-muted-foreground"
                  />
               </div>
            </div>
         </div>
      </div>
   );
}
