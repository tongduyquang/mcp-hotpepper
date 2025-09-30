// vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Your code is Node-side (CLI / SDK), not DOM.
    environment: 'node',

    // Pick up test files under src/
    include: ['src/**/*.{test,spec}.ts'],
    exclude: ['node_modules', 'build', 'dist', '.git'],

    // Handy if you prefer not to import describe/it/expect everywhere.
    globals: true,

    // Show each test; useful for CLIs/libraries
    // (flip to false if it gets too chatty)
    reporters: 'default',

    // If you need setup (e.g., env vars / mocks), add files here:
    // setupFiles: ['tests/setup.ts'],

    // TS diagnostics during test runs can be noisy; keep default strict TS via tsc.
    // You can enable this if you want Vitest to type-check on the fly:
    // typecheck: { tsconfig: './tsconfig.json' },

    coverage: {
      // Requires @vitest/coverage-v8 as a devDependency
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      // Tweak as needed
      exclude: [
        'node_modules/**',
        'build/**',
        '**/*.d.ts',
        '**/__tests__/**',
      ],
      // Lines/branches thresholds (adjust to your target)
      // thresholds: { lines: 80, branches: 70, functions: 80, statements: 80 },
    },
  },
});
