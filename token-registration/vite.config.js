import { defineConfig } from "vite";

export default defineConfig({
  base: "/token-registration/",
  build: {
    outDir: "../back/fronts/token-registration",
  },
  server: {
    port: 3002,
  },
});
