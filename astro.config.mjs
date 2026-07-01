import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import process from "node:process";
import stylexAstroPlugin from "unplugin-stylex/astro";

// Keep StyleX's readable debug class names in dev, but strip them from
// production builds to keep the emitted CSS/HTML lean. Passed via `stylex.dev`
// because the plugin's own `dev` flag can't be forced off.
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
  site: "https://aarnihalinen.fi",
});
