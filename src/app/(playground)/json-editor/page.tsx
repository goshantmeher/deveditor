import { JsonEditorView } from '@/components/json-editor/JsonEditorView';
import { PersistenceProvider } from '@/contexts/PersistenceContext';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'JSON Viewer & Editor - Format, Validate & Beautify JSON Online',
   description:
      'Free online JSON viewer, formatter, and validator. Beautify, minify, and validate JSON data instantly. Compare JSON files, search through nested objects, and fix formatting errors with our powerful JSON editor.',
   keywords: [
      'JSON viewer',
      'JSON editor',
      'JSON formatter',
      'JSON validator',
      'JSON beautifier',
      'JSON minifier',
      'format JSON online',
      'validate JSON',
      'JSON compare',
      'JSON diff',
      'JSON tree view',
      'fix JSON errors',
      'online JSON tool',
   ],
   openGraph: {
      title: 'JSON Viewer & Editor - Format, Validate & Beautify JSON Online',
      description:
         'Free online JSON viewer, formatter, and validator. Beautify, minify, and validate JSON data instantly. Compare JSON files and fix formatting errors.',
      url: 'https://www.deveditor.io/json-editor',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'JSON Viewer & Editor - Format, Validate & Beautify JSON Online',
      description:
         'Free online JSON viewer, formatter, and validator. Beautify, minify, and validate JSON data instantly.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/json-editor',
   },
};

import { JsonEditorSeoContent } from '@/components/json-editor/docs/JsonEditorSeoContent';

export default function Page() {
   return (
      <PersistenceProvider>
         <div id="page-top" className="flex flex-col">
            {/* The main editor viewport */}
            <div className="h-[calc(100vh-72px)] shrink-0">
               <JsonEditorView />
            </div>

            {/* SEO Content directly in the DOM, below the fold */}
            <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
               <JsonEditorSeoContent />
            </div>
         </div>
      </PersistenceProvider>
   );
}
