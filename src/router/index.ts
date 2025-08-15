import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import ChatView from '@/views/ChatView.vue'
import AuthView from '@/views/AuthView.vue'
import DashboardView from '@/views/DashboardView.vue'
import AdminView from '@/views/AdminView.vue'
import ProfileView from '@/views/ProfileView.vue'

const routes = [
  {
    path: '/',
    name: 'chat',
    component: ChatView,
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfileView,
    meta: { requiresAuth: true },
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: { requiresAuth: true, requiresAdmin: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  console.log('🛤️ Router Guard:', {
    to: to.path,
    from: from.path,
    hasToken: !!authStore.token,
    hasUser: !!authStore.user,
    requiresAuth: to.meta.requiresAuth,
    requiresAdmin: to.meta.requiresAdmin
  })

  // If we have a token but no user data, try to fetch it
  if (authStore.token && !authStore.user) {
    console.log('🔄 Checking authentication...')
    try {
      const authSuccess = await authStore.checkAuth()
      console.log('🔐 Auth check result:', authSuccess)
      
      if (!authSuccess) {
        console.log('❌ Auth check failed, clearing state')
        // Auth failed, token was invalid
        if (to.meta.requiresAuth) {
          console.log('🚪 Redirecting to auth page')
          next('/auth')
          return
        }
      }
    } catch (error) {
      console.error('💥 Auth check error:', error)
      // Auth check failed, let the store handle cleanup
      if (to.meta.requiresAuth) {
        next('/auth')
        return
      }
    }
  }

  // Check authentication requirements
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.log('🚫 Access denied - authentication required')
    next('/auth')
    return
  }

  // Check admin requirements
  if (to.meta.requiresAdmin && (!authStore.user || !authStore.user.is_admin)) {
    console.log('🚫 Access denied - admin required')
    next('/chat')
    return
  }

  // If going to auth page but already authenticated, redirect appropriately
  if (to.name === 'auth' && authStore.isAuthenticated) {
    console.log('✅ Already authenticated, redirecting...')
    if (authStore.user?.is_admin) {
      next('/admin')
    } else {
      next('/chat')
    }
    return
  }

  console.log('✅ Navigation allowed')
  next()
})

export default router
