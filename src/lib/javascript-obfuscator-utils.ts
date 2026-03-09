/**
 * Wrapper utility for javascript-obfuscator.
 */
import JavaScriptObfuscator from 'javascript-obfuscator';

export interface ObfuscationOptions {
   compact: boolean;
   controlFlowFlattening: boolean;
   deadCodeInjection: boolean;
   stringArray: boolean;
   stringArrayEncoding: 'none' | 'base64' | 'rc4';
   disableConsoleOutput: boolean;
   splitStrings: boolean;
}

export const DEFAULT_OBFUSCATION_OPTIONS: ObfuscationOptions = {
   compact: true,
   controlFlowFlattening: true,
   deadCodeInjection: false,
   stringArray: true,
   stringArrayEncoding: 'none',
   disableConsoleOutput: false,
   splitStrings: false,
};

export function obfuscateJavascript(code: string, options: ObfuscationOptions): string {
   if (!code || !code.trim()) return '';
   
   try {
      const obfuscationResult = JavaScriptObfuscator.obfuscate(code, {
         compact: options.compact,
         controlFlowFlattening: options.controlFlowFlattening,
         controlFlowFlatteningThreshold: options.controlFlowFlattening ? 0.75 : 0,
         deadCodeInjection: options.deadCodeInjection,
         deadCodeInjectionThreshold: options.deadCodeInjection ? 0.4 : 0,
         stringArray: options.stringArray,
         stringArrayEncoding: options.stringArrayEncoding !== 'none' ? [options.stringArrayEncoding] : [],
         stringArrayThreshold: options.stringArray ? 0.75 : 0,
         disableConsoleOutput: options.disableConsoleOutput,
         splitStrings: options.splitStrings,
         splitStringsChunkLength: options.splitStrings ? 10 : 0,
         // Safer defaults for browser execution environment mappings:
         target: 'browser',
         seed: 0,
         selfDefending: false,
      });

      return obfuscationResult.getObfuscatedCode();
   } catch (error) {
      console.error(error);
      throw new Error('Failed to parse or obfuscate provided JavaScript. Check for strict syntax errors.');
   }
}
