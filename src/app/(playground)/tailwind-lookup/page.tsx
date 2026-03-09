import { TailwindLookupView } from '@/components/tailwind-lookup/TailwindLookupView';
import { Metadata } from 'next';
import { TailwindLookupSeoContent } from '@/components/tailwind-lookup/docs/TailwindLookupSeoContent';

export const metadata: Metadata = {
   title: 'Tailwind CSS Lookup & Converter - DevEditor',
   description:
      'Searchable reference for Tailwind classes. Convert Tailwind classes to raw CSS output and map Vanilla CSS rules heuristically back into Tailwind equivalents instantly.',
   keywords: ['tailwind lookup', 'tailwind to css', 'css to tailwind', 'css converter', 'tailwind reference', 'tailwind utility mapper'],
   openGraph: {
      title: 'Tailwind CSS to Vanilla CSS Converter',
      description: 'Searchable mapping engine to cross-translate Tailwind structures to standard Vanilla CSS definitions.',
      url: 'https://www.deveditor.io/tailwind-lookup',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Tailwind Converter Tool',
      description: 'Find Tailwind specific configurations or reverse engineers massive stylesheets dynamically.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/tailwind-lookup',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main tool viewport */}
         <div className="h-[calc(100vh-72px)] shrink-0">
            <TailwindLookupView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <TailwindLookupSeoContent />
         </div>
      </div>
   );
}
