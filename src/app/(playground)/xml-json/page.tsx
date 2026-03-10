import { XmlJsonView } from '@/components/xml-json/XmlJsonView';
import { Metadata } from 'next';
import { XmlJsonSeoContent } from '@/components/xml-json/docs/XmlJsonSeoContent';

export const metadata: Metadata = {
   title: 'XML to JSON Converter - DevEditor',
   description:
      'Bi-directionally convert XML documents and attributes to JSON arrays and properties instantly safely securely offline directly inside your terminal workflow environment.',
   keywords: ['xml to json', 'json to xml', 'xml converter', 'json converter', 'convert xml', 'format xml', 'parse xml'],
   openGraph: {
      title: 'Bi-Directional XML ↔ JSON Tool',
      description: 'Format complex markup documents dynamically offline reliably.',
      url: 'https://www.deveditor.io/xml-json',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'XML & JSON Transpiler',
      description: 'Format nested tag architectures cleanly mapping natively completely offline safely.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/xml-json',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main tool viewport */}
         <div className="min-h-[calc(100vh-72px)] md:h-[calc(100vh-72px)] shrink-0">
            <XmlJsonView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <XmlJsonSeoContent />
         </div>
      </div>
   );
}
