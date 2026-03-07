import { CssPlaygroundView } from '@/components/css-playground/CssPlaygroundView';
import { PersistenceProvider } from '@/contexts/PersistenceContext';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'CSS Playground - Test & Experiment with CSS & Tailwind Online',
   description:
      'Free online CSS playground with live preview. Write HTML & CSS side-by-side or use visual generators for Tailwind CSS objects (Box Shadow, Flexbox, Gradients, etc.). See results instantly.',
   keywords: [
      'CSS playground',
      'CSS editor',
      'Tailwind generator',
      'Tailwind CSS playground',
      'CSS live preview',
      'online CSS editor',
      'CSS sandbox',
      'CSS visual editor',
      'flexbox generator',
      'css grid generator',
      'tailwind shadow generator',
      'css animations',
      'learn CSS',
   ],
   openGraph: {
      title: 'CSS Playground - Visual Editor & Tailwind Generator',
      description:
         'Free online CSS playground with live preview. Edit HTML/CSS or use interactive visual generators to build Flexbox, Grid, Transform, Box Shadow, and output raw CSS or Tailwind classes.',
      url: 'https://www.deveditor.io/css-playground',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'CSS Playground & Tailwind Generator',
      description:
         'Free online playground with visual CSS generators. Edit HTML/CSS side-by-side or build Tailwind classes instantly.',
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
            <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
               <CssPlaygroundSeoContent />
            </div>
         </div>
      </PersistenceProvider>
   );
}
