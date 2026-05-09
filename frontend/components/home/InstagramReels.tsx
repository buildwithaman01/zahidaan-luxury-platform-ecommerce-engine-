'use client';

import { motion } from 'framer-motion';
import ImageWithFallback from '@/components/ui/ImageWithFallback';

interface Reel {
  _id: string;
  title: string;
  instagramUrl: string;
  image: string;
}

const InstagramReels = ({ reels }: { reels: Reel[] }) => {
  // Use Sanity data or show a beautiful "Follow Us" banner if empty
  const hasReels = reels && reels.length > 0;

  return (
    <section className="py-24 bg-z-black text-z-white overflow-hidden border-t border-z-gold/10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="space-y-4">
            <span className="font-body text-[10px] uppercase tracking-[4px] text-z-gold font-bold">Social Connection</span>
            <h2 className="font-display text-4xl md:text-6xl text-z-white">
              Follow Us on <span className="italic text-z-gold">Instagram</span>
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end space-y-4">
            <p className="font-body text-z-white/50 max-w-sm text-sm leading-relaxed md:text-right">
              Join our community of over 50k fragrance enthusiasts. Discover artisanal secrets, new launches, and the soul of ZAHIDAAN.
            </p>
            <a 
              href="https://www.instagram.com/zahidaanattarsandperfumes/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-3 text-z-gold font-body text-xs uppercase tracking-[2px] font-bold"
            >
              <span>@zahidaanattarsandperfumes</span>
              <div className="w-8 h-[1px] bg-z-gold transition-all group-hover:w-12" />
            </a>
          </div>
        </div>

        {hasReels ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {reels.map((reel, index) => (
              <motion.a
                key={reel._id}
                href={reel.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
                className="relative aspect-[9/16] group overflow-hidden bg-z-charcoal"
              >
                <ImageWithFallback 
                  src={reel.image} 
                  alt={reel.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                  fallbackType="perfume"
                />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-z-white/30 backdrop-blur-sm flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-z-gold/20 group-hover:border-z-gold">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-z-white translate-x-0.5"><path d="M8 5v14l11-7z"/></svg>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-z-black to-transparent pt-20">
                  <p className="font-display text-xl text-z-white italic mb-1">{reel.title}</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-[1px] bg-z-gold" />
                    <span className="font-body text-[10px] uppercase tracking-widest text-z-gold">View Reel</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        ) : (
          <div className="bg-z-mist/5 border border-z-gold/10 p-12 md:p-20 flex flex-col items-center justify-center text-center space-y-8 group hover:border-z-gold/30 transition-all">
            <div className="w-20 h-20 rounded-full border border-z-gold/30 flex items-center justify-center animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-z-gold"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </div>
            <div className="space-y-4">
              <p className="font-display text-3xl md:text-4xl text-z-white italic">Capturing the <span className="text-z-gold">Soul of Attar</span></p>
              <p className="font-body text-z-white/30 text-sm max-w-md mx-auto">
                Our latest collection stories and artisanal reels are being curated. In the meantime, discover our full journey on our official profile.
              </p>
            </div>
            <a 
              href="https://www.instagram.com/zahidaanattarsandperfumes/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-z-gold text-z-white font-body font-bold text-xs uppercase tracking-widest hover:bg-z-white hover:text-z-black transition-all"
            >
              Follow Our Journey
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default InstagramReels;
