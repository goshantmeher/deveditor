import { CronParserView } from '@/components/cron-parser/CronParserView';
import { Metadata } from 'next';
import { CronParserSeoContent } from '@/components/cron-parser/docs/CronParserSeoContent';

export const metadata: Metadata = {
   title: 'Cron Expression Parser & Translator - DevEditor',
   description:
      'Translate cron expressions into human-readable English text instantly. View the next 5 upcoming scheduled execution times for any crontab string automatically natively in your browser.',
   keywords: ['cron parser', 'cron translator', 'cron to english', 'crontab generator', 'cron next execution', 'cron evaluator'],
   openGraph: {
      title: 'Cron Expression Parser & Translator',
      description: 'Convert complex cron strings into plain English sentences instantly locally.',
      url: 'https://www.deveditor.io/cron-parser',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Offline Cron Schedule Evaluator',
      description: 'Decode exact execution arrays directly without arbitrary server delays.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/cron-parser',
   },
};

export default function Page() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main tool viewport */}
         <div className="h-[calc(100vh-72px)] shrink-0">
            <CronParserView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
            <CronParserSeoContent />
         </div>
      </div>
   );
}
