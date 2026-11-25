import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Wait for the initial route to resolve so there's no blank flash
// After deployment the home page was not loading and only the spinner was visible so we wrote the below code so when the router is ready, the app is mounted and the loader is removed.
await router.isReady()
app.mount('#app')
document.getElementById('app-preloader')?.remove()
