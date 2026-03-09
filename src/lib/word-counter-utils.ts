/**
 * Utilities for analyzing text to count characters, words, lines, and more.
 */

export interface TextStats {
   characters: number;
   charactersNoSpaces: number;
   words: number;
   sentences: number;
   paragraphs: number;
   lines: number;
   byteSize: number;
   readingTimeMinutes: number;
   readingTimeSeconds: number;
}

/**
 * Calculates a comprehensive set of statistics for a given text string.
 */
export function analyzeText(text: string): TextStats {
   if (!text) {
      return {
         characters: 0,
         charactersNoSpaces: 0,
         words: 0,
         sentences: 0,
         paragraphs: 0,
         lines: 0,
         byteSize: 0,
         readingTimeMinutes: 0,
         readingTimeSeconds: 0,
      };
   }

   const characters = text.length;
   
   // Characters excluding whitespace
   const charactersNoSpaces = text.replace(/\s+/g, '').length;

   // Words: Split by whitespace and filter out empty strings
   // This correctly handles multiple spaces, tabs, newlines
   const wordsObject = text.trim().split(/\s+/);
   const words = wordsObject.length === 1 && wordsObject[0] === '' ? 0 : wordsObject.length;

   // Sentences: Naive approach splitting by sentence terminators
   // Accounts for Mrs., Dr., etc is hard natively, so we do a simple regex
   const sentenceMatch = text.match(/[^.!?]+[.!?]+(?:\s|$)/g);
   const sentences = sentenceMatch ? sentenceMatch.length : (text.trim() ? 1 : 0);

   // Paragraphs: Split by double newline usually
   const parasMatch = text.trim().split(/\n\s*\n/);
   const paragraphs = parasMatch.length === 1 && parasMatch[0] === '' ? 0 : parasMatch.length;

   // Lines: Split by newline
   const lines = text.split('\n').length;

   // Byte size: UTF-8 encoding
   const byteSize = new Blob([text]).size;

   // Reading time: Average adult reading speed is 200-250 words per minute.
   // We'll use 225 wpm.
   const wordsPerMinute = 225;
   const totalSeconds = (words / wordsPerMinute) * 60;
   const readingTimeMinutes = Math.floor(totalSeconds / 60);
   const readingTimeSeconds = Math.round(totalSeconds % 60);

   return {
      characters,
      charactersNoSpaces,
      words,
      sentences,
      paragraphs,
      lines,
      byteSize,
      readingTimeMinutes,
      readingTimeSeconds,
   };
}

/**
 * Formats a byte size into a human-readable string (KB, MB, etc)
 */
export function formatBytes(bytes: number, decimals = 2): string {
   if (!+bytes) return '0 Bytes';

   const k = 1024;
   const dm = decimals < 0 ? 0 : decimals;
   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

   const i = Math.floor(Math.log(bytes) / Math.log(k));

   return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
