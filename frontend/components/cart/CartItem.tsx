'use client';

import React from 'react';
import Link from 'next/link';
import { useCartStore, CartItem as ICartItem } from '@/lib/store';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface CartItemProps {
  item: ICartItem;
}

const CartItem = ({ item }: CartItemProps) => {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex space-x-6 py-6 border-b border-z-gold/10">
      <div className="w-24 h-32 bg-z-mist flex-shrink-0 relative overflow-hidden">
        <ImageWithFallback 
          src={item.image} 
          alt={item.name} 
          width={200}
          height={300}
          fallbackType={item.category?.toLowerCase() === 'attar' ? 'attar' : 'perfume'}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-grow flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex justify-between items-start">
            <h3 className="font-display text-lg text-z-black tracking-wide">
              <Link href={`/product/${item.slug}`}>{item.name}</Link>
            </h3>
            <button 
              onClick={() => removeItem(item._id, item.size)}
              className="text-z-charcoal/30 hover:text-red-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
            </button>
          </div>
          <p className="font-body text-[11px] uppercase tracking-widest text-z-charcoal/40 font-bold">
            {item.category} · {item.size}
          </p>
        </div>

        <div className="flex justify-between items-end">
          <div className="flex items-center border border-z-gold/10 h-10">
            <button 
              onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
              className="w-8 h-full flex items-center justify-center hover:bg-z-mist transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
            </button>
            <div className="w-10 h-full flex items-center justify-center font-body text-sm border-x border-z-gold/10">
              {item.quantity}
            </div>
            <button 
              onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
              className="w-8 h-full flex items-center justify-center hover:bg-z-mist transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            </button>
          </div>
          <div className="font-display text-xl text-z-gold">₹{item.price * item.quantity}</div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
