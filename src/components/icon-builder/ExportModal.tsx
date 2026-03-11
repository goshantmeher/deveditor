import React, { useState } from 'react';
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { IconData } from '@/types/icon-builder';
import { Download, Copy, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ExportModalProps {
   open: boolean;
   onOpenChange: (open: boolean) => void;
   cart: IconData[];
}

export function ExportModal({ open, onOpenChange, cart }: ExportModalProps) {
   const [copied, setCopied] = useState<string | null>(null);

   const generateRawSvg = () => {
      const svgs = cart.map(
         (
            icon
         ) => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="${icon.viewBox || '0 0 24 24'}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-${icon.name}">
  ${icon.svg}
</svg>`
      );
      return svgs.join('\n\n');
   };

   const generateSprite = () => {
      const symbols = cart
         .map(
            (icon) => `<symbol id="${icon.name}" viewBox="${icon.viewBox || '0 0 24 24'}">
  ${icon.svg}
</symbol>`
         )
         .join('\n');

      return `<svg xmlns="http://www.w3.org/2000/svg" style="display: none;">\n${symbols}\n</svg>`;
   };

   const generateReactComponent = () => {
      const imports = "import React from 'react';\n\n";

      const components = cart
         .map((icon) => {
            // Convert name to PascalCase for component name
            const componentName =
               icon.name
                  .split('-')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join('') + 'Icon';
            return `export function ${componentName}(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="${icon.viewBox}" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      ${icon.svg}
    </svg>
  );
}`;
         })
         .join('\n\n');

      return imports + components;
   };

   const handleDownload = (content: string, filename: string, mimeType: string) => {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
   };

   const handleCopy = (content: string, id: string) => {
      navigator.clipboard.writeText(content);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
   };

   return (
      <Dialog open={open} onOpenChange={onOpenChange}>
         <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
               <DialogTitle>Export {cart.length} Icons</DialogTitle>
               <DialogDescription>
                  Choose your preferred format for exporting your custom icon collection.
               </DialogDescription>
            </DialogHeader>

            <div className="py-4">
               <Tabs defaultValue="raw">
                  <TabsList className="grid w-full grid-cols-3">
                     <TabsTrigger value="raw">Raw SVGs</TabsTrigger>
                     <TabsTrigger value="sprite">SVG Sprite</TabsTrigger>
                     <TabsTrigger value="react">React</TabsTrigger>
                  </TabsList>

                  <TabsContent value="raw" className="mt-4">
                     <div className="bg-muted/50 p-4 rounded-md border text-sm font-mono overflow-auto max-h-[300px] whitespace-pre-wrap">
                        {generateRawSvg()}
                     </div>

                     <DialogFooter className="mt-6 flex gap-2">
                        <Button variant="outline" onClick={() => handleCopy(generateRawSvg(), 'raw')}>
                           {copied === 'raw' ? (
                              <Check size={16} className="mr-2" />
                           ) : (
                              <Copy size={16} className="mr-2" />
                           )}
                           {copied === 'raw' ? 'Copied!' : 'Copy Code'}
                        </Button>
                        <Button onClick={() => handleDownload(generateRawSvg(), 'icons.svg', 'image/svg+xml')}>
                           <Download size={16} className="mr-2" /> Download SVG
                        </Button>
                     </DialogFooter>
                  </TabsContent>

                  <TabsContent value="sprite" className="mt-4">
                     <div className="bg-muted/50 p-4 rounded-md border text-sm font-mono overflow-auto max-h-[300px] whitespace-pre-wrap">
                        {generateSprite()}
                     </div>

                     <DialogFooter className="mt-6 flex gap-2">
                        <Button variant="outline" onClick={() => handleCopy(generateSprite(), 'sprite')}>
                           {copied === 'sprite' ? (
                              <Check size={16} className="mr-2" />
                           ) : (
                              <Copy size={16} className="mr-2" />
                           )}
                           {copied === 'sprite' ? 'Copied!' : 'Copy Code'}
                        </Button>
                        <Button onClick={() => handleDownload(generateSprite(), 'sprite.svg', 'image/svg+xml')}>
                           <Download size={16} className="mr-2" /> Download SVG
                        </Button>
                     </DialogFooter>
                  </TabsContent>

                  <TabsContent value="react" className="mt-4">
                     <div className="bg-muted/50 p-4 rounded-md border text-sm font-mono overflow-auto max-h-[300px] whitespace-pre-wrap">
                        {generateReactComponent()}
                     </div>

                     <DialogFooter className="mt-6 flex gap-2">
                        <Button variant="outline" onClick={() => handleCopy(generateReactComponent(), 'react')}>
                           {copied === 'react' ? (
                              <Check size={16} className="mr-2" />
                           ) : (
                              <Copy size={16} className="mr-2" />
                           )}
                           {copied === 'react' ? 'Copied!' : 'Copy Code'}
                        </Button>
                        <Button onClick={() => handleDownload(generateReactComponent(), 'Icons.tsx', 'text/tsx')}>
                           <Download size={16} className="mr-2" /> Download .tsx
                        </Button>
                     </DialogFooter>
                  </TabsContent>
               </Tabs>
            </div>
         </DialogContent>
      </Dialog>
   );
}
