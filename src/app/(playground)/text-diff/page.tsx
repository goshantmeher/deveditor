import { TextDiffView } from '@/components/text-diff/TextDiffView';
import { TextDiffSeoContent } from '@/components/text-diff/docs/TextDiffSeoContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Text Diff Checker | Code & Content Comparison Tool',
   description:
      'Compare text blocks side-by-side to find differences instantly. Find character and word-level diffs with visual highlighting.',
   keywords: [
      'text diff',
      'diff checker',
      'compare text',
      'file diff',
      'difference checker',
      'developer tools',
   ],
};

export default function TextDiffPage() {
   return (
      <div className="flex flex-col">
         {/* The main editor viewport */}
         <div className="h-[calc(100vh-72px)] shrink-0 w-full max-w-[1600px] mx-auto overflow-hidden bg-background border-x border-border/40">
            <TextDiffView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-12 pb-16 bg-muted/5">
            <TextDiffSeoContent />
         </div>
      </div>
   );
}
