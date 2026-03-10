import { ShieldCheck, UploadCloud, Cpu, Key } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function RsaGeneratorSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'Are my private keys sent to a server?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Absolutely not. This generator utilizes the native Web Crypto API so all keys are mathematically computed and stored entirely inside the memory of your browser locally. No data ever hits our servers.',
            },
         },
         {
            '@type': 'Question',
            name: 'Which key size should I choose?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: '2048-bit is the current industry standard and is perfectly adequate for SSH tunneling or JWT payload signing. 4096-bit is heavily future-proofed against quantum cryptanalysis but takes longer to compute and process via normal handshake protocols.',
            },
         },
         {
            '@type': 'Question',
            name: 'What formats do the generated keys use?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'The generated keys are exported in PEM format utilizing standard base64 encoding spanning 64 characters wide. The public key uses SPKI encoding structure whereas the private key relies on a PKCS8 structure, both widely accepted globally.',
            },
         },
      ],
   };

   return (
      <article className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

         {/* Hero Section */}
         <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-bold uppercase tracking-wider">
               <Key className="w-3.5 h-3.5" />
               Encryption Tools
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               RSA Key Pair <span className="text-violet-500">Generator</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Securely generate cryptographically rigorous 2048-bit and 4096-bit internal PEM RSA public & private key sets securely offline in the browser.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-violet-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-violet-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Fully Decentralized</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Keys are established exclusively via your computer's entropy directly mapped into Javascript\'s SubtileCrypto module natively avoiding backend API exploits permanently.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-teal-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6 text-teal-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Standardized Output</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Both keys are stringed efficiently into exact PKCS8 (Private) and SPKI (Public) PEM structures universally supported across AWS, SSH logic grids, GitHub, or internal JWT issuance.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-blue-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Cpu className="w-6 h-6 text-blue-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Lightning Fast</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Compute massive Modulus lengths (1024, 2048, or even 4096-bit options) asynchronously via WebWorkers preventing visual UI lockdowns when crunching complex cryptographical polynomials.
               </p>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">How to Generate RSA Key Pairs</h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-violet-500/10 text-violet-500 flex items-center justify-center font-bold font-mono shrink-0">1</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Select Modulus Length</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Choose between 2048-bit (Standard) or 4096-bit (Maximum Security). Ensure your target environment (e.g., AWS, SSH) supports the selected length beforehand.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-violet-500/10 text-violet-500 flex items-center justify-center font-bold font-mono shrink-0">2</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Pick Encryption Algorithm</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Select the padding or hash algorithm variant (like RSASSA-PKCS1-v1_5 or RSA-OAEP) required for your specific encryption or signing use case.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-violet-500/10 text-violet-500 flex items-center justify-center font-bold font-mono shrink-0">3</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Initialize Key Generation</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Click "Generate". The tool uses a Web Worker to handle the heavy mathematical computation locally, preventing your browser tab from freezing during the process.</p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-violet-500/10 text-violet-500 flex items-center justify-center font-bold font-mono shrink-0">4</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Export in PEM Format</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Review the generated public and private keys. The output is formatted in standard PEM strings, which are universally compatible with almost every major cloud provider and SDK.</p>
                  </div>
               </div>
               
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-violet-500/10 text-violet-500 flex items-center justify-center font-bold font-mono shrink-0">5</div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Save Securely Offline</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">Copy the keys or download them as <code className="text-violet-400">.pem</code> files. Because the process is entirely local, your private key is never seen by any server—keep it safe in an encrypted vault!</p>
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
               <p className="text-muted-foreground">General information handling Rivest-Shamir-Adleman keys safely.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
               {faqSchema.mainEntity.map((faq, i) => (
                  <div key={i} className="space-y-3">
                     <h3 className="font-bold text-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                        {faq.name}
                     </h3>
                     <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-violet-500/20">
                        {faq.acceptedAnswer.text}
                     </p>
                  </div>
               ))}
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-violet-600 rounded-3xl p-12 text-center space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <h2 className="text-3xl font-bold text-white relative z-10">Generate Production Keys Now</h2>
            <p className="text-violet-100 max-w-xl mx-auto relative z-10">
               Securely spin up production-ready PEM public and private RSA keys locally isolated without requiring complex OpenSSL terminal workflows permanently.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Generate" />
            </div>
         </div>
      </article>
   );
}
