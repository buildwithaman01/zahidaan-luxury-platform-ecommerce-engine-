'use client';

import React, { useState } from 'react';
import { urlFor } from '@/lib/sanity';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface ImageWithFallbackProps {
  src?: any;
  alt: string;
  className?: string;
  fallbackType?: 'perfume' | 'attar' | 'gift' | 'category';
  width?: number;
  height?: number;
  priority?: boolean;
}

const ImageWithFallback = ({
  src,
  alt,
  className = "w-full h-full object-cover",
  fallbackType = 'perfume',
  width,
  height,
  priority = false
}: ImageWithFallbackProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Define default fallbacks
  const fallbacks = {
    perfume: '/assets/placeholder-perfume.png',
    attar: '/assets/placeholder-attar.png',
    gift: '/assets/placeholder-gift.png',
    category: '/assets/discovery-pack.png'
  };

  // 1. Calculate the URL directly in render to avoid state-sync flicker
  let finalSrc: string = fallbacks[fallbackType];

  if (src) {
    if (typeof src === 'string') {
      finalSrc = src;
    } else if (src.asset?.url) {
      // Direct URL from GROQ expansion
      finalSrc = src.asset.url;
    } else if (src.asset?._ref || src._type === 'image') {
      // Sanity image reference
      try {
        let builder = urlFor(src);
        if (width) builder = builder.width(width);
        if (height) builder = builder.height(height);
        finalSrc = builder.url();
      } catch (e) {
        console.warn("Sanity image builder failed:", e);
      }
    }
  }

  // 2. If error occurred, force fallback
  const displaySrc = error ? fallbacks[fallbackType] : finalSrc;

  return (
    <div className={`relative overflow-hidden bg-z-mist group/img ${className.includes('aspect') ? '' : 'h-full w-full'}`}>
      {/* Premium Skeleton Loader */}
      <AnimatePresence>
        {loading && !error && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 overflow-hidden"
          >
            <div className="w-full h-full bg-z-mist animate-pulse flex items-center justify-center">
               <span className="font-display text-[10px] text-z-gold/20 tracking-[4px] uppercase">Zahidaan</span>
               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Image
        src={displaySrc}
        alt={alt}
        width={width || 800}
        height={height || 1000}
        priority={priority}
        className={`${className} transition-all duration-700 ${loading ? 'scale-110 blur-sm opacity-0' : 'scale-100 blur-0 opacity-100'}`}
        onLoad={() => setLoading(false)}
        onError={() => {
          setError(true);
          setLoading(false);
        }}
        unoptimized // Necessary for static export on MilesWeb
      />

      {/* Branded Overlay for Fallback / Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-z-black/5">
          <div className="bg-z-white/20 backdrop-blur-md px-6 py-3 border border-z-gold/20">
            <span className="font-display text-z-gold text-[10px] uppercase tracking-[4px]">Essential Essence</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageWithFallback;
