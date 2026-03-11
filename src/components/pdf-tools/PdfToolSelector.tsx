'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Scissors, Copy, Layers, FilePlus, Image as ImageIcon } from 'lucide-react';

const PDF_TOOLS = [
   { label: 'Merge PDF', href: '/merge-pdf', icon: Layers },
   { label: 'Split PDF', href: '/split-pdf', icon: Scissors },
   { label: 'Extract Pages', href: '/extract-pdf', icon: FileText },
   { label: 'Copy PDF Text', href: '/pdf-to-text', icon: Copy },
   { label: 'PDF to Word', href: '/pdf-to-doc', icon: FileText },
   { label: 'Add Pages to PDF', href: '/add-pdf-pages', icon: FilePlus },
   { label: 'Image to PDF', href: '/image-to-pdf', icon: ImageIcon },
];

export function PdfToolSelector() {
   const router = useRouter();
   const pathname = usePathname();

   const currentTool = PDF_TOOLS.find((t) => pathname.startsWith(t.href)) || PDF_TOOLS[0];

   return (
      <Select value={currentTool.href} onValueChange={(value) => router.push(value)}>
         <SelectTrigger className="h-8 w-[160px] text-xs bg-muted/30 border-border">
            <SelectValue />
         </SelectTrigger>
         <SelectContent>
            {PDF_TOOLS.map((tool) => (
               <SelectItem key={tool.href} value={tool.href} className="text-xs">
                  <div className="flex items-center gap-2">
                     <tool.icon className="w-3.5 h-3.5" />
                     {tool.label}
                  </div>
               </SelectItem>
            ))}
         </SelectContent>
      </Select>
   );
}
