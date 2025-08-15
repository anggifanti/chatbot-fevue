import { api } from './api'

export interface RatingData {
  rating: number
  feedback?: string
  session_id?: string
}

export interface RatingStats {
  average_rating: number
  total_ratings: number
  rating_distribution: Record<string, number>
}

export interface Rating {
  id: number
  rating: number
  feedback?: string
  submitted_at: string
}

export const ratingService = {
  /**
   * Submit a rating
   */
  async submitRating(data: RatingData) {
    const response = await api.post('/ratings', data)
    return response.data
  },

  /**
   * Get rating statistics
   */
  async getRatingStats(): Promise<{ success: boolean; stats: RatingStats }> {
    const response = await api.get('/ratings/stats')
    return response.data
  },

  /**
   * Get user's ratings (authenticated users only)
   */
  async getUserRatings(page = 1) {
    const response = await api.get('/my-ratings', {
      params: { page }
    })
    return response.data
  },

  /**
   * Get admin rating statistics
   */
  async getAdminRatingStats(days = 30) {
    const response = await api.get('/admin/ratings/stats', {
      params: { days }
    })
    return response.data
  },

  /**
   * Get all ratings for admin
   */
  async getAdminRatings(filters: {
    type?: string
    rating?: number
    per_page?: number
    page?: number
  } = {}) {
    const response = await api.get('/admin/ratings', {
      params: filters
    })
    return response.data
  }
}
