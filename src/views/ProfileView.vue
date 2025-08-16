<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-sm shadow-lg border-b-2 border-gradient-to-r from-pink-200 to-purple-200">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-3 sm:py-4">
          <div class="flex items-center space-x-2 sm:space-x-3">
            <button @click="$router.go(-1)" class="text-gray-500 hover:text-gray-700 transition-colors p-1">
              <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
            </button>
            <VIcon name="md-settings" class="text-lg sm:text-2xl text-purple-600" />
            <div>
              <h1
                class="text-lg sm:text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Pengaturan Profil
              </h1>
              <p class="text-xs sm:text-sm text-gray-500 hidden sm:block">
                Kelola akun konsultan kecantikan Anda
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Content -->
    <main class="max-w-4xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div class="space-y-6 sm:space-y-8">
        <!-- Profile Picture Section -->
        <div class="bg-white/80 backdrop-blur-sm shadow-xl rounded-xl p-4 sm:p-6 border border-pink-100">
          <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center">
            <VIcon name="md-photo-camera" class="text-lg sm:text-xl mr-2 text-pink-500" />
           Profil 
          </h2>

          <div
            class="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <div 
              class="relative cursor-pointer group"
              @click="triggerFileUpload"
              @dragover.prevent="onDragOver"
              @dragleave.prevent="onDragLeave"
              @drop.prevent="onDrop"
              :class="{ 'ring-2 ring-pink-500 ring-opacity-50': isDragOver }"
            >
              <img
                :src="user?.avatar_url || getDefaultAvatar()"
                :alt="user?.name"
                class="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-gradient-to-r from-pink-400 to-purple-500 shadow-lg transition-all duration-200"
                :class="{ 'opacity-50': uploadingAvatar, 'group-hover:opacity-75': !uploadingAvatar }"
              />
              
              <!-- Upload overlay when uploading -->
              <div v-if="uploadingAvatar" class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-full">
                <svg class="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              
              <!-- Hover overlay -->
              <div v-else class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 rounded-full transition-all duration-200">
                <VIcon name="md-photo-camera" class="text-white opacity-0 group-hover:opacity-100 transition-all duration-200" />
              </div>
              
              <button
                @click.stop="triggerFileUpload"
                class="absolute bottom-0 right-0 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full p-2 hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-lg"
                :disabled="uploadingAvatar"
                :class="{ 'opacity-50 cursor-not-allowed': uploadingAvatar }"
              >
                <VIcon v-if="!uploadingAvatar" name="md-edit" class="text-sm" />
                <svg v-else class="animate-spin w-4 h-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </button>
            </div>

            <div class="flex-1 flex flex-col space-y-2">
              <h3 class="text-sm sm:text-base font-medium text-gray-900">{{ user?.name }}</h3>
              <p class="text-xs sm:text-sm text-gray-500">{{ user?.email }}</p>
              <p class="text-xs text-gray-400 mt-1">
                Klik atau seret foto untuk mengubah profil
              </p>
              <p class="text-xs text-gray-400">
                Format: JPG, PNG, GIF, WebP (maks. 2MB)
              </p>
            </div>
          </div>

          <input ref="fileInput" type="file" accept="image/*" @change="handleAvatarUpload" class="hidden" />
        </div>

        <!-- Profile Information Section -->
        <div class="bg-white/80 backdrop-blur-sm shadow-xl rounded-xl p-4 sm:p-6 border border-pink-100">
          <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
            <VIcon name="gi-butterfly" class="text-lg sm:text-xl mr-2 text-pink-500" />
            Informasi Profil
          </h2>

          <form @submit.prevent="updateProfile" class="space-y-4 sm:space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <input id="name" v-model="profileForm.name" type="text" required
                  class="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Masukkan nama lengkap Anda" />
                <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name[0] }}</p>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  Alamat Email
                </label>
                <input id="email" v-model="profileForm.email" type="email" required
                  class="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Masukkan alamat email Anda" />
                <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email[0] }}</p>
              </div>
            </div>

            <div class="flex justify-end">
              <button type="submit" :disabled="profileLoading"
                class="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 text-sm sm:text-base">
                <span v-if="profileLoading" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                  Memperbarui...
                </span>
                <span v-else>Perbarui Profil</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Change Password Section -->
        <div class="bg-white/80 backdrop-blur-sm shadow-xl rounded-xl p-4 sm:p-6 border border-purple-100">
          <h2 class="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
            <VIcon name="md-lock" class="text-lg sm:text-xl mr-2 text-purple-500" />
            Ubah Kata Sandi
          </h2>

          <form @submit.prevent="updatePassword" class="space-y-4 sm:space-y-6">
            <div>
              <label for="current_password" class="block text-sm font-medium text-gray-700 mb-2">
                Kata Sandi Saat Ini
              </label>
              <input id="current_password" v-model="passwordForm.current_password" type="password" required
                class="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Masukkan kata sandi saat ini" />
              <p v-if="errors.current_password" class="text-red-500 text-xs mt-1">
                {{ errors.current_password[0] }}
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                  Kata Sandi Baru
                </label>
                <input id="password" v-model="passwordForm.password" type="password" required
                  class="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Masukkan kata sandi baru" />
                <p v-if="errors.password" class="text-red-500 text-xs mt-1">
                  {{ errors.password[0] }}
                </p>
              </div>

              <div>
                <label for="password_confirmation" class="block text-sm font-medium text-gray-700 mb-2">
                  Konfirmasi Kata Sandi Baru
                </label>
                <input id="password_confirmation" v-model="passwordForm.password_confirmation" type="password" required
                  class="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base"
                  placeholder="Konfirmasi kata sandi baru" />
              </div>
            </div>

            <div class="flex justify-end">
              <button type="submit" :disabled="passwordLoading"
                class="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 text-sm sm:text-base">
                <span v-if="passwordLoading" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                  Memperbarui...
                </span>
                <span v-else>Perbarui Kata Sandi</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Danger Zone -->
        <div class="bg-red-50 border border-red-200 shadow-xl rounded-xl p-4 sm:p-6">
          <h2 class="text-base sm:text-lg font-bold text-red-900 mb-3 sm:mb-4 flex items-center">
            <VIcon name="md-warning" class="text-lg sm:text-xl mr-2 text-red-600" />
            Zona Berbahaya
          </h2>

          <div class="bg-white rounded-xl p-3 sm:p-4 border border-red-200">
            <h3 class="text-sm font-medium text-red-900 mb-2">Hapus Akun</h3>
            <p class="text-xs sm:text-sm text-red-700 mb-4">
              Setelah akun Anda dihapus, semua sumber daya dan data akan dihapus secara permanen.
              Sebelum menghapus akun Anda, harap unduh data atau informasi apa pun yang ingin Anda
              simpan.
            </p>

            <button @click="showDeleteModal = true"
              class="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-xl transition-all duration-200 text-sm sm:text-base">
              Hapus Akun
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Delete Account Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 px-4">
      <div
        class="relative top-10 sm:top-20 mx-auto p-4 sm:p-5 border w-full max-w-lg shadow-lg rounded-xl bg-white/90 backdrop-blur-sm">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-base sm:text-lg font-medium text-red-900">Hapus Akun</h3>
            <button @click="showDeleteModal = false" class="text-gray-400 hover:text-gray-600 p-1">
              <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div class="space-y-4">
            <p class="text-sm text-gray-700">
              Tindakan ini <strong>tidak dapat dibatalkan</strong>. Harap konfirmasi dengan
              memasukkan kata sandi Anda dan mengetik "HAPUS_AKUN_SAYA" di bawah ini.
            </p>

            <div>
              <label for="delete_password" class="block text-sm font-medium text-gray-700 mb-2">
                Kata Sandi
              </label>
              <input id="delete_password" v-model="deleteForm.password" type="password" required
                class="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
                placeholder="Masukkan kata sandi Anda" />
            </div>

            <div>
              <label for="delete_confirmation" class="block text-sm font-medium text-gray-700 mb-2">
                Ketik "HAPUS_AKUN_SAYA" untuk konfirmasi
              </label>
              <input id="delete_confirmation" v-model="deleteForm.confirmation" type="text" required
                class="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
                placeholder="HAPUS_AKUN_SAYA" />
            </div>

            <div class="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <button @click="showDeleteModal = false"
                class="bg-gray-300 hover:bg-gray-400 text-gray-700 font-medium py-2 px-4 rounded-xl transition-all duration-200 text-sm sm:text-base order-2 sm:order-1">
                Batal
              </button>

              <button @click="deleteAccount" :disabled="deleteLoading || deleteForm.confirmation !== 'HAPUS_AKUN_SAYA'"
                class="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 text-sm sm:text-base order-1 sm:order-2">
                <span v-if="deleteLoading" class="flex items-center">
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                    </path>
                  </svg>
                  Menghapus...
                </span>
                <span v-else>Hapus Akun</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Success/Error Messages -->
    <div v-if="message"
      class="fixed top-4 right-4 z-50 max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-lg">
      <div class="p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg v-if="message.type === 'success'" class="h-5 w-5 text-green-400" fill="none" stroke="currentColor"
              viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <svg v-else class="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </div>
          <div class="ml-3 w-0 flex-1">
            <p :class="`text-sm font-medium ${message.type === 'success' ? 'text-green-800' : 'text-red-800'}`">
              {{ message.text }}
            </p>
          </div>
          <div class="ml-4 flex-shrink-0 flex">
            <button @click="message = null" class="text-gray-400 hover:text-gray-600">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { userService } from '@/services/user'
