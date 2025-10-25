export const EDITOR_TYPES = {
  json: "json",
  text: "text",
} as const;

export type EditorType = (typeof EDITOR_TYPES)[keyof typeof EDITOR_TYPES];

export const FORMAT_STATES = {
  EXPANDED: "expanded",
  COLLAPSED: "collapsed",
  MINIFIED: "minified",
  STANDARD: "standard",
  DEFAULT: "default",
  NONE: "none",
} as const;

export type FormatState = (typeof FORMAT_STATES)[keyof typeof FORMAT_STATES];

export const DEFAULT_EDITOR_CONFIG = {
  editorType: EDITOR_TYPES.text,
  formatState: FORMAT_STATES.STANDARD,
} as const;

export const DEFAULT_TEXT_EDITOR_CONFIG = {
  ...DEFAULT_EDITOR_CONFIG,
  formatState: FORMAT_STATES.DEFAULT,
  editorFormatOptions: [FORMAT_STATES.MINIFIED, FORMAT_STATES.STANDARD],
};

export const DEFAULT_JSON_EDITOR_CONFIG = {
  ...DEFAULT_EDITOR_CONFIG,
  formatState: FORMAT_STATES.NONE,
  editorFormatOptions: [FORMAT_STATES.EXPANDED, FORMAT_STATES.COLLAPSED],
  editorType: EDITOR_TYPES.json,
};

export const DEFAULT_JSON_DATA = `{
  name: "John",
  age: 30,



  city: "New York",address: {
    street: "123 Main St",
    zip: "10001",
    details: {
      apt: "5A",
      floor: 5,
    },
  },
  favorites: {
    colors: ["red", "green", "blue"],
    numbers: [7, 42],
    books: [
      {
        title: "1984",
        author: "George Orwell",
      },
      {
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
      },
    ],
  },
}`;

export const INDENT_LEVELS = {
  EXPANDED: 4, // More spacious
  STANDARD: 2, // Normal formatting
  COMPACT: 1, // More condensed
  MINIFIED: 0, // No whitespace
} as const;
