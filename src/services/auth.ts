import { apiService } from './api'
import type { 
  User, 
  LoginCredentials, 
  RegisterData, 
  UpdateProfileData, 
  UserStats,
  AuthUser
} from '@/types'

class AuthService {
  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthUser> {
    const response = await apiService.post<{ user: User; token: string }>('/login', credentials)
    
    if (response.data) {
      // Store token and user data
      apiService.setAuthToken(response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      
      return {
        ...response.data.user,
        token: response.data.token
      }
    }
    
    throw new Error('Login failed')
  }

  /**
   * Register new user
   */
  async register(userData: RegisterData): Promise<AuthUser> {
    const response = await apiService.post<{ user: User; token: string }>('/register', userData)
    
    if (response.data) {
      // Store token and user data
      apiService.setAuthToken(response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      
      return {
        ...response.data.user,
        token: response.data.token
      }
    }
    
    throw new Error('Registration failed')
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await apiService.post('/logout')
    } finally {
      // Clear local storage and auth token regardless of API response
      apiService.clearAuthToken()
      localStorage.removeItem('user')
    }
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<User> {
    const response = await apiService.get<User>('/user')
    
    if (response.data) {
      // Update stored user data
      localStorage.setItem('user', JSON.stringify(response.data))
      return response.data
    }
    
    throw new Error('Failed to get user data')
  }

  /**
   * Update user profile
   */
  async updateProfile(profileData: UpdateProfileData): Promise<User> {
    const response = await apiService.put<User>('/user', profileData)
    
    if (response.data) {
      // Update stored user data
      localStorage.setItem('user', JSON.stringify(response.data))
      return response.data
    }
    
    throw new Error('Profile update failed')
  }

  /**
   * Get user statistics
   */
  async getUserStats(): Promise<UserStats> {
    const response = await apiService.get<UserStats>('/user/stats')
    
    if (response.data) {
      return response.data
    }
    
    throw new Error('Failed to get user stats')
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    return !!(token && user)
  }

  /**
   * Get stored user data
   */
  getStoredUser(): User | null {
    try {
      const userData = localStorage.getItem('user')
      return userData ? JSON.parse(userData) : null
    } catch {
      return null
    }
  }

  /**
   * Get stored auth token
   */
  getStoredToken(): string | null {
    return localStorage.getItem('token')
  }

  /**
   * Check if stored user is admin
   */
  isAdmin(): boolean {
    const user = this.getStoredUser()
    return user?.is_admin ?? false
  }

  /**
   * Check if stored user is premium
   */
  isPremium(): boolean {
    const user = this.getStoredUser()
    return user?.is_premium ?? false
  }
}

// Export singleton instance
export const authService = new AuthService()
export default authService
