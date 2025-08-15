<template>
  <div class="flex h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
    <!-- Conversation Sidebar -->
    <div v-if="authStore.isAuthenticated && sidebarOpen"
      class="w-full sm:w-80 bg-white/80 backdrop-blur-md border-r border-pink-200/50 flex flex-col absolute sm:relative top-0 left-0 h-full z-20 transform transition-all duration-300 shadow-xl"
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'">
      <!-- Sidebar Header -->
      <div class="p-4 border-b border-pink-200/50 bg-gradient-to-r from-pink-100/50 to-purple-100/50">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            💄 Percakapan Kecantikan
          </h2>
          <div class="flex items-center space-x-2">
            <button @click="startNewConversation"
              class="p-2 text-pink-400 hover:text-pink-600 hover:bg-pink-100/50 rounded-lg transition-all duration-200 hover:scale-105"
              title="Konsultasi Baru">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </button>
            <button @click="sidebarOpen = false"
              class="sm:hidden p-2 text-pink-400 hover:text-pink-600 hover:bg-pink-100/50 rounded-lg transition-all duration-200"
              title="Tutup Sidebar">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Conversation List -->
      <div class="flex-1 overflow-y-auto">
        <div v-if="conversationsLoading" class="p-4">
          <div class="animate-pulse space-y-3">
            <div v-for="i in 5" :key="i" class="h-16 bg-gradient-to-r from-pink-200/50 to-purple-200/50 rounded-lg">
            </div>
          </div>
        </div>
        <div v-else-if="conversations.length === 0" class="p-4 text-center">
          <div class="text-pink-400 text-4xl mb-2">✨</div>
          <div class="text-gray-500">Belum ada percakapan</div>
          <div class="text-xs text-gray-400 mt-1">Mulai konsultasi kecantikan pertama Anda!</div>
        </div>
        <div v-else class="p-2 space-y-1">
          <div v-for="conversation in conversations" :key="conversation.id" @click="loadConversation(conversation.id)"
            :class="[
              'group p-3 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.02]',
              chatStore.currentSession === conversation.id.toString()
                ? 'bg-gradient-to-r from-pink-100 to-purple-100 border border-pink-300/50 shadow-md'
                : 'hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:shadow-sm',
            ]">
            <div class="flex justify-between items-start">
              <div class="flex-1 min-w-0">
                <h3 class="text-sm font-medium text-gray-900 truncate flex items-center">
                  <span class="text-pink-400 mr-2">💬</span>
                  {{ conversation.title }}
                </h3>
                <p v-if="conversation.messages && conversation.messages[0]" class="text-xs text-gray-500 mt-1 truncate">
                  {{ conversation.messages[0].content }}
                </p>
                <p class="text-xs text-pink-400 mt-1 flex items-center">
                  <span class="mr-1">⏰</span>
                  {{ formatConversationDate(conversation.updated_at) }}
                </p>
              </div>
              <button @click.stop="deleteConversation(conversation.id)"
                class="ml-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 012 0v4a1 1 0 11-2 0V9zm4 0a1 1 0 012 0v4a1 1 0 11-2 0V9z"
                    clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Chat Area -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-white/90 backdrop-blur-md shadow-lg border-b border-pink-200/50 px-3 sm:px-6 py-3 sm:py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
            <button v-if="authStore.isAuthenticated" @click="sidebarOpen = !sidebarOpen"
              class="sm:hidden p-2 text-pink-400 hover:text-pink-600 hover:bg-pink-100/50 rounded-lg transition-all duration-200"
              title="Toggle Conversations">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16">
                </path>
              </svg>
            </button>
            <div class="flex items-center space-x-2 sm:space-x-3 min-w-0">
              <div
                class="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-pink-400 via-purple-600 to-slate-400 rounded-full flex items-center justify-center flex-shrink-0">
                <span class="text-white text-sm sm:text-lg">✨</span>
              </div>
              <h1
                class="text-lg sm:text-2xl font-bold bg-gradient-to-r from-pink-600 via-slate-400 to-blue-500 bg-clip-text text-transparent truncate">
                <span class="hidden sm:inline">GlowGla Beauty</span>
              </h1>
            </div>
            <div v-if="!authStore.isAuthenticated"
              class="hidden sm:flex px-3 py-1 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex-shrink-0">
              <span class="text-xs sm:text-sm font-medium text-pink-700">
                💎 {{ chatStore.remainingPrompts }} konsultasi gratis tersisa
              </span>
            </div>
          </div>
          <div class="flex items-center space-x-1 sm:space-x-3 flex-shrink-0">
            <button v-if="authStore.isAuthenticated && authStore.user && authStore.user.is_admin"
              @click="$router.push('/admin')"
              class="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 hover:scale-105 shadow-md">
              <span class="hidden sm:inline">👑 Admin</span>
              <span class="sm:hidden">👑</span>
            </button>
            <button v-if="authStore.isAuthenticated" @click="$router.push('/dashboard')"
              class="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-sm border border-pink-200 rounded-lg hover:bg-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-200 hover:scale-105 shadow-sm">
              <span class="hidden sm:inline">📊 Dashboard</span>
              <span class="sm:hidden">📊</span>
            </button>
            <button v-if="authStore.isAuthenticated" @click="router.push('/profile')"
              class="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-lg hover:bg-purple-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 hover:scale-105 shadow-sm">
              <span class="hidden sm:inline">👤 Profil</span>
              <span class="sm:hidden">👤</span>
            </button>
            <button v-if="authStore.isAuthenticated" @click="handleLogout"
              class="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-red-400 to-pink-500 rounded-lg hover:from-red-500 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 hover:scale-105 shadow-md">
              <span class="hidden sm:inline">🚪 Keluar</span>
              <span class="sm:hidden">🚪</span>
            </button>
            <button v-else @click="$router.push('/auth')"
              class="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:scale-105 shadow-md">
              <span class="hidden sm:inline">🔐 Masuk</span>
              <span class="sm:hidden">🔐</span>
            </button>
          </div>
        </div>
        <!-- Mobile guest prompt counter -->
        <div v-if="!authStore.isAuthenticated" class="sm:hidden mt-2 text-center">
          <div class="inline-flex px-3 py-1 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full">
            <span class="text-xs font-medium text-pink-700">
              💎 {{ chatStore.remainingPrompts }} konsultasi gratis tersisa
            </span>
          </div>
        </div>
      </header>

      <!-- Chat Messages -->
      <div class="flex justify-center items-center flex-1 overflow-y-auto p-3 sm:p-6">
        <div class="max-w-4xl mx-auto space-y-4">
          <!-- Welcome Message -->
          <div v-if="chatStore.messages.length === 0" class="text-center py-4 sm:py-8">
            <div class="mb-4 sm:mb-6">
              <div
                class="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-br from-pink-600 via-slate-50 to-blue-500 rounded-full flex items-center justify-center mb-3 sm:mb-4 animate-pulse">
                <span class="text-white text-2xl sm:text-3xl">💄</span>
              </div>
              <div
                class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-600 to-slate-300 bg-clip-text text-transparent mb-2 px-4">
                Selamat datang di GlowGla Beauty ✨
              </div>

              <div v-if="!authStore.isAuthenticated"
                class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full mx-4">
                <span class="text-xs sm:text-sm font-medium text-pink-700">
                  💎 Anda memiliki {{ chatStore.remainingPrompts }} konsultasi kecantikan gratis
                  tersisa
                </span>
              </div>
            </div>
          </div>

          <!-- Messages -->
          <div
            v-for="message in chatStore.messages"
            :key="message.id"
            :class="['flex', message.sender === 'user' ? 'justify-end' : 'justify-start']"
          >
            <div
              :class="[
                'max-w-[85%] sm:max-w-2xl px-3 sm:px-4 py-2 sm:py-3 rounded-2xl shadow-md transition-all duration-200 hover:shadow-lg',
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-slate-500 to-purple-600 text-white ml-4 sm:ml-8'
                  : 'bg-white/90 backdrop-blur-sm text-gray-900 border border-pink-200/50 mr-4 sm:mr-8',
              ]"
            >
              <div
                v-html="formatMessage(message.content)"
                :class="[
                  'formatted-message text-sm sm:text-base',
                  message.sender === 'user' ? 'text-white' : 'text-gray-900',
                ]"
              ></div>
              <div
                :class="[
                  'text-xs mt-1 sm:mt-2 flex items-center justify-between',
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500',
                ]"
              >
                <div class="flex items-center">
                  <span class="mr-1">⏰</span>
                  {{ formatTime(message.timestamp) }}
                </div>
                
                <!-- Rating button for AI messages (only for authenticated users) -->
                <div v-if="message.sender === 'bot' && authStore.isAuthenticated" class="ml-2">
                  <RatingButton
                    variant="ghost"
                    :session-id="getSessionId()"
                    text="Rate"
                    @rated="handleMessageRated"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Loading Message -->
          <div v-if="chatStore.isLoading" class="flex justify-start">
            <div
              class="max-w-[85%] sm:max-w-2xl px-3 sm:px-4 py-2 sm:py-3 bg-white/90 backdrop-blur-sm border border-pink-200/50 rounded-2xl shadow-md mr-4 sm:mr-8">
              <div class="flex items-center space-x-2 sm:space-x-3">
                <div class="flex space-x-1">
                  <div class="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-bounce"></div>
                  <div class="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-bounce"
                    style="animation-delay: 0.1s"></div>
                  <div class="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-bounce"
                    style="animation-delay: 0.2s"></div>
                </div>
                <span class="text-gray-600 font-medium text-sm sm:text-base">Sebentar ya cantik, GlowGla lagi bongkar
                  makeup kit rahasia dulu 👜</span>
                <div class="text-pink-400">🤔</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="bg-white/90 backdrop-blur-md border-t border-pink-200/50 p-3 sm:p-6 shadow-lg">
        <div class="max-w-4xl mx-auto">
          <!-- Error Message -->
          <div v-if="error"
            class="mb-3 sm:mb-4 p-3 sm:p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl shadow-sm">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mr-2 sm:mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clip-rule="evenodd"></path>
                </svg>
              </div>
              <div class="flex-1">
                <span class="text-red-700 text-xs sm:text-sm font-medium">{{ error }}</span>
              </div>
              <button @click="error = ''" class="ml-2 sm:ml-4 text-red-400 hover:text-red-600 transition-colors">
                <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>

          <div class="flex space-x-2 sm:space-x-4">
            <div class="flex-1 relative">
              <textarea v-model="currentMessage" @keydown.enter.prevent="handleSendMessage" @input="error = ''"
                :disabled="!chatStore.canSendMessage || chatStore.isLoading" :placeholder="getPlaceholder()"
                class="w-full p-3 sm:p-4 pr-8 sm:pr-12 border-2 border-pink-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent resize-none bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-200 hover:shadow-md text-sm sm:text-base"
                :rows="2"></textarea>
              <!-- Character count or status indicator -->
              <div class="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 text-xs text-gray-400">
                <span v-if="currentMessage.length > 0">{{ currentMessage.length }}</span>
                <span v-else class="text-pink-400">💬</span>
              </div>
            </div>
            <button @click="handleSendMessage" :disabled="!canSend"
              class="px-3 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl hover:from-pink-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 shadow-md disabled:hover:scale-100 flex-shrink-0">
              <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Prompt Limit Modal -->
      <PromptLimitModal
        :show="showPromptLimitModal"
        @close="showPromptLimitModal = false"
        @sign-up="$router.push('/auth')"
      />
      
      <!-- Floating App Rating Button (only for authenticated users) -->
      <div v-if="authStore.isAuthenticated" class="fixed bottom-6 right-6 z-10">
        <RatingButton
          type="app"
          variant="primary"
          :session-id="getSessionId()"
          text="Rate App"
          @rated="handleAppRated"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { 
  ref, 
  computed, 
  nextTick, 
  onMounted, 
  watch 
} from 'vue'
import { useAuthStore } from '../stores/auth'
import { useChatStore } from '../stores/chat'
import { useRouter } from 'vue-router'
import PromptLimitModal from '../components/PromptLimitModal.vue'
import RatingButton from '../components/RatingButton.vue'
import { api } from '../services/api'

