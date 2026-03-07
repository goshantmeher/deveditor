import { MergePdfView } from '@/components/pdf-tools/merge/MergePdfView';
import { MergePdfSeoContent } from '@/components/pdf-tools/merge/docs/MergePdfSeoContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Merge PDF Files Online - Combine PDFs Instantly | DevEditor',
   description:
      'Free online PDF merger. Combine multiple PDF files into one document instantly. Drag to reorder, merge & download. 100% client-side — your files never leave your browser.',
   keywords: [
      'merge pdf',
      'combine pdf',
      'pdf merger',
      'merge pdf online',
      'combine pdf files',
      'join pdf',
      'pdf combiner',
      'merge pdf free',
      'pdf tool',
      'online pdf merger',
   ],
   openGraph: {
      title: 'Merge PDF Files Online - Combine PDFs Instantly',
      description: 'Free PDF merger. Drag to reorder, click to merge. 100% client-side privacy.',
      url: 'https://www.deveditor.io/merge-pdf',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Merge PDF Files Online',
      description: 'Combine multiple PDFs into one document. Free, private, no sign-up.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/merge-pdf',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         <div className="h-[calc(100vh-72px)] shrink-0">
            <MergePdfView />
         </div>
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <MergePdfSeoContent />
         </div>
      </div>
   );
}
