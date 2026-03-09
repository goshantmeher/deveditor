import { FontPairView } from '@/components/font-pair/FontPairView';
import { Metadata } from 'next';
import { FontPairSeoContent } from '@/components/font-pair/docs/FontPairSeoContent';

export const metadata: Metadata = {
   title: 'Font Pair Previewer - Test Google Font Combinations - DevEditor',
   description:
      'Preview trending Google Font pairings instantly. Test combinations of heading and body typography with adjustable sizing and weighting, and generate ready-to-use HTML and Tailwind configuration code.',
   keywords: ['font pair', 'font pairing', 'font combinations', 'google fonts', 'typography tool', 'tailwind fonts', 'font preview', 'web design typography'],
   openGraph: {
      title: 'Font Pair & Typography Sandbox',
      description: 'Discover beautiful Google Font combinations for web design perfectly.',
      url: 'https://www.deveditor.io/font-pair',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Google Font Pairing Previewer',
      description: 'Discover perfect heading and body font sets instantly.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/font-pair',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main tool viewport */}
         <div className="h-[calc(100vh-72px)] shrink-0">
            <FontPairView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <FontPairSeoContent />
         </div>
      </div>
   );
}
