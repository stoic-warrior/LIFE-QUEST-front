import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

const VARIANT_CLASSES: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-purple-600 text-white hover:bg-purple-500',
  secondary: 'bg-slate-700 text-white hover:bg-slate-600',
  ghost: 'bg-transparent text-slate-300 hover:text-white',
};

export default function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`px-4 py-2 rounded-lg font-semibold transition ${
        VARIANT_CLASSES[variant]
      } ${className ?? ''}`}
      {...props}
    />
  );
}
