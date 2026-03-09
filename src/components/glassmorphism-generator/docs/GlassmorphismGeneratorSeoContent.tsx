import { Layers, PaintBucket, Sparkles, Wand2, Star, Zap } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function GlassmorphismGeneratorSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'What is Glassmorphism CSS?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Glassmorphism is a UI design trend that creates a frosted glass effect on layout elements. It relies predominantly on the CSS property backdrop-filter: blur() coupled with a semi-transparent localized background to create the illusion of glass floating above the content below it.',
            },
         },
         {
            '@type': 'Question',
            name: 'How do I add a shadow to a glassed card?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'To ensure the glass element pops from its background layer, apply a subtle drop shadow using the box-shadow CSS property. Typically, a black or dark-gray shadow with around 10% to 20% opacity and a high blur radius works best to simulate physical elevation.',
            },
         },
         {
            '@type': 'Question',
            name: 'Are Tailwind CSS classes available for frosted glass?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes! Tailwind supports this design style extensively. You can use backdrop-blur-[px] utilities paired with bg-white/10 to instantiate the transparent glass window effect instantly without writing plain CSS.',
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
               Frontend & UI Patterns
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Beautiful <span className="text-indigo-500">Glass UI Design</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Generate modern web application components with frosted glass effects. Configure blur strengths, shadows, inner boarders, and opacities visually.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Wand2 className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Interactive Slider Tools</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Fine-tune pixel perfect effects in our sandbox view rather than reloading your browser continuously looking for the perfect amount of opacity blur.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Star className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Tailwind Optimized</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  The generated CSS natively adapts to plain web standards or specific arbitrary value tailwind CSS arrays for modern Next.js environments.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Box Shadow Modeling</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Construct perfect drop shadows behind your frost-windows to increase physical 3D elevation and separate elements deeply across any backdrop.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Mastering modern UX</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Glassmorphism builds digital hierarchy implicitly by overlapping elements but keeping out-of-focus background components somewhat visible.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: PaintBucket,
                        title: 'Multiple Filter Options',
                        desc: 'Combine translucent backgrounds with an active `-webkit-backdrop-filter` property to create deep blurry focal points.',
                     },
                     {
                        icon: Layers,
                        title: 'Outline Subtleties',
                        desc: 'The trick to a truly professional glass styling is almost always an ultra thin white inner or outer border.',
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
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                     CSS Quick Overview
                  </span>
               </div>
               <div className="space-y-3 font-mono text-sm">
                  {[
                     { from: 'Transparency', to: 'background: rgba(255, 255, 255, 0.2);' },
                     { from: 'The Effect', to: 'backdrop-filter: blur(10px);' },
                     { from: 'Depth', to: 'box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);' },
                     { from: 'Rim Lighting', to: 'border: 1px solid rgba(255, 255, 255, 0.3);' },
                  ].map((item, i) => (
                     <div key={i} className="flex flex-col gap-1 text-muted-foreground mb-4">
                        <span className="text-xs text-rose-400 opacity-80">{item.from}</span>
                        <span className="text-emerald-400">→ {item.to}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* FAQ Section */}
         <div className="space-y-12 border-t border-border/50 pt-24">
            <div className="text-center space-y-4">
               <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
                  Frequently Asked Questions
               </h2>
               <p className="text-muted-foreground">Information about shadow rendering and CSS filter algorithms.</p>
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
         <div className="bg-indigo-600 rounded-3xl p-12 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <h2 className="text-3xl font-bold text-white relative z-10 mb-4">Create beautiful UI components</h2>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Generate Styles" />
            </div>
         </div>
      </article>
   );
}
