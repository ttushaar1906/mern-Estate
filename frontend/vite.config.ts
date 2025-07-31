import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist",
  },
  server: {
    host: true,
    port: 5173,
  },
  // 👇 Add this
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  // 👇 Needed for React Router
  base: "/",
});
