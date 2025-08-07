import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '../services/api'
import type { User, AuthResponse } from '../types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const isLoading = ref(false)

  const isAuthenticated = computed(() => !!token.value && !!user.value)

  const login = async (email: string, password: string) => {
    try {
      isLoading.value = true
      const response = await api.post<AuthResponse>('/login', {
        email,
        password,
      })

      token.value = response.data.token
      user.value = response.data.user

      localStorage.setItem('token', token.value)
      api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`

      // Reset guest count when user authenticates
      const { useChatStore } = await import('./chat')
      const chatStore = useChatStore()
      chatStore.resetGuestCount()

      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const register = async (
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
  ) => {
    try {
      isLoading.value = true
      const response = await api.post<AuthResponse>('/register', {
        name,
        email,
        password,
        password_confirmation,
      })

      token.value = response.data.token
      user.value = response.data.user

      localStorage.setItem('token', token.value)
      api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`

      // Reset guest count when user registers
      const { useChatStore } = await import('./chat')
      const chatStore = useChatStore()
      chatStore.resetGuestCount()

      return true
    } catch (error) {
      console.error('Registration failed:', error)
      return false
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      if (token.value) {
        await api.post('/logout')
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      token.value = null
      user.value = null
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
    }
  }

  const checkAuth = async () => {
    if (!token.value) return false

    try {
      api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      const response = await api.get<{ user: User }>('/user')
      user.value = response.data.user
      return true
    } catch (error) {
      console.error('Auth check failed:', error)
      logout()
      return false
    }
  }

  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth,
  }
})
