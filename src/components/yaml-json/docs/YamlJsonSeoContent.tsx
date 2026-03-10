import { FileJson, Replace, Settings, Braces, AlignLeft, ShieldCheck } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function YamlJsonSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'What is the main difference between YAML and JSON?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'JSON (JavaScript Object Notation) utilizes explicit brackets and quotation marks inherently prioritizing rigid machine-parsing performance. Contrarily, YAML firmly relies heavily upon visual indentation strictly to structure logic making human readability significantly easier.',
            },
         },
         {
            '@type': 'Question',
            name: 'Can every JSON file convert to YAML?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes structurally. Because YAML acts fundamentally as a functional superset extending JSON standards natively, every universally valid JSON payload compiles flawlessly directly into standard YAML blocks smoothly without data loss.',
            },
         },
         {
            '@type': 'Question',
            name: 'Is my proprietary config data uploaded?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Absolutely not. This entire bi-directional trans-compiler executes robust parsing logic directly offline locally within your active browser leveraging standard JS compilation strictly completely protecting sensitive environment variables implicitly.',
            },
         },
      ],
   };

   return (
      <article className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

         {/* Hero Section */}
         <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
               <Replace className="w-3.5 h-3.5" />
               Format Transpiler
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Instant <span className="text-orange-500">YAML ↔ JSON</span> Converter
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Translate tedious brackets effortlessly into highly readable spaces. Intuitively toggle back strictly converting cleanly indented architectures dynamically back into rigidly enforced system syntax seamlessly.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-orange-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <AlignLeft className="w-6 h-6 text-orange-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Humanized Configuration</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Struggle configuring heavy CI/CD pipelines natively? Compress vast arrays implicitly utilizing clean multi-line YAML formatting inherently avoiding missing trailing commas perfectly.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Braces className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Machine Enforced</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Transform ambiguous indents fundamentally back into strictly verified JSON matrices safely serving compiled payloads actively powering demanding frontend engines securely natively.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Maximum Security</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Evaluating production secrets securely inside your terminal exclusively without routing standard sensitive `.env` configurations externally retaining rigid architecture confidently.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Aligning DevOps paradigms dynamically.</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Navigating the painful divide isolating Docker orchestration scripts cleanly away from React payload structures natively causes intense friction. Bridging syntax definitions instantly fixes persistent synchronization headaches safely.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Settings,
                        title: 'Custom Indentation Matrices',
                        desc: 'Target precision formatting deeply allowing you easily define exact dual or quad procedural whitespace spacing generating compliant architectural structures actively.',
                     },
                     {
                        icon: FileJson,
                        title: 'Bi-Directional Context',
                        desc: 'Leverage robust JS-YAML parser functionality actively switching compilation directions explicitly executing rigid validation rules completely uninterrupted globally.',
                     },
                  ].map((item, i) => (
                     <li key={i} className="flex gap-4">
                        <div className="mt-1">
                           <item.icon className="w-5 h-5 text-orange-500" />
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
                  <Replace className="w-4 h-4 text-orange-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                     Structural Parsing
                  </span>
               </div>
               <div className="space-y-3 font-mono text-sm overflow-hidden">
                  {[
                     { from: 'keys: "value"', to: '{"keys": "value"}' },
                     { from: 'list:\n - item', to: '{"list": ["item"]}' },
                     { from: 'yes/no (YAML 1.1)', to: 'true/false (JSON)' },
                     { from: '# Comment Block', to: 'Discarded natively' },
                  ].map((item, i) => (
                     <div key={i} className="flex flex-col md:flex-row gap-1 md:gap-4 text-muted-foreground mb-4 border-b border-border/30 pb-2">
                        <span className="text-orange-400 font-bold w-40 truncate">[{item.from}]</span>
                        <span className="text-sm opacity-80">{item.to}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">How to Convert YAML & JSON</h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold font-mono shrink-0">1</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Establish Conversion Flow</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Choose whether you are refactoring YAML configuration into a JSON payload or compiling JSON data back into human-readable YAML blocks.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold font-mono shrink-0">2</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Paste Your Raw Syntax</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Enter your configuration or data string into the source editor. The engine immediately begins drafting the remapped structure in the secondary panel using the JS-YAML engine.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold font-mono shrink-0">3</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Set Indentation Standards</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Select between 2 or 4 space indentation in the toolbar. This ensures the resulting YAML is perfectly aligned with your specific CI/CD pipeline or Docker requirements.</p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold font-mono shrink-0">4</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Audit Type Handling</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Check how the tool handles booleans, nulls, and multi-line strings. Our converter follows standard YAML 1.2 rules for maximum compatibility across language ecosystems.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold font-mono shrink-0">5</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Securely Export Config</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Download the converted manifest or copy it to your clipboard. Since all parsing is done locally, your production secrets and environment variables remain 100% private.</p>
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
               <p className="text-muted-foreground">Detailed insights into data transpilation effortlessly.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
               {faqSchema.mainEntity.map((faq, i) => (
                  <div key={i} className="space-y-3">
                     <h3 className="font-bold text-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                        {faq.name}
                     </h3>
                     <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-orange-500/20">
                        {faq.acceptedAnswer.text}
                     </p>
                  </div>
               ))}
               <div className="space-y-3">
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                     Is my input data saved?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-orange-500/20">
                     To improve your experience, your input data is saved locally in your browser using localStorage. This is entirely client-side, meaning your data never leaves your device. You can opt-out of this behavior at any time by disabling the 'Persist Data' switch in the tool settings.
                  </p>
               </div>
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-orange-600 rounded-3xl p-12 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <h2 className="text-3xl font-bold text-white relative z-10 mb-4">Start Transpiling Now</h2>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Generate" />
            </div>
         </div>
      </article>
   );
}
