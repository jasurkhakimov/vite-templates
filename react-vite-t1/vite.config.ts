/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svgr(),
    react(),
    VitePWA({
      manifest: {
        name: "Vite",
        short_name: "Vite",
        icons: [
          {
            src: "/icons/512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globDirectory: "dist/",
        globPatterns: [
          "**/*.{css,ico,eot,woff,ttf,woff2,svg,png,xml,webmanifest,html,js,json,txt,tsx,jpg,jpeg,ts}",
        ],
        swDest: "dist/sw.js",
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return url.pathname.startsWith("/*");
            },
            handler: "NetworkFirst" as const,
            options: {
              cacheName: "api-cache",
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
      registerType: "autoUpdate",
      outDir: "dist",
      devOptions: {
        enabled: true,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      assets: path.resolve(__dirname, "./src/assets"),
    },
  },
  build: {
    minify: true,
    rollupOptions: {},
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
  },
  // envPrefix: '' //for custom env,
});
