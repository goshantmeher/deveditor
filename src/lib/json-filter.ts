/**
 * Filters JSON data by extracting a specific path
 * Example: filterJsonByPath(data, "data.favorites.books") returns only the books array
 */
export function filterJsonByPath(data: unknown, path: string): unknown {
   if (!path || !data) {
      return data;
   }

   // Remove leading/trailing whitespace and split by dots
   const parts = path.trim().split('.');
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   let current: any = data;

   for (const part of parts) {
      // Handle array notation like "items[0]"
      const arrayMatch = part.match(/^([^[]+)\[(\d+)]$/);

      if (arrayMatch) {
         const [, key, index] = arrayMatch;
         if (current && typeof current === 'object' && key in current) {
            current = current[key];
            if (Array.isArray(current)) {
               current = current[parseInt(index, 10)];
            } else {
               return null; // Path invalid
            }
         } else {
            return null; // Path not found
         }
      } else {
         // Regular property access
         if (current && typeof current === 'object' && part in current) {
            current = current[part];
         } else {
            return null; // Path not found
         }
      }
   }

   return current;
}

/**
 * Validates if a path exists in the data
 */
export function isValidPath(data: unknown, path: string): boolean {
   const result = filterJsonByPath(data, path);
   return result !== null && result !== undefined;
}
