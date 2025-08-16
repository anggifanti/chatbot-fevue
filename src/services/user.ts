import { apiService } from './api'
import type { 
  User, 
  UpdateProfileData,
  PaginationMeta 
} from '../types/index'

class UserService {
  /**
   * Get current user profile
   */
  async getProfile(): Promise<User> {
    const response = await apiService.get('/user')
    
    if (response.data && (response.data as any).user) {
      return (response.data as any).user
    }
    
    throw new Error('Failed to get user profile')
  }

  /**
   * Update user profile
   */
  async updateProfile(profileData: UpdateProfileData): Promise<User> {
    const response = await apiService.put('/user/profile', profileData)
    
    if (response.data && (response.data as any).data) {
      return (response.data as any).data
    }
    
    throw new Error('Failed to update profile')
  }

  /**
   * Change user password
   */
  async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    await apiService.put('/user/password', {
      old_password: oldPassword,
      new_password: newPassword,
    })
  }

  /**
   * Delete user account
   */
  async deleteAccount(deleteForm: { password: string; confirmation: string }): Promise<void> {
    await apiService.delete('/user/account', {
      data: { password: deleteForm.password }
    })
  }

  /**
   * Get all users (admin only)
   */
  async getAdminUsers(page = 1, perPage = 10, search = ''): Promise<{
    users: User[]
    pagination: PaginationMeta
  }> {
    const params = {
      page,
      per_page: perPage,
      ...(search && { search })
    }

    const response = await apiService.get<User[]>('/admin/users', { params })
    
    if (response.data) {
      return {
        users: response.data,
        pagination: { current_page: 1, from: 1, last_page: 1, per_page: 10, to: response.data.length, total: response.data.length }
      }
    }
    
    throw new Error('Failed to get users')
  }

  /**
   * Update user role (admin only)
   */
  async updateUserRole(userId: number, isAdmin: boolean): Promise<User> {
    const response = await apiService.put<User>(`/admin/users/${userId}/role`, { is_admin: isAdmin })
    
    if (response.data) {
      return response.data
    }
    
    throw new Error('Failed to update user role')
  }

  /**
   * Get current user (alias for getProfile for compatibility)
   */
  async getCurrentUser(): Promise<User> {
    return this.getProfile()
  }

  /**
   * Update user avatar
   */
  async updateAvatar(file: File): Promise<User> {
    console.log('📤 UserService.updateAvatar called with:', {
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type
    })
    
    const formData = new FormData()
    formData.append('avatar', file)
    
    console.log('📦 FormData created:', {
      hasAvatar: formData.has('avatar'),
      avatarFile: formData.get('avatar')
    })
    
    const response = await apiService.post('/user/avatar', formData)
    
    if (response.data && (response.data as any).data) {
      return (response.data as any).data
    }
    
    throw new Error('Failed to update avatar')
  }

  /**
   * Delete user (admin only)
   */
  async deleteUser(userId: number): Promise<void> {
    await apiService.delete(`/admin/users/${userId}`)
  }

  /**
   * Validate profile data before submission
   */
  validateProfileData(data: UpdateProfileData): string[] {
    const errors: string[] = []

    if (data.name && data.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long')
    }

    if (data.name && data.name.length > 255) {
      errors.push('Name cannot exceed 255 characters')
    }

    if (data.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(data.email)) {
        errors.push('Please enter a valid email address')
      }
    }

    return errors
  }

  /**
   * Validate password data
   */
  validatePasswordData(data: {
    current_password: string
    new_password: string
    new_password_confirmation: string
  }): string[] {
    const errors: string[] = []

    if (!data.current_password) {
      errors.push('Current password is required')
    }

    if (!data.new_password) {
      errors.push('New password is required')
    } else if (data.new_password.length < 8) {
      errors.push('New password must be at least 8 characters long')
    }

    if (data.new_password !== data.new_password_confirmation) {
      errors.push('Password confirmation does not match')
    }

    return errors
  }

  /**
   * Check password strength
   */
  checkPasswordStrength(password: string): {
    score: number
    feedback: string[]
    isStrong: boolean
  } {
    const feedback: string[] = []
    let score = 0

    if (password.length >= 8) {
      score += 1
    } else {
      feedback.push('Use at least 8 characters')
    }

    if (/[a-z]/.test(password)) {
      score += 1
    } else {
      feedback.push('Add lowercase letters')
    }

    if (/[A-Z]/.test(password)) {
      score += 1
    } else {
      feedback.push('Add uppercase letters')
    }

    if (/\d/.test(password)) {
      score += 1
    } else {
      feedback.push('Add numbers')
    }

    if (/[^a-zA-Z\d]/.test(password)) {
      score += 1
    } else {
      feedback.push('Add special characters')
    }

    return {
      score,
      feedback,
      isStrong: score >= 4
    }
  }

  /**
   * Format user display name
   */
  formatUserDisplayName(user: User): string {
    if (user.name) {
      return user.name
    }
    
    // Fallback to email username part
    return user.email.split('@')[0]
  }

  /**
   * Get user initials for avatar
   */
  getUserInitials(user: User): string {
    if (user.name) {
      const names = user.name.trim().split(' ')
      if (names.length >= 2) {
        return (names[0][0] + names[names.length - 1][0]).toUpperCase()
      }
      return names[0][0].toUpperCase()
    }
    
    return user.email[0].toUpperCase()
  }

  /**
   * Check if user is admin
   */
  isAdmin(user: User): boolean {
    return user.is_admin === true
  }
}

// Export singleton instance
export const userService = new UserService()
export default userService
