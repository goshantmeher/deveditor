import React from 'react';

export function RegexTesterSeoContent() {
   return (
      <article className="max-w-4xl mx-auto px-6 text-foreground/80 leading-relaxed">
         <h2 className="text-3xl font-bold mb-6 text-foreground">RegEx Tester & Evaluator</h2>

         <p className="mb-6">
            A privacy-first, client-side regular expression testing environment. Build, test, and debug complex RegEx
            patterns entirely within your browser natively.
         </p>

         <div className="grid md:grid-cols-2 gap-10 mb-10">
            <section>
               <h3 className="text-xl font-semibold mb-4 text-foreground">What is this tool?</h3>
               <p className="mb-4">
                  Regular Expressions (RegEx) are powerful text processing sequences used in programming to match,
                  extract, and replace strings. This tool provides a live playground to:
               </p>
               <ul className="list-disc pl-5 space-y-2">
                  <li>Validate whether your pattern correctly matches target text.</li>
                  <li>Visualize overlapping capture groups instantly.</li>
                  <li>Identify syntax errors in your regex expressions in real-time.</li>
               </ul>
            </section>

            <section>
               <h3 className="text-xl font-semibold mb-4 text-foreground">Safe Background Execution</h3>
               <p className="mb-4">
                  A known risk with RegEx is <strong>Catastrophic Backtracking</strong>. Poorly written patterns (like
                  `(a+)+$`) applied to non-matching strings can freeze standard web browsers by consuming 100% of the
                  CPU thread.
               </p>
               <p>
                  Our evaluator guarantees a smooth workflow by offloading all pattern matching to a protected
                  background Web Worker. If a pattern takes longer than 2 seconds to complete, we safely terminate the
                  worker rather than crashing your browser tab.
               </p>
            </section>
         </div>

         <section className="mb-10">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Common Flags</h3>
            <div className="grid sm:grid-cols-2 gap-4">
               <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-1 font-mono text-indigo-400">g (Global)</h4>
                  <p className="text-sm">Returns all matches instead of stopping after the first match.</p>
               </div>
               <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-1 font-mono text-indigo-400">i (Case Insensitive)</h4>
                  <p className="text-sm">Ignores uppercase and lowercase differences during matching.</p>
               </div>
               <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-1 font-mono text-indigo-400">m (Multiline)</h4>
                  <p className="text-sm">Causes `^` and `$` to match the start and end of individual lines.</p>
               </div>
               <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-1 font-mono text-indigo-400">s (DotAll)</h4>
                  <p className="text-sm">Allows the `.` character to match newline characters as well.</p>
               </div>
            </div>
         </section>

         <section className="bg-blue-500/5 border border-blue-500/10 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2 text-blue-400">Pro Tip</h3>
            <p className="text-sm italic">
               Modern JavaScript supports the <code>d</code> flag, which generates precise start and end indices for
               capturing groups. This tool enables index tracing automatically where supported, giving you granular
               details of your sub-matches.
            </p>
         </section>
      </article>
   );
}
