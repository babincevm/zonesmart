import { createApp } from 'vue'
import { CompositionRoot } from '@/CompositionRoot'
import './assets/styles/index.sass'
import { router } from '@/routes'

import App from './App.vue'

CompositionRoot.Init()
Object.values(import.meta.glob('./assets/icons/*.svg')).forEach(async (el) => await el())
const app = createApp(App)

app.use(router)
app.mount('#app')
