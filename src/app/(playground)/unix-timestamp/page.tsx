import { UnixTimestampView } from '@/components/unix-timestamp/UnixTimestampView';
import { Metadata } from 'next';
import { UnixTimestampSeoContent } from '@/components/unix-timestamp/docs/UnixTimestampSeoContent';

export const metadata: Metadata = {
   title: 'Unix Epoch Timestamp Converter - DevEditor',
   description:
      'Convert Unix epoch timestamps to human-readable dates and formats. Reverse convert standard ISO 8601 string dates cleanly back into 10 or 13-digit numerals directly offline safely.',
   keywords: [
      'unix timestamp',
      'epoch converter',
      'time converter',
      'timestamp to date',
      'human readable time',
      'posix time',
      'convert ms to date',
   ],
   openGraph: {
      title: 'Unix Epoch Timestamp Converter',
      description: 'Quickly evaluate 10-digit server epoch numerals directly into local time.',
      url: 'https://www.deveditor.io/unix-timestamp',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Realtime Epoch Converter',
      description: 'Live time tracking and POSIX derivation directly offline.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/unix-timestamp',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main tool viewport */}
         <div className="h-[calc(100vh-72px)] shrink-0">
            <UnixTimestampView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <UnixTimestampSeoContent />
         </div>
      </div>
   );
}
