import { ShieldCheck, Fingerprint, Layers, Shuffle, ArrowDownUp, Zap } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function UuidGeneratorSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'What is a UUID?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'A universally unique identifier (UUID) is a 128-bit label used for information in computer systems. The term globally unique identifier (GUID) is an equivalent term used mostly by Microsoft.',
            },
         },
         {
            '@type': 'Question',
            name: 'What is a ULID?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'A Universally Unique Lexicographically Sortable Identifier (ULID) is a 128-bit identifier encoded as a 26-character string. Unlike UUIDs, ULIDs can be sorted alphabetically by their creation time.',
            },
         },
         {
            '@type': 'Question',
            name: 'Are these identifiers safe to use in my database?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes! Our UUIDs are generated using the Web Crypto API ensuring they are cryptographically secure v4 UUIDs avoiding any predictable Math.random() collisions. ULIDs are perfect for databases because their chronologically sortable prefix prevents B-tree indexing fragmentation.',
            },
         },
      ],
   };

   return (
      <article className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

         {/* Hero Section */}
         <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
               <Fingerprint className="w-3.5 h-3.5" />
               Identifier Tool
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               UUID & ULID <span className="text-cyan-500">Generator</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Instantly generate cryptographically secure bulk batch v4 UUIDs and sortable ULIDs powered entirely by your browser's Web Crypto API.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-cyan-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Layers className="w-6 h-6 text-cyan-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Bulk Generation</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Generate anywhere from 1 to 5,000 unique identifiers in a single millisecond batch. Easily duplicate massive amounts for fake database seeding.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-purple-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ArrowDownUp className="w-6 h-6 text-purple-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Sortable ULIDs</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Leverage Crockford's base32 encoding to create 26-character identifiers that natively alphabetize perfectly according to their creation time.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Cryptographically Secure</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Both UUIDs and the random portions of ULIDs utilize <code>crypto.getRandomValues()</code> protecting them from predictability and collision attacks.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Which identifier should you choose?</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Modern application architectures have largely moved away from auto-incrementing integer IDs due to distributed scaling complexity. 
                  Knowing exactly which identifier to pick for your database schema is paramount.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Shuffle,
                        title: 'UUID v4 (Version 4)',
                        desc: 'The industry standard. Represented as 32 hexadecimal digits. Fully random. Compatible with almost every database engine natively.',
                     },
                     {
                        icon: ArrowDownUp,
                        title: 'ULID (Lexicographically Sortable)',
                        desc: 'Uses a 48-bit timestamp combined with 80-bit randomness. Perfect for databases optimizing B-tree insertions or event-sourcing ledgers.',
                     },
                     {
                        icon: Zap,
                        title: 'URL Safe',
                        desc: 'ULIDs utilize a Crockfords Base32 scheme (excluding I, L, O, U) making them perfectly safe to embed inside URL parameters.',
                     },
                  ].map((item, i) => (
                     <li key={i} className="flex gap-4">
                        <div className="mt-1">
                           <item.icon className="w-5 h-5 text-cyan-500" />
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
               <div className="flex items-center gap-2 mb-6">
                  <Fingerprint className="w-4 h-4 text-cyan-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                     Architecture Comparison
                  </span>
               </div>
               <div className="space-y-6">
                  <div className="bg-background rounded-lg border border-border overflow-hidden">
                     <div className="bg-muted px-4 py-2 border-b border-border flex justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">UUID v4 Breakdown</span>
                        <span className="text-xs text-muted-foreground">36 chars (with hyphens)</span>
                     </div>
                     <div className="p-4 flex gap-1 font-mono text-sm break-all font-bold">
                        <span className="text-emerald-500" title="Random bytes">181211b4</span>
                        <span className="text-muted-foreground">-</span>
                        <span className="text-emerald-500" title="Random bytes">2bb7</span>
                        <span className="text-muted-foreground">-</span>
                        <span className="text-blue-500" title="Version 4 UUID identifier">44eb</span>
                        <span className="text-muted-foreground">-</span>
                        <span className="text-rose-500" title="Variant bits + random">8165</span>
                        <span className="text-muted-foreground">-</span>
                        <span className="text-emerald-500" title="Random bytes">36eb100c5cff</span>
                     </div>
                  </div>

                  <div className="bg-background rounded-lg border border-border overflow-hidden">
                     <div className="bg-muted px-4 py-2 border-b border-border flex justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">ULID Breakdown</span>
                        <span className="text-xs text-muted-foreground">26 chars (Base32)</span>
                     </div>
                     <div className="p-4 flex gap-0 font-mono text-sm break-all font-bold">
                        <span className="text-amber-500" title="48-bit Timestamp">01ARZ3NDEK</span>
                        <span className="text-indigo-500" title="80-bit Randomness">TSV4RRFFQ69G5FAV</span>
                     </div>
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
               <p className="text-muted-foreground">Answers to common identifier and engineering questions.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
               {faqSchema.mainEntity.map((faq, i) => (
                  <div key={i} className="space-y-3">
                     <h3 className="font-bold text-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                        {faq.name}
                     </h3>
                     <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-cyan-500/20">
                        {faq.acceptedAnswer.text}
                     </p>
                  </div>
               ))}
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-cyan-600 rounded-3xl p-12 text-center space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <h2 className="text-3xl font-bold text-white relative z-10">Generate IDs for your Next Project</h2>
            <p className="text-cyan-100 max-w-xl mx-auto relative z-10">
               Grab a fresh, globally unique identifier straight from your browser. Bulk process 100s for test payloads immediately.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Generate" />
            </div>
         </div>
      </article>
   );
}
