import { Key, ShieldAlert, Zap, Lock, Settings2, RefreshCw } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function PasswordGeneratorSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'Is this password generator secure?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes. We use the Web Crypto API (crypto.getRandomValues) which provides hardware-backed cryptographically strong random values. Standard Math.random() is never used.',
            },
         },
         {
            '@type': 'Question',
            name: 'Are my generated passwords stored anywhere?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'No. All generation happens locally in your browser. We do not track, send, or save your generated passwords to any server.',
            },
         },
         {
            '@type': 'Question',
            name: 'What does the "Easy to Read" option do?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'It excludes visually similar characters that can cause confusion when typing manually, such as the number 1, uppercase I, lowercase l, number 0, and the letter O.',
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
               <ShieldAlert className="w-3.5 h-3.5" />
               Identity & Security
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Secure Password <span className="text-emerald-500">Generator</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Create highly randomized, cryptographically robust passwords and secrets instantly in your browser. Fully customizable length and character restrictions.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Lock className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Web Crypto Secure</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Generated exclusively with <code>crypto.getRandomValues()</code> ensuring top-tier entropy backed by your operating system.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Settings2 className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Fully Customizable</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Toggle upper/lowercase, numbers, and symbols. Perfect for generating everything from 4-digit PINs to 128-character API keys.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Strength Meter</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Visually evaluate the entropy and structural strength of your configured password live as you adjust the parameters.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Never reuse a password again</h2>
               <p className="text-muted-foreground leading-relaxed">
                  The number one cause of security breaches is password reuse. Generating robust, single-use passwords and storing them safely inside a password manager eliminates this risk entirely.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: ShieldAlert,
                        title: 'Password Length Matters',
                        desc: 'A 12-character password takes vastly longer to crack than an 8-character password. We support up to 128 characters.',
                     },
                     {
                        icon: RefreshCw,
                        title: 'Easy to Read Mode',
                        desc: 'Tired of confusing 1 with l with I or O with 0? Use the "Easy to Read" option to omit ambiguous characters.',
                     },
                     {
                        icon: Key,
                        title: 'Guaranteed Characters',
                        desc: 'If you select uppercase, lowercase, numbers, and symbols, the generator guarantees at least one of each appears.',
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
                  <Key className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                     Common Use Cases
                  </span>
               </div>
               <div className="space-y-4 font-mono text-sm">
                  {[
                     { type: 'Service Passwords', length: '12-24 chars', format: 'Mixed' },
                     { type: 'Master Passwords', length: '24-32 chars', format: 'Mixed' },
                     { type: 'WiFi Passwords', length: '16 chars', format: 'Alphanumeric' },
                     { type: 'JWT / API Secrets', length: '64+ chars', format: 'Mixed' },
                     { type: 'PIN Codes', length: '4-8 chars', format: 'Numeric' },
                  ].map((item, i) => (
                     <div key={i} className="flex items-center justify-between border-b border-border/50 pb-2 last:border-0 last:pb-0">
                        <div className="flex flex-col">
                           <span className="text-muted-foreground">{item.type}</span>
                           <span className="text-xs text-muted-foreground/50">{item.format}</span>
                        </div>
                        <span className="text-emerald-400 font-bold">{item.length}</span>
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
               <p className="text-muted-foreground">Everything you need to know about generating passwords.</p>
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
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-emerald-600 rounded-3xl p-12 text-center space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <h2 className="text-3xl font-bold text-white relative z-10">Generate a Secret</h2>
            <p className="text-emerald-100 max-w-xl mx-auto relative z-10">
               Need a new master password, database secret, API key, or WiFi password? Generate one securely right now.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Generate" />
            </div>
         </div>
      </article>
   );
}
