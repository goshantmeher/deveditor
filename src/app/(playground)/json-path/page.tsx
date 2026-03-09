import { JsonPathView } from '@/components/json-path/JsonPathView';
import { Metadata } from 'next';
import { JsonPathSeoContent } from '@/components/json-path/docs/JsonPathSeoContent';

export const metadata: Metadata = {
   title: 'JSONPath Expression Evaluator & Playground - DevEditor',
   description:
      'Interact with JSON payloads using highly complex JSONPath expressions securely offline. Test data extraction syntax instantly dynamically before deploying to production architectures safely natively.',
   keywords: ['jsonpath evaluator', 'json playground', 'json path sandbox', 'evaluate json queries', 'json xpath', 'json viewer'],
   openGraph: {
      title: 'JSONPath Sandbox Environment',
      description: 'Rapidly evaluate arrays strictly bypassing complex backend routing completely.',
      url: 'https://www.deveditor.io/json-path',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Interactive JSON Querying',
      description: 'Securely dissect proprietary JSON payloads heavily dynamically inside the browser.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/json-path',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main tool viewport */}
         <div className="min-h-[calc(100vh-72px)] md:h-[calc(100vh-72px)] shrink-0">
            <JsonPathView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <JsonPathSeoContent />
         </div>
      </div>
   );
}
