'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Copy, Check, ArrowRightLeft, WrapText, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Direction = 'encode' | 'decode';
type Charset = 'utf-8' | 'ascii' | 'iso-8859-1';

function isValidBase64(str: string): boolean {
   if (!str || str.trim().length === 0) return false;
   // Strip whitespace for checking
   const cleaned = str.replace(/\s/g, '');
   if (cleaned.length === 0) return false;
   return /^[A-Za-z0-9+/]*={0,2}$/.test(cleaned) && cleaned.length % 4 === 0;
}

function encodeText(
   text: string,
   charset: Charset,
   wrapLines: boolean
): string {
   try {
      let bytes: Uint8Array;

      if (charset === 'utf-8') {
         bytes = new globalThis.TextEncoder().encode(text);
      } else if (charset === 'ascii') {
         bytes = new Uint8Array(text.length);
         for (let i = 0; i < text.length; i++) {
            bytes[i] = text.charCodeAt(i) & 0x7f;
         }
      } else {
         // iso-8859-1 / latin-1
         bytes = new Uint8Array(text.length);
         for (let i = 0; i < text.length; i++) {
            bytes[i] = text.charCodeAt(i) & 0xff;
         }
      }

      // Convert bytes to binary string for btoa
      let binary = '';
      for (let i = 0; i < bytes.length; i++) {
         binary += String.fromCharCode(bytes[i]);
      }
      let result = btoa(binary);

      if (wrapLines) {
         // MIME-style 76-character line wrapping
         result = result.replace(/(.{76})/g, '$1\n');
      }

      return result;
   } catch {
      return '⚠️ Encoding error: input contains characters not representable in the selected charset.';
   }
}

function decodeBase64(b64: string, charset: Charset): string {
   try {
      const cleaned = b64.replace(/\s/g, '');
      const binary = atob(cleaned);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
         bytes[i] = binary.charCodeAt(i);
      }

      if (charset === 'utf-8') {
         return new TextDecoder('utf-8').decode(bytes);
      } else if (charset === 'ascii') {
         return new TextDecoder('ascii').decode(bytes);
      } else {
         return new TextDecoder('iso-8859-1').decode(bytes);
      }
   } catch {
      return '⚠️ Decoding error: invalid Base64 string.';
   }
}

function formatBytes(bytes: number): string {
   if (bytes === 0) return '0 B';
   const sizes = ['B', 'KB', 'MB'];
   const i = Math.floor(Math.log(bytes) / Math.log(1024));
   return `${(bytes / Math.pow(1024, i)).toFixed(i > 0 ? 1 : 0)} ${sizes[i]}`;
}

