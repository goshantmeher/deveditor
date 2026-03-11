'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Network, Search, AlertCircle, Copy, Check, Globe, RefreshCcw, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePersistence } from '@/contexts/PersistenceContext';
import { STORAGE_KEYS } from '@/constants/storage';

type DnsProvider = 'cloudflare' | 'google';

type DnsRecordType = 'ALL' | 'A' | 'AAAA' | 'CNAME' | 'MX' | 'NS' | 'TXT' | 'SOA' | 'CAA';

interface DnsAnswer {
   name: string;
   type: number;
   TTL: number;
   data: string;
}

interface DnsResponse {
   Status: number;
   TC: boolean;
   RD: boolean;
   RA: boolean;
   AD: boolean;
   CD: boolean;
   Question: { name: string; type: number }[];
   Answer?: DnsAnswer[];
   Authority?: DnsAnswer[];
   Comment?: string;
}

const PROVIDERS = {
   cloudflare: { name: 'Cloudflare', url: 'https://cloudflare-dns.com/dns-query' },
   google: { name: 'Google', url: 'https://dns.google/resolve' },
};

const COMMON_TYPES = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS'];

export function DnsLookupView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [domain, setDomain] = useState('');
   const [provider, setProvider] = useState<DnsProvider>('cloudflare');
   const [recordType, setRecordType] = useState<DnsRecordType>('ALL');

   const [results, setResults] = useState<{ type: string; answers: DnsAnswer[]; error?: string }[] | null>(null);
   const [isLoading, setIsLoading] = useState(false);
   const [globalError, setGlobalError] = useState<string | null>(null);

   const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

   // Load persistence
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const storedDomain = localStorage.getItem(STORAGE_KEYS.DNS_LOOKUP_DOMAIN);
         const storedProvider = localStorage.getItem(STORAGE_KEYS.DNS_LOOKUP_PROVIDER) as DnsProvider;
         const storedType = localStorage.getItem(STORAGE_KEYS.DNS_LOOKUP_TYPE) as DnsRecordType;

         if (storedDomain) setDomain(storedDomain);
         if (storedProvider && PROVIDERS[storedProvider]) setProvider(storedProvider);
         if (storedType) setRecordType(storedType);
      }
   }, [isPersistenceEnabled]);

   // Save persistence
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      localStorage.setItem(STORAGE_KEYS.DNS_LOOKUP_DOMAIN, domain);
      localStorage.setItem(STORAGE_KEYS.DNS_LOOKUP_PROVIDER, provider);
      localStorage.setItem(STORAGE_KEYS.DNS_LOOKUP_TYPE, recordType);
   }, [domain, provider, recordType, isPersistenceEnabled]);

   const fetchDns = useCallback(
      async (queryDomain: string, qType: string): Promise<DnsResponse> => {
         const url = new URL(PROVIDERS[provider].url);
         url.searchParams.append('name', queryDomain);
         url.searchParams.append('type', qType);

         const headers: Record<string, string> = {
            Accept: 'application/dns-json',
         };

         const response = await fetch(url.toString(), { headers });
         if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
         }

         return response.json();
      },
      [provider]
   );

   const handleLookup = useCallback(async () => {
      if (!domain.trim()) {
         setGlobalError('Please enter a domain name.');
         return;
      }

      // Basic domain cleanup
      let cleanDomain = domain.trim().toLowerCase();
      try {
         if (cleanDomain.startsWith('http://') || cleanDomain.startsWith('https://')) {
            cleanDomain = new URL(cleanDomain).hostname;
         }
      } catch {
         // ignore
      }

      setIsLoading(true);
      setGlobalError(null);
      setResults(null);

      try {
         const typesToFetch = recordType === 'ALL' ? COMMON_TYPES : [recordType];
         const fetchPromises = typesToFetch.map(async (t) => {
            try {
               const res = await fetchDns(cleanDomain, t);
               return { type: t, answers: res.Answer || [], status: res.Status };
            } catch (err) {
               const message = err instanceof Error ? err.message : 'Lookup failed';
               return { type: t, answers: [], error: message };
            }
         });

         const responses = await Promise.all(fetchPromises);

         const formattedResults = responses.map((r) => ({
            type: r.type,
            answers: r.answers,
            error: r.error || (r.status !== 0 && r.status !== undefined ? `DNS Error Code: ${r.status}` : undefined),
         }));

         // Filter out empty ones if 'ALL' was selected, but keep errors if it failed completely
         const finalResults =
            recordType === 'ALL' ? formattedResults.filter((r) => r.answers.length > 0 || r.error) : formattedResults;

         setResults(finalResults);
      } catch (err) {
         const message = err instanceof Error ? err.message : 'An unexpected error occurred during DNS lookup.';
         setGlobalError(message);
      } finally {
         setIsLoading(false);
      }
   }, [domain, recordType, fetchDns]);

   const handleCopy = (text: string, id: string) => {
      navigator.clipboard.writeText(text);
      setCopiedIndex(id);
      setTimeout(() => setCopiedIndex(null), 2000);
   };

   const copyAllAsJson = () => {
      if (!results) return;
      navigator.clipboard.writeText(JSON.stringify(results, null, 2));
      setCopiedIndex('all-json');
      setTimeout(() => setCopiedIndex(null), 2000);
   };

   return (
      <div className="w-full h-full flex flex-col bg-background border border-border rounded-xl shadow-sm overflow-hidden">
         {/* Toolbar */}
         <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-border bg-background shrink-0">
            <div className="flex items-center gap-2 text-foreground">
               <Globe className="h-4 w-4 text-brand" />
               <span className="text-sm font-semibold">DNS Lookup Tool</span>
            </div>

            <div className="flex items-center gap-2">
               <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3 h-3" /> DoH Private
               </div>
            </div>
         </div>

         {/* Main Content */}
         <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-background">
            {/* Sidebar / Controls */}
            <div className="w-full md:w-80 flex flex-col border-b md:border-b-0 md:border-r border-border bg-muted/10 shrink-0 overflow-y-auto">
               <div className="p-4 space-y-6">
                  {/* Domain Input */}
                  <div className="space-y-2">
                     <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                        Domain Name
                     </label>
                     <Input
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        placeholder="e.g. deveditor.io"
                        className="font-mono text-sm"
                        onKeyDown={(e) => {
                           if (e.key === 'Enter') handleLookup();
                        }}
                     />
                  </div>

                  {/* Record Type Select */}
                  <div className="space-y-2">
                     <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                        Record Type
                     </label>
                     <Select value={recordType} onValueChange={(val) => setRecordType(val as DnsRecordType)}>
                        <SelectTrigger className="w-full bg-background font-mono text-sm">
                           <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="ALL">All Common</SelectItem>
                           {['A', 'AAAA', 'CNAME', 'MX', 'NS', 'TXT', 'SOA', 'CAA'].map((t) => (
                              <SelectItem key={t} value={t}>
                                 {t}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                  </div>

                  {/* Provider Select */}
                  <div className="space-y-2">
                     <label className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider flex items-center justify-between">
                        DoH Resolver
                        <span className="text-[10px] lowercase normal-case text-muted-foreground/70 flex items-center gap-1">
                           <Network size={10} /> {PROVIDERS[provider].name}
                        </span>
                     </label>
                     <Select value={provider} onValueChange={(val) => setProvider(val as DnsProvider)}>
                        <SelectTrigger className="w-full bg-background text-sm">
                           <SelectValue placeholder="Select provider" />
                        </SelectTrigger>
                        <SelectContent>
                           <SelectItem value="cloudflare">1.1.1.1 (Cloudflare)</SelectItem>
                           <SelectItem value="google">8.8.8.8 (Google)</SelectItem>
                        </SelectContent>
                     </Select>
                  </div>

                  <div className="pt-2">
                     <Button onClick={handleLookup} disabled={isLoading || !domain.trim()} className="w-full group">
                        {isLoading ? (
                           <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                           <Search className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                        )}
                        Lookup DNS
                     </Button>
                  </div>
               </div>
            </div>

            {/* Results Area */}
            <div className="flex-1 flex flex-col min-h-0 bg-background relative overflow-y-auto">
               <div className="px-4 py-3 border-b min-h-[52px] border-border bg-background shrink-0 flex items-center justify-between sticky top-0 z-10">
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                     {results ? `Results for ${domain}` : 'Query Results'}
                  </span>
                  <div className="flex items-center gap-2">
                     {results && (
                        <Button variant="outline" size="sm" className="h-7 text-xs" onClick={copyAllAsJson}>
                           {copiedIndex === 'all-json' ? (
                              <Check className="h-3.5 w-3.5 mr-1.5 text-success" />
                           ) : (
                              <Copy className="h-3.5 w-3.5 mr-1.5" />
                           )}
                           {copiedIndex === 'all-json' ? 'Copied JSON' : 'Export JSON'}
                        </Button>
                     )}
                  </div>
               </div>

               <div className="p-4 md:p-6 flex-1">
                  {globalError ? (
                     <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
                        <AlertCircle className="w-12 h-12 mb-4 text-destructive/50" />
                        <p className="text-sm font-medium text-foreground">{globalError}</p>
                     </div>
                  ) : !results && !isLoading ? (
                     <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
                        <div className="w-24 h-24 mb-6 rounded-full bg-muted/30 flex items-center justify-center border border-border/50">
                           <Globe size={40} className="text-muted-foreground/30" />
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-2">Perform DNS Lookup</h3>
                        <p className="text-sm max-w-sm">
                           Enter a domain above and select a record type to fetch global DNS propagation data privately.
                        </p>
                     </div>
                  ) : isLoading ? (
                     <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
                        <RefreshCcw className="w-10 h-10 mb-4 animate-spin text-brand/50" />
                        <p className="text-sm">Querying {PROVIDERS[provider].name} DNS servers...</p>
                     </div>
                  ) : (
                     <div className="space-y-6">
                        {results?.length === 0 ? (
                           <div className="p-4 rounded-xl bg-muted/20 border border-border/50 text-center text-sm text-muted-foreground">
                              No records found for this query.
                           </div>
                        ) : (
                           results?.map((block, idx) => (
                              <div
                                 key={idx}
                                 className="bg-muted/10 border border-border rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4"
                                 style={{ animationDelay: `${idx * 50}ms` }}
                              >
                                 <div className="bg-muted/30 px-4 py-2 border-b border-border flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                       <div className="px-2 py-0.5 bg-brand/10 text-brand border border-brand/20 font-bold font-mono text-xs rounded-md">
                                          {block.type}
                                       </div>
                                       <span className="text-xs font-semibold text-muted-foreground">RECORDS</span>
                                    </div>
                                    <div className="text-[10px] font-mono text-muted-foreground">
                                       {block.answers.length} found
                                    </div>
                                 </div>

                                 {block.error ? (
                                    <div className="p-4 text-sm text-destructive/80 flex items-center gap-2">
                                       <AlertCircle className="w-4 h-4" />
                                       {block.error}
                                    </div>
                                 ) : block.answers.length === 0 ? (
                                    <div className="p-4 text-sm text-muted-foreground">
                                       No {block.type} records returned.
                                    </div>
                                 ) : (
                                    <div className="overflow-x-auto">
                                       <table className="w-full text-sm text-left">
                                          <thead className="text-[10px] uppercase tracking-wider text-muted-foreground bg-muted/10 border-b border-border">
                                             <tr>
                                                <th className="px-4 py-2 font-medium">Name</th>
                                                <th className="px-4 py-2 font-medium">TTL</th>
                                                <th className="px-4 py-2 font-medium w-full">Data (Value)</th>
                                                <th className="px-4 py-2 font-medium text-right">Action</th>
                                             </tr>
                                          </thead>
                                          <tbody className="divide-y divide-border/50">
                                             {block.answers.map((ans, aIdx) => {
                                                const copyId = `${block.type}-${aIdx}`;
                                                return (
                                                   <tr key={aIdx} className="hover:bg-muted/20 transition-colors group">
                                                      <td
                                                         className="px-4 py-3 font-mono text-xs text-foreground align-top max-w-[200px] truncate"
                                                         title={ans.name}
                                                      >
                                                         {ans.name}
                                                      </td>
                                                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground align-top">
                                                         {ans.TTL}
                                                      </td>
                                                      <td className="px-4 py-3 font-mono text-xs text-foreground break-all align-top">
                                                         {ans.data}
                                                      </td>
                                                      <td className="px-4 py-2 text-right align-top">
                                                         <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                                            onClick={() => handleCopy(ans.data, copyId)}
                                                            title="Copy Data"
                                                         >
                                                            {copiedIndex === copyId ? (
                                                               <Check className="h-3.5 w-3.5 text-success" />
                                                            ) : (
                                                               <Copy className="h-3.5 w-3.5" />
                                                            )}
                                                         </Button>
                                                      </td>
                                                   </tr>
                                                );
                                             })}
                                          </tbody>
                                       </table>
                                    </div>
                                 )}
                              </div>
                           ))
                        )}
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}
