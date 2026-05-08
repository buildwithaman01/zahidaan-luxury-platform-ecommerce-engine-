# 00 · MASTER PLAN
## ZAHIDAAN Attars & Perfumes — Complete Architecture v2

> **Brand:** ZAHIDAAN (زاہدان) — *"The Devoted Ones / The Essence of Zahid"*
> **Prepared by:** Pehchanly Digital Solutions
> **Legal Entity:** Zahidaan Attars and Perfumes (Proprietary)
> **MSME NIC:** 47722 — Retail sale of perfumery & cosmetic articles
> **Location:** Shop 1, Near Kolkuri Shopping Mall, Isnapur X Road, Patancheru, Sangareddy, Telangana – 502307
> **Domains:** zahidaan.in / zahidaan.com *(placeholder until registered)*

---

## 1. EXECUTIVE SUMMARY

ZAHIDAAN is a spiritually-positioned, ultra-premium luxury attar and perfume brand targeting the Hyderabad/Telangana corridor with pan-India reach. The digital presence spans a static Next.js storefront, Sanity-powered product CMS (client self-manages), a slim PHP API layer for orders and email, and a fully optimized Google Business Profile.

**Design inspiration:** Ajmal India (in.ajmal.com) + Rasasi Store (rasasistore.com) — refined luxury, dark richness, editorial product photography feel, premium typography.

**No timeline in this plan.** Milestones are tracked separately by Pehchanly.

---

## 2. HOSTING & INFRASTRUCTURE CONSTRAINTS

| Constraint | Detail |
|---|---|
| Host | MilesWeb Shared Hosting (already paid) |
| Server Engine | LiteSpeed, PHP 8.1+, MySQL, no persistent Node.js |
| Inode Budget | Target: under 300 inodes on server |
| Node.js on Server | NOT SUPPORTED |
| PHP on Server | Full support |
| MySQL on Server | Available — used for orders |

### Architecture Decision: Inode-Safe Decoupled JAMstack

```
[Next.js — Built Locally]
  → npm run build (output: 'export')
  → /out folder only uploaded via FTP/SFTP
  → MilesWeb serves static HTML/CSS/JS (~180 files)

[PHP Bridge — 3 files on MilesWeb]
  → api.php (order intake, status polling)
  → webhook.php (Sanity rebuild trigger)
  → mail.php (order confirmation emails)

[Sanity v3 — Cloud CMS, Free Tier]
  → Client manages products, uploads images
  → Sanity CDN hosts all product images (replaces Cloudinary)
  → GROQ API fetched at build time only (SSG, no runtime calls)

[MilesWeb MySQL]
  → Orders table, customers table, order_status table
  → No Supabase needed

[PhonePe Business — Zero MDR UPI]
  → Static QR code generated once
  → Owner confirms on PhonePe Business app

[Shiprocket — Pan-India COD only]
  → COD remittance back to owner in ~7 days
  → Used only when customer selects COD for pan-India
```

**Inode count on MilesWeb:** ~185–220 files total.
**Compared to WordPress:** 15,000–40,000 inodes. This is 95% leaner.

---

## 3. TECH STACK (FINAL — NO CHANGES WITHOUT DISCUSSION)

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14, App Router, `output: 'export'` | SSG = perfect SEO, no Node on server |
| Styling | Tailwind CSS v3 | Utility-first, zero runtime overhead |
| Animations | Framer Motion | Silky scroll reveals, bottle entrances |
| Display Font | Cormorant Garamond (400, 600, italic) | Old-world luxury, legible at large sizes |
| Body Font | DM Sans (300, 400, 500) | Clean modern contrast to Garamond |
| Cart State | Zustand + localStorage | Client-side only, no server needed |
| Forms | React Hook Form + Zod | Validated before PHP call |
| CMS | Sanity v3 (free, 1 user) | Client product management, Sanity CDN for images |
| Database | MilesWeb MySQL via PHP | Orders + customers, already on server |
| Backend | PHP 8.1 (3 files) | Native to MilesWeb, zero config |
| Payment | PhonePe Business UPI (zero MDR) | No gateway fee, owner verifies on app |
| COD Courier | Shiprocket (pan-India COD only) | Automated COD remittance, free account |
| Local Shipping | Owner delivery + India Post | Manual, zero cost |
| CDN/SSL | Cloudflare Free | Cache + SSL on top of MilesWeb |

---

## 4. DESIGN SYSTEM

### Brand Positioning
Spiritual · Soulful · Ultra-Premium · Luxury Boutique
Reference: Ajmal India structure + Rasasi visual richness

