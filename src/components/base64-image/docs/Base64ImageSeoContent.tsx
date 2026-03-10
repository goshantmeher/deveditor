import { Image as ImageIcon, ShieldCheck, UploadCloud } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function Base64ImageSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'Is my Base64 image uploaded when I convert it?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'No. Every single byte is processed entirely client-side internally within your web browser. We use native browser Data URIs to render the preview, meaning zero data is transferred over the network.',
            },
         },
         {
            '@type': 'Question',
            name: 'Can I decode base64 image strings without a Data URI?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes. If your Base64 string lacks a standard Data URI prefix (e.g., data:image/png;base64,...), our decoder attempts to identify the image type (JPEG, PNG, GIF, WebP, SVG) through unique Base64 headers before previewing.',
            },
         },
         {
            '@type': 'Question',
            name: 'Why is my image not previewing?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'If your image fails to preview, the Base64 string might be malformed, corrupted, or it may not represent a valid image file. Make sure you copied the entire sequence without missing characters.',
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
               <ImageIcon className="w-3.5 h-3.5" />
               Image Decoder
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Base64 to <span className="text-emerald-500">Image</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Instantly preview and securely download Base64 image strings right inside your browser. Build perfectly private frontends without network requests.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Live Preview</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  See the decoded image dynamically. Whether it is an embedded SVG, PNG, WebP, or JPEG, it renders instantly on a checkerboard background.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">100% Secure</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Your image files are completely private. We do not upload anything. The image preview is constructed using raw memory locally.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Extracted Downloads</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  If you need to recover an image from a stylesheet, CSS snippet, or inline JSON configuration, paste the data URI and download the clean asset.
               </p>
            </div>
         </div>

         {/* FAQ Section */}
         <div className="space-y-12 border-t border-border/50 pt-24">
            <div className="text-center space-y-4">
               <h2 className="text-3xl font-bold tracking-tight text-foreground text-center"> Frequently Asked Questions </h2>
               <p className="text-muted-foreground text-center">Important notes regarding rendering logic.</p>
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
               <div className="space-y-3">
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                     Is my input data saved?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-emerald-500/20">
                     To improve your experience, your input data is saved locally in your browser using localStorage. This is entirely client-side, meaning your data never leaves your device. You can opt-out of this behavior at any time by disabling the 'Persist Data' switch in the tool settings.
                  </p>
               </div>
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-emerald-600 rounded-3xl p-12 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <div className="relative z-10 space-y-6">
               <h2 className="text-3xl font-bold text-white mb-4">Preview Your Assets Independently</h2>
               <div className="pt-4">
                  <ScrollToTopButton label="Scroll up to Start visualizer" />
               </div>
            </div>
         </div>
      </article>
   );
}
