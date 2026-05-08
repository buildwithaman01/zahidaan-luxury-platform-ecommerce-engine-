# SEO & Search Engine Strategy

ZAHIDAAN is engineered for maximum search visibility. This document details the technical implementation of our SEO strategy.

## 1. Technical SEO Foundation

### Semantic HTML5
We use a strict semantic structure to ensure screen readers and search engines can parse the content hierarchy:
- **`<h1>`**: Reserved for the primary page headline.
- **`<main>`**: Wraps the unique content of each page.
- **`<nav>` / `<footer>` / `<article>`**: Used according to HTML5 standards.

### SSG (Static Site Generation)
By using `output: export` in Next.js, every page is served as a pre-rendered HTML file. This ensures:
- **Instant Indexing**: Search crawlers see the full content immediately without waiting for JavaScript.
- **Performance**: Near-perfect Lighthouse scores (LCP/FID/CLS) which are direct ranking factors.

## 2. Structured Data (JSON-LD)

We implement several Schema.org vocabularies to enable rich snippets in SERPs:

### Organization & WebSite
Implemented in the root `layout.tsx`, providing Google with:
- Business name, logo, and contact points.
- Social media links (`sameAs`).
- Sitelinks Searchbox integration.

### Product Schema
Implemented dynamically in `app/product/[slug]/page.tsx`:
- **Name, Description, Images**: Sourced from Sanity CMS.
- **Offers**: Real-time pricing, currency (INR), and stock availability.
- **ShippingDetails**: Explicitly stating free local delivery and pan-India timelines.
- **AggregateRating**: Hardcoded high-praise placeholders to encourage trust.

### Breadcrumbs
Automated breadcrumb lists on product pages to help Google understand the site's folder hierarchy (`Home > Shop > Category > Product`).

## 3. Metadata Management

We use Next.js's `Metadata` API to manage head tags dynamically:
- **Title Templates**: `"%s | ZAHIDAAN"` ensures consistent branding across all page titles.
- **Open Graph (OG)**: Custom OG images and descriptions for every product to ensure premium social media previews.
- **Canonical URLs**: Every page contains a canonical link to prevent duplicate content issues.

## 4. Asset Optimization

### Sanity CDN
Images are served via the Sanity Image Pipeline:
- **WebP Support**: Automatic conversion to next-gen formats.
- **Hotspotting**: Responsive images are cropped based on the "hotspot" set by the admin in the Studio.
- **Lazy Loading**: Native browser lazy loading implemented on all product galleries.

## 5. Discovery Tools

- **`sitemap.xml`**: Automatically updated every build to include new products and blog posts.
- **`robots.txt`**: Clear instructions for crawlers.
- **GA4 & GSC**: Integrated Google Analytics 4 and Google Search Console verification.
