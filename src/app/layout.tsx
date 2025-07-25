import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ThemeToggle from "@/components/themeToggle";
import BrandLogo from "@/components/brandLogo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://deveditor.io"),
  title: {
    default: "DevEditor - Developer Tools Collection",
    template: "%s | DevEditor",
  },
  description:
    "A comprehensive collection of free online developer tools including JSON viewer, CSS playground, Base64 encoder, JWT decoder and more. Built for developers, by developers.",
  keywords: [
    "developer tools",
    "online tools",
    "JSON viewer",
    "CSS playground",
    "Base64 encoder",
    "JWT decoder",
    "web development",
    "programming utilities",
    "free tools",
    "developer utilities",
  ],
  authors: [{ name: "DevEditor Team" }],
  creator: "DevEditor",
  publisher: "DevEditor",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://deveditor.io",
    title: "DevEditor - Developer Tools Collection",
    description:
      "A comprehensive collection of free online developer tools including JSON viewer, CSS playground, Base64 encoder, JWT decoder and more.",
    siteName: "DevEditor",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DevEditor - Developer Tools Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DevEditor - Developer Tools Collection",
    description:
      "A comprehensive collection of free online developer tools including JSON viewer, CSS playground, Base64 encoder, JWT decoder and more.",
    images: ["/twitter-image.png"],
    creator: "@deveditor",
  },
  verification: {
    google: "your-google-site-verification",
    yandex: "your-yandex-verification",
    yahoo: "your-yahoo-verification",
    other: {
      me: ["your-email@example.com", "https://your-website.com"],
    },
  },
  alternates: {
    canonical: "https://deveditor.io",
  },
  category: "technology",
  classification: "Developer Tools",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "DevEditor",
    alternateName: "Developer Tools Collection",
    description:
      "A comprehensive collection of free online developer tools including JSON viewer, CSS playground, Base64 encoder, JWT decoder and more.",
    url: "https://deveditor.io",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "DevEditor",
    },
    publisher: {
      "@type": "Organization",
      name: "DevEditor",
    },
    inLanguage: "en-US",
    isAccessibleForFree: true,
    applicationSubCategory: "Developer Tools",
    featureList: [
      "JSON Viewer and Formatter",
      "CSS Playground",
      "Base64 Encoder/Decoder",
      "JWT Token Decoder",
      "Developer Utilities",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header className="p-4 sticky top-0 h-14 z-50 flex items-center justify-between bg-sidebar border-b border dark:border-border">
            <div className="flex items-center gap-4">
              <BrandLogo />
            </div>

            <div className="flex items-center gap-4">
              <ThemeToggle />
            </div>
          </header>
          {children}
        </ThemeProvider>

        {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
          <span> Made with ❤️ by Goshant Meher</span>|
          <a
            className="text-sm text-muted-foreground hover:text-foreground"
            href="https://github.com/goshantmeher/deveditor"
          >
            View source on GitHub
          </a>
        </footer> */}
      </body>
    </html>
  );
}
