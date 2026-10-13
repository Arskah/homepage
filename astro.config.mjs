import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import process from "node:process";
import stylexAstroPlugin from "unplugin-stylex/astro";

// Keep StyleX's readable debug class names
const isProduction = process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    react(),
    sitemap(),
    icon(),
    stylexAstroPlugin({ stylex: { dev: !isProduction } }),
  ],
  markdown: {
    // Emit both themes as CSS variables; global.css picks one per color scheme.
    shikiConfig: {
      defaultColor: false,
      themes: { dark: "rose-pine", light: "rose-pine-dawn" },
    },
  },
  site: "https://aarnihalinen.fi",
});
