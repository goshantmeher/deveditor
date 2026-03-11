import { Metadata } from 'next';
import { IconBuilderView } from '@/components/icon-builder/IconBuilderView';
import { IconBuilderSeoContent } from '@/components/icon-builder/docs/IconBuilderSeoContent';

export const metadata: Metadata = {
   title: 'Icon Font & Sprite Builder - Free Icon Picker - DevEditor',
   description:
      'Browse thousands of free open source icons, create your custom collection, and export as SVG sprites or React Components efficiently in your browser.',
   keywords: [
      'icon font',
      'svg sprite',
      'icon builder',
      'lucide icons generator',
      'custom icon library',
      'react icon builder',
   ],
   openGraph: {
      title: 'Free Icon Builder & SVG Sprite Generator',
      description: 'Select exactly the icons you need from top libraries and export custom SVG bundles instantly.',
      url: 'https://www.deveditor.io/icon-builder',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Icon Builder - Custom SVG Sprite Generator',
      description:
         'Browse, select, and build customized lightweight icon bundles from libraries like Lucide directly in your browser.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/icon-builder',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main tool viewport */}
         <div className="h-[calc(100vh-72px)] shrink-0 overflow-hidden">
            <IconBuilderView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <IconBuilderSeoContent />
         </div>
      </div>
   );
}
