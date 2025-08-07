import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { api } from '../services/api'
import type { Message, ChatResponse } from '../types'
import { useAuthStore } from './auth'

export const useChatStore = defineStore('chat', () => {
  const messages = ref<Message[]>([])
  const currentSession = ref<string | null>(null)
  const isLoading = ref(false)
  const guestPromptCount = ref(0)
  const maxGuestPrompts = ref(2)

  const authStore = useAuthStore()

  const canSendMessage = computed(() => {
    if (authStore.isAuthenticated) return true
    return guestPromptCount.value < maxGuestPrompts.value
  })

  const remainingPrompts = computed(() => {
    if (authStore.isAuthenticated) return null
    return maxGuestPrompts.value - guestPromptCount.value
  })

  const sendMessage = async (content: string) => {
    if (!canSendMessage.value) return false

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    }

    messages.value.push(userMessage)
    isLoading.value = true

    try {
      let response: any

      if (authStore.isAuthenticated) {
        // Authenticated user - use regular chat endpoint
        const payload: any = {
          message: content,
        }

        if (currentSession.value) {
          payload.conversation_id = currentSession.value
        }

        response = await api.post<ChatResponse>('/chat/send', payload)
      } else {
        // Guest user - use guest chat endpoint
        const payload: any = {
          message: content,
        }

        if (currentSession.value) {
          payload.session_id = currentSession.value
        }

        response = await api.post<ChatResponse>('/chat/guest', payload)
      }

      // Check if the response was successful
      if (!response.data.success) {
        if (response.data.limit_reached) {
          // Guest limit reached
          throw new Error(
            'You have reached the limit of 3 free messages. Please register to continue chatting.',
          )
        }
        throw new Error(response.data.message || 'Failed to send message')
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.data.response, // Backend returns 'response' field
        role: 'assistant',
        timestamp: new Date(),
      }

      messages.value.push(aiMessage)

      if (authStore.isAuthenticated && response.data.conversation_id) {
        currentSession.value = response.data.conversation_id.toString()
      } else if (!authStore.isAuthenticated && response.data.session_id) {
        currentSession.value = response.data.session_id
      }

      // Increment guest prompt count if not authenticated
      if (!authStore.isAuthenticated) {
        guestPromptCount.value++
      }

      return true
    } catch (error) {
      console.error('Failed to send message:', error)
      // Remove the user message if sending failed
      messages.value.pop()
      throw error // Re-throw so the component can handle it
    } finally {
      isLoading.value = false
    }
  }

  const clearChat = () => {
    messages.value = []
    currentSession.value = null
  }

  const resetGuestCount = () => {
    guestPromptCount.value = 0
  }

  return {
    messages,
    currentSession,
    isLoading,
    guestPromptCount,
    maxGuestPrompts,
    canSendMessage,
    remainingPrompts,
    sendMessage,
    clearChat,
    resetGuestCount,
  }
})
