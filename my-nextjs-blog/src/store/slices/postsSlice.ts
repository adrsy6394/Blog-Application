import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
}

export interface PostsState {
  posts: Post[];
  currentPost: Post | null;
  totalPosts: number;
  currentPage: number;
  postsPerPage: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  currentPost: null,
  totalPosts: 0,
  currentPage: 1,
  postsPerPage: 9,
  isLoading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setPosts(state, action: PayloadAction<{ posts: Post[]; total: number }>) {
      state.posts = action.payload.posts;
      state.totalPosts = action.payload.total;
      state.isLoading = false;
      state.error = null;
    },
    setCurrentPost(state, action: PayloadAction<Post>) {
      state.currentPost = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    addPost(state, action: PayloadAction<Post>) {
      state.posts.unshift(action.payload);
      state.totalPosts += 1;
      state.isLoading = false;
    },
    updatePost(state, action: PayloadAction<Post>) {
      const index = state.posts.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
      if (state.currentPost?.id === action.payload.id) {
        state.currentPost = action.payload;
      }
      state.isLoading = false;
    },
    removePost(state, action: PayloadAction<number>) {
      state.posts = state.posts.filter((p) => p.id !== action.payload);
      state.totalPosts -= 1;
      if (state.currentPost?.id === action.payload) {
        state.currentPost = null;
      }
      state.isLoading = false;
    },
  },
});

export const {
  setLoading,
  setPosts,
  setCurrentPost,
  setError,
  setPage,
  addPost,
  updatePost,
  removePost,
} = postsSlice.actions;

export default postsSlice.reducer;
