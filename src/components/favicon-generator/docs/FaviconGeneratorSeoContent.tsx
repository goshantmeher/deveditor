import { ShieldCheck, Star, Sparkles, MonitorSmartphone, Download, Zap } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function FaviconGeneratorSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'What sizes are required for a perfect Favicon set?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Modern web standards typically require: a baseline 16x16 and 32x32 pixel PNG for generic browser tabs, a 180x180 or 256x256 pixel PNG for Apple Touch Icon mobile home-screens, and up to 512x512 pixels for Android app manifests.',
            },
         },
         {
            '@type': 'Question',
            name: 'Are my brand logos totally private?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes! The image resizing and conversion is carried out using HTML5 canvas directly in your device GPU/CPU. Your custom vector files and illustrations are strictly secure, without uploading any images to a cloud or remote server.',
            },
         },
         {
            '@type': 'Question',
            name: 'How do I add these favicons to HTML?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Put the downloaded images in your websites public root folder, then inject link elements inside your HTML <head> pointing to their addresses and sizes via the "rel=\'icon\'" and "sizes" attributes.',
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
               <Star className="w-3.5 h-3.5" />
               Branding & Design
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Instantly generate <span className="text-indigo-500">Favicons</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Convert a single logo image into all proper scaled versions for modern web browsers, Android manifests, and Apple UI interfaces perfectly.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <MonitorSmartphone className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Cross-Platform</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Generate optimized arrays going universally from tiny 16px bookmark dots through heavy 512px Retina iOS app clips.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Highest Privacy Setup</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Your trademarked and copyrighted art never leaves your hard drive. Native GPU rendering via a secure Sandbox UI layout.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Anti-Aliasing Smoothing</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Utilizes built-in HD Canvas up-scaling traits that ensure jagged edges are suppressed down naturally compared to cheap generic alternatives.
               </p>
            </div>
         </div>

         {/* Visual Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Every size for every standard</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Creating responsive web apps generally means creating over 5 redundant versions of the same logo manually in Illustrator. Drop a large PNG here and let processing math do it for you. 
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: Star,
                        title: 'Perfect Aspect Logic',
                        desc: 'Constrains proportions so the logo keeps it native aspect and scales squarely.',
                     },
                     {
                        icon: Download,
                        title: 'Isolated Downloads',
                        desc: 'Grab individual files easily just for updating the ones necessary, or batch download the matrix all at once.',
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
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                     Quick HTML Guide
                  </span>
               </div>
               <div className="space-y-3 font-mono text-sm">
                  {[
                     { from: 'Standard Tab Icon (Small)', to: '<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">' },
                     { from: 'Apple iOS Dashboard (180)', to: '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">' },
                     { from: 'Android PWA Base (192)', to: '<icon src="/android-chrome-192.png" sizes="192x192">' },
                  ].map((item, i) => (
                     <div key={i} className="flex flex-col gap-1 text-muted-foreground mb-4">
                        <span className="text-xs text-rose-400 opacity-80">{item.from}</span>
                        <span className="text-emerald-400 font-bold">{item.to}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* FAQ Section */}
         <div className="space-y-12 border-t border-border/50 pt-24">
            <div className="text-center space-y-4">
               <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
                  Frequently Asked Questions
               </h2>
               <p className="text-muted-foreground">Information about generating application favicons.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
               {faqSchema.mainEntity.map((faq, i) => (
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
            <h2 className="text-3xl font-bold text-white relative z-10 mb-4">Generate Icons in seconds</h2>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Start Uploading" />
            </div>
         </div>
      </article>
   );
}
