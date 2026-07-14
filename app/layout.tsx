import type { Metadata } from "next";
import { Bebas_Neue, Heebo, Rubik } from "next/font/google";
import { CookieBanner } from "@/components/cookie-banner";
import { AccessibilityWidget } from "@/components/accessibility-widget";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
  weight: ["400"],
});

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const rubik = Rubik({
  subsets: ["hebrew", "latin"],
  variable: "--font-rubik",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const SITE_URL = "https://www.parcopizza.online";
const OG_IMAGE = "https://parco-pizza.co.il/wp-content/uploads/sites/249/2026/05/imgi_99_FIL_7675740_1779028123750.jpg";

export const metadata: Metadata = {
  title: "פארקו פיצה | Parco Pizza — קריית ים",
  description:
    "פיצה טרייה, פסטה ביתית, מאפים וקינוחים. כשר חלבי. גן אברהם, גאולה כהן 4, קריית ים. 04-6778900",
  keywords: ["פיצה", "קריית ים", "פארקו", "כשר", "פסטה", "pizza", "Parco"],
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: "פארקו פיצה | Parco Pizza",
    description: "פיצה טרייה, פסטה ביתית ועוד. כשר חלבי. קריית ים.",
    locale: "he_IL",
    type: "website",
    siteName: "פארקו פיצה",
    url: SITE_URL,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 800,
        alt: "פארקו פיצה — מנה מהמטבח",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "פארקו פיצה | Parco Pizza",
    description: "פיצה טרייה, פסטה ביתית ועוד. כשר חלבי. קריית ים.",
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "פארקו פיצה",
  alternateName: "Parco Pizza",
  url: SITE_URL,
  image: OG_IMAGE,
  description: "מסעדה כשרה חלבית בקריית ים המגישה פיצות טריות, פסטה ביתית, מאפים וקינוחים.",
  servesCuisine: ["Italian", "Pizza", "Pasta"],
  priceRange: "₪₪",
  telephone: "+972-4-677-8900",
  hasMap: "https://maps.google.com/?q=גאולה+כהן+4+קריית+ים",
  address: {
    "@type": "PostalAddress",
    streetAddress: "גאולה כהן 4",
    addressLocality: "קריית ים",
    addressCountry: "IL",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday","Monday","Tuesday","Wednesday","Thursday"], opens: "11:00", closes: "22:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "11:00", closes: "14:30" },
  ],
  sameAs: ["https://parco-pizza.co.il"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${bebasNeue.variable} ${heebo.variable} ${rubik.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-pp-bg text-pp-dark antialiased">
        {/* Skip to main content — accessibility */}
        <a href="#main-content" className="skip-to-content">
          דלג לתוכן הראשי
        </a>
        {children}
        <CookieBanner />
        <AccessibilityWidget />
      </body>
    </html>
  );
}
