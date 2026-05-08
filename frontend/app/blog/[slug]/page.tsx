import { client, POST_BY_SLUG_QUERY, urlFor } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import PortableTextRenderer from '@/components/blog/PortableTextRenderer';

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const posts = await client.fetch(`*[_type == "blogPost"]{ "slug": slug.current }`);
    return (posts || []).map((p: any) => ({ slug: p.slug }));
  } catch (error) {
    console.error("Error fetching posts for static params:", error);
    return [];
  }
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(POST_BY_SLUG_QUERY, { slug });
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | ZAHIDAAN Journal`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [{ url: urlFor(post.coverImage).width(1200).url() }] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await client.fetch(POST_BY_SLUG_QUERY, { slug });

  if (!post) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.coverImage ? [urlFor(post.coverImage).width(1200).url()] : [],
            "author": {
              "@type": "Person",
              "name": post.authorName || "Zahid",
              "url": "https://zahidaan.in/authors/zahid"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Zahidaan Attars & Perfumes",
              "logo": {
                "@type": "ImageObject",
                "url": "https://zahidaan.in/logo.svg"
              }
            },
            "datePublished": post.publishedAt,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://zahidaan.in/blog/${slug}`
            }
          })
        }}
      />
      {post.faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": post.faqSchema.map((item: any) => ({
                "@type": "Question",
                "name": item.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": item.answer
                }
              }))
            })
          }}
        />
      )}
      <main className="pt-32 pb-24 bg-z-white">
        <article className="container mx-auto px-6 max-w-4xl">
          <header className="mb-16 text-center">
            <h1 className="font-display text-4xl lg:text-6xl text-z-black mb-8 leading-tight">{post.title}</h1>
            <div className="flex items-center justify-center space-x-4 text-z-charcoal/60 font-body">
              <span>By {post.authorName || "Zahidaan Team"}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-z-gold/30"></span>
              <span suppressHydrationWarning>{new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>
          </header>

          {post.coverImage && (
            <div className="relative aspect-[16/9] mb-16 overflow-hidden rounded-sm shadow-xl shadow-z-black/5">
              <img 
                src={urlFor(post.coverImage).width(1200).url()} 
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-stone lg:prose-xl max-w-none font-body text-z-charcoal leading-relaxed">
            <p className="text-xl italic text-z-emerald/80 mb-12 border-l-4 border-z-gold pl-6">{post.excerpt}</p>
            
            {post.body ? (
              <PortableTextRenderer value={post.body} />
            ) : (
              <p>Blog content is being synchronized from the ZAHIDAAN Studio. Please check back shortly for the full article.</p>
            )}
          </div>
        </article>
      </main>
    </>
  );
}
