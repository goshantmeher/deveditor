import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
   const baseUrl = 'https://www.deveditor.io';
   const now = new Date();

   // Core pages
   const corePages: MetadataRoute.Sitemap = [
      {
         url: baseUrl,
         lastModified: now,
         changeFrequency: 'weekly',
         priority: 1,
      },
      {
         url: `${baseUrl}/about`,
         lastModified: now,
         changeFrequency: 'monthly',
         priority: 0.4,
      },
      {
         url: `${baseUrl}/privacy`,
         lastModified: now,
         changeFrequency: 'yearly',
         priority: 0.3,
      },
   ];

   // All tool pages with their priorities
   const tools: { slug: string; priority: number }[] = [
      // Code & Data tools
      { slug: 'json-editor', priority: 0.9 },
      { slug: 'json-to-schema', priority: 0.8 },
      { slug: 'base64-encoder', priority: 0.8 },
      { slug: 'jwt-decoder', priority: 0.8 },
      { slug: 'regex-tester', priority: 0.8 },
      { slug: 'text-diff', priority: 0.7 },
      { slug: 'case-converter', priority: 0.7 },
      { slug: 'list-converter', priority: 0.7 },
      { slug: 'url-encoder', priority: 0.8 },
      { slug: 'markdown-converter', priority: 0.8 },

      // CSS & Design tools
      { slug: 'css-playground', priority: 0.9 },
      { slug: 'color-converter', priority: 0.8 },
      { slug: 'theme-generator', priority: 0.7 },
      { slug: 'qr-generator', priority: 0.8 },

      // PDF tools
      { slug: 'pdf-resume', priority: 0.9 },
      { slug: 'merge-pdf', priority: 0.8 },
      { slug: 'split-pdf', priority: 0.8 },
      { slug: 'extract-pdf', priority: 0.7 },
      { slug: 'pdf-to-text', priority: 0.7 },
   ];

   const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
      url: `${baseUrl}/${tool.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: tool.priority,
   }));

   return [...corePages, ...toolPages];
}
