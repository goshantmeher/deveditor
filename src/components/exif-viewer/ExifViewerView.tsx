'use client';

import React, { useState, useEffect, useCallback } from 'react';
import exifr from 'exifr';
import { Button } from '@/components/ui/button';
import { useDropzone } from 'react-dropzone';
import { RotateCcw, Image as ImageIcon, Download, Upload, ShieldCheck } from 'lucide-react';

interface ExifData {
   [key: string]: unknown;
}

function formatValue(val: unknown): string {
   if (val == null) return '—';
   if (typeof val === 'object') return JSON.stringify(val);
   return String(val);
}

function ExifTable({ data }: { data: ExifData }) {
   const entries = Object.entries(data).filter(([, v]) => v != null && v !== '');
   if (entries.length === 0) return <p className="text-sm text-muted-foreground">No metadata found.</p>;

   return (
      <table className="w-full text-left text-sm">
         <thead>
            <tr className="border-b border-border">
               <th className="pb-2 font-medium text-muted-foreground">Key</th>
               <th className="pb-2 font-medium text-muted-foreground">Value</th>
            </tr>
         </thead>
         <tbody>
            {entries.map(([key, value]) => (
               <tr key={key} className="border-b border-border/50">
                  <td className="py-2 font-mono text-[11px] text-foreground">{key}</td>
                  <td className="py-2 font-mono text-[11px] text-muted-foreground break-all">{formatValue(value)}</td>
               </tr>
            ))}
         </tbody>
      </table>
   );
}

const ACCEPT = {
   'image/jpeg': ['.jpg', '.jpeg'],
   'image/png': ['.png'],
   'image/webp': ['.webp'],
   'image/heic': ['.heic'],
};

export function ExifViewerView() {
   const [file, setFile] = useState<File | null>(null);
   const [fileUrl, setFileUrl] = useState<string | null>(null);
   const [exifData, setExifData] = useState<ExifData | null>(null);
   const [strippedBlob, setStrippedBlob] = useState<Blob | null>(null);
   const [error, setError] = useState<string | null>(null);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      if (!file) {
         setFileUrl(null);
         return;
      }
      const url = URL.createObjectURL(file);
      setFileUrl(url);
      return () => URL.revokeObjectURL(url);
   }, [file]);

   const stripMetadata = useCallback(() => {
      if (!file) return;
      setError(null);
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.src = url;

      img.onload = () => {
         const canvas = document.createElement('canvas');
         canvas.width = img.naturalWidth;
         canvas.height = img.naturalHeight;
         const ctx = canvas.getContext('2d')!;
         ctx.drawImage(img, 0, 0);
         URL.revokeObjectURL(url);

         canvas.toBlob(
            (blob) => blob && setStrippedBlob(blob),
            file.type.startsWith('image/png') ? 'image/png' : 'image/jpeg',
            0.95
         );
      };
      img.onerror = () => setError('Failed to load image.');
   }, [file]);

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: ACCEPT,
      maxFiles: 1,
      onDrop: async (files) => {
         const f = files[0];
         if (!f?.type.startsWith('image/')) {
            setError('Please drop a JPEG, PNG, WebP, or HEIC image.');
            return;
         }
         setError(null);
         setFile(f);
         setExifData(null);
         setStrippedBlob(null);
         setLoading(true);
         try {
            const data = await exifr.parse(f, { translateKeys: true, translateValues: true, reviveValues: true });
            setExifData(data ?? {});
         } catch {
            setExifData({});
         } finally {
            setLoading(false);
         }
      },
   });

   const handleClear = () => {
      setFile(null);
      setExifData(null);
      setStrippedBlob(null);
      setError(null);
   };

   const downloadStripped = () => {
      if (!strippedBlob) return;
      const ext = file?.name.split('.').pop() || 'jpg';
      const a = document.createElement('a');
      a.href = URL.createObjectURL(strippedBlob);
      a.download = 'stripped.' + ext;
      a.click();
      URL.revokeObjectURL(a.href);
   };

   const entryCount = exifData ? Object.entries(exifData).filter(([, v]) => v != null && v !== '').length : 0;

   return (
      <div className="w-full h-full flex flex-col md:flex-row gap-6 max-w-6xl mx-auto p-4 md:p-8">
         {/* Left Controls */}
         <div className="w-full md:w-[350px] shrink-0 flex flex-col gap-6">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                     <ShieldCheck className="w-5 h-5 text-indigo-500" />
                  </div>
                  <div>
                     <h1 className="font-bold tracking-tight text-foreground">EXIF Viewer & Remover</h1>
                     <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Privacy tool</p>
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
               <label className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Upload Image
               </label>
               {file && fileUrl ? (
                  <div className="space-y-3">
                     <img
                        src={fileUrl}
                        alt="Preview"
                        draggable={false}
                        className="w-full max-h-48 object-contain rounded-lg border border-border"
                     />
                     <p className="text-[11px] font-mono text-muted-foreground truncate">{file.name}</p>
                     <div className="flex flex-wrap gap-2">
                        <Button size="sm" onClick={stripMetadata} className="h-8">
                           Strip metadata
                        </Button>
                        {strippedBlob && (
                           <Button variant="outline" size="sm" onClick={downloadStripped} className="h-8">
                              <Download className="w-3.5 h-3.5 mr-2" /> Download stripped
                           </Button>
                        )}
                     </div>
                  </div>
               ) : (
                  <div
                     {...getRootProps()}
                     className={`flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-300 ${isDragActive ? 'border-indigo-500 bg-indigo-500/5' : 'border-border bg-muted/30 hover:border-indigo-500/50 hover:bg-muted/50'}`}
                  >
                     <input {...getInputProps()} />
                     <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                     <span className="text-xs text-muted-foreground">Drop JPEG, PNG, WebP, or HEIC</span>
                  </div>
               )}
               {error && <p className="text-xs text-destructive">{error}</p>}
            </div>
         </div>

         {/* Right Workspace */}
         <div className="flex-1 flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden min-h-[500px]">
            {file ? (
               <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="px-4 py-3 border-b border-border bg-muted/40 flex items-center justify-between shrink-0">
                     <div className="text-sm font-semibold text-foreground flex items-center gap-2">
                        Metadata
                        {exifData && (
                           <span className="text-xs bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded-full font-mono">
                              {entryCount} field{entryCount !== 1 ? 's' : ''}
                           </span>
                        )}
                     </div>
                     {strippedBlob && (
                        <Button onClick={downloadStripped} size="sm" className="h-8">
                           <Download className="w-3.5 h-3.5 mr-2" /> Download stripped
                        </Button>
                     )}
                  </div>

                  <div className="flex-1 overflow-auto p-4 md:p-6">
                     {loading ? (
                        <p className="text-sm text-muted-foreground">Reading metadata…</p>
                     ) : exifData ? (
                        <ExifTable data={exifData} />
                     ) : null}
                  </div>
               </div>
            ) : (
               <div
                  {...getRootProps()}
                  className={`flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed m-4 rounded-xl transition-colors cursor-pointer ${isDragActive ? 'border-indigo-500 bg-indigo-500/5' : 'border-border hover:border-indigo-500/50 hover:bg-muted/30'}`}
               >
                  <input {...getInputProps()} />
                  <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-4">
                     <ImageIcon className="w-8 h-8 text-indigo-500" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Upload a Photo</h3>
                  <p className="text-sm text-muted-foreground text-center">
                     Drag & drop here, or click to browse files
                     <br />
                     (JPEG, PNG, WebP, HEIC)
                  </p>
               </div>
            )}
         </div>
      </div>
   );
}
