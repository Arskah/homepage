/* eslint-disable perfectionist/sort-objects */
// @ts-check

import pluginJs from "@eslint/js";
import markdown from "@eslint/markdown";
import astro from "eslint-plugin-astro";
import jsdoc from "eslint-plugin-jsdoc";
import perfectionist from "eslint-plugin-perfectionist";
import playwright from "eslint-plugin-playwright";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import regexp from "eslint-plugin-regexp";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores([".astro/", "coverage/", "dist/", "CHANGELOG.md"]),
  {
    // "Globals", ignore md files
    ignores: ["**/*.md"],
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
    extends: [
      pluginJs.configs.recommended,
      perfectionist.configs["recommended-natural"],
      regexp.configs["flat/recommended"],
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      astro.configs["recommended"],
      astro.configs["jsx-a11y-strict"],
      jsdoc.configs["flat/recommended-typescript-error"],
    ],
    rules: {
      "jsdoc/require-jsdoc": "off", // Recommended
    },
  },
  {
    // JS specific overrides
    files: ["**/*.{js,mjs}"],
    plugins: {
      jsdoc,
    },
    rules: {
      // Allow @type JSDocs
      "jsdoc/check-tag-names": ["error", { typed: false }],
    },
  },
  {
    // Markdown linting
    files: ["**/*.md"],
    extends: [markdown.configs.recommended, markdown.configs.processor],
    rules: {
      "markdown/no-missing-label-refs": "off",
    },
  },
  {
    // React (JSX/TSX files) configs
    files: ["**/*.{jsx,tsx}"],
    extends: [
      react.configs.flat.recommended,
      react.configs.flat["jsx-runtime"],
    ],
    plugins: {
      "react-hooks": reactHooks,
    },
    settings: {
      react: {
        version: "19.2", // detect replaced with version to support ESLint v10
      },
    },
    rules: {
      ...reactHooks.configs["recommended-latest"].rules,
    },
  },
  {
    // E2E configs
    files: ["e2e-tests/tests/**/*.ts"],
    plugins: {
      playwright: playwright,
    },
    rules: {
      ...playwright.configs.recommended.rules,
    },
  },
]);
