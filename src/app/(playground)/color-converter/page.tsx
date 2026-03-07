import { ColorConverterView } from '@/components/color-converter/ColorConverterView';
import { ColorConverterSeoContent } from '@/components/color-converter/docs/ColorConverterSeoContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Color Converter & Palette Generator | DevEditor',
   description:
      'Convert between HEX, RGB, HSL, and CMYK color formats. Check WCAG contrast compliance and generate complementary or analogous color palettes instantly.',
   keywords: [
      'color converter',
      'hex to rgb',
      'rgb to hsl',
      'cmyk converter',
      'color palette generator',
      'wcag contrast checker',
      'color picker',
      'frontend design tools',
   ],
   openGraph: {
      title: 'Color Converter & Palette Generator | DevEditor',
      description:
         'Convert between HEX, RGB, HSL, and CMYK. Check WCAG contrast and generate color palettes instantly.',
      url: 'https://www.deveditor.io/color-converter',
      siteName: 'DevEditor',
      type: 'website',
   },
   alternates: { canonical: 'https://www.deveditor.io/color-converter' },
};

export default function ColorConverterPage() {
   return (
      <div className="flex flex-col">
         {/* The main editor viewport */}
         <div className="min-h-[calc(100vh-72px)] lg:h-[calc(100vh-72px)] lg:max-h-[calc(100vh-72px)] shrink-0 w-full overflow-hidden bg-background">
            <ColorConverterView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-12 pb-16 bg-background">
            <ColorConverterSeoContent />
         </div>
      </div>
   );
}
