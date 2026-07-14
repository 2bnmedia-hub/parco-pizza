"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1920&q=85&auto=format&fit=crop",
    alt: "פיצה מרגריטה טרייה",
  },
  {
    src: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1920&q=85&auto=format&fit=crop",
    alt: "פיצה קלאסית",
  },
  {
    src: "https://parco-pizza.co.il/wp-content/uploads/sites/249/2026/05/imgi_104_FIL_7675744_1779028495212.jpg",
    alt: "פארקו פיצה — מנה מהמטבח",
  },
  {
    src: "https://parco-pizza.co.il/wp-content/uploads/sites/249/2026/05/imgi_102_FIL_7675741_1779614016120.jpg",
    alt: "פארקו פיצה — מגש פיצה",
  },
  {
    src: "https://parco-pizza.co.il/wp-content/uploads/sites/249/2026/05/imgi_100_FIL_7675743_1779264814570.jpg",
    alt: "פארקו פיצה — מנה מיוחדת",
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent((c) => (c + 1) % SLIDES.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [next, paused]);


  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Slides */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/20 via-transparent to-black/20" />

      {/* Center content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-xs tracking-[0.4em] text-brand-gold uppercase animate-fade-in">
          טרי&nbsp;•&nbsp;איכותי&nbsp;•&nbsp;מהלב
        </p>
        <h1
          className="font-display font-bold text-6xl text-white sm:text-7xl md:text-8xl lg:text-9xl"
          style={{ animationDelay: "0.3s" }}
        >
          <span className="animate-fade-in" style={{ display: "block" }}>Parco</span>
        </h1>
        <p
          className="mt-4 text-sm tracking-[0.3em] text-white/80 uppercase animate-fade-in sm:text-base"
          style={{ animationDelay: "0.6s" }}
        >
          פיצה&nbsp;•&nbsp;פסטה&nbsp;•&nbsp;אהבה
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6" style={{ animationDelay: "0.9s" }}>
          <a
            href="https://order.plweb.online/wl/629098#!/rest/629098/menu"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white bg-white px-8 py-3.5 text-xs tracking-[0.3em] text-brand-cream uppercase transition-all hover:bg-transparent hover:text-white"
          >
            הזמינו עכשיו
          </a>
          <Link
            href="/#menu"
            className="border border-white/50 px-8 py-3.5 text-xs tracking-[0.3em] text-white uppercase transition-all hover:border-white hover:text-white"
          >
            לתפריט
          </Link>
        </div>
      </div>

      {/* Controls */}
      <button
        onClick={() => { prev(); setPaused(true); }}
        className="absolute right-6 top-1/2 z-30 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-white/20 text-white/60 transition-all hover:border-brand-gold hover:text-brand-gold"
        aria-label="הקודם"
      >
        ›
      </button>
      <button
        onClick={() => { next(); setPaused(true); }}
        className="absolute left-6 top-1/2 z-30 -translate-y-1/2 flex h-10 w-10 items-center justify-center border border-white/20 text-white/60 transition-all hover:border-brand-gold hover:text-brand-gold"
        aria-label="הבא"
      >
        ‹
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => { setCurrent(i); setPaused(true); }}
            className="transition-all"
            style={{
              width: i === current ? "24px" : "6px",
              height: "6px",
              background: i === current ? "#c9a96e" : "rgba(245,237,224,0.3)",
              borderRadius: "3px",
            }}
            aria-label={`שקופית ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 right-8 z-30 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[9px] tracking-[0.3em] text-brand-cream uppercase">גלול</span>
        <div className="h-8 w-px bg-brand-cream" />
      </div>
    </section>
  );
}
