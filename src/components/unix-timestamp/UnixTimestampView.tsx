'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Clock, RotateCcw, Copy, CheckCircle2, ChevronRight, Hash, Calendar, Settings2, Replace } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePersistence } from '@/contexts/PersistenceContext';
import { STORAGE_KEYS } from '@/constants/storage';

interface UnixState {
   epochInput: string;
   dateInput: string;
   autoRefresh: boolean;
   unit: 's' | 'ms';
}

const DEFAULT_STATE: UnixState = {
   epochInput: '',
   dateInput: '',
   autoRefresh: true,
   unit: 's',
};

// Uses native RelativeTimeFormat for "time ago" logic
function getRelativeTime(timestampMs: number): string {
   const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
   const daysDifference = Math.round((timestampMs - Date.now()) / (1000 * 60 * 60 * 24));
   
   if (Math.abs(daysDifference) < 1) {
      const hoursDiff = Math.round((timestampMs - Date.now()) / (1000 * 60 * 60));
      if (Math.abs(hoursDiff) < 1) {
         const minsDiff = Math.round((timestampMs - Date.now()) / (1000 * 60));
         return rtf.format(minsDiff, 'minute');
      }
      return rtf.format(hoursDiff, 'hour');
   }
   
   if (Math.abs(daysDifference) > 365) {
      return rtf.format(Math.round(daysDifference / 365), 'year');
   }
   
   if (Math.abs(daysDifference) > 30) {
      return rtf.format(Math.round(daysDifference / 30), 'month');
   }
   
   return rtf.format(daysDifference, 'day');
}

