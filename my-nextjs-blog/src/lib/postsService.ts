import api from './api';
import { Post } from '@/store/slices/postsSlice';

export interface CreatePostDto {
  title: string;
  body: string;
  userId: number;
}

export interface UpdatePostDto {
  title?: string;
  body?: string;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export const postsService = {
  getAllPosts: async (limit: number, skip: number): Promise<PostsResponse> => {
    const response = await api.get(`/posts?limit=${limit}&skip=${skip}`);
    return response.data;
  },

  getPostById: async (id: number): Promise<Post> => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  searchPosts: async (query: string): Promise<PostsResponse> => {
    const response = await api.get(`/posts/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  createPost: async (data: CreatePostDto): Promise<Post> => {
    const response = await api.post('/posts/add', data);
    return response.data;
  },

  updatePost: async (id: number, data: UpdatePostDto): Promise<Post> => {
    const response = await api.put(`/posts/${id}`, data);
    return response.data;
  },

  deletePost: async (id: number): Promise<{ id: number; isDeleted: boolean; deletedOn: string }> => {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },

  getPostsByUser: async (userId: number): Promise<PostsResponse> => {
    const response = await api.get(`/posts/user/${userId}`);
    return response.data;
  },
};
