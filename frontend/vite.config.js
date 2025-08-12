import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // If page loading to long you can disable dependencie optimizing
  // optimizeDeps: {
  //   force: false
  // },

  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
});
