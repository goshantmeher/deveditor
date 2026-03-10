import { Base64FileView } from '@/components/base64-file/Base64FileView';
import { Metadata } from 'next';
import { Base64FileSeoContent } from '@/components/base64-file/docs/Base64FileSeoContent';

export const metadata: Metadata = {
   title: 'Base64 File Encoder/Decoder - DevEditor',
   description:
      'Convert any file into a Base64 string instantly in your browser, or paste a Base64 data URI to download the original file securely.',
   keywords: [
      'base64 file encoder',
      'base64 decoder',
      'file to base64',
      'image to base64',
      'pdf to base64',
      'data uri decoder',
   ],
   openGraph: {
      title: 'Base64 File Encoder/Decoder | DevEditor',
      description: 'Convert extremely large files into text strings safely and privately.',
      url: 'https://www.deveditor.io/base64-file',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Precision Base64 File Tool',
      description: 'The definitive tool for browser-first Base64 file conversion.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/base64-file',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main tool viewport */}
         <div className="min-h-[calc(100vh-72px)] md:h-[calc(100vh-72px)] shrink-0">
            <Base64FileView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <Base64FileSeoContent />
         </div>
      </div>
   );
}
