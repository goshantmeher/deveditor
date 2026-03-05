'use client';

import React from 'react';

export function CssPlaygroundSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'What is the CSS Playground?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'The CSS Playground is a free online tool that lets you write HTML and CSS side-by-side or use interactive visual generators to create CSS styles and Tailwind utility classes. It renders results in real-time.',
            },
         },
         {
            '@type': 'Question',
            name: 'Does it generate Tailwind CSS?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes! Using the visual Generator Mode, you can manipulate controls to create Box Shadows, Gradients, Flexbox/Grid layouts, and Animations, and copy the equivalent Tailwind classes directly to your clipboard.',
            },
         },
         {
            '@type': 'Question',
            name: 'How does the live preview work?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'The live preview uses a sandboxed iframe that updates automatically as you type or adjust visual sliders. Changes are debounced to ensure smooth performance. The preview supports desktop, tablet, and mobile viewport sizes.',
            },
         },
         {
            '@type': 'Question',
            name: 'Can I save my CSS experiments?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: "Yes! The CSS Playground automatically saves your HTML and CSS to your browser's local storage. Your code will persist across page refreshes. You can also export your work as a standalone HTML file.",
            },
         },
         {
            '@type': 'Question',
            name: 'What preset templates are available?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'The CSS Playground includes curated preset templates and visual generators for Flexbox Layout, Grid Layout, CSS Animations, Typography, Box Shadows, Border Radius, Transforms, and Gradients.',
            },
         },
      ],
   };

   return (
      <div className="max-w-4xl mx-auto px-4">
         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
               __html: JSON.stringify(faqSchema),
            }}
         />

         <h2 className="text-2xl font-bold mb-6">
            CSS Playground & Tailwind Generator — Test & Experiment Online
         </h2>

         <section className="mb-8">
            <h3 className="text-lg font-semibold mb-3">
               What is the CSS Playground?
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
               The CSS Playground is a free online tool for developers and
               designers featuring two distinct modes. In{' '}
               <strong>Editor Mode</strong>, you write HTML and CSS side-by-side
               with a live preview. In <strong>Generator Mode</strong>, you can
               use interactive slider tools to build visual components (like
               Flexbox layouts, intricate box shadows or gradients) to instantly
               get raw CSS or Tailwind objects.
            </p>
         </section>

         <section className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Features</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
               <li>
                  <strong className="text-foreground">Live Preview</strong> —
                  See your HTML, CSS, or visually generated UI rendered in
                  real-time.
               </li>
               <li>
                  <strong className="text-foreground">
                     Tailwind CSS Support
                  </strong>{' '}
                  — Tweak sliders and copy the underlying Tailwind CSS classes
                  without reading documentation.
               </li>
               <li>
                  <strong className="text-foreground">Visual Generators</strong>{' '}
                  — Interactive UI controls for advanced features: Box Shadow,
                  Border Radius, Flexbox, CSS Grid, Transforms, Keyframe
                  Animations, and Gradients.
               </li>
               <li>
                  <strong className="text-foreground">Preset Templates</strong>{' '}
                  — Curated templates including Buttons, Cards, Flex/Grid
                  Layouts, and more to quick-start testing.
               </li>
               <li>
                  <strong className="text-foreground">
                     Responsive Testing
                  </strong>{' '}
                  — Toggle between Desktop, Tablet, and Mobile viewport sizes.
               </li>
               <li>
                  <strong className="text-foreground">Auto-save</strong> — Your
                  editor data is automatically saved to local storage.
               </li>
            </ul>
         </section>

         <section className="mb-8">
            <h3 className="text-lg font-semibold mb-3">How to Use</h3>
            <ol className="list-decimal list-inside text-muted-foreground space-y-2">
               <li>
                  Select <strong>Editor Mode</strong> to write raw code: Add
                  markup on the left, styles in the middle, and see results on
                  the right.
               </li>
               <li>
                  Select <strong>Generator Mode</strong> to build UI elements
                  with sliders and visual inputs.
               </li>
               <li>
                  Switch between CSS and Tailwind code preview tabs to view the
                  generated styles of your element.
               </li>
               <li>
                  Toggle viewport sizes to test responsive designs on
                  mobile/tablet widths.
               </li>
               <li>
                  Click the Copy buttons to directly export the standard CSS or
                  the equivalent Tailwind classes.
               </li>
            </ol>
         </section>

         <section className="mb-8">
            <h3 className="text-lg font-semibold mb-3">
               Frequently Asked Questions
            </h3>
            <div className="space-y-4">
               <div>
                  <h4 className="font-medium mb-1">
                     Is the CSS Playground free?
                  </h4>
                  <p className="text-muted-foreground text-sm">
                     Yes, the CSS Playground is completely free with no
                     registration required. Simply open the tool and start
                     coding.
                  </p>
               </div>
               <div>
                  <h4 className="font-medium mb-1">
                     Does it support generating Tailwind Utility Classes?
                  </h4>
                  <p className="text-muted-foreground text-sm">
                     Yes! Head over to the &quot;Generator Mode&quot;. You can
                     use our interactive visual controls to create CSS
                     properties, and output the direct equivalent code in
                     standard CSS or Tailwind classes to instantly paste into
                     your project.
                  </p>
               </div>
               <div>
                  <h4 className="font-medium mb-1">
                     Does it support modern CSS features?
                  </h4>
                  <p className="text-muted-foreground text-sm">
                     Yes! The preview renders in a real browser iframe, so it
                     supports all CSS features that your browser supports —
                     including CSS Grid, Flexbox, Custom Properties, keyframe
                     animations, backdrop-filter, and more.
                  </p>
               </div>
            </div>
         </section>
      </div>
   );
}
