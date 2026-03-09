'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FileText, Type, Hash, Clock, FileCode, AlignLeft, BarChart2, RotateCcw, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePersistence } from '@/contexts/PersistenceContext';
import { analyzeText, formatBytes } from '@/lib/word-counter-utils';

const STORAGE_KEY_INPUT = 'word-counter-input';

const SAMPLE_TEXT = `The quick brown fox jumps over the lazy dog. 
This is a sample paragraph with multiple sentences! It is used to demonstrate the word counter's ability to accurately track characters, words, sentences, and paragraphs.
Did you know that the average reading speed for an adult is 200-250 words per minute?
Try pasting your own text here to see the detailed metrics.`;

export function WordCounterView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [input, setInput] = useState('');
   
   // Load persisted state
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const storedInput = localStorage.getItem(STORAGE_KEY_INPUT);
         if (storedInput) setInput(storedInput);
      }
   }, [isPersistenceEnabled]);

   // Save state
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      localStorage.setItem(STORAGE_KEY_INPUT, input);
   }, [input, isPersistenceEnabled]);

   const handleClear = () => setInput('');
   const handleSample = () => setInput(SAMPLE_TEXT);

   const stats = analyzeText(input);

   return (
      <div className="w-full h-full flex flex-col bg-background border border-border rounded-xl shadow-sm overflow-hidden relative">
         {/* Toolbar */}
         <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-background shrink-0">
            <div className="flex items-center gap-1.5">
               <BarChart2 className="h-4 w-4 text-brand" />
               <span className="text-sm font-semibold text-foreground">Word & Character Counter</span>
            </div>
            
            <div className="flex items-center gap-2">
               {!input && (
                  <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground" onClick={handleSample}>
                     <FlaskConical className="w-3.5 h-3.5 mr-1" />
                     Sample
                  </Button>
               )}
               {input && (
                  <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground" onClick={handleClear}>
                     <RotateCcw className="w-3.5 h-3.5 mr-1" />
                     Clear Text
                  </Button>
               )}
            </div>
         </div>

         {/* Main Content */}
         <div className="flex-1 flex flex-col min-h-0 bg-background overflow-hidden relative">
            
            {/* Stats Overview Bar - Quick counts at the top */}
            <div className="flex flex-wrap items-center gap-0 border-b border-border bg-muted/20 shrink-0">
               <div className="flex-1 min-w-[120px] p-3 text-center border-r border-border">
                  <div className="text-2xl font-bold text-foreground font-mono">{stats.words}</div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">Words</div>
               </div>
               <div className="flex-1 min-w-[120px] p-3 text-center border-r border-border">
                  <div className="text-2xl font-bold text-foreground font-mono truncate">{stats.characters}</div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">Chars</div>
               </div>
               <div className="flex-1 min-w-[120px] p-3 text-center border-r border-border hidden sm:block">
                  <div className="text-2xl font-bold text-foreground font-mono">{stats.sentences}</div>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">Sentences</div>
               </div>
               <div className="flex-1 min-w-[120px] p-3 text-center hidden md:block">
                  <div className="text-2xl font-bold text-brand font-mono">
                     {stats.readingTimeMinutes > 0 ? `${stats.readingTimeMinutes}m ` : ''}
                     {stats.readingTimeSeconds}s
                  </div>
                  <div className="text-xs font-semibold text-brand/70 uppercase tracking-wider mt-1">Reading Time</div>
               </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row min-h-0">
               {/* Detailed Stats Panel (Left) */}
               <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border bg-background overflow-y-auto shrink-0 flex flex-col">
                  <div className="p-4 flex-1">
                     <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-4">Detailed Metrics</h3>
                     
                     <div className="space-y-4">
                        <div className="flex items-center justify-between group">
                           <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Type className="w-4 h-4 text-emerald-500" />
                              Chars (no spaces)
                           </div>
                           <span className="font-mono text-foreground font-medium">{stats.charactersNoSpaces}</span>
                        </div>
                        
                        <div className="flex items-center justify-between group">
                           <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <AlignLeft className="w-4 h-4 text-amber-500" />
                              Paragraphs
                           </div>
                           <span className="font-mono text-foreground font-medium">{stats.paragraphs}</span>
                        </div>
                        
                        <div className="flex items-center justify-between group">
                           <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Hash className="w-4 h-4 text-purple-500" />
                              Lines
                           </div>
                           <span className="font-mono text-foreground font-medium">{stats.lines}</span>
                        </div>
                        
                        <div className="flex items-center justify-between group">
                           <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <FileCode className="w-4 h-4 text-rose-500" />
                              File Size
                           </div>
                           <span className="font-mono text-foreground font-medium">{formatBytes(stats.byteSize)}</span>
                        </div>
                        
                        <div className="flex items-center justify-between group sm:hidden">
                           <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <FileText className="w-4 h-4 text-blue-500" />
                              Sentences
                           </div>
                           <span className="font-mono text-foreground font-medium">{stats.sentences}</span>
                        </div>
                        
                        <div className="flex items-center justify-between group md:hidden">
                           <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Clock className="w-4 h-4 text-brand" />
                              Reading Time
                           </div>
                           <span className="font-mono text-brand font-medium">
                              {stats.readingTimeMinutes > 0 ? `${stats.readingTimeMinutes}m ` : ''}
                              {stats.readingTimeSeconds}s
                           </span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Editor Panel (Right) */}
               <div className="flex-1 relative flex flex-col">
                  <textarea
                     value={input}
                     onChange={(e) => setInput(e.target.value)}
                     placeholder="Type or paste your text here to count words, characters, sentences, lines..."
                     className="absolute inset-0 w-full h-full p-6 text-foreground text-sm resize-none focus:outline-none placeholder:text-muted-foreground/40 leading-relaxed font-sans"
                     spellCheck={true}
                  />
               </div>
            </div>
         </div>
      </div>
   );
}
