import { takeLatest, call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { authService } from '@/lib/authService';
import {
  loginRequest,
  logoutRequest,
  loadUser,
  setUser,
  setError,
  setLoading,
  logout,
  User,
} from '../slices/authSlice';
import { addNotification } from '../slices/uiSlice';
import { AUTH_TOKEN_KEY } from '@/utils/constants';
import { setCacheItem, clearCacheItem, isTokenExpired } from '@/utils/helpers';

function* loginSaga(action: PayloadAction<{username: string; password: string}>): Generator<any, void, any> {
  try {
    const { username, password } = action.payload;
    const user: User = yield call(authService.loginUser, username, password);
    
    yield put(setUser(user));
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_TOKEN_KEY, user.token);
      setCacheItem('current_user', user);
    }
    
    yield put(addNotification({ message: 'Login successful', type: 'success' }));
    
    if (user.token && typeof document !== 'undefined') {
      document.cookie = `auth_token=${user.token}; path=/; max-age=3600; SameSite=Lax`;
      window.location.href = '/dashboard';
    } else if (typeof window !== 'undefined') {
      window.location.href = '/dashboard';
    }
  } catch (error: any) {
    // Fallback to mock users if API fails (for newly signed up users)
    if (typeof window !== 'undefined') {
      const { username, password } = action.payload;
      const mockUsers = JSON.parse(localStorage.getItem('mock_users') || '[]');
      const mockUser = mockUsers.find((u: any) => u.username === username && u.password === password);
      
      if (mockUser) {
        const userWithToken = { ...mockUser };
        yield put(setUser(userWithToken));
        localStorage.setItem(AUTH_TOKEN_KEY, userWithToken.token);
        setCacheItem('current_user', userWithToken);
        document.cookie = `auth_token=${userWithToken.token}; path=/; max-age=3600; SameSite=Lax`;
        yield put(addNotification({ message: 'Login successful (Mock Mode)', type: 'success' }));
        window.location.href = '/dashboard';
        return;
      }
    }

    const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
    yield put(setError(errorMessage));
    yield put(addNotification({ message: errorMessage, type: 'error' }));
  }
}

function* logoutSaga(): Generator<any, void, any> {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    clearCacheItem('current_user');
  }
  
  if (typeof document !== 'undefined') {
    document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
  
  yield put(logout());
  yield put(addNotification({ message: 'Logged out', type: 'info' }));
  
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
}

function* loadUserFromStorageSaga(): Generator<any, void, any> {
  try {
    if (typeof window === 'undefined') return;
    
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token || isTokenExpired(token)) {
      if (token) {
         localStorage.removeItem(AUTH_TOKEN_KEY);
      }
      yield put(setLoading(false));
      return;
    }
    
    const user: User = yield call(authService.getCurrentUser);
    yield put(setUser({ ...user, token }));
  } catch (error: any) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_TOKEN_KEY);
      document.cookie = 'auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
    yield put(setError('Session expired. Please log in again.'));
    yield put(setLoading(false));
  }
}

export function* watchAuthSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(logoutRequest.type, logoutSaga);
  yield takeLatest(loadUser.type, loadUserFromStorageSaga);
}
