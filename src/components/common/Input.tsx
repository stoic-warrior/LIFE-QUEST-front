import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({ label, className, ...props }: InputProps) {
  return (
    <label className="block space-y-1 text-sm text-slate-300">
      {label && <span>{label}</span>}
      <input
        className={`w-full rounded-lg bg-slate-700 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 ${
          className ?? ''
        }`}
        {...props}
      />
    </label>
  );
}
