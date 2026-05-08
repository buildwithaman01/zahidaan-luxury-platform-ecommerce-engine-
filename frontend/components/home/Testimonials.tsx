'use client';

import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Aarav Mehta',
    city: 'Hyderabad',
    quote: 'The Ruh Al Oud is unlike anything I’ve tried. It’s deep, spiritual, and stays with you all day. Truly premium.',
    rating: 5
  },
  {
    name: 'Zoya Khan',
    city: 'Mumbai',
    quote: 'Beautifully packaged and even better scents. The Discovery Pack is the perfect way to explore their range. Highly recommended!',
    rating: 5
  },
  {
    name: 'Vikram Singh',
    city: 'Delhi',
    quote: 'Fast delivery and exceptional quality. Zahidaan has brought authentic Arabian luxury right to my doorstep.',
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-z-white">
      <div className="container mx-auto px-6">
        <h2 className="font-display text-4xl md:text-5xl text-center text-z-black mb-16">
          Words from the <span className="italic">Devoted</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="space-y-6 text-center md:text-left"
            >
              <div className="flex justify-center md:justify-start space-x-1 text-z-gold">
                {[...Array(item.rating)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                ))}
              </div>
              <blockquote className="font-display text-xl md:text-2xl text-z-charcoal italic leading-relaxed">
                "{item.quote}"
              </blockquote>
              <div className="space-y-1">
                <div className="font-body text-sm font-bold text-z-black uppercase tracking-widest">{item.name}</div>
                <div className="font-body text-xs text-z-charcoal/40 uppercase tracking-widest">{item.city}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
