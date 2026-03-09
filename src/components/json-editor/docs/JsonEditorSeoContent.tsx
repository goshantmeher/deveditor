import { FileJson, Zap, ShieldCheck, Braces, Layers, Search, Code2, Sparkles } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';
import JsonEditorInfo from './JsonEditorInfo';

export function JsonEditorSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'Is this JSON Editor private?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes. DevEditor processes all JSON data 100% client-side. Your data never leaves your browser, and we do not store any of your JSON payloads on our servers.',
            },
         },
         {
            '@type': 'Question',
            name: 'Can I format broken or invalid JSON?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Our tool includes a smart validator that identifies exactly where a syntax error is. It also supports relaxed JSON parsing to help you fix common issues like trailing commas or missing quotes.',
            },
         },
         {
            '@type': 'Question',
            name: 'What is the limit for JSON file size?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'The tool can comfortably handle files up to several megabytes. For extremely large files (50MB+), performance depends on your browser and computer hardware.',
            },
         },
      ],
   };

   return (
      <article className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

         {/* Hero Section */}
         <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider animate-in fade-in slide-in-from-bottom-4 duration-500">
               <FileJson className="w-3.5 h-3.5" />
               Professional JSON Suite
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               JSON Editor, Formatter & <span className="text-indigo-500">Validator</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               A powerful, privacy-first tool to beautify, minify, and validate your JSON data. Navigate complex
               structures with ease using our visual tree view and smart search.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Braces className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Smart Formatting</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Instantly convert messy JSON into beautiful, readable code with customizable indentation and
                  highlighting.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Client-Side Privacy</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Your data stays in your browser. We never upload your JSON files to any server, ensuring total
                  confidentiality.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Real-time Validation</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Get instant feedback on syntax errors. Our validator highlights exactly where commas or quotes are
                  missing.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Advanced Data Exploration</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Handling massive JSON files? Our tool is built for performance and exploration. Don't just format your
                  data—understand it.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Layers,
                        title: 'Visual Tree View',
                        desc: 'Expand and collapse nodes to drill down into nested objects.',
                     },
                     {
                        icon: Search,
                        title: 'Dot-Path Search',
                        desc: 'Find specific keys instantly using familiar dot notation.',
                     },
                     {
                        icon: Code2,
                        title: 'Minify for Production',
                        desc: 'Remove all whitespace to compress your JSON for API payloads.',
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
                     You can use <strong>Compare Mode</strong> to spot differences between two JSON objects. Simply
                     paste your data into both editor panels and click "Compare" to highlight added or removed keys
                     visually.
                  </p>
                  <p>
                     Supports <code className="text-indigo-400">JSON5</code>, allowing for trailing commas and comments
                     in your source data.
                  </p>
               </div>
            </div>
         </div>

         {/* Editor Guide Section */}
         <div className="space-y-8 border-t border-border/50 pt-24">
            <div className="text-center space-y-4">
               <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
                  JSON Editor Guide
               </h2>
               <p className="text-muted-foreground">Learn how to make the most out of the professional JSON suite.</p>
            </div>
            
            <div className="bg-muted/30 rounded-3xl p-8 md:p-12 border border-border mt-12 max-w-4xl mx-auto">
               <JsonEditorInfo />
            </div>
         </div>

         {/* FAQ Section */}
         <div className="space-y-12 border-t border-border/50 pt-24">
            <div className="text-center space-y-4">
               <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
                  Frequently Asked Questions
               </h2>
               <p className="text-muted-foreground">Everything you need to know about our JSON tools.</p>
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
            <h2 className="text-3xl font-bold text-white relative z-10">Ready to clean up your data?</h2>
            <p className="text-indigo-100 max-w-xl mx-auto relative z-10">
               Start using our professional-grade JSON editor for free. No login required, no data limits, total
               privacy.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Start Formatting" />
            </div>
         </div>
      </article>
   );
}
