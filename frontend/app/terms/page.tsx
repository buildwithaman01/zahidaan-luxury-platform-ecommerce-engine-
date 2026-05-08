import React from 'react';

export default function TermsPage() {
  return (
    <main className="pt-44 pb-24 bg-z-white">
      <div className="container mx-auto px-6 max-w-4xl">
        <h1 className="font-display text-4xl md:text-6xl text-z-black mb-12">Terms & <span className="italic">Conditions</span></h1>
        
        <div className="prose prose-lg max-w-none font-body text-z-charcoal/80 space-y-8 leading-relaxed">
          <section className="space-y-4">
            <h2 className="font-display text-2xl text-z-black">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the ZAHIDAAN website (zahidaan.in), you agree to comply with and be bound by these Terms and Conditions. These terms apply to all visitors, users, and customers of the site.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-z-black">2. Product Information</h2>
            <p>
              We strive to display our fragrance products and their colors as accurately as possible. However, the actual color you see depends on your device monitor. Perfume notes and descriptions are provided for guidance; the final olfactory experience may vary by individual.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-z-black">3. Pricing & Payments</h2>
            <p>
              All prices are in Indian Rupees (INR) and include applicable taxes unless stated otherwise. We reserve the right to change prices without notice. Payments via UPI/PhonePe are verified manually before order confirmation.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-z-black">4. Intellectual Property</h2>
            <p>
              The ZAHIDAAN name, logo, images, and content are the exclusive property of ZAHIDAAN. Any unauthorized use, reproduction, or distribution of these assets is strictly prohibited.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-z-black">5. Liability Limitation</h2>
            <p>
              ZAHIDAAN shall not be liable for any indirect, incidental, or consequential damages resulting from the use or inability to use our products or website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl text-z-black">6. Contact Information</h2>
            <p>
              For questions regarding these Terms, please contact us at hello.zahidaan@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
