import { useState, useRef, useEffect } from 'react';
import { EditorConfig } from '@/types/editor';
import { useLocalStorage } from './useLocalStorage';

interface EditorStateConfig {
   initialData: unknown;
   initialConfig: EditorConfig;
   storageKey?: string; // Optional localStorage key
   persistenceEnabled?: boolean; // Whether to persist data
}

export function useEditorState({
   initialData,
   initialConfig,
   storageKey,
   persistenceEnabled = true,
}: EditorStateConfig) {
   // Always call the hook, but only use it if storageKey is provided
   const [storedData, setStoredData] = useLocalStorage(storageKey || 'unused', initialData);

   const [data, setData] = useState<unknown>(storageKey && persistenceEnabled ? storedData : initialData);
   const [config, setConfig] = useState<EditorConfig>(initialConfig);
   const originalDataRef = useRef<unknown>(storageKey && persistenceEnabled ? storedData : initialData);

   // Sync data with localStorage when it changes (only if storageKey is provided and persistence is enabled)
   useEffect(() => {
      if (storageKey && persistenceEnabled) {
         setStoredData(data);
      }
   }, [data, storageKey, persistenceEnabled, setStoredData]);

   // Reset to initial data when persistence is disabled
   useEffect(() => {
      if (!persistenceEnabled) {
         setData(initialData);
         originalDataRef.current = initialData;
      }
   }, [persistenceEnabled, initialData]);

   const updateConfig = (newConfig: EditorConfig) => {
      setConfig((prevConfig) => ({ ...prevConfig, ...newConfig }));
   };

   const updateOriginalData = (newData: unknown) => {
      originalDataRef.current = newData;
   };

   return {
      data,
      setData,
      config,
      updateConfig,
      originalDataRef,
      updateOriginalData,
   };
}
