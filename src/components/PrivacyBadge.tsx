import React from 'react';
import { Shield } from 'lucide-react';

interface PrivacyBadgeProps {
   className?: string;
   /** Extra note to append after the default text, e.g. "Your data never leaves your browser." */
   note?: string;
}

/**
 * Reusable privacy badge shown on tool pages to reassure users
 * that all processing is 100% client-side and nothing is sent to a server.
 */
export function PrivacyBadge({ className = '', note }: PrivacyBadgeProps) {
   return (
      <div
         className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium ${className}`}
      >
         <Shield className="h-3 w-3 shrink-0" />
         <span>100% client-side — nothing is sent to any server</span>
         {note && (
            <>
               <span className="text-emerald-400/50 mx-0.5">·</span>
               <span className="text-emerald-400/80">{note}</span>
            </>
         )}
      </div>
   );
}
