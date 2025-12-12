import React, { ReactNode } from 'react';

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
         <div
            className="p-2 bg-muted"
            style={{
               height: 'calc(100vh - 56px)',
               overflowY: 'auto',
            }}
         >
            {children}
         </div>
      </div>
   );
}
