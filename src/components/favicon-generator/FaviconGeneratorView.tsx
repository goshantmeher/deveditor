'use client';
import { STORAGE_KEYS } from '@/constants/storage';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Download, Upload, Star, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePersistence } from '@/contexts/PersistenceContext';

const SIZES = [16, 32, 48, 64, 128, 256, 512] as const;

export function FaviconGeneratorView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);
   const fileInputRef = useRef<HTMLInputElement>(null);

   const [inputImageStr, setInputImageStr] = useState<string | null>(null);
   const [generatedBlobs, setGeneratedBlobs] = useState<Record<number, Blob | null>>({});

   // Load state from localStorage
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const storedInput = localStorage.getItem(STORAGE_KEYS.FAVICON_GEN_IMG);
         if (storedInput) {
            setInputImageStr(storedInput);
         }
      }
   }, [isPersistenceEnabled]);

   // Save state to localStorage
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      if (inputImageStr) {
         localStorage.setItem(STORAGE_KEYS.FAVICON_GEN_IMG, inputImageStr);
      } else {
         localStorage.removeItem(STORAGE_KEYS.FAVICON_GEN_IMG);
      }
   }, [inputImageStr, isPersistenceEnabled]);

   // Core Generator Logic
   const generateFavicons = useCallback(async (imageSrc: string) => {
      const img = new Image();
      img.onload = async () => {
         const newBlobs: Record<number, Blob | null> = {};
         for (const size of SIZES) {
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            if (ctx) {
               ctx.imageSmoothingQuality = 'high';
               ctx.drawImage(img, 0, 0, size, size);
               const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
               newBlobs[size] = blob;
            }
         }
         
         // Custom ICO Generation utilizing JS logic over PNG files
         if (newBlobs[16] && newBlobs[32] && newBlobs[48]) {
            // Complex standard ICO format padding logic goes here...
            // For a lightweight true Client-Side app without dense libraries,
            // standard HTML5 relies entirely on PNG equivalents now anyway: 
            // ex: <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
         }
         
         setGeneratedBlobs(newBlobs);
      };
      img.src = imageSrc;
   }, []);

   useEffect(() => {
      if (inputImageStr) {
         generateFavicons(inputImageStr);
      } else {
         setGeneratedBlobs({});
      }
   }, [inputImageStr, generateFavicons]);

   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      
      if (!file.type.startsWith('image/')) {
         alert('Please upload a valid image file');
         return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
         const res = event.target?.result;
         if (typeof res === 'string') {
            setInputImageStr(res);
         }
      };
      reader.readAsDataURL(file);
      e.target.value = '';
   };

   const handleDownloadSingle = (size: number) => {
      const blob = generatedBlobs[size];
      if (!blob) return;

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `favicon-${size}x${size}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
   };

   // Creates a basic .zip downloading method if needed, but modern browsers usually prevent batch triggers 
   // without a ZipJS library. For simplicity, we trigger links dynamically.
   const handleDownloadAll = () => {
       Object.keys(generatedBlobs).forEach((key) => {
          const s = parseInt(key, 10);
          handleDownloadSingle(s);
       });
   };

   const faqSchema = {
       '@context': 'https://schema.org',
       '@type': 'SoftwareApplication',
       name: 'Favicon Generator',
       applicationCategory: 'DeveloperApplication',
       operatingSystem: 'Web Browser',
       offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
       featureList: [
          'Automatic PNG coordinate reshaping from 16px to 512px',
          'Square aspect ratio lock generation natively',
          '100% Client-side privacy execution via local Canvas',
       ],
       description: 'Free online image to Favicon resizing tool. Converts any PNG or JPEG logo instantly into standard 16x16, 32x32, and 512x512 app clip sizes.',
   };

   return (
      <div className="w-full h-full flex flex-col bg-background border border-border rounded-xl shadow-sm overflow-hidden relative">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

         {/* Toolbar */}
         <div className="flex flex-wrap items-center gap-3 px-4 py-2.5 border-b border-border bg-background shrink-0">
            <div className="flex items-center gap-1.5 mr-2">
               <Star className="h-4 w-4 text-brand" />
               <span className="text-sm font-semibold text-foreground">Favicon Generator</span>
            </div>
            
            <div className="flex items-center gap-2 ml-auto shrink-0">
               {inputImageStr && (
                   <button
                     onClick={() => setInputImageStr(null)}
                     className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-destructive/70 hover:text-destructive hover:bg-destructive/10 transition-all border border-border/40"
                     title="Clear Image"
                  >
                     <Trash2 className="h-3.5 w-3.5" />
                     <span className="hidden sm:inline">Clear</span>
                  </button>
               )}
               
               <input 
                  type="file" 
                  accept="image/png, image/jpeg, image/webp" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload}
                  className="hidden" 
               />

               <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-muted-foreground border border-border/40 bg-background hover:text-foreground hover:border-border/60 transition-all"
                  title="Import Image (PNG/JPG)"
               >
                  <Upload className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{inputImageStr ? 'Replace' : 'Upload PNG/JPG'}</span>
               </button>
            </div>
         </div>

         {/* Content Viewport */}
         <div className="flex-1 flex flex-col min-h-0 bg-background p-6 lg:p-12 overflow-y-auto">
            {!inputImageStr ? (
               <div 
                  className="m-auto flex flex-col items-center justify-center p-12 mt-12 mb-12 border-2 border-dashed border-border rounded-3xl max-w-xl text-center bg-muted/10 hover:bg-muted/30 hover:border-brand/40 transition-colors cursor-pointer group"
                  onClick={() => fileInputRef.current?.click()}
               >
                  <div className="w-16 h-16 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner shadow-brand/10">
                     <Upload className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-foreground mb-3">Drop an image here</h3>
                  <p className="text-muted-foreground mb-8 text-sm">Upload a square PNG, JPEG, or WEBP logo to instantly generate standard web favicons and Apple Touch Icons.</p>
                  <Button variant="default" className="gap-2">
                     <Upload className="w-4 h-4" /> Pick from Computer
                  </Button>
               </div>
            ) : (
               <div className="w-full max-w-5xl mx-auto space-y-12">
                  <div className="flex items-center justify-between">
                     <div className="space-y-1">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">Generated Favicons</h2>
                        <p className="text-sm text-muted-foreground">Standard web app icons mapped perfectly from your source. We recommend deploying the 32x32 size as your default.</p>
                     </div>
                     <Button onClick={handleDownloadAll} className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
                        <Download className="w-4 h-4" /> Batch Download All
                     </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
                     {SIZES.map(size => {
                        const blob = generatedBlobs[size];
                        const url = blob ? URL.createObjectURL(blob) : '';
                        
                        return (
                           <div key={size} className="flex flex-col items-center gap-4 relative group">
                              <div className="flex items-center justify-center bg-muted/30 border border-border/50 rounded-2xl w-full aspect-square" style={{ minHeight: '128px' }}>
                                  {url ? (
                                    <div 
                                       className="bg-transparent shadow-xs transition-transform hover:scale-105 duration-300 relative border border-black/10 dark:border-white/10" 
                                       style={{ width: `${Math.min(size, 100)}px`, height: `${Math.min(size, 100)}px` }}
                                    >
                                       <img src={url} alt={`Size ${size}`} className="w-full h-full object-contain" />
                                    </div>
                                  ) : (
                                    <span className="text-xs text-muted-foreground animate-pulse">Processing...</span>
                                  )}
                              </div>
                              <div className="text-center space-y-1.5 w-full">
                                  <div className="text-sm font-bold text-foreground font-mono">{size}x{size}</div>
                                  <Button 
                                     variant="outline" 
                                     size="sm" 
                                     className="w-full text-xs h-7 gap-1"
                                     disabled={!blob}
                                     onClick={() => handleDownloadSingle(size)}
                                  >
                                      <Download className="w-3 h-3" /> Save PNG
                                  </Button>
                              </div>
                           </div>
                        );
                     })}
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}
