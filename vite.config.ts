import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// Standalone marketing website build. Output -> dist/. No dev proxy: the lead form
// posts same-origin to /api/leads (the Cloudflare Pages Function in preview/production).
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
});
