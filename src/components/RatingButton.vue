<template>
  <button
    @click="openRatingModal"
    :class="buttonClass"
    class="inline-flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
  >
    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
    <span class="text-sm font-medium">{{ text }}</span>
  </button>

  <RatingModal
    :is-open="showModal"
    :session-id="sessionId"
    @close="showModal = false"
    @success="handleSuccess"
  />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import RatingModal from './RatingModal.vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'ghost'
  sessionId?: string
  text?: string
}

interface Emits {
  (e: 'rated'): void
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'secondary',
  text: 'Rate'
})

const emit = defineEmits<Emits>()

const showModal = ref(false)

const buttonClass = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700'
    case 'secondary':
      return 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    case 'ghost':
      return 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
    default:
      return 'bg-gray-100 text-gray-700 hover:bg-gray-200'
  }
})

const openRatingModal = () => {
  showModal.value = true
}

const handleSuccess = () => {
  emit('rated')
}
</script>
