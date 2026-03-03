/**
 * YAML ↔ JSON converter.
 */

import yaml from 'js-yaml';
import { registerConverter, type FormatConverter } from './index';

const yamlConverter: FormatConverter = {
   toJson(content: string): unknown {
      return yaml.load(content);
   },

   fromJson(data: unknown): string {
      return yaml.dump(data, {
         indent: 2,
         lineWidth: -1, // No line wrapping
         noRefs: true, // Don't use YAML anchors/aliases
         sortKeys: false, // Preserve key order
      });
   },

   extension: '.yaml',
   extensions: ['.yaml', '.yml'],
   mimeType: 'application/x-yaml',
   label: 'YAML',

   canExport(): boolean {
      return true; // YAML can represent any JSON structure
   },
};

registerConverter('yaml', yamlConverter);

export default yamlConverter;
