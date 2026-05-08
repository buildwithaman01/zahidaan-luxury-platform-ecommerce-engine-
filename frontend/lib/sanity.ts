/**
 * @file sanity.ts
 * @description Centralized Sanity CMS configuration and data access layer.
 * Manages both public and authenticated clients for storefront and admin operations.
 */

import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { 
  ProductSchema, 
  CategorySchema, 
  BlogPostSchema, 
  validateData, 
  validateArray,
  type Product,
  type Category,
  type BlogPost
} from './schemas';

/**
 * Public Sanity client for fetching storefront data.
 * Optimized for performance with CDN support.
 */
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: true, 
});

// Write-capable client for API routes (Orders, Stock updates)
/**
 * Write-capable client for secure server-side operations (Orders, Stock).
 * Bypasses CDN to ensure data freshless for mutations.
 */
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

/**
 * Generates a URL for a Sanity image source.
 * @param {any} source The Sanity image source object.
 * @returns {any} A builder object that can be chained with .url(), .width(), etc.
 */
/**
 * @function urlFor
 * @description Generates a responsive and optimized image URL from a Sanity source.
 * @param {any} source - Sanity image object or reference.
 * @returns {any} A builder instance to chain transformations.
 */
export function urlFor(source: any) {
  return builder.image(source);
}

/**
 * Fetches all products from Sanity.
 * @returns {Promise<Product[]>} A validated array of products.
 */
export async function getAllProducts(): Promise<Product[]> {
  const data = await client.fetch(ALL_PRODUCTS_QUERY);
  return validateArray(ProductSchema, data, 'All Products');
}

/**
 * Fetches featured products for the homepage.
 * @returns {Promise<Product[]>} A validated array of featured products.
 */
export async function getFeaturedProducts(): Promise<Product[]> {
  const data = await client.fetch(FEATURED_PRODUCTS_QUERY);
  return validateArray(ProductSchema, data, 'Featured Products');
}

/**
 * Fetches a single product by its slug.
 * @param {string} slug The product slug.
 * @returns {Promise<Product | null>} The validated product or null if not found.
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await client.fetch(PRODUCT_BY_SLUG_QUERY, { slug });
  if (!data) return null;
  return validateData(ProductSchema, data, `Product: ${slug}`);
}

/**
 * Fetches all blog posts from Sanity.
 * @returns {Promise<BlogPost[]>} A validated array of blog posts.
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const data = await client.fetch(ALL_BLOG_POSTS_QUERY);
  return validateArray(BlogPostSchema, data, 'All Blog Posts');
}

/**
 * Fetches a single blog post by its slug.
 * @param {string} slug The blog post slug.
 * @returns {Promise<BlogPost | null>} The validated blog post or null if not found.
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const data = await client.fetch(POST_BY_SLUG_QUERY, { slug });
  if (!data) return null;
  return validateData(BlogPostSchema, data, `Blog Post: ${slug}`);
}

/**
 * Fetches all categories from Sanity.
 * @returns {Promise<Category[]>} A validated array of categories.
 */
export async function getAllCategories(): Promise<Category[]> {
  const data = await client.fetch(ALL_CATEGORIES_QUERY);
  return validateArray(CategorySchema, data, 'All Categories');
}

// GROQ Queries

// All products (for /shop)
export const ALL_PRODUCTS_QUERY = `*[_type == "product" && !defined(deletedAt)] | order(_createdAt desc) {
  _id, _createdAt, name, slug, "category": category->slug.current, gender, shortDescription,
  "image": images[0] { ..., asset->{url} },
  images[] { ..., asset->{url} },
  fragranceNotes, fragranceFamily, concentration,
  sizes, isBestseller, isFeatured
}`;

// Featured products (for homepage)
export const FEATURED_PRODUCTS_QUERY = `*[_type == "product" && (isFeatured == true || isBestseller == true)] | order(_createdAt desc)[0...8] {
  _id, name, slug, "category": category->slug.current, gender, shortDescription,
  "image": images[0] { ..., asset->{url} },
  images[] { ..., asset->{url} },
  fragranceNotes, sizes, isBestseller
}`;

// Single product (for /product/[slug])
export const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  ...,
  "category": category->slug.current,
  "categoryTitle": category->title,
  "image": images[0] { ..., asset->{url} },
  images[] { ..., asset->{url} }
}`;

// Blog posts
export const ALL_BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id, title, slug, coverImage, publishedAt, excerpt
}`;

export const POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id, title, slug, coverImage, publishedAt, excerpt, body,
  faqSchema, "authorName": author->name
}`;

// All Categories
export const ALL_CATEGORIES_QUERY = `*[_type == "category"] {
  _id, title, slug, image, description
}`;
