import React from 'react';
import { List, Zap, Code, Shield } from 'lucide-react';

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
               Convert Lists Into Any Format Instantly
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
               Paste a column of values, a CSV row, or any delimited text and transform it into JSON arrays, SQL
               clauses, Python lists, and more. Runs entirely in your browser.
            </p>
         </section>

         {/* Format Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
               {
                  name: 'JSON Array',
                  example: '["apple", "banana", "cherry"]',
                  use: 'APIs / Config / JavaScript',
               },
               { name: 'SQL IN()', example: "('apple', 'banana', 'cherry')", use: 'Database Queries' },
               {
                  name: 'Python List',
                  example: "['apple', 'banana', 'cherry']",
                  use: 'Python Scripts',
               },
               {
                  name: 'Go Slice',
                  example: '[]string{"apple", "banana"}',
                  use: 'Go Programs',
               },
               { name: 'CSV', example: 'apple, banana, cherry', use: 'Spreadsheets / Data' },
               { name: 'Markdown List', example: '- apple\\n- banana', use: 'Documentation' },
            ].map((item, i) => (
               <div
                  key={i}
                  className="bg-card p-5 rounded-2xl border border-border/50 space-y-3 group hover:border-emerald-500/30 transition-all"
               >
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500/70">
                        {item.name}
                     </span>
                     <Code className="w-3 h-3 text-emerald-500/20 group-hover:text-emerald-500/50" />
                  </div>
                  <code className="block text-sm font-mono bg-muted/30 p-2 rounded-lg border border-border/20 truncate">
                     {item.example}
                  </code>
                  <p className="text-[10px] text-muted-foreground italic">{item.use}</p>
               </div>
            ))}
         </div>

         {/* Main Content Deep Dive */}
         <div className="space-y-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="space-y-6">
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                     <Shield className="w-6 h-6 text-emerald-500" />
                     Smart Delimiter Detection
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                     Our parser automatically detects your delimiter — whether it is newlines, commas, tabs, or pipes.
                     No need to configure anything. Just paste and convert.
                  </p>
                  <ul className="space-y-3">
                     {[
                        'Auto-detects newlines, commas, tabs, and pipes',
                        'Manual override for edge cases',
                        'Shows live item count and duplicate detection',
                        'Swap output back to input for chained transforms',
                     ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                           <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
                           <span>{item}</span>
                        </li>
                     ))}
                  </ul>
               </div>
               <div className="bg-muted/50 rounded-3xl p-8 border border-border">
                  <div className="aspect-video bg-background rounded-2xl flex items-center justify-center border border-border/50 relative overflow-hidden group">
                     <List className="w-24 h-24 text-emerald-500/25 group-hover:text-emerald-500/40 group-hover:scale-110 transition-all duration-500" />
                     <div className="absolute inset-0 bg-linear-to-tr from-emerald-500/15 to-transparent pointer-events-none" />
                  </div>
               </div>
            </div>
         </div>

         {/* FAQ Section */}
         <section className="bg-muted/20 border border-border/30 rounded-3xl p-8 md:p-12 space-y-8">
            <h3 className="text-2xl font-bold text-center">Frequently Asked Questions</h3>
            <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-3">
                  <h4 className="font-bold">What input formats are supported?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     You can paste text separated by newlines, commas, tabs, or pipe characters. The tool auto-detects
                     the delimiter, or you can manually select one.
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="font-bold">Can I convert to SQL IN() clauses?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     Yes! Select &quot;SQL IN()&quot; from the format dropdown. The tool properly escapes single quotes
                     and wraps each value for direct use in SQL queries.
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="font-bold">How do I remove duplicates?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     Select the &quot;Deduplicate&quot; transform from the dropdown. The tool will output only unique
                     values, preserving the original order.
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="font-bold">Is this safe for production data?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     Absolutely. Everything runs in your browser&apos;s JavaScript engine. No data is ever sent to any
                     server. It&apos;s open-source so you can verify.
                  </p>
               </div>
            </div>
         </section>

         {/* Bottom CTA */}
         <div className="text-center space-y-6 pt-12">
            <h3 className="text-xl font-bold italic text-muted-foreground/60 tracking-wider uppercase">
               Transform any list into production-ready code
            </h3>
            <div className="h-1 w-24 bg-linear-to-r from-transparent via-emerald-500/50 to-transparent mx-auto" />
         </div>
      </div>
   );
}
