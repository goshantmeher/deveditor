import { Replace, Settings, Braces, ShieldCheck } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function TomlJsonSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'What is TOML, and how does it compare to JSON?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: "TOML (Tom's Obvious, Minimal Language) is designed for clean, easy-to-read configuration files, utilizing simple key-value pairs and readable arrays. JSON is stricter, requiring brackets and quotes everywhere natively. Converting transforms clear configurations strictly into verified JSON matrices required globally for system mapping.",
            },
         },
         {
            '@type': 'Question',
            name: 'Are my nested TOML tables successfully generated?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes! The transpiler dynamically processes nested headers successfully outputting complex JSON structures cleanly handling array brackets reliably avoiding parsing breaks correctly.',
            },
         },
         {
            '@type': 'Question',
            name: 'Is my proprietary config data uploaded?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Absolutely not. This entire bi-directional trans-compiler executes robust parsing logic directly offline locally within your active browser leveraging standard compilation strictly completely protecting sensitive environment variables implicitly.',
            },
         },
      ],
   };

   return (
      <article className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

         {/* Hero Section */}
         <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-wider">
               <Replace className="w-3.5 h-3.5" />
               Format Transpiler
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Fast <span className="text-violet-500">TOML ↔ JSON</span> Converter
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Translate clean configuration standards elegantly into strictly validated JSON payload objects instantly
               safely entirely offline securely translating complex environments efficiently dynamically.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-violet-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Settings className="w-6 h-6 text-violet-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Config Processing</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Transform simple TOML setups thoroughly parsing tables naturally cleanly extracting array tables
                  inherently completely reliably avoiding manual errors manually securely bridging definitions safely.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Braces className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Rigid Structuring</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Convert clear variable lines implicitly dynamically exporting strict JSON arrays naturally connecting
                  CI/CD tools completely reliably avoiding integration conflicts directly efficiently securely locally.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Secure Translation</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Protect API keys completely cleanly rendering variables directly isolated offline inside strict
                  sandbox limits successfully safely keeping sensitive definitions protected fundamentally efficiently
                  natively.
               </p>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
               How to Convert TOML & JSON
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-violet-500/10 text-violet-400 flex items-center justify-center font-bold font-mono shrink-0">
                     1
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Select Conversion Pipeline</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Choose whether you are converting from TOML to JSON or vice-versa. The tool updates the editor
                        modes and validation rules automatically for the target syntax.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-violet-500/10 text-violet-400 flex items-center justify-center font-bold font-mono shrink-0">
                     2
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Input Configuration Data</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Paste your raw configuration string into the source panel. Use the "Upload" button to import
                        existing <code className="text-violet-400">.toml</code> or{' '}
                        <code className="text-violet-400">.json</code> files directly from your disk.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-violet-500/10 text-violet-400 flex items-center justify-center font-bold font-mono shrink-0">
                     3
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Audit Table Nesting</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Verify that complex TOML tables (<code className="text-violet-400">[header]</code>) or array
                        tables (<code className="text-violet-400">[[header]]</code>) are correctly remapped into nested
                        JSON objects or arrays in the live output.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-violet-500/10 text-violet-400 flex items-center justify-center font-bold font-mono shrink-0">
                     4
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Format for Deployment</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Toggle between "Beautify" for human-readable debugging or "Minify" to strip whitespace for
                        production configuration injections and environment variables.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-violet-500/10 text-violet-400 flex items-center justify-center font-bold font-mono shrink-0">
                     5
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Download Validated Export</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Click "Download" to save the converted manifest. All processing is 100% client-side, ensuring
                        your sensitive API keys and secrets never leave your local environment.
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
               <p className="text-muted-foreground">Detailed insights into data transpilation effortlessly.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
               {faqSchema.mainEntity.map((faq, i) => (
                  <div key={i} className="space-y-3">
                     <h3 className="font-bold text-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                        {faq.name}
                     </h3>
                     <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-violet-500/20">
                        {faq.acceptedAnswer.text}
                     </p>
                  </div>
               ))}
               <div className="space-y-3">
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                     Is my input data saved?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-violet-500/20">
                     To improve your experience, your input data is saved locally in your browser using localStorage.
                     This is entirely client-side, meaning your data never leaves your device. You can opt-out of this
                     behavior at any time by disabling the 'Persist Data' switch in the tool settings.
                  </p>
               </div>
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-violet-600 rounded-3xl p-12 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <h2 className="text-3xl font-bold text-white relative z-10 mb-4">Start Transpiling Now</h2>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Generate" />
            </div>
         </div>
      </article>
   );
}
