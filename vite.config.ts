import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  define: {
    'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': 'https://bbs.hupu.com'
    }
  },
  build: {
    lib: {
      entry: 'src/ext/index.ts',
      fileName: 'content',
      name: 'bbs'
    },
    rollupOptions: {
      // external: ['vue'],
      // input: {
      //   content: './demo/index.ts',
      // },
      output: {
        // entryFileNames: '[name].js',
        // globals: {
        //   vue: 'Vue',
        // },
      }
    }
  }
});
