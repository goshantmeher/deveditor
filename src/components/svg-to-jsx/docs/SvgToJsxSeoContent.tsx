import { ArrowRightLeft, ShieldCheck, Code2, Sparkles, Braces, FileCode2, Zap } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function SvgToJsxSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'How does the SVG to React JSX conversion work?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'The tool uses native browser APIs to parse your raw SVG string, mapping HTML-style snake_case, dash-case, and colon attributes (like stroke-width or xmlns:xlink) into standard camelCase syntax required by React.',
            },
         },
         {
            '@type': 'Question',
            name: 'Are inline styles supported?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes! If your SVG has inline styles (like style="fill: red;"), they are safely and automatically translated to standard JSX style objects (like style={{ fill: "red" }}).',
            },
         },
         {
            '@type': 'Question',
            name: 'Is my SVG code kept private?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Absolutely. The conversion process happens 100% on the client-side inside your browser, which means your code never touches any external servers.',
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
               <FileCode2 className="w-3.5 h-3.5" />
               Convert & Generate
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               SVG to <span className="text-indigo-500">React JSX</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Instantly convert raw SVG elements into ready-to-use React components. Automatically maps snake-case attributes, resolves styling, and formats cleanly.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Braces className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Perfect CamelCase Mapping</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Translates dozens of non-standard SVG attributes into React-supported camelCase dynamically and safely.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">100% Client-Side Privacy</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Your source code, assets, and layouts are processed strictly inside your own browser. Zero tracking.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Instant Live Output</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Export directly as code variables without wait times. It processes code concurrently frame by frame using DOM parsers.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Fast, Smart, and Ready to Paste</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Dealing with manually refactoring <code>xml:space</code> or <code>fill-rule</code> is a headache. Now it is a single click away to wrap your icon sets securely in standard React components.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Code2,
                        title: 'Cleans up classnames',
                        desc: 'Translates "class" completely to "className".',
                     },
                     {
                        icon: ArrowRightLeft,
                        title: 'Handles style attributes natively',
                        desc: 'Transforms raw CSS inline styling to object syntax required by React.',
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
                     Quick Look
                  </span>
               </div>
               <div className="space-y-3 font-mono text-sm">
                  {[
                     { from: 'class="icon"', to: 'className="icon"' },
                     { from: 'stroke-width="2"', to: 'strokeWidth="2"' },
                     { from: 'xmlns:xlink="..."', to: 'xmlnsXlink="..."' },
                     { from: 'style="fill: blue;"', to: 'style={{fill: \'blue\'}}' },
                  ].map((item, i) => (
                     <div key={i} className="flex flex-col gap-1 text-muted-foreground mb-4">
                        <span className="text-xs text-rose-400 opacity-80">{item.from}</span>
                        <span className="text-emerald-400">→ {item.to}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">How to Convert SVG to React</h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">1</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Paste Your Vector Markup</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Enter your raw SVG string into the input area. The tool also supports dragging and dropping file assets for immediate parsing.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">2</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Observe Casing Transformation</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Watch as the engine automatically maps <code className="text-indigo-400">stroke-width</code> to <code className="text-indigo-400">strokeWidth</code> and <code className="text-indigo-400">fill-rule</code> to <code className="text-indigo-400">fillRule</code> for React compatibility.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">3</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Resolve Style Objects</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Check the output for the "Style Transformation" area where inline CSS strings are converted into standard JSX object property syntax automatically.</p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">4</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Audit Component Names</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Verify that all non-standard elements like <code className="text-indigo-400">mask-type</code> or <code className="text-indigo-400">clip-path</code> have been correctly remapped into their valid React prop counterparts.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">5</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Copy and Paste Component</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Click "Copy" to get the full JSX markup. The processing is entirely browser-based, keeping your assets localized and secure in your environment.</p>
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
               <p className="text-muted-foreground">Common queries related to transferring SVG tags to JSX code.</p>
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
            <h2 className="text-3xl font-bold text-white relative z-10 mb-4">Convert SVGs safely in seconds</h2>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Generate React Code" />
            </div>
         </div>
      </article>
   );
}
