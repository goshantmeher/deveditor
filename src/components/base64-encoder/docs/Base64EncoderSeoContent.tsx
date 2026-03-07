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
