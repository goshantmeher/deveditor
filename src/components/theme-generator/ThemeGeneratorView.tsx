'use client';
import { STORAGE_KEYS } from '@/constants/storage';

import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import {
   generateTheme,
   hexToHsl,
   exportAsCSS,
   exportAsTailwind,
   exportAsJSON,
   GeneratedTheme,
   ThemeColor,
} from '@/lib/theme-utils';
import {
   Copy,
   CheckCircle2,
   RefreshCw,
   Palette,
   Sun,
   Moon,
   Download,
   Code2,
   Braces,
   FileJson,
   Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { usePersistence } from '@/contexts/PersistenceContext';

// ── Preset colors ────────────────────────────────────────────
const PRESETS = [
   { name: 'Indigo', hex: '#6366F1' },
   { name: 'Emerald', hex: '#10B981' },
   { name: 'Rose', hex: '#F43F5E' },
   { name: 'Amber', hex: '#F59E0B' },
   { name: 'Cyan', hex: '#06B6D4' },
   { name: 'Violet', hex: '#8B5CF6' },
   { name: 'Orange', hex: '#F97316' },
   { name: 'Teal', hex: '#14B8A6' },
   { name: 'Fuchsia', hex: '#D946EF' },
   { name: 'Sky', hex: '#0EA5E9' },
   { name: 'Lime', hex: '#84CC16' },
   { name: 'Slate', hex: '#64748B' },
];

// ── Color Swatch Component ───────────────────────────────────
function ColorSwatch({ color, onClick, compact }: { color: ThemeColor; onClick?: () => void; compact?: boolean }) {
   const [copied, setCopied] = useState(false);

   const copy = async (e: React.MouseEvent) => {
      e.stopPropagation();
      try {
         await navigator.clipboard.writeText(color.hex);
         setCopied(true);
         setTimeout(() => setCopied(false), 1500);
      } catch {
         /* ignore */
      }
   };

   if (compact) {
      return (
         <Tooltip>
            <TooltipTrigger asChild>
               <button
                  className="group relative rounded-lg overflow-hidden border border-border/30 transition-all hover:scale-105 hover:shadow-lg hover:z-10 cursor-pointer"
                  onClick={onClick || copy}
               >
                  <div className="h-12 w-full" style={{ backgroundColor: color.hex }} />
                  <div className="px-2 py-1.5 bg-background/95 text-center">
                     <div className="text-[9px] font-bold uppercase text-muted-foreground truncate">{color.label}</div>
                     <div className="text-[10px] font-mono text-foreground/70">{color.hex}</div>
                  </div>
               </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[200px]">
               <p className="text-xs">{color.description}</p>
            </TooltipContent>
         </Tooltip>
      );
   }

   return (
      <div className="group relative flex items-center gap-3 p-3 rounded-xl border border-border/30 bg-card/50 hover:bg-card transition-all hover:shadow-sm">
         <button
            className="w-12 h-12 rounded-lg shadow-inner border border-white/10 shrink-0 transition-transform hover:scale-110 cursor-pointer"
            style={{ backgroundColor: color.hex }}
            onClick={copy}
            title="Click to copy hex"
         />
         <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
               <span className="text-xs font-bold text-foreground">{color.label}</span>
               <button onClick={copy} className="text-muted-foreground hover:text-foreground transition-colors">
                  {copied ? (
                     <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                     <Copy className="w-3.5 h-3.5" />
                  )}
               </button>
            </div>
            <div className="text-[10px] font-mono text-muted-foreground mt-0.5">{color.hex}</div>
            <div className="text-[10px] text-muted-foreground/70 mt-0.5 truncate">{color.description}</div>
         </div>
      </div>
   );
}

// ── Sample UI Preview ────────────────────────────────────────
function ThemePreview({ theme }: { theme: GeneratedTheme }) {
   return (
      <div
         className="rounded-2xl overflow-hidden border-2 border-border/20 shadow-xl"
         style={{
            backgroundColor: theme.background.hex,
            color: theme.foreground.hex,
         }}
      >
         {/* Fake top bar */}
         <div
            className="flex items-center px-4 py-3 border-b"
            style={{
               borderColor: theme.border.hex,
               backgroundColor: theme.card.hex,
            }}
         >
            <div className="flex gap-1.5 mr-4">
               <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.destructive.hex }} />
               <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.warning.hex }} />
               <div className="w-3 h-3 rounded-full" style={{ backgroundColor: theme.success.hex }} />
            </div>
            <div className="flex-1 flex items-center justify-center">
               <div
                  className="text-[11px] font-semibold px-3 py-0.5 rounded-md"
                  style={{
                     backgroundColor: theme.muted.hex,
                     color: theme.mutedForeground.hex,
                  }}
               >
                  preview.app
               </div>
            </div>
         </div>

         {/* Content area */}
         <div className="p-5 space-y-4">
            {/* Nav */}
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md" style={{ backgroundColor: theme.primary.hex }} />
                  <span className="text-xs font-bold" style={{ color: theme.foreground.hex }}>
                     MyApp
                  </span>
               </div>
               <div className="flex gap-3">
                  <span className="text-[10px]" style={{ color: theme.mutedForeground.hex }}>
                     Home
                  </span>
                  <span className="text-[10px]" style={{ color: theme.mutedForeground.hex }}>
                     Features
                  </span>
                  <span className="text-[10px] font-bold" style={{ color: theme.primary.hex }}>
                     Pricing
                  </span>
               </div>
            </div>

            {/* Hero */}
            <div className="p-4 rounded-xl text-center" style={{ backgroundColor: theme.muted.hex }}>
               <h3 className="text-sm font-bold mb-1" style={{ color: theme.foreground.hex }}>
                  Welcome to the App
               </h3>
               <p className="text-[10px] mb-3" style={{ color: theme.mutedForeground.hex }}>
                  Build amazing things with this theme
               </p>
               <div className="flex justify-center gap-2">
                  <button
                     className="px-3 py-1 rounded-md text-[10px] font-bold text-white"
                     style={{ backgroundColor: theme.primary.hex }}
                  >
                     Get Started
                  </button>
                  <button
                     className="px-3 py-1 rounded-md text-[10px] font-medium border"
                     style={{
                        borderColor: theme.border.hex,
                        color: theme.foreground.hex,
                     }}
                  >
                     Learn More
                  </button>
               </div>
            </div>

            {/* Cards row */}
            <div className="grid grid-cols-3 gap-2">
               {[
                  { title: 'Active', value: '2,847', color: theme.success.hex },
                  { title: 'Pending', value: '142', color: theme.warning.hex },
                  { title: 'Errors', value: '3', color: theme.destructive.hex },
               ].map((stat) => (
                  <div
                     key={stat.title}
                     className="p-2.5 rounded-lg border"
                     style={{
                        backgroundColor: theme.card.hex,
                        borderColor: theme.border.hex,
                     }}
                  >
                     <div className="text-[9px] font-medium mb-1" style={{ color: theme.mutedForeground.hex }}>
                        {stat.title}
                     </div>
                     <div className="text-sm font-bold" style={{ color: stat.color }}>
                        {stat.value}
                     </div>
                  </div>
               ))}
            </div>

            {/* Alert badges */}
            <div className="flex flex-wrap gap-1.5">
               <span
                  className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white"
                  style={{ backgroundColor: theme.primary.hex }}
               >
                  Primary
               </span>
               <span
                  className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white"
                  style={{ backgroundColor: theme.secondary.hex }}
               >
                  Secondary
               </span>
               <span
                  className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white"
                  style={{ backgroundColor: theme.accent.hex }}
               >
                  Accent
               </span>
               <span
                  className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white"
                  style={{ backgroundColor: theme.info.hex }}
               >
                  Info
               </span>
               <span
                  className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white"
                  style={{ backgroundColor: theme.success.hex }}
               >
                  Success
               </span>
               <span
                  className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white"
                  style={{ backgroundColor: theme.warning.hex }}
               >
                  Warning
               </span>
               <span
                  className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white"
                  style={{ backgroundColor: theme.destructive.hex }}
               >
                  Destructive
               </span>
            </div>

            {/* Form preview */}
            <div
               className="p-3 rounded-lg border"
               style={{
                  backgroundColor: theme.card.hex,
                  borderColor: theme.border.hex,
               }}
            >
               <div className="text-[10px] font-bold mb-2" style={{ color: theme.foreground.hex }}>
                  Quick Settings
               </div>
               <div className="space-y-2">
                  <div
                     className="flex items-center justify-between p-2 rounded"
                     style={{ backgroundColor: theme.muted.hex }}
                  >
                     <span className="text-[10px]" style={{ color: theme.foreground.hex }}>
                        Dark Mode
                     </span>
                     <div className="w-7 h-4 rounded-full relative" style={{ backgroundColor: theme.primary.hex }}>
                        <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full shadow" />
                     </div>
                  </div>
                  <div
                     className="flex items-center justify-between p-2 rounded"
                     style={{ backgroundColor: theme.muted.hex }}
                  >
                     <span className="text-[10px]" style={{ color: theme.foreground.hex }}>
                        Notifications
                     </span>
                     <div className="w-7 h-4 rounded-full relative" style={{ backgroundColor: theme.border.hex }}>
                        <div className="absolute left-0.5 top-0.5 w-3 h-3 bg-white/60 rounded-full shadow" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

