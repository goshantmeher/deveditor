import { Key, ShieldCheck, Zap, Clock, Eye, Sparkles } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function JwtDecoderSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'What is a JWT?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'A JSON Web Token (JWT) is a compact, URL-safe token used for authentication and information exchange. It consists of a Header, Payload, and Signature, each Base64URL-encoded.',
            },
         },
         {
            '@type': 'Question',
            name: 'Can this tool verify JWT signatures?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'This tool is a decoder/debugger — it extracts and displays the header and payload claims. Signature verification requires your secret key, which should never be entered into a web tool.',
            },
         },
         {
            '@type': 'Question',
            name: 'Is my token safe?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes. All JWT decoding happens entirely in your browser using JavaScript. Your token is never sent to any server.',
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
               <Key className="w-3.5 h-3.5" />
               Token Debugging
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               JWT <span className="text-indigo-500">Decoder</span> & Debugger
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Paste any JWT to instantly decode its header, payload, and signature. Check expiration claims, inspect
               algorithms, and debug auth issues — all client-side.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Eye className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Full Inspection</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Decode all three JWT segments — header (algorithm, type), payload (claims, roles), and signature — in
                  a structured, readable view.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Expiration Check</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Automatically converts exp, iat, and nbf timestamps to human-readable dates and shows whether the
                  token is expired.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">100% Private</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Your token is decoded entirely in the browser. We never log, store, or transmit your JWT data to any
                  server.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Debug Auth Issues Faster</h2>
               <p className="text-muted-foreground leading-relaxed">
                  JWTs are critical to modern authentication. Our decoder helps you quickly verify claims, check
                  expiration, and debug token issues without any backend setup.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Key,
                        title: 'Algorithm Detection',
                        desc: 'Identifies HS256, RS256, ES256, and other signing algorithms in the header.',
                     },
                     {
                        icon: Zap,
                        title: 'Instant Decode',
                        desc: 'Results appear instantly as you paste — no form submission needed.',
                     },
                     {
                        icon: Eye,
                        title: 'Color-Coded Segments',
                        desc: 'Header, payload, and signature are visually separated with distinct colors.',
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
                     Check the <code className="text-indigo-400">exp</code> (expiration) claim first when debugging
                     &quot;401 Unauthorized&quot; errors. Most auth issues are caused by <strong>expired tokens</strong>
                     .
                  </p>
                  <p>
                     Never paste your <strong>signing secret</strong> into any online tool. Our decoder doesn&apos;t
                     need it — it only reads the Base64-encoded segments.
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
               <p className="text-muted-foreground">Everything you need to know about JWT debugging.</p>
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
            <h2 className="text-3xl font-bold text-white relative z-10">Stop guessing, start debugging</h2>
            <p className="text-indigo-100 max-w-xl mx-auto relative z-10">
               Decode and inspect JWTs instantly. No login, no server — your tokens stay private.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Start Decoding" />
            </div>
         </div>
      </article>
   );
}
