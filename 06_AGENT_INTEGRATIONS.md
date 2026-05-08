# 06 · AGENT INTEGRATIONS
## Sanity CMS · PhonePe Business · Shiprocket · WhatsApp

> Read `00_MASTER_PLAN.md` first.
> Sanity = product CMS + image hosting (replaces Cloudinary).
> PhonePe Business = zero-MDR UPI payment confirmation.
> Shiprocket = pan-India COD courier only.

---

## SANITY CMS — COMPLETE SETUP

### Why Sanity for This Project
- Free for 1 user (client is the only user)
- Hosted Studio at `zahidaan.sanity.studio` — client opens in browser, no install
- Sanity CDN hosts all product images — eliminates Cloudinary
- GROQ API fetched at Next.js build time — zero runtime API calls in production
- Client can add products, edit descriptions, upload images without touching code

### Sanity Studio Access
- URL: `https://zahidaan.sanity.studio`
- Login: Client's Google account or email (set during Sanity project creation)
- Pehchanly retains owner/admin access

---

### Sanity Schema — `schemas/product.ts`

```typescript
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Attar (Alcohol-Free)', value: 'attar' },
          { title: 'Arabian Oud', value: 'oud' },
          { title: 'French Perfume', value: 'perfume' },
          { title: 'Bakhoor / Incense', value: 'bakhoor' },
          { title: 'Luxury Gift Set', value: 'gift-set' },
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'gender',
      title: 'Target Gender',
      type: 'string',
      options: {
        list: [
          { title: 'Men', value: 'men' },
          { title: 'Women', value: 'women' },
          { title: 'Unisex', value: 'unisex' },
        ]
      }
    }),
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Shown on product cards — max 100 characters'
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }]
    }),
    defineField({
      name: 'fragranceNotes',
      title: 'Fragrance Notes',
      type: 'object',
      fields: [
        { name: 'top', title: 'Top Notes', type: 'string',
          description: 'Comma separated: Rose, Saffron, Bergamot' },
        { name: 'heart', title: 'Heart / Middle Notes', type: 'string' },
        { name: 'base', title: 'Base Notes', type: 'string' },
      ]
    }),
    defineField({
      name: 'fragranceFamily',
      title: 'Fragrance Family',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: ['Woody', 'Oriental', 'Floral', 'Fresh', 'Spicy', 'Citrus', 'Aquatic', 'Musky', 'Sweet']
      }
    }),
    defineField({
      name: 'concentration',
      title: 'Concentration',
      type: 'string',
      options: {
        list: [
          { title: 'Attar (pure oil)', value: 'attar' },
          { title: 'EDP (Eau de Parfum)', value: 'edp' },
          { title: 'EDT (Eau de Toilette)', value: 'edt' },
        ]
      }
    }),
    defineField({
      name: 'longevity',
      title: 'Longevity (hours)',
      type: 'string',
      description: 'e.g. "8–10 hours"'
    }),
    defineField({
      name: 'projection',
      title: 'Projection',
      type: 'string',
      options: {
        list: [
          { title: 'Soft / Intimate', value: 'soft' },
          { title: 'Medium', value: 'medium' },
          { title: 'Strong', value: 'strong' },
        ]
      }
    }),
    defineField({
      name: 'skinFriendly',
      title: 'Skin Friendly?',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'sizes',
      title: 'Available Sizes & Prices',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'size', title: 'Size', type: 'string',
            description: 'e.g. 6ml, 12ml, 50ml, 100ml' },
          { name: 'mrp', title: 'MRP (₹)', type: 'number' },
          { name: 'sellingPrice', title: 'Selling Price (₹)', type: 'number' },
          { name: 'stock', title: 'Stock (units)', type: 'number' },
        ]
      }],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'isBestseller',
      title: 'Mark as Bestseller?',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'isFeatured',
      title: 'Show on Homepage?',
      type: 'boolean',
      initialValue: false
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Max 60 characters'
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      description: 'Max 155 characters'
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'images.0'
    }
  }
})
```

---

### Sanity Schema — `schemas/blogPost.ts`

```typescript
export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: Rule => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } },
    { name: 'coverImage', title: 'Cover Image', type: 'image', options: { hotspot: true } },
    { name: 'publishedAt', title: 'Published Date', type: 'datetime' },
    { name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 },
    { name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
    { name: 'seoTitle', title: 'SEO Title', type: 'string' },
    { name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2 },
  ]
}
```

---

### Sanity GROQ Queries — `lib/sanity.ts` (frontend)

