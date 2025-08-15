<template>
  <div class="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100">
    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-sm shadow-lg border-b border-pink-200/50 px-3 sm:px-6 py-3 sm:py-4">
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
          <div
            class="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
            <svg class="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
              </path>
            </svg>
          </div>
          <div class="min-w-0">
            <h1
              class="text-lg sm:text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent truncate">
              <span>Dashboard</span>
            </h1>
          </div>
        </div>
        <div class="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
          <div
            class="hidden sm:flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg">
            <div
              class="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
              <span class="text-white text-xs sm:text-sm font-medium">{{
                authStore.user?.name?.charAt(0).toUpperCase()
                }}</span>
            </div>
            <span class="text-sm font-medium text-gray-700 hidden lg:inline">{{
              authStore.user?.name
              }}</span>
          </div>
          <button @click="$router.push('/profile')"
            class="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-purple-700 bg-white/70 border border-purple-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200">
            <span class="hidden sm:inline">Profil</span>
            <span class="sm:hidden">👤</span>
          </button>
          <button @click="$router.push('/')"
            class="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white/70 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200">
            <span class="hidden sm:inline">Kembali ke Chat</span>
            <span class="sm:hidden">💬</span>
          </button>
          <button @click="handleLogout"
            class="px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-red-500 to-pink-600 rounded-lg hover:from-red-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200 shadow-lg">
            <span class="hidden sm:inline">Keluar</span>
            <span class="sm:hidden">🚪</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div class="py-2 sm:py-6">
        <!-- Welcome Message -->
        <div class="mb-6 sm:mb-8 text-center">
          <div
            class="inline-flex items-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-full border border-pink-200/50">
            <svg class="w-4 h-4 sm:w-5 sm:h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd">
              </path>
            </svg>
            <span class="text-xs sm:text-sm font-medium text-gray-700">Selamat datang kembali, cantik! ✨</span>
          </div>
        </div>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <!-- Total Messages Card -->
          <div
            class="group relative bg-white/70 backdrop-blur-sm overflow-hidden shadow-xl rounded-2xl border border-pink-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div class="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5"></div>
            <div class="relative p-4 sm:p-6">
              <div class="flex items-center justify-between">
                <div class="flex-shrink-0">
                  <div
                    class="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg class="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z">
                      </path>
                    </svg>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-gray-500 mb-1">Percakapan Kecantikan</p>
                  <p
                    class="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    {{ statsStore.stats?.total_messages || 0 }}
                  </p>
                  <p class="text-xs text-gray-400 mt-1">Total pesan</p>
                </div>
              </div>
              <div class="mt-4 flex items-center text-sm text-pink-600">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                    clip-rule="evenodd"></path>
                </svg>
                Membantu Anda bersinar ✨
              </div>
            </div>
          </div>

          <!-- Total Sessions Card -->
          <div
            class="group relative bg-white/70 backdrop-blur-sm overflow-hidden shadow-xl rounded-2xl border border-purple-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div class="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5"></div>
            <div class="relative p-6">
              <div class="flex items-center justify-between">
                <div class="flex-shrink-0">
                  <div
                    class="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                      </path>
                    </svg>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-gray-500 mb-1">Sesi Kecantikan</p>
                  <p
                    class="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    {{ statsStore.stats?.total_sessions || 0 }}
                  </p>
                  <p class="text-xs text-gray-400 mt-1">Sesi konsultasi</p>
                </div>
              </div>
              <div class="mt-4 flex items-center text-sm text-purple-600">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Saran yang dipersonalisasi 💄
              </div>
            </div>
          </div>

          <!-- Today's Messages Card -->
          <div
            class="group relative bg-white/70 backdrop-blur-sm overflow-hidden shadow-xl rounded-2xl border border-indigo-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div class="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-pink-500/5"></div>
            <div class="relative p-6">
              <div class="flex items-center justify-between">
                <div class="flex-shrink-0">
                  <div
                    class="w-12 h-12 bg-gradient-to-r from-indigo-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-sm font-medium text-gray-500 mb-1">Aktivitas Hari Ini</p>
                  <p
                    class="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                    {{ statsStore.stats?.messages_today || 0 }}
                  </p>
                  <p class="text-xs text-gray-400 mt-1">Pesan hari ini</p>
                </div>
              </div>
              <div class="mt-4 flex items-center text-sm text-indigo-600">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clip-rule="evenodd"></path>
                </svg>
                Tetap bersinar hari ini! 🌟
              </div>
            </div>
          </div>
        </div>

        <!-- Chart -->
        <div class="bg-white/70 backdrop-blur-sm shadow-2xl rounded-2xl border border-pink-200/50 overflow-hidden">
          <div
            class="bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 px-6 py-4 border-b border-pink-200/30">
            <div class="flex items-center justify-between">
              <div>
                <h3
                  class="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Analitik Perjalanan Kecantikan
                </h3>
                <p class="text-sm text-gray-500 mt-1">
                  Lacak aktivitas konsultasi Anda dari waktu ke waktu
                </p>
              </div>
              <div class="flex items-center space-x-2">
                <div class="w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
                <div class="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style="animation-delay: 0.2s"></div>
                <div class="w-3 h-3 bg-indigo-400 rounded-full animate-pulse" style="animation-delay: 0.4s"></div>
              </div>
            </div>
          </div>
          <div class="p-6">
            <div class="h-80 relative">
              <canvas ref="chartCanvas" class="w-full h-full"></canvas>
              <div v-if="!statsStore.stats?.usage_by_date?.length"
                class="absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <div
                    class="w-20 h-20 bg-gradient-to-r from-pink-200 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                      </path>
                    </svg>
                  </div>
                  <p class="text-gray-500 font-medium">Mulai perjalanan kecantikan Anda!</p>
                  <p class="text-gray-400 text-sm mt-1">Data konsultasi Anda akan muncul di sini</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useStatsStore } from '../stores/stats'
