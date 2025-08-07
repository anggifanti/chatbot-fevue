import { ref, watch, Ref } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T): [Ref<T>, (value: T) => void] {
  const storedValue = localStorage.getItem(key)
  const initial = storedValue ? JSON.parse(storedValue) : defaultValue

  const state = ref<T>(initial)

  const setValue = (value: T) => {
    state.value = value
    localStorage.setItem(key, JSON.stringify(value))
  }

  watch(
    state,
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue))
    },
    { deep: true },
  )

  return [state as Ref<T>, setValue]
}
