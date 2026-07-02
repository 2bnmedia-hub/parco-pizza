import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";

export function OrderCta() {
  return (
    <section className="relative overflow-hidden py-32">
      {/* Background image */}
      <Image
        src="https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1920&q=80&auto=format&fit=crop"
        alt="הזמינו פיצה"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/75" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(201,169,110,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <ScrollReveal>
          <p className="mb-4 text-xs tracking-[0.4em] text-brand-gold uppercase">
            Order Online&nbsp;•&nbsp;הזמינו עכשיו
          </p>
        </ScrollReveal>

        <ScrollReveal className="reveal-d2">
          <h2 className="font-display font-bold text-5xl text-white md:text-6xl lg:text-7xl">
            מוכנים לאכול?
          </h2>
        </ScrollReveal>

        <ScrollReveal className="reveal-d3">
          <p className="mx-auto mt-6 max-w-sm text-sm text-white/70">
            הזמינו פיצה, פסטה ועוד — ישירות מהאתר שלנו עם משלוח לקריית ים והסביבה
          </p>
        </ScrollReveal>

        <ScrollReveal className="reveal-d4">
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://order.plweb.online/wl/629098#!/rest/629098/menu"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white bg-white px-10 py-4 text-sm tracking-[0.25em] text-brand-cream uppercase transition-all hover:bg-transparent hover:text-white"
            >
              הזמינו עכשיו
            </a>
            <a
              href="tel:046778900"
              className="border border-white/50 px-10 py-4 text-sm tracking-[0.25em] text-white uppercase transition-all hover:border-white hover:text-white"
            >
              04-6778900
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
