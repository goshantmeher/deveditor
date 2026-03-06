import { FileText, Shield, Palette, Zap, Download, Layers, Layout, Search } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function ResumeBuilderSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'Is this resume builder really free?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: "Yes, completely free. Unlike most resume builders that hide features behind paywalls or require accounts, DevEditor's resume builder gives you full access to all templates, customization options, and unlimited PDF downloads — no credit card, no account, no strings attached.",
            },
         },
         {
            '@type': 'Question',
            name: 'Is my resume data private and secure?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Absolutely. Your resume data is processed 100% client-side in your browser. We never upload, store, or transmit any of your personal information to our servers. Your data stays on your device.',
            },
         },
         {
            '@type': 'Question',
            name: 'What resume templates are available?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'We offer three professional templates: Classic (traditional single-column with clean headings), Modern (two-column layout with a sidebar for skills and contact info), and Minimal (typography-focused design with generous whitespace). All templates are ATS-friendly.',
            },
         },
         {
            '@type': 'Question',
            name: 'Can I customize the resume sections?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes. You can add, remove, and reorder sections including Personal Info, Summary, Work Experience, Education, Skills, Projects, Certifications, and unlimited Custom Sections for anything else you want to include.',
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
               <FileText className="w-3.5 h-3.5" />
               Genuinely Free Resume Builder
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Build Your <span className="text-indigo-500">Professional Resume</span> in Minutes
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               No paywalls, no accounts, no data collection. The resume builder that respects your time and your
               privacy. Choose a template, fill in your details, and download a polished PDF instantly.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">100% Private</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Your resume data never leaves your browser. Everything is processed client-side — no servers, no
                  uploads, no tracking. Your personal information stays personal.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Palette className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Professional Templates</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Choose from Classic, Modern, and Minimal layouts. Each template is designed to be clean,
                  ATS-compatible, and optimized for readability by hiring managers.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Genuinely Free</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  No hidden charges. No "premium" features locked behind a paywall. No watermarks on your PDF. Every
                  feature is available to everyone, always.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Everything You Need</h2>
               <p className="text-muted-foreground leading-relaxed">
                  From personal details to custom sections, our builder handles every aspect of a professional resume
                  with an intuitive, real-time editing experience.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Layout,
                        title: 'Live PDF Preview',
                        desc: 'See exactly how your resume will look as you type. No surprises at download.',
                     },
                     {
                        icon: Layers,
                        title: '8 Built-in Sections',
                        desc: 'Personal info, summary, experience, education, skills, projects, certifications, and custom.',
                     },
                     {
                        icon: Download,
                        title: 'Instant PDF Download',
                        desc: 'One click to generate and download a perfectly formatted PDF resume.',
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
            <div className="bg-muted/30 rounded-3xl p-8 border border-border/50">
               <div className="flex items-center gap-2 mb-4">
                  <Search className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Why DevEditor?</span>
               </div>
               <div className="prose prose-invert prose-sm">
                  <p>
                     Most resume builders online advertise as free but introduce <strong>paywalls at download</strong>,
                     restrict layouts, or force account creation to harvest your personal data.
                  </p>
                  <p>
                     DevEditor&apos;s resume builder is different: it&apos;s <strong>completely open</strong>, generates PDFs
                     using <code className="text-indigo-400">@react-pdf/renderer</code> directly in your browser, and
                     never touches a server. Your resume, your data, your control.
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
               <p className="text-muted-foreground">Everything you need to know about our resume builder.</p>
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
            <h2 className="text-3xl font-bold text-white relative z-10">Land Your Dream Job</h2>
            <p className="text-indigo-100 max-w-xl mx-auto relative z-10">
               Start building your professional resume now. Free forever, no account needed, total privacy.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Start Building" />
            </div>
         </div>
      </article>
   );
}
