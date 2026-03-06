import React from 'react';

export function ColorConverterSeoContent() {
   return (
      <article className="max-w-4xl mx-auto px-6 text-foreground/80 leading-relaxed">
         <h2 className="text-3xl font-bold mb-6 text-foreground">Color Converter & Palette Generator</h2>
         
         <p className="mb-6">
            An essential tool for designers and developers to manage color values, ensure accessibility compliance, and create beautiful color schemes. This tool works entirely in your browser, ensuring your data never leaves your device.
         </p>

         <div className="grid md:grid-cols-2 gap-10 mb-10">
            <section>
               <h3 className="text-xl font-semibold mb-4 text-foreground">Multi-Format Conversion</h3>
               <p className="mb-4">
                  Seamlessly convert between the most common color models used in web and print design:
               </p>
               <ul className="list-disc pl-5 space-y-2">
                  <li><strong>HEX:</strong> The standard format for web CSS.</li>
                  <li><strong>RGB (Red, Green, Blue):</strong> The additive color model for digital screens.</li>
                  <li><strong>HSL (Hue, Saturation, Lightness):</strong> A more intuitive way to adjust colors.</li>
                  <li><strong>CMYK (Cyan, Magenta, Yellow, Key/Black):</strong> The subtractive model for physical printing.</li>
               </ul>
            </section>

            <section>
               <h3 className="text-xl font-semibold mb-4 text-foreground">WCAG Contrast Checker</h3>
               <p className="mb-4">
                  Accessibility is a core part of modern web development. Our WCAG 2.1 contrast checker helps you verify if your foreground and background colors meet the required accessibility standards.
               </p>
               <ul className="list-disc pl-5 space-y-2">
                  <li><strong>AA (4.5:1 ratio):</strong> The minimum requirement for standard text.</li>
                  <li><strong>AAA (7:1 ratio):</strong> High-level contrast for maximum readability.</li>
                  <li><strong>Large Text:</strong> Lower requirements for designers when using bold or large headings.</li>
               </ul>
            </section>
         </div>

         <section className="mb-10">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Palette Generation</h3>
            <p className="mb-4">
               Quickly generate harmony palettes based on your base color. Choose from various color theory models to build consistent design systems:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
               <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Complementary</h4>
                  <p className="text-sm">Colors from opposite sides of the color wheel, creating high contrast.</p>
               </div>
               <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Analogous</h4>
                  <p className="text-sm">Colors that are adjacent to each other, creating a harmonious and serene look.</p>
               </div>
               <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Triadic</h4>
                  <p className="text-sm">Three colors evenly spaced on the wheel, offering vibrancy with balance.</p>
               </div>
               <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Monochromatic</h4>
                  <p className="text-sm">Variations in lightness and saturation of a single hue.</p>
               </div>
            </div>
         </section>

         <section className="bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2 text-emerald-400">Pro Tip</h3>
            <p className="text-sm italic">
               Use HSL when fine-tuning your palette. Adjusting the "L" (Lightness) is the easiest way to create shades and tints while keeping your color's core identity intact.
            </p>
         </section>
      </article>
   );
}
