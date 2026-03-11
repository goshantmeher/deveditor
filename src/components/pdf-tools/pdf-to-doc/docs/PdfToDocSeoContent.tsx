import { FileText, Shield, Zap, Download, ScanLine, Sparkles } from 'lucide-react';
import { ScrollToTopButton } from '../../../ScrollToTopButton';

export function PdfToDocSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'How does PDF to Word conversion work?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'The tool parses the PDF structure in your browser, extracts text content page by page, and dynamically builds an editable Microsoft Word (.docx) document.',
            },
         },
         {
            '@type': 'Question',
            name: 'Does it work with scanned PDFs?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'This tool relies on embedded text parsing. If your PDF is a scanned image, it lacks a text layer and cannot be converted without OCR (Optical Character Recognition), which is currently not supported.',
            },
         },
         {
            '@type': 'Question',
            name: 'Is my document secure?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes, 100% secure. Everything happens directly inside your browser. Your files are never uploaded to any remote servers, maintaining total privacy.',
            },
         },
         {
            '@type': 'Question',
            name: 'Are images and complex formatting preserved?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Currently, the converter focuses strictly on extracting text. Complex layouts, images, and tables may not be preserved perfectly into the Word document format.',
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
               PDF Conversion
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               PDF to <span className="text-indigo-500">Word (Doc)</span> Converter
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Instantly convert PDF files into editable Word documents (.docx). Secure, entirely client-side, and free.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileText className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Editable Text Conversion</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Extracts text from PDF documents and builds a clean .docx file, ready to be edited in MS Word, Google Docs, or LibreOffice.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Download className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Instant Word Downloads</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Download your newly created Word document instantly. No queues or email registrations required.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">100% Private</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Total client-side execution means your documents stay on your machine. We never access, store, or transmit your sensitive files.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">How It Works</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Efficient and secure document conversion in 3 simple steps.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: FileText,
                        title: 'Upload PDF',
                        desc: 'Drag and drop or click to select the source PDF.',
                     },
                     {
                        icon: Zap,
                        title: 'Parse Content',
                        desc: 'The tool rapidly extracts text chunks and paragraphs.',
                     },
                     {
                        icon: Download,
                        title: 'Download .docx',
                        desc: 'Click the button to download an editable Word file natively generated in browser.',
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
                     If your document has complex structures like nested tables or dense graphical layouts, this tool will attempt to extract the <strong>raw text</strong> content sequentially along with its basic typography (bold, italic, font size).
                  </p>
                  <p>
                     <strong>Why doesn't the layout match exactly?</strong> Because DevEditor operates <strong>100% locally in your browser</strong> to protect your privacy, we cannot utilize the heavy, server-side C++ rendering engines required to perfectly mimic floating, absolute-positioned PDF layouts and embedded fonts.
                  </p>
                  <p>
                     For forms, invoices, and standard readable reports, this provides an excellent text foundational file you can effortlessly reformat in Word.
                  </p>
               </div>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">How to Convert PDF to Word</h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-mono shrink-0">1</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Select Document</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Simply drag and drop your PDF into the designated area. The extraction starts automatically directly inside your device memory.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-mono shrink-0">2</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Wait for Parsing Complete</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">A confirmation will appear detailing the number of text pages parsed successfully and compiled to the internal virtual document tree.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-mono shrink-0">3</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Initialize the Download</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Hit the "Download Word Document" button to convert the extracted text layers into a fully valid MS Word .docx document instantly and save it locally on your machine.</p>
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
               <p className="text-muted-foreground">Everything you need to know about PDF to Word conversions securely done.</p>
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
            <h2 className="text-3xl font-bold text-white relative z-10">Convert PDF to Word Locally</h2>
            <p className="text-indigo-100 max-w-xl mx-auto relative z-10">
               Transform readable PDF text layers into an editable .docx format. No waiting times, 100% offline-ready in browser.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Start Converting" />
            </div>
         </div>
      </article>
   );
}
