import { createApp } from 'vue'
import { createPinia } from 'pinia'

import timeago from 'vue-timeago3'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(timeago)

app.use(router)

app.mount('#app')
