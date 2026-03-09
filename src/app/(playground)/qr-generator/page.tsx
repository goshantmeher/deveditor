import { Metadata } from 'next';
import { QrGeneratorView } from '@/components/qr-generator/QrGeneratorView';
import { QrGeneratorSeoContent } from '@/components/qr-generator/docs/QrGeneratorSeoContent';

export const metadata: Metadata = {
   title: 'QR Code Generator - DevEditor',
   description:
      'Generate high-quality, customizable QR codes with custom colors, size, and error correction. Download as PNG or SVG.',
   keywords: [
      'qr code generator',
      'custom qr code',
      'svg qr code',
      'png qr code',
      'developer tools',
      'qrcode explorer',
   ],
   openGraph: {
      title: 'Custom QR Code Generator | DevEditor',
      description: 'Create and download professional QR codes instantly. Professional designs with vector support.',
      url: 'https://www.deveditor.io/qr-generator',
      siteName: 'DevEditor',
      type: 'website',
   },
   alternates: { canonical: 'https://www.deveditor.io/qr-generator' },
};

export default function QrGeneratorPage() {
   return (
      
         <div id="page-top" className="flex flex-col">
            {/* The main tool viewport */}
            <div className="h-[calc(100vh-72px)] shrink-0">
               <QrGeneratorView />
            </div>

            {/* SEO Content directly in the DOM, below the fold */}
            <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
               <QrGeneratorSeoContent />
            </div>
         </div>
      
   );
}
