import { createApp } from 'vue'
import { CompositionRoot } from '@/CompositionRoot'
import './assets/styles/index.sass'

import App from './App.vue'

CompositionRoot.Init()


createApp(App).mount('#app')
