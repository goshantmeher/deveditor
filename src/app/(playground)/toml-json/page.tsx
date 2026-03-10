import { TomlJsonView } from '@/components/toml-json/TomlJsonView';
import { Metadata } from 'next';
import { TomlJsonSeoContent } from '@/components/toml-json/docs/TomlJsonSeoContent';

export const metadata: Metadata = {
   title: 'TOML to JSON Converter - DevEditor',
   description:
      'Bi-directionally convert TOML configurations to rigid JSON matrix formats instantly safely securely offline directly inside your terminal workflow environment.',
   keywords: ['toml to json', 'json to toml', 'toml converter', 'json converter', 'convert toml', 'format toml', 'parse toml'],
   openGraph: {
      title: 'Bi-Directional TOML ↔ JSON Tool',
      description: 'Format complex deeply nested configurations precisely offline.',
      url: 'https://www.deveditor.io/toml-json',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'TOML & JSON Transpiler',
      description: 'Format strictly without relying blindly on external routing schemas.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/toml-json',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main tool viewport */}
         <div className="min-h-[calc(100vh-72px)] md:h-[calc(100vh-72px)] shrink-0">
            <TomlJsonView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <TomlJsonSeoContent />
         </div>
      </div>
   );
}
