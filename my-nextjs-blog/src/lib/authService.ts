import api from './api';
import { User } from '@/store/slices/authSlice';

export const authService = {
  loginUser: async (username: string, password: string): Promise<User> => {
    const response = await api.post('/auth/login', {
      username,
      password,
    });
    // DummyJSON returns 'accessToken' in newer versions, but we use 'token'
    const data = response.data;
    if (data.accessToken && !data.token) {
      data.token = data.accessToken;
    }
    return data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/auth/me');
    const data = response.data;
    if (data.accessToken && !data.token) {
      data.token = data.accessToken;
    }
    return data;
  },

  getUserById: async (id: number): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },
};
