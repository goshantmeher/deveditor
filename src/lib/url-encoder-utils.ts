/**
 * Utilities for URL encoding/decoding and query parameter parsing.
 */

export type EncodingMode = 'component' | 'full' | 'space-only';

/**
 * Encodes a string based on the selected mode.
 */
export function encodeUrl(input: string, mode: EncodingMode): string {
   if (!input) return '';
   switch (mode) {
      case 'component':
         return encodeURIComponent(input);
      case 'full':
         return encodeURI(input);
      case 'space-only':
         return input.replace(/ /g, '%20');
      default:
         return encodeURIComponent(input);
   }
}

/**
 * Decodes a string based on the selected mode.
 */
export function decodeUrl(input: string, mode: EncodingMode): string {
   if (!input) return '';
   try {
      switch (mode) {
         case 'component':
            return decodeURIComponent(input);
         case 'full':
            return decodeURI(input);
         case 'space-only':
            return input.replace(/%20/g, ' ');
         default:
            return decodeURIComponent(input);
      }
   } catch {
      return '⚠️ Error: Invalid encoded string';
   }
}

export interface ParsedUrl {
   protocol: string;
   host: string;
   hostname: string;
   port: string;
   pathname: string;
   search: string;
   hash: string;
   origin: string;
   params: { key: string; value: string }[];
   isValid: boolean;
   error?: string;
}

/**
 * Parses a URL string into its components.
 */
export function parseUrl(input: string): ParsedUrl {
   const empty: ParsedUrl = {
      protocol: '',
      host: '',
      hostname: '',
      port: '',
      pathname: '',
      search: '',
      hash: '',
      origin: '',
      params: [],
      isValid: false,
   };

   if (!input.trim()) return empty;

   try {
      // If no protocol, assume https:// for parsing purposes
      let toParse = input.trim();
      if (!/^[a-zA-Z]+:\/\//.test(toParse)) {
         toParse = 'https://' + toParse;
      }

      const url = new URL(toParse);
      const params: { key: string; value: string }[] = [];
      url.searchParams.forEach((value, key) => {
         params.push({ key, value });
      });

      return {
         protocol: url.protocol,
         host: url.host,
         hostname: url.hostname,
         port: url.port,
         pathname: url.pathname,
         search: url.search,
         hash: url.hash,
         origin: url.origin,
         params,
         isValid: true,
      };
   } catch (e) {
      return {
         ...empty,
         error: e instanceof Error ? e.message : 'Invalid URL',
      };
   }
}

/**
 * Rebuilds a URL from parsed components and (optionally modified) params.
 */
export function rebuildUrl(parsed: ParsedUrl, params: { key: string; value: string }[]): string {
   if (!parsed.isValid) return '';
   try {
      const url = new URL(parsed.origin + parsed.pathname);
      url.hash = parsed.hash;
      // Clear existing params
      url.search = '';
      params.forEach(({ key, value }) => {
         if (key.trim()) {
            url.searchParams.append(key, value);
         }
      });
      return url.toString();
   } catch {
      return '';
   }
}

/**
 * Parses a raw query string (e.g., "foo=bar&baz=qux") into key-value pairs.
 */
export function parseQueryString(qs: string): { key: string; value: string }[] {
   if (!qs) return [];
   // Remove leading `?` if present
   const cleaned = qs.startsWith('?') ? qs.slice(1) : qs;
   if (!cleaned) return [];

   return cleaned.split('&').map((pair) => {
      const idx = pair.indexOf('=');
      if (idx === -1) return { key: decodeURIComponent(pair), value: '' };
      return {
         key: decodeURIComponent(pair.slice(0, idx)),
         value: decodeURIComponent(pair.slice(idx + 1)),
      };
   });
}

/**
 * Builds a query string from key-value pairs.
 */
export function buildQueryString(params: { key: string; value: string }[]): string {
   return params
      .filter(({ key }) => key.trim())
      .map(({ key, value }) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
}

/**
 * Sample URL for demonstration.
 */
export const SAMPLE_URL = 'https://example.com/search?query=hello%20world&lang=en&page=1&sort=relevance#results';

export const SAMPLE_TEXT = 'Hello World! How are you? Special chars: <>&"\'@#$%^*()';
