'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Copy, CheckCircle2, FlaskConical, RotateCcw, UploadCloud, Download, FileJson, Type, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePersistence } from '@/contexts/PersistenceContext';
import { STORAGE_KEYS } from '@/constants/storage';

interface Base64FileState {
   mode: 'encode' | 'decode';
   encodedOutput: string;
   decodedFileName: string;
   decodedMimeType: string;
}

const DEFAULT_STATE: Base64FileState = {
   mode: 'encode',
   encodedOutput: '',
   decodedFileName: '',
   decodedMimeType: '',
};

export function Base64FileView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [state, setState] = useState<Base64FileState>(DEFAULT_STATE);
   const [fileInfo, setFileInfo] = useState<{ name: string; size: number; base64: string } | null>(null);
   const [decodeInput, setDecodeInput] = useState('');
   
   const [isCopied, setIsCopied] = useState(false);
   const [isDragging, setIsDragging] = useState(false);
   const fileInputRef = useRef<HTMLInputElement>(null);

   // Load state from localStorage
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const stored = localStorage.getItem(STORAGE_KEYS.BASE64_FILE_INPUT);
         if (stored) {
            try {
               const parsed = JSON.parse(stored);
               setState(parsed.state || DEFAULT_STATE);
               setDecodeInput(parsed.decodeInput || '');
               setFileInfo(parsed.fileInfo || null);
            } catch {
               // Ignore
            }
         }
      }
   }, [isPersistenceEnabled]);

   // Save state
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      localStorage.setItem(
         STORAGE_KEYS.BASE64_FILE_INPUT,
         JSON.stringify({ state, decodeInput, fileInfo })
      );
   }, [state, decodeInput, fileInfo, isPersistenceEnabled]);


   const formatFileSize = (bytes: number) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
   };

   // Encode Mode Handlers
   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      processFile(file);
   };

   const processFile = (file: File) => {
      const reader = new FileReader();
      reader.onload = (event) => {
         const result = event.target?.result as string;
         setFileInfo({ name: file.name, size: file.size, base64: result });
      };
      reader.readAsDataURL(file);
   };

   const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
   };

   const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
   };

   const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) processFile(file);
   };

   // Decode Mode Handlers
   const handleDownload = () => {
      if (!decodeInput.trim()) return;

      try {
         // handle input with or without data URI prefix
         let dataUri = decodeInput.trim();
         
         // If it doesn't look like a data URI, try to guess or just use octet-stream
         if (!dataUri.startsWith('data:')) {
            // Very naive check for common base64 image starts like /9j/ for jpeg
            const isJpeg = dataUri.startsWith('/9j/');
            const isPng = dataUri.startsWith('iVBORw0KGgo');
            let mime = 'application/octet-stream';
            if (isJpeg) { mime = 'image/jpeg'; }
            if (isPng) { mime = 'image/png'; }
            
            dataUri = `data:${mime};base64,${dataUri}`;
         }

         const link = document.createElement('a');
         link.href = dataUri;
         
         // Extract extension if possible
         const match = dataUri.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/);
         let mime = 'application/octet-stream';
         if (match) {
            mime = match[1];
         }
         
         // Generate generic name
         const ext = mime.split('/')[1] || 'bin';
         link.download = `decoded_file.${ext}`;
         
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
      } catch (e) {
         console.error('Download failed', e);
         alert('Failed to decode valid Base64 string for download.');
      }
   };

   const handleClear = () => {
      setFileInfo(null);
      setDecodeInput('');
      if (fileInputRef.current) fileInputRef.current.value = '';
   };

   const copyOutput = async () => {
      if (!fileInfo?.base64) return;
      try {
         await navigator.clipboard.writeText(fileInfo.base64);
         setIsCopied(true);
         setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
         console.error('Failed to copy', err);
      }
   };

   return (
      <div className="w-full h-full flex flex-col bg-background border border-border overflow-hidden">
         {/* Toolbar */}
         <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-between shrink-0 hover:bg-muted/30 transition-colors">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <FileJson className="w-4 h-4 text-indigo-500" />
               </div>
               <h1 className="font-bold text-sm tracking-tight text-foreground">Base64 File Encoder/Decoder</h1>
            </div>
            <div className="flex gap-2">
               {state.mode === 'encode' && !fileInfo && (
                  <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5 text-muted-foreground hover:text-foreground" onClick={() => {
                     setFileInfo({
                        name: 'hello_world.txt',
                        size: 13,
                        base64: 'data:text/plain;base64,SGVsbG8gV29ybGQh'
                     });
                  }}>
                     <FlaskConical className="w-3.5 h-3.5" /> Sample
                  </Button>
               )}
               {state.mode === 'decode' && !decodeInput && (
                  <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5 text-muted-foreground hover:text-foreground" onClick={() => {
                     setDecodeInput('data:text/plain;base64,SGVsbG8gV29ybGQh');
                  }}>
                     <FlaskConical className="w-3.5 h-3.5" /> Sample
                  </Button>
               )}
               <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5 text-muted-foreground hover:text-foreground" onClick={handleClear}>
                  <RotateCcw className="w-3.5 h-3.5" /> Clear
               </Button>
            </div>
         </div>

         {/* Content */}
         <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
               <Tabs defaultValue="encode" onValueChange={(v) => setState({ ...state, mode: v as 'encode' | 'decode' })} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8 p-1 bg-muted/30 rounded-2xl h-14">
                     <TabsTrigger value="encode" className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-indigo-500">
                        <UploadCloud className="w-4 h-4 mr-2" /> Encode File
                     </TabsTrigger>
                     <TabsTrigger value="decode" className="rounded-xl data-[state=active]:bg-background data-[state=active]:shadow-sm data-[state=active]:text-indigo-500">
                        <Download className="w-4 h-4 mr-2" /> Decode Back to File
                     </TabsTrigger>
                  </TabsList>

                  <TabsContent value="encode" className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                     {!fileInfo ? (
                        <div 
                           className={`border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ${isDragging ? 'border-indigo-500 bg-indigo-500/5 scale-[1.02]' : 'border-border hover:border-border/80 hover:bg-muted/10'}`}
                           onDragOver={handleDragOver}
                           onDragLeave={handleDragLeave}
                           onDrop={handleDrop}
                        >
                           <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mx-auto mb-6 shadow-inner">
                              <UploadCloud className="w-8 h-8 text-indigo-500" />
                           </div>
                           <h3 className="text-xl font-bold mb-2 text-foreground">Drag & drop your file here</h3>
                           <p className="text-muted-foreground text-sm mb-6">Any file type (Images, PDFs, Zips, Audio, etc.)</p>
                           <div className="flex justify-center">
                              <Button 
                                 onClick={() => fileInputRef.current?.click()}
                                 className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 rounded-xl px-8"
                              >
                                 Browse Files
                              </Button>
                              <input 
                                 type="file" 
                                 className="hidden" 
                                 ref={fileInputRef}
                                 onChange={handleFileSelect}
                              />
                           </div>
                           <p className="mt-8 text-xs font-medium text-muted-foreground uppercase tracking-widest flex items-center justify-center gap-2">
                              <ShieldCheck className="w-4 h-4 text-emerald-500" /> 100% Client-Side Processing
                           </p>
                        </div>
                     ) : (
                        <div className="space-y-4">
                           <div className="flex items-center justify-between p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 bg-background rounded-xl flex items-center justify-center shadow-sm">
                                    <FileJson className="w-5 h-5 text-emerald-500" />
                                 </div>
                                 <div className="overflow-hidden">
                                    <p className="text-sm font-bold text-foreground truncate max-w-[200px] sm:max-w-md">{fileInfo.name}</p>
                                    <p className="text-[11px] text-muted-foreground uppercase tracking-wider">{formatFileSize(fileInfo.size)}</p>
                                 </div>
                              </div>
                              <Button variant="outline" size="sm" onClick={() => setFileInfo(null)} className="rounded-lg h-9">
                                 Change File
                              </Button>
                           </div>

                           <div className="relative group">
                              <Textarea 
                                 value={fileInfo.base64}
                                 readOnly
                                 className="h-64 font-mono text-xs bg-muted/20 border-border rounded-2xl resize-none p-4 focus-visible:ring-indigo-500/30"
                              />
                              <Button 
                                 size="sm" 
                                 className="absolute top-4 right-4 bg-background border border-border text-foreground hover:bg-muted/50 rounded-xl px-4 shadow-sm"
                                 onClick={copyOutput}
                              >
                                 {isCopied ? <><CheckCircle2 className="w-3.5 h-3.5 mr-2 text-emerald-500" /> Copied</> : <><Copy className="w-3.5 h-3.5 mr-2" /> Copy Base64</>}
                              </Button>
                           </div>
                        </div>
                     )}
                  </TabsContent>

                  <TabsContent value="decode" className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                     <div className="flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                           <h3 className="text-sm font-bold flex items-center gap-2 text-foreground">
                              <Type className="w-4 h-4 text-indigo-500" /> Paste Base64 String
                           </h3>
                           <p className="text-[10px] uppercase tracking-wider text-muted-foreground bg-muted/50 px-2 py-1 rounded">With or without Data URI</p>
                        </div>
                        <Textarea 
                           value={decodeInput}
                           onChange={(e) => setDecodeInput(e.target.value)}
                           className="h-64 font-mono text-xs bg-background border-2 border-border/60 hover:border-border/80 focus-visible:border-indigo-500/50 rounded-3xl resize-none p-6 shadow-inner transition-colors"
                           placeholder="e.g. data:image/png;base64,iVBORw0KGgo..."
                        />
                        <div className="flex justify-end gap-3 mt-4">
                           <Button 
                              size="lg"
                              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-lg shadow-indigo-500/20 px-8"
                              onClick={handleDownload}
                              disabled={!decodeInput.trim()}
                           >
                              <Download className="w-4 h-4 mr-2" /> Download Original File
                           </Button>
                        </div>
                     </div>
                  </TabsContent>
               </Tabs>
            </div>
         </div>
      </div>
   );
}
