"use client";

import { useState } from "react";
import { Nav } from "@/components/nav";
import { StoriesHero } from "@/components/stories-hero";
import { MarqueeStrip } from "@/components/marquee-strip";
import { AboutSection } from "@/components/about-section";
import { MenuSection } from "@/components/menu-section";
import { GallerySection } from "@/components/gallery-section";
import { CustomerClub } from "@/components/customer-club";
import { LocationSection } from "@/components/location-section";
import { Footer } from "@/components/footer";
import { OrderModal } from "@/components/order-modal";
import { AiChat } from "@/components/ai-chat";
import { ReviewsSection } from "@/components/reviews-section";
import { EcosystemSection } from "@/components/ecosystem-section";

export default function Home() {
  const [orderOpen, setOrderOpen] = useState(false);

  return (
    <>
      <Nav setOrderOpen={setOrderOpen} />
      <main id="main-content" tabIndex={-1}>
        <StoriesHero setOrderOpen={setOrderOpen} />
        <MarqueeStrip />
        <AboutSection />
        <MenuSection />
        <GallerySection />
        <EcosystemSection />
        <CustomerClub />
        <ReviewsSection />
        <LocationSection />
      </main>
      <Footer setOrderOpen={setOrderOpen} />
      <OrderModal open={orderOpen} setOpen={setOrderOpen} />
      <AiChat />
    </>
  );
}
