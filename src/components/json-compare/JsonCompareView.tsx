'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Code, ArrowRightLeft, Settings2, Split, AlignLeft, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { vscodeDark, vscodeLight } from '@uiw/codemirror-theme-vscode';
import { useTheme } from 'next-themes';
import { usePersistence } from '@/contexts/PersistenceContext';
import { STORAGE_KEYS } from '@/constants/storage';
import { DiffViewer, DiffStats } from '@/components/text-diff/DiffViewer';
import { jsonrepair } from 'jsonrepair';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function JsonCompareView() {
   const { theme } = useTheme();
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [leftJson, setLeftJson] = useState('{\n  "name": "DevEditor",\n  "version": "1.0",\n  "features": ["json", "format"]\n}');
   const [rightJson, setRightJson] = useState('{\n  "name": "DevEditor",\n  "version": "1.1",\n  "features": ["json", "format", "diff"]\n}');
   
   const [viewType, setViewType] = useState<'split' | 'unified'>('split');
   const [sortKeys, setSortKeys] = useState(true);
   const [stats, setStats] = useState<DiffStats | null>(null);

   const [leftError, setLeftError] = useState('');
   const [rightError, setRightError] = useState('');

   // Formatted canonical forms for DiffViewer
   const [canonLeft, setCanonLeft] = useState('');
   const [canonRight, setCanonRight] = useState('');

   // Load state from localStorage
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const left = localStorage.getItem(STORAGE_KEYS.JSON_COMPARE_LEFT);
         const right = localStorage.getItem(STORAGE_KEYS.JSON_COMPARE_RIGHT);
         if (left) setLeftJson(left);
         if (right) setRightJson(right);
      }
       
   }, [isPersistenceEnabled]);

   // Save state
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      localStorage.setItem(STORAGE_KEYS.JSON_COMPARE_LEFT, leftJson);
      localStorage.setItem(STORAGE_KEYS.JSON_COMPARE_RIGHT, rightJson);
   }, [leftJson, rightJson, isPersistenceEnabled]);

   // Auto-compare logic
   useEffect(() => {
      const deepSortKeys = (obj: unknown): unknown => {
         if (Array.isArray(obj)) {
            return obj.map(deepSortKeys);
         }
         if (obj !== null && typeof obj === 'object') {
            return Object.keys(obj)
               .sort()
               .reduce((acc: Record<string, unknown>, key: string) => {
                  acc[key] = deepSortKeys((obj as Record<string, unknown>)[key]);
                  return acc;
               }, {});
         }
         return obj;
      };

      let lStr = '';
      let rStr = '';
      let lErr = '';
      let rErr = '';

      try {
         if (!leftJson.trim()) throw new Error('Empty');
         const repairedLeft = jsonrepair(leftJson);
         const parsedLeft = JSON.parse(repairedLeft);
         const finalLeft = sortKeys ? deepSortKeys(parsedLeft) : parsedLeft;
         lStr = JSON.stringify(finalLeft, null, 2);
      } catch (e: unknown) {
         if (leftJson.trim() && e instanceof Error) lErr = e.message;
      }

      try {
         if (!rightJson.trim()) throw new Error('Empty');
         const repairedRight = jsonrepair(rightJson);
         const parsedRight = JSON.parse(repairedRight);
         const finalRight = sortKeys ? deepSortKeys(parsedRight) : parsedRight;
         rStr = JSON.stringify(finalRight, null, 2);
      } catch (e: unknown) {
         if (rightJson.trim() && e instanceof Error) rErr = e.message;
      }

      setLeftError(lErr);
      setRightError(rErr);

      if (!lErr && !rErr && (lStr || rStr)) {
         setCanonLeft(lStr);
         setCanonRight(rStr);
      } else {
         setCanonLeft('');
         setCanonRight('');
      }
   }, [leftJson, rightJson, sortKeys]);

   const handleSwap = () => {
      const temp = leftJson;
      setLeftJson(rightJson);
      setRightJson(temp);
   };

   const handleClear = () => {
      setLeftJson('');
      setRightJson('');
   };

   const cmTheme = theme === 'dark' ? vscodeDark : vscodeLight;

   return (
      <div className="flex flex-col h-full w-full bg-background border border-border shadow-sm overflow-hidden">
         {/* Toolbar */}
         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border-b border-border bg-muted/10 shrink-0">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Code className="w-4 h-4 text-orange-500" />
               </div>
               <h1 className="font-bold text-sm tracking-tight text-foreground">JSON Compare & Diff</h1>
               
               <div className="h-6 w-px bg-border mx-2 hidden sm:block" />
               
               <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortKeys(!sortKeys)}
                  className={`gap-2 text-xs h-8 ${sortKeys ? 'bg-orange-500/10 text-orange-600 border-orange-500/30 font-medium' : 'text-muted-foreground'}`}
               >
                  <Settings2 className="w-3.5 h-3.5" />
                  Auto-Sort Keys
               </Button>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
               <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSwap}
                  className="gap-2 text-xs flex-1 sm:flex-none h-8 bg-background border border-border hover:bg-muted"
                  title="Swap original and modified text"
               >
                  <ArrowRightLeft className="w-3.5 h-3.5" /> Swap
               </Button>
               <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClear}
                  className="gap-2 text-xs h-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
               >
                  <RotateCcw className="w-3.5 h-3.5" /> Clear
               </Button>
            </div>
         </div>

         {/* Input Editors (Top Half) */}
         <div className="flex flex-col md:flex-row h-[40vh] md:h-[35vh] shrink-0 border-b border-border divide-y md:divide-y-0 md:divide-x divide-border">
            {/* Left Editor */}
            <div className="flex-1 flex flex-col min-h-0 bg-background relative cursor-text group overflow-hidden">
               <div className="px-3 py-2 bg-muted/40 border-b border-border text-xs font-semibold uppercase tracking-wider text-muted-foreground flex justify-between items-center z-10">
                  <span>Original JSON</span>
                  {leftError && <span className="text-red-500 normal-case tracking-normal">{leftError}</span>}
               </div>
               <div className="flex-1 overflow-auto bg-[#1e1e1e] dark:bg-[#1e1e1e] light:bg-white text-sm custom-scrollbar">
                  <CodeMirror
                     value={leftJson}
                     height="100%"
                     extensions={[json()]}
                     onChange={(val) => setLeftJson(val)}
                     theme={cmTheme}
                     basicSetup={{ lineNumbers: true, foldGutter: true }}
                     className="h-full font-mono text-sm"
                  />
               </div>
            </div>

            {/* Right Editor */}
            <div className="flex-1 flex flex-col min-h-0 bg-background relative cursor-text group overflow-hidden">
               <div className="px-3 py-2 bg-muted/40 border-b border-border text-xs font-semibold uppercase tracking-wider text-muted-foreground flex justify-between items-center z-10">
                  <span>Modified JSON</span>
                  {rightError && <span className="text-red-500 normal-case tracking-normal">{rightError}</span>}
               </div>
               <div className="flex-1 overflow-auto bg-[#1e1e1e] dark:bg-[#1e1e1e] light:bg-white text-sm custom-scrollbar">
                  <CodeMirror
                     value={rightJson}
                     height="100%"
                     extensions={[json()]}
                     onChange={(val) => setRightJson(val)}
                     theme={cmTheme}
                     basicSetup={{ lineNumbers: true, foldGutter: true }}
                     className="h-full font-mono text-sm"
                  />
               </div>
            </div>
         </div>

         {/* Output/Diff Bottom Half */}
         <div className="flex-1 flex flex-col min-h-0 bg-background relative overflow-hidden">
            <div className="px-4 py-2 border-b border-border flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 bg-muted/5 shrink-0">
               <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold tracking-tight text-foreground">Structural Diff</span>
                  <Tabs
                     value={viewType}
                     onValueChange={(v: string) => setViewType(v as 'split' | 'unified')}
                  >
                     <TabsList className="h-8 border border-border/50">
                        <TabsTrigger value="split" className="text-[11px] gap-1.5 px-3">
                           <Split className="w-3.5 h-3.5" /> Split
                        </TabsTrigger>
                        <TabsTrigger value="unified" className="text-[11px] gap-1.5 px-3">
                           <AlignLeft className="w-3.5 h-3.5" /> Unified
                        </TabsTrigger>
                     </TabsList>
                  </Tabs>
               </div>

               <div className="flex items-center gap-4 text-xs">
                  {stats && (
                     <div className="flex items-center gap-4">
                        <span className="text-muted-foreground">
                           <span className="text-foreground font-medium">{stats.charsAdded + stats.charsRemoved}</span> chars diff
                        </span>
                        <div className="flex items-center gap-1.5">
                           <div className="w-2.5 h-2.5 rounded-sm bg-red-400/40" />
                           <span>Removed ({stats.charsRemoved})</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                           <div className="w-2.5 h-2.5 rounded-sm bg-green-400/40" />
                           <span>Added ({stats.charsAdded})</span>
                        </div>
                     </div>
                  )}
               </div>
            </div>

            <div className="flex-1 overflow-auto bg-card p-4 custom-scrollbar">
               {canonLeft === '' && canonRight === '' ? (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground opacity-60">
                     <Split className="w-8 h-8 mb-3" />
                     <p className="text-sm">Provide two valid JSON structures to see differences.</p>
                  </div>
               ) : (
                  <DiffViewer
                     oldText={canonLeft}
                     newText={canonRight}
                     mode="line" // Focus on canonical line structural differences
                     viewType={viewType}
                     onStatsChange={setStats}
                  />
               )}
            </div>
         </div>
      </div>
   );
}
