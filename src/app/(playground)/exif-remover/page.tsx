import { Metadata } from 'next';
import { ExifViewerView } from '@/components/exif-viewer/ExifViewerView';
import { ExifViewerSeoContent } from '@/components/exif-viewer/docs/ExifViewerSeoContent';

export const metadata: Metadata = {
   title: 'EXIF Data Viewer & Remover | DevEditor',
   description:
      'Read and strip metadata from photos — GPS, camera info, timestamps, and more. Protect your privacy before sharing. 100% client-side.',
   keywords: [
      'exif viewer',
      'exif remover',
      'strip metadata',
      'photo privacy',
      'remove gps data',
      'image metadata',
      'exif editor',
   ],
   openGraph: {
      title: 'EXIF Data Viewer & Remover | DevEditor',
      description: 'Inspect and strip hidden metadata from photos 100% in your browser. No uploads.',
      url: 'https://www.deveditor.io/exif-remover',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'EXIF Data Viewer & Remover',
      description: 'Read and strip photo metadata — GPS, camera info, and more. 100% client-side.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/exif-remover',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         <div className="md:h-[calc(100vh-72px)] shrink-0 overflow-y-auto">
            <ExifViewerView />
         </div>
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <ExifViewerSeoContent />
         </div>
      </div>
   );
}
