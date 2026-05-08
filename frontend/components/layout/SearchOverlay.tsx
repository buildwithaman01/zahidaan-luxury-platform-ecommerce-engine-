'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { client } from '@/lib/sanity';
import Link from 'next/link';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { useUIStore } from '@/lib/ui-store';

const SearchOverlay = () => {
  const { isSearchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchProducts = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const data = await client.fetch(
          `*[_type == "product" && (name match $search || shortDescription match $search || category->title match $search)] [0...5] {
            _id, name, slug, "category": category->slug.current,
            "image": images[0] { asset->{url} },
            sizes[0] { sellingPrice }
          }`,
          { search: `*${query}*` }
        );
        setResults(data);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(searchProducts, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Prevent background scroll when open
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setResults([]);
    }
  }, [isSearchOpen]);

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-z-black/95 backdrop-blur-xl flex flex-col pt-32 px-6"
        >
          <div className="container mx-auto max-w-2xl">
            {/* Search Input Container */}
            <div className="relative border-b border-z-gold/30 pb-4">
              <input
                autoFocus
                type="text"
                placeholder="Search scents, ouds, attars..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent font-display text-3xl md:text-5xl text-z-white placeholder:text-z-white/20 focus:outline-none"
              />
              <button 
                onClick={closeSearch}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-z-white/40 hover:text-z-gold transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            {/* Results */}
            <div className="mt-12 space-y-8">
              {isLoading && (
                <p className="font-body text-z-gold text-sm uppercase tracking-widest animate-pulse text-center">Searching the archives...</p>
              )}

              {results.length > 0 ? (
                <div className="grid gap-6">
                  {results.map((product) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      <Link 
                        href={`/product/${product.slug.current}`}
                        onClick={closeSearch}
                        className="group flex items-center space-x-6 p-4 hover:bg-z-white/5 transition-all"
                      >
                        <div className="w-16 h-20 bg-z-white/5 overflow-hidden">
                          <ImageWithFallback 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-display text-xl text-z-white group-hover:text-z-gold transition-colors">{product.name}</h3>
                          <p className="text-[10px] uppercase tracking-widest text-z-white/40 font-bold">{product.category}</p>
                        </div>
                        <span className="font-display text-lg text-z-gold">₹{product.sizes?.[0]?.sellingPrice}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              ) : query.length >= 2 && !isLoading ? (
                <p className="text-center font-body text-z-white/30 italic py-12">No matching fragrance found...</p>
              ) : null}
            </div>

            {/* Quick Suggestions */}
            {!query && (
              <div className="mt-12">
                <p className="font-body text-[10px] uppercase tracking-[4px] text-z-white/30 mb-6">Popular Searches</p>
                <div className="flex flex-wrap gap-4">
                  {['Dehn Al Oud', 'Musk Rijali', 'Sandalwood', 'Discovery Set'].map((tag) => (
                    <button 
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-6 py-2 border border-z-gold/10 text-z-gold text-xs font-body uppercase tracking-widest hover:border-z-gold/50 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
