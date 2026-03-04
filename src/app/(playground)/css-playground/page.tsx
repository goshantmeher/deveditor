import { CssPlaygroundView } from '@/components/css-playground/CssPlaygroundView';
import { PersistenceProvider } from '@/contexts/PersistenceContext';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'CSS Playground - Test & Experiment with CSS Online',
   description:
      'Free online CSS playground with live preview. Write HTML and CSS side-by-side and see results instantly. Includes preset templates for buttons, cards, flexbox, grid, animations, glassmorphism, and more.',
   keywords: [
      'CSS playground',
      'CSS editor',
      'CSS live preview',
      'CSS tester',
      'online CSS editor',
      'CSS sandbox',
      'CSS experiment',
      'learn CSS',
      'CSS flexbox',
      'CSS grid',
      'CSS animations',
      'glassmorphism CSS',
      'CSS gradients',
      'HTML CSS editor',
      'CSS code playground',
   ],
   openGraph: {
      title: 'CSS Playground - Test & Experiment with CSS Online',
      description:
         'Free online CSS playground with live preview. Write HTML and CSS side-by-side and see results instantly. Includes preset templates and responsive viewport testing.',
      url: 'https://www.deveditor.io/css-playground',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'CSS Playground - Test & Experiment with CSS Online',
      description:
         'Free online CSS playground with live preview. Write HTML and CSS side-by-side and see results instantly.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/css-playground',
   },
};

import { CssPlaygroundSeoContent } from '@/components/css-playground/docs/CssPlaygroundSeoContent';

export default function Page() {
   return (
      <PersistenceProvider>
         <div className="flex flex-col">
            {/* The main editor viewport */}
            <div className="h-[calc(100vh-72px)] shrink-0">
               <CssPlaygroundView />
            </div>

            {/* SEO Content directly in the DOM, below the fold */}
            <div className="mt-8 border-t border-border/10 pt-8 pb-12">
               <CssPlaygroundSeoContent />
            </div>
         </div>
      </PersistenceProvider>
   );
}
