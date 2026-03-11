import { JwtDecoderView } from '@/components/jwt-decoder/JwtDecoderView';
import { JwtDecoderSeoContent } from '@/components/jwt-decoder/docs/JwtDecoderSeoContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: 'JWT Debugger & Decoder | Code & Content Tool',
   description:
      'Decode, examine, and debug JSON Web Tokens securely and completely client-side. Convert base64url payloads into human-readable JSON formats and formatted claims.',
   keywords: [
      'jwt',
      'jwt decoder',
      'jwt debugger',
      'parse jwt',
      'decode jwt',
      'json web token validator',
      'auth token inspector',
      'client side security',
   ],
   openGraph: {
      title: 'JWT Debugger & Decoder | DevEditor',
      description: 'Decode, examine, and debug JSON Web Tokens securely and completely client-side.',
      url: 'https://www.deveditor.io/jwt-decoder',
      siteName: 'DevEditor',
      type: 'website',
   },
   alternates: { canonical: 'https://www.deveditor.io/jwt-decoder' },
};

export default function JwtDecoderPage() {
   return (
      <div id="page-top" className="flex flex-col">
         {/* The main editor viewport */}
         <div className="h-[calc(100vh-72px)] shrink-0 w-full max-w-[1600px] mx-auto overflow-hidden bg-background border-x border-border/40">
            <JwtDecoderView />
         </div>

         {/* SEO Content directly in the DOM, below the fold */}
         <div className="mt-8 border-t border-border/10 pt-12 pb-16 bg-background">
            <JwtDecoderSeoContent />
         </div>
      </div>
   );
}
