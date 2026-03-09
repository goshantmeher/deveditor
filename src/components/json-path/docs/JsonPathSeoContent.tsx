import { Database, GitBranch, Terminal, ShieldCheck, FileJson, ZoomIn } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function JsonPathSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'What is JSONPath?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'JSONPath is a query language specifically designed for JSON that is structurally similar to XPath for XML. It allows you to select and extract detailed segments of a JSON document flexibly using distinct path notations (like dot-notation or brackets).',
            },
         },
         {
            '@type': 'Question',
            name: 'Why do I need a JSONPath playground?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Evaluating complex, deeply nested JSON architectures manually through trial and error is frustratingly slow. A visual playground lets you test filter expressions and extraction syntax rapidly, receiving immediate visual feedback before incorporating the logic into expensive production pipelines.',
            },
         },
         {
            '@type': 'Question',
            name: 'Are my JSON payloads processed safely?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes. All JSONPath compilation and payload evaluation strictly executes locally utilizing client-side JavaScript processors directly inside your active browser context smoothly avoiding risky server exchanges entirely.',
            },
         },
      ],
   };

   return (
      <article className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

         {/* Hero Section */}
         <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider">
               <Database className="w-3.5 h-3.5" />
               Query Architecture
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Interactive <span className="text-amber-500">JSONPath</span> Sandbox
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Filter, parse, and slice deeply nested JSON datasets instantaneously utilizing highly robust JSONPath expressions. Rapidly evaluate precise array extractions seamlessly without deploying cumbersome Python or shell scripts statically.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ZoomIn className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Deep Traversals</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Utilize recursive descent operators (`..`) to recursively grab highly specific dictionary keys completely ignoring heavy structural nesting limitations arbitrarily.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-blue-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <GitBranch className="w-6 h-6 text-blue-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Conditional Filtering</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Support dynamic subscript filters (`?(@.value &gt; 10)`) parsing elaborate logic matrices and slicing specific dynamic array indexes procedurally natively.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Client-Side Engine</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Parses vast strings of highly sensitive proprietary object structures firmly locked within your local browser retaining absolute payload security passively.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Perfect your API extractions beforehand.</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Drafting JSON queries blindly within backend routines causes extensive debugging cycles. Prototyping distinct filters dynamically against mock structures securely reduces pipeline implementation errors dramatically.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Terminal,
                        title: 'Interactive Diagnostics',
                        desc: 'Detects malformed nodes natively delivering immediate actionable reporting indicating exactly why strict object traversal evaluations failed entirely.',
                     },
                     {
                        icon: FileJson,
                        title: 'Unified Notation Spec',
                        desc: 'Seamlessly handles classic Dot-mapping notation alongside complex Bracket-format conventions bridging XPath paradigms effortlessly locally.',
                     },
                  ].map((item, i) => (
                     <li key={i} className="flex gap-4">
                        <div className="mt-1">
                           <item.icon className="w-5 h-5 text-amber-500" />
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
                  <Database className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                     Common Expression Syntax
                  </span>
               </div>
               <div className="space-y-3 font-mono text-sm overflow-hidden">
                  {[
                     { from: '$.store.*', to: 'Returns all items in store' },
                     { from: '$..author', to: 'All authors recursively' },
                     { from: '$.book[?(@.price < 10)]', to: 'Filter books heavily' },
                     { from: '$.store.book[-1:]', to: 'Returns the last book strictly' },
                  ].map((item, i) => (
                     <div key={i} className="flex flex-col md:flex-row gap-1 md:gap-4 text-muted-foreground mb-4 border-b border-border/30 pb-2">
                        <span className="text-amber-400 font-bold w-48 truncate">[{item.from}]</span>
                        <span className="text-sm opacity-80">{item.to}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* FAQ Section */}
         <div className="space-y-12 border-t border-border/50 pt-24">
            <div className="text-center space-y-4">
               <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
                  Frequently Asked Questions
               </h2>
               <p className="text-muted-foreground">Detailed insights into strict JSON querying dynamically.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
               {faqSchema.mainEntity.map((faq, i) => (
                  <div key={i} className="space-y-3">
                     <h3 className="font-bold text-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        {faq.name}
                     </h3>
                     <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-amber-500/20">
                        {faq.acceptedAnswer.text}
                     </p>
                  </div>
               ))}
               <div className="space-y-3">
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                     Is my input data saved?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-amber-500/20">
                     To improve your experience, your input data is saved locally in your browser using localStorage. This is entirely client-side, meaning your data never leaves your device. You can opt-out of this behavior at any time by disabling the 'Persist Data' switch in the tool settings.
                  </p>
               </div>
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-amber-600 rounded-3xl p-12 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <h2 className="text-3xl font-bold text-white relative z-10 mb-4">Master Complex Filtering</h2>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Generate" />
            </div>
         </div>
      </article>
   );
}
