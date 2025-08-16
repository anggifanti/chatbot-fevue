<template>
  <!-- Loading state while auth is being verified -->
  <div v-if="!authStore.user" class="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 flex items-center justify-center">
    <div class="text-center">
      <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-pink-500 mx-auto mb-4"></div>
      <p class="text-gray-600">Memuat dashboard admin...</p>
    </div>
  </div>

  <div v-else class="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
    <!-- Admin Header -->
    <header class="bg-white shadow-lg border-b-2 border-gradient-to-r from-pink-200 to-purple-200">
      <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-3 sm:py-4">
          <div class="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
            <VIcon name="md-dashboard" class="text-2xl sm:text-3xl text-pink-500" />
            <div class="min-w-0">
              <h1
                class="text-lg sm:text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent truncate">
                <span class="hidden sm:inline">Admin GlowGla</span>
                <span class="sm:hidden">Admin GlowGla</span>
              </h1>
            </div>
          </div>
          <div class="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            <div class="hidden sm:flex items-center space-x-2">
              <div
                class="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                <span class="text-white text-xs sm:text-sm font-bold">{{
                  authStore.user?.name?.charAt(0)
                  }}</span>
              </div>
              <span class="text-xs sm:text-sm text-gray-600 hidden lg:inline">Selamat Datang, {{ authStore.user?.name
                }}</span>
            </div>
            <button @click="logout"
              class="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg">
              <span class="hidden sm:inline">Keluar</span>
              <span class="sm:hidden">🚪</span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Admin Navigation -->
    <nav class="bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg overflow-x-auto">
      <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div class="flex space-x-4 sm:space-x-8 min-w-max">
          <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id"
            class="py-3 sm:py-4 px-3 sm:px-6 text-xs sm:text-sm font-medium transition-all duration-200 relative group whitespace-nowrap"
            :class="activeTab === tab.id ? 'text-white' : 'text-gray-300 hover:text-white'">
            <span class="flex items-center space-x-2">
              <VIcon :name="tab.icon" class="text-white text-lg sm:text-2xl" />
              <span>{{ tab.name }}</span>
            </span>
            <div v-if="activeTab === tab.id"
              class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-t-full">
            </div>
            <div v-else
              class="absolute bottom-0 left-0 right-0 h-1 bg-transparent group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-500 rounded-t-full transition-all duration-200">
            </div>
          </button>
        </div>
      </div>
    </nav>

    <!-- Content Area -->
    <main class="max-w-7xl mx-auto py-4 sm:py-6 px-4 sm:px-6 lg:px-8">
      <!-- Dashboard Tab -->
      <div v-if="activeTab === 'dashboard'" class="space-y-4 sm:space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div class="bg-gradient-to-r from-blue-500 to-cyan-600 overflow-hidden shadow-xl rounded-xl">
            <div class="p-4 sm:p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div
                    class="w-10 h-10 sm:w-12 sm:h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center"
                  >
                    <VIcon name="md-group" class="text-white text-lg sm:text-2xl" />
                  </div>
                </div>
                <div class="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-xs sm:text-sm font-medium text-blue-100 truncate">
                      Jumlah Member
                    </dt>
                    <dd class="text-lg sm:text-2xl font-bold text-white">
                      {{ dashboardStats?.total_users || 0 }}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gradient-to-r from-purple-500 to-pink-600 overflow-hidden shadow-xl rounded-xl">
            <div class="p-4 sm:p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div
                    class="w-10 h-10 sm:w-12 sm:h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center"
                  >
                    <VIcon name="md-chat" class="text-white text-lg sm:text-2xl" />
                  </div>
                </div>
                <div class="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-xs sm:text-sm font-medium text-purple-100 truncate">
                      Percakapan
                    </dt>
                    <dd class="text-lg sm:text-2xl font-bold text-white">
                      {{ dashboardStats?.total_conversations || 0 }}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gradient-to-r from-orange-500 to-red-600 overflow-hidden shadow-xl rounded-xl">
            <div class="p-4 sm:p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div
                    class="w-10 h-10 sm:w-12 sm:h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center"
                  >
                    <VIcon name="md-insights" class="text-white text-lg sm:text-2xl" />
                  </div>
                </div>
                <div class="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-xs sm:text-sm font-medium text-orange-100 truncate">
                      Jumlah Pesan 
                    </dt>
                    <dd class="text-lg sm:text-2xl font-bold text-white">
                      {{ dashboardStats?.total_messages || 0 }}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Activity Chart -->
        <div
          class="bg-gradient-to-br from-white via-pink-50 to-purple-50 shadow-2xl rounded-2xl p-4 sm:p-6 border border-pink-100 relative overflow-hidden">
          <!-- Decorative background -->
          <div
            class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-200/20 to-purple-300/20 rounded-full -translate-y-16 translate-x-16">
          </div>
          <div
            class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200/20 to-pink-300/20 rounded-full translate-y-12 -translate-x-12">
          </div>

          <div class="relative z-10">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <h3 class="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-0 flex items-center">
                <div
                  class="bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-xl mr-3 shadow-lg"
                >
                  <VIcon name="md-trendingup" class="text-white text-lg sm:text-xl" />
                </div>
                <div>
                  <div class="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    Aktivitas percakapan
                  </div>
                  <div class="text-xs sm:text-sm text-gray-500 font-normal">7 Hari Terakhir</div>
                </div>
              </h3>
              <div class="flex items-center space-x-2">
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-pink-100 to-purple-100 text-purple-800 border border-pink-200">
                  <span class="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mr-2"></span>
                  Tips Harian
                </span>
              </div>
            </div>

            <!-- Enhanced Activity Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3">
              <div v-for="(day, index) in dashboardStats?.usage_by_date || []" :key="day.date"
                class="text-center group">
                <div class="text-xs text-gray-500 mb-2 font-medium">
                  {{ formatDateShort(day.date) }}
                </div>
                <div
                  class="relative bg-gradient-to-t from-pink-100 via-purple-50 to-white rounded-xl p-3 sm:p-4 hover:from-pink-200 hover:via-purple-100 hover:to-pink-50 transition-all duration-300 shadow-md hover:shadow-xl transform hover:-translate-y-1 border border-pink-100 group-hover:border-pink-300"
                  :style="{
                    animationDelay: index * 100 + 'ms',
                    minHeight: '80px',
                  }">
                  <!-- Activity indicator -->
                  <div class="absolute top-2 right-2">
                    <div v-if="day.messages > 0"
                      class="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-pulse"></div>
                  </div>

                  <!-- Message count with animation -->
                  <div
                    class="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent mb-1 transform group-hover:scale-110 transition-transform duration-200">
                    {{ day.messages }}
                  </div>

                  <!-- Label with icon -->
                  <div class="flex items-center justify-center space-x-1">
                    <VIcon name="gi-lipstick" class="text-xs text-purple-600" />
                    <span class="text-xs text-purple-600 font-medium">tips</span>
                  </div>

                  <!-- Progress bar -->
                  <div class="mt-2 w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                    <div
                      class="bg-gradient-to-r from-pink-400 to-purple-500 h-1.5 rounded-full transition-all duration-700"
                      :style="{
                        width:
                          day.messages > 0
                            ? Math.min(
                              (day.messages /
                                Math.max(
                                  ...(dashboardStats?.usage_by_date?.map(
                                    (d: any) => d.messages,
                                  ) || [1]),
                                )) *
                              100,
                              100,
                            ) + '%'
                            : '0%',
                      }"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Summary Stats -->
            <div class="mt-6 pt-4 border-t border-pink-100">
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div class="bg-white/50 rounded-xl p-3 border border-pink-100">
                  <div class="text-lg font-bold text-purple-900">
                    {{
                      (dashboardStats?.usage_by_date || []).reduce(
                        (sum: number, day: any) => sum + day.messages,
                        0,
                      )
                    }}
                  </div>
                  <div class="text-xs text-gray-600">Total Tips</div>
                </div>
                <div class="bg-white/50 rounded-xl p-3 border border-pink-100">
                  <div class="text-lg font-bold text-purple-900">
                    {{
                      Math.round(
                        (dashboardStats?.usage_by_date || []).reduce(
                          (sum: number, day: any) => sum + day.messages,
                          0,
                        ) / 7,
                      )
                    }}
                  </div>
                  <div class="text-xs text-gray-600">Rata-rata/Hari</div>
                </div>
                <div class="bg-white/50 rounded-xl p-3 border border-pink-100">
                  <div class="text-lg font-bold text-purple-900">
                    {{
                      Math.max(
                        ...(dashboardStats?.usage_by_date?.map((d: any) => d.messages) || [0]),
                      )
                    }}
                  </div>
                  <div class="text-xs text-gray-600">Puncak Hari</div>
                </div>
                <div class="bg-white/50 rounded-xl p-3 border border-pink-100">
                  <div class="text-lg font-bold text-purple-900">
                    {{
                      (dashboardStats?.usage_by_date || []).filter((day: any) => day.messages > 0)
                        .length
                    }}
                  </div>
                  <div class="text-xs text-gray-600">Hari Aktif</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Users Tab -->
      <div v-if="activeTab === 'users'" class="space-y-4 sm:space-y-6">
        <!-- Enhanced Search Bar -->
        <div
          class="bg-gradient-to-r from-white via-pink-50 to-purple-50 shadow-xl rounded-2xl p-4 sm:p-6 border border-pink-100 relative overflow-hidden">
          <!-- Decorative elements -->
          <div
            class="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-pink-200/20 to-purple-300/20 rounded-full -translate-y-12 translate-x-12">
          </div>

          <div class="relative z-10">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
              <div class="flex items-center">
                <div
                  class="bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-xl mr-3 shadow-lg"
                >
                  <VIcon name="md-search" class="text-white text-lg" />
                </div>
                <div>
                  <h3
                    class="text-lg font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    Pencarian Akun
                  </h3>
                </div>
              </div>

              <div class="flex items-center space-x-4">
                <div class="relative flex-1">
                  <input
                    v-model="userSearch"
                    @input="searchUsers"
                    type="text"
                    placeholder="Cari nama atau email..."
                    class="w-full sm:w-80 px-4 py-3 pl-10 border border-pink-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm shadow-sm"
                  />
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <VIcon name="md-search" class="text-gray-400" />
                  </div>
                  <div v-if="userSearch" class="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      @click="((userSearch = ''), searchUsers())"
                      class="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <VIcon name="md-close" class="text-lg" />
                    </button>
                  </div>
                </div>

                <!-- Mobile Export Buttons -->
                <div class="flex sm:hidden space-x-2">
                  <button
                    @click="exportToCSV"
                    :disabled="exportingCSV"
                    class="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Export CSV"
                  >
                    <VIcon :name="exportingCSV ? 'md-hourglasstop' : 'md-tablechart'" class="text-sm" />
                  </button>
                  <button
                    @click="exportToPDF"
                    :disabled="exportingPDF"
                    class="bg-gradient-to-r from-red-500 to-pink-600 text-white p-2 rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Export PDF"
                  >
                    <VIcon :name="exportingPDF ? 'md-hourglasstop' : 'md-pictureaspdf'" class="text-sm" />
                  </button>
                </div>

                <div class="hidden sm:flex items-center space-x-2">
                  <span
                    class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-pink-100 to-purple-100 text-purple-800 border border-pink-200">
                    <span
                      class="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mr-2 animate-pulse"></span>
                    {{ users.length }} Hasil
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Users Grid -->
        <div
          class="bg-gradient-to-br from-white via-pink-50 to-purple-50 shadow-2xl rounded-2xl p-4 sm:p-6 border border-pink-100 relative overflow-hidden">
          <!-- Decorative background -->
          <div
            class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-pink-200/10 to-purple-300/10 rounded-full -translate-y-20 translate-x-20">
          </div>
          <div
            class="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-200/10 to-pink-300/10 rounded-full translate-y-16 -translate-x-16">
          </div>

          <div class="relative z-10">
            <!-- Header -->
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center">
                <div
                  class="bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-xl mr-3 shadow-lg"
                >
                  <VIcon name="md-group" class="text-white text-lg" />
                </div>
                <div>
                  <h3
                    class="text-lg sm:text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    Komunitas GlowGla
                  </h3>
                </div>
              </div>
              <div class="hidden sm:flex items-center space-x-2">
                <!-- Export Buttons -->
                <button
                  @click="exportToCSV"
                  :disabled="exportingCSV"
                  class="inline-flex items-center px-3 py-2 text-xs font-medium bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <VIcon :name="exportingCSV ? 'md-hourglasstop' : 'md-tablechart'" class="mr-1" />
                  {{ exportingCSV ? 'Mengexport...' : 'Export CSV' }}
                </button>
                <button
                  @click="exportToPDF"
                  :disabled="exportingPDF"
                  class="inline-flex items-center px-3 py-2 text-xs font-medium bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <VIcon :name="exportingPDF ? 'md-hourglasstop' : 'md-pictureaspdf'" class="mr-1" />
                  {{ exportingPDF ? 'Mengexport...' : 'Export PDF' }}
                </button>
                <span
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-pink-100 to-purple-100 text-purple-800 border border-pink-200">
                  <span class="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mr-2"></span>
                  {{ users.length }} Anggota
                </span>
              </div>
            </div>

            <!-- Mobile Card View (Hidden on desktop) -->
            <div class="block lg:hidden space-y-4">
              <div v-for="user in users" :key="user.id"
                class="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-pink-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div class="flex items-center space-x-3 mb-3">
                  <div class="relative">
                    <div
                      class="h-12 w-12 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center shadow-lg">
                      <span class="text-white font-bold text-lg">{{ user.name.charAt(0) }}</span>
                    </div>
                    <div
                      v-if="user.is_premium"
                      class="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1"
                    >
                      <VIcon name="md-star" class="text-xs text-yellow-600" />
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center space-x-2">
                      <h4 class="text-sm font-bold text-gray-900 truncate">{{ user.name }}</h4>
                      <span
                        class="inline-flex px-2 py-1 text-xs font-semibold rounded-full"
                        :class="
                          user.is_premium
                            ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300'
                            : 'bg-gray-100 text-gray-800 border border-gray-200'
                        "
                      >
                        <template v-if="user.is_premium">
                          <VIcon name="md-star" class="mr-1 text-xs" /> Premium
                        </template>
                        <template v-else>
                          <VIcon name="gi-lipstick" class="mr-1 text-xs" /> Free
                        </template>
                      </span>
                    </div>
                    <p class="text-xs text-gray-500 truncate">{{ user.email }}</p>
                  </div>
                </div>

                <!-- Stats -->
                <div class="grid grid-cols-2 gap-3 mb-3">
                  <div class="bg-pink-50 rounded-lg p-2 text-center">
                    <div class="text-lg font-bold text-pink-600">
                      {{ user.conversations_count || 0 }}
                    </div>
                    <div class="text-xs text-gray-600">Konsultasi</div>
                  </div>
                  <div class="bg-purple-50 rounded-lg p-2 text-center">
                    <div class="text-lg font-bold text-purple-600">
                      {{ user.messages_count || 0 }}
                    </div>
                    <div class="text-xs text-gray-600">Pesan</div>
                  </div>
                </div>

                <!-- Actions -->
                <div class="flex flex-col space-y-2">
                  <div class="flex space-x-2">
                    <button @click="viewUserDetails(user)"
                      class="flex-1 bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-xs py-2 px-3 rounded-lg font-medium hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 shadow-sm">
                      Lihat Detail
                    </button>
                    <button @click="toggleUserPremium(user)"
                      class="flex-1 text-xs py-2 px-3 rounded-lg font-medium transition-all duration-200 shadow-sm"
                      :class="user.is_premium
                          ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700'
                          : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
                        ">
                      {{ user.is_premium ? 'Hapus Premium' : 'Buat Premium' }}
                    </button>
                  </div>
                  <button @click="deleteUser(user)"
                    class="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs py-2 px-3 rounded-lg font-medium hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-sm">
                    Hapus Pengguna
                  </button>
                </div>

                <!-- Join date -->
                <div class="mt-3 pt-3 border-t border-pink-100">
                  <div class="text-xs text-gray-500 text-center">
                    Bergabung {{ formatDate(user.created_at) }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Desktop Table View (Hidden on mobile) -->
            <div class="hidden lg:block overflow-hidden">
              <div class="overflow-x-auto">
                <table class="min-w-full">
                  <thead>
                    <tr class="bg-gradient-to-r from-pink-100 to-purple-100 border-b border-pink-200">
                      <th
                        class="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider rounded-tl-xl">
                        <div class="flex items-center space-x-2">
                          <VIcon name="md-person" class="text-xs" />
                          <span>Beauty Enthusiast</span>
                        </div>
                      </th>
                      <th class="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">
                        <div class="flex items-center space-x-2">
                          <VIcon name="md-star" class="text-xs" />
                          <span>Status</span>
                        </div>
                      </th>
                      <th class="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">
                        <div class="flex items-center space-x-2">
                          <VIcon name="md-assessment" class="text-xs" />
                          <span>Aktivitas</span>
                        </div>
                      </th>
                      <th class="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider">
                        <div class="flex items-center space-x-2">
                          <VIcon name="md-daterange" class="text-xs" />
                          <span>Bergabung</span>
                        </div>
                      </th>
                      <th
                        class="px-6 py-4 text-left text-xs font-bold text-purple-900 uppercase tracking-wider rounded-tr-xl">
                        <div class="flex items-center space-x-2">
                          <VIcon name="md-settings" class="text-xs" />
                          <span>Aksi</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white/50 backdrop-blur-sm">
                    <tr v-for="(user, index) in users" :key="user.id"
                      class="border-b border-pink-100 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 transition-all duration-200 group"
                      :class="index === users.length - 1 ? 'border-b-0' : ''">
                      <td class="px-6 py-4">
                        <div class="flex items-center">
                          <div class="flex-shrink-0 h-12 w-12 relative">
                            <div
                              class="h-12 w-12 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
                              <span class="text-white font-bold text-lg">{{
                                user.name.charAt(0)
                                }}</span>
                            </div>
                            <div
                              v-if="user.is_premium"
                              class="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1 shadow-md"
                            >
                              <VIcon name="md-star" class="text-xs text-yellow-600" />
                            </div>
                          </div>
                          <div class="ml-4">
                            <div class="text-sm font-bold text-gray-900 group-hover:text-purple-900 transition-colors">
                              {{ user.name }}
                            </div>
                            <div class="text-sm text-gray-500">{{ user.email }}</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <span class="inline-flex items-center px-3 py-1.5 text-xs font-bold rounded-full shadow-sm"
                          :class="user.is_premium
                              ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300'
                              : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300'
                          "
                        >
                          <VIcon :name="user.is_premium ? 'md-star' : 'md-person'" class="mr-1 text-xs" />
                          {{ user.is_premium ? 'Premium' : 'Free' }}
                        </span>
                      </td>
                      <td class="px-6 py-4">
                        <div class="space-y-1">
                          <div class="flex items-center space-x-2">
                            <VIcon name="md-chat" class="text-xs text-purple-500" />
                            <span class="text-sm font-medium text-gray-900"
                              >{{ user.conversations_count || 0 }} percakapan </span
                            >
                          </div>
                          <div class="flex items-center space-x-2">
                            <VIcon name="md-chat" class="text-xs text-purple-500" />
                            <span class="text-sm text-gray-600"
                              >{{ user.messages_count || 0 }} pesan</span
                            >
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <div class="text-sm text-gray-600 font-medium">
                          {{ formatDate(user.created_at) }}
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <div class="flex flex-col space-y-2">
                          <div class="flex space-x-2">
                            <button @click="viewUserDetails(user)"
                              class="bg-gradient-to-r from-blue-500 to-cyan-600 text-white text-xs py-1.5 px-3 rounded-lg font-medium hover:from-blue-600 hover:to-cyan-700 transition-all duration-200 shadow-sm hover:shadow-md">
                              Lihat
                            </button>
                            <button @click="toggleUserPremium(user)"
                              class="text-xs py-1.5 px-3 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                              :class="user.is_premium
                                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700'
                                  : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
                                ">
                              {{ user.is_premium ? 'Hapus Premium' : 'Buat Premium' }}
                            </button>
                          </div>
                          <button @click="deleteUser(user)"
                            class="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs py-1.5 px-3 rounded-lg font-medium hover:from-red-600 hover:to-pink-700 transition-all duration-200 shadow-sm hover:shadow-md">
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="usersPagination" class="flex justify-between items-center">
          <div class="text-sm text-gray-700">
            Showing {{ usersPagination.from }} to {{ usersPagination.to }} of
            {{ usersPagination.total }} users
          </div>
          <div class="flex space-x-2">
            <button v-for="page in paginationPages" :key="page" @click="loadUsers(page)"
              class="px-3 py-1 border rounded" :class="page === usersPagination.current_page
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700'
                ">
              {{ page }}
            </button>
          </div>
        </div>
      </div>

      <!-- Chat Stats Tab -->
      <div v-if="activeTab === 'chat-stats'" class="space-y-4 sm:space-y-6">
        <!-- Enhanced Stats Overview Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div
            class="bg-gradient-to-br from-pink-500 via-pink-600 to-purple-600 overflow-hidden shadow-2xl rounded-2xl border border-pink-200 relative group hover:scale-105 transition-all duration-300">
            <!-- Decorative elements -->
            <div class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div class="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>

            <div class="p-4 sm:p-5 relative z-10">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div
                    class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  >
                    <VIcon name="md-chat" class="text-white text-xl" />
                  </div>
                </div>
                <div class="ml-4 w-0 flex-1">
                  <dl>
                    <dt class="text-xs sm:text-sm font-medium text-pink-100 truncate">
                      Total Konsultasi (30h)
                    </dt>
                    <dd
                      class="text-xl sm:text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-200">
                      {{ chatStats?.total_messages_period || 0 }}
                    </dd>
                  </dl>
                </div>
              </div>
              <div class="mt-3 pt-3 border-t border-white/20">
                <div class="flex items-center text-pink-100 text-xs">
                  <span class="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                  Tips kecantikan dibagikan
                </div>
              </div>
            </div>
          </div>

          <div
            class="bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 overflow-hidden shadow-2xl rounded-2xl border border-blue-200 relative group hover:scale-105 transition-all duration-300">
            <!-- Decorative elements -->
            <div class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div class="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>

            <div class="p-4 sm:p-5 relative z-10">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div
                    class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  >
                    <VIcon name="md-forum" class="text-white text-xl" />
                  </div>
                </div>
                <div class="ml-4 w-0 flex-1">
                  <dl>
                    <dt class="text-xs sm:text-sm font-medium text-blue-100 truncate">
                      Percakapan (30h)
                    </dt>
                    <dd
                      class="text-xl sm:text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-200">
                      {{ chatStats?.total_conversations_period || 0 }}
                    </dd>
                  </dl>
                </div>
              </div>
              <div class="mt-3 pt-3 border-t border-white/20">
                <div class="flex items-center text-blue-100 text-xs">
                  <span class="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                  Sesi konsultasi aktif
                </div>
              </div>
            </div>
          </div>

          <div
            class="bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 overflow-hidden shadow-2xl rounded-2xl border border-green-200 relative group hover:scale-105 transition-all duration-300">
            <!-- Decorative elements -->
            <div class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div class="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>

            <div class="p-4 sm:p-5 relative z-10">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div
                    class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  >
                    <VIcon name="md-trendingup" class="text-white text-xl" />
                  </div>
                </div>
                <div class="ml-4 w-0 flex-1">
                  <dl>
                    <dt class="text-xs sm:text-sm font-medium text-green-100 truncate">
                      Rata-rata Harian
                    </dt>
                    <dd
                      class="text-xl sm:text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-200">
                      {{ getDailyAverage() }}
                    </dd>
                  </dl>
                </div>
              </div>
              <div class="mt-3 pt-3 border-t border-white/20">
                <div class="flex items-center text-green-100 text-xs">
                  <span class="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                  Konsultasi per hari
                </div>
              </div>
            </div>
          </div>

          <div
            class="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 overflow-hidden shadow-2xl rounded-2xl border border-orange-200 relative group hover:scale-105 transition-all duration-300">
            <!-- Decorative elements -->
            <div class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div class="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>

            <div class="p-4 sm:p-5 relative z-10">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div
                    class="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  >
                    <VIcon name="md-star" class="text-white text-xl" />
                  </div>
                </div>
                <div class="ml-4 w-0 flex-1">
                  <dl>
                    <dt class="text-xs sm:text-sm font-medium text-orange-100 truncate">
                      Paling Aktif
                    </dt>
                    <dd
                      class="text-xl sm:text-2xl font-bold text-white group-hover:scale-110 transition-transform duration-200">
                      {{ getMostActiveUser() }}
                    </dd>
                  </dl>
                </div>
              </div>
              <div class="mt-3 pt-3 border-t border-white/20">
                <div class="flex items-center text-orange-100 text-xs">
                  <span class="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                  Member teraktif bulan ini
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Activity Chart -->
        <div
          class="bg-gradient-to-br from-white via-pink-50 to-purple-50 shadow-2xl rounded-2xl p-4 sm:p-6 border border-pink-100 relative overflow-hidden">
          <!-- Decorative background -->
          <div
            class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-200/20 to-purple-300/20 rounded-full -translate-y-16 translate-x-16">
          </div>
          <div
            class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200/20 to-pink-300/20 rounded-full translate-y-12 -translate-x-12">
          </div>

          <div class="relative z-10">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
              <div class="flex items-center mb-4 sm:mb-0">
                <div
                  class="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-xl mr-4 shadow-lg"
                >
                  <VIcon name="md-assessment" class="text-white text-xl" />
                </div>
                <div>
                  <h3
                    class="text-lg sm:text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    Aktivitas Percakapan 
                  </h3>
                  <p class="text-xs sm:text-sm text-gray-500">
                    Analisis mendalam aktivitas platform
                  </p>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <span
                  class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200 shadow-sm">
                  <span
                    class="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-2 animate-pulse"></span>
                  30 Hari Terakhir
                </span>
              </div>
            </div>

            <div
              v-if="!chatStats?.messages_per_day || chatStats.messages_per_day.length === 0"
              class="text-center py-16"
            >
              <div class="text-center">
                <VIcon name="gi-lipstick" class="text-8xl mb-6 text-pink-400 animate-bounce" />
              </div>
              <h4 class="text-xl font-bold text-gray-700 mb-2">Belum Ada Konsultasi Kecantikan</h4>
              <p class="text-gray-500 text-base mb-4">
                Mulai berbincang dengan AI kecantikan untuk melihat aktivitas di sini!
              </p>
              <div
                class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl text-sm text-purple-700"
              >
                <VIcon name="md-star" class="mr-2 text-sm" />
                Tips kecantikan menanti Anda
              </div>
            </div>

            <div v-else class="space-y-4">
              <div v-for="(stat, index) in chatStats?.messages_per_day || []" :key="stat.date" class="group">
                <div
                  class="flex items-center space-x-4 p-3 rounded-xl hover:bg-white/60 transition-all duration-300 hover:shadow-md">
                  <div class="flex items-center space-x-3">
                    <div
                      class="bg-gradient-to-r from-pink-400 to-purple-500 w-8 h-8 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-200">
                      <span class="text-white text-xs font-bold">{{ index + 1 }}</span>
                    </div>
                    <span class="text-sm font-bold text-gray-700 w-20 group-hover:text-purple-700 transition-colors">
                      {{ formatDateShort(stat.date) }}
                    </span>
                  </div>

                  <div class="flex-1 relative">
                    <div
                      class="bg-gradient-to-r from-gray-200 to-gray-300 rounded-full h-6 relative overflow-hidden shadow-inner">
                      <div
                        class="bg-gradient-to-r from-pink-400 via-purple-500 to-pink-600 h-6 rounded-full transition-all duration-700 flex items-center justify-end pr-3 shadow-sm"
                        :style="{ width: getBarWidth(stat.count) + '%' }">
                        <span v-if="stat.count > 5" class="text-white text-xs font-bold drop-shadow-sm">
                          {{ stat.count }}
                        </span>
                      </div>
                    </div>
                    <!-- Activity level indicator -->
                    <div class="absolute -top-1 -right-1">
                      <div v-if="stat.count > 20" class="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-md">
                      </div>
                      <div v-else-if="stat.count > 10"
                        class="w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-md"></div>
                      <div v-else-if="stat.count > 0" class="w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-md">
                      </div>
                    </div>
                  </div>

                  <div class="text-right min-w-[60px]">
                    <div
                      class="text-lg font-bold bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-200">
                      {{ stat.count }}
                    </div>
                    <div class="text-xs text-gray-500 flex items-center justify-end">
                      <VIcon name="gi-lipstick" class="mr-1 text-xs" />
                      <span>tips</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Top Beauty Enthusiasts -->
        <div
          class="bg-gradient-to-br from-white via-purple-50 to-pink-50 shadow-2xl rounded-2xl p-4 sm:p-6 border border-purple-100 relative overflow-hidden">
          <!-- Decorative background -->
          <div
            class="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-200/10 to-pink-300/10 rounded-full -translate-y-20 -translate-x-20">
          </div>
          <div
            class="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-pink-200/10 to-purple-300/10 rounded-full translate-y-16 translate-x-16">
          </div>

          <div class="relative z-10">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center">
                <div
                  class="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl mr-4 shadow-lg"
                >
                  <VIcon name="md-star" class="text-white text-xl" />
                </div>
                <div>
                  <h3
                    class="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Top Beauty Enthusiasts
                  </h3>
                  <p class="text-xs sm:text-sm text-gray-500">
                    Pecinta kecantikan paling aktif bulan ini
                  </p>
                </div>
              </div>
              <div class="hidden sm:flex items-center space-x-2">
                <span
                  class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 border border-yellow-200 shadow-sm"
                >
                  <VIcon name="md-emojievents" class="mr-2 text-sm" />
                  Hall of Fame
                </span>
              </div>
            </div>

            <div
              v-if="!chatStats?.top_active_users || chatStats.top_active_users.length === 0"
              class="text-center py-12"
            >
              <div class="text-center">
                <VIcon name="md-brush" class="text-6xl mb-4 text-pink-400 animate-pulse" />
              </div>
              <h4 class="text-lg font-bold text-gray-700 mb-2">
                Belum Ada Beauty Enthusiast Aktif
              </h4>
              <p class="text-gray-500 text-sm">
                Konsultasi kecantikan pertama akan muncul di sini!
              </p>
            </div>

            <div v-else class="space-y-3">
              <div v-for="(user, index) in chatStats?.top_active_users || []" :key="user.id" class="group relative">
                <!-- Rank highlight for top 3 -->
                <div v-if="index < 3"
                  class="absolute inset-0 rounded-xl opacity-10 transition-opacity duration-300 group-hover:opacity-20"
                  :class="{
                    'bg-gradient-to-r from-yellow-300 to-yellow-500': index === 0,
                    'bg-gradient-to-r from-gray-300 to-gray-500': index === 1,
                    'bg-gradient-to-r from-orange-300 to-orange-500': index === 2,
                  }"></div>

                <div
                  class="relative flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50 hover:shadow-lg border border-transparent hover:border-pink-200">
                  <!-- Enhanced Rank Badge -->
                  <div class="flex-shrink-0 relative">
                    <div
                      class="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-lg relative overflow-hidden group-hover:shadow-xl transition-shadow duration-300"
                      :class="getRankBadgeColor(index)">
                      <!-- Shine effect for top 3 -->
                      <div v-if="index < 3"
                        class="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse">
                      </div>
                      <span class="relative z-10">{{ index + 1 }}</span>
                    </div>
                    <!-- Crown for #1 -->
                    <div v-if="index === 0" class="absolute -top-2 -right-1 text-lg animate-bounce">
                      <VIcon name="md-star" class="text-yellow-400" />
                    </div>
                  </div>

                  <!-- Enhanced User Avatar -->
                  <div class="flex-shrink-0 h-14 w-14 relative">
                    <div
                      class="h-14 w-14 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                      <!-- Animated border for top users -->
                      <div v-if="index < 3"
                        class="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-spin">
                      </div>
                      <span class="text-white font-bold text-lg relative z-10">{{
                        user.name.charAt(0)
                        }}</span>
                    </div>
                    <!-- Premium badge -->
                    <div
                      v-if="user.is_premium"
                      class="absolute -bottom-1 -right-1 bg-yellow-400 rounded-full p-1 shadow-md"
                    >
                      <VIcon name="md-star" class="text-xs text-yellow-600" />
                    </div>
                  </div>

                  <!-- Enhanced User Info -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center space-x-3 mb-1">
                      <p class="text-sm font-bold text-gray-900 truncate group-hover:text-purple-900 transition-colors">
                        {{ user.name }}
                      </p>
                      <span
                        v-if="user.is_premium"
                        class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300 shadow-sm"
                      >
                        <VIcon name="md-star" class="mr-1 text-xs" />
                        Premium
                      </span>
                      <!-- Activity level badge -->
                      <span
                        v-if="user.messages_count > 50"
                        class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300 shadow-sm"
                      >
                        <VIcon name="md-local-fire-department" class="mr-1 text-xs" /> Super Aktif
                      </span>
                    </div>
                    <p class="text-sm text-gray-500 truncate">{{ user.email }}</p>
                  </div>

                  <!-- Enhanced Message Count -->
                  <div class="flex-shrink-0 text-right">
                    <div
                      class="text-xl font-bold bg-gradient-to-r from-purple-900 to-pink-900 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-200">
                      {{ user.messages_count }}
                    </div>
                    <div class="text-xs text-gray-500 flex items-center justify-end">
                      <VIcon name="gi-lipstick" class="mr-1 text-xs" />
                      <span>konsultasi</span>
                    </div>
                  </div>

                  <!-- Enhanced Trophy Icon for Top 3 -->
                  <div v-if="index < 3" class="flex-shrink-0">
                    <VIcon 
                      :name="getTrophyIconName(index)" 
                      class="text-3xl animate-pulse"
                      :class="getTrophyIconColor(index)" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced Fun Facts -->
        <div
          class="bg-gradient-to-br from-white via-pink-50 to-purple-50 shadow-2xl rounded-2xl p-4 sm:p-6 border border-pink-100 relative overflow-hidden">
          <!-- Decorative background -->
          <div
            class="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-pink-200/10 to-purple-300/10 rounded-full -translate-y-18 translate-x-18">
          </div>
          <div
            class="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-tr from-purple-200/10 to-pink-300/10 rounded-full translate-y-14 -translate-x-14">
          </div>

          <div class="relative z-10">
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center">
                <div
                  class="bg-gradient-to-r from-pink-500 to-purple-600 p-3 rounded-xl mr-4 shadow-lg"
                >
                  <VIcon name="md-star" class="text-white text-xl" />
                </div>
                <div>
                  <h3
                    class="text-lg sm:text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    Beauty Stats Fun Facts
                  </h3>
                  <p class="text-xs sm:text-sm text-gray-500">
                    Statistik menarik platform kecantikan
                  </p>
                </div>
              </div>
              <div class="hidden sm:flex items-center space-x-2">
                <span
                  class="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border border-purple-200 shadow-sm"
                >
                  <VIcon name="md-assessment" class="mr-2 text-sm" />
                  Insights
                </span>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <!-- Total Beauty Questions -->
              <div
                class="group relative bg-gradient-to-br from-purple-50 via-pink-50 to-purple-50 border border-purple-200 rounded-xl p-4 hover:shadow-xl transition-all duration-300 hover:border-purple-300 overflow-hidden">
                <div
                  class="absolute inset-0 bg-gradient-to-r from-purple-100/0 via-pink-100/20 to-purple-100/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000">
                </div>

                <div class="relative z-10 text-center">
                  <div
                    class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  >
                    <VIcon name="gi-lipstick" class="text-2xl text-white" />
                  </div>
                  <div class="text-xs sm:text-sm text-gray-600 mb-2 font-medium">
                    Total pertanyaan kecantikan
                  </div>
                  <div
                    class="text-2xl sm:text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-200">
                    {{ chatStats?.total_messages_period || 0 }}
                  </div>
                  <div class="text-xs text-gray-500 mt-1">konsultasi dijawab</div>
                </div>
              </div>

              <!-- Most Active Day -->
              <div
                class="group relative bg-gradient-to-br from-pink-50 via-purple-50 to-pink-50 border border-pink-200 rounded-xl p-4 hover:shadow-xl transition-all duration-300 hover:border-pink-300 overflow-hidden">
                <div
                  class="absolute inset-0 bg-gradient-to-r from-pink-100/0 via-purple-100/20 to-pink-100/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000">
                </div>

                <div class="relative z-10 text-center">
                  <div
                    class="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                  >
                    <VIcon name="md-star" class="text-2xl text-white" />
                  </div>
                  <div class="text-xs sm:text-sm text-gray-600 mb-2 font-medium">
                    Hari paling aktif
                  </div>
                  <div
                    class="text-lg sm:text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-200">
                    {{ getMostActiveDay() }}
                  </div>
                  <div class="text-xs text-gray-500 mt-1">aktivitas tertinggi</div>
                </div>
              </div>

              <!-- Beauty Enthusiasts -->
              <div
                class="group relative bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-50 border border-yellow-200 rounded-xl p-4 hover:shadow-xl transition-all duration-300 hover:border-yellow-300 overflow-hidden sm:col-span-2 lg:col-span-1">
                <div
                  class="absolute inset-0 bg-gradient-to-r from-yellow-100/0 via-orange-100/20 to-yellow-100/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000">
                </div>

                <div class="relative z-10 text-center">
                  <div
                    class="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <span class="text-2xl text-white">👥</span>
                  </div>
                  <div class="text-xs sm:text-sm text-gray-600 mb-2 font-medium">
                    Beauty enthusiasts
                  </div>
                  <div
                    class="text-2xl sm:text-3xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-200">
                    {{ (chatStats?.top_active_users || []).length }}
                  </div>
                  <div class="text-xs text-gray-500 mt-1">pengguna aktif</div>
                </div>
              </div>
            </div>

            <!-- Additional Insights -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <!-- Peak Activity Time -->
              <div
                class="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 group">
                <div class="flex items-center space-x-3">
                  <div
                    class="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow"
                  >
                    <VIcon name="md-schedule" class="text-xl text-white" />
                  </div>
                  <div>
                    <h5 class="font-bold text-gray-800 text-sm group-hover:text-emerald-900 transition-colors">
                      Jam Tersibuk
                    </h5>
                    <p class="text-xs text-gray-600">{{ getPeakTimeMessage() }}</p>
                  </div>
                </div>
              </div>

              <!-- Engagement Level -->
              <div
                class="bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 group">
                <div class="flex items-center space-x-3">
                  <div
                    class="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow"
                  >
                    <VIcon name="md-trendingup" class="text-xl text-white" />
                  </div>
                  <div>
                    <h5 class="font-bold text-gray-800 text-sm group-hover:text-rose-900 transition-colors">
                      Engagement
                    </h5>
                    <p class="text-xs text-gray-600">{{ getEngagementLevel() }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Ratings Tab -->
      <div v-if="activeTab === 'ratings'" class="space-y-4 sm:space-y-6">
        <!-- Rating Statistics Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <!-- Overall Rating -->
          <div class="bg-gradient-to-r from-amber-400 to-yellow-500 overflow-hidden shadow-xl rounded-xl">
            <div class="p-4 sm:p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                    <VIcon name="md-star" class="text-white text-lg sm:text-2xl" />
                  </div>
                </div>
                <div class="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-xs sm:text-sm font-medium text-amber-100 truncate">
                      Rating Rata-rata
                    </dt>
                    <dd class="text-lg sm:text-2xl font-bold text-white">
                      {{ ratingStats?.average_rating || 0 }}/5
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <!-- Total Ratings -->
          <div class="bg-gradient-to-r from-purple-500 to-indigo-600 overflow-hidden shadow-xl rounded-xl">
            <div class="p-4 sm:p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                    <VIcon name="md-assessment" class="text-white text-lg sm:text-2xl" />
                  </div>
                </div>
                <div class="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-xs sm:text-sm font-medium text-purple-100 truncate">
                      Total Rating
                    </dt>
                    <dd class="text-lg sm:text-2xl font-bold text-white">
                      {{ ratingStats?.total_ratings || 0 }}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <!-- Rating dengan Feedback -->
          <div class="bg-gradient-to-r from-green-500 to-emerald-600 overflow-hidden shadow-xl rounded-xl">
            <div class="p-4 sm:p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 sm:w-12 sm:h-12 bg-white bg-opacity-30 rounded-full flex items-center justify-center">
                    <VIcon name="md-create" class="text-white text-lg sm:text-2xl" />
                  </div>
                </div>
                <div class="ml-3 sm:ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-xs sm:text-sm font-medium text-green-100 truncate">
                      Rating dengan Feedback
                    </dt>
                    <dd class="text-lg sm:text-2xl font-bold text-white">
                      {{ ratingStats?.ratings_with_feedback || 0 }}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

          <!-- Rating Distribution -->
          <div class="bg-white shadow-xl rounded-xl p-4 sm:p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Distribusi Rating</h3>
            <div class="max-w-lg mx-auto">
              <!-- Overall Ratings Distribution -->
              <div class="space-y-3">
                <h4 class="font-medium text-gray-700 text-center mb-4">Rating Aplikasi Overall</h4>
                
                <!-- Debug info (you can remove this later) -->
                <div v-if="!ratingStats" class="text-center py-4">
                  <div class="text-gray-400 animate-pulse">Loading rating statistics...</div>
                </div>
                
                <div v-else-if="!ratingStats.total_ratings || ratingStats.total_ratings === 0" class="text-center py-8">
                  <div class="text-center">
                    <VIcon name="md-star" class="text-4xl mb-2 text-yellow-400" />
                  </div>
                  <div class="text-gray-500 text-sm">Belum ada rating yang diberikan</div>
                  <div class="text-xs text-gray-400 mt-1">Rating pertama akan muncul di sini</div>
                </div>
                
                <div v-else>
                  <div v-for="star in [5, 4, 3, 2, 1]" :key="star" class="flex items-center space-x-3">
                    <div class="flex items-center space-x-2 w-16">
                      <span class="text-sm font-medium">{{ star }}</span>
                      <VIcon name="md-star" class="text-yellow-400 text-sm" />
                    </div>
                    <div class="flex-1 bg-gray-200 rounded-full h-3 relative overflow-hidden">
                      <div
                        class="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full transition-all duration-500 relative"
                        :style="{ width: Math.max(getRatingPercentage(star), 2) + '%' }"
                      >
                        <!-- Add minimum width for visibility when percentage is very small -->
                        <div v-if="getRatingPercentage(star) > 0 && getRatingPercentage(star) < 5" 
                             class="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 min-w-[8px]"></div>
                      </div>
                    </div>
                    <div class="flex items-center space-x-2 w-24 text-right">
                      <span class="text-sm text-gray-600 font-medium">
                        {{ ratingStats?.distribution?.[star] || 0 }}
                      </span>
                      <span class="text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                        {{ getRatingPercentage(star) }}%
                      </span>
                    </div>
                  </div>
                  
                  <!-- Enhanced statistics grid -->
                  <div class="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border">
                    <h5 class="text-sm font-semibold text-gray-700 mb-3 text-center">Statistik Rating</h5>
                    <div class="grid grid-cols-2 gap-4">
                      <div class="text-center p-3 bg-white rounded-lg shadow-sm">
                        <div class="text-2xl font-bold text-yellow-600">{{ ratingStats.average_rating }}</div>
                        <div class="text-xs text-gray-500">Rata-rata</div>
                        <div class="flex justify-center mt-1">
                          <VIcon v-for="i in 5" :key="i" 
                                name="md-star"
                                :class="i <= Math.round(ratingStats.average_rating) ? 'text-yellow-400' : 'text-gray-300'"
                                class="text-sm" />
                        </div>
                      </div>
                      
                      <div class="text-center p-3 bg-white rounded-lg shadow-sm">
                        <div class="text-2xl font-bold text-purple-600">{{ ratingStats.total_ratings }}</div>
                        <div class="text-xs text-gray-500">Total Rating</div>
                        <div class="text-xs text-gray-400 mt-1">
                          {{ ratingStats.ratings_with_feedback || 0 }} dengan feedback
                        </div>
                      </div>
                    </div>
                    
                    <!-- Rating quality indicator -->
                    <div class="mt-3 text-center">
                      <div v-if="ratingStats.average_rating >= 4.5" 
                           class="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        <VIcon name="md-emoji-events" class="mr-1 text-xs" /> Excellent Quality
                      </div>
                      <div v-else-if="ratingStats.average_rating >= 4" 
                           class="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        <VIcon name="md-thumb-up" class="mr-1 text-xs" /> Good Quality
                      </div>
                      <div v-else-if="ratingStats.average_rating >= 3" 
                           class="inline-flex items-center px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                        <VIcon name="md-settings" class="mr-1 text-xs" /> Average Quality
                      </div>
                      <div v-else 
                           class="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                        <VIcon name="md-trendingup" class="mr-1 text-xs" /> Needs Improvement
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Feedback -->
          <div class="bg-white shadow-xl rounded-xl p-4 sm:p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-lg font-semibold text-gray-900">Feedback Terbaru</h3>
              <div class="flex space-x-2">
                <select
                  v-model="ratingFilter.rating"
                  @change="() => loadRatings()"
                  class="px-3 py-1 border border-gray-300 rounded-md text-sm"
                >
                  <option value="">Semua Rating</option>
                  <option value="5">5 ★</option>
                  <option value="4">4 ★</option>
                  <option value="3">3 ★</option>
                  <option value="2">2 ★</option>
                  <option value="1">1 ★</option>
                </select>
              </div>
            </div>

            <div v-if="ratingsLoading" class="space-y-3">
              <div v-for="i in 5" :key="i" class="animate-pulse">
                <div class="h-20 bg-gray-200 rounded-lg"></div>
              </div>
            </div>

            <div v-else-if="ratings.length === 0" class="text-center py-8">
              <VIcon name="md-create" class="text-gray-400 text-4xl mb-2" />
              <div class="text-gray-500">Belum ada rating yang ditemukan</div>
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="rating in ratings"
                :key="rating.id"
                class="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center space-x-2 mb-2">
                      <div class="flex items-center">
                        <!-- Display stars based on rating value -->
                        <template v-if="rating.rating && rating.rating > 0">
                          <VIcon
                            name="md-star"
                            v-for="star in rating.rating"
                            :key="`filled-${star}`"
                            class="text-lg text-yellow-400"
                          />
                          <VIcon
                            name="md-star"
                            v-for="emptyStar in (5 - rating.rating)"
                            :key="`empty-${emptyStar}`"
                            class="text-lg text-gray-300"
                          />
                        </template>
                        <!-- Fallback for no rating -->
                        <template v-else>
                          <span class="text-sm text-gray-400 italic">No rating</span>
                        </template>
                        
                        <!-- Rating value display -->
                        <span v-if="rating.rating" class="ml-2 text-sm font-medium text-gray-600">
                          ({{ rating.rating }}/5)
                        </span>
                      </div>
                      <span class="px-2 py-1 bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 text-xs rounded-full font-medium">
                        Rating Aplikasi
                      </span>
                    </div>
                    
                    <div v-if="rating.feedback" class="text-gray-700 mb-2 italic">
                      "{{ rating.feedback }}"
                    </div>
                    
                    <div class="flex items-center space-x-4 text-xs text-gray-500">
                      <span v-if="rating.user" class="flex items-center">
                        <VIcon name="md-person" class="mr-1" /> {{ rating.user.name }}
                      </span>
                      <span v-else class="flex items-center">
                        <VIcon name="md-lock" class="mr-1" /> Guest User
                      </span>
                      <span class="flex items-center">
                        <VIcon name="md-daterange" class="mr-1" /> {{ formatDate(rating.submitted_at) }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Pagination -->
              <div v-if="ratingsPagination" class="flex justify-center mt-6">
                <nav class="flex space-x-2">
                  <button
                    v-for="page in getRatingPaginationPages()"
                    :key="page"
                    @click="loadRatings(page)"
                    :class="[
                      'px-3 py-2 text-sm font-medium rounded-md transition-colors',
                      page === ratingsPagination.current_page
                        ? 'bg-pink-500 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    ]"
                  >
                    {{ page }}
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- User Details Modal -->
    <div v-if="selectedUser" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-medium text-gray-900">User Details: {{ selectedUser.name }}</h3>
            <button @click="selectedUser = null" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Name</label>
                <p class="text-sm text-gray-900">{{ selectedUser.name }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <p class="text-sm text-gray-900">{{ selectedUser.email }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Type</label>
                <p class="text-sm text-gray-900">
                  {{ selectedUser.is_premium ? 'Premium' : 'Free' }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700">Joined</label>
                <p class="text-sm text-gray-900">{{ formatDate(selectedUser.created_at) }}</p>
              </div>
            </div>

            <div>
              <h4 class="text-sm font-medium text-gray-700 mb-2">Conversations</h4>
              <div class="max-h-40 overflow-y-auto space-y-2">
                <div v-for="conversation in userConversations" :key="conversation.id"
                  class="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <p class="text-sm font-medium">{{ conversation.title }}</p>
                    <p class="text-xs text-gray-500">{{ conversation.messages_count }} messages</p>
                  </div>
                  <button @click="deleteConversation(conversation.id)" class="text-red-600 hover:text-red-900 text-xs">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div> <!-- End of v-else div -->
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { api } from '@/services/api'
import { ratingService } from '@/services/rating'
import type { ChatStats } from '@/types'
import * as XLSX from 'xlsx'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

const router = useRouter()
const authStore = useAuthStore()

// State
const activeTab = ref('dashboard')
const dashboardStats = ref<any>(null)
const users = ref<any[]>([])
const usersPagination = ref<any>(null)
const userSearch = ref('')
const chatStats = ref<ChatStats | null>(null)
const selectedUser = ref<any>(null)
const userConversations = ref<any[]>([])
const loading = ref(false)
const exportingCSV = ref(false)
const exportingPDF = ref(false)

// Rating state
const ratingStats = ref<any>(null)
const ratings = ref<any[]>([])
const ratingsPagination = ref<any>(null)
const ratingsLoading = ref(false)
const ratingFilter = ref({
  rating: ''
})

// Tabs
const tabs = [
  { id: 'dashboard', name: 'Dashboard', icon: 'md-assessment' },
  { id: 'users', name: 'Member', icon: 'md-group' },
  { id: 'chat-stats', name: 'Analitik Kecantikan', icon: 'md-insights' },
  { id: 'ratings', name: 'Rating', icon: 'md-star' },
]

// Computed
const paginationPages = computed(() => {
  if (!usersPagination.value) return []
  const pages = []
  const total = usersPagination.value.last_page
  const current = usersPagination.value.current_page

  for (let i = Math.max(1, current - 2); i <= Math.min(total, current + 2); i++) {
    pages.push(i)
  }
  return pages
})

// Methods
const loadDashboardStats = async () => {
  try {
    const response = await api.get('/admin/dashboard/stats')
    dashboardStats.value = response.data.data
  } catch (error) {
    console.error('Failed to load dashboard stats:', error)
  }
}

const loadUsers = async (page = 1) => {
  try {
    loading.value = true
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: '15',
    })

    if (userSearch.value) {
      params.append('search', userSearch.value)
    }

    const response = await api.get(`/admin/users?${params}`)
    console.log('🔍 Users API Response:', response.data)
    console.log('👥 Users data:', response.data.data)
    console.log('📊 Sample user:', response.data.data?.[0])
    
    users.value = response.data.data || []
    usersPagination.value = response.data.pagination || null
  } catch (error) {
    console.error('Failed to load users:', error)
  } finally {
    loading.value = false
  }
}

const loadAllUsers = async () => {
  try {
    const params = new URLSearchParams({
      per_page: '999999', // Load all users
    })

    if (userSearch.value) {
      params.append('search', userSearch.value)
    }

    const response = await api.get(`/admin/users?${params}`)
    return response.data.data || []
  } catch (error) {
    console.error('Failed to load all users:', error)
    return []
  }
}

const searchUsers = () => {
  loadUsers(1)
}

const loadChatStats = async () => {
  try {
    const response = await api.get('/admin/chat/stats?days=30')
    chatStats.value = response.data.data
  } catch (error) {
    console.error('Failed to load chat stats:', error)
  }
}

const viewUserDetails = async (user: any) => {
  try {
    selectedUser.value = user
    const response = await api.get(`/admin/users/${user.id}/conversations`)
    userConversations.value = response.data.data || []
  } catch (error) {
    console.error('Failed to load user conversations:', error)
  }
}

const toggleUserPremium = async (user: any) => {
  try {
    const response = await api.put(`/admin/users/${user.id}/premium`, {
      is_premium: !user.is_premium,
      subscription_expires_at: !user.is_premium ? null : null,
    })

    if (response.data.success) {
      // Update the user in the list
      const index = users.value.findIndex((u) => u.id === user.id)
      if (index !== -1) {
        users.value[index] = { ...users.value[index], ...response.data.data }
      }
    }
  } catch (error) {
    console.error('Failed to update user premium status:', error)
  }
}

const deleteUser = async (user: any) => {
  if (
    !confirm(`Are you sure you want to delete user "${user.name}"? This action cannot be undone.`)
  ) {
    return
  }

  try {
    const response = await api.delete(`/admin/users/${user.id}`)

    if (response.data.success) {
      users.value = users.value.filter((u) => u.id !== user.id)
    }
  } catch (error) {
    console.error('Failed to delete user:', error)
  }
}

const deleteConversation = async (conversationId: number) => {
  if (!confirm('Are you sure you want to delete this conversation?')) {
    return
  }

  try {
    const response = await api.delete(`/admin/conversations/${conversationId}`)

    if (response.data.success) {
      userConversations.value = userConversations.value.filter((c) => c.id !== conversationId)
    }
  } catch (error) {
    console.error('Failed to delete conversation:', error)
  }
}

const logout = async () => {
  await authStore.logout()
  router.push('/auth')
}

// Export Functions
const exportToCSV = async () => {
  if (exportingCSV.value) return
  
  try {
    exportingCSV.value = true
    
    // Load all users for export
    const allUsers = await loadAllUsers()
    
    // Check if there's data to export
    if (!allUsers || allUsers.length === 0) {
      alert('Tidak ada data member untuk diekspor')
      return
    }
    
    // Prepare data for CSV export
    const csvData = allUsers.map((user: any) => ({
      'Nama': user.name || '',
      'Email': user.email || '',
      'Status': user.is_premium ? 'Premium' : 'Free',
      'Jumlah Konsultasi': user.conversations_count || 0,
      'Jumlah Pesan': user.messages_count || 0,
      'Tanggal Bergabung': formatDate(user.created_at),
      'ID': user.id
    }))

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(csvData)
    
    // Auto-adjust column widths
    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1')
    const wscols: any[] = []
    for (let C = range.s.c; C <= range.e.c; ++C) {
      wscols.push({ width: 20 })
    }
    ws['!cols'] = wscols
    
    // Create workbook
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Member Data')
    
    // Generate filename with current date
    const now = new Date()
    const filename = `GlowGla_Members_${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}.xlsx`
    
    // Download file
    XLSX.writeFile(wb, filename)
    
    // Export completed successfully
    // You could add a success toast here
    
  } catch (error) {
    console.error('Failed to export CSV:', error)
    alert('Gagal mengexport data ke CSV. Silakan coba lagi.')
  } finally {
    exportingCSV.value = false
  }
}

const exportToPDF = async () => {
  if (exportingPDF.value) return
  
  try {
    exportingPDF.value = true
    
    // Load all users for export
    const allUsers = await loadAllUsers()
    
    // Check if there's data to export
    if (!allUsers || allUsers.length === 0) {
      alert('Tidak ada data member untuk diekspor')
      return
    }
    
    // Try the advanced method first, fallback to simple method if it fails
    try {
      await exportToPDFAdvanced(allUsers)
    } catch (advancedError) {
      // Try simple PDF method as fallback
      await exportToPDFSimple(allUsers)
    }
    
  } catch (error) {
    console.error('Failed to export PDF:', error)
    if (error instanceof Error) {
      alert(`Gagal mengexport data ke PDF: ${error.message}`)
    } else {
      alert('Gagal mengexport data ke PDF. Silakan coba lagi.')
    }
  } finally {
    exportingPDF.value = false
  }
}

const exportToPDFAdvanced = async (allUsers: any[]) => {
  // Create new PDF document
  const doc = new jsPDF('landscape') // Use landscape for better table fit
  
  // Add title
  doc.setFontSize(16)
  doc.text('Data Member GlowGla', 14, 20)
  
  // Add export date and summary
  const now = new Date()
  doc.setFontSize(10)
  doc.text(`Diekspor pada: ${now.toLocaleDateString('id-ID')} ${now.toLocaleTimeString('id-ID')}`, 14, 28)
  doc.text(`Total Member: ${allUsers.length}`, 14, 34)
  
  // Prepare table data with better formatting
  const tableData = allUsers.map((user: any, index: number) => {
    return [
      (index + 1).toString(),
      user.name ? user.name.substring(0, 25) : '', // Limit name length
      user.email ? user.email.substring(0, 30) : '', // Limit email length
      user.is_premium ? 'Premium' : 'Free',
      (user.conversations_count || 0).toString(),
      (user.messages_count || 0).toString(),
      user.created_at ? formatDate(user.created_at) : ''
    ]
  })
  
  // Use autotable with proper import  
  ;(doc as any).autoTable({
    head: [['No', 'Nama', 'Email', 'Status', 'Konsultasi', 'Pesan', 'Bergabung']],
    body: tableData,
    startY: 40,
    styles: {
      fontSize: 8,
      cellPadding: 2,
      overflow: 'linebreak',
      valign: 'middle',
      halign: 'left'
    },
    headStyles: {
      fillColor: [219, 39, 119], // Pink color
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
      halign: 'center'
    },
    alternateRowStyles: {
      fillColor: [253, 242, 248] // Light pink
    },
    columnStyles: {
      0: { cellWidth: 15, halign: 'center' }, // No
      1: { cellWidth: 45 }, // Nama
      2: { cellWidth: 55 }, // Email
      3: { cellWidth: 25, halign: 'center' }, // Status
      4: { cellWidth: 25, halign: 'center' }, // Konsultasi
      5: { cellWidth: 25, halign: 'center' }, // Pesan
      6: { cellWidth: 35, halign: 'center' }, // Bergabung
    },
    margin: { top: 40, left: 14, right: 14, bottom: 20 },
    pageBreak: 'auto',
    showHead: 'everyPage',
    didDrawPage: (data: any) => {
      // Add page header
      doc.setFontSize(10)
      doc.setTextColor(128, 128, 128)
      doc.text('GlowGla Admin Panel - Data Member', 14, 10)
      
      // Add page footer
      const pageSize = doc.internal.pageSize
      const pageHeight = pageSize.height
      doc.setFontSize(8)
      doc.text(`Halaman ${data.pageNumber}`, pageSize.width - 25, pageHeight - 10)
    }
  })
  
  // Generate filename with current date
  const currentDate = new Date()
  const filename = `GlowGla_Members_${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}.pdf`
  
  // Download file
  doc.save(filename)
  
  console.log(`PDF export completed successfully - ${allUsers.length} members exported (Advanced)`)
}

const exportToPDFSimple = async (allUsers: any[]) => {
  // Create new PDF document
  const doc = new jsPDF()
  
  // Add title
  doc.setFontSize(16)
  doc.text('Data Member GlowGla', 20, 20)
  
  // Add export date and summary
  const now = new Date()
  doc.setFontSize(10)
  doc.text(`Diekspor pada: ${now.toLocaleDateString('id-ID')} ${now.toLocaleTimeString('id-ID')}`, 20, 30)
  doc.text(`Total Member: ${allUsers.length}`, 20, 40)
  
  // Simple text-based export
  let yPosition = 60
  const pageHeight = doc.internal.pageSize.height
  
  // Headers
  doc.setFontSize(8)
  doc.text('No.', 20, yPosition)
  doc.text('Nama', 35, yPosition)
  doc.text('Email', 85, yPosition)
  doc.text('Status', 140, yPosition)
  doc.text('Konsultasi', 165, yPosition)
  doc.text('Bergabung', 190, yPosition)
  
  yPosition += 10
  
  // Data rows
  allUsers.forEach((user: any, index: number) => {
    if (yPosition > pageHeight - 20) {
      doc.addPage()
      yPosition = 30
      
      // Re-add headers on new page
      doc.text('No.', 20, yPosition)
      doc.text('Nama', 35, yPosition)
      doc.text('Email', 85, yPosition)
      doc.text('Status', 140, yPosition)
      doc.text('Konsultasi', 165, yPosition)
      doc.text('Bergabung', 190, yPosition)
      yPosition += 10
    }
    
    doc.text((index + 1).toString(), 20, yPosition)
    doc.text((user.name || '').substring(0, 20), 35, yPosition)
    doc.text((user.email || '').substring(0, 25), 85, yPosition)
    doc.text(user.is_premium ? 'Premium' : 'Free', 140, yPosition)
    doc.text((user.conversations_count || 0).toString(), 165, yPosition)
    doc.text(user.created_at ? formatDate(user.created_at) : '', 190, yPosition)
    
    yPosition += 8
  })
  
  // Generate filename with current date
  const currentDate = new Date()
  const filename = `GlowGla_Members_${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}.pdf`
  
  // Download file
  doc.save(filename)
  
  console.log(`PDF export completed successfully - ${allUsers.length} members exported (Simple)`)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

const formatDateShort = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

const formatPeakHour = (hour: number | string) => {
  if (hour === null || hour === undefined) return 'Belum tersedia'
  const hourNum = typeof hour === 'string' ? parseInt(hour) : hour
  if (hourNum >= 0 && hourNum < 6) return `${hourNum}:00 (Dini hari)`
  if (hourNum >= 6 && hourNum < 12) return `${hourNum}:00 (Pagi)`
  if (hourNum >= 12 && hourNum < 18) return `${hourNum}:00 (Siang)`
  if (hourNum >= 18 && hourNum < 24) return `${hourNum}:00 (Malam)`
  return `${hourNum}:00`
}

const getDailyAverage = () => {
  if (!chatStats.value?.messages_per_day || chatStats.value.messages_per_day.length === 0) {
    return '0'
  }
  const total = chatStats.value.messages_per_day.reduce(
    (sum: number, day: any) => sum + day.count,
    0,
  )
  const average = Math.round(total / chatStats.value.messages_per_day.length)
  return average.toString()
}

const getMostActiveUser = () => {
  if (!chatStats.value?.top_active_users || chatStats.value.top_active_users.length === 0) {
    return 'None'
  }
  return chatStats.value.top_active_users[0].messages_count.toString()
}

const getMostActiveDay = () => {
  if (!chatStats.value?.messages_per_day || chatStats.value.messages_per_day.length === 0) {
    return 'Belum ada data'
  }

  const mostActive = chatStats.value.messages_per_day.reduce((max: any, day: any) =>
    day.count > max.count ? day : max,
  )

  return `${mostActive.count} konsultasi`
}

const getPeakTimeMessage = () => {
  if (!chatStats.value?.peak_hour) {
    return 'Data sedang dikumpulkan'
  }
  return `${formatPeakHour(chatStats.value.peak_hour)} adalah waktu tersibuk`
}

const getEngagementLevel = () => {
  const totalMessages = chatStats.value?.total_messages_period || 0
  if (totalMessages > 100) return 'Sangat tinggi!'
  if (totalMessages > 50) return 'Baik sekali'
  if (totalMessages > 20) return 'Cukup aktif'
  return 'Mulai berkembang'
}

const getBarWidth = (count: number) => {
  if (!chatStats.value?.messages_per_day || chatStats.value.messages_per_day.length === 0) {
    return 0
  }

  const maxCount = Math.max(...chatStats.value.messages_per_day.map((day: any) => day.count))
  return maxCount === 0 ? 0 : Math.max(5, (count / maxCount) * 100)
}

const getRankBadgeColor = (index: number) => {
  switch (index) {
    case 0:
      return 'bg-gradient-to-r from-yellow-400 to-yellow-600' // Gold
    case 1:
      return 'bg-gradient-to-r from-gray-300 to-gray-500' // Silver
    case 2:
      return 'bg-gradient-to-r from-orange-400 to-orange-600' // Bronze
    default:
      return 'bg-gradient-to-r from-purple-400 to-purple-600'
  }
}

const getTrophyIconName = (index: number) => {
  switch (index) {
    case 0:
      return 'md-emojievents'
    case 1:
      return 'md-emojievents'  
    case 2:
      return 'md-emojievents'
    default:
      return 'md-star'
  }
}

const getTrophyIconColor = (index: number) => {
  switch (index) {
    case 0:
      return 'text-yellow-400'
    case 1:
      return 'text-gray-400'
    case 2:
      return 'text-orange-400'
    default:
      return 'text-purple-400'
  }
}

// Rating Methods
const loadRatingStats = async () => {
  try {
    const response = await ratingService.getAdminRatingStats()
    ratingStats.value = response.stats
  } catch (error) {
    console.error('Failed to load rating stats:', error)
    // Set default empty stats to prevent errors
    ratingStats.value = {
      average_rating: 0,
      total_ratings: 0,
      ratings_with_feedback: 0,
      distribution: {}
    }
  }
}

const loadRatings = async (page = 1) => {
  try {
    ratingsLoading.value = true
    const params: any = {
      page,
      per_page: 15
    }

    if (ratingFilter.value.rating) {
      params.rating = ratingFilter.value.rating
    }

    const response = await ratingService.getAdminRatings(params)
    ratings.value = response.ratings.data
    ratingsPagination.value = response.ratings
  } catch (error) {
    console.error('Failed to load ratings:', error)
  } finally {
    ratingsLoading.value = false
  }
}

const getRatingPercentage = (star: number) => {
  if (!ratingStats.value || !ratingStats.value.distribution) {
    return 0
  }

  const starCount = ratingStats.value.distribution[star] || 0
  const totalCount = ratingStats.value.total_ratings || 0
  
  if (totalCount === 0) {
    return 0
  }
  
  return Math.round((starCount / totalCount) * 100)
}

const getRatingPaginationPages = () => {
  if (!ratingsPagination.value) return []
  const pages = []
  const current = ratingsPagination.value.current_page
  const last = ratingsPagination.value.last_page

  // Always show first page
  if (current > 3) {
    pages.push(1)
    if (current > 4) pages.push('...')
  }

  // Show pages around current
  for (let i = Math.max(1, current - 2); i <= Math.min(last, current + 2); i++) {
    pages.push(i)
  }

  // Always show last page
  if (current < last - 2) {
    if (current < last - 3) pages.push('...')
    pages.push(last)
  }

  return pages.filter((page, index, array) => array.indexOf(page) === index)
}

// Lifecycle
onMounted(async () => {
  // Auth check is already handled by router guard, so just load data
  await loadDashboardStats()
  await loadUsers()
  await loadChatStats()
  await loadRatingStats()
  await loadRatings()
})
</script>
