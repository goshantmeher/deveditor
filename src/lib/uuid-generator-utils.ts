/**
 * Utilities for generating UUIDs and ULIDs securely.
 */

// UUID v4 native generation
export function generateUuid(): string {
   if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
   }

   // Fallback for older browsers
   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
         v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
   });
}

// ULID Generation Implementation
// Crockford's Base32
const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
const ENCODING_LEN = ENCODING.length;
const TIME_MAX = Math.pow(2, 48) - 1;
const TIME_LEN = 10;
const RANDOM_LEN = 16;

export function generateUlid(seedTime?: number): string {
   const now = seedTime || Date.now();
   if (now > TIME_MAX) {
      throw new Error('Cannot construct ULID: timestamp too large');
   }

   const timeChars = encodeTime(now, TIME_LEN);
   const randomChars = encodeRandom(RANDOM_LEN);

   return timeChars + randomChars;
}

function encodeTime(now: number, len: number): string {
   let str = '';
   for (let i = 0; i < len; i++) {
      const mod = now % ENCODING_LEN;
      str = ENCODING.charAt(mod) + str;
      now = (now - mod) / ENCODING_LEN;
   }
   return str;
}

function encodeRandom(len: number): string {
   let str = '';
   const randomBytes = new Uint8Array(len);
   crypto.getRandomValues(randomBytes);
   for (let i = 0; i < len; i++) {
      // Map arbitrary byte [0,255] to base32 index [0,31]
      str += ENCODING.charAt(randomBytes[i] % ENCODING_LEN);
   }
   return str;
}
