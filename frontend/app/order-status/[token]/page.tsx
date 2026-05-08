'use client';

import React, { useEffect, useState } from 'react';
import { getOrderStatus } from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const StatusBadge = ({ status }: { status: string }) => {
  const configs: { [key: string]: { color: string; bg: string; text: string; icon: any } } = {
    pending: { 
      color: 'text-z-amber', 
      bg: 'bg-z-amber/10', 
      text: 'Order Received - Pending Confirmation',
      icon: <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>
    },
    confirmed: { 
      color: 'text-z-emerald', 
      bg: 'bg-z-emerald/10', 
      text: 'Order Confirmed',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
    },
    cancelled: { 
      color: 'text-red-600', 
      bg: 'bg-red-50', 
      text: 'Order Cancelled',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    },
    shipped: { 
      color: 'text-blue-600', 
      bg: 'bg-blue-50', 
      text: 'Order Shipped',
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polyline points="16 8 20 8 23 11 23 16 16 16"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
    },
  };

  const config = configs[status] || configs.pending;

  return (
    <div className={`flex items-center space-x-3 px-6 py-4 rounded-none border border-current ${config.bg} ${config.color}`}>
      {config.icon}
      <span className="font-body font-bold uppercase tracking-widest text-sm">{config.text}</span>
    </div>
  );
};

export default function OrderStatusPage({ params }: { params: Promise<{ token: string }> }) {
  const unwrappedParams = React.use(params);
  const token = unwrappedParams.token;
  const [statusData, setStatusData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
        setLoading(false);
        return;
    }

    const fetchStatus = async () => {
      try {
        const data = await getOrderStatus(token as string);
        if (data.success) {
          setStatusData(data);
        }
      } catch (error) {
        console.error("Failed to fetch order status:", error);
      }
      setLoading(false);
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 15000); // Poll every 15s

    return () => clearInterval(interval);
  }, [token]);

  if (loading) {
    return (
      <main className="pt-32 pb-24 bg-z-white min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-z-gold"></div>
      </main>
    );
  }

  if (!token || !statusData) {
    return (
        <main className="pt-32 pb-24 bg-z-white min-h-[60vh] flex items-center justify-center">
          <div className="text-center space-y-6">
            <h2 className="font-display text-3xl mb-4 text-z-black">Order Not Found</h2>
            <p className="font-body text-z-charcoal/60">We couldn't find an order with that token. Please check your link.</p>
            <Link href="/shop" className="inline-block px-8 py-3 bg-z-black text-z-gold font-body font-bold uppercase tracking-widest">
              Back to Shop
            </Link>
          </div>
        </main>
    );
  }

  return (
    <main className="pt-44 pb-24 bg-z-white min-h-[70vh]">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="text-center space-y-6 mb-12">
            <h1 className="font-display text-4xl md:text-5xl text-z-black">Order <span className="italic">Status</span></h1>
            <p className="font-body text-z-charcoal/60 uppercase tracking-widest text-xs">Order ID: #{statusData.order_id}</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={statusData.status}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <StatusBadge status={statusData.status} />

              <div className="bg-z-mist p-8 space-y-8 border border-z-gold/10">
                <div className="space-y-4">
                  <h3 className="font-display text-2xl text-z-black">What Happens Next?</h3>
                  <div className="space-y-6">
                    {statusData.status === 'pending' && (
                      <p className="font-body text-sm text-z-charcoal/70 leading-relaxed">
                        We have received your order request. If you chose <strong>UPI payment</strong>, our team will verify the payment within a few minutes and confirm your order. You will receive a WhatsApp notification once confirmed.
                      </p>
                    )}
                    {statusData.status === 'confirmed' && (
                      <p className="font-body text-sm text-z-charcoal/70 leading-relaxed">
                        Jazakallah! Your order has been confirmed. We are currently preparing your package for shipment. You'll receive tracking details via WhatsApp as soon as it's dispatched.
                      </p>
                    )}
                    {statusData.status === 'cancelled' && (
                      <p className="font-body text-sm text-z-charcoal/70 leading-relaxed">
                        This order has been cancelled. If you believe this is an error or need a refund for a UPI payment, please WhatsApp us immediately.
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-8 border-t border-z-gold/10 flex flex-col sm:flex-row gap-4">
                  <a 
                    href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '918297008727'}?text=Hi, I have a question about my order #${statusData.order_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-grow py-4 bg-z-emerald text-z-white text-center font-body font-bold uppercase tracking-widest hover:bg-z-emerald-mid transition-all"
                  >
                    WhatsApp Support
                  </a>
                  <button 
                    onClick={() => window.location.reload()}
                    className="px-8 py-4 border border-z-gold text-z-gold font-body font-bold uppercase tracking-widest hover:bg-z-gold/5 transition-all"
                  >
                    Refresh Status
                  </button>
                </div>
              </div>

              <div className="text-center space-y-8">
                <p className="font-body text-[10px] text-z-charcoal/40 uppercase tracking-[3px]">Thank you for choosing ZAHIDAAN</p>
                <Link href="/" className="inline-block font-body text-xs text-z-gold underline underline-offset-8 uppercase tracking-widest hover:text-z-amber transition-colors">
                  Return to Home
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
  );
}
