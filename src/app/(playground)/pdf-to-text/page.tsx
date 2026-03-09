import { PdfToTextView } from '@/components/pdf-tools/copy-text/PdfToTextView';
import { PdfToTextSeoContent } from '@/components/pdf-tools/copy-text/docs/PdfToTextSeoContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Copy PDF Text - Extract Text from PDF Online | DevEditor',
   description:
      'Free online PDF text extractor. Copy text content from any PDF document to your clipboard. 100% client-side — your files never leave your browser.',
   keywords: ['pdf to text', 'extract text from pdf', 'copy pdf text', 'pdf text extractor', 'pdf reader online'],
   openGraph: {
      title: 'Copy PDF Text - Extract Text from PDF Online',
      description: 'Extract and copy text from any PDF. Free, private, no sign-up.',
      url: 'https://www.deveditor.io/pdf-to-text',
      type: 'website',
   },
   alternates: { canonical: 'https://www.deveditor.io/pdf-to-text' },
};

export default function Page() {
   return (
      
         <div id="page-top" className="flex flex-col">
            <div className="h-[calc(100vh-72px)] shrink-0">
               <PdfToTextView />
            </div>
            <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
               <PdfToTextSeoContent />
            </div>
         </div>
      
   );
}
