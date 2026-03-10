import { ImageConverterView } from '@/components/image-converter/ImageConverterView';
import { Metadata } from 'next';
import { ImageConverterSeoContent } from '@/components/image-converter/docs/ImageConverterSeoContent';

export const metadata: Metadata = {
   title: 'Image Converter & Cropper - Resize to WebP Locally',
   description:
      'Upload images securely without cloud servers. Visually crop, explicitly resize, and optimize quality payloads natively into WebP, JPEG, and PNG components entirely within your browser API instances.',
   keywords: [
      'image converter',
      'compress webp',
      'resize image local',
      'crop picture tool',
      'convert png to jpeg',
      'image optimizer',
   ],
   openGraph: {
      title: 'Image Converter Studio | DevEditor',
      description: 'Crop and compress payloads 100% securely and natively inside your local web engine.',
      url: 'https://www.deveditor.io/image-converter',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Shrink Visual Payloads Instantly',
      description: 'The purely local engine to crop and convert standard images identically.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/image-converter',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main tool viewport */}
         <div className="md:h-[calc(100vh-72px)] shrink-0 overflow-y-auto">
            <ImageConverterView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <ImageConverterSeoContent />
         </div>
      </div>
   );
}
