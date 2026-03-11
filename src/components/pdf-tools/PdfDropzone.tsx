'use client';

import { useCallback } from 'react';
import { Upload, FileUp } from 'lucide-react';

interface PdfDropzoneProps {
   onFilesSelected: (files: File[]) => void;
   multiple?: boolean;
   label?: string;
   description?: string;
   accept?: Record<string, string[]>;
   icon?: React.ReactNode;
}

export function PdfDropzone({
   onFilesSelected,
   multiple = false,
   label = 'Drop PDF files here',
   description = 'or click to browse',
   accept,
   icon,
}: PdfDropzoneProps) {
   const isPdfOnly = !accept;
   const defaultAcceptString = '.pdf,application/pdf';



   const handleDrop = useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
         e.preventDefault();
         e.stopPropagation();
         
         const files = Array.from(e.dataTransfer.files).filter((f) => {
            if (isPdfOnly) return f.type === 'application/pdf';
            const accepts = Object.keys(accept!);
            return accepts.some(type => f.type === type || f.type.startsWith(type.replace('/*', '')));
         });
         if (files.length > 0) onFilesSelected(files);
      },
      [onFilesSelected, isPdfOnly, accept]
   );

   const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
   }, []);

   const handleClick = useCallback(() => {
      let acceptString = defaultAcceptString;
      if (!isPdfOnly && accept) {
         const exts: string[] = [];
         Object.values(accept).forEach(vals => exts.push(...vals));
         Object.keys(accept).forEach(key => exts.push(key));
         acceptString = exts.join(',');
      }

      const input = document.createElement('input');
      input.type = 'file';
      input.accept = acceptString;
      input.multiple = multiple;
      input.onchange = () => {
         if (input.files) {
            const files = Array.from(input.files).filter((f) => {
               if (isPdfOnly) return f.type === 'application/pdf';
               const accepts = Object.keys(accept!);
               return accepts.some(type => f.type === type || f.type.startsWith(type.replace('/*', '')));
            });
            if (files.length > 0) onFilesSelected(files);
         }
      };
      input.click();
   }, [multiple, onFilesSelected, isPdfOnly, accept]);

   return (
      <div
         onClick={handleClick}
         onDrop={handleDrop}
         onDragOver={handleDragOver}
         className="flex flex-col items-center justify-center gap-4 p-12 border-2 border-dashed border-border/60 rounded-2xl bg-muted/10 hover:bg-muted/20 hover:border-indigo-500/30 transition-all duration-300 cursor-pointer group"
      >
         {icon || (
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
               <Upload className="w-7 h-7 text-indigo-500" />
            </div>
         )}
         <div className="text-center space-y-1">
            <p className="text-sm font-medium">{label}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
         </div>
         <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <FileUp className="w-3 h-3" />
            <span>{icon ? 'Images only · 100% client-side' : 'PDF files only · 100% client-side'}</span>
         </div>
      </div>
   );
}
