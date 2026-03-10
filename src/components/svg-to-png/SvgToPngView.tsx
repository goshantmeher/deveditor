'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useDropzone } from 'react-dropzone';
import { usePersistence } from '@/contexts/PersistenceContext';
import { STORAGE_KEYS } from '@/constants/storage';
import { RotateCcw, Image as ImageIcon, Download, Upload, Settings2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type OutputFormat = 'image/png' | 'image/jpeg';

export function SvgToPngView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [svgContent, setSvgContent] = useState('');
   const [outputBlob, setOutputBlob] = useState<Blob | null>(null);
   const [outputUrl, setOutputUrl] = useState<string | null>(null);
   const [format, setFormat] = useState<OutputFormat>('image/png');
   const [resolution, setResolution] = useState(1024);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;
      if (isPersistenceEnabled) {
         try {
            const stored = localStorage.getItem(STORAGE_KEYS.SVG_TO_PNG);
            if (stored) {
               const parsed = JSON.parse(stored);
               if (parsed.format) setFormat(parsed.format);
               if (parsed.resolution != null) setResolution(parsed.resolution);
               if (parsed.svgContent) setSvgContent(parsed.svgContent);
            }
         } catch (e) {
            console.error('Persistence load failed:', e);
         }
      }
   }, [isPersistenceEnabled]);

   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      localStorage.setItem(
         STORAGE_KEYS.SVG_TO_PNG,
         JSON.stringify({ format, resolution, svgContent })
      );
   }, [format, resolution, svgContent, isPersistenceEnabled]);

   useEffect(() => {
      if (!outputBlob) {
         setOutputUrl(null);
         return;
      }
      const url = URL.createObjectURL(outputBlob);
      setOutputUrl(url);
      return () => URL.revokeObjectURL(url);
   }, [outputBlob]);

   const convert = useCallback(async () => {
      if (!svgContent.trim()) return;
      setError(null);
      setOutputBlob(null);

      try {
         const img = new Image();
         const blob = new Blob([svgContent], { type: 'image/svg+xml' });
         const url = URL.createObjectURL(blob);
         img.src = url;

         await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () => reject(new Error('Invalid SVG'));
         });

         const scale = resolution / Math.max(img.naturalWidth, img.naturalHeight, 1);
         const w = Math.round(img.naturalWidth * scale);
         const h = Math.round(img.naturalHeight * scale);

         const canvas = document.createElement('canvas');
         canvas.width = w;
         canvas.height = h;
         const ctx = canvas.getContext('2d')!;
         if (format === 'image/jpeg') {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, w, h);
         }
         ctx.drawImage(img, 0, 0, w, h);
         URL.revokeObjectURL(url);

         canvas.toBlob(
            (b) => b && setOutputBlob(b),
            format,
            format === 'image/jpeg' ? 0.92 : undefined
         );
      } catch {
         setError('Failed to render SVG. Check that your SVG markup is valid.');
      }
   }, [svgContent, format, resolution]);

   const { getRootProps, getInputProps } = useDropzone({
      accept: { 'image/svg+xml': ['.svg'] },
      maxFiles: 1,
      onDrop: (files) => {
         const file = files[0];
         if (!file?.name.toLowerCase().endsWith('.svg')) {
            setError('Please drop an SVG file.');
            return;
         }
         setError(null);
         setOutputBlob(null);
         const reader = new FileReader();
         reader.onload = () => setSvgContent(reader.result as string);
         reader.readAsText(file);
      },
   });

   const handleClear = () => {
      setSvgContent('');
      setOutputBlob(null);
      setError(null);
   };

   const download = () => {
      if (!outputBlob) return;
      const ext = format === 'image/jpeg' ? 'jpg' : 'png';
      const a = document.createElement('a');
      a.href = URL.createObjectURL(outputBlob);
      a.download = 'export.' + ext;
      a.click();
      URL.revokeObjectURL(a.href);
   };

   return (
      <div className="w-full h-full flex flex-col md:flex-row gap-6 max-w-6xl mx-auto p-4 md:p-8">
         {/* Left Controls */}
         <div className="w-full md:w-[350px] shrink-0 flex flex-col gap-6">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                     <ImageIcon className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div>
                     <h1 className="font-bold tracking-tight text-foreground">SVG → PNG/JPEG</h1>
                     <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Raster export</p>
                  </div>
               </div>
               <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClear}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
               >
                  <RotateCcw className="w-3.5 h-3.5 mr-2" /> Reset
               </Button>
            </div>

            <div className="space-y-4 bg-card rounded-xl border border-border p-5 shadow-sm">
               <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-4">
                  <Settings2 className="w-4 h-4 text-indigo-500" />
                  Export Settings
               </div>

               <div className="space-y-1.5">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Output Format</label>
                  <Select value={format} onValueChange={(v) => { setFormat(v as OutputFormat); setOutputBlob(null); }}>
                     <SelectTrigger>
                        <SelectValue />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="image/png">PNG</SelectItem>
                        <SelectItem value="image/jpeg">JPEG</SelectItem>
                     </SelectContent>
                  </Select>
               </div>

               <div className="space-y-1.5">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Max Dimension (px)</label>
                  <Input
                     type="number"
                     min={64}
                     max={4096}
                     value={resolution}
                     onChange={(e) => { setResolution(Number(e.target.value)); setOutputBlob(null); }}
                     className="font-mono"
                  />
               </div>

               <div className="space-y-3 pt-4 border-t border-border/50">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Upload SVG File</label>
                  <div
                     {...getRootProps()}
                     className="flex min-h-[80px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 transition-all duration-300 hover:border-indigo-500/50 hover:bg-muted/50"
                  >
                     <input {...getInputProps()} />
                     <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                     <span className="text-xs text-muted-foreground">Drop .svg or click to browse</span>
                  </div>
                  {error && <p className="text-xs text-destructive">{error}</p>}
               </div>
            </div>
         </div>

         {/* Right Workspace */}
         <div className="flex-1 flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden min-h-[500px]">
            {svgContent.trim() ? (
               <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="px-4 py-3 border-b border-border bg-muted/40 flex items-center justify-between shrink-0">
                     <div className="text-sm font-semibold text-foreground flex items-center gap-2">
                        Workspace
                        {outputBlob && (
                           <span className="text-xs bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full font-mono">Ready</span>
                        )}
                     </div>
                     <div className="flex items-center gap-2">
                        <Button onClick={() => convert()} size="sm" disabled={!svgContent.trim()} className="h-8">
                           Convert
                        </Button>
                        {outputBlob && (
                           <Button variant="outline" onClick={download} size="sm" className="h-8">
                              <Download className="w-3.5 h-3.5 mr-2" /> Download
                           </Button>
                        )}
                     </div>
                  </div>

                  <div className="flex-1 overflow-auto p-4 md:p-6 flex flex-col gap-4">
                     <div className="space-y-2">
                        <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">SVG Code</label>
                        <Textarea
                           value={svgContent}
                           onChange={(e) => { setSvgContent(e.target.value); setOutputBlob(null); }}
                           placeholder="Paste SVG code or upload a file"
                           className="min-h-[180px] font-mono text-sm"
                        />
                     </div>

                     {outputUrl && outputBlob && (
                        <div className="rounded-xl border border-border p-4 bg-background">
                           <h3 className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-3">Preview</h3>
                           <img
                              src={outputUrl}
                              alt="Exported raster"
                              draggable={false}
                              className="max-h-[40vh] w-full object-contain rounded"
                           />
                           <p className="mt-3 font-mono text-[11px] text-muted-foreground">
                              {(outputBlob.size / 1024).toFixed(1)} KB · {format.split('/')[1].toUpperCase()}
                           </p>
                        </div>
                     )}
                  </div>
               </div>
            ) : (
               <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-4">
                     <ImageIcon className="w-8 h-8 text-indigo-500" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Paste or Upload SVG</h3>
                  <p className="text-sm text-muted-foreground">Upload an .svg file from the left panel or paste code to begin</p>
               </div>
            )}
         </div>
      </div>
   );
}
