import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    exclude: ["node_modules", "build"],
    typecheck: {
      enabled: true,
      tsconfig: "./tsconfig.json",
    },
    setupFiles: ["./src/test/setup.ts"],
  },
});