"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "/build",     label: "בנה פיצה",   badge: "חדש" },
  { href: "/#menu",     label: "תפריט",       badge: null  },
  { href: "/events",    label: "אירועים",     badge: null  },
  { href: "/loyalty",   label: "מועדון VIP",  badge: null  },
  { href: "/catering",  label: "קייטרינג",    badge: null  },
  { href: "/#location", label: "מיקום",       badge: null  },
];

function LogoMark() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none" aria-hidden="true">
      {/* Badge background */}
      <circle cx="21" cy="21" r="20" fill="#1A0806" />
      <circle cx="21" cy="21" r="20" fill="#E63946" fillOpacity="0.92" />
      {/* Pizza wheel outer ring */}
      <circle cx="21" cy="21" r="14" stroke="white" strokeWidth="0.6" fill="none" strokeOpacity="0.25" />
      {/* Filled pizza wedge (top slice) */}
      <path d="M21 7 L10 29 L32 29 Z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="1.4" strokeLinejoin="round" />
      {/* Thick crust */}
      <path d="M9.5 30 Q21 38 32.5 30" stroke="white" strokeWidth="3.2" strokeLinecap="round" fill="none" />
      {/* Toppings – 3 solid dots */}
      <circle cx="21" cy="15" r="2.6" fill="white" />
      <circle cx="15.5" cy="24.5" r="2" fill="white" />
      <circle cx="26.5" cy="24.5" r="2" fill="white" />
    </svg>
  );
}

interface NavProps {
  setOrderOpen?: (open: boolean) => void;
}

export function Nav({ setOrderOpen }: NavProps) {
  const openOrder = setOrderOpen ?? (() => {
    window.location.href = "https://order.plweb.online/wl/629098#!/rest/629098/menu";
  });
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      const close = () => setMobileOpen(false);
      window.addEventListener("scroll", close, { passive: true, once: true });
      return () => window.removeEventListener("scroll", close);
    }
  }, [mobileOpen]);

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(255,253,249,0.97)"
            : "rgba(255,253,249,0.65)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: scrolled
            ? "1px solid rgba(230,57,70,0.25)"
            : "1px solid rgba(240,216,192,0.4)",
          boxShadow: scrolled
            ? "0 4px 30px rgba(230,57,70,0.06), 0 1px 0 rgba(230,57,70,0.1)"
            : "none",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-3.5">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[-5deg]">
              <LogoMark />
            </div>
            <div className="flex flex-col leading-none gap-0.5">
              <span
                className="font-black text-[1.7rem] tracking-tight text-pp-dark transition-colors group-hover:text-pp-red"
                style={{ fontFamily: "var(--font-rubik)", fontWeight: 900 }}
              >
                פארקו
              </span>
              <span className="text-[8.5px] tracking-[0.28em] text-pp-muted uppercase font-bebas">
                PIZZA
              </span>
            </div>
          </Link>

          {/* Desktop nav — center */}
          <nav className="hidden gap-12 md:flex" dir="rtl">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="nav-link relative text-sm font-semibold tracking-wide text-pp-muted transition-colors hover:text-pp-dark"
              >
                {l.label}
                {l.badge && (
                  <span className="absolute -top-2 -right-5 rounded-full px-1.5 py-0.5 text-[9px] font-black tracking-wide text-white uppercase font-bebas" style={{background:"#E63946",lineHeight:1.3}}>
                    {l.badge}
                  </span>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop right: phone + CTA */}
          <div className="hidden items-center gap-5 md:flex">
            <a
              href="tel:046778900"
              className="flex items-center gap-2 text-sm font-bold tracking-wider text-pp-dark transition-colors hover:text-pp-red"
              dir="ltr"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.23h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.6 16l.32.92z"/>
              </svg>
              04-6778900
            </a>
            <button
              onClick={() => openOrder(true)}
              className="btn-primary px-5 py-2.5 text-xs tracking-widest uppercase"
            >
              הזמינו עכשיו
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="flex flex-col gap-[5px] md:hidden p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="תפריט ניווט"
          >
            <span
              className="block h-[2px] w-6 bg-pp-dark rounded-full transition-all duration-300"
              style={{ transform: mobileOpen ? "rotate(45deg) translate(4px, 4px)" : "" }}
            />
            <span
              className="block h-[2px] w-6 bg-pp-dark rounded-full transition-all duration-300"
              style={{ opacity: mobileOpen ? 0 : 1, width: mobileOpen ? "0" : "" }}
            />
            <span
              className="block h-[2px] w-6 bg-pp-dark rounded-full transition-all duration-300"
              style={{ transform: mobileOpen ? "rotate(-45deg) translate(4px, -4px)" : "" }}
            />
          </button>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center transition-all duration-500 md:hidden"
        style={{
          background: "linear-gradient(135deg, #E63946, #c42d38)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "all" : "none",
        }}
      >
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute -bottom-16 -right-16 w-80 h-80 rounded-full bg-white/5" />
        </div>

        <nav className="relative flex flex-col items-center gap-6" dir="rtl">
          {LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-3xl font-black tracking-wide text-white transition-all hover:opacity-70"
              style={{
                fontFamily: "var(--font-rubik)",
                fontWeight: 900,
                transform: mobileOpen ? "translateY(0)" : "translateY(24px)",
                opacity: mobileOpen ? 1 : 0,
                transition: `transform 0.45s cubic-bezier(0.16,1,0.3,1) ${i * 0.07}s, opacity 0.45s ease ${i * 0.07}s`,
              }}
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-6 flex flex-col items-center gap-4">
            <a
              href="tel:046778900"
              className="flex items-center gap-2 text-lg font-bold text-white/80"
              dir="ltr"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.23h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.6 16l.32.92z"/>
              </svg>
              04-6778900
            </a>
            <button
              onClick={() => { setMobileOpen(false); openOrder(true); }}
              className="mt-2 rounded-full border-2 border-white bg-white px-8 py-3 text-sm font-black tracking-widest text-pp-red uppercase transition-all hover:bg-transparent hover:text-white"
              style={{ fontFamily: "var(--font-rubik)" }}
            >
              הזמינו עכשיו
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
