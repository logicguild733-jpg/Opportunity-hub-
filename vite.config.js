import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: './',       // root folder
  build: {
    outDir: 'dist', // Vercel will serve from here
  },
  server: {
    port: 3000
  }
});
