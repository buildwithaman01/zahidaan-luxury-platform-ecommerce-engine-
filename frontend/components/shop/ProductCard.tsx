'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { urlFor } from '@/lib/sanity';
import { useUIStore } from '@/lib/ui-store';
import { useCartStore } from '@/lib/store';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    slug: { current: string };
    category: string;
    gender: string;
    shortDescription?: string;
    image: any;
    fragranceNotes?: { top: string };
    sizes: { size: string; mrp: number; sellingPrice: number }[];
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);
  const openCartDrawer = useUIStore((state) => state.openCartDrawer);
  const firstSize = product.sizes?.[0] || { size: 'Default', mrp: 0, sellingPrice: 0 };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      _id: product._id,
      name: product.name,
      slug: product.slug.current,
      image: product.image,
      size: firstSize.size,
      price: firstSize.sellingPrice,
      quantity: 1,
      category: product.category,
    });
    openCartDrawer();
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-z-white overflow-hidden flex flex-col h-full shadow-sm hover:shadow-xl transition-all duration-500"
    >
      {/* Product Image */}
      <Link href={`/product/${product.slug.current}`} className="block relative aspect-[4/5] overflow-hidden">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          width={600}
          height={750}
          fallbackType={product.category === 'attar' ? 'attar' : 'perfume'}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Mobile Quick Add Icon - Floating */}
        <button 
          onClick={handleAddToCart}
          className="lg:hidden absolute bottom-3 right-3 w-10 h-10 bg-z-white/90 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center text-z-black active:bg-z-gold active:text-z-white transition-all z-20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
        </button>

        {/* Wishlist Icon */}
        <button className="absolute top-4 right-4 text-z-black/40 hover:text-z-amber transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        </button>

        {/* Category Badge for Mobile */}
        <div className="lg:hidden absolute top-3 left-3 bg-z-black/40 backdrop-blur-md px-2 py-1 rounded text-[8px] text-z-white uppercase tracking-widest">
          {product.category}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow relative">
        <div className="hidden lg:block text-[10px] uppercase tracking-widest text-z-amber font-semibold mb-1">
          <span>{product.category || 'Luxury'} · {product.gender || 'Unisex'}</span>
        </div>
        <h3 className="font-display text-lg md:text-2xl text-z-black mb-1 line-clamp-1">
          <Link href={`/product/${product.slug.current}`}>{product.name}</Link>
        </h3>
        <p className="font-body text-[11px] md:text-[13px] text-z-charcoal/50 mb-2 line-clamp-1">
          {product.fragranceNotes?.top || 'Exquisite Fragrance'}
        </p>
        
        {/* Rating Placeholder */}
        <div className="flex items-center space-x-1 mb-2 text-z-gold text-[10px] md:text-[12px]">
          <span>★★★★★</span>
          <span className="text-z-charcoal/30">(47)</span>
        </div>

        <div className="mt-auto flex items-center space-x-3">
          <span className="font-display text-lg text-z-gold">₹{product.sizes?.[0]?.sellingPrice || '—'}</span>
          {product.sizes?.[0]?.mrp > product.sizes?.[0]?.sellingPrice && (
            <span className="font-display text-sm text-z-charcoal/30 line-through">₹{product.sizes?.[0]?.mrp}</span>
          )}
        </div>

        {/* Desktop Add to Cart Button */}
        <div className="hidden lg:block absolute bottom-0 left-0 w-full overflow-hidden h-0 group-hover:h-12 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <button 
            onClick={handleAddToCart}
            className="w-full h-full bg-z-emerald text-z-white font-body text-[11px] uppercase tracking-widest font-bold hover:bg-z-emerald-mid transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
