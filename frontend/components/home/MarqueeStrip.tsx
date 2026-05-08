import React from 'react';

const MarqueeStrip = () => {
  const text = "AUTHENTIC ATTARS · ARABIAN OUDS · FRENCH PERFUMES · BAKHOOR · LUXURY GIFTS · ZAHIDAAN · ";
  
  return (
    <div className="bg-z-emerald py-4 overflow-hidden border-y border-z-gold/20">
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="font-body text-xs md:text-sm font-medium tracking-[4px] uppercase text-z-gold inline-block px-4">
          {text + text + text + text}
        </span>
        <span className="font-body text-xs md:text-sm font-medium tracking-[4px] uppercase text-z-gold inline-block px-4">
          {text + text + text + text}
        </span>
      </div>
    </div>
  );
};

export default MarqueeStrip;
