import React from 'react';
import { Metadata } from 'next';
import { CertificateInspectorView } from '@/components/certificate-inspector/CertificateInspectorView';
import { CertificateInspectorSeoContent } from '@/components/certificate-inspector/docs/CertificateInspectorSeoContent';
import { PersistenceProvider } from '@/contexts/PersistenceContext';

export const metadata: Metadata = {
   title: 'Certificate Inspector | Decode PEM & CRT Natively',
   description:
      'Paste your X.509 PEM or CRT certificates to inspect expiry dates, issuer details, subject names, and cryptographic fingerprints securely without server uploads.',
   alternates: {
      canonical: 'https://deveditor.io/certificate-inspector',
   },
};

export default function CertificateInspectorPage() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* Main Tool Area */}
         <div className="h-[calc(100vh-72px)] shrink-0">
            <PersistenceProvider>
               <CertificateInspectorView />
            </PersistenceProvider>
         </div>

         {/* SEO / Details Section */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <CertificateInspectorSeoContent />
         </div>
      </div>
   );
}
