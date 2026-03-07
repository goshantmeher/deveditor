export interface RGB {
   r: number;
   g: number;
   b: number;
}

export interface HSL {
   h: number;
   s: number;
   l: number;
}

export interface CMYK {
   c: number;
   m: number;
   y: number;
   k: number;
}

/**
 * Parses a HEX string to RGB object
 */
export function hexToRgb(hex: string): RGB | null {
   const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
   const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);

   const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
   return result
      ? {
           r: parseInt(result[1], 16),
           g: parseInt(result[2], 16),
           b: parseInt(result[3], 16),
        }
      : null;
}

/**
 * Converts RGB object to HEX string
 */
export function rgbToHex({ r, g, b }: RGB): string {
   const toHex = (c: number) => {
      const hex = Math.max(0, Math.min(255, Math.round(c))).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
   };
   return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

/**
 * Converts RGB to HSL
 */
export function rgbToHsl({ r, g, b }: RGB): HSL {
   r /= 255;
   g /= 255;
   b /= 255;

   const max = Math.max(r, g, b);
   const min = Math.min(r, g, b);
   let h = 0;
   let s = 0;
   const l = (max + min) / 2;

   if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
         case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
         case g:
            h = (b - r) / d + 2;
            break;
         case b:
            h = (r - g) / d + 4;
            break;
      }
      h /= 6;
   }

   return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
   };
}

/**
 * Converts HSL to RGB
 */
export function hslToRgb({ h, s, l }: HSL): RGB {
   h /= 360;
   s /= 100;
   l /= 100;

   let r, g, b;

   if (s === 0) {
      r = g = b = l;
   } else {
      const hue2rgb = (p: number, q: number, t: number) => {
         if (t < 0) t += 1;
         if (t > 1) t -= 1;
         if (t < 1 / 6) return p + (q - p) * 6 * t;
         if (t < 1 / 2) return q;
         if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
         return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;

      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
   }

   return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
   };
}

/**
 * Converts RGB to CMYK
 */
export function rgbToCmyk({ r, g, b }: RGB): CMYK {
   let c = 1 - r / 255;
   let m = 1 - g / 255;
   let y = 1 - b / 255;
   let k = Math.min(c, m, y);

   if (k === 1) {
      return { c: 0, m: 0, y: 0, k: 100 };
   }

   c = Math.round(((c - k) / (1 - k)) * 100);
   m = Math.round(((m - k) / (1 - k)) * 100);
   y = Math.round(((y - k) / (1 - k)) * 100);
   k = Math.round(k * 100);

   return { c, m, y, k };
}

/**
 * Converts CMYK to RGB
 */
export function cmykToRgb({ c, m, y, k }: CMYK): RGB {
   c /= 100;
   m /= 100;
   y /= 100;
   k /= 100;

   const r = Math.round(255 * (1 - c) * (1 - k));
   const g = Math.round(255 * (1 - m) * (1 - k));
   const b = Math.round(255 * (1 - y) * (1 - k));

   return { r, g, b };
}

/**
 * Calculates relative luminance
 */
export function getLuminance({ r, g, b }: RGB): number {
   const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
   });
   return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Calculates contrast ratio between two colors
 */
export function getContrast(rgb1: RGB, rgb2: RGB): number {
   const l1 = getLuminance(rgb1);
   const l2 = getLuminance(rgb2);
   const brightest = Math.max(l1, l2);
   const darkest = Math.min(l1, l2);
   return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Returns WCAG rating for a contrast ratio
 */
export function getWcagRating(ratio: number) {
   return {
      aa: ratio >= 4.5,
      aaa: ratio >= 7,
      largeAa: ratio >= 3,
      largeAaa: ratio >= 4.5,
   };
}

/**
 * Generates palette colors
 */
export function generatePalette(
   hsl: HSL,
   type: 'complementary' | 'analogous' | 'triadic' | 'tetradic' | 'monochromatic'
) {
   const colors: HSL[] = [];

   switch (type) {
      case 'complementary':
         colors.push(hsl);
         colors.push({ ...hsl, h: (hsl.h + 180) % 360 });
         break;
      case 'analogous':
         colors.push({ ...hsl, h: (hsl.h + 330) % 360 });
         colors.push(hsl);
         colors.push({ ...hsl, h: (hsl.h + 30) % 360 });
         break;
      case 'triadic':
         colors.push(hsl);
         colors.push({ ...hsl, h: (hsl.h + 120) % 360 });
         colors.push({ ...hsl, h: (hsl.h + 240) % 360 });
         break;
      case 'tetradic':
         colors.push(hsl);
         colors.push({ ...hsl, h: (hsl.h + 90) % 360 });
         colors.push({ ...hsl, h: (hsl.h + 180) % 360 });
         colors.push({ ...hsl, h: (hsl.h + 270) % 360 });
         break;
      case 'monochromatic':
         colors.push({ ...hsl, l: Math.max(0, hsl.l - 40) });
         colors.push({ ...hsl, l: Math.max(0, hsl.l - 20) });
         colors.push(hsl);
         colors.push({ ...hsl, l: Math.min(100, hsl.l + 20) });
         colors.push({ ...hsl, l: Math.min(100, hsl.l + 40) });
         break;
   }

   return colors.map((c) => ({
      hex: rgbToHex(hslToRgb(c)),
      hsl: c,
      rgb: hslToRgb(c),
   }));
}
