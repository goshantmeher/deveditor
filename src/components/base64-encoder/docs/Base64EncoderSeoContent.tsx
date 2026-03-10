import { Code2, Zap, ShieldCheck, Lock, ExternalLink, Cpu, Sparkles } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function Base64EncoderSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'What is Base64 encoding used for?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Base64 is used to encode binary data into a string format that can be safely transmitted over media that only supports text, such as HTTP headers, JSON bodies, or HTML data URIs.',
            },
         },
         {
            '@type': 'Question',
            name: 'Is Base64 encryption?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'No. Base64 is an encoding scheme, not encryption. It is used to transform data, not to hide it. Anyone can decode it easily.',
            },
         },
         {
            '@type': 'Question',
            name: 'What is URL-safe Base64?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Standard Base64 uses characters like `+` and `/` which are reserved in URLs. URL-safe Base64 replaces these with `-` and `_` to ensure they are parsed correctly by browsers and web servers.',
            },
         },
         {
            '@type': 'Question',
            name: 'Is my input data saved?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: "To improve your experience, your input data is saved locally in your browser using localStorage. This is entirely client-side, meaning your data never leaves your device. You can opt-out of this behavior at any time by disabling the 'Persist Data' switch in the tool settings.",
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
               <Lock className="w-3.5 h-3.5" />
               Encoding & Decoding
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Base64 Encoder & <span className="text-indigo-500">Decoder</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Convert binary data to text and back instantly. Support for standard, URL-safe, and data URI formats—all
               processed entirely client-side.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Binary Support</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Easily encode images, fonts, and other binary files into portable text strings or Data URIs for
                  embedding in code.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ExternalLink className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">URL-Safe Mode</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Swap common separators with safe alternatives to ensure your tokens and segments work perfectly in web
                  routes and filenames.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Privacy First</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Your data is your business. All encoding and decoding logic runs locally in your browser—nothing is
                  ever uploaded.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Enterprise Data Support</h2>
               <p className="text-muted-foreground leading-relaxed">
                  From JWT header segments to binary image blobs, our engine handles a wide range of encoding priorities
                  with high-performance throughput.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Code2,
                        title: 'UTF-8, ASCII & Latin-1',
                        desc: 'Full multi-encoding support for international and legacy character sets.',
                     },
                     {
                        icon: Zap,
                        title: 'Automatic Padding',
                        desc: 'Handles Base64 padding characters correctly for both standard and URL-safe modes.',
                     },
                     {
                        icon: Cpu,
                        title: 'Data URI Generation',
                        desc: 'Encode files directly into ready-to-use data: URIs for embedding in HTML and CSS.',
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
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Pro Tip</span>
               </div>
               <div className="prose prose-invert prose-sm">
                  <p>
                     Use <strong>URL-Safe mode</strong> when encoding tokens for JWTs or web routes. It replaces{' '}
                     <code className="text-indigo-400">+</code> with <code className="text-indigo-400">-</code> and{' '}
                     <code className="text-indigo-400">/</code> with <code className="text-indigo-400">_</code> to avoid
                     breaking URL parsers.
                  </p>
                  <p>
                     For embedding small images in CSS, try the <strong>Data URI</strong> tab — it generates the
                     complete <code className="text-indigo-400">data:image/...</code> string ready to paste.
                  </p>
               </div>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">How to Encode & Decode Base64</h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">1</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Choose Your Direction</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Toggle between "Encode" and "Decode" modes in the top workspace settings. If you already have data in the editors, use the "Swap" button to instantly reverse the operation.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">2</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Input Your Data</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Paste your raw text or Base64 string into the input editor. You can also drag and drop text files directly into the pane to instantly load their contents for processing.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">3</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Select Encoding Variety</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Use the settings panel to choose between "Standard" Base64 or "URL-Safe" (which swaps <code className="text-indigo-400">+</code> and <code className="text-indigo-400">/</code>). You can also toggle "Data URI" mode to generate strings ready for HTML <code className="text-indigo-400">src</code> attributes.</p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">4</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Verify Output Line Breaks</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">If you need the Base64 output to follow a specific line-length limit (e.g., for PEM files or email headers), enable the "Wrap Lines" option in the configuration drawer.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">5</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Export Optimized String</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">The result appears instantly in the bottom pane. Click the "Copy" icon or download the result as a text document for use in your codebases or API requests.</p>
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
               <p className="text-muted-foreground">Everything you need to know about Base64 encoding.</p>
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
            <h2 className="text-3xl font-bold text-white relative z-10">Effortless Data Transformation</h2>
            <p className="text-indigo-100 max-w-xl mx-auto relative z-10">
               Encode and decode Base64 data instantly. No sign-up, no server — just paste and go.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Start Encoding" />
            </div>
         </div>
      </article>
   );
}
