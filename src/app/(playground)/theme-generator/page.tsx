import { ThemeGeneratorView } from '@/components/theme-generator/ThemeGeneratorView';
import { ThemeGeneratorSeoContent } from '@/components/theme-generator/docs/ThemeGeneratorSeoContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Theme Generator — UI Color Theme Builder | DevEditor',
   description:
      'Generate comprehensive UI color themes from a single primary color. Export as CSS variables, Tailwind config, or JSON. Live preview with dark and light modes.',
   keywords: [
      'theme generator',
      'ui color theme',
      'tailwind theme',
      'css variables',
      'design tokens',
      'color palette',
      'dark mode theme',
      'light mode theme',
   ],
   openGraph: {
      title: 'Theme Generator — UI Color Theme Builder | DevEditor',
      description:
         'Generate comprehensive UI color themes from a single primary color. Export as CSS variables, Tailwind config, or JSON.',
      url: 'https://www.deveditor.io/theme-generator',
      siteName: 'DevEditor',
      type: 'website',
   },
   alternates: { canonical: 'https://www.deveditor.io/theme-generator' },
};

export default function ThemeGeneratorPage() {
   return (
      <div className="flex flex-col">
         {/* The main editor viewport */}
         <div className="min-h-[calc(100vh-72px)] lg:h-[calc(100vh-72px)] lg:max-h-[calc(100vh-72px)] shrink-0 w-full overflow-hidden bg-background">
            <ThemeGeneratorView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-12 pb-16 bg-background">
            <ThemeGeneratorSeoContent />
         </div>
      </div>
   );
}
