'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentSelectorProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  isCodEligible: boolean;
  orderType: 'local' | 'pan_india';
}

const PaymentSelector = ({ 
  paymentMethod, 
  setPaymentMethod, 
  isCodEligible,
  orderType 
}: PaymentSelectorProps) => {
  return (
    <div className="space-y-6">
      <h3 className="font-display text-2xl text-z-black border-b border-z-gold/10 pb-4">Payment Method</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* UPI Option */}
        <button
          type="button"
          onClick={() => setPaymentMethod('upi')}
          className={`p-6 border-2 flex flex-col items-center text-center space-y-4 transition-all ${
            paymentMethod === 'upi' ? 'border-z-gold bg-z-gold/5' : 'border-z-gold/10 hover:border-z-gold/30'
          }`}
        >
          <div className="w-12 h-12 bg-z-gold/10 flex items-center justify-center rounded-full text-z-amber">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <div>
            <div className="font-body font-bold text-sm uppercase tracking-widest">UPI / PhonePe</div>
            <div className="text-[10px] text-z-charcoal/40 uppercase mt-1">Recommended · Zero Fees</div>
          </div>
        </button>

        {/* COD Option */}
        <button
          type="button"
          disabled={!isCodEligible}
          onClick={() => setPaymentMethod('cod')}
          className={`p-6 border-2 flex flex-col items-center text-center space-y-4 transition-all ${
            paymentMethod === 'cod' ? 'border-z-gold bg-z-gold/5' : 'border-z-gold/10 hover:border-z-gold/30'
          } ${!isCodEligible ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
        >
          <div className="w-12 h-12 bg-z-gold/10 flex items-center justify-center rounded-full text-z-amber">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01"/><path d="M18 12h.01"/></svg>
          </div>
          <div>
            <div className="font-body font-bold text-sm uppercase tracking-widest">Cash on Delivery</div>
            <div className="text-[10px] text-z-charcoal/40 uppercase mt-1">
              {orderType === 'local' ? 'Free for Local' : '₹60 Service Charge'}
            </div>
          </div>
          {!isCodEligible && (
            <div className="text-[9px] text-red-500 font-bold uppercase tracking-tighter">Min. ₹599 for COD</div>
          )}
        </button>
      </div>

      {/* UPI QR Display */}
      <AnimatePresence>
        {paymentMethod === 'upi' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-z-mist p-6 text-center space-y-4 border border-z-gold/20">
              <p className="font-body text-sm text-z-charcoal/60">Scan to pay via any UPI app. We confirm your order within 2 minutes of payment.</p>
              <div className="w-48 h-48 mx-auto bg-z-white p-2 border border-z-gold/10">
                <img src="/phonepay-qr.png" alt="PhonePe UPI QR" className="w-full h-full object-contain" />
              </div>
              <p className="font-display text-lg text-z-gold font-bold uppercase tracking-widest">Zahidaan Attars & Perfumes</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentSelector;
