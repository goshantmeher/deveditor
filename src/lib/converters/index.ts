/**
 * Multi-format converter registry.
 *
 * Each format implements the `FormatConverter` interface and is registered
 * in the `converterRegistry` map so callers can look up any converter by
 * its format key (e.g. "yaml", "csv") or by file extension (e.g. ".yml").
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type FormatKey = 'json' | 'yaml' | 'csv' | 'xml' | 'toml';

export interface FormatConverter {
   /** Parse a raw file string into a JS value (object / array / primitive). */
   toJson(content: string): unknown;

   /** Stringify a JS value into the target format. */
   fromJson(data: unknown): string;

   /** Primary file extension including the dot, e.g. ".yaml" */
   extension: string;

   /** All accepted extensions including aliases, e.g. [".yaml", ".yml"] */
   extensions: string[];

   /** MIME type for the Blob download, e.g. "application/x-yaml" */
   mimeType: string;

   /** Human-readable label shown in the UI, e.g. "YAML" */
   label: string;

   /**
    * Return `true` if the given data can be exported to this format.
    * For example, CSV requires a flat array of objects.
    */
   canExport(data: unknown): boolean;

   /**
    * Optional warning message when the data *can* be exported but the result
    * might be lossy or unexpected (e.g. nested arrays flattened for CSV).
    * Return `null` if there is nothing to warn about.
    */
   exportWarning?(data: unknown): string | null;
}

// ---------------------------------------------------------------------------
// Built-in JSON converter (always available, no extra dependency)
// ---------------------------------------------------------------------------

const jsonConverter: FormatConverter = {
   toJson(content: string): unknown {
      return JSON.parse(content);
   },

   fromJson(data: unknown): string {
      return JSON.stringify(data, null, 2);
   },

   extension: '.json',
   extensions: ['.json'],
   mimeType: 'application/json',
   label: 'JSON',

   canExport(): boolean {
      return true;
   },
};

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

/** Map of format key → converter instance. */
const converterRegistry = new Map<FormatKey, FormatConverter>();

/** Register a converter for a given key. */
export function registerConverter(key: FormatKey, converter: FormatConverter): void {
   converterRegistry.set(key, converter);
}

/** Get a converter by its format key. */
export function getConverter(key: FormatKey): FormatConverter | undefined {
   return converterRegistry.get(key);
}

/** Get all registered converters. */
export function getAllConverters(): Map<FormatKey, FormatConverter> {
   return converterRegistry;
}

/** Look up the correct converter for a given file extension (e.g. ".yml"). */
export function getConverterByExtension(ext: string): { key: FormatKey; converter: FormatConverter } | undefined {
   const normalized = ext.toLowerCase().startsWith('.') ? ext.toLowerCase() : `.${ext.toLowerCase()}`;

   for (const [key, converter] of converterRegistry) {
      if (converter.extensions.includes(normalized)) {
         return { key, converter };
      }
   }
   return undefined;
}

/**
 * Return all file extensions accepted for import, joined for an
 * `<input accept="..." />` attribute.
 */
export function getAllAcceptedExtensions(): string {
   const exts: string[] = [];
   for (const converter of converterRegistry.values()) {
      exts.push(...converter.extensions);
   }
   return exts.join(',');
}

/**
 * Return all format keys that can export the given data
 * (for populating the export format dropdown).
 */
export function getExportableFormats(
   data: unknown
): { key: FormatKey; converter: FormatConverter; warning: string | null }[] {
   const result: {
      key: FormatKey;
      converter: FormatConverter;
      warning: string | null;
   }[] = [];

   for (const [key, converter] of converterRegistry) {
      if (converter.canExport(data)) {
         const warning = converter.exportWarning?.(data) ?? null;
         result.push({ key, converter, warning });
      }
   }
   return result;
}

// ---------------------------------------------------------------------------
// Threshold for Web Worker offloading (bytes)
// ---------------------------------------------------------------------------

/** Files larger than this are processed in a Web Worker. */
export const WORKER_THRESHOLD_BYTES = 1_048_576; // 1 MB

// ---------------------------------------------------------------------------
// Bootstrap — register built-in JSON converter
// ---------------------------------------------------------------------------

registerConverter('json', jsonConverter);
