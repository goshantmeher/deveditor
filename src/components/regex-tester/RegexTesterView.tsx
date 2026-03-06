'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RegexRequest, RegexResponse, validateRegex } from '@/lib/regex-utils';
import { Copy, CheckCircle2, AlertTriangle, ShieldAlert, RefreshCw, Info, Braces, BookOpen, Library } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

// Pre-defined patterns for the Pattern Library
const PATTERN_LIBRARY = [
   {
      name: 'Email Address',
      pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
      flags: 'g',
      description: 'Matches standard email addresses like user@domain.com. Validates the local part (before @), domain name, and top-level domain (2+ characters).',
      example: 'Contact us at hello@example.com or support@my-company.co.uk\nInvalid: user@, @domain.com, user@.com',
   },
   {
      name: 'Phone Number (US)',
      pattern: '(?:\\+?1[-.\\s]?)?\\(?[0-9]{3}\\)?[-.\\s]?[0-9]{3}[-.\\s]?[0-9]{4}',
      flags: 'g',
      description: 'Matches US phone numbers in common formats: (123) 456-7890, 123-456-7890, +1 123 456 7890, and more. Handles optional country code, parentheses, dashes, dots, and spaces.',
      example: 'Call me at (555) 123-4567 or +1-800-555-0199\nAlternatives: 555.123.4567, 555 123 4567\nInvalid: 123-45-6789, 12345',
   },
   {
      name: 'Phone Number (International)',
      pattern: '\\+?[0-9]{1,4}[-.\\s]?\\(?[0-9]{1,4}\\)?[-.\\s]?[0-9]{1,4}[-.\\s]?[0-9]{1,9}',
      flags: 'g',
      description: 'Matches international phone numbers with optional country code prefix (+91, +44, etc). Supports various separators like dashes, dots, spaces, and parentheses.',
      example: '+91 98765 43210\n+44 (20) 7946-0958\n+1-212-456-7890\n+81 3-1234-5678',
   },
   {
      name: 'URL / Domain',
      pattern: '(https?:\\/\\/)?([\\da-z\\.-]+)\\.([a-z\\.]{2,6})([\\/\\w \\.-]*)*\\/?',
      flags: 'gi',
      description: 'Matches web URLs and domains with optional protocol (http/https), subdomains, and paths. Supports most common TLDs up to 6 characters.',
      example: 'Visit https://www.example.com/page or http://blog.site.co.uk/post/123\nPlain domain: google.com\nInvalid: ftp://files.com, just-text',
   },
   {
      name: 'IPv4 Address',
      pattern: '(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)',
      flags: 'g',
      description: 'Matches valid IPv4 addresses (four octets 0\u2013255 separated by dots). Each octet is validated to not exceed 255.',
      example: 'Server IPs: 192.168.1.1, 10.0.0.255, 172.16.254.1\nLoopback: 127.0.0.1\nInvalid: 256.1.1.1, 999.999.999.999',
   },
   {
      name: 'IPv6 Address',
      pattern: '(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}',
      flags: 'g',
      description: 'Matches full IPv6 addresses (eight groups of four hex digits separated by colons). Does not match abbreviated forms with :: shorthand.',
      example: '2001:0db8:85a3:0000:0000:8a2e:0370:7334\nfe80:0000:0000:0000:0000:0000:0000:0001\nInvalid: ::1 (abbreviated form)',
   },
   {
      name: 'Date (YYYY-MM-DD)',
      pattern: '\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])',
      flags: 'g',
      description: 'Matches dates in ISO 8601 format (YYYY-MM-DD). Validates month (01-12) and day (01-31) ranges. Does not check for month-specific day limits (e.g., Feb 30).',
      example: 'Meeting on 2024-01-15 and deadline is 2024-12-31\nBirthday: 1990-06-25\nInvalid: 2024-13-01, 2024-00-15',
   },
   {
      name: 'Date (MM/DD/YYYY)',
      pattern: '(0[1-9]|1[0-2])\\/(0[1-9]|[12]\\d|3[01])\\/\\d{4}',
      flags: 'g',
      description: 'Matches US-style dates in MM/DD/YYYY format. Validates month (01-12) and day (01-31) ranges.',
      example: 'Order placed: 03/15/2024, ships by 03/22/2024\nBirthday: 12/25/1995\nInvalid: 13/01/2024, 00/15/2024',
   },
   {
      name: 'Time (HH:MM, 24hr)',
      pattern: '([01]\\d|2[0-3]):[0-5]\\d',
      flags: 'g',
      description: 'Matches time in 24-hour format (HH:MM). Hours range from 00-23, minutes from 00-59.',
      example: 'Meeting at 09:30 and lunch at 12:45\nEnd of day: 17:00, midnight: 00:00\nInvalid: 25:00, 12:60',
   },
   {
      name: 'Credit Card Number',
      pattern: '(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12})',
      flags: 'g',
      description: 'Matches major credit card numbers: Visa (starts with 4), Mastercard (51-55), Amex (34/37), and Discover (6011/65). Validates length per card type.',
      example: 'Visa: 4111111111111111\nMastercard: 5500000000000004\nAmex: 378282246310005\nDiscover: 6011111111111117',
   },
   {
      name: 'UUID v4',
      pattern: '[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}',
      flags: 'gi',
      description: 'Matches UUID version 4 strings. The 3rd group always starts with "4" (version) and the 4th group starts with 8, 9, a, or b (variant).',
      example: 'User ID: 550e8400-e29b-41d4-a716-446655440000\nSession: f47ac10b-58cc-4372-a567-0e02b2c3d479\nInvalid: 550e8400-e29b-31d4-a716-446655440000 (v3)',
   },
   {
      name: 'Hex Color',
      pattern: '#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})\\b',
      flags: 'g',
      description: 'Matches CSS hex color codes in #RGB or #RRGGBB format. The # prefix is required. Case-insensitive for hex digits A-F.',
      example: 'Colors: #FF5733, #3498db, #2ecc71\nShorthand: #F00, #0AF, #333\nInvalid: #GGG, 123456 (no #)',
   },
   {
      name: 'CSS Color (rgb/hsl)',
      pattern: '(?:rgb|hsl)a?\\(\\s*\\d+%?\\s*,\\s*\\d+%?\\s*,\\s*\\d+%?(?:\\s*,\\s*[0-9.]+)?\\s*\\)',
      flags: 'gi',
      description: 'Matches CSS color functions: rgb(), rgba(), hsl(), and hsla(). Supports both integer and percentage values.',
      example: 'Background: rgb(255, 99, 71)\nOverlay: rgba(0, 0, 0, 0.5)\nTheme: hsl(210, 100%, 50%)\nShadow: hsla(0, 0%, 0%, 0.3)',
   },
   {
      name: 'Strong Password',
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
      flags: 'm',
      description: 'Validates strong passwords: minimum 8 characters with at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&). Each line is tested independently.',
      example: 'P@ssw0rd!\nSecure$1xy\nMyP@ss99\npassword\n12345678\nAbcdefgh\nweak',
   },
   {
      name: 'Username',
      pattern: '[a-zA-Z][a-zA-Z0-9_-]{2,15}',
      flags: 'g',
      description: 'Matches usernames that start with a letter, followed by 2-15 alphanumeric characters, underscores, or hyphens. Total length: 3 to 16 characters.',
      example: 'Valid: john_doe, Alice-99, dev_user123\nInvalid: 1user (starts with digit), ab (too short)',
   },
   {
      name: 'URL Slug',
      pattern: '[a-z0-9]+(?:-[a-z0-9]+)*',
      flags: 'g',
      description: 'Matches URL-friendly slugs: lowercase alphanumeric strings separated by single hyphens. Cannot start or end with a hyphen.',
      example: 'Valid slugs: hello-world, my-blog-post-2024, about-us\nFilename: some-page\nInvalid: -leading, trailing-, double--hyphen',
   },
   {
      name: 'HTML Tag',
      pattern: '<\\/?[a-zA-Z][a-zA-Z0-9]*(?:\\s[^>]*)?\\/?>',
      flags: 'g',
      description: 'Matches HTML opening, closing, and self-closing tags with optional attributes. Captures tags like <div>, </span>, <img />, and <a href="...">.',
      example: '<div class="container">\n  <p>Hello <strong>world</strong></p>\n  <img src="photo.jpg" />\n  <br/>\n</div>',
   },
   {
      name: 'MAC Address',
      pattern: '([0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}',
      flags: 'g',
      description: 'Matches MAC (hardware) addresses in colon-separated or hyphen-separated format. Six groups of two hex digits.',
      example: 'WiFi: 00:1A:2B:3C:4D:5E\nEthernet: AA-BB-CC-DD-EE-FF\nInvalid: 00:1A:2B:3C:4D (too short)',
   },
   {
      name: 'Markdown Link',
      pattern: '\\[([^\\]]+)\\]\\(([^)]+)\\)',
      flags: 'g',
      description: 'Matches Markdown-style links in the format [text](url). Captures both the link text and the URL/path separately as groups.',
      example: 'Check the [documentation](https://docs.example.com) for details.\nSee [this guide](/getting-started) or [GitHub](https://github.com).',
   },
   {
      name: 'Hashtag',
      pattern: '#[a-zA-Z_][a-zA-Z0-9_]*',
      flags: 'g',
      description: 'Matches social media-style hashtags: # followed by a letter or underscore, then any combination of letters, digits, and underscores.',
      example: 'Trending: #JavaScript #web_dev #React2024\nAlso: #100DaysOfCode #AI #open_source\nInvalid: #123 (starts with digit), # (empty)',
   },
];

