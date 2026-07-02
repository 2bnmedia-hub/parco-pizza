import Link from "next/link";
import { ScrollReveal } from "./scroll-reveal";

const FEATURES = [
  {
    href: "/build",
    emoji: "🍕",
    title: "בנה פיצה",
    desc: "בחר גודל, עיסה, רוטב וטופינגס — הפיצה שלך, הסגנון שלך",
    badge: "חדש",
    color: "#E63946",
    bg: "linear-gradient(135deg,rgba(230,57,70,0.08),rgba(230,57,70,0.03))",
  },
  {
    href: "/events",
    emoji: "🎉",
    title: "אירועים",
    desc: "ימי הולדת, אירועים עסקיים, מסיבות — אנחנו מארחים הכל",
    color: "#F4A261",
    bg: "linear-gradient(135deg,rgba(244,162,97,0.08),rgba(244,162,97,0.03))",
  },
  {
    href: "/catering",
    emoji: "🏢",
    title: "קייטרינג עסקי",
    desc: "צהריים לצוות, ישיבות וכנסים — שירות B2B מקצועי",
    color: "#2D6A4F",
    bg: "linear-gradient(135deg,rgba(45,106,79,0.08),rgba(45,106,79,0.03))",
  },
  {
    href: "/loyalty",
    emoji: "👑",
    title: "מועדון VIP",
    desc: "נקודות, פרסים, דרגות — ההטבות גדלות עם כל הזמנה",
    color: "#D4A017",
    bg: "linear-gradient(135deg,rgba(212,160,23,0.08),rgba(212,160,23,0.03))",
  },
  {
    href: "/shop",
    emoji: "🛒",
    title: "חנות",
    desc: "רטבים ביתיים, תבלינים, ערכות פיצה ומרצ׳נדייז מיוחד",
    color: "#8B6347",
    bg: "linear-gradient(135deg,rgba(139,99,71,0.08),rgba(139,99,71,0.03))",
  },
  {
    href: "#reviews",
    emoji: "⭐",
    title: "ביקורות",
    desc: "ראה מה אומרת הקהילה, ושתף את החוויה שלך",
    color: "#E63946",
    bg: "linear-gradient(135deg,rgba(230,57,70,0.06),rgba(230,57,70,0.02))",
  },
];

export function EcosystemSection() {
  return (
    <section className="py-24 md:py-32 px-6 bg-pp-surface">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-pp-muted tracking-[0.5em] uppercase font-bebas text-sm mb-3">Digital Ecosystem</p>
            <h2 className="font-black text-4xl md:text-5xl text-pp-dark" style={{fontFamily:"var(--font-rubik)",fontWeight:900}}>
              עוד הרבה יותר מפיצה
            </h2>
            <p className="mt-4 text-pp-muted max-w-xl mx-auto">
              פארקו פיצה בונה איתך חוויה דיגיטלית שלמה — מהזמנה ועד קהילה
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <ScrollReveal key={f.href} className={`reveal-d${(i%4)+1}`}>
              <Link href={f.href}
                className="group block rounded-3xl border-2 border-transparent p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{background: f.bg, borderColor: `${f.color}22`}}>
                <div className="flex items-start gap-4">
                  <div className="text-4xl shrink-0">{f.emoji}</div>
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
