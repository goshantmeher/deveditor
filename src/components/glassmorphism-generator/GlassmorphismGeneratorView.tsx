'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, Layers, PaintBucket, Maximize, Droplets, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePersistence } from '@/contexts/PersistenceContext';
import { STORAGE_KEYS } from '@/constants/storage';

interface GlassmorphismState {
   blur: number; // 0-100px
   opacity: number; // 0-1
   color: string; // #hex
   borderSize: number; // 0-10px
   borderOpacity: number; // 0-1
   boxShadowX: number; // -50-50px
   boxShadowY: number; // -50-50px
   boxShadowBlur: number; // 0-100px
   boxShadowSpread: number; // -50-50px
   boxShadowOpacity: number; // 0-1
   borderRadius: number; // 0-100px
   bgImage: string; // URL for background
}

const DEFAULT_STATE: GlassmorphismState = {
   blur: 16,
   opacity: 0.15,
   color: '#ffffff',
   borderSize: 1,
   borderOpacity: 0.2,
   boxShadowX: 0,
   boxShadowY: 8,
   boxShadowBlur: 32,
   boxShadowSpread: 0,
   boxShadowOpacity: 0.1,
   borderRadius: 24,
   bgImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
};

const BGS = [
   'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
   'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2000&auto=format&fit=crop',
   'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2000&auto=format&fit=crop',
   'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2000&auto=format&fit=crop',
];

