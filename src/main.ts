import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import './assets/main.css'
import 'vant/lib/index.css'
import './assets/main.scss'
import 'virtual:svg-icons-register'
const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')
