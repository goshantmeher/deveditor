import { JsonCompareView } from '@/components/json-compare/JsonCompareView';
import { Metadata } from 'next';
import { JsonCompareSeoContent } from '@/components/json-compare/docs/JsonCompareSeoContent';

export const metadata: Metadata = {
   title: 'JSON Compare / Diff - Visual Validator & Key Sorter',
   description:
      'Compare deep structural differences between two JSON payloads right inside your browser. Analyze objects securely with automatic sorting, canonical repairing, and robust visual diff rendering.',
   keywords: [
      'json diff',
      'json compare',
      'json checker',
      'compare json files',
      'json text diff',
      'diff json string',
      'json format comparator',
   ],
   openGraph: {
      title: 'JSON Compare / Diff | DevEditor',
      description: 'Find structural changes easily with automatic JSON key sorting and semantic diff.',
      url: 'https://www.deveditor.io/json-compare',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Compare JSON Objects Fast',
      description: 'The secure, visual, structural JSON Diff Checker you can rely on completely locally.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/json-compare',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main tool viewport */}
         <div className="h-[calc(100vh-72px)] shrink-0">
            <JsonCompareView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <JsonCompareSeoContent />
         </div>
      </div>
   );
}
