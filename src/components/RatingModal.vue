<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click="closeModal"
  >
    <div 
      class="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl transform transition-all"
      @click.stop
    >
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-semibold text-gray-900">
          {{ title }}
        </h3>
        <button
          @click="closeModal"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Rating Form -->
      <form @submit.prevent="submitRating">
        <!-- Star Rating -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-3">
            Bagaimana pengalaman Anda menggunakan GlowGla secara keseluruhan?
          </label>
          <div class="flex justify-center">
            <StarRating 
              v-model="rating" 
              size="lg" 
              show-text 
              :disabled="isSubmitting"
            />
          </div>
        </div>

        <!-- Feedback Text -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Ceritakan lebih lanjut (opsional)
          </label>
          <textarea
            v-model="feedback"
            :disabled="isSubmitting"
            placeholder="Bagikan pemikiran Anda untuk membantu kami berkembang..."
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
            maxlength="1000"
          ></textarea>
          <div class="text-xs text-gray-500 mt-1">
            {{ feedback.length }}/1000 karakter
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="error" class="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
          {{ error }}
        </div>

        <!-- Success Message -->
        <div v-if="isSuccess" class="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
          Terima kasih! Rating Anda telah berhasil dikirim.
        </div>

        <!-- Action Buttons -->
        <div class="flex space-x-3">
          <button
            type="button"
            @click="closeModal"
            :disabled="isSubmitting"
            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Batal
          </button>
          <button
            type="submit"
            :disabled="rating === 0 || isSubmitting"
            class="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isSubmitting" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Mengirim...
            </span>
            <span v-else>Kirim Rating</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import StarRating from './StarRating.vue'
import { ratingService, type RatingData } from '../services/rating'
import { useAuthStore } from '../stores/auth'

interface Props {
  isOpen: boolean
  sessionId?: string
}

interface Emits {
  (e: 'close'): void
  (e: 'success'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const authStore = useAuthStore()

// Form data
const rating = ref(0)
const feedback = ref('')
const isSubmitting = ref(false)
const error = ref('')
const isSuccess = ref(false)

// Computed properties
const title = computed(() => 'Nilai Pengalaman Anda')

// Methods
const closeModal = () => {
  if (!isSubmitting.value) {
    resetForm()
    emit('close')
  }
}

const resetForm = () => {
  rating.value = 0
  feedback.value = ''
  error.value = ''
  isSuccess.value = false
}

const submitRating = async () => {
  if (rating.value === 0) return

  isSubmitting.value = true
  error.value = ''
  isSuccess.value = false

  try {
    const ratingData: RatingData = {
      rating: rating.value,
      feedback: feedback.value || undefined,
    }

    // Add session ID for guest users
    if (!authStore.isAuthenticated && props.sessionId) {
      ratingData.session_id = props.sessionId
    }

    await ratingService.submitRating(ratingData)
    
    // Show success message
    isSuccess.value = true
    emit('success')
    
    // Add a small delay to show success feedback before closing
    setTimeout(() => {
      closeModal()
    }, 1500)
    
  } catch (err: any) {
    console.error('Failed to submit rating:', err)
    error.value = err.response?.data?.message || 'Gagal mengirim rating. Silakan coba lagi.'
  } finally {
    isSubmitting.value = false
  }
}
</script>
