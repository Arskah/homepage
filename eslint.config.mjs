/* eslint-disable perfectionist/sort-objects */
// @ts-check

import pluginJs from "@eslint/js";
import astro from "eslint-plugin-astro";
import jsdoc from "eslint-plugin-jsdoc";
// @ts-expect-error missing types
import markdown from "eslint-plugin-markdown";
import perfectionist from "eslint-plugin-perfectionist";
import playwright from "eslint-plugin-playwright";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import regexp from "eslint-plugin-regexp";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores([".astro/", "coverage/", "dist/"]),
  {
    languageOptions: {
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: "latest",
        project: true,
        sourceType: "module",
      },
    },
  },
  pluginJs.configs.recommended,
  perfectionist.configs["recommended-natural"],
  regexp.configs["flat/recommended"],
  markdown.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.stylistic,
  astro.configs["recommended"],
  astro.configs["jsx-a11y-strict"],
  {
    extends: [jsdoc.configs["flat/recommended-typescript-error"]],
    rules: {
      "jsdoc/require-jsdoc": "off", // Recommended
    },
  },
  {
    // Allow type in JSDoc, except on TS files
    ignores: ["**/*.{astro,ts,tsx}"],
    rules: {
      "jsdoc/check-tag-names": ["error", { typed: false }],
    },
  },
  {
    files: ["**/*.{jsx,tsx}"],
    extends: [
      react.configs.flat.recommended,
      react.configs.flat["jsx-runtime"],
      // @ts-expect-error no types
      reactHooks.configs["recommended"],
    ],
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["tests/**"],
    plugins: {
      playwright: playwright,
    },
    rules: {
      ...playwright.configs.recommended.rules,
    },
  },
]);
