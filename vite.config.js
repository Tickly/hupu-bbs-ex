import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        content: './src/main.ts'
      },
      output: {
        entryFileNames: '[name].js',
      }
    }
  }
})