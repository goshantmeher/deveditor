'use client';
import { STORAGE_KEYS } from '@/constants/storage';

import { useState, useCallback, useEffect, useRef } from 'react';
import { ResumeData, TemplateId, DEFAULT_RESUME_DATA } from '@/types/resume';
import { ResumeForm } from './ResumeForm';
import { ResumePreview } from './ResumePreview';
import { TemplateSelector } from './TemplateSelector';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';
import { Button } from '@/components/ui/button';
import { FileText, Download, RotateCcw, Eye, PenLine, Bot } from 'lucide-react';
import { usePersistence } from '@/contexts/PersistenceContext';
import { AiImportModal } from './AiImportModal';

const TEMPLATE_STORAGE_KEY = 'pdf-resume-template';
const PREVIEW_DEBOUNCE_MS = 500;

export function ResumeBuilderView() {
   const { isPersistenceEnabled } = usePersistence();
   const [data, setData] = useState<ResumeData>(DEFAULT_RESUME_DATA);
   const [debouncedData, setDebouncedData] = useState<ResumeData>(DEFAULT_RESUME_DATA);
   const [templateId, setTemplateId] = useState<TemplateId>('modern');
   const [isDownloading, setIsDownloading] = useState(false);
   const [mobileView, setMobileView] = useState<'edit' | 'preview'>('edit');
   const [showAiImport, setShowAiImport] = useState(false);
   const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

   // Debounce data for preview to avoid flashing on every keystroke
   useEffect(() => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
         setDebouncedData(data);
      }, PREVIEW_DEBOUNCE_MS);
      return () => {
         if (debounceTimer.current) clearTimeout(debounceTimer.current);
      };
   }, [data]);

   // Load persisted data
   useEffect(() => {
      if (!isPersistenceEnabled) return;
      try {
         const saved = localStorage.getItem(STORAGE_KEYS.RESUME_DATA);
         if (saved) setData(JSON.parse(saved));
         const savedTemplate = localStorage.getItem(TEMPLATE_STORAGE_KEY);
         if (savedTemplate) setTemplateId(savedTemplate as TemplateId);
      } catch {
         // Ignore parse errors
      }
   }, [isPersistenceEnabled]);

   // Persist data on change
   useEffect(() => {
      if (!isPersistenceEnabled) return;
      try {
         localStorage.setItem(STORAGE_KEYS.RESUME_DATA, JSON.stringify(data));
         localStorage.setItem(TEMPLATE_STORAGE_KEY, templateId);
      } catch {
         // Ignore storage errors
      }
   }, [data, templateId, isPersistenceEnabled]);

   const handleDownload = useCallback(async () => {
      setIsDownloading(true);
      try {
         const { pdf } = await import('@react-pdf/renderer');

         let TemplateComponent;
         switch (templateId) {
            case 'modern':
               TemplateComponent = ModernTemplate;
               break;
            case 'minimal':
               TemplateComponent = MinimalTemplate;
               break;
            default:
               TemplateComponent = ClassicTemplate;
         }

         const blob = await pdf(<TemplateComponent data={data} />).toBlob();
         const url = URL.createObjectURL(blob);
         const link = document.createElement('a');
         link.href = url;
         const fileName = data.personalInfo.fullName
            ? `${data.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
            : 'Resume.pdf';
         link.download = fileName;
         document.body.appendChild(link);
         link.click();
         document.body.removeChild(link);
         URL.revokeObjectURL(url);
      } catch (err) {
         console.error('Failed to generate PDF:', err);
      } finally {
         setIsDownloading(false);
      }
   }, [data, templateId]);

   const handleReset = () => {
      setData(DEFAULT_RESUME_DATA);
      setTemplateId('modern');
   };

   return (
      <div className="w-full h-full flex flex-col bg-background border border-border rounded-xl shadow-sm overflow-hidden">
         {/* Toolbar */}
         <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-4 py-2.5 border-b border-border bg-background gap-2 md:gap-4 shrink-0">
            <div className="flex items-center gap-2">
               <FileText className="w-4 h-4 text-indigo-500" />
               <h1 className="text-sm font-semibold">Resume Builder</h1>
               <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full font-medium border border-emerald-500/20">
                  100% Free
               </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
               <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-8 border-violet-500/30 text-violet-400 hover:bg-violet-500/10 hover:text-violet-300"
                  onClick={() => setShowAiImport(true)}
               >
                  <Bot className="w-3.5 h-3.5 mr-1" />
                  Import from AI
               </Button>
               <div className="h-5 w-px bg-border hidden md:block" />
               <TemplateSelector selected={templateId} onChange={setTemplateId} />
               <div className="h-5 w-px bg-border hidden md:block" />
               <Button variant="ghost" size="sm" className="text-xs h-8 text-muted-foreground" onClick={handleReset}>
                  <RotateCcw className="w-3.5 h-3.5 mr-1" />
                  Reset
               </Button>
               <Button
                  size="sm"
                  className="text-xs h-8 bg-indigo-600 hover:bg-indigo-700 text-white"
                  onClick={handleDownload}
                  disabled={isDownloading}
               >
                  <Download className="w-3.5 h-3.5 mr-1" />
                  {isDownloading ? 'Generating...' : 'Download PDF'}
               </Button>
            </div>
         </div>

         {/* AI Import Modal */}
         <AiImportModal
            open={showAiImport}
            onClose={() => setShowAiImport(false)}
            onImport={(imported) => setData(imported)}
         />

         {/* Mobile toggle */}
         <div className="flex md:hidden border-b border-border">
            <button
               onClick={() => setMobileView('edit')}
               className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors ${
                  mobileView === 'edit' ? 'text-indigo-500 border-b-2 border-indigo-500' : 'text-muted-foreground'
               }`}
            >
               <PenLine className="w-3.5 h-3.5" />
               Edit
            </button>
            <button
               onClick={() => setMobileView('preview')}
               className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors ${
                  mobileView === 'preview' ? 'text-indigo-500 border-b-2 border-indigo-500' : 'text-muted-foreground'
               }`}
            >
               <Eye className="w-3.5 h-3.5" />
               Preview
            </button>
         </div>

         {/* Split Pane */}
         <div className="flex-1 flex flex-col md:flex-row min-h-0">
            {/* Form Panel */}
            <div
               className={`w-full md:w-[45%] border-r-0 md:border-r border-border overflow-hidden flex-1 md:flex-none ${
                  mobileView === 'preview' ? 'hidden md:block' : ''
               }`}
            >
               <ResumeForm data={data} onChange={setData} />
            </div>

            {/* Preview Panel */}
            <div
               className={`w-full md:w-[55%] overflow-hidden flex-1 md:flex-none md:h-auto min-h-[500px] ${
                  mobileView === 'edit' ? 'hidden md:block' : ''
               }`}
            >
               <ResumePreview
                  data={debouncedData}
                  templateId={templateId}
                  generateOnDemand={mobileView === 'preview'}
               />
            </div>
         </div>
      </div>
   );
}
