import { SchemaGeneratorView } from '@/components/schema-generator/SchemaGeneratorView';
import { SchemaGeneratorSeoContent } from '@/components/schema-generator/docs/SchemaGeneratorSeoContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'JSON → Schema Generator | TypeScript, Go, Rust, Zod | DevEditor',
   description:
      'Convert JSON to TypeScript interfaces, Go structs, Rust structs, Zod schemas, and JSON Schema. Smart type inference with nested object support.',
   keywords: [
      'json to typescript',
      'json to go struct',
      'json to rust struct',
      'json to zod',
      'json schema generator',
      'type generator',
      'interface generator',
   ],
   openGraph: {
      title: 'JSON → Schema Generator | TypeScript, Go, Rust, Zod | DevEditor',
      description: 'Convert JSON to TypeScript interfaces, Go structs, Rust structs, Zod schemas, and JSON Schema.',
      url: 'https://www.deveditor.io/json-to-schema',
      siteName: 'DevEditor',
      type: 'website',
   },
   alternates: { canonical: 'https://www.deveditor.io/json-to-schema' },
};

export default function SchemaGeneratorPage() {
   return (
      
         <div id="page-top" className="flex flex-col">
            {/* The main editor viewport */}
            <div className="min-h-[calc(100vh-72px)] lg:h-[calc(100vh-72px)] lg:max-h-[calc(100vh-72px)] shrink-0 w-full overflow-hidden bg-background">
               <SchemaGeneratorView />
            </div>

            {/* SEO Content directly in the DOM, below the fold */}
            <div className="mt-8 border-t border-border/10 pt-12 pb-16 bg-background">
               <SchemaGeneratorSeoContent />
            </div>
         </div>
      
   );
}
