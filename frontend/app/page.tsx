import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import MarqueeStrip from '@/components/home/MarqueeStrip';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import BrandStory from '@/components/home/BrandStory';
import WhyUs from '@/components/home/WhyUs';
import DiscoveryPackCTA from '@/components/home/DiscoveryPackCTA';
import Testimonials from '@/components/home/Testimonials';
import InstagramReels from '@/components/home/InstagramReels';

import { 
  getFeaturedProducts, 
  getAllCategories, 
  getReels,
  FEATURED_PRODUCTS_QUERY, 
  ALL_CATEGORIES_QUERY, 
  REELS_QUERY 
} from '@/lib/sanity';

export const revalidate = 60; // Revalidate at most every 60 seconds

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();
  const categories = await getAllCategories();
  const reels = await getReels();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["LocalBusiness", "Store"],
            "name": "Zahidaan Attars & Perfumes",
            "alternateName": "ZAHIDAAN",
            "description": "Premier destination for luxury attars, Arabian ouds, French perfumes, and bakhoor in Isnapur, Patancheru. Authentic, long-lasting, alcohol-free fragrances with pan-India delivery.",
            "url": "https://zahidaan.in",
            "telephone": "+91 82970 08727",
            "email": "hello.zahidaan@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Shop 1, Near Kolkuri Shopping Mall, Isnapur X Road",
              "addressLocality": "Patancheru",
              "addressRegion": "Telangana",
              "postalCode": "502307",
              "addressCountry": "IN"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 17.5285,
              "longitude": 78.3012
            },
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
                "opens": "10:00",
                "closes": "21:00"
              }
            ],
            "priceRange": "₹499 – ₹3,499",
            "hasMap": "https://maps.google.com/?q=Zahidaan+Attars+Perfumes+Patancheru",
            "sameAs": [
              "https://www.instagram.com/zahidaanattarsandperfumes",
              "https://facebook.com/zahidaan"
            ],
            "areaServed": [
              "Isnapur", "Patancheruvu", "Muthangi", "Sangareddy",
              "Ramachandrapuram", "Lingampally", "Gachibowli"
            ],
            "currenciesAccepted": "INR",
            "paymentAccepted": "Cash, UPI",
            "image": "https://zahidaan.in/og-image.jpg"
          })
        }}
      />
      <Hero />
      <MarqueeStrip />
      <CategoryGrid categories={categories} />
      <FeaturedProducts products={featuredProducts} />
      <BrandStory />
      <WhyUs />
      <DiscoveryPackCTA />
      <Testimonials />
      <InstagramReels reels={reels} />
    </>
  );
}
