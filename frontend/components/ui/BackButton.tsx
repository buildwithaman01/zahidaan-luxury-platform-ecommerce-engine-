'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  label?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ label = 'Go Back', className = '' }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`group flex items-center space-x-3 font-body text-[10px] uppercase tracking-[3px] text-z-charcoal/40 hover:text-z-gold transition-all duration-300 ${className}`}
    >
      <span className="text-lg transition-transform duration-300 group-hover:-translate-x-1">←</span>
      <span className="relative">
        {label}
        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-z-gold transition-all duration-500 group-hover:w-full" />
      </span>
    </button>
  );
};

export default BackButton;
