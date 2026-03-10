import { FileJson, ShieldCheck, Zap } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function Base64FileSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'Are my files uploaded when I convert them?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'No. Every single byte is processed entirely client-side internally within your web browser. DevEditor uses the native JavaScript FileReader API, which ensures zero data transfer over any network.',
            },
         },
         {
            '@type': 'Question',
            name: 'Can I decode base64 strings without a Data URI?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes. If your Base64 string lacks a standard Data URI prefix (e.g., data:image/png;base64,...), our decoder uses a fallback algorithm that still successfully converts the raw string back into a downloadable binary blob.',
            },
         },
         {
            '@type': 'Question',
            name: 'Is there a file size limit?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Technically no, but heavily bound by your system memory (RAM). Browsers may crash if you attempt to Base64 encode very large files (e.g., > 100MB video files) using pure frontend memory.',
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
               <FileJson className="w-3.5 h-3.5" />
               Binary Data Editor
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Base64 File <span className="text-indigo-500">Encoder</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Convert any image, document, or archive straight into Base64 format perfectly, and decode raw Base64 data securely back into original download files locally.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileJson className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Any File Type</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Support for PDFs, JPEG/PNG images, WebP, ZIP archives, MP3 audio, and more. If it is a file, we encode it.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Secure Privacy</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Every calculation is strictly local. Your private documents never cross the network, making this safe for corporate or sensitive assets.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Bi-Directional</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Two modes baked into one workspace. Convert files to Base64 strings, or paste a massive Base64 string to download the original file intact.
               </p>
            </div>
         </div>

         {/* FAQ Section */}
         <div className="space-y-12 border-t border-border/50 pt-24">
            <div className="text-center space-y-4">
               <h2 className="text-3xl font-bold tracking-tight text-foreground text-center"> Frequently Asked Questions </h2>
               <p className="text-muted-foreground text-center">Important notes regarding file format architecture.</p>
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
                     To improve your experience, your input data is saved locally in your browser using localStorage. This is entirely client-side, meaning your data never leaves your device. You can opt-out of this behavior at any time by disabling the 'Persist Data' switch in the tool settings.
                  </p>
               </div>
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-indigo-600 rounded-3xl p-12 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <div className="relative z-10 space-y-6">
               <h2 className="text-3xl font-bold text-white mb-4">Start Decoding Files Securely</h2>
               <div className="pt-4">
                  <ScrollToTopButton label="Scroll up to Start encoding" />
               </div>
            </div>
         </div>
      </article>
   );
}
