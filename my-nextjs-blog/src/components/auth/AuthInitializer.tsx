"use client";

import { useEffect } from 'react';
import { useAppDispatch } from '@/store';
import { loadUser } from '@/store/slices/authSlice';

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return <>{children}</>;
}
