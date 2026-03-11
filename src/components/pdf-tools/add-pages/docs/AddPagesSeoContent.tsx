import { FilePlus, Shield, Zap, Download, Layers, Sparkles } from 'lucide-react';
import { ScrollToTopButton } from '../../../ScrollToTopButton';

export function AddPagesSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'How do I insert blank pages into a PDF?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Upload your base PDF, then click the plus icon (+) between any two pages. Select "Blank Page" to instantly add an empty A4 page at that exact index.',
            },
         },
         {
            '@type': 'Question',
            name: 'Can I insert another PDF file into my current one?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes! Select "Insert PDF File" from the plus (+) menu between any pages. The selected document will be embedded seamlessly at that precise location.',
            },
         },
         {
            '@type': 'Question',
            name: 'Are my files uploaded to a server?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'No. All page insertions and modifications happen directly inside your web browser. DevEditor uses client-side WebAssembly to modify PDFs, guaranteeing complete privacy.',
            },
         },
         {
            '@type': 'Question',
            name: 'Is there a limit on how many pages I can insert?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'There is no hard limit imposed by our tool. However, browser memory limitations may affect extremely large PDFs (e.g., thousands of pages).',
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
               PDF Modification
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Add Pages to <span className="text-indigo-500">PDF</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Insert blank pages or merge entire PDF documents at specific locations within your base PDF. 100% secure
               and runs entirely in your browser.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FilePlus className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Precision Insertion</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Visually choose exactly where you want to insert a blank page or an entirely new PDF file, right
                  between existing pages.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Lightning Fast</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Modifications are calculated locally in your machine's memory, allowing you to build and preview the
                  new document instantly.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">100% Private</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Total client-side execution means your documents stay on your machine. We never access, store, or
                  transmit your sensitive files.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">How It Works</h2>
               <p className="text-muted-foreground leading-relaxed">Modify your PDF structure quickly and securely.</p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Layers,
                        title: '1. Load Base PDF',
                        desc: 'Select the main PDF document you want to add pages to.',
                     },
                     {
                        icon: FilePlus,
                        title: '2. Insert Content',
                        desc: 'Click the + buttons between the page thumbnails to insert blank pages or upload another PDF file.',
                     },
                     {
                        icon: Download,
                        title: '3. Download Modified PDF',
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
                  <p>You can insert as many documents or blank pages as you need into a single base document.</p>
                  <p>
                     If you insert a PDF that has multiple pages, all of its pages will be added sequentially at the
                     index you selected.
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
               <p className="text-muted-foreground">
                  Everything you need to know about modifying and adding PDF pages.
               </p>
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
            <h2 className="text-3xl font-bold text-white relative z-10">Add PDF Pages Instantly</h2>
            <p className="text-indigo-100 max-w-xl mx-auto relative z-10">
               Safely merge documents and insert blank pages at precise locations. 100% private, runs directly in your
               browser.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Start" />
            </div>
         </div>
      </article>
   );
}
