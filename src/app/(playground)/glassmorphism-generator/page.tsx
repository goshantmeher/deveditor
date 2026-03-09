import { GlassmorphismGeneratorView } from '@/components/glassmorphism-generator/GlassmorphismGeneratorView';
import { Metadata } from 'next';
import { GlassmorphismGeneratorSeoContent } from '@/components/glassmorphism-generator/docs/GlassmorphismGeneratorSeoContent';

export const metadata: Metadata = {
   title: 'Glassmorphism & Box Shadow Generator - DevEditor',
   description:
      'Free online tool to generate beautiful frosted glass UI effects. Fine tune box shadows, blurs, and opacities visually and export to modern CSS or Tailwind utility classes instantly.',
   keywords: ['glassmorphism', 'shadow generator', 'box shadow', 'tailwind glass', 'frosted glass', 'css blur', 'backdrop filter'],
   openGraph: {
      title: 'CSS Glassmorphism & Shadow Tool',
      description: 'Easily design beautiful semi-transparent overlapping components with deep realistic drop shadows visually.',
      url: 'https://www.deveditor.io/glassmorphism-generator',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Glassmorphism Blur Generator',
      description: 'Generate CSS and Tailwind CSS classes for beautiful frosted glass effect overlays seamlessly.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/glassmorphism-generator',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main tool viewport */}
         <div className="h-[calc(100vh-72px)] shrink-0">
            <GlassmorphismGeneratorView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <GlassmorphismGeneratorSeoContent />
         </div>
      </div>
   );
}
