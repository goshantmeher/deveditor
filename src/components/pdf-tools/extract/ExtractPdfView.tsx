'use client';

import { useState, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Button } from '@/components/ui/button';
import { FileText, Download, RotateCcw, Loader2 } from 'lucide-react';
import { PdfToolSelector } from '@/components/pdf-tools/PdfToolSelector';
import { PdfDropzone } from '@/components/pdf-tools/PdfDropzone';

export function ExtractPdfView() {
   const [file, setFile] = useState<{ name: string; data: ArrayBuffer; pages: number } | null>(null);
   const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
   const [isExtracting, setIsExtracting] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const handleFileSelected = useCallback(async (files: File[]) => {
      const f = files[0];
      if (!f) return;
      setError(null);

      try {
         const buffer = await f.arrayBuffer();
         const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
         const pages = pdf.getPageCount();
         setFile({ name: f.name, data: buffer, pages });
         setSelectedPages(new Set());
      } catch {
         setError('Failed to load PDF. Make sure it\'s a valid file.');
      }
   }, []);

   const togglePage = (page: number) => {
      setSelectedPages((prev) => {
         const next = new Set(prev);
         if (next.has(page)) next.delete(page);
         else next.add(page);
         return next;
      });
   };

   const selectAll = () => {
      if (!file) return;
      if (selectedPages.size === file.pages) {
         setSelectedPages(new Set());
      } else {
         setSelectedPages(new Set(Array.from({ length: file.pages }, (_, i) => i + 1)));
      }
   };

   const handleExtract = useCallback(async () => {
      if (!file || selectedPages.size === 0) return;
      setIsExtracting(true);
      setError(null);

      try {
         const source = await PDFDocument.load(file.data, { ignoreEncryption: true });
         const newPdf = await PDFDocument.create();
         const sorted = Array.from(selectedPages).sort((a, b) => a - b);
         const indices = sorted.map((p) => p - 1);
         const pages = await newPdf.copyPages(source, indices);
         pages.forEach((page) => newPdf.addPage(page));

         const pdfBytes = await newPdf.save();
         const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
         const url = URL.createObjectURL(blob);
         const link = document.createElement('a');
         link.href = url;
         link.download = `${file.name.replace('.pdf', '')}_extracted.pdf`;
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
         URL.revokeObjectURL(url);
      } catch (err) {
         console.error('Extract failed:', err);
         setError('Failed to extract pages. The file may be corrupted.');
      } finally {
         setIsExtracting(false);
      }
   }, [file, selectedPages]);

   const handleReset = () => {
      setFile(null);
      setSelectedPages(new Set());
      setError(null);
   };

   return (
      <div className="w-full h-full flex flex-col bg-background border border-border rounded-xl shadow-sm overflow-hidden">
         {/* Toolbar */}
         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-2.5 border-b border-border bg-background gap-2 sm:gap-4 shrink-0">
            <div className="flex items-center gap-3">
               <FileText className="w-4 h-4 text-indigo-500" />
               <h1 className="text-sm font-semibold">Extract Pages</h1>
               <PdfToolSelector />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
               {file && (
                  <span className="text-[10px] text-muted-foreground tabular-nums">
                     {selectedPages.size}/{file.pages} selected
                  </span>
               )}
               <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs text-muted-foreground"
                  onClick={handleReset}
                  disabled={!file}
               >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" />
                  Clear
               </Button>
               <Button
                  size="sm"
                  className="h-8 text-xs bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={handleExtract}
                  disabled={!file || selectedPages.size === 0 || isExtracting}
               >
                  {isExtracting ? (
                     <>
                        <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
                        Extracting...
                     </>
                  ) : (
                     <>
                        <Download className="w-3.5 h-3.5 mr-1" />
                        Extract & Download
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

            {!file ? (
               <div className="max-w-lg mx-auto mt-12">
                  <PdfDropzone
                     onFilesSelected={handleFileSelected}
                     label="Drop a PDF to extract pages"
                     description="Select specific pages to create a new PDF"
                  />
               </div>
            ) : (
               <div className="max-w-3xl mx-auto space-y-4">
                  {/* File info & Select All */}
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-indigo-500" />
                        <span className="text-sm font-medium">{file.name}</span>
                        <span className="text-[10px] text-muted-foreground">({file.pages} pages)</span>
                     </div>
                     <button
                        onClick={selectAll}
                        className="text-xs text-indigo-500 hover:text-indigo-400 transition-colors"
                     >
                        {selectedPages.size === file.pages ? 'Deselect All' : 'Select All'}
                     </button>
                  </div>

                  {/* Page grid */}
                  <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
                     {Array.from({ length: file.pages }, (_, i) => i + 1).map((page) => (
                        <button
                           key={page}
                           onClick={() => togglePage(page)}
                           className={`aspect-3/4 rounded-lg border-2 flex items-center justify-center text-xs font-medium transition-all duration-200 ${
                              selectedPages.has(page)
                                 ? 'border-indigo-500 bg-indigo-500/15 text-indigo-400'
                                 : 'border-border/50 bg-card hover:border-border text-muted-foreground hover:text-foreground'
                           }`}
                        >
                           {page}
                        </button>
                     ))}
                  </div>

                  <p className="text-center text-[10px] text-muted-foreground pt-1">
                     Click pages to select · Selected pages will be combined into a new PDF
                  </p>
               </div>
            )}
         </div>
      </div>
   );
}
