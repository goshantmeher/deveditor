'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MonitorSmartphone, LayoutTemplate, Copy, CheckCircle2, RotateCcw, ImageIcon, Image as ImageIconFallback, Globe, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { usePersistence } from '@/contexts/PersistenceContext';
import { STORAGE_KEYS } from '@/constants/storage';

interface MetaTagState {
   title: string;
   description: string;
   url: string;
   imageUrl: string;
   twitterHandle: string;
}

const DEFAULT_STATE: MetaTagState = {
   title: 'Next-Generation Fullstack Developer Workspace',
   description: 'A powerful suite of totally free developer tools, converters, and formatters running natively in your browser.',
   url: 'https://www.deveditor.io',
   imageUrl: 'https://www.deveditor.io/og-image.png',
   twitterHandle: '@deveditor',
};

const EMPTY_STATE: MetaTagState = {
   title: '',
   description: '',
   url: '',
   imageUrl: '',
   twitterHandle: '',
};

export function MetaTagGeneratorView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [state, setState] = useState<MetaTagState>(DEFAULT_STATE);
   const [copiedCode, setCopiedCode] = useState(false);

   // Load state from localStorage
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const stored = localStorage.getItem(STORAGE_KEYS.META_TAG_SETTINGS);
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
      localStorage.setItem(STORAGE_KEYS.META_TAG_SETTINGS, JSON.stringify(state));
   }, [state, isPersistenceEnabled]);

   const handleClear = () => {
      setState(EMPTY_STATE);
   };

   const handleReset = () => {
      setState(DEFAULT_STATE);
   };

   const handleChange = (field: keyof MetaTagState, value: string) => {
      setState((prev) => ({ ...prev, [field]: value }));
   };

   // Generate code string
   const generateCode = (): string => {
      const { title, description, url, imageUrl, twitterHandle } = state;

      const codeLines = [
         '<!-- Primary Meta Tags -->',
         `<title>${title}</title>`,
         `<meta name="title" content="${title}">`,
         `<meta name="description" content="${description}">`,
         '',
         '<!-- Open Graph / Facebook -->',
         '<meta property="og:type" content="website">',
         url && `<meta property="og:url" content="${url}">`,
         `<meta property="og:title" content="${title}">`,
         `<meta property="og:description" content="${description}">`,
         imageUrl && `<meta property="og:image" content="${imageUrl}">`,
         '',
         '<!-- Twitter -->',
         '<meta property="twitter:card" content="summary_large_image">',
         url && `<meta property="twitter:url" content="${url}">`,
         `<meta property="twitter:title" content="${title}">`,
         `<meta property="twitter:description" content="${description}">`,
         imageUrl && `<meta property="twitter:image" content="${imageUrl}">`,
         twitterHandle && `<meta property="twitter:site" content="${twitterHandle}">`,
         twitterHandle && `<meta property="twitter:creator" content="${twitterHandle}">`,
      ];

      return codeLines.filter((l) => l !== '').join('\n');
   };

   const codeOutput = generateCode();

   const copyToClipboard = async () => {
      try {
         await navigator.clipboard.writeText(codeOutput);
         setCopiedCode(true);
         setTimeout(() => setCopiedCode(false), 2000);
      } catch (err) {
         console.error('Failed to copy', err);
      }
   };

   return (
      <div className="w-full h-full flex flex-col md:flex-row bg-background overflow-hidden relative border border-border">
         {/* Left Side: Input Fields */}
         <div className="flex flex-col w-full md:w-[320px] lg:w-[400px] bg-background border-b md:border-b-0 md:border-r border-border shrink-0 max-h-[50vh] md:max-h-full overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-between shrink-0">
               <div className="flex items-center gap-2">
                  <LayoutTemplate className="w-4 h-4 text-brand" />
                  <h2 className="font-semibold text-sm">Meta Tag Properties</h2>
               </div>
               <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="h-7 text-xs px-2 gap-1 text-muted-foreground hover:text-foreground" onClick={handleClear} title="Clear">
                     <RotateCcw className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="secondary" size="sm" className="h-7 text-xs px-3" onClick={handleReset}>
                     Load Sample
                  </Button>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6">
               <div className="space-y-4">
                  <div className="space-y-1.5">
                     <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Page Title</label>
                     <Input 
                        placeholder="e.g. My Website - Home" 
                        value={state.title} 
                        onChange={(e) => handleChange('title', e.target.value)} 
                        className="bg-muted/10"
                     />
                  </div>

                  <div className="space-y-1.5">
                     <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider flex justify-between">
                        <span>Page Description</span>
                        <span className={state.description.length > 160 ? 'text-rose-400' : 'text-muted-foreground'}>{state.description.length}/160</span>
                     </label>
                     <Textarea 
                        placeholder="Short compelling description of your page content..." 
                        value={state.description} 
                        onChange={(e) => handleChange('description', e.target.value)} 
                        className="bg-muted/10 h-24 resize-none"
                     />
                  </div>

                  <div className="space-y-1.5">
                     <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Site URL</label>
                     <div className="relative">
                        <Globe className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input 
                           placeholder="https://example.com" 
                           value={state.url} 
                           onChange={(e) => handleChange('url', e.target.value)} 
                           className="bg-muted/10 pl-9"
                        />
                     </div>
                  </div>

                  <div className="space-y-1.5">
                     <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Image URL (OG/Twitter Header)</label>
                     <div className="relative">
                        <ImageIcon className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input 
                           placeholder="https://example.com/image.png" 
                           value={state.imageUrl} 
                           onChange={(e) => handleChange('imageUrl', e.target.value)} 
                           className="bg-muted/10 pl-9"
                        />
                     </div>
                     <p className="text-[10px] text-muted-foreground">Optimal size: 1200 x 630 pixels</p>
                  </div>

                  <div className="space-y-1.5">
                     <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Twitter Handle</label>
                     <div className="relative">
                        <Hash className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input 
                           placeholder="@username" 
                           value={state.twitterHandle} 
                           onChange={(e) => handleChange('twitterHandle', e.target.value)} 
                           className="bg-muted/10 pl-9"
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Right Side: Preview & Code */}
         <div className="flex-1 flex flex-col min-w-0 bg-muted/5 h-[50vh] md:h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
               
               {/* Previews */}
               <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground pb-2">
                     <MonitorSmartphone className="w-4 h-4" /> Live Social Previews
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
                     
                     {/* Twitter Preview */}
                     <div className="space-y-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-sky-500">Twitter Summary Card</span>
                        <div className="border border-border rounded-xl overflow-hidden bg-background shadow-sm max-w-[400px]">
                           <div className="aspect-[1.91/1] bg-muted relative flex items-center justify-center border-b border-border overflow-hidden">
                              {state.imageUrl ? (
                                 <img src={state.imageUrl} alt="OG Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                              ) : (
                                 <ImageIconFallback className="w-8 h-8 text-muted-foreground/30" />
                              )}
                           </div>
                           <div className="p-3">
                              <p className="text-muted-foreground text-[13px] uppercase truncate">{state.url ? new URL(state.url).hostname : 'example.com'}</p>
                              <p className="font-bold text-[15px] truncate mt-0.5 text-foreground leading-snug">{state.title || "Page Title"}</p>
                              <p className="text-muted-foreground text-[14px] line-clamp-2 mt-1 leading-snug">{state.description || "Description will appear here when the URL is shared."}</p>
                           </div>
                        </div>
                     </div>

                     {/* Facebook/LinkedIn Preview */}
                     <div className="space-y-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-500">Facebook / LinkedIn Feed</span>
                        <div className="border border-border rounded-lg overflow-hidden bg-[#F0F2F5] dark:bg-[#242526] shadow-sm max-w-[400px]">
                           <div className="aspect-[1.91/1] bg-muted relative flex items-center justify-center border-b border-border overflow-hidden">
                              {state.imageUrl ? (
                                 <img src={state.imageUrl} alt="OG Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                              ) : (
                                 <ImageIconFallback className="w-8 h-8 text-muted-foreground/30" />
                              )}
                           </div>
                           <div className="p-3 pb-4 bg-[#F2F3F5] dark:bg-[#18191A] border-t border-border/50">
                              <p className="text-[#606770] dark:text-[#B0B3B8] text-[12px] uppercase truncate mb-0.5">{state.url ? new URL(state.url).hostname : 'EXAMPLE.COM'}</p>
                              <p className="font-semibold text-[#1C1E21] dark:text-[#E4E6EB] text-[16px] truncate leading-tight">{state.title || "Page Title"}</p>
                              <p className="text-[#606770] dark:text-[#B0B3B8] text-[14px] line-clamp-1 mt-0.5">{state.description || "Description will appear here when shared."}</p>
                           </div>
                        </div>
                     </div>

                  </div>
               </div>

               {/* HTML Output */}
               <div className="space-y-4 max-w-4xl mx-auto pt-6 border-t border-border">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        <LayoutTemplate className="w-4 h-4 text-emerald-500" /> Generated HTML Meta Tags
                     </div>
                     <Button variant="secondary" size="sm" className="h-8 gap-2" onClick={copyToClipboard}>
                        {copiedCode ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                        {copiedCode ? 'Copied HTML!' : 'Copy Tags'}
                     </Button>
                  </div>
                  <div className="bg-[#1e1e1e] rounded-xl border border-white/10 p-5 font-mono text-[13px] text-pink-300 leading-relaxed whitespace-pre overflow-x-auto shadow-xl">
                     {codeOutput}
                  </div>
               </div>

            </div>
         </div>
      </div>
   );
}
