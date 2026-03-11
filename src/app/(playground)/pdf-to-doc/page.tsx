import { PdfToDocView } from '@/components/pdf-tools/pdf-to-doc/PdfToDocView';
import { PdfToDocSeoContent } from '@/components/pdf-tools/pdf-to-doc/docs/PdfToDocSeoContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'PDF to Word Converter - Free Online Convert PDF to Docx | DevEditor',
   description:
      'Free online PDF to Word document converter. Extract text content from any PDF document and save it as an editable .docx file locally in your browser. No server uploads.',
   keywords: ['pdf to word', 'pdf to doc', 'pdf converter', 'word converter', 'pdf text to word'],
   openGraph: {
      title: 'PDF to Word Converter - Extract Text to Docx',
      description: 'Convert any PDF into a Word document format. Total privacy, no file uploads.',
      url: 'https://www.deveditor.io/pdf-to-doc',
      type: 'website',
   },
   alternates: { canonical: 'https://www.deveditor.io/pdf-to-doc' },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         <div className="h-[calc(100vh-72px)] shrink-0">
            <PdfToDocView />
         </div>
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <PdfToDocSeoContent />
         </div>
      </div>
   );
}
