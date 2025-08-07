import { api } from './api'
import type { UserStats } from '../types'

export const statsService = {
  async getUserStats(): Promise<UserStats> {
    const response = await api.get<{ success: boolean; stats: UserStats }>('/user/stats')
    return response.data.stats
  },
}
