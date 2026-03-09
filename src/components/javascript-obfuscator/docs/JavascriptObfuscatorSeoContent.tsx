import { ShieldAlert, CopyCheck, Code2, AlertTriangle } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function JavascriptObfuscatorSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'Is the JavaScript Obfuscator secure?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes! The obfuscation process happens entirely within your web browser offline mapping the raw javascript parsing engine utilizing Web Workers securely. No code you write is transmitted back to our servers, keeping your proprietary loops entirely private.',
            },
         },
         {
            '@type': 'Question',
            name: 'What does Control Flow Flattening do?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Control flow flattening transforms the chronological structure of your program into a massive state machine via one large switch statement. This effectively prevents automated decompilers from mapping logical executions successfully.',
            },
         },
         {
            '@type': 'Question',
            name: 'Will my code break after obfuscation?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'While the syntax changes violently, the actual runtime output functions identically to the original input. However, using powerful features like Control Flow Flattening or String Encryptions does heavily impact execution speed in heavily nested rendering code loops like gaming loops.',
            },
         },
      ],
   };

   return (
      <article className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

         {/* Hero Section */}
         <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-wider">
               <ShieldAlert className="w-3.5 h-3.5" />
               Source Protection
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               JavaScript <span className="text-red-500">Obfuscator</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Protect your proprietary intellectual property effortlessly client-side. Convert readable JS logic into extremely difficult, highly confusing obfuscated variants rapidly.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-red-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Code2 className="w-6 h-6 text-red-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Anti-Decompilation Logic</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Generate code drastically harder to read, debug, and trace mapping deeply integrated execution locks mapping specific domain targets avoiding logic scraping correctly.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-fuchsia-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <CopyCheck className="w-6 h-6 text-fuchsia-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Fully Dynamic Engine</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Fine tune specific protections such as array mapping RC4 encryptions dynamically directly into your browser previewer comparing output loops synchronously locally offline.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <AlertTriangle className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">String Manipulators</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Hardcoded secrets and API paths within literal javascript strings can be split aggressively into separate arrays preventing search algorithms tracing critical nodes efficiently.
               </p>
            </div>
         </div>

         {/* FAQ Section */}
         <div className="space-y-12 border-t border-border/50 pt-24">
            <div className="text-center space-y-4">
               <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
                  Frequently Asked Questions
               </h2>
               <p className="text-muted-foreground">General information evaluating encryption logic securely.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
               {faqSchema.mainEntity.map((faq, i) => (
                  <div key={i} className="space-y-3">
                     <h3 className="font-bold text-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        {faq.name}
                     </h3>
                     <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-red-500/20">
                        {faq.acceptedAnswer.text}
                     </p>
                  </div>
               ))}
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-red-600 rounded-3xl p-12 text-center space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <h2 className="text-3xl font-bold text-white relative z-10">Obfuscate Your Data</h2>
            <p className="text-red-100 max-w-xl mx-auto relative z-10">
               Ready to secure your logic workflows against prying scraper eyes permanently inside Javascript files? Paste the snippet below immediately!
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to the Action" />
            </div>
         </div>
      </article>
   );
}
