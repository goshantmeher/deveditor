/**
 * Schema generation utilities
 * Parse JSON and generate TypeScript, Go, Rust, Zod, and JSON Schema
 */

export type SchemaFormat = 'typescript' | 'go' | 'rust' | 'zod' | 'json-schema';

interface InferredType {
   kind: 'string' | 'number' | 'boolean' | 'null' | 'object' | 'array' | 'any';
   isInteger?: boolean;
   properties?: Record<string, InferredType>;
   items?: InferredType;
   optional?: boolean;
}

// ── Infer type from a JSON value ─────────────────────────────

function inferType(value: unknown): InferredType {
   if (value === null) return { kind: 'null' };
   if (typeof value === 'string') return { kind: 'string' };
   if (typeof value === 'boolean') return { kind: 'boolean' };
   if (typeof value === 'number') {
      return { kind: 'number', isInteger: Number.isInteger(value) };
   }
   if (Array.isArray(value)) {
      if (value.length === 0) return { kind: 'array', items: { kind: 'any' } };
      // Merge types of all array elements
      const merged = mergeTypes(value.map(inferType));
      return { kind: 'array', items: merged };
   }
   if (typeof value === 'object') {
      const props: Record<string, InferredType> = {};
      for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
         props[k] = inferType(v);
      }
      return { kind: 'object', properties: props };
   }
   return { kind: 'any' };
}

function mergeTypes(types: InferredType[]): InferredType {
   if (types.length === 0) return { kind: 'any' };
   if (types.length === 1) return types[0];

   const kinds = new Set(types.map((t) => t.kind));

   // If all same primitive, return that
   if (kinds.size === 1) {
      const kind = types[0].kind;
      if (kind === 'object') {
         // Merge all object properties, mark missing ones as optional
         const allKeys = new Set<string>();
         for (const t of types) {
            if (t.properties) Object.keys(t.properties).forEach((k) => allKeys.add(k));
         }
         const merged: Record<string, InferredType> = {};
         for (const key of allKeys) {
            const fieldTypes: InferredType[] = [];
            let presentCount = 0;
            for (const t of types) {
               if (t.properties && key in t.properties) {
                  fieldTypes.push(t.properties[key]);
                  presentCount++;
               }
            }
            merged[key] = mergeTypes(fieldTypes);
            if (presentCount < types.length) {
               merged[key] = { ...merged[key], optional: true };
            }
         }
         return { kind: 'object', properties: merged };
      }
      if (kind === 'array') {
         const itemTypes = types.filter((t) => t.items).map((t) => t.items!);
         return { kind: 'array', items: mergeTypes(itemTypes) };
      }
      return types[0];
   }

   // Mixed types containing null → make it optional
   if (kinds.has('null') && kinds.size === 2) {
      const nonNull = types.filter((t) => t.kind !== 'null');
      const merged = mergeTypes(nonNull);
      return { ...merged, optional: true };
   }

   return { kind: 'any' };
}

// ── Name utilities ───────────────────────────────────────────

function toPascalCase(str: string): string {
   return str
      .replace(/[^a-zA-Z0-9]+/g, ' ')
      .split(' ')
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join('');
}

function toSnakeCase(str: string): string {
   return str
      .replace(/([A-Z])/g, '_$1')
      .replace(/[^a-zA-Z0-9]+/g, '_')
      .replace(/^_/, '')
      .toLowerCase();
}

