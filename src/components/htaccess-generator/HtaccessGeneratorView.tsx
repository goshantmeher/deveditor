'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Copy, FileText, ServerCog, RotateCcw } from 'lucide-react';

import { usePersistence } from '@/contexts/PersistenceContext';
import { STORAGE_KEYS } from '@/constants/storage';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type SubdomainRule = 'none' | 'force-www' | 'force-non-www';
type TlsRule = 'none' | 'force-https';

export function HtaccessGeneratorView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   const [serverType, setServerType] = useState<'apache' | 'nginx'>('apache');
   const [domain, setDomain] = useState('example.com');
   const [subdomain, setSubdomain] = useState<SubdomainRule>('none');
   const [tls, setTls] = useState<TlsRule>('force-https');

   const [customRules, setCustomRules] = useState<{ from: string; to: string }[]>([]);

   const [output, setOutput] = useState('');
   const [isCopied, setIsCopied] = useState(false);

   // Load state from localStorage
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         try {
            const stored = localStorage.getItem(STORAGE_KEYS.HTACCESS_GENERATOR_INPUT);
            if (stored) {
               const parsed = JSON.parse(stored);
               setServerType(parsed.serverType || 'apache');
               setDomain(parsed.domain || 'example.com');
               setSubdomain(parsed.subdomain || 'none');
               setTls(parsed.tls || 'force-https');
               setCustomRules(parsed.customRules || []);
            }
         } catch {
            // Ignore
         }
      }
   }, [isPersistenceEnabled]);

   // Save state
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      localStorage.setItem(
         STORAGE_KEYS.HTACCESS_GENERATOR_INPUT,
         JSON.stringify({ serverType, domain, subdomain, tls, customRules })
      );
   }, [serverType, domain, subdomain, tls, customRules, isPersistenceEnabled]);

   // Generate configuration
   useEffect(() => {
      const generateApache = () => {
         let cfg = '<IfModule mod_rewrite.c>\nRewriteEngine On\n';
         cfg += 'RewriteBase /\n\n';

         const host = domain.replace(/^www\./, '').trim() || 'example.com';
         const apacheScheme = tls === 'force-https' ? 'https' : '%{REQUEST_SCHEME}';

         if (tls === 'force-https') {
            cfg += '# Force HTTPS\n';
            cfg += 'RewriteCond %{HTTPS} off\n';
            cfg += 'RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]\n\n';
         }

         if (subdomain === 'force-www') {
            cfg += '# Force www\n';
            cfg += `RewriteCond %{HTTP_HOST} ^${host.replace(/\./g, '\\.')} [NC]\n`;
            cfg += `RewriteRule ^(.*)$ ${apacheScheme}://www.${host}/$1 [L,R=301]\n\n`;
         } else if (subdomain === 'force-non-www') {
            cfg += '# Force non-www\n';
            cfg += `RewriteCond %{HTTP_HOST} ^www\\.${host.replace(/\./g, '\\.')} [NC]\n`;
            cfg += `RewriteRule ^(.*)$ ${apacheScheme}://${host}/$1 [L,R=301]\n\n`;
         }

         if (customRules.length > 0) {
            cfg += '# Custom Redirects\n';
            customRules.forEach((r) => {
               if (r.from && r.to) {
                  const fromPath = r.from.startsWith('/') ? r.from.substring(1) : r.from;
                  cfg += `RewriteRule ^${fromPath}$ ${r.to} [R=301,L]\n`;
               }
            });
            cfg += '\n';
         }

         cfg += '</IfModule>';
         return cfg;
      };

      const generateNginx = () => {
         let cfg = '';
         const host = domain.replace(/^www\./, '').trim() || 'example.com';
         const nginxScheme = tls === 'force-https' ? 'https' : '$scheme';

         if (tls === 'force-https' || subdomain !== 'none') {
            cfg += tls === 'force-https' ? '# Redirect HTTP to HTTPS & resolve WWW\n' : '# Resolve WWW/non-WWW\n';
            cfg += 'server {\n';
            cfg += '    listen 80;\n';

            if (subdomain === 'force-www') {
               cfg += `    server_name ${host} www.${host};\n`;
               cfg += `    return 301 ${nginxScheme}://www.${host}$request_uri;\n`;
            } else if (subdomain === 'force-non-www') {
               cfg += `    server_name ${host} www.${host};\n`;
               cfg += `    return 301 ${nginxScheme}://${host}$request_uri;\n`;
            } else {
               // Only for force-https
               cfg += `    server_name ${host};\n`;
               cfg += `    return 301 https://$host$request_uri;\n`;
            }
            cfg += '}\n\n';
         }

         if (customRules.length > 0) {
            cfg += '# Include this inside your main server block (listen 443;)\n';
            cfg += 'server {\n';
            cfg += `    server_name ${subdomain === 'force-www' ? 'www.' : ''}${host};\n`;
            cfg += '    # ... other configs ...\n\n';
            cfg += '    # Custom Redirects\n';
            customRules.forEach((r) => {
               if (r.from && r.to) {
                  const fromPath = r.from.startsWith('/') ? r.from : `/${r.from}`;
                  cfg += `    rewrite ^${fromPath}$ ${r.to} permanent;\n`;
               }
            });
            cfg += '}\n';
         }

         return cfg || '# No redirects configured.';
      };

      if (serverType === 'apache') {
         setOutput(generateApache());
      } else {
         setOutput(generateNginx());
      }
   }, [serverType, domain, subdomain, tls, customRules]);

   const addCustomRule = () => {
      setCustomRules([...customRules, { from: '', to: '' }]);
   };

   const updateRule = (index: number, field: 'from' | 'to', value: string) => {
      const newRules = [...customRules];
      newRules[index][field] = value;
      setCustomRules(newRules);
   };

   const removeRule = (index: number) => {
      const newRules = [...customRules];
      newRules.splice(index, 1);
      setCustomRules(newRules);
   };

   const handleClear = () => {
      setDomain('example.com');
      setSubdomain('none');
      setTls('force-https');
      setCustomRules([]);
   };

   const copyOutput = async () => {
      if (!output) return;
      try {
         await navigator.clipboard.writeText(output);
         setIsCopied(true);
         setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
         console.error('Failed to copy text: ', err);
      }
   };

   return (
      <div className="w-full flex object-contain flex-col md:flex-row gap-6 max-w-6xl mx-auto p-4 md:p-8">
         {/* Left half: Controls */}
         <div className="w-full md:w-[450px] shrink-0 flex flex-col gap-6">
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                     <ServerCog className="w-5 h-5 text-purple-500" />
                  </div>
                  <div>
                     <h1 className="font-bold tracking-tight text-foreground">Rule Generator</h1>
                     <p className="text-xs text-muted-foreground">Configure Web Server Logic</p>
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
               <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                     Target Server Stack
                  </label>
                  <Tabs
                     value={serverType}
                     onValueChange={(v) => setServerType(v as 'apache' | 'nginx')}
                     className="w-full"
                  >
                     <TabsList className="w-full grid grid-cols-2">
                        <TabsTrigger value="apache">Apache (.htaccess)</TabsTrigger>
                        <TabsTrigger value="nginx">Nginx (nginx.conf)</TabsTrigger>
                     </TabsList>
                  </Tabs>
               </div>

               <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                     Primary Local Domain Name
                  </label>
                  <Input
                     value={domain}
                     onChange={(e) => setDomain(e.target.value)}
                     placeholder="example.com"
                     className="font-mono text-sm"
                  />
               </div>

               <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                     Subdomain Redirection rules
                  </label>
                  <Select value={subdomain} onValueChange={(v) => setSubdomain(v as SubdomainRule)}>
                     <SelectTrigger>
                        <SelectValue placeholder="Select rule" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="none">No Rewrite Rule</SelectItem>
                        <SelectItem value="force-www">Force explicit www (example.com → www...)</SelectItem>
                        <SelectItem value="force-non-www">
                           Force explicit non-www (www.example... → example...)
                        </SelectItem>
                     </SelectContent>
                  </Select>
               </div>

               <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                     Encrypted Traffic TLS
                  </label>
                  <Select value={tls} onValueChange={(v) => setTls(v as TlsRule)}>
                     <SelectTrigger>
                        <SelectValue placeholder="Select rule" />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectItem value="none">Leave Traffic Unenforced</SelectItem>
                        <SelectItem value="force-https">Direct All Traffic via HTTPS</SelectItem>
                     </SelectContent>
                  </Select>
               </div>
            </div>

            <div className="space-y-4 bg-card rounded-xl border border-border p-5 shadow-sm">
               <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                     Targeted 301 Routes
                  </label>
                  <Button variant="outline" size="sm" onClick={addCustomRule} className="h-7 text-xs font-medium">
                     + Add Route
                  </Button>
               </div>

               <div className="space-y-3">
                  {customRules.map((rule, idx) => (
                     <div key={idx} className="flex gap-2 items-start bg-muted/30 p-2 rounded-lg border border-border">
                        <div className="flex-1 space-y-2">
                           <Input
                              placeholder="/old-path.html"
                              value={rule.from}
                              onChange={(e) => updateRule(idx, 'from', e.target.value)}
                              className="h-8 text-xs font-mono"
                           />
                           <Input
                              placeholder="/new-path"
                              value={rule.to}
                              onChange={(e) => updateRule(idx, 'to', e.target.value)}
                              className="h-8 text-xs font-mono"
                           />
                        </div>
                        <Button
                           variant="ghost"
                           size="icon"
                           onClick={() => removeRule(idx)}
                           className="h-8 w-8 shrink-0 text-muted-foreground hover:text-red-500"
                        >
                           &times;
                        </Button>
                     </div>
                  ))}
                  {customRules.length === 0 && (
                     <div className="text-sm text-center text-muted-foreground py-4 italic border border-dashed rounded-lg border-border">
                        No custom hard-redirects applied.
                     </div>
                  )}
               </div>
            </div>
         </div>

         {/* Right half: Output */}
         <div className="flex-1 flex flex-col bg-card border border-border rounded-xl shadow-sm overflow-hidden min-h-[500px]">
            <div className="px-4 py-3 border-b border-border bg-muted/40 flex items-center justify-between">
               <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <FileText className="w-4 h-4 text-purple-500" />
                  Generated {serverType === 'apache' ? '.htaccess' : 'nginx.conf'}
               </div>
               <Button
                  onClick={copyOutput}
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg h-8 px-4 text-xs font-semibold"
               >
                  {isCopied ? <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
                  Copy Code
               </Button>
            </div>
            <div className="flex-1 p-4 bg-[#1e1e1e] dark:bg-[#1e1e1e] overflow-auto">
               <pre className="text-sm text-green-400 font-mono leading-relaxed whitespace-pre-wrap">{output}</pre>
            </div>
         </div>
      </div>
   );
}
