import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

// Initialize auth store and check authentication before mounting
const initApp = async () => {
  const authStore = useAuthStore()

  // Check if user is authenticated if token exists
  if (authStore.token) {
    await authStore.checkAuth()
  }

  app.use(router)
  app.mount('#app')
}

initApp()
