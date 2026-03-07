import {
   Scissors,
   Shield,
   Zap,
   Download,
   Eye,
   Globe,
   FileText,
} from 'lucide-react';

const features = [
   {
      icon: Scissors,
      color: 'indigo',
      title: 'Split by Page Range',
      description: 'Define custom page ranges and split your PDF into separate files. Create as many splits as you need.',
   },
   {
      icon: FileText,
      color: 'amber',
      title: 'Multiple Outputs',
      description: 'Each page range becomes its own downloadable PDF file. Name them automatically based on page numbers.',
   },
   {
      icon: Download,
      color: 'emerald',
      title: 'Instant Download',
      description: 'Split files are ready instantly. Each chunk downloads automatically with no waiting or processing queue.',
   },
   {
      icon: Shield,
      color: 'rose',
      title: 'Secure & Private',
      description: 'All splitting happens in your browser. Your PDFs never leave your device — complete data privacy.',
   },
   {
      icon: Zap,
      color: 'sky',
      title: 'Lightning Fast',
      description: 'Client-side processing means near-instant results, regardless of your internet connection speed.',
   },
   {
      icon: Globe,
      color: 'violet',
      title: '100% Free',
      description: 'No watermarks, no file limits, no sign-up required. Split unlimited PDFs for free.',
   },
];

const faqs = [
   {
      q: 'How do I split a PDF into individual pages?',
      a: 'Upload your PDF, then create a range for each page (e.g., 1-1, 2-2, 3-3). Each range will download as a separate single-page PDF.',
   },
   {
      q: 'Can I split a PDF into unequal parts?',
      a: 'Yes! You can define any page ranges you want. For example, pages 1-3 in one file and pages 4-10 in another.',
   },
   {
      q: 'Are my files uploaded to a server?',
      a: 'No. All processing happens entirely in your browser using JavaScript. Your PDF files never leave your device.',
   },
   {
      q: 'Is there a page limit?',
      a: 'There\'s no hard limit. The tool handles large PDFs well since processing happens locally on your device.',
   },
   {
      q: 'Can I split password-protected PDFs?',
      a: 'The tool attempts to handle encrypted PDFs, but heavily protected files may not be splittable. Remove the password first if needed.',
   },
];

const faqJsonLd = {
   '@context': 'https://schema.org',
   '@type': 'FAQPage',
   mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
   })),
};

export function SplitPdfSeoContent() {
   return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-20">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

         {/* Hero */}
         <section className="max-w-4xl mx-auto text-center space-y-6 py-16">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-full text-sm font-medium border border-indigo-500/20">
               <Scissors className="w-4 h-4" />
               Free Online PDF Splitter
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
               Split PDF Files by Page Range — Fast & Secure
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
               Define custom page ranges and split any PDF into separate files. Download each chunk instantly — all processing happens in your browser.
            </p>
         </section>

         {/* Features */}
         <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
               <div key={feature.title} className="bg-card p-6 rounded-2xl border border-border/50 hover:border-border transition-all duration-300 group">
                  <div className={`w-10 h-10 bg-${feature.color}-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                     <feature.icon className={`w-5 h-5 text-${feature.color}-500`} />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
               </div>
            ))}
         </section>

         {/* How It Works */}
         <section className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight text-center mb-10">How to Split a PDF</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                  { step: '01', icon: Eye, title: 'Upload PDF', desc: 'Drag and drop or click to select the PDF you want to split.' },
                  { step: '02', icon: Scissors, title: 'Define Ranges', desc: 'Add page ranges for each split. E.g., pages 1-5, pages 6-10.' },
                  { step: '03', icon: Download, title: 'Download', desc: 'Click split and each range downloads as a separate PDF.' },
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
            <h2 className="text-2xl font-bold tracking-tight">Ready to Split?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
               Scroll up and drop your PDF. Splitting is instant, secure, and completely free.
            </p>
         </section>
      </div>
   );
}