function toCamelCase(str: string): string {
   const pascal = toPascalCase(str);
   return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

// ── TypeScript Generator ─────────────────────────────────────

function generateTypeScript(type: InferredType, name: string, depth: number = 0): string {
   const interfaces: string[] = [];
   const indent = '  '.repeat(depth + 1);

   function tsType(t: InferredType, fieldName: string): string {
      switch (t.kind) {
         case 'string':
            return 'string';
         case 'number':
            return 'number';
         case 'boolean':
            return 'boolean';
         case 'null':
            return 'null';
         case 'any':
            return 'any';
         case 'array': {
            if (t.items?.kind === 'object') {
               const itemName = toPascalCase(fieldName.replace(/s$/, '')) + 'Item';
               interfaces.push(generateTypeScript(t.items, itemName, 0));
               return `${itemName}[]`;
            }
            return `${tsType(t.items || { kind: 'any' }, fieldName)}[]`;
         }
         case 'object': {
            if (!t.properties || Object.keys(t.properties).length === 0) {
               return 'Record<string, unknown>';
            }
            const nestedName = toPascalCase(fieldName);
            interfaces.push(generateTypeScript(t, nestedName, 0));
            return nestedName;
         }
         default:
            return 'unknown';
      }
   }

   if (type.kind === 'object' && type.properties) {
      const lines: string[] = [];
      for (const [key, val] of Object.entries(type.properties)) {
         const optional = val.optional ? '?' : '';
         const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`;
         if (val.kind === 'object' && val.properties) {
            const nestedName = toPascalCase(key);
            interfaces.push(generateTypeScript(val, nestedName, 0));
            lines.push(`${indent}${safeKey}${optional}: ${nestedName};`);
         } else if (val.kind === 'array' && val.items?.kind === 'object') {
            const itemName = toPascalCase(key.replace(/s$/, '')) + 'Item';
            interfaces.push(generateTypeScript(val.items, itemName, 0));
            lines.push(`${indent}${safeKey}${optional}: ${itemName}[];`);
         } else {
            lines.push(`${indent}${safeKey}${optional}: ${tsType(val, key)};`);
         }
      }
      const result = `export interface ${toPascalCase(name)} {\n${lines.join('\n')}\n}`;
      return [...interfaces, result].join('\n\n');
   }

   if (type.kind === 'array') {
      if (type.items?.kind === 'object') {
         const itemName = toPascalCase(name.replace(/s$/, '')) + 'Item';
         const itemInterface = generateTypeScript(type.items, itemName, 0);
         return `${itemInterface}\n\nexport type ${toPascalCase(name)} = ${itemName}[];`;
      }
      return `export type ${toPascalCase(name)} = ${tsType(type.items || { kind: 'any' }, name)}[];`;
   }

   return `export type ${toPascalCase(name)} = ${tsType(type, name)};`;
}

// ── Go Struct Generator ──────────────────────────────────────

function generateGo(type: InferredType, name: string): string {
   const structs: string[] = [];

   function goType(t: InferredType, fieldName: string): string {
      switch (t.kind) {
         case 'string':
            return t.optional ? '*string' : 'string';
         case 'number': {
            const base = t.isInteger ? 'int64' : 'float64';
            return t.optional ? `*${base}` : base;
         }
         case 'boolean':
            return t.optional ? '*bool' : 'bool';
         case 'null':
            return 'interface{}';
         case 'any':
            return 'interface{}';
         case 'array': {
            if (t.items?.kind === 'object') {
               const itemName = toPascalCase(fieldName.replace(/s$/, ''));
               structs.push(generateGo(t.items, itemName));
               return `[]${itemName}`;
            }
            return `[]${goType(t.items || { kind: 'any' }, fieldName)}`;
         }
         case 'object': {
            if (!t.properties || Object.keys(t.properties).length === 0) {
               return 'map[string]interface{}';
            }
            const nestedName = toPascalCase(fieldName);
            structs.push(generateGo(t, nestedName));
            return t.optional ? `*${nestedName}` : nestedName;
         }
         default:
            return 'interface{}';
      }
   }

   if (type.kind === 'object' && type.properties) {
      // Compute field names and types ONCE to avoid side effects from double goType calls
      const fields = Object.entries(type.properties).map(([key, val]) => ({
         key,
         fieldName: toPascalCase(key),
         fieldType: goType(val, key),
         optional: val.optional,
      }));

      const maxFieldLen = Math.max(...fields.map((f) => f.fieldName.length));
      const maxTypeLen = Math.max(...fields.map((f) => f.fieldType.length));

      const lines = fields.map(({ key, fieldName, fieldType, optional }) => {
         const jsonOmit = optional ? ',omitempty' : '';
         const padding1 = ' '.repeat(Math.max(1, maxFieldLen - fieldName.length + 1));
         const padding2 = ' '.repeat(Math.max(1, maxTypeLen - fieldType.length + 1));
         return `\t${fieldName}${padding1}${fieldType}${padding2}\`json:"${key}${jsonOmit}"\``;
      });

      const result = `type ${toPascalCase(name)} struct {\n${lines.join('\n')}\n}`;
      return [...structs, result].join('\n\n');
   }

   if (type.kind === 'array' && type.items?.kind === 'object') {
      const itemName = toPascalCase(name.replace(/s$/, ''));
      return `${generateGo(type.items, itemName)}\n\ntype ${toPascalCase(name)} []${itemName}`;
   }

   return `type ${toPascalCase(name)} ${goType(type, name)}`;
}

