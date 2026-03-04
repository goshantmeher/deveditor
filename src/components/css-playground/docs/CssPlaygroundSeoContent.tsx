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
               text: 'The CSS Playground is a free online tool that lets you write HTML and CSS side-by-side and see the results rendered in real-time. It includes preset templates, responsive viewport testing, and the ability to export your work.',
            },
         },
         {
            '@type': 'Question',
            name: 'How does the live preview work?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'The live preview uses a sandboxed iframe that updates automatically as you type. Changes are debounced (300ms delay) to ensure smooth performance. The preview supports desktop, tablet, and mobile viewport sizes.',
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
               text: 'The CSS Playground includes 8 curated preset templates: Button Styles, Card Components, Flexbox Layout, Grid Layout, CSS Animations, Typography, Glassmorphism, and Gradients. Each template provides working HTML and CSS code that you can customize.',
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
            CSS Playground — Test & Experiment with CSS Online
         </h2>

         <section className="mb-8">
            <h3 className="text-lg font-semibold mb-3">
               What is the CSS Playground?
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
               The CSS Playground is a free online tool for developers and
               designers to write HTML and CSS side-by-side with a live preview.
               Whether you&apos;re learning CSS, prototyping a design, or
               experimenting with advanced CSS features like CSS Grid, Flexbox,
               animations, or glassmorphism — this tool lets you see results
               instantly without setting up a local development environment.
            </p>
         </section>

         <section className="mb-8">
            <h3 className="text-lg font-semibold mb-3">Features</h3>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
               <li>
                  <strong className="text-foreground">Live Preview</strong> —
                  See your HTML and CSS rendered in real-time as you type
               </li>
               <li>
                  <strong className="text-foreground">
                     Syntax Highlighting
                  </strong>{' '}
                  — Full syntax highlighting for both HTML and CSS with
                  auto-completion
               </li>
               <li>
                  <strong className="text-foreground">Preset Templates</strong>{' '}
                  — 8 curated templates including Buttons, Cards, Flexbox, Grid,
                  Animations, Typography, Glassmorphism, and Gradients
               </li>
               <li>
                  <strong className="text-foreground">
                     Responsive Testing
                  </strong>{' '}
                  — Toggle between Desktop, Tablet, and Mobile viewport sizes
               </li>
               <li>
                  <strong className="text-foreground">Export & Share</strong> —
                  Copy HTML/CSS to clipboard or export as a standalone HTML file
               </li>
               <li>
                  <strong className="text-foreground">Auto-save</strong> — Your
                  code is automatically saved to local storage
               </li>
            </ul>
         </section>

         <section className="mb-8">
            <h3 className="text-lg font-semibold mb-3">How to Use</h3>
            <ol className="list-decimal list-inside text-muted-foreground space-y-2">
               <li>Write your HTML markup in the left panel</li>
               <li>Add your CSS styles in the middle panel</li>
               <li>See the live result in the right preview panel</li>
               <li>Try a preset template from the toolbar for quick starts</li>
               <li>Toggle viewport sizes to test responsive designs</li>
               <li>Copy or export your work when finished</li>
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
                     Does it support modern CSS features?
                  </h4>
                  <p className="text-muted-foreground text-sm">
                     Yes! The preview renders in a real browser iframe, so it
                     supports all CSS features that your browser supports —
                     including CSS Grid, Flexbox, Custom Properties, animations,
                     backdrop-filter, and more.
                  </p>
               </div>
               <div>
                  <h4 className="font-medium mb-1">Is my code saved?</h4>
                  <p className="text-muted-foreground text-sm">
                     Your HTML and CSS are automatically saved to your
                     browser&apos;s local storage and will persist across page
                     refreshes. You can also export your work as a standalone
                     HTML file for sharing.
                  </p>
               </div>
            </div>
         </section>
      </div>
   );
}
