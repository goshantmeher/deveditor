import { Database, ShieldCheck, Table } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function MockDataSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'Is my data randomly generated securely without server tracking?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes! All dummy data is generated exclusively in your web browser. Nothing is ever sent to a remote API or backend server. We leverage the open-source Faker.js library via client-side processing, ensuring complete privacy mapping.',
            },
         },
         {
            '@type': 'Question',
            name: 'How much dummy data can I generate at once?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'You can generate up to 10,000 rows instantly at a given time format to protect browser memory limits. Output files can easily reach multiple megabytes flawlessly.',
            },
         },
         {
            '@type': 'Question',
            name: 'What formats can I download?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'The Mock Data Generator supports generating raw JSON arrays for Document database testing (MongoDB/Firebase) and structured CSV formats perfect for importing into relational SQL databases, Excel, or tabular tools.',
            },
         },
      ],
   };

   return (
      <article className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

         {/* Hero Section */}
         <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-wider">
               <Database className="w-3.5 h-3.5" />
               Dataset Builder
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               JSON & CSV <span className="text-pink-500">Mock Data</span> Generator
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Construct thousands of rows of pristine, realistic test data instantly. Prototype APIs, load-test your
               databases, and populate UI components with completely private client-side engine execution.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-pink-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Database className="w-6 h-6 text-pink-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Relational Schemas</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Design granular keys. Pick from names, addresses, UUIDs, dates, passwords, hex colors, and more to
                  model your exact payload needs precisely.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Complete Privacy</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Never expose your schema keys to third parties. Every row of fake data is baked completely in the
                  sandbox environment of your browser.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Table className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Multi-Format Exports</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Toggle instantly between formatted JSON strings for document stores mapping or unparsed flat CSV
                  models for analytical data lakes testing.
               </p>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">How to Generate Mock Data</h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-pink-500/10 text-pink-500 flex items-center justify-center font-bold font-mono shrink-0">
                     1
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Define Your Field Names</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Enter the key names for your object (e.g., "id", "full_name", "email"). These will serve as the
                        column headers or JSON property keys in your final output.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-pink-500/10 text-pink-500 flex items-center justify-center font-bold font-mono shrink-0">
                     2
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Select Data Types</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Choose a data genre for each field. Select from hundreds of realistic options like random Names,
                        valid Email addresses, UUIDs, Phone numbers, and future/past Dates.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-pink-500/10 text-pink-500 flex items-center justify-center font-bold font-mono shrink-0">
                     3
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Set the Row Density</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Decide how many records you need. Whether you need a quick 5-row sample for a UI mockup or
                        1,000+ rows for performance testing, just enter the required count.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-pink-500/10 text-pink-500 flex items-center justify-center font-bold font-mono shrink-0">
                     4
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Choose Export Format</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Select between JSON and CSV output. JSON is ideal for frontend state mocking, while CSV is
                        perfect for importing into Excel, Google Sheets, or SQL databases.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-pink-500/10 text-pink-500 flex items-center justify-center font-bold font-mono shrink-0">
                     5
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Generate & Download</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Click "Generate". The tool uses Faker.js locally to build your dataset. You can then copy the
                        raw string or download the file directly to your disk instantly.
                     </p>
                  </div>
               </div>
            </div>
         </div>

         {/* FAQ Section */}
         <div className="space-y-12 border-t border-border/50 pt-24">
            <div className="text-center space-y-4">
               <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
                  {' '}
                  Frequently Asked Questions{' '}
               </h2>
               <p className="text-muted-foreground text-center">Important notes regarding dataset processing.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
               {faqSchema.mainEntity.map((faq, i) => (
                  <div key={i} className="space-y-3">
                     <h3 className="font-bold text-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                        {faq.name}
                     </h3>
                     <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-pink-500/20">
                        {faq.acceptedAnswer.text}
                     </p>
                  </div>
               ))}
               <div className="space-y-3">
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                     Is my schema saved?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-pink-500/20">
                     To improve your workflow context, your schema definition (field names and types) is strictly saved
                     inside your local browser storage using localStorage. Nothing ever traces back to an external
                     source or tracking script.
                  </p>
               </div>
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-pink-600 rounded-3xl p-12 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <div className="relative z-10 space-y-6">
               <h2 className="text-3xl font-bold text-white mb-4">Initialize Fake Databases</h2>
               <div className="pt-4">
                  <ScrollToTopButton label="Scroll up to Start Formatter" />
               </div>
            </div>
         </div>
      </article>
   );
}
