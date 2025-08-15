<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Header -->
      <div class="text-center">
        <div class="mx-auto h-20 w-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-6 text-4xl">
          💄
        </div>
        <h1 class="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
          GlowGla Beauty
        </h1>
        <h2 class="text-2xl font-bold text-gray-900 mb-2">
          {{ isLogin ? 'Selamat Datang Kembali' : 'Bergabung dengan GlowGla' }}
        </h2>
        <p class="text-gray-600 text-sm">
          {{ isLogin ? 'Masuk ke akun Anda untuk melanjutkan' : 'Buat akun baru untuk memulai konsultasi kecantikan' }}
        </p>
      </div>

      <!-- Form Card -->
      <div class="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-8">
        <!-- Error Display -->
        <div v-if="errors.general" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div class="flex items-center">
            <svg class="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            <p class="text-red-700 text-sm font-medium">{{ errors.general }}</p>
          </div>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Name Field (Register Only) -->
          <div v-if="!isLogin" class="space-y-2">
            <label for="name" class="block text-sm font-medium text-gray-700">
              Nama Lengkap <span class="text-red-500">*</span>
            </label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="Masukkan nama lengkap Anda"
              :class="inputClasses(errors.name)"
              @input="clearFieldError('name')"
            />
            <p v-if="errors.name" class="text-sm text-red-600">{{ errors.name }}</p>
          </div>

          <!-- Email Field -->
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email <span class="text-red-500">*</span>
            </label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="Masukkan email Anda"
              :class="inputClasses(errors.email)"
              @input="clearFieldError('email')"
            />
            <p v-if="errors.email" class="text-sm text-red-600">{{ errors.email }}</p>
          </div>

          <!-- Password Field -->
          <div class="space-y-2">
            <label for="password" class="block text-sm font-medium text-gray-700">
              Password <span class="text-red-500">*</span>
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Masukkan password Anda"
                :class="inputClasses(errors.password, 'pr-10')"
                @input="clearFieldError('password')"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    v-if="!showPassword"
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                  <path 
                    v-else
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                  />
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="text-sm text-red-600">{{ errors.password }}</p>
          </div>

          <!-- Confirm Password Field (Register Only) -->
          <div v-if="!isLogin" class="space-y-2">
            <label for="password_confirmation" class="block text-sm font-medium text-gray-700">
              Konfirmasi Password <span class="text-red-500">*</span>
            </label>
            <input
              id="password_confirmation"
              v-model="form.password_confirmation"
              type="password"
              placeholder="Konfirmasi password Anda"
              :class="inputClasses(errors.password_confirmation)"
              @input="clearFieldError('password_confirmation')"
            />
            <p v-if="errors.password_confirmation" class="text-sm text-red-600">{{ errors.password_confirmation }}</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading || !canSubmit"
            class="w-full flex justify-center items-center py-3 px-4 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <div v-if="isLoading" class="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
            {{ isLoading ? 'Memproses...' : (isLogin ? 'Masuk' : 'Daftar') }}
          </button>
        </form>

        <!-- Toggle Auth Mode -->
        <div class="mt-6 text-center">
          <p class="text-gray-600 text-sm">
            {{ isLogin ? 'Belum punya akun?' : 'Sudah punya akun?' }}
            <button
              @click="toggleAuthMode"
              class="text-pink-600 hover:text-pink-700 font-medium ml-1 transition-colors"
            >
              {{ isLogin ? 'Daftar di sini' : 'Masuk di sini' }}
            </button>
          </p>
        </div>

        <!-- Guest Access -->
        <div class="mt-4 text-center">
          <router-link
            to="/"
            class="inline-flex items-center text-gray-500 hover:text-gray-700 text-sm transition-colors"
          >
            <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
              <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
            </svg>
            Lanjutkan sebagai tamu
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { validateEmail, validatePassword, validateRequired } from '../utils/validation'

interface FormErrors {
  name?: string
  email?: string
  password?: string
  password_confirmation?: string
  general?: string
}

const router = useRouter()
const authStore = useAuthStore()

// State
const isLogin = ref(true)
const isLoading = ref(false)
const showPassword = ref(false)

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const errors = reactive<FormErrors>({})

// Computed
const canSubmit = computed(() => {
  if (isLogin.value) {
    return form.email && form.password
  }
  return form.name && form.email && form.password && form.password_confirmation
})

// Methods
const inputClasses = (hasError?: string, additionalClasses = '') => {
  const baseClasses = 'block w-full px-4 py-3 text-base border rounded-xl placeholder-gray-400 transition-all duration-200 focus:outline-none focus:ring-2'
  const errorClasses = hasError 
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' 
    : 'border-gray-300 focus:border-pink-500 focus:ring-pink-500/20'
  
  return `${baseClasses} ${errorClasses} ${additionalClasses}`.trim()
}

const clearFieldError = (field: keyof FormErrors) => {
  if (errors[field]) {
    delete errors[field]
  }
}

const clearAllErrors = () => {
  Object.keys(errors).forEach(key => {
    delete errors[key as keyof FormErrors]
  })
}

const validateForm = (): boolean => {
  clearAllErrors()

  // Email validation
  if (!form.email) {
    errors.email = 'Email harus diisi'
  } else if (!validateEmail(form.email)) {
    errors.email = 'Format email tidak valid'
  }

  // Password validation
  if (!form.password) {
    errors.password = 'Password harus diisi'
  } else if (!validatePassword(form.password)) {
    errors.password = 'Password minimal 8 karakter'
  }

  // Registration-specific validation
  if (!isLogin.value) {
    if (!form.name) {
      errors.name = 'Nama harus diisi'
    } else if (!validateRequired(form.name.trim())) {
      errors.name = 'Nama tidak boleh kosong'
    }

    if (!form.password_confirmation) {
      errors.password_confirmation = 'Konfirmasi password harus diisi'
    } else if (form.password !== form.password_confirmation) {
      errors.password_confirmation = 'Password dan konfirmasi password tidak sama'
    }
  }

  return Object.keys(errors).length === 0
}

const resetForm = () => {
  Object.assign(form, {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })
  clearAllErrors()
}

const toggleAuthMode = () => {
  isLogin.value = !isLogin.value
  resetForm()
}

const handleSubmit = async () => {
  if (isLoading.value) return

  if (!validateForm()) {
    return
  }

  try {
    isLoading.value = true
    clearAllErrors()

    let success = false

    if (isLogin.value) {
      success = await authStore.login(form.email.trim(), form.password)
    } else {
      success = await authStore.register(
        form.name.trim(),
        form.email.trim(),
        form.password,
        form.password_confirmation
      )
    }

    if (success) {
      // Redirect based on user role
      if (authStore.user?.is_admin) {
        await router.push('/admin')
      } else {
        await router.push('/')
      }
    } else {
      errors.general = isLogin.value 
        ? 'Email atau password salah' 
        : 'Registrasi gagal. Silakan coba lagi.'
    }
  } catch (error: any) {
    console.error('Auth error:', error)
    errors.general = error.message || 'Terjadi kesalahan. Silakan coba lagi.'
  } finally {
    isLoading.value = false
  }
}

// Watchers
watch(isLogin, () => {
  resetForm()
})

onMounted(() => {
  // AuthView component initialized
})
</script>
