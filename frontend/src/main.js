import { createApp } from 'vue'
import './style.css'
import "bootstrap/dist/css/bootstrap.min.css"
import App from './App.vue'
import Router from './router'

const app = createApp(App)
app.use(Router)
app.mount('#app')
