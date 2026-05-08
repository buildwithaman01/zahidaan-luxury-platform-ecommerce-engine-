'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const categories = [
  { name: 'All Collection', href: '/shop' },
  { name: 'Alcohol-Free Attars', href: '/shop/attars' },
  { name: 'Arabian Ouds', href: '/shop/ouds' },
  { name: 'French Perfumes', href: '/shop/perfumes' },
  { name: 'Bakhoor & Incense', href: '/shop/bakhoor' },
  { name: 'Luxury Gift Sets', href: '/shop/gift-sets' },
];

const FilterSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-full space-y-12">
      {/* Categories */}
      <div className="space-y-6">
        <h4 className="font-display text-xl text-z-black tracking-wide border-b border-z-gold/10 pb-4">Categories</h4>
        <ul className="space-y-4 font-body text-sm">
          {categories.map((cat) => (
            <li key={cat.href}>
              <Link 
                href={cat.href}
                className={`block transition-colors hover:text-z-amber ${
                  pathname === cat.href ? 'text-z-amber font-bold' : 'text-z-charcoal/60'
                }`}
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Gender Filter */}
      <div className="space-y-6">
        <h4 className="font-display text-xl text-z-black tracking-wide border-b border-z-gold/10 pb-4">Target Gender</h4>
        <div className="space-y-3">
          {['Men', 'Women', 'Unisex'].map((gender) => (
            <label key={gender} className="flex items-center space-x-3 group cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded-none border-z-gold/30 text-z-emerald focus:ring-z-emerald" />
              <span className="font-body text-sm text-z-charcoal/60 group-hover:text-z-black transition-colors">{gender}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fragrance Family */}
      <div className="space-y-6">
        <h4 className="font-display text-xl text-z-black tracking-wide border-b border-z-gold/10 pb-4">Fragrance Family</h4>
        <div className="flex flex-wrap gap-2">
          {['Woody', 'Floral', 'Oriental', 'Fresh', 'Spicy', 'Citrus'].map((family) => (
            <button 
              key={family}
              className="px-3 py-1 border border-z-gold/20 font-body text-[11px] uppercase tracking-widest text-charcoal/50 hover:bg-z-gold hover:text-z-white transition-all"
            >
              {family}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-6">
        <h4 className="font-display text-xl text-z-black tracking-wide border-b border-z-gold/10 pb-4">Price Range</h4>
        <div className="space-y-4">
          <input type="range" className="w-full accent-z-amber" min="499" max="5000" />
          <div className="flex justify-between font-body text-xs text-z-charcoal/50">
            <span>₹499</span>
            <span>₹5,000+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
