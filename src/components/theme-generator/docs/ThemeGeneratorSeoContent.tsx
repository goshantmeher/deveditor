import React from 'react';
import {
   Palette,
   Sparkles,
   Zap,
   ShieldCheck,
   Layout,
   Download,
   Sun,
   Moon,
} from 'lucide-react';

export function ThemeGeneratorSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'How does the theme generator work?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'The tool uses color theory algorithms to generate a complete set of UI tokens (background, foreground, primary, secondary, accent, and status colors) from a single base color choice.',
            },
         },
         {
            '@type': 'Question',
            name: 'Are the themes accessible?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes. We automatically calibrate the lightness and contrast of foreground colors to ensure they meet WCAG accessibility standards for readability on various backgrounds.',
            },
         },
         {
            '@type': 'Question',
            name: 'What export formats are available?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'You can export your theme as CSS Custom Properties, Tailwind CSS configuration, or raw JSON for custom implementations.',
            },
         },
      ],
   };

   return (
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-24">
         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
               __html: JSON.stringify(faqSchema),
            }}
         />

         {/* Hero Section */}
         <section className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
               Enterprise-Grade UI Theme Engineering
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
               Generate complete, consistent, and accessible design systems from a single color. The ultimate companion
               for modern web and application designers.
            </p>
         </section>

         {/* Features Grid */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-2xl border border-border/50 space-y-4 transition-all hover:border-indigo-500/30">
               <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500">
                  <Palette className="w-5 h-5" />
               </div>
               <h3 className="text-lg font-bold">Semantic Tokens</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">
                  Automatic generation of primary, secondary, surface, and status colors using advanced color theory.
               </p>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border/50 space-y-4 transition-all hover:border-sky-500/30">
               <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-500">
                  <Download className="w-5 h-5" />
               </div>
               <h3 className="text-lg font-bold">Multi-Export</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">
                  Ready-to-use exports for CSS (variables), Tailwind CSS (config), and JSON for any tech stack.
               </p>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border/50 space-y-4 transition-all hover:border-emerald-500/30">
               <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                  <ShieldCheck className="w-5 h-5" />
               </div>
               <h3 className="text-lg font-bold">Safe Contrast</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">
                  Every generated color is automatically checked and adjusted for WCAG accessibility compliance.
               </p>
            </div>
         </div>

         {/* Main Content Deep Dive */}
         <div className="space-y-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="space-y-6">
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                     <Layout className="w-6 h-6 text-indigo-500" />
                     Complete UI Calibration
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                     Building a theme is more than just picking a color. Our generator builds a complete visual language
                     for your application.
                  </p>
                  <ul className="space-y-3">
                     {[
                        'Light and Dark mode pair generation',
                        'Harmonic secondary and accent hues',
                        'Semantic background & muted surface tones',
                        'Live interactive component preview',
                     ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                           <Zap className="w-4 h-4 text-indigo-400 shrink-0" />
                           <span>{item}</span>
                        </li>
                     ))}
                  </ul>
               </div>
               <div className="bg-muted/30 rounded-3xl p-8 border border-border/50">
                  <div className="aspect-video bg-background rounded-2xl flex flex-col items-center justify-center border border-border/30 relative overflow-hidden group">
                     <div className="flex gap-4 mb-4">
                        <Sun className="w-8 h-8 text-amber-500/50" />
                        <Moon className="w-8 h-8 text-indigo-500/50" />
                     </div>
                     <Sparkles className="w-16 h-16 text-indigo-500/10 group-hover:scale-110 transition-transform duration-500" />
                     <div className="absolute inset-0 bg-linear-to-tr from-indigo-500/5 to-transparent pointer-events-none" />
                  </div>
               </div>
            </div>
         </div>

         {/* FAQ/Guide Section */}
         <section className="bg-muted/20 border border-border/30 rounded-3xl p-8 md:p-12 space-y-8">
            <h3 className="text-2xl font-bold text-center">Frequently Asked Questions</h3>
            <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-3">
                  <h4 className="font-bold">What are "Semantic Tokens"?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     These represent the PURPOSE of a color (e.g., "primary-button" or "error-text") rather than just
                     the value. Our tool generates these tokens automatically.
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="font-bold">Tailwind Support?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     Yes. We generate a full `colors` object that you can copy into your `tailwind.config.js` `extend`
                     section to instantly stylize your entire UI.
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="font-bold">Privacy for Brand Colors?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     Yes. Every step of the theme generation happens locally in your browser session. No proprietary
                     brand colors are ever sent to our servers.
                  </p>
               </div>
               <div className="bg-muted/10 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">12 Presets</h4>
                  <p className="text-sm">
                     Start from popular curated colors like Indigo, Emerald, Rose, and more as a base.
                  </p>
               </div>
            </div>
         </section>

         {/* Bottom CTA */}
         <div className="text-center space-y-6 pt-12">
            <h3 className="text-xl font-bold italic text-muted-foreground/60 tracking-wider uppercase">
               Craft your visual identity with precision
            </h3>
            <div className="h-1 w-24 bg-linear-to-r from-transparent via-indigo-500/50 to-transparent mx-auto" />
         </div>
      </div>
   );
}
