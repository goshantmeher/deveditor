import { MonitorSmartphone, LayoutTemplate, Globe, Code2, Users2, Search } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function MetaTagSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'What are Open Graph (OG) tags?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Open Graph tags are HTML meta snippets embedded into the <head> of a webpage. They control how URLs are displayed when shared on social networks like Facebook, LinkedIn, Twitter, and Discord, allowing you to explicitly define the title, description, and preview image.',
            },
         },
         {
            '@type': 'Question',
            name: 'Why do I need a separate Twitter meta tag set?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'While many modern platforms gracefully degrade to standard OG tags, Twitter relies closely on its proprietary twitter:card prefix specification. Including them guarantees your summary and large images render flawlessly in user timelines specifically on X/Twitter.',
            },
         },
         {
            '@type': 'Question',
            name: 'What is the optimal OG image size?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'The gold standard across the industry for Open Graph images is specifically 1200 x 630 pixels (an aspect ratio of 1.91:1). Keeping images under 1MB ensures they pass scraping timeouts perfectly.',
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
               <Globe className="w-3.5 h-3.5" />
               SEO Optimization
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Instantly Generate <span className="text-indigo-500">Perfect Meta Tags</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Craft high-converting Open Graph sharing metadata visibly. Preview how your web pages will appear
               natively across Facebook, Twitter, LinkedIn, and standard search engines in real time.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MonitorSmartphone className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Live Visual Previews</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Immediately see precisely how your rich social sharing cards render across different platforms locally
                  to eliminate truncation and formatting errors.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <LayoutTemplate className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Automated Snippets</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Outputs perfectly validated HTML markup explicitly combining standard search indexing meta names with
                  heavily supported `og:` property attributes together.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users2 className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Drive Deep Engagement</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Properly formatted meta titles acting concurrently alongside compelling banner images increase organic
                  click-through rates systematically from all timelines natively.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  A checklist for better search presence
               </h2>
               <p className="text-muted-foreground leading-relaxed">
                  Missing Open Graph elements routinely result in platform scraping failures dropping default blank
                  previews drastically destroying social share viability.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Search,
                        title: 'Title Validation',
                        desc: 'Keep raw titles optimally under 60 characters to consistently pass search engine UI rendering blocks strictly.',
                     },
                     {
                        icon: Code2,
                        title: 'Summary Large Image',
                        desc: 'Leverage the precise "summary_large_image" Twitter card command for dominant timeline footprint rendering.',
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
                  <Code2 className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                     Required Protocol Rules
                  </span>
               </div>
               <div className="space-y-3 font-mono text-sm overflow-hidden">
                  {[
                     { from: '<title>', to: 'Standard document headline.' },
                     { from: 'og:title', to: 'Graph share emphasis.' },
                     { from: 'og:url', to: 'Canonical routing explicitly.' },
                     { from: 'og:image', to: 'Absolute path JPEG/PNGs.' },
                  ].map((item, i) => (
                     <div
                        key={i}
                        className="flex flex-col md:flex-row gap-1 md:gap-4 text-muted-foreground mb-4 border-b border-border/30 pb-2"
                     >
                        <span className="text-indigo-400 font-bold w-24">[{item.from}]</span>
                        <span className="text-sm opacity-80">{item.to}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">How to Generate Meta Tags</h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     1
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Enter Core Site Data</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Start by filling in your page Title and Description. These form the foundation of your search
                        engine listings and social media snippets.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     2
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Add Visual Assets</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Paste the URL of your preferred preview image. Use a 1200x630px image for the best results
                        across Facebook, LinkedIn, and Twitter's large card formats.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     3
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Preview Social Realism</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Scroll through the preview tabs to see exactly how your tags will render natively on Facebook,
                        Twitter (X), and LinkedIn. Check for title truncation or image cropping issues.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     4
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Select Required Syntax</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        The generator produces both standard Meta tags and Open Graph (og:) tags simultaneously. It also
                        includes specific Twitter Card properties to ensure maximum platform compatibility.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     5
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Copy and Paste to Head</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Click "Copy Code" to grab the entire block of validated HTML. Paste these tags directly into the{' '}
                        <code className="text-indigo-400">&lt;head&gt;</code> section of your webpage to enable rich
                        sharing.
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
               <p className="text-muted-foreground">Detailed insights into Open Graph meta behavior.</p>
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
               <div className="space-y-3">
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                     Is my input data saved?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-indigo-500/20">
                     To improve your experience, your input data is saved locally in your browser using localStorage.
                     This is entirely client-side, meaning your data never leaves your device. You can opt-out of this
                     behavior at any time by disabling the 'Persist Data' switch in the tool settings.
                  </p>
               </div>
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-indigo-600 rounded-3xl p-12 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <h2 className="text-3xl font-bold text-white relative z-10 mb-4">Start Generating Schema</h2>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Generate" />
            </div>
         </div>
      </article>
   );
}
