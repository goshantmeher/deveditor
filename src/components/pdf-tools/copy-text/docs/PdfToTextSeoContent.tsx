import {
   Copy,
   Shield,
   Zap,
   Download,
   Eye,
   Globe,
   FileText,
} from 'lucide-react';

const features = [
   {
      icon: FileText,
      color: 'indigo',
      title: 'Full Text Extraction',
      description: 'Extract all text content from every page of your PDF. Content is organized by page for easy navigation.',
   },
   {
      icon: Copy,
      color: 'amber',
      title: 'One-Click Copy',
      description: 'Copy all extracted text to your clipboard with a single click. Ready to paste anywhere.',
   },
   {
      icon: Eye,
      color: 'emerald',
      title: 'Page-by-Page View',
      description: 'Text is displayed with clear page separators so you can easily find content from specific pages.',
   },
   {
      icon: Shield,
      color: 'rose',
      title: 'Secure & Private',
      description: 'Text extraction happens entirely in your browser. Your PDF never leaves your device.',
   },
   {
      icon: Zap,
      color: 'sky',
      title: 'Fast Processing',
      description: 'Powered by Mozilla\'s PDF.js engine for reliable, fast text extraction from any PDF.',
   },
   {
      icon: Globe,
      color: 'violet',
      title: '100% Free',
      description: 'No limits, no sign-up, no watermarks. Extract text from unlimited PDFs for free.',
   },
];

const faqs = [
   {
      q: 'Can it extract text from scanned PDFs?',
      a: 'This tool extracts text that is embedded in the PDF. Scanned documents (image-based PDFs) may not contain extractable text. For those, you\'d need an OCR tool.',
   },
   {
      q: 'Does it preserve formatting?',
      a: 'The tool extracts raw text content. Complex formatting like tables and columns may not be perfectly preserved, but all text content will be captured.',
   },
   {
      q: 'Are my files uploaded to a server?',
      a: 'No. All text extraction happens in your browser using Mozilla\'s PDF.js library. Your files never leave your device.',
   },
   {
      q: 'Is there a file size limit?',
      a: 'There\'s no hard limit. Processing happens locally, so the practical limit depends on your device\'s memory. Most PDFs work fine.',
   },
   {
      q: 'Can I extract text from specific pages only?',
      a: 'The full text is extracted per page with clear separators. You can easily copy text from specific pages from the output.',
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

export function PdfToTextSeoContent() {
   return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-20">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

         {/* Hero */}
         <section className="max-w-4xl mx-auto text-center space-y-6 py-16">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-full text-sm font-medium border border-indigo-500/20">
               <Copy className="w-4 h-4" />
               Free Online PDF Text Extractor
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
               Copy Text from PDF — Extract & Clipboard Ready
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
               Upload any PDF and instantly extract all text content. Copy to clipboard with one click. Powered by Mozilla&apos;s PDF.js — 100% client-side.
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
            <h2 className="text-2xl font-bold tracking-tight text-center mb-10">How to Extract Text from PDF</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                  { step: '01', icon: Download, title: 'Upload PDF', desc: 'Drag and drop or click to select the PDF you want to extract text from.' },
                  { step: '02', icon: Eye, title: 'View Text', desc: 'All text is extracted page by page and displayed in an editable text area.' },
                  { step: '03', icon: Copy, title: 'Copy', desc: 'Click "Copy Text" to copy everything to your clipboard. Paste anywhere.' },
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
            <h2 className="text-2xl font-bold tracking-tight">Ready to Extract Text?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
               Scroll up and drop your PDF. Text extraction is instant, secure, and free.
            </p>
         </section>
      </div>
   );
}
