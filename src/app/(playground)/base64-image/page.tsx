import { Base64ImageView } from '@/components/base64-image/Base64ImageView';
import { Metadata } from 'next';
import { Base64ImageSeoContent } from '@/components/base64-image/docs/Base64ImageSeoContent';

export const metadata: Metadata = {
   title: 'Base64 to Image - DevEditor',
   description: 'Instantly preview and securely download Base64 image strings right inside your browser.',
   keywords: [
      'base64 to image',
      'base64 image viewer',
      'data uri preview',
      'base64 png decoder',
      'base64 jpg viewer',
      'base64 image decoder',
   ],
   openGraph: {
      title: 'Base64 to Image | DevEditor',
      description: 'Preview and extract Base64 Data URI images safely.',
      url: 'https://www.deveditor.io/base64-image',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Secure Image Decoder',
      description: 'The definitive tool for browser-first Base64 image preview and conversion.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/base64-image',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main tool viewport */}
         <div className="min-h-[calc(100vh-72px)] md:h-[calc(100vh-72px)] shrink-0">
            <Base64ImageView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <Base64ImageSeoContent />
         </div>
      </div>
   );
}
