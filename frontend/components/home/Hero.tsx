'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const slides = [
    {
      image: '/assets/hero-fixed.png',
      scale: 1,
      heading: (
        <>
          The Essence of <br />
          <span className="italic text-z-gold drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">Devotion</span>
        </>
      ),
      description: "Discover the spiritual art of perfumery. Our alcohol-free Attars and Arabian Ouds are crafted to transcend the ordinary."
    },
    {
      image: '/assets/ouds.png',
      scale: 0.9, // Slightly scaled down as requested
      heading: (
        <>
          Timeless <br />
          <span className="italic text-z-gold drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">Oud Selection</span>
        </>
      ),
      description: "Pure, deep, and evocative. Our aged Oud collection represents the pinnacle of Arabian fragrance mastery."
    }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000); // 10 seconds interval
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[750px] w-full overflow-hidden bg-z-black flex items-center justify-center">
      {/* Dynamic Background Slider */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-z-black/80 via-z-black/20 to-z-black/90 z-10" />
          <div 
            className="w-full h-full bg-cover bg-center transition-all duration-[3000ms]"
            style={{ 
              backgroundImage: `url('${slides[currentSlide].image}')`,
              transform: `scale(${slides[currentSlide].scale})` 
            }} 
          />
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-4xl mx-auto text-center mt-12 md:mt-20">
          {/* Restored Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="inline-block px-6 md:px-8 py-2 rounded-full border border-z-gold/20 bg-z-black/20 backdrop-blur-md mb-6 md:mb-8"
          >
            <span className="font-body text-[8px] md:text-[10px] uppercase tracking-[3px] md:tracking-[5px] text-z-gold font-bold">Authentic · Artisanal · Pure</span>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            key={`heading-${currentSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-display text-5xl md:text-8xl lg:text-9xl text-z-white mb-6 md:mb-8 leading-[1] md:leading-[0.95]">
              {slides[currentSlide].heading}
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            key={`desc-${currentSlide}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="font-body text-sm md:text-xl text-z-white/70 mb-10 md:mb-12 font-light tracking-widest max-w-2xl mx-auto leading-relaxed px-4"
          >
            {slides[currentSlide].description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8"
          >
            <Link 
              href="/shop"
              className="w-full sm:w-auto group relative px-10 md:px-12 py-4 md:py-5 bg-z-gold text-z-black font-body font-bold uppercase tracking-[2px] transition-all duration-500 hover:bg-z-white overflow-hidden text-sm"
            >
              <span className="relative z-10">Discover Collection</span>
              <motion.div 
                className="absolute inset-0 bg-z-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"
              />
            </Link>
            
            <Link 
              href="/shop/gift-sets"
              className="group flex items-center gap-4 text-z-white font-body text-xs md:text-sm uppercase tracking-[3px] transition-colors hover:text-z-gold"
            >
              <span className="border-b border-z-white/30 group-hover:border-z-gold pb-1">Shop Gift Sets</span>
              <motion.span 
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-z-gold"
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex space-x-4 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-[2px] transition-all duration-500 ${
              currentSlide === idx ? 'w-12 bg-z-gold' : 'w-6 bg-z-white/20'
            }`}
          />
        ))}
      </div>

      {/* Floating Elements / Ambient Light */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-z-emerald/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-z-gold/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Scroll Down Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="font-body text-[9px] uppercase tracking-[4px] text-z-white/40">Scroll</span>
        <div className="w-[1px] h-16 bg-z-gold/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-z-gold to-transparent"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
