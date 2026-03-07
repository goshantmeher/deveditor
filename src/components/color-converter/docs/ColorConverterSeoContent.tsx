import React from 'react';
import { Palette, Pipette, Zap, ShieldCheck, Sparkles, Layout } from 'lucide-react';

export function ColorConverterSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'Which color models are supported?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'We support HEX, RGB, HSL, and CMYK. You can convert any format to another instantly with real-time updates.',
            },
         },
         {
            '@type': 'Question',
            name: 'What is WCAG accessibility checking?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'WCAG (Web Content Accessibility Guidelines) defines contrast ratios to ensure text is readable for everyone. We check for AA (4.5:1) and AAA (7:1) compliance.',
            },
         },
         {
            '@type': 'Question',
            name: 'How does palette generation work?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Based on your base color, we use mathematical color theory to generate Complementary, Analogous, Triadic, and Monochromatic harmonies.',
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
               Advanced Color Engineering & Palette Design
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
               The ultimate toolkit for managing brand colors, checking accessibility compliance, and generating
               harmonious palettes using modern color science.
            </p>
         </section>

         {/* Features Grid */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-2xl border border-border/50 space-y-4 transition-all hover:border-indigo-500/30">
               <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500">
                  <Pipette className="w-5 h-5" />
               </div>
               <h3 className="text-lg font-bold">Multi-Format</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">
                  Convert between HEX, RGB, HSL, and CMYK with a single input. Perfect for moving between web design and
                  print production.
               </p>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border/50 space-y-4 transition-all hover:border-emerald-500/30">
               <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                  <ShieldCheck className="w-5 h-5" />
               </div>
               <h3 className="text-lg font-bold">WCAG Compliance</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">
                  Real-time contrast ratio calculations for AA and AAA accessibility standards. Ensure your designs are
                  inclusive for all users.
               </p>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border/50 space-y-4 transition-all hover:border-amber-500/30">
               <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
                  <Sparkles className="w-5 h-5" />
               </div>
               <h3 className="text-lg font-bold">Smart Harmonies</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">
                  Generate mathematically perfect color schemes using Triadic, Analogous, and Complementary models
                  instantly.
               </p>
            </div>
         </div>

         {/* Main Content Deep Dive */}
         <div className="space-y-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="space-y-6">
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                     <Layout className="w-6 h-6 text-indigo-500" />
                     The Science of Harmonies
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                     Good design relies on balance. Our generator uses precise color-wheel math to find colors that look
                     professional and high-contrast together.
                  </p>
                  <ul className="space-y-3">
                     {[
                        'Standard HEX and RGBA string output',
                        'Hue-based adjustment using HSL sliders',
                        'Automatic CMYK percentage calculation',
                        'High-contrast complementary detection',
                     ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                           <Zap className="w-4 h-4 text-indigo-400 shrink-0" />
                           <span>{item}</span>
                        </li>
                     ))}
                  </ul>
               </div>
               <div className="bg-muted/50 rounded-3xl p-8 border border-border">
                  <div className="aspect-video bg-background rounded-2xl flex items-center justify-center border border-border/50 relative overflow-hidden group">
                     <Palette className="w-24 h-24 text-indigo-500/25 group-hover:text-indigo-500/40 group-hover:scale-110 transition-all duration-500" />
                     <div className="absolute inset-0 bg-linear-to-tr from-indigo-500/15 to-transparent pointer-events-none" />
                  </div>
               </div>
            </div>
         </div>

         {/* FAQ/Guide Section */}
         <section className="bg-muted/20 border border-border/30 rounded-3xl p-8 md:p-12 space-y-8">
            <h3 className="text-2xl font-bold text-center">Frequently Asked Questions</h3>
            <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-3">
                  <h4 className="font-bold">What is HSL?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     HSL stands for Hue, Saturation, and Lightness. It is the most intuitive model for developers
                     because it allows you to keep the color same while only changing how bright it is.
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="font-bold">AA vs AAA contrast?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     WCAG AA requires a ratio of 4.5:1 for normal text. AAA is more stringent, requiring 7.1:1, and is
                     typically used for mission-critical UX and long-form reading.
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="font-bold">Is CMYK accurate?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     Since screens (RGB) and printers (CMYK) use different physics, our conversion is highly accurate
                     numerically but the physical result depends on paper and ink quality.
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="font-bold">Is it private?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     Yes. Just like our other tools, the color conversions happen in your browser. No server ever sees
                     the brand colors you are testing.
                  </p>
               </div>
            </div>
         </section>

         {/* Bottom CTA */}
         <div className="text-center space-y-6 pt-12">
            <h3 className="text-xl font-bold italic text-muted-foreground/60 tracking-wider uppercase">
               Elevate your design system with precision
            </h3>
            <div className="h-1 w-24 bg-linear-to-r from-transparent via-indigo-500/50 to-transparent mx-auto" />
         </div>
      </div>
   );
}
