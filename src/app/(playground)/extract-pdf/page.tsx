import { ExtractPdfView } from '@/components/pdf-tools/extract/ExtractPdfView';
import { ExtractPdfSeoContent } from '@/components/pdf-tools/extract/docs/ExtractPdfSeoContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Extract PDF Pages - Select & Download Pages | DevEditor',
   description:
      'Free online PDF page extractor. Select specific pages from a PDF and download them as a new document. 100% client-side.',
   keywords: ['extract pdf pages', 'pdf page extractor', 'select pdf pages', 'remove pdf pages', 'pdf editor'],
   openGraph: {
      title: 'Extract PDF Pages - Select & Download Pages',
      description: 'Pick specific pages from a PDF and download as a new file. Free, private, no sign-up.',
      url: 'https://www.deveditor.io/extract-pdf',
      type: 'website',
   },
   alternates: { canonical: 'https://www.deveditor.io/extract-pdf' },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         <div className="h-[calc(100vh-72px)] shrink-0">
            <ExtractPdfView />
         </div>
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <ExtractPdfSeoContent />
         </div>
      </div>
   );
}
