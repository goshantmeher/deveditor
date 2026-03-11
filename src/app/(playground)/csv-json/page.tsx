import { CsvJsonView } from '@/components/csv-json/CsvJsonView';
import { Metadata } from 'next';
import { CsvJsonSeoContent } from '@/components/csv-json/docs/CsvJsonSeoContent';

export const metadata: Metadata = {
   title: 'CSV to JSON Converter - DevEditor',
   description:
      'Bi-directionally convert CSV datasets to rigid JSON array mapped formats instantly safely securely offline directly inside your terminal workflow environment.',
   keywords: [
      'csv to json',
      'json to csv',
      'csv converter',
      'json converter',
      'convert csv',
      'format csv',
      'parse csv',
   ],
   openGraph: {
      title: 'Bi-Directional CSV ↔ JSON Tool',
      description: 'Format complex spreadsheet datasets robustly completely safely offline.',
      url: 'https://www.deveditor.io/csv-json',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'CSV & JSON Transpiler',
      description: 'Format dataset structures fundamentally mapping instantly safely locally.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/csv-json',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main tool viewport */}
         <div className="min-h-[calc(100vh-72px)] md:h-[calc(100vh-72px)] shrink-0">
            <CsvJsonView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <CsvJsonSeoContent />
         </div>
      </div>
   );
}
