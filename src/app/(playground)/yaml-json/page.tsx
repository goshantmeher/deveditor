import { YamlJsonView } from '@/components/yaml-json/YamlJsonView';
import { Metadata } from 'next';
import { YamlJsonSeoContent } from '@/components/yaml-json/docs/YamlJsonSeoContent';

export const metadata: Metadata = {
   title: 'YAML to JSON Converter - DevEditor',
   description:
      'Bi-directionally convert YAML configurations to rigid JSON matrix formats instantly safely securely offline directly inside your terminal workflow environment.',
   keywords: [
      'yaml to json',
      'json to yaml',
      'yaml converter',
      'json converter',
      'convert yaml',
      'format yaml',
      'parse yaml',
   ],
   openGraph: {
      title: 'Bi-Directional YAML ↔ JSON Tool',
      description: 'Format complex deeply nested configurations precisely offline.',
      url: 'https://www.deveditor.io/yaml-json',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'YAML & JSON Transpiler',
      description: 'Format strictly without relying blindly on external routing schemas.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/yaml-json',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main tool viewport */}
         <div className="min-h-[calc(100vh-72px)] md:h-[calc(100vh-72px)] shrink-0">
            <YamlJsonView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <YamlJsonSeoContent />
         </div>
      </div>
   );
}
