import { parseJson, stringifyJson } from './parser';

export type DiffType = 'added' | 'removed' | 'modified' | 'unchanged';

export interface JsonDiff {
   path: string;
   type: DiffType;
   leftValue?: unknown;
   rightValue?: unknown;
   lineNumber?: number;
}

export interface LineDiff {
   lineNumber: number;
   type: DiffType;
   content: string;
}

/**
 * Deep comparison of two JSON objects to identify differences
 */
export function compareJsonObjects(left: unknown, right: unknown, path: string = ''): JsonDiff[] {
   const diffs: JsonDiff[] = [];

   // Handle null/undefined cases
   if (left === null && right === null) return diffs;
   if (left === undefined && right === undefined) return diffs;

   if (left === null || left === undefined) {
      diffs.push({ path, type: 'added', rightValue: right });
      return diffs;
   }

   if (right === null || right === undefined) {
      diffs.push({ path, type: 'removed', leftValue: left });
      return diffs;
   }

   // Handle primitive types
   if (typeof left !== 'object' || typeof right !== 'object') {
      if (left !== right) {
         diffs.push({
            path,
            type: 'modified',
            leftValue: left,
            rightValue: right,
         });
      }
      return diffs;
   }

   // Handle arrays
   if (Array.isArray(left) && Array.isArray(right)) {
      const maxLength = Math.max(left.length, right.length);
      for (let i = 0; i < maxLength; i++) {
         const newPath = `${path}[${i}]`;
         if (i >= left.length) {
            diffs.push({ path: newPath, type: 'added', rightValue: right[i] });
         } else if (i >= right.length) {
            diffs.push({ path: newPath, type: 'removed', leftValue: left[i] });
         } else {
            diffs.push(...compareJsonObjects(left[i], right[i], newPath));
         }
      }
      return diffs;
   }

   if (Array.isArray(left) || Array.isArray(right)) {
      diffs.push({
         path,
         type: 'modified',
         leftValue: left,
         rightValue: right,
      });
      return diffs;
   }

   // Handle objects
   const leftObj = left as Record<string, unknown>;
   const rightObj = right as Record<string, unknown>;
   const allKeys = new Set([...Object.keys(leftObj), ...Object.keys(rightObj)]);

   for (const key of allKeys) {
      const newPath = path ? `${path}.${key}` : key;
      if (!(key in leftObj)) {
         diffs.push({
            path: newPath,
            type: 'added',
            rightValue: rightObj[key],
         });
      } else if (!(key in rightObj)) {
         diffs.push({
            path: newPath,
            type: 'removed',
            leftValue: leftObj[key],
         });
      } else {
         diffs.push(...compareJsonObjects(leftObj[key], rightObj[key], newPath));
      }
   }

   return diffs;
}

/**
 * Convert JSON diffs to line-based diffs for CodeMirror highlighting
 */
