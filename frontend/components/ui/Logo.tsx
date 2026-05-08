'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Logo = ({ className = "h-16 w-16" }: { className?: string }) => {
  const [index, setIndex] = useState(0);
  const logos = [
    { src: '/logo-ar.png', alt: 'Zahidaan Arabic Logo' },
    { src: '/logo-en.png', alt: 'Zahidaan English Logo' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % logos.length);
    }, 5000); // Switch every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`relative ${className} flex items-center justify-center`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={logos[index].src}
          alt={logos[index].alt}
          initial={{ opacity: 0, scale: 0.8, rotateY: -90, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scale: 1, rotateY: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 1.2, rotateY: 90, filter: 'blur(10px)' }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-full max-h-full object-contain filter drop-shadow-[0_0_20px_rgba(212,175,55,0.8)] brightness-125"
        />
      </AnimatePresence>
      
      {/* Premium Shimmer Overlay */}
      <motion.div
        animate={{ 
          x: ['-100%', '200%'],
          opacity: [0, 0.3, 0]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          repeatDelay: 4,
          ease: "linear"
        }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none"
      />
    </div>
  );
};

export default Logo;
