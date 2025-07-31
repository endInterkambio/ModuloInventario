import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
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
