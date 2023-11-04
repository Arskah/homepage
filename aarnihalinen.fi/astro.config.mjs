import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";

// https://github.com/withastro/astro/issues/4432
// const isDev = process.env.NODE_ENV === "development";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(), react()],
  // vite: {
  //   legacy: { buildSsrCjsExternalHeuristics: !isDev },
  //   ssr: { noExternal: ["styled-components"] },
  // },
});
