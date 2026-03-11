import { ArrowRightLeft, ShieldCheck, Zap, Tags, Hash, Braces, Table2 } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function HtmlEntityConverterSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'What are HTML entities?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'HTML entities are special string sequences starting with an ampersand (&) and ending with a semicolon (;). They are used to represent characters like <, >, and & which would otherwise be interpreted as HTML markup by the browser.',
            },
         },
         {
            '@type': 'Question',
            name: 'When should I encode to HTML entities?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'You should encode HTML entities whenever you display user input on a web page, or when you need to render reserved HTML characters (like angle brackets) as raw text inside HTML tags.',
            },
         },
         {
            '@type': 'Question',
            name: 'Are my texts sent to a server for decoding?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'No. This tool processes all text conversion entirely inside your browser. Your strings and code are never transmitted to our servers.',
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
               <Tags className="w-3.5 h-3.5" />
               Entity Converter
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               HTML Entity <span className="text-indigo-500">Encoder / Decoder</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Convert special characters like <code className="text-indigo-400 font-bold">&lt; &gt; &amp;</code> to
               their HTML entities securely in your browser. Decode raw elements instantly to clean, readable text.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ArrowRightLeft className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Bi-Directional</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Encode plain text into safe HTML entities, or decode raw entities back into readable text securely
                  inline.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Client-Side Privacy</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Your raw HTML and text strings never leave your browser. Zero server interaction ensures your
                  proprietary code is safe.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Table2 className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Built-in Reference</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Access a full table of the most common named HTML entities directly inside the tool to insert symbols
                  quickly.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Secure your HTML</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Protect your site against Cross-Site Scripting (XSS) by correctly encoding user input, or safely
                  format code blocks containing raw HTML tags without the browser parsing them.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Tags,
                        title: 'Named Entities',
                        desc: 'Encodes characters to their named equivalents like &amp;lt; and &amp;copy;.',
                     },
                     {
                        icon: Hash,
                        title: 'Numeric Mode',
                        desc: 'Offers strict numeric encoding (e.g. &amp;#60; instead of &amp;lt;) for wider compatibility.',
                     },
                     {
                        icon: Zap,
                        title: 'Instant Execution',
                        desc: 'Transforms multiline raw HTML immediately as you paste without lag.',
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
                  <Braces className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                     Common Entities
                  </span>
               </div>
               <div className="space-y-3 font-mono text-sm">
                  {[
                     { sym: '<', code: '&lt;' },
                     { sym: '>', code: '&gt;' },
                     { sym: '&', code: '&amp;' },
                     { sym: '"', code: '&quot;' },
                     { sym: "'", code: '&apos;' },
                     { sym: '©', code: '&copy;' },
                     { sym: '€', code: '&euro;' },
                  ].map((item, i) => (
                     <div key={i} className="flex items-center gap-3 text-muted-foreground">
                        <span className="text-xl w-8 text-foreground text-center">{item.sym}</span>
                        <span className="text-xs w-16 text-indigo-400 font-bold">{item.code}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
               How to Convert HTML Entities
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     1
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Choose Encode or Decode Mode</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Select "Encode" to convert special symbols into safe HTML strings, or "Decode" to transform raw
                        entities like <code className="text-indigo-400">&amp;lt;</code> back into their original visual
                        form.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     2
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Input Your Target Content</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Paste your raw HTML snippet, variable names, or text containing special characters into the
                        source editor. The tool supports multi-line conversion without any lag.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     3
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Select Mapping Schema (Numeric/Named)</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        When encoding, choose between Named entities (friendly strings like{' '}
                        <code className="text-indigo-400">&amp;amp;</code>) or Numeric entities (e.g.,{' '}
                        <code className="text-indigo-400">&amp;#38;</code>) for stricter compatibility requirements.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     4
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Instant Live Preview</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Observe the output area simultaneously. The tool re-tokenizes your input on every keystroke,
                        ensuring you can verify the conversion mapping in real-time before exporting.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     5
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Copy Your Secured Result</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Click the "Copy" icon to move the result to your clipboard. You can now safely paste it into
                        your HTML source files, email templates, or database records.
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
               <p className="text-muted-foreground">Everything you need to know about HTML entities.</p>
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
            <h2 className="text-3xl font-bold text-white relative z-10">Start encoding safely</h2>
            <p className="text-indigo-100 max-w-xl mx-auto relative z-10">
               Convert standard code blocks to safe string representations securely in your browser.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Convert" />
            </div>
         </div>
      </article>
   );
}