const FLAG_DESCRIPTIONS: Record<string, { name: string; desc: string }> = {
   g: { name: 'Global', desc: 'Find all matches in the string, not just the first one.' },
   i: { name: 'Case Insensitive', desc: 'Letters match both uppercase and lowercase. "a" matches "A".' },
   m: { name: 'Multiline', desc: 'Makes ^ and $ match the start/end of each line, not just the whole string.' },
   s: { name: 'Dot All', desc: 'Makes the dot (.) match newline characters as well.' },
};

const CHEAT_SHEET = [
   { 
      category: 'Character Classes', 
      items: [
         { code: '.', desc: 'Any character except newline' },
         { code: '\\w', desc: 'Word character [a-zA-Z0-9_]' },
         { code: '\\W', desc: 'Not a word character' },
         { code: '\\d', desc: 'Digit character [0-9]' },
         { code: '\\s', desc: 'Whitespace character' },
         { code: '[abc]', desc: 'Any character in set' },
         { code: '[^abc]', desc: 'Not in set' },
         { code: '[a-z]', desc: 'Character range' }
      ]
   },
   {
      category: 'Anchors',
      items: [
         { code: '^', desc: 'Start of string/line' },
         { code: '$', desc: 'End of string/line' },
         { code: '\\b', desc: 'Word boundary' },
         { code: '\\B', desc: 'Not a word boundary' }
      ]
   },
   {
      category: 'Quantifiers',
      items: [
         { code: '*', desc: '0 or more' },
         { code: '+', desc: '1 or more' },
         { code: '?', desc: '0 or 1' },
         { code: '{3}', desc: 'Exactly 3' },
         { code: '{3,}', desc: '3 or more' },
         { code: '{3,5}', desc: 'Between 3 and 5' }
      ]
   },
   {
      category: 'Groups & Lookarounds',
      items: [
         { code: '(abc)', desc: 'Capture group' },
         { code: '(?:abc)', desc: 'Non-capturing group' },
         { code: '(?=abc)', desc: 'Positive lookahead' },
         { code: '(?!abc)', desc: 'Negative lookahead' }
      ]
   }
];

