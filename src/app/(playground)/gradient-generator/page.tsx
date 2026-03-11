import { GradientGeneratorView } from '@/components/gradient-generator/GradientGeneratorView';
import { Metadata } from 'next';
import { GradientGeneratorSeoContent } from '@/components/gradient-generator/docs/GradientGeneratorSeoContent';

export const metadata: Metadata = {
   title: 'CSS Gradient Generator - Linear & Radial - DevEditor',
   description:
      'Free online tool to generate beautiful CSS gradients. Construct multi-stop linear, radial, and conic color blocks visually and export directly to clean CSS or Tailwind classes instantly.',
   keywords: [
      'gradient generator',
      'css gradients',
      'tailwind gradient',
      'linear gradient',
      'radial gradient',
      'conic gradient',
      'css color',
   ],
   openGraph: {
      title: 'CSS Gradient Background Tool',
      description: 'Easily design complex multi-colored cascading gradients securely inside the browser.',
      url: 'https://www.deveditor.io/gradient-generator',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'CSS Gradient Tool',
      description: 'Generate CSS and Tailwind CSS classes for perfectly configured cascading background gradients.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/gradient-generator',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main tool viewport */}
         <div className="h-[calc(100vh-72px)] shrink-0">
            <GradientGeneratorView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <GradientGeneratorSeoContent />
         </div>
      </div>
   );
}
