import { defineConfig } from "vite";

export default defineConfig({
  base: "/pipe-game/",
  server: {
    port: 5173,
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
});