```typescript
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true,
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)

// All products (for /shop)
export const ALL_PRODUCTS_QUERY = `*[_type == "product" && !defined(deletedAt)] | order(isBestseller desc) {
  _id, name, slug, category, gender, shortDescription,
  "image": images[0],
  fragranceNotes, fragranceFamily, concentration,
  sizes, isBestseller, isFeatured
}`

// Featured products (for homepage)
export const FEATURED_PRODUCTS_QUERY = `*[_type == "product" && isFeatured == true] | order(_createdAt desc)[0...8] {
  _id, name, slug, category, gender, shortDescription,
  "image": images[0], fragranceNotes, sizes
}`

// Single product (for /product/[slug])
export const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug][0] {
  _id, name, slug, category, gender, description, shortDescription,
  images, fragranceNotes, fragranceFamily, concentration,
  longevity, projection, skinFriendly, sizes, isBestseller,
  seoTitle, seoDescription
}`

// Blog posts
export const ALL_BLOG_POSTS_QUERY = `*[_type == "blogPost"] | order(publishedAt desc) {
  _id, title, slug, coverImage, publishedAt, excerpt
}`
```

---

## PHONEPAY BUSINESS — SETUP GUIDE

### What It Does
PhonePe Business gives the owner a static UPI QR code linked to the business UPI ID.
Customer scans → pays → PhonePe Business app shows payment notification with amount + customer UPI ID.
Owner manually verifies the amount matches the order, then clicks confirm link in owner email.

### Setup Steps for Client (Zahid)
1. Download PhonePe Business app (Play Store / App Store)
2. Register with: Business Name = Zahidaan Attars and Perfumes, GSTIN (if available), bank account
3. Complete KYC (Aadhaar + PAN)
4. UPI ID will be assigned: e.g. `zahidaan@ybl` or `zahidaanperfumes@ibl`
5. Download the static QR from the app → save as `phonepay-qr.png`
6. Pehchanly uploads `phonepay-qr.png` to `/public/` folder in Next.js
7. QR shown on checkout page (UPI payment option)

### Owner Confirmation Workflow
1. Order placed → owner gets email + WhatsApp ping
2. Owner opens PhonePe Business app → checks "Transactions" tab
3. Verifies: amount matches order total, payment timestamp is recent
4. Owner clicks "CONFIRM ORDER" link in email → order status flips to confirmed
5. Customer sees "Confirmed" on order status page

### MDR (Fee) Structure
- UPI transactions: ₹0 (zero) — as per NPCI mandate for UPI
- No monthly fee for basic PhonePe Business

---

## SHIPROCKET — SETUP GUIDE (Pan-India COD Only)

### When Shiprocket Is Used
Only for pan-India orders where customer selects COD.
UPI-paid pan-India orders can use India Post directly (owner manages manually).

### Setup Steps
1. Create free account at shiprocket.in
2. Add business: Zahidaan Attars and Perfumes, address, bank account for COD remittance
3. Add courier partners: enable DTDC (primary) + India Post (backup for remote pincodes)
4. Enable COD: set remittance frequency (weekly recommended for new business)

### COD Remittance
- Shiprocket collects cash at delivery
- Deducts Shiprocket fees (~₹45–60 per COD order typically)
- Remits balance to owner bank account within 7 business days

### Integration Level at Launch
Manual integration: owner creates shipment in Shiprocket dashboard when COD order confirmed.
No API integration at launch — volume doesn't justify it yet.
Add Shiprocket API in Phase 2 when order volume exceeds 30/month.

---

## WHATSAPP PRE-FILL LINK (Order Notification to Owner)

Generated in `api.php` when order is placed. Logged in email to owner.

```php
function buildWhatsAppOwnerLink(array $order): string {
    $msg = "🌿 *New ZAHIDAAN Order #{$order['id']}*\n\n";
    $msg .= "👤 {$order['customer_name']} — {$order['customer_phone']}\n";
    $msg .= "📦 {$order['items_summary']}\n";
    $msg .= "💰 ₹" . number_format($order['total_paise'] / 100, 0) . " — {$order['payment_method']}\n";
    $msg .= "📍 {$order['city']}, {$order['pincode']}\n\n";
    $msg .= "✅ Confirm: https://zahidaan.in/api.php?action=confirm&token={$order['confirm_token']}";

    $ownerNumber = '91XXXXXXXXXX'; // Replace with actual owner number
    return 'https://wa.me/' . $ownerNumber . '?text=' . urlencode($msg);
}
```

This URL is embedded as a link in the owner email. Owner clicks → WhatsApp opens with pre-filled message to themselves as a reminder. Optional — the email confirm button is the primary action.
