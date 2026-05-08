import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms & Conditions | ZAHIDAAN",
  description: "Terms of service and usage for the ZAHIDAAN online storefront.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="bg-z-white min-h-screen">
        <section className="pt-48 pb-16 bg-z-black text-z-white">
          <div className="container mx-auto px-6">
            <h1 className="font-display text-5xl md:text-6xl mb-4">Terms & <span className="italic text-z-gold">Conditions</span></h1>
            <p className="font-body text-xs uppercase tracking-[4px] text-z-white/40">Last Updated: May 2025</p>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="prose prose-stone font-body text-z-charcoal/80 space-y-12 leading-relaxed">
              <div className="space-y-4">
                <h2 className="font-display text-3xl text-z-black">1. General</h2>
                <p>Welcome to ZAHIDAAN. By accessing this website and placing an order, you agree to comply with and be bound by the following terms and conditions. If you disagree with any part of these terms, please do not use our website.</p>
              </div>

              <div className="space-y-4">
                <h2 className="font-display text-3xl text-z-black">2. Orders & Payments</h2>
                <p>All orders are subject to availability and confirmation of the order price. We accept payments via UPI (PhonePe, GPay, etc.) and Cash on Delivery (for eligible orders). Orders are only processed after payment confirmation for UPI orders.</p>
              </div>

              <div className="space-y-4">
                <h2 className="font-display text-3xl text-z-black">3. Delivery</h2>
                <p>We ship pan-India via DTDC and India Post. Estimated delivery times are 3-5 days for local orders and 5-8 days for other regions. We are not responsible for delays caused by courier services or incorrect address information provided by the customer.</p>
              </div>

              <div className="space-y-4">
                <h2 className="font-display text-3xl text-z-black">4. Intellectual Property</h2>
                <p>All content on this website, including but not limited to the ZAHIDAAN logo, product names, and artisanal photography, is the property of Zahidaan Attars & Perfumes and is protected by copyright laws.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
