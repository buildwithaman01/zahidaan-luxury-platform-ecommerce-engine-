import { createClient } from '@sanity/client';
import { readFileSync, createReadStream } from 'fs';
import { join } from 'path';

const client = createClient({
  projectId: 'paf2xup3',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'skvJcjixH3WvYa2Tq7YIPex4DEAPaOX927SkDmVwuiT9Kue7Wu27775nqphzWArK6PqFMoYpzbTUKHtr2s1CkUw1AjuxFjw7dAfjy2kcnlaGJGQ92bu4p02TZaaNv4FcqfLCdXJ2K6lLQK6g8kSdZqnEq1alFS7Kk7Hp3Tu8qeOG0ULeMQag',
});

const BASE_PATH = 'C:/Users/amank/.gemini/antigravity/brain/be31010e-45f9-4515-833a-8094f810d80f';

const blogs = [
  {
    title: "The Art of the Devoted: Understanding ZAHIDAAN",
    slug: "art-of-the-devoted",
    image: "blog_art_of_devoted_1778226053456.png",
    excerpt: "Discover the spiritual and artisanal roots of ZAHIDAAN. Why devotion is the secret ingredient in every bottle.",
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "ZAHIDAAN: The Devoted Ones. A name that carries the weight of tradition and the lightness of a soul at peace. In this inaugural post, we explore why we chose a name that defines not just our products, but our entire philosophy." }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "To be 'Zahid' is to be devoted. It is to choose the path of purity and patience. In the world of perfumery, this means rejecting the shortcuts of mass production in favor of the slow, deliberate craft of distillation." }]
      }
    ]
  },
  {
    title: "Why Alcohol-Free Attars are the Future of Luxury",
    slug: "alcohol-free-luxury-future",
    image: "blog_alcohol_free_luxury_1778226073315.png",
    excerpt: "Explore the skin-friendly and long-lasting benefits of pure oil-based fragrances.",
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Most modern perfumes are 80-90% alcohol. While this makes them project loudly for an hour, it often leads to skin irritation and a scent that vanishes too quickly. Attars, on the other hand, are concentrated soul." }]
      }
    ]
  },
  {
    title: "The Mystery of Oud: Liquid Gold Explained",
    slug: "mystery-of-oud",
    image: "blog_mystery_of_oud_1778226095821.png",
    excerpt: "Everything you need to know about the world's most expensive fragrance ingredient.",
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Oud is more than just a scent; it is a story. Derived from the resinous heartwood of infected Aquilaria trees, it takes decades to develop its characteristic deep, smoky, and animalic profile." }]
      }
    ]
  },
  {
    title: "Pulse Point Mastery: How to Wear Attar Like a Connoisseur",
    slug: "pulse-point-mastery",
    image: "blog_pulse_point_mastery_1778226118285.png",
    excerpt: "Maximize the longevity and projection of your fragrance with these professional application techniques.",
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Unlike spray perfumes, attars are intimate. They react to the heat of your skin. By applying to your wrists, behind the ears, and the inner elbows, you allow the fragrance to bloom throughout the day." }]
      }
    ]
  },
  {
    title: "Attar vs. Perfume: Which One is Right for You?",
    slug: "attar-vs-perfume",
    image: "blog_attar_vs_perfume_1778226137192.png",
    excerpt: "Understanding the technical and spiritual differences between oils and sprays.",
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "The choice between an attar and an EDP often comes down to the occasion. Attars are for the wearer—a personal aura. EDPs are for the room—a social statement. At ZAHIDAAN, we bridge both worlds." }]
      }
    ]
  },
  {
    title: "The Scent of Meditation: Using Bakhoor at Home",
    slug: "scent-of-meditation-bakhoor",
    image: "blog_scent_of_meditation_1778226163451.png",
    excerpt: "Transform your living space into a sanctuary of peace with traditional Arabian incense.",
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Bakhoor is not just about smelling good; it is about setting an intention. Whether for prayer, meditation, or welcoming guests, the rising smoke of agarwood chips creates a bridge to the divine." }]
      }
    ]
  },
  {
    title: "Fragrance Layering 101: Creating Your Custom Signature",
    slug: "fragrance-layering-101",
    image: "blog_fragrance_layering_guide_1778226186784.png",
    excerpt: "A guide to combining different notes to build a scent that is uniquely yours.",
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Start with a heavy base like Oud, then layer a bright floral like Rose or Jasmine on top. This technique, traditional in the Middle East, ensures your scent is layered, complex, and unrepeatable." }]
      }
    ]
  },
  {
    title: "The History of Kannauj: India's Perfume Capital",
    slug: "history-of-kannauj",
    image: "blog_history_of_kannauj_1778226209099.png",
    excerpt: "A journey through the ancient copper degs and time-honored traditions of Indian perfumery.",
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "For over 400 years, Kannauj has distilled the soul of the earth. From 'Mitti Attar' to pure Rose water, we honor these ancient Indian methods in every bottle of ZAHIDAAN." }]
      }
    ]
  },
  {
    title: "Choosing Your Signature: A Fragrance for Every Occasion",
    slug: "choosing-your-signature-scent",
    image: "blog_choosing_signature_scent_1778226233848.png",
    excerpt: "How to match your personality and environment with the perfect fragrance profile.",
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Your fragrance is your invisible business card. For the office, choose something clean and fresh. For an evening out, something deep and mysterious like our Oud collection." }]
      }
    ]
  },
  {
    title: "Sustainable Sourcing: From Flower to Bottle",
    slug: "sustainable-sourcing-roses",
    image: "blog_sustainable_sourcing_roses_1778226256667.png",
    excerpt: "ZAHIDAAN's commitment to ethical harvesting and natural botanical purity.",
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "We believe in giving back to the earth that gives us our scents. By working directly with farmers in Kannauj and Bulgaria, we ensure that every petal is harvested with respect and paid for with fairness." }]
      }
    ]
  }
];

async function seed() {
  console.log("Starting seeding...");
  for (const blog of blogs) {
    try {
      console.log(`Processing: ${blog.title}`);
      
      // 1. Upload Image
      const imagePath = join(BASE_PATH, blog.image);
      const asset = await client.assets.upload('image', createReadStream(imagePath), {
        filename: blog.image
      });
      
      // 2. Create Blog Post
      const doc = {
        _type: 'blogPost',
        title: blog.title,
        slug: { _type: 'slug', current: blog.slug },
        coverImage: {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id }
        },
        publishedAt: new Date().toISOString(),
        excerpt: blog.excerpt,
        body: blog.body,
        seoTitle: blog.title.slice(0, 60),
        seoDescription: blog.excerpt.slice(0, 155)
      };
      
      const result = await client.create(doc);
      console.log(`Success! ID: ${result._id}`);
      
    } catch (err) {
      console.error(`Failed ${blog.title}:`, err.message);
    }
  }
  console.log("Seeding complete.");
}

seed();
