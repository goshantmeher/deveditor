/**
 * Bootstrap — import this file once to register all format converters.
 *
 * Each converter module auto-registers itself via `registerConverter()`
 * when imported. This file simply ensures they're all loaded.
 */

import './yaml';
import './csv';
import './xml';
import './toml';

// Re-export everything from the registry for convenience
export {
   type FormatKey,
   type FormatConverter,
   getConverter,
   getAllConverters,
   getConverterByExtension,
   getAllAcceptedExtensions,
   getExportableFormats,
   WORKER_THRESHOLD_BYTES,
} from './index';

export { convertInWorker, terminateWorker } from './worker-bridge';
export {
   smartConvert,
   formatFileSize,
   saveLastExportFormat,
   loadLastExportFormat,
} from './smart-convert';
