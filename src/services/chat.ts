import { api } from './api'
import type { ChatResponse } from '../types'

export const chatService = {
  async sendMessage(message: string, sessionId?: string): Promise<ChatResponse> {
    const response = await api.post<ChatResponse>('/chat', {
      message,
      session_id: sessionId,
    })
    return response.data
  },

  async getChatHistory(sessionId: string) {
    const response = await api.get(`/chat/history/${sessionId}`)
    return response.data
  },

  async deleteChatSession(sessionId: string) {
    await api.delete(`/chat/session/${sessionId}`)
  },
}
