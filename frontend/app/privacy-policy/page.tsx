import React from 'react';

export default function PrivacyPolicy() {
  return (
    <main className="pt-44 pb-24 bg-z-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="font-display text-4xl md:text-6xl text-z-black mb-12">Privacy <span className="italic">Policy</span></h1>
        
        <div className="prose prose-lg max-w-none font-body text-z-charcoal/80 space-y-8 leading-relaxed">
          <section className="space-y-4">
            <h2 className="font-display text-2xl text-z-black">1. Information We Collect</h2>
            <p>
              When you place an order on ZAHIDAAN, we collect essential information including your name, shipping address, phone number, and email address to process your delivery and send order updates.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-z-black">2. Payment Security</h2>
            <p>
              We do not store your credit card or bank details. All payments are processed through secure external gateways (like PhonePe). Your UTR/Transaction number is only used for manual verification of payment.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-z-black">3. How We Use Data</h2>
            <p>
              Your data is used solely for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Processing and delivering your orders.</li>
              <li>Sending WhatsApp/Email notifications about order status.</li>
              <li>Improving our fragrance collection and service based on customer feedback.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-z-black">4. Third-Party Sharing</h2>
            <p>
              We only share your shipping address and contact number with our trusted courier partners to ensure successful delivery. We never sell or rent your personal information to third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-z-black">5. Cookies</h2>
            <p>
              Our website uses cookies to enhance your browsing experience and remember items in your cart. You can choose to disable cookies in your browser settings.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-z-black">6. Updates</h2>
            <p>
              We may update this policy periodically. Any changes will be posted on this page. For privacy concerns, email us at hello.zahidaan@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
