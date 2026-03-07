import { FileCode2, Eye, Shield, Table, Code2, Globe, Sparkles } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function MarkdownConverterSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'What markdown syntax is supported?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'We support GitHub-Flavored Markdown (GFM) including headings, bold, italic, strikethrough, links, images, code blocks, tables, task lists, blockquotes, and horizontal rules.',
            },
         },
         {
            '@type': 'Question',
            name: 'Is the HTML output safe to use?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes. All generated HTML is sanitized using DOMPurify, which removes potentially dangerous scripts and XSS attack vectors while preserving safe HTML structure.',
            },
         },
         {
            '@type': 'Question',
            name: 'Does my markdown get sent to any server?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'No. The conversion happens entirely in your browser using JavaScript. Your content never leaves your device.',
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
               <FileCode2 className="w-3.5 h-3.5" />
               Markdown to HTML
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Markdown <span className="text-indigo-500">Converter</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Write or paste markdown and instantly get sanitized HTML output. Live preview, GitHub-Flavored Markdown
               support, and one-click copy — all running in your browser.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Eye className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Live Preview</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  See your rendered markdown updating in real-time as you type, with full GitHub-Flavored Markdown
                  support.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">XSS-Safe Output</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  All HTML output is sanitized using DOMPurify, preventing cross-site scripting vulnerabilities in your
                  generated code.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">100% Client-Side</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Everything runs in your browser. No markdown is sent to any server — your content stays private.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Full GFM Support</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Our converter supports the full GitHub-Flavored Markdown spec, including extensions that go beyond
                  standard markdown.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Table,
                        title: 'Tables & Task Lists',
                        desc: 'Full support for GFM tables, checkboxes, and strikethrough text.',
                     },
                     {
                        icon: Code2,
                        title: 'Fenced Code Blocks',
                        desc: 'Code blocks with language tags are converted to semantic HTML code elements.',
                     },
                     {
                        icon: Shield,
                        title: 'DOMPurify Sanitization',
                        desc: 'HTML output is scrubbed to remove any potentially dangerous scripts.',
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
                     Switch to the <strong>HTML tab</strong> to view the raw, sanitized source code. Use the{' '}
                     <strong>one-click copy</strong> button to paste it directly into your CMS or email template.
                  </p>
                  <p>
                     For email-safe HTML, add <strong>inline CSS styles</strong> to the generated output since most
                     email clients strip external stylesheets.
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
               <p className="text-muted-foreground">Everything you need to know about our Markdown Converter.</p>
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
            <h2 className="text-3xl font-bold text-white relative z-10">Generate clean HTML from markdown</h2>
            <p className="text-indigo-100 max-w-xl mx-auto relative z-10">
               Start converting markdown to safe, production-ready HTML instantly. No sign-up required.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Start Converting" />
            </div>
         </div>
      </article>
   );
}
