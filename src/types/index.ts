export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  avatar_url?: string
  is_admin?: boolean
  is_premium?: boolean
  email_verified_at?: string
  created_at: string
  updated_at: string
  conversations_count?: number
}

export interface AuthUser extends User {
  token: string
}

export interface AuthResponse {
  success?: boolean
  message?: string
  token: string
  user: User
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export interface UpdateProfileData {
  name?: string
  email?: string
  password?: string
  password_confirmation?: string
}

export interface Message {
  id: string
  content: string
  sender: 'user' | 'bot'
  role?: 'user' | 'assistant' // For compatibility
  timestamp: Date
  conversation_id?: number
  user_id?: number
  session_id?: string
}

export interface Conversation {
  id: number
  title: string
  created_at: string
  updated_at: string
  messages_count?: number
  user_id: number
}

export interface ChatResponse {
  success: boolean
  message?: string
  data?: {
    response: string
    conversation_id?: number
  }
}

export interface RatingData {
  rating: number
  feedback?: string
  session_id?: string
}

export interface Rating {
  id: number
  rating: number
  feedback?: string
  submitted_at: string
  user?: User
}

export interface RatingStats {
  average_rating: number
  total_ratings: number
  ratings_with_feedback: number
  distribution: Record<number, number>
  stats?: RatingStats // For nested response structure
}

export interface RatingFilters {
  rating?: number
  with_feedback?: boolean
  page?: number
  per_page?: number
}

export interface UserStats {
  total_conversations: number
  total_messages: number
  total_sessions?: number
  messages_today?: number
  average_rating?: number
  joined_date: string
  usage_by_date?: Array<{
    date: string
    count: number
  }>
}

export interface DashboardStats {
  total_conversations: number
  total_messages: number
  total_users: number
  total_ratings: number
}

export interface SystemStats {
  total_users: number
  total_conversations: number
  total_messages: number
  average_rating: number
}

export interface UserRating {
  id: number
  rating: number
  feedback?: string
  user: User
  created_at: string
}

export interface MonthlyStats {
  month: string
  conversations: number
  messages: number
  new_users: number
}

export interface UserProfile {
  id: number
  name: string
  email: string
  avatar?: string
  created_at: string
  updated_at: string
}

export interface PaginationMeta {
  current_page: number
  from: number
  last_page: number
  per_page: number
  to: number
  total: number
}

export interface ApiResponse<T = any> {
  success: boolean
  message?: string
  data?: T
  ratings?: {
    data: T[]
    meta?: PaginationMeta
  }
  stats?: T
  user?: User
}