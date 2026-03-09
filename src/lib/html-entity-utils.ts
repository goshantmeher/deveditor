/**
 * Utilities for converting HTML entities.
 */

export type ConversionDirection = 'encode' | 'decode';

/** Named HTML entities — the most common ones developers encounter */
export const NAMED_ENTITIES: { char: string; entity: string; name: string; code: number }[] = [
   { char: '&', entity: '&amp;', name: 'Ampersand', code: 38 },
   { char: '<', entity: '&lt;', name: 'Less Than', code: 60 },
   { char: '>', entity: '&gt;', name: 'Greater Than', code: 62 },
   { char: '"', entity: '&quot;', name: 'Double Quote', code: 34 },
   { char: "'", entity: '&apos;', name: 'Apostrophe', code: 39 },
   { char: ' ', entity: '&nbsp;', name: 'Non-Breaking Space', code: 160 },
   { char: '©', entity: '&copy;', name: 'Copyright', code: 169 },
   { char: '®', entity: '&reg;', name: 'Registered', code: 174 },
   { char: '™', entity: '&trade;', name: 'Trademark', code: 8482 },
   { char: '°', entity: '&deg;', name: 'Degree', code: 176 },
   { char: '±', entity: '&plusmn;', name: 'Plus-Minus', code: 177 },
   { char: '×', entity: '&times;', name: 'Multiplication', code: 215 },
   { char: '÷', entity: '&divide;', name: 'Division', code: 247 },
   { char: '→', entity: '&rarr;', name: 'Right Arrow', code: 8594 },
   { char: '←', entity: '&larr;', name: 'Left Arrow', code: 8592 },
   { char: '↑', entity: '&uarr;', name: 'Up Arrow', code: 8593 },
   { char: '↓', entity: '&darr;', name: 'Down Arrow', code: 8595 },
   { char: '•', entity: '&bull;', name: 'Bullet', code: 8226 },
   { char: '…', entity: '&hellip;', name: 'Ellipsis', code: 8230 },
   { char: '€', entity: '&euro;', name: 'Euro', code: 8364 },
   { char: '£', entity: '&pound;', name: 'Pound', code: 163 },
   { char: '¥', entity: '&yen;', name: 'Yen', code: 165 },
   { char: '—', entity: '&mdash;', name: 'Em Dash', code: 8212 },
   { char: '–', entity: '&ndash;', name: 'En Dash', code: 8211 },
   { char: '¶', entity: '&para;', name: 'Paragraph', code: 182 },
   { char: '§', entity: '&sect;', name: 'Section', code: 167 },
   { char: '∞', entity: '&infin;', name: 'Infinity', code: 8734 },
   { char: '≠', entity: '&ne;', name: 'Not Equal', code: 8800 },
   { char: '≤', entity: '&le;', name: 'Less or Equal', code: 8804 },
   { char: '≥', entity: '&ge;', name: 'Greater or Equal', code: 8805 },
];

/**
 * Encode text to HTML entities.
 * Replaces all characters that have named HTML entities, plus
 * any non-ASCII characters using numeric references.
 */
export function encodeHtmlEntities(text: string, numericMode: boolean = false): string {
   if (!text) return '';

   // Build a map from char to entity
   const charMap = new Map<string, string>();
   for (const entry of NAMED_ENTITIES) {
      if (numericMode) {
         charMap.set(entry.char, `&#${entry.code};`);
      } else {
         charMap.set(entry.char, entry.entity);
      }
   }

   let result = '';
   for (const char of text) {
      if (charMap.has(char)) {
         result += charMap.get(char)!;
      } else {
         const cp = char.codePointAt(0)!;
         // Encode non-ASCII characters as numeric entities
         if (cp > 127) {
            result += `&#${cp};`;
         } else {
            result += char;
         }
      }
   }
   return result;
}

/**
 * Decode HTML entities back to text.
 * Uses a hidden textarea/DOM approach for robustness.
 */
export function decodeHtmlEntities(text: string): string {
   if (!text) return '';

   // First, handle named entities from our map
   const entityMap = new Map<string, string>();
   for (const entry of NAMED_ENTITIES) {
      entityMap.set(entry.entity.toLowerCase(), entry.char);
   }

   // Replace numeric entities (&#123; or &#x1F; format)
   let decoded = text.replace(/&#(\d+);/g, (_, num) => {
      return String.fromCodePoint(parseInt(num, 10));
   });
   decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => {
      return String.fromCodePoint(parseInt(hex, 16));
   });

   // Replace named entities
   decoded = decoded.replace(/&[a-zA-Z]+;/g, (entity) => {
      return entityMap.get(entity.toLowerCase()) ?? entity;
   });

   return decoded;
}

export const SAMPLE_TEXT_ENCODE = `<div class="container">
  <h1>Hello & Welcome!</h1>
  <p>Price: €29.99 — "Best Deal" ™</p>
  <a href="https://example.com?a=1&b=2">Click here →</a>
  <p>Copyright © 2026 DevEditor</p>
</div>`;

export const SAMPLE_TEXT_DECODE = `&lt;div class=&quot;container&quot;&gt;
  &lt;h1&gt;Hello &amp; Welcome!&lt;/h1&gt;
  &lt;p&gt;Price: &euro;29.99 &mdash; &quot;Best Deal&quot; &trade;&lt;/p&gt;
  &lt;a href=&quot;https://example.com?a=1&amp;b=2&quot;&gt;Click here &rarr;&lt;/a&gt;
  &lt;p&gt;Copyright &copy; 2026 DevEditor&lt;/p&gt;
&lt;/div&gt;`;
