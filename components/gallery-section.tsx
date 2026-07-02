"use client";

import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";

const BASE = "https://parco-pizza.co.il/wp-content/uploads/sites/249/2026/05/";

interface Photo {
  src: string;
  alt: string;
  span?: string;
}

const PHOTOS: Photo[] = [
  {
    src: `${BASE}imgi_99_FIL_7675740_1779028123750.jpg`,
    alt: "מנה מיוחדת מפארקו פיצה",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    src: `${BASE}imgi_104_FIL_7675744_1779028495212.jpg`,
    alt: "פיצה טרייה מהתנור",
    span: "",
  },
  {
    src: `${BASE}imgi_102_FIL_7675741_1779614016120.jpg`,
    alt: "פיצה כמו שאוהבים",
    span: "",
  },
  {
    src: `${BASE}imgi_100_FIL_7675743_1779264814570.jpg`,
    alt: "פסטה ביתית",
    span: "",
  },
  {
    src: `${BASE}imgi_97_FIL_7675738_1779028042479.jpg`,
    alt: "מגוון מנות",
    span: "",
  },
  {
    src: `${BASE}imgi_96_FIL_7675737_1779028020965.jpg`,
    alt: "מנה מיוחדת",
    span: "md:col-span-2",
  },
];

export function GallerySection() {
  return (
    <section id="gallery" className="py-14 md:py-28" style={{ background: "#111827" }}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">

        {/* Header */}
        <div className="mb-10 md:mb-16 text-center">
          <ScrollReveal>
            <p className="mb-3 text-xs tracking-[0.4em] text-pp-orange uppercase">Gallery</p>
          </ScrollReveal>
          <ScrollReveal className="reveal-d2">
            <h2 className="font-display text-3xl font-bold text-white md:text-5xl">
              טעם שנראה טוב
            </h2>
          </ScrollReveal>
          <ScrollReveal className="reveal-d3">
            <p className="mt-4 text-pp-muted">
              כשהאוכל נראה כמו שהוא טועם — מרהיב
            </p>
          </ScrollReveal>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-4 md:auto-rows-[240px]">
          {PHOTOS.map((photo, i) => (
            <ScrollReveal
              key={i}
              className={`${photo.span ?? ""} reveal-d${(i % 4) + 1}`}
            >
              <div className="group relative h-64 overflow-hidden rounded-2xl md:h-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Red overlay on hover */}
                <div className="absolute inset-0 bg-pp-red/0 transition-all duration-500 group-hover:bg-pp-red/30" />
                {/* Icon reveal on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
                  <div className="animate-scale-in rounded-full bg-white/20 p-5 backdrop-blur-sm">
                    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="text-white drop-shadow-lg">
                      <path d="M18 3L30 27H6Z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" fill="rgba(255,255,255,0.15)" />
                      <circle cx="18" cy="17" r="2.5" fill="white" />
                      <circle cx="12.5" cy="21" r="1.8" fill="white" opacity="0.75" />
                      <circle cx="23.5" cy="21" r="1.8" fill="white" opacity="0.75" />
                      <path d="M7.5 24 Q18 32 28.5 24" stroke="white" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                    </svg>
                  </div>
                </div>
                {/* Alt text caption */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4 translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                  <p className="text-sm font-semibold text-white">{photo.alt}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Instagram CTA */}
        <ScrollReveal>
          <div className="mt-12 text-center">
            <a
              href="https://www.instagram.com/parcopizza/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 rounded-full border border-white/20 px-8 py-3.5 text-sm text-white/70 transition-all hover:border-pp-orange hover:text-pp-orange"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
              <span>עקבו אחרינו ב-Instagram</span>
              <span className="text-pp-orange">@parcopizza</span>
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
