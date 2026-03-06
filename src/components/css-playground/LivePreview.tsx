'use client';
import React, { useMemo, useState } from 'react';
import { VIEWPORT_SIZES, PREVIEW_BACKGROUNDS, ViewportSize, PreviewBackground } from '@/constants/css-playground';
import { Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface LivePreviewProps {
   htmlContent: string;
   cssContent: string;
}

export function LivePreview({ htmlContent, cssContent }: LivePreviewProps) {
   const [viewport, setViewport] = useState<ViewportSize>('desktop');
   const [background, setBackground] = useState<PreviewBackground>('dark');
   const [isFullscreen, setIsFullscreen] = useState(false);

   const srcDoc = useMemo(() => {
      return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${cssContent}</style>
</head>
<body>${htmlContent}</body>
</html>`;
   }, [htmlContent, cssContent]);

   const previewContainerStyle = useMemo((): React.CSSProperties => {
      if (background === 'checkered') {
         return {
            backgroundImage:
               'linear-gradient(45deg, #1e1e2e 25%, transparent 25%), linear-gradient(-45deg, #1e1e2e 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1e1e2e 75%), linear-gradient(-45deg, transparent 75%, #1e1e2e 75%)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
            backgroundColor: '#2a2a3e',
         };
      }
      return {
         backgroundColor: PREVIEW_BACKGROUNDS[background].value,
      };
   }, [background]);

   return (
      <div className={`flex flex-col h-full ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : ''}`}>
         {/* Preview Controls */}
         <div className="flex items-center justify-between gap-2 px-3 py-1.5 border-b border-border/50 bg-muted/30 shrink-0 overflow-x-auto w-full">
            <div className="flex items-center gap-1.5 shrink-0">
               <span className="text-xs font-semibold text-muted-foreground mr-1.5 hidden sm:inline">Preview</span>
               {/* Viewport Size Toggles */}
               <TooltipProvider delayDuration={300}>
                  {(Object.keys(VIEWPORT_SIZES) as ViewportSize[]).map((size) => (
                     <Tooltip key={size}>
                        <TooltipTrigger asChild>
                           <button
                              onClick={() => setViewport(size)}
                              className={`px-1.5 py-0.5 rounded text-xs transition-colors ${
                                 viewport === size
                                    ? 'bg-primary/15 text-primary font-medium'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                              }`}
                              aria-label={`${VIEWPORT_SIZES[size].label} viewport`}
                           >
                              {VIEWPORT_SIZES[size].icon}
                           </button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="text-xs">
                           {VIEWPORT_SIZES[size].label} ({VIEWPORT_SIZES[size].width})
                        </TooltipContent>
                     </Tooltip>
                  ))}
               </TooltipProvider>
            </div>

            <div className="flex items-center gap-1.5">
               {/* Background Toggles */}
               <TooltipProvider delayDuration={300}>
                  {(Object.keys(PREVIEW_BACKGROUNDS) as PreviewBackground[]).map((bg) => (
                     <Tooltip key={bg}>
                        <TooltipTrigger asChild>
                           <button
                              onClick={() => setBackground(bg)}
                              className={`w-4 h-4 rounded-full border transition-all ${
                                 background === bg
                                    ? 'border-primary ring-1 ring-primary/50 scale-110'
                                    : 'border-border hover:border-foreground/30'
                              }`}
                              style={{
                                 backgroundColor: bg === 'checkered' ? undefined : PREVIEW_BACKGROUNDS[bg].value,
                                 backgroundImage:
                                    bg === 'checkered'
                                       ? 'linear-gradient(45deg, #666 25%, transparent 25%), linear-gradient(-45deg, #666 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #666 75%), linear-gradient(-45deg, transparent 75%, #666 75%)'
                                       : undefined,
                                 backgroundSize: bg === 'checkered' ? '8px 8px' : undefined,
                                 backgroundPosition: bg === 'checkered' ? '0 0, 0 4px, 4px -4px, -4px 0px' : undefined,
                              }}
                              aria-label={`${PREVIEW_BACKGROUNDS[bg].label} background`}
                           />
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="text-xs">
                           {PREVIEW_BACKGROUNDS[bg].label} background
                        </TooltipContent>
                     </Tooltip>
                  ))}
               </TooltipProvider>

               {/* Fullscreen Toggle */}
               <TooltipProvider delayDuration={300}>
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <Button
                           variant="ghost"
                           size="sm"
                           onClick={() => setIsFullscreen(!isFullscreen)}
                           className="h-6 w-6 p-0"
                           aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen preview'}
                        >
                           {isFullscreen ? (
                              <Minimize2 className="h-3.5 w-3.5" />
                           ) : (
                              <Maximize2 className="h-3.5 w-3.5" />
                           )}
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent side="bottom" className="text-xs">
                        {isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                     </TooltipContent>
                  </Tooltip>
               </TooltipProvider>
            </div>
         </div>

         {/* Preview Frame */}
         <div className="flex-1 flex items-start justify-center overflow-auto p-2" style={previewContainerStyle}>
            <iframe
               srcDoc={srcDoc}
               title="CSS Preview"
               className="border-0 rounded-lg shadow-lg transition-all duration-300"
               style={{
                  width: VIEWPORT_SIZES[viewport].width,
                  height: '100%',
                  maxWidth: '100%',
                  backgroundColor: '#ffffff',
               }}
               sandbox="allow-scripts"
               aria-label="Live CSS preview"
            />
         </div>
      </div>
   );
}
