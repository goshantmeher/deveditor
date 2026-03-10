import { Palette, Sparkles, MonitorSmartphone, Code2, Brush, Zap } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function GradientGeneratorSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'What is a CSS Gradient?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'A CSS gradient allows you to display smooth transitions between two or more specified colors. Modern CSS supports linear gradients (going down/up/left/right/diagonally), radial gradients (defined by their center), and conic gradients (rotated around a center point).',
            },
         },
         {
            '@type': 'Question',
            name: 'How do I use generated tailwind gradients?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'The optimal way to use complex gradients in Tailwind is by passing raw arbitrary values like `bg-[linear-gradient(90deg,_#4f46e5_0%,_#ec4899_100%)]`. For basic 2-3 step gradients, you can use built in tailwind classes like `bg-gradient-to-r from-blue-500 to-pink-500`.',
            },
         },
         {
            '@type': 'Question',
            name: 'Are conic gradients supported in all browsers?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes! Conic gradients are natively supported across all modern browsers including Safari, Chrome, Edge, and Firefox today.',
            },
         },
      ],
   };

   return (
      <article className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

         {/* Hero Section */}
         <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-500 text-xs font-bold uppercase tracking-wider">
               <Palette className="w-3.5 h-3.5" />
               Visual Prototyping
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Ultimate <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">CSS Gradients</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Construct beautiful, seamless linear, radial, and conic color gradients. Add multiple color stops safely and export directly into clean CSS or Tailwind classes.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-pink-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Brush className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Multi-Stop Layering</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Add an infinite amount of color steps perfectly tuned via a precise percentage value slider. Generate beautiful mesh combinations securely and natively.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-pink-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MonitorSmartphone className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">3 Different Modes</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Toggle dynamically between standard linear-gradients, fully circular radial-gradients, or sweeping pie-chart style conic-gradients quickly.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-pink-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Tailwind Arbitrary Syntax</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Complex color arrays traditionally do not map exactly to pure Tailwind standard presets. Our engine encodes the entire chain strictly as arbitrary bracket parameters.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Better background components</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Enhance flat solid color containers with rich multi-depth colors to guide the user's eye towards Call to Action elements seamlessly.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Sparkles,
                        title: 'Random Generation',
                        desc: 'Lack design inspiration? Just repeatedly click randomizer arrays to construct abstract complementary pallets procedurally.',
                     },
                     {
                        icon: Code2,
                        title: 'Fallback Implementations',
                        desc: 'Generated CSS blocks include automated flat hex fallback properties out of the box so outdated web environments do not completely break rendering layouts.',
                     },
                  ].map((item, i) => (
                     <li key={i} className="flex gap-4">
                        <div className="mt-1">
                           <item.icon className="w-5 h-5 text-pink-500" />
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
                  <Code2 className="w-4 h-4 text-pink-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                     Tailwind Translation Map
                  </span>
               </div>
               <div className="space-y-3 font-mono text-sm">
                  {[
                     { from: 'linear-gradient(to right, red, blue)', to: 'bg-linear-to-r from-red-500 to-blue-500' },
                     { from: 'linear-gradient(to top right, ...)', to: 'bg-linear-to-tr' },
                     { from: 'radial-gradient(circle, ...)', to: 'bg-[radial-gradient(circle,_black,_white)]' },
                     { from: 'conic-gradient(from 0deg, ...)', to: 'bg-[conic-gradient(from_0deg,_blue,_red)]' },
                  ].map((item, i) => (
                     <div key={i} className="flex flex-col gap-1 text-muted-foreground mb-4">
                        <span className="text-xs text-rose-400 opacity-80">{item.from}</span>
                        <span className="text-emerald-400 font-bold">→ {item.to}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">How to Create CSS Gradients</h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-pink-500/10 text-pink-500 flex items-center justify-center font-bold font-mono shrink-0">1</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Choose Your Gradient Mode</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Select between Linear (straight transitions), Radial (circular patterns), or Conic (sweeping pie-chart style) to define the base geometry of your color blend.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-pink-500/10 text-pink-500 flex items-center justify-center font-bold font-mono shrink-0">2</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Configure Color Stops</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Add multiple color markers to the gradient bar. Drag them to change their percentage distribution, and use the color picker to find the perfect hue and opacity for each step.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-pink-500/10 text-pink-500 flex items-center justify-center font-bold font-mono shrink-0">3</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Set Direction & Angle</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Use the angle dial or the direction presets (Top, Bottom, Right, Left) to rotate your linear gradient. Radial gradients can also be centered or offset for specific lighting effects.</p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-pink-500/10 text-pink-500 flex items-center justify-center font-bold font-mono shrink-0">4</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Preview on Real Elements</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Review the live preview box to see how your colors interact. Toggle between "Desktop" and "Mobile" view to ensure the transition remains smooth across different viewport dimensions.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-pink-500/10 text-pink-500 flex items-center justify-center font-bold font-mono shrink-0">5</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Copy Your Preferred Syntax</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Click to copy the standard CSS <code className="text-pink-400">background: linear-gradient(...)</code> or the equivalent Tailwind CSS arbitrary bracket utility for your project.</p>
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
               <p className="text-muted-foreground">Information about CSS color stops and rendering.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
               {faqSchema.mainEntity.map((faq, i) => (
                  <div key={i} className="space-y-3">
                     <h3 className="font-bold text-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                        {faq.name}
                     </h3>
                     <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-pink-500/20">
                        {faq.acceptedAnswer.text}
                     </p>
                  </div>
               ))}
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-12 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <h2 className="text-3xl font-bold text-white relative z-10 mb-4">Paint Beautiful UI Components</h2>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Start" />
            </div>
         </div>
      </article>
   );
}
