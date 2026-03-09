import { Zap, FileCode2, Database, ShieldCheck, Cpu, Code } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function CodeMinifierSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'Why should I minify my code?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Minifying CSS, HTML, and JavaScript drastically reduces actual file weight transferring over physical networks locally. This accelerates First Contentful Paint times and significantly lowers hosting bandwidth costs on high-traffic CDNs.',
            },
         },
         {
            '@type': 'Question',
            name: 'Is it safe to paste proprietary algorithms here?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes. Our minifier and beautifier run exclusively using your browsers native memory map algorithms. We never utilize external API dependencies to transpile code logic, guaranteeing your trade secrets remain completely confidential disconnected offline.',
            },
         },
         {
            '@type': 'Question',
            name: 'What does the code Beautifier do exactly?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'The Beautify engine systematically reverse-engineers completely minified or badly formatted sloppy syntax arrays locally. It restores logical whitespace, nested indent blocks, and structured line-breaks turning unreadable 1-line spaghetti dumps into clean functional architectures.',
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
               <Zap className="w-3.5 h-3.5" />
               Performance Optimization
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Instantly <span className="text-amber-500">Minify & Beautify</span> Logic
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Locally compress massive JavaScript blocks perfectly, or instantly expand chaotic one-line obfuscated dumped HTML files utilizing high-speed runtime parsers implicitly directly in-browser.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Database className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Extreme Compression</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Strips useless comments, trailing white spaces, line returns, and completely safely trims logic equations reducing bundle metrics upwards of 70% automatically runtime.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileCode2 className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Format Restoration</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Tired of reading collapsed API responses? Switch the engine backward into Beautify mode translating minified objects back neatly into indented architectures correctly.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Client-Side Privacy</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Execute completely private AST traversal logic maps offline safely keeping all enterprise business proprietary source secrets rigorously contained physically on your chip.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Maximum output speed</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Processing occurs aggressively in a highly-optimized routine explicitly destroying unneeded DOM nodes or script tags parsing thousands of blocks incrementally.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Cpu,
                        title: 'JavaScript / TS Compatibility',
                        desc: 'Intelligently bypasses complex template-literals maintaining absolute logic integrity flawlessly.',
                     },
                     {
                        icon: Code,
                        title: 'CSS Mapping',
                        desc: 'Decimates formatting spacing globally without interfering directly within keyframe matrices recursively.',
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
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                     Performance Examples
                  </span>
               </div>
               <div className="space-y-3 font-mono text-sm overflow-hidden">
                  {[
                     { from: '1.24 MB React Build', to: '430 KB Minified' },
                     { from: '250 KB Stylesheet', to: '95 KB Compressed' },
                     { from: '1 Line Spaghetti', to: '450 Lines Indented' },
                  ].map((item, i) => (
                     <div key={i} className="flex flex-col gap-1 text-muted-foreground mb-4 border-b border-border/30 pb-2">
                        <span className="text-amber-400 font-bold w-full truncate">[{item.from}]</span>
                        <span className="text-sm opacity-80">-&gt; Returns: {item.to}</span>
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
               <p className="text-muted-foreground">Detailed insights into compilation mappings offline.</p>
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
            <h2 className="text-3xl font-bold text-white relative z-10 mb-4">Start Minifying Code</h2>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Generate" />
            </div>
         </div>
      </article>
   );
}
