"use client";

import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store';
import { removeNotification } from '@/store/slices/uiSlice';

export default function Toast() {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((state) => state.ui.notifications);

  useEffect(() => {
    const timers = notifications.map(notification => {
      return setTimeout(() => {
        dispatch(removeNotification(notification.id));
      }, 4000);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [notifications, dispatch]);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {notifications.map((notification) => {
        let bgColor = "bg-gray-800";
        let icon = null;

        switch (notification.type) {
          case 'success':
            bgColor = "bg-green-600";
            icon = <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>;
            break;
          case 'error':
            bgColor = "bg-red-600";
            icon = <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>;
            break;
          case 'info':
            bgColor = "bg-blue-600";
            icon = <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
            break;
          case 'warning':
            bgColor = "bg-yellow-500";
            icon = <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
            break;
        }

        return (
          <div 
            key={notification.id} 
            className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 transition-all transform duration-300 translate-y-0 opacity-100 min-w-[250px] max-w-sm`}
          >
            {icon}
            <span className="flex-grow font-medium text-sm">{notification.message}</span>
            <button 
              onClick={() => dispatch(removeNotification(notification.id))}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        );
      })}
    </div>
  );
}
