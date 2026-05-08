'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

const DiscoveryPackCTA = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-z-black">
      {/* 
        PROMPT: Luxury perfume gift set in a deep emerald green magnetic closure box, open and angled at 45 degrees, revealing two dark glass bottles nestled in black velvet foam inserts. Gold foil brand name on box lid catches light. Shot on white marble with a single fresh jasmine flower placed beside it. Color palette: emerald, gold, black, white marble. No text. Photorealistic.
        DIMENSIONS: 1920x600 (used as background)
      */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback 
          src="/assets/discovery-pack-zahidaan.png" 
          alt="ZAHIDAAN Discovery Sampler" 
          className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
          fallbackType="gift"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-z-black via-transparent to-z-black opacity-60" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-6 md:space-y-8"
        >
          <h2 className="font-display text-3xl md:text-6xl text-z-white leading-tight">
            Not Sure Where <br /> <span className="italic text-z-gold">to Begin?</span>
          </h2>
          <p className="font-body text-sm md:text-lg text-z-white/70 font-light tracking-wide">
            Try our Discovery Sampler — 5 signature scents curated to help you find your soul-match. The perfect starting point for your ZAHIDAAN journey.
          </p>
          <div className="flex flex-col items-center space-y-4">
            <button className="px-12 py-5 bg-transparent border border-z-gold text-z-gold font-body font-medium uppercase tracking-[3px] transition-all duration-300 hover:bg-z-gold hover:text-z-black">
              Get the Sampler — ₹499
            </button>
            <span className="text-[10px] text-z-white/40 uppercase tracking-widest font-body">Free shipping on all samplers</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DiscoveryPackCTA;
