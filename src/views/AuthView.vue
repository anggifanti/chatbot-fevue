<template>
  <div
    class="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-6 sm:space-y-8">
      <!-- Header Section -->
      <div class="text-center">
        <div class="mb-4 sm:mb-6">
          <div
            class="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-pink-400 via-slate-50 to-blue-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
            <span class="text-white text-2xl sm:text-3xl">💄</span>
          </div>
          <h1
            class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
            GlowGla Beauty
          </h1>
        </div>

        <h2 class="text-2xl sm:text-3xl font-extrabold text-gray-900">
          {{ isLogin ? 'Masuk ke akun Anda' : 'Buat akun Anda' }}
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          {{ isLogin ? 'Belum punya akun?' : 'Sudah punya akun?' }}
          <button @click="isLogin = !isLogin"
            class="font-medium text-pink-600 hover:text-pink-500 focus:outline-none transition-colors">
            {{ isLogin ? 'Daftar' : 'Masuk' }}
          </button>
        </p>
      </div>

      <!-- Form Container -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-200/50 p-6 sm:p-8">
        <form class="space-y-4 sm:space-y-6" @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <div v-if="!isLogin">
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Nama lengkap</label>
              <input id="name" v-model="form.name" name="name" type="text" required :class="inputClasses"
                class="rounded-xl" placeholder="Masukkan nama lengkap Anda" />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Alamat email</label>
              <input id="email" v-model="form.email" name="email" type="email" required :class="inputClasses"
                class="rounded-xl" placeholder="Masukkan alamat email Anda" />
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Kata sandi</label>
              <input id="password" v-model="form.password" name="password" type="password" required
                :class="inputClasses" class="rounded-xl" placeholder="Masukkan kata sandi Anda" />
            </div>

            <div v-if="!isLogin">
              <label for="password_confirmation" class="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Kata
                Sandi</label>
              <input id="password_confirmation" v-model="form.password_confirmation" name="password_confirmation"
                type="password" required :class="inputClasses" class="rounded-xl"
                placeholder="Konfirmasi kata sandi Anda" />
            </div>
          </div>

          <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-xl">
            <div class="text-red-600 text-sm text-center font-medium">
              {{ error }}
            </div>
          </div>

          <div>
            <button type="submit" :disabled="authStore.isLoading"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl">
              <span v-if="authStore.isLoading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              </span>
              {{ isLogin ? 'Masuk' : 'Daftar' }}
            </button>
          </div>
        </form>

        <!-- Back to Chat Link -->
        <div class="text-center mt-6">
          <button @click="$router.push('/')" class="text-sm text-gray-600 hover:text-pink-600 transition-colors">
            ← Kembali ke Chat
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const isLogin = ref(true)
const error = ref('')

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

const inputClasses =
  'appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'

const handleSubmit = async () => {
  error.value = ''

  // Validate password confirmation for registration
  if (!isLogin.value && form.password !== form.password_confirmation) {
    error.value = 'Passwords do not match'
    return
  }

  try {
    let success = false

    if (isLogin.value) {
      success = await authStore.login(form.email, form.password)
    } else {
      success = await authStore.register(
        form.name,
        form.email,
        form.password,
        form.password_confirmation,
      )
    }

    if (success) {
      router.push('/')
    } else {
      error.value = isLogin.value ? 'Invalid credentials' : 'Registration failed'
    }
  } catch (err) {
    error.value = 'An error occurred. Please try again.'
  }
}

// Clear error when switching between login/register
watch(isLogin, () => {
  error.value = ''
  form.password_confirmation = ''
})
</script>
