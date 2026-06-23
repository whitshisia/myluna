import React from 'react';

export default function Input({
  label,
  error,
  className = '',
  ...props
}) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-plum mb-1">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-3 border rounded-xl bg-white
          focus:outline-none focus:ring-2 focus:ring-rose
          transition-all
          ${error ? 'border-red-500 focus:ring-red-500' : 'border-rose-md'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}