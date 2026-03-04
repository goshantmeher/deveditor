'use client';

import { usePathname } from 'next/navigation';
import SettingsButton from './SettingsButton';
import InfoButton from './InfoButton';
import JsonEditorInfo from './json-editor/docs/JsonEditorInfo';
import { PersistenceProvider } from '@/contexts/PersistenceContext';
import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HeaderActions() {
   const pathname = usePathname();
   const isJsonEditor =
      pathname === '/json-editor' || pathname === '/json-editor/';

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

   if (isJsonEditor) {
      return (
         <PersistenceProvider>
            <div className="header-actions-container flex items-center gap-2">
               <ContributeButton />
               <InfoButton title="JSON Editor Guide">
                  <JsonEditorInfo />
               </InfoButton>
               <SettingsButton showPersistenceOption={true} />
            </div>
         </PersistenceProvider>
      );
   }

   return (
      <div className="header-actions-container flex items-center gap-2">
         <ContributeButton />
         <SettingsButton showPersistenceOption={false} />
      </div>
   );
}
