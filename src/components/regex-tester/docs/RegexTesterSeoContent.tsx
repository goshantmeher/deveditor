import { ShieldCheck, Zap, Cpu, Bug, Layers, Sparkles } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

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
               <Bug className="w-3.5 h-3.5" />
               Pattern Engineering
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Safe & Powerful <span className="text-indigo-500">Regex Tester</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               The most secure environment to build, test, and debug regular expressions. Protected by background worker
               execution to prevent browser freezes.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Safe Execution</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Offloads matching to a Web Worker. Say goodbye to tab freezes caused by Catastrophic Backtracking.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Live Highlighting</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Instant visual feedback on capture groups, indices, and overlapping matches as you type your pattern.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Native Engine</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Uses your browser&apos;s native ECMAScript engine for perfect compatibility with your frontend code.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Advanced Syntax Support</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Modern JavaScript regex is more powerful than ever. Our tester supports every flag and new feature in
                  the ECMAScript spec.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Layers,
                        title: 'Named Capture Groups',
                        desc: 'Use (?<name>...) for cleaner, self-documenting regex patterns.',
                     },
                     {
                        icon: Bug,
                        title: 'Lookbehind & Lookahead',
                        desc: 'Full support for positive and negative lookaround assertions.',
                     },
                     {
                        icon: Cpu,
                        title: 'Unicode & DotAll Flags',
                        desc: 'Supports u, s, d flags for Unicode properties and full-dot matching.',
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
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Pro Tip</span>
               </div>
               <div className="prose prose-invert prose-sm">
                  <p>
                     If your regex takes too long, the <strong>Web Worker</strong> automatically kills it after{' '}
                     <code className="text-indigo-400">2 seconds</code> and shows a{' '}
                     <strong>Catastrophic Backtracking</strong> warning. This keeps your browser responsive.
                  </p>
                  <p>
                     Use the built-in <strong>Cheat Sheet</strong> and <strong>Pattern Library</strong> to quickly find
                     common patterns like emails, URLs, and phone numbers.
                  </p>
               </div>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
               How to Build & Test Regular Expressions
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     1
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Enter Your Test String</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Paste the text you want to search against into the "Test String" area. This could be a chunk of
                        logs, HTML source code, or a simple list of email addresses.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     2
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Draft Your Regex Pattern</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Type your regular expression into the pattern input. The tool uses a background Web Worker to
                        evaluate matches instantly without freezing the main UI thread.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     3
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Configure Flags & Engines</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Toggle standard flags like Global (g), Case-Insensitive (i), and Multiline (m). The
                        browser-native engine will apply these rules to provide 1:1 matching accuracy for your code.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     4
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Inspect Captured Groups</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Review the highlighted matches in your test string. Check the "Matches" panel to see a detailed
                        breakdown of indices, full matches, and specific named capture groups.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     5
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Copy Your Pattern</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Once your logic is sound, click the "Copy" icon on the pattern bar. Your regex is now validated
                        and ready to be integrated into your application's validation logic or search routines.
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
               <p className="text-muted-foreground">Everything you need to know about our Regex Tester.</p>
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
         <div className="bg-indigo-600 rounded-3xl p-12 text-center space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <h2 className="text-3xl font-bold text-white relative z-10">Master the art of pattern matching</h2>
            <p className="text-indigo-100 max-w-xl mx-auto relative z-10">
               Start building, testing, and debugging regex patterns safely. No login, no data limits.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Start Testing" />
            </div>
         </div>
      </article>
   );
}
