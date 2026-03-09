'use client';

import { Input } from '@/components/ui/input';
import { Search, ChevronDown, Shield } from 'lucide-react';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Footer } from '@/components/Footer';

// ── Tool Status ──────────────────────────────────────────────
type ToolStatus = 'available' | 'coming-soon' | 'planned';

interface Tool {
   title: string;
   description: string;
   icon: string;
   href: string;
   status: ToolStatus;

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
            description: 'Encode & decode text, files, and images to Base64. Generate data URIs.',
            icon: '⚙️',
            href: '/base64-encoder',
            status: 'available',
            tags: ['base64', 'encode', 'decode', 'data uri'],
         },
         {
            title: 'Case Converter',
            description: 'Toggle between camelCase, snake_case, kebab-case, PascalCase, and more.',
            icon: '🔠',
            href: '/case-converter',
            status: 'available',
            tags: ['case', 'camelcase', 'snake', 'kebab', 'pascal'],
         },
         {
            title: 'URL Encoder / Decoder',
            description: 'Encode & decode URI components, parse & rebuild query parameters.',
            icon: '🔗',
            href: '/url-encoder',
            status: 'available',
            tags: ['url', 'uri', 'encode', 'decode', 'query'],
         },
         {
            title: 'Text Diff Checker',
            description: 'Side-by-side visual comparison of two text blocks with change highlighting.',
            icon: '📝',
            href: '/text-diff',
            status: 'available',
            tags: ['diff', 'compare', 'text', 'merge'],
         },
         {
            title: 'Markdown Generator',
            description:
               'Generate clean, sanitized HTML from markdown with live preview, toolbar, and Mermaid diagrams.',
            icon: '📖',
            href: '/markdown-converter',
            status: 'available',
            tags: ['markdown', 'md', 'preview', 'html', 'generator', 'mermaid'],
         },
         {
            title: 'List / Array Converter',
            description: 'Convert text columns to JSON arrays, SQL IN clauses, or CSV strings.',
            icon: '📋',
            href: '/list-converter',
            status: 'available',
            tags: ['list', 'array', 'json', 'sql', 'csv'],
         },
         {
            title: 'HTML Entity Converter',
            description: 'Convert symbols to HTML entities and back. Handles &amp;, &lt;, &gt; etc.',
            icon: '🏷️',
            href: '/html-entities',
            status: 'available',
            tags: ['html', 'entity', 'escape', 'unescape'],
         },
         {
            title: 'Lorem Ipsum Generator',
            description: 'Generate placeholder text — paragraphs, sentences, or words.',
            icon: '📄',
            href: '/lorem-ipsum',
            status: 'available',
            tags: ['lorem', 'ipsum', 'placeholder', 'dummy text'],
         },
         {
            title: 'Word / Character Counter',
            description: 'Count characters, words, lines, byte size, and estimated reading time.',
            icon: '🔢',
            href: '/word-counter',
            status: 'available',
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
            description: 'Decode JWT header, payload & signature. Inspect timestamps & claims.',
            icon: '🔐',
            href: '/jwt-decoder',
            status: 'available',
            tags: ['jwt', 'token', 'decode', 'auth', 'bearer'],
         },
         {
            title: 'Hash Generator',
            description: 'MD5, SHA-1, SHA-256, SHA-512 hashes from string.',
            icon: '🔒',
            href: '/hash-generator',
            status: 'available',
            tags: ['hash', 'md5', 'sha256', 'crypto'],
         },
         {
            title: 'Password Generator',
            description: 'Customizable: length, uppercase, variables, easy-to-read mode.',
            icon: '🔑',
            href: '/password-generator',
            status: 'available',
            tags: ['password', 'generator', 'security', 'random'],
         },
         {
            title: 'UUID / ULID Generator',
            description: 'Generate customizable batch lists of UUIDs and ULIDs.',
            icon: '🆔',
            href: '/uuid-generator',
            status: 'available',
            tags: ['uuid', 'ulid', 'guid', 'generator', 'id'],
         },
         {
            title: 'Bcrypt Tester',
            description: 'Check if a plaintext string matches a Bcrypt hash.',
            icon: '🛡️',
            href: '/bcrypt-tester',
            status: 'available',
            tags: ['bcrypt', 'hash', 'security', 'password'],
         },
         {
            title: 'RSA Key Pair Generator',
            description: 'Generate public/private key pairs locally.',
            icon: '🗝️',
            href: '/rsa-generator',
            status: 'available',
            tags: ['rsa', 'key', 'generator', 'security', 'pem'],
         },
         {
            title: 'Password Strength',
            description: 'Evaluate password entropy against zxcvbn patterns.',
            icon: '💪',
            href: '/password-strength',
            status: 'available',
            tags: ['password', 'strength', 'security', 'test'],
         },
         {
            title: 'JavaScript Obfuscator',
            description: 'Secure and minify your JS files online.',
            icon: '🥷',
            href: '/js-obfuscator',
            status: 'available',
            tags: ['js', 'minify', 'obfuscator', 'security'],
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
            description: 'Test & generate CSS or Tailwind features with live preview.',
            icon: '🎨',
            href: '/css-playground',
            status: 'available',
            tags: ['css', 'tailwind', 'playground', 'generator', 'shadow', 'gradient'],
         },
         {
            title: 'Color Converter & Palette',
            description: 'Convert HEX, RGB, HSL, CMYK. WCAG contrast checker & palette generator.',
            icon: '🌈',
            href: '/color-converter',
            status: 'available',
            tags: ['color', 'hex', 'rgb', 'hsl', 'palette', 'contrast', 'wcag'],
         },
         {
            title: 'SVG Optimizer',
            description: 'Minify SVG code — strip metadata, comments, and unnecessary attributes.',
            icon: '✂️',
            href: '/svg-optimizer',
            status: 'available',
            tags: ['svg', 'optimize', 'minify', 'clean'],
         },
         {
            title: 'Favicon Generator',
            description: 'Upload a PNG and generate all standard favicon sizes (16px to 512px).',
            icon: '⭐',
            href: '/favicon-generator',
            status: 'available',
            tags: ['favicon', 'icon', 'resize', 'png', 'ico'],
         },
         {
            title: 'Glassmorphism Generator',
            description: 'Visual sliders for backdrop-filter, border-radius and deep shadows with live preview.',
            icon: '🪟',
            href: '/glassmorphism-generator',
            status: 'available',
            tags: ['css', 'glassmorphism', 'shadow', 'tailwind', 'generator'],
         },
         {
            title: 'CSS Gradient Generator',
            description: 'Multi-stop linear, radial, and conic gradient builder with live preview and Tailwind output.',
            icon: '🎨',
            href: '/gradient-generator',
            status: 'available',
            tags: ['css', 'gradient', 'linear', 'radial', 'tailwind', 'color'],
         },
         {
            title: 'Tailwind CSS Lookup',
            description: 'Search Tailwind classes → CSS output. Paste CSS → get Tailwind equivalent.',
            icon: '🌬️',
            href: '/tailwind-lookup',
            status: 'available',
            tags: ['tailwind', 'css', 'class', 'lookup', 'convert'],
         },
         {
            title: 'Font Pair Previewer',
            description: 'Preview Google Font combinations with customizable sample text and sizes.',
            icon: '🔡',
            href: '/font-pair',
            status: 'available',
            tags: ['font', 'google fonts', 'pair', 'typography', 'preview'],
         },
         {
            title: 'Theme Generator',
            description:
               'Generate comprehensive UI themes (Tailwind/CSS tokens). Evaluate and export JSON automatically.',
            icon: '🖌️',
            href: '/theme-generator',
            status: 'available',
            tags: ['theme', 'colors', 'tailwind', 'json', 'export'],
         },
         {
            title: 'SVG to React Converter',
            description: 'Paste raw SVG code and get clean, camelCase React/JSX components instantly.',
            icon: '⚛️',
            href: '/svg-to-jsx',
            status: 'available',
            tags: ['svg', 'react', 'jsx', 'convert', 'camelcase'],
         },
         {
            title: 'OG / Meta Tag Generator',
            description: 'Visually generate <meta> tags for Twitter, Facebook, and Google with a live preview card.',
            icon: '🖥️',
            href: '/meta-tag-generator',
            status: 'available',
            tags: ['seo', 'meta', 'og', 'twitter', 'facebook', 'tags'],
         },
         {
            title: 'Robots.txt & Sitemap Generator',
            description: 'Generate formatted robots.txt rules and XML sitemaps to optimize search engine crawling.',
            icon: '🤖',
            href: '/seo-generators',
            status: 'available',
            tags: ['seo', 'robots', 'sitemap', 'crawler'],
         },
         {
            title: 'Code Minifier / Beautifier',
            description: 'Instantly compress or expand HTML, CSS, and JavaScript code. Runs entirely locally.',
            icon: '🗜️',
            href: '/code-minifier',
            status: 'available',
            tags: ['minify', 'beautify', 'compress', 'html', 'css', 'javascript'],
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
            description: 'Format, validate, and explore JSON data with tree view.',
            icon: '🧩',
            href: '/json-editor',
            status: 'available',
            tags: ['json', 'format', 'validate', 'tree', 'editor'],
         },
         {
            title: 'RegEx Tester',
            description: 'Live regex match highlighting, capture groups, and cheat sheet.',
            icon: '🔍',
            href: '/regex-tester',
            status: 'available',
            tags: ['regex', 'regular expression', 'match', 'pattern'],
         },
         {
            title: 'Cron Expression Parser',
            description: 'Convert cron syntax to plain English. Show next scheduled run times.',
            icon: '⏰',
            href: '/cron-parser',
            status: 'available',
            tags: ['cron', 'schedule', 'crontab', 'parser'],
         },
         {
            title: 'JSON → Schema Generator',
            description: 'Paste JSON → generate TypeScript interfaces, Go structs, or Zod schemas.',
            icon: '📐',
            href: '/json-to-schema',
            status: 'available',
            tags: ['json', 'typescript', 'go', 'rust', 'schema', 'interface', 'struct', 'zod'],
         },
         {
            title: 'Unix Timestamp Converter',
            description: 'Convert epoch timestamps ↔ human-readable dates. Relative time display.',
            icon: '🕐',
            href: '/unix-timestamp',
            status: 'available',
            tags: ['unix', 'timestamp', 'epoch', 'date', 'time'],
         },
         {
            title: 'YAML ↔ JSON Converter',
            description: 'Bidirectional YAML/JSON conversion with syntax validation.',
            icon: '🔄',
            href: '/yaml-json',
            status: 'available',
            tags: ['yaml', 'json', 'convert', 'config'],
         },
         {
            title: 'JSON Path / jq Playground',
            description: 'Query JSON data with JSONPath or jq-like expressions. Live results.',
            icon: '🎯',
            href: '/json-path',
            status: 'available',
            tags: ['jsonpath', 'jq', 'query', 'json', 'path'],
         },
         {
            title: 'JSON Compare / Diff',
            description: 'Compare the structures and values of two JSON objects. Visualizes deeply nested differences.',
            icon: '⚖️',
            href: '/json-compare',
            status: 'planned',
            tags: ['json', 'compare', 'diff', 'structure'],
         },
         {
            title: 'SQL Formatter',
            description: 'Format, beautify, and parse complex SQL queries into readable, multi-line statements.',
            icon: '🗄️',
            href: '/sql-formatter',
            status: 'planned',
            tags: ['sql', 'format', 'beautify', 'database', 'query'],
         },
         {
            title: '.htaccess Redirect Generator',
            description: 'Generate Apache/Nginx redirect rules for HTTPS, www/non-www, and custom 301 redirects.',
            icon: '🔀',
            href: '/htaccess-generator',
            status: 'planned',
            tags: ['htaccess', 'redirect', 'nginx', 'apache', '301'],
         },
         {
            title: 'API Tester (Extension Required)',
            description:
               'A local Postman alternative. Uses an open-source companion extension to bypass browser CORS restrictions safely.',
            icon: '📡',
            href: '/api-tester',
            status: 'planned',
            tags: ['api', 'tester', 'rest', 'http', 'postman', 'cors'],
         },
         {
            title: 'DNS Lookup (DoH)',
            description:
               'Perform quick DNS resolution (A, AAAA, MX, TXT) natively in the browser using free DNS-over-HTTPS APIs.',
            icon: '🌍',
            href: '/dns-lookup',
            status: 'planned',
            tags: ['dns', 'lookup', 'domain', 'doh', 'network'],
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
            description: 'Crop, resize, and convert images between PNG, JPEG, WebP, AVIF.',
            icon: '🖼️',
            href: '/image-converter',
            status: 'coming-soon',
            tags: ['image', 'crop', 'resize', 'convert', 'png', 'jpeg', 'webp'],
         },
         {
            title: 'Image Compressor',
            description: 'Compress JPEG/PNG/WebP with adjustable quality. Before/after comparison.',
            icon: '📦',
            href: '/image-compressor',
            status: 'planned',
            tags: ['image', 'compress', 'optimize', 'quality'],
         },
         {
            title: 'SVG → PNG / JPEG Converter',
            description: 'Render SVG onto canvas and export as raster image at custom resolution.',
            icon: '🔲',
            href: '/svg-to-png',
            status: 'planned',
            tags: ['svg', 'png', 'jpeg', 'convert', 'raster'],
         },
         {
            title: 'EXIF Data Viewer / Remover',
            description: 'Read and strip metadata from photos — GPS, camera info, and more.',
            icon: '📷',
            href: '/exif-remover',
            status: 'planned',
            tags: ['exif', 'metadata', 'photo', 'privacy', 'gps'],
         },
         {
            title: 'QR Code Generator',
            description:
               'Generate high-quality, customizable QR codes with custom colors, size, and error correction. Export as PNG or SVG.',
            icon: '📱',
            href: '/qr-generator',
            status: 'available',
            tags: ['qr', 'qrcode', 'svg', 'branding'],
         },
         {
            title: 'AI Resume Builder',
            description:
               'Import from ChatGPT, Claude, or Gemini. Pick a template, download PDF. 100% free, no paywalls.',
            icon: '📄',
            href: '/pdf-resume',
            status: 'available',
            tags: ['pdf', 'resume', 'cv', 'builder', 'free', 'ai', 'chatgpt'],
         },
         {
            title: 'Merge PDF',
            description: 'Combine multiple PDF files into one document. Drag to reorder, merge & download instantly.',
            icon: '📑',
            href: '/merge-pdf',
            status: 'available',
            tags: ['pdf', 'merge', 'combine', 'join'],
         },
         {
            title: 'Split PDF',
            description: 'Define page ranges and split a PDF into separate downloadable files.',
            icon: '✂️',
            href: '/split-pdf',
            status: 'available',
            tags: ['pdf', 'split', 'cut', 'pages'],
         },
         {
            title: 'Extract Pages',
            description: 'Select specific pages from a PDF and download them as a new document.',
            icon: '📄',
            href: '/extract-pdf',
            status: 'available',
            tags: ['pdf', 'extract', 'pages', 'select'],
         },
         {
            title: 'Copy PDF Text',
            description: 'Extract text content from any PDF document and copy it to your clipboard.',
            icon: '📋',
            href: '/pdf-to-text',
            status: 'available',
            tags: ['pdf', 'extract', 'text', 'copy', 'content'],
         },
         {
            title: 'PDF to Word (Doc)',
            description: 'Convert a PDF document into an editable Word Document format.',
            icon: '📝',
            href: '/pdf-to-doc',
            status: 'planned',
            tags: ['pdf', 'word', 'doc', 'docx', 'convert'],
         },
         {
            title: 'Word (Doc) to PDF',
            description: 'Convert an editable Word Document into a static PDF format.',
            icon: '🔄',
            href: '/doc-to-pdf',
            status: 'planned',
            tags: ['word', 'doc', 'docx', 'pdf', 'convert'],
         },
         {
            title: 'Add Pages to PDF',
            description: 'Insert additional blank pages or merge pages from another PDF into an existing one.',
            icon: '➕',
            href: '/add-pdf-pages',
            status: 'planned',
            tags: ['pdf', 'add', 'insert', 'pages', 'merge'],
         },
         {
            title: 'Audio/Video Format Converter',
            description: 'Convert media files in the browser natively (FFmpeg.wasm). Transform WebM to MP4 instantly.',
            icon: '🎞️',
            href: '/media-converter',
            status: 'planned',
            tags: ['video', 'audio', 'ffmpeg', 'mp4', 'webm', 'mp3'],
         },
         {
            title: 'SVG Editor & Animator',
            description: 'Visually edit paths and create multi-stage CSS/SMIL animations for SVG objects.',
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
            description: 'Parse CSV to JSON objects/arrays and back. Handle headers & delimiters.',
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
            description: 'Convert between binary, octal, decimal, and hexadecimal.',
            icon: '🔢',
            href: '/number-base',
            status: 'planned',
            tags: ['binary', 'octal', 'decimal', 'hex', 'base', 'convert'],
         },
         {
            title: 'Base64 File Encoder/Decoder',
            description: 'Drag and drop files to convert directly to string, or decode strings back to downloads.',
            icon: '🔤',
            href: '/base64-file',
            status: 'planned',
            tags: ['base64', 'file', 'encode', 'decode', 'string'],
         },
         {
            title: 'Markdown to HTML Converter',
            description: 'Parse, sanitize, and convert raw Markdown into rich, safe HTML output strings.',
            icon: '📝',
            href: '/markdown-to-html',
            status: 'planned',
            tags: ['markdown', 'md', 'html', 'convert', 'markup'],
         },
         {
            title: 'Mock Data Generator',
            description:
               'Define a schema and generate thousands of rows of realistic dummy data in JSON or CSV format.',
            icon: '🧪',
            href: '/mock-data',
            status: 'planned',
            tags: ['mock', 'data', 'faker', 'dummy', 'json', 'csv'],
         },
      ],
   },
   {
      id: 'misc',
      title: 'Miscellaneous & Fun',
      icon: '🎮',
      description: 'Handy tools and fun extras for your downtime',
      accentColor: 'rose',
      tools: [
         {
            title: 'Meme Generator',
            description: 'Upload images, overlay impact font, drag to position, and download.',
            icon: '😂',
            href: '/meme-generator',
            status: 'planned',
            tags: ['meme', 'generator', 'image', 'text', 'font'],
         },
         {
            title: 'ASCII Art Text Generator',
            description: 'Turn text into large ASCII art headers for code comments.',
            icon: '🎭',
            href: '/ascii-art',
            status: 'available',
            tags: ['ascii', 'art', 'text', 'figlet', 'banner'],
         },
         {
            title: 'Webcam Image Filter Booth',
            description: 'Capture webcam images and instantly apply CSS/local filters without any server uploads.',
            icon: '📸',
            href: '/webcam-filters',
            status: 'planned',
            tags: ['webcam', 'image', 'camera', 'filter', 'capture'],
         },
         {
            title: 'GIF Creator',
            description: 'Stitch a sequence of images or a short video clip into an animated GIF.',
            icon: '🎞️',
            href: '/gif-creator',
            status: 'planned',
            tags: ['gif', 'video', 'animation', 'create', 'image'],
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
      className: 'bg-background text-muted-foreground border-border/40',
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
   const [collapsedCategories, setCollapsedCategories] = useState<Set<string>>(new Set());

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
   const availableCount = allTools.filter((t) => t.status === 'available').length;

   return (
      <div className="min-h-screen bg-background">
         <div className="container mx-auto px-4 py-10 max-w-5xl">
            {/* ── Header ───────────────────────────────── */}
            <header className="text-center mb-10">
               <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Developer Tools
               </h1>
               <p className="text-muted-foreground text-base md:text-lg mb-2 max-w-2xl mx-auto">
                  Free, open-source developer tools — {availableCount} available, {totalToolCount - availableCount} more
                  on the way.
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
                     className="pl-10 h-11 text-sm bg-background border-border/40 focus:border-primary/50"
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
                     <span className="font-medium text-foreground">{searchQuery}</span>
                     &quot;
                  </p>
               )}
            </header>

            {/* ── Categories ───────────────────────────── */}
            <main className="space-y-6 mb-12">
               {filteredCategories.map((category) => {
                  const isCollapsed = !isSearching && collapsedCategories.has(category.id);
                  const accent = accentMap[category.accentColor] || accentMap.blue;
                  const catAvailable = category.tools.filter((t) => t.status === 'available').length;

                  return (
                     <section key={category.id} className="group">
                        {/* Category Header */}
                        <button
                           onClick={() => !isSearching && toggleCategory(category.id)}
                           className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border bg-linear-to-r ${accent} transition-all hover:opacity-90 ${
                              isSearching ? 'cursor-default' : 'cursor-pointer'
                           }`}
                        >
                           <span className="text-xl">{category.icon}</span>
                           <div className="flex-1 text-left">
                              <h2 className="text-sm font-semibold text-foreground">{category.title}</h2>
                              <p className="text-[11px] text-muted-foreground">{category.description}</p>
                           </div>
                           <div className="flex items-center gap-2">
                              <span className="text-[10px] text-muted-foreground tabular-nums">
                                 {catAvailable > 0 && (
                                    <span className="text-emerald-400 mr-1">{catAvailable} live</span>
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
         </div>
         <Footer />
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
               ? 'border-border bg-background hover:bg-muted/10 hover:border-border/60 cursor-pointer shadow-sm hover:shadow-md'
               : 'border-border/20 bg-background/50 opacity-70'
         }`}
      >
         {/* Icon */}
         <span className="text-lg shrink-0">{tool.icon}</span>

         {/* Info */}
         <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
               <h3 className="text-xs font-semibold text-foreground truncate">{tool.title}</h3>
            </div>
            <p className="text-[10px] text-muted-foreground leading-snug line-clamp-1 mt-0.5">{tool.description}</p>
         </div>

         {/* Status Indicator */}
         <div className="shrink-0">
            {tool.status === 'available' ? (
               <div className="relative flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div className="absolute w-2 h-2 rounded-full bg-emerald-500 animate-ping opacity-30" />
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
