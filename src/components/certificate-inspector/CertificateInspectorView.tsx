'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ScrollText, ShieldCheck, Trash2, CalendarDays, Key, Server, Hash, FileCheck2, AlertCircle, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { usePersistence } from '@/contexts/PersistenceContext';
import { STORAGE_KEYS } from '@/constants/storage';
import { parseCertificate, CertificateDetails } from '@/lib/certificate-utils';

export function CertificateInspectorView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [input, setInput] = useState('');
   const [parsedCert, setParsedCert] = useState<CertificateDetails | null>(null);
   const [error, setError] = useState<string | null>(null);

   // Load persistence
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const stored = localStorage.getItem(STORAGE_KEYS.CERTIFICATE_INSPECTOR_INPUT);
         if (stored) {
            setInput(stored);
         }
      }
   }, [isPersistenceEnabled]);

   // Save persistence
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      localStorage.setItem(STORAGE_KEYS.CERTIFICATE_INSPECTOR_INPUT, input);
   }, [input, isPersistenceEnabled]);

   // Parse automatically when input changes
   useEffect(() => {
      if (!input.trim()) {
         setParsedCert(null);
         setError(null);
         return;
      }

      if (!input.includes('-----BEGIN CERTIFICATE-----')) {
         setError('Input does not appear to be a valid PEM formatted certificate. Missing "-----BEGIN CERTIFICATE-----".');
         setParsedCert(null);
         return;
      }

      try {
         const details = parseCertificate(input);
         setParsedCert(details);
         setError(null);
      } catch (err: unknown) {
         setParsedCert(null);
         setError(err instanceof Error ? err.message : 'Failed to parse certificate.');
      }
   }, [input]);

   const loadSample = () => {
      setInput(`-----BEGIN CERTIFICATE-----
MIIDQDCCAigCCQDgJDxL9tNakDANBgkqhkiG9w0BAQsFADBiMQswCQYDVQQGEwJV
UzELMAkGA1UECAwCQ0ExCzAJBgNVBAcMAlNGMRIwEAYDVQQKDAlEZXZFZGl0b3Ix
DjAMBgNVBAsMBVRvb2xzMRUwEwYDVQQDDAxkZXZlZGl0b3IuaW8wHhcNMjYwMzEx
MTkxODI1WhcNMjcwMzExMTkxODI1WjBiMQswCQYDVQQGEwJVUzELMAkGA1UECAwC
Q0ExCzAJBgNVBAcMAlNGMRIwEAYDVQQKDAlEZXZFZGl0b3IxDjAMBgNVBAsMBVRv
b2xzMRUwEwYDVQQDDAxkZXZlZGl0b3IuaW8wggEiMA0GCSqGSIb3DQEBAQUAA4IB
DwAwggEKAoIBAQDy/dd68U8T9H2Dr25z8M/t8GWOo9oguLAzNclZz7f9gqmqlBAJ
r4DFHBcvYUM7Zgrv8sS23jaCk2gl6+wSOr1VGYsq9CwZo9KFzosqZVIeF2ZwudR0
5GddI39opKIvAsKmKK2FuL8jUvz7El/qnlcbxCsZoWejrC5uXl4x9goifvDA6LZn
P5l7nGY84zHLoTrib67glHk7VPAckUCicLO9nbM5Ss6fTO0/4moP6R23MwG+d+hF
82OeOBlqEkJrV6RYdhR/1cFPu5sO+fEMqIsVb5Bg+eRmR/zTUTNCOntrQKPgjiEZ
x6Y2jHYTDR77IQcovhRbKOqDfGDmlwj5NveBAgMBAAEwDQYJKoZIhvcNAQELBQAD
ggEBAMgm+g8ujr+4LYPPoGB8jbIE6ftnHjPE+bwynNfLh/7nPbl6OBp3EaoFKxpD
aU7DMKigQf2Bg7rKdNOWNrfYoEI3iWRe8RxlH3A3g4zb0y0B6El2/LHYn5Ntj9Au
gEp+HAT4l6Pn5ZONIkKVTmPu+eI7mpAhABLijhRwlvcfJNgGu67SrFBK03bknwnI
TAIQXoVBqHF9uzTfZKXSj8L+PduzXTd+xobe6ApwHvIs17zIB6G82H/G56GE3hWy
nIlbue7KUQIATWoV+R90HcObv8o4un/hCeeAi9zaX3RRZ32epjmynIRutItD5CZp
VcGyMVUGvVn82U5J7j8fZSvIoSY=
-----END CERTIFICATE-----`);
   };

   return (
      <div className="w-full h-full flex flex-col bg-background border border-border rounded-xl shadow-sm overflow-hidden">
         {/* Toolbar */}
         <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-border bg-background shrink-0">
            <div className="flex items-center gap-2 text-foreground">
               <ShieldCheck className="h-4 w-4 text-brand" />
               <span className="text-sm font-semibold">Certificate Inspector</span>
            </div>

            <div className="flex items-center gap-2">
               <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] font-bold uppercase tracking-wider">
                  <FileCheck2 className="w-3 h-3" /> Fully Local
               </div>

               {!input && (
                  <Button
                     variant="ghost"
                     size="sm"
                     onClick={loadSample}
                     className="h-8 text-xs text-muted-foreground hover:text-foreground"
                  >
                     <FlaskConical className="w-4 h-4 mr-1.5" />
                     Sample
                  </Button>
               )}

               {input && (
                  <Button
                     variant="ghost"
                     size="sm"
                     onClick={() => setInput('')}
                     className="h-8 text-xs text-muted-foreground hover:text-foreground"
                  >
                     <Trash2 className="w-4 h-4 mr-1.5" />
                     Clear
                  </Button>
               )}
            </div>
         </div>

         {/* Layout container */}
         <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-background">
            {/* Split Panel Left (Input) */}
            <div className="w-full md:w-1/2 flex flex-col border-b md:border-b-0 md:border-r border-border min-h-0 h-[40vh] md:h-full">
               <div className="px-4 border-b border-border bg-muted/10 flex items-center justify-between h-9 shrink-0 relative z-10">
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">PEM Input</span>
               </div>
               <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste PEM certificate here..."
                  className="flex-1 resize-none border-0 focus-visible:ring-0 rounded-none bg-background font-mono text-xs p-4"
               />
            </div>

            {/* Split Panel Right (Results) */}
            <div className="w-full md:w-1/2 flex flex-col min-h-0 h-[60vh] md:h-full overflow-y-auto bg-muted/10 relative">
               <div className="px-4 border-b border-border bg-muted/30 sticky top-0 z-10 flex items-center justify-between backdrop-blur-md h-9 shrink-0">
                  <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Parsed Details</span>
               </div>

               <div className="p-4 md:p-6 pb-20">
                  {error ? (
                     <div className="flex flex-col items-center justify-center p-8 text-center bg-destructive/5 rounded-xl border border-destructive/20 mt-4">
                        <AlertCircle className="w-8 h-8 text-destructive mb-3" />
                        <span className="text-sm font-medium text-destructive">{error}</span>
                     </div>
                  ) : parsedCert ? (
                     <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
                        {/* Certificate Header */}
                        <div className="p-4 bg-background border border-border rounded-xl">
                           <div className="flex items-center gap-2 mb-4">
                              <Server className="w-5 h-5 text-brand" />
                              <h3 className="font-bold">Subject Details</h3>
                           </div>
                           <div className="grid gap-2 text-sm font-mono break-all">
                              {Object.entries(parsedCert.subject).map(([k, v]) => (
                                 <div key={k} className="flex flex-col sm:flex-row sm:items-start sm:gap-4">
                                    <span className="text-muted-foreground w-full sm:w-32 shrink-0">{k}</span>
                                    <span className="font-medium text-foreground">{v}</span>
                                 </div>
                              ))}
                           </div>
                        </div>

                        {/* Issuer */}
                        <div className="p-4 bg-background border border-border rounded-xl">
                           <div className="flex items-center gap-2 mb-4">
                              <ShieldCheck className="w-5 h-5 text-indigo-500" />
                              <h3 className="font-bold">Issuer</h3>
                           </div>
                           <div className="grid gap-2 text-sm font-mono break-all">
                              {Object.entries(parsedCert.issuer).map(([k, v]) => (
                                 <div key={k} className="flex flex-col sm:flex-row sm:items-start sm:gap-4">
                                    <span className="text-muted-foreground w-full sm:w-32 shrink-0">{k}</span>
                                    <span className="font-medium text-foreground">{v}</span>
                                 </div>
                              ))}
                           </div>
                        </div>

                        {/* Validity Dates */}
                        <div className="p-4 bg-background border border-border rounded-xl">
                           <div className="flex items-center gap-2 mb-4">
                              <CalendarDays className="w-5 h-5 text-emerald-500" />
                              <h3 className="font-bold">Validity</h3>
                           </div>
                           <div className="grid gap-3 text-sm font-mono">
                              <div>
                                 <span className="text-muted-foreground block text-xs uppercase mb-1">Not Before</span>
                                 <span className="font-medium">{new Date(parsedCert.validFrom).toUTCString()}</span>
                              </div>
                              <div>
                                 <span className="text-muted-foreground block text-xs uppercase mb-1">Not After</span>
                                 <span className="font-medium">{new Date(parsedCert.validTo).toUTCString()}</span>
                              </div>
                           </div>
                        </div>

                        {/* Public Key & Crypto */}
                        <div className="p-4 bg-background border border-border rounded-xl">
                           <div className="flex items-center gap-2 mb-4">
                              <Key className="w-5 h-5 text-amber-500" />
                              <h3 className="font-bold">Cryptography</h3>
                           </div>
                           <div className="grid gap-2 text-sm font-mono">
                              <div className="flex justify-between border-b border-border/50 pb-2">
                                 <span className="text-muted-foreground">Signature Algorithm</span>
                                 <span>{parsedCert.signatureAlgorithm}</span>
                              </div>
                              <div className="flex justify-between border-b border-border/50 py-2">
                                 <span className="text-muted-foreground">Public Key</span>
                                 <span>{parsedCert.publicKey.algorithm} {parsedCert.publicKey.bitLength ? `(${parsedCert.publicKey.bitLength} Bits)` : ''}</span>
                              </div>
                              <div className="flex flex-col py-2 gap-1 break-all">
                                 <span className="text-muted-foreground">Serial Number</span>
                                 <span className="text-xs">{parsedCert.serialNumber}</span>
                              </div>
                           </div>
                        </div>

                        {/* Fingerprints */}
                        <div className="p-4 bg-background border border-border rounded-xl">
                           <div className="flex items-center gap-2 mb-4">
                              <Hash className="w-5 h-5 text-rose-500" />
                              <h3 className="font-bold">Fingerprints</h3>
                           </div>
                           <div className="grid gap-4 text-xs font-mono break-all">
                              <div>
                                 <span className="text-muted-foreground block font-bold mb-1">SHA-256</span>
                                 <span className="bg-muted/50 p-2 rounded-md block border border-border">{parsedCert.fingerprints.sha256}</span>
                              </div>
                              <div>
                                 <span className="text-muted-foreground block font-bold mb-1">SHA-1</span>
                                 <span className="bg-muted/50 p-2 rounded-md block border border-border">{parsedCert.fingerprints.sha1}</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  ) : (
                     <div className="flex flex-col items-center justify-center p-12 text-center text-muted-foreground h-full min-h-[300px]">
                        <div className="w-20 h-20 mb-6 rounded-full bg-muted/30 flex items-center justify-center border border-border/50">
                           <ScrollText className="w-10 h-10 text-muted-foreground/30" />
                        </div>
                        <h3 className="text-lg font-medium text-foreground mb-2">Awaiting Certificate</h3>
                        <p className="text-sm max-w-[280px]">Paste a PEM/CRT file encoded in Base64 on the left to see its dissected output.</p>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
}
