'use client';

import React, { useState } from 'react';
import { urlFor } from '@/lib/sanity';
import { motion, AnimatePresence } from 'framer-motion';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface ProductHeroProps {
  product: {
    name: string;
    images: any[];
    category: string;
    gender: string;
  };
}

const ProductHero = ({ product }: ProductHeroProps) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* Thumbnails (Desktop Left) */}
      <div className="hidden md:flex md:col-span-2 flex-col space-y-4">
        {product.images?.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={`aspect-square overflow-hidden border-2 transition-all ${
              activeImage === index ? 'border-z-gold' : 'border-transparent hover:border-z-gold/50'
            }`}
          >
            <ImageWithFallback
              src={img}
              alt={`${product.name} thumbnail ${index}`}
              width={200}
              height={200}
              fallbackType={product.category === 'attar' ? 'attar' : 'perfume'}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="md:col-span-10 relative aspect-[4/5] bg-z-mist overflow-hidden flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <ImageWithFallback
              src={product.images?.[activeImage]}
              alt={product.name}
              width={1200}
              height={1500}
              fallbackType={product.category === 'attar' ? 'attar' : 'perfume'}
              priority={activeImage === 0}
              className="w-full h-full object-cover cursor-zoom-in"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Mobile Thumbnails */}
        <div className="absolute bottom-4 left-0 w-full flex justify-center md:hidden space-x-2">
          {product.images?.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                activeImage === index ? 'bg-z-gold w-6' : 'bg-z-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductHero;
