import { createApp, h } from 'vue';
import App from './App.vue';

export default defineContentScript({
  matches: ['*://bbs.hupu.com/*'],
  main () {
    console.log('main');
    window.addEventListener('load', () => {
      console.log('page load');
      const el = document.createElement('div');
      el.setAttribute('id', 'hupu-bbs-ex');
      document.body.appendChild(el);

      const app = createApp({
        render: () => h(App),
      })
      app.mount(el);
    });

  }
})