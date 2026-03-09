import { UuidGeneratorView } from '@/components/uuid-generator/UuidGeneratorView';
import { PersistenceProvider } from '@/contexts/PersistenceContext';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'UUID & ULID Generator - Generate Unique IDs Online',
   description:
      'Generate cryptographically secure v4 UUIDs and sortable ULIDs powered entirely by your browser. Bulk generate up to 5000 ids for your next project.',
   keywords: [
      'uuid generator',
      'ulid generator',
      'unique identifier',
      'guid generator',
      'bulk uuid',
      'v4 uuid',
   ],
   openGraph: {
      title: 'UUID & ULID Generator - Free Online Dev Tool',
      description:
         'Instantly generate secure bulk batch v4 UUIDs and sortable ULIDs powered entirely by the Web Crypto API. No server connections.',
      url: 'https://www.deveditor.io/uuid-generator',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'UUID & ULID Generator',
      description: 'Generate bulk cryptographically secure v4 UUIDs and sortable Base32 ULIDs.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/uuid-generator',
   },
};

import { UuidGeneratorSeoContent } from '@/components/uuid-generator/docs/UuidGeneratorSeoContent';

export default function Page() {
   return (
      <PersistenceProvider>
         <div id="page-top" className="flex flex-col">
            {/* The main tool viewport */}
            <div className="h-[calc(100vh-72px)] shrink-0">
               <UuidGeneratorView />
            </div>

            {/* SEO Content directly in the DOM, below the fold */}
            <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
               <UuidGeneratorSeoContent />
            </div>
         </div>
      </PersistenceProvider>
   );
}
