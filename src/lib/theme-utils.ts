/**
 * Theme generation utilities
 * Generates semantic UI color themes from a single primary color
 */

export interface ThemeColor {
   label: string;
   hex: string;
   hsl: { h: number; s: number; l: number };
   description: string;
}

export interface ThemeScale {
   50: string;
   100: string;
   200: string;
   300: string;
   400: string;
   500: string;
   600: string;
   700: string;
   800: string;
   900: string;
   950: string;
}

export interface GeneratedTheme {
   name: string;
   primary: ThemeColor;
   secondary: ThemeColor;
   accent: ThemeColor;
   background: ThemeColor;
   foreground: ThemeColor;
   muted: ThemeColor;
   mutedForeground: ThemeColor;
   card: ThemeColor;
   cardForeground: ThemeColor;
   border: ThemeColor;
   destructive: ThemeColor;
   success: ThemeColor;
   warning: ThemeColor;
   info: ThemeColor;
   primaryScale: ThemeScale;
   mode: 'dark' | 'light';
}

// ── Color Math ────────────────────────────────────────────────

function hslToHex(h: number, s: number, l: number): string {
   h /= 360;
   s /= 100;
   l /= 100;
   let r: number, g: number, b: number;
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
   const toHex = (c: number) => {
      const hex = Math.max(0, Math.min(255, Math.round(c * 255))).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
   };
   return `#${toHex(r!)}${toHex(g!)}${toHex(b!)}`.toUpperCase();
}

