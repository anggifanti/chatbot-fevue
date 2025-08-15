import { apiService } from './api'
import type { 
  UserStats, 
  RatingStats, 
  DashboardStats,
  SystemStats,
  UserRating,
  MonthlyStats
} from '@/types'

class StatService {
  /**
   * Get user statistics (authenticated users only)
   */
  async getUserStats(): Promise<UserStats> {
    const response = await apiService.get<UserStats>('/user/stats')
    
    if (response.data) {
      return response.data
    }
    
    throw new Error('Failed to get user statistics')
  }

  /**
   * Get system statistics
   */
  async getSystemStats(): Promise<SystemStats> {
    const response = await apiService.get<SystemStats>('/admin/stats/system')
    
    if (response.data) {
      return response.data
    }
    
    throw new Error('Failed to get system statistics')
  }

  /**
   * Get admin dashboard statistics (admin only)
   */
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await apiService.get<DashboardStats>('/admin/stats')
    
    if (response.data) {
      return response.data
    }
    
    throw new Error('Failed to get dashboard statistics')
  }

  /**
   * Get user ratings for admin
   */
  async getUserRatings(): Promise<UserRating[]> {
    const response = await apiService.get<UserRating[]>('/admin/ratings')
    
    if (response.data) {
      return response.data
    }
    
    throw new Error('Failed to get user ratings')
  }

  /**
   * Get monthly statistics
   */
  async getMonthlyStats(): Promise<MonthlyStats[]> {
    const response = await apiService.get<MonthlyStats[]>('/admin/stats/monthly')
    
    if (response.data) {
      return response.data
    }
    
    throw new Error('Failed to get monthly statistics')
  }

  /**
   * Get admin dashboard statistics (alias for backward compatibility)
   */
  async getAdminStats(): Promise<DashboardStats> {
    return this.getDashboardStats()
  }

  /**
   * Get rating statistics for admin dashboard
   */
  async getAdminRatingStats(): Promise<RatingStats> {
    const response = await apiService.get<RatingStats>('/admin/ratings/stats')
    
    if (response.data) {
      return response.data
    }
    
    throw new Error('Failed to get rating statistics')
  }

  /**
   * Format statistics for display
   */
  formatStatNumber(value: number): string {
    if (value >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M'
    } else if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'K'
    }
    return value.toString()
  }

  /**
   * Calculate percentage change
   */
  calculatePercentageChange(current: number, previous: number): {
    percentage: number
    direction: 'up' | 'down' | 'neutral'
    formatted: string
  } {
    if (previous === 0) {
      return {
        percentage: current > 0 ? 100 : 0,
        direction: current > 0 ? 'up' : 'neutral',
        formatted: current > 0 ? '+100%' : '0%'
      }
    }

    const percentage = ((current - previous) / previous) * 100
    const direction = percentage > 0 ? 'up' : percentage < 0 ? 'down' : 'neutral'
    const formatted = percentage > 0 ? `+${percentage.toFixed(1)}%` : `${percentage.toFixed(1)}%`

    return {
      percentage: Math.abs(percentage),
      direction,
      formatted
    }
  }

  /**
   * Get trend analysis for statistics
   */
  getTrendAnalysis(current: number, previous: number): {
    trend: 'positive' | 'negative' | 'neutral'
    message: string
    color: string
    icon: string
  } {
    const change = this.calculatePercentageChange(current, previous)

    if (change.direction === 'up') {
      return {
        trend: 'positive',
        message: `${change.formatted} increase`,
        color: 'green',
        icon: '📈'
      }
    } else if (change.direction === 'down') {
      return {
        trend: 'negative',
        message: `${change.formatted} decrease`,
        color: 'red',
        icon: '📉'
      }
    } else {
      return {
        trend: 'neutral',
        message: 'No change',
        color: 'gray',
        icon: '➖'
      }
    }
  }

  /**
   * Get activity level based on message count
   */
  getActivityLevel(messageCount: number): {
    level: 'low' | 'medium' | 'high' | 'very_high'
    label: string
    color: string
    description: string
  } {
    if (messageCount >= 100) {
      return {
        level: 'very_high',
        label: 'Very Active',
        color: 'purple',
        description: 'Power user with extensive chatbot usage'
      }
    } else if (messageCount >= 50) {
      return {
        level: 'high',
        label: 'Highly Active',
        color: 'blue',
        description: 'Regular user with frequent interactions'
      }
    } else if (messageCount >= 10) {
      return {
        level: 'medium',
        label: 'Moderately Active',
        color: 'green',
        description: 'Occasional user with some interactions'
      }
    } else {
      return {
        level: 'low',
        label: 'New User',
        color: 'gray',
        description: 'Getting started with the chatbot'
      }
    }
  }

  /**
   * Calculate time periods for statistics
   */
  getTimePeriods(): {
    today: { start: string; end: string }
    yesterday: { start: string; end: string }
    thisWeek: { start: string; end: string }
    lastWeek: { start: string; end: string }
    thisMonth: { start: string; end: string }
    lastMonth: { start: string; end: string }
  } {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
    
    // This week (starting from Monday)
    const thisWeekStart = new Date(today)
    const dayOfWeek = today.getDay()
    const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
    thisWeekStart.setDate(today.getDate() - daysFromMonday)
    
    // Last week
    const lastWeekStart = new Date(thisWeekStart.getTime() - 7 * 24 * 60 * 60 * 1000)
    const lastWeekEnd = new Date(thisWeekStart.getTime() - 1)
    
    // This month
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    
    // Last month
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1)
    const lastMonthEnd = new Date(thisMonthStart.getTime() - 1)

    return {
      today: {
        start: today.toISOString().split('T')[0],
        end: today.toISOString().split('T')[0]
      },
      yesterday: {
        start: yesterday.toISOString().split('T')[0],
        end: yesterday.toISOString().split('T')[0]
      },
      thisWeek: {
        start: thisWeekStart.toISOString().split('T')[0],
        end: now.toISOString().split('T')[0]
      },
      lastWeek: {
        start: lastWeekStart.toISOString().split('T')[0],
        end: lastWeekEnd.toISOString().split('T')[0]
      },
      thisMonth: {
        start: thisMonthStart.toISOString().split('T')[0],
        end: now.toISOString().split('T')[0]
      },
      lastMonth: {
        start: lastMonthStart.toISOString().split('T')[0],
        end: lastMonthEnd.toISOString().split('T')[0]
      }
    }
  }
}

// Export singleton instance
export const statService = new StatService()
export default statService
