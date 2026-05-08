'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // Luxury ease from Master Plan
      }}
      className="flex flex-col flex-grow"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
