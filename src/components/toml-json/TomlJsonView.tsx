'use client';

import React from 'react';
import { parse, stringify } from 'smol-toml';
import { Settings } from 'lucide-react';
import { DataConverterView, DataConverterConfig } from '@/components/data-converter/DataConverterView';
import { STORAGE_KEYS } from '@/constants/storage';

export function TomlJsonView() {
   const config: DataConverterConfig = {
      title: 'Transpiler',
      formatName: 'TOML',
      formatIcon: Settings,
      storageKey: STORAGE_KEYS.TOML_JSON_INPUT,
      defaultMode: 'format-to-json',
      defaultInput: '[server]\nport = 8080\nenv = "production"\n\n[database]\nhost = "localhost"\nport = 5432',
      parseToJson: (input: string) => {
         return parse(input);
      },
      jsonToFormat: (json: unknown) => {
         return stringify(json as any);
      },
   };

   return <DataConverterView config={config} />;
}
