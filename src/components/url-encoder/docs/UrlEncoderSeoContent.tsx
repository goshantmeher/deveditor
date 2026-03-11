import { Link2, Zap, ShieldCheck, Globe, Sparkles, Table2, Code2 } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function UrlEncoderSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'What is the difference between encodeURI and encodeURIComponent?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'encodeURIComponent encodes all special characters including :, /, ?, #, &, and =. encodeURI preserves these characters, making it suitable for encoding full URLs while encodeURIComponent is better for encoding individual query parameter values.',
            },
         },
         {
            '@type': 'Question',
            name: 'Does this tool send my URLs to a server?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'No. All encoding, decoding, and URL parsing happens entirely in your browser using native JavaScript APIs. No data is ever transmitted to any server.',
            },
         },
         {
            '@type': 'Question',
            name: 'Can I edit query parameters individually?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes. The URL Parser tab breaks down any URL into its components and displays query parameters in an editable table. You can add, remove, or modify parameters and the rebuilt URL updates in real-time.',
            },
         },
         {
            '@type': 'Question',
            name: 'What characters does URL encoding replace?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'URL encoding (percent-encoding) replaces unsafe characters with a % followed by two hexadecimal digits. For example, spaces become %20, ampersands become %26, and angle brackets become %3C and %3E.',
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
               <Link2 className="w-3.5 h-3.5" />
               URL Processing
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               URL Encoder / <span className="text-indigo-500">Decoder</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Encode and decode URI components, parse full URLs into their building blocks, edit query parameters
               individually, and rebuild clean URLs — all without leaving your browser.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">3 Encoding Modes</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Choose between <code className="text-indigo-400">encodeURIComponent</code>,{' '}
                  <code className="text-indigo-400">encodeURI</code>, or space-only encoding depending on your use case.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">100% Client-Side</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Your URLs, API keys, and tokens never leave your browser. All processing uses native JavaScript APIs
                  with zero server interaction.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">URL Parser & Builder</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Paste any URL to instantly see protocol, host, path, and query parameters in an editable table. Modify
                  params and rebuild the URL live.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Built for Developers</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Whether you&apos;re debugging redirect URLs, constructing API requests, or decoding query strings from
                  log files — this tool handles it all with precision.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Code2,
                        title: 'Instant Encode/Decode',
                        desc: 'Real-time conversion as you type. Switch between encode and decode with one click.',
                     },
                     {
                        icon: Table2,
                        title: 'Query Parameter Editor',
                        desc: 'View, add, edit, and remove individual query parameters from any URL.',
                     },
                     {
                        icon: Link2,
                        title: 'URL Component Breakdown',
                        desc: 'See protocol, hostname, port, pathname, hash, and origin at a glance.',
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
                     Quick Reference
                  </span>
               </div>
               <div className="space-y-3 font-mono text-sm">
                  {[
                     { char: 'Space', encoded: '%20', alt: '+' },
                     { char: '&', encoded: '%26', alt: '' },
                     { char: '=', encoded: '%3D', alt: '' },
                     { char: '?', encoded: '%3F', alt: '' },
                     { char: '#', encoded: '%23', alt: '' },
                     { char: '/', encoded: '%2F', alt: '' },
                     { char: '@', encoded: '%40', alt: '' },
                     { char: ':', encoded: '%3A', alt: '' },
                  ].map((item, i) => (
                     <div key={i} className="flex items-center gap-3 text-muted-foreground">
                        <span className="text-xs w-16 text-foreground font-bold">{item.char}</span>
                        <span className="text-indigo-400 font-bold">{item.encoded}</span>
                        {item.alt && (
                           <span className="text-xs text-muted-foreground/60">
                              (or <code className="text-indigo-400/60">{item.alt}</code> in query strings)
                           </span>
                        )}
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
               How to Encode & Decode URLs
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     1
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Select Processing Mode</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Choose between "Encode" or "Decode" using the toggle in the header. Use the "Swap" icon to
                        instantly reverse your current input/output data direction.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     2
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Enter Your String or URL</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Paste your raw text or encoded URL into the top editor. The results will process in real-time as
                        you type, appearing in the bottom editor pane.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     3
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Configure Encoding Rules</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Adjust settings like "Encode All Special Characters" (using{' '}
                        <code className="text-indigo-400">encodeURIComponent</code> logic) or "Preserve URI Structure"
                        depending on whether you are encoding a full URL or just a parameter.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     4
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Use the URL Parser Tab</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        For complex URLs, switch to the "URL Parser" tab. It automatically breaks down the string into
                        editable query parameters, protocol, and path segments for granular debugging.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     5
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Copy the Clean Results</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Once satisfied with the output, use the "Copy" button to retrieve the processed URL. All history
                        is saved locally if you need to access previous transformations.
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
               <p className="text-muted-foreground">Everything you need to know about URL encoding and decoding.</p>
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
         <div className="bg-indigo-600 rounded-3xl p-12 text-center space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <h2 className="text-3xl font-bold text-white relative z-10">Stop debugging encoded URLs manually</h2>
            <p className="text-indigo-100 max-w-xl mx-auto relative z-10">
               Encode, decode, parse, and rebuild URLs instantly. No login required, total privacy guaranteed.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Start Encoding" />
            </div>
         </div>
      </article>
   );
}
