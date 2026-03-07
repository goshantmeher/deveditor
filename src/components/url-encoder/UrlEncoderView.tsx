'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
   Copy,
   Check,
   ArrowRightLeft,
   Link2,
   FlaskConical,
   Trash2,
   Plus,
   Table2,
   Lock,
   Unlock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePersistence } from '@/contexts/PersistenceContext';
import {
   EncodingMode,
   encodeUrl,
   decodeUrl,
   parseUrl,
   rebuildUrl,
   parseQueryString,
   buildQueryString,
   SAMPLE_URL,
   SAMPLE_TEXT,
   ParsedUrl,
} from '@/lib/url-encoder-utils';

const STORAGE_KEY_TAB = 'url-encoder-active-tab';
const STORAGE_KEY_INPUT = 'url-encoder-input';

type ActiveTab = 'encode-decode' | 'url-parser';

const ENCODING_MODES: { value: EncodingMode; label: string; desc: string }[] = [
   { value: 'component', label: 'encodeURIComponent', desc: 'Encodes all special characters (recommended)' },
   { value: 'full', label: 'encodeURI', desc: 'Preserves :, /, ?, #, &, = characters' },
   { value: 'space-only', label: 'Space → %20', desc: 'Only replaces spaces with %20' },
];

export function UrlEncoderView() {
   const { isPersistenceEnabled } = usePersistence();
   const isInitialized = useRef(false);

   // State
   const [activeTab, setActiveTab] = useState<ActiveTab>('encode-decode');
   const [input, setInput] = useState('');
   const [encodingMode, setEncodingMode] = useState<EncodingMode>('component');
   const [direction, setDirection] = useState<'encode' | 'decode'>('encode');
   const [copied, setCopied] = useState(false);

   // URL Parser state
   const [urlInput, setUrlInput] = useState('');
   const [parsedUrl, setParsedUrl] = useState<ParsedUrl | null>(null);
   const [editableParams, setEditableParams] = useState<{ key: string; value: string }[]>([]);
   const [copiedField, setCopiedField] = useState<string | null>(null);

   // Load state on mount
   useEffect(() => {
      if (typeof window === 'undefined' || isInitialized.current) return;
      isInitialized.current = true;

      if (isPersistenceEnabled) {
         const storedTab = localStorage.getItem(STORAGE_KEY_TAB) as ActiveTab | null;
         if (storedTab && (storedTab === 'encode-decode' || storedTab === 'url-parser')) {
            setActiveTab(storedTab);
         }
         const storedInput = localStorage.getItem(STORAGE_KEY_INPUT);
         if (storedInput) setInput(storedInput);
      }
   }, [isPersistenceEnabled]);

   // Save state
   useEffect(() => {
      if (typeof window === 'undefined' || !isPersistenceEnabled || !isInitialized.current) return;
      localStorage.setItem(STORAGE_KEY_TAB, activeTab);
      localStorage.setItem(STORAGE_KEY_INPUT, input);
   }, [activeTab, input, isPersistenceEnabled]);

   // Compute output
   const output =
      direction === 'encode' ? encodeUrl(input, encodingMode) : decodeUrl(input, encodingMode);

   // URL Parser logic
   useEffect(() => {
      if (!urlInput.trim()) {
         setParsedUrl(null);
         setEditableParams([]);
         return;
      }
      const parsed = parseUrl(urlInput);
      setParsedUrl(parsed);
      setEditableParams(parsed.params.map((p) => ({ ...p })));
   }, [urlInput]);

   const handleCopy = useCallback(
      async (text: string, label?: string) => {
         if (!text) return;
         try {
            await navigator.clipboard.writeText(text);
            if (label) {
               setCopiedField(label);
               setTimeout(() => setCopiedField(null), 2000);
            } else {
               setCopied(true);
               setTimeout(() => setCopied(false), 2000);
            }
         } catch {
            console.error('Failed to copy');
         }
      },
      []
   );

   const handleSwap = useCallback(() => {
      setDirection((prev) => (prev === 'encode' ? 'decode' : 'encode'));
   }, []);

   const handleSampleEncode = useCallback(() => {
      setInput(SAMPLE_TEXT);
      setDirection('encode');
   }, []);

   const handleSampleParse = useCallback(() => {
      setUrlInput(SAMPLE_URL);
   }, []);

   const addParam = useCallback(() => {
      setEditableParams((prev) => [...prev, { key: '', value: '' }]);
   }, []);

   const removeParam = useCallback((index: number) => {
      setEditableParams((prev) => prev.filter((_, i) => i !== index));
   }, []);

   const updateParam = useCallback((index: number, field: 'key' | 'value', val: string) => {
      setEditableParams((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: val } : p)));
   }, []);

   const rebuiltUrl = parsedUrl?.isValid ? rebuildUrl(parsedUrl, editableParams) : '';

   const handleParseQueryString = useCallback(() => {
      // Try to parse input as a query string
      const params = parseQueryString(input);
      if (params.length > 0) {
         setActiveTab('url-parser');
         const qs = buildQueryString(params);
         setUrlInput(`https://example.com/?${qs}`);
      }
   }, [input]);

   return (
      <div className="w-full h-full flex flex-col bg-background border border-border rounded-xl shadow-sm overflow-hidden relative">
         {/* Top Toolbar */}
         <div className="flex flex-wrap items-center gap-3 px-4 py-2.5 border-b border-border bg-background shrink-0">
            <div className="flex items-center gap-1.5 mr-2">
               <Link2 className="h-4 w-4 text-brand" />
               <span className="text-sm font-semibold text-foreground">URL Tool</span>
            </div>

            {/* Tab Switcher */}
            <Tabs
               value={activeTab}
               onValueChange={(val) => setActiveTab(val as ActiveTab)}
            >
               <TabsList className="h-8 bg-muted/50">
                  <TabsTrigger value="encode-decode" className="text-xs h-6 px-3 data-[state=active]:bg-background">
                     Encode / Decode
                  </TabsTrigger>
                  <TabsTrigger value="url-parser" className="text-xs h-6 px-3 data-[state=active]:bg-background">
                     URL Parser
                  </TabsTrigger>
               </TabsList>
            </Tabs>

            {/* Encode/Decode Direction Toggle — only visible on Encode/Decode tab */}
            {activeTab === 'encode-decode' && (
               <div className="flex items-center gap-0.5 ml-auto bg-muted/50 rounded-lg p-0.5 border border-border/50">
                  <button
                     onClick={() => setDirection('encode')}
                     className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                        direction === 'encode'
                           ? 'bg-background text-foreground shadow-sm border border-border/50'
                           : 'text-muted-foreground hover:text-foreground border border-transparent'
                     }`}
                  >
                     <Lock className="h-3 w-3" />
                     Encode
                  </button>
                  <button
                     onClick={() => setDirection('decode')}
                     className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all ${
                        direction === 'decode'
                           ? 'bg-background text-foreground shadow-sm border border-border/50'
                           : 'text-muted-foreground hover:text-foreground border border-transparent'
                     }`}
                  >
                     <Unlock className="h-3 w-3" />
                     Decode
                  </button>
               </div>
            )}
         </div>

         {/* Content */}
         <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {activeTab === 'encode-decode' ? (
               <EncodeDecode
                  input={input}
                  setInput={setInput}
                  output={output}
                  direction={direction}
                  encodingMode={encodingMode}
                  setEncodingMode={setEncodingMode}
                  handleSwap={handleSwap}
                  handleCopy={() => handleCopy(output)}
                  handleSample={handleSampleEncode}
                  handleParseQueryString={handleParseQueryString}
                  copied={copied}
               />
            ) : (
               <UrlParser
                  urlInput={urlInput}
                  setUrlInput={setUrlInput}
                  parsedUrl={parsedUrl}
                  editableParams={editableParams}
                  rebuiltUrl={rebuiltUrl}
                  addParam={addParam}
                  removeParam={removeParam}
                  updateParam={updateParam}
                  handleCopy={handleCopy}
                  handleSample={handleSampleParse}
                  copiedField={copiedField}
               />
            )}
         </div>
      </div>
   );
}

