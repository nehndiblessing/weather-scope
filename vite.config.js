import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ command }) => ({
  base: "/Weather_scope/",
  plugins: [
    react(), 
    tailwindcss(),

    VitePWA({
      registerType: "autoUpdate",

      includeAssets: ["favicon.svg", "pwa-icon.svg"],

      manifest: {
        name: "WeatherScope",
        short_name: "Weather",
        description: "Real-time weather forecasts, air quality, and interactive maps for any city worldwide.",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "portrait-primary",
        lang: "en",
        theme_color: "#6366f1",
        background_color: "#6366f1",
        categories: ["weather", "utilities", "travel"],
        icons: [
          {
            src: "pwa-icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any",
          },
          {
            src: "pwa-icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "maskable",
          },
        ],
        screenshots: [],
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest,json}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.open-meteo\.com\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "open-meteo-api",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60,
              },
              networkTimeoutSeconds: 5,
            },
          },
          {
            urlPattern: /^https:\/\/geocoding-api\.open-meteo\.com\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "geocoding-api",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24,
              },
              networkTimeoutSeconds: 5,
            },
          },
          {
            urlPattern: /^https:\/\/air-quality-api\.open-meteo\.com\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "air-quality-api",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60,
              },
              networkTimeoutSeconds: 5,
            },
          },
          {
            urlPattern: /^https:\/\/nominatim\.openstreetmap\.org\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "nominatim-geocode",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24,
              },
              networkTimeoutSeconds: 5,
            },
          },
          {
            urlPattern: /^https:\/\/{s}\.tile\.openstreetmap\.org\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "map-tiles",
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
    }),
    // bundle visualizer (generates dist/stats.html)
    visualizer({ filename: "dist/stats.html", open: false }),
  ],
  build: {
    // Increase warning limit slightly and add manual chunking to reduce huge main bundle
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      // Externalize large libs in production and provide globals for UMD CDN
      external: command === 'build' ? ['recharts'] : [],
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'vendor_react';
            if (id.includes('react-router-dom')) return 'vendor_router';
            if (id.includes('recharts')) return 'vendor_recharts';
            if (id.includes('leaflet') || id.includes('react-leaflet')) return 'vendor_map';
            if (id.includes('framer-motion')) return 'vendor_motion';
            if (id.includes('@tanstack/react-query')) return 'vendor_query';
            if (id.includes('react-helmet-async')) return 'vendor_helmet';
            if (id.includes('react-loading-skeleton')) return 'vendor_skeleton';
            if (id.includes('react-icons')) return 'vendor_icons';
            return 'vendor_misc';
          }
        },
        globals: {
          recharts: 'Recharts',
        },
      },
    },
  },
}));