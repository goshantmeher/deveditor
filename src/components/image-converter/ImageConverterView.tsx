'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useDropzone } from 'react-dropzone';
import { usePersistence } from '@/contexts/PersistenceContext';
import { STORAGE_KEYS } from '@/constants/storage';
import { RotateCcw, Image as ImageIcon, Download, Crop as CropIcon, Upload, Loader2, Settings2 } from 'lucide-react';
import ReactCrop, { Crop, PercentCrop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import imageCompression from 'browser-image-compression';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

type OutputFormat = 'image/jpeg' | 'image/png' | 'image/webp';

export function ImageConverterView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [originalFile, setOriginalFile] = useState<File | null>(null);
   const [originalPreview, setOriginalPreview] = useState<string | null>(null);
   const [croppedPreview, setCroppedPreview] = useState<string | null>(null);

   const [crop, setCrop] = useState<Crop>({ unit: '%', width: 100, height: 100, x: 0, y: 0 });
   const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);

   const [format, setFormat] = useState<OutputFormat>('image/webp');
   const [quality, setQuality] = useState<number>(90);

   // Resizing State
   const [targetWidth, setTargetWidth] = useState<number | ''>('');
   const [targetHeight, setTargetHeight] = useState<number | ''>('');

   // Cropping Aspect Ratio State
   const [maintainCropRatio, setMaintainCropRatio] = useState(true);
   const [cropRatioPreset, setCropRatioPreset] = useState<string>('free'); // 'free', '1:1', '16:9', '4:3'

   const [isProcessing, setIsProcessing] = useState(false);
   const [processedBlob, setProcessedBlob] = useState<Blob | null>(null);

   const imgRef = useRef<HTMLImageElement>(null);

   // Load preferences from localStorage (just the settings, not the image)
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         try {
            const stored = localStorage.getItem(STORAGE_KEYS.IMAGE_CONVERTER_INPUT);
            if (stored) {
               const parsed = JSON.parse(stored);
               if (parsed.format) setFormat(parsed.format);
               if (parsed.quality) setQuality(parsed.quality);
               if (parsed.maintainCropRatio !== undefined) setMaintainCropRatio(parsed.maintainCropRatio);
               if (parsed.cropRatioPreset) handleRatioPresetChange(parsed.cropRatioPreset, true);
            }
         } catch (e) {
            console.error('Persistence load failed:', e);
         }
      }
   }, [isPersistenceEnabled]);

   // Save preferences
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      localStorage.setItem(
         STORAGE_KEYS.IMAGE_CONVERTER_INPUT,
         JSON.stringify({
            format,
            quality,
            maintainCropRatio,
            cropRatioPreset,
         })
      );
   }, [format, quality, maintainCropRatio, cropRatioPreset, isPersistenceEnabled]);

   const handleRatioPresetChange = (value: string, initLoad = false) => {
      if (!value) return; // Prevent unselecting the toggle group
      setCropRatioPreset(value);

      let newAspect: number | undefined = undefined;

      if (value === '1:1') newAspect = 1;
      else if (value === '16:9') newAspect = 16 / 9;
      else if (value === '4:3') newAspect = 4 / 3;
      else if (value === '21:9') newAspect = 21 / 9;

      if (newAspect) {
         setMaintainCropRatio(true);
         // If we have an image loaded, reset the crop to the new aspect ratio
         if (!initLoad && imgRef.current) {
            // calculate a standard starting crop box that matches the AR without going out of bounds
            const imageWidth = imgRef.current.width;
            const imageHeight = imgRef.current.height;

            // Base logic: try to fill 80% of the container width
            let targetW = 80;
            let targetH = targetW / newAspect;

            // If this height exceeds 80% of the image container height, scale down via height instead
            const containerRatio = imageWidth / imageHeight;

            if (containerRatio < newAspect) {
               // Image is taller/narrower than the crop ratio (e.g., Portrait image, 16:9 crop)
               targetW = 80;
               targetH = targetW / newAspect;
               // Since we're dealing with % units relative to bounding box,
               // we have to adjust for the actual pixel ratio to ensure % units don't stretch wrong
               // Actually, react-image-crop % units are relative to the image size natively.

               // If the box height percentage goes over 100%, we strictly bound it
               if (targetH > 90) {
                  targetH = 90;
                  targetW = targetH * newAspect * (imageHeight / imageWidth); // pixel-accurate math for percentage scaling
               }
            } else {
               // Image is wider than the crop ratio (e.g., Landscape image, 9:16 crop)
               targetH = 80;
               targetW = targetH * newAspect * (imageHeight / imageWidth);

               if (targetW > 90) {
                  targetW = 90;
                  targetH = targetW / newAspect / (imageHeight / imageWidth);
               }
            }

            const resultingPercentWidth = targetW;
            const resultingPercentHeight = targetH;
            setCrop({
               unit: '%',
               width: resultingPercentWidth,
               height: resultingPercentHeight,
               x: (100 - resultingPercentWidth) / 2,
               y: (100 - resultingPercentHeight) / 2,
            });

            // Update explicit resizing math immediately without waiting for 'drag complete'
            setTargetWidth(Math.round((resultingPercentWidth / 100) * imgRef.current.naturalWidth));
            setTargetHeight(Math.round((resultingPercentHeight / 100) * imgRef.current.naturalHeight));
         }
      } else {
         setMaintainCropRatio(false);
         if (!initLoad) {
            setCrop({ unit: '%', width: 100, height: 100, x: 0, y: 0 });
            if (imgRef.current) {
               setTargetWidth(imgRef.current.naturalWidth);
               setTargetHeight(imgRef.current.naturalHeight);
            }
         }
      }
   };

   const onDrop = useCallback((acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setOriginalFile(file);
      const reader = new FileReader();
      reader.onload = () => {
         setOriginalPreview(reader.result as string);
         setCroppedPreview(null);
         setProcessedBlob(null);
         setTargetWidth('');
         setTargetHeight('');
         setCrop({ unit: '%', width: 100, height: 100, x: 0, y: 0 });
         setCompletedCrop(null);
      };
      reader.readAsDataURL(file);
   }, []);

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      maxFiles: 1,
      accept: {
         'image/png': ['.png'],
         'image/jpeg': ['.jpg', '.jpeg'],
         'image/webp': ['.webp'],
      },
   });

   const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { naturalWidth, naturalHeight } = e.currentTarget;
      setTargetWidth(naturalWidth);
      setTargetHeight(naturalHeight);

      // If we already have a locked crop preset when the image first loads, apply it to the initial crop
      if (maintainCropRatio && cropRatioPreset !== 'free') {
         // trigger handleRatioPresetChange to recalculate bounds correctly for the newly loaded image
         handleRatioPresetChange(cropRatioPreset, false);
      } else {
         // Default bounds for free
         setCrop({ unit: '%', width: 100, height: 100, x: 0, y: 0 });
         setTargetWidth(naturalWidth);
         setTargetHeight(naturalHeight);
      }
   };

   const handleCropComplete = (crop: PixelCrop, percentCrop: PercentCrop) => {
      setCompletedCrop(crop);
      if (imgRef.current && percentCrop.width !== undefined && percentCrop.height !== undefined) {
         setTargetWidth(Math.round((percentCrop.width / 100) * imgRef.current.naturalWidth));
         setTargetHeight(Math.round((percentCrop.height / 100) * imgRef.current.naturalHeight));
      }
   };

   const cropImage = async (): Promise<Blob | null> => {
      if (!completedCrop || !imgRef.current) return null;

      const image = imgRef.current;
      const canvas = document.createElement('canvas');
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      canvas.width = completedCrop.width * scaleX;
      canvas.height = completedCrop.height * scaleY;
      const ctx = canvas.getContext('2d');

      if (!ctx) return null;

      ctx.drawImage(
         image,
         completedCrop.x * scaleX,
         completedCrop.y * scaleY,
         completedCrop.width * scaleX,
         completedCrop.height * scaleY,
         0,
         0,
         canvas.width,
         canvas.height
      );

      return new Promise((resolve) => {
         canvas.toBlob(
            (blob) => {
               resolve(blob);
            },
            format,
            quality / 100
         );
      });
   };

   const processImage = async () => {
      if (!originalFile || !originalPreview) return;

      setIsProcessing(true);
      try {
         // 1. Crop
         let workingBlob = await cropImage();
         if (!workingBlob) {
            // If no crop selection, just use original
            workingBlob = originalFile;
         }

         // 2. Resize and Compress based on settings
         const parsedWidth = typeof targetWidth === 'number' ? targetWidth : undefined;
         const parsedHeight = typeof targetHeight === 'number' ? targetHeight : undefined;

         // Determine max dimension for compression
         const maxWidthOrHeight = Math.max(parsedWidth || 1920, parsedHeight || 1080);

         const options = {
            maxSizeMB: 5, // Keep quality purely reliant on the browser's encoder natively
            maxWidthOrHeight: maxWidthOrHeight,
            useWebWorker: true,
            fileType: format,
            initialQuality: quality / 100,
         };

         const compressedFile = await imageCompression(
            new File([workingBlob], 'temp', { type: workingBlob.type }),
            options
         );

         // If exact resizing is needed outside of what compression handled
         if (parsedWidth && parsedHeight) {
            const resizedBlob = await exactResize(compressedFile, parsedWidth, parsedHeight);
            setProcessedBlob(resizedBlob);
            setCroppedPreview(URL.createObjectURL(resizedBlob));
         } else {
            setProcessedBlob(compressedFile);
            setCroppedPreview(URL.createObjectURL(compressedFile));
         }
      } catch (err) {
         console.error('Processing failed:', err);
      } finally {
         setIsProcessing(false);
      }
   };

   const exactResize = (file: File, width: number, height: number): Promise<Blob> => {
      return new Promise((resolve, reject) => {
         const reader = new FileReader();
         reader.onload = (e) => {
            const img = new window.Image();
            img.onload = () => {
               const canvas = document.createElement('canvas');
               const ctx = canvas.getContext('2d');
               if (!ctx) return reject('No context');

               canvas.width = width;
               canvas.height = height;

               // Fill background for PNG -> JPEG conversion transparency removal
               if (format === 'image/jpeg') {
                  ctx.fillStyle = '#FFFFFF';
                  ctx.fillRect(0, 0, width, height);
               }

               ctx.drawImage(img, 0, 0, width, height);
               canvas.toBlob((blob) => resolve(blob!), format, quality / 100);
            };
            img.onerror = reject;
            img.src = e.target?.result as string;
         };
         reader.onerror = reject;
         reader.readAsDataURL(file);
      });
   };

   const handleWidthChange = (val: string) => {
      const w = parseInt(val);
      if (isNaN(w)) {
         setTargetWidth('');
         return;
      }
      setTargetWidth(w);
   };

   const handleHeightChange = (val: string) => {
      const h = parseInt(val);
      if (isNaN(h)) {
         setTargetHeight('');
         return;
      }
      setTargetHeight(h);
   };

   const downloadResult = () => {
      if (!processedBlob) return;

      const ext = format.split('/')[1] === 'jpeg' ? 'jpg' : format.split('/')[1];
      const filename = `converted_${Date.now()}.${ext}`;

      const url = URL.createObjectURL(processedBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
   };

   const handleClear = () => {
      setOriginalFile(null);
      setOriginalPreview(null);
      setCroppedPreview(null);
      setProcessedBlob(null);
      setTargetWidth('');
      setTargetHeight('');
      setCompletedCrop(null);
   };

   return (
      <div className="w-full h-full flex flex-col md:flex-row gap-6 max-w-6xl mx-auto p-4 md:p-8">
         {/* Left Controls/Input */}
         <div className="w-full md:w-[350px] shrink-0 flex flex-col gap-6">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                     <ImageIcon className="w-5 h-5 text-orange-500" />
                  </div>
                  <div>
                     <h1 className="font-bold tracking-tight text-foreground">Converter Tools</h1>
                     <p className="text-xs text-muted-foreground">Resize, Crop & Format</p>
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
                  <Settings2 className="w-4 h-4 text-orange-500" />
                  Export Settings
               </div>

               <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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
                        <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                           Quality
                        </label>
                        <span className="text-xs font-mono bg-muted px-2 py-0.5 rounded">{quality}%</span>
                     </div>
                     <Slider value={[quality]} onValueChange={(v) => setQuality(v[0])} min={10} max={100} step={1} />
                  </div>
               )}

               <div className="space-y-3 pt-4 border-t border-border/50">
                  <div className="flex items-center justify-between">
                     <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Explicit Resizing
                     </label>
                     <Select
                        value=""
                        onValueChange={(val) => {
                           const scale = parseFloat(val);
                           if (typeof targetWidth === 'number') setTargetWidth(Math.round(targetWidth * scale));
                           if (typeof targetHeight === 'number') setTargetHeight(Math.round(targetHeight * scale));
                        }}
                     >
                        <SelectTrigger className="w-[85px] h-7 text-[10px] bg-muted/30">
                           <SelectValue placeholder="Scale" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="0.25">0.25x</SelectItem>
                           <SelectItem value="0.5">0.5x</SelectItem>
                           <SelectItem value="1.5">1.5x</SelectItem>
                           <SelectItem value="2">2x</SelectItem>
                           <SelectItem value="3">3x</SelectItem>
                           <SelectItem value="4">4x</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-snug">
                     Leave blank to use the cropped source dimensions directly.
                  </p>
                  <div className="flex items-center gap-2">
                     <div className="flex-1">
                        <Input
                           type="number"
                           placeholder="Width"
                           value={targetWidth}
                           onChange={(e) => handleWidthChange(e.target.value)}
                           className="font-mono text-xs h-8"
                        />
                     </div>
                     <span className="text-muted-foreground text-xs">&times;</span>
                     <div className="flex-1">
                        <Input
                           type="number"
                           placeholder="Height"
                           value={targetHeight}
                           onChange={(e) => handleHeightChange(e.target.value)}
                           className="font-mono text-xs h-8"
                        />
                     </div>
                  </div>
               </div>

               <Button
                  onClick={processImage}
                  disabled={!originalFile || isProcessing}
                  className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white"
               >
                  {isProcessing ? (
                     <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                     <CropIcon className="w-4 h-4 mr-2" />
                  )}
                  Generate Output
               </Button>
            </div>
         </div>

         {/* Right Workspace */}
         <div className="flex-1 flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden min-h-[500px]">
            {!originalPreview ? (
               <div
                  {...getRootProps()}
                  className={`flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed m-4 rounded-xl transition-colors cursor-pointer ${isDragActive ? 'border-orange-500 bg-orange-500/5' : 'border-border hover:border-orange-500/50 hover:bg-muted/30'}`}
               >
                  <input {...getInputProps()} />
                  <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center mb-4">
                     <Upload className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1">Upload an Image</h3>
                  <p className="text-sm text-muted-foreground text-center">
                     Drag & drop here, or click to browse files
                     <br />
                     (PNG, JPEG, WebP)
                  </p>
               </div>
            ) : (
               <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="px-4 py-3 border-b border-border bg-muted/40 flex items-center justify-between shrink-0">
                     <div className="text-sm font-semibold text-foreground flex items-center gap-2">
                        Workspace
                        {processedBlob && (
                           <span className="text-xs bg-green-500/10 text-green-500 px-2 py-0.5 rounded-full font-mono">
                              Ready
                           </span>
                        )}
                     </div>
                     {processedBlob && (
                        <Button onClick={downloadResult} size="sm" className="h-8">
                           <Download className="w-3.5 h-3.5 mr-2" /> Download
                        </Button>
                     )}
                  </div>

                  <div className="flex-1 overflow-auto bg-[#1e1e1e] dark:bg-[#1e1e1e] p-6 flex flex-col items-center justify-center relative">
                     {isProcessing && (
                        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
                           <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
                        </div>
                     )}

                     {!croppedPreview ? (
                        <div className="w-full flex flex-col items-center justify-center">
                           <div className="mb-4 bg-background/50 border border-border p-1.5 rounded-xl inline-flex gap-2">
                              <ToggleGroup
                                 type="single"
                                 value={cropRatioPreset}
                                 onValueChange={(val) => {
                                    if (val) handleRatioPresetChange(val);
                                 }}
                              >
                                 <ToggleGroupItem value="free" size="sm" className="text-xs font-mono px-3">
                                    Free
                                 </ToggleGroupItem>
                                 <ToggleGroupItem value="1:1" size="sm" className="text-xs font-mono px-3">
                                    1:1
                                 </ToggleGroupItem>
                                 <ToggleGroupItem value="16:9" size="sm" className="text-xs font-mono px-3">
                                    16:9
                                 </ToggleGroupItem>
                                 <ToggleGroupItem value="4:3" size="sm" className="text-xs font-mono px-3">
                                    4:3
                                 </ToggleGroupItem>
                                 <ToggleGroupItem value="21:9" size="sm" className="text-xs font-mono px-3">
                                    21:9
                                 </ToggleGroupItem>
                              </ToggleGroup>
                           </div>
                           <p className="text-xs text-muted-foreground text-center mb-4">
                              Drag handles to crop the active workspace overlay.
                           </p>
                           <ReactCrop
                              crop={crop}
                              onChange={(c) => setCrop(c)}
                              onComplete={handleCropComplete}
                              aspect={
                                 maintainCropRatio
                                    ? cropRatioPreset === '1:1'
                                       ? 1
                                       : cropRatioPreset === '16:9'
                                         ? 16 / 9
                                         : cropRatioPreset === '4:3'
                                           ? 4 / 3
                                           : cropRatioPreset === '21:9'
                                             ? 21 / 9
                                             : undefined
                                    : undefined
                              }
                           >
                              <img
                                 ref={imgRef}
                                 src={originalPreview}
                                 alt="Original Upload"
                                 onLoad={handleImageLoad}
                                 className="max-w-full max-h-[60vh] object-contain shadow-2xl rounded"
                              />
                           </ReactCrop>
                           {originalFile && (
                              <p className="text-center text-xs font-mono text-muted-foreground mt-4">
                                 Original: {(originalFile.size / 1024).toFixed(1)} KB
                              </p>
                           )}
                        </div>
                     ) : (
                        <div className="w-full flex flex-col items-center justify-center">
                           <p className="text-xs text-green-500 text-center mb-4">
                              Processing complete! Preview below.
                           </p>
                           <img
                              src={croppedPreview}
                              alt="Result"
                              className="max-w-full max-h-[60vh] object-contain shadow-2xl rounded border border-border/50"
                           />
                           {processedBlob && (
                              <p className="text-center text-xs font-mono text-muted-foreground mt-4">
                                 Final Size: {(processedBlob.size / 1024).toFixed(1)} KB | {format}
                              </p>
                           )}
                           <Button
                              variant="link"
                              size="sm"
                              onClick={() => setCroppedPreview(null)}
                              className="mt-2 text-xs text-orange-500"
                           >
                              Edit Again
                           </Button>
                        </div>
                     )}
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}
