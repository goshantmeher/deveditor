import { Image as ImageIcon, ShieldCheck, Zap, Maximize2, FileType, Code2, Sparkles } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function SvgToPngSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'Is my SVG data uploaded anywhere?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'No. All SVG rendering happens 100% in your browser using Canvas APIs. Your SVG code never leaves your device.',
            },
         },
         {
            '@type': 'Question',
            name: 'What resolution can I export at?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'You can set a max dimension between 64px and 4096px. The export scales your SVG to fit within that dimension while preserving aspect ratio.',
            },
         },
         {
            '@type': 'Question',
            name: 'Is my input data saved?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'To improve your experience, your SVG content and settings are saved locally in your browser using localStorage. This is entirely client-side — your data never leaves your device. You can opt-out by disabling the "Persist Data" switch in tool settings.',
            },
         },
         {
            '@type': 'Question',
            name: 'Should I choose PNG or JPEG?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Use PNG when your SVG has transparency or you need pixel-perfect rendering. Choose JPEG for smaller file sizes when transparency is not needed — JPEG fills transparent areas with a white background.',
            },
         },
      ],
   };

   return (
      <article className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

         {/* Hero Section */}
         <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider">
               <ImageIcon className="w-3.5 h-3.5" />
               Vector to Raster
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               SVG to <span className="text-indigo-500">PNG/JPEG</span> Converter
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Render SVG onto canvas and export as raster at custom resolution.
               Paste code or upload a file — all processing happens client-side.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Maximize2 className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Custom Resolution</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Export at 64px to 4096px max dimension. Scale your SVG to any size while automatically preserving aspect ratio.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">100% Client-Side</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  No uploads. SVG code and rendering stay in your browser. Complete privacy with zero server dependency.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileType className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">PNG or JPEG</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Choose PNG for transparency support or JPEG for smaller file size. Instant conversion with live preview.
               </p>
            </div>
         </div>

         {/* Visual/Detail Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Flexible Input Methods</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Whether you have SVG code in your clipboard or an SVG file on disk, the converter handles both workflows seamlessly.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Code2,
                        title: 'Paste SVG Code',
                        desc: 'Paste raw SVG markup directly into the editor. Edit inline before converting.',
                     },
                     {
                        icon: ImageIcon,
                        title: 'Upload SVG Files',
                        desc: 'Drag and drop an .svg file to load its contents automatically.',
                     },
                     {
                        icon: Zap,
                        title: 'Instant Preview',
                        desc: 'See the rendered raster output immediately after conversion with live preview.',
                     },
                  ].map((item, i) => (
                     <li key={i} className="flex gap-4">
                        <div className="mt-1">
                           <item.icon className="w-5 h-5 text-indigo-500" />
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
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Pro Tip</span>
               </div>
               <div className="prose prose-invert prose-sm">
                  <p>
                     For crisp icons and logos, set the max dimension to <code className="text-indigo-400">2x</code> or <code className="text-indigo-400">3x</code> your target display size. This ensures sharp rendering on high-DPI (Retina) screens.
                  </p>
                  <p>
                     If your SVG uses external fonts, convert them to paths first — the browser canvas won&apos;t load external font files during rendering.
                  </p>
               </div>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8 border-t border-border/50 pt-24">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">How to Convert SVG to Raster</h2>
            <div className="max-w-4xl mx-auto space-y-6">
               {[
                  { n: 1, color: 'indigo', t: 'Paste or Upload SVG', d: 'Paste your SVG code in the textarea or drop an .svg file to load it automatically.' },
                  { n: 2, color: 'emerald', t: 'Set Format & Resolution', d: 'Choose PNG or JPEG output and set the max dimension (64–4096px).' },
                  { n: 3, color: 'amber', t: 'Convert & Download', d: 'Click "Convert to raster". Preview the rendered output and download when ready.' },
               ].map(({ n, color, t, d }) => (
                  <div key={n} className="flex gap-4">
                     <div className={`w-8 h-8 rounded-full bg-${color}-500/10 text-${color}-400 flex items-center justify-center font-bold font-mono shrink-0`}>{n}</div>
                     <div>
                        <h4 className="font-bold text-foreground text-lg mb-1">{t}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed">{d}</p>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* FAQ Section */}
         <div className="space-y-12 border-t border-border/50 pt-24">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">Frequently Asked Questions</h2>
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
               {faqSchema.mainEntity.map((faq: { name: string; acceptedAnswer: { text: string } }, i: number) => (
                  <div key={i} className="space-y-3">
                     <h3 className="font-bold text-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        {faq.name}
                     </h3>
                     <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-indigo-500/20">
                        {faq.acceptedAnswer.text}
                     </p>
                  </div>
               ))}
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-indigo-600 rounded-3xl p-12 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <div className="relative z-10 space-y-6">
               <h2 className="text-3xl font-bold text-white">Export SVG to Raster Privately</h2>
               <p className="text-indigo-100 max-w-xl mx-auto">
                  Convert vector graphics to high-resolution raster images. No uploads, no limits — runs entirely in your browser.
               </p>
               <div className="pt-4">
                  <ScrollToTopButton label="Scroll up to Convert" />
               </div>
            </div>
         </div>
      </article>
   );
}
