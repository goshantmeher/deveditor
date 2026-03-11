'use client';

import { useState, useCallback, useRef } from 'react';
import { PDFDocument } from 'pdf-lib';
import { Button } from '@/components/ui/button';
import { FilePlus, Download, RotateCcw, Loader2, Plus, FileText, File, X, FileUp } from 'lucide-react';
import { PdfToolSelector } from '@/components/pdf-tools/PdfToolSelector';
import { PdfDropzone } from '@/components/pdf-tools/PdfDropzone';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Fragment } from 'react';

type RenderItem =
   | { id: string; type: 'base-page'; pageNumber: number }
   | { id: string; type: 'blank-page' }
   | { id: string; type: 'inserted-pdf'; name: string; pages: number; data: ArrayBuffer };

export function AddPagesView() {
   const [baseFile, setBaseFile] = useState<{ name: string; data: ArrayBuffer } | null>(null);
   const [items, setItems] = useState<RenderItem[]>([]);
   const [isExtracting, setIsExtracting] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const fileInputRef = useRef<HTMLInputElement>(null);
   const [insertIndex, setInsertIndex] = useState<number>(0);

   const handleBaseFileSelected = useCallback(async (files: File[]) => {
      const f = files[0];
      if (!f) return;
      setError(null);

      try {
         const buffer = await f.arrayBuffer();
         const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
         const pages = pdf.getPageCount();

         setBaseFile({ name: f.name, data: buffer });
         const initialItems: RenderItem[] = Array.from({ length: pages }, (_, i) => ({
            id: `base-${i}`,
            type: 'base-page',
            pageNumber: i + 1,
         }));
         setItems(initialItems);
      } catch {
         setError("Failed to load PDF. Make sure it's a valid file.");
      }
   }, []);

   const addBlankPage = (index: number) => {
      setItems((prev) => {
         const newItems = [...prev];
         newItems.splice(index, 0, { id: `blank-${Date.now()}`, type: 'blank-page' });
         return newItems;
      });
   };

   const openFilePickerForIndex = (index: number) => {
      setInsertIndex(index);
      if (fileInputRef.current) {
         fileInputRef.current.value = '';
         fileInputRef.current.click();
      }
   };

   const handleInsertedFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
         const buffer = await file.arrayBuffer();
         const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });
         const pages = pdf.getPageCount();

         setItems((prev) => {
            const newItems = [...prev];
            newItems.splice(insertIndex, 0, {
               id: `pdf-${Date.now()}`,
               type: 'inserted-pdf',
               name: file.name,
               pages,
               data: buffer,
            });
            return newItems;
         });
      } catch {
         setError(`Failed to read inserted PDF: ${file.name}`);
      }
   };

   const removeItem = (id: string) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
   };

   const handleGenerate = useCallback(async () => {
      if (!baseFile || items.length === 0) return;
      setIsExtracting(true);
      setError(null);

      try {
         const basePdfDoc = await PDFDocument.load(baseFile.data, { ignoreEncryption: true });
         const newPdf = await PDFDocument.create();

         for (const item of items) {
            if (item.type === 'base-page') {
               const [page] = await newPdf.copyPages(basePdfDoc, [item.pageNumber - 1]);
               newPdf.addPage(page);
            } else if (item.type === 'blank-page') {
               // Default A4 size blank page
               newPdf.addPage([595.28, 841.89]);
            } else if (item.type === 'inserted-pdf') {
               const insertedDoc = await PDFDocument.load(item.data, { ignoreEncryption: true });
               const pages = await newPdf.copyPages(insertedDoc, insertedDoc.getPageIndices());
               pages.forEach((p) => newPdf.addPage(p));
            }
         }

         const pdfBytes = await newPdf.save();
         const blob = new Blob([pdfBytes as unknown as BlobPart], { type: 'application/pdf' });
         const url = URL.createObjectURL(blob);
         const link = document.createElement('a');
         link.href = url;
         link.download = `${baseFile.name.replace('.pdf', '')}_modified.pdf`;
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
         URL.revokeObjectURL(url);
      } catch (err) {
         console.error('Generation failed:', err);
         setError('Failed to generate PDF. The file may be corrupted.');
      } finally {
         setIsExtracting(false);
      }
   }, [baseFile, items]);

   const handleReset = () => {
      setBaseFile(null);
      setItems([]);
      setError(null);
   };

   const renderInsertButton = (index: number) => (
      <div className="flex items-center justify-center z-10 py-1 sm:py-0 sm:px-1 shrink-0">
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <button className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-border flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-sm opacity-50 hover:opacity-100 hover:scale-110">
                  <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
               </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="min-w-32">
               <DropdownMenuItem onClick={() => addBlankPage(index)}>
                  <File className="w-4 h-4 mr-2" />
                  Blank Page
               </DropdownMenuItem>
               <DropdownMenuItem onClick={() => openFilePickerForIndex(index)}>
                  <FileUp className="w-4 h-4 mr-2" />
                  Insert PDF File
               </DropdownMenuItem>
            </DropdownMenuContent>
         </DropdownMenu>
      </div>
   );

   return (
      <div className="w-full h-full flex flex-col bg-background border border-border rounded-xl shadow-sm overflow-hidden">
         <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".pdf,application/pdf"
            onChange={handleInsertedFile}
         />

         {/* Toolbar */}
         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-2.5 border-b border-border bg-background gap-2 sm:gap-4 shrink-0">
            <div className="flex items-center gap-3">
               <FilePlus className="w-4 h-4 text-indigo-500" />
               <h1 className="text-sm font-semibold">Add Pages to PDF</h1>
               <PdfToolSelector />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
               {baseFile && (
                  <span className="text-[10px] text-muted-foreground tabular-nums">{items.length} Elements</span>
               )}
               <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs text-muted-foreground"
                  onClick={handleReset}
                  disabled={!baseFile}
               >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" />
                  Clear
               </Button>
               <Button
                  size="sm"
                  className="h-8 text-xs bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={handleGenerate}
                  disabled={!baseFile || items.length === 0 || isExtracting}
               >
                  {isExtracting ? (
                     <>
                        <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
                        Generating...
                     </>
                  ) : (
                     <>
                        <Download className="w-3.5 h-3.5 mr-1" />
                        Download PDF
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

            {!baseFile ? (
               <div className="max-w-lg mx-auto mt-12">
                  <PdfDropzone
                     onFilesSelected={handleBaseFileSelected}
                     label="Drop a base PDF here"
                     description="You will be able to insert blank pages or other PDFs at specific indexes"
                  />
               </div>
            ) : (
               <div className="max-w-5xl mx-auto space-y-4">
                  <div className="flex items-center gap-2 mb-6">
                     <FileText className="w-5 h-5 text-indigo-500" />
                     <span className="text-sm font-medium">{baseFile.name}</span>
                  </div>

                  {/* Flow Map */}
                  <div className="flex flex-col sm:flex-row flex-wrap items-center sm:items-center gap-y-2 sm:gap-y-4 sm:gap-x-2 py-4 justify-center sm:justify-start">
                     {renderInsertButton(0)}

                     {items.map((item, index) => (
                        <Fragment key={item.id}>
                           <div className="group relative border-2 border-border/50 bg-card hover:border-border transition-colors rounded-lg flex flex-col items-center justify-center p-4 w-32 h-40 shrink-0 shadow-sm mx-auto sm:mx-0">
                              {item.type !== 'base-page' && (
                                 <button
                                    onClick={() => removeItem(item.id)}
                                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                                 >
                                    <X className="w-3 h-3" />
                                 </button>
                              )}

                              {item.type === 'base-page' && (
                                 <>
                                    <FileText className="w-8 h-8 text-muted-foreground mb-3 opacity-30" />
                                    <div className="text-xs font-semibold text-muted-foreground">
                                       Page {item.pageNumber}
                                    </div>
                                 </>
                              )}

                              {item.type === 'blank-page' && (
                                 <>
                                    <File className="w-8 h-8 text-emerald-400 mb-3 opacity-80" />
                                    <div className="text-xs font-semibold text-emerald-500 text-center">Blank Page</div>
                                 </>
                              )}

                              {item.type === 'inserted-pdf' && (
                                 <>
                                    <FilePlus className="w-8 h-8 text-indigo-400 mb-3 opacity-80" />
                                    <div className="text-[10px] font-semibold text-indigo-500 text-center line-clamp-2 px-1 break-all">
                                       {item.name}
                                    </div>
                                    <div className="text-[9px] text-muted-foreground mt-1">
                                       {item.pages} page{item.pages > 1 ? 's' : ''}
                                    </div>
                                 </>
                              )}
                           </div>

                           {renderInsertButton(index + 1)}
                        </Fragment>
                     ))}
                  </div>

                  <p className="text-center text-[10px] text-muted-foreground pt-4">
                     Click the + buttons to insert blank pages or other PDF files.
                  </p>
               </div>
            )}
         </div>
      </div>
   );
}