import type { UserProfile } from '@/types'

const router = useRouter()
const authStore = useAuthStore()

// State
const user = ref<UserProfile | null>(null)
const profileLoading = ref(false)
const passwordLoading = ref(false)
const deleteLoading = ref(false)
const uploadingAvatar = ref(false)
const isDragOver = ref(false)
const showDeleteModal = ref(false)
const fileInput = ref<HTMLInputElement>()
const message = ref<{ type: 'success' | 'error'; text: string } | null>(null)
const errors = ref<Record<string, string[]>>({})

// Forms
const profileForm = ref({
  name: '',
  email: '',
})

const passwordForm = ref({
  current_password: '',
  password: '',
  password_confirmation: '',
})

const deleteForm = ref({
  password: '',
  confirmation: '',
})

// Methods
const getCurrentUser = async () => {
  try {
    const response = await userService.getCurrentUser()
    user.value = response
    profileForm.value.name = response.name
    profileForm.value.email = response.email
  } catch (error: any) {
    console.error('Failed to fetch user:', error)
    showMessage('error', error.response?.data?.message || 'Failed to fetch user data')
  }
}

const showMessage = (type: 'success' | 'error', text: string) => {
  message.value = { type, text }
  setTimeout(() => {
    message.value = null
  }, 5000)
}

