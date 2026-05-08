# 03 · AGENT FRONTEND
## All UI — Pages, Components, Design System, Image Prompts

> Read `00_MASTER_PLAN.md` first.
> Design reference: Ajmal India (in.ajmal.com) + Rasasi Store (rasasistore.com)
> Font: Cormorant Garamond (display) + DM Sans (body)
> Colors: See Master Plan Section 4

---

## DESIGN PHILOSOPHY

ZAHIDAAN is spiritual, soulful, ultra-premium. Every UI decision must answer:
*"Does this feel like a luxury attar boutique, or does it feel like a generic e-commerce store?"*

- Generous white space on light sections
- Deep emerald + near-black on dark hero sections
- Gold accents on prices, CTAs, borders — never overused
- Cormorant Garamond for everything the eye lands on first
- No rounded pill buttons — square or very subtly rounded (4px max)
- No drop shadows on product cards — use border + spacing instead
- Animations: reveal on scroll, stagger siblings, no bounce

---

## NANO BANANA IMAGE PROMPTS (For Every Section)

The following prompts are production-ready for Nano Banana or any AI image generation tool. Each is crafted for the specific section it serves. Replace placeholder images with Nano Banana outputs before launch.

### Hero Banner (Homepage)
```
PROMPT: Ultra-premium luxury perfume flat lay on dark emerald green marble surface. Three ornate glass attar bottles with gold caps, one open with stopper removed, surrounded by scattered rose petals in deep burgundy and amber, raw saffron strands, and a small sandalwood piece. Dramatic side lighting from left casting long soft shadows. Shot at 35mm, shallow depth of field, moody and editorial. Color palette: deep forest green, warm amber, brushed gold, near-black. No text. No people. Photorealistic.
DIMENSIONS: 1920×900px (desktop hero)
```

### Homepage — Brand Story Section
```
PROMPT: Intimate close-up of aged hands carefully filling a crystal attar bottle using a traditional brass funnel. Warm golden hour light filtering through a dusty window. Background is softly blurred wooden workshop shelves with dozens of dark glass bottles. Shallow depth of field. Cinematic, nostalgic, artisanal feel. Color palette: warm amber, sepia, deep brown, soft gold. No text. Photorealistic.
DIMENSIONS: 800×1000px (portrait, right side of two-column layout)
```

### Homepage — Why Us / Features Section
```
PROMPT: Elegant flat lay of a luxury perfume gift box half-open, revealing a dark glass bottle wrapped in black tissue paper with a gold wax seal. On a warm cream linen surface with a single dried rose and gold ribbon. Soft diffused natural light. Minimalist luxury styling. Color palette: cream, gold, black, rose. No text. Photorealistic.
DIMENSIONS: 600×600px (square, feature card background)
```

### Product Card — Attar Category
```
PROMPT: Single ornate 6ml glass attar bottle with antique brass roller cap, placed on a small piece of dark oud wood. Background is soft focus dark green velvet cloth. A single saffron strand rests against the bottle. Macro photography style. Rich colors. Deep shadows. Color palette: amber glass, brass gold, deep green, dark brown. No text. Photorealistic.
DIMENSIONS: 600×750px (product card portrait)
```

### Product Card — Oud/EDP Category
```
PROMPT: Premium 50ml rectangular dark glass EDP bottle with brushed gold lettering, on a jet black polished stone surface. Minimalist studio shot. One beam of side light. Reflection visible in stone surface. Smoke wisps rising from base suggest depth and mystery. Color palette: black, gold, dark smoke grey. No text. Photorealistic.
DIMENSIONS: 600×750px (product card portrait)
```

### Product Card — Gift Set Category
```
PROMPT: Luxury perfume gift set in a deep emerald green magnetic closure box, open and angled at 45 degrees, revealing two dark glass bottles nestled in black velvet foam inserts. Gold foil brand name on box lid catches light. Shot on white marble with a single fresh jasmine flower placed beside it. Color palette: emerald, gold, black, white marble. No text. Photorealistic.
DIMENSIONS: 600×750px (product card portrait)
```

### About Page — Brand Heritage Section
```
PROMPT: Aerial flat lay of traditional Indian attar-making ingredients arranged artfully on dark stone: fresh jasmine flowers, rose petals, raw sandalwood pieces, saffron threads, small oud chips, cardamom pods, and a brass distillation vessel in the corner. Warm directional lighting from top-left. Rich colors. Editorial magazine style. Color palette: ivory, amber, deep red, forest green, gold. No text. Photorealistic.
DIMENSIONS: 1200×700px (wide landscape, full-width section)
```

### Blog / Fragrance Guide Section
```
PROMPT: Open fragrance journal on a dark wooden desk, handwritten notes visible but not legible, with a small attar bottle beside it. A burning incense stick with a thin wisp of smoke. Warm candlelight ambiance. Color palette: warm amber, dark walnut, cream paper, soft candlelight gold. No text. Photorealistic.
DIMENSIONS: 800×500px (blog card thumbnail)
```

