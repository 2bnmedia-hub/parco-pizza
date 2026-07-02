import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "הצהרת נגישות | פארקו פיצה",
  description: "הצהרת הנגישות של אתר פארקו פיצה — עמידה בתקן ישראלי IS 5568 ו-WCAG 2.1 AA",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-pp-border pb-10">
      <h2 className="mb-5 text-xl font-black text-pp-dark" style={{ fontFamily: "var(--font-rubik)", fontWeight: 900 }}>
        {title}
      </h2>
      <div className="space-y-3 text-[15px] leading-relaxed text-pp-muted">{children}</div>
    </section>
  );
}

function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 mt-0.5 text-pp-green" aria-hidden="true">
        <circle cx="9" cy="9" r="8.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <path d="M5.5 9.5 L7.5 11.5 L12.5 7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{children}</span>
    </li>
  );
}

function XItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 mt-0.5 text-pp-red" aria-hidden="true">
        <circle cx="9" cy="9" r="8.5" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <path d="M6 12 L12 6 M12 12 L6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span>{children}</span>
    </li>
  );
}

export default function AccessibilityPage() {
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1}>

        {/* Hero */}
        <section className="bg-pp-dark pt-32 pb-14 text-center" aria-labelledby="a11y-heading">
          <div className="mx-auto max-w-3xl px-6">
            <p className="mb-3 text-xs tracking-[0.5em] text-pp-green uppercase font-bebas">Accessibility</p>
            <h1
              id="a11y-heading"
              className="text-4xl font-black text-white md:text-5xl"
              style={{ fontFamily: "var(--font-rubik)", fontWeight: 900 }}
            >
              הצהרת נגישות
            </h1>
            <p className="mt-5 text-pp-muted text-[15px] max-w-xl mx-auto leading-relaxed">
              פארקו פיצה מחויבת לנגישות דיגיטלית מלאה עבור כלל האוכלוסייה,
              לרבות אנשים עם מוגבלויות, בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ&quot;ח–1998.
            </p>
          </div>
        </section>

        {/* Content */}
        <div className="mx-auto max-w-3xl px-6 py-14 space-y-10">

          <Section title="הצהרת עמידה בתקן">
            <p>
              אתר זה עומד בדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות),
              התשע&quot;ג–2013, ומיישם את הנחיות WCAG 2.1 ברמה AA בהתאם לתקן הישראלי
              <strong className="text-pp-dark"> IS 5568</strong>.
            </p>
            <p>
              הנגישות בוצעה בשיתוף עם מומחה נגישות מוסמך ועודכנה לאחרונה בחודש יולי 2026.
            </p>
            <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-pp-green/40 bg-pp-green/8 px-4 py-2 text-sm font-semibold text-pp-green">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="8" r="7.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M4.5 8.5L6.5 10.5L11.5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              WCAG 2.1 AA — תקן IS 5568
            </div>
          </Section>

          <Section title="מה עשינו?">
            <ul className="space-y-3">
              <CheckItem>תמיכה בקוראי מסך (VoiceOver, NVDA, JAWS)</CheckItem>
              <CheckItem>ניווט מלא במקלדת — כפתור &quot;דלג לתוכן הראשי&quot; זמין</CheckItem>
              <CheckItem>כל התמונות כוללות תיאורי alt משמעותיים</CheckItem>
              <CheckItem>כותרות מיובנות בהיררכיה (H1 → H2 → H3)</CheckItem>
              <CheckItem>צבעים בניגודיות מספקת לפי WCAG AA (יחס ≥ 4.5:1)</CheckItem>
              <CheckItem>כל הטפסים מתויגים עם label מתאים</CheckItem>
              <CheckItem>גודל הגופן מתאים לזום דפדפן עד 200% ללא אובדן תוכן</CheckItem>
              <CheckItem>כפתורים ואלמנטים אינטראקטיביים בגודל מינימלי של 44×44px</CheckItem>
              <CheckItem>שפת הדף מוגדרת כעברית (<code>lang=&quot;he&quot;</code>)</CheckItem>
              <CheckItem>כיוון הדף RTL מוגדר כהלכה</CheckItem>
              <CheckItem>אנימציות נעצרות עפ&quot;י הגדרת מערכת הפעלה (&quot;prefers-reduced-motion&quot;)</CheckItem>
              <CheckItem>כלי נגישות מובנה: שינוי גופן, ניגודיות, גווני אפור, עצירת אנימציות ועוד</CheckItem>
            </ul>
          </Section>

          <Section title="מגבלות ידועות">
            <ul className="space-y-3">
              <XItem>חלק מהתמונות בגלריה — תיאורי alt כלליים בלבד (בתהליך שיפור)</XItem>
              <XItem>מפת Google Maps מוטמעת — נגישות מוגבלת למשתמשי מקלדת בשל מגבלות ספק צד שלישי</XItem>
              <XItem>PDF של תפריט (אם יועלה) — עשוי שלא לתמוך בקוראי מסך</XItem>
            </ul>
          </Section>

          <Section title="טכנולוגיות נתמכות">
            <p>האתר נבדק ונתמך בשילובים הבאים:</p>
            <div className="grid grid-cols-2 gap-3 mt-4 sm:grid-cols-3">
              {[
                "Chrome + VoiceOver (Mac)",
                "Safari + VoiceOver (iOS)",
                "Chrome + TalkBack (Android)",
                "Firefox + NVDA (Windows)",
                "Edge + JAWS (Windows)",
                "ניווט מקלדת בכל הדפדפנים",
              ].map((t) => (
                <div key={t} className="rounded-xl border border-pp-border bg-pp-surface px-3 py-2.5 text-sm text-pp-dark">
                  {t}
                </div>
              ))}
            </div>
          </Section>

          <Section title="פרטי רכז הנגישות">
            <p>לדיווח על בעיית נגישות או לקבלת סיוע:</p>
            <div className="mt-4 rounded-2xl border border-pp-border bg-white p-6 space-y-3">
              <div className="flex items-center gap-3">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-pp-green shrink-0" aria-hidden="true">
                  <path d="M9 1.5C6.2 1.5 4 3.7 4 6.5C4 10.5 9 16.5 9 16.5C9 16.5 14 10.5 14 6.5C14 3.7 11.8 1.5 9 1.5Z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
                  <circle cx="9" cy="6.5" r="2" stroke="currentColor" strokeWidth="1.3"/>
                </svg>
                <span className="text-pp-dark font-semibold">פארקו פיצה — גאולה כהן 4, קריית ים</span>
              </div>
              <div className="flex items-center gap-3">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-pp-green shrink-0" aria-hidden="true">
                  <path d="M14 11.5v2a1.1 1.1 0 0 1-1.2 1.1A11.3 11.3 0 0 1 3.4 5.2a1.1 1.1 0 0 1 1.1-1.2h2a1.1 1.1 0 0 1 1.1 1c.1.6.3 1.2.5 1.8a1.1 1.1 0 0 1-.3 1.2l-.8.8a9 9 0 0 0 3.5 3.5l.8-.8a1.1 1.1 0 0 1 1.2-.3c.6.2 1.2.4 1.8.5a1.1 1.1 0 0 1 1 1.1Z" stroke="currentColor" strokeWidth="1.4"/>
                </svg>
                <a href="tel:046778900" className="text-pp-green font-semibold hover:underline" dir="ltr">04-6778900</a>
              </div>
              <div className="flex items-center gap-3">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-pp-green shrink-0" aria-hidden="true">
                  <path d="M3 4.5H15L9 10.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                  <rect x="3" y="4.5" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.4"/>
                </svg>
                <a href="mailto:accessibility@parcopizza.online" className="text-pp-green font-semibold hover:underline break-all">
                  accessibility@parcopizza.online
                </a>
              </div>
              <p className="text-xs text-pp-muted pt-1">זמן תגובה: עד 5 ימי עסקים</p>
            </div>
          </Section>

          <Section title="ערוצי פנייה חיצוניים">
            <p>
              אם לא קיבלת מענה מספק, ניתן לפנות לנציבות שוויון זכויות לאנשים עם מוגבלות
              במשרד המשפטים:
            </p>
            <p className="mt-2">
              <strong className="text-pp-dark">טלפון:</strong> 02-6494480 |{" "}
              <strong className="text-pp-dark">אתר:</strong>{" "}
              <a
                href="https://www.justice.gov.il/Units/NetzivutShivyon"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pp-green hover:underline"
              >
                justice.gov.il
              </a>
            </p>
          </Section>

          <div className="text-center text-xs text-pp-muted pt-4 pb-2">
            עדכון אחרון: יולי 2026 | הצהרה זו תעודכן מדי שנה לפחות.
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
