import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductHero from '@/components/product/ProductHero';
import ProductInfo from '@/components/product/ProductInfo';
import FragranceNotes from '@/components/product/FragranceNotes';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import { client, PRODUCT_BY_SLUG_QUERY, ALL_PRODUCTS_QUERY, FEATURED_PRODUCTS_QUERY } from '@/lib/sanity';

export const revalidate = 60;
import PortableTextRenderer from '@/components/blog/PortableTextRenderer';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import BackButton from '@/components/ui/BackButton';

export async function generateStaticParams() {
  try {
    const products = await client.fetch(`*[_type == "product"]{ "slug": slug.current }`);
    return (products || []).map((p: any) => ({ slug: p.slug }));
  } catch (error) {
    console.error("Error fetching products for static params:", error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug });
  if (!product) return { title: 'Product Not Found' };

  return {
    title: `${product.name} — ${product.size || ''} | ${product.category?.charAt(0).toUpperCase() + product.category?.slice(1)} | ZAHIDAAN`,
    description: `${product.shortDescription || `Buy ${product.name} online at ZAHIDAAN.`} Long-lasting fragrance. Alcohol-free options available.`,
    openGraph: {
      title: `${product.name} | ZAHIDAAN`,
      description: product.shortDescription,
      images: product.images?.[0]?.asset?.url ? [{ url: product.images[0].asset.url }] : [],
    },
    alternates: {
      canonical: `https://zahidaan.in/product/${slug}/`,
    },
  };
}

export const dynamicParams = false; // Ensure strictly static generation

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug });
  const featuredProducts = await client.fetch(FEATURED_PRODUCTS_QUERY);

  if (!product) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "description": product.shortDescription,
            "image": product.images?.map((img: any) => img.asset?.url).filter(Boolean),
            "brand": {
              "@type": "Brand",
              "name": "ZAHIDAAN"
            },
            "sku": `${slug}-${product.size || 'default'}`,
            "offers": {
              "@type": "Offer",
              "url": `https://zahidaan.in/product/${slug}`,
              "priceCurrency": "INR",
              "price": product.price,
              "priceValidUntil": "2026-12-31",
              "availability": "https://schema.org/InStock",
              "seller": {
                "@type": "Organization",
                "name": "Zahidaan Attars & Perfumes"
              },
              "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                  "@type": "MonetaryAmount",
                  "currency": "INR",
                  "value": "0"
                },
                "shippingDestination": {
                  "@type": "DefinedRegion",
                  "addressCountry": "IN"
                },
                "deliveryTime": {
                  "@type": "ShippingDeliveryTime",
                  "handlingTime": { "@type": "QuantitativeValue", "minValue": 1, "maxValue": 2, "unitCode": "DAY" },
                  "transitTime": { "@type": "QuantitativeValue", "minValue": 2, "maxValue": 7, "unitCode": "DAY" }
                }
              }
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "12"
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://zahidaan.in" },
              { "@type": "ListItem", "position": 2, "name": "Shop", "item": "https://zahidaan.in/shop" },
              { "@type": "ListItem", "position": 3, "name": product.category?.charAt(0).toUpperCase() + product.category?.slice(1), "item": `https://zahidaan.in/shop/${product.category}` },
              { "@type": "ListItem", "position": 4, "name": product.name, "item": `https://zahidaan.in/product/${slug}` }
            ]
          })
        }}
      />
      <main className="pt-44 pb-24 bg-z-white">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <BackButton label="Back to Collection" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
            {/* Left: Gallery */}
            <ProductHero product={product} />

            {/* Right: Info */}
            <div className="space-y-12">
              <ProductInfo product={product} />
              {product.fragranceNotes && (
                <FragranceNotes notes={product.fragranceNotes} />
              )}
            </div>
          </div>

          {/* Detailed Description Section */}
          <div className="mt-24 border-t border-z-gold/10 pt-16">
            <h3 className="font-display text-3xl text-z-black mb-8 text-center">Product <span className="italic">Details</span></h3>
            <div className="max-w-3xl mx-auto font-body text-z-charcoal/70 leading-relaxed space-y-6">
              {product.shortDescription && <p className="text-xl italic text-z-charcoal/80 text-center mb-12">{product.shortDescription}</p>}
              <div className="prose prose-stone max-w-none font-body text-z-charcoal/80">
                {product.description ? (
                  <PortableTextRenderer value={product.description} />
                ) : (
                  <p>Experience the timeless art of Arabian perfumery with {product.name}. Carefully distilled and bottled to preserve the soul of its ingredients, this {product.category} offers a unique sensory journey that lingers beautifully.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-24">
          <FeaturedProducts products={featuredProducts} />
        </div>
      </main>
    </>
  );
}
