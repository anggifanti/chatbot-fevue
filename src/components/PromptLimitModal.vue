<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click="handleBackdropClick"
  >
    <div
      class="bg-white rounded-lg p-6 w-full max-w-md mx-4 transform transition-all duration-300"
      :class="show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'"
      @click.stop
    >
      <div class="text-center">
        <div class="mb-4">
          <svg
            class="w-16 h-16 mx-auto text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            ></path>
          </svg>
        </div>

        <h3 class="text-lg font-semibold text-gray-900 mb-2">
          Konsultasi Kecantikan Gratis Telah Habis ✨
        </h3>

        <p class="text-gray-600 mb-6">
          Anda telah menggunakan semua 3 konsultasi kecantikan gratis! Buat akun gratis untuk terus
          mendapatkan saran makeup dan perawatan kulit tanpa batas.
        </p>

        <div class="flex flex-col space-y-3">
          <button
            @click="handleSignUp"
            class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            Daftar Sekarang
          </button>

          <button
            @click="handleClose"
            class="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
          >
            Nanti Saja
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  show: boolean
}

interface Emits {
  (e: 'close'): void
  (e: 'sign-up'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const handleBackdropClick = () => {
  emit('close')
}

const handleClose = () => {
  emit('close')
}

const handleSignUp = () => {
  emit('sign-up')
}
</script>
