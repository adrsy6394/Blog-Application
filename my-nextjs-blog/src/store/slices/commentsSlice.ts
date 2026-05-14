import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CommentUser {
  id: number;
  username: string;
  fullName?: string;
}

export interface Comment {
  id: number;
  body: string;
  postId: number;
  user: CommentUser;
}

export interface CommentsState {
  comments: Comment[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  isLoading: false,
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setComments(state, action: PayloadAction<Comment[]>) {
      state.comments = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    addComment(state, action: PayloadAction<Comment>) {
      state.comments.unshift(action.payload);
      state.isLoading = false;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setLoading, setComments, addComment, setError } = commentsSlice.actions;
export default commentsSlice.reducer;
