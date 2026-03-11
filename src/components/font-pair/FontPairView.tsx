'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Type, Link as LinkIcon, RotateCcw, Quote, Heading1, CaseSensitive, Dice5, Eye, FileCode2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { usePersistence } from '@/contexts/PersistenceContext';
import { STORAGE_KEYS } from '@/constants/storage';

interface FontPairState {
   headingFont: string;
   bodyFont: string;
   customHeadingFont: string;
   customBodyFont: string;
   headingSize: number;
   bodySize: number;
   headingWeight: number;
   bodyWeight: number;
   previewText: string;
}

const DEFAULT_STATE: FontPairState = {
   headingFont: 'Playfair Display',
   bodyFont: 'Inter',
   customHeadingFont: '',
   customBodyFont: '',
   headingSize: 3.5, // rem
   bodySize: 1.125, // rem
   headingWeight: 700,
   bodyWeight: 400,
   previewText:
      'A beautiful typography system elevates your content out of the noise and creates a memorable reading experience for your audience.',
};

const POPULAR_FONTS = [
   'Inter',
   'Roboto',
   'Playfair Display',
   'Lora',
   'Open Sans',
   'Merriweather',
   'Montserrat',
   'Poppins',
   'Lato',
   'Oswald',
   'Raleway',
   'Nunito',
   'Source Serif Pro',
   'Work Sans',
   'Space Grotesk',
   'Outfit',
   'DM Sans',
   'Fraunces',
].sort();

// Preset combinations (Heading / Body)
const PRESETS = [
   { h: 'Playfair Display', b: 'Inter' },
   { h: 'Montserrat', b: 'Open Sans' },
   { h: 'Merriweather', b: 'Open Sans' },
   { h: 'Oswald', b: 'Lato' },
   { h: 'Space Grotesk', b: 'Inter' },
   { h: 'Fraunces', b: 'DM Sans' },
   { h: 'Outfit', b: 'Outfit' },
];

