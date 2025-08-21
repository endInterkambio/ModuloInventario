import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: '/app/',
  plugins: [react()],
  assetsInclude: ["**/*.gif", "**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.svg"],
  resolve: {
    alias: {
      "@components": "/src/components",
      "@assets": "/src/assets",
      "@": "/src",
      "@types": "/src/types",
    },
  },
});
