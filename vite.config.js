import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Performance optimizations
  build: {
    // Enable code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries
          vendor: ["react", "react-dom"],
          icons: ["react-icons"],
          // Split large components
          components: [
            "./src/commponents/TrackCard.jsx",
            "./src/commponents/Gallery.jsx",
          ],
        },
      },
    },
    // Optimize bundle size
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Enable source maps for debugging (disable in production)
    sourcemap: false,
    // Optimize asset handling
    assetsInlineLimit: 4096,
  },

  // Development server optimizations
  server: {
    // Enable compression
    compress: true,
    // Optimize HMR
    hmr: {
      overlay: false,
    },
  },

  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom", "react-icons/si"],
  },
});
