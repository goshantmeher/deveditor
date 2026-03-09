'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface PersistenceContextType {
   isPersistenceEnabled: boolean;
   togglePersistence: () => void;
   isMounted: boolean;
}

const PersistenceContext = createContext<PersistenceContextType | undefined>(undefined);

// Prefix used by all tool storage keys
const TOOL_STORAGE_PREFIX = 'deveditor-';

export function PersistenceProvider({ children }: { children: React.ReactNode }) {
   const [isPersistenceEnabled, setIsPersistenceEnabled] = useState(true);
   const [isMounted, setIsMounted] = useState(false);

   // Load initial state on mount
   useEffect(() => {
      setIsMounted(true);
      const stored =
         localStorage.getItem('deveditor-persistence-enabled') ??
         localStorage.getItem('json-editor-persistence-enabled');
      if (stored !== null) {
         setIsPersistenceEnabled(stored === 'true');
      }
   }, []);

   // Only write back to localStorage after we have mounted so we don't overwrite user settings during SSR hydration
   useEffect(() => {
      if (!isMounted || typeof window === 'undefined') return;

      localStorage.setItem('deveditor-persistence-enabled', String(isPersistenceEnabled));
      localStorage.removeItem('json-editor-persistence-enabled');

      if (!isPersistenceEnabled) {
         const keysToRemove: string[] = [];
         for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith(TOOL_STORAGE_PREFIX) && key !== 'deveditor-persistence-enabled') {
               keysToRemove.push(key);
            }
         }
         keysToRemove.push('json-editor-left-data', 'json-editor-right-data');
         keysToRemove.forEach((key) => localStorage.removeItem(key));
      }
   }, [isPersistenceEnabled, isMounted]);

   const togglePersistence = () => {
      setIsPersistenceEnabled((prev) => !prev);
   };

   return (
      <PersistenceContext.Provider value={{ isPersistenceEnabled, togglePersistence, isMounted }}>
         {children}
      </PersistenceContext.Provider>
   );
}

export function usePersistence() {
   const context = useContext(PersistenceContext);
   if (context === undefined) {
      throw new Error('usePersistence must be used within a PersistenceProvider');
   }
   return context;
}
