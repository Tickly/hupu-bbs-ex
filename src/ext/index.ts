/**
 * content.js
 */
import { createApp, h } from 'vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue';

window.addEventListener('load', () => {
  const el = document.createElement('div');
  el.setAttribute('id', 'hupu-bbs-ex');
  document.body.appendChild(el);

  const app = createApp({
    render: () => h(App),
  })
  app.mount(el);
});
