'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Copy, Check, RotateCcw, Shield, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePersistence } from '@/contexts/PersistenceContext';
import { generateHash, HashAlgorithm } from '@/lib/hash-generator-utils';

const STORAGE_KEY_INPUT = 'hash-generator-input';
const SAMPLE_TEXT = 'Hello World';

export function HashGeneratorView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [input, setInput] = useState('');
   const [hashes, setHashes] = useState<Record<HashAlgorithm, string>>({
      'MD5': '',
      'SHA-1': '',
      'SHA-256': '',
      'SHA-512': '',
   });
   
   const [copiedStates, setCopiedStates] = useState<Record<HashAlgorithm, boolean>>({
      'MD5': false,
      'SHA-1': false,
      'SHA-256': false,
      'SHA-512': false,
   });

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

   // Compute hashes
   useEffect(() => {
      if (!input) {
         setHashes({
            'MD5': '',
            'SHA-1': '',
            'SHA-256': '',
            'SHA-512': '',
         });
         return;
      }

      async function computeAll() {
         const [md5, sha1, sha256, sha512] = await Promise.all([
            generateHash(input, 'MD5'),
            generateHash(input, 'SHA-1'),
            generateHash(input, 'SHA-256'),
            generateHash(input, 'SHA-512'),
         ]);

         setHashes({
            'MD5': md5,
            'SHA-1': sha1,
            'SHA-256': sha256,
            'SHA-512': sha512,
         });
      }

      computeAll();
   }, [input]);

   const handleCopy = useCallback(async (algo: HashAlgorithm, text: string) => {
      if (!text) return;
      try {
         await navigator.clipboard.writeText(text);
         setCopiedStates((prev) => ({ ...prev, [algo]: true }));
         setTimeout(() => {
            setCopiedStates((prev) => ({ ...prev, [algo]: false }));
         }, 2000);
      } catch {
         console.error('Failed to copy');
      }
   }, []);

   const handleClear = () => setInput('');
   const handleSample = () => setInput(SAMPLE_TEXT);

   const algorithms: HashAlgorithm[] = ['MD5', 'SHA-1', 'SHA-256', 'SHA-512'];

   return (
      <div className="w-full h-full flex flex-col bg-background border border-border rounded-xl shadow-sm overflow-hidden relative">
         {/* Toolbar */}
         <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-background shrink-0">
            <div className="flex items-center gap-1.5">
               <Shield className="h-4 w-4 text-brand" />
               <span className="text-sm font-semibold text-foreground">Hash Generator</span>
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
         <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-background">
            
            {/* Input Panel (Left) */}
            <div className="flex flex-col md:w-5/12 min-h-[200px] md:min-h-0 border-b md:border-b-0 md:border-r border-border">
               <div className="px-3 py-2 border-b min-h-12 border-border bg-background shrink-0 flex items-center justify-between">
                  <span className="text-label font-semibold text-muted-foreground uppercase tracking-wider">
                     Input Text
                  </span>
                  <div className="text-tiny text-muted-foreground">
                     {input.length > 0 && <span>{input.length} characters</span>}
                  </div>
               </div>
               <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type or paste your text here to compute hashes..."
                  className="flex-1 w-full p-4 bg-transparent text-foreground text-sm resize-none focus:outline-none placeholder:text-muted-foreground/40 font-mono"
                  spellCheck={false}
               />
            </div>

            {/* Output Panel (Right) */}
            <div className="flex flex-col md:w-7/12 min-h-[400px] md:min-h-0 relative bg-muted/5">
               <div className="px-3 py-2 border-b min-h-12 border-border bg-background shrink-0 flex items-center">
                  <span className="text-label font-semibold text-muted-foreground uppercase tracking-wider">
                     Generated Hashes
                  </span>
               </div>
               
               <div className="flex-1 overflow-auto p-4 space-y-4">
                  {algorithms.map((algo) => (
                     <div key={algo} className="flex flex-col space-y-1.5 p-3 rounded-lg border border-border bg-background shadow-xs hover:border-brand/30 transition-colors group">
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-foreground bg-muted px-2 py-0.5 rounded uppercase tracking-wider">
                                 {algo}
                              </span>
                              <span className="text-tiny text-muted-foreground">
                                 {algo === 'MD5' ? '128-bit' : algo === 'SHA-1' ? '160-bit' : algo === 'SHA-256' ? '256-bit' : '512-bit'}
                              </span>
                           </div>
                           <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 gap-1 text-xs px-2 opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                              onClick={() => handleCopy(algo, hashes[algo])}
                              disabled={!hashes[algo]}
                           >
                              {copiedStates[algo] ? (
                                 <>
                                    <Check className="h-3 w-3 text-success" />
                                    <span className="text-success">Copied</span>
                                 </>
                              ) : (
                                 <>
                                    <Copy className="h-3 w-3" />
                                    Copy
                                 </>
                              )}
                           </Button>
                        </div>
                        <div className="w-full bg-muted/20 p-2.5 rounded border border-border/50 break-all font-mono text-xs sm:text-sm text-foreground/90 selection:bg-brand/20">
                           {hashes[algo] || <span className="text-muted-foreground/30 italic">Waiting for input...</span>}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}
