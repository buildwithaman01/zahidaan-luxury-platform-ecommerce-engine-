'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PaymentSelectorProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  isCodEligible: boolean;
  orderType: 'local' | 'pan_india';
  totalAmount: number;
}

const PaymentSelector = ({ 
  paymentMethod, 
  setPaymentMethod, 
  isCodEligible,
  orderType,
  totalAmount
}: PaymentSelectorProps) => {
  return (
    <div className="space-y-8">
      <h3 className="font-display text-2xl text-z-black border-b border-z-gold/10 pb-4">Payment Method</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* UPI Option */}
        <button
          type="button"
          onClick={() => setPaymentMethod('upi')}
          className={`relative p-6 border-2 flex flex-col items-center text-center space-y-4 transition-all duration-500 overflow-hidden ${
            paymentMethod === 'upi' ? 'border-z-gold bg-z-gold/5' : 'border-z-gold/10 hover:border-z-gold/30'
          }`}
        >
          {paymentMethod === 'upi' && (
            <motion.div layoutId="active-bg" className="absolute inset-0 bg-gradient-to-br from-z-gold/5 to-transparent -z-10" />
          )}
          <div className="w-12 h-12 bg-z-gold/10 flex items-center justify-center rounded-full text-z-amber">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
          <div>
            <div className="font-body font-bold text-sm uppercase tracking-widest">PhonePe / UPI</div>
            <div className="text-[10px] text-z-emerald font-bold uppercase mt-1 tracking-wider">Most Popular · Zero Fees</div>
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

      {/* UPI QR Display Overhaul */}
      <AnimatePresence mode="wait">
        {paymentMethod === 'upi' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="p-6 md:p-10 bg-z-mist border border-z-gold/20 rounded-sm space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              {/* QR Code Section */}
              <div className="space-y-8 flex flex-col items-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="flex items-center space-x-1">
                      <div className="w-5 h-5 bg-[#5f259f] rounded-full flex items-center justify-center text-white font-bold text-[10px]">पे</div>
                      <span className="font-body text-sm font-bold text-[#5f259f]">PhonePe</span>
                    </div>
                    <div className="h-4 w-[1px] bg-z-gold/30" />
                    <span className="font-body text-[10px] uppercase tracking-[3px] text-z-emerald font-bold">Verified Payment Gateway</span>
                  </div>
                  <div className="px-10 py-3 bg-z-black text-z-gold font-display text-base tracking-[6px] rounded-sm border border-z-gold/20 shadow-2xl uppercase relative overflow-hidden group">
                    <motion.div 
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                    />
                    Official Zahidaan Scanner
                  </div>
                </div>

                <div className="relative group mx-auto w-fit">
                  {/* Luxury Animated Frame */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-z-gold via-z-amber to-z-gold opacity-30 blur-[2px] group-hover:opacity-100 transition duration-1000 animate-pulse" />
                  
                  {/* The Absolute Real Client QR Code */}
                  <div className="relative bg-z-white p-8 shadow-2xl border-4 border-z-black overflow-hidden">
                    {/* Zahidaan Internal Brand Watermark */}
                    <div className="absolute top-2 left-0 right-0 text-center opacity-[0.03] font-display text-4xl pointer-events-none select-none uppercase tracking-[10px]">
                      Zahidaan
                    </div>

                    {/* Scanning Animation Line */}
                    <motion.div 
                      initial={{ top: 0 }}
                      animate={{ top: '100%' }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                      className="absolute left-0 right-0 h-[3px] bg-z-gold/60 z-10 blur-[2px] shadow-[0_0_15px_rgba(197,160,89,0.8)]"
                    />
                    
                    <img 
                      src="/phonepay-qr.png" 
                      alt="OFFICIAL ZAHIDAAN SCANNER" 
                      className="w-64 h-auto object-contain relative z-0" 
                    />

                    {/* Boutique Plaque at bottom of frame */}
                    <div className="absolute bottom-0 left-0 right-0 bg-z-black py-1 text-center">
                      <span className="text-[7px] text-z-gold font-display uppercase tracking-[4px]">Boutique Terminal</span>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-2">
                  <p className="font-body text-[11px] text-z-black font-bold uppercase tracking-[8px] animate-pulse">Strictly Scan & Pay</p>
                </div>
              </div>

              {/* Steps Section */}
              <div className="space-y-8">
                <div className="space-y-4 text-center md:text-left">
                  <h4 className="font-body text-[10px] uppercase tracking-[4px] text-z-charcoal/40 font-bold">How to Pay</h4>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-z-gold/20 text-z-amber flex items-center justify-center text-xs font-bold shrink-0">1</div>
                      <p className="font-body text-xs text-z-charcoal/80">Scan the QR code with any payment app (PhonePe, Google Pay, Paytm)</p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-z-gold/20 text-z-amber flex items-center justify-center text-xs font-bold shrink-0">2</div>
                      <div>
                        <p className="font-body text-xs text-z-charcoal/80 mb-2">Pay exactly the amount below:</p>
                        <div className="bg-z-white px-4 py-2 border border-z-gold/30 rounded-sm inline-block">
                          <span className="font-display text-2xl text-z-black">₹{totalAmount}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-z-gold/20 text-z-amber flex items-center justify-center text-xs font-bold shrink-0">3</div>
                      <p className="font-body text-xs text-z-charcoal/80 font-bold text-z-amber uppercase tracking-wider">After payment, enter the 12-digit UTR ID below</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-z-gold/10 flex items-center gap-4">
                  <a 
                    href="https://wa.me/918297008727?text=I%20need%20help%20with%20my%20payment%20on%20Zahidaan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 group/wa"
                  >
                    <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 shrink-0 group-hover/wa:bg-green-600 group-hover/wa:text-white transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </div>
                    <div>
                      <p className="font-body text-[10px] text-z-charcoal/40 uppercase font-bold tracking-widest">Payment Help</p>
                      <p className="font-body text-xs text-z-black">WhatsApp support: <span className="font-bold text-green-600 group-hover/wa:underline transition-all">Within 5 mins we will help</span></p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentSelector;
