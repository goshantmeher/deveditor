'use client';

import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2, FileText, Check, RotateCcw } from 'lucide-react';
import { PdfToolSelector } from '@/components/pdf-tools/PdfToolSelector';
import { PdfDropzone } from '@/components/pdf-tools/PdfDropzone';
import { Document, Packer, Paragraph, TextRun } from 'docx';

type TextSegment = {
   text: string;
   isBold: boolean;
   isItalic: boolean;
   size: number;
   hasEOL: boolean;
};

type PageData = {
   page: number;
   segments: TextSegment[];
};

export function PdfToDocView() {
   const [fileName, setFileName] = useState('');
   const [isExtracting, setIsExtracting] = useState(false);
   const [isDownloading, setIsDownloading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [pageCount, setPageCount] = useState(0);
   const [extractedPages, setExtractedPages] = useState<PageData[] | null>(null);
   const [downloaded, setDownloaded] = useState(false);

   const handleFileSelected = useCallback(async (files: File[]) => {
      const file = files[0];
      if (!file) return;

      setIsExtracting(true);
      setError(null);
      setExtractedPages(null);
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

         const pagesInfo: PageData[] = [];
         for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            
            const segments: TextSegment[] = content.items.map((rawItem) => {
               const item = rawItem as { str?: string; fontName?: string; transform?: number[]; hasEOL?: boolean };
               const isTextItem = 'str' in item;
               const str = isTextItem && item.str ? item.str : '';
               const fontName = (item.fontName || '').toLowerCase();
               const transform = item.transform || [];
               const size = transform.length >= 4 ? Math.round(Math.abs(transform[3])) : 12;
               
               return {
                  text: str,
                  isBold: fontName.includes('bold') || fontName.includes('black') || fontName.includes('heavy'),
                  isItalic: fontName.includes('italic') || fontName.includes('oblique'),
                  size: size > 0 ? size : 12,
                  hasEOL: item.hasEOL || false
               };
            });
            
            pagesInfo.push({ page: i, segments });
         }

         setExtractedPages(pagesInfo);
      } catch (err) {
         console.error('PDF parsing failed:', err);
         setError('Failed to extract text. The PDF may be image-based or corrupted.');
      } finally {
         setIsExtracting(false);
      }
   }, []);

   const generateDocx = async () => {
      if (!extractedPages) return;

      setIsDownloading(true);
      try {
         const children: Paragraph[] = [];
         
         extractedPages.forEach((pageData) => {
            let currentParagraphRuns: TextRun[] = [];
            
            pageData.segments.forEach((seg) => {
               if (seg.text) {
                  currentParagraphRuns.push(new TextRun({
                     text: seg.text,
                     bold: seg.isBold,
                     italics: seg.isItalic,
                     size: seg.size * 2, // docx uses half-points
                  }));
               }
               
               if (seg.hasEOL) {
                  if (currentParagraphRuns.length > 0) {
                     children.push(new Paragraph({ children: currentParagraphRuns }));
                     currentParagraphRuns = [];
                  } else {
                     children.push(new Paragraph({ text: '' }));
                  }
               }
            });
            
            if (currentParagraphRuns.length > 0) {
               children.push(new Paragraph({ children: currentParagraphRuns }));
            }
         });

         const doc = new Document({
            sections: [
               {
                  properties: {},
                  children: children,
               },
            ],
         });

         const blob = await Packer.toBlob(doc);
         const url = URL.createObjectURL(blob);
         const baseName = fileName.replace(/\.[^/.]+$/, '');

         const a = document.createElement('a');
         document.body.appendChild(a);
         a.style.display = 'none';
         a.href = url;
         a.download = `${baseName}_converted.docx`;
         a.click();
         URL.revokeObjectURL(url);
         
         setDownloaded(true);
         setTimeout(() => setDownloaded(false), 2000);
      } catch (err) {
         console.error('Docx generation failed:', err);
         setError('Failed to generate Word document.');
      } finally {
         setIsDownloading(false);
      }
   };

   const handleReset = () => {
      setFileName('');
      setError(null);
      setPageCount(0);
      setExtractedPages(null);
   };

   return (
      <div className="w-full h-full flex flex-col bg-background border border-border rounded-xl shadow-sm overflow-hidden">
         {/* Toolbar */}
         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-2.5 border-b border-border bg-background gap-2 sm:gap-4 shrink-0">
            <div className="flex items-center gap-3">
               <FileText className="w-4 h-4 text-indigo-500" />
               <h1 className="text-sm font-semibold">PDF to Word (Doc)</h1>
               <PdfToolSelector />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
               {extractedPages && (
                  <span className="text-[10px] text-muted-foreground tabular-nums">
                     {pageCount} pages parsed
                  </span>
               )}
               <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs text-muted-foreground"
                  onClick={handleReset}
                  disabled={!extractedPages && !isExtracting}
               >
                  <RotateCcw className="w-3.5 h-3.5 mr-1" />
                  Clear
               </Button>
               <Button
                  size="sm"
                  className="h-8 text-xs bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={generateDocx}
                  disabled={!extractedPages || isDownloading}
               >
                  {isDownloading ? (
                     <>
                        <Loader2 className="w-3.5 h-3.5 mr-1 animate-spin" />
                        Generating...
                     </>
                  ) : downloaded ? (
                     <>
                        <Check className="w-3.5 h-3.5 mr-1" />
                        Downloaded!
                     </>
                  ) : (
                     <>
                        <Download className="w-3.5 h-3.5 mr-1" />
                        Download Word (.docx)
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
            ) : !extractedPages ? (
               <div className="max-w-lg mx-auto mt-12">
                  <PdfDropzone
                     onFilesSelected={handleFileSelected}
                     label="Drop a PDF to convert"
                     description="Text will be extracted and converted to a Word document format"
                  />
               </div>
            ) : (
               <div className="h-full flex flex-col lg:flex-row gap-6 fade-in duration-300">
                  {/* Preview Left Pane */}
                  <div className="flex-1 flex flex-col min-h-[400px] border border-border rounded-xl bg-muted/10 overflow-hidden">
                     <div className="bg-muted/30 px-4 py-2 border-b border-border flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                           Document Preview
                        </span>
                        <span className="text-[10px] bg-background border border-border/50 text-muted-foreground px-2 py-0.5 rounded-full">
                           {pageCount} Page{pageCount !== 1 && 's'}
                        </span>
                     </div>
                     <div className="flex-1 overflow-auto p-6 space-y-6">
                        {extractedPages.map((pageData, index) => {
                           let currentLine: TextSegment[] = [];
                           const lines: TextSegment[][] = [];
                           
                           pageData.segments.forEach((seg, i) => {
                              currentLine.push(seg);
                              if (seg.hasEOL || i === pageData.segments.length - 1) {
                                 lines.push(currentLine);
                                 currentLine = [];
                              }
                           });

                           return (
                              <div key={index} className="bg-background border border-border rounded-lg shadow-sm">
                                 <div className="bg-muted/20 px-4 py-2 border-b border-border text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                                    Page {pageData.page}
                                 </div>
                                 <div className="p-6">
                                    {lines.length > 0 ? lines.map((line, lIdx) => (
                                       <div key={lIdx} className="min-h-[1em] leading-relaxed wrap-break-word whitespace-pre-wrap">
                                          {line.map((seg, sIdx) => {
                                             if (!seg.text) return null;
                                             return (
                                                <span key={sIdx} style={{ 
                                                   fontWeight: seg.isBold ? '700' : '400',
                                                   fontStyle: seg.isItalic ? 'italic' : 'normal',
                                                   fontSize: `${Math.max(12, Math.min(24, seg.size))}px`,
                                                   lineHeight: 1.2
                                                }}>
                                                   {seg.text}
                                                </span>
                                             );
                                          })}
                                       </div>
                                    )) : (
                                       <div className="text-sm text-muted-foreground italic">No text found on this page.</div>
                                    )}
                                 </div>
                              </div>
                           );
                        })}
                     </div>
                  </div>

                  {/* Actions Right Pane */}
                  <div className="lg:w-80 flex flex-col gap-6 items-center justify-center bg-muted/10 border border-border rounded-xl p-8 shrink-0">
                     <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mb-2">
                        <Check className="w-8 h-8 text-emerald-500" />
                     </div>
                     <div className="text-center w-full">
                        <h3 className="text-lg font-bold mb-2">Parsed Successfully</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                           Review the extracted text preview. Click below to download as an editable Word document.
                        </p>
                        <Button
                           size="lg"
                           className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:shadow-indigo-500/20 transition-all font-medium"
                           onClick={generateDocx}
                           disabled={isDownloading}
                        >
                           {isDownloading ? (
                              <>
                                 <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                 Generating DOCX...
                              </>
                           ) : (
                              <>
                                 <Download className="w-4 h-4 mr-2" />
                                 Download .docx
                              </>
                           )}
                        </Button>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}
