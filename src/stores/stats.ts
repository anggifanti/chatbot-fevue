import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '../services/api'
import type { UserStats } from '../types'

export const useStatsStore = defineStore('stats', () => {
  const stats = ref<UserStats | null>(null)
  const isLoading = ref(false)

  const fetchStats = async () => {
    try {
      isLoading.value = true
      const response = await api.get('/user/stats')
      stats.value = response.data.data
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    stats,
    isLoading,
    fetchStats,
  }
})
