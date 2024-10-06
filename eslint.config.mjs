// @ts-check

import { fixupPluginRules } from "@eslint/compat";
import pluginJs from "@eslint/js";
import astro from "eslint-plugin-astro";
import importPlugin from "eslint-plugin-import-x";
import jsdoc from "eslint-plugin-jsdoc";
// @ts-expect-error missing types
import jsxA11y from "eslint-plugin-jsx-a11y";
import playwright from "eslint-plugin-playwright";
import react from "eslint-plugin-react";
// @ts-expect-error missing types
import reactHooks from "eslint-plugin-react-hooks";
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
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  {
    files: ["**/*.{jsx,tsx}"],
    ...react.configs.flat.recommended,
    ...react.configs.flat["jsx-runtime"],
    // @ts-expect-error some type error
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat["jsx-runtime"].rules,
      "react/prop-types": "off",
      "react/display-name": "off",
      "react/no-unstable-nested-components": "warn",
    },
  },
  {
    files: ["**/*.{jsx,tsx}"],
    plugins: {
      "react-hooks": fixupPluginRules(reactHooks),
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

const importConfigs = tseslint.config({
  files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  plugins: {
    "import-x": importPlugin,
  },
  settings: {
    ...importPlugin.configs.typescript.settings,
    "import-x/parsers": {
      ...importPlugin.configs.typescript.settings["import-x/parsers"],
      espree: [".js", ".cjs", ".mjs", ".jsx"],
    },
  },
  rules: {
    ...importPlugin.configs.recommended.rules,
    ...importPlugin.configs.typescript.rules,
    "sort-imports": [
      "error",
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        allowSeparatedGroups: false,
      },
    ],
    "import-x/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "import-x/no-named-as-default-member": "off",
    "import-x/no-relative-packages": "error",
  },
});

export default tseslint.config(
  {
    ignores: [".astro/", "coverage/", "dist/"],
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: true,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  ...astro.configs["flat/recommended"],
  {
    ...jsdoc.configs["flat/recommended-typescript-error"],
    rules: {
      "jsdoc/require-jsdoc": "off", // Recommended
    },
  },
  ...importConfigs,
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