// ── Rust Struct Generator ────────────────────────────────────

function generateRust(type: InferredType, name: string): string {
   const structs: string[] = [];

   function rustType(t: InferredType, fieldName: string): string {
      let base: string;
      switch (t.kind) {
         case 'string':
            base = 'String';
            break;
         case 'number':
            base = t.isInteger ? 'i64' : 'f64';
            break;
         case 'boolean':
            base = 'bool';
            break;
         case 'null':
            base = 'Option<serde_json::Value>';
            return base;
         case 'any':
            base = 'serde_json::Value';
            break;
         case 'array': {
            if (t.items?.kind === 'object') {
               const itemName = toPascalCase(fieldName.replace(/s$/, ''));
               structs.push(generateRust(t.items, itemName));
               base = `Vec<${itemName}>`;
            } else {
               base = `Vec<${rustType(t.items || { kind: 'any' }, fieldName)}>`;
            }
            return t.optional ? `Option<${base}>` : base;
         }
         case 'object': {
            if (!t.properties || Object.keys(t.properties).length === 0) {
               base = 'std::collections::HashMap<String, serde_json::Value>';
               return t.optional ? `Option<${base}>` : base;
            }
            const nestedName = toPascalCase(fieldName);
            structs.push(generateRust(t, nestedName));
            return t.optional ? `Option<${nestedName}>` : nestedName;
         }
         default:
            base = 'serde_json::Value';
            break;
      }
      return t.optional ? `Option<${base}>` : base;
   }

   if (type.kind === 'object' && type.properties) {
      const lines: string[] = [];
      for (const [key, val] of Object.entries(type.properties)) {
         const fieldName = toSnakeCase(key);
         const fieldType = rustType(val, key);
         // Add serde rename if snake_case differs from original
         if (fieldName !== key) {
            lines.push(`    #[serde(rename = "${key}")]`);
         }
         if (val.optional) {
            lines.push(`    #[serde(skip_serializing_if = "Option::is_none")]`);
         }
         lines.push(`    pub ${fieldName}: ${fieldType},`);
      }
      const result = `#[derive(Debug, Clone, Serialize, Deserialize)]\npub struct ${toPascalCase(name)} {\n${lines.join('\n')}\n}`;
      return [...structs, result].join('\n\n');
   }

   if (type.kind === 'array' && type.items?.kind === 'object') {
      const itemName = toPascalCase(name.replace(/s$/, ''));
      return `${generateRust(type.items, itemName)}\n\npub type ${toPascalCase(name)} = Vec<${itemName}>;`;
   }

   return `pub type ${toPascalCase(name)} = ${rustType(type, name)};`;
}

// ── Zod Schema Generator ─────────────────────────────────────

