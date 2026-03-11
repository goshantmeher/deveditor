import { Layers, Sparkles, Cpu, MousePointer2, Code2, Zap } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function CssPlaygroundSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'What CSS properties can I generate?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'You can generate box shadows, gradients, border-radius, animations, transforms, flexbox layouts, and grid layouts — all with a visual interface and live preview.',
            },
         },
         {
            '@type': 'Question',
            name: 'Does it include a live preview?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes. The playground includes a sandboxed iframe that renders your HTML and CSS in real-time. You can see your changes as you type.',
            },
         },
         {
            '@type': 'Question',
            name: 'Is it private?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Absolutely. All CSS and HTML processing happens in your browser. Your code is never uploaded to our servers.',
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
               <Layers className="w-3.5 h-3.5" />
               Visual CSS Builder
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               CSS Playground & <span className="text-indigo-500">Generator</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Write HTML and CSS with a live preview. Generate complex properties like gradients, shadows, and
               animations with visual tools — no guesswork required.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Code2 className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Dual Editor</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Write HTML and CSS in separate panels with syntax highlighting. See your changes reflected instantly
                  in a sandboxed preview.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MousePointer2 className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Visual Generators</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Use slider-based generators for shadows, gradients, border-radius, transforms, animations, and layout
                  systems.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Live Preview</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Sandboxed iframe rendering with instant updates. See your CSS take effect in real-time as you adjust
                  properties.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">7 Built-in Generators</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Stop memorizing CSS syntax. Our visual generators let you design complex properties by adjusting
                  sliders, then copy the generated code.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Layers,
                        title: 'Box Shadow & Gradients',
                        desc: 'Multi-layer shadow builder and gradient creator with angle and color stop controls.',
                     },
                     {
                        icon: Zap,
                        title: 'Flexbox & Grid',
                        desc: 'Visual layout builders with configurable gaps, alignment, and direction.',
                     },
                     {
                        icon: Sparkles,
                        title: 'Animation & Transform',
                        desc: 'Keyframe animation builder with rotate, scale, skew, and translate controls.',
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
                     Use the <strong>Gradient Generator</strong> to design complex{' '}
                     <code className="text-indigo-400">linear-gradient</code> and{' '}
                     <code className="text-indigo-400">radial-gradient</code> backgrounds, then copy the CSS directly
                     into your project.
                  </p>
                  <p>
                     The <strong>Box Shadow</strong> generator supports multiple layers, so you can build realistic
                     depth effects with stacked shadows.
                  </p>
               </div>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
               How to Use the CSS Playground
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     1
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Write Your Structure (HTML)</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Enter your HTML structure in the top-left editor. The preview iframe will automatically load
                        your elements into a sandboxed environment for safe rendering.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     2
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Apply Styles (CSS)</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Define your styles in the CSS editor. You can target the classes and IDs you created in the HTML
                        panel, with changes reflecting instantly in the live preview.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     3
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Use Visual Generators</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Open the generator tab to build complex properties like 3D transforms, multi-layered box
                        shadows, or flexbox layouts using intuitive sliders and pickers.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     4
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Interact With the Preview</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Toggle hover and active states directly in the preview window to test your CSS transitions and
                        animations. The environment simulates a real browser viewport context.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     5
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Export CSS Code</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Once satisfied with your design, click "Copy CSS" to grab the final generated stylesheet. Your
                        code is now ready to be pasted into your actual project files.
                     </p>
                  </div>
               </div>
            </div>
         </div>

         {/* FAQ Section */}
         <div className="space-y-12 border-t border-border/50 pt-24">
            <div className="text-center space-y-4">
               <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
                  Frequently Asked Questions
               </h2>
               <p className="text-muted-foreground">Everything you need to know about our CSS Playground.</p>
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
            <h2 className="text-3xl font-bold text-white relative z-10">Design CSS visually, code it instantly</h2>
            <p className="text-indigo-100 max-w-xl mx-auto relative z-10">
               Start experimenting with CSS properties using our visual generators. No sign-up, total privacy.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Start Designing" />
            </div>
         </div>
      </article>
   );
}
