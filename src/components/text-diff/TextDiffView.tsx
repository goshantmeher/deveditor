'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Split, AlignLeft, RefreshCcw, FileType2, RotateCcw } from 'lucide-react';
import { DiffViewer, DiffStats } from './DiffViewer';

export function TextDiffView() {
   const [oldText, setOldText] = useState(
      'This is some default text.\n\nYou can change it however you like!\nIt supports multi-line testing.'
   );
   const [newText, setNewText] = useState(
      'This is some modified text.\n\nYou can adjust it however you prefer!\nIt supports multi-line tests as well.'
   );

   const [viewType, setViewType] = useState<'split' | 'unified'>('split');
   const [mode, setMode] = useState<'char' | 'word'>('word');
   const [stats, setStats] = useState<DiffStats | null>(null);

   // Handlers
   const handleSwap = () => {
      setOldText(newText);
      setNewText(oldText);
   };

   const handleClear = () => {
      setOldText('');
      setNewText('');
   };

   const seoSchema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Text Diff Checker',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description:
         'Side-by-side visual comparison of two text blocks with character and word-level change highlighting.',
      featureList: [
         'Character-level text diff',
         'Word-level text diff',
         'Split view difference rendering',
         'Unified diff view',
         'Diff statistics',
      ],
   };

   return (
      <div className="flex flex-col h-full w-full overflow-y-auto md:overflow-hidden">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(seoSchema) }} />
         {/* Toolbar */}
         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border-b border-border bg-muted/20 shrink-0">
            <div className="flex items-center gap-2">
               <Tabs
                  value={viewType}
                  onValueChange={(v: string) => setViewType(v as 'split' | 'unified')}
                  className="w-full sm:w-auto"
               >
                  <TabsList className="h-9">
                     <TabsTrigger value="split" className="text-xs gap-1.5 px-3">
                        <Split className="w-3.5 h-3.5" />
                        Split
                     </TabsTrigger>
                     <TabsTrigger value="unified" className="text-xs gap-1.5 px-3">
                        <AlignLeft className="w-3.5 h-3.5" />
                        Unified
                     </TabsTrigger>
                  </TabsList>
               </Tabs>

               <div className="h-6 w-px bg-border/50 mx-1 hidden sm:block" />

               <Tabs
                  value={mode}
                  onValueChange={(v: string) => setMode(v as 'char' | 'word')}
                  className="hidden sm:block"
               >
                  <TabsList className="h-9">
                     <TabsTrigger value="word" className="text-xs px-3">
                        Words
                     </TabsTrigger>
                     <TabsTrigger value="char" className="text-xs px-3">
                        Chars
                     </TabsTrigger>
                  </TabsList>
               </Tabs>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
               <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSwap}
                  className="gap-2 text-xs flex-1 sm:flex-none h-9 hover:bg-muted"
                  title="Swap original and modified text"
               >
                  <RefreshCcw className="w-3.5 h-3.5" />
                  Swap
               </Button>
               <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClear}
                  className="gap-2 text-xs h-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
               >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Clear</span>
               </Button>
            </div>
         </div>

         {/* Input Area */}
         <div className="flex flex-col md:flex-row h-[500px] md:h-64 shrink-0 border-b border-border divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="flex-1 flex flex-col min-h-0 bg-background relative group">
               <div className="absolute top-2 right-4 flex items-center justify-between pointer-events-none z-10 w-full px-4">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest bg-background/80 px-1 backdrop-blur-sm rounded">
                     Original Text
                  </span>
               </div>
               <Textarea
                  value={oldText}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setOldText(e.target.value)}
                  placeholder="Paste original text here..."
                  className="flex-1 resize-none border-0 focus-visible:ring-0 p-4 pt-8 rounded-none font-mono text-sm leading-6 shadow-none"
               />
               <div className="px-3 py-1.5 border-t border-border/50 bg-muted/10 text-[10px] text-muted-foreground flex justify-between shrink-0">
                  <span>{oldText.length} chars</span>
                  <span>{oldText.split('\n').length} lines</span>
               </div>
            </div>

            <div className="flex-1 flex flex-col min-h-0 bg-background relative group">
               <div className="absolute top-2 right-4 flex items-center justify-between pointer-events-none z-10 w-full px-4">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest bg-background/80 px-1 backdrop-blur-sm rounded">
                     Modified Text
                  </span>
               </div>
               <Textarea
                  value={newText}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewText(e.target.value)}
                  placeholder="Paste modified text here..."
                  className="flex-1 resize-none border-0 focus-visible:ring-0 p-4 pt-8 rounded-none font-mono text-sm leading-6 shadow-none bg-blue-50/10 dark:bg-blue-900/5 placeholder:text-muted-foreground/60"
               />
               <div className="px-3 py-1.5 border-t border-border/50 bg-muted/10 text-[10px] text-muted-foreground flex justify-between shrink-0">
                  <span>{newText.length} chars</span>
                  <span>{newText.split('\n').length} lines</span>
               </div>
            </div>
         </div>

         {/* Output / Diff Result view */}
         <div className="flex-1 flex flex-col min-h-[400px] md:min-h-0 overflow-y-auto bg-card">
            <div className="px-4 py-2 border-b border-border/50 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 sticky top-0 bg-background/95 backdrop-blur z-20 shrink-0">
               <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                  <div className="flex items-center gap-2">
                     <FileType2 className="w-4 h-4 text-primary" />
                     <span className="text-sm font-semibold tracking-tight">Diff Result</span>
                  </div>
               </div>

               <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full sm:w-auto gap-2 sm:gap-4 text-xs pb-1 sm:pb-0 overflow-x-auto hide-scrollbar">
                  {stats && (
                     <div className="flex items-center gap-3 shrink-0 sm:border-r border-border/50 sm:pr-4">
                        <span className="text-muted-foreground">
                           <span className="text-foreground font-medium">{stats.wordsAdded + stats.wordsRemoved}</span>{' '}
                           words diff
                        </span>
                        <span className="text-muted-foreground">
                           <span className="text-foreground font-medium">{stats.charsAdded + stats.charsRemoved}</span>{' '}
                           chars diff
                        </span>
                     </div>
                  )}
                  <div className="flex items-center gap-4 shrink-0">
                     <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-sm bg-red-400/40" />
                        <span>
                           Removed{' '}
                           {stats && (
                              <span className="text-muted-foreground font-medium tabular-nums ml-0.5">
                                 ({stats.charsRemoved})
                              </span>
                           )}
                        </span>
                     </div>
                     <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-sm bg-green-400/40" />
                        <span>
                           Added{' '}
                           {stats && (
                              <span className="text-muted-foreground font-medium tabular-nums ml-0.5">
                                 ({stats.charsAdded})
                              </span>
                           )}
                        </span>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex-1 overflow-x-auto min-h-0 bg-background/50 outline outline-border/50">
               {oldText === '' && newText === '' ? (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                     <Split className="w-8 h-8 mb-2 opacity-50" />
                     <p className="text-sm">Enter text above to see diff comparisons</p>
                  </div>
               ) : (
                  <DiffViewer
                     oldText={oldText}
                     newText={newText}
                     mode={mode}
                     viewType={viewType}
                     onStatsChange={setStats}
                  />
               )}
            </div>
         </div>
      </div>
   );
}