export function UnixTimestampView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [state, setState] = useState<UnixState>(DEFAULT_STATE);
   const [currentTime, setCurrentTime] = useState<number>(Date.now());
   const [parsedDate, setParsedDate] = useState<Date | null>(null);
   const [parsedEpoch, setParsedEpoch] = useState<string>('');
   const [copiedDate, setCopiedDate] = useState(false);
   const [copiedEpoch, setCopiedEpoch] = useState(false);

   // Load state from localStorage
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const stored = localStorage.getItem(STORAGE_KEYS.UNIX_TIMESTAMP_INPUT);
         if (stored) {
            try {
               setState(JSON.parse(stored));
            } catch {
               // Ignore
            }
         }
      }
      
      // Initialize with current time if empty
      if (!state.epochInput && !state.dateInput) {
         const now = Date.now();
         setState(prev => ({ 
            ...prev, 
            epochInput: prev.unit === 's' ? Math.floor(now / 1000).toString() : now.toString() 
         }));
      }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isPersistenceEnabled]);

   // Save state
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      localStorage.setItem(STORAGE_KEYS.UNIX_TIMESTAMP_INPUT, JSON.stringify(state));
   }, [state, isPersistenceEnabled]);

   // Auto refresh current time
   useEffect(() => {
      if (!state.autoRefresh) return;
      const interval = setInterval(() => setCurrentTime(Date.now()), 1000);
      return () => clearInterval(interval);
   }, [state.autoRefresh]);

   // Compute Epoch -> Date
   useEffect(() => {
      if (!state.epochInput.trim()) {
         setParsedDate(null);
         return;
      }
      
      const num = parseInt(state.epochInput, 10);
      if (isNaN(num)) {
         setParsedDate(null);
         return;
      }
      
      const ms = state.unit === 's' ? num * 1000 : num;
      setParsedDate(new Date(ms));
   }, [state.epochInput, state.unit]);

   // Compute Date -> Epoch
   useEffect(() => {
      if (!state.dateInput.trim()) {
         setParsedEpoch('');
         return;
      }
      
      const d = new Date(state.dateInput);
      if (isNaN(d.getTime())) {
         setParsedEpoch('');
         return;
      }
      
      const e = state.unit === 's' ? Math.floor(d.getTime() / 1000) : d.getTime();
      setParsedEpoch(e.toString());
   }, [state.dateInput, state.unit]);

   const handleClear = () => {
      setState(prev => ({ ...prev, epochInput: '', dateInput: '' }));
   };

   const setNow = () => {
      const now = Date.now();
      const num = state.unit === 's' ? Math.floor(now / 1000) : now;
      setState(prev => ({
         ...prev,
         epochInput: num.toString(),
         dateInput: new Date(now).toISOString().slice(0, 16)
      }));
   };

   const copyToClipboard = async (text: string, type: 'date' | 'epoch') => {
      if (!text) return;
      try {
         await navigator.clipboard.writeText(text);
         if (type === 'date') {
            setCopiedDate(true);
            setTimeout(() => setCopiedDate(false), 2000);
         } else {
            setCopiedEpoch(true);
            setTimeout(() => setCopiedEpoch(false), 2000);
         }
      } catch (err) {
         console.error('Failed to copy', err);
      }
   };

   return (
      <div className="w-full h-full flex flex-col md:flex-row bg-background overflow-hidden relative border border-border">
         {/* Left Side: Conversion Panel */}
         <div className="flex-1 flex flex-col min-w-0 bg-background border-b md:border-b-0 md:border-r border-border shrink-0 md:w-[60%] overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/20 flex flex-wrap items-center justify-between gap-3 shrink-0">
               <div className="flex items-center gap-2">
                  <Settings2 className="w-4 h-4 text-brand" />
                  <h2 className="font-semibold text-sm">Convert Timestamp</h2>
               </div>
               <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="h-7 text-xs px-2 gap-1" onClick={setNow}>
                     <Clock className="w-3.5 h-3.5" /> Set Now
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs px-2 gap-1 text-muted-foreground hover:text-foreground" onClick={handleClear}>
                     <RotateCcw className="w-3.5 h-3.5" /> Clear
                  </Button>
               </div>
            </div>
            
            <div className="p-6 md:p-8 space-y-12 overflow-y-auto">
               
               {/* Epoch to Date */}
               <div className="space-y-6">
                  <h3 className="text-sm font-bold flex items-center gap-2 border-b border-border pb-2">
                     <Hash className="w-4 h-4 text-indigo-500" /> Epoch to Human Date
                  </h3>
                  
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                     <div className="flex-1 w-full space-y-2">
                        <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Timestamp</label>
                        <Input 
                           value={state.epochInput}
                           onChange={(e) => setState(prev => ({ ...prev, epochInput: e.target.value }))}
                           className="h-12 font-mono text-lg bg-background"
                           placeholder="1710000000"
                        />
                     </div>
                     <div className="w-full md:w-32 space-y-2">
                        <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Unit</label>
                        <Select value={state.unit} onValueChange={(val: 's'|'ms') => setState(prev => ({ ...prev, unit: val }))}>
                           <SelectTrigger className="h-12 bg-background">
                              <SelectValue />
                           </SelectTrigger>
                           <SelectContent>
                              <SelectItem value="s">Seconds</SelectItem>
                              <SelectItem value="ms">Millisecs</SelectItem>
                           </SelectContent>
                        </Select>
                     </div>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/30 border border-border flex flex-col md:flex-row gap-4 items-center justify-between">
                     <div className="flex-1 text-center md:text-left">
                        {parsedDate ? (
                           <>
                              <div className="text-[15px] font-medium text-foreground">{parsedDate.toUTCString()}</div>
                              <div className="text-sm text-muted-foreground mt-1 flex items-center justify-center md:justify-start gap-2">
                                 {parsedDate.toLocaleString()} (Local)
                                 <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full">
                                    {getRelativeTime(parsedDate.getTime())}
                                 </span>
                              </div>
                           </>
                        ) : (
                           <div className="text-sm text-muted-foreground italic">Waiting for valid input...</div>
                        )}
                     </div>
                     <Button 
                        variant="secondary" 
                        size="sm" 
                        className="h-9 whitespace-nowrap"
                        disabled={!parsedDate}
                        onClick={() => copyToClipboard(parsedDate ? parsedDate.toISOString() : '', 'date')}
                     >
                        {copiedDate ? <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> : <Copy className="w-4 h-4 mr-2" />}
                        Copy ISO
                     </Button>
                  </div>
               </div>

               <div className="flex items-center justify-center opacity-30">
                  <Replace className="w-6 h-6" />
               </div>

               {/* Date to Epoch */}
               <div className="space-y-6">
                  <h3 className="text-sm font-bold flex items-center gap-2 border-b border-border pb-2">
                     <Calendar className="w-4 h-4 text-emerald-500" /> Human Date to Epoch
                  </h3>
                  
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                     <div className="flex-1 w-full space-y-2">
                        <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Date Time String / Local</label>
                        <Input 
                           type="datetime-local"
                           value={state.dateInput}
                           onChange={(e) => setState(prev => ({ ...prev, dateInput: e.target.value }))}
                           className="h-12 bg-background font-mono px-4 text-[13px] md:text-sm"
                        />
                     </div>
                  </div>

                  <div className="p-4 rounded-xl bg-muted/30 border border-border flex flex-col md:flex-row gap-4 items-center justify-between">
                     <div className="flex-1 text-center md:text-left">
                        {parsedEpoch ? (
                           <>
                              <div className="text-[20px] font-mono font-bold text-emerald-500">{parsedEpoch}</div>
                              <div className="text-sm text-muted-foreground mt-1">
                                 Output format: {state.unit === 's' ? 'Seconds (POSIX Unix)' : 'Milliseconds (JS Native)'}
                              </div>
                           </>
                        ) : (
                           <div className="text-sm text-muted-foreground italic">Waiting for valid date...</div>
                        )}
                     </div>
                     <Button 
                        variant="secondary" 
                        size="sm" 
                        className="h-9 whitespace-nowrap"
                        disabled={!parsedEpoch}
                        onClick={() => copyToClipboard(parsedEpoch, 'epoch')}
                     >
                        {copiedEpoch ? <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" /> : <Copy className="w-4 h-4 mr-2" />}
                        Copy Epoch
                     </Button>
                  </div>
               </div>

            </div>
         </div>

         {/* Center divider icon */}
         <div className="hidden md:flex absolute left-[60%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-background border border-border rounded-full items-center justify-center z-10 shadow-sm text-brand">
            <ChevronRight className="w-4 h-4" />
         </div>

         {/* Right Side: Live Ticker Panel */}
         <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e] border-t md:border-t-0 border-border h-[40vh] md:h-full overflow-hidden shrink-0 md:w-[40%]">
            <div className="p-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#181818]">
               <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-sky-500" />
                  <h2 className="font-semibold text-sm text-gray-200">Current Epoch Time</h2>
               </div>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 p-8 space-y-8 relative">
               
               <div className="text-center space-y-4 relative z-10">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">Live UNIX Timestamp</div>
                  <div className="text-4xl md:text-5xl font-light text-sky-400 font-mono tracking-wider tabular-nums">
                     {state.unit === 's' ? Math.floor(currentTime / 1000) : currentTime}
                  </div>
                  <div className="text-sm text-gray-400 mt-2">
                     {new Date(currentTime).toUTCString()}
                  </div>
               </div>

               <div className="flex gap-4 z-10">
                  <Button 
                     variant="outline" 
                     className="bg-transparent border-white/20 text-gray-300 hover:text-white hover:bg-white/10"
                     onClick={() => {
                        const val = state.unit === 's' ? Math.floor(currentTime / 1000).toString() : currentTime.toString();
                        copyToClipboard(val, 'epoch');
                     }}
                  >
                     {copiedEpoch ? <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400" /> : <Copy className="w-4 h-4 mr-2" />} 
                     Copy Live Epoch
                  </Button>
               </div>

               {/* Background subtle pulse */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-sky-500/5 rounded-full blur-[80px] pointer-events-none" />
            </div>
         </div>
      </div>
   );
}