### Color Palette
```
--z-black:        #0A0A0A   ← Near-black base, backgrounds
--z-emerald:      #1B4332   ← Deep forest emerald, primary brand
--z-emerald-mid:  #2D6A4F   ← Mid emerald for gradients/hovers
--z-amber:        #B7860B   ← Warm amber, category labels
--z-gold:         #D4AF37   ← Brushed gold accent, price, CTA borders
--z-cream:        #FAF6F0   ← Warm off-white, light section bg
--z-charcoal:     #1C1C1C   ← Dark text on light backgrounds
--z-mist:         #F0EBE3   ← Subtle alternating section bg
--z-white:        #FFFFFF   ← Pure white for product cards
```

### Typography
```
Display:  Cormorant Garamond — H1, H2, product names, brand motto, quotes
Body:     DM Sans — nav, body copy, labels, buttons, descriptions
Accent:   Cormorant Garamond Italic — taglines, fragrance notes, testimonials
```

### Motion Principles
```
Ease:      cubic-bezier(0.16, 1, 0.3, 1)  ← "luxury ease" (fast in, slow out)
Duration:  0.6s default · 0.9s for hero elements
Stagger:   0.12s between sibling reveals
Scroll:    Intersection Observer based reveals
Rule:      No bounce. No spring. Attars do not bounce.
```

### Spacing (8pt grid)
```
xs: 4px | sm: 8px | md: 16px | lg: 24px | xl: 48px | 2xl: 80px | 3xl: 128px
```

---

## 5. PAYMENT & SHIPPING LOGIC (FINAL — LOCKED)

### Local Orders (Patancheru Service Area)

| Item | Value |
|---|---|
| Payment | COD — cash collected at door by owner/runner |
| Alt Payment | UPI QR also shown (PhonePe Business) |
| COD Charge | ₹0 (owner delivers personally) |
| Shipping Cost | ₹0 |
| Confirmation | Owner calls/WhatsApp to confirm |

**Local pincodes:** 502307, 502319, 502313, 500032, 500075, 500019, 500090

### Pan-India Orders

| Item | Value |
|---|---|
| Default Payment | UPI via PhonePe Business static QR |
| MDR on UPI | ₹0 (zero — PhonePe Business waives MDR on UPI) |
| Confirmation | Owner verifies on PhonePe Business app → clicks email confirm link |
| COD Option | Available with conditions (see below) |
| COD Charge | ₹[TBD by client — suggested ₹60 flat] |
| Min Order for COD | ₹[TBD by client — suggested ₹599] |
| COD Courier | Shiprocket (remittance in ~7 days) |
| Free Shipping Threshold | ₹[TBD by client — suggested ₹999] |
| Paid Shipping (below threshold) | ₹[TBD — suggested ₹79 flat] |

**Note:** All [TBD] values are placeholders. Client to confirm before launch.

### Order Confirmation Flow (The 2-Minute Loop)

1. Customer fills order form → clicks "Place Order"
2. PHP `api.php` writes order to MySQL with status = `pending`, generates unique order token
3. Customer sees "Order Received" page — auto-polls every 10 seconds for status change
4. Simultaneously: PHP fires WhatsApp pre-filled link to owner + sends order email to owner
5. Owner's email contains: full order details + **one-click confirm link** (tokenized URL)
6. Owner also opens PhonePe Business app to verify UPI payment (for UPI orders)
7. Owner clicks confirm link → `api.php` flips status to `confirmed` → customer page updates to "Order Confirmed ✅"
8. PHP `mail.php` sends confirmation email to customer with order summary

**Fallback:** If owner misses the 2-minute window, customer page shows "We're confirming your order — you'll receive a WhatsApp shortly."

---

## 6. INFORMATION ARCHITECTURE (ALL PAGES)

```
zahidaan.in/
├── /                          ← Homepage
├── /shop                      ← Full catalog with filters
│   ├── /shop/attars           ← Alcohol-Free Attars
│   ├── /shop/ouds             ← Arabian Ouds
│   ├── /shop/perfumes         ← French Perfumes
│   ├── /shop/bakhoor          ← Bakhoor & Incense
│   └── /shop/gift-sets        ← Luxury Gift Sets
├── /product/[slug]            ← Dynamic product detail (SSG from Sanity)
├── /about                     ← Brand story + craftsmanship
├── /contact                   ← Form + WhatsApp + Google Map embed
├── /cart                      ← Cart review (Zustand, client-side)
├── /checkout                  ← Order form + payment selection
├── /order-status/[token]      ← Real-time order confirmation polling
├── /track-order               ← Manual tracking input (DTDC/India Post)
├── /blog                      ← Fragrance education (Sanity posts)
│   └── /blog/[slug]
├── /faq                       ← Shipping, returns, fragrance FAQ
├── /privacy-policy
├── /terms-and-conditions
├── /return-policy
└── /sitemap.xml               ← Auto-generated at build
```

---