### Contact / WhatsApp Section
```
PROMPT: Elegant perfume bottle beside a mobile phone showing a WhatsApp chat. The phone screen is softly blurred so no content is readable. Dark emerald green background. Premium product styling. Gold light accents. Color palette: dark green, gold, warm white. No text. Photorealistic.
DIMENSIONS: 600×600px (square contact CTA)
```

---

## PAGE-BY-PAGE COMPONENT BREAKDOWN

### / HOMEPAGE

**Section 1: Navbar**
- Sticky, transparent on hero → solid `z-black` on scroll
- Left: ZAHIDAAN wordmark (Cormorant Garamond, 28px, letter-spacing 3px)
- Center: Nav links (Shop, Attars, Ouds, About, Blog)
- Right: Search icon + Cart icon (Zustand count badge) + WhatsApp icon
- Mobile: Hamburger → full-screen overlay menu
- Gold underline on active/hover nav items

**Section 2: Hero**
- Full viewport height (100vh)
- Background: Nano Banana hero image (above) with dark overlay gradient
- Headline: `font-display, 72px desktop / 42px mobile` — "The Essence of Devotion" [PLACEHOLDER tagline]
- Sub: `font-body, 18px, weight 300` — "Authentic Attars & Arabian Ouds — Crafted for the Soul"
- CTA button: "Discover the Collection" — border 1px gold, text gold, hover: gold bg + black text
- Secondary CTA: "Shop Gift Sets →" — text only, white, underline on hover
- Scroll indicator: thin gold line animating downward

