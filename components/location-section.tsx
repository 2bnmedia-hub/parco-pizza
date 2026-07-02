import { ScrollReveal } from "./scroll-reveal";

function IconPin() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-pp-red" aria-hidden="true">
      <path d="M14 3C9.6 3 6 6.6 6 11C6 17.5 14 25 14 25C14 25 22 17.5 22 11C22 6.6 18.4 3 14 3Z" stroke="currentColor" strokeWidth="1.8" fill="rgba(230,57,70,0.1)"/>
      <circle cx="14" cy="11" r="3" stroke="currentColor" strokeWidth="1.6"/>
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-pp-red" aria-hidden="true">
      <circle cx="14" cy="14" r="10" stroke="currentColor" strokeWidth="1.8" fill="rgba(230,57,70,0.08)"/>
      <path d="M14 8 V14 L18 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IconPhone() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-pp-red" aria-hidden="true">
      <path d="M20 19.5v2.5a1.7 1.7 0 0 1-1.8 1.7A16.8 16.8 0 0 1 4.3 9.8 1.7 1.7 0 0 1 6 8h2.5a1.7 1.7 0 0 1 1.7 1.5c.1.9.3 1.8.7 2.6a1.7 1.7 0 0 1-.4 1.8L9.4 15a13.6 13.6 0 0 0 5.1 5.1l1.1-1.1a1.7 1.7 0 0 1 1.8-.4c.8.4 1.7.6 2.6.7A1.7 1.7 0 0 1 20 19.5Z" stroke="currentColor" strokeWidth="1.6" fill="rgba(230,57,70,0.08)"/>
    </svg>
  );
}

const HOURS = [
  { day: "ראשון — חמישי", time: "12:00 — 00:00", open: true  },
  { day: "שישי",          time: "בדקו אותנו",      open: false },
  { day: "שבת",           time: "בדקו אותנו",      open: false },
];

export function LocationSection() {
  return (
    <section id="location" className="bg-pp-surface py-24 md:py-32" aria-labelledby="location-heading">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-16 text-center">
          <ScrollReveal>
            <p className="mb-3 tracking-[0.5em] text-pp-muted uppercase font-bebas text-sm">
              Find Us
            </p>
          </ScrollReveal>
          <ScrollReveal className="reveal-d2">
            <h2
              id="location-heading"
              className="font-black text-4xl text-pp-dark md:text-5xl"
              style={{ fontFamily: "var(--font-rubik)", fontWeight: 900 }}
            >
              בואו לבקר
            </h2>
          </ScrollReveal>
        </div>

        {/* Split layout */}
        <div className="grid gap-8 lg:grid-cols-2">

          {/* Info column */}
          <div className="space-y-6">

            {/* Address card */}
            <ScrollReveal className="reveal-d1">
              <div className="rounded-2xl border border-pp-border bg-pp-card p-8 transition-all hover:border-pp-red/30 hover:shadow-md">
                <div className="mb-4"><IconPin /></div>
                <p className="mb-1 text-xs tracking-widest text-pp-muted uppercase font-bebas">כתובת</p>
                <p
                  className="text-2xl font-black text-pp-dark"
                  style={{ fontFamily: "var(--font-rubik)", fontWeight: 900 }}
                >
                  גן אברהם
                </p>
                <p className="mt-1 text-pp-muted">גאולה כהן 4, קריית ים</p>
                <a
                  href="https://maps.app.goo.gl/Kpcw2dJNp8rcBkVg8"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="נווט לפארקו פיצה ב-Google Maps"
                  className="btn-primary mt-6 inline-block px-6 py-2.5 text-xs tracking-widest uppercase"
                >
                  נווט אלינו
                </a>
              </div>
            </ScrollReveal>

            {/* Hours card */}
            <ScrollReveal className="reveal-d2">
              <div className="rounded-2xl border border-pp-border bg-pp-card p-8 transition-all hover:border-pp-red/30 hover:shadow-md">
                <div className="mb-4"><IconClock /></div>
                <p className="mb-4 text-xs tracking-widest text-pp-muted uppercase font-bebas">שעות פעילות</p>
                <dl className="space-y-3">
                  {HOURS.map((h) => (
                    <div key={h.day} className="flex items-center justify-between gap-4">
                      <dt className="text-sm text-pp-muted">{h.day}</dt>
                      <dd className={`text-sm font-semibold ${h.open ? "text-pp-dark" : "text-pp-muted"}`}>
                        {h.time}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </ScrollReveal>

            {/* Phone card */}
            <ScrollReveal className="reveal-d3">
              <div className="rounded-2xl border border-pp-border bg-pp-card p-8 transition-all hover:border-pp-red/30 hover:shadow-md">
                <div className="mb-4"><IconPhone /></div>
                <p className="mb-2 text-xs tracking-widest text-pp-muted uppercase font-bebas">צרו קשר</p>
                <a
                  href="tel:046778900"
                  className="text-3xl font-black text-pp-red transition-colors hover:text-pp-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pp-red rounded-sm"
                  dir="ltr"
                  aria-label="התקשרו לפארקו פיצה: 04-6778900"
                  style={{ fontFamily: "var(--font-rubik)", fontWeight: 900 }}
                >
                  04-6778900
                </a>
                <p className="mt-3 text-sm text-pp-muted">
                  ניתן להזמין בטלפון או דרך האתר שלנו
                </p>
                <div className="mt-5 flex gap-4" role="list" aria-label="רשתות חברתיות">
                  <a
                    href="https://www.facebook.com/p/Parcopizza-61578178182108/"
                    target="_blank"
                    rel="noopener noreferrer"
                    role="listitem"
                    aria-label="פארקו פיצה בפייסבוק (נפתח בחלון חדש)"
                    className="text-xs tracking-widest text-pp-muted uppercase transition-colors hover:text-pp-red focus-visible:outline-2 focus-visible:outline-pp-red rounded-sm"
                  >
                    Facebook
                  </a>
                  <span className="text-pp-border" aria-hidden="true">|</span>
                  <a
                    href="https://www.instagram.com/parcopizza/"
                    target="_blank"
                    rel="noopener noreferrer"
                    role="listitem"
                    aria-label="פארקו פיצה באינסטגרם (נפתח בחלון חדש)"
                    className="text-xs tracking-widest text-pp-muted uppercase transition-colors hover:text-pp-red focus-visible:outline-2 focus-visible:outline-pp-red rounded-sm"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Map column */}
          <ScrollReveal className="reveal-d4">
            <div className="relative h-full min-h-[400px] overflow-hidden rounded-2xl border border-pp-border shadow-md lg:min-h-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3388.0!2d35.07!3d32.83!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDQ5JzU4LjAiTiAzNcKwMDQnMTIuMCJF!5e0!3m2!1siw!2sil!4v1700000000000!5m2!1siw!2sil"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="מיקום פארקו פיצה — גאולה כהן 4, קריית ים"
                aria-label="מפה המציגה את מיקום פארקו פיצה בגאולה כהן 4, קריית ים"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <a
                  href="https://maps.app.goo.gl/Kpcw2dJNp8rcBkVg8"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="פתח את המיקום ב-Google Maps (נפתח בחלון חדש)"
                  className="btn-primary inline-block px-6 py-2.5 text-xs tracking-widest uppercase shadow-lg"
                >
                  פתח במפות
                </a>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
