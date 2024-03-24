import { CompositionRoot } from '@/CompositionRoot';
import { createApp } from 'vue';
import './assets/styles/index.sass';
import { router } from '@/routes';
import store from '@/store';

import App from './App.vue';

CompositionRoot.Init();

Object.values(import.meta.glob('./assets/icons/*.svg')).forEach(async (el) => await el());
const app = createApp(App);

app.use(store);
store.dispatch('initStore');
app.use(router);
app.mount('#app');
