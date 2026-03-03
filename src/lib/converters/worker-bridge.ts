/**
 * Promise-based bridge to communicate with the converter Web Worker.
 *
 * Usage:
 *   const result = await convertInWorker('yaml', 'toJson', yamlString);
 *   const yamlStr = await convertInWorker('yaml', 'fromJson', JSON.stringify(data));
 *
 * The bridge lazily creates the worker on first call and reuses it.
 * Each call gets a unique ID so multiple concurrent conversions can
 * be in flight without collisions.
 */

let worker: Worker | null = null;
let messageId = 0;

interface PendingRequest {
   resolve: (result: string) => void;
   reject: (error: Error) => void;
}

const pending = new Map<string, PendingRequest>();

function getWorker(): Worker {
   if (!worker) {
      worker = new Worker(
         new URL('../../workers/converter.worker.ts', import.meta.url),
         { type: 'module' }
      );

      worker.onmessage = (e: MessageEvent) => {
         const { id, result, error } = e.data;
         const req = pending.get(id);
         if (!req) return;

         pending.delete(id);

         if (error) {
            req.reject(new Error(error));
         } else {
            req.resolve(result);
         }
      };

      worker.onerror = (e) => {
         // Reject all pending requests on worker crash
         const err = new Error(`Worker error: ${e.message}`);
         for (const [id, req] of pending) {
            req.reject(err);
            pending.delete(id);
         }
      };
   }

   return worker;
}

/**
 * Run a conversion in the Web Worker.
 *
 * @param formatKey - The format identifier (e.g. "yaml", "csv", "xml", "toml", "json")
 * @param action    - "toJson" to parse a file into JSON, "fromJson" to stringify data
 * @param payload   - For "toJson": the raw file content string.
 *                    For "fromJson": JSON-stringified data (use JSON.stringify).
 * @returns         - For "toJson": JSON-stringified parsed result (use JSON.parse).
 *                    For "fromJson": the formatted string in the target format.
 */
export function convertInWorker(
   formatKey: string,
   action: 'toJson' | 'fromJson',
   payload: string
): Promise<string> {
   return new Promise((resolve, reject) => {
      const id = `conv_${++messageId}`;
      pending.set(id, { resolve, reject });

      try {
         const w = getWorker();
         w.postMessage({ id, action, formatKey, payload });
      } catch (err) {
         pending.delete(id);
         reject(err instanceof Error ? err : new Error(String(err)));
      }
   });
}

/**
 * Terminate the worker (e.g. on page unload or cleanup).
 */
export function terminateWorker(): void {
   if (worker) {
      worker.terminate();
      worker = null;
      // Reject all pending
      for (const [id, req] of pending) {
         req.reject(new Error('Worker terminated'));
         pending.delete(id);
      }
   }
}
