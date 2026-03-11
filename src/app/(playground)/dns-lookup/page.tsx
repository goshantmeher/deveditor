import React from 'react';
import { Metadata } from 'next';
import { DnsLookupView } from '@/components/dns-lookup/DnsLookupView';
import { DnsLookupSeoContent } from '@/components/dns-lookup/docs/DnsLookupSeoContent';
import { PersistenceProvider } from '@/contexts/PersistenceContext';

export const metadata: Metadata = {
   title: 'DNS Lookup Tool | Private DoH Resolver',
   description:
      'Perform fast, private DNS lookups natively in your browser using secure DNS-over-HTTPS (DoH). Query A, AAAA, CNAME, MX, and TXT records across Cloudflare and Google.',
   alternates: {
      canonical: 'https://deveditor.io/dns-lookup',
   },
};

export default function DnsLookupPage() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* Main Tool Area */}
         <div className="h-[calc(100vh-72px)] shrink-0">
            <PersistenceProvider>
               <DnsLookupView />
            </PersistenceProvider>
         </div>

         {/* SEO / Details Section */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <DnsLookupSeoContent />
         </div>
      </div>
   );
}
