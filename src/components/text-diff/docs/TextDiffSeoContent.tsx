import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from '@/components/ui/accordion';

export function TextDiffSeoContent() {
   const faqs = [
      {
         question: 'What is a Text Diff Checker?',
         answer:
            'A text diff (difference) checker is an analytical tool that compares two blocks of text, typically an "original" version and a "modified" version, to highlight exactly what has changed between them. It visually represents added text in green and removed text in red, making it easy to track revisions.',
      },
      {
         question: 'Does my text get sent to a server?',
         answer:
            'No. The Text Diff Checker operates entirely within your browser using client-side JavaScript. None of your sensitive text, code, or personal data is uploaded to our servers. It is fully secure and privacy-respecting.',
      },
      {
         question: 'Can I check code diffs as well as plain text?',
         answer:
            'Yes! You can paste any text format, including programming code, configuration files (JSON, YAML, etc.), or prose. The tool supports multiple lines and accurately parses line, word, and character-level differences.',
      },
      {
         question: 'What is the difference between split and unified view?',
         answer:
            'A Split View displays the original text on the left and the modified text on the right side-by-side, which is often preferred for large code files. A Unified View interleaves both the original and modified texts into a single, continuous stream, which is useful on smaller screens like mobile phones.',
      },
      {
         question: 'What powers this diff checker?',
         answer:
            'This tool is built on robust semantic difference algorithms, specifically utilizing the highly optimized algorithms initially created by Google (diff-match-patch) to find the most efficient pathways of differences computationally.',
      },
   ];

   return (
      <div className="container mx-auto px-4 max-w-5xl text-foreground">
         <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold mb-4">
               Text Diff Checker & Comparison Tool — Compare Code & Documents Inline
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
               Find exactly what changed between two versions of text files, code snippets, or articles. 
               Instantly spot character and word-level modifications without your data ever leaving your browser.
            </p>
         </div>

         <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-muted/10 border-border/40 hover:bg-muted/20 transition-colors">
               <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                     <span className="text-primary">📝</span> Why Compare Text Formats?
                  </CardTitle>
               </CardHeader>
               <CardContent className="text-sm text-muted-foreground space-y-4">
                  <p>
                     When collaborating on articles, managing configuration files manually, or 
                     reviewing raw code dumps, it can be nearly impossible to spot a single missing 
                     semicolon or a slightly rephrased sentence by the naked eye.
                  </p>
                  <p>
                     Text difference checkers utilize complex semantic algorithmic matching to 
                     parse two unstructured blocks of string and extract exactly which individual 
                     character clusters were added, deleted, or left intact.
                  </p>
               </CardContent>
            </Card>

            <Card className="bg-muted/10 border-border/40 hover:bg-muted/20 transition-colors">
               <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                     <span className="text-primary">🔒</span> Privacy by Design
                  </CardTitle>
               </CardHeader>
               <CardContent className="text-sm text-muted-foreground space-y-4">
                  <p>
                     As developers, we often handle sensitive environment variables, proprietary 
                     algorithm configurations, and private user keys. Sending this data to a remote 
                     server solely to compare revisions creates severe security vulnerabilities.
                  </p>
                  <p>
                     Our Text Diff Checker is strictly <strong>100% Client-Side</strong>. We leverage modern 
                     browser capabilities to perform heavy difference computations right on your local 
                     machine without needing a backend server API pipeline.
                  </p>
               </CardContent>
            </Card>
         </div>

         <div className="max-w-3xl mx-auto bg-card rounded-xl border border-border/50 p-6 shadow-sm mb-8">
            <h3 className="text-xl font-semibold mb-6 text-center">
               Frequently Asked Questions
            </h3>
            <Accordion type="single" collapsible className="w-full">
               {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                     <AccordionTrigger className="text-left font-medium">
                        {faq.question}
                     </AccordionTrigger>
                     <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                     </AccordionContent>
                  </AccordionItem>
               ))}
            </Accordion>
         </div>
      </div>
   );
}
