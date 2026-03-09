import { PasswordGeneratorView } from '@/components/password-generator/PasswordGeneratorView';
import { PersistenceProvider } from '@/contexts/PersistenceContext';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Secure Password Generator - Create Strong Passwords Online',
   description:
      'Generate cryptographically secure passwords and secrets online. Customizable length up to 128 characters, uppercase, lowercase, numbers, and symbols.',
   keywords: [
      'password generator',
      'strong password',
      'secure password',
      'random character generator',
      'api secret generator',
      'password strength',
   ],
   openGraph: {
      title: 'Secure Password Generator - Create Strong Random Passwords',
      description:
         'Generate secure and completely random passwords locally in your browser using the Web Crypto API. No passwords are sent to a server.',
      url: 'https://www.deveditor.io/password-generator',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Secure Password Generator',
      description: 'Generate secure, cryptographically strong passwords online instantly.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/password-generator',
   },
};

import { PasswordGeneratorSeoContent } from '@/components/password-generator/docs/PasswordGeneratorSeoContent';

export default function Page() {
   return (
      <PersistenceProvider>
         <div id="page-top" className="flex flex-col">
            {/* The main tool viewport */}
            <div className="h-[calc(100vh-72px)] shrink-0">
               <PasswordGeneratorView />
            </div>

            {/* SEO Content directly in the DOM, below the fold */}
            <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
               <PasswordGeneratorSeoContent />
            </div>
         </div>
      </PersistenceProvider>
   );
}
