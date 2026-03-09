'use client';

import { useState, useEffect, useRef } from 'react';
import { Copy, Check, Palette, Plus, Trash2, Dice5, PaintBucket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePersistence } from '@/contexts/PersistenceContext';
import { STORAGE_KEYS } from '@/constants/storage';

type GradientType = 'linear' | 'radial' | 'conic';

interface ColorStop {
   id: string;
   color: string;
   position: number;
}

interface GradientState {
   type: GradientType;
   angle: number; // For linear and conic
   stops: ColorStop[];
}

const DEFAULT_STATE: GradientState = {
   type: 'linear',
   angle: 90,
   stops: [
      { id: '1', color: '#4f46e5', position: 0 },
      { id: '2', color: '#ec4899', position: 100 },
   ],
};

const generateId = () => Math.random().toString(36).substring(2, 9);

export function GradientGeneratorView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [state, setState] = useState<GradientState>(DEFAULT_STATE);
   const [copiedCss, setCopiedCss] = useState(false);
   const [copiedTailwind, setCopiedTailwind] = useState(false);
   const [activeTab, setActiveTab] = useState<'css' | 'tailwind'>('css');

   // Load state from localStorage
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const stored = localStorage.getItem(STORAGE_KEYS.GRADIENT_GENERATOR_SETTINGS);
         if (stored) {
            try {
               setState({ ...DEFAULT_STATE, ...JSON.parse(stored) });
            } catch {
               // Ignore
            }
         }
      }
   }, [isPersistenceEnabled]);

   // Save state
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      localStorage.setItem(STORAGE_KEYS.GRADIENT_GENERATOR_SETTINGS, JSON.stringify(state));
   }, [state, isPersistenceEnabled]);

   const addStop = () => {
      // Find a good position between the last two visually, or just add at 50%
      const newStops = [...state.stops];
      const maxPos = newStops.reduce((max, s) => Math.max(max, s.position), 0);
      let newPos = maxPos < 100 ? maxPos + 10 : 50;
      if (newPos > 100) newPos = 50;

      // Random color
      const rndColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
      
      newStops.push({ id: generateId(), color: rndColor, position: newPos });
      setState({ ...state, stops: newStops });
   };

   const removeStop = (id: string) => {
      if (state.stops.length <= 2) return; // Min 2 stops
      setState({ ...state, stops: state.stops.filter((s) => s.id !== id) });
   };

   const updateStop = (id: string, updates: Partial<ColorStop>) => {
      const newStops = state.stops.map((s) => (s.id === id ? { ...s, ...updates } : s));
      setState({ ...state, stops: newStops });
   };

   const randomize = () => {
      const c1 = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
      const c2 = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
      setState({
         type: state.type,
         angle: Math.floor(Math.random() * 360),
         stops: [
            { id: generateId(), color: c1, position: 0 },
            { id: generateId(), color: c2, position: 100 },
         ],
      });
   };

   // Generate CSS string
   const getGradientString = () => {
      const sortedStops = [...state.stops].sort((a, b) => a.position - b.position);
      const stopsStr = sortedStops.map((s) => `${s.color} ${s.position}%`).join(', ');
      
      if (state.type === 'linear') {
         return `linear-gradient(${state.angle}deg, ${stopsStr})`;
      } else if (state.type === 'radial') {
         return `radial-gradient(circle, ${stopsStr})`;
      } else if (state.type === 'conic') {
         return `conic-gradient(from ${state.angle}deg, ${stopsStr})`;
      }
      return '';
   };

   const gradientValue = getGradientString();
   
   const sortedStops = [...state.stops].sort((a, b) => a.position - b.position);

   const cssCode = `/* CSS Gradient */
.gradient-bg {
  background: ${sortedStops[0].color}; /* fallback for old browsers */
  background: ${gradientValue};
}`;

   const tailwindCode = `<!-- Tailwind CSS Gradient -->
<div class="bg-[${gradientValue.replace(/ /g, '_')}]"></div>

<!-- Alternatively, if linear and matching Tailwind's default angles you can use standard utilities: -->
<!-- e.g. bg-linear-to-r from-[${sortedStops[0].color}] to-[${sortedStops[sortedStops.length-1].color}] -->`;

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

   const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'CSS Gradient Generator',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online tool to generate linear, radial, and conic CSS gradients.',
   };

   return (
      <div className="w-full h-full flex flex-col md:flex-row bg-background overflow-hidden relative border border-border rounded-xl shadow-sm">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

         {/* Left Preview Panel */}
         <div 
            className="flex-1 min-h-[400px] md:min-h-0 relative flex items-center justify-center p-8 transition-all duration-300" 
         >
            <div 
               className="w-full h-full max-w-2xl max-h-[80%] rounded-3xl shadow-2xl transition-all duration-300"
               style={{ background: gradientValue }}
            />
         </div>

         {/* Right Controls Panel */}
         <div className="flex flex-col w-full md:w-[450px] bg-background border-t md:border-t-0 md:border-l border-border shrink-0 max-h-full overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-between shrink-0">
               <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-brand" />
                  <h2 className="font-semibold text-sm">Gradient Editor</h2>
               </div>
               <Button variant="ghost" size="sm" className="h-7 text-xs px-2 gap-1 text-muted-foreground hover:text-foreground" onClick={randomize}>
                  <Dice5 className="w-3.5 h-3.5" /> Randomize
               </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
               {/* Controls */}
               <div className="space-y-4">
                  <div className="flex bg-muted p-1 rounded-lg">
                     <button
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${state.type === 'linear' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        onClick={() => setState({ ...state, type: 'linear' })}
                     >
                        Linear
                     </button>
                     <button
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${state.type === 'radial' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        onClick={() => setState({ ...state, type: 'radial' })}
                     >
                        Radial
                     </button>
                     <button
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${state.type === 'conic' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        onClick={() => setState({ ...state, type: 'conic' })}
                     >
                        Conic
                     </button>
                  </div>

                  {(state.type === 'linear' || state.type === 'conic') && (
                     <div className="space-y-3 pt-2">
                        <div className="flex justify-between items-center">
                           <label className="text-sm font-medium">Angle</label>
                           <span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">{state.angle}°</span>
                        </div>
                        <input type="range" min="0" max="360" value={state.angle} onChange={(e) => setState({...state, angle: Number(e.target.value)})} className="w-full accent-brand" />
                     </div>
                  )}
               </div>

               {/* Colors */}
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <PaintBucket className="w-4 h-4" /> Color Stops
                     </h3>
                     <Button variant="outline" size="sm" className="h-7 text-xs px-2 gap-1" onClick={addStop} disabled={state.stops.length >= 8}>
                        <Plus className="w-3.5 h-3.5" /> Stop
                     </Button>
                  </div>

                  <div className="space-y-3">
                     {state.stops.map((stop) => (
                        <div key={stop.id} className="flex flex-col gap-2 p-3 bg-muted/30 border border-border/50 rounded-lg relative group">
                           <div className="flex items-center gap-3">
                              <input 
                                 type="color" 
                                 value={stop.color} 
                                 onChange={(e) => updateStop(stop.id, { color: e.target.value })} 
                                 className="h-8 w-10 rounded cursor-pointer shrink-0" 
                              />
                              <div className="flex-1 flex flex-col gap-1 w-full relative">
                                 <div className="flex justify-between items-center w-full">
                                    <span className="text-xs font-mono text-muted-foreground">{stop.color.toUpperCase()}</span>
                                    <span className="text-xs font-mono">{stop.position}%</span>
                                 </div>
                                 <input 
                                    type="range" 
                                    min="0" 
                                    max="100" 
                                    value={stop.position} 
                                    onChange={(e) => updateStop(stop.id, { position: Number(e.target.value) })} 
                                    className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-brand" 
                                 />
                              </div>
                              <button
                                 onClick={() => removeStop(stop.id)}
                                 disabled={state.stops.length <= 2}
                                 className="w-7 h-7 flex items-center justify-center shrink-0 rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-muted-foreground"
                                 title="Remove color stop"
                              >
                                 <Trash2 className="w-4 h-4" />
                              </button>
                           </div>
                        </div>
                     ))}
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
