import React from 'react';
import { FileCode2, Zap, Lock, Braces, Layers, CheckCircle2 } from 'lucide-react';
import { ScrollToTopButton } from '@/components/ScrollToTopButton';

export function Base64ToJsonSeoContent() {
   return (
      <div className="space-y-32">
         {/* 1. Hero Section */}
         <section className="text-center max-w-3xl mx-auto px-4 md:px-0">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold uppercase tracking-wider mb-6">
               <FileCode2 className="w-4 h-4" />
               <span>Base64 to JSON Decoder</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-foreground">
               Instantly View <span className="text-blue-500">Encoded JSON</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Decode Base64 strings into beautifully formatted, interactive JSON trees. Perfect for inspecting JWT payloads, encoded API responses, and compressed configuration files completely offline.
            </p>
         </section>

         {/* 2. Feature Grid */}
         <section className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
               <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-blue-500/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                     <Zap className="w-6 h-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">Live Decapsulation</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                     Paste your Base64 gibberish and immediately watch it transform into structured, color-coded, and collapsible JSON fields inside the editor panel.
                  </p>
               </div>

               <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                     <Lock className="w-6 h-6 text-emerald-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">Private & Local</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                     Never send sensitive environment variables or encoded customer payload data to an external server. The entire decoding pipeline runs strictly inside your local browser tab.
                  </p>
               </div>

               <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                     <Braces className="w-6 h-6 text-indigo-500" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">Powerful JSON Tools</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                     Once decoded, effortlessly re-format, collapse, search, or jump between Text and Tree view natively to drill down into the massive JSON schema responses.
                  </p>
               </div>
            </div>
         </section>

         {/* 3. Detailed Explanations */}
         <section className="container mx-auto px-4 border-t border-border/50 pt-24">
            <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
               <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-6 text-foreground">
                     Why wrap JSON inside Base64?
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                     When transferring deeply-nested configuration objects, arrays holding sensitive information, or sending API requests containing characters that break URL structures, engineers often deploy Base64.
                  </p>
                  <ul className="space-y-4">
                     <li className="flex gap-4">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                           <h4 className="font-bold text-foreground">JWT Payload Introspection</h4>
                           <p className="text-muted-foreground text-sm">Decoding the middle segment of JSON Web Tokens to easily read claims natively.</p>
                        </div>
                     </li>
                     <li className="flex gap-4">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                           <h4 className="font-bold text-foreground">CI/CD Pipeline Secrets</h4>
                           <p className="text-muted-foreground text-sm">Validating configuration maps and nested variables passed implicitly to build environments via Base64.</p>
                        </div>
                     </li>
                  </ul>
               </div>
               
               <div className="bg-muted/30 border border-border rounded-3xl p-8 relative overflow-hidden">
                  <div className="absolute -right-12 -top-12 opacity-[0.03]">
                     <Layers className="w-64 h-64 text-foreground" />
                  </div>
                  <div className="relative z-10">
                     <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                           <FileCode2 className="w-4 h-4 text-blue-500" />
                        </div>
                        <span className="font-bold uppercase tracking-wider text-xs text-muted-foreground">The Workflow</span>
                     </div>
                     <div className="space-y-4 font-mono text-sm leading-relaxed bg-background p-4 rounded-xl border border-border">
                        <p className="text-blue-400">{'eyJhbGciOiJSUzI1NiJ9...'}</p>
                        <p className="text-muted-foreground opacity-50">↓ Base64 Decode ↓</p>
                        <p className="text-emerald-400">{'{"alg":"RS256"}'}</p>
                        <p className="text-muted-foreground opacity-50">↓ Format Engine ↓</p>
                        <pre className="text-amber-400 pl-4 border-l-2 border-border/50">
{`{
  "alg": "RS256"
}`}
                        </pre>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* 4. FAQ Section */}
         <section className="container mx-auto px-4 border-t border-border/50 pt-24">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12 text-foreground">
               Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-5xl mx-auto">
               <div>
                  <div className="flex items-center gap-3 mb-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                     <h4 className="font-bold text-foreground">What happens if the Base64 does not contain JSON?</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-blue-500/20">
                     The application will successfully execute the Base64 decode sequence, but if the output is not syntactically valid JSON syntax, the editor will highlight the parsing error and display the raw plaintext.
                  </p>
               </div>

               <div>
                  <div className="flex items-center gap-3 mb-3">
                     <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                     <h4 className="font-bold text-foreground">Does this support bi-directional flow?</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-blue-500/20">
                     Yes! Modification inside the JSON tree editor will automatically trigger a re-encode, projecting the updated Base64 string directly back to the left panel in real-time.
                  </p>
               </div>
            </div>
         </section>

         {/* 5. CTA Section */}
         <section className="container mx-auto px-4 pb-12 pt-12">
            <div className="bg-blue-600 rounded-3xl p-12 text-center relative overflow-hidden group">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 blur-[80px] rounded-full group-hover:bg-white/10 transition-colors pointer-events-none" />
               <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white relative z-10">
                  Ready to Extract Your JSON?
               </h2>
               <p className="text-blue-100 mb-8 max-w-2xl mx-auto relative z-10">
                  Deconstruct tokens, untangle pipelines, and natively modify parameters using the local-first Base64 to JSON inspector.
               </p>
               <div className="relative z-10">
                  <ScrollToTopButton label="Start Decoding" />
               </div>
            </div>
         </section>
      </div>
   );
}
