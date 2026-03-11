import { Target, Zap, Clock, ShieldAlert } from 'lucide-react';
import { ScrollToTopButton } from '../../ScrollToTopButton';

export function PasswordStrengthSeoContent() {
   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
         {
            '@type': 'Question',
            name: 'Is it safe to type my real password here?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Yes. The entire zxcvbn evaluation engine runs locally inside your browser tab without making any external API network requests. However, as a general security rule of thumb, you should avoid typing highly sensitive passwords anywhere except official login dashboards and within verified password managers.',
            },
         },
         {
            '@type': 'Question',
            name: 'Why is my long password still rated weak?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'The zxcvbn library analyzes against massive dictionaries of known breached passwords, common names, dates, pop-culture phrases, and spatial keyboard patterns (like qwerty). If your long password consists entirely of a common dictionary word combined with a simple suffix (like "monkey123!"), the algorithm will flag it as weak despite length.',
            },
         },
         {
            '@type': 'Question',
            name: 'What does total entropy mean?',
            acceptedAnswer: {
               '@type': 'Answer',
               text: 'Entropy is a mathematical measure of randomness or unpredictability. In cryptography, an entropy score above 60 bits is generally considered robust against online throttling attacks, whereas 128 bit entropy signifies protection against heavy offline GPU brute-force attempts.',
            },
         },
      ],
   };

   return (
      <article className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-24">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

         {/* Hero Section */}
         <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold uppercase tracking-wider">
               <ShieldAlert className="w-3.5 h-3.5" />
               Security Utilities
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
               Password <span className="text-blue-500">Strength Checker</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
               Evaluate password entropy instantly using advanced dictionary matching strategies. Understand
               realistically how long a password takes to crack.
            </p>
         </div>

         {/* Feature Grid */}
         <div className="grid md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-blue-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6 text-blue-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Advanced Pattern Matching</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Leverages Dropbox's brilliant zxcvbn logic which detects standard dictionary words, structural
                  sequential keyboard patterns, and repeated metrics realistically.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-rose-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 text-rose-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Real-time Feedback UI</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Visual warning cues and text hints instantly outline why a specific password sequence appears weak or
                  predictable allowing you to adjust parameters dynamically.
               </p>
            </div>

            <div className="group p-8 rounded-3xl bg-muted/30 border border-border/50 hover:border-amber-500/30 transition-all duration-300">
               <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6 text-amber-500" />
               </div>
               <h3 className="text-xl font-bold mb-3 text-foreground">Estimating Crack Times</h3>
               <p className="text-muted-foreground text-sm leading-relaxed">
                  Outputs specific mathematical crack times evaluating against slow offline hashes, massively parallel
                  GPU clusters, or raw online throttled login endpoints.
               </p>
            </div>
         </div>

         {/* How to Use Section */}
         <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
               How to Audit Password Strength
            </h2>
            <div className="max-w-4xl mx-auto space-y-6">
               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold font-mono shrink-0">
                     1
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Type Your Password Sequence</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Enter the password you wish to test into the input field. The evaluator begins processing the
                        characters locally in real-time as you type each keystroke.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold font-mono shrink-0">
                     2
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Observe the Score Meter</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Review the color-coded strength bar. It ranges from "Very Weak" (Red) to "Very Strong" (Deep
                        Blue), providing an immediate visual summary of the overall complexity.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold font-mono shrink-0">
                     3
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Read the Pattern Analysis</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Look for the "Hints" and "Warnings" section. The tool identifies common pitfalls like dictionary
                        words, dates, or sequences (e.g., "12345") that make a password easier to guess.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold font-mono shrink-0">
                     4
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Review Crack Time Estimates</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        Check the estimated time required for different attack vectors. See how long it would take an
                        attacker using a standard laptop versus a massive GPU array to brute-force your entry.
                     </p>
                  </div>
               </div>

               <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold font-mono shrink-0">
                     5
                  </div>
                  <div>
                     <h4 className="font-bold text-foreground text-lg mb-1">Refine and Retest</h4>
                     <p className="text-muted-foreground text-sm leading-relaxed">
                        If the score is low, try adding randomized symbols or numbers in unexpected positions—avoiding
                        common substitutions like '3' for 'E'. Watch the score update instantly as you improve the
                        secret.
                     </p>
                  </div>
               </div>
            </div>
         </div>

         {/* FAQ Section */}
         <div className="space-y-12 border-t border-border/50 pt-24">
            <div className="text-center space-y-4">
               <h2 className="text-3xl font-bold tracking-tight text-foreground text-center">
                  Frequently Asked Questions
               </h2>
               <p className="text-muted-foreground">General information evaluating encryption entropy directly.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
               {faqSchema.mainEntity.map((faq, i) => (
                  <div key={i} className="space-y-3">
                     <h3 className="font-bold text-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        {faq.name}
                     </h3>
                     <p className="text-sm text-muted-foreground leading-relaxed pl-3.5 border-l border-blue-500/20">
                        {faq.acceptedAnswer.text}
                     </p>
                  </div>
               ))}
            </div>
         </div>

         {/* CTA Section */}
         <div className="bg-blue-600 rounded-3xl p-12 text-center space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <h2 className="text-3xl font-bold text-white relative z-10">Check Your Password Weaknesses</h2>
            <p className="text-blue-100 max-w-xl mx-auto relative z-10">
               See if your favorite go-to password structure is vulnerable to modern computing power immediately
               directly via browser.
            </p>
            <div className="pt-4 relative z-10">
               <ScrollToTopButton label="Scroll up to Check" />
            </div>
         </div>
      </article>
   );
}
