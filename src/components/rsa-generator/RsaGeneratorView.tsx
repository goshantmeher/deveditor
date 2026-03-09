'use client';

import React, { useState, useCallback } from 'react';
import { ShieldCheck, Copy, Check, Download, RefreshCw, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { generateRsaKeyPair, RsaKeySize, RsaKeyPairPEM } from '@/lib/rsa-generator-utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function RsaGeneratorView() {
   const [keySize, setKeySize] = useState<RsaKeySize>(2048);
   const [keys, setKeys] = useState<RsaKeyPairPEM | null>(null);
   const [isGenerating, setIsGenerating] = useState(false);
   
   const [copiedPublic, setCopiedPublic] = useState(false);
   const [copiedPrivate, setCopiedPrivate] = useState(false);

   const handleGenerate = useCallback(async () => {
      setIsGenerating(true);
      try {
         // Force slight timeout to prevent UI freeze locking the generate spinner if sizes are heavily computed
         setTimeout(async () => {
            const result = await generateRsaKeyPair(keySize);
            setKeys(result);
            setIsGenerating(false);
         }, 50);
      } catch (err) {
         console.error('Failed formatting RSA:', err);
         setIsGenerating(false);
      }
   }, [keySize]);

   const handleCopy = async (text: string, isPublic: boolean) => {
      try {
         await navigator.clipboard.writeText(text);
         if (isPublic) {
            setCopiedPublic(true);
            setTimeout(() => setCopiedPublic(false), 2000);
         } else {
            setCopiedPrivate(true);
            setTimeout(() => setCopiedPrivate(false), 2000);
         }
      } catch (err) {
         console.error(err);
      }
   };

   const handleDownload = (text: string, filename: string) => {
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
   };

   return (
      <div className="w-full h-full flex flex-col bg-background border border-border rounded-xl shadow-sm overflow-hidden relative">
         <div className="flex flex-wrap items-center gap-3 px-4 py-2.5 border-b border-border bg-background shrink-0">
            <div className="flex items-center gap-1.5 mr-2">
               <ShieldCheck className="h-4 w-4 text-brand" />
               <span className="text-sm font-semibold text-foreground">RSA Key Pair Generator</span>
            </div>
         </div>

         <div className="flex-1 flex flex-col bg-background overflow-y-auto">
            <div className="max-w-4xl mx-auto w-full p-6 space-y-6">
               
               {/* Controls */}
               <div className="flex flex-col sm:flex-row gap-4 items-end bg-muted/10 p-6 rounded-2xl border border-border">
                  <div className="space-y-2 flex-1 w-full">
                     <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Key Size (Modulus)</label>
                     <Select value={keySize.toString()} onValueChange={(val) => setKeySize(parseInt(val, 10) as RsaKeySize)}>
                        <SelectTrigger className="w-full bg-background border-border shadow-xs">
                           <SelectValue placeholder="Select RSA Key Size" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="1024">1024-bit (Weak, Fast)</SelectItem>
                           <SelectItem value="2048">2048-bit (Standard)</SelectItem>
                           <SelectItem value="4096">4096-bit (Secure, Slow)</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
                  
                  <Button 
                     onClick={handleGenerate} 
                     disabled={isGenerating}
                     className="w-full sm:w-auto px-8 gap-2 bg-brand text-brand-foreground hover:bg-brand/90 font-semibold"
                  >
                     <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                     {isGenerating ? 'Generating...' : 'Generate Keys'}
                  </Button>
               </div>

               {/* Results View */}
               {!keys && !isGenerating && (
                  <div className="flex flex-col items-center justify-center p-12 text-center border border-dashed border-border/50 rounded-2xl opacity-60">
                     <Lock className="w-12 h-12 mb-4 text-muted-foreground" />
                     <p className="text-sm text-foreground/80 font-medium">No keys generated yet.</p>
                     <p className="text-xs text-muted-foreground/80 mt-1 max-w-sm">Press generate to locally create secure PKCS8 Private and SPKI Public PEM strings safely inside this browser tab.</p>
                  </div>
               )}

               {isGenerating && (
                  <div className="flex flex-col items-center justify-center p-12 text-center border border-border rounded-2xl">
                     <RefreshCw className="w-10 h-10 mb-4 text-brand animate-spin" />
                     <p className="text-sm text-foreground/80 font-medium">Generating Cryptographic Entropy</p>
                     <p className="text-xs text-muted-foreground/80 mt-1">4096-bit keys may lock your browser momentarily during intense modulus calculations.</p>
                  </div>
               )}

               {keys && !isGenerating && (
                  <div className="grid md:grid-cols-2 gap-6">
                     {/* Public Key */}
                     <div className="flex flex-col border border-border rounded-xl shadow-xs overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b border-border">
                           <span className="text-sm font-semibold uppercase tracking-wider text-foreground">Public Key</span>
                           <div className="flex gap-2">
                              <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleDownload(keys.publicKey, 'public.pem')}>
                                 <Download className="w-3.5 h-3.5 text-muted-foreground" />
                              </Button>
                              <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => handleCopy(keys.publicKey, true)}>
                                 {copiedPublic ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
                              </Button>
                           </div>
                        </div>
                        <textarea
                           value={keys.publicKey}
                           readOnly
                           className="w-full h-64 p-4 text-xs font-mono bg-background resize-none focus:outline-none selection:bg-brand/20 text-indigo-500/90"
                           spellCheck={false}
                        />
                     </div>

                     {/* Private Key */}
                     <div className="flex flex-col rounded-xl shadow-xs border border-red-500/20 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 bg-red-500/5 border-b border-red-500/20">
                           <span className="text-sm font-bold uppercase tracking-wider text-red-500/80">Private Key (Secret)</span>
                           <div className="flex gap-2">
                              <Button variant="outline" size="icon" className="h-7 w-7 border-red-500/20 hover:bg-red-500/10" onClick={() => handleDownload(keys.privateKey, 'private.pem')}>
                                 <Download className="w-3.5 h-3.5 text-red-400" />
                              </Button>
                              <Button variant="outline" size="icon" className="h-7 w-7 border-red-500/20 hover:bg-red-500/10" onClick={() => handleCopy(keys.privateKey, false)}>
                                 {copiedPrivate ? <Check className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5 text-red-400" />}
                              </Button>
                           </div>
                        </div>
                        <textarea
                           value={keys.privateKey}
                           readOnly
                           className="w-full h-64 p-4 text-xs font-mono bg-background resize-none focus:outline-none selection:bg-red-500/20 text-red-400/90"
                           spellCheck={false}
                        />
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
