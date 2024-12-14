import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redirect API requests to your proxy
      '/api': {
        target: 'http://16.170.247.41', // Backend server URL
        changeOrigin: true, // Update the origin of the request to the target
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove '/api' prefix before forwarding
      },
    },
  },
});
