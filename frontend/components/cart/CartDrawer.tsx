'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useCartStore } from '@/lib/store';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.getSubtotal());

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-z-black/60 z-[100] backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x > 100) onClose();
            }}
            className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-z-white z-[101] shadow-2xl flex flex-col"
          >
            {/* Mobile Drag Handle */}
            <div className="sm:hidden w-12 h-1 bg-z-gold/20 rounded-full mx-auto my-3" />

            {/* Header */}
            <div className="p-6 border-b border-z-gold/10 flex justify-between items-center bg-z-black text-z-white">
              <h2 className="font-display text-2xl tracking-wide uppercase">Your Cart ({items.length})</h2>
              <button onClick={onClose} className="hover:text-z-gold transition-colors p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {items.length > 0 ? (
                items.map((item) => (
                  <div key={`${item._id}-${item.size}`} className="flex space-x-4 pb-6 border-b border-z-gold/5">
                    <div className="w-20 h-24 bg-z-mist flex-shrink-0 relative overflow-hidden">
                      <ImageWithFallback 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-grow space-y-1">
                      <h3 className="font-display text-lg text-z-black">{item.name}</h3>
                      <p className="font-body text-[10px] uppercase tracking-widest text-z-charcoal/40 font-bold">{item.size}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-body text-sm">Qty: {item.quantity}</span>
                        <span className="font-display text-lg text-z-gold">₹{item.price * item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <p className="font-display text-2xl text-z-charcoal/20 italic">Your cart is empty</p>
                  <button 
                    onClick={onClose}
                    className="text-z-amber font-body text-xs uppercase tracking-widest underline underline-offset-4"
                  >
                    Start Shopping
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-z-gold/10 space-y-6 bg-z-mist">
                <div className="flex justify-between items-end">
                  <span className="font-display text-xl text-z-black">Subtotal</span>
                  <span className="font-display text-2xl text-z-gold">₹{subtotal}</span>
                </div>
                <div className="space-y-3">
                  <Link 
                    href="/checkout" 
                    onClick={onClose}
                    className="block w-full py-4 bg-z-emerald text-z-white text-center font-body font-bold uppercase tracking-[2px] hover:bg-z-emerald-mid transition-all"
                  >
                    Checkout Now
                  </Link>
                  <Link 
                    href="/cart" 
                    onClick={onClose}
                    className="block w-full py-4 border border-z-emerald text-z-emerald text-center font-body font-bold uppercase tracking-[2px] hover:bg-z-emerald/5 transition-all"
                  >
                    View Full Cart
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
