'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useDropzone } from 'react-dropzone';
import { usePersistence } from '@/contexts/PersistenceContext';
import { STORAGE_KEYS } from '@/constants/storage';
import { RotateCcw, Image as ImageIcon, Download, Upload, Settings2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

type OutputFormat = 'image/jpeg' | 'image/png' | 'image/webp';

const SUPPORTED = { 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'], 'image/webp': ['.webp'] };

export function ImageCompressorView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [originalFile, setOriginalFile] = useState<File | null>(null);
   const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
   const [quality, setQuality] = useState(80);
   const [format, setFormat] = useState<OutputFormat>('image/webp');
   const [error, setError] = useState<string | null>(null);

   const [originalUrl, setOriginalUrl] = useState<string | null>(null);
   const [compressedUrl, setCompressedUrl] = useState<string | null>(null);

   const compress = useCallback(async (file: File, qual: number, fmt: OutputFormat) => {
      setError(null);
      try {
         const img = new Image();
         const url = URL.createObjectURL(file);
         img.src = url;

         await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () => reject(new Error('Failed to load image'));
         });

         const canvas = document.createElement('canvas');
         canvas.width = img.naturalWidth;
         canvas.height = img.naturalHeight;
         const ctx = canvas.getContext('2d')!;
         if (fmt === 'image/jpeg') {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
         }
         ctx.drawImage(img, 0, 0);
         URL.revokeObjectURL(url);

         const q = fmt !== 'image/png' ? qual / 100 : undefined;
         canvas.toBlob((blob) => blob && setCompressedBlob(blob), fmt, q);
      } catch {
         setError('Failed to compress image. Please try a different file.');
      }
   }, []);

   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;
      if (isPersistenceEnabled) {
         try {
            const stored = localStorage.getItem(STORAGE_KEYS.IMAGE_COMPRESSOR);
            if (stored) {
               const parsed = JSON.parse(stored);
               if (parsed.format) setFormat(parsed.format);
               if (parsed.quality != null) setQuality(parsed.quality);
            }
         } catch (e) {
            console.error('Persistence load failed:', e);
         }
      }
   }, [isPersistenceEnabled]);

   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      localStorage.setItem(STORAGE_KEYS.IMAGE_COMPRESSOR, JSON.stringify({ format, quality }));
   }, [format, quality, isPersistenceEnabled]);

   useEffect(() => {
      if (originalFile) compress(originalFile, quality, format);
   }, [originalFile, quality, format, compress]);

   useEffect(() => {
      if (!originalFile) {
         setOriginalUrl(null);
         return;
      }
      const url = URL.createObjectURL(originalFile);
      setOriginalUrl(url);
      return () => URL.revokeObjectURL(url);
   }, [originalFile]);

   useEffect(() => {
      if (!compressedBlob) {
         setCompressedUrl(null);
         return;
      }
      const url = URL.createObjectURL(compressedBlob);
      setCompressedUrl(url);
      return () => URL.revokeObjectURL(url);
   }, [compressedBlob]);

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: SUPPORTED,
      maxFiles: 1,
      onDrop: (files) => {
         const file = files[0];
         if (!file?.type.startsWith('image/')) {
            setError('Please drop a JPEG, PNG, or WebP image.');
            return;
         }
         setOriginalFile(file);
         setCompressedBlob(null);
      },
   });

   const handleClear = () => {
      setOriginalFile(null);
      setCompressedBlob(null);
      setError(null);
   };

   const downloadCompressed = () => {
      if (!compressedBlob) return;
      const ext = format === 'image/jpeg' ? 'jpg' : format === 'image/webp' ? 'webp' : 'png';
      const a = document.createElement('a');
      a.href = URL.createObjectURL(compressedBlob);
      a.download = 'compressed.' + ext;
      a.click();
      URL.revokeObjectURL(a.href);
   };

   const origSize = originalFile?.size ?? 0;
   const compSize = compressedBlob?.size ?? 0;
   const savings = origSize ? Math.round(((origSize - compSize) / origSize) * 100) : 0;

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
                     <h1 className="font-bold tracking-tight text-foreground">Image Compressor</h1>
                     <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Quality & format</p>
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
                  <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                     Output Format
                  </label>
                  <Select value={format} onValueChange={(v) => setFormat(v as OutputFormat)}>
                     <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="image/webp">WebP (Recommended)</SelectItem>
                        <SelectItem value="image/jpeg">JPEG</SelectItem>
                        <SelectItem value="image/png">PNG</SelectItem>
                     </SelectContent>
                  </Select>
               </div>

               {(format === 'image/jpeg' || format === 'image/webp') && (
                  <div className="space-y-3 pt-2">
                     <div className="flex justify-between items-center">
                        <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                           Quality
                        </label>
                        <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded">{quality}%</span>
                     </div>
                     <Slider value={[quality]} onValueChange={(v) => setQuality(v[0])} min={1} max={100} step={1} />
                  </div>
               )}

               {error && <p className="text-xs text-destructive pt-2">{error}</p>}
            </div>
         </div>

         {/* Right Workspace */}
         <div className="flex-1 flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden min-h-[500px]">
            {!originalFile ? (
               <div
                  {...getRootProps()}
                  className={`flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed m-4 rounded-xl transition-colors cursor-pointer ${isDragActive ? 'border-indigo-500 bg-indigo-500/5' : 'border-border hover:border-indigo-500/50 hover:bg-muted/30'}`}
               >
                  <input {...getInputProps()} />
                  <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-4">
                     <Upload className="w-8 h-8 text-indigo-500" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Upload an Image</h3>
                  <p className="text-sm text-muted-foreground text-center">
                     Drag & drop here, or click to browse files
                     <br />
                     (JPEG, PNG, WebP)
                  </p>
               </div>
            ) : (
               <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="px-4 py-3 border-b border-border bg-muted/40 flex items-center justify-between shrink-0">
                     <div className="text-sm font-semibold text-foreground flex items-center gap-2">
                        Comparison
                        {compressedBlob && savings > 0 && (
                           <span className="text-xs bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full font-mono">
                              −{savings}%
                           </span>
                        )}
                     </div>
                     {compressedBlob && (
                        <Button onClick={downloadCompressed} size="sm" className="h-8">
                           <Download className="w-3.5 h-3.5 mr-2" /> Download
                        </Button>
                     )}
                  </div>

                  <div className="flex-1 overflow-auto p-4 md:p-6">
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="rounded-xl border border-border p-4 bg-background">
                           <h3 className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-3">
                              Original
                           </h3>
                           {originalUrl && (
                              <img
                                 src={originalUrl}
                                 alt="Original"
                                 draggable={false}
                                 className="w-full object-contain rounded max-h-[40vh]"
                              />
                           )}
                           <p className="mt-3 font-mono text-[11px] text-muted-foreground">
                              {(origSize / 1024).toFixed(1)} KB
                           </p>
                        </div>
                        <div className="rounded-xl border border-border p-4 bg-background">
                           <h3 className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground mb-3">
                              Compressed
                           </h3>
                           {compressedBlob && compressedUrl ? (
                              <>
                                 <img
                                    src={compressedUrl}
                                    alt="Compressed"
                                    draggable={false}
                                    className="w-full object-contain rounded max-h-[40vh]"
                                 />
                                 <p className="mt-3 font-mono text-[11px] text-muted-foreground">
                                    {(compSize / 1024).toFixed(1)} KB
                                    {savings > 0 && (
                                       <span className="ml-2 text-emerald-500 font-semibold">−{savings}%</span>
                                    )}
                                 </p>
                              </>
                           ) : (
                              <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
                                 Processing…
                              </div>
                           )}
                        </div>
                     </div>

                     {originalFile && (
                        <p className="text-center text-xs font-mono text-muted-foreground mt-4">
                           {originalFile.name} · {format.split('/')[1].toUpperCase()} @ {quality}%
                        </p>
                     )}
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}
