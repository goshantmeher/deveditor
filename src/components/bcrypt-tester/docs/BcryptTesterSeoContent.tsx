import { ShieldAlert, Zap, Lock, Fingerprint } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function BcryptTesterSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'What is Bcrypt?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Bcrypt is a robust, one-way password hashing function based on the Blowfish cipher. Given a salt and a cost factor, it intentionally slows down computation to protect passwords from brute-force and rainbow table attacks.',
            },
         },
         {
            '@type': 'Question',
            name: 'What does Cost Factor or Rounds mean?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'The "Cost Factor" is a fundamental feature of Bcrypt that defines the number of iterations inside the algorithm (represented as 2^n). A cost factor of 10 means 1,024 iterations. An increase by 1 doubles the time it takes to compute a hash, preventing GPU and hardware-forced mass decrypting efforts over time.',
            },
         },
         {
            '@type': 'Question',
            name: 'Is this checker fully client-side?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes! The entire Bcrypt generation and verification algorithm executes inside your browser using the WASM-based or equivalent js bcrypt package. No data is sent across the wire.',
            },
         },
      ],
   };

   return (
      <article className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

         {/* Hero Section */}
         <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-wider">
               <ShieldAlert className="w-3.5 h-3.5" />
               Password Security
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Bcrypt Hash <span className="text-orange-500">Tester</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Securely verify plaintext passwords against generated bcrypt hashes directly in your browser without exposing your data over the web.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-orange-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Fingerprint className="w-6 h-6 text-orange-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Zero Exposure</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Everything happens client-side securely. Never put critical master database passwords into sketchy ad-ridden tools. Our environment guarantees pure JS verification.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Lock className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Integrated Salt</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Bcrypt cleverly incorporates the salt directly into the resulting hash output string, which means you don't need a separate field to test valid matches.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Generate on the Fly</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Scale the cost rounds parameter smoothly from 4 to 31 inside the Generator tab to instantly mimic whatever hashing algorithm profile matches your stack.
               </p>
            </div>
         </div>

         {/* FAQ Section */}
         <div className="space-y-12 border-t border-border/50 pt-24">
            <div className="text-center space-y-4">
               <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
                  Frequently Asked Questions
               </h2>
               <p className="text-muted-foreground">Detailed logic surrounding Cryptanalysis and Bcrypt hashes.</p>
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
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-orange-600 rounded-3xl p-12 text-center space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <h2 className="text-3xl font-bold text-white relative z-10">Verify Secrets Faster</h2>
            <p className="text-orange-100 max-w-xl mx-auto relative z-10">
               Test your plaintext credentials against bcrypt hashes to debug authentication failures instantly. Start testing up above.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Test" />
            </div>
         </div>
      </article>
   );
}
