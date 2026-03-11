import { JavascriptObfuscatorView } from '@/components/javascript-obfuscator/JavascriptObfuscatorView';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'JavaScript Obfuscator & Minifier - Secure JS Online',
   description:
      'Instantly obfuscate your JavaScript online offline natively within your browser without sending raw script logs or intellectual property keys to servers unnecessarily.',
   keywords: [
      'javascript obfuscator',
      'js obfuscator',
      'obfuscate js code',
      'minify javascript online',
      'js encrypter',
      'protect js syntax online',
   ],
   openGraph: {
      title: 'JavaScript Obfuscator Sandbox',
      description:
         'Secure your client-side JavaScript by flattening logic streams aggressively breaking debugger workflows effectively online correctly natively avoiding data breaches.',
      url: 'https://www.deveditor.io/js-obfuscator',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'JS Code Defense Grid Obfuscation Suite',
      description:
         'Flatten arrays aggressively breaking javascript decompilers cleanly mapping directly globally successfully natively offline.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/js-obfuscator',
   },
};

import { JavascriptObfuscatorSeoContent } from '@/components/javascript-obfuscator/docs/JavascriptObfuscatorSeoContent';

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         <div className="h-[calc(100vh-72px)] shrink-0 bg-background/50">
            <JavascriptObfuscatorView />
         </div>

         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <JavascriptObfuscatorSeoContent />
         </div>
      </div>
   );
}