const authStore = useAuthStore()
const chatStore = useChatStore()
const router = useRouter()

const currentMessage = ref('')
const showPromptLimitModal = ref(false)
const error = ref('')
const conversations = ref<any[]>([])
const conversationsLoading = ref(false)
const sidebarOpen = ref(true)

const canSend = computed(() => {
  return currentMessage.value.trim() && chatStore.canSendMessage && !chatStore.isLoading
})

const getPlaceholder = () => {
  if (!chatStore.canSendMessage) {
    return 'Daftar untuk melanjutkan konsultasi kecantikan Anda...'
  }
  return 'Tanya tentang makeup, perawatan kulit, perawatan kecantikan...'
}

const formatTime = (timestamp: Date) => {
  return new Date(timestamp).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

const formatMessage = (content: string) => {
  // Escape HTML first to prevent XSS
  const escapeHtml = (text: string) => {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }

  let formatted = escapeHtml(content)

  // Store code blocks temporarily to avoid formatting inside them
  const codeBlocks: string[] = []
  formatted = formatted.replace(/```([\s\S]*?)```/g, (_, code) => {
    const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`
    codeBlocks.push(`<pre class="code-block"><code>${code}</code></pre>`)
    return placeholder
  })

  // Store inline code temporarily
  const inlineCodes: string[] = []
  formatted = formatted.replace(/`([^`\n]+)`/g, (_, code) => {
    const placeholder = `__INLINE_CODE_${inlineCodes.length}__`
    inlineCodes.push(`<code class="inline-code">${code}</code>`)
    return placeholder
  })

  // Headers (must come before other formatting)
  formatted = formatted.replace(
    /^### (.*)$/gm,
    '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>',
  )
  formatted = formatted.replace(
    /^## (.*)$/gm,
    '<h2 class="text-xl font-semibold mt-4 mb-2">$1</h2>',
  )
  formatted = formatted.replace(/^# (.*)$/gm, '<h1 class="text-2xl font-bold mt-4 mb-2">$1</h1>')

  // Bold: **text** or __text__
  formatted = formatted.replace(/\*\*((?:(?!\*\*).)+)\*\*/g, '<strong>$1</strong>')
  formatted = formatted.replace(/__((?:(?!__).)+)__/g, '<strong>$1</strong>')

  // Italic: *text* or _text_ (but not inside bold)
  formatted = formatted.replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
  formatted = formatted.replace(/\b_([^_\n]+)_\b/g, '<em>$1</em>')

  // Strikethrough: ~~text~~
  formatted = formatted.replace(/~~((?:(?!~~).)+)~~/g, '<del>$1</del>')

  // Blockquotes
  formatted = formatted.replace(
    /^>\s+(.+)$/gm,
    '<blockquote class="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-2">$1</blockquote>',
  )

  // Lists
  // Unordered lists
  formatted = formatted.replace(/^[\s]*[-*+]\s+(.+)$/gm, '<li>$1</li>')
  formatted = formatted.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')

  // Ordered lists
  formatted = formatted.replace(/^[\s]*\d+\.\s+(.+)$/gm, '<li>$1</li>')
  // Note: This is a simplified list handling - for production, you'd want more sophisticated list parsing

  // Links: [text](url)
  formatted = formatted.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer" class="link">$1</a>',
  )

  // Auto-link URLs
  formatted = formatted.replace(
    /(^|[^"])(https?:\/\/[^\s<]+)/g,
    '$1<a href="$2" target="_blank" rel="noopener noreferrer" class="link">$2</a>',
  )

  // Restore code blocks
  codeBlocks.forEach((code, index) => {
    formatted = formatted.replace(`__CODE_BLOCK_${index}__`, code)
  })

  // Restore inline codes
  inlineCodes.forEach((code, index) => {
    formatted = formatted.replace(`__INLINE_CODE_${index}__`, code)
  })

  // Line breaks (but preserve paragraph breaks)
  formatted = formatted.replace(/\n\n/g, '<br><br>')
  formatted = formatted.replace(/\n/g, '<br>')

  return formatted
}

const handleSendMessage = async () => {
  if (!canSend.value) return

  const message = currentMessage.value.trim()
  if (!message) return

  // Clear any previous errors
  error.value = ''

  // Check if guest user has reached limit
  if (!authStore.isAuthenticated && !chatStore.canSendMessage) {
    showPromptLimitModal.value = true
    return
  }

  currentMessage.value = ''

  try {
    await chatStore.sendMessage(message)

    // Reload conversations to update the list
    if (authStore.isAuthenticated) {
      loadConversations()
    }

    // Check if user should see limit modal after successful message
    if (!authStore.isAuthenticated && !chatStore.canSendMessage) {
      showPromptLimitModal.value = true
    }
  } catch (err: any) {
    // Handle specific guest limit error
    if (err.message && err.message.includes('reached the limit of 3 free messages')) {
      showPromptLimitModal.value = true
    } else {
      error.value = err.response?.data?.message || err.message || 'An unexpected error occurred'
    }
    currentMessage.value = message // Restore the message if there was an error
  }
}

const handleLogout = async () => {
  await authStore.logout()
  chatStore.clearChat()
  chatStore.resetGuestCount()
  router.push('/')
}

// Conversation management functions
const loadConversations = async () => {
  if (!authStore.isAuthenticated) return

  try {
    conversationsLoading.value = true
    const response = await api.get('/conversations')
    conversations.value = response.data.conversations || []
  } catch (error) {
    console.error('Failed to load conversations:', error)
  } finally {
    conversationsLoading.value = false
  }
}

const loadConversation = async (conversationId: number) => {
  try {
    const response = await api.get(`/conversations/${conversationId}`)
    const conversation = response.data.conversation

    // Clear current messages and load conversation messages
    chatStore.clearChat()
    chatStore.currentSession = conversationId.toString()

    // Load messages into chat store
    conversation.messages.forEach((msg: any) => {
      chatStore.messages.push({
        id: msg.id.toString(),
        content: msg.content,
        sender: msg.role === 'user' ? 'user' : 'bot',
        role: msg.role,
        timestamp: new Date(msg.created_at),
      })
    })
  } catch (error) {
    console.error('Failed to load conversation:', error)
  }
}

const startNewConversation = () => {
  chatStore.clearChat()
  chatStore.currentSession = null
}

const deleteConversation = async (conversationId: number) => {
  if (!confirm('Are you sure you want to delete this conversation?')) return

  try {
    await api.delete(`/conversations/${conversationId}`)

    // Remove from local list
  conversations.value = conversations.value.filter((c: { id: number }) => c.id !== conversationId)

    // If this was the current conversation, start a new one
    if (chatStore.currentSession === conversationId.toString()) {
      startNewConversation()
    }
  } catch (error) {
    console.error('Failed to delete conversation:', error)
  }
}

const formatConversationDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

  if (diffInHours < 24) {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  } else if (diffInHours < 48) {
    return 'Yesterday'
  } else {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }
}

// Rating-related methods
const getSessionId = () => {
  if (authStore.isAuthenticated) return undefined
  return chatStore.getGuestSessionId() || undefined
}

const handleMessageRated = () => {
  // Optional: Could show a success message or update UI
}

const handleAppRated = () => {
  // Optional: Could show a success message or update UI
}

onMounted(() => {
  // Focus on input when component mounts
  nextTick(() => {
    const textarea = document.querySelector('textarea')
    if (textarea) {
      textarea.focus()
    }
  })

  // Load conversations if user is authenticated
  if (authStore.isAuthenticated) {
    loadConversations()
  }
})

// Watch for authentication changes
watch(
  () => authStore.isAuthenticated,
  (isAuthenticated: boolean) => {
    if (isAuthenticated) {
      loadConversations()
    } else {
      conversations.value = []
    }
  },
)
</script>

<style scoped>
.formatted-message {
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.6;
}

.formatted-message strong {
  font-weight: 700;
}

.formatted-message em {
  font-style: italic;
}

.formatted-message del {
  text-decoration: line-through;
  opacity: 0.7;
}

.formatted-message h1,
.formatted-message h2,
.formatted-message h3 {
  margin: 12px 0 8px 0;
  line-height: 1.3;
}

.formatted-message h1 {
  font-size: 1.5rem;
  font-weight: 700;
}

.formatted-message h2 {
  font-size: 1.25rem;
  font-weight: 600;
}

.formatted-message h3 {
  font-size: 1.125rem;
  font-weight: 600;
}

.formatted-message ul,
.formatted-message ol {
  margin: 8px 0;
  padding-left: 20px;
}

.formatted-message li {
  margin: 4px 0;
  line-height: 1.5;
}

.formatted-message ul {
  list-style-type: disc;
}

.formatted-message ol {
  list-style-type: decimal;
}

.formatted-message blockquote {
  margin: 12px 0;
  padding-left: 16px;
  border-left: 4px solid #d1d5db;
  font-style: italic;
  color: #6b7280;
}

.formatted-message .inline-code {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.formatted-message .code-block {
  background-color: rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  padding: 12px;
  margin: 12px 0;
  overflow-x: auto;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
  line-height: 1.4;
}

.formatted-message .code-block code {
  background: none;
  padding: 0;
  border: none;
  font-size: inherit;
}

.formatted-message .link {
  color: #3b82f6;
  text-decoration: underline;
  transition: color 0.2s;
}

.formatted-message .link:hover {
  color: #1d4ed8;
}

/* Special styles for user messages (blue background) */
.bg-blue-600 .formatted-message h1,
.bg-blue-600 .formatted-message h2,
.bg-blue-600 .formatted-message h3 {
  color: white;
}

.bg-blue-600 .formatted-message blockquote {
  border-left-color: rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.8);
}

.bg-blue-600 .formatted-message .inline-code {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border-color: rgba(255, 255, 255, 0.2);
}

.bg-blue-600 .formatted-message .code-block {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  color: white;
}

.bg-blue-600 .formatted-message .link {
  color: #93c5fd;
}

.bg-blue-600 .formatted-message .link:hover {
  color: #dbeafe;
}

/* Formatting help styles */
.inline-code {
  background-color: rgba(0, 0, 0, 0.1);
  padding: 2px 4px;
  border-radius: 4px;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 0.9em;
}
</style>