export function TextEncoder() {
   const [input, setInput] = useState('');
   const [output, setOutput] = useState('');
   const [direction, setDirection] = useState<Direction>('encode');
   const [charset, setCharset] = useState<Charset>('utf-8');
   const [wrapLines, setWrapLines] = useState(false);
   const [copied, setCopied] = useState(false);
   const [autoDetected, setAutoDetected] = useState(false);
   const isUserSwitch = useRef(false);

   // Process input whenever it changes
   useEffect(() => {
      if (!input.trim()) {
         setOutput('');
         return;
      }

      if (direction === 'encode') {
         setOutput(encodeText(input, charset, wrapLines));
      } else {
         setOutput(decodeBase64(input, charset));
      }
   }, [input, direction, charset, wrapLines]);

   const handleInputChange = useCallback(
      (value: string) => {
         setInput(value);

         // Auto-detect: if user pastes valid Base64 while in encode mode,
         // and it's a substantial string, switch to decode mode
         if (
            !isUserSwitch.current &&
            direction === 'encode' &&
            value.length > 8 &&
            isValidBase64(value)
         ) {
            setDirection('decode');
            setAutoDetected(true);
            setTimeout(() => setAutoDetected(false), 3000);
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
      // Swap output to input
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

   return (
      <div className="flex flex-col h-full">
         {/* Toolbar */}
         <div className="flex flex-wrap items-center gap-3 px-4 py-2.5 border-b border-border/30 bg-muted/10">
            {/* Direction Toggle */}
            <div className="flex items-center gap-2">
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

               {autoDetected && (
                  <span className="text-[10px] text-emerald-400 animate-pulse flex items-center gap-1">
                     <Info className="h-3 w-3" />
                     Auto-detected Base64 input
                  </span>
               )}
            </div>

            {/* Charset */}
            <div className="flex items-center gap-1.5">
               <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  Charset
               </span>
               <select
                  value={charset}
                  onChange={(e) => setCharset(e.target.value as Charset)}
                  className="h-7 px-2 text-xs rounded-md border border-border/40 bg-background text-foreground cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary/50"
               >
                  <option value="utf-8">UTF-8</option>
                  <option value="ascii">ASCII</option>
                  <option value="iso-8859-1">Latin-1</option>
               </select>
            </div>

            {/* Line Wrap Toggle */}
            {direction === 'encode' && (
               <button
                  onClick={() => setWrapLines((prev) => !prev)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs transition-all border ${
                     wrapLines
                        ? 'bg-primary/15 text-primary border-primary/30'
                        : 'text-muted-foreground border-border/30 hover:text-foreground'
                  }`}
                  title="MIME-style 76-char line wrapping"
               >
                  <WrapText className="h-3 w-3" />
                  Wrap Lines
               </button>
            )}

            {/* Swap Button */}
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
         </div>

         {/* Editor Panels */}
         <div className="flex-1 flex flex-col md:flex-row min-h-0">
            {/* Input Panel */}
            <div className="flex flex-col md:w-1/2 min-h-0 border-r border-border/30">
               <div className="px-3 py-1.5 border-b border-border/30 bg-muted/20 shrink-0 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <div
                        className={`w-2 h-2 rounded-full ${direction === 'encode' ? 'bg-emerald-400/80' : 'bg-amber-400/80'}`}
                     />
                     <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {direction === 'encode' ? 'Plain Text' : 'Base64 Input'}
                     </span>
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                     {input.length > 0 &&
                        `${input.length} chars · ${formatBytes(inputBytes)}`}
                  </span>
               </div>
               <textarea
                  value={input}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder={
                     direction === 'encode'
                        ? 'Type or paste text to encode...'
                        : 'Paste Base64 string to decode...'
                  }
                  className="flex-1 w-full p-4 bg-background text-foreground text-sm font-mono resize-none focus:outline-none placeholder:text-muted-foreground/50 min-h-[200px]"
                  spellCheck={false}
               />
            </div>

            {/* Output Panel */}
            <div className="flex flex-col md:w-1/2 min-h-0">
               <div className="px-3 py-1.5 border-b border-border/30 bg-muted/20 shrink-0 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <div
                        className={`w-2 h-2 rounded-full ${direction === 'encode' ? 'bg-blue-400/80' : 'bg-green-400/80'}`}
                     />
                     <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {direction === 'encode'
                           ? 'Base64 Output'
                           : 'Decoded Text'}
                     </span>
                  </div>
                  <div className="flex items-center gap-2">
                     {output.length > 0 && (
                        <span className="text-[10px] text-muted-foreground">
                           {output.length} chars · {formatBytes(outputBytes)}
                           {direction === 'encode' && inputBytes > 0 && (
                              <span className="ml-1 text-amber-400">
                                 (+
                                 {Math.round(
                                    ((outputBytes - inputBytes) / inputBytes) *
                                       100
                                 )}
                                 %)
                              </span>
                           )}
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
                  className="flex-1 w-full p-4 bg-muted/5 text-foreground text-sm font-mono resize-none focus:outline-none placeholder:text-muted-foreground/50 min-h-[200px]"
                  spellCheck={false}
               />
            </div>
         </div>
      </div>
   );
}
