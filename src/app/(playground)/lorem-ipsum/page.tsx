import { LoremIpsumView } from '@/components/lorem-ipsum/LoremIpsumView';
import { PersistenceProvider } from '@/contexts/PersistenceContext';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Lorem Ipsum Generator - Generate Placeholder Dummy Text Online',
   description:
      'Free online Lorem Ipsum Generator. Create custom lengths of dummy text by paragraphs, sentences, or words for your UI mockups and wireframes.',
   keywords: [
      'lorem ipsum',
      'lorem ipsum generator',
      'dummy text generator',
      'placeholder text',
      'filler text',
      'mockup text',
   ],
   openGraph: {
      title: 'Lorem Ipsum Generator - Create Fast Placeholder Text',
      description:
         'Generate beautiful, natural-looking placeholder dummy text instantly. Perfect for mocking up layouts, websites, and typography designs.',
      url: 'https://www.deveditor.io/lorem-ipsum',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Lorem Ipsum Generator',
      description: 'Generate Lorem Ipsum dummy text by paragraph, sentence, or word. Instant and free.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/lorem-ipsum',
   },
};

import { LoremIpsumSeoContent } from '@/components/lorem-ipsum/docs/LoremIpsumSeoContent';

export default function Page() {
   return (
      <PersistenceProvider>
         <div id="page-top" className="flex flex-col">
            {/* The main tool viewport */}
            <div className="h-[calc(100vh-72px)] shrink-0">
               <LoremIpsumView />
            </div>

            {/* SEO Content directly in the DOM, below the fold */}
            <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
               <LoremIpsumSeoContent />
            </div>
         </div>
      </PersistenceProvider>
   );
}
