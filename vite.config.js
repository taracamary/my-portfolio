import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';

export default defineConfig({
  plugins: [
    injectHTML()
  ],
  server: {
    open: true,
    host: '127.0.0.1', // или '0.0.0.0', чтобы проект был доступен и по локальному IP в сети
    port: 5173
  }
});