import { defineConfig, WxtViteConfig } from 'wxt';
import vueJsx from '@vitejs/plugin-vue-jsx';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
  manifest: {
    name: "虎扑论坛增强",
    description: "一款可以在电脑上方便查看虎扑论坛帖子回复的插件。通过弹框形式展示回复列表，达到类似APP上的交互体验。",
    host_permissions: [
      "https://bbs.mobileapi.hupu.com/",
      "https://hupu-bbs-ex-analytics.vercel.app/"
    ],
    permissions: [
      "storage"
    ],
  },
  vite: env => ({
    plugins: [
      vueJsx()
    ]
  } as WxtViteConfig)
});