import {
   FileText,
   Shield,
   Zap,
   Download,
   Eye,
   Globe,
   MousePointerClick,
} from 'lucide-react';

const features = [
   {
      icon: MousePointerClick,
      color: 'indigo',
      title: 'Visual Page Selector',
      description: 'Click on individual page thumbnails to select exactly which pages you want. No typing required.',
   },
   {
      icon: FileText,
      color: 'amber',
      title: 'New PDF from Selection',
      description: 'Selected pages are combined into a brand new PDF document, maintaining original quality and formatting.',
   },
   {
      icon: Download,
      color: 'emerald',
      title: 'Instant Download',
      description: 'Your extracted PDF is ready to download immediately. No processing queue, no email verification.',
   },
   {
      icon: Shield,
      color: 'rose',
      title: 'Secure & Private',
      description: 'Everything runs in your browser. Your PDFs never touch any server — complete data privacy guaranteed.',
   },
   {
      icon: Zap,
      color: 'sky',
      title: 'Lightning Fast',
      description: 'Local processing means near-instant results, even for large PDF files with hundreds of pages.',
   },
   {
      icon: Globe,
      color: 'violet',
      title: '100% Free',
      description: 'No watermarks, no limits, no sign-up. Extract pages from unlimited PDFs at no cost.',
   },
];

const faqs = [
   {
      q: 'How do I extract specific pages from a PDF?',
      a: 'Upload your PDF, then click on the page numbers you want to keep. Click "Extract & Download" to get a new PDF containing only your selected pages.',
   },
   {
      q: 'Can I extract non-consecutive pages?',
      a: 'Yes! Click any combination of pages — they don\'t need to be consecutive. For example, select pages 1, 3, 7, and 12 to create a new PDF with just those pages.',
   },
   {
      q: 'Does it preserve the original quality?',
      a: 'Yes. Pages are copied exactly as they are in the original PDF. No re-rendering or quality loss occurs.',
   },
   {
      q: 'Are my files uploaded to a server?',
      a: 'No. All processing happens entirely in your browser. Your PDF files never leave your device.',
   },
   {
      q: 'What\'s the difference between Extract and Split?',
      a: 'Extract lets you pick individual pages to create one new PDF. Split divides a PDF into multiple files by page ranges.',
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

export function ExtractPdfSeoContent() {
   return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-20">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

         {/* Hero */}
         <section className="max-w-4xl mx-auto text-center space-y-6 py-16">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-full text-sm font-medium border border-indigo-500/20">
               <FileText className="w-4 h-4" />
               Free Online PDF Page Extractor
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
               Extract Pages from PDF — Click, Select & Download
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
               Select specific pages from any PDF and download them as a new document. Visual page picker, instant processing, 100% client-side privacy.
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
            <h2 className="text-2xl font-bold tracking-tight text-center mb-10">How to Extract PDF Pages</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                  { step: '01', icon: Eye, title: 'Upload PDF', desc: 'Drag and drop or click to select the PDF you want to extract from.' },
                  { step: '02', icon: MousePointerClick, title: 'Select Pages', desc: 'Click on the page numbers you want to keep. Use Select All for bulk selection.' },
                  { step: '03', icon: Download, title: 'Download', desc: 'Click extract and download your new PDF with only the selected pages.' },
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
            <h2 className="text-2xl font-bold tracking-tight">Ready to Extract?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
               Scroll up and drop your PDF. Page extraction is instant, secure, and free.
            </p>
         </section>
      </div>
   );
}
