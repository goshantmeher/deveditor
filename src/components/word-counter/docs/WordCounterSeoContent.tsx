import { BarChart2, Hash, AlignLeft, FileCode, Clock, Type } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function WordCounterSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'Does this word counter store my text?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'No. All text analysis is performed locally in your browser. Your typed or pasted content is never sent to any server, guaranteeing 100% privacy.',
            },
         },
         {
            '@type': 'Question',
            name: 'How is reading time calculated?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Reading time is estimated based on an average adult reading speed of 225 words per minute. This provides a reliable metric for blog posts and articles.',
            },
         },
         {
            '@type': 'Question',
            name: 'What counts as a word or character?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Words are calculated by splitting text by whitespace (spaces, tabs, newlines). The tool provides two character counts: total characters (including spaces) and characters excluding spaces, which is often required for academic assignments.',
            },
         },
      ],
   };

   return (
      <article className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

         {/* Hero Section */}
         <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
               <BarChart2 className="w-3.5 h-3.5" />
               Text Analysis
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Word & Character <span className="text-blue-500">Counter</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Get real-time statistics for your text. Instantly count words, characters, sentences, paragraphs, file
               size, and estimate reading time.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-blue-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Hash className="w-6 h-6 text-blue-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Comprehensive Metrics</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Track 9 different metrics instantly: total words, characters (with and without spaces), sentences,
                  paragraphs, lines, file size, and reading time.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Reading Time Estimator</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Automatically estimate how long it will take an average adult to read your content (based on 225 words
                  per minute), perfect for blog posts.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileCode className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">File Size Calculator</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  See the exact byte size of your text string in lightweight UTF-8 encoding. Invaluable for database
                  column limits or payload constraints.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Why count words and characters?</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Whether you're writing a tweet, formatting a meta description for SEO, completing an academic essay,
                  or checking database string limits, tracking text length is essential.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Type,
                        title: 'Social Media Limits',
                        desc: 'X (Twitter) allows 280 characters. Ensure your posts fit perfectly before hitting send.',
                     },
                     {
                        icon: AlignLeft,
                        title: 'SEO Meta Tags',
                        desc: 'Keep title tags under 60 characters and meta descriptions under 160 characters for optimal search engine display.',
                     },
                     {
                        icon: FileCode,
                        title: 'Database Constraints',
                        desc: 'Check if your long string or JSON payload will fit inside a standard VARCHAR(255) or text column by monitoring character counts and byte size.',
                     },
                  ].map((item, i) => (
                     <li key={i} className="flex gap-4">
                        <div className="mt-1">
                           <item.icon className="w-5 h-5 text-blue-500" />
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
                  <Hash className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                     Common Character Limits
                  </span>
               </div>
               <div className="space-y-4 font-mono text-sm">
                  {[
                     { platform: 'Twitter / X', limit: '280 chars' },
                     { platform: 'Instagram Bio', limit: '150 chars' },
                     { platform: 'LinkedIn Post', limit: '3,000 chars' },
                     { platform: 'Title Tag (SEO)', limit: '~60 chars' },
                     { platform: 'Meta Desc (SEO)', limit: '~160 chars' },
                     { platform: 'SMS Message', limit: '160 chars' },
                  ].map((item, i) => (
                     <div
                        key={i}
                        className="flex items-center justify-between border-b border-border/50 pb-2 last:border-0 last:pb-0"
                     >
                        <span className="text-muted-foreground">{item.platform}</span>
                        <span className="text-blue-400 font-bold">{item.limit}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">How to Analyze Your Text</h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold font-mono shrink-0">
                     1
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Paste Your Content</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Enter your blog post, essay, or code snippet into the editor. The engine immediately begins
                        real-time character and word scanning as you type.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold font-mono shrink-0">
                     2
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Audit Density Metrics</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Check the statistics bar for a detailed breakdown of total words, sentences, and paragraphs. The
                        tool also separates character counts into "With Spaces" and "Without Spaces" for strict academic
                        limits.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold font-mono shrink-0">
                     3
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Verify Reading Time</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Review the "Estimate Reading Time" panel (based on an average 225 WPM speed) to ensure your
                        newsletter or blog post falls within the ideal engagement window for your audience.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold font-mono shrink-0">
                     4
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Check SEO Tag Lengths</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Use the specialized limit indicators to see if your meta title or description fits within the
                        Google search snippet limits (approximately 60 and 160 characters respectively).
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold font-mono shrink-0">
                     5
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Analyze Binary Weight</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Watch the calculated byte size to ensure your string fits within database VARCHAR or TEXT
                        limits. All analysis is performed client-side, keeping your text strictly confidential.
                     </p>
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
               <p className="text-muted-foreground">Answers about text analysis and limits.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
               {faqSchema.mainEntity.map((faq, i) => (
                  <div key={i} className="space-y-3">
                     <h3 className="font-bold text-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        {faq.name}
                     </h3>
                     <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-blue-500/20">
                        {faq.acceptedAnswer.text}
                     </p>
                  </div>
               ))}
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-blue-600 rounded-3xl p-12 text-center space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <h2 className="text-3xl font-bold text-white relative z-10">Count every character instantly</h2>
            <p className="text-blue-100 max-w-xl mx-auto relative z-10">
               Paste your text above to see comprehensive metrics, character counts, and reading time estimates. No
               server round-trips required.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Count Text" />
            </div>
         </div>
      </article>
   );
}
