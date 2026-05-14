# BlogApp — Modern Blogging Platform

A production-grade blog application built with Next.js 15+, Redux Toolkit, Redux-Saga, and Tailwind CSS.

## 🚀 Live Demo
[https://nextjs-blog-assignment.vercel.app](https://nextjs-blog-assignment.vercel.app)

## ✨ Features
- **Next.js App Router**: Optimized for performance and SEO.
- **State Management**: Redux Toolkit for global state and Redux-Saga for side effects.
- **Authentication**: JWT-based login/logout with route protection.
- **Caching**: Advanced localStorage caching with 1-hour expiry and manual invalidation.
- **Performance**: Dynamic imports, memoization, and streaming SSR.
- **SEO Optimized**: Dynamic metadata, OpenGraph tags, JSON-LD, Robots.txt, and Sitemap.
- **Responsive Design**: Mobile-first UI with Dark Mode support.
- **Interactive Blog**: Search with debounce, pagination, and comments.

## 🛠️ Tech Stack
- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript
- **State**: Redux Toolkit & Redux-Saga
- **Styling**: Tailwind CSS
- **API Client**: Axios
- **Theme**: next-themes
- **Notification**: react-hot-toast

## 📁 Project Structure
```text
src/
├── app/              # App Router pages and layouts
├── components/       # Reusable UI components
│   ├── auth/         # Auth forms
│   ├── blog/         # Blog specific components
│   └── common/       # Global UI elements
├── hooks/            # Custom React hooks
├── lib/              # API services and axios config
├── store/            # Redux setup (slices, sagas, selectors)
└── utils/            # Helpers and constants
```

## ⚙️ Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone https://github.com/adrsy6394/Blog-Application.git
   cd my-nextjs-blog
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment**:
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```

## 🔑 Test Credentials
- **Username**: `emilys`
- **Password**: `emilyspass`

## 🧠 Key Implementation Decisions
- **Hybrid Rendering**: Used SSR for the blog list to ensure fresh content, SSG for blog details to maximize speed, and ISR for periodic updates.
- **Middleware Protection**: Implemented Edge-runtime middleware to protect `/dashboard` routes, ensuring zero-latency redirection.
- **Saga Caching**: Integrated caching logic directly into Redux Sagas to minimize API load while keeping UI state in sync.

## 📄 License
MIT
