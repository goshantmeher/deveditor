'use client';

import { useState, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Download, RotateCcw, Loader2, GripVertical, X, Plus } from 'lucide-react';
import { PdfToolSelector } from '@/components/pdf-tools/PdfToolSelector';
import { PdfDropzone } from '@/components/pdf-tools/PdfDropzone';

interface ImageFile {
   id: string;
   name: string;
   size: number;
   type: string;
   data: ArrayBuffer;
   url: string;
}

export function ImageToPdfView() {
   const [files, setFiles] = useState<ImageFile[]>([]);
   const [isConverting, setIsConverting] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [dragIndex, setDragIndex] = useState<number | null>(null);
   const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

   const handleFilesSelected = useCallback(async (selectedFiles: File[]) => {
      setError(null);
      const newFiles: ImageFile[] = [];

      // Filter only images (specifically jpeg and png since pdf-lib natively supports those)
      const validFiles = selectedFiles.filter((f) => f.type === 'image/jpeg' || f.type === 'image/png');

      if (validFiles.length !== selectedFiles.length) {
         setError('Some files were ignored. Only JPEG and PNG images are supported.');
      }

      for (const file of validFiles) {
         try {
            const buffer = await file.arrayBuffer();
            const blob = new Blob([buffer], { type: file.type });
            const url = URL.createObjectURL(blob);

            newFiles.push({
               id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
               name: file.name,
               size: file.size,
               type: file.type,
               data: buffer,
               url: url,
            });
         } catch {
            setError(`Failed to read image "${file.name}".`);
         }
      }

      setFiles((prev) => [...prev, ...newFiles]);
   }, []);

   const removeFile = useCallback((id: string) => {
      setFiles((prev) => {
         const file = prev.find((f) => f.id === id);
         if (file) {
            URL.revokeObjectURL(file.url);
         }
         return prev.filter((f) => f.id !== id);
      });
   }, []);

   const handleReset = () => {
      files.forEach((f) => URL.revokeObjectURL(f.url));
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

   const handleConvert = useCallback(async () => {
      if (files.length === 0) return;
      setIsConverting(true);
      setError(null);

      try {
         const pdfDoc = await PDFDocument.create();

         for (const file of files) {
            let image;
            if (file.type === 'image/jpeg') {
               image = await pdfDoc.embedJpg(file.data);
            } else if (file.type === 'image/png') {
               image = await pdfDoc.embedPng(file.data);
            } else {
               continue;
            }

            const { width, height } = image.scale(1);

            // Create a page matching the image dimensions perfectly
            const page = pdfDoc.addPage([width, height]);
            page.drawImage(image, {
               x: 0,
               y: 0,
               width: width,
               height: height,
            });
         }

         const pdfBytes = await pdfDoc.save();
         const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
         const url = URL.createObjectURL(blob);
         const link = document.createElement('a');
         link.href = url;
         link.download =
            files.length === 1 ? `${files[0].name.replace(/\.[^/.]+$/, '')}_converted.pdf` : 'images_merged.pdf';
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
         URL.revokeObjectURL(url);
      } catch (err) {
         console.error('Conversion failed:', err);
         setError('Failed to convert images to PDF. Ensure images are valid JPEGs or PNGs.');
      } finally {
         setIsConverting(false);
      }
   }, [files]);

   const formatSize = (bytes: number) => {
      if (bytes < 1024) return `${bytes} B`;
      if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
   };

   return (
      <div className="w-full h-full flex flex-col bg-background border border-border rounded-xl shadow-sm overflow-hidden">
         {/* Toolbar */}
         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-2.5 border-b border-border bg-background gap-2 sm:gap-4 shrink-0">
            <div className="flex items-center gap-3">
               <ImageIcon className="w-4 h-4 text-indigo-500" />
               <h1 className="text-sm font-semibold">Image to PDF</h1>
               <PdfToolSelector />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
               {files.length > 0 && (
                  <span className="text-[10px] text-muted-foreground tabular-nums">{files.length} images selected</span>
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
                  onClick={handleConvert}
                  disabled={files.length === 0 || isConverting}
               >
                  {isConverting ? (
                     <>
                        <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
                        Converting...
                     </>
                  ) : (
                     <>
                        <Download className="w-3.5 h-3.5 mr-1" />
                        Convert to PDF
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
                     accept={{ 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] }}
                     label="Drop JPEG or PNG images here"
                     description="Select multiple images to combine into a multi-page PDF"
                     icon={<ImageIcon className="w-8 h-8 text-muted-foreground mb-4 opacity-50 mx-auto" />}
                  />
               </div>
            ) : (
               <div className="max-w-3xl mx-auto space-y-3">
                  {/* File list */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                     {files.map((file, index) => (
                        <div
                           key={file.id}
                           draggable
                           onDragStart={() => handleDragStart(index)}
                           onDragEnter={() => handleDragEnter(index)}
                           onDragEnd={handleDragEnd}
                           onDragOver={(e) => e.preventDefault()}
                           className={`relative group aspect-square rounded-xl overflow-hidden border-2 flex items-center justify-center bg-muted/30 transition-all duration-200 cursor-grab active:cursor-grabbing ${
                              dragOverIndex === index
                                 ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-md'
                                 : 'border-border/50 hover:border-indigo-500/50'
                           }`}
                        >
                           {/* Remove button */}
                           <button
                              onClick={() => removeFile(file.id)}
                              className="absolute top-2 right-2 w-7 h-7 bg-background/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 hover:border-destructive/30 transition-colors opacity-0 group-hover:opacity-100 shrink-0 z-10"
                           >
                              <X className="w-3.5 h-3.5" />
                           </button>

                           {/* Image indicator */}
                           <div className="absolute top-2 left-2 px-2 py-0.5 bg-background/80 backdrop-blur-sm border border-border rounded-md text-[10px] font-bold text-muted-foreground shadow-sm z-10">
                              {index + 1}
                           </div>

                           <img
                              src={file.url}
                              alt={file.name}
                              className="w-full h-full object-cover select-none pointer-events-none"
                           />

                           <div className="absolute bottom-0 inset-x-0 p-2 bg-linear-to-t from-black/60 to-transparent flex flex-col justify-end">
                              <span className="text-white text-xs font-medium truncate mb-0.5">{file.name}</span>
                              <span className="text-white/70 text-[10px]">{formatSize(file.size)}</span>
                           </div>
                        </div>
                     ))}

                     {/* Add more button */}
                     <button
                        onClick={() => {
                           const input = document.createElement('input');
                           input.type = 'file';
                           input.accept = 'image/jpeg,image/png';
                           input.multiple = true;
                           input.onchange = () => {
                              if (input.files) {
                                 handleFilesSelected(Array.from(input.files));
                              }
                           };
                           input.click();
                        }}
                        className="aspect-square rounded-xl border-2 border-dashed border-border/60 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all duration-200 group"
                     >
                        <div className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-500/10 group-hover:text-indigo-500 transition-all">
                           <Plus className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-medium">Add Image</span>
                     </button>
                  </div>

                  {/* Info */}
                  {files.length >= 2 && (
                     <p className="text-center text-[10px] text-muted-foreground pt-4 flex items-center justify-center gap-1.5">
                        <GripVertical className="w-3.5 h-3.5" />
                        Drag and drop images to reorder. Images are converted to PDF pages in sequence.
                     </p>
                  )}
               </div>
            )}
         </div>
      </div>
   );
}
