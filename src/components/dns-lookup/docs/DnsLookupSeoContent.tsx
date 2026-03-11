import React from 'react';
import { Network, ShieldCheck, Zap, Layers, CheckCircle2, Sparkles } from 'lucide-react';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';

export function DnsLookupSeoContent() {
   return (
      <div className="space-y-32">
         {/* 1. Hero Section */}
         <section className="text-center max-w-3xl mx-auto px-4 md:px-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6">
               <Network className="w-4 h-4" />
               <span>DNS Lookup</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-foreground">
               Global <span className="text-indigo-500">DNS Resolution</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Bypass your local DNS cache and query global authoritative servers privately. Perform fast, secure DNS
               lookups directly from your browser using DNS-over-HTTPS (DoH).
            </p>
         </section>

         {/* 2. Feature Grid */}
         <section className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
               <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                     <Zap className="w-6 h-6 text-indigo-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">Zero Cache Lookups</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                     Skip annoying ISP caching. By querying major providers like Cloudflare and Google directly, you get
                     real-time propagation updates instantly.
                  </p>
               </div>

               <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                     <ShieldCheck className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">100% Private (DoH)</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                     Traditional DNS queries are unencrypted. Using DNS-over-HTTPS (DoH) secures your query traffic, and
                     unlike other web tools, DevEditor never logs your lookup history on our servers.
                  </p>
               </div>

               <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                     <Layers className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">Broad Record Support</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                     Fetch essential records universally: A, AAAA, CNAME, MX (Mail), TXT (Verification/SPF), NS
                     (Nameservers) and more, all formatted in clean, copyable tables.
                  </p>
               </div>
            </div>
         </section>

         {/* 3. Visual/Detail Section */}
         <section className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-8 text-foreground">
                     Essential Networking Tools inside your Browser
                  </h2>
                  <ul className="space-y-6">
                     <li className="flex gap-4">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                           <h4 className="font-bold text-foreground mb-1">Verify Email DNS</h4>
                           <p className="text-muted-foreground text-sm">
                              Select 'TXT' or 'MX' to query domain mail verification records, preventing email spoofing
                              configurations and verifying delivery setups.
                           </p>
                        </div>
                     </li>
                     <li className="flex gap-4">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                           <h4 className="font-bold text-foreground mb-1">Check Cloudflare or Google</h4>
                           <p className="text-muted-foreground text-sm">
                              Toggle between 1.1.1.1 (Cloudflare) or 8.8.8.8 (Google) DoH endpoints flexibly depending
                              on which global backbone you want to interrogate.
                           </p>
                        </div>
                     </li>
                     <li className="flex gap-4">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                           <h4 className="font-bold text-foreground mb-1">JSON Export Ready</h4>
                           <p className="text-muted-foreground text-sm">
                              Need raw DNS outputs for your pipeline scripts or monitoring tools? Extract full query
                              arrays to your clipboard with a single click.
                           </p>
                        </div>
                     </li>
                  </ul>
               </div>
               <div className="bg-muted/50 rounded-3xl p-8 border border-border">
                  <div className="flex items-center gap-2 mb-6">
                     <Sparkles className="w-5 h-5 text-indigo-400" />
                     <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Pro Tip</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-4">
                     DNS TXT records often hold critical validation tokens for services like Google Search Console,
                     GitHub Pages, or Vercel infrastructure routing. Checking them here guarantees caching won't falsely
                     flag errors.
                  </p>
                  <div className="bg-background rounded-xl p-4 border border-border/50 flex flex-col gap-2">
                     <div className="flex items-center text-xs font-mono text-muted-foreground gap-2">
                        <span className="text-indigo-400 w-16">Name:</span> _github-pages-challenge
                     </div>
                     <div className="flex items-center text-xs font-mono text-muted-foreground gap-2">
                        <span className="text-emerald-400 w-16">Value:</span> 4a8b79b...
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* 5. How to Use Section */}
         <section className="container mx-auto px-4 border-t border-border/50 pt-24">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12 text-foreground">
               How to Use the DNS Lookup Tool
            </h2>
            <div className="max-w-4xl mx-auto space-y-8">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-mono shrink-0">
                     1
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Enter a Target Domain</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Input the clean domain string (e.g., `deveditor.io` or `app.deveditor.io`). The tool
                        automatically strips protocols like `https://` if accidentally pasted.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-mono shrink-0">
                     2
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Select Record Type & Provider</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Choose whether to query 'All Common' records at once (A, AAAA, CNAME, MX, TXT, NS), or specify a
                        single lookup. Pick either Cloudflare (1.1.1.1) or Google (8.8.8.8) as the resolution endpoint.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-mono shrink-0">
                     3
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Analyze and Export</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Review the generated record blocks. Each displays the raw TTL (Time to Live) values and resolved
                        paths. Use the copy buttons to extract individual routes or the top right button to export the
                        entire JSON payload.
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
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                     <h4 className="font-bold text-foreground">What is DoH (DNS-over-HTTPS)?</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-indigo-500/20">
                     DNS-over-HTTPS is a protocol that masks ordinary Domain Name System requests within encrypted HTTPS
                     traffic. This protects your DNS lookups from being intercepted or spoofed by local networks or ISPs
                     making it a much safer diagnostic method.
                  </p>
               </div>

               <div>
                  <div className="flex items-center gap-3 mb-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                     <h4 className="font-bold text-foreground">Is my input data saved?</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-indigo-500/20">
                     To improve your experience, your input data, such as domains and preferred settings, is saved
                     locally in your browser using localStorage. This is entirely client-side, meaning your data never
                     leaves your device. You can opt-out of this behavior at any time by disabling the 'Persist Data'
                     switch via setting icon.
                  </p>
               </div>

               <div>
                  <div className="flex items-center gap-3 mb-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                     <h4 className="font-bold text-foreground">What does TTL mean in DNS?</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-indigo-500/20">
                     TTL stands for Time-to-Live, measured in seconds. It dictates how long a local resolver or cache
                     should store the DNS record before fetching a fresh update from the authoritative nameserver.
                     Finding low values implies ongoing active DNS changes.
                  </p>
               </div>

               <div>
                  <div className="flex items-center gap-3 mb-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                     <h4 className="font-bold text-foreground">Why can't I find my new DNS record?</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-indigo-500/20">
                     DNS updates can take up to 48 hours to fully propagate globally across all top-level domains. While
                     Cloudflare and Google update exceptionally quickly, the root authoritative zone associated with
                     your domain registrar may still be distributing your change.
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
                           name: 'What is DoH (DNS-over-HTTPS)?',
                           acceptedAnswer: {
                              '@type': 'Answer',
                              text: 'DNS-over-HTTPS is a protocol that masks ordinary Domain Name System requests within encrypted HTTPS traffic, preventing spoofing and wire-tapping.',
                           },
                        },
                        {
                           '@type': 'Question',
                           name: 'Is my input data saved?',
                           acceptedAnswer: {
                              '@type': 'Answer',
                              text: 'To improve your experience, your input data is saved locally in your browser using localStorage. This is entirely client-side, meaning your data never leaves your device.',
                           },
                        },
                     ],
                  }),
               }}
            />
         </section>

         {/* 7. CTA Section */}
         <section className="container mx-auto px-4 pb-12 pt-12">
            <div className="bg-indigo-600 rounded-3xl p-12 text-center relative overflow-hidden group">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 blur-[80px] rounded-full group-hover:bg-white/10 transition-colors pointer-events-none" />
               <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white relative z-10">
                  Analyze DNS Privately
               </h2>
               <p className="text-indigo-100 mb-8 max-w-2xl mx-auto relative z-10">
                  Skip the terminal configurations. Fetch secure, fully-parsed DNS records from global resolvers
                  directly within your browser.
               </p>
               <div className="relative z-10">
                  <ScrollToTopButton label="Scroll up to Query DNS" />
               </div>
            </div>
         </section>
      </div>
   );
}
