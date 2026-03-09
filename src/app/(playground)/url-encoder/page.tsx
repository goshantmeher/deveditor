import { UrlEncoderView } from '@/components/url-encoder/UrlEncoderView';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'URL Encoder/Decoder - Encode, Decode & Parse URLs Online',
   description:
      'Free online URL Encoder/Decoder tool. Encode and decode URI components, parse full URLs into components, edit query parameters, and rebuild clean URLs. 100% client-side processing.',
   keywords: [
      'url encoder',
      'url decoder',
      'uri encoder',
      'uri decoder',
      'encodeURIComponent',
      'decodeURIComponent',
      'url parser',
      'query string',
      'percent encoding',
      'url builder',
   ],
   openGraph: {
      title: 'URL Encoder/Decoder - Encode, Decode & Parse URLs',
      description:
         'Free online URL Encoder/Decoder. Encode and decode URI components, parse URLs, edit query parameters, and rebuild URLs instantly.',
      url: 'https://www.deveditor.io/url-encoder',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'URL Encoder/Decoder - Encode, Decode & Parse URLs',
      description:
         'Free URL Encoder/Decoder. Encode/decode URI components, parse and rebuild URLs with query parameter editing.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/url-encoder',
   },
};

import { UrlEncoderSeoContent } from '@/components/url-encoder/docs/UrlEncoderSeoContent';

export default function Page() {
   return (
      
         <div id="page-top" className="flex flex-col">
            {/* The main tool viewport */}
            <div className="h-[calc(100vh-72px)] shrink-0">
               <UrlEncoderView />
            </div>

            {/* SEO Content directly in the DOM, below the fold */}
            <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
               <UrlEncoderSeoContent />
            </div>
         </div>
      
   );
}
