import { FileDiff, Zap, Cpu, Layers, Split, Sparkles } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

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
               <FileDiff className="w-3.5 h-3.5" />
               Text Comparison
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Instant & Secure <span className="text-indigo-500">Text Diff</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Compare code, documents, and configuration files with pixel-perfect precision. Powered by
               high-performance diffing algorithms that run entirely in your browser.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Split className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Split & Unified View</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Toggle between side-by-side comparison for desktop and inline unified view for mobile. Both modes
                  highlight changes with precision.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Semantic Engine</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Our diff engine understands the structure of your text to find the most meaningful changes, not just
                  raw character differences.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Multi-level Granularity</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Character-level granularity for typos, word-level matching for phrasing edits, and smart line matching
                  for large blocks.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Built for Developers</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Whether you are reviewing code changes, comparing configuration files, or checking document revisions,
                  our diff tool has you covered.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Layers,
                        title: 'Whitespace Normalization',
                        desc: 'Option to ignore whitespace changes for cleaner comparisons.',
                     },
                     {
                        icon: FileDiff,
                        title: 'Copy-Paste Workflow',
                        desc: 'The fastest way to compare: just paste text into both panels.',
                     },
                     {
                        icon: Split,
                        title: 'Responsive Layout',
                        desc: 'Automatically switches between split and unified based on your screen.',
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
                     Use the diff tool to compare <strong>.env files</strong> or <strong>API responses</strong> safely.
                     Since everything is client-side, your secrets never leave your machine.
                  </p>
                  <p>
                     The tool is <strong>language-agnostic</strong> — it works perfectly for TypeScript, Python, SQL,
                     YAML, Markdown, and any other text format.
                  </p>
               </div>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
               How to Compare Text & Code
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     1
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Populate Comparison Panels</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Paste your original text in the left panel and the modified version on the right. The engine
                        immediately begins drafting the delta tree for visual analysis.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     2
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Select View Orientation</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Choose "Split View" to see changes side-by-side, or "Unified View" to see additions and
                        deletions interleaved in a single continuous column.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     3
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Set Comparison Granularity</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Adjust the sensitivity to focus on character-level typos or line-level structural shifts. Toggle
                        "Ignore Whitespace" to filter out indentation changes in code.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     4
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Audit Semantic Highlights</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Identified deletions are highlighted in <span className="text-rose-400">red</span>, while
                        additions appear in <span className="text-emerald-400">green</span>. Darker shading indicates
                        specific modified characters within a word.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     5
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Clear and Reset</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Use the "Clear" button to wipe both editors for a fresh comparison. Since data is processed 100%
                        locally, your proprietary snippets remain confidential.
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
               <p className="text-muted-foreground">Everything you need to know about our Text Diff tool.</p>
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
            <h2 className="text-3xl font-bold text-white relative z-10">Track every revision with confidence</h2>
            <p className="text-indigo-100 max-w-xl mx-auto relative z-10">
               Start comparing text instantly. No sign-up, no data limits, total privacy.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Start Comparing" />
            </div>
         </div>
      </article>
   );
}
