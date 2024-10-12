// @ts-check

import pluginJs from "@eslint/js";
import astro from "eslint-plugin-astro";
import jsdoc from "eslint-plugin-jsdoc";
// @ts-expect-error missing types
import jsxA11y from "eslint-plugin-jsx-a11y";
// @ts-expect-error missing types
import markdown from "eslint-plugin-markdown";
import perfectionist from "eslint-plugin-perfectionist";
import playwright from "eslint-plugin-playwright";
import react from "eslint-plugin-react";
// @ts-expect-error missing types
import reactHooks from "eslint-plugin-react-hooks";
import regexp from "eslint-plugin-regexp";
import globals from "globals";
import tseslint from "typescript-eslint";

const reactConfigs = tseslint.config(
  {
    files: ["**/*.{jsx,tsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.{jsx,tsx}"],
    ...react.configs.flat.recommended,
    ...react.configs.flat["jsx-runtime"],
    // @ts-expect-error missing types some bs on string literal types...
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat["jsx-runtime"].rules,
      "react/display-name": "off",
      "react/no-unstable-nested-components": "warn",
      "react/prop-types": "off",
    },
  },
  {
    files: ["**/*.{jsx,tsx}"],
    plugins: {
      "react-hooks": reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
    },
  },
);

const playwrightConfigs = tseslint.config({
  files: ["tests/**"],
  plugins: {
    playwright: playwright,
  },
  rules: {
    ...playwright.configs.recommended.rules,
  },
});

export default tseslint.config(
  {
    ignores: [".astro/", "coverage/", "dist/"],
  },
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
  ...markdown.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  ...astro.configs["flat/recommended"],
  {
    ...jsdoc.configs["flat/recommended-typescript-error"],
    rules: {
      "jsdoc/require-jsdoc": "off", // Recommended
    },
  },
  ...reactConfigs,
  jsxA11y.flatConfigs.strict,
  ...playwrightConfigs,
  {
    files: ["**/*.{js,mjs,cjs}"],
    rules: {
      "jsdoc/check-tag-names": "off",
    },
  },
);
