export const EDITOR_TYPES = {
  json: "json",
  text: "text",
} as const;

export type EditorType = typeof EDITOR_TYPES[keyof typeof EDITOR_TYPES];

export const DEFAULT_EDITOR_CONFIG = {
  active: EDITOR_TYPES.text,
} as const;

export const DEFAULT_JSON_DATA = {
  name: "John",
  age: 30,
  city: "New York",
};

