import React from 'react';
import { QrCode, Palette, ShieldCheck, Download, Smartphone, Zap } from 'lucide-react';

export function QrGeneratorSeoContent() {
   return (
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-24">
         {/* Hero Section */}
         <section className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
               Professional QR Code Generator for Developers
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
               Create high-quality, customizable QR codes instantly. From URLs and text to Wi-Fi credentials and contact
               info, our tool provides everything you need for digital and print ready QR codes.
            </p>
         </section>

         {/* Features Grid */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-2xl border border-border/50 space-y-4">
               <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center">
                  <Palette className="w-5 h-5 text-indigo-500" />
               </div>
               <h3 className="text-lg font-bold">Infinite Customization</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">
                  Personalize your QR codes with custom foreground and background colors. Match your brand's aesthetic
                  or project theme with ease using our hex color picker or curated presets.
               </p>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border/50 space-y-4">
               <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                  <Download className="w-5 h-5 text-emerald-500" />
               </div>
               <h3 className="text-lg font-bold">Vector & Raster Exports</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">
                  Download your QR codes as high-resolution PNG for web use or SVG for print and professional design
                  software. Scale smoothly without losing quality.
               </p>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border/50 space-y-4">
               <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-amber-500" />
               </div>
               <h3 className="text-lg font-bold">Error Correction Control</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">
                  Choose between four levels of error correction (Low to High) to ensure your QR code remains readable
                  even if it's partially covered or damaged.
               </p>
            </div>
         </div>

         {/* Main Content Deep Dive */}
         <div className="space-y-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="space-y-6">
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                     <Smartphone className="w-6 h-6 text-indigo-500" />
                     Mobile-First Performance
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                     Our QR generator is built with performance in mind. All processing happens locally in your browser,
                     ensuring your data never leaves your device and generating results in milliseconds.
                  </p>
                  <ul className="space-y-3">
                     {[
                        'Instant real-time preview as you type',
                        'Adjustable size and margin (Quiet Zone)',
                        'Support for complex text and long URLs',
                        'Clean, ad-free experience',
                     ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                           <Zap className="w-4 h-4 text-indigo-400 shrink-0" />
                           <span>{item}</span>
                        </li>
                     ))}
                  </ul>
               </div>
               <div className="bg-muted/30 rounded-3xl p-8 border border-border/50">
                  <div className="aspect-square bg-background rounded-2xl flex items-center justify-center border border-border/30 relative overflow-hidden group">
                     <QrCode className="w-24 h-24 text-indigo-500/20 group-hover:scale-110 transition-transform duration-500" />
                     <div className="absolute inset-0 bg-linear-to-tr from-indigo-500/5 to-transparent pointer-events-none" />
                  </div>
               </div>
            </div>
         </div>

         {/* FAQ/Guide Section */}
         <section className="bg-muted/20 border border-border/30 rounded-3xl p-8 md:p-12 space-y-8">
            <h3 className="text-2xl font-bold text-center">Frequently Asked Questions</h3>
            <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-3">
                  <h4 className="font-bold">What is Error Correction (ECC)?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     Error correction allows bits of data to be recovery if the QR code is damaged. Higher levels (Q and
                     H) allow more damage (up to 30%) but results in a denser, more complex pattern.
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="font-bold">What format is best for print?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     For print (business cards, posters, etc.), SVG is recommended as it is a vector format that can be
                     scaled to any size without pixelation.
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="font-bold">Are these QR codes permanent?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     Yes. These are static QR codes, meaning the data is encoded directly into the pattern. They will
                     never expire as long as the destination (like a URL) remains active.
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="font-bold">Is there a data limit?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     While QR codes can hold thousands of characters, it's best to keep content concise for faster
                     scanning and cleaner patterns.
                  </p>
               </div>
            </div>
         </section>

         {/* Bottom CTA */}
         <div className="text-center space-y-6 pt-12">
            <h3 className="text-xl font-bold italic text-muted-foreground/60 tracking-wider uppercase">
               Build Smarter with DevEditor
            </h3>
            <div className="h-1 w-24 bg-linear-to-r from-transparent via-indigo-500/50 to-transparent mx-auto" />
         </div>
      </div>
   );
}
