import { ScrollReveal } from "./scroll-reveal";

const HOURS = [
  { day: "ראשון — חמישי", time: "12:00 — 00:00", open: true  },
  { day: "שישי",          time: "בדקו אותנו",      open: false },
  { day: "שבת",           time: "בדקו אותנו",      open: false },
];

export function LocationSection() {
  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      style={{ background: "#0F1A14" }}
      className="py-16 md:py-20"
    >
      <div className="mx-auto max-w-7xl px-6">

        {/* Compact header */}
        <ScrollReveal>
          <div className="mb-10 flex flex-col items-center text-center">
            <p className="mb-2 tracking-[0.5em] text-white/40 uppercase font-bebas text-xs">
              Find Us
            </p>
            <h2
              id="location-heading"
              className="font-black text-3xl text-white md:text-4xl"
              style={{ fontFamily: "var(--font-rubik)", fontWeight: 900 }}
            >
              בואו לבקר
            </h2>
          </div>
        </ScrollReveal>

        {/* Layout: info panel + map */}
        <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">

          {/* Info panel — 2/5 width on desktop */}
          <ScrollReveal className="reveal-d1 lg:col-span-2">
            <div
              className="h-full rounded-2xl border p-6 flex flex-col gap-5"
              style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}
            >

              {/* Address */}
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(230,57,70,0.15)" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6C3.5 9.5 8 14.5 8 14.5C8 14.5 12.5 9.5 12.5 6C12.5 3.5 10.5 1.5 8 1.5Z" stroke="#E63946" strokeWidth="1.4" fill="rgba(230,57,70,0.1)"/>
                    <circle cx="8" cy="6" r="1.8" stroke="#E63946" strokeWidth="1.2"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] tracking-widest text-white/40 uppercase font-bebas mb-0.5">כתובת</p>
                  <p className="font-bold text-white text-sm" style={{ fontFamily: "var(--font-rubik)" }}>גן אברהם — גאולה כהן 4</p>
                  <p className="text-xs text-white/50 mt-0.5">קריית ים</p>
                </div>
              </div>

              <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.06)" }} />

              {/* Hours */}
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(230,57,70,0.15)" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="5.5" stroke="#E63946" strokeWidth="1.4"/>
                    <path d="M8 5 V8 L10.5 10" stroke="#E63946" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] tracking-widest text-white/40 uppercase font-bebas mb-2">שעות פעילות</p>
                  <dl className="space-y-1.5">
                    {HOURS.map((h) => (
                      <div key={h.day} className="flex items-center justify-between gap-2">
                        <dt className="text-xs text-white/50">{h.day}</dt>
                        <dd className={`text-xs font-semibold ${h.open ? "text-white" : "text-white/40"}`}>
                          {h.time}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>

              <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.06)" }} />

              {/* Phone */}
              <div className="flex items-start gap-3.5">
                <div className="mt-0.5 shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(230,57,70,0.15)" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M11.5 11v1.5a1 1 0 0 1-1.1 1A9.5 9.5 0 0 1 2.5 5.6 1 1 0 0 1 3.5 4.5H5a1 1 0 0 1 1 .9c.1.5.2 1 .4 1.5a1 1 0 0 1-.2 1L5.6 8.5A8 8 0 0 0 8.5 11.4l.6-.6a1 1 0 0 1 1-.2c.5.2 1 .3 1.5.4A1 1 0 0 1 11.5 11Z" stroke="#E63946" strokeWidth="1.3" fill="rgba(230,57,70,0.1)"/>
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] tracking-widest text-white/40 uppercase font-bebas mb-0.5">טלפון</p>
                  <a
                    href="tel:046778900"
                    className="font-bold text-white text-sm transition-colors hover:text-pp-red"
                    dir="ltr"
                    aria-label="התקשרו לפארקו פיצה: 04-6778900"
                    style={{ fontFamily: "var(--font-rubik)" }}
                  >
                    04-6778900
                  </a>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-auto pt-2 flex gap-3">
                <a
                  href="https://maps.app.goo.gl/Kpcw2dJNp8rcBkVg8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center rounded-full border-2 border-white/20 text-white/70 py-2.5 text-xs font-black tracking-widest uppercase transition-all hover:border-white/50 hover:text-white"
                >
                  נווט אלינו
                </a>
                <div className="flex gap-2">
                  <a
                    href="https://www.facebook.com/p/Parcopizza-61578178182108/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="פארקו פיצה בפייסבוק"
                    className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 text-white/50 transition-all hover:border-pp-red/50 hover:text-pp-red"
                  >
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/parcopizza/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="פארקו פיצה באינסטגרם"
                    className="w-9 h-9 rounded-full flex items-center justify-center border border-white/10 text-white/50 transition-all hover:border-pp-red/50 hover:text-pp-red"
                  >
                    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </ScrollReveal>

          {/* Map — 3/5 width on desktop */}
          <ScrollReveal className="reveal-d2 lg:col-span-3">
            <div className="relative overflow-hidden rounded-2xl" style={{ height: "min(420px, 60vw)", minHeight: "280px" }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3388.0!2d35.07!3d32.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDQ5JzU4LjAiTiAzNcKwMDQnMTIuMCJF!5e0!3m2!1siw!2sil!4v1700000000000!5m2!1siw!2sil"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="מיקום פארקו פיצה — גאולה כהן 4, קריית ים"
                aria-label="מפה המציגה את מיקום פארקו פיצה"
              />
              <a
                href="https://maps.app.goo.gl/Kpcw2dJNp8rcBkVg8"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="פתח ב-Google Maps"
                className="absolute bottom-3 right-3 rounded-xl px-4 py-2 text-xs font-black tracking-widest uppercase text-white shadow-lg transition-opacity hover:opacity-90"
                style={{ background: "#E63946" }}
              >
                פתח במפות
              </a>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
