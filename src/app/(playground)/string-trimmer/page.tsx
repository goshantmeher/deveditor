import React from 'react';
import { Metadata } from 'next';
import { StringTrimmerView } from '@/components/string-trimmer/StringTrimmerView';
import { StringTrimmerSeoContent } from '@/components/string-trimmer/docs/StringTrimmerSeoContent';
import { PersistenceProvider } from '@/contexts/PersistenceContext';

export const metadata: Metadata = {
   title: 'String Trimmer & Cleaner | Remove Whitespace',
   description:
      'Instantly clean up your text logs and data blocks. Remove leading and trailing whitespace, collapse multiple gaps, delete empty lines, and strip custom prefix/suffix chunks entirely natively within your browser window.',
   alternates: {
      canonical: 'https://deveditor.io/string-trimmer',
   },
};

export default function StringTrimmerPage() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* Main Tool Area */}
         <div className="min-h-[calc(100vh-72px)] md:h-[calc(100vh-72px)] shrink-0 flex flex-col">
            <PersistenceProvider>
               <StringTrimmerView />
            </PersistenceProvider>
         </div>

         {/* SEO / Details Section */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <StringTrimmerSeoContent />
         </div>
      </div>
   );
}
