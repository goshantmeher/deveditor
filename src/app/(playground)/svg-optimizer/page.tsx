import { SvgOptimizerView } from '@/components/svg-optimizer/SvgOptimizerView';
import { Metadata } from 'next';
import { SvgOptimizerSeoContent } from '@/components/svg-optimizer/docs/SvgOptimizerSeoContent';

export const metadata: Metadata = {
   title: 'SVG Optimizer - Minify & Compress SVGs (SVGO) - DevEditor',
   description:
      'Free online SVGO tool. Instantly compress, minify, and strip metadata from SVG raw elements without losing visual quality. 100% client side privacy.',
   keywords: ['svg', 'svgo', 'optimize', 'minify', 'compress', 'vector', 'clean'],
   openGraph: {
      title: 'SVG Optimizer - Compress SVGs Online',
      description: 'Minify raw SVG path lengths and strip unused vector data natively inside the browser.',
      url: 'https://www.deveditor.io/svg-optimizer',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'SVG Optimizer (SVGO) Tool',
      description: 'Compress messy SVGs to lightweight HTML-embedded elements securely online.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/svg-optimizer',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main tool viewport */}
         <div className="h-[calc(100vh-72px)] shrink-0">
            <SvgOptimizerView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <SvgOptimizerSeoContent />
         </div>
      </div>
   );
}
