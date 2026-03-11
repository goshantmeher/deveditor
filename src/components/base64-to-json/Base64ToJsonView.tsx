'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FileCode2, Copy, FileCheck2, Trash2, CheckCircle2, FlaskConical, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { EditorPanel } from '@/components/json-editor/EditorPanel';
import { DEFAULT_TEXT_EDITOR_CONFIG, DEFAULT_JSON_DATA, EDITOR_TYPES } from '@/constants/editor';
import { EditorConfig } from '@/types/editor';
import { usePersistence } from '@/contexts/PersistenceContext';
import { STORAGE_KEYS } from '@/constants/storage';

function decodeBase64ToText(b64: string): { text: string; error?: string } {
   try {
      if (!b64 || !b64.trim()) return { text: '' };
      const cleaned = b64.replace(/\s/g, '');
      const binary = atob(cleaned);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
         bytes[i] = binary.charCodeAt(i);
      }
      return { text: new TextDecoder('utf-8').decode(bytes) };
   } catch {
      return { text: '', error: 'Invalid Base64 string' };
   }
}

function encodeTextToBase64(text: string): string {
   try {
      const bytes = new TextEncoder().encode(text);
      let binary = '';
      for (let i = 0; i < bytes.length; i++) {
         binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
   } catch {
      return '';
   }
}

export function Base64ToJsonView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [base64Input, setBase64Input] = useState('');
   const [decodeError, setDecodeError] = useState<string | null>(null);

   const [jsonData, setJsonData] = useState<string | unknown>(DEFAULT_JSON_DATA);
   const [jsonConfig, setJsonConfig] = useState<EditorConfig>(DEFAULT_TEXT_EDITOR_CONFIG);
   const originalJsonRef = useRef<unknown>(undefined);

   const [copied, setCopied] = useState(false);

   const isProgrammaticUpdate = useRef(false);

   // Load persistence
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const key = STORAGE_KEYS.BASE64_TO_JSON_INPUT || 'deveditor-base64-to-json-input';
         const stored = localStorage.getItem(key);
         if (stored) {
            setBase64Input(stored);
         }
      }
   }, [isPersistenceEnabled]);

   // Save persistence
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      const key = STORAGE_KEYS.BASE64_TO_JSON_INPUT || 'deveditor-base64-to-json-input';
      localStorage.setItem(key, base64Input);
   }, [base64Input, isPersistenceEnabled]);

   // Handle Base64 Text Changes -> Update JSON
   const handleBase64Change = (val: string) => {
      setBase64Input(val);

      if (!val.trim()) {
         setDecodeError(null);
         isProgrammaticUpdate.current = true;
         setJsonData(DEFAULT_JSON_DATA);
         return;
      }

      const { text, error } = decodeBase64ToText(val);
      if (error) {
         setDecodeError(error);
         return;
      }

      setDecodeError(null);
      
      isProgrammaticUpdate.current = true;
      setJsonData(text);
   };

   // Handle JSON Editor Changes -> Update Base64
   const handleJsonChange = (val: string | unknown) => {
      setJsonData(val);

      if (isProgrammaticUpdate.current) {
         isProgrammaticUpdate.current = false;
         return; // We pushed this specifically, avoid echo
      }

      let textToEncode = '';
      if (typeof val === 'string') {
         textToEncode = val;
      } else {
         try {
            textToEncode = JSON.stringify(val, null, 2);
         } catch {
            // Un-stringify-able object
         }
      }

      if (textToEncode.trim()) {
         const newB64 = encodeTextToBase64(textToEncode);
         setBase64Input(newB64);
         setDecodeError(null);
      } else {
         setBase64Input('');
         setDecodeError(null);
      }
   };

   const loadSample = () => {
      const sampleObj = {
         claims: {
            "sub": "user_id_123",
            "role": "admin",
            "iat": 1716942023,
         },
         context: "DevEditor Debug"
      };
      const sampleStr = JSON.stringify(sampleObj, null, 2);
      const encoded = encodeTextToBase64(sampleStr);
      
      setBase64Input(encoded);
      isProgrammaticUpdate.current = true;
      setJsonData(sampleStr);
      setDecodeError(null);
   };

   const handleCopy = () => {
      if (!base64Input) return;
      navigator.clipboard.writeText(base64Input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
   };

   return (
      <div className="w-full flex-1 md:h-full flex flex-col bg-background border border-border rounded-xl shadow-sm overflow-hidden">
         {/* Main Toolbar */}
         <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-border bg-background shrink-0">
            <div className="flex items-center gap-2 text-foreground">
               <FileCode2 className="h-4 w-4 text-blue-500" />
               <span className="text-sm font-semibold">Base64 to JSON</span>
            </div>
            
            <div className="flex items-center gap-2">
               <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider">
                  <FileCheck2 className="w-3 h-3" /> Fully Local
               </div>

               {!base64Input && (
                  <Button
                     variant="ghost"
                     size="sm"
                     onClick={loadSample}
                     className="h-8 text-xs text-muted-foreground hover:text-foreground"
                  >
                     <FlaskConical className="w-4 h-4 mr-1.5" />
                     Sample
                  </Button>
               )}

               {base64Input && (
                  <Button
                     variant="ghost"
                     size="sm"
                     onClick={() => handleBase64Change('')}
                     className="h-8 text-xs text-muted-foreground hover:text-foreground"
                  >
                     <Trash2 className="w-4 h-4 mr-1.5" />
                     Clear
                  </Button>
               )}
            </div>
         </div>

         {/* Editor Container */}
         <div className="flex-1 flex flex-col min-h-0 relative overflow-y-auto scrollbar-thin md:flex-row">
            {/* Split Left (Base64) */}
            <div className="min-h-[300px] h-[300px] md:h-full md:min-h-0 md:w-1/2 flex flex-col border-b md:border-b-0 md:border-r border-border shrink-0 md:shrink">
               <div className="px-4 border-b border-border bg-muted/30 flex items-center justify-between h-10 shrink-0 relative z-10">
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Base64 Encoded JSON</span>
                  {base64Input && (
                     <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCopy}
                        className="h-6 px-2 text-[10px] uppercase font-bold text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 transition-colors"
                     >
                        {copied ? <CheckCircle2 className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                        {copied ? 'Copied' : 'Copy'}
                     </Button>
                  )}
               </div>
               
               <div className="relative flex-1 bg-background">
                  {decodeError && base64Input.length > 0 && (
                     <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-3 py-2 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg text-xs font-semibold animate-in fade-in slide-in-from-bottom-2">
                        <AlertCircle className="w-4 h-4" />
                        {decodeError}
                     </div>
                  )}
                  <Textarea
                     value={base64Input}
                     onChange={(e) => handleBase64Change(e.target.value)}
                     placeholder="Paste Base64 encoded JSON string here..."
                     className="flex-1 w-full h-full resize-none border-0 focus-visible:ring-0 rounded-none font-mono text-sm p-4 pt-4 leading-relaxed tracking-wide shadow-none"
                     suppressHydrationWarning
                  />
               </div>
            </div>

            {/* Split Right (JSON Editor) */}
            <div className="min-h-[400px] h-[400px] md:h-full md:min-h-0 md:w-1/2 flex flex-col shrink-0 md:shrink">
               {/* Wrapped in flexible full-height EditorPanel wrapper logic native to JsonEditor */}
               <EditorPanel
                  data={jsonData}
                  onDataChange={handleJsonChange}
                  config={jsonConfig}
                  onConfigChange={(newConfig) => {
                     if (jsonConfig.editorType !== newConfig.editorType) {
                        setJsonConfig(newConfig.editorType === EDITOR_TYPES.text ? DEFAULT_TEXT_EDITOR_CONFIG : {
                           ...DEFAULT_TEXT_EDITOR_CONFIG,
                           editorType: EDITOR_TYPES.json
                        });
                     } else {
                        setJsonConfig(newConfig);
                     }
                  }}
                  originalData={originalJsonRef.current}
                  onOriginalDataChange={(v) => originalJsonRef.current = v}
                  panelLabel="Decoded JSON Panel"
               />
            </div>
         </div>
      </div>
   );
}
