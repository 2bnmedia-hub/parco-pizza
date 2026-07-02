import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "תקנון האתר | פארקו פיצה",
  description: "תנאי השימוש ותקנון האתר של פארקו פיצה",
};

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-b border-pp-border pb-10 scroll-mt-24">
      <h2 className="mb-5 text-xl font-black text-pp-dark" style={{ fontFamily: "var(--font-rubik)", fontWeight: 900 }}>
        {title}
      </h2>
      <div className="space-y-3 text-[15px] leading-relaxed text-pp-muted">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  const updated = "יולי 2026";
  return (
    <>
      <Nav />
      <main id="main-content" tabIndex={-1}>

        {/* Hero */}
        <section className="bg-pp-dark pt-32 pb-14 text-center">
          <div className="mx-auto max-w-3xl px-6">
            <p className="mb-3 text-xs tracking-[0.5em] text-pp-red uppercase font-bebas">Terms of Service</p>
            <h1
              className="text-4xl font-black text-white md:text-5xl"
              style={{ fontFamily: "var(--font-rubik)", fontWeight: 900 }}
            >
              תקנון האתר
            </h1>
            <p className="mt-4 text-pp-muted text-sm">עודכן לאחרונה: {updated}</p>
          </div>
        </section>

        {/* TOC */}
        <div className="bg-pp-surface border-b border-pp-border">
          <div className="mx-auto max-w-3xl px-6 py-5">
            <p className="text-xs font-bold tracking-widest uppercase text-pp-muted mb-3 font-bebas">תוכן עניינים</p>
            <nav aria-label="תוכן עניינים">
              <ol className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-pp-green">
                {[
                  ["#general", "כללי"],
                  ["#use", "תנאי שימוש"],
                  ["#ip", "קניין רוחני"],
                  ["#orders", "הזמנות"],
                  ["#liability", "אחריות"],
                  ["#privacy", "פרטיות"],
                  ["#law", "דין חל"],
                  ["#contact", "יצירת קשר"],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a href={href} className="hover:underline underline-offset-2">{label}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-3xl px-6 py-14 space-y-10">

          <Section id="general" title="1. כללי">
            <p>
              ברוכים הבאים לאתר פארקו פיצה (<strong className="text-pp-dark">www.parcopizza.online</strong>).
              האתר מופעל על ידי <strong className="text-pp-dark">פארקו פיצה</strong>, הממוקמת ברח&apos; גאולה כהן 4, קריית ים.
            </p>
            <p>
              השימוש באתר זה מהווה הסכמה לתנאי השימוש המפורטים להלן.
              אם אינך מסכים לתנאים אלו, אנא הימנע משימוש באתר.
            </p>
            <p>
              תנאים אלו כפופים לדיני מדינת ישראל ומחייבים משתמשים בכל גיל.
              המשך שימוש באתר לאחר שינויים בתנאים מהווה הסכמה לשינויים.
            </p>
          </Section>

          <Section id="use" title="2. תנאי שימוש">
            <p>המשתמש מתחייב:</p>
            <ul className="list-disc list-inside space-y-2 mr-2">
              <li>להשתמש באתר למטרות חוקיות בלבד</li>
              <li>שלא להפריע לתפקוד האתר, לרבות ניסיונות פריצה או הצפת שרתים</li>
              <li>שלא לפרסם תוכן פוגעני, מטעה, או הפוגע בפרטיות אחרים</li>
              <li>שלא להשתמש בתוכן האתר למטרות מסחריות ללא אישור מראש בכתב</li>
              <li>שמסר פרטים נכונים ומדויקים בעת ביצוע הזמנה</li>
            </ul>
          </Section>

          <Section id="ip" title="3. קניין רוחני">
            <p>
              כל התכנים באתר — לרבות טקסטים, תמונות, לוגואים, עיצוב, גרפיקה וקוד —
              הם רכושה הבלעדי של פארקו פיצה ומוגנים בחוקי זכויות יוצרים.
            </p>
            <p>
              אין להעתיק, לשכפל, להפיץ, לשנות, להציג בפומבי או לעשות כל שימוש מסחרי
              בתכנים ללא אישור כתוב מראש מפארקו פיצה.
            </p>
            <p>
              שימוש אישי ולא מסחרי מותר בתנאי שמופיעה ייחוס מלאה לפארקו פיצה.
            </p>
          </Section>

          <Section id="orders" title="4. הזמנות ורכישות">
            <p>
              הזמנות המבוצעות דרך האתר או קישורים חיצוניים כפופות לאישור המסעדה.
              פארקו פיצה שומרת לעצמה את הזכות לבטל הזמנה בכל עת מכל סיבה שהיא,
              כולל מחיר שגוי, חוסר זמינות מוצר, או אירוע בלתי צפוי.
            </p>
            <p>
              מחירי התפריט עשויים להשתנות ללא הודעה מוקדמת. המחיר הקובע הוא זה
              שמאושר בעת סיום ההזמנה.
            </p>
            <p>
              המסעדה כשרה חלבית בפיקוח הרבנות המקומית. תכולת האלרגנים — יש לפנות לצוות המסעדה.
            </p>
          </Section>

          <Section id="liability" title="5. הגבלת אחריות">
            <p>
              האתר מסופק &quot;כפי שהוא&quot; (AS IS). פארקו פיצה לא תהיה אחראית לנזקים ישירים,
              עקיפים, תוצאתיים או מקריים הנובעים מהשימוש באתר.
            </p>
            <p>
              פארקו פיצה אינה אחראית לנזקים הנובעים מתקלות טכניות, הפסקות שירות,
              פרצות אבטחה שמחוץ לשליטתה, או פעולות של צדדים שלישיים.
            </p>
            <p>
              הקישורים לאתרי צדדים שלישיים (Google Maps, מערכות הזמנות) כפופים לתנאי
              אותם אתרים ופארקו פיצה אינה אחראית לתוכנם.
            </p>
          </Section>

          <Section id="privacy" title="6. פרטיות">
            <p>
              מדיניות הפרטיות המלאה מפורטת ב
              <a href="/privacy" className="text-pp-green hover:underline mx-1">דף מדיניות הפרטיות</a>.
              השימוש באתר כפוף גם לאותה מדיניות.
            </p>
            <p>
              בהזמנת מוצרים, המשתמש מסכים לאיסוף פרטיו לצורך עיבוד ההזמנה ושיפור השירות
              בהתאם לחוק הגנת הפרטיות, התשמ&quot;א–1981.
            </p>
          </Section>

          <Section id="law" title="7. הדין החל וסמכות שיפוט">
            <p>
              תקנון זה כפוף לחוקי מדינת ישראל בלבד.
              כל סכסוך הנוגע לאתר ולשירותיו יידון בבתי המשפט המוסמכים במחוז חיפה.
            </p>
            <p>
              הצדדים יעשו מאמץ לפתור כל מחלוקת בדרך ידידותית לפני פנייה לערכאות משפטיות.
            </p>
          </Section>

          <Section id="contact" title="8. יצירת קשר">
            <div className="rounded-2xl border border-pp-border bg-white p-6 space-y-3 mt-2">
              <p className="font-semibold text-pp-dark">פארקו פיצה</p>
              <p>גאולה כהן 4, גן אברהם, קריית ים</p>
              <p>
                <strong>טלפון:</strong>{" "}
                <a href="tel:046778900" className="text-pp-green hover:underline" dir="ltr">04-6778900</a>
              </p>
              <p>
                <strong>דוא&quot;ל:</strong>{" "}
                <a href="mailto:parco.pizza26@gmail.com" className="text-pp-green hover:underline">
                  parco.pizza26@gmail.com
                </a>
              </p>
            </div>
          </Section>

          <div className="text-center text-xs text-pp-muted pt-4 pb-2">
            תקנון זה עודכן לאחרונה בחודש {updated} ובתוקף מיום פרסומו.
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
