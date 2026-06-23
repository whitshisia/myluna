import React from 'react';
import { motion } from 'framer-motion';

export default function Card({ 
  children, 
  className = '', 
  hoverable = false,
  padding = true,
  ...props 
}) {
  const baseClasses = 'bg-white rounded-2xl border border-rose-md shadow-sm';
  const hoverClasses = hoverable ? 'hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer' : '';
  const paddingClasses = padding ? 'p-6' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${baseClasses} ${hoverClasses} ${paddingClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}