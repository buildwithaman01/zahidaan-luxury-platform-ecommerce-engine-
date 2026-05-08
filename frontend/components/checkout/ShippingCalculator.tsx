'use client';

import React from 'react';
import { useCartStore } from '@/lib/store';
import { calculateShipping } from '@/lib/shipping';

interface ShippingCalculatorProps {
  pincode: string;
  paymentMethod: string;
}

const ShippingCalculator = ({ pincode, paymentMethod }: ShippingCalculatorProps) => {
  const { getSubtotal } = useCartStore();
  const subtotal = getSubtotal();
  const info = calculateShipping(subtotal, pincode, paymentMethod);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-sm font-body">
        <span className="text-z-charcoal/60">Subtotal</span>
        <span className="text-z-black font-bold">₹{subtotal}</span>
      </div>
      
      <div className="flex justify-between items-center text-sm font-body">
        <div className="flex items-center space-x-2">
          <span className="text-z-charcoal/60">Shipping</span>
          {info.type === 'local' && (
            <span className="text-[9px] bg-z-emerald/10 text-z-emerald px-1.5 py-0.5 font-bold uppercase tracking-widest">Local</span>
          )}
        </div>
        <span className="text-z-black font-bold">
          {info.shipping === 0 ? 'FREE' : `₹${info.shipping}`}
        </span>
      </div>

      {info.codCharge > 0 && (
        <div className="flex justify-between items-center text-sm font-body">
          <span className="text-z-charcoal/60">COD Charge</span>
          <span className="text-z-black font-bold">₹{info.codCharge}</span>
        </div>
      )}

      <div className="pt-4 border-t border-z-gold/10 flex justify-between items-end">
        <span className="font-display text-xl text-z-black">Order Total</span>
        <span className="font-display text-3xl text-z-gold font-bold">₹{info.total}</span>
      </div>

      {info.shipping > 0 && (
        <p className="text-[10px] text-z-amber font-bold uppercase tracking-widest text-center mt-4">
          Add ₹{999 - subtotal} more for FREE shipping
        </p>
      )}
    </div>
  );
};

export default ShippingCalculator;
