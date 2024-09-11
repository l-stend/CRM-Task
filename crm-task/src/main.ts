import './assets/style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import { AuraBlue } from './utils/primevue/custom-theme'
import { createI18n } from 'vue-i18n'
import dictionaries from './i18n'

const app = createApp(App)

app.use(createPinia())

// integrate primevue wich customized theme theme
app.use(PrimeVue, {
  theme: {
    preset: AuraBlue
  }
})

// configure i18n
const i18n = createI18n({
  locale: 'en-US',
  fallbackLocale: 'en-US',
  messages: dictionaries,
  legacy: false
})
app.use(i18n)

app.mount('#app')
