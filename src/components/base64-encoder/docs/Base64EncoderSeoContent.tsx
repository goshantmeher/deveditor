import { ShieldCheck, Zap, ExternalLink, Cpu, Database, Code2 } from 'lucide-react';

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
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-24">
         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
               __html: JSON.stringify(faqSchema),
            }}
         />

         {/* Hero Section */}
         <section className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
               Secure & Reliable Base64 Encoding
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
               Convert binary data to text and back instantly. Support for standard, URL-safe, and data URI formats—all
               processed entirely client-side.
            </p>
         </section>

         {/* Features Grid */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-2xl border border-border/50 space-y-4">
               <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500">
                  <Cpu className="w-5 h-5" />
               </div>
               <h3 className="text-lg font-bold">Binary Support</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">
                  Easily encode images, fonts, and other binary files into portable text strings or Data URIs for
                  embedding in code.
               </p>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border/50 space-y-4">
               <div className="w-10 h-10 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-500">
                  <ExternalLink className="w-5 h-5" />
               </div>
               <h3 className="text-lg font-bold">URL-Safe Mode</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">
                  Swap common separators with safe alternatives to ensure your tokens and segments work perfectly in web
                  routes and filenames.
               </p>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border/50 space-y-4">
               <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                  <ShieldCheck className="w-5 h-5" />
               </div>
               <h3 className="text-lg font-bold">Privacy First</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">
                  Your data is your business. All encoding and decoding logic runs locally in your browser—nothing is
                  ever uploaded.
               </p>
            </div>
         </div>

         {/* Main Content Deep Dive */}
         <div className="space-y-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="space-y-6">
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                     <Database className="w-6 h-6 text-indigo-500" />
                     Enterprise Data Support
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                     From JWT header segments to binary image blobs, our engine handles a wide range of encoding
                     priorities with high-performance throughput.
                  </p>
                  <ul className="space-y-3">
                     {[
                        'UTF-8, ASCII, and Latin-1 support',
                        'Automatic padding handling',
                        'Live preview for decoded image data',
                        'Ready-to-use Data URI generation',
                     ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                           <Zap className="w-4 h-4 text-indigo-400 shrink-0" />
                           <span>{item}</span>
                        </li>
                     ))}
                  </ul>
               </div>
               <div className="bg-muted/50 rounded-3xl p-8 border border-border">
                  <div className="aspect-video bg-background rounded-2xl flex items-center justify-center border border-border/50 relative overflow-hidden group">
                     <Code2 className="w-24 h-24 text-indigo-500/25 group-hover:text-indigo-500/40 group-hover:scale-110 transition-all duration-500" />
                     <div className="absolute inset-0 bg-linear-to-tr from-indigo-500/15 to-transparent pointer-events-none" />
                  </div>
               </div>
            </div>
         </div>

         {/* FAQ/Guide Section */}
         <section className="bg-muted/20 border border-border/30 rounded-3xl p-8 md:p-12 space-y-8">
            <h3 className="text-2xl font-bold text-center">Frequently Asked Questions</h3>
            <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-3">
                  <h4 className="font-bold">What is Data URI?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     A Data URI allows you to embed files (like small icons or CSS fonts) directly into your HTML/CSS
                     code, reducing the number of HTTP requests your site needs to make.
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="font-bold">Standard vs URL-Safe?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     Standard Base64 is used for most files and basic auth. URL-safe is preferred for tokens, web hooks,
                     and identifiers that pass through browser address bars.
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="font-bold">Supported File Types?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     Any binary or text file under 10MB. Common types include PNG, SVG, PDF, and JSON payloads. Large
                     files may be slower on mobile devices.
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="font-bold">Is it private?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     Absolutely. Unlike most online encoders, DevEditor processes every byte inside your browser's
                     Javascript engine. No server interaction required.
                  </p>
               </div>
            </div>
         </section>

         {/* Bottom CTA */}
         <div className="text-center space-y-6 pt-12">
            <h3 className="text-xl font-bold italic text-muted-foreground/60 tracking-wider uppercase">
               Effortless Data Transformation
            </h3>
            <div className="h-1 w-24 bg-linear-to-r from-transparent via-indigo-500/50 to-transparent mx-auto" />
         </div>
      </div>
   );
}
