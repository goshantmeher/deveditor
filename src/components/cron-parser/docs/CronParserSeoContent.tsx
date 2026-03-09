import { Clock, Settings2, CalendarCheck, Zap, Server, Code2 } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function CronParserSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'What is a Cron Expression?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'A cron expression is a string representing a schedule, consisting of five or six fields separated by white space. It is universally used in Unix-like operating systems to routinely trigger software utilities, jobs, or scripts at exact intervals automatically without human intervention.',
            },
         },
         {
            '@type': 'Question',
            name: 'How do you interpret the asterisk (*) in Cron?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'An asterisk (*) specifically means "every value". For instance, an asterisk placed in the "minute" field simply translates to "execute every single minute," whereas placing it within the "month" field means "run every single month arbitrarily."',
            },
         },
         {
            '@type': 'Question',
            name: 'Are my scheduled jobs or logic saved externally?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'No. This cron parser strictly functions offline using client-side interpretation. We dynamically translate standard expressions completely inside your active browser environment, preventing any data harvesting or external analytics APIs entirely.',
            },
         },
      ],
   };

   return (
      <article className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

         {/* Hero Section */}
         <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
               <Clock className="w-3.5 h-3.5" />
               Scheduling Automation
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Instantly Translate <span className="text-emerald-500">Cron Expressions</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Effortlessly decode complex, difficult-to-read Cron schedule syntax directly into highly readable plain English. Anticipate execution routines accurately by computing the exact next five runtime intervals.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <CalendarCheck className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Natural Language</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Eliminates ambiguity by parsing confusing server configuration tokens implicitly into grammatically perfected human-readable phrases instantly on every keystroke.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-sky-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-sky-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Next Executions</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Mathematically derives the subsequent five absolute DateTime occurrences based solely on your local system timezone preventing disastrous deployment overlaps fundamentally.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Server className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Standardized Core</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Supports industry-standard five-field formats utilized ubiquitously across strict Linux crontabs, highly scalable Kubernetes setups, and resilient GitHub Action workflows natively.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Avoid disastrous misconfigurations</h2>
               <p className="text-muted-foreground leading-relaxed">
                  A tiny syntax miscalculation severely impacts heavy database loads or disrupts continuous integration pipelines drastically. Thorough formatting validation protects critical infrastructure implicitly.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Settings2,
                        title: 'Interactive Diagnostics',
                        desc: 'Detects out-of-range boundaries automatically halting execution mapping processes whenever logical ranges exceed strictly specified index protocols.',
                     },
                     {
                        icon: Code2,
                        title: 'Immediate Feedback Loop',
                        desc: 'The integrated parser constantly evaluates changes providing instantaneous translations without needing to explicitly submit cumbersome HTML form requests.',
                     },
                  ].map((item, i) => (
                     <li key={i} className="flex gap-4">
                        <div className="mt-1">
                           <item.icon className="w-5 h-5 text-emerald-500" />
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
                  <Clock className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                     Basic Mapping Reference
                  </span>
               </div>
               <div className="space-y-3 font-mono text-sm overflow-hidden">
                  {[
                     { from: '0 0 * * *', to: 'Every day at midnight' },
                     { from: '*/15 * * * *', to: 'Every 15 minutes continually' },
                     { from: '0 9 * * 1-5', to: 'At 9:00 AM on Mon-Fri' },
                     { from: '0 0 1 * *', to: 'On the 1st of every month' },
                  ].map((item, i) => (
                     <div key={i} className="flex flex-col md:flex-row gap-1 md:gap-4 text-muted-foreground mb-4 border-b border-border/30 pb-2">
                        <span className="text-emerald-400 font-bold w-36 truncate">[{item.from}]</span>
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
               <p className="text-muted-foreground">Detailed insights into cron intervals effectively.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
               {faqSchema.mainEntity.map((faq, i) => (
                  <div key={i} className="space-y-3">
                     <h3 className="font-bold text-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {faq.name}
                     </h3>
                     <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-emerald-500/20">
                        {faq.acceptedAnswer.text}
                     </p>
                  </div>
               ))}
               <div className="space-y-3">
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                     Is my input data saved?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-emerald-500/20">
                     To improve your experience, your input data is saved locally in your browser using localStorage. This is entirely client-side, meaning your data never leaves your device. You can opt-out of this behavior at any time by disabling the 'Persist Data' switch in the tool settings.
                  </p>
               </div>
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-emerald-600 rounded-3xl p-12 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <h2 className="text-3xl font-bold text-white relative z-10 mb-4">Master Your Timelines</h2>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Generate" />
            </div>
         </div>
      </article>
   );
}
