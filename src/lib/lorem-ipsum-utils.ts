/**
 * Utilities for generating Lorem Ipsum placeholder text
 */

export type LoremType = 'paragraphs' | 'sentences' | 'words';

const WORDS = [
   'lorem',
   'ipsum',
   'dolor',
   'sit',
   'amet',
   'consectetur',
   'adipiscing',
   'elit',
   'sed',
   'do',
   'eiusmod',
   'tempor',
   'incididunt',
   'ut',
   'labore',
   'et',
   'dolore',
   'magna',
   'aliqua',
   'enim',
   'ad',
   'minim',
   'veniam',
   'quis',
   'nostrud',
   'exercitation',
   'ullamco',
   'laboris',
   'nisi',
   'aliquip',
   'ex',
   'ea',
   'commodo',
   'consequat',
   'duis',
   'aute',
   'irure',
   'in',
   'reprehenderit',
   'voluptate',
   'velit',
   'esse',
   'cillum',
   'eu',
   'fugiat',
   'nulla',
   'pariatur',
   'excepteur',
   'sint',
   'occaecat',
   'cupidatat',
   'non',
   'proident',
   'sunt',
   'culpa',
   'qui',
   'officia',
   'deserunt',
   'mollit',
   'anim',
   'id',
   'est',
   'laborum',
   'fermentum',
   'iaculis',
   'urna',
   'varius',
   'orci',
   'phasellus',
   'pellentesque',
   'faucibus',
   'malesuada',
   'fames',
   'ac',
   'turpis',
   'egestas',
   'integer',
   'feugiat',
   'scelerisque',
   'nisl',
   'elementum',
   'tristique',
   'sapien',
   'arcu',
   'cursus',
   'vitae',
   'congue',
   'mauris',
   'rhoncus',
   'aenean',
   'blandit',
   'aliquet',
   'nibh',
   'praesent',
   'justo',
   'dapibus',
   'vulputate',
   'tellus',
   'semper',
   'auctor',
   'neque',
   'habitant',
   'morbi',
   'senectus',
   'netus',
   'dictum',
   'dictumst',
   'tempus',
   'mattis',
];

// Helper to get random number between min and max inclusive
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Helper to get random words
const getRandomWords = (count: number): string[] => {
   const result: string[] = [];
   for (let i = 0; i < count; i++) {
      result.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
   }
   return result;
};

// Generate a sentence
const generateSentence = (): string => {
   // Sentence length between 5 and 15 words
   const wordCount = randomInt(5, 15);
   const words = getRandomWords(wordCount);
   // Capitalize first word and add period
   words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
   return words.join(' ') + '.';
};

// Generate a paragraph
const generateParagraph = (): string => {
   // Paragraph length between 4 and 8 sentences
   const sentenceCount = randomInt(4, 8);
   const sentences: string[] = [];
   for (let i = 0; i < sentenceCount; i++) {
      sentences.push(generateSentence());
   }
   return sentences.join(' ');
};

/**
 * Generate Lorem Ipsum text based on type and count
 */
export function generateLoremIpsum(type: LoremType, count: number, startWithLorem: boolean = true): string {
   if (count <= 0) return '';

   let result = '';

   switch (type) {
      case 'words': {
         const words = getRandomWords(count);
         if (startWithLorem && count >= 2) {
            words[0] = 'Lorem';
            words[1] = 'ipsum';
            if (count >= 3) words[2] = 'dolor';
            if (count >= 4) words[3] = 'sit';
            if (count >= 5) words[4] = 'amet';
         } else if (words.length > 0) {
            // Just capitalize the first word if we don't start with "Lorem ipsum"
            words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
         }
         result = words.join(' ');
         break;
      }
      case 'sentences': {
         const sentences: string[] = [];
         for (let i = 0; i < count; i++) {
            if (i === 0 && startWithLorem) {
               // First sentence starts with standard Lorem ipsum
               const wordCount = randomInt(5, 15);
               const words = getRandomWords(wordCount);
               words[0] = 'Lorem';
               words[1] = 'ipsum';
               words[2] = 'dolor';
               words[3] = 'sit';
               words[4] = 'amet,';
               sentences.push(words.join(' ') + '.');
            } else {
               sentences.push(generateSentence());
            }
         }
         result = sentences.join(' ');
         break;
      }
      case 'paragraphs': {
         const paragraphs: string[] = [];
         for (let i = 0; i < count; i++) {
            if (i === 0 && startWithLorem) {
               // Mix of standard lorem ipsum with random sentences
               const p =
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
                  generateParagraph();
               paragraphs.push(p);
            } else {
               paragraphs.push(generateParagraph());
            }
         }
         result = paragraphs.join('\n\n');
         break;
      }
   }

   return result;
}
