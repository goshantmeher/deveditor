import React from 'react';
import { Monitor, Wind, Box, Code, Layers, MousePointer2, Zap } from 'lucide-react';

export function CssPlaygroundSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'What is the CSS Playground?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'The CSS Playground is a free online tool that lets you write HTML and CSS side-by-side or use interactive visual generators to create CSS styles and Tailwind utility classes. It renders results in real-time.',
            },
         },
         {
            '@type': 'Question',
            name: 'Does it generate Tailwind CSS?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes! Using the visual Generator Mode, you can manipulate controls to create Box Shadows, Gradients, Flexbox/Grid layouts, and Animations, and copy the equivalent Tailwind classes directly to your clipboard.',
            },
         },
         {
            '@type': 'Question',
            name: 'How does the live preview work?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'The live preview uses a sandboxed iframe that updates automatically as you type or adjust visual sliders. Changes are debounced to ensure smooth performance. The preview supports desktop, tablet, and mobile viewport sizes.',
            },
         },
         {
            '@type': 'Question',
            name: 'Can I save my CSS experiments?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: "Yes! The CSS Playground automatically saves your HTML and CSS to your browser's local storage. Your code will persist across page refreshes. You can also export your work as a standalone HTML file.",
            },
         },
         {
            '@type': 'Question',
            name: 'What preset templates are available?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'The CSS Playground includes curated preset templates and visual generators for Flexbox Layout, Grid Layout, CSS Animations, Typography, Box Shadows, Border Radius, Transforms, and Gradients.',
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
               The Ultimate Frontend Component Sandbox
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
               Experiment with layout, animation, and UI components in real-time. Whether you prefer writing raw code or
               using visual sliders, DevEditor has you covered.
            </p>
         </section>

         {/* Features Grid */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-2xl border border-border/50 space-y-4 transition-all hover:border-indigo-500/30">
               <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500">
                  <Monitor className="w-5 h-5" />
               </div>
               <h3 className="text-lg font-bold">Live Refresh</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">
                  Real-time preview rendered in a sandboxed iframe. See every CSS change instantly without refreshing
                  your page.
               </p>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border/50 space-y-4 transition-all hover:border-sky-500/30">
               <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-500">
                  <Wind className="w-5 h-5" />
               </div>
               <h3 className="text-lg font-bold">Tailwind Magic</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">
                  Convert complex visual styles like gradients and box shadows into idiomatic Tailwind utility classes
                  with a single click.
               </p>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border/50 space-y-4 transition-all hover:border-emerald-500/30">
               <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                  <Box className="w-5 h-5" />
               </div>
               <h3 className="text-lg font-bold">Visual Builders</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">
                  Interactive generators for Flexbox, CSS Grid, Transforms, and Keyframes. Build layouts visually, then
                  export the code.
               </p>
            </div>
         </div>

         {/* Main Content Deep Dive */}
         <div className="space-y-16">
            {/* Editor Mode */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="space-y-6">
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                     <Code className="w-6 h-6 text-indigo-500" />
                     Dual-Pane Editor Mode
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                     For developers who live in code. Write CSS and HTML side-by-side with full syntax highlighting and
                     autocompletion. Perfect for quick logic tests or styling experiments.
                  </p>
                  <ul className="space-y-3">
                     {[
                        'Monaco-powered high-performance editor',
                        'Automatic local storage persistence',
                        'Responsive viewport toggle (Mobile/Desktop)',
                        'Standalone HTML export support',
                     ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                           <Zap className="w-4 h-4 text-indigo-400 shrink-0" />
                           <span>{item}</span>
                        </li>
                     ))}
                  </ul>
               </div>
               <div className="bg-muted/30 rounded-3xl p-8 border border-border/50">
                  <div className="aspect-video bg-background rounded-2xl flex items-center justify-center border border-border/30 relative overflow-hidden group">
                     <Layers className="w-24 h-24 text-indigo-500/10 group-hover:scale-110 transition-transform duration-500" />
                     <div className="absolute inset-0 bg-linear-to-tr from-indigo-500/5 to-transparent pointer-events-none" />
                  </div>
               </div>
            </div>

            {/* Generator Mode */}
            <div className="grid md:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
               <div className="bg-muted/30 rounded-3xl p-8 border border-border/50 md:order-last">
                  <div className="aspect-video bg-background rounded-2xl flex items-center justify-center border border-border/30 relative overflow-hidden group">
                     <MousePointer2 className="w-24 h-24 text-sky-500/10 group-hover:scale-110 transition-transform duration-500" />
                     <div className="absolute inset-0 bg-linear-to-tr from-sky-500/5 to-transparent pointer-events-none" />
                  </div>
               </div>
               <div className="space-y-6">
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                     <Layers className="w-6 h-6 text-sky-500" />
                     No-Code Visual Generators
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                     Don't waste time looking up property syntax. Use our visual sliders to build complex transforms,
                     animations, and shadows, and get optimized code instantly.
                  </p>
                  <ul className="space-y-3">
                     {[
                        'Box Shadow & Border Radius builder',
                        'Visual Flexbox & CSS Grid designer',
                        'Keyframe Animation & Timing controls',
                        'Advanced 2D/3D Transform generator',
                     ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                           <Zap className="w-4 h-4 text-sky-400 shrink-0" />
                           <span>{item}</span>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>

         {/* FAQ/Guide Section */}
         <section className="bg-muted/20 border border-border/30 rounded-3xl p-8 md:p-12 space-y-8">
            <h3 className="text-2xl font-bold text-center">Frequently Asked Questions</h3>
            <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-3">
                  <h4 className="font-bold">Is the CSS Playground free?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     Yes! DevEditor is open-source and entirely free. No credits, no paywalls, and no login needed to
                     export your designs.
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="font-bold">Does it support responsive design?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     Absolutely. Use the viewport switcher in the toolbar to test how your styles look on mobile,
                     tablet, and desktop screens in real-time.
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="font-bold">What browser features are supported?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     Everything your browser supports! Since the preview runs in a real iframe, it works with the latest
                     CSS specs like Aspect Ratio, Backdrop Filters, and Container Queries.
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="font-bold">Can I use generated Tailwind classes?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     Yes. Our visual generators provide a dedicated Tailwind tab where all properties are automatically
                     mapped to their official utility class equivalents.
                  </p>
               </div>
            </div>
         </section>

         {/* Bottom CTA */}
         <div className="text-center space-y-6 pt-12">
            <h3 className="text-xl font-bold italic text-muted-foreground/60 tracking-wider uppercase">
               Design Faster with DevEditor
            </h3>
            <div className="h-1 w-24 bg-linear-to-r from-transparent via-indigo-500/50 to-transparent mx-auto" />
         </div>
      </div>
   );
}
