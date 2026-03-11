import { Wind, FileCode2, Search, Settings, Layers, Zap } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function TailwindLookupSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'How does Tailwind CSS class generation work?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Tailwind CSS maps predefined utility classes (like `flex` or `m-4`) directly to native CSS attributes. Our lookup tool dynamically translates specific Tailwind strings instantly back into their raw browser-native CSS combinations automatically.',
            },
         },
         {
            '@type': 'Question',
            name: 'Can I reverse engineer CSS back to Tailwind?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes! While translating custom complex arbitrary CSS into pure Tailwind classes can be tricky due to overlapping utility properties, our engine heuristically evaluates your CSS block and approximates the closest matching exact Tailwind equivalent.',
            },
         },
         {
            '@type': 'Question',
            name: 'Does this generate arbitrary v4 Tailwind variables?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Our heuristic mapper natively builds modern arbitrary bracket syntax (such as `w-[400px]`) when encountering strict, non-scalable pixel measurements inside your pure CSS queries.',
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
               <Wind className="w-3.5 h-3.5" />
               Frontend Utilities
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Ultimate <span className="text-indigo-500">Tailwind Converter</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Searchable reference directory mapping Utility-First Tailwind v4 Classes instantly into standard Vanilla
               CSS structures and vice-versa.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileCode2 className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Extract Raw CSS</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Evaluate enormous unreadable lines of generic Tailwind utilities instantly into logically blocked,
                  nicely formatted raw CSS rule sets automatically.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Search className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Reverse Engineering</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Take legacy stylesheets and feed them directly into our engine to attempt migrating old systems into
                  modern Tailwind utility arrays easily.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Heuristic Mapping</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  We use intelligent scale-conversion multipliers dynamically calculating matching values rather than
                  attempting to download massive hard-coded configuration data locally.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Migrate legacy stylesheets</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Moving older applications into heavy NextJS infrastructures utilizing strict compiler requirements
                  often makes preserving traditional {'<style>'} blocks hard to manage properly over long lifecycles.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Layers,
                        title: 'Utility Conversion',
                        desc: 'Translate thousands of lines of heavy vanilla design classes exactly into 1:1 mapped tailwind string clusters.',
                     },
                     {
                        icon: Settings,
                        title: 'Modernization via Arbitrary Brackets',
                        desc: 'Never lose a single sub-pixel measurement via the native [scale] arbitrary variable support tailwind offers.',
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
                  <Wind className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                     Tailwind Lookup Pipeline
                  </span>
               </div>
               <div className="space-y-3 font-mono text-sm">
                  {[
                     { from: 'Tailwind: flex', to: 'CSS: display: flex;' },
                     { from: 'Tailwind: items-center', to: 'CSS: align-items: center;' },
                     { from: 'CSS: margin-top: 1rem;', to: 'Tailwind: mt-4' },
                     { from: 'CSS: width: 100vw;', to: 'Tailwind: w-screen' },
                  ].map((item, i) => (
                     <div key={i} className="flex flex-col gap-1 text-muted-foreground mb-4">
                        <span className="text-xs text-rose-400 opacity-80">{item.from}</span>
                        <span className="text-emerald-400">→ {item.to}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
               How to Convert CSS & Tailwind
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     1
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Paste Your Style Rules</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Enter your raw vanilla CSS block or a string of Tailwind utility classes into the input editor.
                        The tool automatically detects the input type and prepares for conversion.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     2
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Select Primary Direction</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Choose whether you want to translate "Tailwind to CSS" or "CSS to Tailwind". The engine updates
                        its heuristic mapping rules to provide the most accurate output possible.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     3
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Audit the Mapping Logic</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Review the output panel. For CSS-to-Tailwind, the engine identifies exact utility matches or
                        generates arbitrary bracket values (e.g., <code className="text-indigo-400">m-[17px]</code>) for
                        precision measurements.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     4
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Refine Heuristic Results</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        If multiple Tailwind classes could represent the same CSS rule, the tool provides the closest
                        standard version. You can manually adjust the input values to see how the mapping changes live.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     5
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Copy Your Utility String</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Click the "Copy" icon on the result panel. Your converted styles are now on your clipboard,
                        ready to be pasted into your React/Next.js components or legacy stylesheets.
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
               <p className="text-muted-foreground">Information about translating Utility components.</p>
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
         <div className="bg-indigo-600 rounded-3xl p-12 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <h2 className="text-3xl font-bold text-white relative z-10 mb-4">Start Translating Utilities</h2>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Start" />
            </div>
         </div>
      </article>
   );
}
