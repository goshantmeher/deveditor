import { SqlFormatterView } from '@/components/sql-formatter/SqlFormatterView';
import { Metadata } from 'next';
import { SqlFormatterSeoContent } from '@/components/sql-formatter/docs/SqlFormatterSeoContent';

export const metadata: Metadata = {
   title: 'SQL Formatter - Live Postgres, MySQL, & SQL beautifier',
   description:
      'Format, beautify, and strictly organize complex SQL queries into readable, multi-line statements. 100% Client-side. No tracking. Absolutely secure.',
   keywords: [
      'sql formatter',
      'beautify sql',
      'format postgresql',
      'sql parser',
      'sql syntax highlighter',
      'mysql formatter',
   ],
   openGraph: {
      title: 'SQL Formatter | DevEditor',
      description: 'Format, align, and organize database constraints purely locally.',
      url: 'https://www.deveditor.io/sql-formatter',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Fix SQL Structures Instantly',
      description: 'The secure, purely-frontend SQL formatting stack.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/sql-formatter',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main tool viewport */}
         <div className="h-[calc(100vh-72px)] shrink-0">
            <SqlFormatterView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <SqlFormatterSeoContent />
         </div>
      </div>
   );
}
