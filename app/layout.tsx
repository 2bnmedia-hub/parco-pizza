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

export const metadata: Metadata = {
  title: "פארקו פיצה | Parco Pizza — קריית ים",
  description:
    "פיצה טרייה, פסטה ביתית, מאפים וקינוחים. כשר חלב. גן אברהם, גאולה כהן 4, קריית ים. 04-6778900",
  keywords: ["פיצה", "קריית ים", "פארקו", "כשר", "פסטה", "pizza", "Parco"],
  openGraph: {
    title: "פארקו פיצה | Parco Pizza",
    description: "פיצה טרייה, פסטה ביתית ועוד. כשר חלב. קריית ים.",
    locale: "he_IL",
    type: "website",
    siteName: "פארקו פיצה",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${bebasNeue.variable} ${heebo.variable} ${rubik.variable}`}
    >
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
