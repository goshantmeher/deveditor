import { BcryptTesterView } from '@/components/bcrypt-tester/BcryptTesterView';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Bcrypt Hash Tester - Validator and Generator Online',
   description:
      'Verify and generate secure Bcrypt hashes online instantly in the browser. Test plaintext passwords against Bcrypt outputs globally with cost factor testing.',
   keywords: [
      'bcrypt tester',
      'bcrypt verifier',
      'bcrypt hash generator',
      'bcrypt generator',
      'bcrypt online',
   ],
   openGraph: {
      title: 'Bcrypt Tester & Generator',
      description:
         'Check plaintext passwords against Bcrypt hashes to test match criteria locally within the browser. Generate new bcrypt hashes seamlessly online.',
      url: 'https://www.deveditor.io/bcrypt-tester',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Bcrypt Tester & Generator',
      description: 'Test plaintext variables vs bcrypt hashes seamlessly client-side.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/bcrypt-tester',
   },
};

import { BcryptTesterSeoContent } from '@/components/bcrypt-tester/docs/BcryptTesterSeoContent';

export default function Page() {
   return (
      
         <div id="page-top" className="flex flex-col">
            <div className="h-[calc(100vh-72px)] shrink-0 bg-background/50">
               <BcryptTesterView />
            </div>

            <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
               <BcryptTesterSeoContent />
            </div>
         </div>
      
   );
}
