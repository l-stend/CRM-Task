import './assets/style.css'
import 'primeicons/primeicons.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import { AuraBlue } from './utils/primevue/custom-theme'
import { createI18n } from 'vue-i18n'
import dictionaries from './i18n'
import ToastService from 'primevue/toastservice'
import { setToastService, setTranslateService } from './utils/services'

const app = createApp(App)

app.use(createPinia())

// integrate primevue with customized theme theme
app.use(PrimeVue, {
  theme: {
    preset: AuraBlue
  }
})
// add prime vue toasts
app.use(ToastService)
// expose toast service for being used in the store
setToastService(app.config.globalProperties.$toast)

// configure i18n
const i18n = createI18n({
  locale: 'en-US',
  fallbackLocale: 'en-US',
  messages: dictionaries,
  legacy: false
})
app.use(i18n)
//  expose i18n instance for being used in the store
setTranslateService(i18n)

app.mount('#app')
