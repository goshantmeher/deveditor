import type { Metadata } from 'next';
import Link from 'next/link';
import {
   Github,
   Linkedin,
   Shield,
   Eye,
   Zap,
   Heart,
   ArrowLeft,
   Globe,
   Lock,
   Code2,
   BadgeCheck,
} from 'lucide-react';

export const metadata: Metadata = {
   title: 'About',
   description:
      'Learn about DevEditor — free, open-source developer tools with no ads, no tracking, and no paywalls. Built by Goshant Meher.',
   openGraph: {
      title: 'About DevEditor',
      description:
         'Free, privacy-first developer tools. No ads, no tracking, no paywalls.',
      url: 'https://www.deveditor.io/about',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/about',
   },
};

const principles = [
   {
      icon: Shield,
      title: 'Zero Tracking',
      description:
         "No analytics, no cookies, no fingerprinting. Your data never leaves your browser. We don't even have a server to send it to.",
      gradient: 'from-emerald-500/20 to-teal-500/20',
      iconColor: 'text-emerald-400',
   },
   {
      icon: Eye,
      title: 'No Ads, Ever',
      description:
         'No banners, no pop-ups, no sponsored content, no "upgrade to pro" nagging. Just the tools you came for, clean and distraction-free.',
      gradient: 'from-blue-500/20 to-indigo-500/20',
      iconColor: 'text-blue-400',
   },
   {
      icon: Zap,
      title: '100% Client-Side',
      description:
         'Everything runs in your browser. Your JSON, your YAML, your data — it stays on your machine. There is no backend, by design.',
      gradient: 'from-amber-500/20 to-orange-500/20',
      iconColor: 'text-amber-400',
   },
   {
      icon: Lock,
      title: 'Free Forever',
      description:
         'No freemium tiers, no feature gates, no trial periods. Every tool is fully available to everyone, no strings attached.',
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-400',
   },
];

