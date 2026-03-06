'use client';
import { useCallback } from 'react';
import { CSS_PRESETS, CssPreset } from '@/constants/css-playground';
import { Copy, Download, RotateCcw, ChevronDown, FileCode2, Paintbrush } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
   DropdownMenuSeparator,
   DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface CssPlaygroundToolbarProps {
   onPresetSelect: (preset: CssPreset) => void;
   htmlContent: string;
   cssContent: string;
   onReset: () => void;
   activePresetId: string | null;
}

export function CssPlaygroundToolbar({
   onPresetSelect,
   htmlContent,
   cssContent,
   onReset,
   activePresetId,
}: CssPlaygroundToolbarProps) {
   const copyToClipboard = useCallback(async (text: string, type: string) => {
      try {
         await navigator.clipboard.writeText(text);
         // Could add a toast notification here
         console.log(`${type} copied to clipboard`);
      } catch {
         console.error('Failed to copy to clipboard');
      }
   }, []);

   const exportAsHtml = useCallback(() => {
      const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Playground Export</title>
  <style>
${cssContent}
  </style>
</head>
<body>
${htmlContent}
</body>
</html>`;

      const blob = new Blob([fullHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'css-playground-export.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
   }, [htmlContent, cssContent]);

   const activePreset = activePresetId ? CSS_PRESETS.find((p) => p.id === activePresetId) : null;

   return (
      <div className="flex items-center justify-between px-3 py-1.5 border-b md:border-b-0 border-border/50 bg-muted/30 shrink-0 gap-2 overflow-x-auto w-full">
         {/* Left: Presets */}
         <div className="flex items-center gap-2">
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 gap-1.5 text-xs font-medium">
                     <Paintbrush className="h-3.5 w-3.5" />
                     <span className="hidden sm:inline">{activePreset ? activePreset.name : 'Templates'}</span>
                     <ChevronDown className="h-3 w-3 opacity-60" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuLabel className="text-xs">Preset Templates</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {CSS_PRESETS.map((preset) => (
                     <DropdownMenuItem
                        key={preset.id}
                        onClick={() => onPresetSelect(preset)}
                        className={`gap-2 cursor-pointer ${activePresetId === preset.id ? 'bg-accent' : ''}`}
                     >
                        <span className="text-base">{preset.icon}</span>
                        <div className="flex flex-col">
                           <span className="text-sm font-medium">{preset.name}</span>
                           <span className="text-xs text-muted-foreground">{preset.description}</span>
                        </div>
                     </DropdownMenuItem>
                  ))}
               </DropdownMenuContent>
            </DropdownMenu>

            {/* Quick Preset Buttons (visible on larger screens) */}
            <div className="hidden md:flex items-center gap-1">
               {CSS_PRESETS.slice(0, 5).map((preset) => (
                  <TooltipProvider key={preset.id} delayDuration={300}>
                     <Tooltip>
                        <TooltipTrigger asChild>
                           <button
                              onClick={() => onPresetSelect(preset)}
                              className={`px-2 py-0.5 rounded text-xs transition-colors ${
                                 activePresetId === preset.id
                                    ? 'bg-primary/15 text-primary font-medium'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                              }`}
                           >
                              {preset.icon} {preset.name}
                           </button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="text-xs">
                           {preset.description}
                        </TooltipContent>
                     </Tooltip>
                  </TooltipProvider>
               ))}
            </div>
         </div>

         {/* Right: Actions */}
         <div className="flex items-center gap-1">
            <TooltipProvider delayDuration={300}>
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 gap-1.5 text-xs"
                        onClick={() => copyToClipboard(htmlContent, 'HTML')}
                     >
                        <FileCode2 className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">HTML</span>
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-xs">
                     Copy HTML
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={300}>
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 gap-1.5 text-xs"
                        onClick={() => copyToClipboard(cssContent, 'CSS')}
                     >
                        <Copy className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">CSS</span>
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-xs">
                     Copy CSS
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>

            <TooltipProvider delayDuration={300}>
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button variant="ghost" size="sm" className="h-7 gap-1.5 text-xs" onClick={exportAsHtml}>
                        <Download className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Export</span>
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-xs">
                     Export as HTML file
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>

            <div className="w-px h-4 bg-border/50 mx-0.5" />

            <TooltipProvider delayDuration={300}>
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 gap-1.5 text-xs text-muted-foreground hover:text-destructive"
                        onClick={onReset}
                     >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Reset</span>
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-xs">
                     Reset to defaults
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>
         </div>
      </div>
   );
}
