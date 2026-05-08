'use client';

import { motion } from 'framer-motion';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

const BrandStory = () => {
  return (
    <section className="py-16 md:py-24 bg-z-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8"
          >
            <div className="space-y-2">
              <span className="font-body text-[10px] md:text-[11px] uppercase tracking-[3px] text-z-amber font-semibold">Our Story</span>
              <h2 className="font-display text-3xl md:text-5xl text-z-black leading-tight">
                A Fragrance Born from <span className="italic">Devotion</span>
              </h2>
            </div>
            
            <div className="font-body text-z-charcoal/70 space-y-6 text-lg leading-relaxed font-light">
              <p>
                ZAHIDAAN was born from a simple yet profound desire: to capture the spiritual essence of traditional attars and present them with modern luxury. Our name, meaning "The Devoted Ones," reflects our commitment to the ancient art of perfumery.
              </p>
              <p>
                Every drop of our alcohol-free attars is a journey through time, sourced from the finest ingredients across the Arabian peninsula and India. We believe that a fragrance is more than just a scent; it is a soulful expression of identity and devotion.
              </p>
              <p>
                From our boutique in Hyderabad to homes across India, we invite you to experience a level of craftsmanship that honors tradition while embracing the sophistication of the contemporary world.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center pt-4">
              <button className="group font-body text-sm uppercase tracking-widest text-z-black flex items-center space-x-2">
                <span>Learn Our Story</span>
                <span className="transition-transform group-hover:translate-x-2">→</span>
              </button>
              <a 
                href="https://share.google/phfAFGrUhbQWUcSYg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group font-body text-[11px] uppercase tracking-[2px] text-z-amber border-b border-z-amber/30 hover:border-z-amber transition-all pb-1"
              >
                Visit Our Boutique
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* 
              PROMPT: Intimate close-up of aged hands carefully filling a crystal attar bottle using a traditional brass funnel. Warm golden hour light filtering through a dusty window. Background is softly blurred wooden workshop shelves with dozens of dark glass bottles. Shallow depth of field. Cinematic, nostalgic, artisanal feel. Color palette: warm amber, sepia, deep brown, soft gold. No text. Photorealistic.
              DIMENSIONS: 800×1000px
            */}
            <div className="aspect-[4/5] bg-z-mist relative overflow-hidden">
              <ImageWithFallback 
                src="/assets/brand-story.png" 
                alt="Artisanal Attar Making" 
                className="w-full h-full object-cover"
                fallbackType="perfume"
              />
              <div className="absolute inset-0 border-[12px] border-z-white/20 m-6" />
            </div>
            {/* Decorative Gold Element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-l border-b border-z-gold/30 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
