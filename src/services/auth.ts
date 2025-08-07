import { api } from './api'
import type { AuthResponse, User } from '../types'

export const authService = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/api/login', {
      email,
      password,
    })
    return response.data
  },

  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/api/register', {
      name,
      email,
      password,
    })
    return response.data
  },

  async logout(): Promise<void> {
    await api.post('/api/logout')
  },

  async getCurrentUser(): Promise<User> {
    const response = await api.get<{ user: User }>('/api/user')
    return response.data.user
  },
}
