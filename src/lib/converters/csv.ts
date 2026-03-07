/**
 * CSV ↔ JSON converter.
 *
 * CSV is inherently a flat, tabular format. This converter:
 * - Import: parses CSV rows into an array of objects (keys from header row).
 * - Export: only works when the JSON is a flat array of objects.
 */

import Papa from 'papaparse';
import { registerConverter, type FormatConverter } from './index';

/**
 * Check whether `data` is a flat array of plain objects (no nested
 * objects or arrays in values).
 */
function isFlatArrayOfObjects(data: unknown): boolean {
   if (!Array.isArray(data) || data.length === 0) return false;

   return data.every((item) => {
      if (typeof item !== 'object' || item === null || Array.isArray(item)) {
         return false;
      }
      // Check all values are primitives
      return Object.values(item as Record<string, unknown>).every(
         (v) => v === null || typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean'
      );
   });
}

const csvConverter: FormatConverter = {
   toJson(content: string): unknown {
      const result = Papa.parse(content, {
         header: true,
         dynamicTyping: true,
         skipEmptyLines: true,
      });

      if (result.errors.length > 0) {
         const first = result.errors[0];
         throw new Error(
            `CSV parse error: ${first.message}${first.row !== undefined ? ` (row ${first.row + 1})` : ''}`
         );
      }

      return result.data;
   },

   fromJson(data: unknown): string {
      if (!Array.isArray(data)) {
         throw new Error('CSV export requires JSON to be an array of objects');
      }
      return Papa.unparse(data);
   },

   extension: '.csv',
   extensions: ['.csv'],
   mimeType: 'text/csv',
   label: 'CSV',

   canExport(data: unknown): boolean {
      return Array.isArray(data) && data.length > 0;
   },

   exportWarning(data: unknown): string | null {
      if (!Array.isArray(data)) {
         return 'JSON must be an array of objects for CSV export';
      }
      if (!isFlatArrayOfObjects(data)) {
         return 'Nested values will be serialized as strings in CSV';
      }
      return null;
   },
};

registerConverter('csv', csvConverter);

export default csvConverter;