import { useRouter } from 'vue-router'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const authStore = useAuthStore()
const statsStore = useStatsStore()
const router = useRouter()

const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chart: Chart | null = null

const handleLogout = async () => {
  await authStore.logout()
  router.push('/')
}

const initChart = () => {
  if (!chartCanvas.value || !statsStore.stats?.usage_by_date) return

  const ctx = chartCanvas.value.getContext('2d')
  if (!ctx) return

  // Destroy existing chart if it exists
  if (chart) {
    chart.destroy()
  }

  const data = statsStore.stats.usage_by_date

  // Create gradient for the chart
  const gradient = ctx.createLinearGradient(0, 0, 0, 400)
  gradient.addColorStop(0, 'rgba(236, 72, 153, 0.3)') // Pink
  gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.2)') // Purple
  gradient.addColorStop(1, 'rgba(99, 102, 241, 0.1)') // Indigo

  const borderGradient = ctx.createLinearGradient(0, 0, 0, 400)
  borderGradient.addColorStop(0, 'rgb(236, 72, 153)') // Pink
  borderGradient.addColorStop(0.5, 'rgb(168, 85, 247)') // Purple
  borderGradient.addColorStop(1, 'rgb(99, 102, 241)') // Indigo

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map((item) => new Date(item.date).toLocaleDateString()),
      datasets: [
        {
          label: 'Konsultasi Kecantikan',
          data: data.map((item) => item.count),
          borderColor: borderGradient,
          backgroundColor: gradient,
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: 'rgba(236, 72, 153, 1)',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointHoverBackgroundColor: 'rgba(168, 85, 247, 1)',
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index',
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          titleColor: 'rgb(107, 114, 128)',
          bodyColor: 'rgb(75, 85, 99)',
          borderColor: 'rgba(236, 72, 153, 0.2)',
          borderWidth: 1,
          cornerRadius: 12,
          padding: 12,
          displayColors: false,
          callbacks: {
            title: function (context) {
              return 'Tanggal: ' + context[0].label
            },
            label: function (context) {
              return 'Konsultasi: ' + context.parsed.y + ' ✨'
            },
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
          ticks: {
            color: 'rgb(156, 163, 175)',
            font: {
              size: 12,
              weight: 500,
            },
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(236, 72, 153, 0.1)',
          },
          border: {
            display: false,
          },
          ticks: {
            stepSize: 1,
            color: 'rgb(156, 163, 175)',
            font: {
              size: 12,
              weight: 500,
            },
            callback: function (value) {
              return value + ' ✨'
            },
          },
        },
      },
      elements: {
        line: {
          borderJoinStyle: 'round',
          borderCapStyle: 'round',
        },
      },
    },
  })
}

onMounted(async () => {
  await statsStore.fetchStats()

  nextTick(() => {
    initChart()
  })
})
</script>
