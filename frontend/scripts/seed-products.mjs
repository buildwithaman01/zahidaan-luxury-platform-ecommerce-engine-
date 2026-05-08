import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const ASSETS_DIR = './public/assets';

const products = [
  {
    name: "Ruh Al Oud",
    slug: "ruh-al-oud",
    category: "attars",
    gender: "Unisex",
    shortDescription: "A deep, soulful journey into the heart of Cambodian Oud.",
    image: "placeholder-attar.png",
    fragranceNotes: { top: ["Saffron", "Rose"], middle: ["Cambodian Oud", "Amber"], base: ["Musk", "Sandalwood"] },
    concentration: "Attar Oil",
    sizes: [{ size: "6ml", sellingPrice: 699, mrp: 799, stock: 50 }, { size: "12ml", sellingPrice: 1299, mrp: 1499, stock: 30 }],
    isBestseller: true,
    isFeatured: true
  },
  {
    name: "Jannat Al Firdaus",
    slug: "jannat-al-firdaus",
    category: "attars",
    gender: "Unisex",
    shortDescription: "A classic green, floral masterpiece that captures the essence of paradise.",
    image: "placeholder-attar.png",
    fragranceNotes: { top: ["Jasmine", "Lily"], middle: ["Tuberose", "Iris"], base: ["Musk", "Vanilla"] },
    concentration: "Attar Oil",
    sizes: [{ size: "6ml", sellingPrice: 549, mrp: 599, stock: 100 }],
    isBestseller: false,
    isFeatured: true
  },
  {
    name: "Al Zahidaan Noir",
    slug: "al-zahidaan-noir",
    category: "ouds",
    gender: "Men",
    shortDescription: "Dark, mysterious, and undeniably powerful. The signature of a leader.",
    image: "ouds.png",
    fragranceNotes: { top: ["Smoky Oud", "Leather"], middle: ["Dark Rose", "Saffron"], base: ["Amber", "Musk"] },
    concentration: "Eau de Parfum",
    sizes: [{ size: "50ml", sellingPrice: 2499, mrp: 2999, stock: 20 }],
    isBestseller: true,
    isFeatured: true
  },
  {
    name: "Zahidaan Blanc",
    slug: "zahidaan-blanc",
    category: "perfumes",
    gender: "Women",
    shortDescription: "A clean, ethereal floral scent that radiates purity and grace.",
    image: "perfumes.png",
    fragranceNotes: { top: ["Green Tea", "Lemon"], middle: ["White Musk", "Peony"], base: ["Sandalwood", "Amber"] },
    concentration: "Eau de Parfum",
    sizes: [{ size: "50ml", sellingPrice: 1799, mrp: 1999, stock: 25 }],
    isBestseller: false,
    isFeatured: true
  },
  {
    name: "Zahidaan Bakhoor Al Oud",
    slug: "zahidaan-bakhoor-al-oud",
    category: "bakhoor",
    gender: "Unisex",
    shortDescription: "Premium agarwood chips infused with traditional oils for a divine home ambiance.",
    image: "bakhoor.png",
    fragranceNotes: { top: ["Oud Wood"], middle: ["Spices", "Rose"], base: ["Incense", "Musk"] },
    concentration: "Incense",
    sizes: [{ size: "40g", sellingPrice: 849, mrp: 999, stock: 15 }],
    isBestseller: false,
    isFeatured: false
  }
];

async function seed() {
  console.log('🚀 Starting Product Seeding...');

  for (const prod of products) {
    try {
      console.log(`\n📦 Processing: ${prod.name}`);
      
      const imagePath = join(ASSETS_DIR, prod.image);
      const imageData = readFileSync(imagePath);
      
      console.log(`  ⬆️ Uploading image: ${prod.image}...`);
      const asset = await client.assets.upload('image', imageData, {
        filename: prod.image
      });

      const doc = {
        _type: 'product',
        _id: `prod-${prod.slug}`,
        name: prod.name,
        slug: { _type: 'slug', current: prod.slug },
        category: {
          _type: 'reference',
          _ref: `cat-${prod.category}`
        },
        gender: prod.gender,
        shortDescription: prod.shortDescription,
        images: [{
          _type: 'image',
          _key: 'img1',
          asset: { _type: 'reference', _ref: asset._id }
        }],
        fragranceNotes: {
          _type: 'object',
          top: prod.fragranceNotes.top,
          heart: prod.fragranceNotes.middle, // Note: mapped middle to heart in schema
          base: prod.fragranceNotes.base,
        },
        concentration: prod.concentration,
        sizes: prod.sizes.map((s, i) => ({ ...s, _key: `size-${i}` })),
        isBestseller: prod.isBestseller,
        isFeatured: prod.isFeatured
      };

      console.log(`  💾 Creating document...`);
      await client.createOrReplace(doc);
      console.log(`  ✅ Successfully seeded ${prod.name}`);
      
    } catch (err) {
      console.error(`  ❌ Error seeding ${prod.name}:`, err.message);
    }
  }

  console.log('\n✨ Product Seeding Complete!');
}

seed();
