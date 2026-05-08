import React from 'react';

export default function ReturnPolicy() {
  return (
    <main className="pt-44 pb-24 bg-z-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="font-display text-4xl md:text-6xl text-z-black mb-12">Refund & <span className="italic">Returns</span></h1>
        
        <div className="prose prose-lg max-w-none font-body text-z-charcoal/80 space-y-8 leading-relaxed">
          <section className="space-y-4">
            <h2 className="font-display text-2xl text-z-black">1. Perfume Hygiene Policy</h2>
            <p>
              Due to the nature of our products (fragrances and personal care), we do not accept returns or exchanges for items where the seal has been broken or the product has been used, unless the item arrived damaged or defective.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-z-black">2. Damaged or Incorrect Items</h2>
            <p>
              If your order arrives damaged or you receive the wrong product, please notify us within **24 hours** of delivery. You must provide:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>An unboxing video showing the damage/defect.</li>
              <li>Photos of the outer packaging and the label.</li>
            </ul>
            <p>
              Upon verification, we will ship a replacement at no extra cost to you.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-z-black">3. Refund Process</h2>
            <p>
              Refunds are only issued if a replacement for a damaged/defective item is unavailable. Approved refunds will be processed via UPI or original payment method within 7 business days.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-z-black">4. Order Cancellations</h2>
            <p>
              Orders can only be cancelled before they are dispatched. Once an order is shipped, it cannot be cancelled or refunded.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-z-black">5. Contact Support</h2>
            <p>
              For any return-related queries, WhatsApp us at **+91 82970 08727** or email **hello.zahidaan@gmail.com**.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
