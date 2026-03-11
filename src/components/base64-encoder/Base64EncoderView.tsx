'use client';
import { STORAGE_KEYS } from '@/constants/storage';

import React, { useState, useEffect, useRef } from 'react';
import { TextEncoder } from './TextEncoder';
import { FileEncoder } from './FileEncoder';
import { UrlSafeEncoder } from './UrlSafeEncoder';
import { usePersistence } from '@/contexts/PersistenceContext';
import { Type, FileUp, Shield } from 'lucide-react';

type Base64Tab = 'text' | 'file' | 'urlsafe';

const tabs: {
   id: Base64Tab;
   label: string;
   icon: React.ReactNode;
   description: string;
}[] = [
   {
      id: 'text',
      label: 'Text',
      icon: <Type className="h-3.5 w-3.5" />,
      description: 'Encode & decode plain text',
   },
   {
      id: 'file',
      label: 'File / Image',
      icon: <FileUp className="h-3.5 w-3.5" />,
      description: 'Encode files & preview images',
   },
   {
      id: 'urlsafe',
      label: 'URL-safe',
      icon: <Shield className="h-3.5 w-3.5" />,
      description: 'URL-safe Base64 variant',
   },
];

export function Base64EncoderView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);
   const [activeTab, setActiveTab] = useState<Base64Tab>('text');

   // Load tab from localStorage
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const stored = localStorage.getItem(STORAGE_KEYS.BASE64_ENCODER_TAB) as Base64Tab | null;
         if (stored && ['text', 'file', 'urlsafe'].includes(stored)) {
            setActiveTab(stored);
         }
      }
   }, [isPersistenceEnabled]);

   // Save tab to localStorage
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled) return;
      localStorage.setItem(STORAGE_KEYS.BASE64_ENCODER_TAB, activeTab);
   }, [activeTab, isPersistenceEnabled]);

   const base64Schema = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Base64 Encoder/Decoder',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web Browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      featureList: [
         'Text to Base64 Encoding',
         'Base64 to Text Decoding',
         'File to Base64 Encoding',
         'Image Preview with Data URI',
         'URL-safe Base64 Encoding',
         'Auto-detect Base64 Input',
         'One-click Copy',
      ],
      description:
         'Free online Base64 encoder and decoder. Convert text, files, and images to Base64. Generate data URIs, CSS snippets, and URL-safe Base64 strings.',
   };

   return (
      <div className="base64-encoder-wrapper w-full h-full flex flex-col bg-background border border-border rounded-xl overflow-hidden relative shadow-sm">
         <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(base64Schema) }} />

         {/* Tab Navigation */}
         <div className="flex items-center border-b border-border bg-background shrink-0 px-2 py-1">
            <div className="flex items-center gap-1 px-2 py-1.5">
               {tabs.map((tab) => (
                  <button
                     key={tab.id}
                     onClick={() => setActiveTab(tab.id)}
                     className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                        activeTab === tab.id
                           ? 'bg-muted text-foreground border border-border shadow-sm'
                           : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                     }`}
                     title={tab.description}
                  >
                     {tab.icon}
                     {tab.label}
                  </button>
               ))}
            </div>

            <div className="flex-1 px-3 py-1.5 text-right">
               <span className="text-xs text-muted-foreground">
                  {tabs.find((t) => t.id === activeTab)?.description}
               </span>
            </div>
         </div>

         {/* Content */}
         <div className="flex-1 min-h-0 overflow-auto">
            {activeTab === 'text' && <TextEncoder />}
            {activeTab === 'file' && <FileEncoder />}
            {activeTab === 'urlsafe' && <UrlSafeEncoder />}
         </div>
      </div>
   );
}
