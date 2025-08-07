# 💄✨ Beauty AI Assistant - Frontend

> **Asisten Kecantikan AI yang Cantik & Cerdas**  
> _Your Personal Beauty Consultant powered by Google Gemini AI_

[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

---

## 🌟 **Tentang Beauty AI Assistant**

**Beauty AI Assistant** adalah aplikasi chatbot kecantikan yang revolusioner, dirancang khusus untuk memberikan konsultasi kecantikan personal yang dipersonalisasi menggunakan kekuatan AI Google Gemini. Dari tips makeup hingga perawatan kulit, dari skincare routine hingga beauty treatments - dapatkan semua yang Anda butuhkan untuk tampil cantik dan percaya diri!

### ✨ **Fitur Unggulan**

🎭 **Konsultasi Kecantikan AI** - Dapatkan saran makeup & skincare personal  
👑 **Sistem Premium** - Akses unlimited untuk member premium  
📊 **Dashboard Analytics** - Lacak progress kecantikan Anda  
🔐 **User Management** - Profile lengkap dengan avatar upload  
📱 **Responsive Design** - Tampil cantik di semua device  
🌈 **Beautiful UI/UX** - Interface dengan gradient cantik & animasi smooth  
🔒 **Secure Authentication** - Login aman dengan token JWT  
👥 **Admin Dashboard** - Kelola pengguna & statistik platform

---

## 🚀 **Quick Start Guide**

### 📋 **Prerequisites**

Pastikan Anda sudah menginstall:

- **Node.js** (v16.0 atau lebih tinggi) - [Download di sini](https://nodejs.org/)
- **npm** atau **yarn** (sudah termasuk dengan Node.js)
- **Git** - [Download di sini](https://git-scm.com/)

### 🛠️ **Installation & Setup**

#### **Step 1: Clone Repository**

```bash
# Clone project ini
git clone <repository-url>
cd fullstack-chatbot/frontend-vue

# Atau jika Anda sudah memiliki project ini:
cd path/to/your/frontend-vue
```

#### **Step 2: Install Dependencies**

```bash
# Install semua package yang diperlukan
npm install

# Atau menggunakan yarn:
yarn install
```

#### **Step 3: Environment Configuration**

```bash
# Copy file environment (jika ada)
cp .env.example .env

# Edit file .env sesuai kebutuhan
# Pastikan API endpoint Laravel sudah benar
```

#### **Step 4: Backend Setup (Laravel)**

Pastikan backend Laravel sudah running terlebih dahulu:

```bash
# Di folder backend-laravel
cd ../backend-laravel
composer install
php artisan serve
```

#### **Step 5: Start Development Server**

```bash
# Kembali ke folder frontend
cd ../frontend-vue

# Jalankan development server
npm run dev
```

🎉 **Selamat!** Aplikasi sudah running di `http://localhost:5173`

---

## 💻 **Development Commands**

### 🔧 **Available Scripts**

```bash
# 🚀 Development dengan hot-reload
npm run dev

# 🏗️ Build untuk production
npm run build

# 🧪 Jalankan unit tests
npm run test:unit

# 🔍 Type checking
npm run type-check

# 🎯 End-to-end testing (development)
npm run test:e2e:dev

# 🏭 End-to-end testing (production)
npm run build
npm run test:e2e

# 🧹 Lint & format code
npm run lint
```

---

## 📁 **Project Structure**

```
frontend-vue/
├── 📁 src/
│   ├── 📁 components/          # Reusable Vue components
│   │   ├── PromptLimitModal.vue
│   │   └── ...
│   ├── 📁 views/               # Page components
│   │   ├── ChatView.vue        # 💬 Main chat interface
│   │   ├── DashboardView.vue   # 📊 User dashboard
│   │   ├── AdminView.vue       # 👑 Admin panel
│   │   ├── ProfileView.vue     # 👤 User profile
│   │   └── AuthView.vue        # 🔐 Login/Register
│   ├── 📁 stores/              # Pinia state management
│   │   ├── auth.ts             # Authentication store
│   │   ├── chat.ts             # Chat functionality
│   │   └── stats.ts            # Statistics store
│   ├── 📁 services/            # API services
│   │   ├── api.ts              # Base API service
│   │   ├── chat.ts             # Chat API calls
│   │   └── auth.ts             # Auth API calls
│   ├── 📁 composables/         # Vue composables
│   ├── 📁 types/               # TypeScript type definitions
│   └── 📁 utils/               # Utility functions
├── 📁 public/                  # Static assets
└── 📄 package.json             # Dependencies & scripts
```

---

## 🎨 **Technology Stack**

### **Frontend Core**

- **Vue.js 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning fast build tool
- **Vue Router** - Client-side routing
- **Pinia** - State management

### **UI & Styling**

- **Tailwind CSS** - Utility-first CSS framework
- **CSS Gradients** - Beautiful color transitions
- **CSS Animations** - Smooth interactions
- **Responsive Design** - Mobile-first approach

### **Features & Integrations**

- **Chart.js** - Data visualization
- **Axios** - HTTP client
- **JWT Authentication** - Secure login
- **File Upload** - Avatar management
- **Real-time Chat** - AI conversation

---

## 🌈 **Design Features**

### **Beautiful UI Elements**

- 🎨 **Gradient Backgrounds** - Pink to purple beauty theme
- ✨ **Glass Morphism** - Modern frosted glass effects
- 🔄 **Smooth Animations** - Hover effects & transitions
- 📱 **Responsive Layout** - Perfect on all screen sizes
- 🌟 **Beauty Icons** - Makeup & skincare themed icons

### **User Experience**

- 🚀 **Fast Loading** - Optimized performance
- 💫 **Intuitive Navigation** - Easy to use interface
- 🎯 **Clear Feedback** - Loading states & error handling
- 🔔 **Smart Notifications** - Real-time updates
- 💄 **Beauty-Focused** - Designed for beauty enthusiasts

---

## 🛡️ **Security Features**

- 🔐 **JWT Authentication** - Secure token-based auth
- 🛡️ **Protected Routes** - Route guards
- 🔒 **Input Validation** - XSS protection
- 👤 **User Permissions** - Role-based access
- 🔑 **Password Security** - Secure password handling

---

## 📱 **Browser Support**

- ✅ **Chrome** (recommended)
- ✅ **Firefox**
- ✅ **Safari**
- ✅ **Edge**
- ✅ **Mobile browsers**

---

## 🤝 **Contributing**

Kami menyambut kontribusi! Berikut cara berkontribusi:

1. **Fork** repository ini
2. **Create** feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** ke branch (`git push origin feature/amazing-feature`)
5. **Open** Pull Request

---

## 📝 **License**

Project ini dibuat untuk tujuan edukasi dan portfolio.

---

## 💖 **Credits**

Dibuat dengan ❤️ menggunakan:

- **Vue.js** & **TypeScript**
- **Google Gemini AI**
- **Laravel Backend**
- **Tailwind CSS**
- **Modern Web Technologies**

---

**✨ Happy Coding & Stay Beautiful! 💄**
