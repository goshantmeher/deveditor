import { Replace, Braces, ShieldCheck, Code2 } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function XmlJsonSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'Why convert XML to JSON?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'XML provides a robust document markup syntax with attributes, but modern frontends natively integrate JSON structures faster. Compiling XML documents into lightweight JavaScript arrays enables massive performance gains avoiding excessive document parsing latency significantly natively.',
            },
         },
         {
            '@type': 'Question',
            name: 'Are my XML attributes safely parsed into JSON?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Absolutely! Our transpiler specifically preserves attributes seamlessly generating prefixed variables correctly protecting data contexts perfectly executing complex tag translations seamlessly retaining structural meaning without data dropping inherently.',
            },
         },
         {
            '@type': 'Question',
            name: 'Is my proprietary data kept completely private?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes! All bi-directional syntax transformations process cleanly offline within your browser securely. Your structured information never transmits strictly protecting deeply nested layouts entirely isolating your execution locally safely.',
            },
         },
      ],
   };

   return (
      <article className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

         {/* Hero Section */}
         <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
               <Replace className="w-3.5 h-3.5" />
               Markup Transpiler
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Instant <span className="text-blue-500">XML ↔ JSON</span> Converter
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Modernize legacy documents elegantly translating deep tags seamlessly generating fluid JSON payload responses intuitively safely offline instantly executing accurate structural logic globally safely.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-blue-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Code2 className="w-6 h-6 text-blue-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Legacy Extraction</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Refactor legacy environments seamlessly generating arrays completely natively modernizing output completely bypassing slow integration mappings safely bridging standard components securely.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Braces className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Schema Formatter</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Export valid payload blocks accurately defining arrays thoroughly completely cleanly handling raw components correctly building structured responses efficiently dynamically reliably safely.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Private Sandbox</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Transform configurations purely safely avoiding exposed network pipelines directly locally inside offline execution layers protecting sensitive metrics inherently completely thoroughly locally natively.
               </p>
            </div>
         </div>

         {/* FAQ Section */}
         <div className="space-y-12 border-t border-border/50 pt-24">
            <div className="text-center space-y-4">
               <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
                  Frequently Asked Questions
               </h2>
               <p className="text-muted-foreground">Detailed insights into strict markup transpilation securely.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
               {faqSchema.mainEntity.map((faq, i) => (
                  <div key={i} className="space-y-3">
                     <h3 className="font-bold text-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        {faq.name}
                     </h3>
                     <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-blue-500/20">
                        {faq.acceptedAnswer.text}
                     </p>
                  </div>
               ))}
               <div className="space-y-3">
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                     Is my input data saved?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-blue-500/20">
                     To improve your experience, your input data is saved locally in your browser using localStorage. This is entirely client-side, meaning your data never leaves your device. You can opt-out of this behavior at any time by disabling the 'Persist Data' switch in the tool settings.
                  </p>
               </div>
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-blue-600 rounded-3xl p-12 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <h2 className="text-3xl font-bold text-white relative z-10 mb-4">Launch Structure Parsing</h2>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Generate" />
            </div>
         </div>
      </article>
   );
}
