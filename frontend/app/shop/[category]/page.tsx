import React from 'react';
import ProductGrid from '@/components/shop/ProductGrid';
import FilterSidebar from '@/components/shop/FilterSidebar';
import { client, ALL_PRODUCTS_QUERY } from '@/lib/sanity';

export const revalidate = 60;
import { Metadata } from 'next';
import Link from 'next/link';

export const dynamicParams = false;

const categories = [
  { name: 'All', slug: 'all' },
  { name: 'Attars', slug: 'attars' },
  { name: 'Ouds', slug: 'ouds' },
  { name: 'Perfumes', slug: 'perfumes' },
  { name: 'Bakhoor', slug: 'bakhoor' },
  { name: 'Gift Sets', slug: 'gift-sets' },
];

const categorySEO: { [key: string]: { title: string; description: string } } = {
  'attars': {
    title: "Alcohol-Free Attars Online | Pure Ittar | ZAHIDAAN",
    description: "Buy authentic alcohol-free attars online. Long-lasting, skin-friendly, traditional Indian ittars. Shop Ruh Al Oud, Jannat Al Firdaus & more."
  },
  'ouds': {
    title: "Arabian Oud Perfumes Online India | ZAHIDAAN",
    description: "Discover premium Arabian oud perfumes online in India. Deep, smoky, long-lasting oud EDPs for men and women."
  },
  'perfumes': {
    title: "French Perfumes for Men & Women | ZAHIDAAN",
    description: "Experience luxury French perfumes by ZAHIDAAN. Long-lasting Eau de Parfums (EDP) with premium fragrance notes."
  },
  'bakhoor': {
    title: "Premium Bakhoor & Incense Online India | ZAHIDAAN",
    description: "Shop premium Arabian bakhoor and traditional incense. Fill your home with the soulful essence of ZAHIDAAN."
  },
  'gift-sets': {
    title: "Luxury Perfume Gift Sets Online India | ZAHIDAAN",
    description: "Discover the perfect gift with ZAHIDAAN's luxury perfume and attar gift sets. Elegant packaging, divine fragrances."
  }
};

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const seo = categorySEO[category] || {
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} | ZAHIDAAN`,
    description: `Browse our ${category} collection.`
  };
  return {
    title: seo.title,
    description: seo.description,
  };
}

export async function generateStaticParams() {
  return [
    { category: 'attars' },
    { category: 'ouds' },
    { category: 'perfumes' },
    { category: 'bakhoor' },
    { category: 'gift-sets' },
  ];
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: currentCategory } = await params;
  const products = await client.fetch(ALL_PRODUCTS_QUERY);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zahidaan.in" },
              { "@type": "ListItem", "position": 2, "name": "Shop", "item": "https://zahidaan.in/shop" },
              { "@type": "ListItem", "position": 3, "name": currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1), "item": `https://zahidaan.in/shop/${currentCategory}` }
            ]
          })
        }}
      />
      <main className="bg-z-white min-h-screen">
        {/* Editorial Header */}
        <section className="pt-52 pb-16 bg-z-black text-z-white overflow-hidden relative">
          <div className="container mx-auto px-6 relative z-10">
            <h1 className="font-display text-5xl md:text-7xl mb-8 capitalize">
              {currentCategory.replace('-', ' ')} <span className="italic text-z-gold">Collection</span>
            </h1>
            
            {/* Horizontal Category Nav */}
            <div className="flex overflow-x-auto pb-4 gap-8 no-scrollbar scroll-smooth">
              {categories.map((cat) => {
                const isActive = cat.slug === currentCategory;
                return (
                  <Link 
                    key={cat.slug}
                    href={cat.slug === 'all' ? '/shop' : `/shop/${cat.slug}`}
                    className={`whitespace-nowrap font-body text-[10px] uppercase tracking-[4px] transition-all duration-300 relative group ${
                      isActive ? 'text-z-gold font-bold' : 'text-z-white/40 hover:text-z-white'
                    }`}
                  >
                    {cat.name}
                    {isActive && (
                      <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-z-gold" />
                    )}
                    <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-z-gold transition-all duration-300 group-hover:w-full" />
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-z-gold/5 to-transparent pointer-events-none" />
        </section>

        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-16">
              <aside className="hidden lg:block w-64 flex-shrink-0">
                <FilterSidebar />
              </aside>
              <div className="flex-grow">
                <ProductGrid products={products} category={currentCategory} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
