import { Image as ImageIcon, ShieldCheck, Zap, SlidersHorizontal, FileDown, BarChart3, Sparkles } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function ImageCompressorSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'Are my images uploaded to a server?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Never. Your images never leave your browser. DevEditor compresses images 100% client-side using HTML5 Canvas APIs. Your files stay on your device.',
            },
         },
         {
            '@type': 'Question',
            name: 'What image formats are supported?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'We support JPEG, PNG, and WebP for both input and output. You can compress and convert between these formats with an adjustable quality slider.',
            },
         },
         {
            '@type': 'Question',
            name: 'Is my input data saved?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'To improve your experience, your format and quality settings are saved locally in your browser using localStorage. This is entirely client-side — your data never leaves your device. You can opt-out by disabling the "Persist Data" switch in tool settings.',
            },
         },
         {
            '@type': 'Question',
            name: 'Why is my PNG output larger than the original?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'PNG is a lossless format that does not support a quality slider. If you need smaller files, export as WebP or JPEG instead — both support adjustable quality compression.',
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
               <ImageIcon className="w-3.5 h-3.5" />
               Media Optimizer
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Client-Side <span className="text-indigo-500">Image Compressor</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Compress JPEG, PNG, and WebP images with an adjustable quality slider.
               See before/after comparison and file size savings — all processed locally in your browser.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <SlidersHorizontal className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Quality Slider</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Fine-tune compression with a 1–100% quality control. Balance file size and visual fidelity for WebP and JPEG exports.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">100% Client-Side</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  All processing happens in your browser. Images never leave your device. Privacy and speed combined.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Before/After Comparison</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  See original and compressed side-by-side with file size and savings percentage displayed instantly.
               </p>
            </div>
         </div>

         {/* Visual/Detail Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Optimize for Any Use Case</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Whether you&apos;re optimizing images for web performance, reducing email attachment sizes, or preparing assets for deployment — this tool gives you full control over the output.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: FileDown,
                        title: 'Format Conversion',
                        desc: 'Convert between JPEG, PNG, and WebP. Choose the best format for your target platform.',
                     },
                     {
                        icon: Zap,
                        title: 'Instant Results',
                        desc: 'Compression happens in real-time as you adjust settings. No waiting for server responses.',
                     },
                     {
                        icon: ImageIcon,
                        title: 'Visual Quality Check',
                        desc: 'Compare original and compressed previews side-by-side to verify quality before downloading.',
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
                     For web assets, <code className="text-indigo-400">WebP</code> at 75–85% quality typically offers the best balance of file size and visual fidelity — often 30–50% smaller than equivalent JPEG files.
                  </p>
                  <p>
                     Use <code className="text-indigo-400">PNG</code> only when you need lossless output or transparency. For everything else, WebP or JPEG will produce significantly smaller files.
                  </p>
               </div>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8 border-t border-border/50 pt-24">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">How to Compress Images</h2>
            <div className="max-w-4xl mx-auto space-y-6">
               {[
                  { n: 1, color: 'indigo', t: 'Upload an Image', d: 'Drag and drop or click to select a JPEG, PNG, or WebP file.' },
                  { n: 2, color: 'emerald', t: 'Adjust Quality & Format', d: 'Choose output format (WebP, JPEG, PNG) and use the quality slider to control compression level.' },
                  { n: 3, color: 'amber', t: 'Download Result', d: 'Compare before/after previews and file sizes, then download the compressed image when satisfied.' },
               ].map(({ n, color, t, d }) => (
                  <div key={n} className="flex gap-4">
                     <div className={`w-8 h-8 rounded-full bg-${color}-500/10 text-${color}-400 flex items-center justify-center font-bold font-mono shrink-0`}>{n}</div>
                     <div>
                        <h4 className="font-bold text-foreground text-lg mb-1">{t}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{d}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* FAQ Section */}
         <div className="space-y-12 border-t border-border/50 pt-24">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
               {faqSchema.mainEntity.map((faq: { name: string; acceptedAnswer: { text: string } }, i: number) => (
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
         <div className="bg-indigo-600 rounded-3xl p-12 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <div className="relative z-10 space-y-6">
               <h2 className="text-3xl font-bold text-white">Compress Images Privately</h2>
               <p className="text-indigo-100 max-w-xl mx-auto">
                  Reduce file sizes without sacrificing quality. No uploads, no accounts — runs entirely in your browser.
               </p>
               <div className="pt-4">
                  <ScrollToTopButton label="Scroll up to Compress" />
               </div>
            </div>
         </div>
      </article>
   );
}
