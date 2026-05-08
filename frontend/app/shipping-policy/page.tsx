import React from 'react';

export default function ShippingPolicy() {
  return (
    <main className="pt-44 pb-24 bg-z-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="font-display text-4xl md:text-6xl text-z-black mb-12">Shipping <span className="italic">Policy</span></h1>
        
        <div className="prose prose-lg max-w-none font-body text-z-charcoal/80 space-y-8 leading-relaxed">
          <section className="space-y-4">
            <h2 className="font-display text-2xl text-z-black">1. Dispatch Timeline</h2>
            <p>
              At ZAHIDAAN, every fragrance is hand-packed with care. Orders are typically processed and dispatched within 2–4 business days after payment verification. You will receive a WhatsApp notification with tracking details as soon as your order leaves our boutique.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-z-black">2. Delivery Estimates</h2>
            <p>
              Depending on your location in India, shipping usually takes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Hyderabad & Telangana:</strong> 3–5 Business Days</li>
              <li><strong>Major Metros (Delhi, Mumbai, Bangalore):</strong> 5–10 Business Days</li>
              <li><strong>Rest of India:</strong> 7–15 Business Days</li>
            </ul>
            <p className="italic text-sm">
              Note: Extreme weather conditions, public holidays, or logistics issues in remote areas may occasionally extend these timelines.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-z-black">3. Shipping Charges</h2>
            <p>
              We offer **FREE SHIPPING** on all orders above ₹1500. For orders below this amount, a flat shipping fee of ₹100 is applied at checkout.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-z-black">4. Tracking Your Order</h2>
            <p>
              Once your order is shipped, you will receive a tracking link via WhatsApp and Email. You can also track your status directly on our website using the link provided in your order confirmation.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-z-black">5. Service Areas</h2>
            <p>
              We currently ship across all pin-codes in India. For international inquiries, please contact us directly on WhatsApp at +91 82970 08727.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
