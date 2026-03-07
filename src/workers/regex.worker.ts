import { RegexRequest, RegexResponse, RegexMatch, RegexGroup } from '@/lib/regex-utils';

function evaluateRegex(request: RegexRequest): RegexResponse {
   const { pattern, flags, testString, id } = request;

   if (!pattern) {
      return { id, matches: [], executionTimeMs: 0 };
   }

   const start = performance.now();

   try {
      // Create the RegEx. We ensure the global flag is present if we want all matches,
      // but we respect the user's flags. However, for a split-pane "view all matches"
      // tool, users typically expect global behavior to find everything.
      // We will leave it to the user to define 'g' in the UI if they want it.
      const regex = new RegExp(pattern, flags);

      const matches: RegexMatch[] = [];
      let match: RegExpExecArray | null;

      // Prevent infinite loops from zero-length matches (like /.*/g)
      let lastIndex = -1;

      // If 'g' or 'y' is not set, we just want the first match.
      const isGlobalOrSticky = regex.global || regex.sticky;

      while ((match = regex.exec(testString)) !== null) {
         // Prevent infinite loop on zero-width matches
         if (match.index === regex.lastIndex) {
            regex.lastIndex++;
         }

         // If a zero-length match didn't move the index forward even with the check,
         // break out (safety net).
         if (regex.lastIndex === lastIndex) {
            break;
         }
         lastIndex = regex.lastIndex;

         // Extract groups
         const groups: RegexGroup[] = [];

         // In modern JS, exec returns the full match as [0], and groups as [1..n].
         // Optional: named capturing groups are in match.groups (if any).
         for (let i = 1; i < match.length; i++) {
            groups.push({
               value: match[i],
               index: undefined, // Standard RegExp in JS doesn't provide exact start/end indices for individual groups without the 'd' flag.
               name: undefined,
            });
         }

         // If the modern 'd' (indices) flag is used, we can get precise group locations!
         if (match.indices) {
            for (let i = 1; i < match.length; i++) {
               const indices = match.indices[i];
               if (indices) {
                  groups[i - 1].index = indices[0];
               }
            }
         }

         matches.push({
            fullMatch: match[0],
            index: match.index,
            length: match[0].length,
            groups,
         });

         if (!isGlobalOrSticky) {
            break; // Only one match expected
         }
      }

      const end = performance.now();
      return {
         id,
         matches,
         executionTimeMs: end - start,
      };
   } catch (error) {
      const end = performance.now();
      return {
         id,
         error: (error as Error).message || 'Error executing regular expression',
         executionTimeMs: end - start,
      };
   }
}

self.onmessage = (e: MessageEvent<RegexRequest>) => {
   const request = e.data;

   // We execute immediately. The caller (main thread) is responsible for
   // terminating this worker if it takes longer than a certain threshold
   // (e.g., 2000ms), which is the standard way to handle catastrophic backtracking.

   const result = evaluateRegex(request);
   self.postMessage(result);
};
