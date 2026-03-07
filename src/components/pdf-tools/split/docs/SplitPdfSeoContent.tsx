import { Scissors, Shield, Zap, FileText, Download, Sparkles } from 'lucide-react';
import { ScrollToTopButton } from '../../../ScrollToTopButton';

export function SplitPdfSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'How do I select which pages to extract?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'You can specify page ranges (e.g., 1-5), individual pages (e.g., 3, 7, 12), or a combination of both. The tool also supports extracting every Nth page.',
            },
         },
         {
            '@type': 'Question',
            name: 'Is there a page limit?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: "No hard limit. Since processing is client-side, the practical limit depends on your device's memory. Most devices handle PDFs with hundreds of pages easily.",
            },
         },
         {
            '@type': 'Question',
            name: 'Are my PDFs uploaded to a server?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'No. All splitting happens entirely in your browser. Your PDF files never leave your device.',
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
               <Scissors className="w-3.5 h-3.5" />
               PDF Splitter
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Split PDF Pages — <span className="text-indigo-500">Free & Private</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Extract specific pages or ranges from any PDF file. Select exactly what you need and download a new,
               smaller PDF — all processed in your browser.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Scissors className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Flexible Selection</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Pick individual pages, ranges, or combinations. Extract exactly the pages you need from any PDF.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Instant Processing</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Client-side processing means your pages are extracted in seconds, regardless of your internet speed.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Secure & Private</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Your PDFs never leave your device. No server, no upload, no data retention — complete privacy.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">How It Works</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Three simple steps to extract the pages you need.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: FileText,
                        title: 'Upload Your PDF',
                        desc: 'Drag and drop or click to select the PDF file you want to split.',
                     },
                     {
                        icon: Scissors,
                        title: 'Select Pages',
                        desc: 'Choose individual pages, ranges (e.g. 1-5), or a combination.',
                     },
                     {
                        icon: Download,
                        title: 'Split & Download',
                        desc: 'Click split and download your new PDF with only the selected pages.',
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
                     Use <strong>page ranges</strong> like <code className="text-indigo-400">1-5, 10, 15-20</code> to
                     extract non-contiguous pages in a single operation.
                  </p>
                  <p>
                     Since processing is <strong>browser-based</strong>, the tool works even when you&apos;re offline —
                     perfect for working on the go.
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
               <p className="text-muted-foreground">Everything you need to know about splitting PDFs.</p>
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
            <h2 className="text-3xl font-bold text-white relative z-10">Ready to split your PDF?</h2>
            <p className="text-indigo-100 max-w-xl mx-auto relative z-10">
               Upload and extract the pages you need. No sign-up, no watermarks, total privacy.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Start Splitting" />
            </div>
         </div>
      </article>
   );
}
