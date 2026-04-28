 /*import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})*/




import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://irritant-kilobyte-until.ngrok-free.dev", // ngrok public URL
        changeOrigin: true,
        secure: false, // ignore self-signed certs if needed
      },
    },
  },
});

