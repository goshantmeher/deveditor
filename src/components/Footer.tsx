import Link from 'next/link';
import { Heart, Shield } from 'lucide-react';

export function Footer() {
   return (
      <footer className="text-center text-sm text-muted-foreground border-t border-border/30 py-4 px-4 shrink-0">
         <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-1">
               <Heart className="h-3.5 w-3.5 text-red-500" />
               <span>Built by Human</span>
            </div>
            <span aria-hidden="true" className="text-border">|</span>
            <Link href="/about" className="hover:text-foreground transition-colors" aria-label="About DevEditor">
               About
            </Link>
            <span aria-hidden="true" className="text-border">|</span>
            <Link href="/privacy" className="hover:text-foreground transition-colors flex items-center gap-1" aria-label="Privacy Policy">
               <Shield className="h-3.5 w-3.5" />
               Privacy
            </Link>
         </div>
      </footer>
   );
}
