import { Bot, Map, ScrollText, GitPullRequest, Search, FileCode2 } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function SeoGeneratorsSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'What is a Robots.txt file?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'The robots.txt file is a standard text file that instructs web robots (typically search engine spiders) how to crawl pages on their website. It explicitly dictates which areas are public and which areas are off-limits for scraping algorithms.',
            },
         },
         {
            '@type': 'Question',
            name: 'Why do I need a Sitemap.xml?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'A Sitemap is an XML file detailing all canonical URLs available for crawling on your domain. Providing a properly formatted sitemap ensures Google and Bing identify new pages faster, understand architecture hierarchy, and process updates seamlessly.',
            },
         },
         {
            '@type': 'Question',
            name: 'Where do I place these generated files?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Both robots.txt and sitemap.xml must be placed unconditionally at the exact root level of your domain server (e.g., https://example.com/robots.txt and https://example.com/sitemap.xml). Placing them in child directories invalidates automatic discovery protocols globally.',
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
               <Search className="w-3.5 h-3.5" />
               Crawler Optimization
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Ultimate <span className="text-emerald-500">SEO Parsers</span> Toolset
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Craft meticulously formatted robots.txt exclusion rules and fully validated canonical sitemap XML paths instantaneously. Guarantee crawler algorithms traverse your architecture correctly.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Bot className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Parser Directives</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Visually configure targeted disallow strings mapped carefully towards specific User-Agents terminating runaway AI spiders or malicious scraping bots permanently.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Map className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Hierarchy Mapping</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Bulk transform massive arrays of internal relative slugs directly into strictly compliant absolute XML URL matrices containing priority parameters implicitly.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <GitPullRequest className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Client Architecture</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Data processing relies thoroughly on client-side compilation ensuring internal route trees remain private, localized, securely offline exclusively.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Strict algorithmic constraints</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Even subtle typos operating inside backend root files destroy search engine placements completely. Our validators automate standard constraints preventing indexing catastrophes.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: ScrollText,
                        title: 'Syntax Accuracy',
                        desc: 'Properly capitalizes `User-agent:` bindings while securely trapping spaces across path injections automatically.',
                     },
                     {
                        icon: FileCode2,
                        title: 'XML Wrappers',
                        desc: 'Applies absolute <loc> blocks embedding explicit `http://www.sitemaps.org/schemas/sitemap/0.9` namespace formatting correctly.',
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
                  <Search className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                     Direct Crawler Mapping
                  </span>
               </div>
               <div className="space-y-3 font-mono text-sm overflow-hidden">
                  {[
                     { from: 'Googlebot', to: 'Allows standard indexing.' },
                     { from: 'CCBot', to: 'Blocks Common Crawl AI datasets.' },
                     { from: '*', to: 'Defines root defaults algorithmically.' },
                     { from: 'Disallow: /api/', to: 'Prevents backend probing heavily.' },
                  ].map((item, i) => (
                     <div key={i} className="flex flex-col md:flex-row gap-1 md:gap-4 text-muted-foreground mb-4 border-b border-border/30 pb-2">
                        <span className="text-emerald-400 font-bold w-40 truncate">[{item.from}]</span>
                        <span className="text-sm opacity-80">{item.to}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">How to Optimize Your SEO Files</h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono shrink-0">1</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Define Crawler Logic</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Select your target User-Agents (e.g., Googlebot, GPTBot) and define specific disallow paths to protect private directories from being indexed or scraped.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono shrink-0">2</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Input Site Architecture</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Paste your internal relative URL slugs. The tool automatically wraps them in absolute canonical tags using your domain's root protocol for sitemap generation.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono shrink-0">3</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Verify Syntax Standards</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Audit the live output for proper casing and line breaks. Our validator ensures your <code className="text-emerald-400">robots.txt</code> and <code className="text-emerald-400">sitemap.xml</code> strings are 100% crawler-compliant.</p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono shrink-0">4</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Download & Deploy</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Click "Download" to save the files locally. Move them to your website's public root directory so they are accessible at <code className="text-emerald-400">/robots.txt</code> and <code className="text-emerald-400">/sitemap.xml</code>.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono shrink-0">5</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Test with Search Console</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Once deployed, submit your sitemap URL to Google Search Console to trigger a fresh crawl and monitor your indexing health in real-time.</p>
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
               <p className="text-muted-foreground">Detailed insights into search engine instructions natively.</p>
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
            <h2 className="text-3xl font-bold text-white relative z-10 mb-4">Master Your Indexing</h2>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Generate" />
            </div>
         </div>
      </article>
   );
}
