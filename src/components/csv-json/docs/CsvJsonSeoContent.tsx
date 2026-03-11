import { Replace, Braces, ShieldCheck, Table } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function CsvJsonSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'What is the difference between CSV and JSON?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'CSV (Comma-Separated Values) is a flat, tabular data representation format that lacks hierarchy. JSON (JavaScript Object Notation) structurally represents hierarchical mapped lists utilizing complex objects intrinsically matching standard application variables.',
            },
         },
         {
            '@type': 'Question',
            name: 'Are my CSV headers automatically parsed?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes! The transpiler implicitly detects the leading row configuring exact header definitions cleanly rendering keys perfectly mapped without manual specification requirements directly parsing output.',
            },
         },
         {
            '@type': 'Question',
            name: 'Is my proprietary spreadsheet data securely converted?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Absolutely. This entire bi-directional compiler executes robust tabular processing directly offline locally within your active browser retaining raw data fully securely completely locally avoiding server pipelines.',
            },
         },
      ],
   };

   return (
      <article className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

         {/* Hero Section */}
         <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
               <Replace className="w-3.5 h-3.5" />
               Tabular Transpiler
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Tabular <span className="text-emerald-500">CSV ↔ JSON</span> Converter
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Shift dense comma-separated spreadsheets elegantly into structured JavaScript Object arrays. Smoothly
               generate flat structured tables procedurally directly from complex mapped properties intuitively safely.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Table className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Tabular Translation</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Export robust spreadsheet structures universally mapped safely. Connect enterprise formats tightly
                  bridging gaps separating standard export layouts cleanly handling raw metrics correctly.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Braces className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Structured Formatting</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Transform flat rows fundamentally mapping instantly rigidly verified JSON matrices safely empowering
                  dynamic architectures securely compiling payload data efficiently natively inline.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Private Computation</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Evaluates spreadsheet information strictly privately securely running heavy operations offline
                  utilizing robust isolated execution entirely safeguarding sensitive structural schemas locally without
                  risking transmission.
               </p>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">How to Convert CSV & JSON</h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono shrink-0">
                     1
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Set Conversion Mode</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Choose "CSV to JSON" if you have tabular data, or "JSON to CSV" if you need to flatten a
                        structured array into a spreadsheet-friendly format.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono shrink-0">
                     2
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Input Your Tabular Data</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Paste your raw CSV string or JSON array into the top editor. You can also "Import" a local file
                        directly; the tool will parse headers automatically.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono shrink-0">
                     3
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Adjust Parsing Delimiters</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        For non-standard CSVs, use the settings panel to change the separator from a comma to a
                        semicolon, tab, or pipe. The result will re-map instantly.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono shrink-0">
                     4
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Identify Data Headers</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Confirm if your data includes a header row. If enabled, the tool uses the first row to define
                        the keys for your resulting JSON objects automatically.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono shrink-0">
                     5
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Export Flat or Nested Result</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Once satisfied, click "Copy" or "Download". Your data is now transformed and ready for use in
                        Excel, Google Sheets, or as a static data source in your JS app.
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
               <p className="text-muted-foreground">Detailed insights into strict tabular data transpilation.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
               {faqSchema.mainEntity.map((faq, i) => (
                  <div key={i} className="space-y-3">
                     <h3 className="font-bold text-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {faq.name}
                     </h3>
                     <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-emerald-500/20">
                        {faq.acceptedAnswer.text}
                     </p>
                  </div>
               ))}
               <div className="space-y-3">
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                     Is my input data saved?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-emerald-500/20">
                     To improve your experience, your input data is saved locally in your browser using localStorage.
                     This is entirely client-side, meaning your data never leaves your device. You can opt-out of this
                     behavior at any time by disabling the 'Persist Data' switch in the tool settings.
                  </p>
               </div>
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-emerald-600 rounded-3xl p-12 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <h2 className="text-3xl font-bold text-white relative z-10 mb-4">Start Transpiling Arrays Now</h2>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Generate" />
            </div>
         </div>
      </article>
   );
}
