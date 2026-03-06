'use client';

import React, { useState, useMemo } from 'react';
import { 
   hexToRgb, 
   rgbToHex, 
   rgbToHsl, 
   hslToRgb, 
   rgbToCmyk, 
   cmykToRgb, 
   getContrast, 
   getWcagRating, 
   generatePalette,
   RGB,
   HSL,
   CMYK
} from '@/lib/color-utils';
import { Copy, CheckCircle2, RefreshCw, Palette, Contrast, Hash, Pipette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ColorConverterView() {
   const [hex, setHex] = useState('#6366F1'); // Indigo-500 default
   const [rgb, setRgb] = useState<RGB>({ r: 99, g: 102, b: 241 });
   const [hsl, setHsl] = useState<HSL>({ h: 239, s: 84, l: 67 });
   const [cmyk, setCmyk] = useState<CMYK>({ c: 59, m: 58, y: 0, k: 5 });
   
   const [bgColor, setBgColor] = useState('#FFFFFF');
   const [bgRgb, setBgRgb] = useState<RGB>({ r: 255, g: 255, b: 255 });

   const [copiedField, setCopiedField] = useState<string | null>(null);

   // Sync from HEX
   const handleHexChange = (value: string) => {
      setHex(value);
      const parsed = hexToRgb(value);
      if (parsed) {
         setRgb(parsed);
         const h = rgbToHsl(parsed);
         setHsl(h);
         const c = rgbToCmyk(parsed);
         setCmyk(c);
      }
   };

   // Sync from RGB
   const handleRgbChange = (key: keyof RGB, value: string) => {
      const num = parseInt(value) || 0;
      const next = { ...rgb, [key]: Math.min(255, Math.max(0, num)) };
      setRgb(next);
      const h = rgbToHex(next);
      setHex(h);
      setHsl(rgbToHsl(next));
      setCmyk(rgbToCmyk(next));
   };

   // Sync from HSL
   const handleHslChange = (key: keyof HSL, value: string) => {
      const num = parseInt(value) || 0;
      const max = key === 'h' ? 360 : 100;
      const next = { ...hsl, [key]: Math.min(max, Math.max(0, num)) };
      setHsl(next);
      const r = hslToRgb(next);
      setRgb(r);
      setHex(rgbToHex(r));
      setCmyk(rgbToCmyk(r));
   };

   // Sync from CMYK
   const handleCmykChange = (key: keyof CMYK, value: string) => {
      const num = parseInt(value) || 0;
      const next = { ...cmyk, [key]: Math.min(100, Math.max(0, num)) };
      setCmyk(next);
      const r = cmykToRgb(next);
      setRgb(r);
      setHex(rgbToHex(r));
      setHsl(rgbToHsl(r));
   };

   const handleBgHexChange = (value: string) => {
      setBgColor(value);
      const parsed = hexToRgb(value);
      if (parsed) setBgRgb(parsed);
   };

   const copyToClipboard = async (text: string, field: string) => {
      try {
         await navigator.clipboard.writeText(text);
         setCopiedField(field);
         setTimeout(() => setCopiedField(null), 2000);
      } catch (err) {
         console.error('Failed to copy!', err);
      }
   };

   const contrastRatio = useMemo(() => getContrast(rgb, bgRgb), [rgb, bgRgb]);
   const wcag = useMemo(() => getWcagRating(contrastRatio), [contrastRatio]);

   const palettes = useMemo(() => ({
      complementary: generatePalette(hsl, 'complementary'),
      analogous: generatePalette(hsl, 'analogous'),
      triadic: generatePalette(hsl, 'triadic'),
      monochromatic: generatePalette(hsl, 'monochromatic'),
   }), [hsl]);

   return (
      <div className="flex flex-col h-full w-full bg-background overflow-hidden">
         {/* Toolbar */}
         <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/20 shrink-0">
            <div className="flex items-center gap-2">
               <Palette className="w-5 h-5 text-indigo-500" />
               <h1 className="text-base font-bold tracking-tight">Color Converter & Palette</h1>
            </div>
            <div className="flex items-center gap-3">
               <div 
                  className="w-8 h-8 rounded-full border border-border shadow-sm transition-transform hover:scale-110 cursor-help"
                  style={{ backgroundColor: hex }}
                  title="Current Color"
               />
               <div className="h-4 w-px bg-border mx-1" />
               <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 gap-2 text-xs font-medium"
                  onClick={() => handleHexChange('#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'))}
               >
                  <RefreshCw className="w-3 h-3" /> Random
               </Button>
            </div>
         </div>

         <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-border overflow-hidden">
            {/* Left Panel: Inputs & Conversions */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-background/50 backdrop-blur-sm">
               
               {/* Color Input */}
               <section className="space-y-4">
                  <div className="flex items-center justify-between">
                     <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Pipette className="w-3 h-3" /> Select Color
                     </h2>
                  </div>
                  <div className="flex gap-4 items-center">
                     <div className="relative group">
                        <input 
                           type="color" 
                           value={hex} 
                           onChange={(e) => handleHexChange(e.target.value)}
                           className="w-20 h-20 rounded-xl border-0 p-0 overflow-hidden cursor-pointer shadow-lg transition-transform active:scale-95 bg-transparent"
                        />
                        <div className="absolute inset-0 rounded-xl border-4 border-white/20 pointer-events-none group-hover:border-white/40 transition-colors" />
                     </div>
                     <div className="flex-1 space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground ml-1">Hex Code</label>
                        <div className="relative">
                           <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                           <Input 
                              value={hex.replace('#', '')} 
                              onChange={(e) => handleHexChange('#' + e.target.value)}
                              className="pl-9 font-mono text-base tracking-wider uppercase h-11 border-border/60 focus:border-indigo-500/50"
                              spellCheck={false}
                           />
                           <Button 
                              variant="ghost" 
                              size="icon" 
                              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
                              onClick={() => copyToClipboard(hex, 'hex')}
                           >
                              {copiedField === 'hex' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                           </Button>
                        </div>
                     </div>
                  </div>
               </section>

               {/* Conversion Grid */}
               <section className="space-y-6">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Conversions</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     {/* RGB */}
                     <div className="space-y-3 p-4 rounded-xl border border-border/50 bg-muted/5">
                        <div className="flex items-center justify-between">
                           <span className="text-xs font-bold text-indigo-400">RGB</span>
                           <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 px-2 text-[10px] uppercase font-bold text-muted-foreground hover:text-foreground"
                              onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'rgb')}
                           >
                              {copiedField === 'rgb' ? 'Copied' : 'Copy'}
                           </Button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                           {['r', 'g', 'b'].map((k) => (
                              <div key={k} className="space-y-1">
                                 <span className="text-[10px] uppercase text-muted-foreground font-mono ml-1">{k}</span>
                                 <Input 
                                    type="number" 
                                    value={rgb[k as keyof RGB]} 
                                    onChange={(e) => handleRgbChange(k as keyof RGB, e.target.value)}
                                    className="h-9 font-mono bg-background border-border/40"
                                 />
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* HSL */}
                     <div className="space-y-3 p-4 rounded-xl border border-border/50 bg-muted/5">
                        <div className="flex items-center justify-between">
                           <span className="text-xs font-bold text-emerald-400">HSL</span>
                           <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 px-2 text-[10px] uppercase font-bold text-muted-foreground hover:text-foreground"
                              onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, 'hsl')}
                           >
                              {copiedField === 'hsl' ? 'Copied' : 'Copy'}
                           </Button>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                           {['h', 's', 'l'].map((k) => (
                              <div key={k} className="space-y-1">
                                 <span className="text-[10px] uppercase text-muted-foreground font-mono ml-1">{k}</span>
                                 <div className="relative">
                                    <Input 
                                       type="number" 
                                       value={hsl[k as keyof HSL]} 
                                       onChange={(e) => handleHslChange(k as keyof HSL, e.target.value)}
                                       className="h-9 pr-5 font-mono bg-background border-border/40"
                                    />
                                    <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground pr-1">
                                       {k === 'h' ? '°' : '%'}
                                    </span>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>

                     {/* CMYK */}
                     <div className="space-y-3 p-4 rounded-xl border border-border/50 bg-muted/5 sm:col-span-2">
                        <div className="flex items-center justify-between">
                           <span className="text-xs font-bold text-rose-400">CMYK</span>
                           <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-6 px-2 text-[10px] uppercase font-bold text-muted-foreground hover:text-foreground"
                              onClick={() => copyToClipboard(`cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`, 'cmyk')}
                           >
                              {copiedField === 'cmyk' ? 'Copied' : 'Copy'}
                           </Button>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                           {['c', 'm', 'y', 'k'].map((f) => (
                              <div key={f} className="space-y-1">
                                 <span className="text-[10px] uppercase text-muted-foreground font-mono ml-1">{f}</span>
                                 <div className="relative">
                                    <Input 
                                       type="number" 
                                       value={cmyk[f as keyof CMYK]} 
                                       onChange={(e) => handleCmykChange(f as keyof CMYK, e.target.value)}
                                       className="h-9 pr-5 font-mono bg-background border-border/40"
                                    />
                                    <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground pr-1">%</span>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </section>
            </div>

            {/* Right Panel: Contrast & Palette */}
            <div className="flex-1 overflow-y-auto bg-muted/10 p-6 space-y-8">
               
               {/* Contrast Checker */}
               <section className="space-y-6">
                  <div className="flex items-center justify-between">
                     <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Contrast className="w-3.5 h-3.5" /> Contrast Checker
                     </h2>
                     <span className="text-[10px] text-muted-foreground bg-muted px-2 py-0.5 rounded-full font-medium">WCAG 2.1</span>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                     {/* Preview Box */}
                     <div 
                        className="h-32 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-inner border border-border/10 transition-colors duration-300 relative overflow-hidden group"
                        style={{ backgroundColor: bgColor, color: hex }}
                     >
                        <span className="text-xl font-bold">Sample Text</span>
                        <span className="text-xs opacity-80">This is how it looks</span>
                        <div className="absolute top-2 right-3 text-[10px] font-bold tracking-tighter uppercase opacity-30 group-hover:opacity-100 transition-opacity">Preview</div>
                     </div>

                     {/* Controls */}
                     <div className="space-y-4">
                        <div className="space-y-2">
                           <label className="text-[10px] font-bold uppercase text-muted-foreground tracking-tight flex items-center justify-between">
                              Background Color
                              <span className="font-mono text-[9px] text-foreground/60">{bgColor.toUpperCase()}</span>
                           </label>
                           <div className="flex gap-2">
                              <input 
                                 type="color" 
                                 value={bgColor} 
                                 onChange={(e) => handleBgHexChange(e.target.value)}
                                 className="w-10 h-10 rounded-lg border-0 p-0 overflow-hidden cursor-pointer shadow-sm bg-transparent"
                              />
                              <Input 
                                 value={bgColor.replace('#', '')} 
                                 onChange={(e) => handleBgHexChange('#' + e.target.value)}
                                 className="h-10 font-mono text-xs uppercase"
                                 maxLength={6}
                              />
                           </div>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-xl bg-background border border-border/50">
                           <div className="space-y-0.5">
                              <div className="text-xs font-bold text-muted-foreground uppercase tracking-tight">Contrast Ratio</div>
                              <div className="text-2xl font-black tabular-nums">{contrastRatio.toFixed(2)}:1</div>
                           </div>
                           <div className="flex gap-1.5 flex-wrap justify-end max-w-[120px]">
                              {Object.entries(wcag).map(([key, pass]) => (
                                 <div 
                                    key={key} 
                                    className={`px-2 py-0.5 rounded text-[9px] font-black uppercase transition-colors ${
                                       pass 
                                          ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/20' 
                                          : 'bg-red-500/15 text-red-500 border border-red-500/20'
                                    }`}
                                 >
                                    {key === 'largeAa' ? 'AA Large' : key === 'largeAaa' ? 'AAA Large' : key.toUpperCase()}
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>
               </section>

               {/* Palette Generator */}
               <section className="space-y-6">
                  <div className="flex items-center justify-between">
                     <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <Palette className="w-3.5 h-3.5" /> Harmony Palettes
                     </h2>
                  </div>

                  <div className="space-y-8 pb-4">
                     {Object.entries(palettes).map(([name, colors]) => (
                        <div key={name} className="space-y-3">
                           <div className="flex items-center justify-between">
                              <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{name}</h3>
                           </div>
                           <div className="flex h-16 rounded-xl overflow-hidden shadow-sm border border-border/20 group">
                              {colors.map((c, i) => (
                                 <button
                                    key={i}
                                    className="flex-1 transition-all hover:flex-[1.5] relative group/item"
                                    style={{ backgroundColor: c.hex }}
                                    onClick={() => handleHexChange(c.hex)}
                                    title={`Click to use ${c.hex}`}
                                 >
                                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[8px] font-bold text-white bg-black/40 px-1 rounded opacity-0 group-hover/item:opacity-100 transition-opacity pointer-events-none uppercase">
                                       {c.hex}
                                    </span>
                                 </button>
                              ))}
                           </div>
                        </div>
                     ))}
                  </div>
               </section>
            </div>
         </div>
      </div>
   );
}
