'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface PersistenceContextType {
   isPersistenceEnabled: boolean;
   togglePersistence: () => void;
}

const PersistenceContext = createContext<PersistenceContextType | undefined>(
   undefined
);

export function PersistenceProvider({
   children,
}: {
   children: React.ReactNode;
}) {
   const [isPersistenceEnabled, setIsPersistenceEnabled] = useState(() => {
      if (typeof window === 'undefined') return true;
      const stored = localStorage.getItem('json-editor-persistence-enabled');
      return stored !== null ? stored === 'true' : true;
   });

   useEffect(() => {
      if (typeof window !== 'undefined') {
         localStorage.setItem(
            'json-editor-persistence-enabled',
            String(isPersistenceEnabled)
         );

         // Clear stored JSON data when persistence is disabled
         if (!isPersistenceEnabled) {
            localStorage.removeItem('json-editor-left-data');
            localStorage.removeItem('json-editor-right-data');
         }
      }
   }, [isPersistenceEnabled]);

   const togglePersistence = () => {
      setIsPersistenceEnabled((prev) => !prev);
   };

   return (
      <PersistenceContext.Provider
         value={{ isPersistenceEnabled, togglePersistence }}
      >
         {children}
      </PersistenceContext.Provider>
   );
}

export function usePersistence() {
   const context = useContext(PersistenceContext);
   if (context === undefined) {
      throw new Error(
         'usePersistence must be used within a PersistenceProvider'
      );
   }
   return context;
}