// ── Main Component ───────────────────────────────────────────
export function ThemeGeneratorView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [primaryHex, setPrimaryHex] = useState('#6366F1');
   const [mode, setMode] = useState<'dark' | 'light'>('dark');
   const [copiedField, setCopiedField] = useState<string | null>(null);
   const [exportTab, setExportTab] = useState('css');

   // Load state
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;
      if (isPersistenceEnabled) {
         const savedHex = localStorage.getItem(STORAGE_KEYS.THEME_HEX);
         const savedMode = localStorage.getItem(STORAGE_KEYS.THEME_MODE) as 'dark' | 'light';
         if (savedHex !== null) setPrimaryHex(savedHex);
         if (savedMode === 'dark' || savedMode === 'light') setMode(savedMode);
      }
   }, [isPersistenceEnabled]);

   // Save state
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      localStorage.setItem(STORAGE_KEYS.THEME_HEX, primaryHex);
      localStorage.setItem(STORAGE_KEYS.THEME_MODE, mode);
   }, [primaryHex, mode, isPersistenceEnabled]);

   const theme = useMemo(() => generateTheme(primaryHex, mode), [primaryHex, mode]);

   const handleHexInput = useCallback((value: string) => {
      const clean = value.startsWith('#') ? value : '#' + value;
      setPrimaryHex(clean);
   }, []);

   const randomColor = useCallback(() => {
      const hex =
         '#' +
         Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, '0');
      setPrimaryHex(hex);
   }, []);

   const copyToClipboard = useCallback(async (text: string, field: string) => {
      try {
         await navigator.clipboard.writeText(text);
         setCopiedField(field);
         setTimeout(() => setCopiedField(null), 2000);
      } catch {
         /* ignore */
      }
   }, []);

   const exportContent = useMemo(() => {
      switch (exportTab) {
         case 'css':
            return exportAsCSS(theme);
         case 'tailwind':
            return exportAsTailwind(theme);
         case 'json':
            return exportAsJSON(theme);
         default:
            return '';
      }
   }, [theme, exportTab]);

   const semanticTokens = [
      theme.primary,
      theme.secondary,
      theme.accent,
      theme.background,
      theme.foreground,
      theme.muted,
      theme.mutedForeground,
      theme.card,
      theme.cardForeground,
      theme.border,
   ];

   const statusTokens = [theme.destructive, theme.success, theme.warning, theme.info];

   const primaryHsl = hexToHsl(primaryHex);

   return (
      <div className="flex flex-col h-full w-full bg-background border border-border rounded-xl shadow-sm overflow-hidden">
         {/* Toolbar */}
         <div className="flex flex-wrap items-center justify-between gap-2 px-4 md:px-6 py-3 border-b border-border bg-muted/10 shrink-0">
            <div className="flex items-center gap-2">
               <Palette className="w-5 h-5 text-indigo-500" />
               <h1 className="text-sm font-bold tracking-tight">Theme Generator</h1>
            </div>
            <div className="flex items-center gap-2">
               {/* Mode toggle */}
               <div className="flex bg-muted rounded-lg p-0.5 border border-border/50">
                  <button
                     onClick={() => setMode('dark')}
                     className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                        mode === 'dark'
                           ? 'bg-background text-foreground shadow-sm'
                           : 'text-muted-foreground hover:text-foreground'
                     }`}
                  >
                     <Moon className="w-3 h-3" /> Dark
                  </button>
                  <button
                     onClick={() => setMode('light')}
                     className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                        mode === 'light'
                           ? 'bg-background text-foreground shadow-sm'
                           : 'text-muted-foreground hover:text-foreground'
                     }`}
                  >
                     <Sun className="w-3 h-3" /> Light
                  </button>
               </div>

               <div className="h-5 w-px bg-border mx-1" />

               <div
                  className="w-7 h-7 rounded-full border-2 border-white/20 shadow-sm cursor-help transition-transform hover:scale-110"
                  style={{ backgroundColor: primaryHex }}
                  title="Current primary color"
               />

               <Button variant="outline" size="sm" className="h-8 gap-1.5 text-xs font-medium" onClick={randomColor}>
                  <RefreshCw className="w-3 h-3" /> Random
               </Button>
            </div>
         </div>

         {/* Main Content */}
         <div className="flex-1 flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-border overflow-y-auto lg:overflow-hidden">
            {/* Left panel: Controls + Color Tokens */}
            <div className="flex-1 lg:flex-4 overflow-y-auto p-6 space-y-6 bg-background/50">
               {/* Color Picker */}
               <section className="space-y-4">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Primary Color</h2>
                  <div className="flex gap-3 items-center">
                     <input
                        type="color"
                        value={primaryHex.length === 7 ? primaryHex : '#6366F1'}
                        onChange={(e) => handleHexInput(e.target.value)}
                        className="w-16 h-16 rounded-xl border-0 p-0 overflow-hidden cursor-pointer shadow-lg bg-transparent"
                     />
                     <div className="flex-1 space-y-2">
                        <div className="flex gap-2">
                           <Input
                              value={primaryHex.replace('#', '')}
                              onChange={(e) => handleHexInput(e.target.value)}
                              className="font-mono text-sm tracking-wider uppercase h-10"
                              maxLength={6}
                              spellCheck={false}
                              placeholder="6366F1"
                           />
                           <Button
                              variant="ghost"
                              size="icon"
                              className="h-10 w-10 shrink-0"
                              onClick={() => copyToClipboard(primaryHex, 'primary-hex')}
                           >
                              {copiedField === 'primary-hex' ? (
                                 <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                              ) : (
                                 <Copy className="w-4 h-4" />
                              )}
                           </Button>
                        </div>
                        <div className="text-[10px] text-muted-foreground font-mono">
                           HSL({primaryHsl.h}°, {primaryHsl.s}%, {primaryHsl.l}
                           %)
                        </div>
                     </div>
                  </div>

                  {/* Presets */}
                  <div className="flex flex-wrap gap-1.5">
                     {PRESETS.map((p) => (
                        <Tooltip key={p.name}>
                           <TooltipTrigger asChild>
                              <button
                                 onClick={() => setPrimaryHex(p.hex)}
                                 className={`w-7 h-7 rounded-lg border-2 transition-all hover:scale-110 ${
                                    primaryHex.toUpperCase() === p.hex
                                       ? 'border-white shadow-lg scale-110'
                                       : 'border-transparent hover:border-white/30'
                                 }`}
                                 style={{ backgroundColor: p.hex }}
                              />
                           </TooltipTrigger>
                           <TooltipContent side="bottom">
                              <p className="text-xs font-medium">
                                 {p.name} — {p.hex}
                              </p>
                           </TooltipContent>
                        </Tooltip>
                     ))}
                  </div>
               </section>

               {/* Semantic Tokens */}
               <section className="space-y-4">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Semantic Tokens</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                     {semanticTokens.map((t) => (
                        <ColorSwatch key={t.label} color={t} />
                     ))}
                  </div>
               </section>

               {/* Status Colors */}
               <section className="space-y-4">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Status Colors</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                     {statusTokens.map((t) => (
                        <ColorSwatch key={t.label} color={t} compact />
                     ))}
                  </div>
               </section>

               {/* Primary Scale */}
               <section className="space-y-4">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Primary Scale</h2>
                  <div className="flex h-14 rounded-xl overflow-hidden border border-border/20 shadow-sm">
                     {Object.entries(theme.primaryScale).map(([key, hex]) => (
                        <Tooltip key={key}>
                           <TooltipTrigger asChild>
                              <button
                                 className="flex-1 relative group/scale transition-all hover:flex-2 cursor-pointer"
                                 style={{ backgroundColor: hex }}
                                 onClick={() => copyToClipboard(hex, `scale-${key}`)}
                              >
                                 <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 text-[7px] font-bold text-white bg-black/40 px-1 rounded opacity-0 group-hover/scale:opacity-100 transition-opacity whitespace-nowrap">
                                    {key}
                                 </span>
                              </button>
                           </TooltipTrigger>
                           <TooltipContent side="bottom">
                              <p className="text-xs font-mono">
                                 {key}: {hex}
                              </p>
                           </TooltipContent>
                        </Tooltip>
                     ))}
                  </div>
               </section>
            </div>

            {/* Right panel: Preview + Export */}
            <div className="flex-1 lg:flex-5 flex flex-col overflow-hidden bg-muted/10">
               <Tabs defaultValue="preview" className="flex flex-col h-full w-full">
                  <TabsList className="w-full justify-start rounded-none border-b border-border h-auto py-0 bg-background/95 backdrop-blur shrink-0 px-2 space-x-1">
                     <TabsTrigger
                        value="preview"
                        className="py-2.5 data-[state=active]:bg-muted/50 data-[state=active]:shadow-none data-[state=active]:font-semibold rounded-none gap-1.5"
                     >
                        <Eye className="w-3.5 h-3.5" /> Preview
                     </TabsTrigger>
                     <TabsTrigger
                        value="export"
                        className="py-2.5 data-[state=active]:bg-muted/50 data-[state=active]:shadow-none data-[state=active]:font-semibold rounded-none gap-1.5"
                     >
                        <Download className="w-3.5 h-3.5" /> Export
                     </TabsTrigger>
                  </TabsList>

                  {/* Preview Tab */}
                  <TabsContent value="preview" className="flex-1 overflow-y-auto p-6 m-0 border-none outline-none">
                     <div className="max-w-lg mx-auto space-y-6">
                        <div className="text-center space-y-1">
                           <h3 className="text-sm font-bold">Live Preview</h3>
                           <p className="text-xs text-muted-foreground">See how your theme looks on a sample UI</p>
                        </div>
                        <ThemePreview theme={theme} />
                     </div>
                  </TabsContent>

                  {/* Export Tab */}
                  <TabsContent
                     value="export"
                     className="flex-1 flex flex-col overflow-hidden p-0 m-0 border-none outline-none"
                  >
                     {/* Export format tabs */}
                     <div className="flex items-center gap-1 px-4 py-2 border-b border-border/50 bg-background/50 shrink-0">
                        {[
                           { id: 'css', label: 'CSS Variables', icon: Code2 },
                           {
                              id: 'tailwind',
                              label: 'Tailwind Config',
                              icon: Braces,
                           },
                           { id: 'json', label: 'JSON', icon: FileJson },
                        ].map(({ id, label, icon: Icon }) => (
                           <button
                              key={id}
                              onClick={() => setExportTab(id)}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                 exportTab === id
                                    ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                              }`}
                           >
                              <Icon className="w-3 h-3" /> {label}
                           </button>
                        ))}
                        <div className="flex-1" />
                        <Button
                           variant="outline"
                           size="sm"
                           className="h-7 gap-1.5 text-xs"
                           onClick={() => copyToClipboard(exportContent, 'export')}
                        >
                           {copiedField === 'export' ? (
                              <>
                                 <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Copied!
                              </>
                           ) : (
                              <>
                                 <Copy className="w-3 h-3" /> Copy All
                              </>
                           )}
                        </Button>
                     </div>

                     {/* Code output */}
                     <div className="flex-1 overflow-auto p-4">
                        <pre className="text-xs font-mono leading-relaxed text-foreground/80 whitespace-pre bg-card/50 border border-border/30 rounded-xl p-4 overflow-x-auto">
                           {exportContent}
                        </pre>
                     </div>
                  </TabsContent>
               </Tabs>
            </div>
         </div>
      </div>
   );
}
