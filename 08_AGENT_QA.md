# 08 · AGENT QA
## Tests · Performance · Security · Pre-Launch Checklist

> Read `00_MASTER_PLAN.md` first.
> No testing frameworks on MilesWeb server. All tests run locally before FTP deploy.

---

## PRE-LAUNCH CHECKLIST (Must Pass 100%)

### Order Flow (End-to-End Manual Test)
- [ ] Place test order with local pincode → verify COD shown, UPI QR shown, free shipping applied
- [ ] Place test order with pan-India pincode + UPI → verify polling page appears, owner email received
- [ ] Click CONFIRM link in owner email → verify order status flips to "confirmed"
- [ ] Verify customer confirmation email received
- [ ] Place test order with pan-India COD → verify COD charge added, Shiprocket option noted
- [ ] Attempt order below COD minimum with COD selected → verify blocked with message

### Payment Verification
- [ ] PhonePe Business QR scanned → ₹1 test payment → owner sees on PhonePe Business app
- [ ] UPI transaction matches order total in email
- [ ] COD charge correctly added to cart total in checkout

### Sanity CMS
- [ ] Client can log into sanity.studio
- [ ] Client can add a new product with image
- [ ] Rebuild triggered via webhook.php
- [ ] New product appears on live site after rebuild
- [ ] Client can edit product price → reflects on site after rebuild

### Pages — All Must Exist and Load
- [ ] / (Homepage) — all sections render, images load from Sanity CDN
- [ ] /shop — products listed, filters work
- [ ] /shop/attars — category filtered correctly
- [ ] /product/[slug] — product detail, add to cart works
- [ ] /cart — items show, quantities update, remove works
- [ ] /checkout — form validates, payment selector logic works
- [ ] /order-status/[token] — polls correctly
- [ ] /about — renders
- [ ] /contact — WhatsApp link works, map embed loads
- [ ] /faq — renders
- [ ] /privacy-policy — renders
- [ ] /terms-and-conditions — renders
- [ ] /return-policy — renders
- [ ] /sitemap.xml — accessible and valid

### SEO
- [ ] Every page has unique `<title>` tag (max 60 chars)
- [ ] Every page has unique `<meta name="description">` (max 155 chars)
- [ ] Product pages have Product schema (JSON-LD)
- [ ] Homepage has LocalBusiness schema (JSON-LD)
- [ ] All images have descriptive `alt` text
- [ ] /sitemap.xml submitted to Google Search Console
- [ ] /robots.txt present and correct

### Performance (Lighthouse — test after Cloudflare is live)
- [ ] Performance score: 85+
- [ ] SEO score: 95+
- [ ] Accessibility score: 90+
- [ ] LCP (Largest Contentful Paint): under 2.5s
- [ ] CLS (Cumulative Layout Shift): under 0.1
- [ ] Hero image served as WebP
- [ ] Fonts preloaded in `<head>`

### Security
- [ ] `api.php` returns CORS header for zahidaan.in only
- [ ] `api.php?action=health` returns 200 with db status
- [ ] `.env` files are not accessible via browser
- [ ] `/logs/` folder returns 403
- [ ] SQL injection test: submit `'; DROP TABLE orders; --` in name field → verify rejected
- [ ] XSS test: submit `<script>alert(1)</script>` in name field → verify sanitized
- [ ] Confirm token cannot be reused (second click → error)

### Mobile
- [ ] Navbar hamburger menu works on iOS Safari
- [ ] Product images load on mobile data (< 200KB each via Sanity CDN transforms)
- [ ] Checkout form usable on mobile keyboard (no field hidden behind keyboard)
- [ ] Cart drawer opens/closes correctly on mobile

---

## PERFORMANCE OPTIMIZATION CHECKLIST

### Images
- All product images uploaded to Sanity at 1200px width max
- Sanity CDN auto-serves WebP to supporting browsers
- Hero image preloaded: `<link rel="preload" as="image" href="...">`
- Use `urlFor(image).width(600).format('webp').url()` in product cards

### Fonts
```html
<!-- In layout.tsx <head> — preload only used weights -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap" />
```

### Bundle
- Run `npm run build` and check output sizes
- Any page chunk over 150KB → investigate and split
- Framer Motion: import only used features (`motion`, `AnimatePresence`)

---

