import { HashGeneratorView } from '@/components/hash-generator/HashGeneratorView';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'Hash Generator - MD5, SHA-1, SHA-256, SHA-512 Online',
   description:
      'Generate secure MD5, SHA-1, SHA-256, and SHA-512 cryptographic hashes simultaneously. Free online client-side hashing tool for ultimate privacy.',
   keywords: [
      'hash generator',
      'md5 generator',
      'sha1 generator',
      'sha256 generator',
      'sha512 generator',
      'crypto hash',
      'hashing tool',
   ],
   openGraph: {
      title: 'Hash Generator - MD5, SHA-1, SHA-256, SHA-512',
      description:
         'Securely generate parallel MD5, SHA-1, SHA-256, and SHA-512 hashes in your browser without sending any text to the server.',
      url: 'https://www.deveditor.io/hash-generator',
      type: 'website',
   },
   twitter: {
      card: 'summary_large_image',
      title: 'Hash Generator - Multi-Algorithm Hasher',
      description: 'Generate secure cryptographical hashes online: MD5, SHA-1, SHA-256, SHA-512.',
   },
   alternates: {
      canonical: 'https://www.deveditor.io/hash-generator',
   },
};

import { HashGeneratorSeoContent } from '@/components/hash-generator/docs/HashGeneratorSeoContent';

export default function Page() {
   return (
      
         <div id="page-top" className="flex flex-col">
            {/* The main tool viewport */}
            <div className="h-[calc(100vh-72px)] shrink-0">
               <HashGeneratorView />
            </div>

            {/* SEO Content directly in the DOM, below the fold */}
            <div className="mt-8 border-t border-border/10 pt-8 pb-12 bg-background">
               <HashGeneratorSeoContent />
            </div>
         </div>
      
   );
}
