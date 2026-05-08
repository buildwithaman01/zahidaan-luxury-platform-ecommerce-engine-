import React from 'react';
import Link from 'next/link';
import Logo from '@/components/ui/Logo';

const Footer = () => {
  return (
    <footer className="bg-z-black text-z-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center">
              <Logo className="h-24 w-24 -ml-4" />
            </Link>
            <p className="font-body text-sm text-z-white/60 leading-relaxed max-w-xs">
              Authentic Attars & Arabian Ouds — Crafted for the Soul. Experience the spiritual essence of premium luxury fragrances.
            </p>
            <div className="flex space-x-4">
              {/* Social Icons Placeholder */}
              <a href="#" className="hover:text-z-gold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="hover:text-z-gold transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-display text-lg mb-6 text-z-gold">Quick Links</h4>
            <ul className="space-y-4 font-body text-sm text-z-white/70">
              <li><Link href="/about" className="hover:text-z-white transition-colors">Our Story</Link></li>
              <li><Link href="/blog" className="hover:text-z-white transition-colors">Fragrance Guide</Link></li>
              <li><Link href="/faq" className="hover:text-z-white transition-colors">FAQs</Link></li>
              <li><Link href="/track-order" className="hover:text-z-white transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h4 className="font-display text-lg mb-6 text-z-gold">Shop</h4>
            <ul className="space-y-4 font-body text-sm text-z-white/70">
              <li><Link href="/shop/attars" className="hover:text-z-white transition-colors">Alcohol-Free Attars</Link></li>
              <li><Link href="/shop/ouds" className="hover:text-z-white transition-colors">Arabian Ouds</Link></li>
              <li><Link href="/shop/perfumes" className="hover:text-z-white transition-colors">French Perfumes</Link></li>
              <li><Link href="/shop/gift-sets" className="hover:text-z-white transition-colors">Luxury Gift Sets</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="font-display text-lg mb-6 text-z-gold">Contact Us</h4>
            <ul className="space-y-4 font-body text-sm text-z-white/70">
              <li className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 text-z-gold"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span>Shop 1, Near Kolkuri Mall, Isnapur X Road, Sangareddy, Telangana</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-z-gold"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <a href="tel:+918297008727" className="hover:text-z-gold transition-colors">+91 82970 08727</a>
              </li>
              <li className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-z-gold"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <a href="mailto:hello.zahidaan@gmail.com" className="hover:text-z-gold transition-colors">hello.zahidaan@gmail.com</a>
              </li>
              <li className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-z-gold"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                <a href="https://share.google/phfAFGrUhbQWUcSYg" target="_blank" rel="noopener noreferrer" className="hover:text-z-gold transition-colors underline underline-offset-4">Find us on Maps</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-z-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-[12px] text-z-white/40 space-y-4 md:space-y-0">
          <div>GST No: [PLACEHOLDER]</div>
          <div>© 2025 Zahidaan Attars & Perfumes. All rights reserved.</div>
          <div className="flex space-x-6">
            <Link href="/privacy-policy" className="hover:text-z-white transition-colors">Privacy Policy</Link>
            <Link href="/return-policy" className="hover:text-z-white transition-colors">Refund Policy</Link>
            <Link href="/shipping-policy" className="hover:text-z-white transition-colors">Shipping Policy</Link>
            <Link href="/terms" className="hover:text-z-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/918297008727"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-z-emerald hover:bg-z-emerald-mid text-z-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-body text-sm font-medium">WhatsApp Us</span>
      </a>
    </footer>
  );
};

export default Footer;