export function RegexTesterView() {
   const [pattern, setPattern] = useState('([a-zA-Z0-9._-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4})');
   const [flags, setFlags] = useState('g');
   const [testString, setTestString] = useState('Hello world!\nYou can contact me at test@example.com or admin@foo.bar.org.');
   
   const [result, setResult] = useState<RegexResponse | null>(null);
   const [isEvaluating, setIsEvaluating] = useState(false);
   const [copiedField, setCopiedField] = useState<string | null>(null);

   const workerRef = useRef<Worker | null>(null);
   const timeoutRef = useRef<NodeJS.Timeout | null>(null);
   const textareaRef = useRef<HTMLTextAreaElement | null>(null);
   const highlightRef = useRef<HTMLDivElement | null>(null);

   // Validation state
   const syntaxError = useMemo(() => validateRegex(pattern, flags), [pattern, flags]);

   // Create or replace worker for clean execution
   const getWorker = useCallback(() => {
      if (!workerRef.current) {
         workerRef.current = new Worker(new URL('@/workers/regex.worker', import.meta.url));
      }
      return workerRef.current;
   }, []);

   const evaluateRun = useCallback(() => {
      if (syntaxError) {
         setResult({ id: 'err', error: syntaxError });
         return;
      }

      const reqId = Date.now().toString();
      setIsEvaluating(true);

      const worker = getWorker();

      // Setup response handler for this evaluation
      worker.onmessage = (e: MessageEvent<RegexResponse>) => {
         if (e.data.id === reqId) {
            setResult(e.data);
            setIsEvaluating(false);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
         }
      };

      // Catastrophic Backtracking Prevention: Timeout after 2.5 seconds
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
         worker.terminate();
         workerRef.current = null; // Force recreation on next run
         setResult({ id: reqId, error: 'Execution timeout: Pattern caused catastrophic backtracking or took too long (>2500ms).', isTimeout: true });
         setIsEvaluating(false);
      }, 2500);

      const request: RegexRequest = { id: reqId, pattern, flags, testString };
      worker.postMessage(request);
   }, [pattern, flags, testString, syntaxError, getWorker]);

   // Auto-evaluate when inputs change (debounced)
   useEffect(() => {
      const timer = setTimeout(() => evaluateRun(), 200);
      return () => clearTimeout(timer);
   }, [evaluateRun]);

   // Cleanup worker on unmount
   useEffect(() => {
      return () => {
         if (workerRef.current) workerRef.current.terminate();
         if (timeoutRef.current) clearTimeout(timeoutRef.current);
      };
   }, []);

   const copyToClipboard = async (text: string, id: string) => {
      try {
         await navigator.clipboard.writeText(text);
         setCopiedField(id);
         setTimeout(() => setCopiedField(null), 2000);
      } catch (err) {
         console.error('Failed to copy', err);
      }
   };

   const toggleFlag = (char: string) => {
      setFlags(prev => prev.includes(char) ? prev.replace(char, '') : prev + char);
   };

   // Sync scroll positions between textarea and highlight overlay
   const handleScroll = useCallback(() => {
      if (textareaRef.current && highlightRef.current) {
         highlightRef.current.scrollTop = textareaRef.current.scrollTop;
         highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
      }
   }, []);

   // Renders highlighted text where matches are wrapped in colored spans
   // Note: For fully robust highlighting of overlapping capture groups, we'd use CodeMirror/Lezer.
   // Given constraints, we'll implement a fast string-tokenization approach for Group 0 (full matches).
   const renderHighlightedText = () => {
      if (!result || !result.matches || result.matches.length === 0 || syntaxError) {
         return <span className="text-transparent">{testString}</span>;
      }

      const nodes: React.ReactNode[] = [];
      let lastIndex = 0;

      result.matches.forEach((match, i) => {
         if (match.index > lastIndex) {
            nodes.push(<span key={`text-${i}`} className="text-transparent">{testString.slice(lastIndex, match.index)}</span>);
         }
         
         const isEven = i % 2 === 0;
         nodes.push(
            <span 
               key={`match-${i}`} 
               className={`rounded-sm shadow-sm ${isEven ? 'bg-indigo-500/20 text-transparent' : 'bg-emerald-500/20 text-transparent'}`}
               title={`Match ${i + 1}`}
            >
               {testString.slice(match.index, match.index + match.length)}
            </span>
         );
         lastIndex = match.index + match.length;
      });

      if (lastIndex < testString.length) {
         nodes.push(<span key="text-end" className="text-transparent">{testString.slice(lastIndex)}</span>);
      }

      return nodes;
   };

   return (
      <div className="flex flex-col h-full w-full bg-background tracking-normal">
         
         {/* Top Toolbar: Pattern & Flags */}
         <div className="flex flex-col border-b border-border bg-muted/10 z-20">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-background/50 backdrop-blur-sm">
               <div className="flex items-center gap-2">
                  <Braces className="w-4 h-4 text-indigo-500" />
                  <h1 className="text-sm font-semibold">RegEx Tester</h1>
                  {isEvaluating && <RefreshCw className="w-3.5 h-3.5 text-muted-foreground animate-spin ml-2" />}
               </div>
               <div className="flex items-center gap-3">
                  {result && !result.error && (
                     <div className="text-xs text-muted-foreground font-mono bg-muted px-2 py-0.5 rounded-full">
                        {result.matches?.length || 0} match{(result.matches?.length === 1) ? '' : 'es'} 
                        <span className="opacity-50 ml-1">({result.executionTimeMs?.toFixed(1) || 0}ms)</span>
                     </div>
                  )}
               </div>
            </div>

            <div className="p-4 flex flex-col md:flex-row gap-4 items-start md:items-center relative">
               <div className="flex-1 flex w-full relative group">
                  <div className="flex items-center px-3 bg-muted border border-r-0 border-border rounded-l-md text-muted-foreground font-mono text-lg select-none">/</div>
                  <Input 
                     value={pattern}
                     onChange={(e) => setPattern(e.target.value)}
                     className={`rounded-none border-x-0 font-mono text-base md:text-lg h-12 shadow-inner focus-visible:ring-1 z-10 ${syntaxError ? 'text-red-500 focus-visible:ring-red-500' : 'text-foreground'}`}
                     placeholder="Enter regular expression..."
                     spellCheck={false}
                  />
                  <div className="flex gap-0 relative">
                     <div className="flex items-center px-1 bg-muted border border-border border-l-0 text-muted-foreground font-mono text-lg select-none">/</div>
                     <Input 
                        value={flags}
                        onChange={(e) => setFlags(e.target.value.toLowerCase().replace(/[^gimsuy]/g, ''))}
                        className="w-24 rounded-l-none font-mono text-indigo-500 tracking-widest h-12"
                        placeholder="flags"
                        spellCheck={false}
                        maxLength={6}
                     />
                  </div>
               </div>

               {/* Quick Flags */}
               <div className="flex gap-1 bg-muted p-1 rounded-md shrink-0 border border-border/50">
                  {['g', 'i', 'm', 's'].map(f => (
                     <Tooltip key={f}>
                        <TooltipTrigger asChild>
                           <button
                              onClick={() => toggleFlag(f)}
                              className={`w-8 h-8 rounded text-xs font-mono transition-colors ${flags.includes(f) ? 'bg-background text-indigo-500 shadow-sm font-bold' : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'}`}
                           >
                              {f}
                           </button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="max-w-[220px] text-center">
                           <p className="font-semibold">{FLAG_DESCRIPTIONS[f].name} ({f})</p>
                           <p className="opacity-80 mt-0.5">{FLAG_DESCRIPTIONS[f].desc}</p>
                        </TooltipContent>
                     </Tooltip>
                  ))}
               </div>
            </div>

            {/* Error Banner */}
            {syntaxError && (
               <div className="px-4 py-2 bg-red-500/10 border-t border-red-500/20 flex items-center gap-2 text-xs text-red-500 font-medium z-10">
                  <AlertTriangle className="w-3.5 h-3.5" /> Syntax Error: {syntaxError}
               </div>
            )}
            {result?.isTimeout && (
               <div className="px-4 py-2 bg-amber-500/10 border-t border-amber-500/20 flex items-center gap-2 text-xs text-amber-500 font-medium z-10">
                  <ShieldAlert className="w-3.5 h-3.5" /> Worker Terminated: {result.error}
               </div>
            )}
         </div>

         {/* Three-pane layout */}
         <div className="flex-1 flex flex-col lg:flex-row min-h-0 bg-background divide-y lg:divide-y-0 lg:divide-x divide-border overflow-y-auto lg:overflow-hidden">
            
            {/* Left: Test String */}
            <div className="flex-1 lg:flex-4 flex flex-col min-h-[200px] lg:min-h-0 relative group isolate">
               <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-background/95 backdrop-blur z-20">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Test String</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(testString, 'text')}>
                     {copiedField === 'text' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </Button>
               </div>
               <div className="flex-1 relative overflow-hidden">
                  {/* Underlay for colored highlights - must match textarea styles exactly */}
                  <div 
                     ref={highlightRef}
                     className="absolute inset-0 pointer-events-none overflow-hidden p-4 font-mono text-base md:text-sm leading-relaxed whitespace-pre-wrap break-words z-0" 
                     aria-hidden="true"
                  >
                     {renderHighlightedText()}
                  </div>
                  <Textarea
                     ref={textareaRef}
                     value={testString}
                     onChange={(e) => setTestString(e.target.value)}
                     onScroll={handleScroll}
                     className="w-full h-full min-h-[200px] lg:min-h-[300px] bg-transparent text-foreground caret-foreground resize-none border-0 focus-visible:ring-0 p-4 absolute inset-0 font-mono text-base md:text-sm leading-relaxed shadow-none z-10"
                     spellCheck={false}
                  />
               </div>
            </div>

            {/* Middle: Match Results */}
            <div className="flex-1 lg:flex-3 flex flex-col min-h-[180px] lg:min-h-0 bg-muted/5 z-10">
               <div className="flex items-center justify-between px-4 py-2 border-b border-border/50 bg-background/95 backdrop-blur shrink-0 z-20">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Match Results</span>
               </div>
               <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {(!result || !result.matches || result.matches.length === 0) ? (
                     <div className="flex flex-col items-center justify-center h-full text-muted-foreground opacity-60">
                        <Info className="w-8 h-8 mb-2" />
                        <p className="text-sm">No matches found</p>
                     </div>
                  ) : (
                     result.matches.map((match, idx) => (
                        <div key={idx} className="bg-background border border-border rounded-lg shadow-sm overflow-hidden text-sm">
                           <div className="bg-muted px-3 py-1.5 border-b border-border flex items-center justify-between">
                              <span className="font-bold text-xs text-foreground">Match {idx + 1}</span>
                              <span className="text-[10px] text-muted-foreground font-mono bg-background px-1.5 py-0.5 rounded border border-border/50">
                                 {match.index}-{match.index + match.length}
                              </span>
                           </div>
                           <div className="divide-y divide-border text-sm font-mono break-all">
                              <div className="grid grid-cols-12 hover:bg-muted/50 transition-colors">
                                 <div className="col-span-12 p-2 px-3 border-l-4 border-l-indigo-500 text-foreground">
                                    <span className="text-indigo-500 mr-2 text-xs font-sans font-medium uppercase min-w-[30px] inline-block">Full</span> 
                                    {match.fullMatch}
                                 </div>
                              </div>
                              {match.groups.map((group, gIdx) => (
                                 <div key={gIdx} className="grid grid-cols-12 hover:bg-muted/50 transition-colors text-muted-foreground">
                                    <div className="col-span-12 p-1.5 px-3 border-l-4 border-l-emerald-500/50 pl-5 text-[13px]">
                                       <span className="text-emerald-500/70 mr-2 text-[10px] font-sans font-semibold uppercase min-w-[30px] inline-block">G{gIdx + 1}</span> 
                                       {group.value === undefined ? <span className="italic opacity-50">undefined</span> : group.value}
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>
                     ))
                  )}
               </div>
            </div>

            {/* Right: Sidebar (Reference) */}
            <div className="flex-1 lg:flex-2 flex flex-col min-h-[200px] lg:min-h-0 bg-background z-10">
               <Tabs defaultValue="cheatsheet" className="flex flex-col h-full w-full">
                  <TabsList className="w-full justify-start rounded-none border-b border-border h-auto py-0 bg-background/95 backdrop-blur shrink-0 px-2 space-x-2">
                     <TabsTrigger value="cheatsheet" className="py-2.5 data-[state=active]:bg-muted/50 data-[state=active]:shadow-none data-[state=active]:font-semibold rounded-none">
                        <BookOpen className="w-3.5 h-3.5 mr-1.5" /> Cheat Sheet
                     </TabsTrigger>
                     <TabsTrigger value="library" className="py-2.5 data-[state=active]:bg-muted/50 data-[state=active]:shadow-none data-[state=active]:font-semibold rounded-none">
                        <Library className="w-3.5 h-3.5 mr-1.5" /> Patterns
                     </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="cheatsheet" className="flex-1 overflow-y-auto p-0 m-0 border-none outline-none">
                     <div className="divide-y divide-border">
                        {CHEAT_SHEET.map((section, idx) => (
                           <div key={idx} className="p-4 space-y-3">
                              <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{section.category}</h3>
                              <div className="grid gap-2">
                                 {section.items.map((item, i) => (
                                    <button
                                       key={i}
                                       onClick={() => setPattern(prev => prev + item.code)}
                                       className="flex items-start justify-between p-2 rounded hover:bg-muted text-left transition-colors border border-transparent hover:border-border/50 group"
                                       title={`Append ${item.code} to pattern`}
                                    >
                                       <code className="text-indigo-500 dark:text-indigo-400 font-mono text-xs font-bold px-1.5 py-0.5 bg-indigo-500/10 rounded">{item.code}</code>
                                       <span className="text-xs text-muted-foreground mt-0.5 ml-3 flex-1">{item.desc}</span>
                                    </button>
                                 ))}
                              </div>
                           </div>
                        ))}
                     </div>
                  </TabsContent>

                  <TabsContent value="library" className="flex-1 overflow-y-auto p-4 m-0 border-none outline-none">
                     <div className="space-y-2">
                        {PATTERN_LIBRARY.map((libOpts, i) => {
                           const isActive = pattern === libOpts.pattern;
                           return (
                              <div 
                                 key={i} 
                                 className={`p-3 rounded-lg border shadow-sm transition-all cursor-pointer group ${
                                    isActive 
                                       ? 'border-indigo-500/50 bg-indigo-500/5 ring-1 ring-indigo-500/20' 
                                       : 'border-border bg-card hover:border-indigo-500/30'
                                 }`}
                                 onClick={() => {
                                    setPattern(libOpts.pattern);
                                    setFlags(libOpts.flags || 'g');
                                    if (libOpts.example) {
                                       setTestString(libOpts.example);
                                    }
                                 }}
                              >
                                 <div className={`text-sm font-semibold mb-1 transition-colors ${isActive ? 'text-indigo-500' : 'group-hover:text-indigo-500'}`}>{libOpts.name}</div>
                                 <p className="text-[11px] text-muted-foreground mb-2 leading-relaxed">{libOpts.description}</p>
                                 <code className="block text-[10px] font-mono text-muted-foreground break-all bg-muted p-1.5 rounded line-clamp-2">
                                    /{libOpts.pattern}/{libOpts.flags}
                                 </code>
                              </div>
                           );
                        })}
                     </div>
                  </TabsContent>
               </Tabs>
            </div>
         </div>
      </div>
   );
}
