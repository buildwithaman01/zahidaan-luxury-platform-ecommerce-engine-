'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { client } from '@/lib/sanity';
import Link from 'next/link';
import ImageWithFallback from '@/components/ui/ImageWithFallback';
import { motion } from 'framer-motion';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      if (query.length < 2) return;
      setIsLoading(true);
      try {
        const data = await client.fetch(
          `*[_type == "product" && (name match $search || shortDescription match $search || category match $search)] {
            _id, name, slug, category,
            "image": images[0] { asset->{url} },
            price, size
          }`,
          { search: `*${query}*` }
        );
        setResults(data);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="container mx-auto px-6 pt-44 pb-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-display text-4xl md:text-6xl text-z-black mb-12">
          Search Results for <span className="italic">"{query}"</span>
        </h1>

        <div className="mb-16">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-b-2 border-z-gold/30 py-4 font-display text-2xl focus:outline-none focus:border-z-gold transition-colors"
            placeholder="Search our collection..."
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-z-gold"></div>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {results.map((product) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Link 
                  href={`/product/${product.slug.current}`}
                  className="group flex gap-6 p-4 border border-z-gold/10 hover:border-z-gold/30 transition-all bg-z-cream/50"
                >
                  <div className="w-24 h-32 bg-z-white flex-shrink-0">
                    <ImageWithFallback 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between py-2">
                    <div>
                      <h3 className="font-display text-xl text-z-black group-hover:text-z-gold transition-colors">{product.name}</h3>
                      <p className="text-[10px] uppercase tracking-widest text-z-charcoal/50 font-bold mt-1">{product.category}</p>
                    </div>
                    <p className="font-display text-lg text-z-gold">₹{product.price}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : query.length >= 2 ? (
          <div className="text-center py-20">
            <p className="font-display text-2xl text-z-charcoal/40 italic">No fragrances found matching your search.</p>
            <Link href="/shop" className="inline-block mt-8 text-z-gold uppercase tracking-[4px] text-[10px] font-bold border-b border-z-gold pb-1">
              Browse Full Collection
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
