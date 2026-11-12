import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Wait for the initial route to resolve so there's no blank flash
await router.isReady()
app.mount('#app')
document.getElementById('app-preloader')?.remove()
