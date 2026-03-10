import { FileOutput, Shield, Zap, FileText, Download, Sparkles } from 'lucide-react';
import { ScrollToTopButton } from '../../../ScrollToTopButton';

export function ExtractPdfSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'What does Extract do?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Extract allows you to pull specific page ranges from a PDF and save them as a new, standalone document. Perfect for extracting chapters, invoices, or specific sections.',
            },
         },
         {
            '@type': 'Question',
            name: 'Is there a file size limit?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: "No hard limit. Processing happens in your browser, so the practical limit depends on your device's memory.",
            },
         },
         {
            '@type': 'Question',
            name: 'Is my data secure?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes. All extraction happens in your browser. Your PDF files are never uploaded to any server.',
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
               <FileOutput className="w-3.5 h-3.5" />
               PDF Extractor
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Extract PDF Pages — <span className="text-indigo-500">Fast & Secure</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Pull specific pages from any PDF and save them as a new document. Select page ranges or individual pages
               — all processed locally in your browser.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileOutput className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Page Extraction</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Extract chapters, invoices, or specific sections from large PDFs into clean, standalone documents.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Instant Processing</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Client-side extraction means your pages are ready in seconds. No upload, no waiting for server
                  processing.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Complete Privacy</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Your PDFs never leave your device. Processing happens entirely in your browser — no server involved.
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
                        desc: 'Drag and drop or click to select your PDF file.',
                     },
                     {
                        icon: FileOutput,
                        title: 'Select Pages',
                        desc: 'Choose specific pages or ranges to extract from the document.',
                     },
                     {
                        icon: Download,
                        title: 'Extract & Download',
                        desc: 'Click extract and download your new PDF with only the selected pages.',
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
                     Use <strong>Extract</strong> to pull only the pages you need from a large report or contract,
                     saving storage and making sharing easier.
                  </p>
                  <p>
                     Since processing is <strong>100% client-side</strong>, your sensitive documents like contracts and
                     financial statements stay completely private.
                  </p>
               </div>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">How to Extract PDF Pages</h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-mono shrink-0">1</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Select Source Document</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Upload the PDF file you wish to extract pages from. The browser immediately generates a preview of the document structure for your review.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-mono shrink-0">2</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Define Page Ranges</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Enter the specific pages or numeric ranges (e.g., "1-5, 8") you want to keep. The tool isolates these sections while discarding the rest of the document.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-mono shrink-0">3</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Review Selection Preview</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Double-check the page count and order of your extraction. This ensures that the resulting PDF will contain exactly the information you need for your report or filing.</p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-mono shrink-0">4</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Generate New Document</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Click the "Extract" button. The engine compiles a new standalone PDF containing only your selected pages, optimized for portability and sharing.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-mono shrink-0">5</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Download and Save</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Save the generated file to your local drive. Since all processing is performed 100% in your browser, your proprietary documents never leave your device.</p>
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
               <p className="text-muted-foreground">Everything you need to know about extracting PDF pages.</p>
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
            <h2 className="text-3xl font-bold text-white relative z-10">Extract the pages that matter</h2>
            <p className="text-indigo-100 max-w-xl mx-auto relative z-10">
               Upload and extract pages from any PDF. No sign-up, no watermarks, total privacy.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Start Extracting" />
            </div>
         </div>
      </article>
   );
}
