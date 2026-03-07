'use client';

import { useState, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Scissors, Download, RotateCcw, Loader2, FileText, Plus, X } from 'lucide-react';
import { PdfToolSelector } from '@/components/pdf-tools/PdfToolSelector';
import { PdfDropzone } from '@/components/pdf-tools/PdfDropzone';

interface PageRange {
   id: string;
   from: number;
   to: number;
}

export function SplitPdfView() {
   const [file, setFile] = useState<{ name: string; data: ArrayBuffer; pages: number } | null>(null);
   const [ranges, setRanges] = useState<PageRange[]>([]);
   const [isSplitting, setIsSplitting] = useState(false);
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
         setRanges([{ id: crypto.randomUUID(), from: 1, to: Math.min(pages, Math.ceil(pages / 2)) }]);
      } catch {
         setError('Failed to load PDF. Make sure it\'s a valid file.');
      }
   }, []);

   const addRange = () => {
      if (!file) return;
      setRanges((prev) => [
         ...prev,
         { id: crypto.randomUUID(), from: 1, to: file.pages },
      ]);
   };

   const removeRange = (id: string) => {
      setRanges((prev) => prev.filter((r) => r.id !== id));
   };

   const updateRange = (id: string, field: 'from' | 'to', value: number) => {
      if (!file) return;
      setRanges((prev) =>
         prev.map((r) =>
            r.id === id
               ? { ...r, [field]: Math.max(1, Math.min(file.pages, value)) }
               : r
         )
      );
   };

   const handleSplit = useCallback(async () => {
      if (!file || ranges.length === 0) return;
      setIsSplitting(true);
      setError(null);

      try {
         const source = await PDFDocument.load(file.data, { ignoreEncryption: true });

         for (let i = 0; i < ranges.length; i++) {
            const range = ranges[i];
            const from = Math.max(1, range.from);
            const to = Math.min(file.pages, range.to);
            if (from > to) continue;

            const newPdf = await PDFDocument.create();
            const indices = Array.from({ length: to - from + 1 }, (_, k) => from - 1 + k);
            const pages = await newPdf.copyPages(source, indices);
            pages.forEach((page) => newPdf.addPage(page));

            const pdfBytes = await newPdf.save();
            const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${file.name.replace('.pdf', '')}_pages_${from}-${to}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            // Small delay between downloads
            if (i < ranges.length - 1) {
               await new Promise((r) => setTimeout(r, 500));
            }
         }
      } catch (err) {
         console.error('Split failed:', err);
         setError('Failed to split PDF. The file may be corrupted.');
      } finally {
         setIsSplitting(false);
      }
   }, [file, ranges]);

   const handleReset = () => {
      setFile(null);
      setRanges([]);
      setError(null);
   };

   return (
      <div className="w-full h-full flex flex-col bg-background border border-border rounded-xl shadow-sm overflow-hidden">
         {/* Toolbar */}
         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-2.5 border-b border-border bg-background gap-2 sm:gap-4 shrink-0">
            <div className="flex items-center gap-3">
               <Scissors className="w-4 h-4 text-indigo-500" />
               <h1 className="text-sm font-semibold">Split PDF</h1>
               <PdfToolSelector />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
               {file && (
                  <span className="text-[10px] text-muted-foreground tabular-nums">
                     {file.pages} pages · {ranges.length} split{ranges.length > 1 ? 's' : ''}
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
                  onClick={handleSplit}
                  disabled={!file || ranges.length === 0 || isSplitting}
               >
                  {isSplitting ? (
                     <>
                        <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
                        Splitting...
                     </>
                  ) : (
                     <>
                        <Download className="w-3.5 h-3.5 mr-1" />
                        Split & Download
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
                     label="Drop a PDF to split"
                     description="Define page ranges to split into separate files"
                  />
               </div>
            ) : (
               <div className="max-w-2xl mx-auto space-y-4">
                  {/* File info */}
                  <div className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl">
                     <FileText className="w-5 h-5 text-indigo-500 shrink-0" />
                     <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.name}</p>
                        <p className="text-[10px] text-muted-foreground">{file.pages} pages total</p>
                     </div>
                  </div>

                  {/* Range definitions */}
                  <div className="space-y-3">
                     <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Page Ranges</p>
                     {ranges.map((range, i) => (
                        <div key={range.id} className="flex items-center gap-3 p-3 bg-card border border-border rounded-xl group">
                           <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                              <span className="text-xs font-bold text-indigo-500">{i + 1}</span>
                           </div>
                           <span className="text-xs text-muted-foreground shrink-0">Pages</span>
                           <Input
                              type="number"
                              min={1}
                              max={file.pages}
                              value={range.from}
                              onChange={(e) => updateRange(range.id, 'from', parseInt(e.target.value) || 1)}
                              className="w-20 h-8 text-xs text-center"
                           />
                           <span className="text-xs text-muted-foreground">to</span>
                           <Input
                              type="number"
                              min={1}
                              max={file.pages}
                              value={range.to}
                              onChange={(e) => updateRange(range.id, 'to', parseInt(e.target.value) || 1)}
                              className="w-20 h-8 text-xs text-center"
                           />
                           <span className="text-[10px] text-muted-foreground">
                              ({Math.max(0, range.to - range.from + 1)} pg)
                           </span>
                           {ranges.length > 1 && (
                              <button
                                 onClick={() => removeRange(range.id)}
                                 className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100 ml-auto"
                              >
                                 <X className="w-3.5 h-3.5" />
                              </button>
                           )}
                        </div>
                     ))}
                  </div>

                  {/* Add range */}
                  <button
                     onClick={addRange}
                     className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-border/40 rounded-xl text-muted-foreground hover:text-foreground hover:border-indigo-500/30 hover:bg-muted/10 transition-all duration-200 text-xs"
                  >
                     <Plus className="w-3.5 h-3.5" />
                     Add another range
                  </button>

                  <p className="text-center text-[10px] text-muted-foreground pt-1">
                     Each range will be downloaded as a separate PDF file
                  </p>
               </div>
            )}
         </div>
      </div>
   );
}
