'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function TrackOrderPage() {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleTrack = () => {
    if (!trackingNumber) return;
    
    // Simple logic: if it starts with 'D' assume DTDC, if 'I' or numbers assume India Post
    const num = trackingNumber.trim().toUpperCase();
    if (num.startsWith('D')) {
      window.open(`https://www.dtdc.in/tracking/tracking_results.asp?SearchType=T&TNo=${num}`, '_blank');
    } else {
      window.open(`https://www.indiapost.gov.in/_layouts/15/dop.indiapost.reportinterface/pages/trackconsignment.aspx`, '_blank');
    }
  };

  return (
    <>
      <main className="pt-44 pb-24 bg-z-white">
        <div className="container mx-auto px-6 max-w-xl text-center">
          <h1 className="font-display text-4xl text-z-black mb-8">Track Your <span className="italic">Order</span></h1>
          <p className="font-body text-z-charcoal/60 mb-12">Enter your tracking number provided in your shipment confirmation email.</p>
          
          <div className="space-y-8 text-left">
            <div className="flex flex-col">
              <label className="text-[10px] uppercase tracking-widest font-bold mb-2 opacity-50">Tracking Number</label>
              <input 
                type="text" 
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="e.g. DTDC123456789"
                className="w-full bg-z-mist border border-z-gold/10 p-4 rounded-none focus:outline-none focus:border-z-gold/40 font-body transition-all"
              />
            </div>
            <button 
              onClick={handleTrack}
              disabled={!trackingNumber}
              className="w-full bg-z-emerald text-z-white py-5 font-body font-bold uppercase tracking-[2px] hover:bg-z-emerald-mid transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-z-emerald/10"
            >
              Track Status
            </button>
            
            <div className="bg-z-mist/50 p-6 space-y-4 border border-z-gold/5">
              <h4 className="font-display text-lg text-z-black">Delivery Notes</h4>
              <ul className="space-y-3 font-body text-xs text-z-charcoal/60 leading-relaxed list-disc pl-4">
                <li>Orders within <strong>Patancheru</strong> are delivered personally and can be tracked directly via WhatsApp.</li>
                <li>Pan-India shipments are handled by DTDC or India Post.</li>
                <li>Tracking details usually become active 24 hours after dispatch.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