export function FontPairView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [state, setState] = useState<FontPairState>(DEFAULT_STATE);
   const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

   // Load state from localStorage
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const stored = localStorage.getItem(STORAGE_KEYS.FONT_PAIR_SETTINGS);
         if (stored) {
            try {
               setState(JSON.parse(stored));
            } catch {
               // Ignore
            }
         }
      }
   }, [isPersistenceEnabled]);

   // Save state
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      localStorage.setItem(STORAGE_KEYS.FONT_PAIR_SETTINGS, JSON.stringify(state));
   }, [state, isPersistenceEnabled]);

   /** Strip anything that isn't a letter, digit, space, or hyphen — safe for Google Fonts URLs and CSS. */
   const sanitizeFontName = (name: string): string =>
      name.replace(/[^a-zA-Z0-9 -]/g, '').trim().slice(0, 80);

   const getFontUrl = (fontName: string) => {
      const safe = sanitizeFontName(fontName);
      return `https://fonts.googleapis.com/css2?family=${safe.replace(/ /g, '+')}:wght@400;500;600;700&display=swap`;
   };

   const randomize = () => {
      const preset = PRESETS[Math.floor(Math.random() * PRESETS.length)];
      setState({ ...state, headingFont: preset.h, bodyFont: preset.b });
   };

   const reset = () => {
      setState(DEFAULT_STATE);
   };

   const activeHeadingFont = sanitizeFontName(state.customHeadingFont || state.headingFont);
   const activeBodyFont = sanitizeFontName(state.customBodyFont || state.bodyFont);

   const getHtmlLink = () => {
      const uniqueFonts = Array.from(new Set([activeHeadingFont, activeBodyFont]));
      const urls = uniqueFonts.map(getFontUrl);
      return urls.map((url) => `<link href="${url}" rel="stylesheet">`).join('\n');
   };

   const getCssRules = () => {
      return `:root {
  --font-heading: '${activeHeadingFont}', serif;
  --font-body: '${activeBodyFont}', sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
}

body {
  font-family: var(--font-body);
}`;
   };

   const getTailwindRules = () => {
      return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        heading: ['"${activeHeadingFont}"', 'serif'],
        body: ['"${activeBodyFont}"', 'sans-serif'],
      },
    },
  },
}`;
   };

   return (
      <div className="w-full h-full flex flex-col md:flex-row bg-background overflow-hidden relative border border-border">
         {/* Load fonts dynamically */}
         {activeHeadingFont && <link href={getFontUrl(activeHeadingFont)} rel="stylesheet" />}
         {activeHeadingFont !== activeBodyFont && activeBodyFont && (
            <link href={getFontUrl(activeBodyFont)} rel="stylesheet" />
         )}

         {/* Left Controls Panel */}
         <div className="flex flex-col w-full md:w-[320px] lg:w-[400px] bg-background border-b md:border-b-0 md:border-r border-border shrink-0 max-h-[50vh] md:max-h-full overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-between shrink-0">
               <div className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-brand" />
                  <h2 className="font-semibold text-sm">Typography Settings</h2>
               </div>
               <div className="flex gap-2">
                  <Button
                     variant="ghost"
                     size="sm"
                     className="h-7 text-xs px-2 gap-1 text-muted-foreground hover:text-foreground"
                     onClick={reset}
                     title="Reset"
                  >
                     <RotateCcw className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="secondary" size="sm" className="h-7 text-xs px-2 gap-1" onClick={randomize}>
                     <Dice5 className="w-3.5 h-3.5" /> Random Pair
                  </Button>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6">
               {/* Heading Config */}
               <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2">
                     <Heading1 className="w-3.5 h-3.5" /> Heading Typeface
                  </div>

                  <div className="space-y-3">
                     <div className="space-y-1.5">
                        <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                           Font Family
                        </label>
                        <Select
                           value={state.headingFont}
                           onValueChange={(val) => setState({ ...state, headingFont: val, customHeadingFont: '' })}
                        >
                           <SelectTrigger className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand">
                              <SelectValue placeholder="Select font" />
                           </SelectTrigger>
                           <SelectContent>
                              {POPULAR_FONTS.map((font) => (
                                 <SelectItem key={font} value={font}>
                                    {font}
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                        <Input
                           type="text"
                           placeholder="Or type custom Google Font..."
                           value={state.customHeadingFont || ''}
                           onChange={(e) => setState({ ...state, customHeadingFont: e.target.value })}
                           className="h-8 text-[13px] bg-muted/30"
                        />
                     </div>

                     <div className="grid grid-cols-2 gap-4 border p-3 rounded-lg border-border bg-muted/20">
                        <div className="space-y-4">
                           <div className="flex justify-between items-center">
                              <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                                 Base Size
                              </label>
                              <span className="text-xs font-mono">{state.headingSize}rem</span>
                           </div>
                           <Slider
                              min={1.5}
                              max={6}
                              step={0.1}
                              value={[state.headingSize]}
                              onValueChange={(val) => setState({ ...state, headingSize: val[0] })}
                           />
                        </div>
                        <div className="space-y-4">
                           <div className="flex justify-between items-center">
                              <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                                 Weight
                              </label>
                              <span className="text-xs font-mono">{state.headingWeight}</span>
                           </div>
                           <Slider
                              min={300}
                              max={900}
                              step={100}
                              value={[state.headingWeight]}
                              onValueChange={(val) => setState({ ...state, headingWeight: val[0] })}
                           />
                        </div>
                     </div>
                  </div>
               </div>

               {/* Body Config */}
               <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2">
                     <CaseSensitive className="w-3.5 h-3.5" /> Body Typeface
                  </div>

                  <div className="space-y-3">
                     <div className="space-y-1.5">
                        <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                           Font Family
                        </label>
                        <Select
                           value={state.bodyFont}
                           onValueChange={(val) => setState({ ...state, bodyFont: val, customBodyFont: '' })}
                        >
                           <SelectTrigger className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand">
                              <SelectValue placeholder="Select font" />
                           </SelectTrigger>
                           <SelectContent>
                              {POPULAR_FONTS.map((font) => (
                                 <SelectItem key={font} value={font}>
                                    {font}
                                 </SelectItem>
                              ))}
                           </SelectContent>
                        </Select>
                        <Input
                           type="text"
                           placeholder="Or type custom Google Font..."
                           value={state.customBodyFont || ''}
                           onChange={(e) => setState({ ...state, customBodyFont: e.target.value })}
                           className="h-8 text-[13px] bg-muted/30"
                        />
                     </div>

                     <div className="grid grid-cols-2 gap-4 border p-3 rounded-lg border-border bg-muted/20">
                        <div className="space-y-4">
                           <div className="flex justify-between items-center">
                              <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                                 Base Size
                              </label>
                              <span className="text-xs font-mono">{state.bodySize}rem</span>
                           </div>
                           <Slider
                              min={0.875}
                              max={1.5}
                              step={0.05}
                              value={[state.bodySize]}
                              onValueChange={(val) => setState({ ...state, bodySize: val[0] })}
                           />
                        </div>
                        <div className="space-y-4">
                           <div className="flex justify-between items-center">
                              <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                                 Weight
                              </label>
                              <span className="text-xs font-mono">{state.bodyWeight}</span>
                           </div>
                           <Slider
                              min={300}
                              max={700}
                              step={100}
                              value={[state.bodyWeight]}
                              onValueChange={(val) => setState({ ...state, bodyWeight: val[0] })}
                           />
                        </div>
                     </div>
                  </div>
               </div>

               {/* Preview Customization */}
               <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2">
                     <Quote className="w-3.5 h-3.5" /> Preview Content
                  </div>
                  <Textarea
                     value={state.previewText}
                     onChange={(e) => setState({ ...state, previewText: e.target.value })}
                     className="w-full h-24 bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand resize-none"
                  />
               </div>
            </div>
         </div>

         {/* Right Output Panel */}
         <div className="flex-1 flex flex-col min-w-0 bg-muted/10 h-[50vh] md:h-full relative overflow-hidden">
            <div className="h-14 flex items-center justify-between px-4 border-b border-border bg-muted/50 shrink-0 absolute top-0 left-0 right-0 z-10 w-full">
               <div className="flex space-x-1">
                  <button
                     onClick={() => setActiveTab('preview')}
                     className={`px-3 py-1.5 text-xs font-semibold rounded-md flex items-center gap-2 transition-colors ${activeTab === 'preview' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                     <Eye className="w-3.5 h-3.5" /> Live Preview
                  </button>
                  <button
                     onClick={() => setActiveTab('code')}
                     className={`px-3 py-1.5 text-xs font-semibold rounded-md flex items-center gap-2 transition-colors ${activeTab === 'code' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                     <FileCode2 className="w-3.5 h-3.5" /> Integration Code
                  </button>
               </div>
            </div>

            <div className="flex-1 w-full pt-14 overflow-auto">
               {activeTab === 'preview' ? (
                  <div className="p-8 md:p-16 w-full max-w-4xl mx-auto space-y-12">
                     <div className="space-y-4">
                        <h1
                           style={{
                              fontFamily: `'${activeHeadingFont}', serif`,
                              fontSize: `${state.headingSize}rem`,
                              fontWeight: state.headingWeight,
                              lineHeight: 1.1,
                           }}
                           className="tracking-tight text-foreground transition-all"
                        >
                           The quick brown fox jumps over the lazy dog.
                        </h1>
                        <p
                           style={{
                              fontFamily: `'${activeBodyFont}', sans-serif`,
                              fontSize: `${state.bodySize}rem`,
                              fontWeight: state.bodyWeight,
                              lineHeight: 1.6,
                           }}
                           className="text-muted-foreground transition-all max-w-3xl"
                        >
                           {state.previewText}
                        </p>
                     </div>

                     <div className="w-full max-w-3xl space-y-8 bg-background p-8 rounded-2xl border border-border/50 shadow-sm">
                        <div className="space-y-2">
                           <h2
                              style={{
                                 fontFamily: `'${activeHeadingFont}', serif`,
                                 fontSize: `${state.headingSize * 0.6}rem`,
                                 fontWeight: state.headingWeight,
                              }}
                              className="text-foreground transition-all"
                           >
                              Hierarchical Demo
                           </h2>
                           <p
                              style={{
                                 fontFamily: `'${activeBodyFont}', sans-serif`,
                                 fontSize: `${state.bodySize}rem`,
                                 fontWeight: state.bodyWeight,
                              }}
                              className="text-muted-foreground transition-all opacity-80"
                           >
                              Visual hierarchy helps readers scan documents more efficiently. The contrast between{' '}
                              {activeHeadingFont} and {activeBodyFont} establishes a clear pattern.
                           </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                           <div className="p-4 bg-muted/30 rounded-lg border border-border/30">
                              <h3
                                 style={{ fontFamily: `'${activeHeadingFont}', serif` }}
                                 className="text-xl font-bold mb-2"
                              >
                                 Heading Typeface
                              </h3>
                              <div
                                 style={{ fontFamily: `'${activeBodyFont}', sans-serif`, fontSize: '0.875rem' }}
                                 className="text-muted-foreground"
                              >
                                 Used for main titles, section headers, and callouts to grab attention immediately.
                              </div>
                           </div>
                           <div className="p-4 bg-muted/30 rounded-lg border border-border/30">
                              <h3
                                 style={{ fontFamily: `'${activeHeadingFont}', serif` }}
                                 className="text-xl font-bold mb-2"
                              >
                                 Body Typeface
                              </h3>
                              <div
                                 style={{ fontFamily: `'${activeBodyFont}', sans-serif`, fontSize: '0.875rem' }}
                                 className="text-muted-foreground"
                              >
                                 Prioritizes legibility over purely stylistic flourishes for long-form reading density.
                              </div>
                           </div>
                        </div>

                        <Button
                           style={{
                              fontFamily: `'${activeBodyFont}', sans-serif`,
                              fontWeight: state.bodyWeight + 100 > 900 ? 900 : state.bodyWeight + 100,
                           }}
                           className="h-12 px-8 shadow-md"
                        >
                           Sign Up Today
                        </Button>
                     </div>
                  </div>
               ) : (
                  <div className="p-6 md:p-12 w-full max-w-4xl mx-auto space-y-8">
                     <div className="space-y-3">
                        <h3 className="font-semibold flex items-center gap-2">
                           <LinkIcon className="w-4 h-4 text-brand" /> 1. Import Fonts (HTML)
                        </h3>
                        <div className="bg-[#1e1e1e] rounded-xl border border-white/10 p-4 font-mono text-[13px] text-emerald-400 whitespace-pre-wrap overflow-x-auto shadow-xl">
                           {getHtmlLink()}
                        </div>
                     </div>

                     <div className="space-y-3">
                        <h3 className="font-semibold flex items-center gap-2">
                           <FileCode2 className="w-4 h-4 text-brand" /> 2. Define CSS Variables
                        </h3>
                        <div className="bg-[#1e1e1e] rounded-xl border border-white/10 p-4 font-mono text-[13px] text-indigo-300 whitespace-pre-wrap overflow-x-auto shadow-xl">
                           {getCssRules()}
                        </div>
                     </div>

                     <div className="space-y-3">
                        <h3 className="font-semibold flex items-center gap-2">
                           <FileCode2 className="w-4 h-4 text-brand" /> Optional: Tailwind Configuration
                        </h3>
                        <div className="bg-[#1e1e1e] rounded-xl border border-white/10 p-4 font-mono text-[13px] text-sky-400 whitespace-pre-wrap overflow-x-auto shadow-xl">
                           {getTailwindRules()}
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
