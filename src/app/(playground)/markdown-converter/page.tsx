import { MarkdownConverterView } from '@/components/markdown-converter/MarkdownConverterView';
import { PersistenceProvider } from '@/contexts/PersistenceContext';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Markdown to HTML Generator - Live Preview & Copy HTML Output',
   description:
      'Free online Markdown to HTML converter with live preview. Convert GFM markdown to clean, sanitized HTML instantly. Copy output with one click. 100% client-side — your content never leaves your browser.',
   keywords: [
      'markdown to html',
      'markdown converter',
      'markdown preview',
      'markdown editor',
      'GFM',
      'github flavored markdown',
      'markdown online',
      'html generator',
      'markdown renderer',
      'convert markdown',
      'markdown tool',
      'free markdown editor',
   ],
   openGraph: {
      title: 'Markdown to HTML Generator - Live Preview & Copy',
      description:
         'Free online markdown converter. Live preview, GFM support, sanitized HTML output. 100% client-side privacy.',
      url: 'https://www.deveditor.io/markdown-converter',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Markdown to HTML Generator',
      description: 'Convert markdown to clean HTML with live preview. Free, private, no sign-up.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/markdown-converter',
   },
};

import { MarkdownConverterSeoContent } from '@/components/markdown-converter/docs/MarkdownConverterSeoContent';

export default function Page() {
   return (
      <PersistenceProvider>
         <div id="page-top" className="flex flex-col">
            {/* The main tool viewport */}
            <div className="h-[calc(100vh-72px)] shrink-0">
               <MarkdownConverterView />
            </div>

            {/* SEO Content directly in the DOM, below the fold */}
            <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
               <MarkdownConverterSeoContent />
            </div>
         </div>
      </PersistenceProvider>
   );
}
