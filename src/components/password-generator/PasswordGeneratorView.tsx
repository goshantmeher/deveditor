'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Copy, Check, RefreshCw, Key, ShieldAlert, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { usePersistence } from '@/contexts/PersistenceContext';
import { generatePassword, PasswordOptions, evaluatePasswordStrength } from '@/lib/password-generator-utils';

const STORAGE_KEY_OPTIONS = 'password-generator-options';

const DEFAULT_OPTIONS: PasswordOptions = {
   length: 16,
   uppercase: true,
   lowercase: true,
   numbers: true,
   symbols: true,
   excludeSimilar: false,
};

export function PasswordGeneratorView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [options, setOptions] = useState<PasswordOptions>(DEFAULT_OPTIONS);
   const [password, setPassword] = useState('');
   const [copied, setCopied] = useState(false);
   const [strength, setStrength] = useState(0);

   // Load persisted state
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const storedOptions = localStorage.getItem(STORAGE_KEY_OPTIONS);
         if (storedOptions) {
            try {
               setOptions(JSON.parse(storedOptions));
            } catch {
               // Ignore parse error
            }
         }
      }
   }, [isPersistenceEnabled]);

   // Save state
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      localStorage.setItem(STORAGE_KEY_OPTIONS, JSON.stringify(options));
   }, [options, isPersistenceEnabled]);

   // Generate pass
   const handleGenerate = useCallback(() => {
      // Ensure at least one option is checked
      if (!options.lowercase && !options.uppercase && !options.numbers && !options.symbols) {
         setOptions(prev => ({ ...prev, lowercase: true }));
      }
      const newPassword = generatePassword(options);
      setPassword(newPassword);
      setStrength(evaluatePasswordStrength(newPassword));
   }, [options]);

   // Initial generation & when options change
   useEffect(() => {
      handleGenerate();
   }, [handleGenerate]);

   const handleCopy = useCallback(async () => {
      if (!password) return;
      try {
         await navigator.clipboard.writeText(password);
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      } catch {
         console.error('Failed to copy');
      }
   }, [password]);

   const updateOption = (key: keyof PasswordOptions, value: boolean | number) => {
      setOptions(prev => ({ ...prev, [key]: value }));
   };

   // Determine strength color
   let strengthColor = 'bg-red-500';
   let strengthLabel = 'Very Weak';
   if (strength > 20) { strengthColor = 'bg-orange-500'; strengthLabel = 'Weak'; }
   if (strength > 40) { strengthColor = 'bg-yellow-500'; strengthLabel = 'Fair'; }
   if (strength > 60) { strengthColor = 'bg-blue-500'; strengthLabel = 'Strong'; }
   if (strength > 80) { strengthColor = 'bg-green-500'; strengthLabel = 'Very Strong'; }

   return (
      <div className="w-full h-full flex flex-col bg-background border border-border rounded-xl shadow-sm overflow-hidden relative">
         {/* Toolbar */}
         <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-background shrink-0">
            <div className="flex items-center gap-1.5">
               <Key className="h-4 w-4 text-brand" />
               <span className="text-sm font-semibold text-foreground">Secure Password Generator</span>
            </div>
            
            <div className="flex items-center gap-2">
               <Button variant="ghost" size="sm" className="h-8 text-xs text-muted-foreground" onClick={handleGenerate}>
                  <RefreshCw className="w-3.5 h-3.5 mr-1" />
                  Regenerate
               </Button>
            </div>
         </div>

         {/* Main Content */}
         <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-background">
            
            {/* Options Panel (Left) */}
            <div className="flex flex-col md:w-5/12 min-h-[300px] md:min-h-0 border-b md:border-b-0 md:border-r border-border overflow-y-auto">
               <div className="px-3 py-2 border-b min-h-12 border-border bg-background shrink-0 flex items-center justify-between">
                  <span className="text-label font-semibold text-muted-foreground uppercase tracking-wider">
                     Password Criteria
                  </span>
               </div>
               
               <div className="p-5 space-y-8">
                  {/* Length Slider */}
                  <div className="space-y-4">
                     <div className="flex justify-between items-center">
                        <label className="text-sm font-semibold text-foreground">Password Length</label>
                        <input
                           type="number"
                           className="w-16 h-8 text-right bg-muted/20 border border-border/40 rounded px-2 text-sm focus:outline-none focus:border-brand/40 font-mono"
                           value={options.length}
                           onChange={(e) => {
                              let val = parseInt(e.target.value, 10);
                              if (isNaN(val)) val = 8;
                              if (val < 1) val = 1;
                              if (val > 128) val = 128;
                              updateOption('length', val);
                           }}
                           min={1}
                           max={128}
                        />
                     </div>
                     <Slider
                        value={[options.length]}
                        onValueChange={(vals) => updateOption('length', vals[0])}
                        min={4}
                        max={128}
                        step={1}
                        className="py-2"
                     />
                  </div>

                  {/* Character Sets */}
                  <div className="space-y-4">
                     <label className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">Character Sets</label>
                     <div className="space-y-3">
                        <div className="flex items-center justify-between">
                           <span className="text-sm font-medium">Uppercase (A-Z)</span>
                           <Switch checked={options.uppercase} onCheckedChange={(val) => updateOption('uppercase', val)} />
                        </div>
                        <div className="flex items-center justify-between">
                           <span className="text-sm font-medium">Lowercase (a-z)</span>
                           <Switch checked={options.lowercase} onCheckedChange={(val) => updateOption('lowercase', val)} />
                        </div>
                        <div className="flex items-center justify-between">
                           <span className="text-sm font-medium">Numbers (0-9)</span>
                           <Switch checked={options.numbers} onCheckedChange={(val) => updateOption('numbers', val)} />
                        </div>
                        <div className="flex items-center justify-between">
                           <span className="text-sm font-medium">Symbols (!@#$...)</span>
                           <Switch checked={options.symbols} onCheckedChange={(val) => updateOption('symbols', val)} />
                        </div>
                     </div>
                  </div>

                  {/* Advanced Options */}
                  <div className="space-y-4 pt-4 border-t border-border/40">
                     <div className="flex items-center justify-between group">
                        <div className="space-y-0.5">
                           <span className="text-sm font-medium">Easy to read</span>
                           <p className="text-xs text-muted-foreground mr-4">Exclude similar characters like i, l, 1, L, o, 0, O.</p>
                        </div>
                        <Switch checked={options.excludeSimilar} onCheckedChange={(val) => updateOption('excludeSimilar', val)} />
                     </div>
                  </div>
               </div>
            </div>

            {/* Output Panel (Right) */}
            <div className="flex flex-col md:w-7/12 min-h-[300px] md:min-h-0 relative bg-muted/5 flex-1">
               <div className="px-3 py-2 border-b min-h-12 border-border bg-background shrink-0 flex items-center justify-between">
                  <span className="text-label font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                     {strength > 60 ? <ShieldCheck className="w-3.5 h-3.5 text-success" /> : <ShieldAlert className="w-3.5 h-3.5 text-warning" />}
                     Generated Password
                  </span>
               </div>
               
               <div className="flex-1 flex flex-col justify-center p-8 space-y-8">
                  {/* Password Display */}
                  <div className="relative group">
                     <div className={`p-6 rounded-xl border border-border bg-background shadow-xs text-center break-all font-mono selection:bg-brand/20 transition-colors ${options.length > 32 ? 'text-lg md:text-2xl' : 'text-3xl md:text-4xl'}`}>
                        {password || <span className="text-muted-foreground/30 italic">...</span>}
                     </div>
                     <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                           variant="outline"
                           size="icon"
                           className="h-8 w-8 bg-background shadow-sm hover:bg-muted"
                           onClick={handleCopy}
                        >
                           {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
                        </Button>
                     </div>
                  </div>

                  {/* Big Copy Button */}
                  <Button
                     onClick={handleCopy}
                     className="w-full h-12 text-base font-semibold bg-brand hover:bg-brand/90 text-brand-foreground"
                  >
                     {copied ? 'Copied to Clipboard!' : 'Copy Password'}
                  </Button>

                  {/* Strength Meter */}
                  <div className="space-y-2 mt-4">
                     <div className="flex justify-between items-center text-sm font-semibold">
                        <span className="text-muted-foreground uppercase tracking-wider text-xs">Password Strength</span>
                        <span className="text-foreground">{strengthLabel}</span>
                     </div>
                     <div className="h-2.5 w-full bg-muted/50 rounded-full overflow-hidden flex border border-border/20">
                        <div 
                           className={`h-full transition-all duration-500 ease-in-out ${strengthColor}`} 
                           style={{ width: `${strength}%` }}
                        />
                     </div>
                     <p className="text-xs text-muted-foreground text-center mt-2">
                        Uses cryptographically secure random values (Web Crypto API).
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
