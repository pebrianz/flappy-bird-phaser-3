// vite.config.ts
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "./", // work
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "flappy-bird",
        short_name: "flappy-bird",
        start_url: "./",
        display: "standalone",
        background_color: "#ffffff",
        lang: "en",
        scope: "./",
      },
    }),
  ],
});
