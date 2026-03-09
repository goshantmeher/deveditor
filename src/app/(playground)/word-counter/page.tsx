import { WordCounterView } from '@/components/word-counter/WordCounterView';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Word & Character Counter - Free Text Analysis Online',
   description:
      'Instantly count words, characters, sentences, paragraphs, and estimate reading time. 100% free and client-side processing for total privacy.',
   keywords: [
      'word counter',
      'character counter',
      'text analysis',
      'sentence counter',
      'paragraph counter',
      'reading time calculator',
      'text length',
   ],
   openGraph: {
      title: 'Word & Character Counter - Free Online Text Analysis',
      description:
         'Instantly count words, characters with/without spaces, sentences, paragraphs, file size, and estimate reading time safely in your browser.',
      url: 'https://www.deveditor.io/word-counter',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Word & Character Counter',
      description: 'Free Word and Character Counter. Get comprehensive text statistics and reading time estimates instantly.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/word-counter',
   },
};

import { WordCounterSeoContent } from '@/components/word-counter/docs/WordCounterSeoContent';

export default function Page() {
   return (
      
         <div id="page-top" className="flex flex-col">
            {/* The main tool viewport */}
            <div className="h-[calc(100vh-72px)] shrink-0">
               <WordCounterView />
            </div>

            {/* SEO Content directly in the DOM, below the fold */}
            <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
               <WordCounterSeoContent />
            </div>
         </div>
      
   );
}
