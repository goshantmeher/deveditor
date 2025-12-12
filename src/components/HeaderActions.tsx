'use client';

import { usePathname } from 'next/navigation';
import SettingsButton from './SettingsButton';
import InfoButton from './InfoButton';
import JsonEditorInfo from './json-editor/JsonEditorInfo';
import { PersistenceProvider } from '@/contexts/PersistenceContext';

export default function HeaderActions() {
   const pathname = usePathname();
   const isJsonEditor =
      pathname === '/json-editor' || pathname === '/json-editor/';

   if (isJsonEditor) {
      return (
         <PersistenceProvider>
            <div className="flex items-center gap-2">
               <InfoButton title="JSON Editor Guide">
                  <JsonEditorInfo />
               </InfoButton>
               <SettingsButton showPersistenceOption={true} />
            </div>
         </PersistenceProvider>
      );
   }

   return (
      <div className="flex items-center gap-2">
         <SettingsButton showPersistenceOption={false} />
      </div>
   );
}
