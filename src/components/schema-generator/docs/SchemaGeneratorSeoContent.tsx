import { Code2, Database, Zap, ShieldCheck, Braces, Sparkles } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function SchemaGeneratorSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'What schema formats are supported?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'We generate JSON Schema (Draft 2020), TypeScript interfaces, Zod schemas, and Yup schemas. All formats are production-ready with proper type inference.',
            },
         },
         {
            '@type': 'Question',
            name: 'How accurate is the type inference?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Our engine analyzes every value in your JSON, detecting strings, numbers, booleans, nulls, arrays, and nested objects. It handles mixed-type arrays and optional keys intelligently.',
            },
         },
         {
            '@type': 'Question',
            name: 'Is my data private?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes. All schema generation happens entirely in your browser. Your JSON data never leaves your machine.',
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
               <Database className="w-3.5 h-3.5" />
               Schema Engineering
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               JSON to <span className="text-indigo-500">Schema</span> Generator
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Paste any JSON and instantly generate TypeScript interfaces, Zod schemas, JSON Schema, or Yup
               validations. Smart type inference handles complex nested structures.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Code2 className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Multi-Format Output</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Generate TypeScript interfaces, Zod schemas, Yup schemas, and JSON Schema with a single paste. All
                  formats are production-ready.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Smart Type Inference</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Our engine handles nested objects, arrays of mixed types, optional fields, and complex structures
                  automatically.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Instant Generation</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Schemas are generated in real-time as you type. No submit buttons, no waiting — just paste and copy.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">From API Response to Type Safety</h2>
               <p className="text-muted-foreground leading-relaxed">
                  The fastest way to add type safety to your project. Paste an API response and get production-ready
                  types instantly.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Braces,
                        title: 'Nested Object Support',
                        desc: 'Deep nesting is handled with proper named interfaces and cross-references.',
                     },
                     {
                        icon: Database,
                        title: 'Array Type Merging',
                        desc: 'Analyzes all items in an array to produce the most accurate union type.',
                     },
                     {
                        icon: Code2,
                        title: 'Copy-Ready Output',
                        desc: 'Generated schemas include proper imports and are ready to paste into your codebase.',
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
                     Paste your <strong>API response</strong> directly to generate a{' '}
                     <code className="text-indigo-400">TypeScript interface</code>. Then switch to{' '}
                     <code className="text-indigo-400">Zod</code> to get runtime validation for the same structure.
                  </p>
                  <p>
                     For <strong>JSON Schema</strong>, use the output with tools like AJV for server-side validation or
                     OpenAPI spec generation.
                  </p>
               </div>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">How to Convert JSON to Schema</h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">1</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Paste Your Raw JSON</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Enter an example JSON object or array of objects into the editor. The engine immediately begins analyzing the data types and structure for inference.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">2</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Select Your Target Syntax</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Choose from TypeScript, Zod, JSON Schema, or Yup. The tool translates the inferred structure into the specific syntax rules of your chosen library.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">3</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Refine Optionality Rules</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">If your array contains inconsistent keys, the engine automatically marks those fields as optional (<code className="text-indigo-400">?</code> in TypeScript or <code className="text-indigo-400">.optional()</code> in Zod).</p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">4</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Audit Type Integrity</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Check the output for proper interface naming, union types for mixed data, and correctly nested objects. Use the "Reset" button to start over with a fresh sample.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">5</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Copy and Implement</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Click "Copy" to move the production-ready code to your clipboard. Since the entire analysis is local, your data is never indexed or sent to an external server.</p>
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
               <p className="text-muted-foreground">Everything you need to know about our Schema Generator.</p>
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
            <h2 className="text-3xl font-bold text-white relative z-10">Type safety starts here</h2>
            <p className="text-indigo-100 max-w-xl mx-auto relative z-10">
               Paste any JSON and get production-ready schemas instantly. No login, no data limits.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Start Generating" />
            </div>
         </div>
      </article>
   );
}
