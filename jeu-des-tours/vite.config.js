import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/jeu-des-tours/",
  build: {
    outDir: "../back/fronts/jeu-des-tours",
  },
  server: {
    port: 5172,
  },
  plugins: [react()],
});
