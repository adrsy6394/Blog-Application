import { takeLatest, call, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { authService } from '@/lib/authService';
import {
  loginRequest,
  logoutRequest,
  loadUser,
  setUser,
  setError,
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
    
    if (typeof document !== 'undefined') {
      document.cookie = `auth_token=${user.token}; path=/; max-age=3600`;
      window.location.href = '/dashboard';
    }
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || 'Login failed';
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
      return;
    }
    
    const user: User = yield call(authService.getCurrentUser);
    yield put(setUser({ ...user, token }));
  } catch (error: any) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
    yield put(setError('Session expired. Please log in again.'));
  }
}

export function* watchAuthSaga() {
  yield takeLatest(loginRequest.type, loginSaga);
  yield takeLatest(logoutRequest.type, logoutSaga);
  yield takeLatest(loadUser.type, loadUserFromStorageSaga);
}
