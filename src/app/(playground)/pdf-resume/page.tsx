import { ResumeBuilderView } from '@/components/pdf-resume/ResumeBuilderView';
import { PersistenceProvider } from '@/contexts/PersistenceContext';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Free AI Resume Builder - Import from ChatGPT, Claude & Gemini | DevEditor',
   description:
      'Build your resume for free with AI-powered import. Use ChatGPT, Claude, or Gemini to generate content, paste it in, and download a polished PDF. No paywalls, no accounts, 100% client-side privacy.',
   keywords: [
      'ai resume builder',
      'free resume builder',
      'chatgpt resume',
      'ai resume generator',
      'resume builder with ai',
      'pdf resume',
      'cv builder',
      'resume maker',
      'professional resume',
      'resume template',
      'resume generator',
      'no paywall resume',
      'online resume builder',
      'claude resume',
      'gemini resume',
      'ai powered resume',
      'import resume from ai',
   ],
   openGraph: {
      title: 'Free AI Resume Builder - Import from Any AI Tool',
      description:
         'Use ChatGPT, Claude, or any AI to generate resume content. Paste it in, pick a template, download PDF. 100% free, no paywalls.',
      url: 'https://www.deveditor.io/pdf-resume',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Free AI Resume Builder - Use Any AI Tool',
      description:
         'Import resume content from ChatGPT, Claude, or Gemini. Professional templates, instant PDF download, no account needed.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/pdf-resume',
   },
};

import { ResumeBuilderSeoContent } from '@/components/pdf-resume/docs/ResumeBuilderSeoContent';

export default function Page() {
   return (
      <PersistenceProvider>
         <div id="page-top" className="flex flex-col">
            {/* The main tool viewport */}
            <div className="h-[calc(100vh-72px)] shrink-0">
               <ResumeBuilderView />
            </div>

            {/* SEO Content directly in the DOM, below the fold */}
            <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
               <ResumeBuilderSeoContent />
            </div>
         </div>
      </PersistenceProvider>
   );
}
