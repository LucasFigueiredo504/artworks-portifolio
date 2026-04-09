import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { imageSlugs } from "./src/lib/data";
import { storySlugs } from "./src/lib/data";
import sitemap from "vite-plugin-sitemap";

const BASE_URL = "https://tellarheaven.com.br";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: BASE_URL,

      dynamicRoutes: [
        // rotas estáticas
        "/",
        "/gallery",
        "/stories",

        // imagens
        ...imageSlugs.map((file) => `/file/${file}`),

        // stories
        ...storySlugs.map((story) => `/stories/${story}`),
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
