import { FaviconGeneratorView } from '@/components/favicon-generator/FaviconGeneratorView';
import { Metadata } from 'next';
import { FaviconGeneratorSeoContent } from '@/components/favicon-generator/docs/FaviconGeneratorSeoContent';

export const metadata: Metadata = {
   title: 'Favicon Generator - Convert PNG to App Icons - DevEditor',
   description:
      'Free Favicon and App Icon Generator tool. Instantly convert any logo into perfectly scaled 16x16, 32x32, 192x192, and 512x512 sizes needed for web browsers natively securely.',
   keywords: [
      'favicon',
      'icon generator',
      'apple touch icon',
      'android manifest icon',
      'app clip resize',
      'logo converter',
   ],
   openGraph: {
      title: 'Free Favicon Generator & Icon Set Builder',
      description:
         'Convert any image instantly into all modern favicons and mobile sizes without uploading anything to a server.',
      url: 'https://www.deveditor.io/favicon-generator',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Favicon Generator - PNG to Apple Touch Icons',
      description:
         'Generate standard favicons for PWA manifests and browser tabs completely through client side rendering.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/favicon-generator',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main tool viewport */}
         <div className="h-[calc(100vh-72px)] shrink-0">
            <FaviconGeneratorView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <FaviconGeneratorSeoContent />
         </div>
      </div>
   );
}
