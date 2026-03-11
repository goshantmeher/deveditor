import { FileText, ShieldCheck, Zap, Type, RefreshCw, Hash } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function LoremIpsumSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'What is Lorem Ipsum?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
            },
         },
         {
            '@type': 'Question',
            name: 'Why use Lorem Ipsum instead of regular text?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English. This prevents reviewers from being distracted by the content during design phase.',
            },
         },
         {
            '@type': 'Question',
            name: 'Can I specify exactly how much text I need?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes! You can choose to generate text based on the number of paragraphs (up to 50), sentences (up to 100), or individual words (up to 1000) for precise layout testing.',
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
               <FileText className="w-3.5 h-3.5" />
               Text Generation
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Lorem Ipsum <span className="text-emerald-500">Generator</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Generate beautiful, natural-looking placeholder text instantly. Perfect for mocking up layouts, websites,
               and typography designs.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Type className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Precise Control</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Need exactly 23 words? Or 7 paragraphs? Use precise sliders to generate the exact amount of filler
                  text your design requires.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <RefreshCw className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Infinite Variations</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Tired of seeing the exact same block of text everywhere? Generate fresh, randomized combinations of
                  the classic Latin phrases.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Instant Copy</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  One click to copy to clipboard. Fast, lightweight, and works entirely within your browser with zero
                  latency.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Design without distractions</h2>
               <p className="text-muted-foreground leading-relaxed">
                  When designing interfaces, real copy can distract stakeholders from evaluating the actual layout and
                  typography. Dummy text keeps the focus on the design.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Hash,
                        title: 'Multiple Formats',
                        desc: 'Generate paragraphs for body copy, sentences for subheadings, or words for titles.',
                     },
                     {
                        icon: FileText,
                        title: 'Authentic Latin',
                        desc: 'Uses the traditional 45 BC Cicero text corpus for authentic looking word-length distribution.',
                     },
                     {
                        icon: Zap,
                        title: 'Start Options',
                        desc: 'Toggle whether you want the passage to start with the recognizable "Lorem ipsum dolor sit amet" phrase.',
                     },
                  ].map((item, i) => (
                     <li key={i} className="flex gap-4">
                        <div className="mt-1">
                           <item.icon className="w-5 h-5 text-emerald-500" />
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
                  <FileText className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                     Quick Sample
                  </span>
               </div>
               <p className="text-foreground text-sm leading-relaxed italic border-l-2 border-emerald-500/30 pl-4">
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                  et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat."
               </p>
               <div className="mt-4 text-xs font-mono text-muted-foreground text-right">38 words • 258 characters</div>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
               How to Generate Placeholder Text
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono shrink-0">
                     1
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Select Unit Type</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Decide whether you need Paragraphs, Sentences, or individual Words. This helps you fill specific
                        UI containers like blog bodies, sub-headers, or button labels perfectly.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono shrink-0">
                     2
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Define the Quantity</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Use the slider or input box to set the exact number of units you need. The generator can handle
                        from a single word up to 50 full paragraphs of filler text instantly.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono shrink-0">
                     3
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Toggle "Start with Lorem Ipsum"</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Decide if you want your passage to begin with the classic "Lorem ipsum dolor sit amet..." phrase
                        or jump straight into randomized Latin variations for a less uniform look.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono shrink-0">
                     4
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Preview Live Output</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Observe the generated content in the main workspace. Review paragraph density and word-length
                        distribution to ensure it simulates the look of real content in your design.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono shrink-0">
                     5
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">One-Click Copy</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Once satisfied, click the "Copy" icon. Your custom placeholder text is now on your clipboard,
                        ready to be pasted into Figma, Sketch, or directly into your HTML code.
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
               <p className="text-muted-foreground">Learn more about the history and usage of placeholder text.</p>
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
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-emerald-600 rounded-3xl p-12 text-center space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <h2 className="text-3xl font-bold text-white relative z-10">Fill your designs instantly</h2>
            <p className="text-emerald-100 max-w-xl mx-auto relative z-10">
               Generate the exact amount of placeholder text you need for your mockups, wireframes, and prototypes.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Generate" />
            </div>
         </div>
      </article>
   );
}
