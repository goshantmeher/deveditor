/**
 * TOML ↔ JSON converter.
 *
 * TOML has a few structural constraints compared to JSON:
 * - Root must be a table (plain object), not an array or primitive.
 * - No `null` values — they get stripped during export.
 */

import { parse, stringify } from 'smol-toml';
import { registerConverter, type FormatConverter } from './index';

/**
 * Recursively strip `null` values from an object since TOML
 * doesn't support them.
 */
function stripNulls(obj: unknown): unknown {
   if (obj === null || obj === undefined) return undefined;
   if (Array.isArray(obj)) return obj.map(stripNulls).filter((v) => v !== undefined);
   if (typeof obj === 'object') {
      const result: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
         const stripped = stripNulls(value);
         if (stripped !== undefined) {
            result[key] = stripped;
         }
      }
      return result;
   }
   return obj;
}

const tomlConverter: FormatConverter = {
   toJson(content: string): unknown {
      return parse(content);
   },

   fromJson(data: unknown): string {
      if (
         typeof data !== 'object' ||
         data === null ||
         Array.isArray(data)
      ) {
         throw new Error(
            'TOML export requires JSON to be a plain object (not an array or primitive)'
         );
      }

      // Strip nulls since TOML doesn't support them
      const cleaned = stripNulls(data) as Record<string, unknown>;
      return stringify(cleaned);
   },

   extension: '.toml',
   extensions: ['.toml'],
   mimeType: 'application/toml',
   label: 'TOML',

   canExport(data: unknown): boolean {
      return (
         typeof data === 'object' && data !== null && !Array.isArray(data)
      );
   },

   exportWarning(data: unknown): string | null {
      if (
         typeof data !== 'object' ||
         data === null ||
         Array.isArray(data)
      ) {
         return 'TOML only supports plain objects as the root value';
      }

      // Check for null values
      const jsonStr = JSON.stringify(data);
      if (jsonStr.includes(':null') || jsonStr.includes(': null')) {
         return 'null values will be removed (TOML does not support null)';
      }

      return null;
   },
};

registerConverter('toml', tomlConverter);

export default tomlConverter;
