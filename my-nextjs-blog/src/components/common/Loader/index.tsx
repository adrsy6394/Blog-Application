import React from 'react';

export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'full';
  text?: string;
}

export default function Loader({ size = 'md', text }: LoaderProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-3",
    lg: "h-12 w-12 border-4",
    full: "h-16 w-16 border-4",
  };
  
  const containerClasses = size === 'full' 
    ? "fixed inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50"
    : "flex flex-col items-center justify-center p-4";

  return (
    <div className={containerClasses}>
      <div className={`animate-spin rounded-full border-blue-600 border-t-transparent ${sizeClasses[size]}`}></div>
      {text && <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">{text}</p>}
    </div>
  );
}
