/**
 * Smart conversion utility that routes between main-thread and Web Worker
 * based on payload size, with automatic fallback if the Worker fails.
 *
 * Usage:
 *   const result = await smartConvert('yaml', 'toJson', yamlContent);
 *   const yamlStr = await smartConvert('yaml', 'fromJson', jsonStr);
 */

import { getConverter, WORKER_THRESHOLD_BYTES } from './index';
import { convertInWorker } from './worker-bridge';

/**
 * Format a byte count for display.
 * e.g. 1048576 → "1.0 MB", 512 → "512 B"
 */
export function formatFileSize(bytes: number): string {
   if (bytes < 1024) return `${bytes} B`;
   if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
   return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface ConvertResult {
   result: string;
   usedWorker: boolean;
   durationMs: number;
}

/**
 * Convert between formats, automatically using a Web Worker for large payloads
 * and falling back to main-thread if the Worker fails.
 *
 * @param formatKey  Format identifier (e.g. "yaml", "csv")
 * @param action     "toJson" or "fromJson"
 * @param payload    For "toJson": raw file content. For "fromJson": JSON.stringify'd data.
 * @returns          The converted string + metadata.
 */
export async function smartConvert(
   formatKey: string,
   action: 'toJson' | 'fromJson',
   payload: string
): Promise<ConvertResult> {
   const start = performance.now();
   const shouldUseWorker = payload.length > WORKER_THRESHOLD_BYTES;

   if (shouldUseWorker) {
      try {
         const result = await convertInWorker(formatKey, action, payload);
         return {
            result,
            usedWorker: true,
            durationMs: Math.round(performance.now() - start),
         };
      } catch (workerError) {
         // Worker failed — fall back to main thread
         console.warn(`Web Worker conversion failed, falling back to main thread:`, workerError);
      }
   }

   // Main-thread conversion (either small payload or worker fallback)
   const converter = getConverter(formatKey as 'json' | 'yaml' | 'csv' | 'xml' | 'toml');
   if (!converter) {
      throw new Error(`No converter registered for format: ${formatKey}`);
   }

   let result: string;
   if (action === 'toJson') {
      const parsed = converter.toJson(payload);
      result = JSON.stringify(parsed);
   } else {
      const data = JSON.parse(payload);
      result = converter.fromJson(data);
   }

   return {
      result,
      usedWorker: false,
      durationMs: Math.round(performance.now() - start),
   };
}

// ---------------------------------------------------------------------------
// localStorage helpers for remembering user preferences
// ---------------------------------------------------------------------------

const STORAGE_KEY_FORMAT = 'deveditor_export_format';

/** Save the last used export format. */
export function saveLastExportFormat(format: string): void {
   try {
      localStorage.setItem(STORAGE_KEY_FORMAT, format);
   } catch {
      // Ignore — localStorage might be full or disabled
   }
}

/** Load the last used export format. */
export function loadLastExportFormat(): string | null {
   try {
      return localStorage.getItem(STORAGE_KEY_FORMAT);
   } catch {
      return null;
   }
}
