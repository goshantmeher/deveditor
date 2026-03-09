'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { ResumeData, TemplateId } from '@/types/resume';
import { Loader2 } from 'lucide-react';

interface ResumePreviewProps {
   data: ResumeData;
   templateId: TemplateId;
   generateOnDemand?: boolean; // mobile: only generate when visible
}

export function ResumePreview({ data, templateId, generateOnDemand = false }: ResumePreviewProps) {
   const [pdfUrl, setPdfUrl] = useState<string | null>(null);
   const [isGenerating, setIsGenerating] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const generationId = useRef(0);

   const generatePdf = useCallback(async (resumeData: ResumeData, template: TemplateId) => {
      const currentId = ++generationId.current;
      setIsGenerating(true);
      setError(null);

      try {
         const [{ pdf }, { ClassicTemplate }, { ModernTemplate }, { MinimalTemplate }] = await Promise.all([
            import('@react-pdf/renderer'),
            import('./templates/ClassicTemplate'),
            import('./templates/ModernTemplate'),
            import('./templates/MinimalTemplate'),
         ]);

         // Abort if a newer generation was triggered
         if (currentId !== generationId.current) return;

         let TemplateComponent;
         switch (template) {
            case 'modern':
               TemplateComponent = ModernTemplate;
               break;
            case 'minimal':
               TemplateComponent = MinimalTemplate;
               break;
            default:
               TemplateComponent = ClassicTemplate;
         }

         const blob = await pdf(<TemplateComponent data={resumeData} />).toBlob();

         // Abort if a newer generation was triggered while awaiting
         if (currentId !== generationId.current) return;

         const newUrl = URL.createObjectURL(blob);

         // Swap: set new URL, then revoke old one
         setPdfUrl((oldUrl) => {
            if (oldUrl) {
               // Delay revoke to allow iframe to finish loading new URL
               setTimeout(() => URL.revokeObjectURL(oldUrl), 500);
            }
            return newUrl;
         });
      } catch (err) {
         if (currentId !== generationId.current) return;
         console.error('PDF generation failed:', err);
         setError('Failed to generate preview');
      } finally {
         if (currentId === generationId.current) {
            setIsGenerating(false);
         }
      }
   }, []);

   // Generate PDF when data or template changes
   useEffect(() => {
      if (generateOnDemand) return; // skip auto-generation on mobile

      // Use requestIdleCallback if available to avoid blocking UI
      if ('requestIdleCallback' in window) {
         const idleId = requestIdleCallback(() => generatePdf(data, templateId), { timeout: 2000 });
         return () => cancelIdleCallback(idleId);
      } else {
         generatePdf(data, templateId);
      }
   }, [data, templateId, generateOnDemand, generatePdf]);

   // Keep track of the latest URL so we can reliably clean it up when the component unmounts
   const activeUrlRef = useRef<string | null>(null);
   useEffect(() => {
      activeUrlRef.current = pdfUrl;
   }, [pdfUrl]);

   // Cleanup URLs on unmount
   useEffect(() => {
      return () => {
         const URLToRevoke = activeUrlRef.current;
         if (URLToRevoke) {
            URL.revokeObjectURL(URLToRevoke);
         }
      };
   }, []);

   // On-demand generation (mobile: trigger when this component becomes visible)
   useEffect(() => {
      if (generateOnDemand) {
         generatePdf(data, templateId);
      }
   }, [generateOnDemand, data, templateId, generatePdf]);

   if (error) {
      return (
         <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center space-y-2">
               <p className="text-sm text-destructive">Preview error</p>
               <p className="text-xs">{error}</p>
               <button
                  onClick={() => generatePdf(data, templateId)}
                  className="text-xs text-indigo-500 hover:underline"
               >
                  Try again
               </button>
            </div>
         </div>
      );
   }

   return (
      <div className="h-full w-full bg-muted/20 relative">
         {/* PDF iframe — old PDF stays visible until new one loads */}
         {pdfUrl ? (
            <iframe src={pdfUrl} className="w-full h-full border-0" title="Resume Preview" />
         ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
               <Loader2 className="w-6 h-6 animate-spin mr-2" />
               <span className="text-sm">Generating preview...</span>
            </div>
         )}

         {/* Subtle loading indicator in corner while regenerating */}
         {isGenerating && pdfUrl && (
            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-background/90 backdrop-blur-sm border border-border rounded-full px-3 py-1.5 shadow-sm">
               <Loader2 className="w-3 h-3 animate-spin text-indigo-500" />
               <span className="text-[10px] text-muted-foreground font-medium">Updating...</span>
            </div>
         )}
      </div>
   );
}
