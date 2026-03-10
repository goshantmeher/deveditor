import { ServerCog, ShieldCheck, Share2 } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function HtaccessGeneratorSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'Is .htaccess still relevant for modern servers?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Absolutely. While Nginx has gained massive popularity for reverse proxies, millions of Apache installations and shared hosting providers rely heavily on local .htaccess files for immediate rewrite rule control without requiring root permissions.',
            },
         },
         {
            '@type': 'Question',
            name: 'Can this generate rules for Nginx instead?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes! While named the htaccess generator, we fully support converting your exact routing redirect logic configurations into standard nginx.conf server block rewrite syntax by simply toggling the tab selector.',
            },
         },
         {
            '@type': 'Question',
            name: 'Are 301 Redirects safe for SEO?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes, 301 is strictly the "Permanent Redirect" code defined by HTTP standards. Executing our generated 301 rules ensures Search Engines safely transfer your existing domain authority score to the new target destination endpoints natively.',
            },
         },
      ],
   };

   return (
      <article className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

         {/* Hero Section */}
         <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-wider">
               <ServerCog className="w-3.5 h-3.5" />
               DevOps Control
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Redirect <span className="text-purple-500">Routing</span> Rules
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Click-to-generate complex Apache config strings. Ensure perfectly formulated SEO 301 mapping, canonical URL structures, and HTTPS enforcement parameters in seconds.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-purple-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FlowArrow className="w-6 h-6 text-purple-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Apache & Nginx Syntax</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Support for direct ModRewrite directives for .htaccess or server block structural equivalents inside nginx seamlessly parsed dynamically.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Built For SEO Authority</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Always guarantees the inclusion of R=301 (Permanent Redirect) directives to heavily ensure search indexing platforms migrate URL rankings accurately.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Share2 className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Zero Regex Knowledge Needed</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Avoid mistakenly bringing your entire production website offline because of a missed syntax slash. We format the required Mod_Rewrite paths correctly automatically.
               </p>
            </div>
         </div>

         {/* FAQ Section */}
         <div className="space-y-12 border-t border-border/50 pt-24">
            <div className="text-center space-y-4">
               <h2 className="text-3xl font-bold tracking-tight text-foreground text-center"> Frequently Asked Questions </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
               {faqSchema.mainEntity.map((faq, i) => (
                  <div key={i} className="space-y-3">
                     <h3 className="font-bold text-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                        {faq.name}
                     </h3>
                     <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-purple-500/20">
                        {faq.acceptedAnswer.text}
                     </p>
                  </div>
               ))}
               
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-purple-600 rounded-3xl p-12 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <div className="relative z-10 space-y-6">
               <h2 className="text-3xl font-bold text-white mb-4">Protect Your Web Traffic</h2>
               <div className="pt-4">
                  <ScrollToTopButton label="Scroll up to Generate Rules" />
               </div>
            </div>
         </div>
      </article>
   );
}

function FlowArrow(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 2v20"/><path d="m17 17-5 5-5-5"/><path d="m17 7-5-5-5 5"/></svg>
  );
}
