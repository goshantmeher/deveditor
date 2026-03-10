import { ShieldCheck, Camera, MapPin, Eye, Trash2, Lock, Sparkles } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function ExifViewerSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'Are my photos uploaded anywhere?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'No. All EXIF reading and stripping happens 100% in your browser. Your photos never leave your device.',
            },
         },
         {
            '@type': 'Question',
            name: 'What metadata can be stripped?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Stripping removes EXIF, XMP, and other embedded metadata including GPS coordinates, camera make/model, date taken, and more. The image pixels stay intact.',
            },
         },
         {
            '@type': 'Question',
            name: 'Why would I want to remove EXIF data?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'EXIF can reveal your location (GPS), device info, and timestamps. Removing it before sharing photos online protects your privacy.',
            },
         },
         {
            '@type': 'Question',
            name: 'Which image formats are supported?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'The tool supports JPEG, PNG, WebP, and HEIC images. JPEG files typically contain the most EXIF metadata, including GPS coordinates and camera settings.',
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
               <ShieldCheck className="w-3.5 h-3.5" />
               Privacy Tool
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               EXIF Data <span className="text-indigo-500">Viewer & Remover</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Read and strip metadata from photos — GPS coordinates, camera info, timestamps, and more.
               Protect your privacy before sharing images online. 100% client-side.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-indigo-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Eye className="w-6 h-6 text-indigo-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Deep Metadata Inspection</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Read EXIF, XMP, IPTC, and ICC profile data. View GPS coordinates, camera make/model, lens info, exposure settings, and timestamps.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-emerald-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Trash2 className="w-6 h-6 text-emerald-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">One-Click Stripping</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Remove all embedded metadata with a single click. Download a clean copy with identical pixel quality — safe for sharing anywhere.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Lock className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">100% Client-Side</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  No uploads. Photos stay in your browser and are never transmitted to any server. Complete privacy and security guaranteed.
               </p>
            </div>
         </div>

         {/* Visual/Detail Section */}
         <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
               <h2 className="text-3xl font-bold tracking-tight text-foreground">Why Metadata Matters</h2>
               <p className="text-muted-foreground leading-relaxed">
                  Every photo you take stores hidden information. Before sharing images online, it&apos;s worth knowing what data is embedded — and removing what you don&apos;t want public.
               </p>
               <ul className="space-y-4">
                  {[
                     {
                        icon: MapPin,
                        title: 'GPS Location',
                        desc: 'Photos often embed exact latitude/longitude coordinates of where they were taken.',
                     },
                     {
                        icon: Camera,
                        title: 'Camera & Device Info',
                        desc: 'Camera model, lens, serial number, and software version are commonly stored.',
                     },
                     {
                        icon: ShieldCheck,
                        title: 'Privacy Protection',
                        desc: 'Stripping metadata before sharing prevents location tracking and device fingerprinting.',
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
                     Always strip EXIF data before uploading photos to social media, forums, or marketplaces. Even if the platform removes some metadata, it&apos;s safer to clean it yourself first.
                  </p>
                  <p>
                     Supported formats: <code className="text-indigo-400">JPEG</code>, <code className="text-indigo-400">PNG</code>, <code className="text-indigo-400">WebP</code>, and <code className="text-indigo-400">HEIC</code>. JPEG photos typically contain the richest metadata.
                  </p>
               </div>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8 border-t border-border/50 pt-24">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">How to Use</h2>
            <div className="max-w-4xl mx-auto space-y-6">
               {[
                  { n: 1, color: 'indigo', t: 'Upload a Photo', d: 'Drop a JPEG, PNG, WebP, or HEIC file. Metadata will be read and displayed instantly.' },
                  { n: 2, color: 'emerald', t: 'Review Metadata', d: 'Scroll the table to see all EXIF/XMP fields — GPS coordinates, camera info, dates, and more.' },
                  { n: 3, color: 'amber', t: 'Strip & Download', d: 'Click "Strip metadata" to create a clean copy. Download the stripped image ready for safe sharing.' },
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
               <h2 className="text-3xl font-bold text-white">Protect Your Privacy</h2>
               <p className="text-indigo-100 max-w-xl mx-auto">
                  Strip hidden metadata from your photos before sharing. No uploads, no tracking — completely local.
               </p>
               <div className="pt-4">
                  <ScrollToTopButton label="Scroll up to Start Stripping" />
               </div>
            </div>
         </div>
      </article>
   );
}
