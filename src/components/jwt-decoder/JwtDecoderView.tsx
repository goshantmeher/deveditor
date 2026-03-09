'use client';
import { STORAGE_KEYS, DEFAULT_INPUTS } from '@/constants/storage';


import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { parseJwt, formatTimestamp, ParsedJwt } from '@/lib/jwt-utils';
import { Copy, CheckCircle2, AlertTriangle, ShieldAlert, FileJson } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePersistence } from '@/contexts/PersistenceContext';

export function JwtDecoderView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);
   const overlayRef = useRef<HTMLDivElement>(null);

   const [token, setToken] = useState<string>(DEFAULT_INPUTS.JWT_TOKEN);

   // Load state
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;
      if (isPersistenceEnabled) {
         const saved = localStorage.getItem(STORAGE_KEYS.JWT_TOKEN);
         if (saved !== null) setToken(saved);
      }
   }, [isPersistenceEnabled]);

   // Save state
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      localStorage.setItem(STORAGE_KEYS.JWT_TOKEN, token);
   }, [token, isPersistenceEnabled]);

   const decoded = useMemo(() => {
      try {
         return parseJwt(token);
      } catch {
         return {
            header: null,
            payload: null,
            signature: null,
            isValidStructure: false,
            error: 'Failed to process JWT string',
         } as ParsedJwt;
      }
   }, [token]);

   const copyToClipboard = async (text: string) => {
      try {
         await navigator.clipboard.writeText(text);
      } catch (e) {
         console.error('Failed to copy', e);
      }
   };

   const headerString = decoded.header ? JSON.stringify(decoded.header, null, 2) : '';
   const payloadString = decoded.payload ? JSON.stringify(decoded.payload, null, 2) : '';

   // Look for specific known claims in payload
   const { payload } = decoded;
   const iat = payload?.iat as number | undefined;
   const exp = payload?.exp as number | undefined;
   const nbf = payload?.nbf as number | undefined;
   const sub = payload?.sub as string | undefined;

   return (
      <div className="flex flex-col h-full w-full bg-background border border-border rounded-xl shadow-sm tracking-normal overflow-hidden">
         {/* Top Toolbar */}
         <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-background">
            <div className="flex items-center gap-2">
               <ShieldAlert className="w-4 h-4 text-indigo-500" />
               <h1 className="text-sm font-semibold">JWT Debugger</h1>
               <span className="hidden sm:inline text-xs text-muted-foreground ml-2">
                  Client-side only. Does not verify signatures.
               </span>
            </div>
            {decoded.isValidStructure ? (
               <div className="flex items-center gap-1.5 text-xs text-emerald-500 font-medium bg-emerald-500/10 px-2 py-1 rounded">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Valid Structure
               </div>
            ) : token ? (
               <div className="flex items-center gap-1.5 text-xs text-red-500 font-medium bg-red-500/10 px-2 py-1 rounded">
                  <AlertTriangle className="w-3.5 h-3.5" /> {decoded.error || 'Invalid JWT'}
               </div>
            ) : null}
         </div>

         <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border min-h-0">
            {/* Left Panel: Encoded Input */}
            <div className="flex-1 flex flex-col min-h-[300px] md:min-h-0 bg-background group">
               <div className="flex items-center justify-between px-4 py-2 border-b border-border sticky top-0 bg-background/95 backdrop-blur z-10">
                  <span className="text-sm font-medium">
                     Encoded Token <span className="text-xs text-muted-foreground ml-1">(Paste here)</span>
                  </span>
                  <div className="flex items-center gap-2">
                     <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => copyToClipboard(token)}
                        title="Copy to clipboard"
                     >
                        <Copy className="h-3.5 w-3.5" />
                     </Button>
                  </div>
               </div>
               <div className="flex-1 relative bg-background overflow-hidden">
                  {/* Colored visual layout overlaying textarea mechanics */}
                  <div
                     ref={overlayRef}
                     className="absolute inset-0 pointer-events-none p-4 pr-5 overflow-hidden font-mono text-sm leading-relaxed whitespace-pre-wrap break-all"
                  >
                     {decoded.headerRaw && <span className="text-red-500 dark:text-red-400">{decoded.headerRaw}</span>}
                     {decoded.payloadRaw && <span className="text-foreground">.</span>}
                     {decoded.payloadRaw && (
                        <span className="text-purple-500 dark:text-purple-400">{decoded.payloadRaw}</span>
                     )}
                     {decoded.signatureRaw && <span className="text-foreground">.</span>}
                     {decoded.signatureRaw && (
                        <span className="text-cyan-500 dark:text-cyan-400">{decoded.signatureRaw}</span>
                     )}
                  </div>
                  <Textarea
                     value={token}
                     onChange={(e) => setToken(e.target.value)}
                     onScroll={(e) => {
                        if (overlayRef.current) overlayRef.current.scrollTop = e.currentTarget.scrollTop;
                     }}
                     className="w-full h-full bg-transparent text-transparent caret-foreground resize-none border-0 focus-visible:ring-0 p-4 pr-5 absolute inset-0 shadow-none font-mono text-sm leading-relaxed whitespace-pre-wrap break-all overflow-y-auto"
                     spellCheck={false}
                  />
               </div>
            </div>

            {/* Right Panel: Decoded Output */}
            <div className="flex-1 flex flex-col min-h-0 bg-background overflow-y-auto w-full max-w-full">
               <div className="flex items-center justify-between px-4 py-2 border-b border-border sticky top-0 bg-background/95 backdrop-blur z-10 w-full shrink-0">
                  <span className="text-sm font-medium">Decoded Payload</span>
               </div>

               <div className="p-4 space-y-6">
                  {/* Header */}
                  <div>
                     <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-red-500 dark:text-red-400">
                           Header
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono bg-background border border-border/50 px-1.5 py-0.5 rounded">
                           Algorithm & Token Type
                        </span>
                     </div>
                     <div className="relative border border-border/50 rounded-lg overflow-hidden bg-card">
                        <pre className="p-4 text-sm font-mono overflow-x-auto text-card-foreground">
                           {headerString || (
                              <span className="text-muted-foreground italic">Invalid or empty header</span>
                           )}
                        </pre>
                        {headerString && (
                           <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 h-6 w-6 opacity-50 hover:opacity-100"
                              onClick={() => copyToClipboard(headerString)}
                           >
                              <Copy className="h-3 w-3" />
                           </Button>
                        )}
                     </div>
                  </div>

                  {/* Payload */}
                  <div>
                     <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-purple-500 dark:text-purple-400">
                           Payload
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono bg-background border border-border/50 px-1.5 py-0.5 rounded">
                           Data
                        </span>
                     </div>
                     <div className="relative border border-border/50 rounded-lg overflow-hidden bg-card mb-4">
                        <pre className="p-4 text-sm font-mono overflow-x-auto text-card-foreground">
                           {payloadString || (
                              <span className="text-muted-foreground italic">Invalid or empty payload</span>
                           )}
                        </pre>
                        {payloadString && (
                           <Button
                              variant="ghost"
                              size="icon"
                              className="absolute top-2 right-2 h-6 w-6 opacity-50 hover:opacity-100"
                              onClick={() => copyToClipboard(payloadString)}
                           >
                              <Copy className="h-3 w-3" />
                           </Button>
                        )}
                     </div>

                     {/* Claims Inspector */}
                     {payload && (iat || exp || sub || nbf) && (
                        <div className="border border-border/50 rounded-lg overflow-hidden mt-4">
                           <div className="px-3 py-2 bg-background border-b border-border/50 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                              <FileJson className="w-3.5 h-3.5" /> Known Claims
                           </div>
                           <div className="divide-y divide-border/30 text-sm">
                              {sub && (
                                 <div className="grid grid-cols-3 p-3 gap-2 items-start hover:bg-muted/10">
                                    <div className="font-mono text-xs font-semibold">sub</div>
                                    <div className="col-span-2 text-foreground font-mono break-all">{sub}</div>
                                 </div>
                              )}
                              {iat && (
                                 <div className="grid grid-cols-3 p-3 gap-2 items-start hover:bg-muted/10">
                                    <div className="font-mono text-xs font-semibold">
                                       iat
                                       <br />
                                       <span className="text-[10px] font-sans text-muted-foreground font-normal">
                                          Issued At
                                       </span>
                                    </div>
                                    <div className="col-span-2">
                                       <div className="font-medium text-foreground" suppressHydrationWarning>
                                          {formatTimestamp(iat).formatted}
                                       </div>
                                       <div className="text-xs text-muted-foreground" suppressHydrationWarning>
                                          {formatTimestamp(iat).relative}
                                       </div>
                                    </div>
                                 </div>
                              )}
                              {nbf && (
                                 <div className="grid grid-cols-3 p-3 gap-2 items-start hover:bg-muted/10">
                                    <div className="font-mono text-xs font-semibold">
                                       nbf
                                       <br />
                                       <span className="text-[10px] font-sans text-muted-foreground font-normal">
                                          Not Before
                                       </span>
                                    </div>
                                    <div className="col-span-2">
                                       <div className="font-medium text-foreground" suppressHydrationWarning>
                                          {formatTimestamp(nbf).formatted}
                                       </div>
                                       <div className="text-xs text-muted-foreground" suppressHydrationWarning>
                                          {formatTimestamp(nbf).relative}
                                       </div>
                                    </div>
                                 </div>
                              )}
                              {exp && (
                                 <div className="grid grid-cols-3 p-3 gap-2 items-start hover:bg-muted/10">
                                    <div className="font-mono text-xs font-semibold">
                                       exp
                                       <br />
                                       <span className="text-[10px] font-sans text-muted-foreground font-normal">
                                          Expiration Time
                                       </span>
                                    </div>
                                    <div className="col-span-2">
                                       <div className="font-medium text-foreground" suppressHydrationWarning>
                                          {formatTimestamp(exp).formatted}
                                       </div>
                                       <div
                                          className={`text-xs ${formatTimestamp(exp).isExpired ? 'text-red-500 font-bold' : 'text-emerald-500'}`}
                                          suppressHydrationWarning
                                       >
                                          {formatTimestamp(exp).relative}
                                       </div>
                                    </div>
                                 </div>
                              )}
                           </div>
                        </div>
                     )}
                  </div>

                  {/* Signature */}
                  <div>
                     <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-cyan-500 dark:text-cyan-400">
                           Signature
                        </span>
                        <span className="text-[10px] text-muted-foreground font-mono bg-background border border-border/50 px-1.5 py-0.5 rounded">
                           Verify Signature
                        </span>
                     </div>
                     <div className="border border-border/50 rounded-lg bg-card p-3 text-sm font-mono text-muted-foreground break-all">
                        {decoded.signatureRaw || 'No signature found'}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
