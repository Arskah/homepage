// @ts-check
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import icon from "astro-icon";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), react(), sitemap(), icon()],
  site: "https://aarnihalinen.fi",
  vite: {
    // @ts-expect-error bad typing for vanillaExtractPlugin
    plugins: [vanillaExtractPlugin()],
  },
});
