import { api } from './api'

export interface UserProfile {
  id: number
  name: string
  email: string
  avatar?: string
  avatar_url?: string
  is_premium: boolean
  is_admin: boolean
  created_at: string
  updated_at?: string
}

export interface UpdateProfileData {
  name?: string
  email?: string
  current_password?: string
  password?: string
  password_confirmation?: string
}

export interface DeleteAccountData {
  password: string
  confirmation: string
}

export const userService = {
  // Update user profile
  async updateProfile(data: UpdateProfileData) {
    const response = await api.put<{
      success: boolean
      message: string
      user: UserProfile
    }>('/user/profile', data)
    return response.data
  },

  // Update user avatar
  async updateAvatar(file: File) {
    const formData = new FormData()
    formData.append('avatar', file)

    const response = await api.post<{
      success: boolean
      message: string
      user: UserProfile
      avatar_url: string
    }>('/user/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Delete user account
  async deleteAccount(data: DeleteAccountData) {
    const response = await api.delete<{
      success: boolean
      message: string
    }>('/user/account', { data })
    return response.data
  },

  // Get current user
  async getCurrentUser() {
    const response = await api.get<{
      success: boolean
      user: UserProfile
    }>('/user')
    return response.data
  },

  // Get user stats
  async getUserStats() {
    const response = await api.get<{
      success: boolean
      stats: {
        total_messages: number
        total_sessions: number
        messages_today: number
        usage_by_date: Array<{ date: string; count: number }>
        remaining_messages: number
        message_limit: number
        user_type: string
        monthly_message_count: number
      }
    }>('/user/stats')
    return response.data
  },
}
