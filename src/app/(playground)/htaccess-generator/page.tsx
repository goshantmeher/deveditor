import { HtaccessGeneratorView } from '@/components/htaccess-generator/HtaccessGeneratorView';
import { Metadata } from 'next';
import { HtaccessGeneratorSeoContent } from '@/components/htaccess-generator/docs/HtaccessGeneratorSeoContent';

export const metadata: Metadata = {
   title: '.htaccess & Nginx Redirect Generator - Fix SEO Routing',
   description:
      'Generate robust Apache .htaccess and nginx.conf redirect rules easily. Enforce WWW/non-WWW, force HTTPS encryption, and safely route 301 paths without learning Regex.',
   keywords: [
      'htaccess generator',
      'nginx redirect generator',
      'apache redirect',
      '301 redirect maker',
      'force https htaccess',
      'www non-www redirect',
      'nginx.conf rewrite',
   ],
   openGraph: {
      title: '.htaccess Redirect Generator | DevEditor',
      description: 'Generate web server RewriteRules visually. 100% Client-side privacy.',
      url: 'https://www.deveditor.io/htaccess-generator',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Fix Routing Instantly',
      description: 'The visual webmaster tool for Apache and Nginx logic.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/htaccess-generator',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main tool viewport */}
         <div className="md:h-[calc(100vh-72px)] shrink-0 overflow-y-auto">
            <HtaccessGeneratorView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <HtaccessGeneratorSeoContent />
         </div>
      </div>
   );
}
