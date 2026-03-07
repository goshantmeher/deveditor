import { Layers, Shield, Zap, GripVertical, Download, Eye, Globe } from 'lucide-react';

const features = [
   {
      icon: Layers,
      color: 'indigo',
      title: 'Combine Multiple PDFs',
      description:
         'Upload any number of PDF files and merge them into a single document. No limits on file count or total size.',
   },
   {
      icon: GripVertical,
      color: 'amber',
      title: 'Drag to Reorder',
      description: 'Arrange your PDFs in the exact order you want before merging. Simple drag-and-drop reordering.',
   },
   {
      icon: Download,
      color: 'emerald',
      title: 'Instant Download',
      description: 'Your merged PDF is ready to download immediately. No email required, no waiting for processing.',
   },
   {
      icon: Shield,
      color: 'rose',
      title: 'Secure & Private',
      description:
         'All processing happens in your browser. Your PDFs are never uploaded to any server — complete privacy guaranteed.',
   },
   {
      icon: Zap,
      color: 'sky',
      title: 'Lightning Fast',
      description: 'Client-side processing means your PDFs are merged in seconds, regardless of your internet speed.',
   },
   {
      icon: Globe,
      color: 'violet',
      title: '100% Free',
      description: 'No watermarks, no file size limits, no sign-up required. Merge as many PDFs as you need.',
   },
];

const faqs = [
   {
      q: 'Is there a file size limit?',
      a: "There is no hard limit. Since processing happens in your browser, the practical limit depends on your device's memory. Most devices handle files up to 100MB+ easily.",
   },
   {
      q: 'Are my PDFs uploaded to a server?',
      a: 'No. All merging happens entirely in your browser using JavaScript. Your PDF files never leave your device.',
   },
   {
      q: 'Can I reorder the pages?',
      a: 'You can reorder entire PDF files by dragging them in the list. The pages within each PDF maintain their original order.',
   },
   {
      q: 'Does it work on mobile?',
      a: 'Yes! The tool works in any modern browser on desktop, tablet, or mobile. You can select files from your device storage.',
   },
   {
      q: 'What happens to password-protected PDFs?',
      a: 'The tool attempts to handle encrypted PDFs, but some heavily protected files may not be mergeable. Try removing the password first.',
   },
];

const faqJsonLd = {
   '@context': 'https://schema.org',
   '@type': 'FAQPage',
   mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
         '@type': 'Answer',
         text: faq.a,
      },
   })),
};

export function MergePdfSeoContent() {
   return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-20">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

         {/* Hero */}
         <section className="max-w-4xl mx-auto text-center space-y-6 py-16">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-full text-sm font-medium border border-indigo-500/20">
               <Layers className="w-4 h-4" />
               Free Online PDF Merger
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
               Merge PDF Files Online — Fast, Free & Secure
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
               Combine multiple PDF documents into one file instantly. Drag to reorder, click to merge. Everything runs
               in your browser — your files never leave your device.
            </p>
         </section>

         {/* Features */}
         <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
               <div
                  key={feature.title}
                  className="bg-card p-6 rounded-2xl border border-border/50 hover:border-border transition-all duration-300 group"
               >
                  <div
                     className={`w-10 h-10 bg-${feature.color}-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                     <feature.icon className={`w-5 h-5 text-${feature.color}-500`} />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
               </div>
            ))}
         </section>

         {/* How It Works */}
         <section className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight text-center mb-10">How to Merge PDFs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                  {
                     step: '01',
                     icon: Eye,
                     title: 'Upload PDFs',
                     desc: 'Drag and drop or click to select the PDF files you want to combine.',
                  },
                  {
                     step: '02',
                     icon: GripVertical,
                     title: 'Reorder',
                     desc: 'Drag files to arrange them in the exact order you want.',
                  },
                  {
                     step: '03',
                     icon: Download,
                     title: 'Merge & Download',
                     desc: 'Click merge and download your combined PDF instantly.',
                  },
               ].map((item) => (
                  <div key={item.step} className="text-center space-y-3">
                     <div className="text-4xl font-bold text-indigo-500/20">{item.step}</div>
                     <item.icon className="w-8 h-8 text-indigo-500 mx-auto" />
                     <h3 className="font-semibold">{item.title}</h3>
                     <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
               ))}
            </div>
         </section>

         {/* FAQ */}
         <section className="max-w-4xl mx-auto bg-muted/20 border border-border/30 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl font-bold tracking-tight text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
               {faqs.map((faq, i) => (
                  <div key={i} className="space-y-2">
                     <h3 className="font-semibold text-sm">{faq.q}</h3>
                     <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
               ))}
            </div>
         </section>

         {/* CTA */}
         <section className="text-center py-12 space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Ready to Merge?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
               Scroll up and drop your PDF files. Merging is instant, secure, and completely free.
            </p>
         </section>
      </div>
   );
}
