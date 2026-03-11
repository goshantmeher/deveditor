import { Database, ShieldCheck, Zap } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function SqlFormatterSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'Are my database queries sent to an external server for formatting?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Never. DevEditor prioritizes security. The entire SQL formatting engine is loaded within the sandbox of your web browser. No queries are transmitted over the internet or logged.',
            },
         },
         {
            '@type': 'Question',
            name: 'Which SQL sub-dialects are natively supported?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'We natively support formatting formatting rules for MySQL, PostgreSQL, MariaDB, standard SQL, SQLite, Oracle PL/SQL, and SQL Server Transact-SQL (T-SQL).',
            },
         },
         {
            '@type': 'Question',
            name: 'Does this formatter validate my complex SQL logic?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'This tool performs syntax formatting based on keywords and standard operators rather than strict semantic database validation, meaning it will beautify structurally valid chunks of code but wont catch schema-level logic errors.',
            },
         },
      ],
   };

   return (
      <article className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

         {/* Hero Section */}
         <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
               <Database className="w-3.5 h-3.5" />
               Query Beautifier
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Instant <span className="text-blue-500">SQL Formatter</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Format, indent, beautify, and strictly capitalize complex raw SQL queries into readable, multi-line
               statements in milliseconds straight from your browser.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-blue-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Database className="w-6 h-6 text-blue-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Multi-Dialect Support</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Toggle context configurations between PostgreSQL, MySQL, T-SQL, MariaDB, and SQLite to guarantee
                  properly nested conditional formatting variants.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Absolute Data Privacy</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Your sensitive internal schema queries and architectures remain strictly locked inside your local
                  device RAM natively, guaranteeing absolutely zero telemetry.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Automatic Case Matching</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Tired of lowercase internal queries? This formatting layer implicitly transforms major syntax
                  statements (SELECT, JOIN, WHERE) into highly visible upper case.
               </p>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">How to Format SQL Queries</h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold font-mono shrink-0">
                     1
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Paste Your Raw Query</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Simply paste your unformatted or minified SQL query into the left editor panel. You can also
                        import files directly if you have massive schema dumps.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold font-mono shrink-0">
                     2
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Select Your Dialect</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Choose your specific database engine (PostgreSQL, MySQL, T-SQL, etc.) from the settings sidebar.
                        This ensures keywords and specific escape characters are handled native to your environment.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold font-mono shrink-0">
                     3
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Configure Indentation</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Adjust your preferred indentation level (2 spaces, 4 spaces, or Tabs) based on your team's code
                        style guides. The formatter applies these rules instantly.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold font-mono shrink-0">
                     4
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Toggle Advanced Logic</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Use the sidebar to enable options like "Auto-Capitalize Keywords" to transform 'select' into
                        'SELECT' or "Align Values" for cleaner vertical scanning of INSERT statements.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold font-mono shrink-0">
                     5
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Copy or Download</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Once the preview on the right looks perfect, click "Copy to Clipboard" or download the results
                        as a .sql file for immediate use in your database workbench.
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
               <p className="text-muted-foreground text-center">Notes regarding the underlying query visualizer.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
               {faqSchema.mainEntity.map((faq, i) => (
                  <div key={i} className="space-y-3">
                     <h3 className="font-bold text-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        {faq.name}
                     </h3>
                     <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-blue-500/20">
                        {faq.acceptedAnswer.text}
                     </p>
                  </div>
               ))}
               <div className="space-y-3">
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                     Will my tabs be saved locally?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-blue-500/20">
                     By default, yes. DevEditor locally caches your text payload structures directly inside native
                     browser storage seamlessly, ensuring they persist identically across reloads.
                  </p>
               </div>
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-blue-600 rounded-3xl p-12 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <div className="relative z-10 space-y-6">
               <h2 className="text-3xl font-bold text-white mb-4">Start Formatting Securely</h2>
               <div className="pt-4">
                  <ScrollToTopButton label="Scroll up to Start visualizer" />
               </div>
            </div>
         </div>
      </article>
   );
}
