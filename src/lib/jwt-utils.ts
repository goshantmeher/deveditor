export interface JwtPayload {
   [key: string]: unknown;
}

export interface JwtHeader {
   alg: string;
   typ?: string;
   [key: string]: unknown;
}

export interface ParsedJwt {
   header: JwtHeader | null;
   payload: JwtPayload | null;
   signature: string | null;
   headerRaw: string;
   payloadRaw: string;
   signatureRaw: string;
   isValidStructure: boolean;
   error: string | null;
}

function base64UrlDecode(str: string): string {
   // Replace non-url compatible chars with base64 standard chars
   let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
   // Pad with '=' so length is a multiple of 4
   const pad = base64.length % 4;
   if (pad) {
      if (pad === 1) {
         throw new Error('InvalidBase64Url');
      }
      base64 += new Array(5 - pad).join('=');
   }
   // Decode base64 using atob, then URI decode for UTF-8 support
   return decodeURIComponent(
      Array.prototype.map
         .call(atob(base64), (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
         .join('')
   );
}

export function parseJwt(token: string): ParsedJwt {
   const defaultResult: ParsedJwt = {
      header: null,
      payload: null,
      signature: null,
      headerRaw: '',
      payloadRaw: '',
      signatureRaw: '',
      isValidStructure: false,
      error: null,
   };

   if (!token || typeof token !== 'string') {
      return { ...defaultResult, error: 'Empty token string' };
   }

   const parts = token.trim().split('.');
   if (parts.length < 2 || parts.length > 3) {
      return {
         ...defaultResult,
         error: 'A JWT must consist of 3 parts separated by dots',
      };
   }

   const [headerRaw, payloadRaw, signatureRaw = ''] = parts;
   const result = { ...defaultResult, headerRaw, payloadRaw, signatureRaw };

   try {
      try {
         result.header = JSON.parse(base64UrlDecode(headerRaw));
      } catch {
         return {
            ...result,
            error: 'Failed to parse header (Invalid Base64 or JSON)',
         };
      }

      try {
         result.payload = JSON.parse(base64UrlDecode(payloadRaw));
      } catch {
         return {
            ...result,
            error: 'Failed to parse payload (Invalid Base64 or JSON)',
         };
      }

      result.signature = signatureRaw;
      result.isValidStructure = true;
      return result;
   } catch {
      return { ...result, error: 'Invalid JWT structure or encoding' };
   }
}

export function formatTimestamp(ts: number): {
   formatted: string;
   relative: string;
   isExpired?: boolean;
} {
   const date = new Date(ts * 1000);
   const formatted = date.toLocaleString();
   const now = new Date();

   const diffMs = date.getTime() - now.getTime();
   const diffSec = Math.floor(diffMs / 1000);

   if (diffSec === 0) return { formatted, relative: 'Right now' };

   const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

   let relative = '';
   if (Math.abs(diffSec) < 60) {
      relative = rtf.format(diffSec, 'second');
   } else if (Math.abs(diffSec) < 3600) {
      relative = rtf.format(Math.floor(diffSec / 60), 'minute');
   } else if (Math.abs(diffSec) < 86400) {
      relative = rtf.format(Math.floor(diffSec / 3600), 'hour');
   } else if (Math.abs(diffSec) < 2592000) {
      relative = rtf.format(Math.floor(diffSec / 86400), 'day');
   } else if (Math.abs(diffSec) < 31536000) {
      relative = rtf.format(Math.floor(diffSec / 2592000), 'month');
   } else {
      relative = rtf.format(Math.floor(diffSec / 31536000), 'year');
   }

   return {
      formatted,
      relative,
      isExpired: diffSec < 0,
   };
}
