'use client';

import React, { useRef, useState } from 'react';
import { Button } from './ui/button';
import { FileInput, Loader2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { getConverterByExtension, getAllAcceptedExtensions } from '@/lib/converters/setup';
import { smartConvert, formatFileSize } from '@/lib/converters/smart-convert';

interface ImportButtonProps {
   onImport: (data: unknown) => void;
   variant?: 'ghost' | 'default' | 'secondary';
   dataType: 'json' | 'text';
   title?: string;
   onImportClick?: () => void;
   onError?: (error: Error) => void;
}

function ImportButton({
   onImport,
   variant = 'ghost',
   dataType,
   title = 'Import File',
   onImportClick,
   onError,
}: ImportButtonProps) {
   const fileInputRef = useRef<HTMLInputElement>(null);
   const [isImporting, setIsImporting] = useState(false);
   const [importStatus, setImportStatus] = useState<string | null>(null);

   const getFileExtension = (filename: string): string => {
      const parts = filename.toLowerCase().split('.');
      if (parts.length < 2) return '';
      return `.${parts.pop()!}`;
   };

   const getAcceptedFileType = (): string => {
      if (dataType === 'json') {
         return getAllAcceptedExtensions();
      }
      if (dataType === 'text') {
         return '.txt';
      }
      return '*';
   };

   const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      setIsImporting(true);
      setImportStatus(null);

      try {
         const fileExtension = getFileExtension(file.name);

         // Show file info for large files
         if (file.size > 500_000) {
            setImportStatus(
               `Importing ${formatFileSize(file.size)} ${fileExtension.toUpperCase().replace('.', '')} file...`
            );
         }

         const content = await file.text();

         let newData: unknown;

         if (dataType === 'text') {
            if (fileExtension !== '.txt') {
               throw new Error('Please select a valid text file (.txt)');
            }
            newData = content;
         } else {
            // JSON mode: auto-detect format from extension
            const match = getConverterByExtension(fileExtension);

            if (!match) {
               const supported = getAllAcceptedExtensions()
                  .split(',')
                  .map((e) => e.trim())
                  .join(', ');
               throw new Error(`Unsupported file format "${fileExtension || 'unknown'}". ` + `Supported: ${supported}`);
            }

            const { key } = match;

            // If it's already JSON, parse directly
            if (key === 'json') {
               try {
                  newData = JSON.parse(content);
               } catch (e) {
                  const msg = e instanceof Error ? e.message : 'Invalid JSON';
                  throw new Error(`Invalid JSON file: ${msg}`);
               }
            } else {
               // Use smart convert (auto Worker for large files, with fallback)
               try {
                  const { result: resultStr } = await smartConvert(key, 'toJson', content);
                  newData = JSON.parse(resultStr);
               } catch (e) {
                  const formatLabel = match.converter.label || key.toUpperCase();
                  const msg = e instanceof Error ? e.message : 'Conversion failed';
                  throw new Error(`Failed to parse ${formatLabel} file: ${msg}`);
               }
            }
         }

         onImport(newData);
      } catch (error) {
         const errorMessage = error instanceof Error ? error.message : 'Invalid file format';
         console.error('File import error:', error);

         if (onError) {
            onError(error instanceof Error ? error : new Error(errorMessage));
         } else {
            alert(errorMessage);
         }
      } finally {
         setIsImporting(false);
         setImportStatus(null);

         // Reset the input so the same file can be imported again
         if (fileInputRef.current) {
            fileInputRef.current.value = '';
         }
      }
   };

   const handleImportClick = () => {
      onImportClick?.();
      fileInputRef.current?.click();
   };

   return (
      <div className="import-button-wrapper">
         <Tooltip>
            <TooltipTrigger asChild>
               <div>
                  <Button
                     variant={variant}
                     size="sm"
                     onClick={handleImportClick}
                     disabled={isImporting}
                     aria-label={title}
                  >
                     {isImporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileInput />}
                  </Button>

                  <input
                     ref={fileInputRef}
                     type="file"
                     accept={getAcceptedFileType()}
                     onChange={handleFileSelect}
                     className="hidden"
                     aria-label="File input"
                  />
               </div>
            </TooltipTrigger>
            <TooltipContent>
               <p>{isImporting && importStatus ? importStatus : title}</p>
            </TooltipContent>
         </Tooltip>
      </div>
   );
}

export default ImportButton;
