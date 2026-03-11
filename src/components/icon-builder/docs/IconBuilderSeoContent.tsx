import React from 'react';
import { Package, ShieldCheck, Zap, CheckCircle2, Sparkles, Layers } from 'lucide-react';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';

export function IconBuilderSeoContent() {
   return (
      <div className="space-y-32">
         {/* 1. Hero Section */}
         <section className="text-center max-w-3xl mx-auto px-4 md:px-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6">
               <Package className="w-4 h-4" />
               <span>Icon Builder</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-foreground">
               Build the perfect <span className="text-indigo-500">Icon Bundle</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Browse thousands of open-source icons across popular libraries. Search, select exactly what you need, and
               export lightweight custom SVG sprites or React Components instantly in your browser.
            </p>
         </section>

         {/* 2. Feature Grid */}
         <section className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
               <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                     <Layers className="w-6 h-6 text-indigo-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">Multiple Libraries</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                     Mix and match icons from Lucide, Material Design, and FontAwesome all in one localized searchable
                     interface.
                  </p>
               </div>

               <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                     <Zap className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">Performance First</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                     Don't bloat your application bundle by installing full icon frameworks. Pick exactly what you need
                     to keep payloads tiny.
                  </p>
               </div>

               <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                     <ShieldCheck className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">100% Private Tool</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                     Your carts and selections are purely processed locally using browser state. Nothing connects to a
                     backend server.
                  </p>
               </div>
            </div>
         </section>

         {/* 3. Visual/Detail Section */}
         <section className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-8 text-foreground">
                     Everything you need to manage your icons
                  </h2>
                  <ul className="space-y-6">
                     <li className="flex gap-4">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                           <h4 className="font-bold text-foreground mb-1">Instant Local Search</h4>
                           <p className="text-muted-foreground text-sm">
                              Lightning fast filtering across thousands of SVGs without network latency.
                           </p>
                        </div>
                     </li>
                     <li className="flex gap-4">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                           <h4 className="font-bold text-foreground mb-1">SVG Sprite Exports</h4>
                           <p className="text-muted-foreground text-sm">
                              Generates a highly-optimized single SVG file containing all your icons as symbols to use
                              via `href` references.
                           </p>
                        </div>
                     </li>
                     <li className="flex gap-4">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                           <h4 className="font-bold text-foreground mb-1">React Component Exports</h4>
                           <p className="text-muted-foreground text-sm">
                              Download a fully-typed generic `.tsx` file that exports your selected SVGs as individual
                              usable React props.
                           </p>
                        </div>
                     </li>
                  </ul>
               </div>
               <div className="bg-muted/50 rounded-3xl p-8 border border-border">
                  <div className="flex items-center gap-2 mb-6">
                     <Sparkles className="w-5 h-5 text-indigo-400" />
                     <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Pro Tip</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-4">
                     When utilizing SVG Sprites in HTML, simply copy the generated{' '}
                     <code className="text-indigo-400">&lt;symbol&gt;</code> file to your public folder, and reference
                     it globally:
                  </p>
                  <div className="bg-background rounded-xl p-4 border border-border/50 text-xs font-mono text-muted-foreground">
                     {`<svg className="icon w-6 h-6">\n  <use href="/sprite.svg#icon-name" />\n</svg>`}
                  </div>
               </div>
            </div>
         </section>

         {/* 5. How to Use Section */}
         <section className="container mx-auto px-4 border-t border-border/50 pt-24">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12 text-foreground">
               How to Use the Icon Builder
            </h2>
            <div className="max-w-4xl mx-auto space-y-8">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-mono shrink-0">
                     1
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Select an Open-Source Library</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Choose between popular libraries like Lucide, FontAwesome, or Material Design from the sidebar
                        directory. All icons load instantly in the browser.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-mono shrink-0">
                     2
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Search & Select Icons</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Use the top search bar to hunt for specific icons based on names or tags. Click the icon box to
                        add it directly to your personal customized cart list on the sidebar.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-mono shrink-0">
                     3
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Export your Bundle</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Click "Export Icons". Select whether your stack prefers an SVG XML Sprite sheet (best for raw
                        HTML/Svelte) or a clean Typescript React file (best for Next.js).
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* 6. FAQ Section */}
         <section className="container mx-auto px-4 border-t border-border/50 pt-24">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12 text-foreground">
               Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl mx-auto">
               <div>
                  <div className="flex items-center gap-3 mb-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                     <h4 className="font-bold text-foreground">Is my data or selected list saved?</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-indigo-500/20">
                     To improve your experience, your input data, such as your selected cart, is saved locally in your
                     browser using localStorage. This is entirely client-side, meaning your preferences never leave your
                     device. You can opt-out of this behavior at any time by disabling the 'Persist Data' switch via
                     setting icon.
                  </p>
               </div>

               <div>
                  <div className="flex items-center gap-3 mb-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                     <h4 className="font-bold text-foreground">Why not just install library packages?</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-indigo-500/20">
                     When utilizing huge libraries like FontAwesome, dragging them into a bundle generally leads to
                     bloated bundle sizing unless you configure advanced dead-code shaking perfectly. An exported sprite
                     contains strictly the paths you define, providing optimal sizes.
                  </p>
               </div>

               <div>
                  <div className="flex items-center gap-3 mb-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                     <h4 className="font-bold text-foreground">Can I add my own custom SVG to the bundle?</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-indigo-500/20">
                     Currently, you can only browse pre-configured comprehensive open-source libraries. If you need to
                     convert a standalone SVG to React code, check out our standalone "SVG to Base64" or "SVG to JSX"
                     tool.
                  </p>
               </div>

               <div>
                  <div className="flex items-center gap-3 mb-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                     <h4 className="font-bold text-foreground">How should I implement React SVG props?</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-indigo-500/20">
                     The JSX export maps all SVGs dynamically with `React.SVGProps&lt;SVGSVGElement&gt;` interface
                     forwarding parameters, meaning you can pass styling logic exactly like you would an HTML object
                     `&lt;HomeIcon className="text-red-500 w-8" /&gt;` freely.
                  </p>
               </div>
            </div>

            {/* Structured Data for FAQ */}
            <script
               type="application/ld+json"
               dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                     '@context': 'https://schema.org',
                     '@type': 'FAQPage',
                     mainEntity: [
                        {
                           '@type': 'Question',
                           name: 'Is my data or selected list saved?',
                           acceptedAnswer: {
                              '@type': 'Answer',
                              text: 'To improve your experience, your input data, such as your selected cart, is saved locally in your browser using localStorage. This is entirely client-side.',
                           },
                        },
                        {
                           '@type': 'Question',
                           name: 'Why not just install library packages?',
                           acceptedAnswer: {
                              '@type': 'Answer',
                              text: 'When utilizing huge libraries like FontAwesome, dragging them into a bundle generally leads to bloated bundle sizing unless you configure advanced dead-code shaking perfectly.',
                           },
                        },
                     ],
                  }),
               }}
            />
         </section>

         {/* 7. CTA Section */}
         <section className="container mx-auto px-4 pb-12 pt-12">
            <div className="bg-indigo-600 rounded-3xl p-12 text-center relative overflow-hidden group">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 blur-[80px] rounded-full group-hover:bg-white/10 transition-colors pointer-events-none" />
               <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white relative z-10">
                  Start Building Your Icon Deck
               </h2>
               <p className="text-indigo-100 mb-8 max-w-2xl mx-auto relative z-10">
                  Stop guessing which package contains which icon. Select precisely what you need, generate optimal
                  sprites instantly, and reduce your payload entirely free inside the browser.
               </p>
               <div className="relative z-10">
                  <ScrollToTopButton label="Scroll up to Start Icons" />
               </div>
            </div>
         </section>
      </div>
   );
}
