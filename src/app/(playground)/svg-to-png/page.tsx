import { Metadata } from 'next';
import { SvgToPngView } from '@/components/svg-to-png/SvgToPngView';
import { SvgToPngSeoContent } from '@/components/svg-to-png/docs/SvgToPngSeoContent';

export const metadata: Metadata = {
   title: 'SVG to PNG/JPEG Converter - Export at Custom Resolution | DevEditor',
   description:
      'Render SVG to raster at custom resolution. Export as PNG or JPEG. Paste code or upload a file. 100% client-side.',
   keywords: [
      'svg to png',
      'svg to jpeg',
      'svg converter',
      'svg rasterizer',
      'vector to raster',
      'export svg',
      'svg resolution',
   ],
   openGraph: {
      title: 'SVG to PNG/JPEG Converter | DevEditor',
      description: 'Convert SVG to high-resolution raster images entirely in your browser.',
      url: 'https://www.deveditor.io/svg-to-png',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'SVG to PNG/JPEG Converter',
      description: 'Render SVG to raster at custom resolution. Export as PNG or JPEG — 100% client-side.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/svg-to-png',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         <div className="md:h-[calc(100vh-72px)] shrink-0 overflow-y-auto">
            <SvgToPngView />
         </div>
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <SvgToPngSeoContent />
         </div>
      </div>
   );
}
