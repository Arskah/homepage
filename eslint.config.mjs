/* eslint-disable perfectionist/sort-objects */
// @ts-check

import pluginJs from "@eslint/js";
import stylex from "@stylexjs/eslint-plugin";
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
  // Code blocks in blog posts are illustrations: they may be fragments, show
  // deliberately bad code, or order things for the sake of the explanation.
  globalIgnores(["src/content/**/*.md/**", "src/content/**/*.mdx/**"]),
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
    // Fenced code blocks in Markdown are linted as virtual files
    // (`post.md/0_0.ts`). They belong to no tsconfig, so typed linting cannot
    // parse them and has to be switched off for them.
    files: ["**/*.md/**"],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: {
      parserOptions: {
        project: false,
      },
    },
  },
  {
    files: ["e2e-tests/tests/**/*.ts"],
    plugins: {
      playwright: playwright,
    },
    rules: {
      ...playwright.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "@stylexjs": stylex,
    },
    rules: {
      "@stylexjs/valid-shorthands": "error",
      "@stylexjs/valid-styles": "error",
    },
  },
]);
