import React from 'react';
import { ShieldCheck, Zap, Cpu, Bug, Layers } from 'lucide-react';

export function RegexTesterSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'What makes this Regex Tester different?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Our tester uses a dedicated Web Worker to execute patterns. This prevents "Catastrophic Backtracking" from freezing your browser, and automatically terminates long-running matches after 2 seconds.',
            },
         },
         {
            '@type': 'Question',
            name: 'Which regex engine does it use?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'It uses the native JavaScript RegExp engine of your browser, supporting modern features like named capture groups, lookbehind assertions, and unicode property escapes.',
            },
         },
         {
            '@type': 'Question',
            name: 'Is my data secure?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes. All pattern matching is performed entirely client-side. Your test data and regex strings never leave your machine.',
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
               High-Performance & Safe Regex Engineering
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
               The most secure environment to build, test, and debug regular expressions. Protected by background worker
               execution to prevent browser freezes.
            </p>
         </section>

         {/* Features Grid */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-2xl border border-border/50 space-y-4 transition-all hover:border-indigo-500/30">
               <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500">
                  <ShieldCheck className="w-5 h-5" />
               </div>
               <h3 className="text-lg font-bold">Safe Execution</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">
                  Offloads matching to a Web Worker. Say goodbye to tab freezes caused by Catastrophic Backtracking.
               </p>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border/50 space-y-4 transition-all hover:border-sky-500/30">
               <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-500">
                  <Zap className="w-5 h-5" />
               </div>
               <h3 className="text-lg font-bold">Live Highlighting</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">
                  Instant visual feedback on capture groups, indices, and overlapping matches as you type your pattern.
               </p>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border/50 space-y-4 transition-all hover:border-emerald-500/30">
               <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                  <Cpu className="w-5 h-5" />
               </div>
               <h3 className="text-lg font-bold">Native Engine</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">
                  Uses your browser&apos;s native ECMAScript engine for perfect compatibility with your frontend code.
               </p>
            </div>
         </div>

         {/* Main Content Deep Dive */}
         <div className="space-y-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="space-y-6">
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                     <Layers className="w-6 h-6 text-indigo-500" />
                     Advanced Syntax Support
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                     Modern JavaScript regex is more powerful than ever. Our tester supports every flag and new feature
                     in the ECMAScript spec.
                  </p>
                  <ul className="space-y-3">
                     {[
                        'Named capture groups for cleaner code',
                        'Lookbehind and lookahead assertions',
                        'Unicode (u) and DotAll (s) flag support',
                        "Precise index tracing with the 'd' flag",
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
                     <Bug className="w-24 h-24 text-indigo-500/10 group-hover:scale-110 transition-transform duration-500" />
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
                  <h4 className="font-bold">What is Catastrophic Backtracking?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     Certain regex patterns can take exponential time to fail on certain strings. This tool detects
                     those scenarios and kills the worker process automatically.
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="font-bold">What are capture groups?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     Capture groups (defined with parentheses) allow you to extract specific parts of a match. We
                     highlight each group with a different color for easy debugging.
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="font-bold">Supported Flags?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     We support Global (g), Case-Insensitive (i), Multiline (m), DotAll (s), Unicode (u), Indices (d),
                     and Sticky (y) flags.
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="font-bold">Is it privacy-safe?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     Yes. Just like our other tools, the regex matching happens in your browser. No server ever sees the
                     data or patterns you are testing.
                  </p>
               </div>
            </div>
         </section>

         {/* Bottom CTA */}
         <div className="text-center space-y-6 pt-12">
            <h3 className="text-xl font-bold italic text-muted-foreground/60 tracking-wider uppercase">
               Master the art of pattern matching
            </h3>
            <div className="h-1 w-24 bg-linear-to-r from-transparent via-indigo-500/50 to-transparent mx-auto" />
         </div>
      </div>
   );
}
