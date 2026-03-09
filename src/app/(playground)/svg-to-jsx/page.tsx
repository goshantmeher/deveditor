import { SvgToJsxView } from '@/components/svg-to-jsx/SvgToJsxView';
import { Metadata } from 'next';
import { SvgToJsxSeoContent } from '@/components/svg-to-jsx/docs/SvgToJsxSeoContent';

export const metadata: Metadata = {
   title: 'SVG to React / JSX Converter - DevEditor',
   description:
      'Instantly convert raw SVG elements into clean, camelCase formatted React JSX components online automatically. 100% free and client side privacy.',
   keywords: ['svg', 'react', 'jsx', 'convert', 'camelcase', 'generator', 'component'],
   openGraph: {
      title: 'SVG to React JSX Component Converter',
      description: 'Convert raw SVG paths into React JSX instantly in your browser.',
      url: 'https://www.deveditor.io/svg-to-jsx',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'SVG to React JSX Converter',
      description: 'Easily change snake-case SVG props to JSX object styles and camelCase tags.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/svg-to-jsx',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main tool viewport */}
         <div className="h-[calc(100vh-72px)] shrink-0">
            <SvgToJsxView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <SvgToJsxSeoContent />
         </div>
      </div>
   );
}
