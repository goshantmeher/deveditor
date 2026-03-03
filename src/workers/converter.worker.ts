/**
 * Web Worker for heavy format conversions.
 *
 * Receives messages of shape { id, action, formatKey, content/data }
 * and replies with { id, result?, error? }.
 *
 * The worker lazily imports converter modules so it doesn't bloat
 * the main bundle — only the formats actually used get loaded.
 */

// We inline the converter logic here because Web Workers run in a
// separate context and can't share module imports with the main thread
// in all bundler setups. Each converter is lazily loaded on first use.

interface WorkerRequest {
   id: string;
   action: 'toJson' | 'fromJson';
   formatKey: string;
   payload: string; // for toJson: raw file content; for fromJson: JSON-stringified data
}

interface WorkerResponse {
   id: string;
   result?: string; // for toJson: JSON-stringified result; for fromJson: formatted string
   error?: string;
}

// Converter function pairs
type ConverterFns = {
   toJson: (content: string) => unknown;
   fromJson: (data: unknown) => string;
};

const converterCache = new Map<string, ConverterFns>();

async function getConverterFns(formatKey: string): Promise<ConverterFns> {
   if (converterCache.has(formatKey)) {
      return converterCache.get(formatKey)!;
   }

   let fns: ConverterFns;

   switch (formatKey) {
      case 'json':
         fns = {
            toJson: (content: string) => JSON.parse(content),
            fromJson: (data: unknown) => JSON.stringify(data, null, 2),
         };
         break;

      case 'yaml': {
         const yaml = await import('js-yaml');
         fns = {
            toJson: (content: string) => yaml.load(content),
            fromJson: (data: unknown) =>
               yaml.dump(data, { indent: 2, lineWidth: -1 }),
         };
         break;
      }

      case 'csv': {
         const Papa = await import('papaparse');
         fns = {
            toJson: (content: string) => {
               const result = Papa.parse(content, {
                  header: true,
                  dynamicTyping: true,
                  skipEmptyLines: true,
               });
               if (result.errors.length > 0) {
                  throw new Error(
                     `CSV parse error: ${result.errors[0].message} (row ${result.errors[0].row})`
                  );
               }
               return result.data;
            },
            fromJson: (data: unknown) => {
               if (!Array.isArray(data)) {
                  throw new Error(
                     'CSV export requires JSON to be an array of objects'
                  );
               }
               return Papa.unparse(data);
            },
         };
         break;
      }

      case 'xml': {
         const { XMLParser, XMLBuilder } = await import('fast-xml-parser');
         fns = {
            toJson: (content: string) => {
               const parser = new XMLParser({
                  ignoreAttributes: false,
                  attributeNamePrefix: '@_',
                  allowBooleanAttributes: true,
                  parseTagValue: true,
                  trimValues: true,
               });
               return parser.parse(content);
            },
            fromJson: (data: unknown) => {
               const builder = new XMLBuilder({
                  ignoreAttributes: false,
                  attributeNamePrefix: '@_',
                  format: true,
                  indentBy: '  ',
                  suppressBooleanAttributes: false,
               });
               return builder.build(data) as string;
            },
         };
         break;
      }

      case 'toml': {
         const TOML = await import('smol-toml');
         fns = {
            toJson: (content: string) => TOML.parse(content),
            fromJson: (data: unknown) => {
               if (
                  typeof data !== 'object' ||
                  data === null ||
                  Array.isArray(data)
               ) {
                  throw new Error(
                     'TOML export requires JSON to be a plain object (not array or primitive)'
                  );
               }
               return TOML.stringify(data as Record<string, unknown>);
            },
         };
         break;
      }

      default:
         throw new Error(`Unsupported format: ${formatKey}`);
   }

   converterCache.set(formatKey, fns);
   return fns;
}

// ---------------------------------------------------------------------------
// Worker message handler
// ---------------------------------------------------------------------------

self.onmessage = async (e: MessageEvent<WorkerRequest>) => {
   const { id, action, formatKey, payload } = e.data;

   try {
      const fns = await getConverterFns(formatKey);

      let result: string;

      if (action === 'toJson') {
         const parsed = fns.toJson(payload);
         result = JSON.stringify(parsed);
      } else if (action === 'fromJson') {
         const data = JSON.parse(payload);
         result = fns.fromJson(data);
      } else {
         throw new Error(`Unknown action: ${action}`);
      }

      const response: WorkerResponse = { id, result };
      self.postMessage(response);
   } catch (err) {
      const response: WorkerResponse = {
         id,
         error: err instanceof Error ? err.message : String(err),
      };
      self.postMessage(response);
   }
};
