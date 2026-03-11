import { RsaGeneratorView } from '@/components/rsa-generator/RsaGeneratorView';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'RSA Key Generator - Generate Public & Private PEM Pairs Online',
   description:
      'Generate RSA key pairs spanning 1024, 2048, or 4096-bits natively inside your browser. Generate highly secure PKCS8/SPKI PEM assets completely privately and securely client-side.',
   keywords: [
      'rsa key generator',
      'rsa online generator',
      'rsa generator',
      'generate ssh keys online',
      'generate pem private key',
      'rsa pair',
   ],
   openGraph: {
      title: 'RSA Key Generator & Visualizer',
      description:
         'Generate entirely native secure modular length RSA keys effortlessly directly utilizing your computers internal cryptography module efficiently natively without complex tools.',
      url: 'https://www.deveditor.io/rsa-generator',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'RSA Generator & Editor Suite',
      description: 'Generate 4096-bit offline RSA Key Pair values online privately fast!',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/rsa-generator',
   },
};

import { RsaGeneratorSeoContent } from '@/components/rsa-generator/docs/RsaGeneratorSeoContent';

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         <div className="min-h-0 shrink-0 bg-background pt-4 px-4 pb-2">
            <RsaGeneratorView />
         </div>

         <div className="mt-4 border-t border-border/10 pt-8 pb-12 bg-background">
            <RsaGeneratorSeoContent />
         </div>
      </div>
   );
}
