'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import Logo from '@/components/ui/Logo';
import { useUIStore } from '@/lib/ui-store';
import { useCartStore } from '@/lib/store';

const CartDrawer = dynamic(() => import('@/components/cart/CartDrawer'), {
  ssr: false,
});

const Navbar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isCartDrawerOpen, openCartDrawer, closeCartDrawer } = useUIStore();
  const totalItems = useCartStore((state) => state.getTotalItems());

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop', href: '/shop' },
    { name: 'Attars', href: '/shop/attars' },
    { name: 'Ouds', href: '/shop/ouds' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          isScrolled || !isHomePage ? 'py-0' : 'py-6'
        }`}
      >
        <motion.nav
          initial={false}
          animate={{
            backgroundColor: isScrolled || !isHomePage ? 'rgba(12, 12, 12, 0.98)' : 'rgba(0, 0, 0, 0)',
            borderBottom: isScrolled || !isHomePage ? '1px solid rgba(212, 175, 55, 0.15)' : '1px solid rgba(255, 255, 255, 0)',
            height: isScrolled || !isHomePage ? '80px' : '90px',
            backdropFilter: isScrolled || !isHomePage ? 'blur(20px)' : 'blur(0px)',
          }}
          className="w-full relative overflow-hidden transition-all duration-500 flex items-center"
        >
          {/* Subtle Premium Texture (Noise) - Only when solid */}
          {(isScrolled || !isHomePage) && (
            <div 
              className="absolute inset-0 opacity-[0.04] pointer-events-none bg-repeat"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
              }}
            />
          )}

          <div className="container mx-auto px-6 md:px-12 relative z-10">
            {/* Mobile Header: 3-Column Grid for Perfect Symmetry */}
            <div className="lg:hidden grid grid-cols-3 items-center h-full">
              {/* Left: Search */}
              <div className="flex justify-start">
                <button 
                  onClick={() => useUIStore.getState().openSearch()}
                  className="text-z-white p-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </button>
              </div>

              {/* Center: Logo */}
              <div className="flex justify-center">
                <Link href="/" className="group">
                  <Logo className={`${isScrolled || !isHomePage ? 'h-14 w-14' : 'h-18 w-18'} transition-all duration-500`} />
                </Link>
              </div>

              {/* Right: Actions */}
              <div className="flex justify-end space-x-2">
                <button 
                  onClick={openCartDrawer}
                  className="text-z-white relative p-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                  {mounted && totalItems > 0 && (
                    <span className="absolute top-0 right-0 bg-z-gold text-z-black text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>
                <button 
                  className="text-z-white p-2"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                </button>
              </div>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:flex justify-between items-center h-full">
              {/* Left: Brand Logo */}
              <Link href="/" className="group">
                <Logo className={`${isScrolled || !isHomePage ? 'h-18 w-18' : 'h-26 w-26'} transition-all duration-500`} />
              </Link>

              {/* Center: Nav Links */}
              <div className="flex items-center space-x-12">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="font-body text-[11px] font-bold uppercase tracking-[3px] text-z-white hover:text-z-gold transition-all duration-300 relative group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-z-gold transition-all duration-500 group-hover:w-full" />
                  </Link>
                ))}
              </div>

              {/* Right: Icons */}
              <div className="flex items-center space-x-8">
                <button 
                  onClick={() => useUIStore.getState().openSearch()}
                  className="text-z-white hover:text-z-gold transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                </button>
                
                <button 
                  onClick={openCartDrawer}
                  className="text-z-white hover:text-z-gold transition-colors relative p-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                  {mounted && totalItems > 0 && (
                    <span className="absolute top-0 right-0 bg-z-gold text-z-black text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.nav>
 
        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-0 z-[60] bg-z-black flex flex-col p-8 md:p-12 overflow-y-auto"
            >
              <div className="flex flex-col space-y-12 mt-8">
                {/* Categories Section */}
                <div className="space-y-6">
                  <p className="font-body text-[9px] uppercase tracking-[4px] text-z-gold/50 font-bold border-b border-z-gold/10 pb-2">Collections</p>
                  <div className="flex flex-col space-y-4">
                    {[
                      { name: 'Shop All', href: '/shop' },
                      { name: 'Pure Attars', href: '/shop/attars' },
                      { name: 'Arabian Ouds', href: '/shop/ouds' },
                      { name: 'French Perfumes', href: '/shop/perfumes' },
                      { name: 'Premium Bakhoor', href: '/shop/bakhoor' },
                    ].map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="font-display text-2xl text-z-white hover:text-z-gold transition-colors flex items-center justify-between group"
                      >
                        {item.name}
                        <span className="text-z-gold opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Info Section */}
                <div className="space-y-6">
                  <p className="font-body text-[9px] uppercase tracking-[4px] text-z-white/30 font-bold border-b border-z-white/5 pb-2">The Boutique</p>
                  <div className="flex flex-col space-y-4">
                    {[
                      { name: 'Our Story', href: '/about' },
                      { name: 'Fragrance Blog', href: '/blog' },
                      { name: 'Track Order', href: '/order-status' },
                      { name: 'Contact Us', href: '/contact' },
                    ].map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="font-body text-sm uppercase tracking-widest text-z-white/70 hover:text-z-white transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Menu Footer */}
              <div className="mt-auto pt-12 space-y-8">
                <div className="flex justify-between items-end border-t border-z-white/5 pt-8">
                  <div className="space-y-2">
                    <p className="font-body text-[9px] uppercase tracking-[4px] text-z-white/30 font-bold">Support</p>
                    <a href="tel:+918297008727" className="font-body text-z-white hover:text-z-gold text-sm block tracking-widest">+91 82970 08727</a>
                  </div>
                  <div className="flex space-x-4">
                    {['IG', 'FB', 'WA'].map((social) => (
                      <a key={social} href="#" className="w-8 h-8 rounded-full border border-z-gold/20 flex items-center justify-center text-[10px] text-z-gold font-bold">{social}</a>
                    ))}
                  </div>
                </div>

                <Link 
                  href="/shop"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full py-4 bg-z-gold text-z-black text-center font-body font-bold uppercase tracking-[3px] text-[11px] rounded-sm"
                >
                  Explore Collection
                </Link>
              </div>

              <button 
                className="absolute top-6 right-6 text-z-white p-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <CartDrawer isOpen={isCartDrawerOpen} onClose={closeCartDrawer} />
    </>
  );
};

export default Navbar;
