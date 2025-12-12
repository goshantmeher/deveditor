import React, { useRef } from 'react';
import { Button } from './ui/button';
import { FileInput } from 'lucide-react';
import { parseJson } from '@/lib/parser';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

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

   const getFileExtension = (filename: string): string => {
      return filename.toLowerCase().split('.').pop() || '';
   };

   const getAcceptedFileType = (): string => {
      switch (dataType) {
         case 'json':
            return '.json';
         case 'text':
            return '.txt';
         default:
            return '*';
      }
   };

   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
         try {
            const content = e.target?.result as string;
            const fileExtension = getFileExtension(file.name);
            let newData: unknown;

            switch (dataType) {
               case 'json':
                  if (fileExtension !== 'json') {
                     throw new Error('Please select a valid JSON file (.json)');
                  }
                  newData = parseJson(content);
                  break;
               case 'text':
                  if (fileExtension !== 'txt') {
                     throw new Error('Please select a valid text file (.txt)');
                  }
                  newData = content;
                  break;
               default:
                  throw new Error(`Unsupported file type: ${dataType}`);
            }

            onImport(newData);

            // Reset the input so the same file can be imported again
            if (fileInputRef.current) {
               fileInputRef.current.value = '';
            }
         } catch (error) {
            const errorMessage =
               error instanceof Error ? error.message : 'Invalid file format';
            console.error('File import error:', error);

            if (onError) {
               onError(
                  error instanceof Error ? error : new Error(errorMessage)
               );
            } else {
               // Fallback to alert if no error handler provided
               alert(errorMessage);
            }
         }
      };
      reader.readAsText(file);
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
                     aria-label={title}
                  >
                     <FileInput />
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
               <p>{title}</p>
            </TooltipContent>
         </Tooltip>
      </div>
   );
}

export default ImportButton;
