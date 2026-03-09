import { evaluateJsonPath } from './json-path-evaluator';

/**
 * Filters JSON data by extracting a specific path using JSONPath
 * Example: filterJsonByPath(data, "$.store.book[*].author") 
 */
export function filterJsonByPath(data: unknown, path: string): unknown {
   if (!path || !data) {
      return data;
   }

   try {
      const result = evaluateJsonPath(data, path) as unknown[];
      
      if (!result || result.length === 0) {
         return null;
      }
      
      // If a single item is returned, unwrap it to mimic standard object access
      return result.length === 1 ? result[0] : result;
   } catch (e) {
      console.error('Invalid JSONPath expression', e);
      return null;
   }
}

/**
 * Validates if a path exists in the data
 */
export function isValidPath(data: unknown, path: string): boolean {
   const result = filterJsonByPath(data, path);
   return result !== null && result !== undefined;
}
