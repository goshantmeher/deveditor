import React from 'react';

export function ThemeGeneratorSeoContent() {
   return (
      <article className="max-w-4xl mx-auto px-6 text-foreground/80 leading-relaxed">
         <h2 className="text-3xl font-bold mb-6 text-foreground">UI Theme Generator</h2>

         <p className="mb-6">
            A powerful, privacy-first tool for generating comprehensive UI color themes from a single primary color.
            Build beautiful, consistent design systems for your applications without leaving your browser. All
            generation happens entirely client-side — no data is sent to any server.
         </p>

         <div className="grid md:grid-cols-2 gap-10 mb-10">
            <section>
               <h3 className="text-xl font-semibold mb-4 text-foreground">Smart Color Generation</h3>
               <p className="mb-4">
                  Pick any primary color, and the generator creates a complete set of semantic design tokens using color
                  theory:
               </p>
               <ul className="list-disc pl-5 space-y-2">
                  <li>
                     <strong>Primary & Secondary:</strong> Your main brand colors derived from analogous harmony.
                  </li>
                  <li>
                     <strong>Accent:</strong> A complementary hue for bold highlights and interactive elements.
                  </li>
                  <li>
                     <strong>Background & Foreground:</strong> Surface and text colors calibrated for readability.
                  </li>
                  <li>
                     <strong>Muted & Card:</strong> Subtle surface variations for layered UI compositions.
                  </li>
                  <li>
                     <strong>Status Colors:</strong> Pre-calibrated destructive (red), success (green), warning (amber),
                     and info (blue) tones.
                  </li>
               </ul>
            </section>

            <section>
               <h3 className="text-xl font-semibold mb-4 text-foreground">Export Formats</h3>
               <p className="mb-4">Export your generated theme in the format that suits your project:</p>
               <ul className="list-disc pl-5 space-y-2">
                  <li>
                     <strong>CSS Custom Properties:</strong> Standard <code>:root</code> variables with HSL and HEX
                     values, ready for any project.
                  </li>
                  <li>
                     <strong>Tailwind CSS Config:</strong> A complete <code>tailwind.config.js</code> color extension
                     you can drop into your project.
                  </li>
                  <li>
                     <strong>JSON:</strong> A structured JSON object for use in design systems, APIs, or custom tooling.
                  </li>
               </ul>
            </section>
         </div>

         <section className="mb-10">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Live Preview</h3>
            <p className="mb-4">
               Instantly see how your theme looks on a realistic sample UI. The preview includes common interface
               patterns like navigation, cards, stat widgets, form controls, badges, and toggle switches — all rendered
               with your generated colors.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
               <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Dark Mode</h4>
                  <p className="text-sm">
                     Generate dark themes with properly calibrated surfaces, contrast ratios, and muted backgrounds.
                  </p>
               </div>
               <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Light Mode</h4>
                  <p className="text-sm">
                     Generate bright, clean light themes with readable text and accessible contrast levels.
                  </p>
               </div>
               <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">12 Presets</h4>
                  <p className="text-sm">
                     Start from popular curated colors like Indigo, Emerald, Rose, and more as a base.
                  </p>
               </div>
            </div>
         </section>

         <section className="bg-indigo-500/5 border border-indigo-500/10 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2 text-indigo-400">Pro Tip</h3>
            <p className="text-sm italic">
               Choose a primary color with medium saturation (40-70%) and lightness (40-60%) for the most balanced
               theme. Highly saturated colors create vibrant themes, while desaturated ones produce elegant, muted
               palettes.
            </p>
         </section>
      </article>
   );
}
