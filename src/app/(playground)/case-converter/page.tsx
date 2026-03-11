import { CaseConverterView } from '@/components/case-converter/CaseConverterView';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Case Converter - Convert Text to camelCase, snake_case, PascalCase',
   description:
      'Free online Case Converter tool. Instantly toggle strings, variables, and code snippets between camelCase, snake_case, PascalCase, kebab-case, and other programming formats. 100% client side processing.',
   keywords: [
      'case converter',
      'camel case',
      'snake case',
      'pascal case',
      'kebab case',
      'constant case',
      'sentence case',
      'title case',
      'text converter',
   ],
   openGraph: {
      title: 'Case Converter - Transform Text to camelCase, snake_case & More',
      description:
         'Free online Case Converter tool. Toggle strings, variables, and code snippets between camelCase, snake_case, PascalCase, kebab-case, and other formats instantly.',
      url: 'https://www.deveditor.io/case-converter',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Case Converter - Transform Text & Code Formats',
      description: 'Free online Case Converter. Change text to camelCase, snake_case, PascalCase, and more.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/case-converter',
   },
};

import { CaseConverterSeoContent } from '@/components/case-converter/docs/CaseConverterSeoContent';

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main tool viewport */}
         <div className="h-[calc(100vh-72px)] shrink-0">
            <CaseConverterView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <CaseConverterSeoContent />
         </div>
      </div>
   );
}
