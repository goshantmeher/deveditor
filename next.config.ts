import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
   // Enable static export for better performance
   output: 'export',
   trailingSlash: true,

   // Image optimization for static export
   images: {
      unoptimized: true,
   },

   // Generate sitemap and other SEO files
   experimental: {
      optimizeCss: true,
   },

   // Compress output
   compress: true,
};

export default nextConfig;
