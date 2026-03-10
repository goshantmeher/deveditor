import { BaseConverterView } from '@/components/base-converter/BaseConverterView';
import { Metadata } from 'next';
import { BaseConverterSeoContent } from '@/components/base-converter/docs/BaseConverterSeoContent';

export const metadata: Metadata = {
   title: 'Number Base Converter - DevEditor',
   description:
      'Bi-directionally convert between binary, octal, decimal, and hexadecimal with BigInt support for large numbers. 100% private client-side processing.',
   keywords: [
      'number base converter',
      'binary to decimal',
      'decimal to hex',
      'hex to binary',
      'octal converter',
      'bigint converter',
      'base16 to base10',
      'programmer calculator',
   ],
   openGraph: {
      title: 'Number Base Converter | DevEditor',
      description: 'Convert extremely large numbers across different numeral systems instantly and safely.',
      url: 'https://www.deveditor.io/base-converter',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Precision Number Base Tool',
      description: 'The definitive tool for arbitrary-precision base conversion.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/base-converter',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main tool viewport */}
         <div className="min-h-[calc(100vh-72px)] md:h-[calc(100vh-72px)] shrink-0">
            <BaseConverterView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <BaseConverterSeoContent />
         </div>
      </div>
   );
}
