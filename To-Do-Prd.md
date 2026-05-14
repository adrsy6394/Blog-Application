# 📋 TO-Do PRD — Next.js Redux-Saga Blog Assignment
> **Full Name:** _____________  
> **Assignment:** Next.js 14/15 + Redux Toolkit + Redux-Saga Blog App  
> **API Base:** https://dummyjson.com  
> **Test Credentials:** Username: `emilys` | Password: `emilyspass`

---

## 🗂️ TABLE OF CONTENTS

1. [Project Setup & Configuration](#module-1)
2. [Folder Structure & Base Files](#module-2)
3. [Redux Store Setup](#module-3)
4. [API Layer (Axios + Services)](#module-4)
5. [Auth — Slice + Saga + Forms](#module-5)
6. [Posts — Slice + Saga + Pages](#module-6)
7. [Comments — Slice + Saga + UI](#module-7)
8. [UI Slice + Global Components](#module-8)
9. [Pages & Routing](#module-9)
10. [Route Protection (Middleware)](#module-10)
11. [SSR / SSG / ISR](#module-11)
12. [Local Storage Caching](#module-12)
13. [SEO & Metadata](#module-13)
14. [Performance Optimization](#module-14)
15. [Bonus Features](#module-15)
16. [Deployment & README](#module-16)

---

## ✅ MASTER CHECKLIST

### Step 1 — Core Application
- [ ] Next.js 14/15 project with TypeScript initialized
- [ ] Tailwind CSS configured
- [ ] App Router used
- [ ] Home page `/`
- [ ] About page `/about`
- [ ] Contact page `/contact` (UI only)
- [ ] Blog List page `/blog` with pagination
- [ ] Blog Detail page `/blog/[id]`
- [ ] Login page `/login`
- [ ] Signup page `/signup`
- [ ] Dashboard page `/dashboard` (protected)
- [ ] Navbar component
- [ ] Button component
- [ ] Card component
- [ ] Loader/Spinner component
- [ ] Error message component
- [ ] Pagination component
- [ ] next/image used
- [ ] next/font used
- [ ] Metadata API (SEO)
- [ ] Open Graph tags
- [ ] JSON-LD structured data
- [ ] Local Storage caching (with 1-hour expiry)
- [ ] Offline functionality for cached pages

### Step 2 — Redux + Saga
- [ ] Redux store configured with Redux Toolkit
- [ ] authSlice
- [ ] postsSlice
- [ ] commentsSlice
- [ ] uiSlice
- [ ] Auth Sagas (login, logout, token persist)
- [ ] Posts Sagas (fetch all, fetch one, create, update, delete)
- [ ] Comments Sagas (fetch, add)
- [ ] Saga effects used: `takeLatest`, `call`, `put`, `select`, `fork`
- [ ] Error handling in all sagas
- [ ] Loading/Success/Error states in UI
- [ ] Redux DevTools integrated

### Step 3 — Advanced
- [ ] Login/Signup with validation
- [ ] JWT stored in localStorage
- [ ] Axios interceptors for token injection
- [ ] Auto-logout on token expiry
- [ ] Next.js middleware for route protection
- [ ] User info in Navbar
- [ ] Auth state persisted on refresh
- [ ] Dashboard shows "Hello Admin"
- [ ] Dynamic imports (`next/dynamic`)
- [ ] React.memo / useMemo / useCallback used
- [ ] Reselect for optimized selectors
- [ ] Streaming SSR (App Router)

### Bonus
- [ ] Search functionality
- [ ] Dark mode (next-themes)
- [ ] Toast notifications
- [ ] Skeleton loaders
- [ ] Responsive design (mobile/tablet/desktop)
- [ ] User profile page
- [ ] Infinite scroll
- [ ] loading.tsx, error.tsx, not-found.tsx files

---

## MODULE 1 — Project Setup & Configuration {#module-1}

### ✅ To-Do
- [x] Initialize Next.js 14/15 with TypeScript
- [x] Install all dependencies
- [x] Configure Tailwind CSS
- [x] Set up `.env.local`
- [x] Configure `next.config.js`
- [x] Configure `tsconfig.json`

### 📦 Dependencies to Install
```bash
# Core
npx create-next-app@latest my-nextjs-blog --typescript --tailwind --app --eslint

# Redux
npm install @reduxjs/toolkit react-redux redux-saga

# HTTP
npm install axios

# Selectors
npm install reselect

# Themes
npm install next-themes

# Toast
npm install react-hot-toast
# OR
npm install react-toastify

# Types
npm install --save-dev @types/node
```

### 🤖 AI PROMPT — Module 1
```
I am building a Next.js 14 blog application using App Router, TypeScript, Tailwind CSS, Redux Toolkit, and Redux-Saga.

Please generate the following configuration files:

1. `next.config.js` — with:
   - Image optimization config allowing dummyjson.com images
   - No strict mode issues with Redux

2. `tailwind.config.ts` — with:
   - Dark mode set to 'class'
   - Extended theme with custom colors and font families

3. `.env.local` — with:
   - NEXT_PUBLIC_API_BASE_URL=https://dummyjson.com

4. `tsconfig.json` — with:
   - Path aliases: @/components, @/store, @/lib, @/utils, @/hooks

Make sure TypeScript strict mode is enabled.
```

---

## MODULE 2 — Folder Structure & Base Files {#module-2}

### ✅ To-Do
- [x] Create all folders as per recommended structure
- [x] Create `app/layout.tsx` with providers
- [x] Create `app/providers.tsx` (Redux Provider + ThemeProvider)
- [x] Create `app/globals.css`
- [x] Create `app/loading.tsx`
- [x] Create `app/error.tsx`
- [x] Create `app/not-found.tsx`

### 🤖 AI PROMPT — Module 2
```
I am using Next.js 14 with App Router and TypeScript.

Please create the following base files:

1. `app/providers.tsx` — A client component that wraps children with:
   - Redux Provider (store imported from @/store)
   - ThemeProvider from next-themes with attribute="class" and defaultTheme="system"

2. `app/layout.tsx` — Root layout with:
   - Import next/font (use Geist or any modern Google Font)
   - Wrap with Providers component
   - Include Navbar
   - Add metadata export with title template and default description
   - Support dark mode with class-based theming

3. `app/loading.tsx` — A centered full-page spinner with Tailwind CSS

4. `app/error.tsx` — A "use client" error boundary component showing:
   - Error message
   - A retry button that calls reset()

5. `app/not-found.tsx` — A 404 page with:
   - "Page not found" message
   - Link back to home

Use Tailwind CSS for all styling. Keep it clean and production-grade.
```

---

## MODULE 3 — Redux Store Setup {#module-3}

### ✅ To-Do
- [x] Create `store/index.ts` (store config + types)
- [x] Create `store/slices/authSlice.ts`
- [x] Create `store/slices/postsSlice.ts`
- [x] Create `store/slices/commentsSlice.ts`
- [x] Create `store/slices/uiSlice.ts`
- [x] Create `store/sagas/index.ts` (root saga)
- [x] Create `store/selectors/authSelectors.ts`
- [x] Create `store/selectors/postsSelectors.ts`

### 🤖 AI PROMPT — Module 3A: Store Config
```
Create the Redux store configuration for a Next.js 14 TypeScript project using Redux Toolkit and Redux-Saga.

File: `store/index.ts`

Requirements:
- Configure store with Redux Toolkit's configureStore
- Integrate redux-saga middleware using createSagaMiddleware
- Export RootState and AppDispatch types
- Export typed useAppDispatch and useAppSelector hooks
- Import and run the root saga
- Enable Redux DevTools (automatically handled by configureStore)

Slices to include (just import stubs for now):
- authSlice
- postsSlice
- commentsSlice
- uiSlice

Also create `store/sagas/index.ts` as a root saga that forks all child sagas (authSaga, postsSaga, commentsSaga) using `all([])` pattern.
```

### 🤖 AI PROMPT — Module 3B: All Slices
```
Create all four Redux slices for a Next.js 14 blog app using Redux Toolkit with TypeScript.

1. `store/slices/authSlice.ts`
State shape:
{
  user: { id, username, email, firstName, lastName, image, token } | null,
  isAuthenticated: boolean,
  isLoading: boolean,
  error: string | null
}
Actions: setLoading, setUser, setError, logout, clearError

2. `store/slices/postsSlice.ts`
State shape:
{
  posts: Post[],
  currentPost: Post | null,
  totalPosts: number,
  currentPage: number,
  postsPerPage: number,
  isLoading: boolean,
  error: string | null
}
Post type: { id, title, body, userId, tags, reactions, views }
Actions: setLoading, setPosts, setCurrentPost, setError, setPage, addPost, updatePost, removePost

3. `store/slices/commentsSlice.ts`
State shape:
{
  comments: Comment[],
  isLoading: boolean,
  error: string | null
}
Comment type: { id, body, postId, user: { id, username } }
Actions: setLoading, setComments, addComment, setError

4. `store/slices/uiSlice.ts`
State shape:
{
  isDarkMode: boolean,
  notifications: { id, message, type: 'success'|'error'|'info' }[],
  isModalOpen: boolean,
  modalContent: string | null
}
Actions: toggleDarkMode, addNotification, removeNotification, openModal, closeModal

Include proper TypeScript interfaces for all state shapes and action payloads.
```

### 🤖 AI PROMPT — Module 3C: Selectors
```
Create Reselect-based memoized selectors for the Redux store.

File 1: `store/selectors/authSelectors.ts`
- selectUser — returns user object
- selectIsAuthenticated — returns boolean
- selectAuthLoading — returns loading state
- selectAuthError — returns error string

File 2: `store/selectors/postsSelectors.ts`
- selectAllPosts — returns posts array
- selectCurrentPost — returns single post
- selectPostsLoading — returns loading state
- selectTotalPosts — returns total count
- selectCurrentPage — returns current page
- selectPaginatedInfo — memoized selector combining page + total + perPage

Use createSelector from reselect. Import RootState from @/store.
TypeScript strict types required.
```

---

## MODULE 4 — API Layer {#module-4}

### ✅ To-Do
- [x] Create `lib/api.ts` — Axios instance with interceptors
- [x] Create `lib/authService.ts`
- [x] Create `lib/postsService.ts`
- [x] Create `lib/commentsService.ts`
- [x] Create `utils/constants.ts`
- [x] Create `utils/helpers.ts`
- [x] Create `utils/validators.ts`

### 🤖 AI PROMPT — Module 4A: Axios Instance
```
Create an Axios instance for a Next.js 14 blog app using TypeScript.

File: `lib/api.ts`

Requirements:
- Base URL: process.env.NEXT_PUBLIC_API_BASE_URL (dummyjson.com)
- Request interceptor:
  - Read JWT token from localStorage (key: 'auth_token')
  - Add Authorization: 'Bearer {token}' header if token exists
- Response interceptor:
  - On 401 error: clear localStorage 'auth_token' and redirect to /login
  - On other errors: pass through the error
- Export the axios instance as default

Note: Handle SSR safely — only access localStorage on client side (check typeof window !== 'undefined').
```

### 🤖 AI PROMPT — Module 4B: Services
```
Create three service files for a Next.js blog app using the custom Axios instance from @/lib/api.

All functions should be async and typed with TypeScript.

1. `lib/authService.ts`
- loginUser(username: string, password: string) — POST /auth/login
- getCurrentUser() — GET /auth/me

2. `lib/postsService.ts`
- getAllPosts(limit: number, skip: number) — GET /posts?limit=&skip=
- getPostById(id: number) — GET /posts/{id}
- searchPosts(query: string) — GET /posts/search?q=
- createPost(data: CreatePostDto) — POST /posts/add
- updatePost(id: number, data: UpdatePostDto) — PUT /posts/{id}
- deletePost(id: number) — DELETE /posts/{id}
- getPostsByUser(userId: number) — GET /posts/user/{userId}

3. `lib/commentsService.ts`
- getCommentsByPost(postId: number) — GET /posts/{postId}/comments
- getAllComments() — GET /comments

Include proper TypeScript return types using response interfaces that match DummyJSON API responses.
```

### 🤖 AI PROMPT — Module 4C: Utils
```
Create utility files for the Next.js blog app.

1. `utils/constants.ts`
- POSTS_PER_PAGE = 9
- CACHE_EXPIRY_MS = 3600000 (1 hour)
- CACHE_KEYS object with keys for posts, auth, etc.
- AUTH_TOKEN_KEY = 'auth_token'
- CACHE_PREFIX = 'blog_cache_'

2. `utils/helpers.ts`
- formatDate(dateString: string): string — readable date format
- truncateText(text: string, maxLength: number): string
- generateCacheKey(key: string): string — prefixes with CACHE_PREFIX
- setCacheItem(key: string, data: unknown): void — saves to localStorage with timestamp
- getCacheItem<T>(key: string): T | null — returns null if expired or not found
- clearCacheItem(key: string): void
- isTokenExpired(token: string): boolean — decode JWT exp field

3. `utils/validators.ts`
- validateEmail(email: string): string | null — returns error or null
- validatePassword(password: string): string | null — min 6 chars
- validateUsername(username: string): string | null — min 3 chars
- validateRequired(value: string, fieldName: string): string | null
```

---

## MODULE 5 — Authentication {#module-5}

### ✅ To-Do
- [x] Create `store/sagas/authSaga.ts`
- [x] Create `components/auth/LoginForm/index.tsx`
- [x] Create `components/auth/SignupForm/index.tsx`
- [x] Create `app/login/page.tsx`
- [x] Create `app/signup/page.tsx`
- [x] Create `hooks/useAuth.ts`

### 🤖 AI PROMPT — Module 5A: Auth Saga
```
Create the Redux-Saga for authentication in a Next.js 14 TypeScript blog app.

File: `store/sagas/authSaga.ts`

Using DummyJSON API (https://dummyjson.com/auth/login).

Sagas to implement:

1. loginSaga(action: PayloadAction<{username, password}>)
   - Call authService.loginUser(username, password)
   - On success: 
     - Dispatch setUser action with user data + token
     - Save token to localStorage using AUTH_TOKEN_KEY constant
     - Save user to cache using setCacheItem
     - Dispatch addNotification({message: 'Login successful', type: 'success'})
     - Redirect to /dashboard using router (use window.location.href)
   - On error: Dispatch setError with error message

2. logoutSaga()
   - Clear localStorage token
   - Clear user cache
   - Dispatch logout action from authSlice
   - Dispatch addNotification({message: 'Logged out', type: 'info'})
   - Redirect to /login

3. loadUserFromStorageSaga()
   - Check localStorage for token on app start
   - If token exists and not expired (use isTokenExpired helper), fetch current user
   - Call authService.getCurrentUser()
   - On success: Dispatch setUser
   - On error: Clear token

4. watchAuthSaga() — root watcher using takeLatest for:
   - 'auth/loginRequest' → loginSaga
   - 'auth/logoutRequest' → logoutSaga  
   - 'auth/loadUser' → loadUserFromStorageSaga

Use effects: takeLatest, call, put, select
Add proper error handling with try/catch in each saga.

Also add these action creators to authSlice.ts:
- loginRequest(payload: {username, password})
- logoutRequest()
- loadUser()
```

### 🤖 AI PROMPT — Module 5B: Login & Signup Forms
```
Create authentication form components for a Next.js 14 TypeScript app using Tailwind CSS and Redux.

1. `components/auth/LoginForm/index.tsx`
- "use client" component
- Form fields: username, password
- Show/hide password toggle
- Validation using validators.ts (validateRequired, validatePassword)
- Show field-level error messages inline
- On submit: dispatch loginRequest action from authSlice
- Show loading spinner on isLoading state
- Show global error from Redux store
- Link to /signup at the bottom

2. `components/auth/SignupForm/index.tsx`
- "use client" component  
- Form fields: firstName, lastName, username, email, password, confirmPassword
- Client-side validation only (no signup API — show success toast and redirect to /login)
- Validate all fields on submit
- Show field-level error messages
- On valid submit: dispatch addNotification success + redirect to /login

3. `app/login/page.tsx`
- Export metadata: title "Login | BlogApp"
- Center the LoginForm on page with a nice layout
- Include the blog logo/name at top

4. `app/signup/page.tsx`
- Export metadata: title "Sign Up | BlogApp"
- Center the SignupForm on page

Use useAppDispatch and useAppSelector from @/store. 
Use Tailwind CSS. Clean, modern auth page design.
```

### 🤖 AI PROMPT — Module 5C: useAuth Hook
```
Create a custom React hook for authentication.

File: `hooks/useAuth.ts`

This hook should:
- Use useAppSelector to get: user, isAuthenticated, isLoading, error
- Use useAppDispatch
- Return:
  - user
  - isAuthenticated
  - isLoading
  - error
  - login(username: string, password: string) — dispatches loginRequest
  - logout() — dispatches logoutRequest
  - clearError() — dispatches clearError action

Use proper TypeScript types. Import from @/store and @/store/slices/authSlice.
```

---

## MODULE 6 — Posts {#module-6}

### ✅ To-Do
- [x] Create `store/sagas/postsSaga.ts`
- [x] Create `components/blog/PostCard/index.tsx`
- [x] Create `components/blog/PostList/index.tsx`
- [x] Create `components/blog/PostDetail/index.tsx`
- [x] Create `components/common/Pagination/index.tsx`
- [x] Create `app/blog/page.tsx`
- [x] Create `app/blog/[id]/page.tsx`
- [x] Create `app/blog/loading.tsx`
- [x] Create `app/blog/error.tsx`

### 🤖 AI PROMPT — Module 6A: Posts Saga
```
Create the Redux-Saga for blog posts in a Next.js 14 TypeScript app.

File: `store/sagas/postsSaga.ts`

Sagas to implement:

1. fetchAllPostsSaga(action: PayloadAction<{page: number}>)
   - Calculate skip = (page - 1) * POSTS_PER_PAGE
   - Check localStorage cache first using getCacheItem
   - If cache hit: dispatch setPosts with cached data
   - If cache miss: call postsService.getAllPosts(POSTS_PER_PAGE, skip)
   - On success: dispatch setPosts, cache the result with setCacheItem
   - On error: dispatch setError

2. fetchPostByIdSaga(action: PayloadAction<number>)
   - Check cache for single post
   - Call postsService.getPostById(id)
   - On success: dispatch setCurrentPost + cache it
   - On error: dispatch setError

3. createPostSaga(action: PayloadAction<CreatePostDto>)
   - Use select to get current user from auth state
   - Call postsService.createPost(data)
   - On success: dispatch addPost + addNotification('Post created!')
   - On error: dispatch setError

4. updatePostSaga(action: PayloadAction<{id, data}>)
   - Call postsService.updatePost(id, data)
   - On success: dispatch updatePost + addNotification
   - On error: dispatch setError

5. deletePostSaga(action: PayloadAction<number>)
   - Call postsService.deletePost(id)
   - On success: dispatch removePost + addNotification
   - On error: dispatch setError

6. searchPostsSaga(action: PayloadAction<string>)
   - Call postsService.searchPosts(query)
   - On success: dispatch setPosts with results
   - On error: dispatch setError

7. watchPostsSaga() — root watcher using takeLatest for all above

Add action creators to postsSlice: fetchPostsRequest, fetchPostRequest, createPostRequest, updatePostRequest, deletePostRequest, searchPostsRequest.

Use setLoading(true/false) before/after API calls.
```

### 🤖 AI PROMPT — Module 6B: Blog Components
```
Create blog UI components for a Next.js 14 TypeScript app with Tailwind CSS.

1. `components/blog/PostCard/index.tsx`
Props: post: Post (id, title, body, tags, reactions, views, userId)
- Display: title, truncated body (100 chars), tags as badges, reactions count, views
- Link to /blog/{id}
- Hover effect with subtle shadow/scale
- Clean card design with proper spacing

2. `components/blog/PostList/index.tsx`
Props: posts: Post[], isLoading: boolean
- If loading: show 6 skeleton cards (use Tailwind animate-pulse)
- If empty: show empty state message with icon
- Render grid of PostCard components (responsive: 1 col mobile, 2 tablet, 3 desktop)

3. `components/common/Pagination/index.tsx`
Props: currentPage, totalPages, onPageChange: (page: number) => void
- Show Previous/Next buttons
- Show page numbers (with ellipsis for many pages)
- Disable Previous on page 1, Next on last page
- Highlight current page

4. `components/common/Skeleton/index.tsx`
- PostCardSkeleton: animated placeholder matching PostCard dimensions
- PostDetailSkeleton: for single post loading

Use Tailwind CSS. Export all components. Add proper TypeScript props interfaces.
```

### 🤖 AI PROMPT — Module 6C: Blog Pages
```
Create blog pages for a Next.js 14 App Router TypeScript app.

1. `app/blog/page.tsx` — Blog List Page
- This is a Server Component
- Export dynamic metadata
- Use Suspense boundary with PostList inside
- Client component (BlogListClient) handles:
  - useAppSelector for posts, isLoading, error, currentPage, totalPosts
  - useAppDispatch to dispatch fetchPostsRequest on mount and page change
  - Search bar at top (dispatches searchPostsRequest)
  - PostList component
  - Pagination component at bottom
  - Calculate totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

2. `app/blog/[id]/page.tsx` — Blog Detail Page
- Server Component shell with dynamic params
- Export generateMetadata function using post title
- Client component (PostDetailClient) handles:
  - Fetch post by ID on mount
  - Display: title, full body, tags, reactions, views, author
  - CommentSection below post
- Include JSON-LD structured data for SEO

3. `app/blog/loading.tsx` — Blog loading skeleton

4. `app/blog/error.tsx` — Blog error boundary ("use client")

For metadata:
- Blog list: title "All Posts | BlogApp", description "Browse all blog posts"
- Blog detail: dynamic title from post.title

Use useAppDispatch, useAppSelector with typed selectors from @/store/selectors/postsSelectors.
```

---

## MODULE 7 — Comments {#module-7}

### ✅ To-Do
- [x] Create `store/sagas/commentsSaga.ts`
- [x] Create `components/blog/CommentSection/index.tsx`

### 🤖 AI PROMPT — Module 7
```
Create the Comments feature for a Next.js 14 TypeScript blog app.

1. `store/sagas/commentsSaga.ts`
Sagas:
- fetchCommentsSaga(action: PayloadAction<number>) — postId
  - Call commentsService.getCommentsByPost(postId)
  - Dispatch setComments on success
  - Dispatch setError on failure

- addCommentSaga(action: PayloadAction<{postId, body, userId}>)
  - Optimistically add to local state via addComment dispatch
  - Show success notification
  - (DummyJSON doesn't persist, so optimistic update is fine)

Watchers: watchCommentsSaga using takeLatest

Add action creators to commentsSlice: fetchCommentsRequest, addCommentRequest

2. `components/blog/CommentSection/index.tsx`
- "use client" component
- Props: postId: number
- On mount: dispatch fetchCommentsRequest(postId)
- Show comments list with:
  - User avatar (first letter of username)
  - Username + comment body
  - Loading skeleton while fetching
- Add comment form at top (only if isAuthenticated):
  - Textarea input
  - Submit button
  - On submit: dispatch addCommentRequest
- If not authenticated: show "Login to comment" message with link

Use useAppSelector for comments, isLoading. Use useAuth hook for isAuthenticated.
Tailwind CSS styling. Clean, readable comment thread design.
```

---

## MODULE 8 — UI Components & Global State {#module-8}

### ✅ To-Do
- [x] Create `components/common/Navbar/index.tsx`
- [x] Create `components/common/Button/index.tsx`
- [x] Create `components/common/Card/index.tsx`
- [x] Create `components/common/Loader/index.tsx`
- [x] Create `components/common/ErrorMessage/index.tsx`
- [x] Create `components/common/Toast/index.tsx`
- [x] Create `hooks/useLocalStorage.ts`

### 🤖 AI PROMPT — Module 8A: Navbar
```
Create a responsive Navbar for a Next.js 14 TypeScript blog app.

File: `components/common/Navbar/index.tsx`
"use client" component

Features:
- Logo/Brand name on left: "BlogApp" with link to /
- Navigation links: Home (/), Blog (/blog), About (/about), Contact (/contact)
- On desktop: horizontal nav links
- On mobile: hamburger menu with slide-down drawer
- Auth state from useAuth hook:
  - If NOT authenticated: Show "Login" and "Sign Up" buttons
  - If authenticated: Show user avatar (first letter of name), username, and "Logout" button
- Dark mode toggle button (sun/moon icon) using next-themes useTheme
- Active link highlight using Next.js usePathname

Styling: Tailwind CSS, sticky top-0 with backdrop blur.
Support both light and dark themes.
```

### 🤖 AI PROMPT — Module 8B: Common Components
```
Create reusable common components for a Next.js 14 TypeScript app.

1. `components/common/Button/index.tsx`
Props: variant ('primary'|'secondary'|'danger'|'ghost'), size ('sm'|'md'|'lg'), isLoading, disabled, onClick, children, type, className
- Loading state shows spinner inside button
- Tailwind CVA-style variants (just use conditional classes)
- Full TypeScript props with ButtonHTMLAttributes extension

2. `components/common/Card/index.tsx`
Props: children, className, padding ('none'|'sm'|'md'|'lg'), hoverable
- Base card with white/dark background, border, rounded corners, shadow
- hoverable prop adds hover:shadow-lg transition

3. `components/common/Loader/index.tsx`
Props: size ('sm'|'md'|'lg'|'full'), text?: string
- Circular spinner using Tailwind animate-spin
- 'full' size centers in full viewport
- Optional loading text below spinner

4. `components/common/ErrorMessage/index.tsx`
Props: message: string, onRetry?: () => void
- Show error icon + message
- Optional retry button
- Red/danger color scheme

5. `hooks/useLocalStorage.ts`
Generic hook: useLocalStorage<T>(key: string, initialValue: T)
Returns [storedValue, setValue, removeValue]
Handles SSR safely (typeof window check)
```

### 🤖 AI PROMPT — Module 8C: Toast Notifications
```
Create a toast notification system for a Next.js 14 TypeScript Redux app.

1. Update `store/slices/uiSlice.ts` (or create separately):
- notifications state: Array<{id: string, message: string, type: 'success'|'error'|'info'|'warning'}>
- addNotification action: auto-generates id using Date.now()
- removeNotification action: removes by id

2. `components/common/Toast/index.tsx`
- "use client" component
- useAppSelector to get notifications from uiSlice
- Render notifications as fixed bottom-right stack
- Each toast: icon (✓/✗/ℹ), message, close button, auto-dismiss after 4 seconds
- Animate in/out with Tailwind transitions
- Color coded: green success, red error, blue info, yellow warning

3. Add <Toast /> to `app/layout.tsx` inside Providers

Use useEffect with setTimeout for auto-dismiss.
Dispatch removeNotification on close or auto-dismiss.
```

---

## MODULE 9 — All Pages {#module-9}

### ✅ To-Do
- [x] `app/page.tsx` — Home page
- [x] `app/about/page.tsx` — About page
- [x] `app/contact/page.tsx` — Contact page (UI only)
- [x] `app/dashboard/page.tsx` — Admin dashboard (protected)

### 🤖 AI PROMPT — Module 9
```
Create the remaining pages for a Next.js 14 App Router blog app.

1. `app/page.tsx` — Home Page
- Export metadata: title "BlogApp — Modern Blogging Platform"
- Hero section: headline, subheading, CTA button to /blog
- Featured posts section: fetch 6 latest posts (server-side with fetch + revalidate)
- Display as PostCard grid
- "View all posts" link to /blog
- Use next/image for hero illustration (placeholder from picsum.photos)

2. `app/about/page.tsx` — About Page
- Export metadata: title "About | BlogApp"
- Static page (SSG)
- Sections: About the blog, Tech stack used, Mission statement
- Use next/image for author avatar

3. `app/contact/page.tsx` — Contact Page
- Export metadata: title "Contact | BlogApp"
- Contact form with fields: Name, Email, Subject, Message
- Client-side validation
- On submit: show success toast notification (no backend, just UI)
- Also show contact info: email, social links

4. `app/dashboard/page.tsx` — Dashboard
- "use client" or Server Component (route protection handled by middleware)
- Get user from useAuth hook
- Show: "Hello, {user.firstName}! Welcome to Admin Dashboard"
- Show user details card: avatar, name, email, username
- Quick stats: placeholder cards (Total Posts, Comments, Views)
- List of posts by current user (fetch on mount using getPostsByUser)

All pages: export proper metadata, use Tailwind CSS, responsive design.
```

---

## MODULE 10 — Route Protection {#module-10}

### ✅ To-Do
- [x] Create `middleware.ts`
- [x] Test protected routes work

### 🤖 AI PROMPT — Module 10
```
Create Next.js middleware for route protection in a Next.js 14 App Router TypeScript app.

File: `middleware.ts` (in project root)

Requirements:
- Protected routes: /dashboard and any route starting with /dashboard
- If accessing a protected route without auth_token in cookies OR localStorage:
  - Redirect to /login?redirect={original_path}
- If accessing /login or /signup while authenticated:
  - Redirect to /dashboard

Important: Next.js middleware runs on Edge Runtime, so localStorage is NOT available.
Solution: 
- On login, also store the token in a cookie (httpOnly: false so middleware can read it)
- In middleware, read the cookie named 'auth_token'

Update `store/sagas/authSaga.ts` to also:
- Set cookie on login: document.cookie = `auth_token={token}; path=/; max-age=3600`
- Clear cookie on logout: document.cookie = `auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`

The middleware should:
- Match paths: ['/dashboard/:path*']
- Read NextRequest cookies
- Redirect using NextResponse.redirect if no valid token found

Export a config with matcher for protected paths.
```

---

## MODULE 11 — SSR / SSG / ISR {#module-11}

### ✅ To-Do
- [x] Blog list uses SSR (dynamic)
- [x] Blog detail uses SSG with generateStaticParams
- [x] About page is static (SSG)
- [x] Implement ISR for blog posts (revalidate: 3600)

### 🤖 AI PROMPT — Module 11
```
Implement proper Next.js rendering strategies in a Next.js 14 App Router TypeScript app.

1. Blog List Page SSR (`app/blog/page.tsx`):
- Mark as dynamic: export const dynamic = 'force-dynamic'
- Server Component fetches initial posts via fetch() with no-cache
- Pass initialData to client component to hydrate Redux store on first render

2. Blog Detail Page SSG + ISR (`app/blog/[id]/page.tsx`):
- Implement generateStaticParams:
  - Fetch all post IDs from https://dummyjson.com/posts?limit=100&skip=0
  - Return array of {id: string} params for top 30 posts
- Use revalidate = 3600 for ISR:
  export const revalidate = 3600
- fetch() for post data with next: { revalidate: 3600 }

3. About Page SSG:
- No dynamic data, will be statically generated automatically

4. Home Page with revalidate:
- Fetch featured posts with: fetch(url, { next: { revalidate: 1800 } })

5. JSON-LD for Blog Detail:
- Add structured data script tag in blog/[id]/page.tsx:
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.body.substring(0, 200),
    author: { '@type': 'Person', name: post.userId }
  }

Show the complete implementation for all files.
```

---

## MODULE 12 — Local Storage Caching {#module-12}

### ✅ To-Do
- [x] Cache all fetched posts with 1-hour expiry
- [x] Cache single post data
- [x] Cache auth user data
- [x] Serve from cache when offline
- [x] Implement cache invalidation

### 🤖 AI PROMPT — Module 12
```
Implement a complete localStorage caching strategy for a Next.js 14 Redux blog app.

This should be already partly built in utils/helpers.ts, but now wire it together.

1. Update `utils/helpers.ts` with full cache implementation:
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

Functions:
- setCacheItem<T>(key: string, data: T, expiryMs = CACHE_EXPIRY_MS): void
- getCacheItem<T>(key: string): T | null  — returns null if expired
- clearCacheItem(key: string): void
- clearAllCache(): void — clears all keys with CACHE_PREFIX
- isCacheValid(key: string): boolean

2. Cache keys to use (in constants.ts):
CACHE_KEYS = {
  POSTS_LIST: (page: number) => `posts_list_page_${page}`,
  POST_DETAIL: (id: number) => `post_detail_${id}`,
  USER: 'current_user',
  COMMENTS: (postId: number) => `comments_post_${postId}`
}

3. Update postsSaga.ts:
- In fetchAllPostsSaga: check cache before API call
- If cache hit: dispatch setPosts with cached data, skip API
- If cache miss: fetch, then cache the result

4. Update each saga to check/set cache.

5. Create `hooks/useLocalStorage.ts`:
- Generic hook for reading/writing localStorage
- SSR safe with useEffect

Show complete implementation.
```

---

## MODULE 13 — SEO & Metadata {#module-13}

### ✅ To-Do
- [x] Static metadata on all pages
- [x] Dynamic metadata on blog detail
- [x] Open Graph tags
- [x] JSON-LD structured data
- [x] Favicon and robots.txt

### 🤖 AI PROMPT — Module 13
```
Implement comprehensive SEO for a Next.js 14 App Router TypeScript blog app.

1. Root metadata in `app/layout.tsx`:
export const metadata: Metadata = {
  title: { template: '%s | BlogApp', default: 'BlogApp' },
  description: 'A modern blog platform...',
  metadataBase: new URL('https://yourdomain.com'),
  openGraph: { type: 'website', locale: 'en_US', siteName: 'BlogApp' },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true }
}

2. Dynamic metadata in `app/blog/[id]/page.tsx`:
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await fetch(`https://dummyjson.com/posts/${params.id}`).then(r => r.json())
  return {
    title: post.title,
    description: post.body.substring(0, 155),
    openGraph: {
      title: post.title,
      description: post.body.substring(0, 155),
      type: 'article',
      tags: post.tags
    }
  }
}

3. JSON-LD in blog detail page — BlogPosting schema

4. Create `app/sitemap.ts`:
- Returns sitemap with home, about, contact, blog list
- Dynamically includes all blog post URLs

5. Create `app/robots.ts`:
- Allow all crawlers
- Link to sitemap

Show complete code for all files.
```

---

## MODULE 14 — Performance Optimization {#module-14}

### ✅ To-Do
- [x] Dynamic imports for heavy components
- [x] React.memo on PostCard, Pagination
- [x] useMemo/useCallback in list components
- [x] Reselect selectors (done in Module 3)
- [x] next/image for all images
- [x] Code splitting verified

### 🤖 AI PROMPT — Module 14
```
Implement performance optimizations for a Next.js 14 TypeScript blog app.

1. Dynamic Imports — update `app/blog/page.tsx`:
import dynamic from 'next/dynamic'
const PostList = dynamic(() => import('@/components/blog/PostList'), {
  loading: () => <PostListSkeleton />,
  ssr: false  // if it has browser-only code
})

Also dynamically import CommentSection in blog/[id]/page.tsx

2. Memoization — update components:

PostCard: wrap with React.memo
const PostCard = React.memo(({ post }: PostCardProps) => { ... })

BlogListClient: 
- useMemo for totalPages calculation
- useCallback for handlePageChange and handleSearch

CommentSection:
- useCallback for handleSubmit

3. next/image usage — update all image tags:
- In PostCard: if post has an image, use <Image src={...} alt={...} width={} height={} />
- In Navbar: user avatar using <Image>
- Use fill and sizes for responsive images

4. Show Streaming SSR example in app/blog/page.tsx:
import { Suspense } from 'react'
<Suspense fallback={<PostListSkeleton />}>
  <BlogListClient initialData={initialData} />
</Suspense>

5. Show one example of useCallback preventing re-renders with explanation comment.

Provide complete updated code for the affected files.
```

---

## MODULE 15 — Bonus Features {#module-15}

### ✅ To-Do (Bonus)
- [ ] Dark mode toggle
- [ ] Search with debounce
- [ ] Skeleton loaders
- [ ] Infinite scroll (optional, replaces pagination)
- [ ] User profile page `/profile/[id]`

### 🤖 AI PROMPT — Module 15A: Dark Mode
```
Implement dark mode for a Next.js 14 TypeScript app using next-themes.

1. `app/providers.tsx` — Wrap with ThemeProvider:
import { ThemeProvider } from 'next-themes'
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>

2. Dark mode toggle in Navbar:
- Use useTheme() from next-themes
- Toggle between 'light' and 'dark'
- Sun icon for light mode, Moon icon for dark mode
- Smooth transition

3. Update Tailwind config:
darkMode: 'class'

4. Update all components to use dark: variants:
Example:
- bg-white dark:bg-gray-900
- text-gray-900 dark:text-gray-100
- border-gray-200 dark:border-gray-700

Show the complete Navbar component update and providers update.
Theme should persist across page refreshes (next-themes handles this automatically).
```

### 🤖 AI PROMPT — Module 15B: Search + Debounce
```
Implement search functionality for blog posts in a Next.js 14 TypeScript app.

1. `hooks/useDebounce.ts`:
function useDebounce<T>(value: T, delay: number): T
Uses useEffect + setTimeout to delay the value update.

2. Search bar component `components/blog/SearchBar/index.tsx`:
- Controlled input with onChange
- Shows search icon
- Clear button (×) when there's text
- "Searching..." indicator

3. Wire into BlogListClient:
- const [searchQuery, setSearchQuery] = useState('')
- const debouncedQuery = useDebounce(searchQuery, 500)
- useEffect: when debouncedQuery changes, dispatch searchPostsRequest or fetchPostsRequest
- Show "Search results for '{query}'" when searching
- Show pagination only when not searching

Show complete implementation.
```

### 🤖 AI PROMPT — Module 15C: User Profile Page
```
Create a user profile page for a Next.js 14 TypeScript blog app.

File: `app/profile/[id]/page.tsx`

Features:
- Show user info (from DummyJSON users endpoint if available, or from posts data)
- Show all posts by this user using: GET /posts/user/{userId}
- Display: user avatar (initials), username, post count
- List of user's posts as PostCard grid
- Export dynamic metadata

Also add profile link in Navbar when authenticated:
- Clicking user avatar goes to /profile/{user.id}

Create corresponding Redux action in postsSaga: fetchUserPostsSaga
- Takes userId
- Calls postsService.getPostsByUser(userId)
- Dispatches setPosts with result
```

---

## MODULE 16 — Deployment & README {#module-16}

### ✅ To-Do
- [ ] Test build locally: `npm run build`
- [ ] Fix any TypeScript errors
- [ ] Deploy to Vercel
- [ ] Write README.md
- [ ] Create submission document

### 🤖 AI PROMPT — Module 16: README
```
Write a comprehensive README.md for a Next.js 14 blog application.

Project: BlogApp — A full-featured blog platform

Include these sections:

## Project Description
Modern blog application with SSR, Redux state management, and saga-based side effects.

## Tech Stack
List all technologies: Next.js 14, TypeScript, Redux Toolkit, Redux-Saga, Tailwind CSS, Axios, next-themes, Reselect

## Features Implemented (Checklist)
✅ Next.js 14 App Router
✅ TypeScript
✅ [list all implemented features]

## Setup Instructions
1. Clone the repository
2. Install dependencies: npm install
3. Set up .env.local (show template)
4. Run development server: npm run dev
5. Build for production: npm run build

## Project Structure
(Show the folder tree)

## API Integration
- Base URL: https://dummyjson.com
- Authentication: POST /auth/login
- Test credentials: emilys / emilyspass

## Key Implementation Decisions
- Why App Router over Pages Router
- Cache strategy explanation
- Auth flow explanation

## Screenshots
[Add screenshots here]

## Challenges & Solutions
List 3-4 real challenges and how you solved them

## Future Improvements
List 5 potential improvements

## License
MIT
```

---

## 🚀 DEVELOPMENT ORDER (Recommended Sequence)

```
Day 1:
  Module 1  → Project Setup (30 min)
  Module 2  → Base Files & Layout (45 min)
  Module 3  → Redux Store + Slices + Selectors (1.5 hrs)
  Module 4  → API Layer + Services + Utils (1.5 hrs)
  Module 5  → Authentication (2 hrs)

Day 2:
  Module 6  → Posts Saga + Blog Pages (2.5 hrs)
  Module 7  → Comments (1 hr)
  Module 8  → UI Components + Navbar + Toast (1.5 hrs)
  Module 9  → Remaining Pages (1.5 hrs)
  Module 10 → Route Protection Middleware (45 min)

Day 3 (Polish):
  Module 11 → SSR/SSG/ISR (1 hr)
  Module 12 → Local Storage Caching (45 min)
  Module 13 → SEO & Metadata (45 min)
  Module 14 → Performance Optimization (1 hr)
  Module 15 → Bonus Features (1.5 hrs)
  Module 16 → Deploy + README (1 hr)
```

---

## ⚠️ COMMON PITFALLS TO AVOID

| Issue | Solution |
|-------|----------|
| localStorage in SSR | Always check `typeof window !== 'undefined'` |
| Redux in Server Components | Only use Redux in Client Components |
| Middleware runs on Edge | Use cookies for auth, not localStorage |
| next-themes hydration mismatch | Use `suppressHydrationWarning` on `<html>` |
| Redux Saga channel errors | Use `takeLatest` not `takeEvery` for most sagas |
| TypeScript strict errors | Define all interfaces upfront in Module 3 |

---

## 📝 SUBMISSION CHECKLIST

- [ ] GitHub repo created and code pushed
- [ ] Deployed on Vercel
- [ ] README.md complete with screenshots
- [ ] Google Doc copy filled with name/details
- [ ] Point-by-point reply on what's implemented
- [ ] Repo shared (will provide access when asked)
- [ ] Google Doc shared with: info@thevirtualcto.in

---

*Generated for: Next.js Redux-Saga Blog Developer Assignment — The Virtual CTO*

