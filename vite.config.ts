import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import path from "path";

const API_URL = process.env.API_URL;
console.log(process.env.ENV);

const ENV = process.env.ENV;

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
  build: {
    outDir: "./dist",
    rollupOptions: {
      plugins: [],
    },
  },
  define: {
    API_URL: JSON.stringify(API_URL),
    WS_URL: JSON.stringify(ENV === "PROD" ? "wss://www.seo-go.top/ws" : "ws://localhost:8600/ws"),
  },
  plugins: [
    svgr({
      exportAsDefault: false,
    }),
    react({
      babel: {
        plugins: ["macros"],
      },
    }),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
  },
  server: {
    port: 3000,
    proxy: {
      "/api": {
       //  target: 'http://124.70.221.110:8600',
        target: 'http://localhost:8600',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },  
})
