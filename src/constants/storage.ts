export const STORAGE_KEYS = {
   // Base64 & Encoders
   BASE64_ENCODER_TAB: 'deveditor-base64-active-tab',
   BASE64_TEXT_INPUT: 'deveditor-base64-text-input',
   BASE64_URL_INPUT: 'deveditor-base64-url-input',
   URL_ENCODER_TAB: 'deveditor-url-encoder-active-tab',
   URL_ENCODER_INPUT: 'deveditor-url-encoder-input',
   HTML_ENTITY_INPUT: 'deveditor-html-entity-input',
   HTML_ENTITY_DIR: 'deveditor-html-entity-direction',

   // Converters & Formatters
   CASE_CONVERTER_CASE: 'deveditor-case-active-case',
   CASE_CONVERTER_INPUT: 'deveditor-case-input',
   LIST_CONVERTER_FORMAT: 'deveditor-list-format',
   LIST_CONVERTER_DELIMITER: 'deveditor-list-delimiter',
   LIST_CONVERTER_INPUT: 'deveditor-list-input',
   MARKDOWN_CONVERTER_CONTENT: 'deveditor-markdown-content',

   // Testing & Validation
   BCRYPT_TEST_PLAINTEXT: 'deveditor-bcrypt-plain',
   BCRYPT_TEST_HASH: 'deveditor-bcrypt-hash',
   HASH_GENERATOR_INPUT: 'deveditor-hash-input',
   JWT_TOKEN: 'deveditor-jwt-token',
   REGEX_PATTERN: 'deveditor-regex-pattern',
   REGEX_FLAGS: 'deveditor-regex-flags',
   REGEX_TEST: 'deveditor-regex-test',

   // Generators
   PASSWORD_GENERATOR_OPTIONS: 'deveditor-password-opts',
   QR_CONTENT: 'deveditor-qr-content',
   SCHEMA_INPUT: 'deveditor-schema-input',
   SCHEMA_ROOT: 'deveditor-schema-root',
   THEME_HEX: 'deveditor-theme-hex',
   THEME_MODE: 'deveditor-theme-mode',
   COLOR_HEX: 'deveditor-color-hex',
   LOREM_IPSUM_TYPE: 'deveditor-lorem-type',
   LOREM_IPSUM_COUNT: 'deveditor-lorem-count',
   LOREM_IPSUM_START: 'deveditor-lorem-start',
   UUID_TYPE: 'deveditor-uuid-type',
   UUID_COUNT: 'deveditor-uuid-count',
   UUID_FORMAT: 'deveditor-uuid-format',

   // Text & Code Analysis
   WORD_COUNTER_INPUT: 'deveditor-word-counter-input',
   JS_OBFUSCATOR_INPUT: 'deveditor-js-obf-input',
   JS_OBFUSCATOR_OPTS: 'deveditor-js-obf-opts',
   TEXT_DIFF_OLD: 'deveditor-diff-old',
   TEXT_DIFF_NEW: 'deveditor-diff-new',
   SVG_JSX_INPUT: 'deveditor-svg-jsx-input',
   SVG_OPTIMIZER_INPUT: 'deveditor-svg-opt-input',
   FAVICON_GEN_IMG: 'deveditor-favicon-img',
   GLASSMORPHISM_SETTINGS: 'deveditor-glass-settings',

   // UI State & Misc
   CSS_PLAYGROUND_HTML: 'deveditor-css-play-html',
   CSS_PLAYGROUND_CSS: 'deveditor-css-play-css',
   CSS_PLAYGROUND_PRESET: 'deveditor-css-play-preset',
   CSS_PLAYGROUND_MODE: 'deveditor-css-play-mode',
   RESUME_DATA: 'deveditor-resume-data',
} as const;

export const DEFAULT_INPUTS = {
   JWT_TOKEN:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjI1MTYyNDkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
} as const;
