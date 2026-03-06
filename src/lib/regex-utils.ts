export interface RegexMatch {
   fullMatch: string;
   index: number;
   length: number;
   groups: RegexGroup[];
}

export interface RegexGroup {
   value: string | undefined;
   index: number | undefined;
   name: string | undefined;
}

export interface RegexRequest {
   id: string;
   pattern: string;
   flags: string;
   testString: string;
   timeoutMs?: number;
}

export interface RegexResponse {
   id: string;
   matches?: RegexMatch[];
   executionTimeMs?: number;
   error?: string;
   isTimeout?: boolean;
}

/**
 * Validates if a regex pattern and flags are syntactically correct.
 * @returns An error message if invalid, or null if valid.
 */
export function validateRegex(pattern: string, flags: string): string | null {
   if (!pattern) return null; // Empty pattern is treated as valid but matches nothing
   
   try {
      new RegExp(pattern, flags);
      return null;
   } catch (err: any) {
      return err.message || 'Invalid regular expression';
   }
}

/**
 * Creates a debounced function
 */
export function debounce<T extends (...args: any[]) => void>(
   func: T,
   wait: number
): (...args: Parameters<T>) => void {
   let timeoutId: NodeJS.Timeout | null = null;
   
   return function (...args: Parameters<T>) {
      if (timeoutId) {
         clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
         func(...args);
      }, wait);
   };
}
