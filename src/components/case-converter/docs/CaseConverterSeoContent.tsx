import { ArrowRightLeft, Zap, ShieldCheck, Type, Sparkles, Code2, Braces } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function CaseConverterSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'Which programming cases are supported?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'We support camelCase, snake_case, PascalCase, kebab-case, CONSTANT_CASE, dot.case, and more. It also supports standard text formats like Title Case and Sentence case.',
            },
         },
         {
            '@type': 'Question',
            name: 'How does it handle mixed input?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Our smart tokenization engine automatically splits text by spaces, underscores, dashes, and even camelCase humps (e.g., "myVariableName" to "my_variable_name").',
            },
         },
         {
            '@type': 'Question',
            name: 'Is this tool safe for sensitive code?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes. All text transformation happens locally in your browser. No strings or code snippets are ever sent to our servers.',
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
               <Type className="w-3.5 h-3.5" />
               Text Transformation
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Precision Case <span className="text-indigo-500">Converter</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Seamlessly convert between programming cases and text formats. Built with a smart tokenization engine to
               handle complex variable names and code snippets instantly.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ArrowRightLeft className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">11+ Case Formats</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Convert to camelCase, snake_case, PascalCase, kebab-case, CONSTANT_CASE, dot.case, path/case, and more
                  in a single click.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Client-Side Privacy</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Your variable names, API keys, and code never leave your browser. Zero server interaction for total
                  confidentiality.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Instant Conversion</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Real-time output as you type. Handles multi-line input so you can convert entire lists of variables at
                  once.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Smart Tokenization Engine</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Unlike simple string replacers, our engine intelligently identifies word boundaries in mixed formats.
                  It handles acronyms and complex humps gracefully.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Code2,
                        title: 'Intelligent Splitting',
                        desc: 'Splits by space, dash, underscore, and camelCase humps automatically.',
                     },
                     {
                        icon: Braces,
                        title: 'Multi-line Support',
                        desc: 'Convert entire lists of variables — each line is processed independently.',
                     },
                     {
                        icon: ArrowRightLeft,
                        title: 'Swap & Chain',
                        desc: 'Move output back to input to chain multiple transformations.',
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
                     { from: 'hello world', to: 'helloWorld', label: 'camelCase' },
                     { from: 'hello world', to: 'hello_world', label: 'snake_case' },
                     { from: 'hello world', to: 'HelloWorld', label: 'PascalCase' },
                     { from: 'hello world', to: 'hello-world', label: 'kebab-case' },
                     { from: 'hello world', to: 'HELLO_WORLD', label: 'CONSTANT_CASE' },
                  ].map((item, i) => (
                     <div key={i} className="flex items-center gap-3 text-muted-foreground">
                        <span className="text-xs w-32 text-indigo-400 font-bold">{item.label}</span>
                        <span className="text-foreground">{item.to}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">How to Convert Text Case</h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">1</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Paste Your Raw Text</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Paste your variable names, code snippets, or regular prose into the input editor. The tool supports multi-line conversion for bulk processing of lists.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">2</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Choose Your Target Case</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Click any case button (e.g., camelCase, snake_case, PascalCase) in the transformation panel. The entire input will be instantly re-tokenized and reformatted.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">3</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Handle Code-Specific Formats</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">For environment variables, select CONSTANT_CASE. For URL paths, select kebab-case or path/case. The engine intelligently preserves word boundaries during the shift.</p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">4</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Chain Transformations (Optional)</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Use the "Move to Input" button to take your converted results and apply a second case transformation, or use the "Swap" feature to reverse your previous settings.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">5</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Copy the Formatted Result</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Once the preview looks correct, click the "Copy" icon. Your new variable names or formatted strings are ready to be pasted directly into your code editor.</p>
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
               <p className="text-muted-foreground">Everything you need to know about our Case Converter.</p>
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
            <h2 className="text-3xl font-bold text-white relative z-10">Master your variable naming conventions</h2>
            <p className="text-indigo-100 max-w-xl mx-auto relative z-10">
               Start converting between camelCase, snake_case, PascalCase, and more. No login required, total privacy.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Start Converting" />
            </div>
         </div>
      </article>
   );
}
