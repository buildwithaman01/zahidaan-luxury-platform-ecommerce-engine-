import { createClient } from '@sanity/client';
import { readFileSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Requires a token with write access
});

const ASSETS_DIR = './public/assets';

const categories = [
  { title: 'Attars', slug: 'attars', image: 'attars.png', description: 'Traditional alcohol-free concentrated oil perfumes.' },
  { title: 'Ouds', slug: 'ouds', image: 'ouds.png', description: 'Rare and precious agarwood based fragrances.' },
  { title: 'Perfumes', slug: 'perfumes', image: 'perfumes.png', description: 'Modern French-style luxury sprays.' },
  { title: 'Bakhoor', slug: 'bakhoor', image: 'bakhoor.png', description: 'Traditional incense for home and clothing.' },
  { title: 'Gift Sets', slug: 'gift-sets', image: 'placeholder-gift.png', description: 'Curated selections for special occasions.' },
];

async function seed() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN is not set in .env.local');
    console.log('Please add your Sanity Write Token to .env.local first.');
    return;
  }

  console.log('🚀 Starting Category Seeding...');

  for (const cat of categories) {
    try {
      console.log(`\n📦 Processing: ${cat.title}`);
      
      const imagePath = join(ASSETS_DIR, cat.image);
      const imageData = readFileSync(imagePath);
      
      console.log(`  ⬆️ Uploading image: ${cat.image}...`);
      const asset = await client.assets.upload('image', imageData, {
        filename: cat.image
      });

      const doc = {
        _type: 'category',
        _id: `cat-${cat.slug}`,
        title: cat.title,
        slug: { _type: 'slug', current: cat.slug },
        description: cat.description,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id
          }
        }
      };

      console.log(`  💾 Creating document...`);
      await client.createOrReplace(doc);
      console.log(`  ✅ Successfully seeded ${cat.title}`);
      
    } catch (err) {
      console.error(`  ❌ Error seeding ${cat.title}:`, err.message);
    }
  }

  console.log('\n✨ Seeding Complete!');
}

seed();
