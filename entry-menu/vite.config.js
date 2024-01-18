import { defineConfig } from "vite";

export default defineConfig({
  base: "/entry-menu/",
  build: {
    outDir: "../back/fronts/entry-menu",
  },
  server: {
    port: 5174,
  },
});
