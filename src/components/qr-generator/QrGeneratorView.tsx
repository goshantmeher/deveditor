'use client';

import React, { useState, useRef, useCallback, useDeferredValue } from 'react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';
import { QrCode, Copy, CheckCircle2, Type, Palette, Maximize, ShieldCheck, FileImage, FileCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// ── Types & Constants ────────────────────────────────────────

type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

const ERROR_LEVELS: { id: ErrorCorrectionLevel; label: string; desc: string }[] = [
   { id: 'L', label: 'Low (7%)', desc: 'Minimal recovery, smallest size' },
   { id: 'M', label: 'Medium (15%)', desc: 'Standard balance' },
   { id: 'Q', label: 'Quartile (25%)', desc: 'Good for complex environments' },
   { id: 'H', label: 'High (30%)', desc: 'Best recovery, handles damage' },
];

const PRESET_COLORS = [
   { name: 'Black', fg: '#000000', bg: '#ffffff' },
   { name: 'Deep Blue', fg: '#1e3a8a', bg: '#eff6ff' },
   { name: 'Emerald', fg: '#065f46', bg: '#ecfdf5' },
   { name: 'Rose', fg: '#9f1239', bg: '#fff1f2' },
   { name: 'Violet', fg: '#5b21b6', bg: '#f5f3ff' },
];

export function QrGeneratorView() {
   const [content, setContent] = useState('https://deveditor.io');
   const [fgColor, setFgColor] = useState('#000000');
   const [bgColor, setBgColor] = useState('#ffffff');
   const [size, setSize] = useState(256);
   const [marginSize, setMarginSize] = useState(4);
   const [level, setLevel] = useState<ErrorCorrectionLevel>('M');
   const [copied, setCopied] = useState(false);

   // ── Deferred Values for Performance ─────────────────────────
   const deferredContent = useDeferredValue(content);
   const deferredSize = useDeferredValue(size);
   const deferredMargin = useDeferredValue(marginSize);
   const deferredFg = useDeferredValue(fgColor);
   const deferredBg = useDeferredValue(bgColor);
   const deferredLevel = useDeferredValue(level);

   const qrRef = useRef<HTMLDivElement>(null);

   const copyToClipboard = useCallback(async () => {
      if (!qrRef.current) return;
      try {
         const canvas = qrRef.current.querySelector('canvas');
         if (!canvas) return;

         canvas.toBlob(async (blob) => {
            if (!blob) return;
            await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
         });
      } catch (err) {
         console.error('Failed to copy image:', err);
      }
   }, []);

   const downloadImage = useCallback((format: 'png' | 'svg') => {
      if (!qrRef.current) return;

      const fileName = `qrcode-${Date.now()}`;

      if (format === 'png') {
         const canvas = qrRef.current.querySelector('canvas');
         if (!canvas) return;
         const url = canvas.toDataURL('image/png');
         const link = document.createElement('a');
         link.href = url;
         link.download = `${fileName}.png`;
         link.click();
      } else {
         const svg = qrRef.current.querySelector('svg');
         if (!svg) return;
         const svgData = new XMLSerializer().serializeToString(svg);
         const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
         const url = URL.createObjectURL(svgBlob);
         const link = document.createElement('a');
         link.href = url;
         link.download = `${fileName}.svg`;
         link.click();
         URL.revokeObjectURL(url);
      }
   }, []);

   return (
      <div className="flex flex-col h-full w-full bg-background border border-border rounded-xl shadow-sm overflow-hidden font-sans">
         {/* Toolbar */}
         <div className="flex items-center justify-between px-4 md:px-6 py-3 border-b border-border bg-background shrink-0">
            <div className="flex items-center gap-2">
               <div className="bg-indigo-500/10 p-1.5 rounded-lg">
                  <QrCode className="w-5 h-5 text-indigo-500" />
               </div>
               <h1 className="text-sm font-bold tracking-tight">QR Code Generator</h1>
            </div>

            <div className="flex items-center gap-2">
               <Tooltip>
                  <TooltipTrigger asChild>
                     <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-[11px] font-bold"
                        onClick={() => setContent('')}
                     >
                        Clear
                     </Button>
                  </TooltipTrigger>
                  <TooltipContent>Reset content</TooltipContent>
               </Tooltip>
               <div className="h-4 w-px bg-border mx-1" />
               <Button
                  variant="outline"
                  size="sm"
                  className="h-8 text-xs gap-1.5"
                  onClick={() => setContent('https://github.com/goshantmeher/deveditor')}
               >
                  Sample
               </Button>
            </div>
         </div>

         {/* Main Layout */}
         <div className="flex-1 flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-border overflow-hidden">
            {/* Left: Settings */}
            <div className="flex-1 lg:max-w-md flex flex-col bg-background overflow-y-auto">
               <div className="p-4 md:p-6 space-y-8">
                  {/* Input Content */}
                  <section className="space-y-3">
                     <div className="flex items-center gap-2 mb-1">
                        <Type className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                           Content
                        </span>
                     </div>
                     <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Type URL or text here..."
                        className="min-h-[120px] resize-none text-sm bg-background border-border focus:border-indigo-500"
                     />
                     <p className="text-[10px] text-muted-foreground italic">Characters: {content.length}</p>
                  </section>

                  {/* Appearance */}
                  <section className="space-y-6">
                     <div className="flex items-center gap-2 mb-2">
                        <Palette className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                           Appearance
                        </span>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <Label className="text-[11px] font-medium text-muted-foreground">Foreground</Label>
                           <div className="flex items-center gap-2 p-1.5 bg-background border border-border rounded-lg">
                              <input
                                 type="color"
                                 value={fgColor}
                                 onChange={(e) => setFgColor(e.target.value)}
                                 className="w-6 h-6 rounded border-0 p-0 overflow-hidden cursor-pointer"
                              />
                              <Input
                                 value={fgColor}
                                 onChange={(e) => setFgColor(e.target.value)}
                                 className="h-7 text-[10px] font-mono border-0 p-0 focus-visible:ring-0"
                                 maxLength={7}
                              />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <Label className="text-[11px] font-medium text-muted-foreground">Background</Label>
                           <div className="flex items-center gap-2 p-1.5 bg-background border border-border rounded-lg">
                              <input
                                 type="color"
                                 value={bgColor}
                                 onChange={(e) => setBgColor(e.target.value)}
                                 className="w-6 h-6 rounded border-0 p-0 overflow-hidden cursor-pointer"
                              />
                              <Input
                                 value={bgColor}
                                 onChange={(e) => setBgColor(e.target.value)}
                                 className="h-7 text-[10px] font-mono border-0 p-0 focus-visible:ring-0"
                                 maxLength={7}
                              />
                           </div>
                        </div>
                     </div>

                     <div className="flex flex-wrap gap-2">
                        {PRESET_COLORS.map((p) => (
                           <button
                              key={p.name}
                              onClick={() => {
                                 setFgColor(p.fg);
                                 setBgColor(p.bg);
                              }}
                              className="group flex flex-col items-center gap-1.5"
                           >
                              <div
                                 className={`w-8 h-8 rounded-lg border-2 transition-all group-hover:scale-110 ${
                                    fgColor === p.fg && bgColor === p.bg
                                       ? 'border-primary ring-2 ring-primary/20'
                                       : 'border-background shadow-sm'
                                 }`}
                                 style={{
                                    background: `linear-gradient(135deg, ${p.fg} 50%, ${p.bg} 50%)`,
                                 }}
                              />
                           </button>
                        ))}
                     </div>
                  </section>

                  {/* Layout & Specs */}
                  <section className="space-y-6">
                     <div className="flex items-center gap-2 mb-2">
                        <Maximize className="w-3.5 h-3.5 text-amber-400" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                           Layout & Specs
                        </span>
                     </div>

                     <div className="space-y-4">
                        <div className="space-y-3">
                           <div className="flex justify-between items-center">
                              <Label className="text-[11px] font-medium text-muted-foreground">QR Size</Label>
                              <span className="text-[10px] font-mono text-muted-foreground">{size}px</span>
                           </div>
                           <Slider
                              value={[size]}
                              onValueChange={([v]: number[]) => setSize(v)}
                              min={128}
                              max={1024}
                              step={8}
                              className="py-2"
                           />
                        </div>

                        <div className="space-y-3">
                           <div className="flex justify-between items-center">
                              <Label className="text-[11px] font-medium text-muted-foreground">
                                 Quiet Zone (Margin)
                              </Label>
                              <span className="text-[10px] font-mono text-muted-foreground">{marginSize} blocks</span>
                           </div>
                           <Slider
                              value={[marginSize]}
                              onValueChange={([v]: number[]) => setMarginSize(v)}
                              min={0}
                              max={20}
                              step={1}
                              className="py-2"
                           />
                        </div>
                     </div>
                  </section>

                  {/* Advanced */}
                  <section className="space-y-3">
                     <div className="flex items-center gap-2 mb-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                           Error Correction
                        </span>
                     </div>
                     <Select value={level} onValueChange={(v: ErrorCorrectionLevel) => setLevel(v)}>
                        <SelectTrigger className="w-full text-xs h-9">
                           <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                           {ERROR_LEVELS.map((l) => (
                              <SelectItem key={l.id} value={l.id} className="text-xs">
                                 <div className="flex flex-col">
                                    <span className="font-bold">{l.label}</span>
                                    <span className="text-[10px] opacity-60 font-normal">{l.desc}</span>
                                 </div>
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                  </section>
               </div>
            </div>

            {/* Right: Preview & Download */}
            <div className="flex-1 flex flex-col bg-background relative">
               <div className="flex-1 flex flex-col items-center justify-center p-8 md:p-12 overflow-y-auto min-h-[400px]">
                  {/* QR Container */}
                  <div
                     ref={qrRef}
                     className="relative p-6 bg-background rounded-2xl shadow-2xl border border-border/30 overflow-hidden transition-all duration-300 hover:shadow-indigo-500/10 group"
                  >
                     {/* Decoration */}
                     <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/2 blur-[60px] pointer-events-none" />
                     <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/2 blur-[80px] pointer-events-none" />

                     <div className="relative">
                        {content ? (
                           <>
                              {/* Canvas version for copy/png */}
                              <div className="hidden">
                                 <QRCodeCanvas
                                    value={deferredContent}
                                    size={deferredSize}
                                    bgColor={deferredBg}
                                    fgColor={deferredFg}
                                    level={deferredLevel}
                                    includeMargin={true}
                                    marginSize={deferredMargin}
                                 />
                              </div>
                              {/* SVG version for high quality preview and svg download */}
                              <QRCodeSVG
                                 value={deferredContent}
                                 size={deferredSize}
                                 bgColor={deferredBg}
                                 fgColor={deferredFg}
                                 level={deferredLevel}
                                 includeMargin={true}
                                 marginSize={deferredMargin}
                                 className="max-w-[320px] md:max-w-[420px] h-auto mx-auto shadow-sm"
                              />
                           </>
                        ) : (
                           <div className="w-[320px] h-[320px] flex flex-col items-center justify-center bg-background border-2 border-dashed border-border rounded-xl transition-all group-hover:border-indigo-500/30">
                              <QrCode className="w-12 h-12 text-muted-foreground/20 mb-3" />
                              <p className="text-xs text-muted-foreground/40 font-medium">Add some content</p>
                           </div>
                        )}
                     </div>
                  </div>

                  {/* Quick Export Tabs */}
                  {content && (
                     <div className="mt-12 w-full max-w-sm space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-2 gap-3">
                           <Button
                              variant="default"
                              className="h-10 text-xs gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20"
                              onClick={() => downloadImage('png')}
                           >
                              <FileImage className="w-4 h-4" /> Download PNG
                           </Button>
                           <Button
                              variant="outline"
                              className="h-10 text-xs gap-2 border-border bg-background hover:bg-muted/30 transition-all font-semibold"
                              onClick={() => downloadImage('svg')}
                           >
                              <FileCode className="w-4 h-4 text-emerald-500" /> Download SVG
                           </Button>
                        </div>

                        <Button
                           variant="secondary"
                           className="w-full h-10 text-xs gap-2 bg-background hover:bg-muted/20 text-foreground transition-all border border-border"
                           onClick={copyToClipboard}
                        >
                           {copied ? (
                              <>
                                 <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Copied to Clipboard
                              </>
                           ) : (
                              <>
                                 <Copy className="w-4 h-4" /> Copy PNG to Clipboard
                              </>
                           )}
                        </Button>

                        <div className="flex items-center gap-2 justify-center py-2 px-4 rounded-full bg-blue-500/5 border border-blue-500/10 w-fit mx-auto">
                           <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                           <span className="text-[10px] text-blue-500/80 font-bold uppercase tracking-widest">
                              Live Generator
                           </span>
                        </div>
                     </div>
                  )}
               </div>

               {/* Hint */}
               {!content && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <p className="text-[11px] text-muted-foreground/30 font-bold uppercase tracking-[0.2em] animate-pulse">
                        Waiting for input...
                     </p>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
