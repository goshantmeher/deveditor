import { dirname } from 'path';
import { fileURLToPath } from 'url';
import js from '@eslint/js';
import ts from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = [
   js.configs.recommended,
   ...ts.configs.recommended,
   {
      files: ['**/*.{js,jsx,ts,tsx}'],
      plugins: {
         'react-hooks': reactHooks,
      },
      languageOptions: {
         parser: ts.parser,
         parserOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
         },
      },
      rules: {
         '@typescript-eslint/no-explicit-any': 'warn',
         '@typescript-eslint/no-unused-vars': [
            'error',
            { argsIgnorePattern: '^_' },
         ],
         'react-hooks/rules-of-hooks': 'error',
         'react-hooks/exhaustive-deps': 'warn',
      },
   },
];

export default eslintConfig;
