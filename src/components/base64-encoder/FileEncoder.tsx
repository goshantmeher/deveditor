'use client';

import React, { useState, useCallback, useRef } from 'react';
import { Copy, Check, Upload, X, FileIcon, Image as ImageIcon, Code, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

function formatBytes(bytes: number): string {
   if (bytes === 0) return '0 B';
   const sizes = ['B', 'KB', 'MB', 'GB'];
   const i = Math.floor(Math.log(bytes) / Math.log(1024));
   return `${(bytes / Math.pow(1024, i)).toFixed(i > 0 ? 1 : 0)} ${sizes[i]}`;
}

interface FileResult {
   name: string;
   size: number;
   type: string;
   base64: string;
   dataUri: string;
   isImage: boolean;
}

export function FileEncoder() {
   const [file, setFile] = useState<FileResult | null>(null);
   const [isDragOver, setIsDragOver] = useState(false);
   const [copied, setCopied] = useState<string | null>(null);
   const [isProcessing, setIsProcessing] = useState(false);
   const fileInputRef = useRef<HTMLInputElement>(null);

   const processFile = useCallback((f: File) => {
      setIsProcessing(true);
      const reader = new FileReader();

      reader.onload = () => {
         const dataUri = reader.result as string;
         // Extract raw base64 from data URI
         const base64 = dataUri.split(',')[1] || '';
         const isImage = f.type.startsWith('image/');

         setFile({
            name: f.name,
            size: f.size,
            type: f.type || 'application/octet-stream',
            base64,
            dataUri,
            isImage,
         });
         setIsProcessing(false);
      };

      reader.onerror = () => {
         setIsProcessing(false);
      };

      reader.readAsDataURL(f);
   }, []);

   const handleDrop = useCallback(
      (e: React.DragEvent) => {
         e.preventDefault();
         setIsDragOver(false);
         const droppedFile = e.dataTransfer.files[0];
         if (droppedFile) processFile(droppedFile);
      },
      [processFile]
   );

   const handleFileSelect = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
         const selectedFile = e.target.files?.[0];
         if (selectedFile) processFile(selectedFile);
      },
      [processFile]
   );

   const handleCopy = useCallback(async (text: string, label: string) => {
      try {
         await navigator.clipboard.writeText(text);
         setCopied(label);
         setTimeout(() => setCopied(null), 2000);
      } catch {
         console.error('Failed to copy');
      }
   }, []);

   const handleClear = useCallback(() => {
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
   }, []);

   const cssSnippet = file ? `background-image: url(${file.dataUri});` : '';

   const htmlSnippet = file ? `<img src="${file.dataUri}" alt="${file.name}" />` : '';

   return (
      <div className="flex flex-col h-full">
         {/* Drop zone / File info */}
         <div className="p-4 border-b border-border/30">
            {!file ? (
               <div
                  onDragOver={(e) => {
                     e.preventDefault();
                     setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                  className={`flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed transition-all cursor-pointer ${
                     isDragOver
                        ? 'border-primary bg-primary/5 scale-[1.01]'
                        : 'border-border/40 hover:border-border/60 bg-background'
                  }`}
                  onClick={() => fileInputRef.current?.click()}
               >
                  <div
                     className={`p-3 rounded-full transition-colors ${isDragOver ? 'bg-primary/15' : 'bg-background border border-border/20'}`}
                  >
                     <Upload className={`h-6 w-6 ${isDragOver ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="text-center">
                     <p className="text-sm font-medium text-foreground">
                        {isProcessing ? 'Processing...' : 'Drop a file here or click to browse'}
                     </p>
                     <p className="text-xs text-muted-foreground mt-1">Any file type · Images will show a preview</p>
                  </div>
                  <input ref={fileInputRef} type="file" onChange={handleFileSelect} className="hidden" />
               </div>
            ) : (
               <div className="flex items-start gap-4">
                  {/* Image Preview */}
                  {file.isImage && (
                     <div className="shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-border/30 bg-[conic-gradient(#80808020_25%,#80808010_25%_50%,#80808020_50%_75%,#80808010_75%)]">
                        <img src={file.dataUri} alt={file.name} className="w-full h-full object-contain" />
                     </div>
                  )}

                  {/* File Info */}
                  <div className="flex-1 min-w-0">
                     <div className="flex items-center gap-2 mb-1">
                        {file.isImage ? (
                           <ImageIcon className="h-4 w-4 text-purple-400 shrink-0" />
                        ) : (
                           <FileIcon className="h-4 w-4 text-blue-400 shrink-0" />
                        )}
                        <span className="text-sm font-medium text-foreground truncate">{file.name}</span>
                     </div>

                     <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
                        <span>
                           Type: <span className="text-foreground/80">{file.type}</span>
                        </span>
                        <span>
                           Size: <span className="text-foreground/80">{formatBytes(file.size)}</span>
                        </span>
                        <span>
                           Base64: <span className="text-foreground/80">{formatBytes(file.base64.length)}</span>
                           <span className="ml-1 text-amber-400">
                              (+
                              {Math.round(((file.base64.length - file.size) / file.size) * 100)}
                              %)
                           </span>
                        </span>
                     </div>
                  </div>

                  {/* Clear Button */}
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0 shrink-0" onClick={handleClear}>
                     <X className="h-4 w-4" />
                  </Button>
               </div>
            )}
         </div>

         {/* Output Sections */}
         {file && (
            <div className="flex-1 overflow-auto">
               {/* Raw Base64 */}
               <OutputSection
                  label="Raw Base64"
                  icon={<FileText className="h-3.5 w-3.5" />}
                  value={file.base64}
                  onCopy={() => handleCopy(file.base64, 'base64')}
                  isCopied={copied === 'base64'}
               />

               {/* Data URI */}
               <OutputSection
                  label="Data URI"
                  icon={<Code className="h-3.5 w-3.5" />}
                  value={file.dataUri}
                  onCopy={() => handleCopy(file.dataUri, 'datauri')}
                  isCopied={copied === 'datauri'}
               />

               {/* CSS Snippet */}
               {file.isImage && (
                  <OutputSection
                     label="CSS background-image"
                     icon={<Code className="h-3.5 w-3.5" />}
                     value={cssSnippet}
                     onCopy={() => handleCopy(cssSnippet, 'css')}
                     isCopied={copied === 'css'}
                  />
               )}

               {/* HTML Snippet */}
               {file.isImage && (
                  <OutputSection
                     label="HTML <img> tag"
                     icon={<Code className="h-3.5 w-3.5" />}
                     value={htmlSnippet}
                     onCopy={() => handleCopy(htmlSnippet, 'html')}
                     isCopied={copied === 'html'}
                  />
               )}
            </div>
         )}
      </div>
   );
}

function OutputSection({
   label,
   icon,
   value,
   onCopy,
   isCopied,
}: {
   label: string;
   icon: React.ReactNode;
   value: string;
   onCopy: () => void;
   isCopied: boolean;
}) {
   return (
      <div className="border-b border-border/20">
         <div className="flex items-center justify-between px-4 py-1.5 bg-background">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
               {icon}
               {label}
            </div>
            <Button variant="ghost" size="sm" className="h-6 gap-1 text-xs" onClick={onCopy}>
               {isCopied ? (
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
         <pre className="p-3 text-xs font-mono text-muted-foreground overflow-auto max-h-[160px] bg-background whitespace-pre-wrap break-all border-t border-border/10">
            <code>{value}</code>
         </pre>
      </div>
   );
}
