'use client';

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import { SHIPPING_CONFIG } from '@/lib/shipping';

const CartSummary = () => {
  const subtotal = useCartStore((state) => state.getSubtotal());
  
  const shipping = subtotal >= SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD ? 0 : subtotal > 0 ? SHIPPING_CONFIG.SHIPPING_CHARGE : 0;
  const total = subtotal + shipping;

  return (
    <div className="bg-z-mist p-8 space-y-6">
      <h3 className="font-display text-2xl text-z-black tracking-wide border-b border-z-gold/10 pb-4">Order Summary</h3>
      
      <div className="space-y-4 font-body text-sm">
        <div className="flex justify-between">
          <span className="text-z-charcoal/60">Subtotal</span>
          <span className="text-z-black font-bold">₹{subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-z-charcoal/60">Shipping</span>
          <span className="text-z-black font-bold">{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
        </div>
        {shipping > 0 && (
          <p className="text-[10px] text-z-amber uppercase tracking-widest font-bold">
            Add ₹{SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD - subtotal} more for FREE shipping
          </p>
        )}
      </div>

      <div className="border-t border-z-gold/10 pt-6 flex justify-between items-end">
        <span className="font-display text-xl text-z-black">Total</span>
        <span className="font-display text-3xl text-z-gold">₹{total}</span>
      </div>

      <Link 
        href="/checkout"
        className={`block w-full py-4 text-center font-body font-bold uppercase tracking-[2px] transition-all ${
          subtotal > 0 
            ? 'bg-z-emerald text-z-white hover:bg-z-emerald-mid shadow-lg shadow-z-emerald/10' 
            : 'bg-z-charcoal/10 text-z-charcoal/30 cursor-not-allowed'
        }`}
      >
        Proceed to Checkout
      </Link>

      <div className="pt-4 space-y-3">
        <div className="flex items-center space-x-3 text-[10px] text-z-charcoal/40 uppercase tracking-widest">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
          <span>Secure UPI & COD Payments</span>
        </div>
        <div className="flex items-center space-x-3 text-[10px] text-z-charcoal/40 uppercase tracking-widest">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span>100% Authentic Products</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
