'use client';

import React, { useState } from 'react';
import { useCartStore } from '@/lib/store';
import { useUIStore } from '@/lib/ui-store';

interface ProductInfoProps {
  product: {
    _id: string;
    name: string;
    slug: { current: string };
    category: string;
    gender: string;
    image: any;
    sizes: { size: string; mrp: number; sellingPrice: number; stock: number }[];
    longevity?: string;
    projection?: string;
    skinFriendly?: boolean;
    concentration?: string;
    fragranceFamily?: string[];
  };
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const openCartDrawer = useUIStore((state) => state.openCartDrawer);

  const handleAddToCart = () => {
    addItem({
      _id: product._id,
      name: product.name,
      slug: product.slug.current,
      image: product.image,
      size: selectedSize.size,
      price: selectedSize.sellingPrice,
      quantity: quantity,
      category: product.category,
    });
    openCartDrawer();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center space-x-4">
          <span className="font-body text-[10px] uppercase tracking-[3px] text-z-amber font-bold">
            {product.category} · {product.gender}
          </span>
          {product.concentration && (
            <span className="font-body text-[9px] uppercase tracking-widest bg-z-mist px-2 py-0.5 text-z-charcoal/60">
              {product.concentration}
            </span>
          )}
        </div>
        <h1 className="font-display text-4xl md:text-5xl text-z-black leading-tight">{product.name}</h1>
        {product.fragranceFamily && (
          <p className="font-body text-sm text-z-charcoal/40 tracking-wide">
            {product.fragranceFamily.join(' · ')}
          </p>
        )}
      </div>

      {/* Price */}
      <div className="flex items-end space-x-4">
        <span className="font-display text-4xl text-z-gold">₹{selectedSize.sellingPrice}</span>
        {selectedSize.mrp > selectedSize.sellingPrice && (
          <span className="font-display text-xl text-z-charcoal/30 line-through mb-1">₹{selectedSize.mrp}</span>
        )}
      </div>

      {/* Size Selector */}
      <div className="space-y-4">
        <label className="font-body text-[11px] uppercase tracking-widest text-z-charcoal/60 font-bold">Select Size</label>
        <div className="flex flex-wrap gap-3">
          {product.sizes.map((s) => (
            <button
              key={s.size}
              onClick={() => setSelectedSize(s)}
              className={`px-6 py-3 border-2 font-body text-sm transition-all ${
                selectedSize.size === s.size 
                  ? 'border-z-gold bg-z-gold text-z-white' 
                  : 'border-z-gold/10 hover:border-z-gold/30'
              }`}
            >
              {s.size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity & Add to Cart */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center border border-z-gold/20 h-14">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-12 h-full flex items-center justify-center hover:bg-z-mist transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
          </button>
          <div className="w-12 h-full flex items-center justify-center font-body text-lg border-x border-z-gold/20">
            {quantity}
          </div>
          <button 
            onClick={() => setQuantity(quantity + 1)}
            className="w-12 h-full flex items-center justify-center hover:bg-z-mist transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          </button>
        </div>
        <button 
          onClick={handleAddToCart}
          className="flex-grow h-14 bg-z-emerald text-z-white font-body font-bold uppercase tracking-[2px] hover:bg-z-emerald-mid transition-all shadow-xl shadow-z-emerald/10"
        >
          Add to Cart
        </button>
      </div>

      {/* Mobile Sticky Add to Cart Bar */}
      <div className="lg:hidden fixed bottom-[72px] left-0 w-full z-40 px-4 animate-in slide-in-from-bottom-full duration-500">
        <div className="bg-z-white/80 backdrop-blur-xl border border-z-gold/10 p-4 rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-z-charcoal/40 font-bold">{selectedSize.size}</span>
            <span className="font-display text-2xl text-z-black">₹{selectedSize.sellingPrice}</span>
          </div>
          <button 
            onClick={handleAddToCart}
            className="flex-grow h-14 bg-z-emerald text-z-white font-body text-xs font-bold uppercase tracking-widest rounded-xl active:scale-95 transition-transform"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-4 py-8 border-y border-z-gold/10">
        <div className="flex items-center space-x-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-z-amber"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          <span className="font-body text-[12px] text-z-charcoal/70">Longevity: {product.longevity || '8-10 Hours'}</span>
        </div>
        <div className="flex items-center space-x-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-z-amber"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span className="font-body text-[12px] text-z-charcoal/70">{product.skinFriendly ? 'Skin Friendly' : 'Authentic Oil'}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
