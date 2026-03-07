'use client';

import { useState, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Button } from '@/components/ui/button';
import { Layers, Download, RotateCcw, GripVertical, X, Loader2, Plus } from 'lucide-react';
import { PdfToolSelector } from '@/components/pdf-tools/PdfToolSelector';
import { PdfDropzone } from '@/components/pdf-tools/PdfDropzone';

interface PdfFile {
   id: string;
   name: string;
   size: number;
   pages: number;
   data: ArrayBuffer;
}

export function MergePdfView() {
   const [files, setFiles] = useState<PdfFile[]>([]);
   const [isMerging, setIsMerging] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [dragIndex, setDragIndex] = useState<number | null>(null);
   const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

   const handleFilesSelected = useCallback(async (selectedFiles: File[]) => {
      setError(null);
      const newFiles: PdfFile[] = [];

      for (const file of selectedFiles) {
         try {
            const buffer = await file.arrayBuffer();
            const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
            newFiles.push({
               id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
               name: file.name,
               size: file.size,
               pages: pdf.getPageCount(),
               data: buffer,
            });
         } catch {
            setError(`Failed to load "${file.name}". Make sure it's a valid PDF.`);
         }
      }

      setFiles((prev) => [...prev, ...newFiles]);
   }, []);

   const removeFile = useCallback((id: string) => {
      setFiles((prev) => prev.filter((f) => f.id !== id));
   }, []);

   const handleReset = () => {
      setFiles([]);
      setError(null);
   };

   // Drag and drop reorder
   const handleDragStart = (index: number) => {
      setDragIndex(index);
   };

   const handleDragEnter = (index: number) => {
      setDragOverIndex(index);
   };

   const handleDragEnd = () => {
      if (dragIndex !== null && dragOverIndex !== null && dragIndex !== dragOverIndex) {
         setFiles((prev) => {
            const updated = [...prev];
            const [moved] = updated.splice(dragIndex, 1);
            updated.splice(dragOverIndex, 0, moved);
            return updated;
         });
      }
      setDragIndex(null);
      setDragOverIndex(null);
   };

   const handleMerge = useCallback(async () => {
      if (files.length < 2) return;
      setIsMerging(true);
      setError(null);

      try {
         const merged = await PDFDocument.create();

         for (const file of files) {
            const source = await PDFDocument.load(file.data, { ignoreEncryption: true });
            const pages = await merged.copyPages(source, source.getPageIndices());
            pages.forEach((page) => merged.addPage(page));
         }

         const pdfBytes = await merged.save();
         const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
         const url = URL.createObjectURL(blob);
         const link = document.createElement('a');
         link.href = url;
         link.download = 'merged.pdf';
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
         URL.revokeObjectURL(url);
      } catch (err) {
         console.error('Merge failed:', err);
         setError('Failed to merge PDFs. One or more files may be corrupted.');
      } finally {
         setIsMerging(false);
      }
   }, [files]);

   const formatSize = (bytes: number) => {
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
   };

   const totalPages = files.reduce((sum, f) => sum + f.pages, 0);

   return (
      <div className="w-full h-full flex flex-col bg-background border border-border rounded-xl shadow-sm overflow-hidden">
         {/* Toolbar */}
         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-2.5 border-b border-border bg-background gap-2 sm:gap-4 shrink-0">
            <div className="flex items-center gap-3">
               <Layers className="w-4 h-4 text-indigo-500" />
               <h1 className="text-sm font-semibold">Merge PDF</h1>
               <PdfToolSelector />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
               {files.length > 0 && (
                  <span className="text-[10px] text-muted-foreground tabular-nums">
                     {files.length} files · {totalPages} pages
                  </span>
               )}
               <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs text-muted-foreground"
                  onClick={handleReset}
                  disabled={files.length === 0}
               >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" />
                  Clear
               </Button>
               <Button
                  size="sm"
                  className="h-8 text-xs bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={handleMerge}
                  disabled={files.length < 2 || isMerging}
               >
                  {isMerging ? (
                     <>
                        <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
                        Merging...
                     </>
                  ) : (
                     <>
                        <Download className="w-3.5 h-3.5 mr-1" />
                        Merge & Download
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

            {files.length === 0 ? (
               <div className="max-w-lg mx-auto mt-12">
                  <PdfDropzone
                     onFilesSelected={handleFilesSelected}
                     multiple
                     label="Drop PDF files here to merge"
                     description="Select multiple PDFs to combine into one document"
                  />
               </div>
            ) : (
               <div className="max-w-2xl mx-auto space-y-3">
                  {/* File list */}
                  {files.map((file, index) => (
                     <div
                        key={file.id}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragEnter={() => handleDragEnter(index)}
                        onDragEnd={handleDragEnd}
                        onDragOver={(e) => e.preventDefault()}
                        className={`flex items-center gap-3 p-3 bg-card border rounded-xl transition-all duration-200 group ${
                           dragOverIndex === index
                              ? 'border-indigo-500 bg-indigo-500/5'
                              : 'border-border hover:border-border/80'
                        }`}
                     >
                        {/* Drag handle */}
                        <div className="cursor-grab active:cursor-grabbing text-muted-foreground/40 hover:text-muted-foreground transition-colors">
                           <GripVertical className="w-4 h-4" />
                        </div>

                        {/* Order number */}
                        <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                           <span className="text-xs font-bold text-indigo-500">{index + 1}</span>
                        </div>

                        {/* File info */}
                        <div className="flex-1 min-w-0">
                           <p className="text-sm font-medium truncate">{file.name}</p>
                           <p className="text-[10px] text-muted-foreground">
                              {file.pages} page{file.pages > 1 ? 's' : ''} · {formatSize(file.size)}
                           </p>
                        </div>

                        {/* Remove button */}
                        <button
                           onClick={() => removeFile(file.id)}
                           className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors opacity-0 group-hover:opacity-100"
                        >
                           <X className="w-3.5 h-3.5" />
                        </button>
                     </div>
                  ))}

                  {/* Add more button */}
                  <button
                     onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = '.pdf,application/pdf';
                        input.multiple = true;
                        input.onchange = () => {
                           if (input.files) {
                              handleFilesSelected(Array.from(input.files));
                           }
                        };
                        input.click();
                     }}
                     className="w-full flex items-center justify-center gap-2 p-3 border-2 border-dashed border-border/40 rounded-xl text-muted-foreground hover:text-foreground hover:border-indigo-500/30 hover:bg-muted/10 transition-all duration-200 text-xs"
                  >
                     <Plus className="w-3.5 h-3.5" />
                     Add more PDFs
                  </button>

                  {/* Info */}
                  {files.length >= 2 && (
                     <p className="text-center text-[10px] text-muted-foreground pt-2">
                        Drag to reorder · PDFs will be merged top to bottom
                     </p>
                  )}
               </div>
            )}
         </div>
      </div>
   );
}
