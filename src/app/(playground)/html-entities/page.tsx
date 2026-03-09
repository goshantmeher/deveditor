import { HtmlEntityConverterView } from '@/components/html-entity-converter/HtmlEntityConverterView';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'HTML Entity Encoder / Decoder - Convert Special Characters Online',
   description:
      'Free online HTML Entity Converter tool. Encode special characters to safe HTML entities or decode entities to plain text. 100% client side processing.',
   keywords: [
      'html entities',
      'html entity encoder',
      'html entity decoder',
      'escape html',
      'unescape html',
      'special characters',
      'character references',
   ],
   openGraph: {
      title: 'HTML Entity Encoder / Decoder - Encode & Decode Securely',
      description:
         'Free online HTML Entity Converter. Safely escape special characters like <, >, & to HTML entities or decode them in your browser.',
      url: 'https://www.deveditor.io/html-entities',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'HTML Entity Encoder / Decoder',
      description: 'Free HTML Entity Converter. Encode and decode special characters to HTML entities instantly.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/html-entities',
   },
};

import { HtmlEntityConverterSeoContent } from '@/components/html-entity-converter/docs/HtmlEntityConverterSeoContent';

export default function Page() {
   return (
      
         <div id="page-top" className="flex flex-col">
            {/* The main tool viewport */}
            <div className="h-[calc(100vh-72px)] shrink-0">
               <HtmlEntityConverterView />
            </div>

            {/* SEO Content directly in the DOM, below the fold */}
            <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
               <HtmlEntityConverterSeoContent />
            </div>
         </div>
      
   );
}
