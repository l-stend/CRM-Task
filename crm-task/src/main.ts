import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import { AuraBlue } from './utils/primevue/custom-theme'
import './assets/style.css'

const app = createApp(App)

app.use(createPinia())

// integrate primevue wich customized theme theme
app.use(PrimeVue, {
  theme: {
    preset: AuraBlue
  }
})

app.mount('#app')
