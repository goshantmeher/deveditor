import { Sparkles, Zap, ShieldCheck, Palette, Sun, Code2 } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function ThemeGeneratorSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'How does the Theme Generator work?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Select a base color and the tool generates a full theme palette using color theory algorithms. It creates primary, secondary, accent, background, and text colors with proper contrast ratios.',
            },
         },
         {
            '@type': 'Question',
            name: 'Does it support dark mode?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes. The generator creates both light and dark mode variants automatically. You can preview and toggle between them in real-time.',
            },
         },
         {
            '@type': 'Question',
            name: 'What export formats are available?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'You can export themes as CSS custom properties, Tailwind config, or shadcn/ui variables. All formats are ready to paste into your project.',
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
               <Sparkles className="w-3.5 h-3.5" />
               Design System
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Theme <span className="text-indigo-500">Generator</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Generate a complete, production-ready color theme from a single base color. Supports light and dark modes
               with accessibility-checked contrast ratios.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Palette className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">One-Click Themes</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Pick a base color and get a full palette — primary, secondary, accent, background, and text colors —
                  all generated automatically.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sun className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Light & Dark Mode</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Both variants generated automatically with proper contrast. Toggle between them in the live preview.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Code2 className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Multiple Exports</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Export as CSS custom properties, Tailwind config, or shadcn/ui variables. Copy and paste directly into
                  your project.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Design System in Seconds</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Stop spending hours picking colors. Our algorithm generates balanced, accessible color systems that
                  look professional out of the box.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Zap,
                        title: 'Algorithmic Generation',
                        desc: 'Uses HSL manipulation and contrast algorithms to derive balanced palettes.',
                     },
                     {
                        icon: ShieldCheck,
                        title: 'WCAG Compliance',
                        desc: 'Text colors are automatically checked against backgrounds for readability.',
                     },
                     {
                        icon: Sparkles,
                        title: 'Live Preview',
                        desc: 'See your theme applied to a sample UI in real-time as you adjust.',
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
                     Use the <strong>shadcn/ui export</strong> to instantly apply your generated theme to any
                     shadcn-based project. Just paste the CSS variables into your{' '}
                     <code className="text-indigo-400">globals.css</code> file.
                  </p>
                  <p>
                     For <strong>Tailwind CSS</strong> projects, export the config and extend your{' '}
                     <code className="text-indigo-400">tailwind.config.ts</code> with the generated colors.
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
               <p className="text-muted-foreground">Everything you need to know about our Theme Generator.</p>
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
            <h2 className="text-3xl font-bold text-white relative z-10">Build your design system today</h2>
            <p className="text-indigo-100 max-w-xl mx-auto relative z-10">
               Generate a complete, accessible color theme in seconds. No sign-up, no limits.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Start Generating" />
            </div>
         </div>
      </article>
   );
}
