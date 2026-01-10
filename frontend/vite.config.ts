import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/query": {
        target: "http://localhost:8081",
        changeOrigin: true,
      },
    },
  },
  build: {
    sourcemap: true,
  },
  plugins: [react()],
});