## 7. PRODUCT CATALOG (PLACEHOLDER — ALL TO BE REPLACED BY CLIENT VIA SANITY)

### Category 1: Attars (Alcohol-Free)

| Product | Top Notes | Heart Notes | Base Notes | Size | MRP |
|---|---|---|---|---|---|
| Ruh Al Oud | Saffron, Rose | Oud, Amber | Musk, Sandalwood | 6ml / 12ml | ₹699 / ₹1,299 |
| Jannat Al Firdaus | Jasmine, Lily | Tuberose, Iris | Musk, Vanilla | 6ml / 12ml | ₹549 / ₹999 |
| Laila Al Layali | Bergamot, Neroli | Rose, Oud | Amber, Sandalwood | 6ml / 12ml | ₹799 / ₹1,499 |

### Category 2: Arabian Ouds

| Product | Notes | Size | MRP |
|---|---|---|---|
| Al Zahidaan Noir | Smoky Oud, Leather → Dark Rose, Saffron → Amber, Musk | 50ml EDP | ₹2,499 |
| Desert King | Cardamom, Bergamot → Oud, Cedarwood → Vanilla, Musk | 50ml EDP | ₹1,999 |

### Category 3: French Perfumes

| Product | Notes | Size | MRP |
|---|---|---|---|
| Zahidaan Blanc | Green Tea, Lemon → White Musk, Peony → Sandalwood | 50ml EDP | ₹1,799 |
| Velvet Noir | Black Pepper, Cardamom → Rose, Oud → Vetiver, Amber | 100ml EDP | ₹2,999 |

### Category 4: Bakhoor/Incense

| Product | Format | MRP |
|---|---|---|
| Zahidaan Bakhoor Al Oud | Chips 40g | ₹849 |
| Ruh Al Bait | Pressed Cones 25pc | ₹599 |

### Category 5: Luxury Gift Sets

| Set | Contents | MRP |
|---|---|---|
| The Devotion Set | 3×6ml Attars + Velvet Pouch | ₹1,499 |
| The Zahidaan Signature | 50ml EDP + 6ml Attar + Bakhoor | ₹3,499 |
| Discovery Sampler | 5×2ml vials (all categories) | ₹499 |

> ⚠️ All above are placeholders. Client updates via Sanity Studio.

---

## 8. GBP & LOCAL SEO — EXACT NAP DATA

| Field | Value |
|---|---|
| Business Name | Zahidaan Attars & Perfumes |
| Primary Category | Perfume store |
| Secondary Categories | Cosmetics store, Aromatherapy supply store, Incense supplier |
| Address | Shop 1, Near Kolkuri Shopping Mall, Isnapur X Road, Village: Isnapur, Block/City: Patancheru, District: Sangareddy, Telangana – 502307 |
| Service Areas | Isnapur, Patancheruvu, Muthangi, Sangareddy, Ramachandrapuram, Lingampally, Gachibowli |
| Phone | [Client to provide] |
| Email | [Client to provide] |
| Website | zahidaan.in |

---

## 9. RAZORPAY KYC (FUTURE — NOT LAUNCH)

Not required at launch. PhonePe Business + COD covers launch payments.
When volume justifies it, add Razorpay Payment Links (2% per transaction).

| Document | Value |
|---|---|
| Entity Name | Zahidaan Attars and Perfumes |
| Org Type | Proprietary |
| MSME NIC Code | 47722 |
| PAN | [Client to provide] |
| GST | [Client to provide] |
| Address | Shop 1, Near Kolkuri Shopping Mall, Patancheru, Telangana – 502307 |

---

## 10. BUDGET (MONTHLY RUNNING COST)

| Service | Plan | Cost |
|---|---|---|
| MilesWeb Hosting | Existing shared | ₹0 (already paid) |
| Sanity CMS | Free (1 user) | ₹0 |
| Cloudflare | Free (SSL + cache) | ₹0 |
| PhonePe Business | Free | ₹0 |
| Shiprocket | Free account | Usage-based |
| Domain (zahidaan.in) | Annual | ~₹800/year |
| **Total Fixed/Month** | | **~₹0** |

---

## 11. RISK REGISTER

| Risk | Mitigation |
|---|---|
| Client delays sending product data | Launch with 5 placeholder SKUs, swap via Sanity |
| Owner misses 2-minute confirmation | WhatsApp ping + email both fire; fallback message shown to customer |
| Sanity free tier (3 users max) | 1 admin user only — no issue |
| MilesWeb inode limit | Audit every deploy; .git NEVER on server |
| COD fraud (pan-India) | Minimum order threshold + COD charge deters casual fraud |

---

*This is the single source of truth. All 12 agent files reference this document.*
*No timeline is included — tracked separately by Pehchanly Digital Solutions.*
