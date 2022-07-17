import path from 'path'
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@':  path.resolve(__dirname,'src'),
    },
  },
  build: {
    lib: {
      entry: 'src/ext/index.ts',
      fileName: 'content',
      name:'bbs'
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
      },
    },
  },
});
