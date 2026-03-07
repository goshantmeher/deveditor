'use client';

import { useState, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Check, RotateCcw, Loader2, FileText } from 'lucide-react';
import { PdfToolSelector } from '@/components/pdf-tools/PdfToolSelector';
import { PdfDropzone } from '@/components/pdf-tools/PdfDropzone';

export function PdfToTextView() {
   const [text, setText] = useState('');
   const [fileName, setFileName] = useState('');
   const [isExtracting, setIsExtracting] = useState(false);
   const [copied, setCopied] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [pageCount, setPageCount] = useState(0);
   const textareaRef = useRef<HTMLTextAreaElement>(null);

   const handleFileSelected = useCallback(async (files: File[]) => {
      const file = files[0];
      if (!file) return;

      setIsExtracting(true);
      setError(null);
      setText('');
      setFileName(file.name);

      try {
         const pdfjsLib = await import('pdfjs-dist');
         pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
            'pdfjs-dist/build/pdf.worker.min.mjs',
            import.meta.url
         ).toString();

         const buffer = await file.arrayBuffer();
         const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
         setPageCount(pdf.numPages);

         let fullText = '';
         for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const pageText = content.items
               .map((item) => ('str' in item ? (item as { str: string }).str : ''))
               .join(' ');
            fullText += `--- Page ${i} ---\n${pageText}\n\n`;
         }

         setText(fullText.trim());
      } catch (err) {
         console.error('Text extraction failed:', err);
         setError('Failed to extract text. The PDF may be image-based or corrupted.');
      } finally {
         setIsExtracting(false);
      }
   }, []);

   const handleCopy = useCallback(async () => {
      try {
         await navigator.clipboard.writeText(text);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      } catch {
         if (textareaRef.current) {
            textareaRef.current.select();
            document.execCommand('copy');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
         }
      }
   }, [text]);

   const handleReset = () => {
      setText('');
      setFileName('');
      setError(null);
      setPageCount(0);
   };

   return (
      <div className="w-full h-full flex flex-col bg-background border border-border rounded-xl shadow-sm overflow-hidden">
         {/* Toolbar */}
         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-2.5 border-b border-border bg-background gap-2 sm:gap-4 shrink-0">
            <div className="flex items-center gap-3">
               <Copy className="w-4 h-4 text-indigo-500" />
               <h1 className="text-sm font-semibold">Copy PDF Text</h1>
               <PdfToolSelector />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
               {text && (
                  <span className="text-[10px] text-muted-foreground tabular-nums">
                     {pageCount} pages · {text.length} chars
                  </span>
               )}
               <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs text-muted-foreground"
                  onClick={handleReset}
                  disabled={!text && !isExtracting}
               >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" />
                  Clear
               </Button>
               <Button
                  size="sm"
                  className="h-8 text-xs bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={handleCopy}
                  disabled={!text}
               >
                  {copied ? (
                     <>
                        <Check className="w-3.5 h-3.5 mr-1" />
                        Copied!
                     </>
                  ) : (
                     <>
                        <Copy className="w-3.5 h-3.5 mr-1" />
                        Copy Text
                     </>
                  )}
               </Button>
            </div>
         </div>

         {/* Content */}
         <div className="flex-1 overflow-auto p-6">
            {error && (
               <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                  {error}
               </div>
            )}

            {isExtracting ? (
               <div className="flex flex-col items-center justify-center h-full gap-4">
                  <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                  <div className="text-center">
                     <p className="text-sm font-medium">Extracting text from {fileName}...</p>
                     <p className="text-xs text-muted-foreground mt-1">This may take a moment for large PDFs</p>
                  </div>
               </div>
            ) : !text ? (
               <div className="max-w-lg mx-auto mt-12">
                  <PdfDropzone
                     onFilesSelected={handleFileSelected}
                     label="Drop a PDF to extract text"
                     description="Text content will be extracted and ready to copy"
                  />
               </div>
            ) : (
               <div className="max-w-4xl mx-auto h-full flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                     <FileText className="w-4 h-4 text-indigo-500" />
                     <span className="text-sm font-medium">{fileName}</span>
                  </div>
                  <Textarea
                     ref={textareaRef}
                     value={text}
                     readOnly
                     className="flex-1 resize-none font-mono text-sm leading-relaxed bg-muted/20 border-border min-h-[400px]"
                  />
               </div>
            )}
         </div>
      </div>
   );
}
