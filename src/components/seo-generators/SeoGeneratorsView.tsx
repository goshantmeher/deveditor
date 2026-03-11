'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bot, Map, Copy, CheckCircle2, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePersistence } from '@/contexts/PersistenceContext';
import { STORAGE_KEYS } from '@/constants/storage';

interface SeoGenState {
   activeTab: 'robots' | 'sitemap';
   // Robots.txt
   robotsUserAgent: string;
   robotsAllow: string;
   robotsDisallow: string;
   robotsSitemap: string;
   // Sitemap.xml
   sitemapBaseUrl: string;
   sitemapPaths: string; // newline separated
   sitemapFreq: string;
   sitemapPriority: string;
}

const DEFAULT_STATE: SeoGenState = {
   activeTab: 'robots',
   robotsUserAgent: '*',
   robotsAllow: '/',
   robotsDisallow: '/api/\n/admin/\n/private/',
   robotsSitemap: 'https://www.example.com/sitemap.xml',
   sitemapBaseUrl: 'https://www.example.com',
   sitemapPaths: '/\n/about\n/pricing\n/blog\n/contact',
   sitemapFreq: 'weekly',
   sitemapPriority: '0.8',
};

export function SeoGeneratorsView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [state, setState] = useState<SeoGenState>(DEFAULT_STATE);
   const [copiedCode, setCopiedCode] = useState(false);

   // Load state from localStorage
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const stored = localStorage.getItem(STORAGE_KEYS.SEO_GENERATORS_SETTINGS);
         if (stored) {
            try {
               setState(JSON.parse(stored));
            } catch {
               // Ignore
            }
         }
      }
   }, [isPersistenceEnabled]);

   // Save state
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      localStorage.setItem(STORAGE_KEYS.SEO_GENERATORS_SETTINGS, JSON.stringify(state));
   }, [state, isPersistenceEnabled]);

   const handleChange = (field: keyof SeoGenState, value: string) => {
      setState((prev) => ({ ...prev, [field]: value }));
   };

   const generateRobotsTxt = () => {
      let output = `User-agent: ${state.robotsUserAgent || '*'}\n`;

      const allows = state.robotsAllow
         .split('\n')
         .map((l) => l.trim())
         .filter(Boolean);
      allows.forEach((a) => {
         output += `Allow: ${a}\n`;
      });

      const disallows = state.robotsDisallow
         .split('\n')
         .map((l) => l.trim())
         .filter(Boolean);
      disallows.forEach((d) => {
         output += `Disallow: ${d}\n`;
      });

      if (state.robotsSitemap) {
         output += `\nSitemap: ${state.robotsSitemap}\n`;
      }
      return output;
   };

   const generateSitemapXml = () => {
      const baseUrl = state.sitemapBaseUrl.replace(/\/$/, '');
      const paths = state.sitemapPaths
         .split('\n')
         .map((l) => l.trim())
         .filter(Boolean);
      const dateString = new Date().toISOString().split('T')[0];

      let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

      if (paths.length === 0) {
         xml += `  <url>\n    <loc>${baseUrl}/</loc>\n    <lastmod>${dateString}</lastmod>\n    <changefreq>${state.sitemapFreq}</changefreq>\n    <priority>${state.sitemapPriority}</priority>\n  </url>\n`;
      } else {
         paths.forEach((p) => {
            const path = p.startsWith('/') ? p : `/${p}`;
            xml += `  <url>\n    <loc>${baseUrl}${path}</loc>\n    <lastmod>${dateString}</lastmod>\n    <changefreq>${state.sitemapFreq}</changefreq>\n    <priority>${state.sitemapPriority}</priority>\n  </url>\n`;
         });
      }

      xml += `</urlset>`;
      return xml;
   };

   const currentOutput = state.activeTab === 'robots' ? generateRobotsTxt() : generateSitemapXml();

   const copyToClipboard = async () => {
      try {
         await navigator.clipboard.writeText(currentOutput);
         setCopiedCode(true);
         setTimeout(() => setCopiedCode(false), 2000);
      } catch (err) {
         console.error('Failed to copy', err);
      }
   };

   return (
      <div className="w-full h-full flex flex-col md:flex-row bg-background overflow-hidden relative border border-border">
         {/* Left Controls Panel */}
         <div className="flex flex-col w-full md:w-[320px] lg:w-[400px] bg-background border-b md:border-b-0 md:border-r border-border shrink-0 max-h-[50vh] md:max-h-full overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-between shrink-0">
               <div className="flex space-x-1 w-full bg-muted/50 p-1 rounded-lg">
                  <button
                     onClick={() => handleChange('activeTab', 'robots')}
                     className={`flex-1 px-3 py-1.5 text-xs font-semibold rounded-md flex justify-center items-center gap-2 transition-colors ${state.activeTab === 'robots' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                     <Bot className="w-3.5 h-3.5" /> Robots.txt
                  </button>
                  <button
                     onClick={() => handleChange('activeTab', 'sitemap')}
                     className={`flex-1 px-3 py-1.5 text-xs font-semibold rounded-md flex justify-center items-center gap-2 transition-colors ${state.activeTab === 'sitemap' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                     <Map className="w-3.5 h-3.5" /> Sitemap.xml
                  </button>
               </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6">
               {state.activeTab === 'robots' && (
                  <>
                     <div className="space-y-4">
                        <div className="space-y-1.5">
                           <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                              Target User-Agent
                           </label>
                           <Select
                              value={state.robotsUserAgent}
                              onValueChange={(val) => handleChange('robotsUserAgent', val)}
                           >
                              <SelectTrigger className="w-full bg-background border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-brand">
                                 <SelectValue placeholder="User Agent" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="*">All Spiders (*)</SelectItem>
                                 <SelectItem value="Googlebot">Googlebot</SelectItem>
                                 <SelectItem value="Bingbot">Bingbot</SelectItem>
                                 <SelectItem value="DuckDuckBot">DuckDuckBot</SelectItem>
                                 <SelectItem value="CCBot">Common Crawl / AI</SelectItem>
                                 <SelectItem value="ChatGPT-User">ChatGPT-User</SelectItem>
                                 <SelectItem value="GPTBot">GPTBot</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>

                        <div className="space-y-1.5">
                           <label className="text-[11px] font-medium text-emerald-500 uppercase tracking-wider">
                              Allowed Paths (One per line)
                           </label>
                           <Textarea
                              value={state.robotsAllow}
                              onChange={(e) => handleChange('robotsAllow', e.target.value)}
                              className="w-full h-20 bg-muted/20 resize-none font-mono text-[13px]"
                              placeholder="/"
                           />
                        </div>

                        <div className="space-y-1.5">
                           <label className="text-[11px] font-medium text-rose-500 uppercase tracking-wider">
                              Disallowed Paths (One per line)
                           </label>
                           <Textarea
                              value={state.robotsDisallow}
                              onChange={(e) => handleChange('robotsDisallow', e.target.value)}
                              className="w-full h-28 bg-muted/20 resize-none font-mono text-[13px]"
                              placeholder="/private/\n/temp/"
                           />
                        </div>

                        <div className="space-y-1.5 pt-4 border-t border-border">
                           <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                              Sitemap XML URL
                           </label>
                           <Input
                              type="url"
                              value={state.robotsSitemap}
                              onChange={(e) => handleChange('robotsSitemap', e.target.value)}
                              className="bg-muted/10"
                              placeholder="https://example.com/sitemap.xml"
                           />
                        </div>
                     </div>
                  </>
               )}

               {state.activeTab === 'sitemap' && (
                  <>
                     <div className="space-y-4">
                        <div className="space-y-1.5">
                           <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                              Base Domain URL
                           </label>
                           <Input
                              type="url"
                              value={state.sitemapBaseUrl}
                              onChange={(e) => handleChange('sitemapBaseUrl', e.target.value)}
                              className="bg-muted/10 font-mono text-[13px]"
                              placeholder="https://www.example.com"
                           />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                           <div className="space-y-1.5">
                              <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                                 Change Freq.
                              </label>
                              <Select
                                 value={state.sitemapFreq}
                                 onValueChange={(val) => handleChange('sitemapFreq', val)}
                              >
                                 <SelectTrigger className="w-full bg-background border border-border rounded-md px-3 text-sm">
                                    <SelectValue placeholder="Freq" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    <SelectItem value="always">Always</SelectItem>
                                    <SelectItem value="hourly">Hourly</SelectItem>
                                    <SelectItem value="daily">Daily</SelectItem>
                                    <SelectItem value="weekly">Weekly</SelectItem>
                                    <SelectItem value="monthly">Monthly</SelectItem>
                                    <SelectItem value="yearly">Yearly</SelectItem>
                                    <SelectItem value="never">Never</SelectItem>
                                 </SelectContent>
                              </Select>
                           </div>

                           <div className="space-y-1.5">
                              <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                                 Priority (0.1-1.0)
                              </label>
                              <Select
                                 value={state.sitemapPriority}
                                 onValueChange={(val) => handleChange('sitemapPriority', val)}
                              >
                                 <SelectTrigger className="w-full bg-background border border-border rounded-md px-3 text-sm">
                                    <SelectValue placeholder="Priority" />
                                 </SelectTrigger>
                                 <SelectContent>
                                    {['1.0', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1'].map((p) => (
                                       <SelectItem key={p} value={p}>
                                          {p}
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                           </div>
                        </div>

                        <div className="space-y-1.5 pt-2">
                           <label className="text-[11px] font-medium text-indigo-400 uppercase tracking-wider">
                              Routing Paths (One per line)
                           </label>
                           <Textarea
                              value={state.sitemapPaths}
                              onChange={(e) => handleChange('sitemapPaths', e.target.value)}
                              className="w-full h-[60vh] bg-muted/10 resize-none font-mono text-[13px] whitespace-pre"
                              placeholder="/\n/about\n/contact"
                           />
                        </div>
                     </div>
                  </>
               )}
            </div>
         </div>

         {/* Right Output Panel */}
         <div className="flex-1 flex flex-col min-w-0 bg-[#1e1e1e] h-[50vh] md:h-full relative overflow-hidden">
            <div className="h-14 flex items-center justify-between px-4 border-b border-white/10 shrink-0 absolute top-0 left-0 right-0 z-10 w-full bg-[#181818] shadow-md">
               <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground dark:text-gray-400">
                  <Database className="w-4 h-4 text-emerald-500" /> Output Code Validation
               </div>
               <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-2 bg-transparent text-gray-300 border-white/20 hover:bg-white/10 hover:text-white"
                  onClick={copyToClipboard}
               >
                  {copiedCode ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  {copiedCode ? 'Copied!' : 'Copy to Clipboard'}
               </Button>
            </div>

            <div className="flex-1 w-full pt-14 overflow-auto p-4 md:p-8">
               <pre className="text-[13px] md:text-[14px] font-mono leading-relaxed text-[#c9d1d9] bg-transparent whitespace-pre">
                  <code
                     dangerouslySetInnerHTML={{
                        __html: currentOutput.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>'),
                     }}
                  />
               </pre>
            </div>
         </div>
      </div>
   );
}
