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

const blogs = [
  {
    title: "The Art of the Devoted: Understanding ZAHIDAAN",
    slug: "art-of-the-devoted",
    excerpt: "Discover the spiritual and artisanal roots of ZAHIDAAN. Why devotion is the secret ingredient in every bottle.",
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "ZAHIDAAN: The Devoted Ones. A name that carries the weight of tradition and the lightness of a soul at peace. In the world of perfumery, 'Zahid' (the devoted) represents a rejection of the superficial in favor of the essential. At ZAHIDAAN, this philosophy dictates every drop of oil we distill." }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Traditional attar making is a lesson in patience. Unlike modern industrial perfumery that relies on rapid chemical synthesis, the ZAHIDAAN method honors the slow maceration of botanicals. We believe that a fragrance should not just be worn; it should be lived. It is a spiritual signature, a reflection of one's inner devotion." }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "When you apply a ZAHIDAAN attar, you are connecting with a lineage of craftsmen who understood that the best things in life cannot be rushed. From the selection of the finest Damask roses to the aging of rare Indian sandalwood, our process is an act of worship to the natural world." }]
      }
    ]
  },
  {
    title: "Why Alcohol-Free Attars are the Future of Luxury",
    slug: "alcohol-free-luxury-future",
    excerpt: "Explore the skin-friendly and long-lasting benefits of pure oil-based fragrances.",
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "The modern fragrance industry is built on a foundation of denatured alcohol. While ethanol serves as an effective carrier for scent molecules, it comes with significant drawbacks: skin dehydration, rapid evaporation, and a harsh 'chemical spike' upon initial application." }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Pure attars, by contrast, are 100% alcohol-free. They use carrier oils like sandalwood or jojoba to suspend the fragrance molecules. This results in a 'linear' scent profile—meaning the fragrance stays true to its character from the moment of application until it eventually fades hours later." }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Furthermore, oil-based fragrances are naturally moisturizing. They sink into the skin's lipid barrier rather than sitting on top of it. This creates a more intimate projection, often referred to as a 'scent aura' rather than a 'scent cloud,' making them perfect for those who seek sophistication over noise." }]
      }
    ]
  },
  {
    title: "The Mystery of Oud: Liquid Gold Explained",
    slug: "mystery-of-oud",
    excerpt: "Everything you need to know about the world's most expensive fragrance ingredient.",
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Oud, or Agarwood, is often called 'Liquid Gold' for a reason. Its price per gram can exceed that of actual gold. But the true value of Oud lies in its complexity. It is a scent that is smoky, animalic, sweet, and woody all at once." }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "The process of creating Oud is a biological miracle. It only occurs when the heartwood of an Aquilaria tree becomes infected with a specific type of mold. The tree produces a dark, aromatic resin as an immune response. This resin-embedded wood is what we distill to create the precious oil." }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "At ZAHIDAAN, we source our Oud with extreme care, ensuring ethical harvesting and pure distillation. Whether it is the barnyard-rich profile of Indian Oud or the smooth, vanillic sweetness of Cambodian Oud, each variety offers a unique sensory journey into the heart of the forest." }]
      }
    ]
  },
  {
    title: "Pulse Point Mastery: How to Wear Attar Like a Connoisseur",
    slug: "pulse-point-mastery",
    excerpt: "Maximize the longevity and projection of your fragrance with these professional application techniques.",
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Applying attar is an art form. Unlike spray perfumes that you 'walk through,' attars require a direct connection with the skin. The goal is to apply the oil to 'pulse points'—areas where the blood vessels are closest to the skin, creating natural warmth." }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Key pulse points include the wrists, the base of the throat, behind the earlobes, and the inner elbows. When the oil is warmed by your pulse, it 'blooms,' releasing the fragrance molecules gradually over many hours." }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Pro Tip: Never rub your wrists together after applying attar. This 'crushes' the delicate top notes and causes the fragrance to break down prematurely. Instead, gently dab the oil and let it settle naturally into your skin's pores." }]
      }
    ]
  },
  {
    title: "Attar vs. Perfume: Which One is Right for You?",
    slug: "attar-vs-perfume",
    excerpt: "Understanding the technical and spiritual differences between oils and sprays.",
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "The debate between Attar and Eau de Parfum (EDP) is not about which is better, but which fits your lifestyle. EDPs offer high projection—they are designed to be noticed from across a room. They are the 'loud' option for social events." }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Attars are the 'quiet luxury' alternative. They sit close to the skin, creating an intimate experience for the wearer and those in their immediate circle. Because they lack alcohol, they also lack the 'sillage' (trail) that can sometimes be overwhelming in enclosed spaces." }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "If you have sensitive skin, or if you prefer a fragrance that evolves slowly and stays with you for an entire day, Attar is your choice. If you prefer a quick, refreshing burst of scent that fills a space, EDP is the way to go." }]
      }
    ]
  },
  {
    title: "The Scent of Meditation: Using Bakhoor at Home",
    slug: "scent-of-meditation-bakhoor",
    excerpt: "Transform your living space into a sanctuary of peace with traditional Arabian incense.",
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Bakhoor—scented wood chips soaked in perfume oils—has been used for centuries across the Middle East and South Asia to purify the home. The ritual of burning Bakhoor is a meditative experience in itself." }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "As the charcoal glows and the resinous wood begins to smoke, the room is filled with a deep, earthy aroma that grounds the soul. It is commonly used during prayer, before receiving guests, or simply to clear the mind after a long day." }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "At ZAHIDAAN, our Bakhoor blends use real agarwood and sandalwood bases, ensuring that the smoke is clean, aromatic, and free from the acrid smell of synthetic fillers. It is the ultimate way to bring the essence of ZAHIDAAN into your sanctuary." }]
      }
    ]
  },
  {
    title: "Fragrance Layering 101: Creating Your Custom Signature",
    slug: "fragrance-layering-101",
    excerpt: "A guide to combining different notes to build a scent that is uniquely yours.",
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Fragrance layering is the secret of the world's most sophisticated scent enthusiasts. By combining two or more fragrances, you can create a profile that is entirely unique to you—a scent that no one else in the world is wearing." }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "The golden rule of layering is to start with your heaviest scent first. Apply your Oud or Musk base to your pulse points. Once it has settled for a few minutes, layer a lighter floral or citrus scent on top. The base note will act as an anchor, giving the lighter notes incredible longevity." }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Don't be afraid to experiment. A deep, smoky Oud can be beautifully balanced by the bright, honeyed sweetness of a Taif Rose. At ZAHIDAAN, we encourage our customers to become their own perfumers." }]
      }
    ]
  },
  {
    title: "The History of Kannauj: India's Perfume Capital",
    slug: "history-of-kannauj",
    excerpt: "A journey through the ancient copper degs and time-honored traditions of Indian perfumery.",
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "On the banks of the Ganges lies Kannauj, a city that has lived and breathed fragrance for over four centuries. Known as the 'Grasse of the East,' Kannauj is the birthplace of the traditional Indian attar." }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "The method used in Kannauj—the 'Deg-Bhapka' system—is a marvel of ancient engineering. Large copper stills (Degs) are heated over wood fires, and the fragrant steam is captured in a receiver (Bhapka) filled with sandalwood oil. This process is repeated for weeks until the oil is fully saturated with the flower's soul." }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "ZAHIDAAN proudly sources its base attars from the master distillers of Kannauj. By choosing our fragrances, you are supporting a UNESCO-recognized craft and ensuring that this ancient tradition continues to flourish in the modern age." }]
      }
    ]
  },
  {
    title: "Choosing Your Signature: A Fragrance for Every Occasion",
    slug: "choosing-your-signature-scent",
    excerpt: "How to match your personality and environment with the perfect fragrance profile.",
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Finding your signature scent is like finding the perfect tailor-made suit. It should feel like a second skin. To choose correctly, you must first understand the 'families' of fragrance: Florals, Woods, Ambers, and Ouds." }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "For daily wear, especially in warmer climates, look for white florals (Jasmine) or clean musks. They provide a sense of freshness without being overwhelming. For evening events or formal gatherings, the complexity of Oud or Saffron adds an air of mystery and authority." }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Always remember: a signature scent should be something you love first. It is an extension of your own identity. Let your nose lead you, and don't be afraid to change your signature as the seasons—and your life—evolve." }]
      }
    ]
  },
  {
    title: "Sustainable Sourcing: From Flower to Bottle",
    slug: "sustainable-sourcing-roses",
    excerpt: "ZAHIDAAN's commitment to ethical harvesting and natural botanical purity.",
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "In a world of synthetic replicas, ZAHIDAAN remains committed to the earth. We believe that true luxury cannot be synthetic. That is why we work directly with artisanal farmers to source our raw materials ethically and sustainably." }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Whether it is our Damask Roses from the fields of Pushkar or our ethically-macerated ambergris, we ensure that our sourcing practices respect the biodiversity of the regions they come from. We avoid over-harvested woods and prioritize botanical purity." }]
      },
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Sustainability is not a trend for us; it is a necessity. By protecting the ecosystems that produce these rare ingredients, we ensure that future generations can also experience the divine scents of nature. When you choose ZAHIDAAN, you choose a greener future for perfumery." }]
      }
    ]
  }
];

async function update() {
  console.log("Updating blogs with deep content...");
  for (const blog of blogs) {
    try {
      // Find the existing document by slug
      const existing = await client.fetch(`*[_type == "blogPost" && slug.current == $slug][0]`, { slug: blog.slug });
      
      if (existing) {
        await client
          .patch(existing._id)
          .set({ 
            body: blog.body,
            excerpt: blog.excerpt 
          })
          .commit();
        console.log(`Updated: ${blog.title}`);
      } else {
        console.log(`Skipped (not found): ${blog.title}`);
      }
    } catch (err) {
      console.error(`Failed ${blog.title}:`, err.message);
    }
  }
  console.log("Update complete.");
}

update();
