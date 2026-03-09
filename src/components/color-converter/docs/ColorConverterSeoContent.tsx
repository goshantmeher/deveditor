import { Palette, Pipette, Zap, ShieldCheck, Sparkles, Layout } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

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
         {
            '@type': 'Question',
            name: 'Is my input data saved?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'To improve your experience, your input data is saved locally in your browser using localStorage. This is entirely client-side, meaning your data never leaves your device. You can opt-out of this behavior at any time by disabling the "Persist Data" switch in the tool settings.',
            },
         },
      ],
   };

   return (
      <article className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

         {/* Hero Section */}
         <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider">
               <Palette className="w-3.5 h-3.5" />
               Color Engineering
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Color Converter & <span className="text-indigo-500">Palette Builder</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               The ultimate toolkit for managing brand colors, checking accessibility compliance, and generating
               harmonious palettes using modern color science.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Pipette className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Multi-Format</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Convert between HEX, RGB, HSL, and CMYK with a single input. Perfect for moving between web design and
                  print production.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">WCAG Compliance</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Real-time contrast ratio calculations for AA and AAA accessibility standards. Ensure your designs are
                  inclusive for all users.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Smart Harmonies</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Generate mathematically perfect color schemes using Triadic, Analogous, and Complementary models
                  instantly.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">The Science of Harmonies</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Good design relies on balance. Our generator uses precise color-wheel math to find colors that look
                  professional and high-contrast together.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Pipette,
                        title: 'Standard HEX & RGBA',
                        desc: 'Outputs ready-to-paste color strings for CSS, JavaScript, and design tools.',
                     },
                     {
                        icon: Layout,
                        title: 'HSL Sliders',
                        desc: 'Hue-based adjustment using intuitive sliders for fine-grained control.',
                     },
                     {
                        icon: Zap,
                        title: 'CMYK Calculation',
                        desc: 'Automatic CMYK percentage output for print production workflows.',
                     },
                  ].map((item, i) => (
                     <li key={i} className="flex gap-4">
                        <div className="mt-1">
                           <item.icon className="w-5 h-5 text-indigo-500" />
                        </div>
                        <div>
                           <h4 className="font-bold text-foreground">{item.title}</h4>
                           <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                     </li>
                  ))}
               </ul>
            </div>
            <div className="bg-muted/50 rounded-3xl p-8 border border-border">
               <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Pro Tip</span>
               </div>
               <div className="prose prose-invert prose-sm">
                  <p>
                     Use the <strong>contrast checker</strong> to verify your text is readable against its background.
                     WCAG AA requires <code className="text-indigo-400">4.5:1</code> for normal text and{' '}
                     <code className="text-indigo-400">3:1</code> for large text.
                  </p>
                  <p>
                     Try <strong>Triadic harmonies</strong> for bold, vibrant palettes or{' '}
                     <strong>Analogous harmonies</strong> for subtle, professional designs.
                  </p>
               </div>
            </div>
         </div>

         {/* FAQ Section */}
         <div className="space-y-12 border-t border-border/50 pt-24">
            <div className="text-center space-y-4">
               <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
                  Frequently Asked Questions
               </h2>
               <p className="text-muted-foreground">Everything you need to know about our Color Converter.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
               {faqSchema.mainEntity.map((faq, i) => (
                  <div key={i} className="space-y-3">
                     <h3 className="font-bold text-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        {faq.name}
                     </h3>
                     <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-indigo-500/20">
                        {faq.acceptedAnswer.text}
                     </p>
                  </div>
               ))}
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-indigo-600 rounded-3xl p-12 text-center space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <h2 className="text-3xl font-bold text-white relative z-10">Elevate your design system with precision</h2>
            <p className="text-indigo-100 max-w-xl mx-auto relative z-10">
               Start converting colors and building palettes for free. No login, no data limits, total privacy.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Start Designing" />
            </div>
         </div>
      </article>
   );
}
