import { PasswordStrengthView } from '@/components/password-strength/PasswordStrengthView';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Password Strength Checker - Test Security Quality Online',
   description:
      'Test your passwords strength and vulnerability safely in the browser utilizing advanced dictionary pattern-matching zxcvbn. Get real-time offline crack estimates.',
   keywords: [
      'password strength checker',
      'how secure is my password',
      'password tester',
      'zxcvbn online',
      'check password entropy',
      'test password security',
   ],
   openGraph: {
      title: 'Password Strength Tester Online',
      description:
         'Check password robustness offline seamlessly against massive parallel algorithmic hacking calculations purely mapped directly client-side avoiding backend vulnerability.',
      url: 'https://www.deveditor.io/password-strength',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Test Password Robustness Online Instantly',
      description: 'Find out how long a password takes to crack accurately testing offline GPU rates.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/password-strength',
   },
};

import { PasswordStrengthSeoContent } from '@/components/password-strength/docs/PasswordStrengthSeoContent';

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         <div className="h-[calc(100vh-72px)] shrink-0 bg-background/50">
            <PasswordStrengthView />
         </div>

         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <PasswordStrengthSeoContent />
         </div>
      </div>
   );
}
