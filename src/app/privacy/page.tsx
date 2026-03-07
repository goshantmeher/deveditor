import { Metadata } from 'next';
import { Shield, Eye, Server, Cookie, BarChart3, Lock, Globe, FileText } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
   title: 'Privacy Policy - DevEditor',
   description:
      'DevEditor privacy policy. Learn how we protect your data. All tools are 100% client-side — your files and content never leave your browser.',
   alternates: { canonical: 'https://www.deveditor.io/privacy' },
};

const sections = [
   {
      id: 'overview',
      icon: Shield,
      title: 'Privacy Overview',
      content: `DevEditor is built with a privacy-first architecture. Every tool on this platform processes your data entirely in your browser using client-side JavaScript. Your files, text, JSON, PDFs, resumes, code, and all other content never leave your device.

We do not operate any backend servers that receive, store, or process user-generated content. There are no accounts, no sign-ups, and no user databases.`,
   },
   {
      id: 'client-side',
      icon: Lock,
      title: 'Client-Side Processing',
      content: `All DevEditor tools — including the JSON Editor, Resume Builder, PDF tools, Base64 Encoder, Markdown Generator, and every other utility — run entirely in your web browser.

When you paste JSON, upload a PDF, type resume content, or use any tool:
• Your data is processed by JavaScript running locally in your browser
• No data is transmitted to our servers or any third-party service
• When you close the tab, your data is gone (unless you enable local persistence, which uses your browser's localStorage — still on your device)

This means even if our servers were compromised, your content would be safe because it was never there in the first place.`,
   },
   {
      id: 'ai-import',
      icon: Eye,
      title: 'AI Import Feature',
      content: `Our Resume Builder includes an "Import from AI" feature. Here's exactly how it works:

• We provide you with a text prompt to copy
• You paste that prompt into your own AI tool (ChatGPT, Claude, Gemini, etc.)
• The AI generates structured resume content
• You paste the AI's response back into DevEditor
• DevEditor parses it locally in your browser

At no point does DevEditor communicate with any AI service. The AI interaction happens entirely between you and your chosen AI provider, governed by their privacy policy. We have no access to, knowledge of, or involvement in that exchange.`,
   },
   {
      id: 'speed-insights',
      icon: BarChart3,
      title: 'Performance Analytics',
      content: `We use Vercel Speed Insights to monitor how fast our pages load for real users. This helps us optimize performance and identify slow pages.

What Speed Insights collects (anonymously):
• Page route (e.g., "/merge-pdf") — not your content
• Core Web Vitals (load time, interactivity, visual stability)
• Device type (mobile, desktop, tablet)
• Browser and OS
• Network speed (4G, 3G)
• Country (ISO code only, not city or IP)

What Speed Insights does NOT collect:
• No IP addresses are stored
• No cookies are used
• No personal information of any kind
• No user-generated content (your files, text, code)
• No browsable session history
• No cross-page tracking

Speed Insights is GDPR-compliant. All data is anonymous, aggregated, and cannot be used to identify any individual visitor. Session data is discarded after 24 hours.`,
   },
   {
      id: 'local-storage',
      icon: Server,
      title: 'Local Persistence (Optional)',
      content: `Some tools offer an optional "Persist Data" toggle. When enabled, your content is saved to your browser's localStorage so it survives page refreshes.

• localStorage is a browser API — data stays on your device
• We never read, sync, or transmit localStorage data
• You can clear it at any time via your browser settings or by disabling persistence
• If you never enable persistence, nothing is stored at all`,
   },
   {
      id: 'cookies',
      icon: Cookie,
      title: 'Cookies',
      content: `DevEditor does not use any cookies for tracking, analytics, or advertising. 

The only cookie-like mechanism is the theme preference (dark/light mode), which uses localStorage — not actual cookies. No third-party cookies are set by our site.`,
   },
   {
      id: 'third-party',
      icon: Globe,
      title: 'Third-Party Services',
      content: `DevEditor uses the following third-party services:

• Vercel — hosting and Speed Insights (performance monitoring only, as described above)
• Google Fonts — web fonts loaded from Google's CDN (subject to Google's privacy policy)

We do not use:
• No advertising networks
• No social media trackers
• No user analytics platforms (no Google Analytics, no Mixpanel, etc.)
• No A/B testing services that track users
• No third-party cookies`,
   },
   {
      id: 'open-source',
      icon: FileText,
      title: 'Transparency',
      content: `DevEditor's source code is publicly available. You can inspect exactly what data is processed and verify that no user content is ever transmitted to any server.

If you have questions about our privacy practices, you can reach us at goshantmeher@gmail.com.`,
   },
];

export default function PrivacyPage() {
   return (
      <div className="min-h-screen bg-background">
         <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20">
            {/* Header */}
            <div className="text-center space-y-4 mb-16">
               <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium border border-emerald-500/20">
                  <Shield className="w-4 h-4" />
                  Privacy First
               </div>
               <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Privacy Policy</h1>
               <p className="text-muted-foreground max-w-2xl mx-auto">
                  Your data stays on your device. Always. Here&apos;s exactly how DevEditor protects your privacy.
               </p>
               <p className="text-xs text-muted-foreground">
                  Last updated: March 7, 2026
               </p>
            </div>

            {/* TL;DR Box */}
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-6 md:p-8 mb-12">
               <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-emerald-500" />
                  TL;DR
               </h2>
               <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                     <span className="text-emerald-500 mt-1">✓</span>
                     All tools process data 100% in your browser — nothing is uploaded
                  </li>
                  <li className="flex items-start gap-2">
                     <span className="text-emerald-500 mt-1">✓</span>
                     No accounts, no sign-ups, no user database
                  </li>
                  <li className="flex items-start gap-2">
                     <span className="text-emerald-500 mt-1">✓</span>
                     No cookies, no tracking, no ads
                  </li>
                  <li className="flex items-start gap-2">
                     <span className="text-emerald-500 mt-1">✓</span>
                     Only anonymous page performance metrics are collected (Vercel Speed Insights)
                  </li>
                  <li className="flex items-start gap-2">
                     <span className="text-emerald-500 mt-1">✓</span>
                     GDPR compliant — no personal data is processed or stored
                  </li>
               </ul>
            </div>

            {/* Table of Contents */}
            <nav className="mb-12 p-4 bg-muted/20 border border-border/30 rounded-xl">
               <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Contents</p>
               <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {sections.map((s) => (
                     <li key={s.id}>
                        <a href={`#${s.id}`} className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                           <s.icon className="w-3.5 h-3.5" />
                           {s.title}
                        </a>
                     </li>
                  ))}
               </ul>
            </nav>

            {/* Sections */}
            <div className="space-y-12">
               {sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-20">
                     <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0">
                           <section.icon className="w-4.5 h-4.5 text-indigo-500" />
                        </div>
                        <h2 className="text-xl font-bold">{section.title}</h2>
                     </div>
                     <div className="pl-12 space-y-3">
                        {section.content.split('\n\n').map((paragraph, i) => (
                           <p key={i} className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                              {paragraph}
                           </p>
                        ))}
                     </div>
                  </section>
               ))}
            </div>

            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-border/30 text-center space-y-2">
               <p className="text-sm text-muted-foreground">
                  Questions? Contact us at{' '}
                  <a href="mailto:goshantmeher@gmail.com" className="text-indigo-500 hover:underline">
                     goshantmeher@gmail.com
                  </a>
               </p>
               <p className="text-xs text-muted-foreground">
                  <Link href="/" className="hover:text-foreground transition-colors">← Back to DevEditor</Link>
               </p>
            </div>
         </div>
      </div>
   );
}
