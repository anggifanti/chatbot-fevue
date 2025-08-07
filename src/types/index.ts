export interface User {
  id: number
  name: string
  email: string
  created_at: string
  updated_at: string
  is_premium?: boolean
  is_admin?: boolean
  total_messages?: number
  monthly_message_count?: number
}

export interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

export interface ChatSession {
  id: string
  messages: Message[]
  created_at: Date
}

export interface AuthResponse {
  user: User
  token: string
}

export interface ChatResponse {
  success: boolean
  message: string
  conversation_id: number
  response: string
  ai_message: {
    id: number
    conversation_id: number
    role: string
    content: string
    created_at: string
    updated_at: string
    conversation?: {
      id: number
      user_id: number
      title: string
      status: string
      summary: string | null
      message_count: number
      last_message_at: string
      created_at: string
      updated_at: string
    }
  }
}

export interface UserStats {
  total_messages: number
  total_sessions: number
  messages_today: number
  usage_by_date: Array<{
    date: string
    count: number
  }>
  remaining_messages: number
  message_limit: number
  user_type: string
  monthly_message_count: number
}
