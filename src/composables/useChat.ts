import { computed } from 'vue'
import { useChatStore } from '../stores/chat'
import { useAuthStore } from '../stores/auth'

export function useChat() {
  const chatStore = useChatStore()
  const authStore = useAuthStore()

  const canSendMessage = computed(() => {
    return chatStore.canSendMessage && !chatStore.isLoading
  })

  const sendMessage = async (message: string) => {
    if (!canSendMessage.value) return false

    const success = await chatStore.sendMessage(message)

    if (success && !authStore.isAuthenticated && !chatStore.canSendMessage) {
      // Trigger prompt limit modal
      return 'LIMIT_REACHED'
    }

    return success
  }

  const getMessageCount = computed(() => {
    return chatStore.messages.length
  })

  const getLastMessage = computed(() => {
    return chatStore.messages[chatStore.messages.length - 1]
  })

  return {
    messages: chatStore.messages,
    isLoading: chatStore.isLoading,
    canSendMessage,
    remainingPrompts: chatStore.remainingPrompts,
    sendMessage,
    clearChat: chatStore.clearChat,
    getMessageCount,
    getLastMessage,
  }
}
