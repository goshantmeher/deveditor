import { SeoGeneratorsView } from '@/components/seo-generators/SeoGeneratorsView';
import { Metadata } from 'next';
import { SeoGeneratorsSeoContent } from '@/components/seo-generators/docs/SeoGeneratorsSeoContent';

export const metadata: Metadata = {
   title: 'Robots.txt & Sitemap Generator - DevEditor',
   description:
      'Generate formatted robots.txt exclusion rules and XML sitemaps to optimize search engine crawling algorithms perfectly.',
   keywords: ['robots.txt generator', 'sitemap generator', 'xml sitemap', 'seo tools', 'crawler rules', 'googlebot'],
   openGraph: {
      title: 'Robots.txt & Sitemap Generator',
      description: 'Optimize search engine bot index configurations locally.',
      url: 'https://www.deveditor.io/seo-generators',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'SEO Parser Rules Tool',
      description: 'Output strictly validated URL crawl mappings permanently.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/seo-generators',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main tool viewport */}
         <div className="h-[calc(100vh-72px)] shrink-0">
            <SeoGeneratorsView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <SeoGeneratorsSeoContent />
         </div>
      </div>
   );
}
