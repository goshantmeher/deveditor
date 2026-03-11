import { CodeMinifierView } from '@/components/code-minifier/CodeMinifierView';
import { Metadata } from 'next';
import { CodeMinifierSeoContent } from '@/components/code-minifier/docs/CodeMinifierSeoContent';

export const metadata: Metadata = {
   title: 'Code Minifier / Beautifier - DevEditor',
   description:
      'Instantly compress or expand HTML, CSS, JavaScript, and JSON code. Run offline minification safely and beautify messy obfuscated source blocks natively.',
   keywords: [
      'code minifier',
      'code beautifier',
      'javascript minify',
      'css minifier',
      'html formatter',
      'json beautify',
      'offline tool',
   ],
   openGraph: {
      title: 'Code Minifier / Beautifier',
      description: 'Optimize script weight offline or format chaotic messy templates.',
      url: 'https://www.deveditor.io/code-minifier',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Offline Minify Engine',
      description: 'Zero network overhead AST formatter utility directly locally.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/code-minifier',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main tool viewport */}
         <div className="h-[calc(100vh-72px)] shrink-0">
            <CodeMinifierView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <CodeMinifierSeoContent />
         </div>
      </div>
   );
}
