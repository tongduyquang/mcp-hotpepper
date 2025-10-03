// eslint.config.mjs
import tseslint from 'typescript-eslint';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

/**
 * If your project is single-package with tsconfig in repo root,
 * this will work out of the box. If not, adjust `project`.
 */
export default tseslint.config(
  // 1) Ignore globs
  {
    ignores: [
      'node_modules/',
      'build/',
      // Add more if needed:
      // 'dist/', 'tmp/', '*.config.*'
    ],
  },

  // 2) Base JS + TS recommended, with type-checking
  ...tseslint.configs.recommended,

  // 3) Your project-specific config
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node, // Node globals (require, module, etc. though you use ESM)
      },
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: new URL('.', import.meta.url).pathname, // resolves tsconfig relative to this file
      },
    },

    rules: {
      // TS/quality
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/require-await': 'off', // turn on if you want
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],

      // Node ESM niceties (optional)
      'no-console': 'off',
      'no-duplicate-imports': 'error',
    },
  },

  // 4) Turn off formatting-related rules → Prettier owns formatting
  prettier,
);
