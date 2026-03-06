import React from 'react';
import { FileDiff, Zap, Cpu, Layers, Split } from 'lucide-react';

export function TextDiffSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'How does the text diff tool work?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'It uses a semantic difference algorithm to compare two blocks of text. It identifies character-level, word-level, and line-level changes, highlighting additions in green and deletions in red.',
            },
         },
         {
            '@type': 'Question',
            name: 'Split vs Unified view?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Split view shows the original and modified text side-by-side. Unified view merges them into a single column, showing changes inline—ideal for mobile screens.',
            },
         },
         {
            '@type': 'Question',
            name: 'Is it safe for code snippets?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes. All comparison logic happens locally in your browser. No text or code is ever uploaded to our servers, keeping your proprietary data secure.',
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
               Instant & Secure Text Comparison
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
               Compare code, documents, and configuration files with pixel-perfect precision. Powered by
               high-performance diffing algorithms that run entirely in your browser.
            </p>
         </section>

         {/* View Modes Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card p-8 rounded-3xl border border-border/50 space-y-6 transition-all hover:border-indigo-500/30 group">
               <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                  <Split className="w-6 h-6" />
               </div>
               <div className="space-y-3">
                  <h3 className="text-xl font-bold">Side-by-Side (Split)</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     The classic developer view. Perfect for desktop screens, allowing you to see original and modified
                     versions in parallel for easy visual tracking.
                  </p>
               </div>
               <div className="pt-4 flex gap-2">
                  <div className="h-1 w-full bg-red-500/10 rounded-full overflow-hidden">
                     <div className="h-full w-1/3 bg-red-500/50" />
                  </div>
                  <div className="h-1 w-full bg-emerald-500/10 rounded-full overflow-hidden">
                     <div className="h-full w-2/3 bg-emerald-500/50" />
                  </div>
               </div>
            </div>

            <div className="bg-card p-8 rounded-3xl border border-border/50 space-y-6 transition-all hover:border-sky-500/30 group">
               <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-500 group-hover:scale-110 transition-transform">
                  <Layers className="w-6 h-6" />
               </div>
               <div className="space-y-3">
                  <h3 className="text-xl font-bold">Inline (Unified)</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     A streamlined, vertical layout that interleaves changes. Optimized for mobile devices and reviewing
                     long sentences efficiently.
                  </p>
               </div>
               <div className="pt-4 space-y-1">
                  <div className="h-1 w-full bg-red-500/10 rounded-full overflow-hidden">
                     <div className="h-full w-1/2 bg-red-500/50" />
                  </div>
                  <div className="h-1 w-full bg-emerald-500/10 rounded-full overflow-hidden">
                     <div className="h-full w-3/4 bg-emerald-500/50" />
                  </div>
               </div>
            </div>
         </div>

         {/* Main Content Deep Dive */}
         <div className="space-y-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="space-y-6">
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                     <Cpu className="w-6 h-6 text-indigo-500" />
                     Semantic Diff Engine
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                     We use optimized diffing algorithms that don&apos;t just look at characters, but understand the
                     structure of your text to find the most meaningful changes.
                  </p>
                  <ul className="space-y-3">
                     {[
                        'Character-level granularity for typos',
                        'Word-level matching for phrasing edits',
                        'Smart line matching for large code blocks',
                        'Automatic whitespace normalization',
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
                     <FileDiff className="w-24 h-24 text-indigo-500/10 group-hover:scale-110 transition-transform duration-500" />
                     <div className="absolute inset-0 bg-linear-to-tr from-indigo-500/5 to-transparent pointer-events-none" />
                  </div>
               </div>
            </div>
         </div>

         {/* FAQ/Guide Section */}
         <section className="bg-muted/20 border border-border/30 rounded-3xl p-8 md:p-12 space-y-8">
            <h3 className="text-2xl font-bold text-center">Frequently Asked Questions</h3>
            <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-3">
                  <h4 className="font-bold">What is high-level diffing?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     It means the tool can distinguish between a small character change (like a typo) and a major block
                     deletion, adjusting the visualization accordingly.
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="font-bold">Can I compare binary files?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     Currently, this tool is optimized for text-based formats (code, JSON, logs, prose). It does not
                     support comparing binary files like PDFs or JPEGs directly.
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="font-bold">Privacy for environment variables?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     Yes. Since the logic is client-side, you can safely compare .env files or private keys without them
                     ever reaching a server.
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="font-bold">Supported Languages?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     Our diff engine is language-agnostic. It works perfectly for TypeScript, Python, HTML, Markdown,
                     and any other human-readable text format.
                  </p>
               </div>
            </div>
         </section>

         {/* Bottom CTA */}
         <div className="text-center space-y-6 pt-12">
            <h3 className="text-xl font-bold italic text-muted-foreground/60 tracking-wider uppercase">
               Track every revision with confidence
            </h3>
            <div className="h-1 w-24 bg-linear-to-r from-transparent via-indigo-500/50 to-transparent mx-auto" />
         </div>
      </div>
   );
}
