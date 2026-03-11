import { Metadata } from 'next';
import { ImageToPdfView } from '@/components/pdf-tools/image-to-pdf/ImageToPdfView';
import { ImageToPdfSeoContent } from '@/components/pdf-tools/image-to-pdf/docs/ImageToPdfSeoContent';

export const metadata: Metadata = {
   title: 'Image to PDF Converter | Convert JPG & PNG to PDF Free',
   description:
      'Convert and merge multiple JPG or PNG images into a single PDF document perfectly. 100% secure, offline-first client-side file converter.',
   keywords: 'image to pdf, jpg to pdf, png to pdf, merge images, local pdf creator',
   alternates: {
      canonical: 'https://www.deveditor.io/image-to-pdf',
   },
};

export default function ImageToPdfPage() {
   return (
      <div id="page-top" className="flex flex-col">
         <div className="h-[calc(100vh-72px)] shrink-0">
            <ImageToPdfView />
         </div>
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <ImageToPdfSeoContent />
         </div>
      </div>
   );
}
