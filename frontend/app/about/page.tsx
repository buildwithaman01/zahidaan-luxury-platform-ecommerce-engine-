import { Metadata } from 'next';
import { motion } from 'framer-motion';

export const metadata: Metadata = {
  title: "Our Story | ZAHIDAAN Attars & Perfumes",
  description: "ZAHIDAAN was born from devotion to authentic fragrance. Discover our story of craftsmanship and spiritual essence.",
  alternates: {
    canonical: 'https://zahidaan.in/about/',
  },
};

const MotionDiv = ({ children, delay = 0, className = "" }: any) => (
  <div className={`initial-hide ${className}`}>
    {children}
  </div>
);

export default function AboutPage() {
  return (
    <>
      <main className="bg-z-white overflow-hidden">
        {/* Header Section */}
        <section className="relative pt-32 md:pt-52 pb-24 md:pb-32 bg-z-black text-z-white">
          <div className="container mx-auto px-6 relative z-10 text-center">
            <h1 className="font-display text-4xl md:text-8xl mb-6 md:mb-8 leading-tight">
              A Legacy of <span className="italic text-z-gold">Devotion</span>
            </h1>
            <p className="font-body text-sm md:text-xl text-z-white/60 max-w-2xl mx-auto font-light tracking-widest leading-relaxed">
              "ZAHIDAAN: The Devoted Ones. A name that carries the weight of tradition and the lightness of a soul at peace."
            </p>
          </div>
          <div className="absolute inset-0 opacity-30 bg-[url('/assets/ouds.png')] bg-cover bg-fixed grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-z-black/80 to-z-black" />
        </section>

        {/* Content Section */}
        <section className="py-32">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                <div className="space-y-6">
                  <h2 className="font-display text-4xl text-z-black tracking-tight">Our Philosophy</h2>
                  <div className="w-20 h-[1px] bg-z-gold" />
                </div>
                
                <div className="font-body text-lg text-z-charcoal/80 leading-relaxed space-y-8">
                  <p>
                    ZAHIDAAN Attars & Perfumes was born from a singular vision: to bridge the gap between ancient spiritual traditions and modern luxury perfumery. Based in the historic corridor of Patancheru, we have dedicated ourselves to the preservation of authentic, alcohol-free fragrance craft.
                  </p>
                  <p>
                    In an era of synthetic mass-production, ZAHIDAAN stands as a sanctuary for authenticity. We believe that a fragrance is not merely an accessory, but a spiritual signature—a reflection of the soul's devotion.
                  </p>
                </div>
              </div>

              <div className="relative aspect-[4/5] bg-z-mist overflow-hidden rounded-sm shadow-2xl">
                 <img 
                  src="/assets/placeholder-attar.png" 
                  alt="Crafting Process" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 border-[20px] border-white/10 m-6 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section className="py-20 md:py-32 bg-z-black text-z-white relative overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
              <div className="lg:col-span-5 order-2 lg:order-1 space-y-6 md:space-y-8">
                <div className="space-y-2 md:space-y-4">
                  <h4 className="font-body text-[9px] md:text-[10px] uppercase tracking-[4px] text-z-gold font-bold">The Visionary</h4>
                  <h2 className="font-display text-3xl md:text-6xl text-z-white leading-tight">Mohd <span className="italic">Zahid</span></h2>
                </div>
                <div className="font-body text-sm md:text-lg text-z-white/70 leading-relaxed space-y-4 md:space-y-6 max-w-lg">
                  <p>
                    Driven by a lifelong passion for the spiritual art of fragrance, Mohd Zahid founded ZAHIDAAN to revive the true essence of traditional attars. His journey is one of meticulous curation, seeking out the rarest resins and botanicals to craft scents that resonate with the soul.
                  </p>
                  <p>
                    For Mohd Zahid, ZAHIDAAN is more than a brand; it is a testament to the beauty of devotion and the timeless allure of pure, alcohol-free perfumery. Every blend in our collection is personally overseen by him, ensuring that the legacy of authentic craftsmanship remains untarnished.
                  </p>
                </div>
                <div className="pt-6">
                  <div className="inline-block px-6 py-3 border border-z-gold/30 text-z-gold font-display text-sm tracking-widest uppercase italic">
                    "Fragrance is the soul's silent conversation with the Divine."
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="lg:col-span-7 order-1 lg:order-2">
                <div className="relative group">
                  {/* Elegant Frame */}
                  <div className="absolute -inset-1 bg-gradient-to-b from-z-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative overflow-hidden rounded-sm shadow-2xl border border-z-gold/10 bg-z-white">
                    <img 
                      src="/owner.jpg" 
                      alt="Mohd Zahid - Founder of ZAHIDAAN" 
                      className="w-full h-auto max-h-[600px] object-cover object-center transition-transform duration-1000 group-hover:scale-[1.02]"
                    />
                  </div>
                  
                  {/* Designer Label */}
                  <div className="mt-6 flex items-center justify-between border-b border-z-gold/20 pb-4">
                    <div>
                      <p className="font-display text-2xl text-z-gold italic">Mohd Zahid</p>
                      <p className="font-body text-[10px] uppercase tracking-[4px] text-z-white/40 mt-1">Founder & Master Curator</p>
                    </div>
                    <div className="h-8 w-8 rounded-full border border-z-gold/30 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-z-gold rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-z-gold/[0.03] to-transparent pointer-events-none" />
        </section>

        {/* Values Strip */}
        <section className="py-24 bg-z-mist/50">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
              <div className="space-y-6">
                <div className="text-z-gold text-4xl font-display">01</div>
                <h3 className="font-display text-2xl text-z-black">Purity</h3>
                <p className="font-body text-sm text-z-charcoal/60 leading-relaxed uppercase tracking-widest">100% Alcohol-free formulations using the finest natural botanicals and rare ouds.</p>
              </div>
              <div className="space-y-6">
                <div className="text-z-gold text-4xl font-display">02</div>
                <h3 className="font-display text-2xl text-z-black">Patience</h3>
                <p className="font-body text-sm text-z-charcoal/60 leading-relaxed uppercase tracking-widest">Slow-macerated blends that develop depth and character over time, just like tradition.</p>
              </div>
              <div className="space-y-6">
                <div className="text-z-gold text-4xl font-display">03</div>
                <h3 className="font-display text-2xl text-z-black">Passion</h3>
                <p className="font-body text-sm text-z-charcoal/60 leading-relaxed uppercase tracking-widest">A commitment to the spiritual essence of scent that goes beyond mere retail.</p>
              </div>
            </div>
          </div>
        </section>

        {/* The Location */}
        <section className="py-32 bg-z-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center space-y-12">
              <h2 className="font-display text-4xl text-z-black italic">Visit our Boutique</h2>
              <p className="font-body text-xl text-z-charcoal/60 leading-relaxed">
                Experience the collection in person at our Patancheru flagship. Let us guide you through the intricate world of notes and nuances.
              </p>
              <div className="p-12 border border-z-gold/10 bg-z-mist/30">
                <p className="font-body text-sm uppercase tracking-[4px] text-z-black mb-4">Location</p>
                <p className="font-display text-2xl text-z-emerald">Shop 1, Near Kolkuri Shopping Mall, <br />Isnapur X Road, Patancheru — 502307</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
