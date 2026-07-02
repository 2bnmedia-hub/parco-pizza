"use client";

import { useState, useRef } from "react";

function IconBirthday() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="4" y="16" width="24" height="13" rx="2" stroke="white" strokeWidth="1.6" fill="rgba(255,255,255,0.1)"/>
      <path d="M8 16v-3a2 2 0 0 1 4 0v3M14 16v-3a2 2 0 0 1 4 0v3M20 16v-3a2 2 0 0 1 4 0v3" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M10 10 C10 8 12 7 12 5" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M16 10 C16 8 18 7 18 5" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M22 10 C22 8 24 7 24 5" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  );
}

function IconPercent() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="4" stroke="white" strokeWidth="1.6" fill="rgba(255,255,255,0.1)"/>
      <circle cx="21" cy="21" r="4" stroke="white" strokeWidth="1.6" fill="rgba(255,255,255,0.1)"/>
      <path d="M24 8L8 24" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

function IconBell() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 4 C11 4 8 8 8 13 V20 H24 V13 C24 8 21 4 16 4Z" stroke="white" strokeWidth="1.6" fill="rgba(255,255,255,0.1)"/>
      <path d="M8 20 H24" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M13 20 C13 22.2 14.3 24 16 24 S19 22.2 19 20" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <circle cx="22" cy="8" r="3.5" fill="white" opacity="0.9"/>
    </svg>
  );
}

function IconGift() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="4" y="13" width="24" height="3" rx="1" stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.1)"/>
      <rect x="6" y="16" width="20" height="11" rx="1.5" stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.1)"/>
      <path d="M16 13 V27" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16 13 C16 13 13 10 14 8 S17 7 16 9 S19 12 20 11 S22 8 20 7 S16 8 16 13Z" stroke="white" strokeWidth="1.3" fill="rgba(255,255,255,0.15)"/>
    </svg>
  );
}

const BENEFITS = [
  { Icon: IconBirthday, title: "יום הולדת",       desc: "פיצה חינם ביום ההולדת שלך" },
  { Icon: IconPercent,  title: "הנחות",            desc: "10% הנחה לחברי המועדון" },
  { Icon: IconBell,     title: "ראשונים לדעת",    desc: "מבצעים בלעדיים לפני כולם" },
  { Icon: IconGift,     title: "מתנות הפתעה",    desc: "טיפות אהבה מהמטבח" },
];

interface Confetti {
  id: number;
  color: string;
  left: number;
  delay: number;
  size: number;
}

const CONFETTI_COLORS = ["#E63946", "#F4A261", "#E9C46A", "#FFFFFF", "#2D6A4F", "#4ade80"];

function makeConfetti(): Confetti[] {
  return Array.from({ length: 30 }, (_, i) => ({
    id: i,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length]!,
    left: Math.random() * 100,
    delay: Math.random() * 0.8,
    size: 6 + Math.random() * 8,
  }));
}

