import React from 'react';
import { Code2, Database, Zap, Sparkles, ShieldCheck, Cpu, Layout } from 'lucide-react';

export function SchemaGeneratorSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'Which programming languages are supported?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Our generator currently supports TypeScript, Go (Golang), Rust, Zod (for runtime validation), and standard JSON Schema (Draft-07).',
            },
         },
         {
            '@type': 'Question',
            name: 'Is my data safe?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes. The entire conversion process happens locally in your browser. Your JSON data is never sent to any server, making it safe for production data and secrets.',
            },
         },
         {
            '@type': 'Question',
            name: 'How does the type inference work?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'The engine recursively traverses your JSON object, detecting primitives, nested maps, and arrays. When it finds arrays of objects with differing fields, it merges them into a single type with optional fields.',
            },
         },
         {
            '@type': 'Question',
            name: 'Can I use this for complex API responses?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Absolutely! It handles deeply nested objects, mixed-type arrays, and large payloads without any issues.',
            },
         },
      ],
   };

   return (
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-24">
         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
               __html: JSON.stringify(faqSchema),
            }}
         />

         {/* Hero Section */}
         <section className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
               Instant JSON to Strongly-Typed Code
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
               Stop manually writing boilerplate interfaces. Our intelligent engine transforms your JSON into
               production-ready models for five major formats in milliseconds.
            </p>
         </section>

         {/* Features Grid */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-2xl border border-border/50 space-y-4">
               <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500">
                  <Cpu className="w-5 h-5" />
               </div>
               <h3 className="text-lg font-bold">Smart Inference</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">
                  Automatically detects integers, floats, nulls, and optional fields by deep-scanning nested objects and
                  array items.
               </p>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border/50 space-y-4">
               <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                  <Layout className="w-5 h-5" />
               </div>
               <h3 className="text-lg font-bold">Multi-Format</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">
                  Generate idiomatic code for TypeScript, Go struct tags, Rust serde, Zod validation, and JSON Schema
                  instantly.
               </p>
            </div>

            <div className="bg-card p-6 rounded-2xl border border-border/50 space-y-4">
               <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
                  <ShieldCheck className="w-5 h-5" />
               </div>
               <h3 className="text-lg font-bold">Privacy First</h3>
               <p className="text-sm text-muted-foreground leading-relaxed">
                  100% client-side computing. Your sensitive API payloads and database schemas never leave your local
                  machine.
               </p>
            </div>
         </div>

         {/* Main Content Deep Dive */}
         <div className="space-y-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
               <div className="space-y-6">
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                     <Sparkles className="w-6 h-6 text-indigo-500" />
                     Intelligent Type Detection
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                     The library doesn't just look at the first item of an array. It inspects every element, merges
                     differing signatures, and generates a unified model with proper optionality.
                  </p>
                  <ul className="space-y-3">
                     {[
                        'Distinguishes between Integer and Double/Float',
                        'Automatic nested struct/interface extraction',
                        'Native support for Go JSON omitempty tags',
                        'Proper Rust Option<T> wrapper for nullables',
                     ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                           <Zap className="w-4 h-4 text-indigo-400 shrink-0" />
                           <span>{item}</span>
                        </li>
                     ))}
                  </ul>
               </div>
               <div className="bg-muted/30 rounded-3xl p-8 border border-border/50">
                  <div className="aspect-video bg-background rounded-2xl flex items-center justify-center border border-border/30 relative overflow-hidden group">
                     <Code2 className="w-24 h-24 text-indigo-500/10 group-hover:scale-110 transition-transform duration-500" />
                     <div className="absolute inset-0 bg-linear-to-tr from-indigo-500/5 to-transparent pointer-events-none" />
                  </div>
               </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center lg:flex-row-reverse">
               <div className="bg-muted/30 rounded-3xl p-8 border border-border/50 md:order-last">
                  <div className="aspect-video bg-background rounded-2xl flex items-center justify-center border border-border/30 relative overflow-hidden group">
                     <Database className="w-24 h-24 text-emerald-500/10 group-hover:scale-110 transition-transform duration-500" />
                     <div className="absolute inset-0 bg-linear-to-tr from-emerald-500/5 to-transparent pointer-events-none" />
                  </div>
               </div>
               <div className="space-y-6">
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                     <Database className="w-6 h-6 text-emerald-500" />
                     Enterprise Grade Outputs
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                     Perfect for developers building complex microservices. Whether you need strongly-typed database
                     models or validated API endpoints, our generator handles the heavy lifting.
                  </p>
                  <ul className="space-y-3">
                     {[
                        'Clean, exported naming conventions',
                        'Support for deep recursive nesting',
                        'Standard Draft-07 JSON Schema validation',
                        'Zero dependencies on the generated code',
                     ].map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                           <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                           <span>{item}</span>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </div>

         {/* FAQ/Guide Section */}
         <section className="bg-muted/20 border border-border/30 rounded-3xl p-8 md:p-12 space-y-8">
            <h3 className="text-2xl font-bold text-center">Frequently Asked Questions</h3>
            <div className="grid md:grid-cols-2 gap-8">
               <div className="space-y-3">
                  <h4 className="font-bold">What is Smart Merging?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     When converting an array of varying objects, it identifies fields that are only present in some
                     items and marks them as optional (`?` in TS, `omitempty` in Go, `Option` in Rust).
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="font-bold">Does it produce valid Rust/Go?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     Yes. Our generator strictly follows idiomatic naming (PascalCase) and adds all necessary attribute
                     macros like `#[derive(Serialize, Deserialize)]` for Rust and `` `json:"key"` `` tags for Go.
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="font-bold">Is there a limit on JSON size?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     While there is no hard limit, very large JSON files (&gt;5MB) might cause slight browser lag during
                     live typing. For massive files, paste them in chunks or use our debounced editor.
                  </p>
               </div>
               <div className="space-y-3">
                  <h4 className="font-bold">Why use this over manual coding?</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                     Manual type definition is prone to typos and human error, especially in large objects. Automated
                     generation ensures 100% accuracy between your data and your code model.
                  </p>
               </div>
            </div>
         </section>

         {/* Bottom CTA */}
         <div className="text-center space-y-6 pt-12">
            <h3 className="text-xl font-bold italic text-muted-foreground/60 tracking-wider uppercase">
               Build better types with DevEditor
            </h3>
            <div className="h-1 w-24 bg-linear-to-r from-transparent via-indigo-500/50 to-transparent mx-auto" />
         </div>
      </div>
   );
}
