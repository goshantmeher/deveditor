import { RegexTesterView } from '@/components/regex-tester/RegexTesterView';
import { RegexTesterSeoContent } from '@/components/regex-tester/docs/RegexTesterSeoContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'RegEx Tester & Evaluator | Code & Content Tool',
   description:
      'Test, debug, and write Regular Expressions securely in your browser. Real-time syntax highlighting, group extraction, and safe background execution to prevent freezing.',
   keywords: [
      'regex tester',
      'regular expression',
      'regex evaluator',
      'regex debugger',
      'regex cheat sheet',
      'catastrophic backtracking',
      'browser regex',
   ],
   openGraph: {
      title: 'RegEx Tester & Evaluator | DevEditor',
      description:
         'Test, debug, and write Regular Expressions securely in your browser with real-time highlighting and safe execution.',
      url: 'https://www.deveditor.io/regex-tester',
      siteName: 'DevEditor',
      type: 'website',
   },
   alternates: { canonical: 'https://www.deveditor.io/regex-tester' },
};

export default function RegexTesterPage() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main editor viewport */}
         <div className="min-h-[calc(100vh-72px)] lg:h-[calc(100vh-72px)] lg:max-h-[calc(100vh-72px)] shrink-0 w-full overflow-hidden bg-background">
            <RegexTesterView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-12 pb-16 bg-background">
            <RegexTesterSeoContent />
         </div>
      </div>
   );
}
