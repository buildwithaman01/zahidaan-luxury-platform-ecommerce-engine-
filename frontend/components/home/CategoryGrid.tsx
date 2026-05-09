'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { urlFor } from '@/lib/sanity';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface Category {
  _id: string;
  name?: string;
  title?: string;
  slug?: { current: string };
  image?: any;
  description?: string;
}

const CategoryGrid = ({ categories: initialCategories }: { categories: Category[] }) => {
  // Use Sanity data or fallback to defaults if Sanity is empty
  const categories = initialCategories?.length > 0 ? initialCategories : [
    { title: 'Attars', slug: { current: 'attars' }, image: '/assets/placeholder-attar.png' },
    { title: 'Ouds', slug: { current: 'ouds' }, image: '/assets/ouds.png' },
    { title: 'Perfumes', slug: { current: 'perfumes' }, image: '/assets/perfumes.png' },
    { title: 'Bakhoor', slug: { current: 'bakhoor' }, image: '/assets/bakhoor.png' },
    { title: 'Gift Sets', slug: { current: 'gift-sets' }, image: '/assets/placeholder-gift.png' },
  ];

  return (
    <section className="py-20 bg-z-white">
      <div className="container mx-auto px-6">
        <h2 className="font-display text-4xl md:text-5xl mb-12 text-center text-z-black">
          Explore by <span className="italic">Category</span>
        </h2>
        
        <div className="relative group">
          <div className="flex overflow-x-auto pb-10 md:grid md:grid-cols-5 gap-4 md:gap-6 scrollbar-hide px-2 md:px-0 snap-x snap-mandatory">
            {categories.map((cat: any, index) => (
              <motion.div
                key={cat.slug?.current || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="min-w-[240px] md:min-w-0 snap-center"
              >
                <Link href={`/shop/${cat.slug?.current || ''}`} className="group block relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-z-mist rounded-sm md:rounded-none">
                  <ImageWithFallback
                    src={cat.image}
                    alt={cat.name || cat.title || 'Category Image'}
                    width={400}
                    fallbackType={cat.slug?.current === 'attars' ? 'attar' : 'perfume'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-z-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="font-display text-xl md:text-2xl text-z-white italic group-hover:text-z-gold transition-colors">
                      {cat.name || cat.title}
                    </h3>
                    <div className="w-8 h-[1px] bg-z-gold mt-2 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* Mobile Scroll Indicator */}
          <div className="md:hidden flex justify-center space-x-1 mt-2">
            {categories.map((_, i) => (
              <div key={i} className="w-6 h-[1px] bg-z-gold/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-z-gold w-0 group-hover:w-full transition-all duration-1000" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
