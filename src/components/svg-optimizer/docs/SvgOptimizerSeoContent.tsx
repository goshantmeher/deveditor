import { ShieldCheck, Scissors, Sparkles, Code2, Download, Zap } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function SvgOptimizerSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'How does SVGO optimization work?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'The optimizer runs SVGO locally in your browser to safely remove hidden XML declarations, editor metadata (like Illustrator tags), unused gradients, empty groupings, and shortens coordinate decimal places without breaking the visual integrity of the vector image.',
            },
         },
         {
            '@type': 'Question',
            name: 'Will optimizing an SVG ruin its visual quality?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'No. The default settings strictly use lossless techniques. Removing invisible metadata and combining styles significantly reduces the filesize but ensures the drawn path coordinates scale visually exactly as they did originally.',
            },
         },
         {
            '@type': 'Question',
            name: 'Are my designs uploaded to a server?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Absolutely not. We rely on a browser-compiled WASM logic port of SVGO to run the compression. Data processing happens directly on your CPU/RAM locally. Once you close the tab, the data is completely gone.',
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
               <Scissors className="w-3.5 h-3.5" />
               Image Compression
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Vector <span className="text-indigo-500">Optimizer</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Strip down heavyweight, messy SVG exports into beautiful, minimized HTML-ready markup. Instantly cut file sizes without losing visual quality.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Code2 className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Clean XML Markup</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Removes useless Doctypes, comments, and empty container layers created by visual software editors like Adobe Illustrator or Figma.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">100% Client-Side Private</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Confidential branded logos or private UI components? Never worry about data leaks. SVGO runs entirely securely in your browser memory.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Live Export Tracking</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Instantly review byte-savings and track percentage size reductions in real time. Hover visually in preview mode before committing the code.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">A necessity for UI/UX developers</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Do not clog up your Git repository or increase network load times with unoptimized SVGs. 
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Code2,
                        title: 'Attribute Sorting & Tag Merging',
                        desc: 'Intelligently sorts attributes and merges multiple path grouping structures where applicable to shave off raw strings.',
                     },
                     {
                        icon: Download,
                        title: 'Direct File Download',
                        desc: 'Prefer importing files? We can bundle the text output right back into an actionable .svg file for you to download natively.',
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
                     Quick Look: Removed Elements
                  </span>
               </div>
               <div className="space-y-3 font-mono text-sm">
                  {[
                     { from: '<!-- Generator: Adobe Illustrator 24.0.0 -->', to: 'Removed (Wasteful Comment)' },
                     { from: '<metadata xmlns:x="..."></metadata>', to: 'Removed (Hidden Metadata)' },
                     { from: 'd="M 10.000 20.000 L 15.0000 30.0000"', to: 'd="M 10 20 L 15 30" (Coord rounding)' },
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
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">How to Optimize Your SVGs</h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-mono shrink-0">1</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Upload Your Vector Source</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Paste your raw SVG code or upload a file. The engine immediately begins analyzing the XML tree for redundant layers and metadata.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-mono shrink-0">2</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Configure Compression Strength</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Adjust precision levels for coordinate rounding and toggle specific plugins like "Remove Hidden Elements" or "Merge Paths" to maximize byte savings.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-mono shrink-0">3</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Audit Savings in Real-Time</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Check the dashboard for the original vs. optimized file size. Monitor the live preview pane to ensure no visual artifacts are introduced during the path-shortening process.</p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-mono shrink-0">4</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Review the Minified Markup</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Inspect the resulting code for cleanliness. The tool removes Adobe Illustrator, Figma, and Inkscape metadata tags while keeping your id attributes intact for CSS styling.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-mono shrink-0">5</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Export for Your Build</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Download the optimized <code className="text-indigo-400">.svg</code> file or copy the string directly. All processes are 100% client-side, ensuring your design assets remain private.</p>
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
               <p className="text-muted-foreground">Information about the SVGO Optimization library.</p>
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
            <h2 className="text-3xl font-bold text-white relative z-10 mb-4">Compact SVGs in seconds</h2>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Optimize Image" />
            </div>
         </div>
      </article>
   );
}
