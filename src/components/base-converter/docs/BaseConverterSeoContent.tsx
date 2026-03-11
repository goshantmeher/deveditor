import { RefreshCcw, Hash, SquareTerminal, ShieldCheck, Zap, Braces } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function BaseConverterSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'What number bases are supported by this converter?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'This tool supports real-time bi-directional conversion between Decimal (Base 10), Hexadecimal (Base 16), Binary (Base 2), and Octal (Base 8). Any change to one field instantly synchronizes the values in all other formats.',
            },
         },
         {
            '@type': 'Question',
            name: 'Does it support very large numbers?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: "Yes! Our converter leverages the modern JavaScript BigInt API, which provides arbitrary-precision integers. This means you can convert numbers of almost any length, limited only by your browser's memory, without losing precision or encountering floating-point errors.",
            },
         },
         {
            '@type': 'Question',
            name: 'Is my input data securely processed?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Absolutely. Every conversion calculation happens locally within your browser using basic mathematical algorithms. No data is ever transmitted to a server, ensuring 100% privacy for your values and patterns.',
            },
         },
         {
            '@type': 'Question',
            name: 'Can I copy specific results easily?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Each format card includes a dedicated copy button. Simply click the icon to copy the formatted string (including automatic uppercase for Hexadecimal) instantly to your clipboard.',
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
               <RefreshCcw className="w-3.5 h-3.5" />
               Precision Transpiler
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Number <span className="text-indigo-500">Base</span> Converter
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Instantly synchronize values between Binary, Octal, Decimal, and Hexadecimal formats. Built with
               arbitrary-precision support for massive workloads and real-time developer workflows.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Hash className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Arbitrary Precision</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Support for astronomically large numbers using BigInt. No precision loss, no scientific notation—just
                  raw, accurate data across every base.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Real-time Sync</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Experience zero-latency updates. Type in any field and watch your values propagate instantly across
                  all other numeral systems perfectly.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Secure Privacy</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Every calculation is strictly local. Your private values never cross the network, making this the
                  safest way to handle sensitive system metrics.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center border-t border-border/50 pt-24">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Professional Grade Conversion</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Designed for embedded developers, security researchers, and systems engineers who require absolute
                  accuracy when moving between memory addresses, bitmasks, and human-readable counts.
               </p>
               <ul className="space-y-4">
                  {[
                     'Binary (0, 1) support with zero-padding logic.',
                     'Standard Octal (0-7) for legacy systems.',
                     'Standard Decimal for common integer counts.',
                     'Hexadecimal (0-F) with standard case normalization.',
                  ].map((item, i) => (
                     <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Braces className="w-5 h-5 text-indigo-500 shrink-0" />
                        {item}
                     </li>
                  ))}
               </ul>
            </div>

            <div className="bg-muted/50 rounded-3xl p-8 border border-border space-y-4 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Zap className="w-12 h-12 text-indigo-500" />
               </div>
               <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                  <SquareTerminal className="w-4 h-4" /> Pro Tip: Handling Overflows
               </div>
               <p className="text-sm text-foreground leading-relaxed italic border-l-2 border-indigo-500 pl-4 py-2">
                  "When working with data masks, use the <code className="text-indigo-400">Hexadecimal</code> input for
                  better visualization of byte boundaries. Converting <code className="text-indigo-400">0xFF</code> to
                  Binary instantly shows the 8-bit limit."
               </p>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
               How to Convert Number Bases
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     1
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Choose Your Input Format</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Determine which base your source number is in (Binary, Octal, Decimal, or Hexadecimal). You can
                        start typing in ANY of the four input fields immediately.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     2
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Enter Your Numeric Value</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Type or paste your value into the corresponding field. For Hexadecimal, both{' '}
                        <code className="text-indigo-400">0x</code> prefixes and raw strings are supported. Binary
                        inputs will only accept 0s and 1s.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     3
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Observe Real-Time Sync</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        As you type, all other three fields will update simultaneously using BigInt precision math. This
                        allows you to see how a single bit change affects the Decimal and Hexadecimal representations
                        instantly.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     4
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Handle Massive Integers</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Feel free to paste extremely large numbers. Our engine manages arbitrary-precision integers, so
                        you won't encounter the rounding errors common in standard floating-point calculators.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold font-mono shrink-0">
                     5
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Copy Your Preferred Format</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Each card features an individual copy button. Click the icon next to your desired output format
                        to send the calculated result string directly to your clipboard.
                     </p>
                  </div>
               </div>
            </div>
         </div>

         {/* FAQ Section */}
         <div className="space-y-12 border-t border-border/50 pt-24">
            <div className="text-center space-y-4">
               <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
                  {' '}
                  Frequently Asked Questions{' '}
               </h2>
               <p className="text-muted-foreground text-center">
                  Detailed insights into strict numeric conversion logic.
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
               <div className="space-y-3">
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                     Is my input data saved?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-indigo-500/20">
                     To improve your experience, your input data is saved locally in your browser using localStorage.
                     This is entirely client-side, meaning your data never leaves your device. You can opt-out of this
                     behavior at any time by disabling the 'Persist Data' switch in the tool settings.
                  </p>
               </div>
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-indigo-600 rounded-3xl p-12 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <div className="relative z-10 space-y-6">
               <h2 className="text-3xl font-bold text-white mb-4">Start Converting Large Integers</h2>
               <div className="pt-4">
                  <ScrollToTopButton label="Scroll up to Start Converting" />
               </div>
            </div>
         </div>
      </article>
   );
}
