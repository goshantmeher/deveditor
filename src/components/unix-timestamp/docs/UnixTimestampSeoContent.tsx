import { Hash, CalendarClock, History, Globe, Zap, RotateCcw, Clock } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function UnixTimestampSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'What is a Unix Timestamp?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'A Unix timestamp (or Epoch time) records the total number of seconds elapsed specifically since January 1, 1970, UTC (the "Unix Epoch"). It offers a unified, timezone-agnostic numerical format universally utilized across databases, logging metrics, and server architectures natively.',
            },
         },
         {
            '@type': 'Question',
            name: 'Why do JavaScript timestamps differ from standard Unix?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Native JavaScript calculates Epoch time structurally using milliseconds (13 digits) instead of the standard POSIX seconds (10 digits) format used rigorously by backend languages like PHP or Python. Multiply standard timestamps by 1,000 to reach JS equivalents effortlessly.',
            },
         },
         {
            '@type': 'Question',
            name: 'Is this conversion happening on external servers?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'No. Our time converters rely securely on your local browser\'s high-precision Date interfaces offline. We securely execute translations, ISO generation, and timezone shifting locally, keeping all data inputs entirely disconnected from APIs.',
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
               <History className="w-3.5 h-3.5" />
               Epoch Utilities
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Realtime <span className="text-indigo-500">Unix Timestamp</span> Converter
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Instantly convert meaningless 10-digit Epoch numerals into beautifully human-readable chronological dates. Reverse the process to generate precise UNIX hashes directly mapped to your exact local time zone.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Hash className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Bi-directional Routing</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Toggle seamlessly backwards or forwards between rigid numerical UNIX Epoch digits returning perfectly localized human ISO strings mathematically.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-sky-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-sky-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Millisecond Presets</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Tired of cutting off trailing zeros? We explicitly natively support extended 13-digit Javascript formatting resolving frontend integration crashes universally.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Universal UTC Shifts</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Safely mitigates painful cross-timezone deployment disparities. Standard epoch derivations strictly ignore daylight savings assuring global synchronization indefinitely.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Stop relying on mental math.</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Attempting to manually translate server logs heavily degrades workflow speed. Our utility continuously syncs with the exact microsecond explicitly generating required formatted endpoints instantly natively.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: RotateCcw,
                        title: 'Relative Timeline Tracking',
                        desc: 'Leverage the native Intl.RelativeTimeFormat matrix providing natural descriptive context directly (e.g., "5 hours ago", "Last month").',
                     },
                     {
                        icon: CalendarClock,
                        title: 'Interactive Live Feed',
                        desc: 'Observe ticking timestamps asynchronously mirroring production environments heavily ensuring payload configurations align completely accurately.',
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
                  <Clock className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                     Formatting Translations
                  </span>
               </div>
               <div className="space-y-3 font-mono text-sm overflow-hidden">
                  {[
                     { from: 'Jan 1 1970 UTC', to: '0 (The Beginning)' },
                     { from: 'POSIX Format', to: '1720235000 (Seconds)' },
                     { from: 'JS Format', to: '1720235000000 (Millis)' },
                     { from: 'Y2K38 Problem', to: '2147483647 (Integer Cap)' },
                  ].map((item, i) => (
                     <div key={i} className="flex flex-col md:flex-row gap-1 md:gap-4 text-muted-foreground mb-4 border-b border-border/30 pb-2">
                        <span className="text-indigo-400 font-bold w-36 truncate">[{item.from}]</span>
                        <span className="text-sm opacity-80">{item.to}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* FAQ Section */}
         <div className="space-y-12 border-t border-border/50 pt-24">
            <div className="text-center space-y-4">
               <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
                  Frequently Asked Questions
               </h2>
               <p className="text-muted-foreground">Detailed insights into epoch generation locally.</p>
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
                     To improve your experience, your input data is saved locally in your browser using localStorage. This is entirely client-side, meaning your data never leaves your device. You can opt-out of this behavior at any time by disabling the 'Persist Data' switch in the tool settings.
                  </p>
               </div>
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-indigo-600 rounded-3xl p-12 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <h2 className="text-3xl font-bold text-white relative z-10 mb-4">Start Converting Hashes</h2>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Generate" />
            </div>
         </div>
      </article>
   );
}
