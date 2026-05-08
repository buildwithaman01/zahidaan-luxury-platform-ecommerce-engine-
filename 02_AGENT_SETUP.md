# 02 · AGENT SETUP
## Scaffold — Folder Structure, Configs, Dependencies

> Read `00_MASTER_PLAN.md` first. Do not deviate from stack decisions.

---

## LOCAL DEVELOPMENT REQUIREMENTS

```
Node.js: 20.x LTS
npm: 10.x
PHP: 8.1+ (local testing via XAMPP/Laragon/Herd)
MySQL: 8.0 (local via XAMPP or TablePlus)
Git: For local version control only — NEVER push .git to MilesWeb
FTP Client: FileZilla or WinSCP (for MilesWeb deployment)
```

---

## PROJECT FOLDER STRUCTURE (LOCAL)

```
zahidaan/
├── frontend/                    ← Next.js project (built locally)
│   ├── app/
│   │   ├── layout.tsx           ← Root layout, fonts, metadata
│   │   ├── page.tsx             ← Homepage
│   │   ├── shop/
│   │   │   ├── page.tsx         ← Full catalog
│   │   │   ├── attars/page.tsx
│   │   │   ├── ouds/page.tsx
│   │   │   ├── perfumes/page.tsx
│   │   │   ├── bakhoor/page.tsx
│   │   │   └── gift-sets/page.tsx
│   │   ├── product/
│   │   │   └── [slug]/page.tsx  ← SSG from Sanity
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── cart/page.tsx
│   │   ├── checkout/page.tsx
│   │   ├── order-status/
│   │   │   └── [token]/page.tsx ← Polling page
│   │   ├── track-order/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── faq/page.tsx
│   │   ├── privacy-policy/page.tsx
│   │   ├── terms-and-conditions/page.tsx
│   │   └── return-policy/page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── WhatsAppFloat.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── MarqueeStrip.tsx
│   │   │   ├── CategoryGrid.tsx
│   │   │   ├── FeaturedProducts.tsx
│   │   │   ├── BrandStory.tsx
│   │   │   ├── WhyUs.tsx
│   │   │   ├── DiscoveryPackCTA.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── InstagramGrid.tsx
│   │   ├── shop/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGrid.tsx
│   │   │   ├── FilterSidebar.tsx
│   │   │   └── CategoryPills.tsx
│   │   ├── product/
│   │   │   ├── ProductHero.tsx
│   │   │   ├── FragranceNotes.tsx
│   │   │   ├── SizeSelector.tsx
│   │   │   ├── AddToCart.tsx
│   │   │   └── RelatedProducts.tsx
│   │   ├── cart/
│   │   │   ├── CartDrawer.tsx
│   │   │   ├── CartItem.tsx
│   │   │   └── CartSummary.tsx
│   │   ├── checkout/
│   │   │   ├── OrderForm.tsx
│   │   │   ├── PaymentSelector.tsx
│   │   │   ├── ShippingCalculator.tsx
│   │   │   └── OrderSummaryPanel.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       ├── Input.tsx
│   │       └── Spinner.tsx
│   ├── lib/
│   │   ├── sanity.ts            ← Sanity client + GROQ queries
│   │   ├── store.ts             ← Zustand cart store
│   │   ├── shipping.ts          ← Pincode → local/pan-india logic
│   │   └── api.ts               ← PHP API fetch helpers
│   ├── types/
│   │   ├── product.ts
│   │   └── order.ts
│   ├── public/
│   │   ├── logo.svg             ← ZAHIDAAN wordmark
│   │   ├── favicon.ico
│   │   ├── og-image.jpg         ← 1200×630 OG image
│   │   └── phonepay-qr.png      ← PhonePe Business QR (static)
│   ├── styles/
│   │   └── globals.css          ← Tailwind base + custom CSS vars
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── next-sitemap.config.js
│   └── .env.local               ← NEVER committed
│
├── backend/                     ← PHP files (upload to MilesWeb root)
│   ├── api.php                  ← Order intake + status polling
│   ├── webhook.php              ← Sanity rebuild trigger
│   └── mail.php                 ← Email sender (PHPMailer)
│
├── database/
│   ├── schema.sql               ← MySQL table definitions
│   └── seed.sql                 ← Sample orders for testing
│
├── sanity-studio/               ← Sanity v3 Studio (local config)
│   ├── sanity.config.ts
│   ├── schemas/
│   │   ├── product.ts
│   │   ├── category.ts
│   │   ├── blogPost.ts
│   │   └── siteSettings.ts
│   └── package.json
│
├── .gitignore
├── deploy.sh                    ← FTP deploy script (local only)
└── README.md
```

---

## NEXT.JS SETUP

```bash
npx create-next-app@latest frontend \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*"

cd frontend
npm install framer-motion zustand react-hook-form zod @sanity/client next-sanity next-sitemap
```

### `next.config.js`
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // Static export for MilesWeb
  trailingSlash: true,        // /shop/ not /shop (required for static hosting)
  images: {
    unoptimized: true,        // MilesWeb can't run image optimization server
    domains: ['cdn.sanity.io'],
  },
}
module.exports = nextConfig
```

### `tailwind.config.js`
```javascript
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'z-black':       '#0A0A0A',
        'z-emerald':     '#1B4332',
        'z-emerald-mid': '#2D6A4F',
        'z-amber':       '#B7860B',
        'z-gold':        '#D4AF37',
        'z-cream':       '#FAF6F0',
        'z-charcoal':    '#1C1C1C',
        'z-mist':        '#F0EBE3',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body:    ['"DM Sans"', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
```

### `styles/globals.css`
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --z-black: #0A0A0A;
  --z-emerald: #1B4332;
  --z-emerald-mid: #2D6A4F;
  --z-amber: #B7860B;
  --z-gold: #D4AF37;
  --z-cream: #FAF6F0;
  --z-charcoal: #1C1C1C;
  --z-mist: #F0EBE3;
}

html { scroll-behavior: smooth; }
body { font-family: 'DM Sans', sans-serif; background: var(--z-cream); }

.font-display { font-family: 'Cormorant Garamond', serif; }
```

---

## SANITY STUDIO SETUP

```bash
npm create sanity@latest -- \
  --project zahidaan \
  --dataset production \
  --template clean \
  --output-path sanity-studio

cd sanity-studio
npm install
```

Client will access Sanity Studio at: `https://zahidaan.sanity.studio`
No installation needed on MilesWeb for the studio.

---

## ENVIRONMENT VARIABLES

### `.env.local` (frontend — never committed)
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_API_BASE=https://zahidaan.in
NEXT_PUBLIC_PHONEPAY_UPI_ID=zahidaan@ybl
NEXT_PUBLIC_WHATSAPP_NUMBER=91XXXXXXXXXX
```

### `.env.example` (committed — for team reference)
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_API_BASE=
NEXT_PUBLIC_PHONEPAY_UPI_ID=
NEXT_PUBLIC_WHATSAPP_NUMBER=
```

---

## `.gitignore`
```
node_modules/
.next/
out/
.env.local
.env
*.log
.DS_Store
Thumbs.db
```

---

## WHAT GOES ON MILWSWEB (UPLOAD LIST)

```
Upload via FTP to public_html/:

frontend/out/           → public_html/          (all static files)
backend/api.php         → public_html/api.php
backend/webhook.php     → public_html/webhook.php
backend/mail.php        → public_html/mail.php
```

**NEVER upload:**
- `node_modules/`
- `.next/`
- `.git/`
- `sanity-studio/`
- Any `.env` file
