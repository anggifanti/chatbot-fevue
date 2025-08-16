import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// Request interceptor to add token to requests
api.interceptors.request.use(
  (config) => {
    console.log('🚀 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      baseURL: config.baseURL,
      data: config.data
    })
    
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // Don't set Content-Type for FormData, let the browser handle it
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type']
    }
    
    return config
  },
  (error) => {
    console.error('❌ API Request Error:', error)
    return Promise.reject(error)
  },
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    })
    return response
  },
  (error) => {
    console.error('❌ API Response Error:', {
      status: error.response?.status,
      url: error.config?.url,
      data: error.response?.data,
      message: error.message
    })
    
    // Don't automatically redirect on 401 - let the auth store and router handle it
    if (error.response?.status === 401) {
      // Just clear the token, don't redirect here
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
    }
    return Promise.reject(error)
  },
)

export { api }

class ApiService {
  setAuthToken(token: string) {
    localStorage.setItem('token', token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  clearAuthToken() {
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
  }

  async get<T>(url: string, config?: any) {
    const response = await api.get<T>(url, config)
    return response
  }

  async post<T>(url: string, data?: any) {
    const response = await api.post<T>(url, data)
    return response
  }

  async put<T>(url: string, data?: any) {
    const response = await api.put<T>(url, data)
    return response
  }

  async delete<T>(url: string, config?: any) {
    const response = await api.delete<T>(url, config)
    return response
  }
}

export const apiService = new ApiService()