export function CustomerClub() {
  const [form, setForm] = useState({ firstName: "", phone: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [confetti, setConfetti] = useState<Confetti[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setConfetti(makeConfetti());
      setTimeout(() => setConfetti([]), 2500);
    }, 1000);
  };

  return (
    <section
      id="club"
      className="relative overflow-hidden py-24 md:py-32"
      aria-labelledby="club-heading"
      style={{ background: "linear-gradient(135deg, #E63946 0%, #c62d38 40%, #b82233 100%)" }}
    >
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/5" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/5" aria-hidden="true" />

      {/* Basil green accent blob */}
      <div
        className="pointer-events-none absolute top-0 right-0 h-80 w-80 opacity-10"
        style={{
          background: "radial-gradient(circle, #2D6A4F 0%, transparent 70%)",
          transform: "translate(30%, -30%)",
        }}
        aria-hidden="true"
      />

      {/* Confetti */}
      {confetti.map((c) => (
        <div
          key={c.id}
          className="confetti-piece pointer-events-none"
          aria-hidden="true"
          style={{
            left: `${c.left}%`,
            top: "40%",
            background: c.color,
            width: c.size,
            height: c.size,
            animationDelay: `${c.delay}s`,
          }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Heading */}
        <p className="mb-2 tracking-[0.4em] text-white/60 uppercase font-bebas text-sm">
          הצטרפו
        </p>
        <h2
          id="club-heading"
          className="font-black text-4xl text-white md:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-rubik)", fontWeight: 900 }}
        >
          מועדון ה-VIP של פארקו
        </h2>
        <p className="mt-4 text-lg text-white/80">
          הצטרף וקבל הטבות בלעדיות
        </p>

        {/* Benefits grid */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list" aria-label="הטבות מועדון">
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              role="listitem"
              className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur-sm transition-all hover:bg-white/20 hover:-translate-y-1"
            >
              <div className="mb-4 flex justify-center" aria-hidden="true">
                <b.Icon />
              </div>
              <p className="font-black text-white" style={{ fontFamily: "var(--font-rubik)" }}>
                {b.title}
              </p>
              <p className="mt-1 text-sm text-white/70">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Form or Success */}
        <div className="mt-12 mx-auto max-w-lg">
          {!submitted ? (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-3"
              aria-label="טופס הצטרפות למועדון"
              noValidate
            >
              <div>
                <label htmlFor="club-firstname" className="sr-only">שם פרטי</label>
                <input
                  id="club-firstname"
                  type="text"
                  required
                  autoComplete="given-name"
                  value={form.firstName}
                  onChange={(e) => setForm((p) => ({ ...p, firstName: e.target.value }))}
                  placeholder="שם פרטי"
                  aria-required="true"
                  className="w-full rounded-xl border-0 bg-white/20 px-5 py-3.5 text-center text-white placeholder:text-white/50 outline-none transition-colors focus:bg-white/30 focus:ring-2 focus:ring-white/60"
                />
              </div>
              <div>
                <label htmlFor="club-phone" className="sr-only">מספר טלפון</label>
                <input
                  id="club-phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="מספר טלפון"
                  dir="ltr"
                  aria-required="true"
                  className="w-full rounded-xl border-0 bg-white/20 px-5 py-3.5 text-center text-white placeholder:text-white/50 outline-none transition-colors focus:bg-white/30 focus:ring-2 focus:ring-white/60"
                />
              </div>
              <div>
                <label htmlFor="club-email" className="sr-only">כתובת אימייל</label>
                <input
                  id="club-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  placeholder="כתובת אימייל"
                  dir="ltr"
                  aria-required="true"
                  className="w-full rounded-xl border-0 bg-white/20 px-5 py-3.5 text-center text-white placeholder:text-white/50 outline-none transition-colors focus:bg-white/30 focus:ring-2 focus:ring-white/60"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                aria-busy={submitting}
                className="w-full rounded-xl bg-white px-8 py-4 font-black text-pp-red transition-all hover:bg-pp-yellow hover:text-pp-dark disabled:opacity-70 text-lg tracking-wide"
                style={{ fontFamily: "var(--font-rubik)" }}
              >
                {submitting ? "רושמים אותך..." : "הצטרף עכשיו"}
              </button>
              <p className="text-xs text-white/50" role="note">
                בלי ספאם. רק הטבות אמיתיות. מבטיחים!
              </p>
            </form>
          ) : (
            <div
              className="rounded-2xl bg-white/20 px-8 py-10 backdrop-blur-sm animate-scale-in"
              role="status"
              aria-live="polite"
            >
              {/* Success checkmark SVG */}
              <div className="flex justify-center mb-4" aria-hidden="true">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="13" stroke="white" strokeWidth="2"/>
                    <path d="M9 16 L13.5 20.5 L23 11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-black text-white" style={{ fontFamily: "var(--font-rubik)" }}>
                ברוך הבא למועדון, {form.firstName}!
              </h3>
              <p className="mt-3 text-white/80">
                נשמח לשלוח לך הטבות בלעדיות ישירות לנייד ולמייל.
              </p>
              <p className="mt-2 font-semibold" style={{ color: "#4ade80" }}>
                תודה שבחרת בפארקו פיצה
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
