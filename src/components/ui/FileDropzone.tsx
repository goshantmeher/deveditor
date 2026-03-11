'use client';

import { useCallback } from 'react';

interface FileDropzoneProps {
   onDrop: (files: File[]) => void;
   accept?: Record<string, string[]>;
   multiple?: boolean;
   children?: React.ReactNode;
   className?: string;
}

export function FileDropzone({ onDrop, accept, multiple = false, children, className = '' }: FileDropzoneProps) {
   const handleDrop = useCallback(
      (e: React.DragEvent) => {
         e.preventDefault();
         const files = Array.from(e.dataTransfer.files);
         if (files.length) onDrop(multiple ? files : [files[0]]);
      },
      [onDrop, multiple]
   );

   const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
         const files = e.target.files;
         if (files?.length) onDrop(Array.from(files));
         e.target.value = '';
      },
      [onDrop]
   );

   const acceptStr = accept
      ? [
           ...Object.keys(accept),
           ...Object.values(accept)
              .flat()
              .map((e) => `.${e}`),
        ].join(',')
      : undefined;

   return (
      <label
         onDragOver={(e) => e.preventDefault()}
         onDrop={handleDrop}
         className={`flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 transition-colors hover:border-primary/50 hover:bg-muted/50 ${className}`}
      >
         <input type="file" accept={acceptStr} multiple={multiple} onChange={handleChange} className="hidden" />
         {children ?? <span className="text-sm text-muted-foreground">Drop files here or click to browse</span>}
      </label>
   );
}
