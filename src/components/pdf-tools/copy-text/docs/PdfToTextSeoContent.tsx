import { FileText, Shield, Zap, Copy, ScanLine, Sparkles } from 'lucide-react';
import { ScrollToTopButton } from '../../../ScrollToTopButton';

export function PdfToTextSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'How does PDF to Text work?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'The tool parses the PDF structure in your browser and extracts all text content, preserving paragraph structure and line breaks as much as possible.',
            },
         },
         {
            '@type': 'Question',
            name: 'Does it work with scanned PDFs?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'This tool extracts embedded text from PDFs. Scanned documents (image-based PDFs) require OCR, which is not supported — the PDF must contain actual text layers.',
            },
         },
         {
            '@type': 'Question',
            name: 'Is my document secure?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes. Text extraction happens entirely in your browser. Your PDF is never uploaded to any server.',
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
               <ScanLine className="w-3.5 h-3.5" />
               Text Extraction
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               PDF to <span className="text-indigo-500">Text</span> Extractor
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Extract all text content from any PDF document. Copy-ready output with preserved paragraph structure —
               all processed locally in your browser.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Full Text Extraction</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Extract all embedded text from PDF documents, preserving paragraph structure and line breaks.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Copy className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Copy-Ready Output</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  One-click copy of extracted text. Ready to paste into your editor, document, or application.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">100% Private</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Your documents stay on your device. Text extraction happens entirely in your browser — no server
                  involved.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">How It Works</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Simple, fast text extraction from any PDF document.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: FileText,
                        title: 'Upload PDF',
                        desc: 'Drag and drop or click to select the PDF you want to extract text from.',
                     },
                     {
                        icon: Zap,
                        title: 'Instant Extraction',
                        desc: 'Text is extracted and displayed immediately with paragraph structure.',
                     },
                     {
                        icon: Copy,
                        title: 'Copy & Use',
                        desc: 'Copy the extracted text to your clipboard with a single click.',
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
                     This tool extracts <strong>embedded text</strong> from PDFs. If your PDF is a scanned image, the
                     text won&apos;t be extractable — you&apos;ll need an OCR tool for those.
                  </p>
                  <p>
                     Great for extracting content from <strong>contracts</strong>, <strong>reports</strong>, and{' '}
                     <strong>academic papers</strong> without needing the full PDF reader.
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
               <p className="text-muted-foreground">Everything you need to know about PDF text extraction.</p>
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
            <h2 className="text-3xl font-bold text-white relative z-10">Extract text from any PDF</h2>
            <p className="text-indigo-100 max-w-xl mx-auto relative z-10">
               Upload your PDF and copy the text instantly. No sign-up, no server, total privacy.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Start Extracting" />
            </div>
         </div>
      </article>
   );
}
