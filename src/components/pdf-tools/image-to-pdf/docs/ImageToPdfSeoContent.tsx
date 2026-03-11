import { Image as ImageIcon, Shield, Zap, Download, Layers, Sparkles } from 'lucide-react';
import { ScrollToTopButton } from '../../../ScrollToTopButton';

export function ImageToPdfSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'How do I convert images to a PDF?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Simply drag and drop your JPEG or PNG images into the dropzone. You can reorder the images by dragging them around, and then click "Convert to PDF" to instantly generate your multi-page document.',
            },
         },
         {
            '@type': 'Question',
            name: 'Does the PDF preserve my original image size and quality?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes! Our converter natively embeds your JPEG/PNG files into the PDF without aggressive compression or quality loss. The PDF page sizes are also automatically tailored exactly to your image dimensions.',
            },
         },
         {
            '@type': 'Question',
            name: 'Are my images uploaded to a server?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'No. The entire conversion process occurs entirely inside your web browser. DevEditor uses client-side WebAssembly rendering, guaranteeing complete privacy and offline capabilities.',
            },
         },
         {
            '@type': 'Question',
            name: 'Is there a limit on how many images I can merge?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'There is no hard limit imposed by our tool. However, browser memory limitations may affect extremely large queues depending on your device RAM.',
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
               <Layers className="w-3.5 h-3.5" />
               Image Conversion
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Image to <span className="text-indigo-500">PDF</span> Converter
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Combine multiple JPG or PNG images into a single, high-quality PDF document. 100% secure and executed entirely within your browser.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Perfect Dimensions</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Forget white borders or stretched pixels. The resulting PDF generates custom page sizes to exactly match each embedded image's dimensions.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Lightning Fast</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Conversions are calculated locally in your machine's memory, bypassing slow server uploads and allowing instant downloads.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">100% Private</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Zero backends. Total client-side execution means your photos stay exclusively on your personal device.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">How It Works</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Turn your photos into a distributable document securely.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: ImageIcon,
                        title: '1. Select Images',
                        desc: 'Drag and drop your JPEG or PNG photos into the designated zone.',
                     },
                     {
                        icon: Layers,
                        title: '2. Reorder Queue',
                        desc: 'Click and drag the image thumbnails to adjust the order they will appear sequentially in the PDF.',
                     },
                     {
                        icon: Download,
                        title: '3. Convert & Download',
                        desc: 'Click Download to instantly generate your new PDF right inside the browser.',
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
                     If you only want to convert a single image, that's completely fine! The tool will smartly generate a fast one-page document named after your image.
                  </p>
                  <p>
                     When converting multiple images, they will merge sequentially into a single file named `images_merged.pdf`. 
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
               <p className="text-muted-foreground">Everything you need to know about merging images to PDF safely.</p>
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
            <h2 className="text-3xl font-bold text-white relative z-10">Convert Images Instantly</h2>
            <p className="text-indigo-100 max-w-xl mx-auto relative z-10">
               Safely merge your photos into a high-fidelity PDF document. 100% private, runs directly in your browser.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Start" />
            </div>
         </div>
      </article>
   );
}
