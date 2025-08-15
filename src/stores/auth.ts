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

      if (response.data && response.data.token && response.data.user) {
        token.value = response.data.token
        user.value = response.data.user

        localStorage.setItem('token', response.data.token)
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

        // Reset guest count when user authenticates
        try {
          const { useChatStore } = await import('./chat')
          const chatStore = useChatStore()
          chatStore.resetGuestCount()
        } catch (error) {
          console.warn('Could not reset guest count:', error)
        }

        return true
      } else {
        throw new Error('Invalid response from server')
      }
    } catch (error: any) {
      console.error('Login failed:', error)
      
      // Clear any stored token on login failure
      token.value = null
      user.value = null
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
      
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

      localStorage.setItem('token', response.data.token)
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

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
    if (!token.value) {
      // No token available, ensure user is cleared
      user.value = null
      return false
    }

    try {
      // Set the token in headers before making the request
      api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
      const response = await api.get<{ user: User }>('/user')
      
      // Successfully got user data
      user.value = response.data.user
      return true
    } catch (error: any) {
      console.error('Auth check failed:', error)
      
      // Clear all auth state on failure
      token.value = null
      user.value = null
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
      
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
