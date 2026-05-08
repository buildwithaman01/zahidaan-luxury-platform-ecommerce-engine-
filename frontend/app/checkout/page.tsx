'use client';

import React from 'react';
import OrderForm from '@/components/checkout/OrderForm';
import { useCartStore } from '@/lib/store';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();

  if (items.length === 0) {
    return (
      <main className="pt-32 pb-24 bg-z-white min-h-[60vh] flex flex-col items-center justify-center space-y-6">
        <h1 className="font-display text-4xl text-z-black">Your cart is empty</h1>
        <Link href="/shop" className="px-8 py-3 bg-z-emerald text-z-white font-body font-bold uppercase tracking-widest">
          Back to Shop
        </Link>
      </main>
    );
  }

  return (
    <main className="pt-44 pb-24 bg-z-white">
      <div className="container mx-auto px-6">
        <h1 className="font-display text-4xl md:text-5xl text-z-black mb-12">Secure <span className="italic">Checkout</span></h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <OrderForm />
          </div>

          {/* Right Column: Order Summary */}
          <aside className="lg:col-span-5">
            <div className="bg-z-mist p-8 sticky top-32 space-y-8 border border-z-gold/10">
              <h3 className="font-display text-2xl text-z-black border-b border-z-gold/10 pb-4">Your Order</h3>
              
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={`${item._id}-${item.size}`} className="flex justify-between items-start">
                    <div className="flex space-x-4">
                      <div className="w-12 h-16 bg-z-mist flex-shrink-0 relative overflow-hidden">
                        <ImageWithFallback 
                          src={item.image} 
                          alt={item.name} 
                          width={100}
                          height={150}
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <p className="font-body text-sm font-bold text-z-black">{item.name}</p>
                        <p className="font-body text-[10px] text-z-charcoal/40 uppercase tracking-widest">{item.size} × {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-display text-lg text-z-black">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-z-gold/10 pt-6 space-y-4">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-z-charcoal/60">Subtotal</span>
                  <span className="font-bold">₹{subtotal}</span>
                </div>
                <p className="text-[10px] text-z-charcoal/40 uppercase text-center italic">
                  Shipping & COD charges calculated on form
                </p>
              </div>

              <div className="pt-6 space-y-3">
                <div className="flex items-center space-x-3 text-[10px] text-z-charcoal/40 uppercase tracking-widest font-bold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-z-amber"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center space-x-3 text-[10px] text-z-charcoal/40 uppercase tracking-widest font-bold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-z-amber"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  <span>Estimated 3-5 Day Delivery</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
