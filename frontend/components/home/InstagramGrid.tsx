'use client';

import { motion } from 'framer-motion';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

const InstagramGrid = () => {
  const images = [
    'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1615484477778-ca3b77940c25?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1605613304394-82121ca6d8e1?q=80&w=400&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1588159343745-445ae0b16383?q=80&w=400&auto=format&fit=crop',
  ];

  return (
    <section className="py-24 bg-z-mist border-t border-z-white/20">
      <div className="container mx-auto px-6 text-center mb-12">
        <h2 className="font-display text-3xl md:text-4xl text-z-black mb-4 italic">Experience the Lifestyle</h2>
        <a 
          href="https://instagram.com/zahidaan" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-body text-sm uppercase tracking-[3px] text-z-amber font-semibold hover:text-z-gold transition-colors"
        >
          Follow @zahidaan
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
        {images.map((img, index) => (
          <motion.a
            key={index}
            href="https://instagram.com/zahidaan"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative aspect-square overflow-hidden group"
          >
            <ImageWithFallback 
              src={img} 
              alt={`Instagram lifestyle ${index + 1}`} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              fallbackType="perfume"
            />
            <div className="absolute inset-0 bg-z-emerald/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-z-white"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default InstagramGrid;
