"use client";

import Link from "next/link";

interface FooterProps {
  setOrderOpen?: (open: boolean) => void;
}

const NAV_LINKS = [
  { href: "/#menu",     label: "תפריט"   },
  { href: "/#about",    label: "אודות"   },
  { href: "/#gallery",  label: "גלריה"   },
  { href: "/#location", label: "מיקום"   },
  { href: "/#club",     label: "מועדון"  },
  { href: "/contact",   label: "צרו קשר" },
];

function LogoMarkFooter() {
  return (
    <svg width="32" height="32" viewBox="0 0 38 38" fill="none" aria-hidden="true">
      <circle cx="19" cy="19" r="18" fill="#E63946" />
      <path d="M19 3 L19 19" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M19 19 L33 28" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M19 19 L5 28" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M5 28 Q19 37 33 28" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      <circle cx="19" cy="10" r="1.8" fill="white" />
      <circle cx="13.5" cy="21" r="1.4" fill="white" opacity="0.85" />
      <circle cx="24.5" cy="21" r="1.4" fill="white" opacity="0.85" />
      <circle cx="19" cy="19" r="1.6" fill="white" />
    </svg>
  );
}

export function Footer({ setOrderOpen }: FooterProps) {
  const year = new Date().getFullYear();
  const openOrder = setOrderOpen ?? (() => {
    window.open("https://order.plweb.online/wl/629098#!/rest/629098/menu", "_blank", "noopener,noreferrer");
  });

  return (
    <footer className="section-dark-ambient">

      {/* Top accent line */}
      <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-pp-red to-transparent" />

      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {/* Logo + About */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="transition-transform duration-300 group-hover:scale-105 group-hover:rotate-[-5deg]">
                <LogoMarkFooter />
              </div>
              <div className="flex flex-col leading-none gap-0.5">
                <span
                  className="font-black text-xl tracking-tight text-white"
                  style={{ fontFamily: "var(--font-rubik)", fontWeight: 900 }}
                >
                  פארקו
                </span>
                <span className="text-[8px] tracking-[0.28em] text-pp-muted/80 uppercase font-bebas">
                  PIZZA
                </span>
              </div>
            </Link>
            <p className="text-sm text-pp-muted leading-relaxed">
              פיצה, פסטה ואהבה — קריית ים.<br />
              טרי כל יום, מוכן מהלב.
            </p>
            <p className="text-xs text-pp-muted/50">
              כשר חלב | גן אברהם, גאולה כהן 4
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-5 text-[10px] tracking-[0.35em] text-pp-muted/60 uppercase font-bebas">
              ניווט
            </p>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="nav-link text-sm text-pp-muted transition-colors hover:text-pp-red w-fit"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Order options */}
          <div>
            <p className="mb-5 text-[10px] tracking-[0.35em] text-pp-muted/60 uppercase font-bebas">
              הזמינו
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => openOrder(true)}
                className="btn-primary w-full py-3 text-xs tracking-widest uppercase flex items-center justify-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                  <path d="M7 1.5L12 11H2Z" stroke="white" strokeWidth="1.2" strokeLinejoin="round"/>
                  <circle cx="7" cy="7.5" r="1" fill="white"/>
                </svg>
                הזמינו עכשיו
              </button>
              <a
                href="https://order.plweb.online/wl/629098#!/rest/629098/menu"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-full border border-pp-muted/20 px-4 py-2.5 text-center text-xs tracking-wide text-pp-muted transition-all hover:border-pp-red hover:text-pp-red"
              >
                משלוח מהיר
              </a>
              <a
                href="tel:046778900"
                className="flex items-center justify-center gap-2 text-sm font-bold text-pp-muted transition-colors hover:text-pp-red"
                dir="ltr"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.23h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.6 16l.32.92z"/>
                </svg>
                04-6778900
              </a>
            </div>
          </div>

          {/* Social + Contact */}
          <div>
            <p className="mb-5 text-[10px] tracking-[0.35em] text-pp-muted/60 uppercase font-bebas">
              עקבו אחרינו
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.facebook.com/p/Parcopizza-61578178182108/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm text-pp-muted transition-all hover:text-pp-red hover:gap-4"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 transition-all hover:bg-pp-red/10 hover:border-pp-red/30">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                Facebook
              </a>
              <a
                href="https://www.instagram.com/parcopizza/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-sm text-pp-muted transition-all hover:text-pp-red hover:gap-4"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10 transition-all hover:bg-pp-red/10 hover:border-pp-red/30">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </div>
                Instagram
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 px-6 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-center md:flex-row md:text-start">
          <p className="text-[11px] text-pp-muted/40">
            © {year} פארקו פיצה. כל הזכויות שמורות.
          </p>
          <p className="text-[11px] text-pp-muted/40">
            עיצוב ופיתוח:{" "}
            <a
              href="https://2bnmedia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pp-muted/60 underline-offset-2 transition-colors hover:text-pp-red hover:underline"
            >
              2bnmedia.com
            </a>
          </p>
        </div>
      </div>

    </footer>
  );
}
