import React from 'react';
import { Metadata } from 'next';
import { Base64ToJsonView } from '@/components/base64-to-json/Base64ToJsonView';
import { Base64ToJsonSeoContent } from '@/components/base64-to-json/docs/Base64ToJsonSeoContent';
import { PersistenceProvider } from '@/contexts/PersistenceContext';

export const metadata: Metadata = {
   title: 'Base64 to JSON Decoder | Direct Payload Introspection',
   description:
      'Directly decode URL-safe and standard Base64 encoded JSON strings and instantly view them natively within a completely isolated, local JSON tree structure.',
   alternates: {
      canonical: 'https://deveditor.io/base64-to-json',
   },
};

export default function Base64ToJsonPage() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* Main Tool Area */}
         <div className="min-h-[calc(100vh-72px)] md:h-[calc(100vh-72px)] shrink-0 flex flex-col">
            <PersistenceProvider>
               <Base64ToJsonView />
            </PersistenceProvider>
         </div>

         {/* SEO / Details Section */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <Base64ToJsonSeoContent />
         </div>
      </div>
   );
}
