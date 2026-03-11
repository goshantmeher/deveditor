import { Type, Sparkles, MonitorSmartphone, Code2, Layers, BookOpen } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function FontPairSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'What makes a good font pairing?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'A good font pairing typically consists of a high-contrast serif typeface for attention-grabbing headings, paired securely with a neutral geometric sans-serif for high-legibility body density.',
            },
         },
         {
            '@type': 'Question',
            name: 'Are Google Fonts free to use commercially?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes! All fonts provided in the standard Google Fonts directory are strictly open-source under either SIL Open Font License or Apache licenses, making them 100% free for massive commercial scaling.',
            },
         },
         {
            '@type': 'Question',
            name: 'How do I implement these fonts in Tailwind?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'The optimal way to use custom font pairs in Tailwind is by adding standard native HTML <link> tags into your document head, then strictly overriding the theme.extend.fontFamily object in your tailwind.config.js file.',
            },
         },
      ],
   };

   return (
      <article className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

         {/* Hero Section */}
         <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-wider">
               <Type className="w-3.5 h-3.5" />
               Frontend Aesthetics
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Beautiful{' '}
               <span className="bg-linear-to-r from-orange-400 via-rose-500 to-pink-500 text-transparent bg-clip-text">
                  Typography Pairings
               </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Preview, perfectly scale, and natively export hundreds of high-converting open-source font groupings.
               Combine high-contrast heading families with readable body text seamlessly.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-orange-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6 text-orange-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Hierarchy Preview</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Visually configure scaling values across different font classes while previewing massive H1 headers
                  resting heavily over long-form standard body content density organically.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-orange-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MonitorSmartphone className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Live Combinations</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Rather than guess how specific shapes contrast randomly, our sandbox immediately evaluates raw loaded
                  API parameters displaying exact rendering metrics cross-browser.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-orange-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Procedural Pairing</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Click the randomizer array natively traversing curated aesthetic lists finding geometric, humanist, or
                  transitional typographic meshes that strictly compliment one another perfectly.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Better reading density</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Poor font selection actively deters user engagement natively. Elevate flat layouts specifically by
                  introducing proper scale variation parameters securely.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Layers,
                        title: 'Native Imports',
                        desc: 'Generate immediate <link> array blocks pointing exactly to high-availability Google Font CDNs preventing CORS or download issues.',
                     },
                     {
                        icon: Code2,
                        title: 'Tailwind Integration',
                        desc: 'Export properly formatted tailwind.config.js theme extension objects instantly dropping the preview values right into root project files.',
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
                  <Type className="w-4 h-4 text-orange-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                     Tailwind Theme Variables
                  </span>
               </div>
               <div className="space-y-3 font-mono text-sm">
                  {[
                     { from: 'heading', to: "['Inter', 'sans-serif']" },
                     { from: 'body', to: "['Open Sans', 'sans-serif']" },
                     { from: 'serif', to: "['Merriweather', 'serif']" },
                     { from: 'brand', to: "['Playfair Display', 'serif']" },
                  ].map((item, i) => (
                     <div key={i} className="flex flex-col gap-1 text-muted-foreground mb-4">
                        <span className="text-xs text-rose-400 opacity-80">fontFamily.{item.from}</span>
                        <span className="text-emerald-400">→ {item.to}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">How to Pair Typography</h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold font-mono shrink-0">
                     1
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Pick Your Primary Heading</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Select a high-impact font for your H1 and H2 headers. SERIF fonts provide a classic, premium
                        look, while SANS-SERIF options feel more modern and tech-focused.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold font-mono shrink-0">
                     2
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Select a Readable Body Font</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Choose a complementary font for long-form content. Ensure the weight and character spacing
                        provide high legibility for extended reading sessions across mobile and desktop.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold font-mono shrink-0">
                     3
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Adjust Typographic Scale</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Use the font-size sliders to define your hierarchy. Observe how the heading contrasts against
                        the body block to ensure a clear visual path for your users' eyes.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold font-mono shrink-0">
                     4
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Preview Real Content Blocks</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Toggle between different UI layout mockups (Blog, Dashboard, Landing Page) to see how your
                        chosen font pair performs in actual design contexts before committing.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold font-mono shrink-0">
                     5
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Export CSS or Tailwind Config</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Click "Export" to generate the required <code className="text-orange-400">@import</code> lines
                        and the Tailwind <code className="text-orange-400">fontFamily</code> extension object for your
                        project configuration.
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
               <p className="text-muted-foreground">Information about typography pairs rendering.</p>
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
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-linear-to-r from-orange-500 via-rose-500 to-pink-500 rounded-3xl p-12 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <h2 className="text-3xl font-bold text-white relative z-10 mb-4">Start Testing Typography</h2>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Pair" />
            </div>
         </div>
      </article>
   );
}
