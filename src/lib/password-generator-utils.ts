/**
 * Utilities for secure password generation and strength evaluation.
 */

export interface PasswordOptions {
   length: number;
   uppercase: boolean;
   lowercase: boolean;
   numbers: boolean;
   symbols: boolean;
   excludeSimilar: boolean; // "easy to read" mode: no i, l, 1, L, o, 0, O
}

// Character sets
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS_CHARS = '0123456789';
const SYMBOLS_CHARS = '!@#$%^&*()_+~`|}{[]:;?><,./-';
const SIMILAR_CHARS = /[ilLI|`oO0]/g;

/**
 * Generate a cryptographically secure password based on options
 */
export function generatePassword(options: PasswordOptions): string {
   if (options.length < 1) return '';

   let chars = '';
   let pLower = LOWERCASE_CHARS;
   let pUpper = UPPERCASE_CHARS;
   let pNum = NUMBERS_CHARS;
   let pSym = SYMBOLS_CHARS;

   if (options.excludeSimilar) {
      pLower = pLower.replace(SIMILAR_CHARS, '');
      pUpper = pUpper.replace(SIMILAR_CHARS, '');
      pNum = pNum.replace(SIMILAR_CHARS, '');
      pSym = pSym.replace(SIMILAR_CHARS, '');
   }

   if (options.lowercase) chars += pLower;
   if (options.uppercase) chars += pUpper;
   if (options.numbers) chars += pNum;
   if (options.symbols) chars += pSym;

   // If user unchecked everything, default to lowercase so it doesn't crash
   if (!chars) chars = pLower || 'abcdefghkmnpqrstuvwxyz';

   const passwordArray = new Uint32Array(options.length);
   crypto.getRandomValues(passwordArray);

   let generated = '';
   // Ensure at least one character from each selected pool if length permits
   const guarantee: string[] = [];
   if (options.lowercase && guarantee.length < options.length) {
      guarantee.push(pLower.charAt(getSecureRandomInt(pLower.length)));
   }
   if (options.uppercase && guarantee.length < options.length) {
      guarantee.push(pUpper.charAt(getSecureRandomInt(pUpper.length)));
   }
   if (options.numbers && guarantee.length < options.length) {
      guarantee.push(pNum.charAt(getSecureRandomInt(pNum.length)));
   }
   if (options.symbols && guarantee.length < options.length) {
      guarantee.push(pSym.charAt(getSecureRandomInt(pSym.length)));
   }

   // Fill the rest with random chars from the combined pool
   for (let i = guarantee.length; i < options.length; i++) {
      generated += chars.charAt(passwordArray[i] % chars.length);
   }

   // Shuffle the generated password + guaranteed chars so they aren't always at the front
   const combinedArray = (generated + guarantee.join('')).split('');
   for (let i = combinedArray.length - 1; i > 0; i--) {
      // Fisher-Yates shuffle using cryptographically secure random
      const j = getSecureRandomInt(i + 1);
      [combinedArray[i], combinedArray[j]] = [combinedArray[j], combinedArray[i]];
   }

   return combinedArray.join('');
}

// Helper to get a random int between [0, max-1] using Web Crypto
function getSecureRandomInt(max: number): number {
   const randomBuffer = new Uint32Array(1);
   crypto.getRandomValues(randomBuffer);
   return randomBuffer[0] % max;
}

/**
 * Very basic password strength estimator
 * Returns a score out of 100
 */
export function evaluatePasswordStrength(password: string): number {
   if (!password) return 0;

   let score = 0;

   // Length contribution (up to 40 points)
   if (password.length > 0) score += Math.min(password.length * 3, 40);

   // Variety contribution (up to 60 points)
   const hasLower = /[a-z]/.test(password);
   const hasUpper = /[A-Z]/.test(password);
   const hasNumber = /[0-9]/.test(password);
   const hasSymbol = /[^a-zA-Z0-9]/.test(password);

   const varieties = [hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;
   
   if (varieties === 1) score += 10;
   if (varieties === 2) score += 25;
   if (varieties === 3) score += 40;
   if (varieties === 4) score += 60;

   // Penalize for pure sequential or repetitive logic (rough)
   if (/^([a-zA-Z0-9])\1+$/.test(password)) score -= 30;
   if (/^[a-z]+$/.test(password) && password.length < 12) score -= 15;
   if (/^[0-9]+$/.test(password) && password.length < 12) score -= 20;

   return Math.max(0, Math.min(score, 100));
}
