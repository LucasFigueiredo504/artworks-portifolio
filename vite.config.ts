import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sitemap from "vite-plugin-sitemap";
import { createClient } from "@sanity/client";

const BASE_URL = "https://tellarheaven.com.br";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ""); // "" = load all vars, not just VITE_

  const client = createClient({
    projectId: env.VITE_PROJECT_ID,
    dataset: "production",
    useCdn: false,
    apiVersion: "2023-01-01",
  });

  const [images, stories] = await Promise.all([
    client.fetch<{ slug: string }[]>(
      `*[_type == "imageFile"]{ "slug": slug.current }`,
    ),
    client.fetch<{ slug: string }[]>(
      `*[_type == "story"]{ "slug": slug.current }`,
    ),
  ]);

  const dynamicRoutes = [
    "/",
    "/gallery",
    "/stories",
    ...images.map((i) => `/file/${i.slug}`),
    ...stories.map((s) => `/stories/${s.slug}`),
  ];

  return {
    plugins: [
      react(),
      tailwindcss(),
      sitemap({
        hostname: BASE_URL,
        dynamicRoutes,
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
