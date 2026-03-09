import { AsciiArtView } from '@/components/ascii-art/AsciiArtView';
import { Metadata } from 'next';
import { AsciiArtSeoContent } from '@/components/ascii-art/docs/AsciiArtSeoContent';

export const metadata: Metadata = {
   title: 'ASCII Art Text Generator - DevEditor',
   description:
      'Instantly generate massive, striking ASCII art text banners flawlessly using popular Figlet fonts securely offline in your browser for code comments and CLIs.',
   keywords: ['ascii art generator', 'figlet', 'text to ascii', 'code banner generator', 'comment header', 'terminal logo generator'],
   openGraph: {
      title: 'ASCII Art Text Generator (Figlet)',
      description: 'Convert regular text into high-impact ASCII string art offline.',
      url: 'https://www.deveditor.io/ascii-art',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Figlet ASCII Text Generator',
      description: 'Craft dynamic comment headers rigorously and instantly.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/ascii-art',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main tool viewport */}
         <div className="h-[calc(100vh-72px)] shrink-0">
            <AsciiArtView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <AsciiArtSeoContent />
         </div>
      </div>
   );
}
