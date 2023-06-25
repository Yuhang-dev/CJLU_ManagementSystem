import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import { setupStore } from './store';

import '@/permission'

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
};

app.use(router);
setupStore(app);
app.mount('#app');
