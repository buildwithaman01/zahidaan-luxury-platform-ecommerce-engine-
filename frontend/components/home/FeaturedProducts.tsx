'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { urlFor } from '@/lib/sanity';
import Link from 'next/link';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

import { Product } from '@/lib/schemas';

const FeaturedProducts = ({ products: initialProducts }: { products: Product[] }) => {
  const [activeTab, setActiveTab] = useState('All');
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);

  const tabs = ['All', 'Attar', 'Oud', 'Perfume', 'Gift Set'];

  useEffect(() => {
    if (activeTab === 'All') {
      setFilteredProducts(initialProducts);
    } else {
      setFilteredProducts(
        initialProducts.filter(p => p.category?.toLowerCase().includes(activeTab.toLowerCase()))
      );
    }
  }, [activeTab, initialProducts]);

  // Fallback products if none found in Sanity yet
  const displayProducts = filteredProducts?.length > 0 ? filteredProducts : [];

  return (
    <section className="py-24 bg-z-mist">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="font-display text-4xl md:text-5xl text-z-black mb-4">Our <span className="italic">Bestsellers</span></h2>
            <div className="flex space-x-6 overflow-x-auto pb-2 scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`font-body text-sm uppercase tracking-widest pb-1 transition-all whitespace-nowrap relative ${
                    activeTab === tab ? 'text-z-amber' : 'text-z-charcoal/40 hover:text-z-charcoal'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.span layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-[2px] bg-z-amber" />
                  )}
                </button>
              ))}
            </div>
          </div>
          <Link href="/shop" className="font-body text-sm uppercase tracking-widest text-z-amber hover:text-z-gold transition-colors">
            View All Collection →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode='wait'>
            {loading ? (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-4 animate-pulse">
                  <div className="aspect-[3/4] bg-z-emerald/5" />
                  <div className="h-4 bg-z-emerald/5 w-1/3" />
                  <div className="h-6 bg-z-emerald/5 w-2/3" />
                  <div className="h-4 bg-z-emerald/5 w-1/2" />
                </div>
              ))
            ) : displayProducts.length > 0 ? (
              displayProducts.map((product) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group"
                >
                  <Link href={`/product/${product.slug.current}`}>
                    <div className="relative aspect-[3/4] overflow-hidden bg-z-white border border-z-white transition-all duration-500 group-hover:border-z-gold/30">
                      <ImageWithFallback
                        src={product.image}
                        alt={product.name}
                        width={600}
                        fallbackType={product.category === 'attar' ? 'attar' : 'perfume'}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      <div className="absolute top-4 left-4">
                        {product.isBestseller && (
                          <span className="bg-z-gold text-z-black text-[9px] uppercase tracking-[2px] font-bold px-3 py-1">Bestseller</span>
                        )}
                      </div>

                      <div className="absolute bottom-0 left-0 w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <button className="w-full bg-z-emerald py-3 text-z-white font-body text-xs uppercase tracking-widest hover:bg-z-emerald-mid transition-colors">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </Link>
                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-z-amber font-medium">
                      <span>{product.category || 'Luxury'} · {product.gender || 'Unisex'}</span>
                      <span className="flex text-z-gold">★★★★★</span>
                    </div>
                    <Link href={`/product/${product.slug.current}`}>
                      <h3 className="font-display text-xl text-z-black hover:text-z-amber transition-colors">{product.name}</h3>
                    </Link>
                    <p className="font-body text-[13px] text-z-charcoal/50 line-clamp-1">{product.fragranceNotes?.top || product.shortDescription}</p>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className="font-display text-lg text-z-gold">₹{product.sizes?.[0]?.sellingPrice || '—'}</span>
                      {product.sizes?.[0] && product.sizes[0].mrp > product.sizes[0].sellingPrice && (
                        <span className="font-display text-sm text-z-charcoal/30 line-through">₹{product.sizes[0].mrp}</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center font-body text-z-charcoal/40 italic">
                Our artisanal products are currently being updated. <br /> Check back in a moment or WhatsApp us.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
