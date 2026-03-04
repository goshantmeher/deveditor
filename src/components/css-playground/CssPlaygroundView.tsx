'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { HtmlEditor } from './HtmlEditor';
import { CssEditor } from './CssEditor';
import { LivePreview } from './LivePreview';
import { CssPlaygroundToolbar } from './CssPlaygroundToolbar';
import {
   DEFAULT_HTML,
   DEFAULT_CSS,
   CssPreset,
} from '@/constants/css-playground';
import { usePersistence } from '@/contexts/PersistenceContext';

const STORAGE_KEY_HTML = 'css-playground-html';
const STORAGE_KEY_CSS = 'css-playground-css';
const STORAGE_KEY_PRESET = 'css-playground-active-preset';

export function CssPlaygroundView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [htmlContent, setHtmlContent] = useState(DEFAULT_HTML);
   const [cssContent, setCssContent] = useState(DEFAULT_CSS);
   const [activePresetId, setActivePresetId] = useState<string | null>(null);

   // Debounced content for preview (to avoid iframe thrashing)
   const [debouncedHtml, setDebouncedHtml] = useState(DEFAULT_HTML);
   const [debouncedCss, setDebouncedCss] = useState(DEFAULT_CSS);

   // Load from localStorage on mount
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const storedHtml = localStorage.getItem(STORAGE_KEY_HTML);
         const storedCss = localStorage.getItem(STORAGE_KEY_CSS);
         const storedPreset = localStorage.getItem(STORAGE_KEY_PRESET);

         if (storedHtml) {
            setHtmlContent(storedHtml);
            setDebouncedHtml(storedHtml);
         }
         if (storedCss) {
            setCssContent(storedCss);
            setDebouncedCss(storedCss);
         }
         if (storedPreset) {
            setActivePresetId(storedPreset);
         }
      }
   }, [isPersistenceEnabled]);

   // Save to localStorage on changes
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled) return;
      localStorage.setItem(STORAGE_KEY_HTML, htmlContent);
      localStorage.setItem(STORAGE_KEY_CSS, cssContent);
      if (activePresetId) {
         localStorage.setItem(STORAGE_KEY_PRESET, activePresetId);
      } else {
         localStorage.removeItem(STORAGE_KEY_PRESET);
      }
   }, [htmlContent, cssContent, activePresetId, isPersistenceEnabled]);

   // Debounce preview updates
   useEffect(() => {
      const timer = setTimeout(() => {
         setDebouncedHtml(htmlContent);
         setDebouncedCss(cssContent);
      }, 300);
      return () => clearTimeout(timer);
   }, [htmlContent, cssContent]);

   const handlePresetSelect = useCallback((preset: CssPreset) => {
      setHtmlContent(preset.html);
      setCssContent(preset.css);
      setActivePresetId(preset.id);
   }, []);

   const handleReset = useCallback(() => {
      setHtmlContent(DEFAULT_HTML);
      setCssContent(DEFAULT_CSS);
      setActivePresetId(null);
   }, []);

   const handleHtmlChange = useCallback((value: string) => {
      setHtmlContent(value);
      setActivePresetId(null); // Clear active preset when user edits
   }, []);

   const handleCssChange = useCallback((value: string) => {
      setCssContent(value);
      setActivePresetId(null); // Clear active preset when user edits
   }, []);

   // Structured data for SEO
   const cssPlaygroundSchema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'CSS Playground',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web Browser',
      offers: {
         '@type': 'Offer',
         price: '0',
         priceCurrency: 'USD',
      },
      featureList: [
         'Live CSS Preview',
         'HTML and CSS Editors',
         'Preset Templates',
         'Responsive Viewport Testing',
         'Export as HTML',
         'Copy CSS/HTML to Clipboard',
         'Syntax Highlighting',
         'Auto-completion',
      ],
      description:
         'Free online CSS playground with live preview. Test and experiment with CSS in real-time with syntax highlighting, preset templates, and responsive preview.',
   };

   return (
      <div className="css-playground-wrapper w-full h-full flex flex-col">
         <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
               __html: JSON.stringify(cssPlaygroundSchema),
            }}
         />

         {/* Toolbar */}
         <CssPlaygroundToolbar
            onPresetSelect={handlePresetSelect}
            htmlContent={htmlContent}
            cssContent={cssContent}
            onReset={handleReset}
            activePresetId={activePresetId}
         />

         {/* Main Content: 3 Panes */}
         <div className="flex-1 flex flex-col md:flex-row min-h-0">
            {/* HTML Editor Pane */}
            <div className="flex flex-col md:w-1/3 min-h-0 border-r border-border/30">
               <div className="px-3 py-1.5 border-b border-border/30 bg-muted/20 shrink-0">
                  <div className="flex items-center gap-2">
                     <div className="w-2.5 h-2.5 rounded-full bg-orange-400/80" />
                     <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        HTML
                     </span>
                  </div>
               </div>
               <div className="flex-1 min-h-0 overflow-hidden">
                  <HtmlEditor
                     value={htmlContent}
                     onChange={handleHtmlChange}
                     ariaLabel="HTML editor pane"
                  />
               </div>
            </div>

            {/* CSS Editor Pane */}
            <div className="flex flex-col md:w-1/3 min-h-0 border-r border-border/30">
               <div className="px-3 py-1.5 border-b border-border/30 bg-muted/20 shrink-0">
                  <div className="flex items-center gap-2">
                     <div className="w-2.5 h-2.5 rounded-full bg-blue-400/80" />
                     <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        CSS
                     </span>
                  </div>
               </div>
               <div className="flex-1 min-h-0 overflow-hidden">
                  <CssEditor
                     value={cssContent}
                     onChange={handleCssChange}
                     ariaLabel="CSS editor pane"
                  />
               </div>
            </div>

            {/* Live Preview Pane */}
            <div className="flex flex-col md:w-1/3 min-h-0">
               <LivePreview
                  htmlContent={debouncedHtml}
                  cssContent={debouncedCss}
               />
            </div>
         </div>
      </div>
   );
}
