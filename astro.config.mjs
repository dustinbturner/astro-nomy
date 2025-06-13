import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import icon from "astro-icon";
import {defineConfig} from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import simpleStackForm from "simple-stack-form";
import pagefind from "astro-pagefind";


// https://astro.build/config
export default defineConfig({
  site: "https://astro-nomy-updated.vercel.app",
  build: {
    format: "file",
  },
  integrations: [
    mdx({
      syntaxHighlight: "shiki",
      shikiConfig: {
        theme: "github-dark-dimmed",
      },
      gfm: true,
    }),
    react(),
    sitemap(),
    icon(),
    simpleStackForm(),
    pagefind(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: "server",
  adapter: vercel({
    analytics: true,
  }),
});