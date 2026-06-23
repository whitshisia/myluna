import React from 'react';

export default function Loader({ size = 'md', fullScreen = false }) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  const loader = (
    <div className="flex items-center justify-center">
      <div className={`${sizes[size]} border-4 border-rose-lt border-t-rose rounded-full animate-spin`} />
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blush">
        {loader}
      </div>
    );
  }

  return loader;
}