export function hexToHsl(hex: string): { h: number; s: number; l: number } {
   let r = 0,
      g = 0,
      b = 0;
   const clean = hex.replace('#', '');
   if (clean.length === 3) {
      r = parseInt(clean[0] + clean[0], 16);
      g = parseInt(clean[1] + clean[1], 16);
      b = parseInt(clean[2] + clean[2], 16);
   } else if (clean.length === 6) {
      r = parseInt(clean.substring(0, 2), 16);
      g = parseInt(clean.substring(2, 4), 16);
      b = parseInt(clean.substring(4, 6), 16);
   }
   r /= 255;
   g /= 255;
   b /= 255;
   const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
   let h = 0,
      s = 0;
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

function clamp(val: number, min: number, max: number) {
   return Math.max(min, Math.min(max, val));
}

// ── Generate a full shade scale from a base HSL ──────────────

function generateScale(h: number, s: number): ThemeScale {
   // map scale levels to lightness values
   const lightnesses: Record<keyof ThemeScale, number> = {
      50: 97,
      100: 94,
      200: 86,
      300: 77,
      400: 66,
      500: 55,
      600: 45,
      700: 37,
      800: 29,
      900: 21,
      950: 13,
   };
   const scale: Record<string, string> = {};
   for (const [key, l] of Object.entries(lightnesses)) {
      // Slightly desaturate extremes
      const sat = key === '50' || key === '950' ? clamp(s - 10, 5, 95) : s;
      scale[key] = hslToHex(h, sat, l);
   }
   return scale as unknown as ThemeScale;
}

// ── Generate a complete theme from a primary hex color ────────

export function generateTheme(primaryHex: string, mode: 'dark' | 'light' = 'dark'): GeneratedTheme {
   const primary = hexToHsl(primaryHex);
   const { h, s } = primary;

   // Secondary: analogous shift (+30°), slightly desaturated
   const secH = (h + 30) % 360;
   const secS = clamp(s - 15, 10, 85);

   // Accent: complementary shift (+150°), vivid
   const accH = (h + 150) % 360;
   const accS = clamp(s + 5, 30, 95);

   // Destructive: Red tones
   const destH = 0;
   const destS = clamp(s, 50, 80);

   // Success: Green tones
   const successH = 142;
   const successS = clamp(s, 45, 75);

   // Warning: Amber/Yellow tones
   const warnH = 38;
   const warnS = clamp(s, 60, 90);

   // Info: Cyan/Blue tones
   const infoH = 199;
   const infoS = clamp(s, 50, 80);

   const makeColor = (label: string, ch: number, cs: number, cl: number, description: string): ThemeColor => ({
      label,
      hex: hslToHex(ch, cs, cl),
      hsl: { h: ch, s: cs, l: cl },
      description,
   });

   if (mode === 'dark') {
      return {
         name: 'Custom Theme',
         mode: 'dark',
         primary: makeColor('Primary', h, s, 55, 'Main brand color for buttons and interactive elements'),
         secondary: makeColor('Secondary', secH, secS, 30, 'Supporting color for secondary actions'),
         accent: makeColor('Accent', accH, accS, 55, 'Bold accent for highlights and badges'),
         background: makeColor('Background', h, clamp(s - 40, 5, 20), 7, 'Main page background'),
         foreground: makeColor('Foreground', h, clamp(s - 30, 5, 15), 95, 'Primary text color'),
         muted: makeColor('Muted', h, clamp(s - 35, 5, 20), 15, 'Subtle backgrounds for cards and sections'),
         mutedForeground: makeColor('Muted Foreground', h, clamp(s - 25, 5, 20), 55, 'Subdued text on muted surfaces'),
         card: makeColor('Card', h, clamp(s - 35, 5, 20), 10, 'Card surface color'),
         cardForeground: makeColor('Card Foreground', h, clamp(s - 30, 5, 15), 90, 'Text on card surfaces'),
         border: makeColor('Border', h, clamp(s - 30, 5, 20), 18, 'Border and divider color'),
         destructive: makeColor('Destructive', destH, destS, 50, 'Error states and destructive actions'),
         success: makeColor('Success', successH, successS, 50, 'Success states and confirmations'),
         warning: makeColor('Warning', warnH, warnS, 55, 'Warning states and caution indicators'),
         info: makeColor('Info', infoH, infoS, 50, 'Informational states and highlights'),
         primaryScale: generateScale(h, s),
      };
   } else {
      return {
         name: 'Custom Theme',
         mode: 'light',
         primary: makeColor('Primary', h, s, 45, 'Main brand color for buttons and interactive elements'),
         secondary: makeColor('Secondary', secH, secS, 70, 'Supporting color for secondary actions'),
         accent: makeColor('Accent', accH, accS, 45, 'Bold accent for highlights and badges'),
         background: makeColor('Background', h, clamp(s - 40, 2, 10), 99, 'Main page background'),
         foreground: makeColor('Foreground', h, clamp(s - 20, 5, 30), 8, 'Primary text color'),
         muted: makeColor('Muted', h, clamp(s - 30, 5, 20), 95, 'Subtle backgrounds for cards and sections'),
         mutedForeground: makeColor('Muted Foreground', h, clamp(s - 25, 5, 20), 45, 'Subdued text on muted surfaces'),
         card: makeColor('Card', h, clamp(s - 40, 2, 10), 100, 'Card surface color'),
         cardForeground: makeColor('Card Foreground', h, clamp(s - 20, 5, 30), 10, 'Text on card surfaces'),
         border: makeColor('Border', h, clamp(s - 30, 5, 20), 88, 'Border and divider color'),
         destructive: makeColor('Destructive', destH, destS, 50, 'Error states and destructive actions'),
         success: makeColor('Success', successH, successS, 40, 'Success states and confirmations'),
         warning: makeColor('Warning', warnH, warnS, 50, 'Warning states and caution indicators'),
         info: makeColor('Info', infoH, infoS, 45, 'Informational states and highlights'),
         primaryScale: generateScale(h, s),
      };
   }
}

// ── Export Formats ────────────────────────────────────────────

export function exportAsCSS(theme: GeneratedTheme): string {
   const tokens = [
      theme.primary,
      theme.secondary,
      theme.accent,
      theme.background,
      theme.foreground,
      theme.muted,
      theme.mutedForeground,
      theme.card,
      theme.cardForeground,
      theme.border,
      theme.destructive,
      theme.success,
      theme.warning,
      theme.info,
   ];
   const lines = [`:root {`];
   for (const t of tokens) {
      const name = t.label.toLowerCase().replace(/\s+/g, '-');
      const { h, s, l } = t.hsl;
      lines.push(`  --${name}: ${h} ${s}% ${l}%;`);
      lines.push(`  --${name}-hex: ${t.hex};`);
   }
   lines.push('');
   lines.push('  /* Primary Scale */');
   for (const [key, val] of Object.entries(theme.primaryScale)) {
      lines.push(`  --primary-${key}: ${val};`);
   }
   lines.push('}');
   return lines.join('\n');
}

export function exportAsTailwind(theme: GeneratedTheme): string {
   const scaleEntries = Object.entries(theme.primaryScale)
      .map(([key, val]) => `        ${key}: '${val}',`)
      .join('\n');

   return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '${theme.primary.hex}',
${scaleEntries}
        },
        secondary: {
          DEFAULT: '${theme.secondary.hex}',
        },
        accent: {
          DEFAULT: '${theme.accent.hex}',
        },
        background: '${theme.background.hex}',
        foreground: '${theme.foreground.hex}',
        muted: {
          DEFAULT: '${theme.muted.hex}',
          foreground: '${theme.mutedForeground.hex}',
        },
        card: {
          DEFAULT: '${theme.card.hex}',
          foreground: '${theme.cardForeground.hex}',
        },
        border: '${theme.border.hex}',
        destructive: '${theme.destructive.hex}',
        success: '${theme.success.hex}',
        warning: '${theme.warning.hex}',
        info: '${theme.info.hex}',
      },
    },
  },
};`;
}

export function exportAsJSON(theme: GeneratedTheme): string {
   const obj: Record<string, string> = {};
   const tokens = [
      theme.primary,
      theme.secondary,
      theme.accent,
      theme.background,
      theme.foreground,
      theme.muted,
      theme.mutedForeground,
      theme.card,
      theme.cardForeground,
      theme.border,
      theme.destructive,
      theme.success,
      theme.warning,
      theme.info,
   ];
   for (const t of tokens) {
      const name = t.label.toLowerCase().replace(/\s+/g, '-');
      obj[name] = t.hex;
   }
   obj['primary-scale'] = JSON.stringify(theme.primaryScale);
   return JSON.stringify({ ...obj, 'primary-scale': theme.primaryScale }, null, 2);
}
