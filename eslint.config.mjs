import tseslint from 'typescript-eslint';
import globals from 'globals';

/**
 */
export default [
  { languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,

  // Ignore Eslint check for mock files
  {
    ignores: [
      "**/__mock__/**",
      "**/__mocks__/**",
      "**/mock*.ts",
      "**/mock*.js",
    ],
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-wrapper-object-types": "error",
      "@typescript-eslint/no-unsafe-function-type": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "prefer-const": [
        "error",
        {
          destructuring: "any",
          ignoreReadBeforeAssign: false,
        },
      ],
    },
    settings: {
      react: { version: "detect" },
    },
  },
];