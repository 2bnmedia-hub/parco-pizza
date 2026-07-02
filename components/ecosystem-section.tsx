import Link from "next/link";
import { ScrollReveal } from "./scroll-reveal";

function IconPizzaBuilder({ color }: { color: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="16" stroke={color} strokeWidth="2" fill="none" fillOpacity="0.12" />
      <circle cx="20" cy="20" r="16" fill={color} fillOpacity="0.10" />
      <path d="M20 4 L20 20" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.7" />
      <path d="M20 20 L32.9 28" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.7" />
      <path d="M20 20 L7.1 28" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.7" />
      <path d="M7 29 Q20 37 33 29" stroke={color} strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <circle cx="20" cy="11" r="2.5" fill={color} />
      <circle cx="14" cy="23" r="2" fill={color} />
      <circle cx="26" cy="23" r="2" fill={color} />
    </svg>
  );
}

function IconEvents({ color }: { color: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="16" fill={color} fillOpacity="0.1" />
      <path d="M20 6 L22.9 14.2 L31.8 14.2 L24.4 19.5 L27.3 27.8 L20 22.5 L12.7 27.8 L15.6 19.5 L8.2 14.2 L17.1 14.2 Z" fill={color} fillOpacity="0.85" />
      <circle cx="29" cy="10" r="1.8" fill={color} fillOpacity="0.6" />
      <circle cx="11" cy="30" r="1.4" fill={color} fillOpacity="0.5" />
      <circle cx="32" cy="28" r="1.2" fill={color} fillOpacity="0.4" />
    </svg>
  );
}

function IconCatering({ color }: { color: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="16" fill={color} fillOpacity="0.1" />
      <path d="M8 28 Q20 14 32 28" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
      <line x1="8" y1="30" x2="32" y2="30" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M15 20 C15 16 17 12 20 12 C23 12 25 16 25 20" stroke={color} strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <line x1="20" y1="12" x2="20" y2="9" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="8.5" r="1.8" fill={color} />
    </svg>
  );
}

function IconVIP({ color }: { color: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="16" fill={color} fillOpacity="0.1" />
      <path d="M8 26 L12 14 L20 22 L28 14 L32 26 Z" fill={color} fillOpacity="0.85" strokeLinejoin="round" />
      <line x1="7" y1="29" x2="33" y2="29" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="12" cy="14" r="2.2" fill={color} />
      <circle cx="20" cy="22" r="2.2" fill={color} />
      <circle cx="28" cy="14" r="2.2" fill={color} />
    </svg>
  );
}

function IconShop({ color }: { color: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="16" fill={color} fillOpacity="0.1" />
      <path d="M13 17 L11 30 L29 30 L27 17 Z" stroke={color} strokeWidth="2" strokeLinejoin="round" fill={color} fillOpacity="0.12" />
      <path d="M16 17 C16 14 17.8 11 20 11 C22.2 11 24 14 24 17" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="20" cy="23" r="3" fill={color} fillOpacity="0.7" />
    </svg>
  );
}

function IconReviews({ color }: { color: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="16" fill={color} fillOpacity="0.1" />
      <path d="M10 12 Q10 8 14 8 L26 8 Q30 8 30 12 L30 22 Q30 26 26 26 L23 26 L20 30 L17 26 L14 26 Q10 26 10 22 Z" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M20 13 L21.4 17 H25.6 L22.1 19.5 L23.5 23.5 L20 21 L16.5 23.5 L17.9 19.5 L14.4 17 H18.6 Z" fill={color} />
    </svg>
  );
}

const FEATURES = [
  {
    href: "/build",
    Icon: IconPizzaBuilder,
    title: "בנה פיצה",
    desc: "בחר גודל, עיסה, רוטב וטופינגס — הפיצה שלך, הסגנון שלך",
    badge: "חדש",
    color: "#C62828",
    bg: "linear-gradient(135deg,rgba(198,40,40,0.08),rgba(198,40,40,0.03))",
  },
  {
    href: "/events",
    Icon: IconEvents,
    title: "אירועים",
    desc: "ימי הולדת, אירועים עסקיים, מסיבות — אנחנו מארחים הכל",
    color: "#F4A261",
    bg: "linear-gradient(135deg,rgba(244,162,97,0.08),rgba(244,162,97,0.03))",
  },
  {
    href: "/catering",
    Icon: IconCatering,
    title: "קייטרינג עסקי",
    desc: "צהריים לצוות, ישיבות וכנסים — שירות B2B מקצועי",
    color: "#2E7D32",
    bg: "linear-gradient(135deg,rgba(46,125,50,0.08),rgba(46,125,50,0.03))",
  },
  {
    href: "/loyalty",
    Icon: IconVIP,
    title: "מועדון VIP",
    desc: "נקודות, פרסים, דרגות — ההטבות גדלות עם כל הזמנה",
    color: "#D4A017",
    bg: "linear-gradient(135deg,rgba(212,160,23,0.08),rgba(212,160,23,0.03))",
  },
  {
    href: "/shop",
    Icon: IconShop,
    title: "חנות",
    desc: "רטבים ביתיים, תבלינים, ערכות פיצה ומרצ׳נדייז מיוחד",
    color: "#6D4C41",
    bg: "linear-gradient(135deg,rgba(139,99,71,0.08),rgba(139,99,71,0.03))",
  },
  {
    href: "#reviews",
    Icon: IconReviews,
    title: "ביקורות",
    desc: "ראה מה אומרת הקהילה, ושתף את החוויה שלך",
    color: "#C62828",
    bg: "linear-gradient(135deg,rgba(198,40,40,0.06),rgba(198,40,40,0.02))",
  },
];

export function EcosystemSection() {
  return (
    <section className="py-14 md:py-28 px-4 md:px-6 bg-pp-surface">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-16">
            <p className="text-pp-muted tracking-[0.5em] uppercase font-bebas text-sm mb-3">Digital Ecosystem</p>
            <h2 className="font-black text-3xl md:text-5xl text-pp-dark" style={{fontFamily:"var(--font-rubik)",fontWeight:900}}>
              עוד הרבה יותר מפיצה
            </h2>
            <p className="mt-4 text-pp-muted max-w-xl mx-auto">
              פארקו פיצה בונה איתך חוויה דיגיטלית שלמה — מהזמנה ועד קהילה
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <ScrollReveal key={f.href} className={`reveal-d${(i%4)+1} flex flex-col`}>
              <Link href={f.href}
                className="group grow rounded-3xl border-2 border-transparent p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{background: f.bg, borderColor: `${f.color}22`}}>
                <div className="flex items-start gap-4">
                  <div className="shrink-0">
                    <f.Icon color={f.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-black text-lg text-pp-dark" style={{fontFamily:"var(--font-rubik)"}}>{f.title}</h3>
                      {f.badge && (
                        <span className="rounded-full px-2 py-0.5 text-[9px] font-black text-white font-bebas tracking-wide"
                          style={{background:f.color}}>
                          {f.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-pp-muted leading-relaxed">{f.desc}</p>
                  </div>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{color:f.color}}>
                    <path d="M4 16L16 4M16 4H8M16 4V12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