export default function AboutPage() {
   return (
      <div className="min-h-screen bg-background">
         <div className="container mx-auto px-4 py-12 max-w-3xl">
            {/* Back Link */}
            <Link
               href="/"
               className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 group"
            >
               <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
               Back to Tools
            </Link>

            {/* Hero Section */}
            <section className="mb-16">
               <h1 className="text-4xl font-bold tracking-tight mb-4">
                  About DevEditor
               </h1>
               <p className="text-lg text-muted-foreground leading-relaxed">
                  A collection of free, privacy-first developer tools that{' '}
                  <span className="text-foreground font-medium">
                     respect your time and your data
                  </span>
                  .
               </p>
            </section>

            {/* Why Section */}
            <section className="mb-16">
               <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-1 rounded-full bg-linear-to-b from-blue-500 to-purple-500" />
                  <h2 className="text-2xl font-semibold tracking-tight">
                     Why I Built This
                  </h2>
               </div>
               <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                     As a developer, I use online tools every day — JSON
                     formatters, data converters, encoders, decoders. Simple
                     utilities that should take two seconds. But every time I
                     searched for one, I&apos;d land on a page bloated with ads,
                     cookie consent banners, and &ldquo;Sign up to
                     continue&rdquo; pop-ups. Some even had the audacity to
                     charge a subscription for a JSON formatter. A{' '}
                     <em>JSON formatter</em>.
                  </p>
                  <p>
                     Worse, most of these tools send your data to their servers
                     for processing. Your API keys, your config files, your test
                     data — all passing through someone else&apos;s
                     infrastructure. That never sat well with me.
                  </p>
                  <p>
                     So I built what I wanted to use:{' '}
                     <span className="text-foreground font-medium">
                        a set of developer tools that run entirely in the
                        browser
                     </span>
                     . No server calls, no tracking scripts, no data harvesting.
                     Just open the page and use it. That&apos;s it.
                  </p>
                  <p>
                     DevEditor is designed with one simple belief — tools that
                     every developer needs should be freely available, fast, and
                     respectful of your privacy. No exceptions.
                  </p>
               </div>
            </section>

            {/* Principles Grid */}
            <section className="mb-16">
               <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-1 rounded-full bg-linear-to-b from-emerald-500 to-teal-500" />
                  <h2 className="text-2xl font-semibold tracking-tight">
                     Core Principles
                  </h2>
               </div>
               <div className="grid gap-4 sm:grid-cols-2">
                  {principles.map((p) => (
                     <div
                        key={p.title}
                        className={`
                           rounded-xl border border-border/50 p-5
                           bg-linear-to-br ${p.gradient}
                           hover:border-border transition-colors
                        `}
                     >
                        <p.icon className={`h-5 w-5 mb-3 ${p.iconColor}`} />
                        <h3 className="font-semibold text-foreground mb-1.5">
                           {p.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                           {p.description}
                        </p>
                     </div>
                  ))}
               </div>
            </section>

            {/* About Me Section */}
            <section className="mb-16">
               <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-1 rounded-full bg-linear-to-b from-amber-500 to-orange-500" />
                  <h2 className="text-2xl font-semibold tracking-tight">
                     Built By
                  </h2>
               </div>
               <div className="rounded-xl border border-border/50 p-6 bg-card">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                     {/* Avatar placeholder with initials */}
                     <div className="shrink-0 h-16 w-16 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                        GM
                     </div>
                     <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-1">
                           Goshant Meher
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                           Software engineer who cares about developer
                           experience, privacy, and building tools that
                           don&apos;t waste your time. I believe the best
                           developer tools should be open, fast, and free — so
                           I&apos;m building exactly that.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                           <a
                              href="https://github.com/goshantmeher"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm
                                 border border-border/50 text-muted-foreground
                                 hover:text-foreground hover:border-border hover:bg-accent
                                 transition-colors"
                              aria-label="GitHub Profile"
                           >
                              <Github className="h-4 w-4" />
                              GitHub
                           </a>
                           <a
                              href="https://www.linkedin.com/in/meher-goshant"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm
                                 border border-border/50 text-muted-foreground
                                 hover:text-foreground hover:border-border hover:bg-accent
                                 transition-colors"
                              aria-label="LinkedIn Profile"
                           >
                              <Linkedin className="h-4 w-4" />
                              LinkedIn
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            </section>

            {/* Open Source Section */}
            <section className="mb-16">
               <div className="flex items-center gap-3 mb-6">
                  <div className="h-8 w-1 rounded-full bg-linear-to-b from-pink-500 to-red-500" />
                  <h2 className="text-2xl font-semibold tracking-tight">
                     Open & Transparent
                  </h2>
               </div>
               <div className="rounded-xl border border-border/50 p-6 bg-card space-y-4 text-muted-foreground leading-relaxed">
                  <div className="flex items-start gap-3">
                     <Code2 className="h-5 w-5 mt-0.5 text-pink-400 shrink-0" />
                     <p>
                        DevEditor is open source. You can inspect every line of
                        code, verify there&apos;s no tracking, and even
                        self-host it if you prefer. Transparency isn&apos;t a
                        feature — it&apos;s the foundation.
                     </p>
                  </div>
                  <div className="flex items-start gap-3">
                     <Globe className="h-5 w-5 mt-0.5 text-blue-400 shrink-0" />
                     <p>
                        Want to contribute a new tool, fix a bug, or suggest an
                        improvement? The repository is public and contributions
                        are welcome.
                     </p>
                  </div>
                  <div className="flex items-start gap-3">
                     <BadgeCheck className="h-5 w-5 mt-0.5 text-emerald-400 shrink-0" />
                     <p>
                        No accounts. No API keys. No terms of service you need
                        to agree to. Open the page. Use the tool. Close the tab.
                        That&apos;s the entire workflow.
                     </p>
                  </div>
               </div>
            </section>

            {/* Footer CTA */}
            <footer className="text-center border-t border-border/50 pt-8 pb-4">
               <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground mb-3">
                  <span>Built with</span>
                  <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
                  <span>for developers who deserve better tools.</span>
               </div>
               <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:underline transition-colors"
               >
                  Explore the tools →
               </Link>
            </footer>
         </div>
      </div>
   );
}