/* ── Encode/Decode Panel ──────────────────────────── */
function EncodeDecode({
   input,
   setInput,
   output,
   direction,
   encodingMode,
   setEncodingMode,
   handleSwap,
   handleCopy,
   handleSample,
   handleParseQueryString,
   copied,
}: {
   input: string;
   setInput: (v: string) => void;
   output: string;
   direction: 'encode' | 'decode';
   encodingMode: EncodingMode;
   setEncodingMode: (v: EncodingMode) => void;
   handleSwap: () => void;
   handleCopy: () => void;
   handleSample: () => void;
   handleParseQueryString: () => void;
   copied: boolean;
}) {
   const inputLength = input.length;
   const outputLength = output.length;

   return (
      <div className="flex-1 flex flex-col md:flex-row min-h-0 relative">
         {/* Input Panel */}
         <div className="flex flex-col md:w-1/2 min-h-[250px] md:min-h-0 border-b md:border-b-0 md:border-r border-border">
            {/* Panel Header */}
            <div className="px-3 py-2 border-b min-h-12 border-border bg-background shrink-0 flex items-center justify-between">
               <div className="flex items-center gap-2">
                  {direction === 'encode' ? (
                     <Unlock className="h-3.5 w-3.5 text-amber-500" />
                  ) : (
                     <Lock className="h-3.5 w-3.5 text-emerald-500" />
                  )}
                  <span className="text-label font-semibold text-muted-foreground uppercase tracking-wider">
                     {direction === 'encode' ? 'Plain Text' : 'Encoded Text'}
                  </span>
               </div>
               <div className="flex items-center gap-3 text-tiny text-muted-foreground">
                  {inputLength > 0 && <span>{inputLength} chars</span>}
                  {!input && (
                     <button
                        onClick={handleSample}
                        className="flex items-center gap-1 text-brand hover:text-brand/80 transition-colors"
                     >
                        <FlaskConical className="h-3 w-3" />
                        Sample
                     </button>
                  )}
                  {input && (
                     <button
                        onClick={() => setInput('')}
                        className="text-muted-foreground/70 hover:text-destructive transition-colors"
                     >
                        Clear
                     </button>
                  )}
               </div>
            </div>

            {/* Encoding Mode Selector */}
            <div className="px-3 py-2 border-b border-border bg-muted/20 shrink-0">
               <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider shrink-0">
                     Mode:
                  </span>
                  {ENCODING_MODES.map((mode) => (
                     <button
                        key={mode.value}
                        onClick={() => setEncodingMode(mode.value)}
                        className={`px-2 py-1 rounded-md text-[11px] font-mono transition-all border ${
                           encodingMode === mode.value
                              ? 'bg-brand/10 text-brand border-brand/30 font-semibold'
                              : 'text-muted-foreground border-transparent hover:bg-muted/50 hover:border-border/40'
                        }`}
                        title={mode.desc}
                     >
                        {mode.label}
                     </button>
                  ))}
               </div>
            </div>

            <textarea
               value={input}
               onChange={(e) => setInput(e.target.value)}
               placeholder={
                  direction === 'encode'
                     ? 'Paste text to encode...'
                     : 'Paste encoded text to decode...'
               }
               className="flex-1 w-full p-4 bg-transparent text-foreground text-sm font-mono resize-none focus:outline-none placeholder:text-muted-foreground/40"
               spellCheck={false}
            />
         </div>

         {/* Center Swap Button (desktop only) — absolutely positioned over the border */}
         <button
            onClick={handleSwap}
            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center rounded-full border border-border bg-background shadow-sm hover:bg-muted transition-all hover:scale-110"
            title={`Switch to ${direction === 'encode' ? 'Decode' : 'Encode'}`}
         >
            <ArrowRightLeft className="h-3.5 w-3.5 text-muted-foreground" />
         </button>

         {/* Output Panel */}
         <div className="flex flex-col md:w-1/2 min-h-[250px] md:min-h-0 relative">
            <div className="px-3 py-2 min-h-12 border-b border-border bg-background shrink-0 flex items-center justify-between">
               <div className="flex items-center gap-2">
                  {direction === 'encode' ? (
                     <Lock className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                     <Unlock className="h-3.5 w-3.5 text-amber-500" />
                  )}
                  <span className="text-tiny px-1.5 py-0.5 rounded bg-brand/10 text-brand font-mono border border-brand/20">
                     {direction === 'encode' ? 'Encoded' : 'Decoded'}
                  </span>
               </div>
               <div className="flex items-center gap-3">
                  {outputLength > 0 && (
                     <span className="text-[10px] text-muted-foreground">{outputLength} chars</span>
                  )}

                  {/* Swap (mobile) */}
                  <button
                     onClick={handleSwap}
                     className="md:hidden flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium text-muted-foreground border border-border/40 hover:text-foreground transition-all"
                  >
                     <ArrowRightLeft className="h-3 w-3" />
                     Swap
                  </button>

                  {/* Parse as Query String button */}
                  {direction === 'decode' && output && output.includes('=') && (
                     <button
                        onClick={handleParseQueryString}
                        className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium text-muted-foreground border border-border/40 hover:text-foreground transition-all"
                        title="Parse as query parameters"
                     >
                        <Table2 className="h-3 w-3" />
                        <span className="hidden sm:inline">Parse</span>
                     </button>
                  )}

                  <Button
                     variant="ghost"
                     size="sm"
                     className="h-6 gap-1 text-xs px-2"
                     onClick={handleCopy}
                     disabled={!output}
                  >
                     {copied ? (
                        <>
                           <Check className="h-3 w-3 text-success" />
                           <span className="text-success">Copied!</span>
                        </>
                     ) : (
                        <>
                           <Copy className="h-3 w-3" />
                           Copy
                        </>
                     )}
                  </Button>
               </div>
            </div>
            <textarea
               value={output}
               readOnly
               placeholder={
                  direction === 'encode'
                     ? 'Encoded output will appear here...'
                     : 'Decoded output will appear here...'
               }
               className="flex-1 w-full p-4 bg-background text-foreground text-sm font-mono resize-none focus:outline-none placeholder:text-muted-foreground/30"
               spellCheck={false}
            />
         </div>
      </div>
   );
}

