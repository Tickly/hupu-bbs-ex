import { defineConfig, WxtViteConfig } from 'wxt';
import vueJsx from '@vitejs/plugin-vue-jsx';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
  vite: env => ({
    plugins: [
      vueJsx()
    ]
  } as WxtViteConfig)
});