function generateZod(type: InferredType, name: string): string {
   const schemas: string[] = [];

   function zodType(t: InferredType, fieldName: string, depth: number = 0): string {
      const ind = '  '.repeat(depth);
      switch (t.kind) {
         case 'string': {
            const base = 'z.string()';
            return t.optional ? `${base}.optional()` : base;
         }
         case 'number': {
            const base = t.isInteger ? 'z.number().int()' : 'z.number()';
            return t.optional ? `${base}.optional()` : base;
         }
         case 'boolean': {
            const base = 'z.boolean()';
            return t.optional ? `${base}.optional()` : base;
         }
         case 'null':
            return 'z.null()';
         case 'any':
            return 'z.any()';
         case 'array': {
            if (t.items?.kind === 'object') {
               const itemName = toCamelCase(fieldName.replace(/s$/, '')) + 'Schema';
               schemas.push(`const ${itemName} = ${zodType(t.items, fieldName, 0)};`);
               const base = `z.array(${itemName})`;
               return t.optional ? `${base}.optional()` : base;
            }
            const base = `z.array(${zodType(t.items || { kind: 'any' }, fieldName, depth)})`;
            return t.optional ? `${base}.optional()` : base;
         }
         case 'object': {
            if (!t.properties || Object.keys(t.properties).length === 0) {
               return 'z.record(z.unknown())';
            }
            const lines: string[] = [];
            for (const [key, val] of Object.entries(t.properties)) {
               const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`;
               lines.push(`${ind}  ${safeKey}: ${zodType(val, key, depth + 1)},`);
            }
            return `z.object({\n${lines.join('\n')}\n${ind}})`;
         }
         default:
            return 'z.unknown()';
      }
   }

   const schemaName = toCamelCase(name) + 'Schema';
   const zodString = zodType(type, name, 0);

   const result = `const ${schemaName} = ${zodString};\n\ntype ${toPascalCase(name)} = z.infer<typeof ${schemaName}>;`;
   return schemas.length > 0
      ? `import { z } from 'zod';\n\n${schemas.join('\n\n')}\n\n${result}`
      : `import { z } from 'zod';\n\n${result}`;
}

// ── JSON Schema Generator ────────────────────────────────────

function generateJsonSchema(type: InferredType, name: string): string {
   function toSchema(t: InferredType): Record<string, unknown> {
      switch (t.kind) {
         case 'string':
            return { type: 'string' };
         case 'number':
            return t.isInteger ? { type: 'integer' } : { type: 'number' };
         case 'boolean':
            return { type: 'boolean' };
         case 'null':
            return { type: 'null' };
         case 'any':
            return {};
         case 'array':
            return {
               type: 'array',
               items: toSchema(t.items || { kind: 'any' }),
            };
         case 'object': {
            if (!t.properties || Object.keys(t.properties).length === 0) {
               return { type: 'object' };
            }
            const props: Record<string, unknown> = {};
            const required: string[] = [];
            for (const [key, val] of Object.entries(t.properties)) {
               props[key] = toSchema(val);
               if (!val.optional) required.push(key);
            }
            const schema: Record<string, unknown> = {
               type: 'object',
               properties: props,
            };
            if (required.length > 0) schema.required = required;
            return schema;
         }
         default:
            return {};
      }
   }

   const schema = {
      $schema: 'http://json-schema.org/draft-07/schema#',
      title: toPascalCase(name),
      ...toSchema(type),
   };

   return JSON.stringify(schema, null, 2);
}

// ── Main API ─────────────────────────────────────────────────

export function generateSchema(
   jsonString: string,
   format: SchemaFormat,
   rootName: string = 'Root'
): { output: string; error?: string } {
   try {
      const parsed = JSON.parse(jsonString);
      const type = inferType(parsed);

      let output = '';
      switch (format) {
         case 'typescript':
            output = generateTypeScript(type, rootName);
            break;
         case 'go':
            output = `package main\n\n${generateGo(type, rootName)}`;
            break;
         case 'rust':
            output = `use serde::{Deserialize, Serialize};\n\n${generateRust(type, rootName)}`;
            break;
         case 'zod':
            output = generateZod(type, rootName);
            break;
         case 'json-schema':
            output = generateJsonSchema(type, rootName);
            break;
      }

      return { output };
   } catch (err) {
      if (err instanceof SyntaxError) {
         return { output: '', error: `Invalid JSON: ${err.message}` };
      }
      return { output: '', error: String(err) };
   }
}

// ── Sample JSON ──────────────────────────────────────────────

export const SAMPLE_JSON = `{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "isActive": true,
  "age": 30,
  "address": {
    "street": "123 Main St",
    "city": "Springfield",
    "state": "IL",
    "zipCode": "62704",
    "country": "US"
  },
  "roles": ["admin", "user"],
  "orders": [
    {
      "orderId": "ORD-001",
      "amount": 99.99,
      "currency": "USD",
      "items": [
        {
          "productId": "PROD-1",
          "name": "Widget",
          "quantity": 2,
          "price": 49.99
        }
      ],
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "metadata": null
}`;
