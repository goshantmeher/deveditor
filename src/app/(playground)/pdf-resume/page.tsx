import { ResumeBuilderView } from '@/components/pdf-resume/ResumeBuilderView';
import { PersistenceProvider } from '@/contexts/PersistenceContext';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Free PDF Resume Builder - Create Professional Resumes Online',
   description:
      'Build your resume for free with no paywalls. Choose from professional templates, customize every section, and download as PDF instantly. 100% client-side — your data never leaves your browser.',
   keywords: [
      'resume builder',
      'free resume builder',
      'pdf resume',
      'cv builder',
      'resume maker',
      'professional resume',
      'resume template',
      'resume generator',
      'no paywall resume',
      'online resume builder',
   ],
   openGraph: {
      title: 'Free PDF Resume Builder - No Paywalls, Fully Customizable',
      description:
         'Build stunning resumes for free. Professional templates, full customization, instant PDF download. 100% client-side privacy.',
      url: 'https://www.deveditor.io/pdf-resume',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Free PDF Resume Builder - No Paywalls',
      description:
         'Build professional resumes with customizable templates. Download as PDF instantly, no account needed.',
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
