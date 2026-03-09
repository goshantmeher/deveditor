'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePersistence } from '@/contexts/PersistenceContext';
import { compareBcrypt, hashBcrypt } from '@/lib/bcrypt-tester-utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const STORAGE_KEY_PLAINTEXT = 'bcrypt-test-plain';
const STORAGE_KEY_HASH = 'bcrypt-test-hash';

export function BcryptTesterView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [plaintext, setPlaintext] = useState('');
   const [hash, setHash] = useState('');
   const [mode, setMode] = useState<'verify' | 'generate'>('verify');
   const [rounds, setRounds] = useState(10);
   const [result, setResult] = useState<boolean | null>(null);
   const [generatedHash, setGeneratedHash] = useState('');
   const [isComputing, setIsComputing] = useState(false);

   // Load state
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;
      if (isPersistenceEnabled) {
         const p = localStorage.getItem(STORAGE_KEY_PLAINTEXT);
         const h = localStorage.getItem(STORAGE_KEY_HASH);
         if (p) setPlaintext(p);
         if (h) setHash(h);
      }
   }, [isPersistenceEnabled]);

   // Save State
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      localStorage.setItem(STORAGE_KEY_PLAINTEXT, plaintext);
      localStorage.setItem(STORAGE_KEY_HASH, hash);
   }, [plaintext, hash, isPersistenceEnabled]);

   // Auto verify
   useEffect(() => {
      if (mode !== 'verify') return;
      if (!plaintext || !hash) {
         setResult(null);
         return;
      }
      let isCurrent = true;
      setIsComputing(true);
      compareBcrypt(plaintext, hash).then((res) => {
         if (isCurrent) {
            setResult(res);
            setIsComputing(false);
         }
      });
      return () => { isCurrent = false; };
   }, [plaintext, hash, mode]);

   // Handle Generate
   const handleGenerate = async () => {
      if (!plaintext) return;
      setIsComputing(true);
      const output = await hashBcrypt(plaintext, rounds);
      setGeneratedHash(output);
      setIsComputing(false);
   };

   const handleClear = () => {
      setPlaintext('');
      setHash('');
      setGeneratedHash('');
      setResult(null);
   };

   return (
      <div className="w-full h-full flex flex-col bg-background border border-border rounded-xl shadow-sm overflow-hidden relative">
         <div className="flex flex-wrap items-center gap-3 px-4 py-2.5 border-b border-border bg-background shrink-0">
            <div className="flex items-center gap-1.5 mr-2">
               <ShieldAlert className="h-4 w-4 text-brand" />
               <span className="text-sm font-semibold text-foreground">Bcrypt Tester</span>
            </div>
            
            <Tabs value={mode} onValueChange={(v) => setMode(v as 'verify' | 'generate')} className="shrink-0">
               <TabsList className="h-8 p-0.5">
                  <TabsTrigger value="verify" className="h-7 text-xs px-3 data-[state=active]:bg-brand data-[state=active]:text-brand-foreground">Verify Hash</TabsTrigger>
                  <TabsTrigger value="generate" className="h-7 text-xs px-3 data-[state=active]:bg-brand data-[state=active]:text-brand-foreground">Generate Hash</TabsTrigger>
               </TabsList>
            </Tabs>

            <div className="flex-1" />

            <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground" onClick={handleClear}>
               <RotateCcw className="w-3.5 h-3.5 mr-1" />
               Clear
            </Button>
         </div>

         <div className="flex-1 flex flex-col min-h-0 bg-background overflow-y-auto">
            <div className="flex flex-col md:flex-row gap-6 p-6 max-w-5xl mx-auto w-full">
               
               <div className="flex-1 space-y-6 w-full md:w-auto">
                  <div className="space-y-4">
                     <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Plaintext String</label>
                     <input
                        type="text"
                        value={plaintext}
                        onChange={(e) => setPlaintext(e.target.value)}
                        placeholder="Enter password or plaintext..."
                        className="w-full p-4 bg-muted/10 border border-border rounded-xl text-foreground text-sm focus:outline-none focus:border-brand/40 font-mono"
                     />
                  </div>

                  {mode === 'verify' && (
                     <div className="space-y-4">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Bcrypt Hash</label>
                        <textarea
                           value={hash}
                           onChange={(e) => setHash(e.target.value)}
                           placeholder="Enter bcrypt hash starting with $2a$, $2b$ or $2y$..."
                           className="w-full p-4 bg-muted/10 border border-border rounded-xl text-foreground text-sm focus:outline-none focus:border-brand/40 font-mono resize-none h-32"
                           spellCheck={false}
                        />
                     </div>
                  )}

                  {mode === 'generate' && (
                     <div className="space-y-4">
                        <div className="flex justify-between items-center">
                           <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Cost Factor (Rounds: {rounds})</label>
                           <input type="number" value={rounds} onChange={(e) => setRounds(Number(e.target.value))} min={4} max={31} className="w-16 h-8 text-center border border-border bg-background rounded text-xs" />
                        </div>
                        <Button className="w-full" onClick={handleGenerate} disabled={!plaintext || isComputing}>
                           {isComputing ? 'Computing...' : 'Generate Bcrypt Hash'}
                        </Button>
                     </div>
                  )}
               </div>

               <div className="w-full md:w-[400px] rounded-2xl bg-muted/5 border border-border overflow-hidden flex flex-col relative shrink-0 min-h-[300px]">
                  <div className="p-4 border-b border-border bg-muted/20">
                     <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Result</span>
                  </div>
                  <div className="flex-1 flex items-center justify-center p-8 bg-background relative">
                     {isComputing && mode === 'verify' && (
                        <div className="text-muted-foreground animate-pulse text-sm">Computing match...</div>
                     )}
                     {!isComputing && mode === 'verify' && result === null && (
                        <div className="text-muted-foreground/50 text-sm text-center">Provide plaintext and hash to compare.</div>
                     )}
                     {!isComputing && mode === 'verify' && result === true && (
                        <div className="flex flex-col items-center text-success gap-4">
                           <CheckCircle2 className="w-16 h-16" />
                           <h3 className="text-2xl font-bold">Matched</h3>
                           <p className="text-sm opacity-80">The hash perfectly matches the plaintext.</p>
                        </div>
                     )}
                     {!isComputing && mode === 'verify' && result === false && (
                        <div className="flex flex-col items-center text-destructive gap-4">
                           <XCircle className="w-16 h-16" />
                           <h3 className="text-2xl font-bold">No Match</h3>
                           <p className="text-sm opacity-80">The hash does not match the plaintext string.</p>
                        </div>
                     )}
                     {mode === 'generate' && !generatedHash && (
                        <div className="text-muted-foreground/50 text-sm text-center">Click generate to view hash.</div>
                     )}
                     {mode === 'generate' && generatedHash && (
                        <div className="flex flex-col gap-4 w-full">
                           <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider text-center">Generated Hash</label>
                           <div className="p-4 bg-muted/20 border border-border/50 rounded-xl text-center font-mono break-all text-brand font-bold">
                              {generatedHash}
                           </div>
                           <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(generatedHash)}>
                              Copy Hash
                           </Button>
                        </div>
                     )}
                  </div>
               </div>

            </div>
         </div>
      </div>
   );
}
