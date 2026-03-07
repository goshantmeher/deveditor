// ── List / Array Converter Utilities ─────────────────────────

export type OutputFormat =
   | 'json-array'
   | 'json-array-numbers'
   | 'sql-in'
   | 'csv'
   | 'tsv'
   | 'python-list'
   | 'php-array'
   | 'go-slice'
   | 'ruby-array'
   | 'java-array'
   | 'single-line'
   | 'newline'
   | 'markdown-list'
   | 'html-ul'
   | 'unique'
   | 'sorted'
   | 'reversed'
   | 'trimmed';

export interface FormatOption {
   value: OutputFormat;
   label: string;
   description: string;
   category: 'code' | 'text' | 'transform';
}

export const FORMAT_OPTIONS: FormatOption[] = [
   // Code output formats
   {
      value: 'json-array',
      label: 'JSON Array (Strings)',
      description: '["a", "b", "c"]',
      category: 'code',
   },
   {
      value: 'json-array-numbers',
      label: 'JSON Array (Numbers)',
      description: '[1, 2, 3]',
      category: 'code',
   },
   {
      value: 'sql-in',
      label: 'SQL IN()',
      description: "('a', 'b', 'c')",
      category: 'code',
   },
   {
      value: 'python-list',
      label: 'Python List',
      description: "['a', 'b', 'c']",
      category: 'code',
   },
   {
      value: 'php-array',
      label: 'PHP Array',
      description: "['a', 'b', 'c']",
      category: 'code',
   },
   {
      value: 'go-slice',
      label: 'Go Slice',
      description: '[]string{"a", "b", "c"}',
      category: 'code',
   },
   {
      value: 'ruby-array',
      label: 'Ruby Array',
      description: "['a', 'b', 'c']",
      category: 'code',
   },
   {
      value: 'java-array',
      label: 'Java Array',
      description: '{"a", "b", "c"}',
      category: 'code',
   },

   // Text output formats
   {
      value: 'csv',
      label: 'Comma Separated',
      description: 'a, b, c',
      category: 'text',
   },
   {
      value: 'tsv',
      label: 'Tab Separated',
      description: 'a\\tb\\tc',
      category: 'text',
   },
   {
      value: 'single-line',
      label: 'Space Separated',
      description: 'a b c',
      category: 'text',
   },
   {
      value: 'newline',
      label: 'One Per Line',
      description: 'a\\nb\\nc',
      category: 'text',
   },
   {
      value: 'markdown-list',
      label: 'Markdown List',
      description: '- a\\n- b\\n- c',
      category: 'text',
   },
   {
      value: 'html-ul',
      label: 'HTML <ul>',
      description: '<ul><li>a</li>…</ul>',
      category: 'text',
   },

   // Transforms
   {
      value: 'unique',
      label: 'Deduplicate',
      description: 'Remove duplicates',
      category: 'transform',
   },
   {
      value: 'sorted',
      label: 'Sort A→Z',
      description: 'Alphabetical sort',
      category: 'transform',
   },
   {
      value: 'reversed',
      label: 'Reverse Order',
      description: 'Flip the list',
      category: 'transform',
   },
   {
      value: 'trimmed',
      label: 'Trim Whitespace',
      description: 'Strip & clean each item',
      category: 'transform',
   },
];

/**
 * Splits raw input text into a list of items.
 * Handles newlines, commas, tabs, and pipe-separated values.
 */
export function parseInput(raw: string, delimiter: 'auto' | 'newline' | 'comma' | 'tab' | 'pipe'): string[] {
   if (!raw.trim()) return [];

   let items: string[];

   if (delimiter === 'auto') {
      // Auto-detect: newlines first, then commas, then tabs, then pipes
      if (raw.includes('\n')) {
         items = raw.split('\n');
      } else if (raw.includes(',')) {
         items = raw.split(',');
      } else if (raw.includes('\t')) {
         items = raw.split('\t');
      } else if (raw.includes('|')) {
         items = raw.split('|');
      } else {
         // Single value or space-separated
         items = raw.split(/\s+/);
      }
   } else {
      const delimMap: Record<string, string | RegExp> = {
         newline: '\n',
         comma: ',',
         tab: '\t',
         pipe: '|',
      };
      items = raw.split(delimMap[delimiter]);
   }

   // Trim each item and remove empty strings
   return items.map((item) => item.trim()).filter((item) => item.length > 0);
}

/**
 * Format items into the requested output format.
 */
export function formatItems(items: string[], format: OutputFormat): string {
   if (items.length === 0) return '';

   switch (format) {
      case 'json-array':
         return JSON.stringify(items, null, 2);

      case 'json-array-numbers': {
         const nums = items.map((item) => {
            const n = Number(item);
            return isNaN(n) ? item : n;
         });
         // Check if all are numbers
         const allNumbers = nums.every((n) => typeof n === 'number');
         if (allNumbers) {
            return JSON.stringify(nums, null, 2);
         }
         // Fallback: quote non-numbers
         return JSON.stringify(nums, null, 2);
      }

      case 'sql-in':
         return `(${items.map((item) => `'${item.replace(/'/g, "''")}'`).join(', ')})`;

      case 'csv':
         return items.join(', ');

      case 'tsv':
         return items.join('\t');

      case 'python-list':
         return `[${items.map((item) => `'${item.replace(/'/g, "\\'")}'`).join(', ')}]`;

      case 'php-array':
         return `[${items.map((item) => `'${item.replace(/'/g, "\\'")}'`).join(', ')}]`;

      case 'go-slice':
         return `[]string{${items.map((item) => `"${item.replace(/"/g, '\\"')}"`).join(', ')}}`;

      case 'ruby-array':
         return `[${items.map((item) => `'${item.replace(/'/g, "\\'")}'`).join(', ')}]`;

      case 'java-array':
         return `{${items.map((item) => `"${item.replace(/"/g, '\\"')}"`).join(', ')}}`;

      case 'single-line':
         return items.join(' ');

      case 'newline':
         return items.join('\n');

      case 'markdown-list':
         return items.map((item) => `- ${item}`).join('\n');

      case 'html-ul':
         return `<ul>\n${items.map((item) => `  <li>${item}</li>`).join('\n')}\n</ul>`;

      case 'unique':
         return [...new Set(items)].join('\n');

      case 'sorted':
         return [...items].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })).join('\n');

      case 'reversed':
         return [...items].reverse().join('\n');

      case 'trimmed':
         return items.map((item) => item.trim()).join('\n');

      default:
         return items.join('\n');
   }
}
