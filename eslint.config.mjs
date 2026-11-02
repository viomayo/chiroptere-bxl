import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "public/sw.js",
    "coverage/**",
    "test-results/**",
    "playwright-report/**",
    "next-env.d.ts",
    // Scratch diagnostic script kept out of git (see .gitignore).
    "diag-cdp3.js",
  ]),
]);

export default eslintConfig;
