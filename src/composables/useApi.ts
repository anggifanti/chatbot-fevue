import { ref, Ref } from 'vue'

export function useApi<T = any>() {
  const data: Ref<T | null> = ref(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const execute = async (request: () => Promise<T>) => {
    try {
      loading.value = true
      error.value = null
      data.value = await request()
      return data.value
    } catch (err: any) {
      error.value = err.response?.data?.message || err.message || 'An error occurred'
      throw err
    } finally {
      loading.value = false
    }
  }

  const reset = () => {
    data.value = null
    error.value = null
    loading.value = false
  }

  return {
    data,
    loading,
    error,
    execute,
    reset,
  }
}
