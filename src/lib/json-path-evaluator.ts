import { JSONPath } from 'jsonpath-plus';

/**
 * Evaluates a JSONPath expression against a JSON object safely.
 * Returns the raw result matches (always an Array by JSONPath standard).
 */
export function evaluateJsonPath(json: unknown, path: string): unknown {
   try {
      return JSONPath({ path, json: json as object });
   } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Invalid JSONPath Expression');
   }
}
