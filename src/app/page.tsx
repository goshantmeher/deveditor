'use client';

import { Input } from '@/components/ui/input';
import { Search, ExternalLink, Heart, Shield, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useState, useMemo } from 'react';

// ── Tool Status ──────────────────────────────────────────────
type ToolStatus = 'available' | 'coming-soon' | 'planned';

interface Tool {
   title: string;
   description: string;
   icon: string;
   href: string;
   status: ToolStatus;
   isNew?: boolean;
   tags?: string[];
}

interface Category {
   id: string;
   title: string;
   icon: string;
   description: string;
   accentColor: string; // tailwind color class base
   tools: Tool[];
}

// ── All Categories & Tools ───────────────────────────────────
const categories: Category[] = [
   {
      id: 'text',
      title: 'Text & String Manipulation',
      icon: '🔤',
      description: 'Quick-fix tools for everyday text tasks',
      accentColor: 'emerald',
      tools: [
         {
            title: 'Base64 Encoder',
            description:
               'Encode & decode text, files, and images to Base64. Generate data URIs.',
            icon: '⚙️',
            href: '/base64-encoder',
            status: 'available',
            tags: ['base64', 'encode', 'decode', 'data uri'],
         },
         {
            title: 'Case Converter',
            description:
               'Toggle between camelCase, snake_case, kebab-case, PascalCase, and more.',
            icon: '🔠',
            href: '/case-converter',
            status: 'available',
            isNew: true,
            tags: ['case', 'camelcase', 'snake', 'kebab', 'pascal'],
         },
         {
            title: 'URL Encoder / Decoder',
            description:
               'Encode & decode URI components, parse & rebuild query parameters.',
            icon: '🔗',
            href: '/url-encoder',
            status: 'planned',
            tags: ['url', 'uri', 'encode', 'decode', 'query'],
         },
         {
            title: 'Text Diff Checker',
            description:
               'Side-by-side visual comparison of two text blocks with change highlighting.',
            icon: '📝',
            href: '/text-diff',
            status: 'available',
            isNew: true,
            tags: ['diff', 'compare', 'text', 'merge'],
         },
         {
            title: 'Markdown Previewer',
            description:
               'Split-screen Markdown editor with live rendered HTML preview.',
            icon: '📖',
            href: '/markdown-previewer',
            status: 'planned',
            tags: ['markdown', 'md', 'preview', 'html'],
         },
         {
            title: 'List / Array Converter',
            description:
               'Convert text columns to JSON arrays, SQL IN clauses, or CSV strings.',
            icon: '📋',
            href: '/list-converter',
            status: 'planned',
            tags: ['list', 'array', 'json', 'sql', 'csv'],
         },
         {
            title: 'HTML Entity Converter',
            description:
               'Convert symbols to HTML entities and back. Handles &amp;, &lt;, &gt; etc.',
            icon: '🏷️',
            href: '/html-entities',
            status: 'planned',
            tags: ['html', 'entity', 'escape', 'unescape'],
         },
         {
            title: 'Lorem Ipsum Generator',
            description:
               'Generate placeholder text — paragraphs, sentences, or words.',
            icon: '📄',
            href: '/lorem-ipsum',
            status: 'planned',
            tags: ['lorem', 'ipsum', 'placeholder', 'dummy text'],
         },
         {
            title: 'Word / Character Counter',
            description:
               'Count characters, words, lines, byte size, and estimated reading time.',
            icon: '🔢',
            href: '/word-counter',
            status: 'planned',
            tags: ['word', 'character', 'count', 'length'],
         },
      ],
   },
   {
      id: 'security',
      title: 'Security & Identity',
      icon: '🔐',
      description: 'Privacy-first tools — nothing leaves your browser',
      accentColor: 'amber',
      tools: [
         {
            title: 'JWT Debugger',
            description:
               'Decode JWT header, payload & signature. Inspect timestamps & claims.',
            icon: '🔐',
            href: '/jwt-decoder',
            status: 'available',
            isNew: true,
            tags: ['jwt', 'token', 'decode', 'auth', 'bearer'],
         },
         {
            title: 'Hash Generator',
            description:
               'Generate MD5, SHA-1, SHA-256, SHA-512 hashes using Web Crypto API.',
            icon: '🔑',
            href: '/hash-generator',
            status: 'planned',
            tags: ['hash', 'md5', 'sha', 'sha256', 'crypto'],
         },
         {
            title: 'Password Generator',
            description:
               'Create strong passwords with customizable length, symbols, and strength meter.',
            icon: '🛡️',
            href: '/password-generator',
            status: 'planned',
            tags: ['password', 'secret', 'generator', 'random'],
         },
         {
            title: 'UUID / ULID Generator',
            description:
               'Generate v4 UUIDs and ULIDs in batches. Copy single or bulk.',
            icon: '🆔',
            href: '/uuid-generator',
            status: 'planned',
            tags: ['uuid', 'ulid', 'guid', 'unique id'],
         },
         {
            title: 'Bcrypt Tester',
            description:
               'Hash strings with Bcrypt and verify if a plaintext matches a hash.',
            icon: '🧪',
            href: '/bcrypt-tester',
            status: 'planned',
            tags: ['bcrypt', 'hash', 'verify', 'password'],
         },
         {
            title: 'RSA Key Pair Generator',
            description:
               'Generate public/private RSA key pairs locally in your browser.',
            icon: '🗝️',
            href: '/rsa-keygen',
            status: 'planned',
            tags: ['rsa', 'key', 'public', 'private', 'crypto'],
         },
      ],
   },
   {
      id: 'frontend',
      title: 'Frontend & Design',
      icon: '🎨',
      description: 'Visual tools for CSS, colors, fonts, and design',
      accentColor: 'purple',
      tools: [
         {
            title: 'CSS Playground',
            description:
               'Test & generate CSS or Tailwind features with live preview.',
            icon: '🎨',
            href: '/css-playground',
            status: 'available',
            tags: [
               'css',
               'tailwind',
               'playground',
               'generator',
               'shadow',
               'gradient',
            ],
         },
         {
            title: 'Color Converter & Palette',
            description:
               'Convert HEX, RGB, HSL, CMYK. WCAG contrast checker & palette generator.',
            icon: '🌈',
            href: '/color-converter',
            status: 'available',
            isNew: true,
            tags: ['color', 'hex', 'rgb', 'hsl', 'palette', 'contrast', 'wcag'],
         },
         {
            title: 'SVG Optimizer',
            description:
               'Minify SVG code — strip metadata, comments, and unnecessary attributes.',
            icon: '✂️',
            href: '/svg-optimizer',
            status: 'planned',
            tags: ['svg', 'optimize', 'minify', 'clean'],
         },
         {
            title: 'Favicon Generator',
            description:
               'Upload a PNG and generate all standard favicon sizes (16px to 512px).',
            icon: '⭐',
            href: '/favicon-generator',
            status: 'planned',
            tags: ['favicon', 'icon', 'resize', 'png', 'ico'],
         },
         {
            title: 'Tailwind CSS Lookup',
            description:
               'Search Tailwind classes → CSS output. Paste CSS → get Tailwind equivalent.',
            icon: '🌬️',
            href: '/tailwind-lookup',
            status: 'planned',
            tags: ['tailwind', 'css', 'class', 'lookup', 'convert'],
         },
         {
            title: 'Font Pair Previewer',
            description:
               'Preview Google Font combinations with customizable sample text and sizes.',
            icon: '🔡',
            href: '/font-pair',
            status: 'planned',
            tags: ['font', 'google fonts', 'pair', 'typography', 'preview'],
         },
         {
            title: 'Theme Generator',
            description:
               'Generate comprehensive UI themes (Tailwind/CSS tokens). Evaluate and export JSON automatically.',
            icon: '🖌️',
            href: '/theme-generator',
            status: 'planned',
            tags: ['theme', 'colors', 'tailwind', 'json', 'export'],
         },
         {
            title: 'SVG to React Converter',
            description:
               'Paste raw SVG code and get clean, camelCase React/JSX components instantly.',
            icon: '⚛️',
            href: '/svg-to-react',
            status: 'planned',
            tags: ['svg', 'react', 'jsx', 'convert', 'camelcase'],
         },
      ],
   },
   {
      id: 'logic',
      title: 'Architecture & Logic',
      icon: '🏗️',
      description: 'Parse expressions, convert schemas, and debug logic',
      accentColor: 'blue',
      tools: [
         {
            title: 'JSON Viewer / Editor',
            description:
               'Format, validate, and explore JSON data with tree view.',
            icon: '🧩',
            href: '/json-editor',
            status: 'available',
            tags: ['json', 'format', 'validate', 'tree', 'editor'],
         },
         {
            title: 'RegEx Tester',
            description:
               'Live regex match highlighting, capture groups, and cheat sheet.',
            icon: '🔍',
            href: '/regex-tester',
            status: 'planned',
            tags: ['regex', 'regular expression', 'match', 'pattern'],
         },
         {
            title: 'Cron Expression Parser',
            description:
               'Convert cron syntax to plain English. Show next scheduled run times.',
            icon: '⏰',
            href: '/cron-parser',
            status: 'planned',
            tags: ['cron', 'schedule', 'crontab', 'parser'],
         },
         {
            title: 'JSON → TypeScript / Go Schema',
            description:
               'Paste JSON → generate TypeScript interfaces, Go structs, or Zod schemas.',
            icon: '📐',
            href: '/json-to-schema',
            status: 'planned',
            tags: ['json', 'typescript', 'go', 'schema', 'interface', 'struct'],
         },
         {
            title: 'Unix Timestamp Converter',
            description:
               'Convert epoch timestamps ↔ human-readable dates. Relative time display.',
            icon: '🕐',
            href: '/unix-timestamp',
            status: 'planned',
            tags: ['unix', 'timestamp', 'epoch', 'date', 'time'],
         },
         {
            title: 'YAML ↔ JSON Converter',
            description:
               'Bidirectional YAML/JSON conversion with syntax validation.',
            icon: '🔄',
            href: '/yaml-json',
            status: 'planned',
            tags: ['yaml', 'json', 'convert', 'config'],
         },
         {
            title: 'JSON Path / jq Playground',
            description:
               'Query JSON data with JSONPath or jq-like expressions. Live results.',
            icon: '🎯',
            href: '/json-path',
            status: 'planned',
            tags: ['jsonpath', 'jq', 'query', 'json', 'path'],
         },
         {
            title: 'ASCII Art Text Generator',
            description:
               'Turn text into large ASCII art headers for code comments.',
            icon: '🎭',
            href: '/ascii-art',
            status: 'planned',
            tags: ['ascii', 'art', 'text', 'figlet', 'banner'],
         },
      ],
   },
   {
      id: 'media',
      title: 'Media & Files',
      icon: '📦',
      description: 'Process images and files without uploading to any server',
      accentColor: 'rose',
      tools: [
         {
            title: 'Image Converter / Crop / Resize',
            description:
               'Crop, resize, and convert images between PNG, JPEG, WebP, AVIF.',
            icon: '🖼️',
            href: '/image-converter',
            status: 'coming-soon',
            tags: ['image', 'crop', 'resize', 'convert', 'png', 'jpeg', 'webp'],
         },
         {
            title: 'Image Compressor',
            description:
               'Compress JPEG/PNG/WebP with adjustable quality. Before/after comparison.',
            icon: '📦',
            href: '/image-compressor',
            status: 'planned',
            tags: ['image', 'compress', 'optimize', 'quality'],
         },
         {
            title: 'SVG → PNG / JPEG Converter',
            description:
               'Render SVG onto canvas and export as raster image at custom resolution.',
            icon: '🔲',
            href: '/svg-to-png',
            status: 'planned',
            tags: ['svg', 'png', 'jpeg', 'convert', 'raster'],
         },
         {
            title: 'EXIF Data Viewer / Remover',
            description:
               'Read and strip metadata from photos — GPS, camera info, and more.',
            icon: '📷',
            href: '/exif-remover',
            status: 'planned',
            tags: ['exif', 'metadata', 'photo', 'privacy', 'gps'],
         },
         {
            title: 'QR Code Generator',
            description:
               'Generate QR codes from text/URLs. Customize colors and size.',
            icon: '📱',
            href: '/qr-generator',
            status: 'planned',
            tags: ['qr', 'qrcode', 'barcode', 'generate'],
         },
         {
            title: 'PDF Resume Builder',
            description:
               'A free, fully customizable resume builder with layout options and no paywalls.',
            icon: '📄',
            href: '/pdf-resume',
            status: 'planned',
            tags: ['pdf', 'resume', 'cv', 'builder', 'free'],
         },
         {
            title: 'Merge PDF',
            description:
               'Combine multiple PDF files into one continuous document entirely in your browser.',
            icon: '📑',
            href: '/merge-pdf',
            status: 'planned',
            tags: ['pdf', 'merge', 'combine', 'join'],
         },
         {
            title: 'Split PDF',
            description:
               'Cut a single PDF into multiple chunks or individual page files locally.',
            icon: '✂️',
            href: '/split-pdf',
            status: 'planned',
            tags: ['pdf', 'split', 'cut', 'pages', 'extract'],
         },
         {
            title: 'Copy PDF Content',
            description:
               'Extract textual content natively out of a PDF document to copy to clipboard.',
            icon: '📋',
            href: '/copy-pdf',
            status: 'planned',
            tags: ['pdf', 'extract', 'text', 'copy', 'content'],
         },
         {
            title: 'PDF to Word (Doc)',
            description:
               'Convert a PDF document into an editable Word Document format.',
            icon: '📝',
            href: '/pdf-to-doc',
            status: 'planned',
            tags: ['pdf', 'word', 'doc', 'docx', 'convert'],
         },
         {
            title: 'Word (Doc) to PDF',
            description:
               'Convert an editable Word Document into a static PDF format.',
            icon: '🔄',
            href: '/doc-to-pdf',
            status: 'planned',
            tags: ['word', 'doc', 'docx', 'pdf', 'convert'],
         },
         {
            title: 'Add Pages to PDF',
            description:
               'Insert additional blank pages or merge pages from another PDF into an existing one.',
            icon: '➕',
            href: '/add-pdf-pages',
            status: 'planned',
            tags: ['pdf', 'add', 'insert', 'pages', 'merge'],
         },
         {
            title: 'Webcam Image Filter Booth',
            description:
               'Capture webcam images and instantly apply CSS/local filters without any server uploads.',
            icon: '📸',
            href: '/webcam-filters',
            status: 'planned',
            tags: ['webcam', 'image', 'camera', 'filter', 'capture'],
         },
         {
            title: 'Audio/Video Format Converter',
            description:
               'Convert media files in the browser natively (FFmpeg.wasm). Transform WebM to MP4 instantly.',
            icon: '🎞️',
            href: '/media-converter',
            status: 'planned',
            tags: ['video', 'audio', 'ffmpeg', 'mp4', 'webm', 'mp3'],
         },
         {
            title: 'GIF Creator',
            description:
               'Stitch a sequence of images or a short video clip into an animated GIF.',
            icon: '🎞️',
            href: '/gif-creator',
            status: 'planned',
            tags: ['gif', 'video', 'animation', 'create', 'image'],
         },
         {
            title: 'Meme Generator',
            description:
               'Upload images, overlay impact font, drag to position, and download.',
            icon: '😂',
            href: '/meme-generator',
            status: 'planned',
            tags: ['meme', 'generator', 'image', 'text', 'font'],
         },
         {
            title: 'SVG Editor & Animator',
            description:
               'Visually edit paths and create multi-stage CSS/SMIL animations for SVG objects.',
            icon: '✒️',
            href: '/svg-editor',
            status: 'planned',
            tags: ['svg', 'editor', 'animate', 'vector', 'edit'],
         },
      ],
   },
   {
      id: 'data',
      title: 'Data & Format Converters',
      icon: '📊',
      description: 'Convert between popular data and config formats',
      accentColor: 'cyan',
      tools: [
         {
            title: 'CSV ↔ JSON Converter',
            description:
               'Parse CSV to JSON objects/arrays and back. Handle headers & delimiters.',
            icon: '📊',
            href: '/csv-json',
            status: 'planned',
            tags: ['csv', 'json', 'convert', 'table', 'data'],
         },
         {
            title: 'XML ↔ JSON Converter',
            description: 'Bidirectional XML/JSON conversion with formatting.',
            icon: '📃',
            href: '/xml-json',
            status: 'planned',
            tags: ['xml', 'json', 'convert', 'format'],
         },
         {
            title: 'TOML ↔ JSON Converter',
            description: 'Parse TOML config files to JSON and back.',
            icon: '⚙️',
            href: '/toml-json',
            status: 'planned',
            tags: ['toml', 'json', 'config', 'convert'],
         },
         {
            title: 'Number Base Converter',
            description:
               'Convert between binary, octal, decimal, and hexadecimal.',
            icon: '🔢',
            href: '/number-base',
            status: 'planned',
            tags: ['binary', 'octal', 'decimal', 'hex', 'base', 'convert'],
         },
         {
            title: 'Base64 File Encoder/Decoder',
            description:
               'Drag and drop files to convert directly to string, or decode strings back to downloads.',
            icon: '🔤',
            href: '/base64-file',
            status: 'planned',
            tags: ['base64', 'file', 'encode', 'decode', 'string'],
         },
         {
            title: 'Markdown to HTML Converter',
            description:
               'Parse, sanitize, and convert raw Markdown into rich, safe HTML output strings.',
            icon: '📝',
            href: '/markdown-to-html',
            status: 'planned',
            tags: ['markdown', 'md', 'html', 'convert', 'markup'],
         },
      ],
   },
];

