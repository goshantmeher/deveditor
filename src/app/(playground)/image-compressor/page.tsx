import { Metadata } from 'next';
import { ImageCompressorView } from '@/components/image-compressor/ImageCompressorView';
import { ImageCompressorSeoContent } from '@/components/image-compressor/docs/ImageCompressorSeoContent';

export const metadata: Metadata = {
   title: 'Image Compressor - Compress JPEG, PNG, WebP Locally | DevEditor',
   description:
      'Compress JPEG, PNG, and WebP images with an adjustable quality slider. Before/after comparison with file size savings. 100% client-side.',
   keywords: [
      'image compressor',
      'compress jpeg',
      'compress png',
      'compress webp',
      'reduce image size',
      'image optimizer',
      'client-side compression',
   ],
   openGraph: {
      title: 'Image Compressor | DevEditor',
      description: 'Compress images with adjustable quality. Before/after comparison — 100% in your browser.',
      url: 'https://www.deveditor.io/image-compressor',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Image Compressor | DevEditor',
      description: 'Compress JPEG, PNG, WebP images locally with adjustable quality slider.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/image-compressor',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         <div className="md:h-[calc(100vh-72px)] shrink-0 overflow-y-auto">
            <ImageCompressorView />
         </div>
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <ImageCompressorSeoContent />
         </div>
      </div>
   );
}
