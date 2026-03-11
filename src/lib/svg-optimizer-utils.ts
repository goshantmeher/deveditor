import { optimize } from 'svgo/browser';

export interface SvgOptimizerResult {
   optimizedSvg: string;
   originalBytes: number;
   optimizedBytes: number;
   savingsPercent: number;
   error: string | null;
}

export function optimizeSvgString(svgString: string): SvgOptimizerResult {
   if (!svgString || !svgString.trim()) {
      return {
         optimizedSvg: '',
         originalBytes: 0,
         optimizedBytes: 0,
         savingsPercent: 0,
         error: null,
      };
   }

   try {
      const originalBytes = new Blob([svgString]).size;

      const result = optimize(svgString, {
         multipass: true,
         plugins: [
            {
               name: 'preset-default',
               params: {
                  overrides: {
                     removeUnknownsAndDefaults: false,
                  },
               },
            },
            'sortAttrs',
         ],
      });

      const optimizedSvg = result.data;
      const optimizedBytes = new Blob([optimizedSvg]).size;
      const savingsPercent = originalBytes > 0 ? ((originalBytes - optimizedBytes) / originalBytes) * 100 : 0;

      return {
         optimizedSvg,
         originalBytes,
         optimizedBytes,
         savingsPercent,
         error: null,
      };
   } catch (error) {
      console.error('SVGO Error:', error);
      return {
         optimizedSvg: '',
         originalBytes: new Blob([svgString]).size,
         optimizedBytes: 0,
         savingsPercent: 0,
         error: error instanceof Error ? error.message : 'Unknown SVGO parsing error',
      };
   }
}
