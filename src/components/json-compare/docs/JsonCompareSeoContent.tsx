import { Code, ShieldCheck, Braces, Wand2 } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function JsonCompareSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'Is my JSON payload submitted to a server?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'No. Every byte of JSON data is evaluated, repaired, and diffed exclusively inside your browser running purely on local client-side JavaScript. This makes it completely private and perfectly safe for sensitive environments.',
            },
         },
         {
            '@type': 'Question',
            name: 'Why do formatted JSON files show zero differences?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Our underlying engine strictly formats both JSON strings canonically before pushing them through the Diff engine. It implicitly automatically sorts object keys alphabetically and removes structural whitespace discrepancies, ensuring you only see actual data or value changes, not syntax styling differences.',
            },
         },
         {
            '@type': 'Question',
            name: 'What if my JSON has syntax errors?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'DevEditor bundles an advanced auto-reparative JSON engine that attempts to fix trailing commas, missing quotes, single quotes, and stripped brackets natively before executing the diff comparison natively on the valid output.',
            },
         },
      ],
   };

   return (
      <article className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

         {/* Hero Section */}
         <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
               <Braces className="w-3.5 h-3.5" />
               Logic Debugger
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               JSON <span className="text-orange-500">Compare & Diff</span> 
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Securely analyze deeply nested structural differences between two JSON payloads right in your browser. Features automatic key sorting, canonical formatting, and robust error recovery.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-orange-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Code className="w-6 h-6 text-orange-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Semantic Comparisons</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Keys are automatically sorted inside nested objects before the diff runs. Focus purely on changed data rather than random hash key re-ordering from APIs.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Wand2 className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Auto-Repairing Input</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Broken chunks of JSON dumped from system log files? Missing brackets? Trailing commas? Our parser heals broken payload inputs seamlessly.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Extremely Private</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Engineered exclusively for sensitive API keys and PII debugging. Local memory handles the semantic DiffMatchPatch rendering directly on your hardware.
               </p>
            </div>
         </div>

         {/* FAQ Section */}
         <div className="space-y-12 border-t border-border/50 pt-24">
            <div className="text-center space-y-4">
               <h2 className="text-3xl font-bold tracking-tight text-foreground text-center"> Frequently Asked Questions </h2>
               <p className="text-muted-foreground text-center">Important notes regarding standard logic configurations.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
               {faqSchema.mainEntity.map((faq, i) => (
                  <div key={i} className="space-y-3">
                     <h3 className="font-bold text-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        {faq.name}
                     </h3>
                     <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-orange-500/20">
                        {faq.acceptedAnswer.text}
                     </p>
                  </div>
               ))}
               <div className="space-y-3">
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                     Are my editors saved when I leave?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-orange-500/20">
                     By default, yes. DevEditor locally caches your text states directly inside native browser storage seamlessly. At any time, this behavior can be toggled via the sitewide properties.
                  </p>
               </div>
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-orange-600 rounded-3xl p-12 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <div className="relative z-10 space-y-6">
               <h2 className="text-3xl font-bold text-white mb-4">Compare Objects Securely</h2>
               <div className="pt-4">
                  <ScrollToTopButton label="Scroll up to Start Formatter" />
               </div>
            </div>
         </div>
      </article>
   );
}
