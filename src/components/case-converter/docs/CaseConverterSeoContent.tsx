import React from 'react';
import { Replace, Zap, Sparkles, Terminal } from 'lucide-react';

export function CaseConverterSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'Which programming cases are supported?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'We support camelCase, snake_case, PascalCase, kebab-case, CONSTANT_CASE, dot.case, and more. It also supports standard text formats like Title Case and Sentence case.',
            },
         },
         {
            '@type': 'Question',
            name: 'How does it handle mixed input?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Our smart tokenization engine automatically splits text by spaces, underscores, dashes, and even camelCase humps (e.g., "myVariableName" to "my_variable_name").',
            },
         },
         {
            '@type': 'Question',
            name: 'Is this tool safe for sensitive code?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes. All text transformation happens locally in your browser. No strings or code snippets are ever sent to our servers.',
            },
         },
      ],
   };

   return (
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-24">
         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
               __html: JSON.stringify(faqSchema),
            }}
         />

         {/* Hero Section */}
         <section className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
               Precision Text Transformation for Developers
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
               Seamlessly convert between programming cases and text formats. Built with a smart tokenization engine to
               handle complex variable names and code snippets instantly.
            </p>
         </section>

         {/* Case Comparison Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
               { name: 'camelCase', example: 'userProfileId', use: 'JavaScript / Java' },
               { name: 'snake_case', example: 'user_profile_id', use: 'Python / Ruby / SQL' },
               { name: 'PascalCase', example: 'UserProfileId', use: 'C# / React / Classes' },
               { name: 'kebab-case', example: 'user-profile-id', use: 'URLs / CSS' },
               { name: 'CONSTANT_CASE', example: 'USER_PROFILE_ID', use: 'Global Constants' },
               { name: 'Sentence case', example: 'User profile id', use: 'UI Labels / Copy' },
            ].map((item, i) => (
               <div
                  key={i}
                  className="bg-card p-5 rounded-2xl border border-border/50 space-y-3 group hover:border-indigo-500/30 transition-all"
               >
                  <div className="flex items-center justify-between">
                     <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-500/70">
                        {item.name}
                     </span>
                     <Sparkles className="w-3 h-3 text-indigo-500/20 group-hover:text-indigo-500/50" />
                  </div>
                  <code className="block text-sm font-mono bg-muted/30 p-2 rounded-lg border border-border/20 truncate">
                     {item.example}
                  </code>
                  <p className="text-[10px] text-muted-foreground italic">{item.use}</p>
               </div>
            ))}
         </div>

         {/* Main Content Deep Dive */}
         <div className="space-y-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="space-y-6">
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                     <Terminal className="w-6 h-6 text-indigo-500" />
                     Smart Tokenization Engine
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                     Unlike simple string replacers, our engine intelligently identifies word boundaries in mixed
                     formats. It handles acronyms and complex humps gracefully.
                  </p>
                  <ul className="space-y-3">
                     {[
                        'Splits by space, dash, underscore, and case',
                        'Preserves original line breaks and indentation',
                        'Handles multi-line variable lists easily',
                        'No registration or credits required',
                     ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                           <Zap className="w-4 h-4 text-indigo-400 shrink-0" />
                           <span>{item}</span>
                        </li>
                     ))}
                  </ul>
               </div>
               <div className="bg-muted/30 rounded-3xl p-8 border border-border/50">
                  <div className="aspect-video bg-background rounded-2xl flex items-center justify-center border border-border/30 relative overflow-hidden group">
                     <Replace className="w-24 h-24 text-indigo-500/10 group-hover:scale-110 transition-transform duration-500" />
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
                  <h4 className="font-bold">What is kebab-case?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     Kebab-case uses hyphens to separate words. It is the primary format for HTML attributes, CSS class
                     names, and SEO-friendly URL slugs.
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="font-bold">snake_case vs camelCase?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     Snake_case is standard in Python, Ruby, and Postgres, while camelCase is the default for
                     JavaScript, Java, and most JSON API specifications.
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="font-bold">Is it safe for API tokens?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     Yes. Our tool is client-side only. Your strings never leave your machine, making it ideal for
                     formatting internal variable names or keys.
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="font-bold">Can it handle Title Case?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     Yes. Beyond programming cases, we support Title Case (Headings) and Sentence case (UI Copy) to help
                     with non-technical documentation tasks.
                  </p>
               </div>
            </div>
         </section>

         {/* Bottom CTA */}
         <div className="text-center space-y-6 pt-12">
            <h3 className="text-xl font-bold italic text-muted-foreground/60 tracking-wider uppercase">
               Master your variable naming conventions
            </h3>
            <div className="h-1 w-24 bg-linear-to-r from-transparent via-indigo-500/50 to-transparent mx-auto" />
         </div>
      </div>
   );
}
