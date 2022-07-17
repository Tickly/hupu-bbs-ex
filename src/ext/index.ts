import { createApp, h } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css'

window.addEventListener('load', () => {
  const el = document.createElement('div');
  el.setAttribute('id', 'hupu-bbs-ex');
  document.body.appendChild(el);

  const app = createApp({
    render: () => h(App),
  });
  app.mount(el);
});
