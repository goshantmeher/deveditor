import { MetaTagGeneratorView } from '@/components/meta-tag-generator/MetaTagGeneratorView';
import { Metadata } from 'next';
import { MetaTagSeoContent } from '@/components/meta-tag-generator/docs/MetaTagSeoContent';

export const metadata: Metadata = {
   title: 'Open Graph (OG) & Meta Tag Generator - DevEditor',
   description:
      'Visually generate HTML meta tags, Open Graph (OG) objects, and Twitter summary cards. Preview exactly how your page will look when shared across social media networks and get the exact HTML code.',
   keywords: ['meta tag generator', 'open graph generator', 'og tag', 'twitter card generator', 'seo tags', 'html meta tags', 'social sharing preview'],
   openGraph: {
      title: 'Open Graph (OG) & Meta Tag Generator',
      description: 'Generate and preview Open Graph formatting perfectly.',
      url: 'https://www.deveditor.io/meta-tag-generator',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Meta Tag Previewer',
      description: 'Automatically craft SEO meta markup visually.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/meta-tag-generator',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main tool viewport */}
         <div className="h-[calc(100vh-72px)] shrink-0">
            <MetaTagGeneratorView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <MetaTagSeoContent />
         </div>
      </div>
   );
}
