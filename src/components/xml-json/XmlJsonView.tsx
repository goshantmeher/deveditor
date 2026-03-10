'use client';

import React from 'react';
import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import { Code2 } from 'lucide-react';
import { DataConverterView, DataConverterConfig } from '@/components/data-converter/DataConverterView';
import { STORAGE_KEYS } from '@/constants/storage';

export function XmlJsonView() {
   const config: DataConverterConfig = {
      title: 'Transpiler',
      formatName: 'XML',
      formatIcon: Code2,
      storageKey: STORAGE_KEYS.XML_JSON_INPUT,
      defaultMode: 'format-to-json',
      defaultInput: '<root>\n  <user>\n    <id>1</id>\n    <name>Alice</name>\n  </user>\n</root>',
      parseToJson: (input: string) => {
         const parser = new XMLParser({ 
            ignoreAttributes: false,
            attributeNamePrefix: "@_"
         });
         const parsed = parser.parse(input);
         // if parsed is string, then it didn't parse xml correctly (invalid) or it's empty
         if (!parsed || typeof parsed !== 'object') {
            throw new Error('Invalid XML document');
         }
         return parsed;
      },
      jsonToFormat: (json: unknown, indent: number) => {
         const builder = new XMLBuilder({ 
            ignoreAttributes: false,
            format: true,
            indentBy: " ".repeat(indent),
            attributeNamePrefix: "@_"
         });
         return builder.build(json as any);
      },
   };

   return <DataConverterView config={config} />;
}
