'use client';

import React from 'react';
import Link from 'next/link';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { useCartStore } from '@/lib/store';
import { SHIPPING_CONFIG } from '@/lib/shipping';
import { motion } from 'framer-motion';

export default function CartPage() {
  const items = useCartStore((state) => state.items);

  return (
    <>
      <main className="pt-32 pb-24 bg-z-white min-h-[70vh]">
        <div className="container mx-auto px-6">
          <h1 className="font-display text-4xl md:text-5xl text-z-black mb-12">Your <span className="italic">Cart</span></h1>

          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              {/* Cart Items List */}
              <div className="lg:col-span-8 space-y-2">
                <div className="hidden md:grid grid-cols-12 pb-4 border-b border-z-gold/10 font-body text-[10px] uppercase tracking-widest text-z-charcoal/40 font-bold">
                  <div className="col-span-6">Product Details</div>
                  <div className="col-span-3 text-center">Quantity</div>
                  <div className="col-span-3 text-right">Subtotal</div>
                </div>
                {items.map((item) => (
                  <CartItem key={`${item._id}-${item.size}`} item={item} />
                ))}
                
                <div className="pt-10 flex justify-between items-center">
                  <Link href="/shop" className="font-body text-sm text-z-amber hover:text-z-gold transition-colors flex items-center space-x-2">
                    <span>←</span>
                    <span className="underline underline-offset-4">Continue Shopping</span>
                  </Link>
                  <p className="font-body text-[12px] text-z-charcoal/40">
                    Free shipping on orders above ₹{SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD}
                  </p>
                </div>
              </div>

              {/* Summary Panel */}
              <aside className="lg:col-span-4 sticky top-32">
                <CartSummary />
              </aside>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-20 text-center max-w-lg mx-auto space-y-8"
            >
              <div className="w-24 h-24 bg-z-mist rounded-full flex items-center justify-center mx-auto text-z-charcoal/20">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              </div>
              <div className="space-y-4">
                <h2 className="font-display text-3xl text-z-black">Your cart is empty</h2>
                <p className="font-body text-z-charcoal/60 leading-relaxed">
                  Discover our collection of authentic attars and Arabian ouds to find your signature scent.
                </p>
              </div>
              <Link 
                href="/shop"
                className="inline-block px-12 py-4 bg-z-emerald text-z-white font-body font-bold uppercase tracking-[2px] hover:bg-z-emerald-mid transition-all"
              >
                Browse Collection
              </Link>
            </motion.div>
          )}
        </div>
      </main>
    </>
  );
}
