import ProductGrid from '@/components/shop/ProductGrid';
import { client, ALL_PRODUCTS_QUERY } from '@/lib/sanity';

export const revalidate = 60;
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Shop Attars, Ouds & Perfumes Online | ZAHIDAAN",
  description: "Browse our full collection of alcohol-free attars, Arabian ouds, French perfumes, bakhoor, and luxury gift sets. Pan-India delivery.",
};

const categories = [
  { name: 'All', slug: 'all' },
  { name: 'Attars', slug: 'attars' },
  { name: 'Ouds', slug: 'ouds' },
  { name: 'Perfumes', slug: 'perfumes' },
  { name: 'Bakhoor', slug: 'bakhoor' },
  { name: 'Gift Sets', slug: 'gift-sets' },
];

export default async function ShopPage() {
  const products = await client.fetch(ALL_PRODUCTS_QUERY);

  return (
    <>
      <main className="bg-z-white min-h-screen">
        {/* Editorial Header */}
        <section className="pt-52 pb-16 bg-z-black text-z-white overflow-hidden relative">
          <div className="container mx-auto px-6 relative z-10">
            <h1 className="font-display text-5xl md:text-7xl mb-8">
              The Full <span className="italic text-z-gold">Collection</span>
            </h1>
            
            {/* Horizontal Category Nav */}
            <div className="flex overflow-x-auto pb-4 gap-8 no-scrollbar scroll-smooth">
              {categories.map((cat) => {
                const isActive = cat.slug === 'all';
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

        {/* Results Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center mb-12 border-b border-z-gold/10 pb-6">
              <p className="font-body text-[11px] uppercase tracking-widest text-z-charcoal/40">
                Showing {products.length} artisanal creations
              </p>
              <div className="flex items-center gap-4">
                <span className="font-body text-[11px] uppercase tracking-widest text-z-charcoal/40">Sort by:</span>
                <select className="bg-transparent font-body text-xs uppercase tracking-widest outline-none">
                  <option>Newest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Bestselling</option>
                </select>
              </div>
            </div>

            <ProductGrid products={products} />
          </div>
        </section>
      </main>
    </>
  );
}
