import { Layers, Shield, GripVertical, Download, Eye, Sparkles } from 'lucide-react';
import { ScrollToTopButton } from '../../../ScrollToTopButton';

export function MergePdfSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'Is there a file size limit?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: "There is no hard limit. Since processing happens in your browser, the practical limit depends on your device's memory. Most devices handle files up to 100MB+ easily.",
            },
         },
         {
            '@type': 'Question',
            name: 'Are my PDFs uploaded to a server?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'No. All merging happens entirely in your browser using JavaScript. Your PDF files never leave your device.',
            },
         },
         {
            '@type': 'Question',
            name: 'Can I reorder the pages?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'You can reorder entire PDF files by dragging them in the list. The pages within each PDF maintain their original order.',
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
               PDF Merger
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Merge PDF Files — <span className="text-indigo-500">Fast & Secure</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Combine multiple PDF documents into one file instantly. Drag to reorder, click to merge. Everything runs
               in your browser — your files never leave your device.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Layers className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Combine Multiple PDFs</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Upload any number of PDF files and merge them into a single document. No limits on file count or total
                  size.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <GripVertical className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Drag to Reorder</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Arrange your PDFs in the exact order you want before merging. Simple drag-and-drop reordering.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">100% Private</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  All processing happens in your browser. Your PDFs are never uploaded to any server — complete privacy
                  guaranteed.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">How It Works</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Three simple steps to combine your PDFs into a single document.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Eye,
                        title: 'Upload PDFs',
                        desc: 'Drag and drop or click to select the PDF files you want to combine.',
                     },
                     {
                        icon: GripVertical,
                        title: 'Rearrange Order',
                        desc: 'Drag files to arrange them in the exact order you want.',
                     },
                     {
                        icon: Download,
                        title: 'Merge & Download',
                        desc: 'Click merge and download your combined PDF instantly.',
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
                     Since all processing happens <strong>locally in your browser</strong>, merging speed depends on
                     your device — not your internet connection. Even <strong>offline</strong>, the tool works
                     perfectly.
                  </p>
                  <p>
                     For <strong>large files</strong>, close other browser tabs to free up memory for smoother
                     processing.
                  </p>
               </div>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">How to Merge PDF Files</h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-mono shrink-0">1</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Upload Multiple PDFs</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Drag and drop all the PDF documents you want to combine into the upload zone. You can add files one by one or in a batch.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-mono shrink-0">2</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Arrange File Order</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Use the drag-and-drop handles to reorder the files in the list. The final PDF will follow the exact top-to-bottom sequence displayed here.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-mono shrink-0">3</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Audit Document Previews</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Verify that the correct files are selected by checking the file names and page counts listed in the merge queue before proceeding.</p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-mono shrink-0">4</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Compile Combined File</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Click "Merge Files". The engine joins the documents into a single cohesive PDF string instantly, right in your browser's local memory.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-mono shrink-0">5</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Export Secured PDF</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Download your merged file. All operations are 100% private and offline, ensuring your confidential documents are never exposed to external servers.</p>
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
               <p className="text-muted-foreground">Everything you need to know about merging PDFs.</p>
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
            <h2 className="text-3xl font-bold text-white relative z-10">Ready to merge your PDFs?</h2>
            <p className="text-indigo-100 max-w-xl mx-auto relative z-10">
               Upload your files and combine them instantly. No sign-up, no watermarks, total privacy.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Start Merging" />
            </div>
         </div>
      </article>
   );
}
