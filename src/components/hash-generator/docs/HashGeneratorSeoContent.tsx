import { Shield, Fingerprint, Lock, Cpu, Server, Hash } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function HashGeneratorSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'Are my hashes sent to an external server?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'No. All hashing operations (MD5, SHA-1, SHA-256, SHA-512) are fully performed locally inside your browser using the Web Crypto API. Your text is never sent or stored over the network.',
            },
         },
         {
            '@type': 'Question',
            name: 'Why should I use SHA-256 over MD5?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'MD5 and SHA-1 are considered cryptographically broken since they are vulnerable to collision attacks (where two different inputs produce the same hash). You should use SHA-256 or SHA-512 for cryptographic security, while MD5 is mostly used for basic checksum validation.',
            },
         },
         {
            '@type': 'Question',
            name: 'Is it possible to decode a hash back into text?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'No, hashing is a one-way mathematical function. You cannot "decrypt" a hash back to its original text. The only way to reverse a hash is through brute-force guessing or using precomputed rainbow tables.',
            },
         },
      ],
   };

   return (
      <article className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

         {/* Hero Section */}
         <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-wider">
               <Shield className="w-3.5 h-3.5" />
               Security Utilities
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Hash <span className="text-rose-500">Generator</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Securely compute cryptographic hashes of your data directly in the browser. Generate MD5, SHA-1, SHA-256,
               and SHA-512 simultaneously.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-rose-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6 text-rose-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Web Crypto API</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Leverages the high-performance native browser cryptographic APIs to digest text with blazing fast,
                  secure algorithms.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Fingerprint className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Parallel Hashing</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Get MD5, SHA-1, SHA-256, and SHA-512 hashes all rendered simultaneously with a single keystroke.
                  Compare outputs efficiently side-by-side.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Lock className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Zero Exposure</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  100% Client-side. We cannot read, track, or save any string you run through our generator, ensuring
                  your sensitive data remains yours.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  Identify text with mathematical certainty
               </h2>
               <p className="text-muted-foreground leading-relaxed">
                  Hashing is the practice of converting an input of any length into a fixed-size string of text. Hashes
                  are essential for validating file integrity, storing passwords safely, and building lookup tables.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Hash,
                        title: 'MD5 (Message-Digest Algorithm 5)',
                        desc: 'Produces a 128-bit hash. Extremely fast but vulnerable to collisions. Recommended only for basic checksums.',
                     },
                     {
                        icon: Shield,
                        title: 'SHA-1 (Secure Hash Algorithm 1)',
                        desc: 'Produces a 160-bit hash. Used historically in Git and SSL, but also considered cryptographically broken.',
                     },
                     {
                        icon: Server,
                        title: 'SHA-256 / SHA-512',
                        desc: 'The gold standard for modern cryptographic security. Provides 256-bit and 512-bit collision-resistant hashes.',
                     },
                  ].map((item, i) => (
                     <li key={i} className="flex gap-4">
                        <div className="mt-1">
                           <item.icon className="w-5 h-5 text-rose-500" />
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
                  <Lock className="w-4 h-4 text-rose-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                     The Avalanche Effect
                  </span>
               </div>
               <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                  A strong cryptographic hash function drastically changes its output if even a single bit of the input
                  is altered.
               </p>
               <div className="space-y-4 font-mono text-sm break-all">
                  <div className="bg-background rounded p-4 border border-border">
                     <div className="text-xs text-muted-foreground mb-1 uppercase tracking-widest">
                        Input: Hello World
                     </div>
                     <div className="text-rose-400 font-bold text-xs">a591a6d40bf420404a011733cfb7b190d62c6...</div>
                  </div>
                  <div className="bg-background rounded p-4 border border-border">
                     <div className="text-xs text-muted-foreground mb-1 uppercase tracking-widest">
                        Input: hello World
                     </div>
                     <div className="text-indigo-400 font-bold text-xs">2247f1c1fce771f845d0af9fe3ad45b2bbcd4...</div>
                  </div>
               </div>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
               How to Generate Cryptographic Hashes
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold font-mono shrink-0">
                     1
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Enter Your Input String</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Type or paste the text you want to hash into the main input field. As you type, the utility will
                        begin computing all hash algorithms simultaneously in your browser.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold font-mono shrink-0">
                     2
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Compare Algorithm Outputs</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Review the MD5, SHA-1, SHA-256, and SHA-512 outputs rendered in side-by-side cards. This helps
                        you identify the different lengths and formats for each fingerprinting method.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold font-mono shrink-0">
                     3
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Verify Hexadecimal Integrity</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Each result displays the full hex-encoded string. Click on the code block to expand it if the
                        string is truncated, ensuring you have the complete hash for validation.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold font-mono shrink-0">
                     4
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Observe Input Sensitivity</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Notice how even a single character change (like changing a capital letter to lowercase)
                        completely transforms the entire hash, confirming the "Avalanche Effect" of secure hashing.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold font-mono shrink-0">
                     5
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Copy Your Preferred Hash</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Click the "Copy" icon next to your desired hash (e.g., SHA-256 for high security). Your
                        fingerprint is now ready to be used in checksum files, database records, or API configs.
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
               <p className="text-muted-foreground">Learn more about hashing algorithms and their best use-cases.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
               {faqSchema.mainEntity.map((faq, i) => (
                  <div key={i} className="space-y-3">
                     <h3 className="font-bold text-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        {faq.name}
                     </h3>
                     <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-rose-500/20">
                        {faq.acceptedAnswer.text}
                     </p>
                  </div>
               ))}
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-rose-600 rounded-3xl p-12 text-center space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <h2 className="text-3xl font-bold text-white relative z-10">Generate Secure Hashes</h2>
            <p className="text-rose-100 max-w-xl mx-auto relative z-10">
               Verify data integrity and secure your passwords with lightning-fast cryptographic hashing. Start typing
               at the top to compute.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Compute" />
            </div>
         </div>
      </article>
   );
}
