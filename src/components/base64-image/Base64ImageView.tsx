'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Image as ImageIcon, Download, RotateCcw, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { usePersistence } from '@/contexts/PersistenceContext';
import { STORAGE_KEYS } from '@/constants/storage';

export function Base64ImageView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [inputStr, setInputStr] = useState('');
   const [imgSrc, setImgSrc] = useState<string | null>(null);
   const [previewBg, setPreviewBg] = useState<'theme' | 'checkers' | 'white' | 'black'>('checkers');

   // Load state from localStorage
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const stored = localStorage.getItem(STORAGE_KEYS.BASE64_IMAGE_INPUT);
         if (stored) {
            setInputStr(stored);
         }
      }
   }, [isPersistenceEnabled]);

   // Save state
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      localStorage.setItem(STORAGE_KEYS.BASE64_IMAGE_INPUT, inputStr);
   }, [inputStr, isPersistenceEnabled]);

   // Attempt to parse whenever input changes
   useEffect(() => {
      const trimmed = inputStr.trim();
      if (!trimmed) {
         setImgSrc(null);
         return;
      }

      // If it has a data URI, use it directly (if it's an image)
      if (trimmed.startsWith('data:image/')) {
         setImgSrc(trimmed);
         return;
      }
      
      // If no data URI, we try to guess MIME type, default to png
      let src = trimmed;
      if (!trimmed.startsWith('data:')) {
         let mime = 'image/png';
         if (trimmed.startsWith('/9j/')) mime = 'image/jpeg';
         else if (trimmed.startsWith('R0lGOD')) mime = 'image/gif';
         else if (trimmed.startsWith('UklGR')) mime = 'image/webp';
         else if (trimmed.startsWith('PHN2Zy')) mime = 'image/svg+xml';
         
         src = `data:${mime};base64,${trimmed}`;
      }
      
      setImgSrc(src);
   }, [inputStr]);

   const handleDownload = () => {
      if (!imgSrc) return;

      const link = document.createElement('a');
      link.href = imgSrc;
      
      // Attempt to find extension
      const match = imgSrc.match(/^data:image\/([a-zA-Z0-9-+]+);base64,/);
      const ext = match ? match[1].replace('+xml', '') : 'png';
      
      link.download = `decoded_image.${ext}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
   };

   return (
      <div className="w-full h-full flex flex-col md:flex-row bg-background border border-border overflow-hidden">
         {/* Left half: Input Editor */}
         <div className="w-full md:w-1/2 flex flex-col border-b md:border-b-0 md:border-r border-border min-h-[50vh] md:min-h-0 bg-muted/10">
            <div className="h-16 px-4 border-b border-border flex items-center justify-between shrink-0 bg-background">
               <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                     <ImageIcon className="w-4 h-4 text-indigo-500" />
                  </div>
                  <h1 className="font-bold text-sm tracking-tight text-foreground">Base64 String Input</h1>
               </div>
               <div className="flex gap-2">
                  {!inputStr && (
                     <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 text-xs gap-1.5 text-muted-foreground hover:text-foreground" 
                        onClick={() => setInputStr('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzYzNjZmMSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5Z29uIHBvaW50cz0iMTMgMiAzIDE0IDEyIDE0IDExIDIyIDIxIDEwIDEyIDEwIDEzIDIiPjwvcG9seWdvbj48L3N2Zz4=')}
                     >
                        <FlaskConical className="w-3.5 h-3.5" /> Sample
                     </Button>
                  )}
                  <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5 text-muted-foreground hover:text-foreground" onClick={() => setInputStr('')}>
                     <RotateCcw className="w-3.5 h-3.5" /> Clear
                  </Button>
               </div>
            </div>
            <div className="flex-1 p-0 relative">
               <Textarea 
                  className="w-full h-full resize-none border-none rounded-none focus-visible:ring-0 font-mono text-xs p-6 bg-transparent"
                  placeholder="Paste your Base64 encoded string here (e.g. data:image/png;base64,iVBORw0...)"
                  value={inputStr}
                  onChange={(e) => setInputStr(e.target.value)}
                  spellCheck="false"
               />
            </div>
         </div>

         {/* Right half: Output Preview */}
         <div className="w-full md:w-1/2 flex flex-col bg-background min-h-[50vh] md:min-h-0">
            <div className="h-16 px-4 border-b border-border flex items-center justify-between shrink-0 bg-muted/10">
               <h2 className="font-bold text-sm flex items-center gap-2 text-foreground">
                  <ImageIcon className="w-4 h-4 text-emerald-500" />
                  Image Preview
               </h2>
               <div className="flex gap-2 items-center">
                  <div className="hidden md:flex items-center gap-0.5 mr-2 p-1 bg-background border border-border/50 rounded-lg">
                     <button onClick={() => setPreviewBg('theme')} title="Theme Background" className={`w-6 h-6 rounded flex items-center justify-center ${previewBg === 'theme' ? 'bg-muted shadow-sm' : 'hover:bg-muted/50'}`}><div className="w-3.5 h-3.5 rounded-sm bg-background border border-foreground/20" /></button>
                     <button onClick={() => setPreviewBg('checkers')} title="Checkerboard" className={`w-6 h-6 rounded flex items-center justify-center ${previewBg === 'checkers' ? 'bg-muted shadow-sm' : 'hover:bg-muted/50'}`}><div className="w-3.5 h-3.5 rounded-sm bg-[url('/checkers.svg')] bg-[#F6F6F6] border border-border/50" /></button>
                     <button onClick={() => setPreviewBg('white')} title="Solid White" className={`w-6 h-6 rounded flex items-center justify-center ${previewBg === 'white' ? 'bg-muted shadow-sm' : 'hover:bg-muted/50'}`}><div className="w-3.5 h-3.5 rounded-sm bg-white border border-gray-200" /></button>
                     <button onClick={() => setPreviewBg('black')} title="Solid Black" className={`w-6 h-6 rounded flex items-center justify-center ${previewBg === 'black' ? 'bg-muted shadow-sm' : 'hover:bg-muted/50'}`}><div className="w-3.5 h-3.5 rounded-sm bg-black border border-gray-800" /></button>
                  </div>
                  <Button 
                     size="sm"
                     variant="default"
                     onClick={handleDownload}
                     disabled={!imgSrc}
                     className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-4"
                  >
                     <Download className="w-3.5 h-3.5 mr-2" /> Download
                  </Button>
               </div>
            </div>

            <div className="flex-1 overflow-auto bg-[url('/checkers.svg')] bg-[#F6F6F6] dark:bg-[#1A1A1A] p-4 md:p-8 flex items-center justify-center relative">
               {!imgSrc ? (
                  <div className="text-center space-y-3 opacity-50">
                     <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto" />
                     <p className="text-sm font-medium text-muted-foreground">Paste a Base64 string to see preview</p>
                  </div>
               ) : (
                  <div className={`relative group p-4 max-w-full rounded-2xl shadow-xl border border-border inline-flex items-center justify-center min-w-[200px] min-h-[200px] transition-colors ${
                     previewBg === 'theme' ? 'bg-background' : 
                     previewBg === 'white' ? 'bg-white' : 
                     previewBg === 'black' ? 'bg-black' : 
                     'bg-transparent'
                  }`}>
                     <img 
                        src={imgSrc} 
                        alt="Decoded base64 preview" 
                        className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-sm"
                        onError={() => setImgSrc(null)} // Hide broken images on invalid base64
                     />
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
