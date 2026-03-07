import {
   FileCode2,
   Eye,
   Shield,
   Table,
   Code2,
   Copy,
   CheckCircle,
   Globe,
} from 'lucide-react';

const features = [
   {
      icon: Eye,
      color: 'indigo',
      title: 'Live Preview',
      description: 'See your rendered markdown updating in real-time as you type, with full GitHub-Flavored Markdown support.',
   },
   {
      icon: Shield,
      color: 'emerald',
      title: 'XSS Safe Output',
      description: 'All HTML output is sanitized using DOMPurify, preventing cross-site scripting vulnerabilities in your generated code.',
   },
   {
      icon: Copy,
      color: 'sky',
      title: 'One-Click Copy',
      description: 'Copy the generated HTML to your clipboard instantly. Ready to paste into your CMS, email template, or website.',
   },
   {
      icon: Table,
      color: 'amber',
      title: 'GFM Tables',
      description: 'Full support for GitHub-Flavored Markdown tables, task lists, strikethrough, and autolinks.',
   },
   {
      icon: Code2,
      color: 'rose',
      title: 'Code Blocks',
      description: 'Fenced code blocks with language specification are properly converted to semantic HTML code elements.',
   },
   {
      icon: Globe,
      color: 'violet',
      title: '100% Client-Side',
      description: 'Everything runs in your browser. No markdown is sent to any server — your content stays private.',
   },
];

const faqs = [
   {
      q: 'What markdown syntax is supported?',
      a: 'We support GitHub-Flavored Markdown (GFM) including headings, bold, italic, strikethrough, links, images, code blocks, tables, task lists, blockquotes, and horizontal rules.',
   },
   {
      q: 'Is the HTML output safe to use?',
      a: 'Yes. All generated HTML is sanitized using DOMPurify, which removes potentially dangerous scripts and XSS attack vectors while preserving safe HTML structure.',
   },
   {
      q: 'Does my markdown get sent to any server?',
      a: 'No. The conversion happens entirely in your browser using JavaScript. Your content never leaves your device.',
   },
   {
      q: 'Can I use the generated HTML in emails?',
      a: 'The generated HTML uses standard tags that work in most email clients. However, for best results in emails, you may need to add inline CSS styles.',
   },
   {
      q: 'Does it support syntax highlighting in code blocks?',
      a: 'Code blocks are converted to semantic HTML with language classes. You can add a syntax highlighting library like Prism.js or highlight.js in your target application.',
   },
];

const faqJsonLd = {
   '@context': 'https://schema.org',
   '@type': 'FAQPage',
   mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
         '@type': 'Answer',
         text: faq.a,
      },
   })),
};

export function MarkdownConverterSeoContent() {
   return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-20">
         {/* JSON-LD */}
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

         {/* Hero */}
         <section className="max-w-4xl mx-auto text-center space-y-6 py-16">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-full text-sm font-medium border border-indigo-500/20">
               <FileCode2 className="w-4 h-4" />
               Free Markdown to HTML Generator
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
               Generate Clean HTML from Markdown Instantly
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
               Write or paste your markdown content and instantly get sanitized HTML output. Live preview, GitHub-Flavored Markdown support, and one-click copy — all running in your browser.
            </p>
         </section>

         {/* Feature Grid */}
         <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
               <div
                  key={feature.title}
                  className="bg-card p-6 rounded-2xl border border-border/50 hover:border-border transition-all duration-300 group"
               >
                  <div
                     className={`w-10 h-10 bg-${feature.color}-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                     <feature.icon className={`w-5 h-5 text-${feature.color}-500`} />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
               </div>
            ))}
         </section>

         {/* How It Works */}
         <section className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight text-center mb-10">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[
                  {
                     step: '01',
                     icon: Code2,
                     title: 'Write Markdown',
                     desc: 'Type or paste your markdown content into the editor panel.',
                  },
                  {
                     step: '02',
                     icon: Eye,
                     title: 'Preview Instantly',
                     desc: 'See the rendered HTML preview update in real-time as you type.',
                  },
                  {
                     step: '03',
                     icon: CheckCircle,
                     title: 'Copy & Use',
                     desc: 'Switch to the HTML tab and copy the sanitized output to use anywhere.',
                  },
               ].map((item) => (
                  <div key={item.step} className="text-center space-y-3">
                     <div className="text-4xl font-bold text-indigo-500/20">{item.step}</div>
                     <item.icon className="w-8 h-8 text-indigo-500 mx-auto" />
                     <h3 className="font-semibold">{item.title}</h3>
                     <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
               ))}
            </div>
         </section>

         {/* FAQ */}
         <section className="max-w-4xl mx-auto bg-muted/20 border border-border/30 rounded-3xl p-8 md:p-12">
            <h2 className="text-2xl font-bold tracking-tight text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-6">
               {faqs.map((faq, i) => (
                  <div key={i} className="space-y-2">
                     <h3 className="font-semibold text-sm">{faq.q}</h3>
                     <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
               ))}
            </div>
         </section>

         {/* CTA */}
         <section className="text-center py-12 space-y-4">
            <h2 className="text-2xl font-bold tracking-tight">Ready to Convert?</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
               Scroll up and start writing markdown. Your HTML is generated instantly, securely, and completely free.
            </p>
         </section>
      </div>
   );
}
