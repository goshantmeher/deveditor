import { List, Zap, ShieldCheck, Code, Hash, Sparkles } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function ListConverterSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'Which output formats are supported?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'We support JSON arrays, SQL IN() clauses, Python lists, PHP arrays, Go slices, Ruby arrays, Java arrays, CSV, TSV, Markdown lists, and HTML unordered lists. Plus utility transforms like deduplication and sorting.',
            },
         },
         {
            '@type': 'Question',
            name: 'How does auto-detection work?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'The tool automatically detects the delimiter in your input. It checks for newlines first, then commas, tabs, and pipe characters. You can also manually override the delimiter.',
            },
         },
         {
            '@type': 'Question',
            name: 'Is my data sent to a server?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'No. All parsing and conversion happens entirely in your browser. Your data never leaves your machine.',
            },
         },
         {
            '@type': 'Question',
            name: 'Can I remove duplicate items?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes. Select the "Deduplicate" transform to remove duplicate values from your list. The tool also shows a live count of duplicates detected in your input.',
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
               <List className="w-3.5 h-3.5" />
               Data Transformation
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               List & Array <span className="text-indigo-500">Converter</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Paste a column of values, a CSV row, or any delimited text and transform it into JSON arrays, SQL
               clauses, Python lists, and more. Runs entirely in your browser.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Code className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">18+ Output Formats</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  JSON arrays, SQL IN() clauses, Python lists, Go slices, PHP arrays, CSV, Markdown lists, and more —
                  all from a single input.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Smart Detection</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Automatically detects your delimiter — newlines, commas, tabs, or pipes. No configuration needed.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Built-in Transforms</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Deduplicate, sort, reverse, or trim your list. Chain transforms by swapping output back to input.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Code-Ready Output</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Every format is generated with correct escaping and syntax — ready to paste directly into your
                  codebase.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Hash,
                        title: 'Live Item Count',
                        desc: 'See how many items are parsed and how many duplicates exist in real-time.',
                     },
                     {
                        icon: Code,
                        title: 'Proper Escaping',
                        desc: 'SQL strings escape single quotes, JSON handles special chars, Go uses double quotes.',
                     },
                     {
                        icon: List,
                        title: 'Swap & Chain',
                        desc: 'Pipe output back to input to chain operations like sort → deduplicate.',
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
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                     Quick Reference
                  </span>
               </div>
               <div className="space-y-3 font-mono text-sm">
                  {[
                     { label: 'JSON', example: '["a", "b", "c"]' },
                     { label: 'SQL IN', example: "('a', 'b', 'c')" },
                     { label: 'Python', example: "['a', 'b', 'c']" },
                     { label: 'Go', example: '[]string{"a", "b"}' },
                     { label: 'CSV', example: 'a, b, c' },
                  ].map((item, i) => (
                     <div key={i} className="flex items-center gap-3 text-muted-foreground">
                        <span className="text-xs w-16 text-indigo-400 font-bold">{item.label}</span>
                        <span className="text-foreground">{item.example}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
               How to Convert Lists & Arrays
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     1
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Paste Your Input Items</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Paste your raw list into the source editor. It can be a column of text, comma-separated values,
                        or items separated by tabs/pipes. The tool will auto-detect the delimiter.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     2
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Select Target Language or Format</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Choose from over 18 output formats in the sidebar, including JSON arrays, SQL clauses, Python
                        lists, or Markdown bullet points. Each format is strictly typed and escaped correctly.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     3
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Apply List Transformations</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Clean up your data by toggling the "Deduplicate" or "Sort" settings. You can also specify custom
                        quoting (Single vs Double) and indentation styles for code-ready output.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     4
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Verify against Item Count</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Check the live item counter at the top of the interface. This helps you confirm that all
                        expected records have been parsed correctly and identifies if any duplicates were removed.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     5
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Copy Your Formatted Array</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Click the "Copy" icon on the output panel. Your list is now a production-ready code structure
                        that you can paste directly into your scripts or database queries.
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
               <p className="text-muted-foreground">Everything you need to know about our List Converter.</p>
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
            <h2 className="text-3xl font-bold text-white relative z-10">
               Transform any list into production-ready code
            </h2>
            <p className="text-indigo-100 max-w-xl mx-auto relative z-10">
               Start converting lists to JSON, SQL, Python, and more. No login, no data limits.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Start Converting" />
            </div>
         </div>
      </article>
   );
}
