'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CalendarClock, RotateCcw, Copy, CheckCircle2, ChevronRight, Hash, Clock, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { usePersistence } from '@/contexts/PersistenceContext';
import { STORAGE_KEYS } from '@/constants/storage';
import cronstrue from 'cronstrue';
import { CronExpressionParser } from 'cron-parser';

interface CronParserState {
   expression: string;
}

const DEFAULT_STATE: CronParserState = {
   expression: '*/15 0 1,15 * 1-5',
};

export function CronParserView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [state, setState] = useState<CronParserState>(DEFAULT_STATE);
   const [englishDesc, setEnglishDesc] = useState('');
   const [nextRuns, setNextRuns] = useState<Date[]>([]);
   const [error, setError] = useState<string | null>(null);
   const [copied, setCopied] = useState(false);

   // Load state from localStorage
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const stored = localStorage.getItem(STORAGE_KEYS.CRON_PARSER_INPUT);
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
      localStorage.setItem(STORAGE_KEYS.CRON_PARSER_INPUT, JSON.stringify(state));
   }, [state, isPersistenceEnabled]);

   // Perform processing
   useEffect(() => {
      if (!state.expression.trim()) {
         setEnglishDesc('');
         setNextRuns([]);
         setError(null);
         return;
      }

      try {
         // Transform to English
         const desc = cronstrue.toString(state.expression, { throwExceptionOnParseError: true });
         setEnglishDesc(desc);

         // Calculate next runs
         const interval = CronExpressionParser.parse(state.expression);
         const runs = [];
         for (let i = 0; i < 5; i++) {
            runs.push(interval.next().toDate());
         }
         setNextRuns(runs);
         setError(null);
      } catch (err: unknown) {
         setError(err instanceof Error ? err.message : 'Invalid Cron Expression');
         setEnglishDesc('');
         setNextRuns([]);
      }
   }, [state]);

   const handleClear = () => {
      setState({ expression: '' });
   };

   const copyToClipboard = async () => {
      if (!englishDesc) return;
      try {
         await navigator.clipboard.writeText(englishDesc);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      } catch (err) {
         console.error('Failed to copy', err);
      }
   };

   const handlePresetChange = (preset: string) => {
      setState({ expression: preset });
   };

   return (
      <div className="w-full h-full flex flex-col md:flex-row bg-background overflow-hidden relative border border-border">
         {/* Left Side: Input Panel */}
         <div className="flex-1 flex flex-col min-w-0 bg-background border-b md:border-b-0 md:border-r border-border shrink-0 md:w-1/2 overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/20 flex flex-wrap items-center justify-between gap-3 shrink-0">
               <div className="flex items-center gap-2">
                  <Settings2 className="w-4 h-4 text-brand" />
                  <h2 className="font-semibold text-sm">Cron Expression</h2>
               </div>
               <div className="flex gap-2">
                  <Button
                     variant="ghost"
                     size="sm"
                     className="h-7 text-xs px-2 gap-1 text-muted-foreground hover:text-foreground"
                     onClick={handleClear}
                  >
                     <RotateCcw className="w-3.5 h-3.5" /> Clear
                  </Button>
               </div>
            </div>

            <div className="p-6 md:p-8 space-y-8 overflow-y-auto">
               <div className="space-y-3">
                  <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                     <span>Enter standard Cron format</span>
                     <span className="text-brand">Format: * * * * *</span>
                  </label>
                  <div className="relative">
                     <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                     <Input
                        value={state.expression}
                        onChange={(e) => setState({ expression: e.target.value })}
                        className="pl-10 h-14 font-mono text-lg bg-background"
                        placeholder="* * * * *"
                     />
                  </div>
               </div>

               <div className="space-y-3">
                  <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                     Quick Presets
                  </label>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                     {[
                        { label: 'Every minute', val: '* * * * *' },
                        { label: 'Every 15 min', val: '*/15 * * * *' },
                        { label: 'Hourly', val: '0 * * * *' },
                        { label: 'Daily at midnight', val: '0 0 * * *' },
                        { label: 'Every Mon-Fri', val: '0 0 * * 1-5' },
                        { label: 'First of month', val: '0 0 1 * *' },
                     ].map((preset) => (
                        <button
                           key={preset.val}
                           onClick={() => handlePresetChange(preset.val)}
                           className="text-xs shrink-0 py-2 px-3 border border-border/50 bg-muted/20 hover:bg-muted/50 rounded-md text-muted-foreground hover:text-foreground transition-colors duration-200"
                        >
                           {preset.label}
                        </button>
                     ))}
                  </div>
               </div>

               <div className="p-4 bg-muted/10 border border-border rounded-xl space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                     Syntax Helper
                  </h4>
                  <div className="grid grid-cols-5 gap-2 text-center text-[10px] md:text-sm font-mono text-muted-foreground">
                     <div className="flex flex-col gap-1">
                        <span className="font-bold text-foreground">Min</span>
                        <span>0-59</span>
                     </div>
                     <div className="flex flex-col gap-1">
                        <span className="font-bold text-foreground">Hour</span>
                        <span>0-23</span>
                     </div>
                     <div className="flex flex-col gap-1">
                        <span className="font-bold text-foreground">Day</span>
                        <span>1-31</span>
                     </div>
                     <div className="flex flex-col gap-1">
                        <span className="font-bold text-foreground">Month</span>
                        <span>1-12</span>
                     </div>
                     <div className="flex flex-col gap-1">
                        <span className="font-bold text-foreground">Week</span>
                        <span>0-6</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Center divider icon */}
         <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-background border border-border rounded-full items-center justify-center z-10 shadow-sm text-brand">
            <ChevronRight className="w-4 h-4" />
         </div>

         {/* Right Side: Output Panel */}
         <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e] border-t md:border-t-0 border-border h-[50vh] md:h-full overflow-hidden">
            <div className="p-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#181818]">
               <div className="flex items-center gap-2">
                  <CalendarClock className="w-4 h-4 text-emerald-500" />
                  <h2 className="font-semibold text-sm text-gray-200">Execution Schedule</h2>
               </div>
               <div className="flex gap-2">
                  <Button
                     variant="outline"
                     size="sm"
                     className="h-7 text-xs px-3 gap-2 bg-transparent border-white/20 text-gray-300 hover:text-white hover:bg-white/10"
                     onClick={copyToClipboard}
                     disabled={!englishDesc}
                  >
                     {copied ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                     ) : (
                        <Copy className="w-3.5 h-3.5" />
                     )}
                     {copied ? 'Copied' : 'Copy Desc.'}
                  </Button>
               </div>
            </div>

            <div className="flex-1 relative overflow-auto bg-[#1e1e1e] p-6 md:p-8 space-y-8">
               {error ? (
                  <div className="p-4 rounded-md text-rose-400 font-mono text-[13px] bg-rose-950/20 border border-rose-900/50">
                     <span className="font-bold flex items-center gap-2 mb-2">❌ Parsing Error</span>
                     {error}
                  </div>
               ) : (
                  <>
                     <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground/50">
                           Human Readable Description
                        </label>
                        <div className="text-2xl md:text-3xl font-light text-emerald-400 leading-tight">
                           {englishDesc || <span className="opacity-30">Type an expression to see description...</span>}
                        </div>
                     </div>

                     {nextRuns.length > 0 && (
                        <div className="space-y-4 pt-6 border-t border-white/10">
                           <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground/50">
                              <Clock className="w-3.5 h-3.5" /> Next 5 Scheduled Executions
                           </div>
                           <div className="space-y-2">
                              {nextRuns.map((date, index) => (
                                 <div
                                    key={index}
                                    className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 py-3 px-4 rounded-lg bg-white/5 border border-white/10"
                                 >
                                    <span className="text-gray-400 font-mono text-sm w-8">#{index + 1}</span>
                                    <span className="text-gray-200 font-medium text-[15px]">
                                       {date.toLocaleString(undefined, {
                                          weekday: 'short',
                                          year: 'numeric',
                                          month: 'short',
                                          day: 'numeric',
                                          hour: '2-digit',
                                          minute: '2-digit',
                                          second: '2-digit',
                                       })}
                                    </span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}
                  </>
               )}
            </div>
         </div>
      </div>
   );
}
