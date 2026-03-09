'use client';

import { usePathname } from 'next/navigation';
import SettingsButton from './SettingsButton';
import { Github, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HeaderActions() {
   const pathname = usePathname();
   const normalizedPath = pathname.replace(/\/$/, '');

   // Some routes do not persist data (security/files), so we hide the toggle to avoid user confusion
   const noPersistenceRoutes = [
      '/password-strength',
      '/rsa-generator',
      '/pdf-to-text',
      '/extract-pdf',
      '/merge-pdf',
      '/split-pdf',
   ];
   const showPersistence = !noPersistenceRoutes.includes(normalizedPath);

   const SponsorButton = () => (
      <Link href="https://github.com/sponsors/goshantmeher" target="_blank" rel="noopener noreferrer">
         <Button
            variant="outline"
            size="sm"
            className="gap-2 h-9 hidden sm:flex border-pink-500/30 text-pink-400 hover:bg-pink-500/10 hover:text-pink-300"
         >
            <Heart className="h-4 w-4 fill-pink-400" />
            Sponsor
         </Button>
         <Button variant="ghost" size="icon" className="h-9 w-9 sm:hidden text-pink-400" aria-label="Sponsor on GitHub">
            <Heart className="h-4 w-4 fill-pink-400" />
         </Button>
      </Link>
   );

   const ContributeButton = () => (
      <Link href="https://github.com/goshantmeher/deveditor" target="_blank" rel="noopener noreferrer">
         <Button variant="outline" size="sm" className="gap-2 h-9 hidden sm:flex">
            <Github className="h-4 w-4" />
            Contribute
         </Button>
         <Button variant="ghost" size="icon" className="h-9 w-9 sm:hidden" aria-label="Contribute on GitHub">
            <Github className="h-4 w-4" />
         </Button>
      </Link>
   );

   return (
      <div className="header-actions-container flex items-center gap-2">
         <SponsorButton />
         <ContributeButton />
         <SettingsButton showPersistenceOption={showPersistence} />
      </div>
   );
}
