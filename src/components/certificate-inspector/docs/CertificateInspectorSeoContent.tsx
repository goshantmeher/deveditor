import React from 'react';
import { ShieldCheck, FileCheck2, CalendarDays, CheckCircle2, Sparkles, Hash } from 'lucide-react';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';

export function CertificateInspectorSeoContent() {
   return (
      <div className="space-y-32">
         {/* 1. Hero Section */}
         <section className="text-center max-w-3xl mx-auto px-4 md:px-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6">
               <ShieldCheck className="w-4 h-4" />
               <span>Certificate Inspector</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-foreground">
               Decode <span className="text-indigo-500">PEM Certificates</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Inspect X.509 PEM and CRT certificates natively in your browser. Verify expirations, issuer details, subject paths, and cryptographic fingerprints securely without server uploads.
            </p>
         </section>

         {/* 2. Feature Grid */}
         <section className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
               <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                     <FileCheck2 className="w-6 h-6 text-indigo-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">100% Client-Side</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                     Never upload sensitive internal certificates to third-party endpoints. Our parser runs entirely in your browser using secure local Web Crypto and forge APIs.
                  </p>
               </div>

               <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                     <CalendarDays className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">Expiry Tracking</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                     Instantly verify the "Not Before" and "Not After" timestamps of any valid SSL/TLS certificate to debug connection drops or upcoming renewals.
                  </p>
               </div>

               <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                     <Hash className="w-6 h-6 text-amber-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">Fingerprinting</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                     Automatically generates SHA-256 and SHA-1 certificate fingerprints to allow visual verification against known authorized keys in your infrastructure.
                  </p>
               </div>
            </div>
         </section>

         {/* 3. Visual/Detail Section */}
         <section className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-8 text-foreground">
                     The perfect tool for DevOps and SecOps
                  </h2>
                  <ul className="space-y-6">
                     <li className="flex gap-4">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                           <h4 className="font-bold text-foreground mb-1">Subject Alternative Names (SAN)</h4>
                           <p className="text-muted-foreground text-sm">
                              Easily inspect multi-domain certificates to verify if your specific subdomain or wildcard scope is covered.
                           </p>
                        </div>
                     </li>
                     <li className="flex gap-4">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                           <h4 className="font-bold text-foreground mb-1">Issuer Chain Details</h4>
                           <p className="text-muted-foreground text-sm">
                              Verify exactly which Certificate Authority (CA) issued the document.
                           </p>
                        </div>
                     </li>
                     <li className="flex gap-4">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        <div>
                           <h4 className="font-bold text-foreground mb-1">Automated Formatting</h4>
                           <p className="text-muted-foreground text-sm">
                              Don't struggle with raw Base64 outputs. The inspector instantly highlights errors if public keys are missing the required BEGIN headers.
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
                     Certificates that fail to decode locally often have line-break corruption. Ensure your PEM block is properly formatted to max 64 characters per line.
                  </p>
                  <div className="bg-background rounded-xl p-4 border border-border/50 flex flex-col gap-2">
                     <div className="text-xs font-mono text-muted-foreground break-all">
                        -----BEGIN CERTIFICATE-----<br/>
                        MIIDdzCCAl+gAwIBAgIEbp...<br/>
                        -----END CERTIFICATE-----
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* 5. How to Use Section */}
         <section className="container mx-auto px-4 border-t border-border/50 pt-24">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12 text-foreground">
               How to Use the Certificate Inspector
            </h2>
            <div className="max-w-4xl mx-auto space-y-8">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-mono shrink-0">
                     1
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Paste your PEM or CRT</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Copy the raw text of your certificate including the `-----BEGIN CERTIFICATE-----` headers and paste it into the left-hand input area.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-mono shrink-0">
                     2
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Review Parsed output</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        The tool will automatically parse the Base64 ASN.1 structure and display human-readable Subject, Issuer, Cryptography algorithms, and Validity records on the right.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold font-mono shrink-0">
                     3
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Cross-check Fingerprints</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Scroll to the bottom to verify the generated SHA-1 and SHA-256 fingerprints to ensure the key matches your known authoritative records.
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
                     <h4 className="font-bold text-foreground">What is a PEM certificate?</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-indigo-500/20">
                     Privacy Enhanced Mail (PEM) is a Base64 encoded format with headers and footers used to store cryptographic keys, certificates, and other data securely in plain text format.
                  </p>
               </div>

               <div>
                  <div className="flex items-center gap-3 mb-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                     <h4 className="font-bold text-foreground">Is my input data saved?</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-indigo-500/20">
                     To improve your experience, your input data is saved locally in your browser using localStorage. This is entirely client-side, meaning your data never leaves your device. You can opt-out of this behavior at any time by disabling the 'Persist Data' switch in the tool settings.
                  </p>
               </div>

               <div>
                  <div className="flex items-center gap-3 mb-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                     <h4 className="font-bold text-foreground">Can you parse PKCS#12 or PFX files?</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-indigo-500/20">
                     Currently, DevEditor supports only Base64-encoded PEM strings natively in the browser. Binary encrypted envelopes like PFX generally require OpenSSL parsing or password decryption logic.
                  </p>
               </div>

               <div>
                  <div className="flex items-center gap-3 mb-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                     <h4 className="font-bold text-foreground">Is this entirely private?</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-indigo-500/20">
                     Yes. All decoding, parsing, and hashing algorithms are executed in standard Javascript Web APIs and local module dependencies directly on your machine.
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
                           name: 'What is a PEM certificate?',
                           acceptedAnswer: {
                              '@type': 'Answer',
                              text: 'PEM is a Base64 encoded format with headers and footers used to store cryptographic keys and certificates.',
                           },
                        },
                        {
                           '@type': 'Question',
                           name: 'Is my input data saved?',
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
            <div className="bg-indigo-600 rounded-3xl p-12 text-center relative overflow-hidden group">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 blur-[80px] rounded-full group-hover:bg-white/10 transition-colors pointer-events-none" />
               <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white relative z-10">
                  Inspect Certificates Securely
               </h2>
               <p className="text-indigo-100 mb-8 max-w-2xl mx-auto relative z-10">
                  Avoid the hassle of CLI commands like openssl x509 -text. Get instant parsing direct from your clipboard.
               </p>
               <div className="relative z-10">
                  <ScrollToTopButton label="Scroll up to Inspect" />
               </div>
            </div>
         </section>
      </div>
   );
}