export function GlassmorphismGeneratorView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [state, setState] = useState<GlassmorphismState>(DEFAULT_STATE);
   const [copiedCss, setCopiedCss] = useState(false);
   const [copiedTailwind, setCopiedTailwind] = useState(false);
   const [activeTab, setActiveTab] = useState<'css' | 'tailwind'>('css');

   // Load state from localStorage
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const stored = localStorage.getItem(STORAGE_KEYS.GLASSMORPHISM_SETTINGS);
         if (stored) {
            try {
               setState({ ...DEFAULT_STATE, ...JSON.parse(stored) });
            } catch {
               // Ignore parse errors
            }
         }
      }
   }, [isPersistenceEnabled]);

   // Save state to localStorage
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      localStorage.setItem(STORAGE_KEYS.GLASSMORPHISM_SETTINGS, JSON.stringify(state));
   }, [state, isPersistenceEnabled]);

   // Convert hex to rgb
   const hexToRgb = (hex: string) => {
      let r = 0, g = 0, b = 0;
      if (hex.length === 4) {
         r = parseInt(hex[1] + hex[1], 16);
         g = parseInt(hex[2] + hex[2], 16);
         b = parseInt(hex[3] + hex[3], 16);
      } else if (hex.length === 7) {
         r = parseInt(hex.substring(1, 3), 16);
         g = parseInt(hex.substring(3, 5), 16);
         b = parseInt(hex.substring(5, 7), 16);
      }
      return `${r}, ${g}, ${b}`;
   };

   const rgbColor = hexToRgb(state.color);
   const rgbaColor = `rgba(${rgbColor}, ${state.opacity.toFixed(2)})`;
   const borderColor = `rgba(${hexToRgb('#ffffff')}, ${state.borderOpacity.toFixed(2)})`;
   const shadowColor = `rgba(0, 0, 0, ${state.boxShadowOpacity.toFixed(2)})`;

   const cssCode = `/* CSS Glassmorphism */
.glass {
  background: ${rgbaColor};
  backdrop-filter: blur(${state.blur}px);
  -webkit-backdrop-filter: blur(${state.blur}px);
  border-radius: ${state.borderRadius}px;
  border: ${state.borderSize}px solid ${borderColor};
  box-shadow: ${state.boxShadowX}px ${state.boxShadowY}px ${state.boxShadowBlur}px ${state.boxShadowSpread}px ${shadowColor};
}`;

   // Tailwind specific handling
   const getTailwindCode = () => {
      const cls = [
         'backdrop-blur-[' + state.blur + 'px]',
         'bg-[' + rgbaColor + ']',
         'rounded-[' + state.borderRadius + 'px]',
      ];
      if (state.borderSize > 0) {
         cls.push('border-[' + state.borderSize + 'px]');
         cls.push('border-[rgba(255,255,255,' + state.borderOpacity.toFixed(2) + ')]');
      }
      if (state.boxShadowOpacity > 0 || state.boxShadowBlur > 0) {
         cls.push('shadow-[' + state.boxShadowX + 'px_' + state.boxShadowY + 'px_' + state.boxShadowBlur + 'px_' + state.boxShadowSpread + 'px_' + shadowColor.replace(/ /g, '') + ']');
      }
      return `<!-- Tailwind CSS Glassmorphism -->
<div class="${cls.join(' ')}">
  <!-- Content -->
</div>`;
   };

   const tailwindCode = getTailwindCode();

   const copyToClipboard = async (text: string, type: 'css' | 'tailwind') => {
      try {
         await navigator.clipboard.writeText(text);
         if (type === 'css') {
            setCopiedCss(true);
            setTimeout(() => setCopiedCss(false), 2000);
         } else {
            setCopiedTailwind(true);
            setTimeout(() => setCopiedTailwind(false), 2000);
         }
      } catch (err) {
         console.error('Failed to copy', err);
      }
   };

   return (
      <div className="w-full h-full flex flex-col md:flex-row bg-background overflow-hidden relative border border-border rounded-xl shadow-sm">
         
         {/* Live Preview Panel (Left/Top) */}
         <div 
            className="flex-1 min-h-[400px] md:min-h-0 relative flex items-center justify-center p-8 bg-cover bg-center overflow-hidden" 
            style={{ backgroundImage: `url(${state.bgImage})` }}
         >
            {/* Background images picker */}
            <div className="absolute bottom-4 left-4 z-20 flex gap-2">
               {BGS.map((bg, idx) => (
                  <button
                     key={idx}
                     onClick={() => setState({ ...state, bgImage: bg })}
                     className={`w-10 h-10 rounded-md border-2 overflow-hidden hover:scale-105 transition-all ${state.bgImage === bg ? 'border-white' : 'border-white/20'}`}
                  >
                     <img src={bg} alt={'bg ' + idx} className="w-full h-full object-cover" />
                  </button>
               ))}
            </div>

            {/* The Glass Element */}
            <div 
               className="relative z-10 w-full max-w-sm aspect-square flex flex-col justify-center items-center p-8 text-center"
               style={{
                  background: rgbaColor,
                  backdropFilter: `blur(${state.blur}px)`,
                  WebkitBackdropFilter: `blur(${state.blur}px)`,
                  borderRadius: `${state.borderRadius}px`,
                  border: `${state.borderSize}px solid ${borderColor}`,
                  boxShadow: `${state.boxShadowX}px ${state.boxShadowY}px ${state.boxShadowBlur}px ${state.boxShadowSpread}px ${shadowColor}`,
               }}
            >
               <Layers className="w-16 h-16 text-white mb-6 drop-shadow-md" />
               <h3 className="text-3xl font-black tracking-tight text-white drop-shadow-md mb-2">Glassmorphism</h3>
               <p className="text-white/80 font-medium tracking-wide">Adjust the sliders to see changes.</p>
            </div>
         </div>

         {/* Controls Panel (Right/Bottom) */}
         <div className="flex flex-col w-full md:w-[450px] bg-background border-t md:border-t-0 md:border-l border-border shrink-0 max-h-full overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/20 flex items-center gap-2 shrink-0">
               <Droplets className="w-4 h-4 text-brand" />
               <h2 className="font-semibold text-sm">Glassmorphism Settings</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
               {/* Surface */}
               <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                     <PaintBucket className="w-4 h-4" /> Surface styling
                  </h3>
                  
                  <div className="space-y-3">
                     <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">Blur</label>
                        <span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">{state.blur}px</span>
                     </div>
                     <input type="range" min="0" max="100" value={state.blur} onChange={(e) => setState({...state, blur: Number(e.target.value)})} className="w-full accent-brand" />
                  </div>

                  <div className="space-y-3">
                     <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">Opacity</label>
                        <span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">{state.opacity.toFixed(2)}</span>
                     </div>
                     <input type="range" min="0" max="1" step="0.01" value={state.opacity} onChange={(e) => setState({...state, opacity: Number(e.target.value)})} className="w-full accent-brand" />
                  </div>

                  <div className="space-y-3">
                     <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">Color</label>
                        <input type="color" value={state.color} onChange={(e) => setState({...state, color: e.target.value})} className="h-8 w-14 rounded cursor-pointer" />
                     </div>
                  </div>
               </div>

               {/* Outline */}
               <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                     <ImageIcon className="w-4 h-4" /> Border Edge
                  </h3>
                  
                  <div className="space-y-3">
                     <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">Border Width</label>
                        <span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">{state.borderSize}px</span>
                     </div>
                     <input type="range" min="0" max="10" value={state.borderSize} onChange={(e) => setState({...state, borderSize: Number(e.target.value)})} className="w-full accent-brand" />
                  </div>
                  
                  <div className="space-y-3">
                     <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">Border Opacity (White)</label>
                        <span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">{state.borderOpacity.toFixed(2)}</span>
                     </div>
                     <input type="range" min="0" max="1" step="0.01" value={state.borderOpacity} onChange={(e) => setState({...state, borderOpacity: Number(e.target.value)})} className="w-full accent-brand" />
                  </div>
               </div>

               {/* Shadow */}
               <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                     <Layers className="w-4 h-4" /> Drop Shadow
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-3">
                        <div className="flex justify-between items-center">
                           <label className="text-xs text-muted-foreground">X Offset</label>
                           <span className="text-[10px] font-mono">{state.boxShadowX}</span>
                        </div>
                        <input type="range" min="-50" max="50" value={state.boxShadowX} onChange={(e) => setState({...state, boxShadowX: Number(e.target.value)})} className="w-full accent-brand" />
                     </div>
                     <div className="space-y-3">
                        <div className="flex justify-between items-center">
                           <label className="text-xs text-muted-foreground">Y Offset</label>
                           <span className="text-[10px] font-mono">{state.boxShadowY}</span>
                        </div>
                        <input type="range" min="-50" max="50" value={state.boxShadowY} onChange={(e) => setState({...state, boxShadowY: Number(e.target.value)})} className="w-full accent-brand" />
                     </div>
                     <div className="space-y-3">
                        <div className="flex justify-between items-center">
                           <label className="text-xs text-muted-foreground">Blur</label>
                           <span className="text-[10px] font-mono">{state.boxShadowBlur}</span>
                        </div>
                        <input type="range" min="0" max="100" value={state.boxShadowBlur} onChange={(e) => setState({...state, boxShadowBlur: Number(e.target.value)})} className="w-full accent-brand" />
                     </div>
                     <div className="space-y-3">
                        <div className="flex justify-between items-center">
                           <label className="text-xs text-muted-foreground">Spread</label>
                           <span className="text-[10px] font-mono">{state.boxShadowSpread}</span>
                        </div>
                        <input type="range" min="-50" max="50" value={state.boxShadowSpread} onChange={(e) => setState({...state, boxShadowSpread: Number(e.target.value)})} className="w-full accent-brand" />
                     </div>
                  </div>

                  <div className="space-y-3 pt-2">
                     <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">Shadow Opacity (Black)</label>
                        <span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">{state.boxShadowOpacity.toFixed(2)}</span>
                     </div>
                     <input type="range" min="0" max="1" step="0.01" value={state.boxShadowOpacity} onChange={(e) => setState({...state, boxShadowOpacity: Number(e.target.value)})} className="w-full accent-brand" />
                  </div>
               </div>

               {/* Corner */}
               <div className="space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                     <Maximize className="w-4 h-4" /> Border Radius
                  </h3>
                  
                  <div className="space-y-3">
                     <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">Rounding</label>
                        <span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">{state.borderRadius}px</span>
                     </div>
                     <input type="range" min="0" max="150" value={state.borderRadius} onChange={(e) => setState({...state, borderRadius: Number(e.target.value)})} className="w-full accent-brand" />
                  </div>
               </div>
            </div>
            
            {/* Output Code */}
            <div className="border-t border-border shrink-0 bg-muted/10">
               <div className="flex border-b border-border">
                  <button 
                     className={`flex-1 py-2 text-xs font-bold ${activeTab === 'css' ? 'text-brand border-b-2 border-brand bg-brand/5' : 'text-muted-foreground hover:bg-muted/50'}`}
                     onClick={() => setActiveTab('css')}
                  >
                     CSS Code
                  </button>
                  <button 
                     className={`flex-1 py-2 text-xs font-bold ${activeTab === 'tailwind' ? 'text-brand border-b-2 border-brand bg-brand/5' : 'text-muted-foreground hover:bg-muted/50'}`}
                     onClick={() => setActiveTab('tailwind')}
                  >
                     Tailwind CSS
                  </button>
               </div>
               <div className="relative p-4 h-[180px] overflow-y-auto">
                  <pre className="text-xs font-mono text-emerald-400 whitespace-pre-wrap">
                     {activeTab === 'css' ? cssCode : tailwindCode}
                  </pre>
                  <Button
                     variant="secondary"
                     size="sm"
                     className="absolute top-4 right-4 h-7 gap-1 shadow-sm border border-border/50"
                     onClick={() => copyToClipboard(activeTab === 'css' ? cssCode : tailwindCode, activeTab)}
                  >
                     {(activeTab === 'css' ? copiedCss : copiedTailwind) ? (
                        <>
                           <Check className="h-3.5 w-3.5 text-success" />
                           <span className="text-success">Copied</span>
                        </>
                     ) : (
                        <>
                           <Copy className="h-3.5 w-3.5" />
                           Copy
                        </>
                     )}
                  </Button>
               </div>
            </div>
         </div>
         
      </div>
   );
}
