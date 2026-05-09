import Link from 'next/link';
import { client, ALL_BLOG_POSTS_QUERY, urlFor } from '@/lib/sanity';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "ZAHIDAAN Fragrance Journal | Attar & Perfume Guides",
  description: "Read our journal for expert guides on attars, Arabian ouds, and how to choose your signature fragrance. Authentic wisdom from ZAHIDAAN.",
  alternates: {
    canonical: 'https://zahidaan.in/blog/',
  },
};

export const revalidate = 60; // Revalidate every minute

export default async function BlogIndexPage() {
  const posts = (await client.fetch(ALL_BLOG_POSTS_QUERY)) || [];

  return (
    <>
      <main className="pt-52 pb-24 bg-z-white">
        <div className="container mx-auto px-6">
          <h1 className="font-display text-5xl lg:text-7xl text-z-emerald mb-4 text-center">
            Fragrance <span className="italic">Journal</span>
          </h1>
          <p className="text-center text-z-charcoal/60 mb-16 font-body">Expert guides and soulful stories from the world of ZAHIDAAN.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.map((post: any) => (
              <article key={post._id} className="group cursor-pointer">
                <Link href={`/blog/${post.slug.current}`}>
                  <div className="relative aspect-[16/10] overflow-hidden mb-6">
                    {post.coverImage ? (
                      <img 
                        src={urlFor(post.coverImage).width(800).url()} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-z-mist flex items-center justify-center">
                        <span className="font-display text-z-emerald opacity-20">ZAHIDAAN</span>
                      </div>
                    )}
                  </div>
                  <h2 className="font-display text-2xl text-z-black group-hover:text-z-emerald transition-colors duration-300 mb-4">{post.title}</h2>
                  <p className="font-body text-z-charcoal/70 line-clamp-3 mb-6">{post.excerpt}</p>
                  <div className="flex items-center text-sm font-medium text-z-emerald border-b border-z-emerald/0 group-hover:border-z-emerald/20 w-fit pb-1 transition-all duration-300">
                    Read Story
                  </div>
                </Link>
              </article>
            ))}
          </div>
          
          {posts.length === 0 && (
            <div className="text-center py-24 border border-dashed border-z-gold/20">
              <p className="font-body text-z-charcoal/40 italic">Our first stories are being written. Come back soon.</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
