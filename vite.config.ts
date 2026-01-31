import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3001,
    allowedHosts: [
      "fc00b037461f.ngrok-free.app",
      ".ngrok-free.app", // Allow all ngrok subdomains
    ],
  },
});
