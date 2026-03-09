import { SplitPdfView } from '@/components/pdf-tools/split/SplitPdfView';
import { SplitPdfSeoContent } from '@/components/pdf-tools/split/docs/SplitPdfSeoContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Split PDF Online - Cut PDF into Multiple Files | DevEditor',
   description:
      'Free online PDF splitter. Define page ranges and split a PDF into separate files. Download instantly. 100% client-side — your files never leave your browser.',
   keywords: ['split pdf', 'pdf splitter', 'cut pdf', 'split pdf online', 'divide pdf', 'pdf pages'],
   openGraph: {
      title: 'Split PDF Online - Cut PDF into Multiple Files',
      description: 'Split PDFs into separate files by page range. Free, private, no sign-up.',
      url: 'https://www.deveditor.io/split-pdf',
      type: 'website',
   },
   alternates: { canonical: 'https://www.deveditor.io/split-pdf' },
};

export default function Page() {
   return (
      
         <div id="page-top" className="flex flex-col">
            <div className="h-[calc(100vh-72px)] shrink-0">
               <SplitPdfView />
            </div>
            <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
               <SplitPdfSeoContent />
            </div>
         </div>
      
   );
}
