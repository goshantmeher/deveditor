/**
 * Utilities for converting strings between different programming cases.
 */

export type CaseType =
   | 'camelCase'
   | 'PascalCase'
   | 'snake_case'
   | 'CONSTANT_CASE'
   | 'kebab-case'
   | 'lowercase'
   | 'UPPERCASE'
   | 'Sentence case'
   | 'Title Case'
   | 'dot.case'
   | 'path/case';

/**
 * Tokenizes a string into an array of lowercase words.
 * Handles spaces, hyphens, underscores, and camelCase transitions.
 * Treats continuous uppercase blocks (acronyms) carefully.
 */
export function tokenizeWords(input: string): string[] {
   if (!input) return [];

   // Replace non-alphanumeric characters with spaces, then normalize spaces
   // But we also need to split camelCase/PascalCase: "XMLParser" -> "XML", "Parser"

   // 1. Add space before uppercase letters that are followed by lowercase (camelCase/PascalCase transition)
   // e.g., "myVariable" -> "my Variable", "XMLParser" -> "XML Parser"
   let spaced = input.replace(/([a-z])([A-Z])/g, '$1 $2');
   spaced = spaced.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');

   // 2. Replace separators (hyphens, underscores, dots, slashes) with spaces
   spaced = spaced.replace(/[-_.\\/:#]/g, ' ');

   // 3. Remove any remaining non-alphanumeric characters (except spaces)
   spaced = spaced.replace(/[^\w\s]/g, '');

   // 4. Split by whitespace and remove empty strings, convert to lowercase
   return spaced
      .split(/\s+/)
      .filter((word) => word.length > 0)
      .map((word) => word.toLowerCase());
}

/**
 * Converts an array of lower-cased words into the specified case.
 */
export function convertWordsToCase(words: string[], targetCase: CaseType): string {
   if (!words.length) return '';

   switch (targetCase) {
      case 'camelCase':
         return words.map((w, i) => (i === 0 ? w : capitalize(w))).join('');

      case 'PascalCase':
         return words.map(capitalize).join('');

      case 'snake_case':
         return words.join('_');

      case 'CONSTANT_CASE':
         return words.join('_').toUpperCase();

      case 'kebab-case':
         return words.join('-');

      case 'lowercase':
         return words.join(' ');

      case 'UPPERCASE':
         return words.join(' ').toUpperCase();

      case 'Sentence case': {
         const joined = words.join(' ');
         return joined.charAt(0).toUpperCase() + joined.slice(1);
      }

      case 'Title Case':
         return words.map(capitalize).join(' ');

      case 'dot.case':
         return words.join('.');

      case 'path/case':
         return words.join('/');

      default:
         return words.join(' ');
   }
}

function capitalize(word: string): string {
   if (!word) return '';
   return word.charAt(0).toUpperCase() + word.slice(1);
}

/**
 * Processes a multiline string line by line.
 */
export function convertMultilineText(text: string, targetCase: CaseType): string {
   if (!text) return '';
   return text
      .split('\n')
      .map((line) => {
         const whitespaceMatch = line.match(/^(\s*)(.*?)(\s*)$/);
         if (!whitespaceMatch) return line;

         const prefix = whitespaceMatch[1];
         const content = whitespaceMatch[2];
         const suffix = whitespaceMatch[3];

         if (!content) return line; // Empty line or just whitespace

         const words = tokenizeWords(content);
         if (words.length === 0) return line; // No alphanumeric chars

         const converted = convertWordsToCase(words, targetCase);
         return `${prefix}${converted}${suffix}`;
      })
      .join('\n');
}
