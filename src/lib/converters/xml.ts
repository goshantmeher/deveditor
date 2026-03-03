/**
 * XML ↔ JSON converter.
 *
 * Uses `fast-xml-parser` which is lightweight and browser-compatible.
 * XML attributes are prefixed with `@_` to distinguish them from child elements.
 */

import { XMLParser, XMLBuilder } from 'fast-xml-parser';
import { registerConverter, type FormatConverter } from './index';

const xmlConverter: FormatConverter = {
   toJson(content: string): unknown {
      const parser = new XMLParser({
         ignoreAttributes: false,
         attributeNamePrefix: '@_',
         allowBooleanAttributes: true,
         parseTagValue: true,
         trimValues: true,
         isArray: (_name: string, _jpath: string, isLeafNode: boolean) => {
            // Preserve arrays for repeated elements
            return !isLeafNode;
         },
      });
      return parser.parse(content);
   },

   fromJson(data: unknown): string {
      const builder = new XMLBuilder({
         ignoreAttributes: false,
         attributeNamePrefix: '@_',
         format: true,
         indentBy: '  ',
         suppressBooleanAttributes: false,
         suppressEmptyNode: false,
      });

      const xml = builder.build(data);
      // Add XML declaration if not present
      const xmlStr = typeof xml === 'string' ? xml : String(xml);
      if (!xmlStr.startsWith('<?xml')) {
         return `<?xml version="1.0" encoding="UTF-8"?>\n${xmlStr}`;
      }
      return xmlStr;
   },

   extension: '.xml',
   extensions: ['.xml'],
   mimeType: 'application/xml',
   label: 'XML',

   canExport(): boolean {
      return true; // XML can represent any JSON structure
   },

   exportWarning(data: unknown): string | null {
      if (Array.isArray(data)) {
         return 'Root-level arrays will be wrapped in a <root> element';
      }
      return null;
   },
};

registerConverter('xml', xmlConverter);

export default xmlConverter;
