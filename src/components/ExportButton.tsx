'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Button } from './ui/button';
import { FileOutput, Loader2, AlertTriangle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import {
   type FormatKey,
   getExportableFormats,
   getConverter,
} from '@/lib/converters/setup';
import {
   smartConvert,
   formatFileSize,
   saveLastExportFormat,
   loadLastExportFormat,
} from '@/lib/converters/smart-convert';

interface ExportButtonProps {
   data: unknown;
   variant?: 'ghost' | 'default' | 'secondary';
   title?: string;
}

function ExportButton({
   data,
   variant = 'ghost',
   title = 'Export File',
}: ExportButtonProps) {
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [fileName, setFileName] = useState('data');
   const [selectedFormat, setSelectedFormat] = useState<FormatKey>('json');
   const [isExporting, setIsExporting] = useState(false);
   const [exportError, setExportError] = useState<string | null>(null);
   const [exportStatus, setExportStatus] = useState<string | null>(null);

   // Parse data (may arrive as a string from the editor)
   const parsedData = useMemo(() => {
      if (typeof data === 'string') {
         try {
            return JSON.parse(data);
         } catch {
            return data;
         }
      }
      return data;
   }, [data]);

   // Estimate data size for loading indicator
   const dataSize = useMemo(() => {
      try {
         return JSON.stringify(parsedData).length;
      } catch {
         return 0;
      }
   }, [parsedData]);

   // Get all formats that can export the current data
   const exportableFormats = useMemo(
      () => getExportableFormats(parsedData),
      [parsedData]
   );

   // Get the current format's converter info
   const currentFormat = useMemo(
      () => exportableFormats.find((f) => f.key === selectedFormat),
      [exportableFormats, selectedFormat]
   );

   // Load last used format from localStorage on dialog open
   useEffect(() => {
      if (isDialogOpen) {
         const saved = loadLastExportFormat();
         if (saved && exportableFormats.some((f) => f.key === saved)) {
            setSelectedFormat(saved as FormatKey);
         }
      }
   }, [isDialogOpen, exportableFormats]);

   // Reset format if selected format can't export current data
   useEffect(() => {
      if (!currentFormat && exportableFormats.length > 0) {
         setSelectedFormat(exportableFormats[0].key);
      }
   }, [currentFormat, exportableFormats]);

   // Clear error when dialog opens or format changes
   useEffect(() => {
      setExportError(null);
      setExportStatus(null);
   }, [isDialogOpen, selectedFormat]);

   const handleExport = useCallback(async () => {
      if (!currentFormat) return;

      setIsExporting(true);
      setExportError(null);
      setExportStatus(
         dataSize > 500_000
            ? `Converting ${formatFileSize(dataSize)} to ${currentFormat.converter.label}...`
            : null
      );

      try {
         const converter = getConverter(selectedFormat);
         if (!converter) throw new Error(`No converter for ${selectedFormat}`);

         // Use smart convert (auto Worker for large files, with fallback)
         const jsonStr = JSON.stringify(parsedData);
         const { result: content } = await smartConvert(
            selectedFormat,
            'fromJson',
            jsonStr
         );

         // Build filename with correct extension
         const trimmedName = fileName.trim() || 'data';
         const baseName = trimmedName.replace(/\.[^.]+$/, '');
         const fileNameWithExt = `${baseName}${converter.extension}`;

         // Create blob and trigger download
         const blob = new Blob([content], { type: converter.mimeType });
         const url = URL.createObjectURL(blob);
         const link = document.createElement('a');
         link.href = url;
         link.download = fileNameWithExt;
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
         URL.revokeObjectURL(url);

         // Remember the format choice
         saveLastExportFormat(selectedFormat);

         // Close dialog and reset
         setIsDialogOpen(false);
         setFileName('data');
      } catch (err) {
         const msg = err instanceof Error ? err.message : 'Export failed';
         setExportError(msg);
         console.error('Export error:', err);
      } finally {
         setIsExporting(false);
         setExportStatus(null);
      }
   }, [currentFormat, selectedFormat, parsedData, fileName, dataSize]);

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         e.preventDefault();
         handleExport();
      }
   };

   return (
      <>
         <Tooltip>
            <TooltipTrigger asChild>
               <div>
                  <Button
                     variant={variant}
                     size="sm"
                     onClick={() => setIsDialogOpen(true)}
                     aria-label={title}
                  >
                     <FileOutput />
                  </Button>
               </div>
            </TooltipTrigger>
            <TooltipContent>
               <p>{title}</p>
            </TooltipContent>
         </Tooltip>

         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-md">
               <DialogHeader>
                  <DialogTitle>Export File</DialogTitle>
                  <DialogDescription>
                     Choose a format and enter a file name for export.
                  </DialogDescription>
               </DialogHeader>

               {/* Format Selector */}
               <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                     Format
                  </label>
                  <div className="flex flex-wrap gap-2">
                     {exportableFormats.map(({ key, converter, warning }) => (
                        <button
                           key={key}
                           onClick={() => setSelectedFormat(key)}
                           className={`
                              px-3 py-1.5 text-sm rounded-md border transition-colors
                              ${
                                 selectedFormat === key
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'bg-background text-foreground border-border hover:bg-accent'
                              }
                           `}
                           title={warning || undefined}
                        >
                           {converter.label}
                           {warning && (
                              <AlertTriangle className="inline-block ml-1 h-3 w-3 text-yellow-500" />
                           )}
                        </button>
                     ))}
                  </div>

                  {/* Format warning */}
                  {currentFormat?.warning && (
                     <p className="text-xs text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3 shrink-0" />
                        {currentFormat.warning}
                     </p>
                  )}
               </div>

               {/* Filename Input */}
               <div className="flex items-center gap-2">
                  <Input
                     value={fileName}
                     onChange={(e) => setFileName(e.target.value)}
                     onKeyDown={handleKeyDown}
                     placeholder="Enter file name"
                     className="flex-1"
                     autoFocus
                     disabled={isExporting}
                     aria-label="File name"
                  />
                  <span className="text-sm text-muted-foreground">
                     {currentFormat?.converter.extension || '.json'}
                  </span>
               </div>

               {/* Export Error */}
               {exportError && (
                  <p className="text-sm text-destructive">{exportError}</p>
               )}

               <DialogFooter>
                  <Button
                     variant="outline"
                     onClick={() => setIsDialogOpen(false)}
                     disabled={isExporting}
                  >
                     Cancel
                  </Button>
                  <Button
                     onClick={handleExport}
                     disabled={isExporting || !currentFormat}
                  >
                     {isExporting ? (
                        <>
                           <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                           {exportStatus || 'Converting...'}
                        </>
                     ) : (
                        'Download'
                     )}
                  </Button>
               </DialogFooter>
            </DialogContent>
         </Dialog>
      </>
   );
}

export default ExportButton;