**Section 3: Marquee Strip**
- Full-width dark emerald bg (#1B4332)
- Infinite scroll text: "AUTHENTIC ATTARS · ARABIAN OUDS · FRENCH PERFUMES · BAKHOOR · LUXURY GIFTS · ZAHIDAAN ·"
- Font: DM Sans 500, 12px, letter-spacing 4px, text-transform uppercase, gold color

**Section 4: Category Grid**
- Heading (Cormorant Garamond 48px): "Explore by Category"
- 5 category cards in horizontal scroll on mobile, 5-column grid on desktop
- Each card: category image (Nano Banana) + category name overlay (bottom, Garamond italic)
- Hover: slight scale(1.03) + gold border appears

**Section 5: Featured Products**
- Heading: "Our Bestsellers"
- Filter tabs: Him · Her · Attar · Gift Sets (same pattern as Ajmal)
- 4 product cards visible, "View All" CTA
- Product card structure: see Product Card section below

**Section 6: Brand Story**
- Two-column: Left = text, Right = Nano Banana brand story image
- Left: Small label (DM Sans uppercase, amber, 11px) "OUR STORY"
- Heading (Garamond 48px): "A Fragrance Born from Devotion"
- Body (DM Sans 400, 16px, line-height 1.8): [PLACEHOLDER brand story — 3 short paragraphs]
- CTA: "Learn Our Story →"

**Section 7: Why Us (Feature Grid)**
- 4 feature cards on light z-mist background
- Icon (SVG, emerald color) + Title (Garamond 22px) + Description (DM Sans 14px)
- Features: Long-Lasting Formula · Alcohol-Free Attars · Fast Local Delivery · Luxury Packaging

**Section 8: Discovery Pack CTA**
- Full-width dark section, emerald bg
- Heading (Garamond, 52px, white): "Not Sure Where to Begin?"
- Sub: "Try our Discovery Sampler — 5 signature scents, one perfect starting point"
- CTA: "Get the Sampler — ₹499" (gold border button)
- Background: Nano Banana gift set image with dark overlay

**Section 9: Testimonials**
- White bg, 3 testimonial cards
- Stars (gold SVGs) + Quote (Garamond italic 20px) + Name + City
- [PLACEHOLDER: 3 fake testimonials with Indian names]

**Section 10: Instagram Strip**
- Label: "Follow @zahidaan" [PLACEHOLDER handle]
- 6 square image placeholders in a grid (Nano Banana lifestyle images)
- Click: opens Instagram profile

**Section 11: Footer**
- 4 columns: Brand (logo + tagline + social icons) · Quick Links · Categories · Contact
- Bottom bar: GST No. [PLACEHOLDER] · © 2025 Zahidaan Attars & Perfumes
- WhatsApp float button: fixed bottom-right, emerald circle, WhatsApp icon

---

### /SHOP — CATALOG PAGE

- Sidebar (desktop) / Drawer (mobile): Filter by Category, Gender, Price Range, Fragrance Family
- Product grid: 3 columns desktop, 2 columns tablet, 1 column mobile
- Sort: Bestsellers / Price Low-High / Price High-Low / Newest
- Empty state: "No products match your filters" + clear filters CTA
- Loading state: skeleton cards (3 rows, same card dimensions)

---

### /PRODUCT/[SLUG] — PRODUCT DETAIL

**Left column (60%):**
- Main product image (from Sanity CDN) — click to zoom
- Thumbnail strip below (if multiple images)

**Right column (40%):**
- Category badge (amber, uppercase, 11px)
- Product name (Garamond, 42px)
- Fragrance family tag: e.g. "Woody · Oriental"
- Price (Garamond, 32px, gold color) — MRP struck if sale
- Size selector: button group (6ml / 12ml / 50ml etc.)
- Fragrance Notes accordion:
  - Top Notes: listed with small dot icons
  - Heart Notes: listed
  - Base Notes: listed
- Longevity: e.g. "8–10 hours · Strong projection"
- Skin-friendly badge (if applicable)
- Add to Cart button (full width, emerald bg, gold text)
- WhatsApp inquiry link below button
- Shipping info: "Free delivery above ₹[TBD] · Pan-India via India Post / DTDC"

**Below fold:**
- Full description tab
- Reviews tab (placeholder: 3 sample reviews)
- Related Products row (4 cards)

---

### /CART — CART PAGE

- Cart items list: image thumbnail + name + size + quantity selector + remove
- Order summary panel (sticky on desktop):
  - Subtotal
  - Shipping (auto-calculated based on pincode check)
  - COD charge (shown only if pan-India COD selected)
  - Total
- "Proceed to Checkout" CTA (emerald button)
- Empty cart state: illustration + "Your cart is empty" + "Browse Collection" CTA

---

### /CHECKOUT — ORDER FORM

**Guest checkout only — no login required.**

Form fields:
- Full Name *
- Phone Number * (WhatsApp preferred — note shown)
- Email Address *
- Delivery Address * (Street, Area, City, State, Pincode *)

Pincode logic (runs on blur):
- If pincode in local list → shows "Local delivery — COD available, free shipping"
- If pincode not in list → shows "Pan-India delivery — UPI recommended"

Payment selector (shown after pincode resolves):
- Option A: UPI / PhonePe (recommended badge) — "Scan QR and pay — we confirm within 2 minutes"
- Option B: COD — shown only if eligible (pan-India: adds COD charge, shows minimum warning)
- Option C: Local COD — shown for local pincodes

Order summary sidebar (same as cart summary)

Submit button: "Place Order →" — triggers `api.php`

---

### /ORDER-STATUS/[TOKEN] — CONFIRMATION POLLING PAGE

- Shows order summary (product names, total, address)
- Status indicator:
  - Pending: spinning gold ring + "Confirming your order..."
  - Confirmed: gold checkmark + "Order Confirmed! You'll receive a WhatsApp shortly."
  - Cancelled: red X + "Order could not be confirmed. Please contact us."
- Auto-polls `api.php?action=status&token=XXX` every 10 seconds
- Stops polling after status changes or after 5 minutes
- Below: "Need help? WhatsApp us: [number]"

---

## PRODUCT CARD COMPONENT

```
┌─────────────────────────┐
│   [Product Image]        │  ← Sanity CDN image, 600×750px
│   [WISHLIST ICON]        │  ← top-right, heart SVG
│                          │
├─────────────────────────┤
│  ATTAR · UNISEX          │  ← category · gender (amber, 10px, uppercase)
│  Ruh Al Oud              │  ← Garamond 22px
│  Rose · Oud · Sandalwood │  ← top notes preview (DM Sans 13px, muted)
│  ★★★★★ (47)             │  ← star rating placeholder
│  ₹699  ~~₹999~~          │  ← price (Garamond 20px gold) + MRP struck
│  [Add to Cart]           │  ← full width, emerald bg
└─────────────────────────┘
```

Hover state:
- Subtle scale(1.02)
- Gold border appears (1px, bottom and right only for asymmetry)
- "Add to Cart" button slides up from bottom 8px

---

## ACCESSIBILITY REQUIREMENTS

- All images have descriptive `alt` text
- Color contrast: all text meets WCAG AA (4.5:1 minimum)
- Focus rings visible on all interactive elements
- Form fields have associated `<label>` elements
- Skip navigation link at top of page
- Cart count announced to screen readers via `aria-live`

---

## LOADING & ERROR STATES (Required on every page)

Every data-dependent component must have:
1. **Loading:** Skeleton shimmer (CSS animation, emerald tint)
2. **Error:** "Something went wrong. Please refresh or WhatsApp us."
3. **Empty:** Context-specific empty state with CTA

---

## MOBILE-FIRST BREAKPOINTS

```
Base (mobile):  0–767px
Tablet:         768–1023px
Desktop:        1024px+
```

All layouts designed mobile-first. Desktop enhancements layered on top.
