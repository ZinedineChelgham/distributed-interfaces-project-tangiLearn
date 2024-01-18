import { defineConfig } from "vite";

export default defineConfig({
  base: "/pipe-game/",
  build: {
    outDir: "../back/fronts/pipe-game",
  },
  server: {
    port: 5173,
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
});
