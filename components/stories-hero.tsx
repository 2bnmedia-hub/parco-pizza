"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";

const SLIDES = [
  {
    src: "https://parco-pizza.co.il/wp-content/uploads/sites/249/2026/05/imgi_104_FIL_7675744_1779028495212.jpg",
    title: "טרי מהתנור",
    sub: "כל יום, כל שעה",
  },
  {
    src: "https://parco-pizza.co.il/wp-content/uploads/sites/249/2026/05/imgi_102_FIL_7675741_1779614016120.jpg",
    title: "פיצה כמו שאוהבים",
    sub: "מרגריטה ועד שף",
  },
  {
    src: "https://parco-pizza.co.il/wp-content/uploads/sites/249/2026/05/imgi_100_FIL_7675743_1779264814570.jpg",
    title: "פסטה ביתית",
    sub: "מוכנת מהלב",
  },
  {
    src: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=1920&q=85&auto=format&fit=crop",
    title: "כשר למהדרין",
    sub: "גן אברהם, קריית ים",
  },
  {
    src: "https://parco-pizza.co.il/wp-content/uploads/sites/249/2026/05/imgi_99_FIL_7675740_1779028123750.jpg",
    title: "הזמינו עכשיו",
    sub: "משלוח | איסוף | ישיבה",
  },
];

const SLIDE_DURATION = 5000;

interface StoriesHeroProps {
  setOrderOpen: (open: boolean) => void;
}

export function StoriesHero({ setOrderOpen }: StoriesHeroProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent(index);
    setProgressKey((k) => k + 1);
    setPaused(false);
  }, []);

  const next = useCallback(
    () => goTo((current + 1) % SLIDES.length),
    [current, goTo],
  );

  const prev = useCallback(
    () => goTo((current - 1 + SLIDES.length) % SLIDES.length),
    [current, goTo],
  );

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(next, SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [next, paused, progressKey]);

  // Handle click zones: right half = prev (RTL), left half = next
  const handleZoneClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const half = rect.width / 2;
      if (x < half) {
        next();
      } else {
        prev();
      }
    },
    [next, prev],
  );

  const slide = SLIDES[current];

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      {/* Background images */}
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0, zIndex: 0 }}
        >
          <Image
            src={s.src}
            alt={s.title}
            fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 z-10 bg-black/50" />

      {/* Click zones */}
      <div
        className="absolute inset-0 z-20 cursor-pointer"
        onClick={handleZoneClick}
        aria-label="לחץ לשקופית הבאה/הקודמת"
      />

      {/* Progress bars — top */}
      <div className="absolute top-0 inset-x-0 z-30 flex gap-1.5 px-4 pt-4 md:px-6">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); goTo(i); }}
            className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/30"
            aria-label={`שקופית ${i + 1}`}
          >
            {i < current && (
              <div className="h-full w-full bg-white" />
            )}
            {i === current && (
              <div
                key={`progress-${progressKey}`}
                className="h-full bg-white"
                style={{
                  animation: `progressFill ${SLIDE_DURATION}ms linear forwards`,
                  animationPlayState: paused ? "paused" : "running",
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Center content */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6 text-center pointer-events-none">
        <p
          key={`sub-${current}`}
          className="mb-3 text-xs tracking-[0.4em] text-pp-yellow uppercase animate-fade-in"
        >
          {slide.sub}
        </p>
        <h1
          key={`title-${current}`}
          className="text-5xl font-black text-white animate-fade-up md:text-7xl lg:text-8xl"
          style={{ fontFamily: "var(--font-rubik)", fontWeight: 900 }}
        >
          {slide.title}
        </h1>
        <div
          key={`cta-${current}`}
          className="mt-8 flex flex-wrap justify-center gap-4 pointer-events-auto animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          <button
            onClick={() => setOrderOpen(true)}
            className="btn-primary px-8 py-3.5 text-sm tracking-widest uppercase"
          >
            הזמינו עכשיו
          </button>
          <a
            href="/#menu"
            className="btn-outline-white px-8 py-3.5 text-sm tracking-widest uppercase"
          >
            לתפריט
          </a>
        </div>
      </div>

      {/* Slide counter — bottom left */}
      <div className="absolute bottom-8 right-8 z-30 flex items-center gap-2 pointer-events-none">
        <span className="font-bold text-white text-sm">
          {String(current + 1).padStart(2, "0")}
        </span>
        <span className="text-white/40 text-xs">/</span>
        <span className="text-white/40 text-xs">
          {String(SLIDES.length).padStart(2, "0")}
        </span>
      </div>

      {/* Scroll hint — bottom center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 animate-pulse-soft pointer-events-none">
        <svg
          width="20"
          height="30"
          viewBox="0 0 20 30"
          fill="none"
          className="text-white/60"
        >
          <rect
            x="1"
            y="1"
            width="18"
            height="28"
            rx="9"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <rect
            x="9"
            y="6"
            width="2"
            height="6"
            rx="1"
            fill="currentColor"
          />
        </svg>
        <span className="text-[9px] tracking-[0.3em] text-white/60 uppercase">גלול</span>
      </div>

      {/* Pause on hover — toggle */}
      <div
        className="absolute inset-0 z-[25]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      />
    </section>
  );
}
