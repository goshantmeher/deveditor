import { Metadata } from 'next';
import { AddPagesView } from '@/components/pdf-tools/add-pages/AddPagesView';
import { AddPagesSeoContent } from '@/components/pdf-tools/add-pages/docs/AddPagesSeoContent';

export const metadata: Metadata = {
   title: 'Add Pages to PDF | Insert PDF Pages Online Free',
   description:
      'Insert blank pages or merge entire PDF files into a specific location within your document. 100% secure, offline-first client-side tool.',
   keywords: 'add pages to pdf, insert pdf pages, merge pdf, insert blank page pdf, local pdf editor',
   alternates: {
      canonical: 'https://www.deveditor.io/add-pdf-pages',
   },
};

export default function AddPdfPagesPage() {
   return (
      <div id="page-top" className="flex flex-col">
         <div className="h-[calc(100vh-72px)] shrink-0">
            <AddPagesView />
         </div>
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <AddPagesSeoContent />
         </div>
      </div>
   );
}
