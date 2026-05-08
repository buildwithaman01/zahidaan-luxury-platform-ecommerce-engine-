import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileNavigation from "@/components/layout/MobileNavigation";
import SearchOverlay from "@/components/layout/SearchOverlay";
import PageTransition from "@/components/layout/PageTransition";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import Script from 'next/script';

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-cormorant",
  display: "swap",
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#c5a059",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "ZAHIDAAN Attars & Perfumes | Authentic Oud & Attar — Patancheru, Hyderabad",
    template: "%s | ZAHIDAAN"
  },
  description: "Shop luxury attars, Arabian ouds, and French perfumes at ZAHIDAAN — Patancheru's premier fragrance boutique. Alcohol-free, long-lasting. Pan-India delivery.",
  manifest: "/manifest.json",
  keywords: [
    "attar shop in patancheru", 
    "attar shop near isnapur", 
    "perfume shop patancheruvu", 
    "best attar shop sangareddy", 
    "alcohol free attar patancheru", 
    "arabian oud hyderabad", 
    "long lasting attar hyderabad", 
    "zahidaan"
  ],
  metadataBase: new URL('https://zahidaan.in'),
  verification: {
    google: '3wgcw10dmhZr3t0eDRQGBKl4TtABLslef03eQmcSwb4',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ZAHIDAAN Attars & Perfumes | Authentic Oud & Attar',
    description: 'Shop luxury attars, Arabian ouds, and French perfumes at ZAHIDAAN.',
    url: 'https://zahidaan.in',
    siteName: 'ZAHIDAAN',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorantGaramond.variable} ${dmSans.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="ZAHIDAAN" />
        
        {/* Google Analytics (GA4) */}
        <Script 
          src="https://www.googletagmanager.com/gtag/js?id=G-7VVT3DNXBM" 
          strategy="afterInteractive" 
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7VVT3DNXBM');
          `}
        </Script>
      </head>
      <body className="font-body bg-z-cream text-z-charcoal antialiased min-h-screen flex flex-col">
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Zahidaan Attars and Perfumes",
              "url": "https://zahidaan.in",
              "logo": "https://zahidaan.in/logo.svg",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91 82970 08727",
                "contactType": "customer service",
                "availableLanguage": ["English", "Hindi", "Telugu", "Urdu"]
              },
              "sameAs": [
                "https://instagram.com/zahidaan",
                "https://facebook.com/zahidaan",
                "https://g.page/zahidaan-attars-perfumes"
              ]
            })
          }}
        />
        <Script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "ZAHIDAAN Attars & Perfumes",
              "url": "https://zahidaan.in",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://zahidaan.in/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <Navbar />
        <SearchOverlay />
        <PageTransition>
          <ErrorBoundary>
            <main className="flex-grow">
              {children}
            </main>
          </ErrorBoundary>
        </PageTransition>
        <Footer />
        <MobileNavigation />
      </body>
    </html>
  );
}
