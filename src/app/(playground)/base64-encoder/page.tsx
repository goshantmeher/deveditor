import { Base64EncoderView } from '@/components/base64-encoder/Base64EncoderView';
import { PersistenceProvider } from '@/contexts/PersistenceContext';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Base64 Encoder & Decoder - Encode Text, Files & Images Online',
   description:
      'Free online Base64 encoder and decoder. Convert text, files, and images to Base64 instantly. Generate data URIs, CSS snippets, HTML img tags, and URL-safe Base64 strings. No data sent to servers.',
   keywords: [
      'Base64 encoder',
      'Base64 decoder',
      'Base64 converter',
      'text to Base64',
      'Base64 to text',
      'file to Base64',
      'image to Base64',
      'data URI generator',
      'URL-safe Base64',
      'Base64 online',
      'encode Base64',
      'decode Base64',
      'Base64 tool',
   ],
   openGraph: {
      title: 'Base64 Encoder & Decoder - Text, Files & Images',
      description:
         'Free online Base64 encoder and decoder. Convert text, files, and images to Base64. Generate data URIs and URL-safe Base64 strings instantly.',
      url: 'https://www.deveditor.io/base64-encoder',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Base64 Encoder & Decoder',
      description: 'Free online Base64 tool. Encode text, files, and images. Generate data URIs and URL-safe Base64.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/base64-encoder',
   },
};

import { Base64EncoderSeoContent } from '@/components/base64-encoder/docs/Base64EncoderSeoContent';

export default function Page() {
   return (
      <PersistenceProvider>
         <div className="flex flex-col">
            {/* The main tool viewport */}
            <div className="h-[calc(100vh-72px)] shrink-0">
               <Base64EncoderView />
            </div>

            {/* SEO Content directly in the DOM, below the fold */}
            <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
               <Base64EncoderSeoContent />
            </div>
         </div>
      </PersistenceProvider>
   );
}
