// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  // client-သုံး env (optional)
  define: {
    __BOT_TOKEN__: JSON.stringify(process.env.VITE_BOT_TOKEN || ''),
  },
});
