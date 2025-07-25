import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for better performance
  output: "export",
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

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
