'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useUIStore } from '@/lib/ui-store';
import { useCartStore } from '@/lib/store';

const MobileNavigation = () => {
  const pathname = usePathname();
  const { openCartDrawer } = useUIStore();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: 'Home', href: '/', icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
    { name: 'Shop', href: '/shop', icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> },
    { name: 'Collections', href: '/shop/ouds', icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg> },
    { name: 'About', href: '/about', icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg> },
  ];

  if (!mounted) return null;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full z-[100] px-4 pb-6 pointer-events-none">
      <nav className="bg-z-black/90 backdrop-blur-xl border border-z-white/10 rounded-full h-18 flex items-center justify-around px-6 pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-md mx-auto relative overflow-hidden">
        {/* Subtle Animated Background Grain */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {navItems.map((item) => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className="relative flex flex-col items-center justify-center space-y-1 group"
            >
              <div className={`transition-all duration-300 ${isActive ? 'text-z-gold -translate-y-1' : 'text-z-white/60 hover:text-z-white'}`}>
                {item.icon}
              </div>
              <span className={`text-[9px] uppercase tracking-widest font-bold transition-opacity duration-300 ${isActive ? 'opacity-100 text-z-gold' : 'opacity-0'}`}>
                {item.name}
              </span>
              {isActive && (
                <motion.div 
                  layoutId="mobile-nav-indicator"
                  className="absolute -bottom-1 w-1 h-1 bg-z-gold rounded-full"
                />
              )}
            </Link>
          );
        })}

        {/* Floating Cart Trigger */}
        <button 
          onClick={openCartDrawer}
          className="relative flex flex-col items-center justify-center space-y-1 group"
        >
          <div className="text-z-white/60 hover:text-z-white transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-z-gold text-z-black text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[9px] uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-opacity">Cart</span>
        </button>
      </nav>
    </div>
  );
};

export default MobileNavigation;
