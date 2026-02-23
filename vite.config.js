import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  ssr: {
    noExternal: ['html-to-image'] // tell Vite to bundle it for SSR/build
  }
});
