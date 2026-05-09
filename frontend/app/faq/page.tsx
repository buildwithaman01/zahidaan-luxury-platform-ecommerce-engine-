import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Fragrance & Shipping FAQ | ZAHIDAAN",
  description: "Frequently asked questions about ZAHIDAAN attars, perfumes, alcohol-free fragrances, and pan-India shipping.",
  alternates: {
    canonical: 'https://zahidaan.in/faq/',
  },
};

const faqs = [
  {
    category: "Fragrance & Tradition",
    items: [
      {
        question: "What is attar perfume?",
        answer: "Attar (also spelled ittar) is a natural perfume oil distilled from botanical ingredients such as flowers, herbs, spices, and woods. Unlike alcohol-based perfumes, attars are alcohol-free, making them suitable for sensitive skin and permissible for those who prefer alcohol-free fragrances."
      },
      {
        question: "Is attar alcohol-free?",
        answer: "Yes. Traditional attars are 100% alcohol-free. They are concentrated natural oils that are applied directly to the skin. At ZAHIDAAN, all our attars are pure, alcohol-free, and skin-friendly."
      },
      {
        question: "What is the difference between attar and EDP?",
        answer: "Attar is a pure, concentrated natural oil with no alcohol or synthetic carriers — applied in small quantities directly to skin. EDP (Eau de Parfum) is an alcohol-based spray with typically 15–20% fragrance concentration. Attars are generally longer-lasting and more intimate, while EDPs project more strongly."
      }
    ]
  },
  {
    category: "Ordering & Shipping",
    items: [
      {
        question: "Do you deliver pan-India?",
        answer: "Yes. ZAHIDAAN delivers across India via DTDC and India Post. For orders within Patancheru and nearby areas, we offer same-day or next-day local delivery. Pan-India orders are typically delivered in 3–7 business days."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept UPI payments (via PhonePe, Google Pay, any UPI app) and Cash on Delivery (COD) for eligible orders. COD is available for local orders at no extra charge. For pan-India COD orders, a flat handling fee of ₹60 applies."
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.flatMap(cat => cat.items.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            })))
          })
        }}
      />
      <main className="bg-z-white min-h-screen">
        <section className="pt-52 pb-20 bg-z-black text-z-white">
          <div className="container mx-auto px-6 text-center">
            <h1 className="font-display text-5xl md:text-7xl mb-6">Common <span className="italic text-z-gold">Inquiries</span></h1>
            <p className="font-body text-sm uppercase tracking-[4px] text-z-white/40 max-w-lg mx-auto">Everything you need to know about ZAHIDAAN fragrances and service.</p>
          </div>
        </section>

        <section className="py-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="space-y-24">
              {faqs.map((category, catIndex) => (
                <div key={catIndex} className="space-y-12">
                  <div className="flex items-center gap-6">
                    <h2 className="font-display text-sm uppercase tracking-[5px] text-z-gold whitespace-nowrap">{category.category}</h2>
                    <div className="w-full h-[1px] bg-z-gold/10" />
                  </div>
                  
                  <div className="grid grid-cols-1 gap-12">
                    {category.items.map((faq, index) => (
                      <div key={index} className="group border-l border-z-gold/10 pl-8 hover:border-z-gold transition-all duration-500">
                        <h3 className="font-display text-2xl text-z-black mb-4 group-hover:text-z-gold transition-colors">{faq.question}</h3>
                        <p className="font-body text-z-charcoal/60 leading-relaxed text-base">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Need more help? */}
            <div className="mt-32 p-12 bg-z-mist/30 text-center border border-z-gold/5">
              <h3 className="font-display text-2xl text-z-black mb-4">Still have questions?</h3>
              <p className="font-body text-z-charcoal/60 mb-8">Our fragrance experts are available for personalized consultation.</p>
              <a href="/contact" className="inline-block px-10 py-4 border border-z-black text-z-black font-body font-bold uppercase tracking-widest hover:bg-z-black hover:text-z-gold transition-all duration-500">
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
