import React, { ReactNode } from 'react';
import { Footer } from '@/components/Footer';
import { PlaygroundClientWrapper } from '@/components/PlaygroundClientWrapper';
import { TrackPageVisit } from '@/components/TrackPageVisit';

interface PlaygroundLayoutProps {
   children: ReactNode;
}

export default function PlaygroundLayout({ children }: PlaygroundLayoutProps) {
   const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
         {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.deveditor.io',
         },
         {
            '@type': 'ListItem',
            position: 2,
            name: 'Tools',
            item: 'https://www.deveditor.io',
         },
      ],
   };

   return (
      <div className="w-full h-full flex flex-col">
         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
               __html: JSON.stringify(breadcrumbSchema),
            }}
         />
         <PlaygroundClientWrapper
            className="px-2 py-2 md:px-2 md:py-1 lg:px-2 lg:py-1"
            style={{
               height: 'calc(100vh - 56px)',
               overflowY: 'auto',
            }}
         >
            <TrackPageVisit />
            {children}
            <Footer />
         </PlaygroundClientWrapper>
      </div>
   );
}
