'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { STORAGE_KEYS } from '@/constants/storage';

const MAX_RECENT = 8;

/**
 * Silently tracks the current tool page visit into localStorage.
 * Renders nothing — purely a side-effect component.
 * Mounted inside the (playground) layout so every tool page auto-tracks.
 */
export function TrackPageVisit() {
   const pathname = usePathname();

   useEffect(() => {
      if (!pathname || pathname === '/') return;
      // Normalize: remove trailing slash so it matches tool hrefs (/word-counter not /word-counter/)
      const normalized = pathname.replace(/\/$/, '');
      try {
         const stored = localStorage.getItem(STORAGE_KEYS.RECENTLY_USED);
         const prev: string[] = stored ? JSON.parse(stored) : [];
         const next = [normalized, ...prev.filter((h) => h !== normalized)].slice(0, MAX_RECENT);
         localStorage.setItem(STORAGE_KEYS.RECENTLY_USED, JSON.stringify(next));
      } catch { /* ignore */ }
   }, [pathname]);

   return null;
}
