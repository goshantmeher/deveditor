import { Type, Paintbrush, FileCode2, Zap, Palette, Monitor, Code2 } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function AsciiArtSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'What is ASCII Art?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'ASCII art is a graphic design technique that uses computers for presentation and consists exclusively of pictures pieced together from the 95 printable characters defined strictly by the ASCII Standard from 1963. It is universally used in command-line tools to generate logos and headers statically.',
            },
         },
         {
            '@type': 'Question',
            name: 'Why should I use ASCII art in my code?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Placing large figlet-style ASCII headers inside complex source code files (like backend controllers or massive CSS stylesheets) prominently declares document sections dynamically. It makes codebase navigation substantially easier for collaborating developers browsing visually.',
            },
         },
         {
            '@type': 'Question',
            name: 'Are my texts processed externally?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'No. All typographic mapping calculations strictly happen entirely offline inside your browser natively utilizing imported Figlet font structures locally.',
            },
         },
      ],
   };

   return (
      <article className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

         {/* Hero Section */}
         <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider">
               <Paintbrush className="w-3.5 h-3.5" />
               Visual Headers
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Instantly Craft <span className="text-cyan-500">ASCII Art</span> Details
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Convert regular plaintext inputs instantly into massive, visually striking Figlet fonts seamlessly.
               Perfect for commenting vast code blocks, crafting interactive terminal interfaces, or styling
               documentation headers.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-cyan-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Type className="w-6 h-6 text-cyan-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Instant Transpilation</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Generates multidimensional string graphics flawlessly in real-time as you uniquely construct raw
                  alphabetical keystrokes interactively locally.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-violet-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-violet-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Palette className="w-6 h-6 text-violet-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Popular Figlet Libraries</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Curated premium geometric typographic rendering models seamlessly loaded (including Doom, Slant,
                  Ghost, and Banner3-D styles securely).
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-pink-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Monitor className="w-6 h-6 text-pink-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">CLI Branding</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Design striking Node.js server initiation scripts heavily commanding user attention strictly employing
                  distinct formatting visual frameworks securely.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  Enhance codebase navigation heavily.
               </h2>
               <p className="text-muted-foreground leading-relaxed">
                  Standard comments easily blur completely into dense blocks locally. Using high contrast ASCII text
                  banners explicitly physically separates functional logic environments securely making reviewing
                  significantly simpler implicitly.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Zap,
                        title: 'Ultra-Fast Generation Output',
                        desc: 'Leverage memory-mapped font dictionaries generating instantaneous blocks smoothly scaling typography horizontally automatically.',
                     },
                     {
                        icon: FileCode2,
                        title: 'Cross-Language Compatibility',
                        desc: 'Simply encapsulate outputs seamlessly between Python hashes, HTML tags, or generic JS block comments efficiently globally natively.',
                     },
                  ].map((item, i) => (
                     <li key={i} className="flex gap-4">
                        <div className="mt-1">
                           <item.icon className="w-5 h-5 text-cyan-500" />
                        </div>
                        <div>
                           <h4 className="font-bold text-foreground">{item.title}</h4>
                           <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                     </li>
                  ))}
               </ul>
            </div>
            <div className="bg-muted/50 rounded-3xl p-8 border border-border">
               <div className="flex items-center gap-2 mb-4">
                  <Code2 className="w-4 h-4 text-cyan-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                     Snippet Context
                  </span>
               </div>
               <div className="space-y-3 font-mono text-xs text-muted-foreground overflow-hidden">
                  <pre className="text-emerald-400 font-bold mb-4">
                     {[
                        '/* ',
                        '   ____        _        _                    ',
                        '  |  _ \\      | |      | |                   ',
                        '  | |_) | __ _| |_ __ _| |__   __ _ ___  ___ ',
                        "  |  _ < / _` | __/ _` | '_ \\ / _` / __|/ _ \\",
                        '  | |_) | (_| | || (_| | | | | (_| \\__ \\  __/',
                        '  |____/ \\__,_|\\__\\__,_|_| |_|\\__,_|___/\\___|',
                        '*/',
                     ].join('\n')}
                  </pre>
                  <p>const db = new DatabaseConnection();</p>
                  <p>await db.connect();</p>
               </div>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">How to Generate ASCII Art</h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold font-mono shrink-0">
                     1
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Enter Your Heading Text</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Type the words or phrase you want to convert into ASCII art in the main input editor. The visual
                        result will begin rendering instantly as you type.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold font-mono shrink-0">
                     2
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Select a Typographic Font</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Choose from dozens of premium Figlet fonts in the directory (e.g., Doom, Slant, Big). Each font
                        has a distinct geometric style suitable for different documentation environments.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold font-mono shrink-0">
                     3
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Configure Character Spacing</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Use the settings panel to adjust kerning and horizontal layout. You can also specify the exact
                        character width to ensure the art doesn't wrap awkwardly in your terminal.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold font-mono shrink-0">
                     4
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Preview the Terminal Output</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Check the high-contrast preview pane to ensure the characters align perfectly. What you see in
                        the dark-themed editor is exactly what will appear in your console or code comments.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center font-bold font-mono shrink-0">
                     5
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Copy to Clipboard</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Once satisfied, click the "Copy" button. You can now paste your striking ASCII masterpiece
                        directly into your source code, README files, or terminal splash screens.
                     </p>
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
               <p className="text-muted-foreground">Detailed insights into figlet mappings seamlessly.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
               {faqSchema.mainEntity.map((faq, i) => (
                  <div key={i} className="space-y-3">
                     <h3 className="font-bold text-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                        {faq.name}
                     </h3>
                     <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-cyan-500/20">
                        {faq.acceptedAnswer.text}
                     </p>
                  </div>
               ))}
               <div className="space-y-3">
                  <h3 className="font-bold text-foreground flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                     Is my input data saved?
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-cyan-500/20">
                     To improve your experience, your input data is saved locally in your browser using localStorage.
                     This is entirely client-side, meaning your data never leaves your device. You can opt-out of this
                     behavior at any time by disabling the 'Persist Data' switch in the tool settings.
                  </p>
               </div>
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-cyan-600 rounded-3xl p-12 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <h2 className="text-3xl font-bold text-white relative z-10 mb-4">Beautify Your Source Code</h2>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Generate" />
            </div>
         </div>
      </article>
   );
}
