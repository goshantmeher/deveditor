import { Image as ImageIcon, ShieldCheck, Zap } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function ImageConverterSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'Are my images uploaded to a server?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Never. Your images never leave your desktop. DevEditor processes cropping and compression using advanced HTML5 Canvas APIs securely within your local active web browser environment guaranteeing complete data sovereignty.',
            },
         },
         {
            '@type': 'Question',
            name: 'Why should I convert images to WebP?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'WebP formats provide vastly superior mathematical compression algorithms compared to older standard JPEGs natively, creating identical visual quality elements at roughly 30% to 50% smaller disk payloads. This dramatically decreases website load latency.',
            },
         },
         {
            '@type': 'Question',
            name: 'Does it support transparent backgrounds?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes! If you upload a PNG document featuring alpha-transparency channels and compress that file directly back into another PNG or a WebP element, the background matrix will effortlessly persist correctly.',
            },
         },
      ],
   };

   return (
      <article className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

         {/* Hero Section */}
         <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
               <ImageIcon className="w-3.5 h-3.5" />
               Media Optimizer
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Local Image <span className="text-orange-500">Converter</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Securely crop, compress, explicitly resize, and cross-convert visual image files into efficient WebP
               rendering payloads securely within your local browser runtime.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-orange-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-6 h-6 text-orange-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Next-Gen WebP Engine</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Export robust visual payloads seamlessly towards the ultra-efficient WebP file container seamlessly
                  preventing Google Lighthouse speed index warnings entirely.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Zero Cloud Spying</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  All massive binary matrix payloads are executed privately natively via browser background workers
                  directly preventing external leakage.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Visual Cropping Pipeline</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Avoid guessing coordinate mathematics. Outline highly exact sub-sections of uploaded textures easily
                  alongside rigid aspect ratio bindings natively.
               </p>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
               How to Convert & Resize Images
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold font-mono shrink-0">
                     1
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Upload an Image</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Drag and drop your source file (PNG, JPEG, WebP) directly into the Right Workspace box. A
                        preview and interactive bounding box will load instantly.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold font-mono shrink-0">
                     2
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Cropping & Composition (Optional)</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Drag the handles over the visual preview to crop your image. You can lock the aspect ratio using
                        the preset options (1:1, 16:9, etc.) above the preview to maintain standard proportions.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold font-mono shrink-0">
                     3
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Define Output Settings</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        On the left settings pane, select your desired Export Format (WebP is highly recommended for web
                        usage) and adjust the compression Quality slider based on your preferred file size targets.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold font-mono shrink-0">
                     4
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Explicit Resizing (Optional)</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        The dimensions automatically update to reflect your crop box percent scale. You can manually
                        type specific width and height values to force an exact output resolution, or use the Scale
                        dropdown to instantly apply 2x, 0.5x, etc., multipliers.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center font-bold font-mono shrink-0">
                     5
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Generate & Download</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Click "Generate Output". Your image is instantly processed 100% locally within your browser tab.
                        A final preview will render along with its optimized file size. Click Download to save the
                        resulting optimized image!
                     </p>
                  </div>
               </div>
            </div>
         </div>

         {/* FAQ Section */}
         <div className="space-y-12 border-t border-border/50 pt-24">
            <div className="text-center space-y-4">
               <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
                  {' '}
                  Frequently Asked Questions{' '}
               </h2>
               <p className="text-muted-foreground text-center">Notes regarding the underlying optimization logic.</p>
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
         <div className="bg-orange-600 rounded-3xl p-12 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <div className="relative z-10 space-y-6">
               <h2 className="text-3xl font-bold text-white mb-4">Start Processing Safely</h2>
               <div className="pt-4">
                  <ScrollToTopButton label="Scroll up to the converter workspace" />
               </div>
            </div>
         </div>
      </article>
   );
}
