'use client';

import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductGridProps {
  products: any[];
  category?: string;
}

const ProductGrid = ({ products, category }: ProductGridProps) => {
  const [sortBy, setSortBy] = useState('bestselling');

  const filteredProducts = category 
    ? products.filter(p => p.category?.toLowerCase() === category.toLowerCase())
    : products;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.sizes[0].sellingPrice - b.sizes[0].sellingPrice;
    if (sortBy === 'price-high') return b.sizes[0].sellingPrice - a.sizes[0].sellingPrice;
    if (sortBy === 'newest') return new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime();
    return 0; // Default bestselling (already sorted in query)
  });

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <h1 className="font-display text-4xl text-z-black capitalize">
          {category ? category.replace('-', ' ') : 'All Collection'}
          <span className="text-sm font-body text-z-charcoal/40 ml-4 font-normal">
            {sortedProducts.length} Products
          </span>
        </h1>

        <div className="flex items-center space-x-4">
          <label className="font-body text-[12px] uppercase tracking-widest text-z-charcoal/50">Sort By:</label>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent border-b border-z-gold/30 font-body text-sm py-1 focus:outline-none focus:border-z-gold"
          >
            <option value="bestselling">Bestsellers</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-12">
          <AnimatePresence>
            {sortedProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="py-20 text-center border border-dashed border-z-gold/20">
          <p className="font-display text-2xl text-z-charcoal/40 mb-4">No products match your criteria</p>
          <button className="text-z-amber font-body text-sm uppercase tracking-widest underline underline-offset-4">
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
