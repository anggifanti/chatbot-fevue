import { 
  createApp 
} from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth'
import './style.css'

// oh-vue-icons configuration
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  // Material Design icons - using correct names
  MdChat,
  MdStar,
  MdPerson,
  MdLock,
  MdDaterange,
  MdPhotocamera,
  MdTrendingup,
  MdSearch,
  MdHourglasstop,
  MdAssessment,
  MdDescription,
  MdCreate,
  MdDashboard,
  MdGroup,
  MdBarchart,
  MdDownload,
  MdPictureaspdf,
  MdTablechart,
  MdFavorite,
  MdThumbup,
  MdClose,
  MdAdd,
  MdRemove,
  MdEdit,
  MdDelete,
  MdVisibility,
  MdVisibilityoff,
  MdHome,
  MdMenu,
  MdMorevert,
  MdMorehoriz,
  MdArrowback,
  MdArrowforward,
  MdArrowupward,
  MdArrowdownward,
  MdExpandmore,
  MdExpandless,
  MdChevronleft,
  MdChevronright,
  MdKeyboardarrowup,
  MdKeyboardarrowdown,
  MdKeyboardarrowleft,
  MdKeyboardarrowright,
  MdSchedule,
  MdEmail,
  MdRefresh,
  MdSettings,
  MdNotifications,
  MdExittoapp,
  MdInsights,
  MdEmojievents,
  // New icons for AdminView
  GiLipstick,
  MdForum,
  MdBrush
} from 'oh-vue-icons/icons'

// Add all icons to the library
addIcons(
  MdChat, MdStar, MdPerson, MdLock, MdDaterange, MdPhotocamera,
  MdTrendingup, MdSearch, MdHourglasstop, MdAssessment,
  MdDescription, MdCreate, MdDashboard, MdGroup, MdBarchart,
  MdDownload, MdPictureaspdf, MdTablechart,
  MdFavorite, MdThumbup, MdClose, MdAdd, MdRemove,
  MdEdit, MdDelete, MdVisibility, MdVisibilityoff, MdHome, MdMenu,
  MdMorevert, MdMorehoriz, MdArrowback, MdArrowforward, MdArrowupward,
  MdArrowdownward, MdExpandmore, MdExpandless, MdChevronleft,
  MdChevronright, MdKeyboardarrowup, MdKeyboardarrowdown,
  MdKeyboardarrowleft, MdKeyboardarrowright, MdSchedule,
  MdEmail, MdRefresh, MdSettings, MdNotifications, MdExittoapp,
  MdInsights, MdEmojievents,
  // New icons for AdminView
  GiLipstick, MdForum, MdBrush
)

const app = createApp(App)
const pinia = createPinia()

// Register the oh-vue-icon component globally
app.component('VIcon', OhVueIcon)

app.use(pinia)

// Initialize auth store and check authentication before mounting
const initApp = async () => {
  const authStore = useAuthStore()

  // Check if user is authenticated if token exists
  if (authStore.token) {
    await authStore.checkAuth()
  }

  app.use(router)
  app.mount('#app')
}

initApp()