/* ── URL Parser Panel ─────────────────────────────── */
function UrlParser({
   urlInput,
   setUrlInput,
   parsedUrl,
   editableParams,
   rebuiltUrl,
   addParam,
   removeParam,
   updateParam,
   handleCopy,
   handleSample,
   copiedField,
}: {
   urlInput: string;
   setUrlInput: (v: string) => void;
   parsedUrl: ParsedUrl | null;
   editableParams: { key: string; value: string }[];
   rebuiltUrl: string;
   addParam: () => void;
   removeParam: (i: number) => void;
   updateParam: (i: number, field: 'key' | 'value', val: string) => void;
   handleCopy: (text: string, label?: string) => void;
   handleSample: () => void;
   copiedField: string | null;
}) {
   return (
      <div className="flex-1 flex flex-col min-h-0 overflow-auto">
         {/* URL Input */}
         <div className="px-4 py-3 border-b border-border bg-background shrink-0">
            <div className="flex items-center justify-between mb-2">
               <span className="text-label font-semibold text-muted-foreground uppercase tracking-wider">
                  Enter URL
               </span>
               <div className="flex items-center gap-3 text-tiny text-muted-foreground">
                  {!urlInput && (
                     <button
                        onClick={handleSample}
                        className="flex items-center gap-1 text-brand hover:text-brand/80 transition-colors"
                     >
                        <FlaskConical className="h-3 w-3" />
                        Sample
                     </button>
                  )}
                  {urlInput && (
                     <button
                        onClick={() => setUrlInput('')}
                        className="text-muted-foreground/70 hover:text-destructive transition-colors"
                     >
                        Clear
                     </button>
                  )}
               </div>
            </div>
            <input
               type="text"
               value={urlInput}
               onChange={(e) => setUrlInput(e.target.value)}
               placeholder="https://example.com/path?query=value&key=value#fragment"
               className="w-full px-3 py-2 rounded-lg bg-muted/30 border border-border/50 text-sm font-mono text-foreground focus:outline-none focus:border-brand/40 placeholder:text-muted-foreground/40 transition-colors"
               spellCheck={false}
            />
         </div>

         {/* Parsed Components */}
         {parsedUrl && parsedUrl.isValid && (
            <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-auto">
               {/* Left: URL Components */}
               <div className="md:w-1/2 border-b md:border-b-0 md:border-r border-border overflow-auto">
                  <div className="px-3 py-2.5 border-b min-h-[51px] border-border bg-background shrink-0 flex items-center">
                     <span className="text-label font-semibold text-muted-foreground uppercase tracking-wider">
                        URL Components
                     </span>
                  </div>
                  <div className="p-4 space-y-2">
                     {[
                        { label: 'Protocol', value: parsedUrl.protocol, color: 'text-emerald-500' },
                        { label: 'Host', value: parsedUrl.host, color: 'text-brand' },
                        { label: 'Hostname', value: parsedUrl.hostname, color: 'text-brand' },
                        { label: 'Port', value: parsedUrl.port || '(default)', color: 'text-amber-500' },
                        { label: 'Path', value: parsedUrl.pathname, color: 'text-violet-500' },
                        { label: 'Query', value: parsedUrl.search, color: 'text-rose-500' },
                        { label: 'Hash', value: parsedUrl.hash || '(none)', color: 'text-sky-500' },
                        { label: 'Origin', value: parsedUrl.origin, color: 'text-muted-foreground' },
                     ].map(({ label, value, color }) => (
                        <div
                           key={label}
                           className="flex items-center justify-between group py-1.5 px-2 rounded-md hover:bg-muted/30 transition-colors"
                        >
                           <div className="flex items-center gap-2 min-w-0 flex-1">
                              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider w-20 shrink-0">
                                 {label}
                              </span>
                              <span className={`text-xs font-mono ${color} truncate`}>{value}</span>
                           </div>
                           <button
                              onClick={() => handleCopy(value === '(default)' || value === '(none)' ? '' : value, label)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity ml-2 shrink-0"
                              title={`Copy ${label}`}
                           >
                              {copiedField === label ? (
                                 <Check className="h-3 w-3 text-success" />
                              ) : (
                                 <Copy className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                              )}
                           </button>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Right: Query Parameters Table */}
               <div className="md:w-1/2 flex flex-col overflow-auto">
                  <div className="px-3 py-2.5 border-b border-border bg-background shrink-0 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <Table2 className="h-3.5 w-3.5 text-brand" />
                        <span className="text-label font-semibold text-muted-foreground uppercase tracking-wider">
                           Query Parameters
                        </span>
                        {editableParams.length > 0 && (
                           <span className="text-tiny px-1.5 py-0.5 rounded bg-brand/10 text-brand font-mono border border-brand/20">
                              {editableParams.length}
                           </span>
                        )}
                     </div>
                     <button
                        onClick={addParam}
                        className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium text-brand border border-brand/20 bg-brand/5 hover:bg-brand/10 transition-colors"
                     >
                        <Plus className="h-3 w-3" />
                        Add
                     </button>
                  </div>

                  <div className="flex-1 overflow-auto p-4">
                     {editableParams.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                           <p className="text-sm text-muted-foreground/50">No query parameters</p>
                        </div>
                     ) : (
                        <div className="space-y-2">
                           {/* Header Row */}
                           <div className="flex items-center gap-2 px-1">
                              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex-1">
                                 Key
                              </span>
                              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex-1">
                                 Value
                              </span>
                              <div className="w-7" />
                           </div>

                           {editableParams.map((param, i) => (
                              <div key={i} className="flex items-center gap-2 group">
                                 <input
                                    type="text"
                                    value={param.key}
                                    onChange={(e) => updateParam(i, 'key', e.target.value)}
                                    placeholder="key"
                                    className="flex-1 px-2 py-1.5 rounded-md bg-muted/30 border border-border/50 text-xs font-mono text-foreground focus:outline-none focus:border-brand/40 placeholder:text-muted-foreground/30 transition-colors"
                                 />
                                 <input
                                    type="text"
                                    value={param.value}
                                    onChange={(e) => updateParam(i, 'value', e.target.value)}
                                    placeholder="value"
                                    className="flex-1 px-2 py-1.5 rounded-md bg-muted/30 border border-border/50 text-xs font-mono text-foreground focus:outline-none focus:border-brand/40 placeholder:text-muted-foreground/30 transition-colors"
                                 />
                                 <button
                                    onClick={() => removeParam(i)}
                                    className="w-7 h-7 flex items-center justify-center rounded-md opacity-0 group-hover:opacity-100 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                                    title="Remove parameter"
                                 >
                                    <Trash2 className="h-3 w-3" />
                                 </button>
                              </div>
                           ))}
                        </div>
                     )}
                  </div>

                  {/* Rebuilt URL */}
                  {rebuiltUrl && (
                     <div className="px-4 py-3 border-t border-border bg-muted/20 shrink-0">
                        <div className="flex items-center justify-between mb-1.5">
                           <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                              Rebuilt URL
                           </span>
                           <button
                              onClick={() => handleCopy(rebuiltUrl, 'rebuilt')}
                              className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                           >
                              {copiedField === 'rebuilt' ? (
                                 <>
                                    <Check className="h-3 w-3 text-success" />
                                    <span className="text-success">Copied!</span>
                                 </>
                              ) : (
                                 <>
                                    <Copy className="h-3 w-3" />
                                    Copy
                                 </>
                              )}
                           </button>
                        </div>
                        <p className="text-xs font-mono text-brand break-all select-all cursor-text">
                           {rebuiltUrl}
                        </p>
                     </div>
                  )}
               </div>
            </div>
         )}

         {/* Error state */}
         {parsedUrl && !parsedUrl.isValid && (
            <div className="flex-1 flex items-center justify-center p-8">
               <div className="text-center space-y-2">
                  <p className="text-sm text-destructive font-medium">Invalid URL</p>
                  <p className="text-xs text-muted-foreground">{parsedUrl.error}</p>
               </div>
            </div>
         )}

         {/* Empty state */}
         {!parsedUrl && (
            <div className="flex-1 flex items-center justify-center p-8">
               <div className="text-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center mx-auto">
                     <Link2 className="w-7 h-7 text-brand" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                     Paste a URL above to parse it into components
                  </p>
                  <button
                     onClick={handleSample}
                     className="flex items-center gap-1.5 mx-auto px-3 py-1.5 rounded-md text-xs font-medium text-brand border border-brand/20 bg-brand/5 hover:bg-brand/10 transition-colors"
                  >
                     <FlaskConical className="h-3.5 w-3.5" />
                     Load Sample URL
                  </button>
               </div>
            </div>
         )}
      </div>
   );
}
