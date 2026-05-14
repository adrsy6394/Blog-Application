import React, { ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
}

export default function Card({
  children,
  className = '',
  padding = 'md',
  hoverable = false,
}: CardProps) {
  
  const baseClasses = "card-theme rounded-xl shadow-sm transition-all";
  
  const paddingClasses = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };
  
  const hoverClasses = hoverable ? "hover:shadow-lg hover:-translate-y-1" : "";

  return (
    <div className={`${baseClasses} ${paddingClasses[padding]} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}
