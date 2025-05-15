import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

const targetDmpServices = 'http://10.1.15.5:8686/';
const targetEMAServices = 'http://10.1.15.3/EMA_webServices/' 

// https://vitejs.dev/config/
// Set Node.js options for handling large headers
process.env.NODE_OPTIONS = '--max-http-header-size=16384000'; // 16MB in bytes

export default defineConfig({
  base: '',
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => ['v-list-item-content'].includes(tag),
        }
      }
    }),
    vuetify({ autoImport: true })
  ],
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost'
    },
    // Increase the maximum header size to accommodate large certificates
    maxHeadersCount: 100, // Increase max headers count
    maxHeaderSize: 16 * 1024 * 1024, // 16MB max header size
    // Handle client-side routing
    historyApiFallback: true,
    proxy: {
      '/dmp' : {
        target:'http://localhost:8080',
        changeOrigin: true,
        configure: (proxy, options) => {
          // Increase the maximum header size to 100MB (default is 8KB)
          proxy.on('proxyReq', function(proxyReq, req, res, options) {
            proxyReq.setHeader('Connection', 'keep-alive');
          });
          proxy.on('error', function(err, req, res) {
            console.error('Proxy error:', err);
          });
        }
      },
      '/fetchPatients': {
        target: targetEMAServices,
        ws: true,
        changeOrigin: true,
        secure: false
      },
      '/dmp/td02Exist': {
        target: targetDmpServices,
        ws: true,
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          // Increase the maximum header size for this specific endpoint
          proxy.on('proxyReq', function(proxyReq, req, res, options) {
            proxyReq.setHeader('Connection', 'keep-alive');
          });
          proxy.on('error', function(err, req, res) {
            console.error('Proxy error in td02Exist:', err);
          });
        }
      },

      '/dmp/td04ListDMPActifs': {
        target: targetDmpServices,
        ws: true,
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          // Increase the maximum header size for this specific endpoint
          proxy.on('proxyReq', function(proxyReq, req, res, options) {
            proxyReq.setHeader('Connection', 'keep-alive');
          });
          proxy.on('error', function(err, req, res) {
            console.error('Proxy error in td04ListDMPActifs:', err);
          });
        }
      },

      '/dmp/td31Find': {
        target: targetDmpServices,
        ws: true,
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          // Increase the maximum header size for this specific endpoint
          proxy.on('proxyReq', function(proxyReq, req, res, options) {
            proxyReq.setHeader('Connection', 'keep-alive');
          });
          proxy.on('error', function(err, req, res) {
            console.error('Proxy error in td31Find:', err);
          });
        }
      },

      '/dmp/td03AddAuthorization':{
        target: targetDmpServices,
        ws: true,
        changeOrigin: true,
        secure: false,
        configure: (proxy, options) => {
          // Increase the maximum header size for this specific endpoint
          proxy.on('proxyReq', function(proxyReq, req, res, options) {
            proxyReq.setHeader('Connection', 'keep-alive');
          });
          proxy.on('error', function(err, req, res) {
            console.error('Proxy error in td03AddAuthorization:', err);
          });
        }
      },
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