// ── Flatten for search ───────────────────────────────────────
const allTools = categories.flatMap((cat) =>
   cat.tools.map((tool) => ({
      ...tool,
      categoryId: cat.id,
      categoryTitle: cat.title,
   }))
);

// ── Status badge config ──────────────────────────────────────
const statusConfig: Record<ToolStatus, { label: string; className: string }> = {
   available: { label: 'Open', className: '' },
   'coming-soon': {
      label: 'Coming Soon',
      className: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
   },
   planned: {
      label: 'Planned',
      className: 'bg-muted/40 text-muted-foreground border-border/40',
   },
};

// ── Accent color mapping ─────────────────────────────────────
const accentMap: Record<string, string> = {
   emerald: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/20',
   amber: 'from-amber-500/20 to-amber-500/5 border-amber-500/20',
   purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/20',
   blue: 'from-blue-500/20 to-blue-500/5 border-blue-500/20',
   rose: 'from-rose-500/20 to-rose-500/5 border-rose-500/20',
   cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/20',
};

// ── Component ────────────────────────────────────────────────
export default function Home() {
   const [searchQuery, setSearchQuery] = useState('');
   const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(
      new Set()
   );

   const toggleCategory = (id: string) => {
      setCollapsedCategories((prev) => {
         const next = new Set(prev);
         if (next.has(id)) next.delete(id);
         else next.add(id);
         return next;
      });
   };

   // When searching, filter across all categories
   const isSearching = searchQuery.trim().length > 0;
   const query = searchQuery.toLowerCase();

   const filteredTools = useMemo(() => {
      if (!isSearching) return [];
      return allTools.filter(
         (tool) =>
            tool.title.toLowerCase().includes(query) ||
            tool.description.toLowerCase().includes(query) ||
            tool.tags?.some((tag) => tag.includes(query))
      );
   }, [isSearching, query]);

   const filteredCategories = useMemo(() => {
      if (!isSearching) return categories;
      // Group filtered tools back into categories
      const toolsByCategory = new Map<string, typeof allTools>();
      for (const tool of filteredTools) {
         const existing = toolsByCategory.get(tool.categoryId) || [];
         existing.push(tool);
         toolsByCategory.set(tool.categoryId, existing);
      }
      return categories
         .filter((cat) => toolsByCategory.has(cat.id))
         .map((cat) => ({
            ...cat,
            tools: toolsByCategory.get(cat.id) || [],
         }));
   }, [isSearching, filteredTools]);

   const totalToolCount = allTools.length;
   const availableCount = allTools.filter(
      (t) => t.status === 'available'
   ).length;

   return (
      <div className="min-h-screen bg-background">
         <div className="container mx-auto px-4 py-10 max-w-5xl">
            {/* ── Header ───────────────────────────────── */}
            <header className="text-center mb-10">
               <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Developer Tools
               </h1>
               <p className="text-muted-foreground text-base md:text-lg mb-2 max-w-2xl mx-auto">
                  Free, open-source developer tools — {availableCount}{' '}
                  available, {totalToolCount - availableCount} more on the way.
                  <br className="hidden sm:block" />
                  No registration. No ads.
               </p>

               {/* Privacy Badge */}
               <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
                  <Shield className="h-3 w-3" />
                  100% client-side — nothing is sent to any server
               </div>

               {/* Search Bar */}
               <div className="relative max-w-lg mx-auto">
                  <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                     placeholder="Search all tools..."
                     className="pl-10 h-11 text-sm bg-muted/20 border-border/40 focus:border-primary/50"
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     aria-label="Search developer tools"
                  />
                  {isSearching && (
                     <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs"
                     >
                        Clear
                     </button>
                  )}
               </div>

               {/* Search Results Count */}
               {isSearching && (
                  <p className="text-xs text-muted-foreground mt-3">
                     {filteredTools.length === 0
                        ? 'No tools found'
                        : `${filteredTools.length} tool${filteredTools.length === 1 ? '' : 's'} found`}
                     {' for '}
                     &quot;
                     <span className="font-medium text-foreground">
                        {searchQuery}
                     </span>
                     &quot;
                  </p>
               )}
            </header>

            {/* ── Categories ───────────────────────────── */}
            <main className="space-y-6 mb-12">
               {filteredCategories.map((category) => {
                  const isCollapsed =
                     !isSearching && collapsedCategories.has(category.id);
                  const accent =
                     accentMap[category.accentColor] || accentMap.blue;
                  const catAvailable = category.tools.filter(
                     (t) => t.status === 'available'
                  ).length;

                  return (
                     <section key={category.id} className="group">
                        {/* Category Header */}
                        <button
                           onClick={() =>
                              !isSearching && toggleCategory(category.id)
                           }
                           className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border bg-gradient-to-r ${accent} transition-all hover:opacity-90 ${
                              isSearching ? 'cursor-default' : 'cursor-pointer'
                           }`}
                        >
                           <span className="text-xl">{category.icon}</span>
                           <div className="flex-1 text-left">
                              <h2 className="text-sm font-semibold text-foreground">
                                 {category.title}
                              </h2>
                              <p className="text-[11px] text-muted-foreground">
                                 {category.description}
                              </p>
                           </div>
                           <div className="flex items-center gap-2">
                              <span className="text-[10px] text-muted-foreground tabular-nums">
                                 {catAvailable > 0 && (
                                    <span className="text-emerald-400 mr-1">
                                       {catAvailable} live
                                    </span>
                                 )}
                                 {category.tools.length} tool
                                 {category.tools.length === 1 ? '' : 's'}
                              </span>
                              {!isSearching && (
                                 <ChevronDown
                                    className={`h-4 w-4 text-muted-foreground transition-transform ${
                                       isCollapsed ? '-rotate-90' : ''
                                    }`}
                                 />
                              )}
                           </div>
                        </button>

                        {/* Tools Grid */}
                        {!isCollapsed && (
                           <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 mt-2 pl-1">
                              {category.tools.map((tool) => (
                                 <ToolCard key={tool.href} tool={tool} />
                              ))}
                           </div>
                        )}
                     </section>
                  );
               })}
            </main>

            {/* ── Footer ───────────────────────────────── */}
            <footer className="text-center text-sm text-muted-foreground border-t border-border/30 pt-8">
               <div className="flex items-center justify-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1">
                     <Heart className="h-4 w-4 text-red-500" />
                     <span>Built by Human</span>
                  </div>
                  <span aria-hidden="true">|</span>
                  <Link
                     href="/about"
                     className="hover:text-foreground transition-colors"
                     aria-label="About DevEditor"
                  >
                     About
                  </Link>
               </div>
            </footer>
         </div>
      </div>
   );
}

// ── Tool Card Component ──────────────────────────────────────
function ToolCard({ tool }: { tool: Tool }) {
   const config = statusConfig[tool.status];

   const content = (
      <div
         title={`${tool.title}\n${tool.description}`}
         className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all h-full ${
            tool.status === 'available'
               ? 'border-border/40 bg-muted/10 hover:bg-muted/25 hover:border-border/60 cursor-pointer'
               : 'border-border/20 bg-muted/5 opacity-70'
         }`}
      >
         {/* Icon */}
         <span className="text-lg shrink-0">{tool.icon}</span>

         {/* Info */}
         <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
               <h3 className="text-xs font-semibold text-foreground truncate">
                  {tool.title}
               </h3>
               {tool.isNew && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider shrink-0">
                     New
                  </span>
               )}
            </div>
            <p className="text-[10px] text-muted-foreground leading-snug line-clamp-1 mt-0.5">
               {tool.description}
            </p>
         </div>

         {/* Status Badge */}
         <div className="shrink-0">
            {tool.status === 'available' ? (
               <div className="flex items-center gap-1 text-[10px] font-medium text-primary">
                  <ExternalLink className="h-3 w-3" />
               </div>
            ) : (
               <span
                  className={`text-[9px] font-medium px-2 py-0.5 rounded-full border whitespace-nowrap ${config.className}`}
               >
                  {config.label}
               </span>
            )}
         </div>
      </div>
   );

   if (tool.status === 'available') {
      return (
         <Link href={tool.href} className="block">
            {content}
         </Link>
      );
   }

   return content;
}
