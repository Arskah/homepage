module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/stylistic",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
    "plugin:astro/jsx-a11y-recommended",
  ],
  plugins: ["@typescript-eslint", "prettier"],
  overrides: [
    {
      // Define the configuration for `.astro` file.
      files: ["*.astro"],
      // Allows Astro components to be parsed.
      parser: "astro-eslint-parser",
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        "prettier/prettier": "warn", // TODO: fix this
      },
    },
  ],
  rules: {
    "prettier/prettier": "error",
    "import/no-unresolved": "warn", // TODO: fix this
  },
};
