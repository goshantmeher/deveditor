import { QrCode, Zap, ShieldCheck, Palette, Download, Sparkles } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function QrGeneratorSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'What types of data can I encode?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'You can encode any text, URL, email address, phone number, or Wi-Fi credentials. The QR code is generated instantly as you type.',
            },
         },
         {
            '@type': 'Question',
            name: 'Can I customize the colors?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes. You can customize the foreground color, background color, and add a logo or image to the center of the QR code.',
            },
         },
         {
            '@type': 'Question',
            name: 'Is this free and private?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes. The QR code is generated entirely in your browser. No data is ever sent to our servers. No watermarks, no limits.',
            },
         },
         {
            '@type': 'Question',
            name: 'Is my input data saved?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'To improve your experience, your input data is saved locally in your browser using localStorage. This is entirely client-side, meaning your data never leaves your device. You can opt-out of this behavior at any time by disabling the "Persist Data" switch in the tool settings.',
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
               <QrCode className="w-3.5 h-3.5" />
               QR Generation
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Customizable <span className="text-indigo-500">QR Code</span> Generator
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Generate beautiful, branded QR codes with custom colors, sizes, and error correction levels. Everything
               runs in your browser — your data stays private.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Palette className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Full Customization</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Choose custom foreground and background colors to match your brand. Add logos or images to the center
                  of your QR codes.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Download className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Multiple Exports</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Download your QR codes as PNG or SVG. High resolution output suitable for both digital and print use.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">100% Private</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  No watermarks, no sign-up. Your data never leaves your browser — perfect for sensitive URLs and
                  credentials.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Print-Ready Quality</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Our generator creates high-resolution QR codes with configurable error correction, making them
                  reliable even when printed at small sizes.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: QrCode,
                        title: 'Error Correction Levels',
                        desc: 'Choose from L, M, Q, H correction levels for different damage tolerance.',
                     },
                     {
                        icon: Zap,
                        title: 'Instant Generation',
                        desc: 'QR codes update in real-time as you type — no button clicks needed.',
                     },
                     {
                        icon: Palette,
                        title: 'Brand-Friendly',
                        desc: 'Match your brand colors and add a center logo for professional results.',
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
                     Use <strong>high error correction (H)</strong> when adding a center logo. This allows up to 30% of
                     the code to be obscured while remaining scannable.
                  </p>
                  <p>
                     For <strong>print materials</strong>, download as SVG for infinite scalability without quality
                     loss.
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
               <p className="text-muted-foreground">Everything you need to know about our QR Generator.</p>
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
            <h2 className="text-3xl font-bold text-white relative z-10">Create stunning QR codes in seconds</h2>
            <p className="text-indigo-100 max-w-xl mx-auto relative z-10">
               Generate, customize, and download QR codes for free. No sign-up, no watermarks.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Start Generating" />
            </div>
         </div>
      </article>
   );
}