const getDefaultAvatar = () => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(user.value?.name || 'User')}&color=7F9CF5&background=EBF4FF`
}

const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleAvatarUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  console.log('🖼️ Avatar upload started:', { file, hasFile: !!file })

  if (!file) {
    console.warn('❌ No file selected')
    return
  }

  console.log('📁 File details:', {
    name: file.name,
    size: file.size,
    type: file.type,
    lastModified: file.lastModified
  })

  // File validation
  const maxSize = 2 * 1024 * 1024 // 2MB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']

  if (file.size > maxSize) {
    showMessage('error', 'Ukuran file terlalu besar. Maksimal 2MB.')
    target.value = '' // Reset input
    return
  }

  if (!allowedTypes.includes(file.type)) {
    showMessage('error', 'Format file tidak didukung. Gunakan JPG, PNG, GIF, atau WebP.')
    target.value = '' // Reset input
    return
  }

  // Create preview
  const reader = new FileReader()
  reader.onload = (e) => {
    if (user.value && e.target?.result) {
      // Temporarily show preview
      ;(user.value as any).avatar_url = e.target.result as string
    }
  }
  reader.readAsDataURL(file)

  try {
    uploadingAvatar.value = true
    console.log('📤 Starting upload to backend...')
    
    const response = await userService.updateAvatar(file)
    console.log('✅ Upload successful:', response)
    
    user.value = response
    authStore.user = {
      ...response,
      updated_at: response.updated_at ?? '',
    }
    
    showMessage('success', 'Foto profil berhasil diperbarui!')
    
    // Reset the input to allow selecting the same file again if needed
    target.value = ''
  } catch (error: any) {
    console.error('❌ Avatar upload error:', error)
    showMessage('error', error.response?.data?.message || 'Gagal memperbarui foto profil')
    target.value = '' // Reset input on error
    
    // Revert to original avatar on error
    await getCurrentUser()
  } finally {
    uploadingAvatar.value = false
  }
}

// Drag and drop handlers
const onDragOver = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = true
}

const onDragLeave = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
}

const onDrop = (event: DragEvent) => {
  event.preventDefault()
  isDragOver.value = false
  
  const files = event.dataTransfer?.files
  if (files && files.length > 0) {
    const file = files[0]
    console.log('🎯 File dropped:', { file, name: file.name, type: file.type })
    
    // Create a mock event to reuse handleAvatarUpload logic
    const mockEvent = {
      target: {
        files: [file],
        value: ''
      }
    } as any
    handleAvatarUpload(mockEvent)
  }
}

const updateProfile = async () => {
  try {
    profileLoading.value = true
    errors.value = {}

    const response = await userService.updateProfile(profileForm.value)
    user.value = response
    authStore.user = {
      ...response,
      updated_at: response.updated_at ?? '',
    }
    showMessage('success', 'Profile updated successfully!')
  } catch (error: any) {
    console.error('Profile update error:', error)
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors
    } else {
      showMessage('error', error.response?.data?.message || 'Failed to update profile')
    }
  } finally {
    profileLoading.value = false
  }
}

const updatePassword = async () => {
  try {
    passwordLoading.value = true
    errors.value = {}

    await userService.updateProfile(passwordForm.value)
    passwordForm.value = {
      current_password: '',
      password: '',
      password_confirmation: '',
    }
    showMessage('success', 'Password updated successfully!')
  } catch (error: any) {
    console.error('Password update error:', error)
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors
    } else {
      showMessage('error', error.response?.data?.message || 'Failed to update password')
    }
  } finally {
    passwordLoading.value = false
  }
}

const deleteAccount = async () => {
  try {
    deleteLoading.value = true

    await userService.deleteAccount(deleteForm.value)

    // Logout and redirect
    await authStore.logout()
    router.push('/auth')
    showMessage('success', 'Account deleted successfully')
  } catch (error: any) {
    console.error('Account deletion error:', error)
    showMessage('error', error.response?.data?.message || 'Failed to delete account')
  } finally {
    deleteLoading.value = false
    showDeleteModal.value = false
  }
}

onMounted(() => {
  getCurrentUser()
})
</script>
