import React from 'react';

export function SchemaGeneratorSeoContent() {
   return (
      <article className="max-w-4xl mx-auto px-6 text-foreground/80 leading-relaxed">
         <h2 className="text-3xl font-bold mb-6 text-foreground">JSON → Schema Generator</h2>

         <p className="mb-6">
            Instantly convert JSON data into strongly-typed schemas for TypeScript, Go, Rust, Zod, and JSON Schema.
            Perfect for bootstrapping types from API responses, database records, or config files. Everything runs
            entirely in your browser — your data never leaves your device.
         </p>

         <div className="grid md:grid-cols-2 gap-10 mb-10">
            <section>
               <h3 className="text-xl font-semibold mb-4 text-foreground">Supported Output Formats</h3>
               <ul className="list-disc pl-5 space-y-2">
                  <li>
                     <strong>TypeScript:</strong> Generate clean, exported interfaces with proper optional fields and
                     nested types.
                  </li>
                  <li>
                     <strong>Go:</strong> Create idiomatic Go structs with JSON struct tags, omitempty, and aligned
                     formatting.
                  </li>
                  <li>
                     <strong>Rust:</strong> Produce serde-annotated Rust structs with proper rename attributes and
                     Option types.
                  </li>
                  <li>
                     <strong>Zod:</strong> Build runtime-validated Zod schemas with full type inference support.
                  </li>
                  <li>
                     <strong>JSON Schema:</strong> Output standard Draft-07 JSON Schema with required fields and nested
                     definitions.
                  </li>
               </ul>
            </section>

            <section>
               <h3 className="text-xl font-semibold mb-4 text-foreground">Smart Type Inference</h3>
               <p className="mb-4">The generator intelligently analyzes your JSON to infer the best types:</p>
               <ul className="list-disc pl-5 space-y-2">
                  <li>
                     <strong>Integer vs Float:</strong> Distinguishes between whole numbers and decimals.
                  </li>
                  <li>
                     <strong>Null Handling:</strong> Fields with null values become optional/nullable types.
                  </li>
                  <li>
                     <strong>Array Merging:</strong> Inspects all elements to create a unified item type.
                  </li>
                  <li>
                     <strong>Nested Objects:</strong> Automatically extracts sub-interfaces/structs for deeply nested
                     data.
                  </li>
                  <li>
                     <strong>Optional Detection:</strong> Fields present in some but not all array objects are marked
                     optional.
                  </li>
               </ul>
            </section>
         </div>

         <section className="mb-10">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Common Use Cases</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
               <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">API Responses</h4>
                  <p className="text-sm">
                     Paste a response from your API and instantly get typed interfaces for your frontend.
                  </p>
               </div>
               <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Config Files</h4>
                  <p className="text-sm">
                     Convert JSON configuration into typed schemas for validation and autocompletion.
                  </p>
               </div>
               <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Database Records</h4>
                  <p className="text-sm">
                     Transform database query results into proper data models for your application.
                  </p>
               </div>
            </div>
         </section>

         <section className="bg-blue-500/5 border border-blue-500/10 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2 text-blue-400">Pro Tip</h3>
            <p className="text-sm italic">
               For arrays of objects, the generator inspects all elements and merges their types. If some objects have
               extra fields, those fields are automatically marked as optional. Use realistic sample data with several
               items for the best type inference.
            </p>
         </section>
      </article>
   );
}
