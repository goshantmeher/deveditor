import React from 'react';
import { Scissors, FileCheck2, Spline, CheckCircle2, Sparkles, Wand2 } from 'lucide-react';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';

export function StringTrimmerSeoContent() {
   return (
      <div className="space-y-32">
         {/* 1. Hero Section */}
         <section className="text-center max-w-3xl mx-auto px-4 md:px-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
               <Scissors className="w-4 h-4" />
               <span>String Trimmer / Cleaner</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-foreground">
               Clean Annoying <span className="text-emerald-500">Whitespace & Formatting</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Remove trailing spaces, collapse multiple whitespace lines, or strip specific prefixes and suffixes from massive text blocks instantly within your browser.
            </p>
         </section>

         {/* 2. Feature Grid */}
         <section className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
               <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                     <Wand2 className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">Instant Cleanup</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                     Don't waste time running sed commands or executing complex Regex replacements in your IDE. Paste text and toggle cleanup rules visually.
                  </p>
               </div>

               <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                     <FileCheck2 className="w-6 h-6 text-indigo-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">100% Client-Side Privacy</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                     Paste your sensitive logs or server records safely. DevEditor processes your text using local Javascript strings, guaranteeing no data leaves your machine.
                  </p>
               </div>

               <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                     <Spline className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">Edge Manipulations</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                     Easily parse log files, markdown documentation, or CSV artifacts by globally slicing common prefixes or suffixes (like array brackets or comma delimiters).
                  </p>
               </div>
            </div>
         </section>

         {/* 3. Visual/Detail Section */}
         <section className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-8 text-foreground">
                     Essential Data Parsing Actions
                  </h2>
                  <ul className="space-y-6">
                     <li className="flex gap-4">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                           <h4 className="font-bold text-foreground mb-1">Remove Multiple Spaces</h4>
                           <p className="text-muted-foreground text-sm">
                              Transforms jagged paragraphs full of tabs and irregular spacing into a single fluid spacing format, perfect for sentence parsing.
                           </p>
                        </div>
                     </li>
                     <li className="flex gap-4">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                           <h4 className="font-bold text-foreground mb-1">Trim Edge Spaces</h4>
                           <p className="text-muted-foreground text-sm">
                              Runs <code className="text-emerald-400">.trim()</code> across every single line concurrently to resolve unseen line-break issues.
                           </p>
                        </div>
                     </li>
                     <li className="flex gap-4">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                           <h4 className="font-bold text-foreground mb-1">Empty Line Deletion</h4>
                           <p className="text-muted-foreground text-sm">
                              Removes unnecessary gaps between list items or log entries to compress reading space and reduce raw string sizes drastically.
                           </p>
                        </div>
                     </li>
                  </ul>
               </div>
               <div className="bg-muted/50 rounded-3xl p-8 border border-border">
                  <div className="flex items-center gap-2 mb-6">
                     <Sparkles className="w-5 h-5 text-emerald-400" />
                     <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Pro Tip</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-4">
                     Copying elements from an HTML table often includes chaotic hidden tab characters. Paste it here, toggle all cleanup configs on, and copy pristine content out.
                  </p>
               </div>
            </div>
         </section>

         {/* 5. How to Use Section */}
         <section className="container mx-auto px-4 border-t border-border/50 pt-24">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12 text-foreground">
               How to Use the String Trimmer
            </h2>
            <div className="max-w-4xl mx-auto space-y-8">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono shrink-0">
                     1
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Paste Raw Input</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Insert the messy strings or log sequences into the top area labeled "Raw Input".
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono shrink-0">
                     2
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Configure Filters</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Use the left-hand sidebar menu to toggle switches for trimming whitespace, erasing blank carriage returns, or defining static slice paths (Prefixes/Suffixes).
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono shrink-0">
                     3
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Copy Your Sanitized Text</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Review your reformatted text inside the lower preview container instantly. Utilize the "Copy" module embedded at the top right of the output frame to extract your newly refined data.
                     </p>
                  </div>
               </div>
            </div>
         </section>

         {/* 6. FAQ Section */}
         <section className="container mx-auto px-4 border-t border-border/50 pt-24">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12 text-foreground">
               Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl mx-auto">
               <div>
                  <div className="flex items-center gap-3 mb-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                     <h4 className="font-bold text-foreground">What exactly does 'Trim Edges' operate on?</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-emerald-500/20">
                     "Trim Edges per Line" maps over the entire block of text line by line using the standard javascript .trim() string manipulation prototype. It strips away all spaces, tabs, and unprintable characters off the ends and starts.
                  </p>
               </div>

               <div>
                  <div className="flex items-center gap-3 mb-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                     <h4 className="font-bold text-foreground">Is my text stored off-screen?</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-emerald-500/20">
                     To improve your experience, your input data is saved locally in your browser using localStorage. This is entirely client-side, meaning your data never leaves your device. You can opt-out of this behavior at any time by disabling the 'Persist Data' switch.
                  </p>
               </div>

               <div>
                  <div className="flex items-center gap-3 mb-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                     <h4 className="font-bold text-foreground">What occurs inside 'Collapse Multiple Spaces'?</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-emerald-500/20">
                     Any block of sequential spaces, whether they be two gaps or a hundred, gets recursively replaced by a single universal space. It does not alter your standard new-line character architecture.
                  </p>
               </div>
            </div>
            
            {/* Structured Data for FAQ */}
            <script
               type="application/ld+json"
               dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                     '@context': 'https://schema.org',
                     '@type': 'FAQPage',
                     mainEntity: [
                        {
                           '@type': 'Question',
                           name: 'What exactly does Trim Edges operate on?',
                           acceptedAnswer: {
                              '@type': 'Answer',
                              text: 'Trim Edges per Line maps over the entire block of text line by line using standard tools. It strips away all spaces, tabs, and unprintable characters off the ends and starts.',
                           },
                        },
                        {
                           '@type': 'Question',
                           name: 'Is my text stored off-screen?',
                           acceptedAnswer: {
                              '@type': 'Answer',
                              text: 'To improve your experience, your input data is saved locally in your browser using localStorage. This is entirely client-side.',
                           },
                        },
                     ],
                  }),
               }}
            />
         </section>

         {/* 7. CTA Section */}
         <section className="container mx-auto px-4 pb-12 pt-12">
            <div className="bg-emerald-600 rounded-3xl p-12 text-center relative overflow-hidden group">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 blur-[80px] rounded-full group-hover:bg-white/10 transition-colors pointer-events-none" />
               <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white relative z-10">
                  Ready to Clean Up Your Strings?
               </h2>
               <p className="text-emerald-100 mb-8 max-w-2xl mx-auto relative z-10">
                  Cut down massive character counts and transform corrupted copy-paste chunks into ready-to-use array elements or code blocks effortlessly.
               </p>
               <div className="relative z-10">
                  <ScrollToTopButton label="Scroll up to Start" />
               </div>
            </div>
         </section>
      </div>
   );
}
