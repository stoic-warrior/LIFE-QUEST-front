import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div className={`rounded-2xl bg-slate-800 p-4 shadow ${className ?? ''}`}>
      {children}
    </div>
  );
}
