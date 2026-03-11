'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert, AlertTriangle, ShieldCheck, Clock, Zap, Target, History, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { checkPasswordStrength } from '@/lib/password-strength-utils';

export function PasswordStrengthView() {
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);

   const [result, setResult] = useState(checkPasswordStrength(''));

   // Compute score
   useEffect(() => {
      if (typeof window === 'undefined') return;

      const res = checkPasswordStrength(password);
      setResult(res);
   }, [password]);

   const handleClear = () => {
      setPassword('');
   };

   // Styling depending on score (0-4)
   let strengthColor = 'bg-red-500';
   let strengthLabel = 'Very Weak';
   let strengthIcon = <AlertTriangle className="w-5 h-5 text-red-500" />;
   let headerClasses = 'text-red-500 bg-red-500/10 border-red-500/20';

   switch (result.score) {
      case 0:
         strengthColor = 'bg-red-500';
         strengthLabel = 'Very Weak';
         strengthIcon = <AlertTriangle className="w-5 h-5 text-red-500" />;
         headerClasses = 'text-red-500 bg-red-500/10 border-red-500/20';
         break;
      case 1:
         strengthColor = 'bg-orange-500';
         strengthLabel = 'Weak';
         strengthIcon = <AlertTriangle className="w-5 h-5 text-orange-500" />;
         headerClasses = 'text-orange-500 bg-orange-500/10 border-orange-500/20';
         break;
      case 2:
         strengthColor = 'bg-yellow-500';
         strengthLabel = 'Fair';
         strengthIcon = <ShieldAlert className="w-5 h-5 text-yellow-500" />;
         headerClasses = 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
         break;
      case 3:
         strengthColor = 'bg-blue-500';
         strengthLabel = 'Strong';
         strengthIcon = <ShieldCheck className="w-5 h-5 text-blue-500" />;
         headerClasses = 'text-blue-500 bg-blue-500/10 border-blue-500/20';
         break;
      case 4:
         strengthColor = 'bg-green-500';
         strengthLabel = 'Very Strong';
         strengthIcon = <ShieldCheck className="w-5 h-5 text-green-500" />;
         headerClasses = 'text-green-500 bg-green-500/10 border-green-500/20';
         break;
   }
   if (!password) {
      strengthColor = 'bg-muted';
      strengthLabel = 'Enter Password';
      strengthIcon = <ShieldAlert className="w-5 h-5 text-muted-foreground" />;
      headerClasses = 'text-muted-foreground bg-muted/10 border-muted/20';
   }

   return (
      <div className="w-full h-full flex flex-col bg-background border border-border rounded-xl shadow-sm overflow-hidden relative">
         <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 border-b border-border bg-background shrink-0">
            <div className="flex items-center gap-1.5 mr-2">
               <ShieldAlert className="h-4 w-4 text-brand" />
               <span className="text-sm font-semibold text-foreground">Password Strength Checker</span>
            </div>
            <Button
               variant="ghost"
               size="sm"
               className="h-8 text-xs text-muted-foreground"
               onClick={handleClear}
               disabled={!password}
            >
               <RotateCcw className="w-3.5 h-3.5 mr-1" />
               Clear
            </Button>
         </div>

         <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-background overflow-y-auto">
            {/* Left Panel */}
            <div className="flex-1 p-6 md:p-8 space-y-8 flex flex-col lg:border-r border-border">
               <div className="space-y-4 max-w-xl mx-auto w-full">
                  <label className="text-sm font-semibold text-foreground uppercase tracking-wider">
                     Test Password Entry
                  </label>
                  <div className="relative">
                     <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Type a password to test..."
                        className="w-full p-4 pr-24 bg-muted/10 border border-border rounded-xl text-foreground text-lg focus:outline-none focus:border-brand/50 font-mono transition-colors"
                     />
                     <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-2 bottom-2 h-auto text-xs"
                        onClick={() => setShowPassword(!showPassword)}
                     >
                        {showPassword ? 'Hide' : 'Show'}
                     </Button>
                  </div>

                  {/* Strength Bar */}
                  <div className="space-y-2 mt-4">
                     <div className="flex justify-between items-center text-sm font-semibold">
                        <span className="text-muted-foreground uppercase tracking-wider text-xs flex items-center gap-1.5">
                           {strengthIcon} Overall Strength
                        </span>
                        <span className={`px-2 py-0.5 rounded border text-xs font-bold uppercase ${headerClasses}`}>
                           {strengthLabel}
                        </span>
                     </div>
                     <div className="flex gap-1 h-3 mt-2">
                        {[0, 1, 2, 3].map((idx) => (
                           <div
                              key={idx}
                              className={`flex-1 rounded-full border border-border/20 transition-all duration-300 ${password && result.score > idx ? strengthColor : 'bg-muted/30'}`}
                           />
                        ))}
                     </div>
                  </div>
               </div>

               {/* Feedback Section */}
               {password && (
                  <div className="max-w-xl mx-auto w-full bg-muted/10 border border-border p-5 rounded-2xl space-y-4">
                     {result.feedback.warning || result.feedback.suggestions.length > 0 ? (
                        <>
                           {result.feedback.warning && (
                              <div className="flex gap-3 text-orange-500 bg-orange-500/10 p-3 rounded-xl border border-orange-500/20">
                                 <AlertTriangle className="w-5 h-5 shrink-0" />
                                 <p className="text-sm font-semibold">{result.feedback.warning}</p>
                              </div>
                           )}
                           {result.feedback.suggestions.length > 0 && (
                              <div className="space-y-2">
                                 <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground pt-1">
                                    Suggestions to improve
                                 </h4>
                                 <ul className="list-disc list-inside space-y-1.5 text-sm text-foreground/80 pl-2">
                                    {result.feedback.suggestions.map((s, i) => (
                                       <li key={i}>{s}</li>
                                    ))}
                                 </ul>
                              </div>
                           )}
                        </>
                     ) : (
                        <div className="flex items-center gap-3 text-green-500">
                           <ShieldCheck className="w-6 h-6" />
                           <div>
                              <p className="text-sm font-bold">Excellent password structurally!</p>
                              <p className="text-xs opacity-80 mt-0.5">No immediate algorithmic weaknesses found.</p>
                           </div>
                        </div>
                     )}
                  </div>
               )}
            </div>

            {/* Right Panel (Metrics) */}
            <div className="md:w-[400px] border-l border-border bg-muted/5 p-6 md:p-8 space-y-8 flex flex-col min-h-full">
               <div className="space-y-1">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                     <Target className="w-4 h-4 text-brand" />
                     Estimated Crack Times
                  </h3>
                  <p className="text-xs text-muted-foreground pb-4 border-b border-border/50">
                     Time required to guess this exact sequence.
                  </p>
               </div>

               <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                     <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                           <History className="w-3.5 h-3.5" /> Slow Offline Hash
                        </span>
                        <span className="font-bold font-mono text-brand/80 text-right">
                           {result.crack_times_display.offline_slow_hashing_1e4_per_second || '-'}
                        </span>
                     </div>
                     <span className="text-tiny text-muted-foreground/60 w-full text-left pl-5">
                        10k guesses / second
                     </span>
                  </div>

                  <div className="flex flex-col gap-1">
                     <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                           <Zap className="w-3.5 h-3.5" /> Fast Offline Hash
                        </span>
                        <span className="font-bold font-mono text-brand/80 text-right">
                           {result.crack_times_display.offline_fast_hashing_1e10_per_second || '-'}
                        </span>
                     </div>
                     <span className="text-tiny text-muted-foreground/60 w-full text-left pl-5">
                        10B guesses / second
                     </span>
                  </div>

                  <div className="flex flex-col gap-1">
                     <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-1.5">
                           <Clock className="w-3.5 h-3.5" /> Online Attack
                        </span>
                        <span className="font-bold font-mono text-brand/80 text-right">
                           {result.crack_times_display.online_no_throttling_10_per_second || '-'}
                        </span>
                     </div>
                     <span className="text-tiny text-muted-foreground/60 w-full text-left pl-5">
                        10 guesses / second (e.g. login form)
                     </span>
                  </div>
               </div>

               {password && (
                  <div className="mt-auto pt-6 border-t border-border/50 bg-background/50 rounded-xl p-4">
                     <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-muted-foreground font-semibold uppercase">Total Entropy</span>
                        <span className="text-sm font-mono font-bold text-foreground">
                           {Math.round(result.guesses_log10 * 3.32193)} bits
                        </span>
                     </div>
                     <p className="text-tiny text-muted-foreground leading-relaxed mt-2">
                        Evaluated using Dropbox's zxcvbn password strength estimator engine which parses against
                        extensive dictionary datasets.
                     </p>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
