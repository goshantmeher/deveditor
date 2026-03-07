'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Copy, Check, ArrowRightLeft, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

function standardToUrlSafe(b64: string): string {
   return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function urlSafeToStandard(urlSafe: string): string {
   let result = urlSafe.replace(/-/g, '+').replace(/_/g, '/');
   // Add padding
   const pad = result.length % 4;
   if (pad === 2) result += '==';
   else if (pad === 3) result += '=';
   return result;
}

function formatBytes(bytes: number): string {
   if (bytes === 0) return '0 B';
   const sizes = ['B', 'KB', 'MB'];
   const i = Math.floor(Math.log(bytes) / Math.log(1024));
   return `${(bytes / Math.pow(1024, i)).toFixed(i > 0 ? 1 : 0)} ${sizes[i]}`;
}

type Direction = 'encode' | 'decode';

export function UrlSafeEncoder() {
   const [input, setInput] = useState('');
   const [output, setOutput] = useState('');
   const [direction, setDirection] = useState<Direction>('encode');
   const [copied, setCopied] = useState(false);
   const isUserSwitch = useRef(false);

   useEffect(() => {
      if (!input.trim()) {
         setOutput('');
         return;
      }

      try {
         if (direction === 'encode') {
            // Text → URL-safe Base64
            const bytes = new globalThis.TextEncoder().encode(input);
            let binary = '';
            for (let i = 0; i < bytes.length; i++) {
               binary += String.fromCharCode(bytes[i]);
            }
            const standardB64 = btoa(binary);
            setOutput(standardToUrlSafe(standardB64));
         } else {
            // URL-safe Base64 → Text
            const standardB64 = urlSafeToStandard(input.replace(/\s/g, ''));
            const binary = atob(standardB64);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
               bytes[i] = binary.charCodeAt(i);
            }
            setOutput(new TextDecoder('utf-8').decode(bytes));
         }
      } catch {
         setOutput(direction === 'encode' ? '⚠️ Encoding error' : '⚠️ Invalid URL-safe Base64 string');
      }
   }, [input, direction]);

   const handleInputChange = useCallback(
      (value: string) => {
         setInput(value);

         // Auto-detect: if user pastes something that looks like URL-safe base64 while in encode mode
         if (
            !isUserSwitch.current &&
            direction === 'encode' &&
            value.length > 8 &&
            /^[A-Za-z0-9_-]+$/.test(value.replace(/\s/g, ''))
         ) {
            // Check if it decodes cleanly
            try {
               const standard = urlSafeToStandard(value.replace(/\s/g, ''));
               atob(standard);
               setDirection('decode');
            } catch {
               // Not valid, stay in encode mode
            }
         }
      },
      [direction]
   );

   const handleToggleDirection = useCallback(() => {
      isUserSwitch.current = true;
      setDirection((prev) => (prev === 'encode' ? 'decode' : 'encode'));
      setInput('');
      setOutput('');
      setTimeout(() => {
         isUserSwitch.current = false;
      }, 100);
   }, []);

   const handleSwapContent = useCallback(() => {
      const newInput = output;
      isUserSwitch.current = true;
      setDirection((prev) => (prev === 'encode' ? 'decode' : 'encode'));
      setInput(newInput);
      setTimeout(() => {
         isUserSwitch.current = false;
      }, 100);
   }, [output]);

   const handleCopy = useCallback(async () => {
      if (!output) return;
      try {
         await navigator.clipboard.writeText(output);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      } catch {
         console.error('Failed to copy');
      }
   }, [output]);

   const inputBytes = new globalThis.TextEncoder().encode(input).length;
   const outputBytes = new globalThis.TextEncoder().encode(output).length;

   // Compute diff display for standard vs URL-safe
   const standardPreview =
      direction === 'encode' && output
         ? (() => {
              try {
                 const bytes = new globalThis.TextEncoder().encode(input);
                 let binary = '';
                 for (let i = 0; i < bytes.length; i++) {
                    binary += String.fromCharCode(bytes[i]);
                 }
                 return btoa(binary);
              } catch {
                 return '';
              }
           })()
         : '';

   return (
      <div className="flex flex-col h-full">
         {/* Toolbar */}
         <div className="flex flex-wrap items-center gap-3 px-4 py-2.5 border-b border-border bg-background">
            <button
               onClick={handleToggleDirection}
               className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  direction === 'encode'
                     ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                     : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
               }`}
            >
               <ArrowRightLeft className="h-3 w-3" />
               {direction === 'encode' ? 'Encode' : 'Decode'}
            </button>

            {output && (
               <button
                  onClick={handleSwapContent}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs text-muted-foreground border border-border/30 hover:text-foreground hover:border-border/50 transition-all"
                  title="Swap output → input and reverse direction"
               >
                  <ArrowRightLeft className="h-3 w-3" />
                  Swap
               </button>
            )}
            {/* Compact URL-safe info hint */}
            <Tooltip>
               <TooltipTrigger asChild>
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1.5 ml-1 cursor-help">
                     <Info className="h-3 w-3 shrink-0" />
                     <span>
                        <code className="text-red-400/70 line-through">+</code>
                        <span className="mx-0.5">→</span>
                        <code className="text-green-400/70">-</code>
                        <span className="mx-1.5 text-border">·</span>
                        <code className="text-red-400/70 line-through">/</code>
                        <span className="mx-0.5">→</span>
                        <code className="text-green-400/70">_</code>
                        <span className="mx-1.5 text-border">·</span>
                        <code className="text-red-400/70 line-through">=</code>
                        <span className="mx-0.5">→</span>
                        <span className="text-green-400/70 text-[9px]">removed</span>
                     </span>
                  </span>
               </TooltipTrigger>
               <TooltipContent side="bottom" className="max-w-xs text-xs">
                  URL-safe Base64 (RFC 4648) replaces characters unsafe in URLs: <strong>+</strong> becomes{' '}
                  <strong>-</strong>, <strong>/</strong> becomes <strong>_</strong>, and <strong>=</strong> padding is
                  removed. Safe for URLs, query params, and filenames.
               </TooltipContent>
            </Tooltip>
         </div>

         {/* Editor Panels */}
         <div className="flex-1 flex flex-col md:flex-row min-h-0">
            {/* Input Panel */}
            <div className="flex flex-col md:w-1/2 min-h-0 border-r border-border">
               <div className="px-3 py-1.5 border-b min-h-[37px] border-border bg-muted/20 shrink-0 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <div
                        className={`w-2 h-2 rounded-full ${direction === 'encode' ? 'bg-emerald-400/80' : 'bg-amber-400/80'}`}
                     />
                     <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {direction === 'encode' ? 'Plain Text' : 'URL-safe Base64'}
                     </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                     {input.length > 0 && `${input.length} chars · ${formatBytes(inputBytes)}`}
                  </span>
               </div>
               <textarea
                  value={input}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={
                     direction === 'encode' ? 'Type or paste text to encode...' : 'Paste URL-safe Base64 to decode...'
                  }
                  className="flex-1 w-full p-4 bg-background text-foreground text-sm font-mono resize-none focus:outline-none placeholder:text-muted-foreground/50 min-h-[200px]"
                  spellCheck={false}
               />
            </div>

            {/* Output Panel */}
            <div className="flex flex-col md:w-1/2 min-h-0">
               <div className="px-3 py-1.5 border-b border-border bg-muted/20 shrink-0 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <div
                        className={`w-2 h-2 rounded-full ${direction === 'encode' ? 'bg-blue-400/80' : 'bg-green-400/80'}`}
                     />
                     <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {direction === 'encode' ? 'URL-safe Base64' : 'Decoded Text'}
                     </span>
                  </div>
                  <div className="flex items-center gap-2">
                     {output.length > 0 && (
                        <span className="text-[10px] text-muted-foreground">
                           {output.length} chars · {formatBytes(outputBytes)}
                        </span>
                     )}
                     <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 gap-1 text-xs"
                        onClick={handleCopy}
                        disabled={!output}
                     >
                        {copied ? (
                           <>
                              <Check className="h-3 w-3 text-green-500" />
                              <span className="text-green-500">Copied!</span>
                           </>
                        ) : (
                           <>
                              <Copy className="h-3 w-3" />
                              Copy
                           </>
                        )}
                     </Button>
                  </div>
               </div>
               <textarea
                  value={output}
                  readOnly
                  placeholder="Output will appear here..."
                  className="flex-1 w-full p-4 bg-background text-foreground text-sm font-mono resize-none focus:outline-none placeholder:text-muted-foreground/50 min-h-[200px]"
                  spellCheck={false}
               />

               {/* Standard vs URL-safe comparison */}
               {standardPreview && standardPreview !== output && (
                  <div className="border-t border-border px-4 py-2 bg-muted/20">
                     <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mb-1">
                        Standard Base64 (for comparison)
                     </span>
                     <pre className="text-xs font-mono text-muted-foreground/70 break-all whitespace-pre-wrap">
                        {standardPreview}
                     </pre>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
