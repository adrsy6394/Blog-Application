import api from './api';
import { Comment } from '@/store/slices/commentsSlice';

export interface CommentsResponse {
  comments: Comment[];
  total: number;
  skip: number;
  limit: number;
}

export const commentsService = {
  getCommentsByPost: async (postId: number): Promise<CommentsResponse> => {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data;
  },

  getAllComments: async (): Promise<CommentsResponse> => {
    const response = await api.get('/comments');
    return response.data;
  },
};
