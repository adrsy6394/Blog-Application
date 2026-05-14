import { useAppDispatch, useAppSelector } from '@/store';
import { loginRequest, logoutRequest, clearError } from '@/store/slices/authSlice';
import { selectUser, selectIsAuthenticated, selectAuthLoading, selectAuthError } from '@/store/selectors/authSelectors';
import { useCallback } from 'react';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const login = useCallback((username: string, password: string) => {
    dispatch(loginRequest({ username, password }));
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(logoutRequest());
  }, [dispatch]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    clearError: clearAuthError,
  };
};
