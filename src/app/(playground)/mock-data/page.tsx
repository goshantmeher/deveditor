import { MockDataView } from '@/components/mock-data/MockDataView';
import { Metadata } from 'next';
import { MockDataSeoContent } from '@/components/mock-data/docs/MockDataSeoContent';

export const metadata: Metadata = {
   title: 'Mock Data Generator - Fake JSON & CSV Builder',
   description:
      'Generate thousands of rows of realistic dummy data instantly inside your browser. Support for fake names, UUIDs, addresses, formatted perfectly into JSON or CSV exports. 100% Client-side.',
   keywords: [
      'mock data generator',
      'fake data maker',
      'dummy data json',
      'csv test data',
      'faker builder',
      'free api mock',
      'generate JSON',
      'generate CSV',
   ],
   openGraph: {
      title: 'Mock Data Generator | DevEditor',
      description: 'Generate massive sandbox datasets straight from your local browser environments.',
      url: 'https://www.deveditor.io/mock-data',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Precision Sandbox Schema Builder',
      description: 'The definitive tool for browser-first sandbox data prototyping.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/mock-data',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main tool viewport */}
         <div className="min-h-[calc(100vh-72px)] md:h-[calc(100vh-72px)] shrink-0">
            <MockDataView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <MockDataSeoContent />
         </div>
      </div>
   );
}
