import api from './api';
import { User } from '@/store/slices/authSlice';

export const authService = {
  loginUser: async (username: string, password: string): Promise<User> => {
    const response = await api.post('/auth/login', {
      username,
      password,
    });
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
};