export function getLineDiffs(leftData: unknown, rightData: unknown): { left: LineDiff[]; right: LineDiff[] } {
   // Parse and stringify both sides to ensure consistent formatting
   let leftObj: unknown;
   let rightObj: unknown;

   if (typeof leftData === 'string') {
      const result = parseJson(leftData);
      leftObj = result.success ? result.data : leftData;
   } else {
      leftObj = leftData;
   }

   if (typeof rightData === 'string') {
      const result = parseJson(rightData);
      rightObj = result.success ? result.data : rightData;
   } else {
      rightObj = rightData;
   }

   // Get object diffs
   const diffs = compareJsonObjects(leftObj, rightObj);

   // Convert to line-based representation
   const leftLines = stringifyJson(leftObj, 2).split('\n');
   const rightLines = stringifyJson(rightObj, 2).split('\n');

   const leftDiffs: LineDiff[] = [];
   const rightDiffs: LineDiff[] = [];

   // Build a map of paths to their affected line numbers
   const leftPathLines = buildPathToLineMap(leftObj);
   const rightPathLines = buildPathToLineMap(rightObj);

   // Mark lines based on diffs
   const leftMarked = new Set<number>();
   const rightMarked = new Set<number>();

   for (const diff of diffs) {
      if (diff.type === 'removed' || diff.type === 'modified') {
         const lines = leftPathLines.get(diff.path);
         if (lines) {
            lines.forEach((line) => leftMarked.add(line));
         }
      }
      if (diff.type === 'added' || diff.type === 'modified') {
         const lines = rightPathLines.get(diff.path);
         if (lines) {
            lines.forEach((line) => rightMarked.add(line));
         }
      }
   }

   // Create line diffs
   leftLines.forEach((content, index) => {
      const lineNumber = index + 1;
      let type: DiffType = 'unchanged';
      if (leftMarked.has(lineNumber)) {
         // Check if it's removed or modified
         const pathDiff = diffs.find((d) => {
            const lines = leftPathLines.get(d.path);
            return lines && lines.includes(lineNumber);
         });
         type = pathDiff?.type === 'removed' ? 'removed' : 'modified';
      }
      leftDiffs.push({ lineNumber, type, content });
   });

   rightLines.forEach((content, index) => {
      const lineNumber = index + 1;
      let type: DiffType = 'unchanged';
      if (rightMarked.has(lineNumber)) {
         const pathDiff = diffs.find((d) => {
            const lines = rightPathLines.get(d.path);
            return lines && lines.includes(lineNumber);
         });
         type = pathDiff?.type === 'added' ? 'added' : 'modified';
      }
      rightDiffs.push({ lineNumber, type, content });
   });

   return { left: leftDiffs, right: rightDiffs };
}

/**
 * Build a map of JSON paths to their line numbers in the stringified output
 * This is a simplified version - exact line mapping would require AST parsing
 */
function buildPathToLineMap(obj: unknown): Map<string, number[]> {
   const map = new Map<string, number[]>();
   const jsonString = stringifyJson(obj, 2);
   const lines = jsonString.split('\n');

   // Simple heuristic: find lines containing keys and map them to paths
   // This is approximate and works for basic cases
   function traverse(current: unknown, path: string, startLine: number): number {
      if (current === null || current === undefined) return startLine;

      if (typeof current !== 'object') return startLine;

      if (Array.isArray(current)) {
         let currentLine = startLine;
         current.forEach((item, index) => {
            const newPath = `${path}[${index}]`;

            // For array items, we need to find the line where this item appears
            // Look for the value itself in the lines
            const itemStr = typeof item === 'object' ? '' : JSON.stringify(item);

            for (let i = currentLine; i < lines.length; i++) {
               const line = lines[i].trim();

               // Check if this line contains the array item
               if (typeof item === 'object') {
                  // For objects/arrays in array, look for opening bracket
                  if (line.startsWith('{') || line.startsWith('[')) {
                     const existing = map.get(newPath) || [];
                     map.set(newPath, [...existing, i + 1]);
                     currentLine = traverse(item, newPath, i + 1);
                     break;
                  }
               } else {
                  // For primitives in array, look for the value
                  if (line.includes(itemStr)) {
                     const existing = map.get(newPath) || [];
                     map.set(newPath, [...existing, i + 1]);
                     currentLine = i + 1;
                     break;
                  }
               }
            }
         });
         return currentLine;
      } else {
         const obj = current as Record<string, unknown>;
         let currentLine = startLine;
         Object.keys(obj).forEach((key) => {
            const newPath = path ? `${path}.${key}` : key;
            // Find line containing this key
            for (let i = currentLine; i < lines.length; i++) {
               if (lines[i].includes(`"${key}"`)) {
                  const existing = map.get(newPath) || [];
                  map.set(newPath, [...existing, i + 1]);
                  currentLine = traverse(obj[key], newPath, i + 1);
                  break;
               }
            }
         });
         return currentLine;
      }
   }

   traverse(obj, '', 0);
   return map;
}
