import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Us | ZAHIDAAN Attars & Perfumes",
  description: "Get in touch with ZAHIDAAN. Visit our boutique in Patancheru or reach out for inquiries about our authentic fragrances.",
  alternates: {
    canonical: 'https://zahidaan.in/contact/',
  },
};

export default function ContactPage() {
  return (
    <main className="bg-z-white min-h-screen">
      {/* Minimal Hero */}
      <section className="pt-52 pb-20 bg-z-black text-z-white border-b border-z-gold/10">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-display text-5xl md:text-7xl mb-6">Let's <span className="italic text-z-gold">Connect</span></h1>
          <p className="font-body text-sm uppercase tracking-[4px] text-z-white/40">Inquiries · Consultations · Orders</p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            
            {/* Info Column */}
            <div className="lg:col-span-5 space-y-16">
              <div className="space-y-8">
                <h2 className="font-display text-3xl text-z-black">Find Us</h2>
                <div className="space-y-4 font-body text-lg text-z-charcoal/80">
                  <p className="flex items-start gap-4">
                    <span className="text-z-gold mt-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                    </span>
                    Shop 1, Near Kolkuri Shopping Mall,<br />
                    Isnapur X Road, Patancheru,<br />
                    Sangareddy, Telangana – 502307
                  </p>
                  <p className="flex items-center gap-4">
                    <span className="text-z-gold">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                    </span>
                    +91 82970 08727
                  </p>
                  <p className="flex items-center gap-4">
                    <span className="text-z-gold">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                    </span>
                    hello.zahidaan@gmail.com
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <h2 className="font-display text-3xl text-z-black">Hours of Essence</h2>
                <div className="font-body text-z-charcoal/60 space-y-2 uppercase tracking-widest text-xs">
                  <p className="flex justify-between border-b border-z-gold/10 pb-2">
                    <span>Monday – Saturday</span>
                    <span className="text-z-black font-bold">10:00 – 21:00</span>
                  </p>
                  <p className="flex justify-between pb-2">
                    <span>Sunday</span>
                    <span className="text-z-amber font-bold">By Appointment Only</span>
                  </p>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a 
                href="https://wa.me/918297008727" 
                target="_blank"
                className="block p-8 bg-z-emerald text-z-white group transition-all duration-500 hover:bg-z-emerald-mid"
              >
                <p className="font-body text-[10px] uppercase tracking-[4px] mb-2 opacity-60">Immediate Assistance</p>
                <p className="font-display text-2xl flex items-center justify-between">
                  Chat on WhatsApp
                  <span className="group-hover:translate-x-2 transition-transform">→</span>
                </p>
              </a>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7 bg-z-mist/30 p-12 border border-z-gold/5">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="font-body text-[11px] uppercase tracking-widest text-z-charcoal/40">Your Name</label>
                  <input type="text" className="w-full bg-transparent border-b border-z-gold/20 py-3 focus:outline-none focus:border-z-gold transition-colors" placeholder="Full Name" />
                </div>
                <div className="space-y-2">
                  <label className="font-body text-[11px] uppercase tracking-widest text-z-charcoal/40">Email Address</label>
                  <input type="email" className="w-full bg-transparent border-b border-z-gold/20 py-3 focus:outline-none focus:border-z-gold transition-colors" placeholder="email@example.com" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="font-body text-[11px] uppercase tracking-widest text-z-charcoal/40">Subject</label>
                  <select className="w-full bg-transparent border-b border-z-gold/20 py-3 focus:outline-none focus:border-z-gold transition-colors appearance-none">
                    <option>Product Inquiry</option>
                    <option>Order Status</option>
                    <option>Wholesale/B2B</option>
                    <option>Fragrance Consultation</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="font-body text-[11px] uppercase tracking-widest text-z-charcoal/40">Your Message</label>
                  <textarea rows={5} className="w-full bg-transparent border border-z-gold/10 p-4 focus:outline-none focus:border-z-gold transition-colors" placeholder="How can we help you discover your essence?"></textarea>
                </div>
                <div className="md:col-span-2">
                  <button type="submit" className="w-full py-5 bg-z-black text-z-gold font-body font-bold uppercase tracking-[3px] hover:bg-z-gold hover:text-z-black transition-all duration-500 shadow-xl shadow-z-black/10">
                    Send Message
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-[400px] w-full bg-z-mist grayscale overflow-hidden relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-z-charcoal/40 bg-z-mist/80 backdrop-blur-sm z-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 text-z-gold/50"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
          <a 
            href="https://share.google/phfAFGrUhbQWUcSYg" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-3 bg-z-black text-z-gold font-body text-xs uppercase tracking-widest hover:bg-z-gold hover:text-z-black transition-all duration-500"
          >
            Open in Google Maps
          </a>
        </div>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3803.123456789!2d78.3012!3d17.5285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTfCsDMxJzQyLjYiTiA3OMKwMTgnMDQuMyJF!5e0!3m2!1sen!2sin!4v1234567890" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          loading="lazy"
        ></iframe>
      </section>
    </main>
  );
}
