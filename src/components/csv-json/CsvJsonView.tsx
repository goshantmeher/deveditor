'use client';

import React from 'react';
import Papa from 'papaparse';
import { Table } from 'lucide-react';
import { DataConverterView, DataConverterConfig } from '@/components/data-converter/DataConverterView';
import { STORAGE_KEYS } from '@/constants/storage';

export function CsvJsonView() {
   const config: DataConverterConfig = {
      title: 'Transpiler',
      formatName: 'CSV',
      formatIcon: Table,
      storageKey: STORAGE_KEYS.CSV_JSON_INPUT,
      defaultMode: 'format-to-json',
      defaultInput: 'id,name,role\n1,Alice,Admin\n2,Bob,Editor\n3,Charlie,Viewer',
      parseToJson: (input: string) => {
         const parsed = Papa.parse(input, { header: true, skipEmptyLines: true });
         if (parsed.errors && parsed.errors.length > 0) {
            // Pick first major error
            throw new Error(parsed.errors[0].message);
         }
         return parsed.data;
      },
      jsonToFormat: (json: unknown) => {
         return Papa.unparse(json as any, { header: true });
      },
   };

   return <DataConverterView config={config} />;
}
