<template>
  <div class="flex items-center space-x-1">
    <button
      v-for="star in 5"
      :key="star"
      type="button"
      @click="setRating(star)"
      :disabled="disabled"
      class="transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 rounded"
      :class="{
        'cursor-pointer hover:scale-110': !disabled,
        'cursor-not-allowed': disabled
      }"
    >
      <svg
        class="transition-all duration-200"
        :class="[
          size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6',
          star <= modelValue ? 'text-yellow-400' : 'text-gray-300',
          !disabled && 'hover:text-yellow-500'
        ]"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        />
      </svg>
    </button>
    
    <!-- Optional text display -->
    <span v-if="showText" class="ml-2 text-sm text-gray-600">
      {{ ratingText }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: number
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  showText?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: number): void
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  size: 'md',
  showText: false
})

const emit = defineEmits<Emits>()

const setRating = (rating: number) => {
  if (!props.disabled) {
    emit('update:modelValue', rating)
  }
}

const ratingText = computed(() => {
  const texts = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent']
  return texts[props.modelValue] || ''
})
</script>
