"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";

function IconPizza() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-pp-red">
      <path d="M16 3 L28 26 H4 Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
      <circle cx="16" cy="16" r="2" fill="currentColor" />
      <circle cx="11" cy="20" r="1.5" fill="currentColor" opacity="0.7" />
      <circle cx="21" cy="20" r="1.5" fill="currentColor" opacity="0.7" />
      <path d="M7 22 Q16 29 25 22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-pp-red">
      <path
        d="M16 4 L19.6 12.5 H28.7 L21.5 17.9 L24.4 26.5 L16 21.5 L7.6 26.5 L10.5 17.9 L3.3 12.5 H12.4 Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="rgba(198,40,40,0.12)"
      />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-pp-red">
      <path
        d="M16 3 L5 7.5 V15 C5 21.6 9.8 27.6 16 29 C22.2 27.6 27 21.6 27 15 V7.5 Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="rgba(198,40,40,0.08)"
      />
      <path d="M10.5 15.5 L14 19 L21.5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconHeart() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-pp-red">
      <path
        d="M16 27 C16 27 4 20 4 11.5 C4 8 6.8 5 10.5 5 C12.7 5 14.8 6.2 16 8 C17.2 6.2 19.3 5 21.5 5 C25.2 5 28 8 28 11.5 C28 20 16 27 16 27Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="rgba(198,40,40,0.12)"
      />
    </svg>
  );
}

const STATS = [
  { Icon: IconStar,   value: 4.9,  suffix: "",   label: "דירוג ממוצע", decimal: true },
  { Icon: IconShield, value: 100,  suffix: "%",  label: "כשר למהדרין" },
  { Icon: IconHeart,  value: 10,   suffix: "+",  label: "שנות ניסיון" },
];

function AnimatedCounter({ value, suffix, decimal = false }: { value: number; suffix: string; decimal?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const start = performance.now();
          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Number((eased * value).toFixed(decimal ? 1 : 0)));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          obs.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, decimal]);

  return (
    <span ref={ref}>
      {decimal ? count.toFixed(1) : Math.round(count)}
      {suffix}
    </span>
  );
}

function TagIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-pp-red" aria-hidden="true">
      {children}
    </svg>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="bg-white py-14 md:py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 md:px-6">

        {/* Stats row */}
        <div className="mb-12 md:mb-20 grid grid-cols-3 gap-2 md:gap-4 max-w-2xl mx-auto w-full">
          {STATS.map((s, i) => (
            <ScrollReveal key={s.label} className={`reveal-d${i + 1}`}>
              <div className="card-premium group rounded-xl md:rounded-2xl bg-gradient-to-br from-pp-surface to-white border border-pp-border/60 p-4 md:p-6 text-center shadow-sm">
                <div className="stat-icon-wrap mb-4 flex justify-center">
                  <s.Icon />
                </div>
                <p
                  className="text-2xl font-black text-pp-red md:text-4xl"
                  style={{ fontFamily: "var(--font-rubik)", fontWeight: 900 }}
                >
                  <AnimatedCounter value={s.value} suffix={s.suffix} decimal={s.decimal} />
                </p>
                <p className="mt-1.5 text-xs font-medium text-pp-muted tracking-wide">{s.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Main about grid */}
        <div className="grid gap-10 md:grid-cols-2 md:gap-20 lg:items-center">

          {/* Image column */}
          <ScrollReveal className="reveal-d1">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl">
                <Image
                  src="https://parco-pizza.co.il/wp-content/uploads/sites/249/2026/05/imgi_97_FIL_7675738_1779028042479.jpg"
                  alt="מסעדת פארקו פיצה"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                {/* Color overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-pp-red/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Floating badge — kosher */}
              <div className="absolute -bottom-4 -left-4 rounded-2xl bg-white border-2 border-pp-green/40 px-5 py-4 shadow-2xl animate-float">
                <p
                  className="font-black text-2xl leading-none text-pp-green"
                  style={{ fontFamily: "var(--font-rubik)", fontWeight: 900 }}
                >
                  כשר
                </p>
                <p className="mt-1 text-[10px] tracking-[0.3em] text-pp-green/70 uppercase font-bebas">
                  למהדרין
                </p>
              </div>

              {/* Accent border */}
              <div className="pointer-events-none absolute -top-3 -right-3 h-full w-full rounded-3xl border-2 border-pp-red/15" />

              {/* Decorative dot grid */}
              <div
                className="absolute -top-6 -right-6 w-24 h-24 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(#C62828 1.5px, transparent 1.5px)",
                  backgroundSize: "10px 10px",
                }}
              />
            </div>
          </ScrollReveal>

          {/* Text column */}
          <div className="flex flex-col gap-6">
            <ScrollReveal>
              <p className="text-xs tracking-[0.5em] text-pp-red uppercase font-bebas text-sm">
                About Us — אודותינו
              </p>
            </ScrollReveal>

            <ScrollReveal className="reveal-d2">
              <h2
                className="text-3xl font-black leading-tight text-pp-dark md:text-5xl lg:text-6xl"
                style={{ fontFamily: "var(--font-rubik)", fontWeight: 900 }}
              >
                מוכן מהלב,
                <br />
                <span className="text-pp-red">תמיד טרי</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal className="reveal-d3">
              <div className="flex items-center gap-3">
                <div className="h-0.5 w-12 rounded-full bg-pp-red" />
                <div className="h-0.5 w-4 rounded-full bg-pp-red/30" />
              </div>
            </ScrollReveal>

            <ScrollReveal className="reveal-d4">
              <p className="text-pp-muted leading-relaxed text-[15px]">
                פארקו פיצה הוא מסעדה איטלקית כשרה בלב קריית ים, שמגישה פיצות טריות,
                פסטה ביתית, מאפים, סלטים וקינוחים — הכל עם אהבה ומרכיבים איכותיים.
              </p>
            </ScrollReveal>

            <ScrollReveal className="reveal-d5">
              <p className="text-pp-muted leading-relaxed text-[15px]">
                אנחנו מאמינים שאוכל טוב מתחיל מחומרי גלם איכותיים וממתכונים אמיתיים.
                בפארקו תמצאו את השילוב המושלם בין מטבח איטלקי קלאסי לטעמים ישראליים —
                כשר חלבי, נגיש, ומוכן עם לב.
              </p>
            </ScrollReveal>

            <ScrollReveal className="reveal-d6">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pp-red/10">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="text-pp-red">
                      <path d="M7 1.5L12 11H2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                      <circle cx="7" cy="7.5" r="1" fill="currentColor"/>
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-pp-muted">פיצה טרייה</span>
                </div>
                <span className="h-3 w-px bg-pp-border" aria-hidden="true" />
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pp-red/10">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="text-pp-red">
                      <path d="M2 7 C2 4 4 2 7 2 S12 4 12 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                      <path d="M3 9 C3 7 5 6 7 6 S11 7 11 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                      <path d="M4 11.5 C4 10 5.5 9.5 7 9.5 S10 10 10 11.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-pp-muted">פסטה ביתית</span>
                </div>
                <span className="h-3 w-px bg-pp-border" aria-hidden="true" />
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pp-green/10">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="text-pp-green">
                      <path d="M5 7 L6.5 8.5 L9.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  <span className="text-sm font-medium text-pp-green">כשר חלבי</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <a
                href="/#location"
                className="inline-flex items-center gap-3 rounded-full border-2 border-pp-dark text-pp-dark px-8 py-3.5 text-sm font-black tracking-widest uppercase transition-all hover:bg-pp-dark hover:text-white"
              >
                בואו לבקר
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
