import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "./src/shared/scss/constants";
          @import "./src/shared/scss/functions";
          @import "./src/shared/scss/mixins";
        `,
      },
    },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
