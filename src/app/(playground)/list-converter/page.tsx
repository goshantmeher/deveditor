import { ListConverterView } from '@/components/list-converter/ListConverterView';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'List / Array Converter - JSON Array, SQL IN, Python List & More',
   description:
      'Free online List & Array Converter. Paste text columns, CSV, or newline-separated values and instantly convert to JSON arrays, SQL IN() clauses, Python lists, Go slices, and more. 100% client-side processing.',
   keywords: [
      'list converter',
      'array converter',
      'json array',
      'sql in clause',
      'python list',
      'csv to json',
      'text to array',
      'go slice',
      'php array',
      'deduplicate list',
      'online tool',
   ],
   openGraph: {
      title: 'List / Array Converter - JSON, SQL, Python & More',
      description:
         'Paste any list and convert to JSON arrays, SQL IN() clauses, Python lists, Go slices, and more. Free, private, and instant.',
      url: 'https://www.deveditor.io/list-converter',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'List / Array Converter - Convert Lists to Code Instantly',
      description:
         'Paste text columns, CSV, or newline-separated values and convert to JSON arrays, SQL IN(), Python lists, and more.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/list-converter',
   },
};

import { ListConverterSeoContent } from '@/components/list-converter/docs/ListConverterSeoContent';

export default function Page() {
   return (
      
         <div id="page-top" className="flex flex-col">
            {/* The main tool viewport */}
            <div className="h-[calc(100vh-72px)] shrink-0">
               <ListConverterView />
            </div>

            {/* SEO Content directly in the DOM, below the fold */}
            <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
               <ListConverterSeoContent />
            </div>
         </div>
      
   );
}
