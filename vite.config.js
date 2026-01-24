import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/landingpage/",
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        planos: "./planos.html",
      },
    },
    // Otimizações para produção (usando esbuild que é mais rápido)
    minify: "esbuild",
    // Melhora code splitting
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
  },
  // Otimizações de performance
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
    drop: ["debugger"],
    pure: ["console.log"],
  },
});
